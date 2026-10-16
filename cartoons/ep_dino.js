(window.EPISODES=window.EPISODES||{}).dino=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#0e1020',b:'#181c38',dot:'200,200,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('dino','museum');const SK=[750,650];
const BONES=[[600,420,12.4,'girl'],[900,440,13.2,'tall'],[620,760,15.6,'nerd'],[920,740,16.8,'girl'],[760,380,17.8,'tall']];
function friend(c,t){const i=h.FR.indexOf(c),base=[[640,560],[720,600],[820,560],[900,600]][i];if(t<T1)return path(t,[[0,base[0],base[1]+400],[4,base[0],base[1]]]);if(t<T2)return [base[0],base[1],false,1];
  if(c==='fat'){if(t<13.6)return path(t,[[T2,base[0],base[1]],[13.4,base[0]+40,base[1]+40]]);if(t<T3)return [760+Math.cos(t*1.4)*180,560+Math.sin(t*1.9)*120,true,Math.sin(t*1.4)>0?-1:1];return path(t,[[T3,760,560],[T3+1,base[0],base[1]]])}
  if(t<T3){const K=[[T2,base[0],base[1]]];BONES.forEach(b=>{if(b[3]===c)K.push([b[2]-.1,b[0]+20,b[1]+20],[b[2]+.3,b[0]+20,b[1]+20])});K.push([T3-.2,base[0],base[1]]);return path(t,K)}
  return [base[0],base[1],false,1]}
function dino(t){if(t<9)return null;const k=seg(t,9,10);if(t<T2)return [SK[0],SK[1]-20,false,-1,k];if(t<T3){const ph=t*.7;return [760+Math.cos(ph)*230,520+Math.sin(ph*1.3)*170,true,Math.sin(ph)>0?-1:1,1]}return [lerp(760+Math.cos(T3*.7)*230,SK[0],seg(t,T3,T3+1.5)),lerp(520+Math.sin(T3*.91)*170,SK[1]-20,seg(t,T3,T3+1.5)),t<T3+1.5,-1,1-seg(t,T3+1,T3+2.2)]}
function scenes(t){h.clip();h.cam(770,520,2.0);g.drawImage(map,0,0);
  BONES.forEach(([x,y,tt])=>{if(t<tt&&t>T2-1)h.add(y,()=>E.drawBone(g,x,y,1))});
  h.FR.forEach((c,i)=>{const p=friend(c,t),dn=c==='fat'&&t>13.6&&t<T3+.4;h.add(p[1],()=>{if(dn)E.drawPDino(g,{id:'ep_f',c,x:p[0],y:p[1],face:p[3],moving:p[2],stun:0,score:1},t);else{h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3]});if(c==='fat'&&t<6.5)E.drawBone(g,p[0]+30,p[1]-110,.9)}})});
  const dk=path(t,[[0,1100,860,-1],[4,980,620,-1],[6.5,720,600,-1],[8.4,SK[0]+70,SK[1]-10,-1],[9.4,SK[0]+70,SK[1]-10,-1],[10.6,1040,480,1],[T3,1040,480,-1]]);
  h.add(dk[1],()=>{h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]});if(t>6.5&&t<8.6)E.drawBone(g,dk[0]-30,dk[1]-120,.9)});
  const d=dino(t);if(d&&d[4]>.01){const fr=t>15.8&&t<16.9;h.add(d[1],()=>{g.save();g.globalAlpha=d[4];E.drawTeacher(g,{k:'dino',x:d[0],y:d[1],a:d[3]<0?Math.PI:0,st:fr?2:0,moving:d[2]&&!fr},t);g.restore()})}
  h.flush();
  const dk2=t<T3?.86:t<T4?.86*(1-seg(t,T3,T3+1.5)):0;if(dk2>.02){const L=[];h.FR.forEach(c=>{const p=friend(c,t);L.push([p[0],p[1]-60,c==='nerd'?260:190])});L.push([dk[0],dk[1]-60,160]);BONES.forEach(b=>{if(t<b[2])L.push([b[0],b[1]-30,80])});E.drawDark(g,dk2,L)}
  if(t>8.6&&t<9.4){const k=seg(t,8.6,9.4);g.fillStyle=`rgba(255,255,220,${.8*(1-k)})`;g.beginPath();g.arc(SK[0],SK[1]-80,80+k*500,0,7);g.fill()}
  if(t>9.4&&t<11)h.say(TXT.roar,SK[0]-60,SK[1]-330,t,9.4,40,'#ffffff','#2e7d32');
  if(t>13.6&&t<14.6){const p=friend('fat',t);h.say(TXT.turn,p[0],p[1]-280,t,13.6,24,'#fff','#2e7d32')}
  if(t>15.8&&t<16.6){const p=friend('nerd',15.8);const k=seg(t,15.8,16.6),R=120+k*420,gr=g.createRadialGradient(p[0],p[1]-80,10,p[0],p[1]-80,R);gr.addColorStop(0,`rgba(255,255,235,${.95*(1-k)})`);gr.addColorStop(1,'rgba(255,255,235,0)');g.fillStyle=gr;g.beginPath();g.arc(p[0],p[1]-80,R,0,7);g.fill()}
  if(t>T3&&t<T4){g.fillStyle=`rgba(255,200,120,${.25*seg(t,T3,T3+1.5)})`;g.fillRect(0,0,1500,860);h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'heart':'stars',p[0],p[1]-250,1.1*pop(t,T3+1.6+i*.07))})}
  if(t>T4){const fl=(t%1.4)<.12;g.fillStyle=fl?'rgba(230,235,255,.6)':'rgba(10,10,30,.45)';g.fillRect(0,0,1500,860);if(fl){g.strokeStyle='#fff';g.lineWidth=6;g.beginPath();g.moveTo(1000,0);g.lineTo(940,180);g.lineTo(990,190);g.lineTo(920,360);g.stroke()}
    for(let i=0;i<60;i++){const k=(t*1.6+h.rnd(i))%1;g.strokeStyle='rgba(180,200,255,.6)';g.lineWidth=2;g.beginPath();const x=480+h.rnd(i+2)*600,y=180+k*700;g.moveTo(x,y);g.lineTo(x-8,y+26);g.stroke()}
    h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'drops':'exclamation',p[0],p[1]-250,1.1*pop(t,T4+.4+i*.07))})}
  g.restore();
  if(t>T2&&t<T3+1){const n=BONES.filter(b=>t>b[2]).length;h.counter(t,[{label:'🦴 '+n+'/5'},{label:'🦖 '+(t>13.6&&t<T3?2:1)}])}
  h.next(t)}
