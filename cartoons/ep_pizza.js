(window.EPISODES=window.EPISODES||{}).pizza=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#2a1010',b:'#401a14',dot:'255,180,120'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('pizza','kitchen');const PZ=[760,730];
const ING=[[0,560,380,12.6,'girl'],[1,960,380,13.6,'tall'],[2,560,760,14.8,'nerd'],[3,960,760,16,'fat']];
function friend(c,t){const i=h.FR.indexOf(c),base=[[640,520],[700,700],[860,520],[900,700]][i];if(t<T1)return path(t,[[0,base[0],base[1]+420],[3.8,base[0],base[1]]]);if(t<T2)return [base[0],base[1],false,1];
  if(t<T3){const K=[[T2,base[0],base[1]]];ING.forEach(q=>{if(q[4]===c)K.push([q[3]-1.2,q[1],q[2]+30],[q[3]-.8,q[1],q[2]+30],[q[3],PZ[0]+(q[1]<760?-90:90),PZ[1]+(q[2]<600?-40:60)])});K.push([T3-.2,base[0],base[1]]);return path(t,K)}
  return path(t,[[T3,base[0],base[1]],[T3+1,PZ[0]+[-130,-60,60,130][i],PZ[1]+[-20,90,-20,90][i]]])}
function carrying(c,t){const q=ING.find(q=>q[4]===c);return q&&t>q[3]-.8&&t<q[3]?q[0]:-1}
function rat(i,t){const ph=t*.8+i*3;return [760+Math.cos(ph)*240,560+Math.sin(ph*1.4)*170,true,Math.sin(ph)>0?-1:1]}
function bigPizza(t,n,cooked){g.save();g.translate(PZ[0],PZ[1]);g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(4,10,96,40,0,0,7);g.fill();g.beginPath();g.ellipse(0,0,92,38,0,0,7);g.fillStyle=cooked?'#d99a4a':'#f0c98a';g.fill();g.lineWidth=4;g.strokeStyle='#2b1b30';g.stroke();
  g.beginPath();g.ellipse(0,-2,76,30,0,0,7);g.fillStyle=n>0?'#d84a2a':'#f6dca8';g.fill();if(n>1){g.fillStyle='#ffd84a';for(let i=0;i<9;i++){g.beginPath();g.ellipse(-50+h.rnd(i)*100,-14+h.rnd(i+4)*24,12,6,0,0,7);g.fill()}}
  if(n>2)for(let i=0;i<6;i++)E.drawIng(g,2,-50+h.rnd(i+9)*100,-10+h.rnd(i+12)*18,.45);if(n>3)for(let i=0;i<5;i++)E.drawIng(g,3,-46+h.rnd(i+19)*92,-8+h.rnd(i+22)*16,.45);
  if(cooked){for(let i=0;i<3;i++){const k=((t*.8+i*.33)%1);g.fillStyle=`rgba(255,255,255,${.6*(1-k)})`;g.beginPath();g.arc(-30+i*30,-40-k*80,10+k*12,0,7);g.fill()}}g.restore()}
