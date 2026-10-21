/* ---------- ПОГОНЯ: машина едет сама, ты отстреливаешься назад ---------- */
const CHS=[ // 4 участка дороги
 {n:'ГОРОД',t:38,sky:['#0b0d22','#3a1d4a','#c2457a'],gnd:'#20202a',road:'#2c2c34',side:'#3a3440',prop:'lamp',types:['sedan','sedan','bike']},
 {n:'ПОРТ',t:40,sky:['#08122a','#173a5c','#3f7aa0'],gnd:'#2a2e36',road:'#33363e',side:'#4a4a50',prop:'crane',types:['sedan','bike','bike','jeep']},
 {n:'ШОССЕ У МОРЯ',t:42,sky:['#2a1240','#c8455a','#ffb347'],gnd:'#c9a66b',road:'#3a3a3e',side:'#d8c08a',prop:'palm',types:['jeep','sedan','bike','jeep']},
 {n:'СЕРПАНТИН',t:40,sky:['#0c1a14','#1f4a34','#6aa36a'],gnd:'#2a4a2a',road:'#3a3830',side:'#4a6a3a',prop:'tree',types:['jeep','bike','sedan','jeep'],boss:1}];
const CHT={sedan:{hp:110,w:2.0,h:1.45,c:['#7a1f24','#2a3a6a','#c8b07a','#2f5a3a'],spd:1,fire:[1.3,2.4],dmg:[4,7]},
 bike:{hp:50,w:.9,h:1.5,c:['#1a1a1a','#8a2020'],spd:1.4,fire:[1.6,2.8],dmg:[3,5]},
 jeep:{hp:190,w:2.2,h:1.8,c:['#3a4a2a','#1e1e1e','#e8e0d0'],spd:.9,fire:[1.1,2],dmg:[5,8]},
 truck:{hp:900,w:2.8,h:3.0,c:['#5a2a1a'],spd:.75,fire:[.6,1.1],dmg:[5,9]}};
const CHIMG=[0,1,2,3].map(i=>{const m=new Image();m.src='img/ch_bg'+i+'.webp';return m});
const CHCAR={};for(const k of ['sedan','bike','jeep','truck']){const m=new Image();m.src='img/ch_'+k+'.webp';CHCAR[k]=m}
let CHZ=null;const CH_F=720,CH_HOR=300,CH_CAM=1.55;
function chaseBegin(){au();state='chase';$ui.hidden=true;document.getElementById('mb').hidden=false;document.getElementById('touch').hidden=true;
 CHZ={sec:0,secT:0,t:0,dist:0,spd:28,hp:100,max:100,ammo:20,clip:20,rl:0,cd:0,fire:false,ax:W/2,ay:H*.45,E:[],FX:[],cracks:[],kills:0,spawnT:1.5,over:0,overT:0,banner:2.6,shake:0,boss:null,tracers:[],seed:Math.random()*1000}}
