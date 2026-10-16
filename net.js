/* Shorties room transport: our own Cloudflare rooms server (WebSocket), with automatic fallback to the public MQTT broker. */
(function () {
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var qp = new URLSearchParams(location.search).get('ws');
  var BASE = (LOCAL && qp) ? qp : (location.protocol === 'file:' ? null : 'wss://shorties-rooms.gleb1979.workers.dev');
  window.SHORTIES_WS = BASE;
  window.roomClient = function (topic, mqttUrl, mqttOpts) {
    var h = {}, mode = 'ws', ws = null, mq = null, opened = false, closed = false, tries = 0, q = [];
    var api = {
      on: function (ev, f) { h[ev] = f; return api; },
      subscribe: function (t, o, cb) { if (mode === 'mqtt' && mq) mq.subscribe(t, o, cb); else if (cb) cb(); },
      publish: function (t, m, o) { if (mode === 'mqtt') { if (mq) mq.publish(t, m, o); } else if (ws && ws.readyState === 1) ws.send(m); else if (q.length < 50) q.push(m); },
      end: function () { closed = true; try { ws && ws.close(); } catch (e) {} try { mq && mq.end(); } catch (e) {} },
      get mode() { return mode; }
    };
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
      try { ws = new WebSocket(BASE + '/ws/' + encodeURIComponent(topic)); } catch (e) { toMqtt(); return; }
      var t = setTimeout(function () { if (!opened) toMqtt(); }, 4000);
      ws.onopen = function () { clearTimeout(t); opened = true; tries = 0; if (h.connect) h.connect(); while (q.length && ws.readyState === 1) ws.send(q.shift()); };
      ws.onmessage = function (e) { if (h.message) h.message(topic, { toString: function () { return String(e.data); } }); };
      ws.onclose = function () { clearTimeout(t); if (closed || mode !== 'ws') return; if (!opened) { toMqtt(); return; } setTimeout(open, Math.min(5000, 400 * ++tries)); };
      ws.onerror = function () {};
    }
    setTimeout(BASE ? open : toMqtt, 0);
    return api;
  };
})();
