(window.EPISODES=window.EPISODES||{}).bike=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#103a1c',b:'#1d5a2c',dot:'200,255,160'}),g=h.g,{seg,ease,lerp,pop,T1,T2,T3,T4,T5}=h;
const RIDERS=['girl','fat','tall','nerd','donkey'];
/* ---------- helpers: rider from behind on a bike (the game's own art) ---------- */
function rider(c,x,y,t,s,o){o=o||{};const col=E.CH[c].col,BS=E.bkBackSpr(c,null),Bd=E.BODY[c]||E.BODY.girl,hy=-22+Bd.sh[1]*1.05+4,wr=t*(o.stop?0:5),pd=Math.sin(wr*6)*5;
  g.save();g.translate(x,y);g.scale(s,s);g.rotate(o.lean||0);
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(6,-30,26,60,0,0,7);g.fill();
  E.bkBikeFar(g,0,0,wr,col,hy);g.save();g.translate(0,-22+Math.abs(pd)*.3);g.scale(1.05,1.05);g.drawImage(BS.cv,-BS.ox,-BS.oy);g.restore();
  g.lineCap='round';for(const sd of [-1,1]){const sx=sd*Bd.sh[0]*.9,sy=-22+Bd.sh[1]*1.05+12;g.strokeStyle=E.OUT;g.lineWidth=11;g.beginPath();g.moveTo(sx,sy);g.lineTo(sd*38,hy);g.stroke();g.strokeStyle=col;g.lineWidth=7;g.stroke()}g.lineCap='butt';
  g.fillStyle='#1d1d22';for(const sd of [-1,1]){E.rr(g,sd*20-6,-14+sd*pd,12,10,4);g.fill()}
  E.bkBikeNear(g,0,0,wr,col);if(o.splat)E.bkSplat(g,0,-22+Bd.hy*1.05,t,.9);
  if(o.stun)E.r3Stars(g,0,-22+Bd.hy*1.05-70,t,3);g.restore()}
const cop=(x,y,face,st,k,t,s)=>{g.save();g.translate(x,y);g.scale(s||1.4,s||1.4);E.bkCop(g,0,0,face,st,k,t);g.restore()};
const frog=(x,y,st,t,id)=>{g.save();g.translate(x,y);g.scale(1.6,1.6);E.bkFrog(g,0,0,st,t,id||1);g.restore()};
const poop=(x,y,sq,t)=>{g.save();g.translate(x,y);g.scale(3.2,3.2);E.bkPoop(g,{x:0,y:0,r:20,k:'cpoop'},sq,t);g.restore()};
const V=520,RS=1.6;// road scroll speed px/s (screen)
const curve=(wy,amp)=>Math.sin(wy/520)*amp+Math.sin(wy/230)*amp*.25;
let AMP=110;const rx=(sy,t)=>540+curve(sy-t*V,AMP);
function road(t,kind){const L=300,R=1640;
  g.fillStyle=kind==='city'?'#7fbf5a':kind==='mud'?'#6aa548':'#78c257';g.fillRect(0,L,1080,R-L);
  for(let i=0;i<70;i++){const y=L+((h.rnd(i)*1400+t*V)%1400),x=h.rnd(i+3)*1080;g.fillStyle=i%3?'rgba(255,255,255,.12)':'rgba(30,90,20,.25)';g.beginPath();g.arc(x,y,4+h.rnd(i+8)*6,0,7);g.fill()}
  const W=kind==='city'?300:270;const col=kind==='city'?'#4a4e57':'#b5834f',edge=kind==='city'?'#e9e9e9':'#8a5f34';
  for(let y=L-20;y<R+20;y+=8){const x=rx(y,t);g.fillStyle=edge;g.fillRect(x-W-14,y,W*2+28,9);g.fillStyle=col;g.fillRect(x-W,y,W*2,9)}
  if(kind==='city'){g.fillStyle='#ffd23f';for(let y=L;y<R;y+=10){const ph=((y-t*V)%120+120)%120;if(ph<60){g.fillRect(rx(y,t)-5,y,10,10)}}
    for(let i=0;i<8;i++){const y=L+((i*260+t*V)%1600)-150;const side=i%2?1:-1,x=rx(y,t)+side*(W+150);E.rr(g,x-90,y-110,180,170,12);g.fillStyle=['#e8a87c','#9ad1f5','#f6d36b','#c39bd3'][i%4];g.fill();g.strokeStyle=E.OUT;g.lineWidth=4;g.stroke();
      g.fillStyle='#fff8';for(let k=0;k<4;k++)g.fillRect(x-70+(k%2)*80,y-90+Math.floor(k/2)*70,55,45)}}
  else{for(let i=0;i<10;i++){const y=L+((i*170+t*V)%1500)-80;const side=i%2?1:-1,x=rx(y,t)+side*(W+90+h.rnd(i)*80);g.save();g.translate(x,y);g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(8,10,46,26,0,0,7);g.fill();for(const [dx,dy,r,c] of [[0,-6,42,'#2f8f3a'],[-18,6,28,'#3aa547'],[18,6,28,'#3aa547'],[-6,-18,22,'#47b955']]){g.fillStyle=c;g.beginPath();g.arc(dx,dy,r,0,7);g.fill()}g.restore()}}}
