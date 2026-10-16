(window.EPISODES=window.EPISODES||{}).villain=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#141a30',b:'#202a50',dot:'255,220,120'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
E.setVM('park');const map=h.floor('villain',null,'park');
const KEYS=[[560,380,12],[880,360,12.8],[620,700,13.6],[960,660,14.4],[700,560,15.4],[900,480,16.3],[560,560,17.1],[800,700,17.9]];
const OWNK=['girl','tall','nerd','fat','girl','tall','nerd','girl'];
const TRAPS=[[760,420,6.4],[650,620,7.4],[900,600,8.6]];
function friend(c,t){const i=h.FR.indexOf(c),base=[[600,520],[680,600],[820,520],[900,600]][i];if(t<T2)return path(t,[[0,base[0],base[1]+420],[3.6,base[0],base[1]],[T2,base[0],base[1]]]);
  if(t<T3){const K=[[T2,base[0],base[1]]];KEYS.forEach((k,j)=>{if(OWNK[j]===c)K.push([k[2]-.1,k[0]+20,k[1]+30],[k[2]+.3,k[0]+20,k[1]+30])});return path(t,K)}
  return path(t,[[T3,base[0],base[1]],[T3+1.2,[930,1050,960,1040][i],[440,500,560,600][i]]])}
function vill(t){if(t<T2)return path(t,[[0,1030,300,-1],[5.5,1010,330,-1],[6.2,760,400,-1],[7,1010,330,1],[7.4,650,600,-1],[8.2,1020,680,1],[8.6,900,580,-1],[9.4,1020,420,1],[T2,1020,420,-1]]);
  if(t<T3)return [1010+Math.sin(t)*20,420+Math.cos(t*.8)*40,true,-1];if(t<T4)return path(t,[[T3,1010,440,-1],[T3+1.2,950,510,-1]]);return path(t,[[T4,950,510,-1],[T4+.6,950,510,1],[T4+2.6,1250,330,1]])}
function trap(x,y,shut){g.save();g.translate(x,y);g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,4,30,9,0,0,7);g.fill();g.strokeStyle='#5a5a66';g.lineWidth=5;g.beginPath();g.ellipse(0,0,26,8,0,0,7);g.stroke();
  g.fillStyle='#8a8a96';for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*7,0);g.lineTo(i*7+3,shut?-18:-10);g.lineTo(i*7+6,0);g.fill()}g.restore()}
function mask(x,y,face){g.save();g.translate(x,y+E.headTop('donkey',null)+18);g.scale(face,1);g.fillStyle='#161616';g.beginPath();g.ellipse(4,8,26,9,0,0,7);g.fill();g.fillStyle='#fff';for(const d of [-9,13]){g.beginPath();g.ellipse(d,8,4,3,0,0,7);g.fill()}g.restore()}
function scenes(t){h.clip();h.cam(lerp(780,840,seg(t,0,T5)),520,2.0);g.drawImage(map,0,0);
  KEYS.forEach(([x,y,tt],j)=>{if(t>=tt)return;h.add(y-1,()=>{g.drawImage(E.keySprite,x-24,y-48-Math.abs(Math.sin(t*3+j))*8,48,48)})});
  TRAPS.forEach(([x,y,tt],j)=>{if(t<tt)return;const shut=j===1&&t>9.2;h.add(y-2,()=>trap(x,y,shut))});
  h.FR.forEach((c,i)=>{const p=friend(c,t),caught=c==='tall'&&t>9.2&&t<10.6;h.add(p[1],()=>h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],stun:caught}))});
  const v=vill(t),unmask=t>T3+1.3;h.add(v[1],()=>{h.hero('donkey',v[0],v[1],t,{mv:v[2],face:v[3]});if(!unmask)mask(v[0],v[1],v[3]);if(t>T4+.6){g.save();g.translate(v[0]+v[3]*20,v[1]-220);for(let j=0;j<5;j++){g.strokeStyle='#2b1b30';g.lineWidth=1.5;g.beginPath();g.moveTo(0,90);g.lineTo(-30+j*15,0);g.stroke();g.beginPath();g.ellipse(-30+j*15,-10,16,20,0,0,7);g.fillStyle=['#ff3b6b','#ffc531','#4f8cff','#5cc560','#ff6fae'][j];g.fill();g.stroke()}g.restore()}});
  h.flush();
  if(t>9.2&&t<10.6){const p=friend('tall',t);h.say(TXT.snap,p[0],p[1]-260,t,9.2,28,'#fff','#e8412c')}
  if(t>5.6&&t<10.8){g.save();g.globalAlpha=.6+.4*Math.sin(t*6);h.text('?',v[0],v[1]-280,40,'#ffc531',{sc:'#2b1b30'});g.restore()}
  if(t>15&&t<T3)h.FR.forEach((c,i)=>{const p=friend(c,t);h.text('?',p[0],p[1]-260,30,'#ffffff',{sc:'#7b3fe4'})});
  if(t>T3+1.3&&t<T4+.6){const k=seg(t,T3+1.3,T3+2.3);g.save();g.translate(v[0]+60+k*120,v[1]-180-k*80);g.rotate(k*6);g.fillStyle='#161616';g.beginPath();g.ellipse(0,0,26,9,0,0,7);g.fill();g.restore();h.say(TXT.its,v[0],v[1]-300,t,T3+1.4,30,'#ffc531','#5a2410');h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'anger':'exclamation',p[0],p[1]-250,1.1*pop(t,T3+1.6+i*.07))})}
  if(t>T4+.8)h.emo('laugh',v[0],v[1]-300,1.2*pop(t,T4+.8));
  g.restore();
  if(t>T2&&t<T3+1){const n=KEYS.filter(k=>t>k[2]).length;h.counter(t,[{label:'🔑 '+n+'/8'},{label:'🪤 3'}])}
  h.next(t)}
function icon(t){g.scale(1.6,1.6);h.hero('donkey',0,80,t,{});mask(0,80,1)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).villain={
 ru:{c1:'Парк аттракционов! Собираем ключи от каруселей!',c2:'Но кто-то тайно ставит ловушки… 🪤',c3:'Хватай ключи и обходи ловушки!',c4:'Кто же злодей?! 🤔',c5:'Попался! Злодей — это… ОСЛИК!',c6:'Ослик схватил шарики и удрал на ярмарку!',snap:'ЩЁЛК!',its:'ЭТО ТЫ?!',
  next:'Продолжение следует… 🎈',tag:'🦹 Серия 7 · Кто злодей?',title:'Кто злодей?',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'The fun park! Let\'s collect the ride keys!',c2:'But someone is secretly setting traps… 🪤',c3:'Grab keys and dodge the traps!',c4:'Who\'s the villain?! 🤔',c5:'Gotcha! The villain is… the DONKEY!',c6:'The Donkey grabbed balloons and ran off to the fair!',snap:'SNAP!',its:'IT\'S YOU?!',
  next:'To be continued… 🎈',tag:'🦹 Episode 7 · Who\'s the Villain?',title:'Who\'s the Villain?',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'לונה פארק! אוספים מפתחות לקרוסלות!',c2:'אבל מישהו שם מלכודות בסתר… 🪤',c3:'תפסו מפתחות ותתחמקו מהמלכודות!',c4:'מי המרושע?! 🤔',c5:'נתפסת! המרושע הוא… החמור!',c6:'החמור חטף בלונים וברח ליריד!',snap:'קליק!',its:'זה אתה?!',
  next:'המשך יבוא… 🎈',tag:'🦹 פרק 7 · מי המרושע?',title:'מי המרושע?',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