function chOff(z){const f=w=>9*Math.sin(w*.0042+CHZ.seed)+5*Math.sin(w*.011+CHZ.seed*2),d=CHZ.dist,df=(f(d+.5)-f(d-.5));return f(d-z)-f(d)+df*z}
function chProj(x,z){const s=CH_F/z;return{x:W/2+(chOff(z)+x)*s,y:CH_HOR+CH_CAM*s,s}}
function chSpawn(type){const T=CHT[type],e={type,hp:T.hp,max:T.hp,x:(Math.random()*2-1)*3.2,z:120+Math.random()*30,tz:type==='truck'?16:12+Math.random()*20,ph:Math.random()*6,ft:1.5+Math.random()*2,col:T.c[Math.random()*T.c.length|0],dead:0,flash:0,hitT:0,spin:0};CHZ.E.push(e);return e}
function chRect(e){const T=CHT[e.type],p=chProj(e.x,e.z),w=T.w*p.s,h=T.h*p.s;return{x:p.x-w/2,y:p.y-h,w,h,p}}
function chTick(dt){const Z=CHZ;if(!Z)return;Z.t+=dt;if(Z.banner>0)Z.banner-=dt;Z.shake=Math.max(0,Z.shake-dt*3);
 if(Z.over){Z.overT+=dt;Z.dist+=Z.spd*dt*(Z.over>0?1:.3);for(const e of Z.E)e.z+=dt*20;if(Z.overT>2.4&&Z.over!==9){const w=Z.over>0;Z.over=9;chEnd(w)}return}
 const S=CHS[Z.sec];Z.secT+=dt;Z.dist+=Z.spd*dt;
 // спавн
 const alive=Z.E.filter(e=>!e.dead).length,maxN=Z.sec===0?2:3;Z.spawnT-=dt;
 if(Z.spawnT<=0&&alive<maxN&&Z.secT<S.t&&!Z.boss){chSpawn(S.types[Math.random()*S.types.length|0]);Z.spawnT=2.2+Math.random()*2.5-Z.sec*.3}
 if(S.boss&&Z.secT>=S.t*.55&&!Z.boss){Z.boss=chSpawn('truck');Z.boss.boss=1;Z.banner=2.2;Z.bossMsg=1}
 // враги
 for(const e of Z.E){const T=CHT[e.type];
  if(e.dead){e.z+=dt*(18+e.spin*10);e.spin+=dt;e.x+=dt*e.dx;continue}
  e.ph+=dt*T.spd;e.z+=(e.tz-e.z)*Math.min(1,dt*.6*T.spd);if(Math.random()<dt*.25)e.tz=(e.type==='truck'?13:10)+Math.random()*(e.type==='truck'?8:22);
  e.x+=(Math.sin(e.ph*.9)*2.6-e.x)*dt*.8*T.spd;e.flash=Math.max(0,e.flash-dt);e.hitT=Math.max(0,e.hitT-dt);
  if(e.z<55){e.ft-=dt;if(e.ft<=0){e.ft=T.fire[0]+Math.random()*(T.fire[1]-T.fire[0]);e.flash=.12;noise(.14,1400,.25);
   const p=chProj(e.x,e.z);Z.tracers.push({x0:p.x,y0:p.y-CHT[e.type].h*p.s*.6,x1:W/2+(Math.random()*2-1)*420,y1:H*.55+Math.random()*120,t:.12});
   if(Math.random()<Math.max(.25,.75-e.z/70)){const d=T.dmg[0]+Math.random()*(T.dmg[1]-T.dmg[0]);Z.hp-=d;Z.shake=Math.min(1,Z.shake+.5);tone(140,.08,'square',.12,60);
    if(Math.random()<.5)Z.cracks.push({x:140+Math.random()*(W-280),y:H*.22+Math.random()*H*.42,r:30+Math.random()*40,t:7,s:Math.random()*6})}}}}
 Z.E=Z.E.filter(e=>e.z<200);
 for(const c of Z.cracks)c.t-=dt;Z.cracks=Z.cracks.filter(c=>c.t>0);for(const f of Z.FX)f.t+=dt;Z.FX=Z.FX.filter(f=>f.t<f.life);for(const r of Z.tracers)r.t-=dt;Z.tracers=Z.tracers.filter(r=>r.t>0);
 // стрельба
 Z.cd-=dt;if(Z.rl>0){Z.rl-=dt;if(Z.rl<=0){Z.ammo=Z.clip;tone(700,.05,'square',.08)}}
 if(Z.fire&&Z.cd<=0&&Z.rl<=0){if(Z.ammo<=0){Z.rl=1.3;tone(300,.06,'square',.08)}else{Z.ammo--;Z.cd=.11;SFX.shot();Z.shake=Math.min(1,Z.shake+.08);
  const ax=Z.ax+(Math.random()*2-1)*7,ay=Z.ay+(Math.random()*2-1)*7;Z.tracers.push({x0:W/2+80,y0:H-40,x1:ax,y1:ay,t:.06,me:1});
  let best=null;for(const e of Z.E){if(e.dead)continue;const r=chRect(e);if(ax>r.x&&ax<r.x+r.w&&ay>r.y&&ay<r.y+r.h&&(!best||e.z<best.z))best=e}
  if(best){const r=chRect(best),glass=ay<r.y+r.h*.45;best.hp-=glass?18:10;best.hitT=.08;Z.FX.push({x:ax,y:ay,t:0,life:.25,k:glass?'glass':'spark'});
   if(best.hp<=0){best.dead=1;best.dx=(Math.random()*2-1)*3;Z.kills++;SFX.heavy();Z.FX.push({x:r.x+r.w/2,y:r.y+r.h/2,t:0,life:1.1,k:'boom',s:r.w});if(best.boss){Z.boss=null;Z.bossDead=1}}}
  if(Z.ammo<=0)Z.rl=1.3}}
 if(Z.hp<=0){Z.hp=0;Z.over=-1;SFX.ko();return}
 // конец участка
 const clear=!Z.E.some(e=>!e.dead&&e.z<90);
 if(Z.secT>=S.t&&(!S.boss||Z.bossDead)&&clear){if(Z.sec===CHS.length-1){Z.over=1;SFX.bell()}else{Z.sec++;Z.secT=0;Z.banner=2.6;Z.hp=Math.min(Z.max,Z.hp+25);SFX.bell();Z.E=Z.E.filter(e=>e.dead)}}}
