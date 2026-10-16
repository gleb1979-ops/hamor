(window.EPISODES=window.EPISODES||{}).sniper=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#060a1c',b:'#0e1636',dot:'160,200,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const city=h.floor('sniper','city'),forest=h.floor('sniper','forest');
const CS=[[170,320,'bin'],[470,320,'wall'],[800,320,'box'],[1080,320,'wall'],[1340,320,'bin'],[300,535,'car'],[730,535,'car'],[1160,535,'car'],[160,765,'box'],[520,765,'wall'],[930,765,'bin'],[1320,765,'box']];
const FS=[[190,330,'bush'],[500,330,'rock'],[810,330,'bush'],[1110,330,'log'],[1350,330,'bush'],[170,765,'rock'],[540,765,'bush'],[950,765,'log'],[1330,765,'bush']];
const LAMPS=[[620,300,170],[990,690,170],[150,410,130]],SW=[985,395],CUT=12.9,ALL=['girl','fat','tall','nerd','donkey'];
let dk=null;
// forest road (same bezier as the game map)
const RD=[];(function(){const bz=(p0,p1,p2,p3,k)=>{const u=1-k;return u*u*u*p0+3*u*u*k*p1+3*u*k*k*p2+k*k*k*p3};for(let i=0;i<=60;i++){const k=i/60;RD.push([bz(-20,300,520,760,k),bz(600,420,700,520,k)])}for(let i=1;i<=60;i++){const k=i/60;RD.push([bz(760,980,1200,1530,k),bz(520,360,660,470,k)])}})();
function roadY(x){if(x<=RD[0][0])return RD[0][1];for(let i=1;i<RD.length;i++)if(RD[i][0]>=x){const a=RD[i-1],b=RD[i],k=(x-a[0])/(b[0]-a[0]||1);return a[1]+(b[1]-a[1])*k}return RD[RD.length-1][1]}
// --- city part
function dark(t){return t<7.1?0:seg(t,7.1,7.5)}
function walker(c,t){const i=ALL.indexOf(c);
  if(c==='donkey'){if(t<10.2)return path(t,[[0,1180,900,-1],[4,1150,760,-1],[6.4,SW[0]+60,SW[1]+10,-1],[7.6,SW[0]+60,SW[1]+10,-1],[9.4,880,600,-1],[10.2,880,600,1]]);return path(t,[[10.2,880,600,1],[12.6,1560,600,1]])}
  const w=[[620,640],[700,700],[820,640],[900,700]][i];if(t<10.2)return path(t,[[0,w[0]-40,w[1]+330],[4.2,w[0],w[1]],[10.2,w[0],w[1]]]);return path(t,[[10.2+i*.08,w[0],w[1]],[12.7,w[0]+900,w[1]-40]])}
function swBox(on){g.save();g.translate(SW[0],SW[1]);g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(0,4,30,8,0,0,7);g.fill();E.rr(g,-24,-74,48,76,6);E.sh(g,'#5b6475',3);g.fillStyle='#ffc531';g.beginPath();g.moveTo(-6,-58);g.lineTo(4,-58);g.lineTo(-2,-46);g.lineTo(6,-46);g.lineTo(-6,-30);g.lineTo(-2,-42);g.lineTo(-8,-42);g.closePath();g.fill();
  g.strokeStyle='#2b1b30';g.lineWidth=5;g.beginPath();g.moveTo(24,-40);g.lineTo(40,on?-58:-22);g.stroke();g.fillStyle='#e8412c';g.beginPath();g.arc(40,on?-58:-22,7,0,7);g.fill();g.restore()}
function covers(S){for(const s of S)h.add(s[1]+1,()=>E.snCover(g,s[0],s[1],s[2]))}
const CSHOT=[[8.6,1080,262,'fat',-30],[9.3,470,262,'girl',40],[10.0,1080,262,'nerd',-50],[10.9,800,262,'tall',60],[11.7,470,262,'fat',-40]];
// --- forest part
function runner(c,t){const i=ALL.indexOf(c),lead=lerp(330,640,seg(t,CUT,17.9))-i*58,y=roadY(lead)+(i%2?16:-14);return [lead,y,t<17.9,1]}
const CAR0=700;function carX(t){return t<18.6?CAR0:CAR0+Math.pow(seg(t,18.6,22.9),1.6)*1050}
const FSHOT=[[14.2,500,262,-80],[15.0,810,262,-40],[16.4,1170,478,-60],[17.2,810,262,40],[19.4,1170,478,-120],[20.3,1350,262,-150],[21.3,1350,262,-60]];
const GREN=[15.5,16.25];
function drawCar(x,y,t,full,rot){const sx=x-40,sy=y-10;g.save();if(rot){g.translate(x,y);g.rotate(rot);g.translate(-x,-y)}E.snCover(g,sx,sy,'car');
  if(full){g.save();g.beginPath();g.rect(x+12,sy-94,86,38);g.clip();[['girl',x+24],['fat',x+44],['tall',x+70],['nerd',x+90]].forEach(([c,hx],i)=>{g.save();g.translate(hx,sy-30);g.scale(.55,.55);h.hero(c,0,0,t+i,{});g.restore()});g.restore();
    g.save();g.translate(x+55,sy-96);g.scale(.72,.72);h.hero('donkey',0,0,t,{});g.restore()}g.restore()}
