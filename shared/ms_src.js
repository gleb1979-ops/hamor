/* ===== «По мотивам Metal Slug»: живые враги, смешные нокауты, ящики и бочки с лутом, бросок, пленные, беляши, итог уровня ===== */
const MS_SV=/svinec/.test(location.pathname);
const MST=MS_SV?{hostN:'Свой',help:'ПОМОГИ!',thx:'СПАСИБО, ПАРСЕ!',join:'ВПИСАЛСЯ ЗА ТЕБЯ',food:'🥟',fat:'ОБЪЕЛСЯ ЭМПАНАД! СИЛА ×1.5',nade:'Бутылка',nadeC:'#3a7a3a',smash:'ДЗЫНЬ!'}
 :{hostN:'Свой пацан',help:'ПОМОГИ!',thx:'СПАСИБО, БРАТ!',join:'ВПИСАЛСЯ ЗА ТЕБЯ',food:'🥟',fat:'ОБЪЕЛСЯ БЕЛЯШЕЙ! СИЛА ×1.5',nade:'Кирпич',nadeC:'#9a4a32',smash:'БАХ!'};
const MSI={crate:new Image(),barrel:new Image()};MSI.crate.src='img/sn_crate.webp';MSI.barrel.src='img/sn_barrel.webp';
const MSH=[new Image(),new Image()];MSH[0].src='img/host0.webp';MSH[1].src='img/host1.webp';
const MSS={t0:0,freed:0,props:0,nades:0,food:0};
function MSON(){return G&&!G.net&&!NETU.on&&!RMODE()&&(mode==='ffa'||mode==='team'||mode==='boss')}
function msFloor(){return [Math.max(FLOOR0+60,450),FLOOR1-40]}
function msFree(x,y,list){return x>90&&x<W-90&&!OBST.some(o=>x>o.x-60&&x<o.x+o.w+60&&y>o.y-40&&y<o.y+o.h+40)&&!list.some(p=>Math.abs(p.x-x)<130&&Math.abs(p.y-y)<70)&&!G.F.some(f=>Math.abs(f.x-x)<90&&Math.abs(f.y-y)<50)}
function msInit(){if(!MSON()){G.ms=null;return}
 if((G.round||1)<=1)Object.assign(MSS,{t0:performance.now(),freed:0,props:0,nades:0,food:0});
 const M=G.ms={props:[],host:null,proj:[],fx:[],items:[],nades:3,noise:0};const [y0,y1]=msFloor();
 const n=2+(Math.random()*3|0);for(let k=0,tries=0;k<n&&tries<60;tries++){const x=rnd(330,W-160),y=rnd(y0,y1);if(!msFree(x,y,M.props))continue;
  const b=Math.random()<.4;M.props.push(b?{k:'barrel',x,y,w:58,h:104,hp:2}:{k:'crate',x,y,w:96,h:92,hp:3});k++}
 /* пленный */
 if(Math.random()<.75){for(let tries=0;tries<40;tries++){const x=rnd(520,W-140),y=rnd(y0,y1);if(!msFree(x,y,M.props))continue;
   const used=new Set(G.F.map(f=>f.hero));let hs=Object.keys(HEROES).map(Number).filter(h=>!used.has(h)&&HEROES[h]&&!HEROES[h].girl);if(!hs.length)hs=Object.keys(HEROES).map(Number).filter(h=>h!==myHero);const hero=hs[Math.random()*hs.length|0];
   const f=newFighter(90,hero,true,0);Object.assign(f,{x,y,face:-1,state:'idle',noHud:true,name:MST.hostN,anim:0});M.host={f,x,y,freed:0,t:0,img:Math.random()*2|0};break}}
 /* живые враги: часть ещё не заметила тебя */
 const me=G.F[0];for(const f of G.F){if(f===me||f.ally||f.boss||f.npc||sideOf(f)===sideOf(me))continue;if(Math.abs(f.x-me.x)>380&&Math.random()<.6){f.idleK=['smoke','chat','sleep'][Math.random()*3|0];f.alert=0}}}