// riders' screen positions: lane offsets from the road centre
const LANE={girl:-170,fat:-60,tall:60,nerd:170,donkey:0};
const ROW={girl:1280,fat:1360,tall:1270,nerd:1370,donkey:1470};
function pos(c,t){let y=ROW[c]+Math.sin(t*1.7+LANE[c])*14,x=rx(y,t)+LANE[c]+Math.sin(t*1.3+ROW[c])*18;return [x,y]}
/* ---------- scene A: the hospital door, jump on the bikes ---------- */
function sceneA(t){g.fillStyle='#e9f4fb';g.fillRect(0,300,1080,1340);
  g.fillStyle='#cfe3ee';g.fillRect(0,300,1080,330);g.fillStyle='#fff';E.rr(g,440,360,200,260,10);g.fill();g.strokeStyle=E.OUT;g.lineWidth=5;g.stroke();g.fillStyle='#e8412c';g.fillRect(515,400,50,140);g.fillRect(470,445,140,50);
  h.text(TXT.hosp,540,600,40,'#2e6fa6',{sc:'#fff'});
  g.fillStyle='#b9c3cc';g.fillRect(0,1150,1080,490);
  const bikes=[['girl',190],['fat',360],['tall',540],['nerd',720],['donkey',890]];
  for(const [c,x] of bikes){const run=seg(t,.6,2.4),sx=lerp(540+(x-540)*.3,x,ease(run)),sy=lerp(760,1360,ease(run));
    if(t<2.6){g.save();g.translate(x,1430);g.scale(1.6,1.6);E.bkBikeFar(g,0,0,0,E.CH[c].col,-40);E.bkBikeNear(g,0,0,0,E.CH[c].col);g.restore();
      g.save();g.translate(sx,sy);g.scale(2.2,2.2);h.hero(c,0,0,t,{mv:t>.6&&t<2.4,face:x<540?-1:1});g.restore()}
    else{const k=seg(t,2.6,3),hy=Math.sin(k*Math.PI)*90;rider(c,x,1430-hy-Math.max(0,t-3.2)*260,t,1.6,{})}}
  if(t>.9&&t<2.6){const k=seg(t,.9,2.6);h.say(TXT.run,540,780,t,.9,64,'#ffc531','#e8412c',-.06)}
  // nurse in the door waving the syringe
  if(t>3.2){g.save();g.translate(540,700);g.scale(2.4,2.4);E.GART.nurse(g,{x:0,y:0,a:0,st:1,k:'nurse',moving:false},t);g.restore();h.say(TXT.stop,780,520,t,3.4,56,'#fff','#e8412c')}}
/* ---------- scene B: city road, frogs, the chubby cop ---------- */
function sceneB(t){AMP=110;road(t,'city');const lt=t-T1;
  // frog 1 crosses and gets flattened by the girl at 7.4
  const fy=lerp(380,ROW.girl-10,seg(t,6.2,7.4)),fx=t<7.4?lerp(rx(fy,t)+260,pos('girl',t)[0],seg(t,6.2,7.4)):pos('girl',7.4)[0];
  if(t<7.4)frog(fx,fy,0,t,1);else if(t<8.7)frog(fx,ROW.girl+(t-7.4)*V*.25,1,t,1);else{const k=seg(t,8.7,9.6);frog(fx+k*300,ROW.girl+340-Math.abs(Math.sin(k*9))*60,0,t,1)}
  if(t>7.4)h.say(TXT.kva,fx,ROW.girl-170,t,7.4,56,'#7dff6a','#1e5a12',.08);
  // second frog hops across further ahead
  {const k=seg(t,8,10.6),y=380+k*700;frog(rx(y,t)-260+k*520,y-Math.abs(Math.sin(k*14))*40,0,t,2)}
  for(const c of RIDERS){const [x,y]=pos(c,t);h.add(y,()=>rider(c,x,y,t,RS,{lean:Math.sin(t*1.3+ROW[c])*.06}))}
  // chubby cop with a donut chasing from behind
  const cy=lerp(1700,1580,seg(t,7.5,9))+Math.sin(t*9)*6,cx=rx(cy,t)+30;h.add(cy,()=>cop(cx,cy,1,1,0,t,1.6));h.flush();
  if(t>8.4){h.say(TXT.donut,cx,cy-250,t,8.4,40,'#fff','#2b5fd9');for(let i=0;i<3;i++){const a=t*6+i*2;g.fillStyle='rgba(120,200,255,.8)';g.beginPath();g.arc(cx-40+Math.cos(a)*10,cy-200+((t*90+i*20)%60),6,0,7);g.fill()}}}
