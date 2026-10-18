(window.EPISODES=window.EPISODES||{}).rifts3=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#1c0f3a',b:'#33186a',dot:'200,160,255'}),g=h.g,{seg,ease,lerp,pop,T1,T2,T3,T4,T5}=h;
const S=1.75,cx=x=>h.cl(x,310,1190),cy=y=>h.cl(y,385,475);
let TX=[];const sayW=(s,x,y,t,a,size,col,sc,rot)=>{if(t<a)return;TX.push(()=>{const [X,Y]=h.w2s(x,y);h.say(s,h.cl(X,170,910),h.cl(Y,380,1560),t,a,size,col,sc,rot)})};
const flushTX=()=>{h.scr();TX.forEach(f=>f());TX=[]};
function hr(c,x,y,t,o){o=o||{};g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);if(o.s)g.scale(o.s,o.s);h.hero(c,0,0,t,{mv:o.mv,face:o.face||1,stun:o.stun});
  if(o.w!=null){const f=o.face||1;g.save();g.translate(f*24,-30);g.scale(f,1);E.r3WIcon(g,o.w,0,0,.85,o.sw||0);g.restore()}
  if(o.stars)E.r3Stars(g,0,-78,t,3);g.restore()}
const body=(k,x,y,dir,st,mv,t,sc,rot)=>E.r3Body(g,k,x,y,dir,st,mv,t,sc,rot||0,0);
function crown(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(-16,0);g.lineTo(-18,-20);g.lineTo(-8,-10);g.lineTo(0,-24);g.lineTo(8,-10);g.lineTo(18,-20);g.lineTo(16,0);g.closePath();g.fillStyle='#ffc531';g.fill();g.lineWidth=3;g.strokeStyle=E.OUT;g.stroke();g.fillStyle='#e8412c';g.beginPath();g.arc(0,-8,3.5,0,7);g.fill();g.restore()}
function pizza(x,y,r,t,bite){const a0=(bite||0)*.62;g.save();g.translate(x,y);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(6,r*.35,r,r*.45,0,0,7);g.fill();g.scale(1,.62);
  const sec=(rr)=>{g.beginPath();if(a0>0)g.moveTo(0,0);g.arc(0,0,rr,a0,Math.PI*2);g.closePath()};
  g.fillStyle='#e0a14a';sec(r);g.fill();g.lineWidth=4;g.strokeStyle=E.OUT;g.stroke();g.fillStyle='#ffcf4a';sec(r*.85);g.fill();g.fillStyle='#e8412c';
  for(let i=0;i<9;i++){const a=(i*2.4)%(Math.PI*2),rr=r*(.25+.5*h.rnd(i));if(a<a0+.15)continue;g.beginPath();g.arc(Math.cos(a)*rr,Math.sin(a)*rr,r*.1,0,7);g.fill()}g.restore()}