function msAlert(f,why){if(!f.idleK||f.alert)return;f.alert=1;G.FX.push({x:f.x,y:f.y-200,t:0,life:.8,txt:'!',c:'#ff4040',big:1});if(why!=='q')SFX.whoosh()}
function msBoom(x,y,by){shake=Math.max(shake,12);SFX.heavy();G.FX.push({x,y:y-120,t:0,life:.8,txt:'БАХ!',c:'#ff9a3a',big:1});
 for(let i=0;i<16;i++)G.FX.push({x:x+rnd(-20,20),y:y-50,vx:rnd(-320,320),vy:rnd(-420,-80),life:rnd(.5,.9),t:0,c:Math.random()<.5?'#ffb43a':'#5a5a5a',s:rnd(4,9)});
 G.FX.push({x,y,t:0,life:.5,ring:1,c:'rgba(255,160,60,.8)'});
 for(const f of G.F)if(f!==by&&f.state!=='ko'&&Math.abs(f.x-x)<120&&Math.abs(f.y-y)<55){damage(by||G.F[0],f,18,320,true);if(f.state!=='ko'&&!f.boss)forceDown(f)}
 for(const p of G.ms.props)if(p.hp>0&&Math.hypot(p.x-x,(p.y-y)*1.6)<130&&p.k==='barrel')setTimeout(()=>{if(G&&G.ms&&p.hp>0){p.hp=0;msBreak(p,by)}},180)}
function msLoot(x,y){const r=Math.random();
 if(r<.22){G.ms.items.push({k:'food',x,y,t:0});return}
 const L=r<.5?['kefir','kefir']:r<.8?['bat','stick','knux','bottle','chain']:['pistol','obrez'];const k=L[Math.random()*L.length|0];if(WEAPONS[k])G.P.push({k,x,y,t:0})}
function msBreak(p,by){MSS.props++;if(p.k==='barrel')return msBoom(p.x,p.y,by);
 SFX.hit();shake=Math.max(shake,5);for(let i=0;i<12;i++)G.FX.push({x:p.x+rnd(-30,30),y:p.y-50,vx:rnd(-260,260),vy:rnd(-380,-120),life:rnd(.5,.8),t:0,c:Math.random()<.5?'#8a5a2a':'#c08a4a',s:rnd(4,8)});msLoot(p.x,p.y)}
function msHitProp(p,dmg,by){if(p.hp<=0)return;p.hp-=dmg;p.shk=.15;if(p.hp<=0){p.hp=0;msBreak(p,by)}else{SFX.hit();G.FX.push({x:p.x+rnd(-20,20),y:p.y-60,vx:rnd(-120,120),vy:rnd(-200,-80),life:.4,t:0,c:'#c08a4a',s:4})}}
function msFreeHost(){const H=G.ms.host;if(!H||H.freed)return;H.freed=1;MSS.freed++;SFX.bell&&SFX.bell();const f=H.f;
 G.FX.push({x:H.x,y:H.y-210,t:0,life:1.6,txt:MST.thx,c:'#7cf07c',big:1});
 for(let i=0;i<6;i++)G.FX.push({x:H.x,y:H.y-90,vx:rnd(-160,160),vy:rnd(-260,-100),life:.6,t:0,c:'#c8a060',s:4});
 if(mode==='team'||mode==='boss'){const a=newFighter(G.F.length,f.hero,true,G.F[0].team||0);Object.assign(a,{x:H.x,y:H.y,face:1,ally:true,name:MST.hostN});a.hp=a.max=Math.round(a.max*.7);G.F.push(a);G.ms.host=null;setTimeout(()=>{if(G&&G.FX)G.FX.push({x:a.x,y:a.y-190,t:0,life:1.5,txt:MST.join,c:'#7cf07c',big:1})},700)}
 else{msLoot(H.x+40,H.y);msLoot(H.x-40,H.y+10);H.run=1}}
