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
      get mode() { return mode; }
    };
    function fail() { if (bi + 1 < BASES.length) { bi++; try { ws && ws.close(); } catch (e) {} open(); } else toMqtt(); }
    function toMqtt() {
      if (mode === 'mqtt') return; mode = 'mqtt'; try { ws && ws.close(); } catch (e) {}
      if (!window.mqtt) { if (h.error) h.error(); return; }
      mq = window.mqtt.connect(mqttUrl, mqttOpts);
      mq.on('connect', function () { if (h.connect) h.connect(); });
      mq.on('message', function (t, b) { if (h.message) h.message(t, b); });
      mq.on('error', function (e) { if (h.error) h.error(e); });
    }
    function open() {
      if (closed || mode !== 'ws') return;
      var my = bi, sock; try { sock = ws = new WebSocket(BASES[bi] + '/ws/' + encodeURIComponent(topic)); } catch (e) { fail(); return; }
      var t = setTimeout(function () { if (!opened && my === bi) fail(); }, 4000);
      sock.onopen = function () { if (sock !== ws) { try { sock.close(); } catch (e) {} return; } clearTimeout(t); opened = true; tries = 0; if (h.connect) h.connect(); while (q.length && ws.readyState === 1) ws.send(q.shift()); };
      sock.onmessage = function (e) { if (h.message) h.message(topic, { toString: function () { return String(e.data); } }); };
      sock.onclose = function () { clearTimeout(t); if (closed || mode !== 'ws' || sock !== ws) return; if (!opened) { fail(); return; } setTimeout(open, Math.min(5000, 400 * ++tries)); };
      sock.onerror = function () {};
    }
    setTimeout(BASES.length ? open : toMqtt, 0);
    return api;
  };
})();
