/* Shorties room transport: our own Cloudflare rooms server (WebSocket), with automatic fallback to the public MQTT broker. */
(function () {
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var qp = new URLSearchParams(location.search).get('ws');
  var BASES = (LOCAL && qp) ? [qp] : (location.protocol === 'file:' ? [] : ['wss://rooms.tagshim.com', 'wss://shorties-rooms.gleb1979.workers.dev']);
  window.SHORTIES_WS = BASES[0] || null;
  window.roomClient = function (topic, mqttUrl, mqttOpts) {
    var h = {}, mode = 'ws', bi = 0, ws = null, mq = null, opened = false, closed = false, tries = 0, q = [];
    var api = {
      on: function (ev, f) { h[ev] = f; return api; },
      subscribe: function (t, o, cb) { if (mode === 'mqtt' && mq) mq.subscribe(t, o, cb); else if (cb) cb(); },
      publish: function (t, m, o) { if (mode === 'mqtt') { if (mq) mq.publish(t, m, o); } else if (ws && ws.readyState === 1) ws.send(m); else if (q.length < 50) q.push(m); },
      end: function () { closed = true; try { ws && ws.close(); } catch (e) {} try { mq && mq.end(); } catch (e) {} },
      get mode() { return mode; },
      bridge: function () { bridged = true; setTimeout(openBridge, 1500); }
    };
    var bridged = false, seen = new Map(), b2 = null, bws = null;
    function deliver(t, str) { if (bridged) { var n = Date.now(), k = seen.get(str); if (k && n - k < 4000) return; seen.set(str, n); if (seen.size > 400) { var c = 0; seen.forEach(function (v, kk) { if (n - v > 4000 || c++ < 100) seen.delete(kk); }); } } if (h.message) h.message(t, { toString: function () { return str; } }); }
    function openBridge() {
      if (closed) return;
      if (mode === 'ws') { if (b2 || !window.mqtt) return; try { var o = {}; for (var k in (mqttOpts || {})) o[k] = mqttOpts[k]; o.clientId = (o.clientId || 'c') + '_br'; b2 = window.mqtt.connect(mqttUrl, o); b2.on('connect', function () { b2.subscribe(topic, { qos: 0 }); }); b2.on('message', function (t, b) { deliver(t, b.toString()); }); b2.on('error', function () {}); } catch (e) {} }
      else if (BASES.length && !bws) { try { bws = new WebSocket(BASES[0] + '/ws/' + encodeURIComponent(topic)); bws.onmessage = function (e) { deliver(topic, String(e.data)); }; bws.onclose = function () { bws = null; if (!closed) setTimeout(openBridge, 3000); }; bws.onerror = function () {}; } catch (e) {} }
    }
    var _pub = api.publish; api.publish = function (t, m, o) { _pub(t, m, o); if (bridged) { try { if (b2 && b2.connected) b2.publish(t, m, o); if (bws && bws.readyState === 1) bws.send(m); } catch (e) {} } };
    var _end = api.end; api.end = function () { _end(); try { b2 && b2.end(); } catch (e) {} try { bws && bws.close(); } catch (e) {} };
    function fail() { if (bi + 1 < BASES.length) { bi++; try { ws && ws.close(); } catch (e) {} open(); } else toMqtt(); }
    function toMqtt() {
      if (mode === 'mqtt') return; mode = 'mqtt'; try { ws && ws.close(); } catch (e) {}
      if (!window.mqtt) { if (h.error) h.error(); return; }
      mq = window.mqtt.connect(mqttUrl, mqttOpts);
      mq.on('connect', function () { if (h.connect) h.connect(); });
      mq.on('message', function (t, b) { deliver(t, b.toString()); });
      mq.on('error', function (e) { if (h.error) h.error(e); });
    }
    function open() {
      if (closed || mode !== 'ws') return;
      var my = bi, sock; try { sock = ws = new WebSocket(BASES[bi] + '/ws/' + encodeURIComponent(topic)); } catch (e) { fail(); return; }
      var t = setTimeout(function () { if (!opened && my === bi) fail(); }, 4000);
      sock.onopen = function () { if (sock !== ws) { try { sock.close(); } catch (e) {} return; } clearTimeout(t); opened = true; tries = 0; if (h.connect) h.connect(); while (q.length && ws.readyState === 1) ws.send(q.shift()); };
      sock.onmessage = function (e) { deliver(topic, String(e.data)); };
      sock.onclose = function () { clearTimeout(t); if (closed || mode !== 'ws' || sock !== ws) return; if (!opened) { fail(); return; } setTimeout(open, Math.min(5000, 400 * ++tries)); };
      sock.onerror = function () {};
    }
    setTimeout(BASES.length ? open : toMqtt, 0);
    return api;
  };
})();