function msThrow(){const M=G&&G.ms,me=G&&G.F[0];if(!M||state!=='play'||!me||me.state==='ko'||M.nades<=0||M.cdT>0)return;M.nades--;M.cdT=.5;MSS.nades++;SFX.whoosh();
 me.atkT=me.atkDur=.28;M.proj.push({x:me.x+me.face*40,y:me.y,z:150,vx:me.face*560,vz:240,r:0,by:me});G.FX.push({x:me.x+me.face*30,y:me.y-200,t:0,life:.5,txt:MS_SV?'¡TOMA!':'НА!',c:'#ffd23f'})}
function msTick(dt){const M=G.ms;if(!M)return;const me=G.F[0];M.cdT=Math.max(0,(M.cdT||0)-dt);
 /* столкновения с ящиками */
 for(const p of M.props){if(p.hp<=0)continue;p.shk=Math.max(0,(p.shk||0)-dt);for(const f of G.F){if(f.state==='ko'||f.onBoard)continue;const dx=f.x-p.x,dy=f.y-p.y;if(Math.abs(dx)<p.w/2+16&&Math.abs(dy)<20){f.x=p.x+Math.sign(dx||1)*(p.w/2+16)}}}
 if(M.host&&!M.host.freed)for(const f of G.F){const dx=f.x-M.host.x,dy=f.y-M.host.y;if(f.state!=='ko'&&Math.abs(dx)<44&&Math.abs(dy)<18)f.x=M.host.x+Math.sign(dx||1)*44}
 /* удары по ящикам и по верёвкам */
 for(const f of G.F){const st=f.atkT>0||f.kickT>0;if(st&&!f._msA&&f.state!=='ko'){const w=WEAPONS[f.weapon]||WEAPONS.fist,rg=(w.gun?70:(w.range||58))+30;
   for(const p of M.props){if(p.hp<=0)continue;const d=(p.x-f.x)*f.face;if(d>-30&&d<rg+p.w/2+30&&Math.abs(p.y-f.y)<75)msHitProp(p,f.kickT>0||w.dmg>12?2:1,f)}
   if(f===me&&M.host&&!M.host.freed){const d=(M.host.x-f.x)*f.face;if(d>-10&&d<rg+30&&Math.abs(M.host.y-f.y)<44)msFreeHost()}}f._msA=st}
 /* пули по ящикам */
 for(let i=G.B.length-1;i>=0;i--){const b=G.B[i];for(const p of M.props)if(p.hp>0&&Math.abs(b.x-p.x)<p.w/2&&Math.abs((b.yy||b.y)-p.y)<34){msHitProp(p,b.salt?1:2,b.o);G.B.splice(i,1);break}}
 /* бросок */
 for(let i=M.proj.length-1;i>=0;i--){const q=M.proj[i];q.x+=q.vx*dt;q.z+=q.vz*dt;q.vz-=900*dt;q.r+=dt*14;
  let hit=q.z<=0||q.x<20||q.x>W-20;for(const p of M.props)if(p.hp>0&&Math.abs(q.x-p.x)<p.w/2&&Math.abs(q.y-p.y)<30&&q.z<p.h){msHitProp(p,3,q.by);hit=true}
  for(const f of G.F)if(f!==q.by&&f.state!=='ko'&&sideOf(f)!==sideOf(q.by)&&Math.abs(f.x-q.x)<40&&Math.abs(f.y-q.y)<30&&q.z<170)hit=true;
  if(hit){M.proj.splice(i,1);G.FX.push({x:q.x,y:q.y-q.z-20,t:0,life:.6,txt:MST.smash,c:'#ffd23f'});for(let k=0;k<8;k++)G.FX.push({x:q.x,y:q.y-Math.max(10,q.z),vx:rnd(-200,200),vy:rnd(-260,-60),life:.5,t:0,c:MST.nadeC,s:rnd(3,6)});
   for(const f of G.F)if(f!==q.by&&f.state!=='ko'&&sideOf(f)!==sideOf(q.by)&&Math.abs(f.x-q.x)<80&&Math.abs(f.y-q.y)<45){damage(q.by,f,16,240,true)}}}
 /* беляши */
 for(let i=M.items.length-1;i>=0;i--){const it=M.items[i];it.t+=dt;if(it.t>14){M.items.splice(i,1);continue}
  if(me.state!=='ko'&&Math.abs(me.x-it.x)<44&&Math.abs(me.y-it.y)<28){M.items.splice(i,1);MSS.food++;if(!me.fatT){me._bs0=me.bscale||1;me._mp0=me.mPow||1}me.fatT=12;me.bscale=me._bs0*1.22;me.mPow=me._mp0*1.5;me.hp=Math.min(me.max,me.hp+15);SFX.pick();G.FX.push({x:me.x,y:me.y-200,t:0,life:1.6,txt:MST.fat,c:'#ffb43a',big:1})}}
 if(me.fatT>0){me.fatT-=dt;if(me.fatT<=0){me.fatT=0;me.bscale=me._bs0;me.mPow=me._mp0}}
 /* пленный */
 if(M.host){M.host.t+=dt;M.host.f.anim+=dt;if(M.host.run){M.host.x+=dt*260*(M.host.x>W/2?1:-1);M.host.f.state='walk';M.host.f.face=M.host.x>W/2?1:-1;M.host.f.x=M.host.x;if(M.host.x<-80||M.host.x>W+80)M.host=null}}
 /* смешные нокауты */
 for(const f of G.F)if(f.flyT!=null){f.flyT+=dt;if(f.flyT>1.1)f.flyT=null}
 for(let i=M.fx.length-1;i>=0;i--){const c=M.fx[i];c.t+=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.vy+=700*dt;c.r+=dt*9;if(c.t>1.4)M.fx.splice(i,1)}
 if(M.noise>0)M.noise-=dt}