function scenes(t){h.clip();h.cam(770,600,2.0);g.drawImage(map,0,0);
  const n=ING.filter(q=>t>q[3]).length;h.add(PZ[1]+30,()=>bigPizza(t,n,t>17.4));
  h.FR.forEach((c,i)=>{const p=friend(c,t),car=carrying(c,t),faint=t>T4+1.6;h.add(p[1],()=>{if(faint){g.save();g.translate(p[0],p[1]);g.rotate((i%2?1:-1)*Math.PI/2*.85);g.translate(-p[0],-p[1]);h.hero(c,p[0],p[1],t,{stun:1});g.restore()}else{h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3]});if(car>=0)E.drawIng(g,car,p[0],p[1]+E.headTop(c,null)-30,1.2);if(t>T3+1.2&&t<T4+1.5)E.drawIng(g,1,p[0]+p[3]*30,p[1]-110,.8)}})});
  if(t>5.2&&t<T3)for(let i=0;i<2;i++){const r=rat(i,t);h.add(r[1],()=>E.drawTeacher(g,{k:'rat',x:r[0],y:r[1],a:r[3]<0?Math.PI:0,st:0,moving:true},t))}
  const dk=path(t,[[0,1150,860,-1],[4,1000,420,-1],[6.2,960,410,-1],[9.5,960,410,-1],[T3,1060,560,-1],[T3+1,PZ[0]+200,PZ[1]+10,-1]]);const chew=t>6.4&&t<9.5;h.add(dk[1],()=>{h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]});if(chew)E.drawIng(g,1,dk[0]-40,dk[1]-110,.9)});
  h.flush();
  if(chew)h.say(TXT.chomp,dk[0],dk[1]-250,t,6.5,26,'#fff','#e8412c');
  if(t>6&&t<10.5){const r=rat(0,t);h.say(TXT.squeak,r[0],r[1]-120,t,6.4,22,'#fff','#7b3fe4')}
  ING.forEach(q=>{if(t>q[3]&&t<q[3]+.8)h.say('+1',PZ[0],PZ[1]-120,t,q[3],30,'#ffc531','#5a2410')});
  if(t>17.4&&t<T3){g.fillStyle=`rgba(255,140,40,${.25+.15*Math.sin(t*10)})`;g.beginPath();g.ellipse(PZ[0],PZ[1],140,70,0,0,7);g.fill();h.say(TXT.fire,PZ[0],PZ[1]-200,t,17.4,30,'#ffc531','#e8412c')}
  if(t>T3+1.2&&t<T4)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo('heart',p[0],p[1]-260,1.1*pop(t,T3+1.4+i*.08))});
  if(t>T4){h.say(TXT.burger,800,dk[1]-280,t,T4+.3,28,'#fff','#e8412c');if(t>T4+1.4)h.say(TXT.no,PZ[0]-80,PZ[1]-230,t,T4+1.4,46,'#ffc531','#e8412c')}
  g.restore();
  if(t>T2&&t<T3+.5)h.counter(t,[{label:'🍕 '+n+'/4'},{label:'🐀 2'}]);
  if(t>T4+2.3){const k=pop(t,T4+2.3);h.scr();g.save();g.translate(h.W/2,1720);g.scale(k,k);h.text(TXT.end,0,0,54,'#ffe066',{w:800});g.restore()}}
function icon(t){h.text('🍕',0,-30,180,'#fff',{sc:'rgba(0,0,0,0)'})}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).pizza={
 ru:{c1:'Готовим пиццу по секретному рецепту!',c2:'Крысы воруют продукты… а Ослик слопал сыр 😈',c3:'Помидор, сыр, грибы, перец — на пиццу!',c4:'Пицца — в печь! 🔥',c5:'Наконец-то все вместе едят пиццу! 🍕❤️',c6:'Ослик: «А теперь… бургер?» Все: «НЕЕЕТ!» 😂',chomp:'ХРУМ!',squeak:'ПИ-ПИ!',fire:'ПЕЧЬ!',burger:'А ТЕПЕРЬ… БУРГЕР?',no:'НЕЕЕТ!',
  end:'Конец 1 сезона 🎬',tag:'🍕 Серия 13 · Пицца-хаос',title:'Пицца-хаос',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Cooking pizza with the secret recipe!',c2:'Rats steal the food… and the Donkey ate the cheese 😈',c3:'Tomato, cheese, mushrooms, pepper — onto the pizza!',c4:'Pizza — into the oven! 🔥',c5:'Finally everyone eats pizza together! 🍕❤️',c6:'Donkey: "And now… a burger?" Everyone: "NOOO!" 😂',chomp:'CHOMP!',squeak:'SQUEAK!',fire:'OVEN!',burger:'AND NOW… A BURGER?',no:'NOOO!',
  end:'End of Season 1 🎬',tag:'🍕 Episode 13 · Pizza Chaos',title:'Pizza Chaos',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'מכינים פיצה לפי המתכון הסודי!',c2:'עכברושים גונבים מצרכים… והחמור אכל את הגבינה 😈',c3:'עגבנייה, גבינה, פטריות, פלפל — על הפיצה!',c4:'פיצה — לתנור! 🔥',c5:'סוף סוף כולם אוכלים פיצה ביחד! 🍕❤️',c6:'החמור: "ועכשיו… המבורגר?" כולם: "לאאא!" 😂',chomp:'קראנץ׳!',squeak:'ציוץ!',fire:'תנור!',burger:'ועכשיו… המבורגר?',no:'לאאא!',
  end:'סוף עונה 1 🎬',tag:'🍕 פרק 13 · פיצה בטירוף',title:'פיצה בטירוף',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
