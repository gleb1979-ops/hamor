/* Тагшим LAN: игра вдвоём (и больше) без интернета.
   Телефоны в одной Wi‑Fi сети (точка доступа одного из них), связь напрямую через WebRTC.
   Обмен «адресами» — через два QR-кода: хост показывает → гость сканирует → гость показывает → хост сканирует.
   LAN.host(onClient) / LAN.join(onClient) отдают объект с тем же интерфейсом, что roomClient (on/subscribe/publish/end). */
(function(){
if(window.LAN)return;
const BASE=(document.currentScript&&document.currentScript.src||'').replace(/lan\.js.*$/,'');
const RU=(()=>{try{const l=localStorage.getItem('svn_lang')||localStorage.getItem('byd-lang3')||navigator.language||'';return /^(ru|uk|be)/i.test(l)}catch(e){return true}})();
const T=RU?{
 hostT:'Игра без интернета',hostS:'1. Друг открывает игру → «Подключиться без интернета» и сканирует этот код.',hostS2:'2. Потом нажми «Сканировать ответ» и наведи камеру на код у друга.',scanA:'📷 Сканировать ответ',
 joinT:'Подключиться без интернета',joinS:'Наведи камеру на QR-код на телефоне хоста.',ansT:'Покажи этот код хосту',ansS:'Хост нажимает «Сканировать ответ» и наводит камеру сюда.',
 ok:'✔ Подключено!',more:'➕ Ещё игрок',done:'Готово',close:'Закрыть',wait:'Готовлю код…',cam:'Нужна камера, чтобы отсканировать код. Разреши доступ к камере.',
 tip:'Оба телефона должны быть в одной Wi‑Fi сети: один включает точку доступа, второй к ней подключается. Интернет не нужен.',fail:'Не удалось соединиться. Проверь, что оба в одной Wi‑Fi сети, и попробуй ещё раз.',bad:'Это не тот код. Сканируй QR из игры.',players:'Подключено игроков: '
}:{
 hostT:'Play without internet',hostS:'1. Your friend opens the game → “Join without internet” and scans this code.',hostS2:'2. Then tap “Scan answer” and point the camera at your friend’s code.',scanA:'📷 Scan answer',
 joinT:'Join without internet',joinS:'Point the camera at the QR code on the host’s phone.',ansT:'Show this code to the host',ansS:'The host taps “Scan answer” and points the camera here.',
 ok:'✔ Connected!',more:'➕ Another player',done:'Done',close:'Close',wait:'Preparing code…',cam:'The camera is needed to scan the code. Please allow camera access.',
 tip:'Both phones must be on the same Wi‑Fi: one turns on a hotspot, the other joins it. No internet needed.',fail:'Could not connect. Check both phones are on the same Wi‑Fi and try again.',bad:'Wrong code. Scan the QR from the game.',players:'Players connected: '};
function load(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=BASE+src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
const need=()=>Promise.all([window.qrcode?0:load('qrcode.js'),window.jsQR?0:load('jsQR.js')]);
/* ---- упаковка SDP в короткую строку ---- */
async function pack(o){let s=JSON.stringify(o);
 try{if(window.CompressionStream){const cs=new Blob([s]).stream().pipeThrough(new CompressionStream('deflate-raw'));const b=new Uint8Array(await new Response(cs).arrayBuffer());let bin='';for(const x of b)bin+=String.fromCharCode(x);return 'T1'+btoa(bin)}}catch(e){}
 return 'T0'+btoa(unescape(encodeURIComponent(s)))}
async function unpack(str){if(!str||str.slice(0,2)!=='T1'&&str.slice(0,2)!=='T0')throw 0;const b=str.slice(2);
 if(str[1]==='1'){const bin=atob(b),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);const ds=new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return JSON.parse(await new Response(ds).text())}
 return JSON.parse(decodeURIComponent(escape(atob(b))))}
function slim(sdp){return sdp.split('\r\n').filter(l=>l&&!/^a=(extmap|rtcp|ssrc|msid|ice-options:trickle$)/.test(l)&&!(/^a=candidate/.test(l)&&/ tcp /i.test(l))).join('\r\n')+'\r\n'}
function gathered(pc){return new Promise(ok=>{if(pc.iceGatheringState==='complete')return ok();const t=setTimeout(ok,3500);pc.addEventListener('icegatheringstatechange',()=>{if(pc.iceGatheringState==='complete'){clearTimeout(t);ok()}})})}
/* камера открыта во время создания предложения — тогда Safari/Chrome отдают настоящие локальные адреса, а не скрытые .local */
let camStream=null;async function camOn(){if(camStream)return camStream;camStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});return camStream}
function camOff(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null}}
/* ---- клиент с интерфейсом roomClient ---- */
function mkClient(isHost){const H={},peers=[];const emit=(e,...a)=>(H[e]||[]).forEach(f=>{try{f(...a)}catch(x){console.error(x)}});
 const C={lan:1,peers,on(e,f){(H[e]=H[e]||[]).push(f);return C},subscribe(t,o,cb){cb&&cb()},
  publish(t,str){for(const p of peers)if(p.dc&&p.dc.readyState==='open'){try{p.dc.send(str)}catch(e){}}},
  end(){for(const p of peers){try{p.dc&&p.dc.close()}catch(e){}try{p.pc.close()}catch(e){}}peers.length=0},
  _wire(p){const dc=p.dc;dc.onopen=()=>{p.open=1;emit('connect')};dc.onclose=()=>{p.open=0;emit('peerclose',p)};
   dc.onmessage=ev=>{emit('message','lan',ev.data);if(isHost)for(const q of peers)if(q!==p&&q.dc&&q.dc.readyState==='open'){try{q.dc.send(ev.data)}catch(e){}}}}};
 return C}