function forestWorld(t,forScope){g.drawImage(forest,0,0);covers(FS);const cx=carX(t),cy=roadY(cx+40)+8,bump=t>18.6?Math.sin(t*28)*2.5:0,inCar=t>18.3;
  h.add(cy,()=>drawCar(cx,cy+bump,t,inCar,t>18.6?Math.sin(t*9)*.02:0));
  if(!inCar)for(const c of ALL){const r=runner(c,t),k=seg(t,17.9,18.3);if(t>17.9&&k>=1)continue;const x=lerp(r[0],cx+60,k),y=lerp(r[1],cy-10,k);h.add(y,()=>h.hero(c,x,y,t+ALL.indexOf(c)*.3,{mv:r[2],face:1}))}
  h.flush()}
function cityWorld(t){g.drawImage(city,0,0);covers(CS);h.add(SW[1],()=>swBox(t<7));for(const c of ALL){const p=walker(c,t);h.add(p[1],()=>h.hero(c,p[0],p[1],t+ALL.indexOf(c)*.3,{mv:p[2],face:p[3]}))}h.flush()}
function darkness(a,holes){if(a<=0)return;if(!dk){dk=document.createElement('canvas');dk.width=750;dk.height=430}const d=dk.getContext('2d');d.setTransform(.5,0,0,.5,0,0);d.globalCompositeOperation='source-over';d.clearRect(0,0,1500,860);d.fillStyle=`rgba(3,5,16,${.965*a})`;d.fillRect(0,E.TOP-14,1500,860);d.globalCompositeOperation='destination-out';
  for(const [x,y,r,al] of holes){if(r<2||al<=0)continue;const gr=d.createRadialGradient(x,y,r*.25,x,y,r);gr.addColorStop(0,`rgba(0,0,0,${Math.min(1,al)})`);gr.addColorStop(1,'rgba(0,0,0,0)');d.fillStyle=gr;d.beginPath();d.arc(x,y,r,0,7);d.fill()}d.globalCompositeOperation='source-over';g.drawImage(dk,0,0,1500,860)}
function redScope(x,y,R){if(R<2)return;g.save();g.fillStyle='rgba(255,40,40,.08)';g.beginPath();g.arc(x,y,R,0,7);g.fill();g.lineWidth=5;g.strokeStyle='rgba(255,60,60,.85)';g.beginPath();g.arc(x,y,R,0,7);g.stroke();g.lineWidth=2;g.beginPath();g.moveTo(x-R,y);g.lineTo(x-10,y);g.moveTo(x+10,y);g.lineTo(x+R,y);g.moveTo(x,y-R);g.lineTo(x,y-10);g.moveTo(x,y+10);g.lineTo(x,y+R);g.stroke();g.fillStyle='#ff3030';g.beginPath();g.arc(x,y,4,0,7);g.fill();g.restore()}
function shots(t,list,target,dr){const holes=[];for(const [t0,sx,sy,a,b] of list){const k=t-t0;if(k<0||k>.6)continue;const [tx,ty]=target(a,b,t0);holes.push([sx,sy,170*(1-k),1-k/.6]);if(!dr)continue;
  if(k<.18){g.strokeStyle=`rgba(255,232,150,${1-k/.18})`;g.lineWidth=4;g.beginPath();g.moveTo(sx,sy);g.lineTo(tx,ty);g.stroke();g.fillStyle='#fff3b0';g.beginPath();g.arc(sx,sy,16,0,7);g.fill()}
  g.fillStyle=`rgba(255,220,120,${1-k/.6})`;for(let i=0;i<7;i++){const an=i*.9;g.beginPath();g.arc(tx+Math.cos(an)*k*50,ty+Math.sin(an)*k*30,4,0,7);g.fill()}
  if(k<.55)h.say(TXT.bang,tx,ty-90,t,t0,26,'#fff','#e8412c')}return holes}