function chDrawCar(g,e){const r=chRect(e),T=CHT[e.type],img=CHCAR[e.type];g.save();
 if(e.dead){g.translate(r.x+r.w/2,r.y+r.h/2);g.rotate(Math.sin(e.spin*3)*.5);g.translate(-r.x-r.w/2,-r.y-r.h/2);g.globalAlpha=Math.max(0,1-e.spin*.5)}
 if(img&&img.complete&&img.naturalWidth){const ih=r.w*img.naturalHeight/img.naturalWidth;g.drawImage(img,r.x,r.y+r.h-ih,r.w,ih)}
 else{const x=r.x,y=r.y,w=r.w,h=r.h;
  if(e.type==='bike'){g.fillStyle='#111';g.fillRect(x+w*.38,y+h*.55,w*.24,h*.45);g.fillStyle=e.col;g.fillRect(x+w*.15,y+h*.45,w*.7,h*.22);g.fillStyle='#2a2a2a';g.beginPath();g.ellipse(x+w*.5,y+h*.28,w*.28,h*.17,0,0,7);g.fill();g.fillStyle='#e8c070';g.beginPath();g.arc(x+w*.5,y+h*.62,w*.12,0,7);g.fill()}
  else{g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-w*.05,y+h*.92,w*1.1,h*.1);
   g.fillStyle=e.col;g.beginPath();g.moveTo(x+w*.18,y+h*.08);g.lineTo(x+w*.82,y+h*.08);g.lineTo(x+w*.95,y+h*.48);g.lineTo(x+w,y+h*.55);g.lineTo(x+w,y+h*.92);g.lineTo(x,y+h*.92);g.lineTo(x,y+h*.55);g.lineTo(x+w*.05,y+h*.48);g.closePath();g.fill();
   g.fillStyle='#1a2a3a';g.beginPath();g.moveTo(x+w*.22,y+h*.13);g.lineTo(x+w*.78,y+h*.13);g.lineTo(x+w*.88,y+h*.45);g.lineTo(x+w*.12,y+h*.45);g.closePath();g.fill();
   g.fillStyle='#0a0a0a';g.beginPath();g.arc(x+w*.36,y+h*.3,w*.07,0,7);g.arc(x+w*.64,y+h*.3,w*.07,0,7);g.fill();
   g.fillStyle='#222';g.fillRect(x+w*.3,y+h*.62,w*.4,h*.14);g.fillStyle='#ffe9a0';g.fillRect(x+w*.06,y+h*.6,w*.16,h*.1);g.fillRect(x+w*.78,y+h*.6,w*.16,h*.1);
   g.fillStyle='#111';g.fillRect(x+w*.04,y+h*.86,w*.18,h*.12);g.fillRect(x+w*.78,y+h*.86,w*.18,h*.12);
   if(e.type==='truck'){g.fillStyle='#aaa';g.fillRect(x+w*.1,y-h*.05,w*.8,h*.08);g.fillStyle='#ddd';g.font='bold '+Math.max(10,w*.09|0)+'px sans-serif';g.textAlign='center';g.fillText('CALERO',x+w/2,y+h*.84)}}}
 if(e.hitT>0){g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,255,255,.35)';g.fillRect(r.x,r.y,r.w,r.h)}
 g.restore();
 if(e.flash>0&&!e.dead){g.fillStyle='rgba(255,220,120,.95)';g.beginPath();g.arc(r.x+r.w*(e.type==='bike'?.75:.95),r.y+r.h*.42,Math.max(6,r.w*.12),0,7);g.fill()}
 if(!e.dead&&(e.max>150||e.hp<e.max)){g.fillStyle='rgba(0,0,0,.6)';g.fillRect(r.x,r.y-10,r.w,5);g.fillStyle=e.boss?'#e8b23a':'#e0303a';g.fillRect(r.x,r.y-10,r.w*Math.max(0,e.hp/e.max),5)}}