const CFG={iceServers:[]};
async function hostOffer(C){const pc=new RTCPeerConnection(CFG),dc=pc.createDataChannel('g',{ordered:true}),p={pc,dc};C.peers.push(p);C._wire(p);
 await pc.setLocalDescription(await pc.createOffer());await gathered(pc);p.code=await pack({t:'o',s:slim(pc.localDescription.sdp)});return p}
async function hostAccept(p,code){const o=await unpack(code);if(o.t!=='a')throw 0;await p.pc.setRemoteDescription({type:'answer',sdp:o.s})}
async function guestAnswer(C,code){const o=await unpack(code);if(o.t!=='o')throw 0;const pc=new RTCPeerConnection(CFG),p={pc};C.peers.push(p);
 pc.ondatachannel=e=>{p.dc=e.channel;C._wire(p);if(p.dc.readyState==='open')p.dc.onopen()};
 await pc.setRemoteDescription({type:'offer',sdp:o.s});await pc.setLocalDescription(await pc.createAnswer());await gathered(pc);return await pack({t:'a',s:slim(pc.localDescription.sdp)})}
/* ---- интерфейс ---- */
let ov=null;function panel(html){if(!ov){ov=document.createElement('div');ov.id='lanOv';ov.style.cssText='position:fixed;inset:0;z-index:2147483000;background:rgba(10,8,14,.94);color:#f3e9dc;font:600 16px system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto';document.body.appendChild(ov)}
 ov.innerHTML='<div style="max-width:440px;width:100%;text-align:center">'+html+'</div>';return ov}
