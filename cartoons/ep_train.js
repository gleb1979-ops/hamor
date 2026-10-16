(window.EPISODES=window.EPISODES||{}).train=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#2a1a10',b:'#3e2614',dot:'255,210,140'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
E.setTM('team');const map=h.floor('train');const CG=[750,320];
const RUNS={girl:[[11.4,560,420],[12.6,560,420],[14.2,320,300]],tall:[[11.8,880,520],[13,880,520],[14.8,1180,330]],nerd:[[15,660,520],[16,660,520],[17.6,330,700]],fat:[[12.4,940,420],[13.4,940,420]]};
function friend(c,t){const i=h.FR.indexOf(c),base=[[620,640],[700,700],[820,640],[900,700]][i];
  if(t<T1){const k=seg(t,0,3.5);return [base[0],lerp(-300,base[1],ease(k)),false,1]}
  if(t<T2)return [base[0],base[1],false,1];
  if(c==='fat'){if(t<14)return path(t,[[T2,base[0],base[1]],...RUNS.fat]);if(t<17.4)return [CG[0]+14,CG[1]+6,false,1];return path(t,[[17.4,CG[0]+14,CG[1]+30],[T3,base[0],base[1]]])}
  if(t<T3)return path(t,[[T2,base[0],base[1]],...RUNS[c],[T3-.2,base[0],base[1]]]);return path(t,[[T3,base[0],base[1]],[T3+1,[640,700,820,900][i],560]])}
function bag(c,t){const R=RUNS[c];if(!R||c==='fat')return c==='fat'&&t>13.4&&t<13.9;return t>R[1][0]&&t<R[2][0]}
function mach(i,t){if(i===0){if(t>13.4&&t<14)return path(t,[[13.4,1000,460,-1],[13.9,960,430,-1]]);return [700+Math.sin(t*.9)*260,470+(t>T2?Math.cos(t*.7)*120:0),true,Math.cos(t*.9)>0?-1:1]}return [900+Math.cos(t*.8)*240,560+Math.sin(t*1.1)*80,true,Math.sin(t*.8)>0?1:-1]}
function scenes(t){h.clip();h.cam(760,lerp(420,520,seg(t,0,4)),2.0);g.drawImage(map,0,0);
  if(t<T1){// balloons descending
    h.FR.forEach((c,i)=>{const p=friend(c,t);const v={id:'ep_'+c,c,x:p[0],y:p[1],face:1,moving:false,score:t<3.6?6:0,hat:null};h.add(p[1],()=>{E.drawHero(g,v,t);if(t<3.6)E.drawBalloons(g,v,t)})})}
  else h.FR.forEach((c,i)=>{const p=friend(c,t);h.add(p[1],()=>{h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],bag:bag(c,t)?1:0});if(bag(c,t))E.drawSack(g,p[0]-p[3]*30,p[1]-120,1)})});
  for(let i=0;i<2;i++){const m=mach(i,t);h.add(m[1],()=>E.drawTeacher(g,{k:'mach',x:m[0],y:m[1],a:m[3]<0?Math.PI:0,st:i===0&&t>13.4&&t<14?1:0,moving:m[2]},t))}
  if(t>T2&&t<T3)[[560,420,12.6],[880,520,13],[660,520,16],[940,420,13.4]].forEach(([x,y,tt])=>{if(t<tt)h.add(y,()=>E.drawSack(g,x,y,1))});
  const dk=path(t,[[0,1200,300,-1],[5.6,1000,470,-1],[9.5,1000,470,-1],[T3,1080,620,-1]]);h.add(dk[1],()=>h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]}));
  h.flush();
  E.drawCageFront(g,t,CG[0],CG[1]);
  if(t>6&&t<9.8){h.say(TXT.toot,1040,300,t,6.1,30,'#fff','#5a2410');for(let j=0;j<4;j++){const k=((t*1.2+j*.25)%1);g.fillStyle=`rgba(255,255,255,${.8*(1-k)})`;g.beginPath();g.arc(1180+k*40,380-k*140,16+k*20,0,7);g.fill()}h.emo('laugh',dk[0],dk[1]-250,1.1*pop(t,6.3))}
  if(t>13.9&&t<15)h.say(TXT.caught,CG[0],CG[1]-230,t,13.9,26,'#fff','#7b3fe4');
  if(t>16.6&&t<17.6){const p=friend('nerd',16.6);h.say(TXT.free,CG[0],CG[1]-230,t,16.8,26,'#fff','#5cc560')}
  for(const c of ['girl','tall','nerd']){const R=RUNS[c];if(t>R[2][0]&&t<R[2][0]+.8)h.say('+1 💰',R[2][1],R[2][2]-200,t,R[2][0],28,'#ffc531','#5a2410')}
  if(t>T3+.8&&t<T4)h.FR.forEach((c,i)=>h.emo(i%2?'stars':'heart',[640,700,820,900][i],560-250,1.1*pop(t,T3+.9+i*.07)));
  if(t>T4){const k=pop(t,T4+.6);g.save();g.translate(760,400);g.scale(k*1.6,k*1.6);E.drawSack(g,0,40,1.4);g.restore();if(t>T4+1.2){const k2=pop(t,T4+1.2);g.save();g.translate(760,300);g.scale(k2*1.8,k2*1.8);E.drawBone(g,0,0,1.6);g.restore();h.FR.forEach((c,i)=>h.emo('exclamation',[640,700,820,900][i],560-250,1.1*pop(t,T4+1.5+i*.07)))}}
  g.restore();
  if(t>T2&&t<T3+1){const n=['girl','tall','nerd'].filter(c=>t>RUNS[c][2][0]).length;h.counter(t,[{label:'💰 '+n+'/3'},{label:'🔒 '+(t>13.9&&t<17.4?1:0)}])}
  h.next(t)}