/* ---------- scene C: whistle cop trips, scooter, police car, cow pat ---------- */
function sceneC(t){const meadow=t>15.2;AMP=meadow?150:110;road(t,meadow?'field':'city');
  if(t>15&&t<15.5){h.scr();g.fillStyle=`rgba(255,255,255,${.6-(t-15)})`;g.fillRect(0,300,1080,1340)}
  // whistle cop ahead (moves down with the road), trips over a frog at 12.6
  if(t<15){const y=lerp(380,1100,seg(t,11,14)),x=rx(y,t)+80,down=t>12.6;
    frog(x-80,y+40,down?1:0,t,3);cop(x,y,-1,down?4:1,1,t,2.1);
    if(t<12.6)h.say(TXT.whistle,x,y-230,t,11.2,40,'#fff','#2b5fd9');else{h.emo('stars',x,y-140,.6*pop(t,12.6));h.say(TXT.ouch,x+40,y-200,t,12.6,46,'#ffc531','#e8412c',.1)}}
  // police car blocks the road at 14..15.2 — riders swerve
  if(t>13.6&&t<15.2){const y=lerp(260,1150,seg(t,13.6,15.2)),x=rx(y,t)-40,fl=Math.floor(t*8)%2;g.save();g.translate(x,y);g.fillStyle=fl?'rgba(255,40,40,.22)':'rgba(40,120,255,.22)';g.beginPath();g.arc(0,-40,240,0,7);g.fill();g.scale(2.4,2.4);E.bkCar(g,0,0,0,t);g.restore();h.say(TXT.siren,x,y-170,t,13.8,40,'#fff','#2b5fd9')}
  // cow pat ahead, the donkey hits it at 17.2 and splatters the scooter cop behind
  const py=lerp(300,ROW.donkey,seg(t,15.6,17.2)),px=pos('donkey',17.2)[0];if(t<17.2)poop(px,py,0,t);else poop(px,ROW.donkey+(t-17.2)*V*.3,1,t);
  for(const c of RIDERS){let [x,y]=pos(c,t);if(t>14.4&&t<15.4){const sw=Math.sin(seg(t,14.4,15.4)*Math.PI);x+=(x<rx(y,t)?-1:1)*sw*140}h.add(y,()=>rider(c,x,y,t,RS,{lean:Math.sin(t*1.3+ROW[c])*.06,splat:false}))}
  const scY=1660-seg(t,15.8,17)*80,scX=pos('donkey',t)[0]+20,hit=t>17.3;
  if(t>15.8)h.add(scY,()=>{cop(scX,scY,1,hit?5:1,2,t,2);if(hit){E.bkSplat(g,scX,scY-90,t,2.6,1);E.drawFlies(g,scX,scY-200,t,5)}});
  h.flush();
  if(t>17.2&&t<17.9){for(let i=0;i<12;i++){const k=seg(t,17.2,17.9),a=-Math.PI/2+Math.PI+(i-6)*.12;g.fillStyle=['#6b4423','#7d5230','#5a3818'][i%3];g.beginPath();g.arc(px+Math.cos(a)*k*220*(.6+h.rnd(i)*.5),ROW.donkey+60-Math.sin(a)*k*-220,10+h.rnd(i)*8,0,7);g.fill()}}
  if(t>17.3){h.say(TXT.fuu,h.cl(scX+200,200,880),scY-260,t,17.3,58,'#ffc531','#6b4423',-.06);h.say(TXT.plus2,pos('donkey',t)[0],ROW.donkey-230,t,17.5,40,'#fff','#2e7d32')}}
