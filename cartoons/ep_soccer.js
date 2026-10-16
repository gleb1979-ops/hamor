(window.EPISODES=window.EPISODES||{}).soccer=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#0e2412',b:'#16381c',dot:'200,255,200'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
E.setSM&&E.setSM('classic');const map=h.floor('soccer','stadium');const KX=1376,MY=505;
const B=[[0,700,700,0],[5.6,1000,560,0],[8,1000,560,0],[8.5,1330,520,30],[8.8,1060,560,60],[9.1,1000,580,0],[T2,860,520,0],[12,860,520,0],[12.6,1020,380,0],[13.2,1100,420,0],[13.6,1350,480,40],[13.9,1180,520,0],[14.6,1080,600,0],[15.1,1150,600,0],[15.6,1420,520,30],[16.4,1420,520,0],[17.5,900,500,0],[19.6,960,560,0],[20.2,1000,560,0],[21.2,1120,-380,0],[21.6,1120,-700,0]];
function ball(t){for(let i=1;i<B.length;i++)if(t<=B[i][0]){const a=B[i-1],b=B[i],k=seg(t,a[0],b[0]);return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)+Math.sin(k*Math.PI)*(b[2]<0?0:40)]}const z=B[B.length-1];return [z[1],z[2],z[3]]}
function friend(c,t){const i=h.FR.indexOf(c);const base=[[820,420],[880,640],[960,470],[1000,620]][i];const K=[[0,base[0]-500,base[1]],[4.5,base[0],base[1]]];
  if(c==='tall')K.push([7.6,960,560],[8,980,560],[11,860,500],[14.6,1030,600],[15.2,1110,600]);
  if(c==='girl')K.push([11.5,830,520],[12.1,840,520],[13,900,400]);
  if(c==='nerd')K.push([12.6,1000,380],[13.2,1080,420],[13.6,1100,430]);
  if(c==='fat')K.push([18.5,900,560],[19.6,930,560],[20.4,990,560]);
  return path(t,K)}