function chDraw(t){const Z=CHZ;if(!Z)return;const g=ctx,S=CHS[Z.sec];g.save();const sh=Z.shake*8;g.translate((Math.random()-.5)*sh,(Math.random()-.5)*sh);
 const img=CHIMG[Z.sec];
 if(img.complete&&img.naturalWidth)g.drawImage(img,0,0,W,H);
 else{const gr=g.createLinearGradient(0,0,0,CH_HOR);gr.addColorStop(0,S.sky[0]);gr.addColorStop(.6,S.sky[1]);gr.addColorStop(1,S.sky[2]);g.fillStyle=gr;g.fillRect(0,0,W,CH_HOR+2);
  g.fillStyle='rgba(0,0,0,.45)';const par=(Z.dist*.02)%200;
  for(let i=-1;i<9;i++){const x=i*170-par,hh=S.prop==='crane'?60:S.prop==='palm'?18:S.prop==='tree'?90:80+((i*53)%70);if(S.prop==='tree'||S.prop==='palm'){g.beginPath();g.moveTo(x-40,CH_HOR);g.lineTo(x+80,CH_HOR-hh);g.lineTo(x+200,CH_HOR);g.fill()}else g.fillRect(x,CH_HOR-hh,120,hh)}
  if(S.prop==='palm'){g.fillStyle='rgba(255,200,120,.8)';g.beginPath();g.arc(W*.7,CH_HOR-40,46,0,7);g.fill();g.fillStyle='#2a5a7a';g.fillRect(0,CH_HOR-10,W,12)}
  g.fillStyle=S.gnd;g.fillRect(0,CH_HOR,W,H-CH_HOR)}
 // дорога
 for(let y=H;y>CH_HOR+1;y-=3){const z=CH_CAM*CH_F/(y-CH_HOR);if(z>160)break;const c=chOff(z),s=CH_F/z,cx=W/2+c*s,hw=5.5*s,ph=Math.floor((z+Z.dist)/3.5)&1;
  g.fillStyle=ph?S.side:'#b02020';g.fillRect(cx-hw-.5*s,y-3,.5*s,3);g.fillRect(cx+hw,y-3,.5*s,3);
  g.fillStyle=S.road;g.fillRect(cx-hw,y-3,hw*2,3);if(ph){g.fillStyle='#e8e0c0';g.fillRect(cx-.08*s,y-3,.16*s,3)}}
 // столбы/пальмы по краям
 const step=22,w0=Math.floor(Z.dist/step)*step;
 for(let k=0;k<9;k++){const w=w0-k*step,z=Z.dist-w;if(z<3||z>150)continue;for(const sd of [-1,1]){const p=chProj(sd*8.5,z),s=p.s;g.fillStyle='rgba(10,10,14,.85)';
  if(S.prop==='palm'||S.prop==='tree'){g.fillRect(p.x-.15*s,p.y-6*s,.3*s,6*s);g.fillStyle=S.prop==='palm'?'#1f4a2a':'#16351f';g.beginPath();g.ellipse(p.x,p.y-6*s,1.8*s,.8*s,0,0,7);g.fill()}
  else{g.fillRect(p.x-.08*s,p.y-6*s,.16*s,6*s);g.fillStyle='rgba(255,220,140,.9)';g.beginPath();g.arc(p.x-sd*.5*s,p.y-6*s,.25*s,0,7);g.fill()}}}
 // враги (дальние первыми)
 for(const e of Z.E.slice().sort((a,b)=>b.z-a.z))chDrawCar(g,e);
 for(const r of Z.tracers){g.strokeStyle=r.me?'rgba(255,240,170,.9)':'rgba(255,120,80,.8)';g.lineWidth=r.me?3:2;g.beginPath();g.moveTo(r.x0,r.y0);g.lineTo(r.x1,r.y1);g.stroke()}
 for(const f of Z.FX){const k=f.t/f.life;if(f.k==='boom'){for(let i=0;i<3;i++){g.fillStyle=['rgba(255,220,90,','rgba(255,120,40,','rgba(60,50,50,'][i]+(1-k)+')';g.beginPath();g.arc(f.x,f.y-k*30*i,f.s*(.3+k*(.6+i*.3)),0,7);g.fill()}}
  else{g.fillStyle=f.k==='glass'?'rgba(200,240,255,'+(1-k)+')':'rgba(255,230,120,'+(1-k)+')';for(let i=0;i<5;i++){const a=i*1.3+f.x;g.fillRect(f.x+Math.cos(a)*k*26,f.y+Math.sin(a)*k*26,4,4)}}}
 // своя машина: рама заднего стекла и багажник
 g.fillStyle='#14110f';g.beginPath();g.moveTo(0,0);g.lineTo(150,0);g.lineTo(70,H*.78);g.lineTo(0,H*.82);g.closePath();g.fill();g.beginPath();g.moveTo(W,0);g.lineTo(W-150,0);g.lineTo(W-70,H*.78);g.lineTo(W,H*.82);g.closePath();g.fill();
 g.fillRect(0,0,W,26);const bg2=g.createLinearGradient(0,H*.76,0,H);bg2.addColorStop(0,'#3a2a1c');bg2.addColorStop(1,'#1a120c');g.fillStyle=bg2;g.beginPath();g.moveTo(0,H*.82);g.lineTo(70,H*.78);g.quadraticCurveTo(W/2,H*.72,W-70,H*.78);g.lineTo(W,H*.82);g.lineTo(W,H);g.lineTo(0,H);g.closePath();g.fill();
 g.fillStyle='#c82020';g.fillRect(90,H*.86,90,18);g.fillRect(W-180,H*.86,90,18);
 for(const c of Z.cracks){g.save();g.globalAlpha=Math.min(1,c.t/2);g.strokeStyle='rgba(230,240,255,.75)';g.lineWidth=1.5;g.beginPath();for(let i=0;i<9;i++){const a=i*.7+c.s;g.moveTo(c.x,c.y);g.lineTo(c.x+Math.cos(a)*c.r,c.y+Math.sin(a)*c.r*.8)}g.stroke();g.beginPath();g.arc(c.x,c.y,c.r*.35,0,7);g.stroke();g.restore()}
 // рука с пистолетом
 const hx=W/2+80+(Z.ax-W/2)*.08,hy=H-30;g.save();g.translate(hx,hy);g.rotate(Math.atan2(Z.ay-hy,Z.ax-hx)+Math.PI/2);g.fillStyle='#c98a5a';g.fillRect(-14,-10,28,60);g.fillStyle='#1a1a1e';g.fillRect(-9,-58,18,52);g.fillRect(-12,-20,24,22);if(Z.cd>.06&&Z.fire){g.fillStyle='rgba(255,230,120,.95)';g.beginPath();g.arc(0,-66,14,0,7);g.fill()}g.restore();
 g.restore();
 // прицел
 const ax=Z.ax,ay=Z.ay;g.strokeStyle=Z.rl>0?'rgba(255,255,255,.4)':'#ffe066';g.lineWidth=3;g.beginPath();g.arc(ax,ay,22,0,7);g.moveTo(ax-34,ay);g.lineTo(ax-12,ay);g.moveTo(ax+12,ay);g.lineTo(ax+34,ay);g.moveTo(ax,ay-34);g.lineTo(ax,ay-12);g.moveTo(ax,ay+12);g.lineTo(ax,ay+34);g.stroke();
 // HUD
 g.fillStyle='rgba(0,0,0,.55)';g.fillRect(16,14,300,46);g.fillStyle='#fff';g.font='bold 18px sans-serif';g.textAlign='left';g.fillText('ДЖИП',28,34);g.fillStyle='#333';g.fillRect(28,42,276,10);g.fillStyle=Z.hp>35?'#5ad05a':'#e0303a';g.fillRect(28,42,276*Z.hp/Z.max,10);
 g.textAlign='right';g.fillStyle='rgba(0,0,0,.55)';g.fillRect(W-250,14,234,46);g.fillStyle='#fff';g.fillText('УЧАСТОК '+(Z.sec+1)+'/4 · сбито '+Z.kills,W-28,43);
 g.fillStyle='rgba(0,0,0,.55)';g.fillRect(W-230,H-74,210,52);g.fillStyle=Z.rl>0?'#ffb04a':'#fff';g.font='bold 26px sans-serif';g.fillText(Z.rl>0?'ПЕРЕЗАРЯДКА':Z.ammo+' / '+Z.clip,W-36,H-38);
 const S2=CHS[Z.sec],left=Math.max(0,S2.t-Z.secT);g.textAlign='center';g.font='bold 16px sans-serif';g.fillStyle='rgba(255,255,255,.8)';if(!Z.over)g.fillText(S2.boss&&Z.boss?'ГРУЗОВИК КАЛЕРО!':left>0?'до конца участка '+Math.ceil(left)+' с':'добей погоню',W/2,36);
 if(Z.banner>0&&!Z.over){g.globalAlpha=Math.min(1,Z.banner);g.fillStyle='rgba(0,0,0,.6)';g.fillRect(W/2-260,90,520,64);g.fillStyle='#ffe066';g.font='bold 34px sans-serif';g.fillText(Z.bossMsg&&Z.boss?'ГРУЗОВИК КАЛЕРО!':'УЧАСТОК '+(Z.sec+1)+': '+S2.n,W/2,134);g.globalAlpha=1;if(Z.banner<.1)Z.bossMsg=0}
 if(Z.over&&Z.over!==9){g.fillStyle='rgba(0,0,0,.5)';g.fillRect(0,H/2-50,W,90);g.fillStyle=Z.over>0?'#ffe066':'#ff5a5a';g.font='bold 48px sans-serif';g.fillText(Z.over>0?'ОТОРВАЛИСЬ!':'ДЖИП РАЗБИТ',W/2,H/2+12)}
 if(Z.t<4&&!Z.over){g.font='bold 18px sans-serif';g.fillStyle='rgba(255,255,255,.85)';g.fillText(IS_TOUCH?'Веди прицел пальцем и держи — стреляешь':'Веди прицел мышкой и держи кнопку — стреляешь · R — перезарядка',W/2,H-110)}}
