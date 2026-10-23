/* Tagshim service worker: network-first, offline fallback from cache.
   Офлайн: никогда не отдаём «пустой» ответ — ищем страницу по-разному (с ?параметрами и без, с index.html и без),
   а если её правда нет в телефоне — показываем свою страницу «нет интернета» со ссылками на скачанные игры. */
const C='tagshim-v2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function clean(res){/* Safari не принимает для страницы ответ, полученный через переадресацию */
  if(!res||!res.redirected)return res;return res.blob().then(b=>new Response(b,{status:res.status,statusText:res.statusText,headers:res.headers}))}
async function fromCache(r){const u=new URL(r.url),p=u.pathname,c=await caches.open(C);
  const tries=[r,u.origin+p,p];
  if(p.endsWith('/'))tries.push(p+'index.html');else if(p.endsWith('/index.html'))tries.push(p.slice(0,-10));else if(!/\.[a-z0-9]+$/i.test(p))tries.push(p+'/',p+'/index.html');
  for(const t of tries){try{const m=await c.match(t,{ignoreSearch:true,ignoreVary:true});if(m)return clean(m)}catch(e){}}
  return null}
async function offlinePage(){const c=await caches.open(C),ks=await c.keys();const games=new Set();
  for(const k of ks){const m=new URL(k.url).pathname.match(/^\/([a-z0-9_-]+(?:\/[a-z0-9_-]+)?)\/(index\.html)?$/);if(m)games.add(m[1])}
  const L=[...games].sort().map(g=>`<a href="/${g}/">${g}</a>`).join('');
  return new Response(`<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Tagshim · offline</title><style>body{background:#1b1220;color:#fff6ec;font:16px system-ui,sans-serif;margin:0;padding:24px;text-align:center}h1{font-size:22px}a{display:inline-block;margin:6px;padding:10px 16px;border-radius:12px;background:#2c1f36;color:#ffc531;text-decoration:none}</style><h1>Нет интернета · No internet</h1><p>Эта страница не скачана. Скачанные игры:</p><p><a href="/">Tagshim</a>${L}</p>`,{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}})}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin||u.pathname==='/version.json')return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok&&!res.redirected){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res})
    .catch(async()=>{const m=await fromCache(r);if(m)return m;if(r.mode==='navigate'||(r.headers.get('accept')||'').includes('text/html'))return offlinePage();return new Response('',{status:504,statusText:'offline'})}))});