function closeUI(){stopScan();camOff();if(ov){ov.remove();ov=null}}
const btn=(id,t,pri)=>`<button id="${id}" style="font:800 17px system-ui;padding:12px 18px;margin:6px;border-radius:12px;border:2px solid ${pri?'#e8b23a':'#4a3d48'};background:${pri?'#8a5a12':'#241c26'};color:#fff">${t}</button>`;
function qrHTML(s){const q=qrcode(0,'L');q.addData(s,'Byte');q.make();const n=q.getModuleCount(),cell=Math.max(3,Math.floor(Math.min(innerWidth*.86,400)/(n+8)));return '<div style="background:#fff;display:inline-block;padding:'+cell*3+'px;border-radius:12px">'+q.createImgTag(cell,0)+'</div>'}
let scanT=0,scanV=null;function stopScan(){clearInterval(scanT);scanT=0;if(scanV){scanV.srcObject=null;scanV=null}}
async function scan(box,onCode){const v=document.createElement('video');v.setAttribute('playsinline','');v.muted=true;v.style.cssText='width:100%;max-width:360px;border-radius:12px;background:#000';box.innerHTML='';box.appendChild(v);scanV=v;
 v.srcObject=await camOn();await v.play().catch(()=>{});const c=document.createElement('canvas'),g=c.getContext('2d',{willReadFrequently:true});
 scanT=setInterval(()=>{if(!v.videoWidth)return;const w=Math.min(720,v.videoWidth),h=Math.round(w*v.videoHeight/v.videoWidth);c.width=w;c.height=h;g.drawImage(v,0,0,w,h);const r=jsQR(g.getImageData(0,0,w,h).data,w,h,{inversionAttempts:'dontInvert'});if(r&&r.data){stopScan();onCode(r.data)}},180)}
const LAN={
 async host(onClient){await need();const C=mkClient(true);onClient(C);let n=0;
  const step=async()=>{panel(`<h2>${T.hostT}</h2><p>${T.wait}</p>`);try{await camOn()}catch(e){}const p=await hostOffer(C);
   panel(`<h2>${T.hostT}</h2><p style="font-size:14px;opacity:.85">${T.tip}</p><p>${T.hostS}</p>${qrHTML(p.code)}<p>${T.hostS2}</p><div id="lanScan"></div>${btn('lanA',T.scanA,1)}${btn('lanX',T.close)}`);
   document.getElementById('lanX').onclick=closeUI;
   document.getElementById('lanA').onclick=async()=>{document.getElementById('lanA').remove();try{await scan(document.getElementById('lanScan'),async code=>{try{await hostAccept(p,code)}catch(e){alert(T.bad);return step()}
     panel(`<h2>${T.wait}</h2>`);const t0=Date.now();const w=setInterval(()=>{if(p.open){clearInterval(w);n++;camOff();panel(`<h2>${T.ok}</h2><p>${T.players}${n+1}</p>${btn('lanM',T.more)}${btn('lanD',T.done,1)}`);document.getElementById('lanM').onclick=step;document.getElementById('lanD').onclick=closeUI}else if(Date.now()-t0>15000){clearInterval(w);panel(`<p>${T.fail}</p>${btn('lanR',T.more,1)}${btn('lanX2',T.close)}`);document.getElementById('lanR').onclick=step;document.getElementById('lanX2').onclick=closeUI}},250)})}catch(e){alert(T.cam)}}};
  C.more=step;step();return C},
 async join(onClient){await need();const C=mkClient(false);
  panel(`<h2>${T.joinT}</h2><p style="font-size:14px;opacity:.85">${T.tip}</p><p>${T.joinS}</p><div id="lanScan"></div>${btn('lanX',T.close)}`);document.getElementById('lanX').onclick=closeUI;
  try{await scan(document.getElementById('lanScan'),async code=>{let a;try{a=await guestAnswer(C,code)}catch(e){alert(T.bad);closeUI();return LAN.join(onClient)}camOff();
   panel(`<h2>${T.ansT}</h2><p>${T.ansS}</p>${qrHTML(a)}<p id="lanSt" style="opacity:.8">…</p>${btn('lanX',T.close)}`);document.getElementById('lanX').onclick=()=>{closeUI();C.end()};
   let done=0;C.on('connect',()=>{if(done)return;done=1;closeUI();onClient(C)});
   setTimeout(()=>{if(!done){const s=document.getElementById('lanSt');if(s)s.textContent=T.fail}},60000)})}catch(e){alert(T.cam);closeUI()}
  return C},
 close:closeUI,_t:{mkClient,hostOffer,hostAccept,guestAnswer,pack,unpack}};
window.LAN=LAN})();