/* ---- обёртки ---- */
{const _nr=newRound;newRound=function(){const r=_nr.apply(this,arguments);try{if(G&&!RMODE())msInit()}catch(e){console.error(e)}return r}}
{const _up=update;update=function(dt){const r=_up.apply(this,arguments);try{if(G&&G.ms&&state==='play'&&!(G.hs>0))msTick(dt)}catch(e){console.error(e)}return r}}
{const _dm=damage;damage=function(a,b){const was=b&&b.state==='ko';const r=_dm.apply(this,arguments);
 try{if(G&&G.ms&&b){/* шум будит соседей */for(const f of G.F)if(f.idleK&&!f.alert&&Math.hypot(f.x-b.x,f.y-b.y)<480)msAlert(f,'q');if(b.idleK)msAlert(b,'q');
  if(!was&&b.state==='ko'&&b!==G.F[0]&&!b.boss&&Math.random()<.25){b.flyT=0;b.flyS=a&&a.face||1;const cap=MS_SV?'🎩':'🧢';G.ms.fx.push({x:b.x,y:b.y-190,vx:(a&&a.face||1)*rnd(120,220),vy:-rnd(380,520),t:0,r:0,txt:cap});G.FX.push({x:b.x,y:b.y-230,t:0,life:1,txt:'В НОКАУТ!',c:'#ffd23f',big:1})}}}catch(e){console.error(e)}return r}}
{const _bt=botThink;botThink=function(f,dt){try{if(G&&G.ms&&!f.ally){const me=G.F[0],d=Math.hypot(me.x-f.x,(me.y-f.y)*1.5);
  if(f.idleK&&!f.alert){if(d<(f.idleK==='sleep'?160:260)||f.hp<f.max)msAlert(f);else{f.state='idle';f.anim+=dt;return [0,0]}}
  const mw=WEAPONS[me.weapon];if(mw&&mw.gun&&me.ammo>0&&!f.boss&&!(WEAPONS[f.weapon]&&WEAPONS[f.weapon].gun)){f.pnc=(f.pnc||0)-dt;if(f.pnc<=0){f.pnc=1.3;if(d<440&&Math.random()<.28){f.panicT=1.3;G.FX.push({x:f.x,y:f.y-200,t:0,life:.8,txt:'А-А-А!',c:'#ff9ad0'})}}}
  if(f.panicT>0){f.panicT-=dt;return [Math.sign(f.x-me.x)||1,(Math.random()-.5)*.6]}}}catch(e){console.error(e)}return _bt.apply(this,arguments)}}
