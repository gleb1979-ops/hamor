(window.EPISODES=window.EPISODES||{}).balloon=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#1b2a4a',b:'#28406e',dot:'255,200,230'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('balloon','fair');
const POPS=[[7.2,'tall'],[8.4,'nerd'],[12.2,'girl'],[13.4,'fat'],[15,'tall'],[16.6,'nerd']];
const PICKS=[[13.9,'girl',620,420],[14.6,'tall',900,640],[16,'fat',700,700],[17.3,'nerd',940,420],[17.9,'girl',560,620]];
function bal(c,t){let n=3;POPS.forEach(p=>{if(p[1]===c&&t>p[0])n--});PICKS.forEach(p=>{if(p[1]===c&&t>p[0])n++});if(t>T3)n+=Math.floor(seg(t,T3,T4-.6)*8);return Math.max(0,n)}
function friend(c,t){const i=h.FR.indexOf(c),base=[[600,560],[700,640],[860,560],[940,640]][i];if(t<T2)return path(t,[[0,base[0]-500,base[1]],[3.8,base[0],base[1]],[T2,base[0],base[1]]]);
  const K=[[T2,base[0],base[1]]];PICKS.forEach(p=>{if(p[1]===c)K.push([p[0],p[2],p[3]+20])});K.push([T3,base[0],base[1]]);const r=path(t,K);
  if(t>T4-1.5){const up=ease(seg(t,T4-1.5,T4+.2));r[1]-=up*500}return r}
function hog(i,t){const ph=t*.6+i*2.1;return [750+Math.cos(ph)*230,560+Math.sin(ph*1.3)*150,true,Math.sin(ph)>0?-1:1]}
function scenes(t){h.clip();let cy=520;if(t>T4-1.5)cy=lerp(520,-200,ease(seg(t,T4-1.5,T4+.4)));h.cam(760,cy,2.0);
  if(t<T4+.3){g.drawImage(map,0,0);if(cy<300){const gr=g.createLinearGradient(0,-800,0,140);gr.addColorStop(0,'#8fd0ff');gr.addColorStop(1,'#cfeeff');g.fillStyle=gr;g.fillRect(0,-1000,1500,1140)}
    PICKS.forEach(([tt,c,x,y],j)=>{if(t<tt&&t>T2-2)h.add(y,()=>E.drawPickBalloon(g,x,y,t,j+3))});
    for(let i=0;i<2;i++){if(t>T3)break;const p=hog(i,t);h.add(p[1],()=>E.drawTeacher(g,{k:'hog',x:p[0],y:p[1],a:p[3]<0?Math.PI:0,st:0,moving:true},t))}
    h.FR.forEach((c,i)=>{const p=friend(c,t),hit=POPS.some(q=>q[1]===c&&t>q[0]&&t<q[0]+.6);h.add(p[1],()=>{const v={id:'ep_'+c,c,x:p[0],y:p[1],face:p[3],moving:p[2],stun:hit?1:0,score:bal(c,t),hat:null};E.drawHero(g,v,t);E.drawBalloons(g,v,t)})});
    const dk=path(t,[[0,560,520,1],[3,980,330,1],[5,1010,310,1],[T2,1010,310,-1],[T3,980,380,-1]]);if(t<T3+1.5)h.add(dk[1],()=>{const v={id:'ep_d',c:'donkey',x:dk[0],y:dk[1],face:dk[3],moving:dk[2],score:5,hat:null};E.drawHero(g,v,t);E.drawBalloons(g,v,t)});
    h.flush();
    for(const [t0,c] of POPS)if(t>t0&&t<t0+.6){const p=friend(c,t0);h.say(TXT.pop,p[0],p[1]-300,t,t0,28,'#fff','#ff3b6b')}
    if(t>6.6&&t<9.5){const p=hog(0,t);h.emo('laugh',p[0],p[1]-150,1.1*pop(t,6.7))}
    if(t>1&&t<5.4)h.say(TXT.wait,760,250,t,1.2,26,'#fff','#2f7bff');
    if(t>T3+.5&&t<T4)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'exclamation':'drops',p[0]+40,p[1]-180,1.1*pop(t,T3+.6+i*.08))})}
  else{// flying over clouds to the desert
    const k=seg(t,T4,T5);h.cam(760,420,2.0);g.save();const gr=g.createLinearGradient(0,-700,0,1300);gr.addColorStop(0,'#7cc8ff');gr.addColorStop(.6,'#ffd59a');gr.addColorStop(1,'#e8a85a');g.fillStyle=gr;g.fillRect(0,-1000,1500,2600);
    g.fillStyle='#d98a4a';for(const [x,w,hh] of [[300,260,180],[620,200,140],[980,300,210]]){g.beginPath();g.moveTo(x-w/2+(-k*200),760);g.lineTo(x-w/3-k*200,760-hh);g.lineTo(x+w/3-k*200,760-hh);g.lineTo(x+w/2-k*200,760);g.fill()}
    g.fillStyle='#ffffff';for(let i=0;i<6;i++){const x=((i*260-k*500)%1500+1500)%1500,y=-200+h.rnd(i)*300;g.beginPath();g.ellipse(x,y,90,30,0,0,7);g.ellipse(x+50,y-16,60,28,0,0,7);g.fill()}
    h.FR.forEach((c,i)=>{const x=560+i*110+Math.sin(t*2+i)*14,y=360+Math.cos(t*1.6+i)*20;const v={id:'ep_'+c,c,x,y,face:1,moving:false,score:11,hat:null};E.drawHero(g,v,t);E.drawBalloons(g,v,t)});
    g.save();g.translate(980,520);g.fillStyle='#2e8b57';E.rr(g,-12,-80,24,80,10);g.fill();E.rr(g,-40,-60,16,40,8);g.fill();E.rr(g,24,-50,16,34,8);g.fill();g.restore();g.restore()}
  g.restore();
  if(t>T2&&t<T3){h.counter(t,h.FR.map(c=>({c,label:'🎈 '+bal(c,t)})))}
  h.next(t)}
function icon(t){g.scale(4,4);E.drawPickBalloon(g,0,20,t,1)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).balloon={
 ru:{c1:'Погоня за Осликом — прямо на ярмарку!',c2:'А тут ежи лопают шарики! 🦔',c3:'Береги свои шарики!',c4:'Хватай новые шарики!',c5:'Ой… шариков СЛИШКОМ много!',c6:'Шарики унесли друзей… на Дикий Запад! 🌵',pop:'ПАХ!',wait:'СТОЙ, ОСЛИК!',
  next:'Продолжение следует… 🚂',tag:'🎈 Серия 8 · Битва шариков',title:'Битва шариков',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Chasing the Donkey — right into the fair!',c2:'And here hedgehogs pop balloons! 🦔',c3:'Protect your balloons!',c4:'Grab new balloons!',c5:'Uh-oh… TOO many balloons!',c6:'The balloons carried the friends… to the Wild West! 🌵',pop:'POP!',wait:'STOP, DONKEY!',
  next:'To be continued… 🚂',tag:'🎈 Episode 8 · Balloon Battle',title:'Balloon Battle',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'מרדף אחרי החמור — ישר ליריד!',c2:'וכאן קיפודים מפוצצים בלונים! 🦔',c3:'שמרו על הבלונים שלכם!',c4:'תפסו בלונים חדשים!',c5:'אוי… יותר מדי בלונים!',c6:'הבלונים העיפו את החברים… למערב הפרוע! 🌵',pop:'פּוֹק!',wait:'עצור, חמור!',
  next:'המשך יבוא… 🚂',tag:'🎈 פרק 8 · קרב בלונים',title:'קרב בלונים',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
