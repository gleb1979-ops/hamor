const {chromium}=require('playwright');const fs=require('fs');const FPS=30,EP=process.env.EP||'donkey',LG=process.env.LG||'ru';(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/unpkg|googleapis|gstatic|workers\.dev|tagshim/,r=>r.abort());
await p.goto(`http://127.0.0.1:8765/_ep/ep.html?ep=${EP}&lang=${LG}`);await p.waitForFunction(()=>window.EP_READY,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const len=await p.evaluate(()=>EP_LEN);const N=Math.round(len*FPS);const dir=`ep/f_${EP}`;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
for(let i=0;i<N;i+=10){const ds=await p.evaluate(([i,FPS])=>{const o=[];for(let j=i;j<i+10;j++){renderFrame(j/FPS);o.push(document.getElementById('ep').toDataURL('image/jpeg',.9))}return o},[i,FPS]);
  ds.forEach((d,k)=>{if(i+k<N)fs.writeFileSync(dir+'/'+String(i+k).padStart(5,'0')+'.jpg',Buffer.from(d.split(',')[1],'base64'))})}
console.log('frames',N,'errs',errs);await b.close()})();