function msDrawProp(g,p,t){const im=MSI[p.k];g.save();if(p.shk>0)g.translate((Math.random()-.5)*6,0);
 g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(p.x,p.y,p.w*.6,12,0,0,TAU);g.fill();
 const cr=p.k==='crate'&&p.hp<3?(3-p.hp)*.06:0;
 if(im.complete&&im.naturalWidth){const ww=im.naturalWidth*p.h/im.naturalHeight;g.drawImage(im,p.x-ww/2,p.y-p.h+4,ww,p.h);if(cr){g.strokeStyle='rgba(30,15,5,.8)';g.lineWidth=2;g.beginPath();g.moveTo(p.x-10,p.y-p.h*.8);g.lineTo(p.x+6,p.y-p.h*.5);g.lineTo(p.x-4,p.y-p.h*.25);g.stroke()}}
 else{rr(g,p.x-p.w/2,p.y-p.h,p.w,p.h,4,p.k==='barrel'?'#3e5a7a':'#9a6e3c',3)}
 if(p.k==='barrel'&&p.hp<2){g.fillStyle='rgba(255,140,40,'+(.5+.4*Math.sin(t*20))+')';g.beginPath();g.arc(p.x,p.y-p.h-6,7,0,TAU);g.fill()}
 g.restore()}
function msDrawHost(g,H,t){const f=H.f;f.x=H.x;f.y=H.y;if(H.run){_dfMS(g,f,t);return}
 const im=MSH[H.img];if(im&&im.complete&&im.naturalWidth){const hh=150*FIGS*.78,ww=im.naturalWidth*hh/im.naturalHeight,wob=Math.sin(t*7)*.03;
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(H.x,H.y,ww*.45,11,0,0,TAU);g.fill();
  g.save();g.translate(H.x,H.y);g.rotate(wob);g.drawImage(im,-ww/2,-hh+6,ww,hh);g.restore();
  const by=H.y-hh-26+Math.sin(t*4)*4;rr(g,H.x-62,by-26,124,34,10,'rgba(255,255,255,.92)',0);g.fillStyle='rgba(255,255,255,.92)';g.beginPath();g.moveTo(H.x-8,by+8);g.lineTo(H.x+6,by+8);g.lineTo(H.x-6,by+20);g.fill();
  g.fillStyle='#c8202a';g.font='900 18px Impact,sans-serif';g.textAlign='center';g.fillText(MST.help,H.x,by-2);return}
 g.save();g.globalAlpha=.96;_dfMS(g,f,t);g.restore();
 const k=(f.bscale||1)*FIGS;g.strokeStyle='#c8a060';g.lineWidth=5;g.lineCap='round';
 for(const yy of [62,96,128]){g.beginPath();g.moveTo(H.x-24*k,H.y-yy*k);g.quadraticCurveTo(H.x,H.y-yy*k+8,H.x+24*k,H.y-yy*k-4);g.stroke()}
 g.strokeStyle='#6a4a20';g.lineWidth=2;g.beginPath();g.moveTo(H.x+22*k,H.y-96*k);g.lineTo(H.x+34*k,H.y-80*k);g.stroke();
 const by=H.y-205*k+Math.sin(t*4)*4;g.fillStyle='rgba(255,255,255,.92)';rr(g,H.x-62,by-26,124,34,10,'rgba(255,255,255,.92)',0);g.beginPath();g.moveTo(H.x-8,by+8);g.lineTo(H.x+6,by+8);g.lineTo(H.x-6,by+20);g.fill();
 g.fillStyle='#c8202a';g.font='900 18px Impact,sans-serif';g.textAlign='center';g.fillText(MST.help,H.x,by-2)}