// --- race (cliffhanger)
function race(t){g.fillStyle='#14161f';g.fillRect(-200,300,1900,700);g.fillStyle='#232633';g.fillRect(-200,430,1900,300);g.fillStyle='#c9b65a';for(let x=-200;x<1700;x+=140)g.fillRect(x,575,70,8);
  for(let r=0;r<10;r++)for(let c=0;c<2;c++){g.fillStyle=(r+c)%2?'#fff':'#111';g.fillRect(940+c*20,430+r*30,20,30)}
  g.fillStyle='#3a3f50';g.fillRect(900,180,24,560);g.fillRect(1010,180,24,560);g.fillStyle='#e8412c';E.rr(g,850,150,230,70,14);g.fill();h.text(TXT.race,965,186,30,'#ffe066',{sc:'#5a2410',max:220});
  for(let i=0;i<9;i++){const on=((t*6+i)|0)%2;g.fillStyle=on?'#ffe066':'#7a5a20';g.beginPath();g.arc(860+i*26,232,6,0,7);g.fill()}
  [[1100,520,150],[1100,690,280]].forEach(([x,y,hu])=>{g.save();g.filter=`hue-rotate(${hu}deg) saturate(1.6)`;drawCar(x,y,t,false,0);g.restore();const gr=g.createRadialGradient(x+170,y-30,10,x+170,y-30,160);gr.addColorStop(0,'rgba(255,240,180,.5)');gr.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=gr;g.beginPath();g.arc(x+170,y-30,160,0,7);g.fill()});
  const k=ease(seg(t,T4,T4+1.3)),x=lerp(-200,690,k),y=600+Math.sin(t*30)*(k<1?2:0);drawCar(x,y,t,true,k<1?-.03:0);const gr=g.createRadialGradient(x+170,y-30,10,x+170,y-30,170);gr.addColorStop(0,'rgba(255,240,180,.55)');gr.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=gr;g.beginPath();g.arc(x+170,y-30,170,0,7);g.fill();
  if(t>T4+1.4)['exclamation','stars','exclamation'].forEach((e,i)=>h.emo(e,x+20+i*50,y-200,.9*pop(t,T4+1.4+i*.1)))}
function scenes(t){h.clip();
  if(t<CUT){h.cam(760,540,1.45);cityWorld(t);const holes=LAMPS.map(([x,y,r])=>[x,y,r*.85,.36]);for(const c of ALL){const p=walker(c,t);holes.push([p[0],p[1]-60,95,.6])}
    const tgt=(c,off,t0)=>{const p=walker(c,t0+.1);return [p[0]+off,p[1]+5]};
    const sh=dark(t)>0?shots(t,CSHOT,tgt,0):[];darkness(dark(t),holes.concat(sh));if(dark(t)>0)shots(t,CSHOT,tgt,1);
    if(t>7&&t<8.4)h.say(TXT.click,SW[0],SW[1]-150,t,7,30,'#fff','#2f7bff');
    if(t>7.6&&t<12.6){const p=walker('fat',t),R=150*pop(t,7.6);redScope(lerp(1100,p[0],seg(t,7.6,8.5))+Math.sin(t*2.3)*40,p[1]-80+Math.cos(t*1.7)*30,R)}
    if(t>8.7&&t<10.3)for(const c of ALL){const p=walker(c,t);h.emo('exclamation',p[0],p[1]-240,1*pop(t,8.7+ALL.indexOf(c)*.06))}
    if(t>10.2&&t<12.4)h.say(TXT.run,900,330,t,10.2,40,'#ffc531','#e8412c')}
  else if(t<T4){const lead=t<18.3?runner('girl',t)[0]:carX(t)+80;h.cam(h.cl(lead-60,284,1216),500,1.9);forestWorld(t);
    const cx=carX(t),cy=roadY(cx+40);const holes=[];for(const c of ALL){if(t>18.3)break;const r=runner(c,t);holes.push([r[0],r[1]-60,95,.6])}
    if(t>18.3){holes.push([cx+40,cy-50,170,.85],[cx+210,cy-30,170,.95],[cx+380,cy-20,140,.7])}else holes.push([cx+40,cy-50,110,.35]);
    const fl=t-GREN[1];if(fl>0&&fl<1.6){const r=runner('girl',GREN[1]);holes.push([r[0]-60,r[1]-60,300,(fl<.1?fl/.1:fl>1.2?(1.6-fl)/.4:1)*1.15])}
    const tgt=(off,_,t0)=>{if(t0>18.3){const x=carX(t0+.1);return [x+off,roadY(x+40)-30]}const r=runner('fat',t0+.1);return [r[0]+off,r[1]-10]};
    const sh=shots(t,FSHOT,tgt,0);darkness(1,holes.concat(sh));shots(t,FSHOT,tgt,1);
    if(fl>0&&fl<.3){const r=runner('girl',GREN[1]);g.fillStyle=`rgba(255,250,225,${.6*(1-fl/.3)})`;g.beginPath();g.arc(r[0]-60,r[1]-60,320,0,7);g.fill()}
    if(t>GREN[0]&&t<GREN[1]){const k=seg(t,GREN[0],GREN[1]),r=runner('girl',GREN[1]),x=lerp(1100,r[0]-60,k),y=lerp(300,r[1]-60,k)-Math.sin(k*Math.PI)*220;g.fillStyle='#2e3a2a';g.strokeStyle='#2b1b30';g.lineWidth=2;g.beginPath();g.arc(x,y,11,0,7);g.fill();g.stroke();g.fillStyle=(t*10|0)%2?'#ff4040':'#ffd040';g.beginPath();g.arc(x+5,y-9,4,0,7);g.fill()}
    for(let i=0;i<14;i++){const x=h.rnd(i)*1500,y=180+h.rnd(i+30)*640,a=Math.max(0,Math.sin(t*1.7+i));g.fillStyle=`rgba(210,255,120,${a*.85})`;g.beginPath();g.arc(x+Math.sin(t+i)*8,y,3,0,7);g.fill()}
    if(t>13.4&&t<21.6){const p=t<18.3?runner('nerd',t):[cx+60,cy];redScope(p[0]+Math.sin(t*2.1)*60-40,p[1]-80+Math.cos(t*1.5)*35,150*pop(t,13.4))}
    if(fl>.05&&fl<1.4){const r=runner('girl',GREN[1]+fl);h.say(TXT.oops,r[0]-40,r[1]-280,t,GREN[1]+.05,30,'#fff','#7b3fe4')}
    if(t>16.8&&t<18.4)h.say(TXT.car,CAR0+40,roadY(CAR0)-260,t,16.8,34,'#ffc531','#e8412c');
    if(t>19&&t<21){const x=carX(t);h.say(TXT.gas,x+55,roadY(x+40)-300,t,19,32,'#fff','#e8412c')}}
  else{h.cam(880,520,1.45);race(t)}
  g.restore();h.next(t)}