function chEnd(won){const Z=CHZ;state='end';$ui.hidden=false;document.getElementById('mb').hidden=true;
 const kap=won?140+Z.kills*12+Math.round(Z.hp):15+Z.kills*4;gainKap(kap);gainXP(won?100:25);
 $ui.innerHTML=`<div class="card"><h1 style="text-shadow:4px 4px 0 ${won?'#e8b23a':'#c8202a'}">${won?'ОТОРВАЛИСЬ':'ДЖИП РАЗБИТ'}</h1><p class="sub">${won?'Изумруды целы, погоня осталась позади.':'Люди Калеро догнали тебя на участке «'+CHS[Z.sec].n+'».'}</p><p class="sub">Сбито машин: ${Z.kills} · джип цел на ${Math.round(Z.hp)}% · <i class="kp"></i> +${kap}</p>${progLine()}<div class="row"><button class="pri" id="again">Ещё раз</button><button id="menu">Меню</button></div></div>`;
 document.getElementById('again').onclick=()=>{CHZ=null;chaseBegin()};document.getElementById('menu').onclick=()=>{CHZ=null;CAMP.on=0;showMenu()};campAfter(won)}
function chPause(){if(!CHZ||state!=='chase')return;state='chasepause';$ui.hidden=false;$ui.innerHTML=`<div class="card"><h1>ПАУЗА</h1><div class="row"><button class="pri" id="cres">Продолжить</button><button id="cquit">Выйти в меню</button></div></div>`;
 document.getElementById('cres').onclick=()=>{$ui.hidden=true;state='chase'};document.getElementById('cquit').onclick=()=>{CHZ=null;CAMP.on=0;showMenu()}}
(function(){const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*H/r.height]};
 const tch=e=>e.pointerType==='touch';
 cv.addEventListener('pointerdown',e=>{if(state!=='chase'||!CHZ)return;const[x,y]=pos(e);CHZ.ax=x;CHZ.ay=tch(e)?y-70:y;CHZ.fire=true;e.preventDefault()});
 cv.addEventListener('pointermove',e=>{if(state!=='chase'||!CHZ)return;const[x,y]=pos(e);CHZ.ax=clamp(x,0,W);CHZ.ay=clamp(tch(e)?y-70:y,0,H)});
 addEventListener('pointerup',()=>{if(CHZ)CHZ.fire=false});addEventListener('pointercancel',()=>{if(CHZ)CHZ.fire=false});
 addEventListener('keydown',e=>{if(state==='chase'&&CHZ&&e.code==='KeyR'&&CHZ.rl<=0&&CHZ.ammo<CHZ.clip)CHZ.rl=1.3})})();