let _dfMS;{const _df=drawFighter;_dfMS=_df;drawFighter=function(g,f,t){
 if(G&&G.ms&&g===ctx&&state==='play'){const M=G.ms;M._dr=M._dr||new Set();
  for(const p of M.props)if(p.hp>0&&!M._dr.has(p)&&p.y<=f.y){M._dr.add(p);msDrawProp(g,p,t)}
  if(M.host&&!M._dr.has(M.host)&&M.host.y<=f.y){M._dr.add(M.host);msDrawHost(g,M.host,t)}}
 if(f.flyT!=null){const k=Math.min(1,f.flyT/1.1);g.save();g.translate(f.x+f.flyS*k*120,f.y-Math.sin(Math.PI*k)*170);g.rotate(f.flyS*k*Math.PI*2.2);g.translate(-f.x,-f.y);const r=_df.apply(this,arguments);g.restore();return r}
 const r=_df.apply(this,arguments);
 if(f.idleK&&!f.alert&&f.state!=='ko'&&G&&G.ms){const hx=f.x+f.face*16,hy=f.y-150*(f.bscale||1)*FIGS*.98;g.save();
  if(f.idleK==='smoke'){g.fillStyle='#ff7a2a';g.beginPath();g.arc(f.x+f.face*30,hy+22,3,0,TAU);g.fill();for(let i=0;i<3;i++){const k=((t*.5+i/3+f.idx*.37)%1);g.fillStyle=`rgba(210,210,210,${.5*(1-k)})`;g.beginPath();g.arc(f.x+f.face*30+Math.sin(k*6+i)*8,hy+16-k*60,4+k*10,0,TAU);g.fill()}}
  else if(f.idleK==='sleep'){g.fillStyle='#cfe0ff';g.font='900 22px Impact,sans-serif';g.textAlign='center';for(let i=0;i<3;i++){const k=((t*.4+i/3)%1);g.globalAlpha=1-k;g.fillText('z',hx+k*26,hy-10-k*40)}}
  else{g.fillStyle='rgba(255,255,255,.9)';rr(g,hx-22,hy-44,44,26,10,'rgba(255,255,255,.9)',0);g.fillStyle='#333';for(let i=0;i<3;i++){g.globalAlpha=.35+.65*((Math.sin(t*6-i)+1)/2);g.beginPath();g.arc(hx-10+i*10,hy-31,3,0,TAU);g.fill()}}
  g.restore()}
 return r}}
{const _rd=render;render=function(t){if(G&&G.ms)G.ms._dr=new Set();const r=_rd.apply(this,arguments);
 try{const M=G&&G.ms;if(M&&state==='play'){const g=ctx;
  for(const p of M.props)if(p.hp>0&&!M._dr.has(p))msDrawProp(g,p,t);if(M.host&&!M._dr.has(M.host))msDrawHost(g,M.host,t);
  for(const it of M.items){const b=Math.sin(t*5+it.x)*4;g.save();g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(it.x,it.y,18,6,0,0,TAU);g.fill();g.font='34px sans-serif';g.textAlign='center';g.globalAlpha=it.t>11?(Math.sin(t*20)>0?1:.3):1;g.fillText(MST.food,it.x,it.y-12+b);g.restore()}
  for(const q of M.proj){g.save();g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(q.x,q.y,16,6,0,0,TAU);g.fill();
   for(let k=1;k<=4;k++){const tx=q.x-q.vx*k*.025,tz=q.z-(q.vz+900*k*.025/2)*k*.025;g.globalAlpha=.16*(5-k)/4;g.fillStyle='#fff';g.beginPath();g.arc(tx,q.y-tz,9-k,0,TAU);g.fill()}g.globalAlpha=1;
   g.translate(q.x,q.y-q.z);g.rotate(q.r);g.lineWidth=3;g.strokeStyle='#fff';
   if(MS_SV){g.fillStyle=MST.nadeC;g.beginPath();g.rect(-8,-20,16,30);g.rect(-4,-31,8,12);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.45)';g.fillRect(-5,-16,4,20)}
   else{g.fillStyle=MST.nadeC;g.beginPath();g.rect(-20,-10,40,20);g.fill();g.stroke();g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-20,2,40,3);g.fillStyle='rgba(255,255,255,.25)';g.fillRect(-18,-8,36,3)}g.restore()}
  for(const c of M.fx){g.save();g.globalAlpha=Math.max(0,1-c.t/1.4);g.translate(c.x,c.y);g.rotate(c.r);g.font='34px sans-serif';g.textAlign='center';g.fillText(c.txt,0,0);g.restore()}
  const me=G.F[0];if(me&&!IS_TOUCH){g.save();g.fillStyle='rgba(0,0,0,.55)';g.fillRect(16,104,150,24);g.font='bold 14px system-ui';g.textAlign='left';g.fillStyle='#f3e9dc';g.fillText(MST.nade+' ×'+M.nades+' · T',24,121);g.restore()}
  const bt=document.getElementById('bT');if(bt){const s=bt.querySelector('small');if(s)s.textContent='×'+M.nades}}
  }catch(e){console.error(e)}return r}}