/* ---------- scene D: off-road mud, the shove ---------- */
function sceneD(t){AMP=190;road(t,'mud');
  const my=lerp(320,ROW.tall+30,seg(t,19,20.6)),mx=pos('tall',20.6)[0]+150;g.fillStyle='#6b4a2a';g.beginPath();g.ellipse(mx,my,170,70,0,0,7);g.fill();g.fillStyle='#7d5634';g.beginPath();g.ellipse(mx-20,my-6,120,44,0,0,7);g.fill();
  for(const c of RIDERS){let [x,y]=pos(c,t),o={lean:Math.sin(t*1.3+ROW[c])*.06};
    if(c==='fat'&&t>20.2&&t<20.9){x+=Math.sin(seg(t,20.2,20.9)*Math.PI)*60}
    if(c==='tall'&&t>20.5){const k=seg(t,20.5,21.1);x=lerp(x,mx,ease(k));y=lerp(y,my,ease(k));o.lean=k*.9+Math.sin(t*16)*.12;o.splat=t>21;o.stun=t>21.1;o.stop=t>21.1}
    h.add(y,()=>rider(c,x,y,t,RS,o))}
  h.flush();
  if(t>20.4)h.say(TXT.shove,pos('fat',t)[0]-40,ROW.fat-240,t,20.4,46,'#ffc531','#e8412c',-.08);
  if(t>21.1){h.say(TXT.mud,mx,my-260,t,21.1,56,'#fff','#6b4423',.06);for(let i=0;i<10;i++){const k=seg(t,21.1,21.8),a=-Math.PI*(i/9);g.fillStyle='#6b4a2a';g.beginPath();g.arc(mx+Math.cos(a)*k*200,my+Math.sin(a)*k*140,9,0,7);g.fill()}}}
/* ---------- scene F: splash finish into the pond ---------- */
function sceneF(t){AMP=60;const k=seg(t,T4,T4+1.6);
  g.fillStyle='#78c257';g.fillRect(0,300,1080,1340);
  const pondY=lerp(200,820,ease(k));g.fillStyle='#d9c08a';g.beginPath();g.ellipse(540,pondY,560,300,0,0,7);g.fill();const pg=g.createRadialGradient(500,pondY-60,20,540,pondY,520);pg.addColorStop(0,'#7dd3fc');pg.addColorStop(1,'#0284c7');g.fillStyle=pg;g.beginPath();g.ellipse(540,pondY,520,270,0,0,7);g.fill();
  // finish arch
  const ay=pondY+430;g.fillStyle='#e8412c';g.fillRect(150,ay-220,30,220);g.fillRect(900,ay-220,30,220);E.rr(g,130,ay-270,820,80,20);g.fill();g.strokeStyle=E.OUT;g.lineWidth=5;g.stroke();
  for(let i=0;i<16;i++){g.fillStyle=i%2?'#fff':'#222';g.fillRect(150+i*49,ay-20,49,20)}h.text(TXT.finish,540,ay-230,52,'#fff',{sc:'#7a1a0e'});
  RIDERS.forEach((c,i)=>{const t0=T4+1.2+i*.28,xx=180+i*180;
    if(t<t0){const y=lerp(1500,ay+40,seg(t,T4,t0));rider(c,xx,y,t,1.5,{})}
    else{const kk=seg(t,t0,t0+.6),y=lerp(ay+40,pondY+40+(i%2)*60,kk)-Math.sin(kk*Math.PI)*260;
      if(kk<1){g.save();g.translate(xx,y);g.rotate(kk*6.28);h.hero(c,0,0,t,{});g.restore()}
      else{g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=4;for(let r=0;r<2;r++){const q=((t*.8+r*.5)%1);g.beginPath();g.ellipse(xx,y-10,40+q*60,12+q*18,0,0,7);g.stroke()}h.hero(c,xx,y-20+Math.sin(t*3+i)*6,t,{});g.fillStyle='rgba(60,160,220,.85)';g.beginPath();g.ellipse(xx,y-14,64,22,0,0,7);g.fill()}
      if(kk>.9&&kk<1||t-t0-.6<.5&&t>t0+.6){for(let j=0;j<10;j++){const q=seg(t,t0+.55,t0+1.1),a=-Math.PI*(j/9);g.fillStyle='rgba(180,230,255,.9)';g.beginPath();g.arc(xx+Math.cos(a)*q*120,pondY+40+Math.sin(a)*q*140,8,0,7);g.fill()}}}});
  if(t>T4+2.4)h.say(TXT.splash,540,pondY-330,t,T4+2.4,70,'#ffc531','#0b5d8a',-.05)}
