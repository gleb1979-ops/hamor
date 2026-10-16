(window.EPISODES=window.EPISODES||{}).box=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#1a1020',b:'#2a1630',dot:'255,120,120'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('box');const CX=750,CY=470;
const PUNCH=[[11.5,'girl'],[12.4,'nerd'],[13.3,'tall'],[15.9,'fat',1],[17.2,'girl'],[17.8,'fat']];
function boxer(t){if(t<T1)return path(t,[[0,980,320,-1],[3,900,400,-1]]);if(t<T2)return [900+Math.sin(t*3)*10,400,false,-1];
  if(t<T3)return [CX+60+Math.sin(t*2)*60,CY-20+Math.cos(t*1.7)*40,true,-1];return [CX+80,CY+40,false,-1]}
function friend(c,t){const i=h.FR.indexOf(c),base=[[560,560],[620,380],[560,420],[640,620]][i];if(t<T1)return path(t,[[0,base[0]-400,base[1]],[3.5,base[0],base[1]]]);
  const P=PUNCH.find(p=>p[1]===c&&t>p[0]-.8&&t<p[0]+.6);if(P){const b=boxer(P[0]);return path(t,[[P[0]-.8,base[0],base[1]],[P[0]-.1,b[0]-90,b[1]+10,1],[P[0]+.6,b[0]-120,b[1]+10,1]])}
  if(c==='tall'&&t>14&&t<T3)return [base[0]+40,base[1]+60,false,1];
  if(c==='fat'&&t>T3)return path(t,[[T3,base[0],base[1]],[T3+1,CX-60,CY-40,1]]);
  return [base[0]+Math.sin(t*4+i)*8,base[1],false,1]}
function gong(x,y,t,hit){g.save();g.translate(x,y);g.scale(.9,.9);E.BOOM_ART.box(g,t,hit,hit?.5+.5*Math.sin(t*10):0);g.restore()}
function scenes(t){h.clip();h.cam(lerp(760,800,seg(t,0,5)),470,2.0);g.drawImage(map,0,0);
  const hitG=(t>6&&t<6.4)||(t>7&&t<7.4)||(t>7.8&&t<8.2)||(t>8.6&&t<9);h.add(300,()=>gong(1000,320,t,hitG));
  const b=boxer(t),ko=t>T3;const bst=PUNCH.some(p=>t>p[0]&&t<p[0]+.5)||ko;
  h.add(b[1],()=>{if(ko){g.save();g.translate(b[0],b[1]);g.rotate(-Math.PI/2*.9);g.translate(-b[0],-b[1]);E.drawTeacher(g,{k:'pe',x:b[0],y:b[1],a:Math.PI,st:0,moving:false},0);g.restore()}else{E.drawTeacher(g,{k:'pe',x:b[0],y:b[1],a:Math.PI,st:bst?1:0,moving:b[2]},t);g.fillStyle='#d32f2f';for(const d of [-1,1]){g.beginPath();g.arc(b[0]+d*44,b[1]-118+(t>14&&t<14.5&&d<0?-20:0),17,0,7);g.fill();g.strokeStyle='#2b1b30';g.lineWidth=2.5;g.stroke()}}});
  h.FR.forEach((c,i)=>{const p=friend(c,t),down=c==='tall'&&t>14&&t<T3;h.add(p[1],()=>{if(down){g.save();g.translate(p[0],p[1]);g.rotate(Math.PI/2*.9);g.translate(-p[0],-p[1]);h.hero(c,p[0],p[1],t,{stun:1,hat:'s_none'});g.restore()}else h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],hat:'s_none'})})});
  const dk=path(t,[[0,1040,800,-1],[4,1000,430,-1],[9.2,1000,430,-1],[T3,1000,430,-1]]);const kk=t>8.4&&t<9;h.add(dk[1],()=>{if(kk)E.drawDonkey4(g,{x:dk[0],y:dk[1],face:-1},t,seg(t,8.4,9));else h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]})});
  h.flush();
  if(hitG)h.say(TXT.bong,980,170,t,6,30,'#ffc531','#5a2410');
  for(const [t0,c,low] of PUNCH){if(t>t0&&t<t0+.6){const bb=boxer(t0);g.fillStyle='#ffe14d';for(let j=0;j<7;j++){const a=j/7*6.28,r=20+seg(t,t0,t0+.6)*60;E.star(g,bb[0]-40+Math.cos(a)*r,bb[1]-(low?40:140)+Math.sin(a)*r*.6,7);g.fill()}h.say(low?TXT.low:TXT.pow,bb[0]-60,bb[1]-260,t,t0,low?26:30,'#ffffff',low?'#2f7bff':'#e8412c')}}
  if(t>14&&t<14.6){const p=friend('tall',14);h.say(TXT.pow,p[0],p[1]-220,t,14,30,'#fff','#e8412c')}
  if(t>T3+.2){h.say(TXT.ko,CX+60,200,t,T3+.2,46,'#ffc531','#e8412c');h.confetti(t,T3,480,100,540,600);const p=friend('fat',t);g.save();g.translate(p[0],p[1]-280);g.scale(pop(t,T3+1),pop(t,T3+1));E.rr(g,-70,-18,140,36,14);E.sh(g,'#ffc531',3);g.beginPath();g.arc(0,0,22,0,7);E.sh(g,'#e0a812',3);E.star(g,0,0,10);g.fillStyle='#fff6b0';g.fill();g.restore()}
  if(t>T4+.6){const k=pop(t,T4+.6);g.save();g.translate(CX-40,300);g.scale(k*1.4,k*1.4);for(let j=0;j<4;j++){g.save();g.rotate((j-1.5)*.22);E.rr(g,-30,-90,60,100,8);E.sh(g,['#ff6fae','#4f8cff','#5cc560','#ffc531'][j],3);g.fillStyle='#fff';g.font='900 14px Rubik';g.textAlign='center';g.fillText('🎡',0,-50);g.restore()}g.restore()}
  if(t>T4+1.5)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'heart':'stars',p[0],p[1]-260,1.1*pop(t,T4+1.5+i*.07))});
  if(t>6&&t<9.5)h.emo('laugh',dk[0],dk[1]-250,1.2*pop(t,6.2));
  g.restore();
  if(t>T2&&t<T3+1)h.counter(t,[{label:'🥊 '+PUNCH.filter(p=>t>p[0]).length},{label:'🥚 '+(t>15.9?1:0)}]);
  h.next(t)}