setInterval(()=>{const sn=state==='kpzsneak';for(const id of ['bB','bC','bD','bE','bK']){const e=document.getElementById(id);if(e){const v=sn?'hidden':'';if(e.style.visibility!==v)e.style.visibility=v}}const bt=document.getElementById('bT');if(!bt)return;const on=IS_TOUCH&&state==='play'&&G&&G.ms;const dv=on?'flex':'none';if(bt.style.display!==dv)bt.style.display=dv},250);
addEventListener('keydown',e=>{if(e.code==='KeyT'&&!e.repeat&&state==='play'&&G&&G.ms){e.preventDefault();msThrow()}});
{const tc=document.getElementById('touch');if(tc&&!document.getElementById('bT')){const b=document.createElement('div');b.className='tb';b.id='bT';b.hidden=true;b.innerHTML=(MS_SV?'🍾':'🧱')+'<small>×3</small>';
 b.style.cssText='right:calc(var(--sr) + min(92px,21vmin) + 22px);bottom:calc(30px + min(80px,18vmin));width:min(58px,13vmin);height:min(58px,13vmin);font-size:22px;background:rgba(160,110,40,.6);display:none;flex-direction:column;align-items:center;justify-content:center';
 b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();msThrow()});tc.appendChild(b)}}
function msEnd(won){if(!MSS.t0||!(mode==='ffa'||mode==='team'||mode==='boss')||NETU.on)return '';const sec=Math.round((performance.now()-MSS.t0)/1000),me=G&&G.F[0];
 let st=won?1:0;if(won&&me&&me.hp>me.max*.4)st++;if(won&&(sec<150||MSS.freed>0))st++;
 const bonus=won?st*10+MSS.freed*15:0;if(bonus)gainKap(bonus);MSS.t0=0;
 return `<p class="sub" style="font-size:22px;letter-spacing:2px">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</p><p class="sub">Время ${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')} · спасено своих: ${MSS.freed} · разбито ящиков и бочек: ${MSS.props}${bonus?' · бонус <i class="kp"></i> +'+bonus:''}</p>`}
/* ===== /Metal Slug ===== */