function icon(t){g.scale(2.6,2.6);E.drawSack(g,0,20,1.4)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).train={
 ru:{c1:'Бум! Приземлились прямо у поезда с золотом!',c2:'Машинисты охраняют мешки… а Ослик дудит в гудок 😈',c3:'Хватай мешок — и к своей лошади!',c4:'Пухляша поймали — в клетку! Выручай друга!',c5:'Банда собрала всё золото! 🤠',c6:'Но в мешке не золото… а КОСТЬ ДИНОЗАВРА?!',toot:'ТУУУ-ТУУУ!',caught:'В КЛЕТКУ!',free:'СВОБОДА!',
  next:'Продолжение следует… 🦖',tag:'🚂 Серия 9 · Грабители поезда',title:'Грабители поезда',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Thump! They landed right by the gold train!',c2:'The drivers guard the sacks… and the Donkey honks the horn 😈',c3:'Grab a sack — run to your horse!',c4:'Chubby got caught — into the cage! Save your friend!',c5:'The gang got all the gold! 🤠',c6:'But the sack holds no gold… it\'s a DINOSAUR BONE?!',toot:'TOOT-TOOT!',caught:'CAGE!',free:'FREE!',
  next:'To be continued… 🦖',tag:'🚂 Episode 9 · Train Robbers',title:'Train Robbers',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'בום! הם נחתו ממש ליד רכבת הזהב!',c2:'הנהגים שומרים על השקים… והחמור צופר בצופר 😈',c3:'תפסו שק — ורוצו לסוס שלכם!',c4:'השמנמן נתפס — לכלוב! תצילו את החבר!',c5:'הכנופיה אספה את כל הזהב! 🤠',c6:'אבל בשק אין זהב… זאת עצם של דינוזאור?!',toot:'טוּ-טוּ!',caught:'לכלוב!',free:'חופש!',
  next:'המשך יבוא… 🦖',tag:'🚂 פרק 9 · שודדי הרכבת',title:'שודדי הרכבת',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