function icon(t){g.scale(1.3,1.3);E.drawTeacher(g,{k:'dino',x:0,y:110,a:Math.PI,st:0,moving:false},t)}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).dino={
 ru:{c1:'Ночью друзья принесли кость в музей…',c2:'Ослик вставил кость в скелет… и динозавры ОЖИЛИ! 🦖',c3:'Собирай кости и не попадись!',c4:'Кого поймали — сам становится динозавром!',c5:'Утро! Динозавры снова уснули… 🌅',c6:'Но на улице гроза! Бежим прятаться в старый замок!',roar:'РРРРР!',turn:'Я ДИНО?!',
  next:'Продолжение следует… 👻',tag:'🦖 Серия 10 · Ночь в музее',title:'Ночь в музее',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'At night the friends bring the bone to the museum…',c2:'The Donkey put the bone into the skeleton… and the dinos came ALIVE! 🦖',c3:'Collect bones and don\'t get caught!',c4:'Whoever gets caught becomes a dino too!',c5:'Morning! The dinos fell asleep again… 🌅',c6:'But there\'s a storm outside! Run and hide in the old castle!',roar:'ROARRR!',turn:'I\'M A DINO?!',
  next:'To be continued… 👻',tag:'🦖 Episode 10 · Dino Night',title:'Dino Night',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'בלילה החברים הביאו את העצם למוזיאון…',c2:'החמור הכניס את העצם לשלד… והדינוזאורים התעוררו! 🦖',c3:'אספו עצמות ואל תיתפסו!',c4:'מי שנתפס — הופך בעצמו לדינוזאור!',c5:'בוקר! הדינוזאורים נרדמו שוב… 🌅',c6:'אבל בחוץ סערה! רצים להסתתר בטירה העתיקה!',roar:'גררררר!',turn:'אני דינו?!',
  next:'המשך יבוא… 👻',tag:'🦖 פרק 10 · לילה במוזיאון',title:'לילה במוזיאון',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
