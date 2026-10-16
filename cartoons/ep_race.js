(window.EPISODES=window.EPISODES||{}).race=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#070a1c',b:'#121a3c',dot:'255,210,120'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('race','city'),TR=E.rcT(),L=TR.L,N=TR.N;
const at=s=>{s=((s%L)+L)%L;const f=s/TR.ds,i=Math.floor(f)%N,j=(i+1)%N,k=f-Math.floor(f);let da=TR.A[j]-TR.A[i];while(da>Math.PI)da-=6.283;while(da<-Math.PI)da+=6.283;return [TR.X[i]+(TR.X[j]-TR.X[i])*k,TR.Y[i]+(TR.Y[j]-TR.Y[i])*k,TR.A[i]+da*k]};
const pos=(s,lat)=>{const [x,y,a]=at(s);return [x-Math.sin(a)*lat,y+Math.cos(a)*lat,a]};
const GO=5,FIN=19.5,COL=E.CH;
const CARS=[{c:'girl',d:60,lat:-36},{c:'fat',d:60,lat:36},{c:'tall',d:142,lat:-36},{c:'nerd',d:142,lat:36},{c:'donkey',d:224,lat:-36},{c:'r1',d:224,lat:36,bot:1,head:'fat'},{c:'r2',d:306,lat:0,bot:1,head:'tall'}];
CARS.forEach(o=>{o.v=(L+o.d)/(FIN-GO)});
const OIL_I=TR.obi;let TOIL=GO+(OIL_I*TR.ds+60)/((L+60)/(FIN-GO));if(TOIL<11.5||TOIL>14.5)TOIL=12.6;
function base(o,t){return -o.d+o.v*Math.max(0,Math.min(t,FIN)-GO)}
function car(o,t){let s=base(o,t),lat=o.lat,spin=0;
  if(t>GO)lat=o.lat*(.6+.4*Math.cos((t-GO)*.7+o.d))+(t>FIN-1.5?o.lat*-.3:0);
  if(o.c==='donkey'){const K=[[0,-o.d,-36],[GO,-o.d,-36],[6.4,-o.d+230*1.4,-36],[7.4,-o.d+230*1.4+330,-20],[7.9,-o.d+230*1.4+420,175],[12,-o.d+230*1.4+420,175],[13,-o.d+230*1.4+520,40],[15,-o.d+230*1.4+820,0],[FIN,L,0]];
    let r=K[K.length-1];for(let i=1;i<K.length;i++)if(t<=K[i][0]){const a=K[i-1],b=K[i],k=(t-a[0])/(b[0]-a[0]);r=[0,lerp(a[1],b[1],k),lerp(a[2],b[2],ease(k))];break}s=r[1];lat=r[2];if(t>7.9&&t<12)spin=Math.sin(t*3)*.15+.9}
  if(o.c==='tall'&&t>8.3&&t<10.5){const k=t<8.7?seg(t,8.3,8.7):1-seg(t,8.7,10.5);lat=lerp(lat,-95,k);s-=60*Math.sin(seg(t,8.3,10.5)*Math.PI)}
  if(o.c==='r1'&&t>8&&t<8.9)lat=lerp(36,-20,Math.sin(seg(t,8,8.9)*Math.PI));
  if(o.bot&&t>TOIL&&t<TOIL+1.2){spin=(t-TOIL)*12;s-=80*Math.sin(seg(t,TOIL,TOIL+1.2)*Math.PI/2)}else if(o.bot&&t>=TOIL+1.2&&t<FIN)s-=80*(1-seg(t,TOIL+1.2,FIN));
  let [x,y,a]=pos(s,lat);a+=spin;
  if(t>FIN){const i=CARS.indexOf(o),k=ease(seg(t,FIN,FIN+.6)),[fx,fy]=pos(L,0);x=lerp(x,fx+Math.cos(i*2.4)*52+12,k);y=lerp(y,fy+Math.sin(i*2.4)*38,k);a+=k*(i%2?1.3:-1.1)*(1+i*.2)}
  return [x,y,a]}