function icon(t){h.text('🥊',0,-30,180,'#fff',{sc:'rgba(0,0,0,0)'})}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).box={
 ru:{c1:'Боксёр вызвал друзей на ринг!',c2:'Ослик колотит в гонг раньше времени 😈',c3:'Удар! Ещё удар! Не зевай!',c4:'Пухляш — по яйцам! 🥚',c5:'НОКАУТ! Пухляш — чемпион!',c6:'А в поясе чемпиона — билеты в парк аттракционов!',bong:'БОНГ!',pow:'БАЦ!',low:'ПО ЯЙЦАМ!',ko:'НОКАУТ!',
  next:'Продолжение следует… 🎡',tag:'🥊 Серия 6 · Сумасшедший бокс',title:'Сумасшедший бокс',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'The boxer challenged the friends to the ring!',c2:'The Donkey bangs the gong way too early 😈',c3:'Punch! Another punch! Stay sharp!',c4:'Chubby — LOW BLOW! 🥚',c5:'KNOCKOUT! Chubby is the champ!',c6:'And in the champion\'s belt — tickets to the fun park!',bong:'BONG!',pow:'POW!',low:'LOW BLOW!',ko:'KNOCKOUT!',
  next:'To be continued… 🎡',tag:'🥊 Episode 6 · Crazy Boxing',title:'Crazy Boxing',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'המתאגרף הזמין את החברים לזירה!',c2:'החמור מכה בגונג מוקדם מדי 😈',c3:'מכה! עוד מכה! לא להירדם!',c4:'השמנמן — מכה בביצים! 🥚',c5:'נוקאאוט! השמנמן אלוף!',c6:'ובחגורת האלוף — כרטיסים ללונה פארק!',bong:'בונג!',pow:'בום!',low:'מכה בביצים!',ko:'נוקאאוט!',
  next:'המשך יבוא… 🎡',tag:'🥊 פרק 6 · אגרוף משוגע',title:'אגרוף משוגע',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