function keeper(t){if(t>5.5&&t<9.6)return [1250,MY+120,false];const by=ball(t)[1];return [KX,h.cl(by,MY-110,MY+110),true]}
function scenes(t){h.clip();let cy=500,cx=lerp(900,1150,seg(t,0,5));let up=0;if(t>T3+1){up=ease(seg(t,T3+1,T4))}
  h.cam(cx,cy-up*700,2.0);g.drawImage(map,0,0);
  if(up>0){g.save();const gr=g.createLinearGradient(0,-900,0,140);gr.addColorStop(0,'#5aa0e0');gr.addColorStop(1,'#9fd3ff');g.fillStyle=gr;g.fillRect(0,-1000,1500,1140);g.restore();
    // cloud with hole
    const hole=t>T4-.2;g.fillStyle=hole?'#c9d3e0':'#ffffff';for(const [x,y,r] of [[1060,-380,90],[1140,-420,110],[1230,-380,90],[1140,-340,100]]){g.beginPath();g.arc(x,y,r,0,7);g.fill()}
    if(hole){g.fillStyle='#5aa0e0';g.beginPath();g.ellipse(1120,-380,34,26,0,0,7);g.fill()}
    if(t>T4){for(let i=0;i<70;i++){const k=(t-T4)*.5+h.rnd(i);g.fillStyle='#fff';g.beginPath();g.arc(860+h.rnd(i+3)*560,-460+((k*500)%900),3+h.rnd(i+5)*4,0,7);g.fill()}}}
  E.drawGoal(g,t>15.6&&t<16.4?Math.sin(seg(t,15.6,16.4)*Math.PI)*22:0);
  const kp=keeper(t),save=t>13.5&&t<14.1;h.add(kp[1],()=>E.drawTeacher(g,{k:'pe',x:kp[0],y:kp[1],a:Math.PI,st:save?1:t>8.4&&t<9.4?1:0,moving:kp[2]},t));
  h.FR.forEach((c,i)=>{const p=friend(c,t);const hit=c==='tall'&&t>8.8&&t<10;h.add(p[1],()=>h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],stun:hit}))});
  const dk=path(t,[[0,1300,800,-1],[5.6,1300,760],[6.6,KX-10,MY,-1],[9.6,KX-10,MY],[10.4,1250,820,1],[T4,1250,820,-1]]);const kick=t>8.3&&t<8.75;
  h.add(dk[1],()=>{if(kick)E.drawDonkey4(g,{x:dk[0],y:dk[1],face:1},t,seg(t,8.3,8.75));else h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]})});
  const b=ball(t);h.add(b[1],()=>E.drawBall(g,{x:b[0],y:b[1],rot:t*8,h:b[2]}));
  h.flush();
  if(t>6.8&&t<8.3)h.emo('laugh',dk[0],dk[1]-250,1.2*pop(t,6.9));
  if(t>8.9&&t<10){const p=friend('tall',t);h.say(TXT.bonk,p[0],p[1]-280,t,8.9,26,'#fff','#e8412c')}
  if(t>9.4&&t<10.8)h.say(TXT.shoo,KX-60,MY-260,t,9.4,26,'#fff','#2f7bff');
  if(t>15.6&&t<19){g.save();g.translate(1150,300);const k=pop(t,15.6);g.scale(k,k);h.text(TXT.goal,0,0,70,'#ffc531',{sc:'#e8412c'});g.restore();h.confetti(t,15.6,880,120,520,600)}
  if(t>20.1&&t<21)h.say(TXT.boom,1000,420,t,20.1,40,'#fff','#e8412c');
  if(t>T4+.6)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo('exclamation',p[0],p[1]-250,1.1*pop(t,T4+.6+i*.07))});
  g.restore();
  if(t>T2&&t<T3+1)h.counter(t,[{label:'⚽ '+(t>15.6?1:0)},{label:'🧤 '+(t>13.6?1:0)}]);
  h.next(t)}
function icon(t){E.drawBall(g,{x:0,y:-2,rot:t*3,h:0})}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,(t)=>{g.scale(6,6);icon(t)})}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).soccer={
 ru:{c1:'Физкультура! Забей мимо вратаря-великана!',c2:'А Ослик залез в ворота… и отбил мяч копытом 😈',c3:'Пас… ещё пас… удар!',c4:'ГОООЛ! 🎉',c5:'Пухляш ударил со всей силы…',c6:'…мяч пробил тучу — и пошёл СНЕГ!',bonk:'БАМ!',shoo:'КЫШ!',goal:'ГОООЛ!',boom:'БУМ!',
  next:'Продолжение следует… ❄️',tag:'⚽ Серия 4 · Бомбардир',title:'Бомбардир',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'PE class! Score past the giant goalkeeper!',c2:'The Donkey sneaked into the goal… and kicked the ball back 😈',c3:'Pass… another pass… SHOT!',c4:'GOOOAL! 🎉',c5:'Chubby kicked with all his might…',c6:'…the ball pierced a cloud — and it started to SNOW!',bonk:'BONK!',shoo:'SHOO!',goal:'GOAL!',boom:'BOOM!',
  next:'To be continued… ❄️',tag:'⚽ Episode 4 · Bombardier',title:'Bombardier',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'שיעור ספורט! תבקיעו ליד השוער הענק!',c2:'החמור נכנס לשער… והחזיר את הכדור עם הפרסה 😈',c3:'מסירה… עוד מסירה… בעיטה!',c4:'גוווול! 🎉',c5:'השמנמן בעט בכל הכוח…',c6:'…הכדור חורר ענן — והתחיל לרדת שלג!',bonk:'בום!',shoo:'קישטה!',goal:'גול!',boom:'בום!',
  next:'המשך יבוא… ❄️',tag:'⚽ פרק 4 · בומברדיר',title:'בומברדיר',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
