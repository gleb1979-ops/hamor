(window.EPISODES=window.EPISODES||{}).snow=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#16233a',b:'#22365a',dot:'230,240,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('snow');
const POS={girl:[600,640],fat:[690,420],tall:[880,640],nerd:[930,430]};
// throws: [t, from, to, mega]
const TH=[[11.6,'girl','fat'],[12.3,'nerd','tall'],[13.1,'fat','girl'],[13.8,'tall','nerd'],[14.6,'girl','nerd'],[15.3,'nerd','fat'],[16.6,'girl','tall',1],[17.6,'fat','girl']];
function sb(x,y,r){g.fillStyle='rgba(0,0,0,.15)';g.beginPath();g.ellipse(x+3,y+r*1.8,r,r*.35,0,0,7);g.fill();g.beginPath();g.arc(x,y,r,0,7);g.fillStyle='#fff';g.fill();g.lineWidth=2.5;g.strokeStyle='#2b1b30';g.stroke();g.fillStyle='rgba(160,200,255,.6)';g.beginPath();g.arc(x+r*.3,y+r*.3,r*.45,0,7);g.fill()}
function hitAt(c,t){for(const th of TH){if(th[2]===c&&t>th[0]+.45&&t<th[0]+1.2)return th}return null}
function friend(c,t){const p=POS[c];if(t<T2)return path(t,[[0,p[0],p[1]+420],[3.5,p[0],p[1]]]);if(c==='fat'&&t>T3)return path(t,[[T3,p[0],p[1]],[T3+1,p[0]+60,p[1]+40,1]]);return [p[0]+Math.sin(t*1.3+p[0])*14,p[1],false,p[0]<750?1:-1]}
function scenes(t){h.clip();const cx=t>T4?lerp(760,1100,ease(seg(t,T4,T4+1))):760;h.cam(cx,520,2.0);g.drawImage(map,0,0);
  // falling snow
  for(let i=0;i<60;i++){const k=t*.35+h.rnd(i);g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.arc(400+h.rnd(i+3)*1000+Math.sin(t+i)*20,120+((k*600)%760),2.5+h.rnd(i+5)*3,0,7);g.fill()}
  // giant snowball rolled by donkey onto tall
  const gb=path(t,[[5.8,960,300],[8.4,POS.tall[0],POS.tall[1]-20]]),stuck=t>8.4&&t<T2+.6;
  h.FR.forEach((c,i)=>{const p=friend(c,t),hit=hitAt(c,t);h.add(p[1],()=>{h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],stun:!!hit||(c==='tall'&&stuck)});if(c==='tall'&&stuck){g.save();sb(p[0],p[1]-60,78);g.restore()}})});
  if(t>5.8&&t<8.4)h.add(gb[1],()=>{const r=30+seg(t,5.8,8.4)*48;g.save();g.translate(gb[0],gb[1]-r);g.rotate(-t*4);sb(0,0,r);g.restore()});
  const dk=path(t,[[0,1050,900,-1],[4,1010,290,-1],[5.8,1010,270,-1],[8.4,990,330,-1],[T3,990,330,-1],[T4,1000,500,1]]);h.add(dk[1],()=>h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]}));
  // boxer appears in S5
  if(t>T4){const bx=path(t,[[T4,1450,560,-1],[T4+.8,1260,560,-1]]),hitB=t>T4+.9;h.add(bx[1],()=>{E.drawTeacher(g,{k:'pe',x:bx[0],y:bx[1],a:Math.PI,st:hitB?1:0,moving:bx[2]},t);g.fillStyle='#d32f2f';for(const d of [-1,1]){g.beginPath();g.arc(bx[0]+d*42,bx[1]-120,17,0,7);g.fill();g.strokeStyle='#2b1b30';g.lineWidth=2.5;g.stroke()}
    if(hitB){g.fillStyle='#fff';g.beginPath();g.ellipse(bx[0]-6,bx[1]-205,30,22,0,0,7);g.fill()}})}
  h.flush();
  // flying snowballs
  for(const [t0,a,b,m] of TH){if(t<t0||t>t0+.5)continue;const k=seg(t,t0,t0+.5),A=friend(a,t0),Bp=friend(b,t0);const x=lerp(A[0],Bp[0],k),y=lerp(A[1]-90,Bp[1]-90,k)-Math.sin(k*Math.PI)*90;if(m){g.fillStyle='rgba(255,215,60,.5)';g.beginPath();g.arc(x,y,40,0,7);g.fill()}sb(x,y,m?24:12)}
  for(const [t0,a,b,m] of TH){if(t>t0+.45&&t<t0+1){const Bp=friend(b,t);const k=seg(t,t0+.45,t0+1);for(let j=0;j<8;j++){const an=j/8*6.28;g.fillStyle=`rgba(255,255,255,${1-k})`;g.beginPath();g.arc(Bp[0]+Math.cos(an)*k*(m?120:60),Bp[1]-90+Math.sin(an)*k*(m?80:40),m?10:6,0,7);g.fill()}if(m)h.say(TXT.mega,Bp[0],Bp[1]-260,t,t0+.45,28,'#ffc531','#2f7bff')}}
  // gold star pickup
  if(t>15.4&&t<16.6){const gp=POS.girl;g.save();g.translate(gp[0]+10,gp[1]-30-Math.abs(Math.sin(t*6))*10);g.fillStyle='#ffc531';E.star(g,0,0,18);g.fill();g.restore()}
  // big throw by fat
  if(t>T3+1.2&&t<T4+1){const k=seg(t,T3+1.2,T4+.9),A=friend('fat',T3+1.2);const x=lerp(A[0],1250,k),y=lerp(A[1]-100,360,k)-Math.sin(k*Math.PI)*260;sb(x,y,30)}
  if(t>T4+.9&&t<T4+1.6){g.fillStyle='rgba(255,255,255,.8)';for(let j=0;j<10;j++){const an=j/10*6.28,k=seg(t,T4+.9,T4+1.6);g.beginPath();g.arc(1250+Math.cos(an)*k*90,360+Math.sin(an)*k*60,8,0,7);g.fill()}}
  if(t>T4+1.3){h.say(TXT.boxer,1180,250,t,T4+1.3,24,'#ffffff','#d32f2f');h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'drops':'exclamation',p[0],p[1]-250,1.2*pop(t,T4+1.6+i*.07))})}
  if(t>6.2&&t<8.4)h.emo('laugh',dk[0],dk[1]-250,1.2*pop(t,6.3));if(t>8.4&&t<10.8)h.say(TXT.help,POS.tall[0],POS.tall[1]-260,t,8.5,22,'#fff','#2f7bff');
  if(t>1&&t<4.5)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'heart':'stars',p[0],p[1]-250,1.1*pop(t,1.3+i*.1))});
  g.restore();
  if(t>T2&&t<T3+1){const n=c=>TH.filter(x=>x[1]===c&&t>x[0]+.45).length+TH.filter(x=>x[1]===c&&x[3]&&t>x[0]+.45).length;h.counter(t,h.FR.map(c=>({c,label:'❄️ '+n(c)})))}
  h.next(t)}
