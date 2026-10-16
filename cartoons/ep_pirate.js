(window.EPISODES=window.EPISODES||{}).pirate=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#0f2a3a',b:'#17405a',dot:'255,230,150'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('pirate','beach');
const XS=[[600,420,12.6,'girl'],[920,460,13.6,'tall'],[640,720,14.8,'nerd'],[900,720,16,'fat'],[760,560,17.4,'girl']];
const HOLES=[[980,390,6.4],[1010,620,7.4],[900,740,8.4]];
function friend(c,t){const i=h.FR.indexOf(c),base=[[600,600],[680,660],[840,600],[920,660]][i];if(t<T1)return path(t,[[0,base[0]-480,base[1]+200],[1.6,base[0]-480,base[1]+200],[4.4,base[0],base[1]]]);if(t<T2)return [base[0],base[1],false,1];
  if(t<T3){const K=[[T2,base[0],base[1]]];XS.forEach(x=>{if(x[3]===c)K.push([x[2]-.6,x[0]-40,x[1]+30],[x[2]+.4,x[0]-40,x[1]+30])});K.push([T3-.2,base[0],base[1]]);return path(t,K)}
  return path(t,[[T3,base[0],base[1]],[T3+1,[640,700,820,880][i],[620,660,620,660][i]]])}
function skel(i,t){const ph=t*.55+i*2.6;return [760+Math.cos(ph)*260,540+Math.sin(ph*1.2)*170,true,Math.sin(ph)>0?-1:1]}
function scenes(t){h.clip();h.cam(780,540,2.0);g.drawImage(map,0,0);
  if(t<T1+.5){const k=ease(seg(t,0,2));g.save();g.translate(lerp(420,620,k),820);E.rr(g,-110,-30,220,40,16);E.sh(g,'#8a5a2e',4);g.fillStyle='#fff';g.beginPath();g.moveTo(0,-40);g.lineTo(0,-190);g.lineTo(80,-60);g.closePath();g.fill();g.restore()}
  XS.forEach(([x,y,tt],j)=>{if(t>T2-1&&t<tt+.3)h.add(y-2,()=>E.drawXmark(g,x,y,t))});
  HOLES.forEach(([x,y,tt])=>{if(t>tt)h.add(y-3,()=>{g.fillStyle='#8a6a3a';g.beginPath();g.ellipse(x,y,34,12,0,0,7);g.fill();g.fillStyle='#6b4a2a';g.beginPath();g.ellipse(x,y+2,22,7,0,0,7);g.fill()})});
  h.FR.forEach((c,i)=>{const p=friend(c,t),hit=c==='nerd'&&t>15.5&&t<16.4;h.add(p[1],()=>h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],stun:hit}))});
  if(t>5)for(let i=0;i<2;i++){if(t>T3+.5)break;const s=skel(i,t);h.add(s[1],()=>E.drawTeacher(g,{k:'skel',x:s[0],y:s[1],a:s[3]<0?Math.PI:0,st:0,moving:true},t))}
  const dk=path(t,[[0,620,820,1],[4.4,960,640,1],[6,1000,390,1],[7,1030,620,1],[8,920,740,-1],[9.4,990,560,-1],[T4,990,560,-1]]);const dig=(t>6&&t<6.6)||(t>7&&t<7.6)||(t>8&&t<8.6);
  h.add(dk[1],()=>{if(dig)E.drawDonkey4(g,{x:dk[0],y:dk[1],face:-1},t,(t*2.5)%1);else h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]})});
  if(t>17.4)h.add(560,()=>{const k=pop(t,17.4);g.save();g.translate(760,560);g.scale(k*1.2,k*1.2);E.drawChest(g,0,0,1.3);g.restore()});
  h.flush();
  if(dig)h.say(TXT.dig,dk[0],dk[1]-230,t,6,24,'#fff','#8a5a2e');
  XS.forEach(([x,y,tt])=>{if(t>tt&&t<tt+.8)h.say('+🪙',x,y-160,t,tt,28,'#ffc531','#5a2410')});
  if(t>T3&&t<T4){const open=seg(t,T3+.4,T3+1.2);g.save();g.translate(760,470);g.fillStyle=`rgba(255,230,120,${.5*open})`;g.beginPath();g.arc(0,0,90+Math.sin(t*6)*8,0,7);g.fill();g.rotate(Math.sin(t*2)*.05);g.scale(open,open);g.fillStyle='#f0dca0';E.rr(g,-40,-28,80,56,8);g.fill();g.strokeStyle='#8a6a3a';g.lineWidth=3;g.stroke();g.fillStyle='#d42b2b';g.fillRect(-46,-6,92,12);g.restore();h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'exclamation':'stars',p[0],p[1]-250,1.1*pop(t,T3+1.2+i*.07))})}
  if(t>T4){const k=pop(t,T4+.3);g.save();g.translate(780,470);g.scale(k*1.4,k*1.4);g.fillStyle='#f6e7c1';E.rr(g,-140,-110,280,220,14);g.fill();g.strokeStyle='#8a6a3a';g.lineWidth=4;g.stroke();
    g.font='900 22px Rubik, Arial Black';g.textAlign='center';g.fillStyle='#8a2a1a';g.fillText(TXT.recipe,0,-74);g.font='900 34px "Noto Color Emoji", Rubik';g.fillText('🍅 🧀 🍄 🌶️',0,-16);g.fillText('🍕',0,48);g.restore();
    h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'heart':'stars',p[0],p[1]-250,1.1*pop(t,T4+1+i*.07))})}
  g.restore();
  if(t>T2&&t<T3+1){h.counter(t,[{label:'🪙 '+XS.filter(x=>t>x[2]).length+'/5'},{label:'☠️ 2'}])}
  h.next(t)}
function icon(t){g.scale(2.4,2.4);E.drawChest(g,0,30,1.2)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).pirate={
 ru:{c1:'По недожёванной карте — на пиратский остров!',c2:'Ослик копает где попало 😈 А тут — пираты-скелеты!',c3:'Копай там, где крестик ❌',c4:'Берегись пиратов! Ещё чуть-чуть…',c5:'Сундук! А внутри… древний свиток?',c6:'Это СЕКРЕТНЫЙ РЕЦЕПТ ПИЦЦЫ! 🍕',dig:'КОП-КОП!',recipe:'СЕКРЕТНЫЙ РЕЦЕПТ',
  next:'Продолжение следует… 🍕',tag:'🏴‍☠️ Серия 12 · Пиратский клад',title:'Пиратский клад',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Following the half-chewed map — to pirate island!',c2:'The Donkey digs everywhere 😈 And here come skeleton pirates!',c3:'Dig where the X is ❌',c4:'Watch out for pirates! Almost there…',c5:'A chest! And inside… an ancient scroll?',c6:'It\'s a SECRET PIZZA RECIPE! 🍕',dig:'DIG-DIG!',recipe:'SECRET RECIPE',
  next:'To be continued… 🍕',tag:'🏴‍☠️ Episode 12 · Pirate Gold',title:'Pirate Gold',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'לפי המפה הלעוסה — לאי הפיראטים!',c2:'החמור חופר בכל מקום 😈 והנה פיראטים-שלדים!',c3:'חפרו איפה שיש איקס ❌',c4:'היזהרו מהפיראטים! עוד קצת…',c5:'תיבה! ובפנים… מגילה עתיקה?',c6:'זה מתכון סודי לפיצה! 🍕',dig:'חפור-חפור!',recipe:'מתכון סודי',
  next:'המשך יבוא… 🍕',tag:'🏴‍☠️ פרק 12 · אוצר הפיראטים',title:'אוצר הפיראטים',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