function rift(x,y,rw,rh,t,a){if(a<=0)return;g.save();g.translate(x,y);g.globalAlpha=Math.min(1,a);g.scale(rw,rh);
  for(let i=6;i>=0;i--){const k=i/6;g.fillStyle=`hsla(${270+i*12+Math.sin(t*3)*10},90%,${55+k*20}%,${.25+.1*(6-i)})`;g.beginPath();g.arc(0,0,1-k*.6+Math.sin(t*5+i)*.03,0,7);g.fill()}
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=.04;for(let i=0;i<4;i++){g.beginPath();g.arc(0,0,.25+i*.18,t*3+i,t*3+i+2.2);g.stroke()}g.restore()}
const FR4=['girl','fat','tall','nerd','donkey'];
/* ---------- A: wet friends in the pond, the rift sucks them in ---------- */
function sceneA(t){h.scr();g.fillStyle='#78c257';g.fillRect(0,300,1080,1340);for(let i=0;i<30;i++){g.fillStyle='rgba(30,90,20,.25)';g.beginPath();g.arc(h.rnd(i)*1080,300+h.rnd(i+4)*1340,6+h.rnd(i+2)*8,0,7);g.fill()}
  g.fillStyle='#d9c08a';g.beginPath();g.ellipse(540,1220,520,290,0,0,7);g.fill();const pg=g.createRadialGradient(500,1160,20,540,1220,500);pg.addColorStop(0,'#7dd3fc');pg.addColorStop(1,'#0284c7');g.fillStyle=pg;g.beginPath();g.ellipse(540,1220,485,260,0,0,7);g.fill();
  const ra=seg(t,1.4,2.4);rift(540,640,230*ease(ra)+Math.sin(t*4)*8,300*ease(ra),t,ra);
  if(ra>0)h.say(TXT.rift,540,330+40,t,1.8,50,'#e9d5ff','#4c1d95');
  FR4.forEach((c,i)=>{const x0=200+i*170,y0=1210+(i%2)*40,suck=seg(t,2.7+i*.15,4.3+i*.15);
    if(suck<=0){g.save();g.translate(x0,y0+Math.sin(t*3+i)*6);g.scale(2.2,2.2);h.hero(c,0,0,t,{face:i<2?1:-1});g.restore();
      g.fillStyle='rgba(2,132,199,.92)';g.beginPath();g.ellipse(x0,y0+10,80,30,0,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=4;for(let r=0;r<2;r++){const q=(t*.7+r*.5+i*.2)%1;g.beginPath();g.ellipse(x0,y0+8,60+q*50,18+q*14,0,0,7);g.stroke()}
      for(let j=0;j<3;j++){const q=(t*1.2+j/3+i*.3)%1;g.fillStyle='rgba(180,230,255,.9)';g.beginPath();g.arc(x0-30+j*30,y0-140+q*120,5,0,7);g.fill()}}
    else{const e=ease(suck),x=lerp(x0,540,e)+Math.sin(suck*12)*60*(1-e),y=lerp(y0-60,640,e),s=2.2*(1-e*.85);g.save();g.translate(x,y);g.rotate(suck*14);g.scale(s,s);h.hero(c,0,0,t,{});g.restore()}});
  if(t>.4&&t<2.6)h.say(TXT.wet,540,880,t,.4,56,'#fff','#0b5d8a',-.05);
  if(t>2.9)h.say(TXT.aaa,540,960,t,2.9,72,'#ffc531','#4c1d95',.06)}
/* ---------- B: hospital — crates, rubber chicken, BONG, Mega-Grandpa ---------- */
const LAND={girl:[560,640],fat:[660,690],tall:[760,630],nerd:[860,690],donkey:[950,640]};
function landed(c,t,t0){const [x,y]=LAND[c],k=seg(t,t0,t0+.45);return [x,lerp(y-420,y,k*k),k<1]}
function sceneB(t){h.cam(cx(760),cy(440),S);g.drawImage(E.r3Paint(0),0,0);
  const crates=[[620,520,'girl'],[700,560,'fat']];
  crates.forEach(([x,y],i)=>{const hit=6.5+i*.25;if(t<hit)h.add(y,()=>E.r3CrateDraw(g,'q',x,y,t>hit-.4?1:3,t));else if(t<hit+.5){const k=seg(t,hit,hit+.5);for(let j=0;j<8;j++){const a=j*.8;g.fillStyle='#c98b4a';g.fillRect(x+Math.cos(a)*k*70-6,y+Math.sin(a)*k*50-20*k-6,12,12)}}});
  // Mega-Grandpa on the gurney
  const gx=lerp(380,760,ease(seg(t,8.6,9.3))),gy=360;if(t>8.6)h.add(gy,()=>{body('grandpa',gx,gy,0,0,t<9.3,t,1.7);if(t>10.3)E.r3Stink(g,gx-110,gy-10+Math.sin(t*4)*4,t,1)});
  // nurse charges and gets BONG'ed
  const nx=lerp(1150,760,seg(t,7,7.9)),ny=560,bong=t>8.1;if(t>6.8)h.add(ny,()=>{body('nurse',nx,ny,Math.PI,bong?2:0,!bong,t,1,bong?Math.sin(t*14)*.15:0);if(bong)E.r3Stars(g,nx,ny-110,t,3)});
  for(const c of FR4){let [x,y,fall]=landed(c,t,5.6+FR4.indexOf(c)*.12),o={face:1,mv:fall};
    if(c==='girl'&&t>6.6){o.w=0;o.sw=t>8.5&&t<9?-Math.sin(seg(t,8.5,9)*Math.PI)*1.6:0}
    if(c==='fat'&&t>6.85){o.w=1;o.sw=t>7.8&&t<8.3?-Math.sin(seg(t,7.8,8.3)*Math.PI)*2:0;if(t>7.8&&t<8.1)x+=seg(t,7.8,8.1)*30}
    if(c==='nerd'&&t>10.1){o.stun=1}
    if(fall)o.rot=Math.sin(t*20)*.3;
    h.add(y,()=>{hr(c,x,y,t,o);if(c==='nerd'&&t>10.1){E.bkSplat(g,x,y-55,t,1.1);E.drawFlies(g,x,y-90,t,4)}})}
  h.flush();
  // flying bed-pan duck
  if(t>9.4&&t<10.1){const k=seg(t,9.4,10.1),x=lerp(gx+40,LAND.nerd[0],k),y=lerp(gy-30,LAND.nerd[1]-60,k)-Math.sin(k*Math.PI)*120;E.r3BJIcon(g,0,x,y,t)}
  if(t>6.5&&t<7.6){for(const [x,y,w] of [[620,470,0],[700,510,1]]){const k=pop(t,6.6);g.save();g.translate(x,y-40-k*30);g.scale(k,k);E.r3WIcon(g,w,0,0,1,0);g.restore()}}
  sayW(TXT.qbox,660,420,t,6.6,40,'#ffc531','#7a3e10');
  if(t>8.1)sayW(TXT.bong,nx,ny-150,t,8.1,74,'#ffc531','#1d1d22',-.1);
  if(t>8.6&&t<10.3)sayW(TXT.squeak,LAND.girl[0]-20,LAND.girl[1]-130,t,8.6,40,'#fff','#e8412c',.08);
  if(t>9.2)sayW(TXT.mega,gx,gy-150,t,9.2,40,'#fff','#3d6b1a');
  if(t>10.1)sayW(TXT.fuu,LAND.nerd[0],LAND.nerd[1]-150,t,10.1,56,'#ffc531','#6b4423',.06);
  if(t>10.3)sayW(TXT.fart,gx-120,gy+70,t,10.35,46,'#d9f99d','#3d6b1a',-.08);
  flushTX()}
/* ---------- C: farm — train guards, Chief Conductor, suitcases, pants ---------- */
const HC={girl:[560,430],fat:[600,505],tall:[680,450],nerd:[540,520],donkey:[650,560]};
function sceneC(t){h.cam(cx(lerp(820,880,seg(t,11,19))),cy(460),S);g.drawImage(E.r3Paint(1),0,0);
  const KX=lerp(1250,1090,seg(t,11,12)),KY=460,pants=t>15.7;
  const guards=[[lerp(1250,930,seg(t,11,11.8)),400],[lerp(1250,960,seg(t,11.1,11.9)),560]];
  guards.forEach(([x,y],i)=>{const hit=i===0&&t>14.7;h.add(y,()=>{body('mach',x,y,Math.PI,hit?2:0,t<11.9,t,1,hit?Math.sin(t*12)*.2:0);if(hit)E.r3Stars(g,x,y-100,t,3);if(t>16.2&&!hit)E.r3Stars(g,x,y-100,t,2)})});
  h.add(KY,()=>{const sh=t>15.4&&t<15.7?Math.sin(t*60)*6:0;body('mach',KX+sh,KY,Math.PI,pants?2:0,t<12,t,1.9);if(pants){E.r3Pants(g,KX,KY+8,1.6);g.fillStyle='#ffe0c4'}
    if(t>15.75)E.r3Stars(g,KX,KY-190,t,3)});
  for(const c of FR4){let [x,y]=HC[c],o={face:1};
    if(c==='girl')o.w=0;if(c==='fat'){o.w=1;o.sw=t>13.8&&t<14.2?-Math.sin(seg(t,13.8,14.2)*Math.PI)*2:0}
    if(c==='tall'&&t>12.9&&t<14.4){o.rot=(t-12.9)*14;o.stars=1}if(c==='tall'&&t>14.4)o.stars=t<15;
    if(c==='girl'&&t>13.3&&t<13.9)y-=Math.sin(seg(t,13.3,13.9)*Math.PI)*90;
    if(c==='donkey'){const k=seg(t,14.6,15.4),back=seg(t,15.8,16.6);x=lerp(lerp(x,KX-110,ease(k)),HC.donkey[0],ease(back));y=lerp(lerp(y,KY+40,ease(k)),HC.donkey[1],ease(back));o.mv=(k>0&&k<1)||(back>0&&back<1);o.face=back>0?-1:1;if(t>15.3&&t<15.6)o.rot=-.4}
    if(t>16.2&&t<19&&c!=='donkey'){y-=Math.abs(Math.sin(t*9+x))*14}
    h.add(y,()=>hr(c,x,y,t,o))}
  h.flush();
  // suitcases: 1 → tall (12.9), 2 → over the girl (13.6), 3 → BONG'ed back by fat into a guard (14.7)
  const sc=[[12.3,12.9,HC.tall,0],[13.0,13.7,[HC.girl[0]-40,HC.girl[1]-20],0],[13.4,14,HC.fat,1]];
  sc.forEach(([a,b,[tx,ty],back])=>{if(t>a&&t<b){const k=seg(t,a,b);E.r3BJIcon(g,1,lerp(KX-60,tx+20,k),lerp(KY-120,ty-50,k)-Math.sin(k*Math.PI)*140,t)}});
  if(t>14&&t<14.7){const k=seg(t,14,14.7);E.r3BJIcon(g,1,lerp(HC.fat[0]+30,guards[0][0],k),lerp(HC.fat[1]-60,guards[0][1]-60,k)-Math.sin(k*Math.PI)*90,t)}
  sayW(TXT.tickets,KX,KY-240,t,11.3,44,'#fff','#2b5fd9');
  if(t>12.9&&t<14.4)sayW(TXT.ouch,HC.tall[0],HC.tall[1]-150,t,12.9,48,'#ffc531','#e8412c',.1);
  if(t>14&&t<15)sayW(TXT.bong,HC.fat[0]+40,HC.fat[1]-160,t,14,62,'#ffc531','#1d1d22',-.1);
  if(t>15.3&&t<16.6)sayW(TXT.ia,HC.donkey[0]+90,KY-80,t,15.3,52,'#fff','#7a4a1f',.08);
  if(t>15.8)sayW(TXT.pants,KX-40,KY-260,t,15.8,52,'#ff8fb1','#7a1a3e',-.06);
  if(t>16.4)sayW(TXT.haha,HC.fat[0],HC.girl[1]-170,t,16.4,52,'#fff','#2e7d32',.05);
  flushTX()}
/* ---------- D: cellar — the Rat King rides a pizza with a swarm of rats ---------- */
const HD={girl:[560,620],fat:[650,680],tall:[740,610],nerd:[830,690],donkey:[920,630]};
function sceneD(t){h.cam(cx(750),cy(460),S);g.drawImage(E.r3Paint(2),0,0);
  const kx=lerp(1150,860,ease(seg(t,19,20))),ky=330+Math.sin(t*3)*8;
  h.add(ky,()=>{pizza(kx,ky+10,95,t,0);body('ratp',kx,ky,Math.PI,0,false,t,2.4);crown(kx+38,ky-62,1.4)});
  for(let i=0;i<12;i++){const k=((t-19)*.55+h.rnd(i))%1,x=lerp(1250,250,k),y=480+h.rnd(i+3)*260+Math.sin(t*9+i)*6;h.add(y,()=>body('rat',x,y,Math.PI,0,true,t,1))}
  for(const c of FR4){let [x,y]=HD[c],o={face:1};if(c==='girl'){o.w=0;o.sw=Math.sin(t*10)*.6}if(c==='fat')o.w=1;
    if(c==='nerd'||c==='tall'){y-=Math.abs(Math.sin(t*10+x))*30;o.mv=true}
    if(c==='fat'&&t>21.5)o.face=1;h.add(y,()=>{hr(c,x,y,t,o);if(c==='fat'&&t>21.6){E.r3BJIcon(g,2,x+8,y-48,0)}})}
  h.flush();
  [[20.2,20.8,HD.nerd],[20.8,21.5,HD.fat]].forEach(([a,b,[tx,ty]])=>{if(t>a&&t<b){const k=seg(t,a,b);E.r3BJIcon(g,2,lerp(kx-60,tx,k),lerp(ky-60,ty-60,k)-Math.sin(k*Math.PI)*120,t)}});
  sayW(TXT.king,kx,ky-210,t,19.4,44,'#ffc531','#5a2410');
  if(t>19.8&&t<21.4)sayW(TXT.rats,560,470,t,19.8,48,'#fff','#4b5563',.06);
  if(t>21.5)sayW(TXT.nyam,HD.fat[0],HD.fat[1]-160,t,21.5,60,'#ffc531','#e8412c',-.06);
  flushTX()}
/* ---------- F: peace & pizza + the «Три разлома» tease ---------- */
function sceneF(t){h.cam(750,lerp(470,430,seg(t,T4,T5)),S);g.drawImage(E.r3Paint(2),0,0);
  const ra=seg(t,T4+1.6,T4+2.4);rift(750,170,150*ease(ra),110*ease(ra),t,ra);
  pizza(750,560,150,t,Math.min(6,Math.floor(seg(t,T4+.4,T5)*7)));
  const seats=[['girl',560,520],['fat',600,650],['tall',930,520],['nerd',900,650],['donkey',750,720]];
  for(const [c,x,y] of seats)h.add(y,()=>hr(c,x,y+Math.sin(t*6+x)*3,t,{face:x<750?1:-1}));
  h.add(470,()=>{body('ratp',750,450,0,0,false,t,1.8);crown(750+28,450-46,1.1)});
  for(let i=0;i<5;i++){const a=i*1.2+.5,x=750+Math.cos(a)*230,y=560+Math.sin(a)*130;h.add(y,()=>body('rat',x,y,x<750?0:Math.PI,0,false,t,.9))}
  h.flush();
  sayW(TXT.peace,750,330,t,T4+.4,52,'#fff','#e8412c',-.05);
  if(t>T4+2)sayW(TXT.tease,750,170,t,T4+2,46,'#e9d5ff','#4c1d95');
  flushTX()}
function scenes(t){h.clip();if(t<T1)sceneA(t);else if(t<11)sceneB(t);else if(t<T3)sceneC(t);else if(t<T4)sceneD(t);else sceneF(t);g.restore();
  if(t>T1&&t<T4){const b=(t>8.1?1:0)+(t>14?1:0),p=t>10.1?1:0,z=t>21.5?1:0;h.counter(t,[{label:'🍳 '+b},{label:'💩 '+p},{label:'🍕 '+z}])}
  h.next(t)}
function icon(t){g.save();g.scale(2.2,2.2);pizza(0,40,80,t,1);E.r3Body(g,'ratp',0,30,Math.PI,0,false,t,2,0,0);crown(32,-26,1.2);g.restore()}
const caps=[[.3,5.4,'c1'],[5.6,10.9,'c2'],[11.1,14.9,'c3'],[15.1,18.9,'c4'],[19.1,22.9,'c5'],[23.1,26.4,'c6']];
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,caps,icon,[T1,11,T3,T4,T5])}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).rifts3={
 ru:{c1:'Мокрые после пруда… и тут открылся разлом! 🌀',c2:'Ящики «?» — резиновая курица и сковородка!',c3:'Проводники кидаются чемоданами!',c4:'Ослик лягнул Главного проводника… 👖',c5:'Крысиный Король на пицце и полчища крыс! 🐀',c6:'Мир, дружба, пицца! 🍕',
  rift:'РАЗЛОМ!',wet:'БРР! МОКРЫЕ!',aaa:'А-А-А-А!',qbox:'?!',bong:'БОНГ!',squeak:'ПИ-И-И!',mega:'МЕГА-ДЕДУЛЯ!',fuu:'ФУ-У-У!',fart:'ПУ-У-УК!',tickets:'БИЛЕТИКИ!',ouch:'ОЙ-ОЙ!',ia:'И-А!',pants:'МОИ ШТАНЫ!',haha:'ХА-ХА-ХА!',king:'Я — КОРОЛЬ!',rats:'ПИ-ПИ-ПИ!',nyam:'НЯМ!',peace:'МИР? ПИЦЦА!',tease:'ТРИ РАЗЛОМА',
  next:'Продолжение следует… 🌀',tag:'🌀 Серия 18 · Три разлома: Мини',title:'Три разлома',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Still wet from the pond… and a rift opens! 🌀',c2:'“?” crates — a rubber chicken and a frying pan!',c3:'The train guards throw suitcases!',c4:'The Donkey kicked the Chief Conductor… 👖',c5:'The Rat King on a pizza with a swarm of rats! 🐀',c6:'Peace, friendship, pizza! 🍕',
  rift:'A RIFT!',wet:'BRR! SOAKED!',aaa:'AAAAH!',qbox:'?!',bong:'BONG!',squeak:'SQUEEEAK!',mega:'MEGA-GRANDPA!',fuu:'EWWW!',fart:'PFFFT!',tickets:'TICKETS!',ouch:'OUCH!',ia:'HEE-HAW!',pants:'MY PANTS!',haha:'HA-HA-HA!',king:'I AM THE KING!',rats:'SQUEAK-SQUEAK!',nyam:'YUM!',peace:'PEACE? PIZZA!',tease:'THREE RIFTS',
  next:'To be continued… 🌀',tag:'🌀 Episode 18 · Three Rifts: Mini',title:'Three Rifts',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'רטובים מהבריכה… ופתאום נפתח סדק! 🌀',c2:'ארגזי «?» — תרנגולת גומי ומחבת!',c3:'הכרטיסנים זורקים מזוודות!',c4:'החמור בעט בכרטיסן הראשי… 👖',c5:'מלך העכברושים על פיצה ועדת עכברושים! 🐀',c6:'שלום, חברות, פיצה! 🍕',
  rift:'סדק!',wet:'ברר! רטובים!',aaa:'אההה!',qbox:'?!',bong:'בוֹנג!',squeak:'צִיִיק!',mega:'מגה-סבא!',fuu:'איכס!',fart:'פּוּק!',tickets:'כרטיסים!',ouch:'אוי-אוי!',ia:'אִי-אָה!',pants:'המכנסיים שלי!',haha:'חה-חה-חה!',king:'אני המלך!',rats:'צִיף-צִיף!',nyam:'יאמי!',peace:'שלום? פיצה!',tease:'שלושה סדקים',
  next:'המשך יבוא… 🌀',tag:'🌀 פרק 18 · שלושה סדקים: מיני',title:'שלושה סדקים',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
