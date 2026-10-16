const {chromium}=require('playwright');const EP=process.env.EP||'donkey',LG=process.env.LG||'ru';const times=process.argv.slice(2).map(Number);(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/unpkg|googleapis|gstatic|workers\.dev|tagshim/,r=>r.abort());
await p.goto(`http://127.0.0.1:8765/_ep/ep.html?ep=${EP}&lang=${LG}`);await p.waitForFunction(()=>window.EP_READY,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
for(const t of times){await p.evaluate(t=>renderFrame(t),t);const d=await p.evaluate(()=>document.getElementById('ep').toDataURL('image/jpeg',.85));require('fs').writeFileSync(`ep/${EP}_k_${t}.jpg`,Buffer.from(d.split(',')[1],'base64'))}
console.log('errs',errs);await b.close()})();