function icon(t){g.save();g.scale(1.3,1.3);drawCar(-60,90,t,true,0);g.restore();g.lineWidth=22;g.strokeStyle='#050607';g.beginPath();g.arc(0,0,230,0,7);g.stroke();g.lineWidth=5;g.strokeStyle='#4dff7c';g.beginPath();g.arc(0,0,218,0,7);g.stroke();g.strokeStyle='rgba(0,0,0,.8)';g.lineWidth=4;g.beginPath();g.moveTo(-218,0);g.lineTo(-20,0);g.moveTo(20,0);g.lineTo(218,0);g.moveTo(0,-218);g.lineTo(0,-20);g.moveTo(0,20);g.lineTo(0,218);g.stroke();g.fillStyle='#ff2d2d';g.beginPath();g.arc(0,0,7,0,7);g.fill()}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon,[CUT,T4,T5])}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).sniper={
 ru:{c1:'После пиццы друзья идут домой через ночной город…',c2:'Ослик выключил свет… и вдруг по ним стреляют! 😱',c3:'Бежим! Из города — в ночной лес! 🌲',c4:'В лесу тоже снайперы… А вот и машина! 🚗',c5:'Все в машину — жми на газ!',c6:'Они вылетели… прямо на ночные гонки! 🏁',click:'ЩЁЛК!',bang:'БАХ!',run:'БЕЖИМ!',oops:'НАС ВИДНО!',car:'В МАШИНУ!',gas:'ЖМИ!',race:'НОЧНЫЕ ГОНКИ',
  next:'Продолжение следует… 🏎️',tag:'🎯 Серия 14 · Ночной снайпер',title:'Ночной снайпер',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'After the pizza, the friends walk home through the night city…',c2:'The Donkey switched off the lights… and suddenly someone is shooting! 😱',c3:'Run! Out of the city — into the night forest! 🌲',c4:'Snipers in the forest too… And here\'s a car! 🚗',c5:'Everybody in — step on it!',c6:'They burst out… right into a night race! 🏁',click:'CLICK!',bang:'BANG!',run:'RUN!',oops:'THEY SEE US!',car:'GET IN THE CAR!',gas:'GO GO GO!',race:'NIGHT RACE',
  next:'To be continued… 🏎️',tag:'🎯 Episode 14 · Night Sniper',title:'Night Sniper',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'אחרי הפיצה החברים הולכים הביתה דרך העיר בלילה…',c2:'החמור כיבה את האורות… ופתאום מישהו יורה עליהם! 😱',c3:'בורחים! מהעיר — ליער החשוך! 🌲',c4:'גם ביער יש צלפים… והנה מכונית! 🚗',c5:'כולם לאוטו — סעו מהר!',c6:'הם התפרצו… ישר למרוץ לילה! 🏁',click:'קליק!',bang:'בום!',run:'בורחים!',oops:'רואים אותנו!',car:'לאוטו!',gas:'גז!',race:'מרוץ לילה',
  next:'המשך יבוא… 🏎️',tag:'🎯 פרק 14 · צלף לילה',title:'צלף לילה',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