let shake=0;
function scenes(t){h.clip();
  if(t<T1)sceneA(t);else if(t<11)sceneB(t);else if(t<T3)sceneC(t);else if(t<T4)sceneD(t);else sceneF(t);
  g.restore();
  if(t>T1&&t<T4){const fr=(t>7.4?1:0)+(t>12.6?1:0),pp=t>17.3?1:0,md=t>21.1?1:0;h.counter(t,[{label:'🐸 '+fr},{label:'💩 '+pp},{label:'🤼 '+md}])}
  h.next(t)}
function icon(t){g.save();g.scale(1.8,1.8);rider('donkey',-60,40,t,1,{});g.restore();g.save();g.translate(170,60);g.scale(2,2);E.bkFrog(g,0,0,0,t,1);g.restore()}
const caps=[[.3,5.4,'c1'],[5.6,10.9,'c2'],[11.1,14.9,'c3'],[15.1,18.9,'c4'],[19.1,22.9,'c5'],[23.1,26.4,'c6']];
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,caps,icon,[T1,11,T3,T4,T5])}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).bike={
 ru:{c1:'Сбежали из больницы — все по велосипедам! 🚲',c2:'Лягушки на дороге… и полиция на хвосте! 🐸🚓',c3:'Полицейский со свистком… споткнулся о лягушку!',c4:'Ослик въехал в коровью лепёшку… а сзади полиция 💩',c5:'Бездорожье! Толкни друга — прямо в грязь!',c6:'Финиш — с разгона прямо в пруд! 💦',
  hosp:'БОЛЬНИЦА',run:'ПО ВЕЛИКАМ!',stop:'А УКОЛ?!',kva:'КВА!',donut:'МОЙ ПОНЧИК!',whistle:'ФЬЮ-ФЬЮ! СТОЙ!',ouch:'ОЙ-ОЙ!',siren:'ВИУ-ВИУ!',fuu:'ФУ-У-У!',plus2:'+2 ОБРЫЗГАЛ!',shove:'ТОЛЧОК!',mud:'В ГРЯЗЬ!',finish:'ФИНИШ',splash:'ПЛЮХ!!!',
  next:'Продолжение следует… ⚡',tag:'🚲 Серия 17 · Велосипеды',title:'Велосипеды',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Escaped from the hospital — everyone on a bike! 🚲',c2:'Frogs on the road… and the police on our tail! 🐸🚓',c3:'The whistle cop… tripped over a frog!',c4:'The Donkey rode through a cow pat… with the cops right behind 💩',c5:'Off-road! Shove a friend — straight into the mud!',c6:'Finish line — straight into the pond! 💦',
  hosp:'HOSPITAL',run:'TO THE BIKES!',stop:'YOUR SHOT?!',kva:'CROAK!',donut:'MY DONUT!',whistle:'TWEET! STOP!',ouch:'OOPS!',siren:'WEE-OO!',fuu:'EWWW!',plus2:'+2 SPLATTERED!',shove:'SHOVE!',mud:'INTO THE MUD!',finish:'FINISH',splash:'SPLASH!!!',
  next:'To be continued… ⚡',tag:'🚲 Episode 17 · Bike Escape',title:'Bike Escape',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'ברחנו מבית החולים — כולם על אופניים! 🚲',c2:'צפרדעים על הכביש… והמשטרה רודפת! 🐸🚓',c3:'השוטר עם המשרוקית… מעד על צפרדע!',c4:'החמור נסע דרך גללים… והשוטר מאחוריו 💩',c5:'שטח! תדחוף חבר — ישר לבוץ!',c6:'קו הסיום — ישר לתוך הבריכה! 💦',
  hosp:'בית חולים',run:'לאופניים!',stop:'והזריקה?!',kva:'קוואק!',donut:'הסופגנייה שלי!',whistle:'פְּרִי! עצור!',ouch:'אוי-אוי!',siren:'ויו-ויו!',fuu:'איכס!',plus2:'+2 התיז!',shove:'דחיפה!',mud:'לבוץ!',finish:'סיום',splash:'פלאש!!!',
  next:'המשך יבוא… ⚡',tag:'🚲 פרק 17 · בריחה באופניים',title:'בריחה באופניים',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
