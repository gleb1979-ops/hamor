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
/* Find which Tagshim game a room code belongs to: listen on every game's room channel and return the first one where a host is talking. */
(function(){
  var GAMES=[['byd-burger/v1/','/burger/?room='],['tagshim/rifts/v1/','/rifts/?room='],['tagshim-night/stars/v1/','/night/stars/?room='],['byd-hamor/v1/','/donkey/?room='],['tagshim/ulica/v1/','/ulica/?room=']];
  window.TAGSHIM_GAMES=GAMES;
  window.findRoom=function(code,opts){opts=opts||{};return new Promise(function(res){
    if(!window.roomClient){res(null);return}
    var done=false,cl=[];function fin(v){if(done)return;done=true;cl.forEach(function(x){try{x.end()}catch(e){}});res(v)}
    GAMES.forEach(function(g){if(opts.skip&&opts.skip===g[0])return;var tp=g[0]+code;try{var x=window.roomClient(tp,'wss://broker.emqx.io:8084/mqtt',{clientId:'find_'+Math.random().toString(36).slice(2,10),clean:true,connectTimeout:8000});cl.push(x);
      x.on('connect',function(){x.subscribe(tp,{qos:0},function(){})});x.on('message',function(t,buf){var m;try{m=JSON.parse(buf.toString())}catch(e){return}if(m&&m.t&&m.t!=='hi'&&m.t!=='bye'&&m.t!=='in'&&m.t!=='pick')fin(g[1]+code)})}catch(e){}});
    setTimeout(function(){fin(null)},opts.timeout||6000)})};
  window.goRoomElsewhere=function(code,skipNs,lang){return window.findRoom(code,{skip:skipNs}).then(function(u){if(u){location.href=u+(lang?'&lang='+lang:'');return true}return false})};
})();