function amb(t){const [fx,fy]=pos(L,0);return [lerp(fx+700,fx+150,ease(seg(t,21,22.6))),fy-10,Math.PI]}
function drawAmb(x,y,a,t){E.rcCar(g,x,y,a,'#f2f2f2',{});g.save();g.translate(x,y);g.fillStyle='#e8412c';g.fillRect(-6,-16,12,32);g.fillRect(-16,-6,32,12);const bl=(t*6|0)%2;g.fillStyle=bl?'#2f7bff':'#ff3030';g.beginPath();g.arc(-20,0,7,0,7);g.fill();
  const gr=g.createRadialGradient(-20,0,2,-20,0,70);gr.addColorStop(0,bl?'rgba(60,120,255,.45)':'rgba(255,60,60,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(-20,0,70,0,7);g.fill();g.restore()}
function lights(t){const [x,y]=pos(0,0);g.save();g.translate(x,y-120);g.fillStyle='#22252e';E.rr(g,-70,-26,140,52,10);g.fill();g.strokeStyle='#000';g.lineWidth=3;g.stroke();
  for(let i=0;i<3;i++){const on=t>2+i,gr=t>GO&&t<GO+1.6;g.fillStyle=gr?'#38e05a':on?'#ff3030':'#441414';g.beginPath();g.arc(-42+i*42,0,15,0,7);g.fill()}g.restore()}
function race(t){g.drawImage(map,0,0);const [ox,oy]=TR.ob;g.beginPath();g.arc(ox,oy,30,0,7);E.sh(g,t>TOIL&&t<TOIL+6?'#3a4252':'#2f6fd0',3);h.text('OIL',ox,oy+1,16,'#ffc531',{sc:'#000'});
  if(t>TOIL&&t<TOIL+3){const k=seg(t,TOIL,TOIL+3),[px,py]=car(CARS[5],TOIL);g.fillStyle=`rgba(10,10,14,${.7*(1-k)})`;g.beginPath();g.ellipse(px,py,60+k*200,30+k*90,0,0,7);g.fill()}
  if(t<GO+2)lights(t);
  const L2=CARS.map(o=>({o,p:car(o,t)}));L2.sort((a,b)=>a.p[1]-b.p[1]);
  for(const {o,p} of L2){const nit=(o.c==='donkey'&&((t>6.4&&t<7.9)||(t>15&&t<FIN)))||(t>FIN-1.6&&t<FIN);
    if(t>FIN+.3){g.save();g.translate(p[0],p[1]);g.scale(1,.8+.2*Math.cos(t*2+p[0]));g.translate(-p[0],-p[1])}
    E.rcCar(g,p[0],p[1],p[2],o.bot?'#333':COL[o.c].col,{nit,bot:!!o.bot,c:o.head||o.c});if(t>FIN+.3)g.restore()}
  if(t>7.9&&t<12){const [x,y]=car(CARS[4],t);g.fillStyle='#c0471f';for(let i=-1;i<=1;i++){g.beginPath();g.arc(x+i*26,y+30,12,0,7);g.fill()}}
  if(t>20.8&&t<T4)drawAmb(...amb(t),t);
  if(t>FIN){const [fx,fy]=pos(L,0);for(let i=0;i<10;i++){const k=((t-FIN)*.6+h.rnd(i))%1;g.fillStyle=`rgba(200,200,210,${.4*(1-k)})`;g.beginPath();g.arc(fx+(h.rnd(i+3)-.5)*160,fy-k*160,20+k*30,0,7);g.fill()}}}
function cam(t){if(t<GO+.5){const [x,y]=pos(-120,0);return [x+120,y+120]}if(t>FIN){const [x,y]=pos(L,0);return [x,y+60]}let sx=0,sy=0;for(const o of CARS.slice(0,4)){const p=car(o,t);sx+=p[0];sy+=p[1]}return [sx/4,sy/4+40]}
let cs=null;
const BEDS=[['girl',540,600],['fat',780,600],['tall',1020,600],['nerd',660,800],['donkey',900,800]];
function hospital(t){g.fillStyle='#cfe6f0';g.fillRect(200,0,1100,470);g.fillStyle='#b7d4e2';g.fillRect(200,440,1100,30);g.fillStyle='#e9eff3';g.fillRect(200,470,1100,500);g.strokeStyle='rgba(0,0,0,.06)';g.lineWidth=2;for(let x=200;x<1300;x+=70){g.beginPath();g.moveTo(x,470);g.lineTo(x,970);g.stroke()}
  E.rr(g,950,170,170,140,10);g.fillStyle='#0b1236';g.fill();g.strokeStyle='#fff';g.lineWidth=8;g.stroke();g.fillStyle='#f4efd2';g.beginPath();g.arc(1060,215,22,0,7);g.fill();
  g.fillStyle='#fff';E.rr(g,560,170,110,110,14);g.fill();g.fillStyle='#e8412c';g.fillRect(600,190,30,70);g.fillRect(580,210,70,30);
  g.fillStyle='#ffc531';g.beginPath();g.moveTo(860,360);g.lineTo(920,360);g.lineTo(910,410);g.lineTo(870,410);g.closePath();g.fill();g.fillRect(880,410,20,20);g.fillRect(866,430,48,10);g.strokeStyle='#ffc531';g.lineWidth=6;g.beginPath();g.arc(860,378,12,Math.PI/2,Math.PI*1.5);g.stroke();g.beginPath();g.arc(920,378,12,-Math.PI/2,Math.PI/2);g.stroke();h.text('?',890,330,34,'#fff',{sc:'#e8412c'});
  const beds=BEDS;
  beds.forEach(([c,x,y],i)=>{g.fillStyle='#8a9aa8';g.fillRect(x-80,y-10,8,50);g.fillRect(x+72,y-10,8,50);g.fillStyle='#fff';E.rr(g,-0+x-82,y-40,164,40,8);g.fill();g.strokeStyle='#2b1b30';g.lineWidth=3;g.stroke();g.fillStyle='#fff';E.rr(g,x-80,y-62,40,26,10);g.fill();g.stroke();
    g.save();g.translate(x+66,y-44);g.rotate(-Math.PI/2);h.hero(c,0,0,t,{stun:1});const ht=h.ht(c);g.fillStyle='#fff';g.strokeStyle='#bbb';g.lineWidth=2;g.beginPath();g.ellipse(c==='donkey'?6:0,ht+20,26,8,0,0,7);g.fill();g.stroke();g.restore();
    g.fillStyle=['#7fb3ff','#ffb3c8','#b3f0c0','#ffe08a','#d3b3ff'][i];E.rr(g,x-40,y-56,110,26,8);g.fill();g.strokeStyle='#2b1b30';g.stroke();
    if(c==='donkey'){g.fillStyle='#fff';E.rr(g,x+60,y-74,34,22,6);g.fill();g.stroke()}})}
function scenes(t){h.clip();
  if(t<T4){const [cx,cy]=cam(t);h.cam(h.cl(cx,284,1216),h.cl(cy,352,508),1.9);race(t);
    if(t>2&&t<GO)h.say(String(3-Math.floor(t-2)),pos(0,0)[0],pos(0,0)[1]-230,t,2+Math.floor(t-2),60,'#fff','#e8412c');
    if(t>GO&&t<GO+1.5){const [x,y]=pos(0,0);h.say(TXT.go,x+40,y-230,t,GO,48,'#ffc531','#2e7d32')}
    if(t>6.4&&t<7.6){const p=car(CARS[4],t);h.say(TXT.nitro,p[0],p[1]-90,t,6.4,30,'#fff','#2f7bff')}
    if(t>7.9&&t<10){const p=car(CARS[4],t);h.say(TXT.boom,p[0],p[1]-110,t,7.9,34,'#ffc531','#e8412c');h.emo('stars',p[0],p[1]-60,.8*pop(t,8))}
    if(t>8.5&&t<9.6){const p=car(CARS[2],t);h.emo('anger',p[0],p[1]-80,.8*pop(t,8.5))}
    if(t>TOIL&&t<TOIL+1.5){const [ox,oy]=car(CARS[5],TOIL);h.say(TXT.oil,ox,oy-110,t,TOIL,36,'#fff','#7b3fe4')}
    if(t>15&&t<16.6){const p=car(CARS[4],t);h.say(TXT.back,p[0],p[1]-100,t,15,28,'#fff','#e8412c')}
    if(t>FIN){const [fx,fy]=pos(L,0);h.say(TXT.crash,fx,fy-200,t,FIN,52,'#ffc531','#e8412c');for(let i=0;i<5;i++){const k=(t*2+i/5)%1;E.star(g,fx+Math.cos(i*1.26+t*3)*80,fy-60+Math.sin(i*1.26+t*3)*30,10);g.fillStyle='#ffe14d';g.fill()}}
    if(t>21&&t<T4){const p=amb(t);h.say(TXT.siren,p[0]-80,p[1]-90,t,21.1,28,'#fff','#2f7bff')}}
  else{h.cam(780,600,1.35);hospital(t);if(t>T4+.6){const p=[900,800];h.say(TXT.who,p[0],p[1]-170,t,T4+.6,30,'#fff','#e8412c')}
    BEDS.slice(0,4).forEach(([c,x,y],i)=>{if(t>T4+1.2)h.emo(i%2?'drops':'stars',x,y-150,.8*pop(t,T4+1.2+i*.1))})}
  g.restore();
  if(t>GO&&t<FIN){const done=Math.min(1,(t-GO)/(FIN-GO));h.counter(t,[{label:'🏁 3/3'},{label:'🏎️ '+Math.round(done*100)+'%'}])}
  h.next(t)}
function icon(t){g.save();g.scale(3,3);E.rcCar(g,0,0,-.3,COL.girl.col,{nit:1,c:'girl'});g.restore();for(let i=0;i<5;i++){E.star(g,Math.cos(i*1.26+t*3)*170,-120+Math.sin(i*1.26+t*3)*40,16);g.fillStyle='#ffe14d';g.fill()}}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).race={
 ru:{c1:'Ночные гонки! Каждому — своя машина 🏎️',c2:'Ослик включил нитро слишком рано… 😈',c3:'Толкаемся! А тут ещё и масло 🛢️',c4:'Последний рывок! Ослик возвращается!',c5:'Все жмут нитро на финише… БАБАХ! 💥',c6:'…и все вместе попали в больницу! 🏥',go:'ПОЕХАЛИ!',nitro:'НИТРО!',boom:'БУМ!',oil:'МАСЛО!',back:'Я ВЕРНУЛСЯ!',crash:'БАБАХ!',siren:'ИУ-ИУ!',who:'А КТО ПОБЕДИЛ?!',
  next:'Продолжение следует… 🏥',tag:'🏎️ Серия 15 · Ночные гонки',title:'Ночные гонки',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Night race! Everyone gets a car 🏎️',c2:'The Donkey hit the nitro way too early… 😈',c3:'Shoving! And here comes the oil 🛢️',c4:'Final dash! The Donkey is back!',c5:'Everyone hits nitro at the finish… KABOOM! 💥',c6:'…and they all ended up in the hospital! 🏥',go:'GO!',nitro:'NITRO!',boom:'BOOM!',oil:'OIL!',back:'I\'M BACK!',crash:'KABOOM!',siren:'WEE-WOO!',who:'SO WHO WON?!',
  next:'To be continued… 🏥',tag:'🏎️ Episode 15 · Night Race',title:'Night Race',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'מרוץ לילה! לכל אחד מכונית משלו 🏎️',c2:'החמור הפעיל ניטרו מוקדם מדי… 😈',c3:'דוחפים! ופה עוד יש שמן 🛢️',c4:'הדחיפה האחרונה! החמור חוזר!',c5:'כולם לוחצים ניטרו בסיום… בום טראח! 💥',c6:'…וכולם ביחד הגיעו לבית החולים! 🏥',go:'סעו!',nitro:'ניטרו!',boom:'בום!',oil:'שמן!',back:'חזרתי!',crash:'בום טראח!',siren:'ווי-וו!',who:'אז מי ניצח?!',
  next:'המשך יבוא… 🏥',tag:'🏎️ פרק 15 · מרוץ לילה',title:'מרוץ לילה',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