function icon(t){g.scale(4,4);sb(0,-6,22)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).snow={
 ru:{c1:'Пошёл снег! Значит — снежная битва!',c2:'Ослик скатил огромный ком прямо на Длинного 😈',c3:'Целься и кидай! Прячься за снеговиками!',c4:'Золотой мега-снежок! 💥',c5:'Пухляш слепил самый большой снежок…',c6:'…и попал в боксёра! «Ах так?! На ринг!»',mega:'МЕГА!',help:'ПОМОГИТЕ!',boxer:'АХ ТАК?! НА РИНГ!',
  next:'Продолжение следует… 🥊',tag:'❄️ Серия 5 · Снежная битва',title:'Снежная битва',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'It\'s snowing! That means — SNOW BATTLE!',c2:'The Donkey rolled a giant snowball right onto Lanky 😈',c3:'Aim and throw! Hide behind the snowmen!',c4:'Golden mega-snowball! 💥',c5:'Chubby made the BIGGEST snowball…',c6:'…and hit a boxer! "Oh yeah?! To the ring!"',mega:'MEGA!',help:'HELP!',boxer:'OH YEAH?! TO THE RING!',
  next:'To be continued… 🥊',tag:'❄️ Episode 5 · Snow Battle',title:'Snow Battle',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'יורד שלג! זאת אומרת — קרב כדורי שלג!',c2:'החמור גלגל כדור שלג ענק ישר על הגבוה 😈',c3:'כוונו וזרקו! תסתתרו מאחורי אנשי השלג!',c4:'כדור שלג זהב ענק! 💥',c5:'השמנמן גלגל את כדור השלג הכי גדול…',c6:'…ופגע במתאגרף! "אה ככה?! לזירה!"',mega:'מגה!',help:'הצילו!',boxer:'אה ככה?! לזירה!',
  next:'המשך יבוא… 🥊',tag:'❄️ פרק 5 · קרב כדורי שלג',title:'קרב כדורי שלג',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
