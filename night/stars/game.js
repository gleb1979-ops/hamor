/* Tagshim Night · Street Stars — 3v3 rooftop street football. Host-authoritative rooms (same transport as the kids games). */
(()=>{
'use strict';
const $=s=>document.querySelector(s),now=()=>performance.now(),clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,k)=>a+(b-a)*k,hyp=Math.hypot;
const W=1600,H=900,FX0=100,FX1=1500,FY0=200,FY1=850,CX=800,CY=525,GH=112,MATCH=120,WIN_GOALS=5;
const Q=new URLSearchParams(location.search);
/* ================= texts ================= */
const TX={
ru:{clubs:'Клубы и их умения',title:'Звёзды улицы',tag:'Уличный футбол 3 на 3 на крыше ночного города. Звёзды, суперудары и повторы голов.',quick:'⚡ Быстрый матч с ботами',friends:'👥 Играть с друзьями',join:'Войти',codePh:'Код комнаты',coll:'🃏 Коллекция',nick:'Твой ник',room:'Комната',invite:'📲 Позвать друзей',copy:'Скопировать ссылку',copied:'Ссылка скопирована!',pick:'Выбери звезду',cel:'Празднование гола',start:'▶ Начать матч',waitHost:'Ждём, пока хост начнёт матч…',bot:'бот',you:'ты',sw:'⇄ Сменить команду',teamA:'Неон',teamB:'Плазма',kick:'Удар',pass:'Пас',youAre:(n,c)=>`Ты — ${n} · ${c}`,skill:'Фишка',tackle:'Подкат',tkBonus:'🦵 3 подката — СУПЕР ЗАРЯЖЕН!',tkMaster:'Мастер подката',tkLine:'Подкаты',sup:'Супер',tipCtl:'Джойстик — бег. ⚽ — удар по воротам (держи — сильнее). 👟 — пас своему. Без мяча ⚽ или 👟 — отбор. 🦵 — подкат. ⚡ — фишка. 🔥 появится, когда шкала полная!',goal:'ГОЛ!',own:'АВТОГОЛ!',replay:'ПОВТОР',golden:'ЗОЛОТОЙ ГОЛ!',win:'ПОБЕДА!',lose:'ПОРАЖЕНИЕ',lv:'Ур.',xp:'XP',pack:'Нажми — открой пак!',newCard:'Новая карточка!',dupCard:'Уже есть — +40 XP',share:'📤 Поделиться голом',again:'🔁 Ещё матч',menu:'🏠 Меню',rot:'Поверни телефон горизонтально',hostLeft:'Хост вышел из игры',full:'Комната заполнена',back:'← Назад',supReady:'🔥 СУПЕРУДАР ГОТОВ!',needBall:'Нужен мяч!',kickoff:'ПОЕХАЛИ!',saved:'СЕЙВ!',steal:'ОТБОР!',mvp:'Лучший игрок',goals:'голы',rankUp:'Новый ранг!',levelUp:'Новый уровень!',locked:'с уровня',players:'Игроки',invMsg:'Го в «Звёзды улицы» ⚽ 3 на 3, суперудары и повторы голов! Заходи:',home:'← Tagshim',collT:'Коллекция карточек',collS:'Играй матчи и открывай паки: Бронза → Серебро → Золото → Легенда. Чем выше карточка — тем круче бутсы и аура звезды.',
 R:['Бронза','Серебро','Золото','Легенда'],RK:['Бронза','Серебро','Золото','Легенда'],
 C:{sky:'Руки в небо',slide:'Скольжение на коленях',spin:'Прыжок-вертушка',dance:'Танец',shh:'Тише!'},
 S:{tino:['Кэппи','«Магия»','Финт: проходит сквозь отбор'],bryce:['Джимми','«Пушка»','Следующий удар — пушечный'],ayla:['Кейт','«Комета»','Рывок: огромная скорость'],zane:['Дженни','«Ракета»','Удар через себя по воротам'],bakari:['Кайл','«Стена»','Подкат: отбирает и сбивает'],kai:['Широ','«Тень»','Магнит: мяч летит к нему']}},
en:{clubs:'Clubs and their skills',title:'Street Stars',tag:'3v3 street football on a night-city rooftop. Superstars, super shots and goal replays.',quick:'⚡ Quick match vs bots',friends:'👥 Play with friends',join:'Join',codePh:'Room code',coll:'🃏 Collection',nick:'Your nickname',room:'Room',invite:'📲 Invite friends',copy:'Copy link',copied:'Link copied!',pick:'Pick your star',cel:'Goal celebration',start:'▶ Start match',waitHost:'Waiting for the host to start…',bot:'bot',you:'you',sw:'⇄ Switch team',teamA:'Neon',teamB:'Plasma',kick:'Shoot',pass:'Pass',youAre:(n,c)=>`You are ${n} · ${c}`,skill:'Skill',tackle:'Slide',tkBonus:'🦵 3 slide tackles — SUPER CHARGED!',tkMaster:'Slide master',tkLine:'Slide tackles',sup:'Super',tipCtl:'Joystick — run. ⚽ — shoot at goal (hold for power). 👟 — pass to a teammate. Without the ball ⚽ or 👟 — tackle. 🦵 — slide. ⚡ — skill. 🔥 appears when the bar is full!',goal:'GOAL!',own:'OWN GOAL!',replay:'REPLAY',golden:'GOLDEN GOAL!',win:'VICTORY!',lose:'DEFEAT',lv:'Lv.',xp:'XP',pack:'Tap to open your pack!',newCard:'New card!',dupCard:'Already owned — +40 XP',share:'📤 Share my goal',again:'🔁 Play again',menu:'🏠 Menu',rot:'Turn your phone sideways',hostLeft:'The host left the game',full:'The room is full',back:'← Back',supReady:'🔥 SUPER SHOT READY!',needBall:'You need the ball!',kickoff:'GO!',saved:'SAVE!',steal:'STEAL!',mvp:'Best player',goals:'goals',rankUp:'New rank!',levelUp:'Level up!',locked:'from level',players:'Players',invMsg:'Join me in “Street Stars” ⚽ 3v3, super shots and goal replays! Tap:',home:'← Tagshim',collT:'Card collection',collS:'Play matches and open packs: Bronze → Silver → Gold → Legend. The higher the card, the cooler the boots and aura.',
 R:['Bronze','Silver','Gold','Legend'],RK:['Bronze','Silver','Gold','Legend'],
 C:{sky:'Arms to the sky',slide:'Knee slide',spin:'Spin jump',dance:'Dance',shh:'Shhh!'},
 S:{tino:['Cappy','“Magic”','Feint: slips through tackles'],bryce:['Jimmy','“Cannon”','Next shot is a cannonball'],ayla:['Kate','“Comet”','Dash: huge burst of speed'],zane:['Jenny','“Rocket”','Overhead kick at goal'],bakari:['Kyle','“Wall”','Slide tackle: steals and knocks down'],kai:['Shiro','“Shadow”','Magnet: the ball flies to him']}},
he:{clubs:'קבוצות והיכולות שלהן',title:'כוכבי הרחוב',tag:'כדורגל רחוב 3 על 3 על גג בעיר בלילה. כוכבים, בעיטות־על והילוכים חוזרים.',quick:'⚡ משחק מהיר נגד בוטים',friends:'👥 לשחק עם חברים',join:'כניסה',codePh:'קוד חדר',coll:'🃏 אוסף',nick:'הכינוי שלך',room:'חדר',invite:'📲 להזמין חברים',copy:'להעתיק קישור',copied:'הקישור הועתק!',pick:'בחרו כוכב',cel:'חגיגת גול',start:'▶ להתחיל משחק',waitHost:'מחכים שהמארח יתחיל…',bot:'בוט',you:'את/ה',sw:'⇄ להחליף קבוצה',teamA:'ניאון',teamB:'פלזמה',kick:'בעיטה',pass:'מסירה',youAre:(n,c)=>`אתה ${n} · ${c}`,skill:'טריק',tackle:'תיקול',tkBonus:'🦵 3 תיקולים — סופר טעון!',tkMaster:'מלך התיקולים',tkLine:'תיקולים',sup:'סופר',tipCtl:'ג׳ויסטיק — ריצה. ⚽ — בעיטה לשער (החזיקו לעוצמה). 👟 — מסירה לחבר. בלי כדור ⚽ או 👟 — חטיפה. 🦵 — תיקול. ⚡ — טריק. 🔥 מופיע כשהפס מלא!',goal:'גול!',own:'גול עצמי!',replay:'הילוך חוזר',golden:'גול זהב!',win:'ניצחון!',lose:'הפסד',lv:'רמה',xp:'XP',pack:'לחצו — פתחו חבילה!',newCard:'קלף חדש!',dupCard:'כבר יש — ‎+40 XP',share:'📤 לשתף את הגול',again:'🔁 עוד משחק',menu:'🏠 תפריט',rot:'סובבו את הטלפון לרוחב',hostLeft:'המארח יצא מהמשחק',full:'החדר מלא',back:'→ חזרה',supReady:'🔥 בעיטת־על מוכנה!',needBall:'צריך את הכדור!',kickoff:'יאללה!',saved:'הצלה!',steal:'חטיפה!',mvp:'השחקן הטוב',goals:'גולים',rankUp:'דרגה חדשה!',levelUp:'רמה חדשה!',locked:'מרמה',players:'שחקנים',invMsg:'בואו ל«כוכבי הרחוב» ⚽ 3 על 3, בעיטות־על והילוכים חוזרים! היכנסו:',home:'→ Tagshim',collT:'אוסף קלפים',collS:'משחקים ופותחים חבילות: ברונזה → כסף → זהב → אגדה. ככל שהקלף גבוה יותר — הנעליים וההילה מגניבות יותר.',
 R:['ברונזה','כסף','זהב','אגדה'],RK:['ברונזה','כסף','זהב','אגדה'],
 C:{sky:'ידיים לשמיים',slide:'החלקה על הברכיים',spin:'קפיצה מסתובבת',dance:'ריקוד',shh:'שקט!'},
 S:{tino:['קאפי','"קסם"','הטעיה: עובר דרך תיקולים'],bryce:['ג׳ימי','"תותח"','הבעיטה הבאה — תותח'],ayla:['קייט','"שביט"','דהירה: מהירות עצומה'],zane:['ג׳ני','"טיל"','בעיטת מספרת לשער'],bakari:['קייל','"חומה"','תיקול גלישה: חוטף ומפיל'],kai:['שירו','"צל"','מגנט: הכדור עף אליו']}}};
const LANGS=['ru','en','he'];let LANG=Q.get('lang')||localStorage.getItem('tn_lang')||((navigator.language||'').startsWith('he')?'he':(navigator.language||'').startsWith('ru')?'ru':'en');if(!TX[LANG])LANG='en';
const T=k=>TX[LANG][k]!=null?TX[LANG][k]:TX.en[k]!=null?TX.en[k]:k;
function applyDir(){document.documentElement.lang=LANG;document.documentElement.dir=LANG==='he'?'rtl':'ltr'}applyDir();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ================= stars ================= */
const STARS={
 tino:{h:.9,bw:30,skin:'#e9b48c',hair:'#3b2416',num:11,sp:318,col:'#22e3ff',sk:'feint'},
 bryce:{h:1.04,bw:37,skin:'#f0c6a0',hair:'#f3e7c0',num:9,sp:300,col:'#ffb800',sk:'cannon'},
 ayla:{h:.96,bw:29,skin:'#c88a5c',hair:'#ff5a2a',num:17,sp:338,col:'#ff3d8b',sk:'dash'},
 zane:{h:1.02,bw:32,skin:'#8a5a3c',hair:'#1a1210',num:21,sp:306,col:'#b6ff3b',sk:'lob'},
 bakari:{h:1.08,bw:41,skin:'#5b3a29',hair:'#1a1210',num:4,sp:282,col:'#ff8a00',sk:'slide'},
 kai:{h:.98,bw:31,skin:'#f3d2b6',hair:'#eef2ff',num:8,sp:312,col:'#a68bff',sk:'magnet'}};
const SIDS=Object.keys(STARS),CELS=['sky','slide','spin','dance','shh'],CEL_LV={sky:1,slide:2,spin:3,dance:5,shh:7};
const CLUBS=[
 {id:'neon',c:'#22e3ff',d:'#0a3f63',sh:'#11143a',k:'#f3ff5a',pk:{spd:1.08},n:{ru:'Неон Сити',en:'Neon City',he:'ניאון סיטי'},p:{ru:'⚡ Скорость: вся команда бегает на 8% быстрее',en:'⚡ Speed: the whole team runs 8% faster',he:'⚡ מהירות: כל הקבוצה רצה מהר יותר ב־8%'}},
 {id:'plasma',c:'#ff3d8b',d:'#7a1340',sh:'#11143a',k:'#7dff6a',pk:{shot:1.15},n:{ru:'Плазма',en:'Plasma',he:'פלזמה'},p:{ru:'💥 Удар: удары на 15% сильнее',en:'💥 Power: shots are 15% stronger',he:'💥 עוצמה: בעיטות חזקות יותר ב־15%'}},
 {id:'venom',c:'#b6ff3b',d:'#3d6a08',sh:'#141414',k:'#ff8a00',pk:{reach:1.35},n:{ru:'Веном',en:'Venom',he:'ונום'},p:{ru:'🦎 Отбор: достают мяч на треть дальше',en:'🦎 Tackles: reach the ball a third further',he:'🦎 חטיפות: מגיעים לכדור רחוק יותר בשליש'}},
 {id:'blaze',c:'#ff8a00',d:'#7a3500',sh:'#2a1208',k:'#22e3ff',pk:{sup:1.6},n:{ru:'Блэйз',en:'Blaze',he:'בלייז'},p:{ru:'🔥 Огонь: суперудар копится в 1.6 раза быстрее',en:'🔥 Fire: super shot charges 1.6× faster',he:'🔥 אש: בעיטת־העל נטענת מהר פי 1.6'}},
 {id:'frost',c:'#dff6ff',d:'#4f8cc9',sh:'#1b4f8a',k:'#ff3d8b',pk:{pass:1.22,ctrl:1},n:{ru:'Фрост',en:'Frost',he:'פרוסט'},p:{ru:'❄️ Пасы: точнее и быстрее, мяч ближе к ноге',en:'❄️ Passing: faster, sharper passes, tighter dribbling',he:'❄️ מסירות: מהירות ומדויקות, שליטה צמודה בכדור'}},
 {id:'shadow',c:'#a374ff',d:'#3c1a80',sh:'#0b0b14',k:'#f3ff5a',pk:{keeper:1.3},n:{ru:'Шэдоу',en:'Shadow',he:'שאדו'},p:{ru:'🧤 Вратарь-стена: прыгает дальше и быстрее',en:'🧤 Wall keeper: dives further and faster',he:'🧤 שוער־חומה: קופץ רחוק ומהר יותר'}}];
let CL=[0,1];const TEAMS=[{},{}];function setClubs(a,b){CL=[a,b];[a,b].forEach((ci,i)=>{const c=CLUBS[ci];TEAMS[i]={c:c.c,d:c.d,k:c.k,sh:c.sh}});try{document.documentElement.style.setProperty('--ta',TEAMS[0].c);document.documentElement.style.setProperty('--tb',TEAMS[1].c)}catch(e){}}setClubs(0,1);
const PK=t=>CLUBS[CL[t]].pk;const pk=(t,k)=>PK(t)[k]||1;const clubName=t=>CLUBS[CL[t]].n[LANG]||CLUBS[CL[t]].n.en;
function addSup(p,n){p.sup=Math.min(100,p.sup+n*pk(p.team,'sup'))}
const RCOL=['#c98a4a','#cfd8e6','#ffd23f','#ff5ad8'];
/* ================= profile ================= */
let _sid=null;try{_sid=sessionStorage.getItem('tn_id')}catch(e){}const ME={id:_sid||Math.random().toString(36).slice(2,10)};try{sessionStorage.setItem('tn_id',ME.id)}catch(e){}
let PR;try{PR=JSON.parse(localStorage.getItem('tn_prof')||'null')}catch(e){}
if(!PR)PR={name:'',xp:0,rp:0,wins:0,games:0,cards:{},star:'tino',cel:'sky'};SIDS.forEach(s=>{if(PR.cards[s]==null)PR.cards[s]=0});
const saveP=()=>{try{localStorage.setItem('tn_prof',JSON.stringify(PR))}catch(e){}};
const level=xp=>Math.floor(Math.sqrt(xp/120))+1,lvXp=l=>(l-1)*(l-1)*120;
const rankOf=rp=>rp>=500?3:rp>=250?2:rp>=100?1:0;
/* ================= audio ================= */
let ac=null;const SB={};function audio(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume&&ac.resume();if(!audio.l){audio.l=1;['kick','goal','whoosh','win','lose','go','tick','ball','bump','medal','buy','pick'].forEach(n=>fetch('../../sfx/'+n+'.mp3').then(r=>r.arrayBuffer()).then(b=>ac.decodeAudioData(b)).then(d=>SB[n]=d).catch(()=>{}))}}catch(e){}}
function sfx(n,v=.6,r=1){if(!ac||!SB[n])return false;try{const s=ac.createBufferSource(),g=ac.createGain();s.buffer=SB[n];s.playbackRate.value=r;g.gain.value=v;s.connect(g).connect(ac.destination);s.start()}catch(e){}return true}
function tone(f,d,ty='sine',v=.15,f2){if(!ac)return;try{const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d+.02)}catch(e){}}
let NB=null;function noise(d,v,lp){if(!ac)return;try{if(!NB){NB=ac.createBuffer(1,ac.sampleRate*2|0,ac.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain(),t=ac.currentTime;s.buffer=NB;f.type='bandpass';f.frequency.value=lp;f.Q.value=.6;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.25);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f).connect(g).connect(ac.destination);s.start(t);s.stop(t+d)}catch(e){}}
const crowd=(d=2.2,v=.35)=>noise(d,v,900);
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
/* ================= drawing ================= */
const cv=$('#cv'),ctx=cv.getContext('2d');let DPR=Math.min(3,devicePixelRatio||1),SC=1,OX=0,OY=0;
function rr(g,x,y,w,h,r){g.beginPath();if(g.roundRect)g.roundRect(x,y,w,h,r);else g.rect(x,y,w,h)}
const OUTL='#0a0816';
let pitchC=null;
function paintPitch(){const c=document.createElement('canvas');c.width=W*2;c.height=H*2;const f=c.getContext('2d');f.scale(2,2);
  const sk=f.createLinearGradient(0,0,0,FY0);sk.addColorStop(0,'#04031a');sk.addColorStop(1,'#1d1050');f.fillStyle=sk;f.fillRect(0,0,W,FY0);
  for(let i=0;i<120;i++){f.fillStyle=`rgba(255,255,255,${.2+(i%5)*.12})`;f.fillRect((i*389+17)%W,(i*137+5)%(FY0-60),2,2)}
  f.fillStyle='#fff6dc';f.shadowColor='#fff';f.shadowBlur=30;f.beginPath();f.arc(1380,58,26,0,7);f.fill();f.shadowBlur=0;
  let x=-20,i=0;while(x<W){const w=60+((i*47)%70),h=50+((i*61)%95);f.fillStyle=i%2?'#0b0a26':'#120f36';f.fillRect(x,FY0-40-h,w,h+40);for(let wy=FY0-34-h;wy<FY0-50;wy+=16)for(let wx=x+7;wx<x+w-10;wx+=13){const q=(wx*7+wy*13+i*3)%13;if(q<4){f.fillStyle=['#ffd36a','#22e3ff','#ff3d8b','#ffd36a'][q];f.globalAlpha=.85;f.fillRect(wx,wy,6,8);f.globalAlpha=1}}x+=w+4;i++}
  const sign=(x,y,w,txt,col)=>{f.save();f.fillStyle='#07071a';rr(f,x,y,w,44,10);f.fill();f.strokeStyle=col;f.lineWidth=3;f.shadowColor=col;f.shadowBlur=18;f.stroke();f.font='900 26px Rubik, sans-serif';f.textAlign='center';f.textBaseline='middle';f.fillStyle=col;f.fillText(txt,x+w/2,y+23);f.restore()};
  sign(150,40,300,'TAGSHIM NIGHT','#b6ff3b');sign(1000,70,280,'STREET STARS','#ff3d8b');
  f.fillStyle='#16152e';f.fillRect(0,FY0-44,W,H);for(let y=FY0-30;y<H;y+=40){f.fillStyle='rgba(255,255,255,.025)';f.fillRect(0,y,W,2)}
  for(const [vx,vy] of [[30,300],[30,700],[1570,300],[1570,700]]){f.fillStyle='#222140';rr(f,vx-22,vy-30,44,60,8);f.fill();f.fillStyle='#2e2c55';for(let k=0;k<4;k++)f.fillRect(vx-16,vy-22+k*13,32,5)}
  // back fence
  f.strokeStyle='rgba(180,190,255,.18)';f.lineWidth=1.5;for(let x2=FX0-14;x2<=FX1+14;x2+=18){f.beginPath();f.moveTo(x2,FY0-80);f.lineTo(x2+40,FY0-14);f.stroke();f.beginPath();f.moveTo(x2+40,FY0-80);f.lineTo(x2,FY0-14);f.stroke()}
  f.fillStyle='#3a3a6a';for(let x2=FX0-14;x2<=FX1+14;x2+=140)f.fillRect(x2-3,FY0-86,6,74);f.fillRect(FX0-14,FY0-88,FX1-FX0+28,5);
  for(const [lx,ly] of [[FX0-10,FY0-130],[FX1+10,FY0-130]]){f.fillStyle='#3a3a6a';f.fillRect(lx-4,ly,8,130);f.fillStyle='#fffbe0';f.shadowColor='#fff';f.shadowBlur=30;rr(f,lx-26,ly-14,52,20,5);f.fill();f.shadowBlur=0}
  return c}
function drawField(f){
  for(let k=0;k<10;k++){f.fillStyle=k%2?'#1e7743':'#1c703f';f.fillRect(FX0+k*(FX1-FX0)/10,FY0,(FX1-FX0)/10+1,FY1-FY0)}
  const vg=f.createRadialGradient(CX,CY,100,CX,CY,900);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,30,.45)');f.fillStyle=vg;f.fillRect(FX0,FY0,FX1-FX0,FY1-FY0);
  f.strokeStyle='rgba(255,255,255,.75)';f.lineWidth=4;f.strokeRect(FX0+6,FY0+6,FX1-FX0-12,FY1-FY0-12);f.beginPath();f.moveTo(CX,FY0+6);f.lineTo(CX,FY1-6);f.stroke();f.beginPath();f.arc(CX,CY,92,0,7);f.stroke();f.fillStyle='#fff';f.beginPath();f.arc(CX,CY,6,0,7);f.fill();
  for(const s of [-1,1]){const gx=s<0?FX0+6:FX1-6;f.strokeRect(s<0?gx:gx-190,CY-210,190,420);f.strokeRect(s<0?gx:gx-80,CY-140,80,280);f.beginPath();f.arc(s<0?gx+140:gx-140,CY,5,0,7);f.fill()}
  // neon frame
  f.save();f.shadowBlur=22;for(const [x1,y1,x2,y2,c] of [[FX0-14,FY0-14,CX,FY0-14,'#22e3ff'],[CX,FY0-14,FX1+14,FY0-14,'#ff3d8b'],[FX0-14,FY1+14,CX,FY1+14,'#22e3ff'],[CX,FY1+14,FX1+14,FY1+14,'#ff3d8b']]){f.strokeStyle=c;f.shadowColor=c;f.lineWidth=5;f.beginPath();f.moveTo(x1,y1);f.lineTo(x2,y2);f.stroke()}f.restore();
}
function drawGoal(g,side,front){const gx=side?FX1:FX0,d=side?1:-1,y0=CY-GH,y1=CY+GH;g.save();
  if(!front){g.fillStyle='rgba(255,255,255,.07)';g.fillRect(Math.min(gx,gx+d*56),y0,56,y1-y0);g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.2;for(let y=y0;y<=y1;y+=14){g.beginPath();g.moveTo(gx,y);g.lineTo(gx+d*56,y-26);g.stroke()}for(let k=0;k<=56;k+=14){g.beginPath();g.moveTo(gx+d*k,y0-26*(k/56));g.lineTo(gx+d*k,y1-26*(k/56));g.stroke()}
    g.strokeStyle='#e8ecff';g.lineWidth=7;g.beginPath();g.moveTo(gx,y0);g.lineTo(gx+d*56,y0-26);g.lineTo(gx+d*56,y1-26);g.stroke()}
  else{g.strokeStyle='#ffffff';g.lineWidth=9;g.shadowColor=side?'#ff3d8b':'#22e3ff';g.shadowBlur=14;g.beginPath();g.moveTo(gx,y0-70);g.lineTo(gx,y0);g.stroke();g.beginPath();g.moveTo(gx,y1-70);g.lineTo(gx,y1);g.stroke();g.beginPath();g.moveTo(gx,y0-70);g.lineTo(gx,y1-70);g.stroke();g.shadowBlur=0}
  g.restore()}
function hair(g,s,ph){const S=STARS[s]||{hair:'#111'};g.fillStyle=S.hair;
  if(s==='tino'){g.beginPath();g.arc(1,-112,16,Math.PI*1.02,Math.PI*2.05);g.fill();g.beginPath();g.moveTo(-15,-112);g.quadraticCurveTo(4,-136,17,-114);g.quadraticCurveTo(8,-122,-2,-118);g.closePath();g.fill();g.fillRect(-16,-114,6,10)}
  else if(s==='bryce'){g.beginPath();g.arc(1,-114,15.5,Math.PI,0);g.fill();g.beginPath();g.ellipse(-4,-133,9,8,0,0,7);g.fill();g.fillStyle='rgba(0,0,0,.15)';g.fillRect(-15,-112,30,3)}
  else if(s==='ayla'){g.beginPath();g.arc(1,-113,16.5,Math.PI*.95,Math.PI*2.05);g.fill();g.save();g.translate(-12,-122);g.rotate(.5+Math.sin(ph)*.35);g.beginPath();g.ellipse(-4,14,7,18,.2,0,7);g.fill();g.restore();g.fillStyle='#ffd23f';g.beginPath();g.arc(-12,-122,3.5,0,7);g.fill()}
  else if(s==='zane'){g.beginPath();g.ellipse(-1,-124,22,19,0,0,7);g.fill();g.fillStyle='#b6ff3b';g.fillRect(-17,-118,34,6)}
  else if(s==='bakari'){g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.ellipse(4,-122,6,3,-.4,0,7);g.fill();g.fillStyle=S.hair;g.beginPath();g.moveTo(-8,-104);g.quadraticCurveTo(4,-90,16,-104);g.lineTo(16,-108);g.quadraticCurveTo(4,-98,-8,-108);g.fill()}
  else if(s==='kai'){for(let k=0;k<5;k++){g.beginPath();g.moveTo(-15+k*7,-116);g.lineTo(-18+k*7+(k-2)*3,-138+Math.abs(k-2)*4);g.lineTo(-8+k*7,-116);g.fill()}g.beginPath();g.arc(1,-113,15.5,Math.PI,0);g.fill();g.fillStyle='#ff3d8b';g.fillRect(4,-110,10,2.5)}
  else if(s==='gk'){g.fillStyle='#111';g.beginPath();g.arc(1,-114,16,Math.PI,0);g.fill();g.fillRect(4,-118,18,5)}}
const VS=1.32;function drawPerson(g,o,t){const vs=o.vs||VS;const S=o.star==='gk'?{h:1.04,bw:36,skin:o.skin||'#d9a07a',hair:'#111',num:1}:STARS[o.star],tm=TEAMS[o.team],kit=o.star==='gk'?tm.k:tm.c,dark=o.star==='gk'?'#333':tm.d;
  const ph=t*12+(o.seed||0),run=o.anim===1||o.anim===6,cel=o.anim===3;let legA=0,armA=0,armB=0,bodyDy=0,lean=0,rot=0,flip=1,armBack=0;
  if(run){legA=Math.sin(ph)*.75;armA=-Math.sin(ph)*.8;armB=-armA;bodyDy=-Math.abs(Math.sin(ph))*3;lean=.08}
  if(o.anim===2){legA=-1.25;armA=.6;armB=-.9;lean=-.08}
  if(o.anim===5){legA=-1.45;lean=-.5;bodyDy=22;armA=-.9;armB=.5}
  if(o.anim===7){rot=-1.2;bodyDy=10;armA=-2.8;armB=-2.8}
  if(cel){const c=o.cel||'sky',k=t*6;if(c==='sky'){armA=armB=-2.7;bodyDy=-Math.abs(Math.sin(k))*14}else if(c==='slide'){bodyDy=26;lean=-.35;armA=-2.2;armB=-1.9;legA=-1.3}else if(c==='spin'){bodyDy=-Math.abs(Math.sin(k*.8))*40;flip=Math.cos(k*1.6)>0?1:-1;armA=-1.6;armB=1.6}else if(c==='dance'){lean=Math.sin(k*1.3)*.18;armA=-1.6+Math.sin(k*2)*.9;armB=-1.6-Math.sin(k*2)*.9;legA=Math.sin(k*2)*.4}else if(c==='shh'){armA=-2.6;armBack=1;bodyDy=-Math.abs(Math.sin(k*.6))*4}}
  g.save();g.translate(o.x,o.y);
  g.fillStyle='rgba(0,0,0,.38)';g.beginPath();g.ellipse(0,3,30*S.h*vs,10*vs,0,0,7);g.fill();
  if(o.rar>=2){const gr=g.createRadialGradient(0,0,4,0,0,46);gr.addColorStop(0,o.rar>2?'rgba(255,90,216,.55)':'rgba(255,210,63,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.ellipse(0,0,46,16,0,0,7);g.fill()}
  g.strokeStyle=tm.c;g.lineWidth=4;g.globalAlpha=.9;g.beginPath();g.ellipse(0,2,26*S.h*vs,9*vs,0,0,7);g.stroke();g.globalAlpha=1;
  if(o.me){g.strokeStyle='#b6ff3b';g.lineWidth=5;g.beginPath();g.ellipse(0,2,36*S.h*vs+Math.sin(t*6)*3,13*vs,0,0,7);g.stroke()}
  if(o.rar>=3){for(let k=0;k<6;k++){const a=(t*3+k)%1;g.fillStyle=`rgba(255,${120+k*20},${200-k*20},${.6*(1-a)})`;g.beginPath();g.arc(Math.sin(k*2.1+t*4)*18,-a*120,6*(1-a)+2,0,7);g.fill()}}
  g.rotate(rot);g.scale((o.face<0?-1:1)*flip*S.h*vs,S.h*vs);g.translate(0,bodyDy);g.rotate(lean);
  const boot=['#16161f','#d9e2f2','#ffd23f','#ff5ad8'][o.rar||0];
  const leg=(a,front)=>{g.save();g.translate(front?3:-3,-50);g.rotate(a);g.fillStyle=S.skin;rr(g,-5.5,10,11,22,4);g.fill();g.fillStyle=dark;rr(g,-6,26,12,18,3);g.fill();g.fillStyle='#fff';g.fillRect(-6,26,12,3);g.fillStyle=boot;rr(g,-7,42,20,9,4);g.fill();g.strokeStyle=OUTL;g.lineWidth=1.5;g.stroke();g.restore()};
  const arm=(a,front)=>{g.save();g.translate(front?4:-2,-90);g.rotate(a);g.fillStyle=kit;rr(g,-6,-2,12,14,5);g.fill();g.fillStyle=S.skin;rr(g,-5,10,10,22,5);g.fill();if(o.star==='gk'){g.fillStyle='#fff';g.beginPath();g.arc(0,34,8,0,7);g.fill();g.strokeStyle=OUTL;g.lineWidth=1.5;g.stroke()}else{g.fillStyle=S.skin;g.beginPath();g.arc(0,33,5.5,0,7);g.fill()}g.restore()};
  arm(armB,false);leg(-legA*.9,false);
  g.fillStyle=o.star==='gk'?'#222':'#13132a';rr(g,-S.bw/2+2,-58,S.bw-4,16,5);g.fill();
  leg(legA,true);
  {const jg=g.createLinearGradient(-S.bw/2,0,S.bw/2,0);jg.addColorStop(0,kit);jg.addColorStop(1,dark);g.fillStyle=jg}rr(g,-S.bw/2,-98,S.bw,44,10);g.fill();g.strokeStyle=OUTL;g.lineWidth=2.4;g.stroke();g.fillStyle=dark;rr(g,-6,-99,12,5,2);g.fill();
  g.fillStyle='rgba(255,255,255,.22)';g.fillRect(-S.bw/2+3,-96,5,40);if(o.rar===3){g.fillStyle='#ffd23f';g.fillRect(-S.bw/2,-60,S.bw,4)}
  g.fillStyle=o.star==='gk'?'#111':'#07071a';g.font='900 19px Rubik, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(S.num,0,-75);
  if(o.star==='bakari'){g.strokeStyle='#ffd23f';g.lineWidth=2;g.beginPath();g.arc(3,-99,9,.2,Math.PI-.2);g.stroke()}
  if(o.star==='kai'){g.fillStyle='#111';rr(g,-3,-90,10,26,4);g.fill()}
  g.fillStyle=S.skin;g.fillRect(-4,-104,9,8);
  g.beginPath();g.arc(2,-112,15,0,7);g.fill();g.strokeStyle=OUTL;g.lineWidth=1.5;g.stroke();
  g.fillStyle='#fff';g.beginPath();g.ellipse(9,-113,3.6,3,0,0,7);g.fill();g.fillStyle='#111';g.beginPath();g.arc(10.2,-113,1.8,0,7);g.fill();
  g.strokeStyle='#2a1a10';g.lineWidth=2;g.beginPath();g.moveTo(5,-119);g.lineTo(13,-118);g.stroke();
  g.strokeStyle='#5a2a1a';g.lineWidth=1.8;g.beginPath();if(cel||o.anim===2)g.arc(11,-104,3.5,0,Math.PI);else{g.moveTo(8,-104);g.lineTo(13,-104.5)}g.stroke();
  if(o.star==='kai'){g.fillStyle='#22e3ff';g.fillRect(4,-110,10,2)}
  hair(g,o.star,ph);
  if(o.star==='bakari'){g.fillStyle='#1a1210';g.beginPath();g.arc(9,-102,7,0,Math.PI);g.fill()}
  arm(armA,true);
  if(armBack){g.fillStyle=S.skin;g.beginPath();g.arc(13,-106,4,0,7);g.fill()}
  g.restore();
  if(o.anim===4){for(let k=0;k<3;k++){const a=t*6+k*2.1;star(g,o.x+Math.cos(a)*26,o.y-128*S.h*vs+Math.sin(a)*7,8)}}}
function star(g,x,y,r){g.save();g.fillStyle='#ffe14d';g.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,rr2=i%2?r*.45:r;g.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2)}g.closePath();g.fill();g.restore()}
function drawKeeperFig(g,k,i,t){const o={star:'gk',team:i,x:i?FX1-30:FX0+30,y:k.y,face:i?-1:1,anim:k.a===1?1:k.a===3?3:0,rar:0,seed:i*3};
  if(k.a===2){g.save();g.translate(o.x,o.y);g.rotate((k.dy||1)*(i?1:-1)*-1.1);g.translate(-o.x,-o.y);drawPerson(g,{...o,anim:0},t);g.restore();return}
  if(k.a===4){g.save();g.translate(o.x,o.y);g.rotate(i?1.4:-1.4);g.translate(-o.x,-o.y);drawPerson(g,{...o,anim:4},t);g.restore();return}
  drawPerson(g,o,t)}
function drawBall(g,b,t){const z=b.z||0,R=15;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(b.x,b.y+2,R+2-Math.min(8,z/25),6,0,0,7);g.fill();
  if(!b.owner){g.strokeStyle=`rgba(255,240,120,${.55+.3*Math.sin(t*6)})`;g.lineWidth=3;g.beginPath();g.ellipse(b.x,b.y+2,R+10,8,0,0,7);g.stroke()}
  if(b.fire){for(let k=0;k<8;k++){const a=k/8;g.fillStyle=`rgba(255,${140+k*12},40,${.7*(1-a)})`;g.beginPath();g.arc(b.x-(b.vx||0)*.014*k,b.y-z-15-(b.vy||0)*.014*k,17-k*1.5,0,7);g.fill()}}
  const y=b.y-z-R;g.save();g.translate(b.x,y);{const bg=g.createRadialGradient(-5,-5,2,0,0,R);bg.addColorStop(0,'#ffffff');bg.addColorStop(1,'#c9d2e6');g.fillStyle=bg}g.beginPath();g.arc(0,0,R,0,7);g.fill();g.strokeStyle=OUTL;g.lineWidth=2.2;g.stroke();g.rotate((b.x+b.y)*.025);g.fillStyle='#16161f';g.beginPath();for(let k=0;k<5;k++){const a=k*1.2566-1.57;g.lineTo(Math.cos(a)*5,Math.sin(a)*5)}g.closePath();g.fill();for(let k=0;k<5;k++){const a=k*1.2566+.63;g.beginPath();g.arc(Math.cos(a)*11.5,Math.sin(a)*11.5,3.2,0,7);g.fill()}g.restore();
  if(b.fire){g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(b.x,y,2,b.x,y,30);gr.addColorStop(0,'rgba(255,200,80,.8)');gr.addColorStop(1,'rgba(255,60,0,0)');g.fillStyle=gr;g.beginPath();g.arc(b.x,y,30,0,7);g.fill();g.restore()}}
const PIMG={};function pimg(sid,team){const k=sid+(team||0);if(!PIMG[k]){const im=new Image();im.src='img/'+k+'.png';PIMG[k]=im}return PIMG[k]}
function portrait(c,sid,rar,team){const g=c.getContext('2d'),w=c.width,h=c.height;g.clearRect(0,0,w,h);const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,['#3a2414','#3a4252','#5a4410','#4a1050'][rar]);gr.addColorStop(1,'#07071a');g.fillStyle=gr;g.fillRect(0,0,w,h);
  g.strokeStyle=RCOL[rar];g.lineWidth=w*.04;g.strokeRect(0,0,w,h);const im=pimg(sid,team);if(im.complete&&im.naturalWidth){g.save();g.beginPath();g.rect(w*.02,h*.02,w*.96,h*.96);g.clip();g.drawImage(im,-w*.15,-h*.02,w*1.3,w*1.3*1.15);g.restore()}else{im.addEventListener('load',()=>portrait(c,sid,rar,team),{once:true})}g.save();
  if(rar>=2){g.fillStyle=RCOL[rar];g.globalAlpha=.25;g.fillRect(0,0,w,h*.08);g.globalAlpha=1}}
/* ================= view / sim state ================= */
let V=null,G=null,isHost=false,solo=false,client=null,room=null,phase='menu',ROSTER=[],lastHost=0,rpSeen=-1;
const M={x:CX,y:CY,face:1,fx:1,fy:0,stun:0,dashU:0,feintU:0,slideT:0,sdx:0,sdy:0,kickA:0};
const inp={dx:0,dy:0};let kickDown=0,skillCd=0,lastSend=0;
const fx=[];let evSeen=0,REPLAY=null,REC=[],lastClip=null,goalLog={},myGoals=0;
function topic(){return 'tagshim-night/stars/v1/'+room}
function send(m){if(solo||!client)return;m.from=ME.id;try{client.publish(topic(),JSON.stringify(m),{qos:0})}catch(e){}}
/* ---------- host simulation ---------- */
function kickoffPos(p,slot){const d=p.team?-1:1,sx=p.team?FX1:FX0;const P=[[sx+d*300,CY-150],[sx+d*300,CY+150],[CX-d*130,CY]];return P[slot%3]}
function newMatch(roster){ROSTER=roster;G={P:{},ball:{x:CX,y:CY,z:0,vx:0,vy:0,vz:0,owner:null,fire:0,last:null,lastTeam:-1,held:-1},K:[{y:CY,a:0,hold:0,dive:0,fly:0,dy:1},{y:CY,a:0,hold:0,dive:0,fly:0,dy:1}],s:[0,0],c:MATCH,ph:'kick',pt:3.2,gold:0,rp:0,ev:[],evn:0,goals:{},first:1};
  const slot=[0,0];for(const r of roster){const p={...r,x:0,y:0,face:r.team?-1:1,fx:r.team?-1:1,fy:0,stun:0,sup:0,cd:0,anim:0,fl:0,dashU:0,feintU:0,magU:0,boostU:0,slideU:0,immU:0,kickA:0,celT:0,slot:slot[r.team]++,ai:{t:0,tx:CX,ty:CY,kick:0},seed:Math.random()*9};G.P[r.id]=p}resetKick()}
function resetKick(){const b=G.ball;Object.assign(b,{x:CX,y:CY,z:0,vx:0,vy:0,vz:0,owner:null,fire:0,held:-1,last:null,lastTeam:-1});for(const id in G.P){const p=G.P[id],[x,y]=kickoffPos(p,p.slot);p.x=x;p.y=y;p.face=p.fx=p.team?-1:1;p.fy=0;p.stun=0;p.anim=0}G.K.forEach(k=>{k.y=CY;k.a=0;k.hold=0;k.dive=0;k.fly=0});G.rp++;if(G.P[ME.id]){M.x=G.P[ME.id].x;M.y=G.P[ME.id].y;M.face=M.fx=G.P[ME.id].face;M.fy=0}}
const ev=(...a)=>{G.ev.push(a);G.evn++;const S=window.__ST||(window.__ST={});S[a[0]]=(S[a[0]]||0)+1};
function team(p){return p.team}
function oppGoalX(p){return p.team?FX0:FX1}
function doKick(p,pw,ax,ay,sup){const b=G.ball,tnow=now();if(G.ph!=='play'||p.stun>0)return;const bd0=hyp(b.x-p.x,b.y-p.y),own=b.owner===p.id&&bd0<80,near=b.held<0&&bd0<72*pk(p.team,'reach')&&b.z<50;if(!own&&!near)return;if(b.owner&&b.owner!==p.id&&G.P[b.owner]&&G.P[b.owner].team!==p.team)ev('STL',p.id);
  let dx=ax,dy=ay;let l=hyp(dx,dy);if(l<.2){dx=p.fx;dy=p.fy;l=hyp(dx,dy)||1}dx/=l;dy/=l;let sp,vz=40;b.fire=0;
  if(sup&&p.sup>=100){const gx=oppGoalX(p),ty=CY+(Math.random()-.5)*GH*1.2;dx=gx-b.x;dy=ty-b.y;l=hyp(dx,dy);dx/=l;dy/=l;sp=1650;b.fire=1;p.sup=0;vz=60;ev('SUP',p.id);b.pass=null}
  else if(pw<=0){let best=null,bs=-1e9;for(const id in G.P){const q=G.P[id];if(q===p||q.team!==p.team)continue;const ox=q.x-p.x,oy=q.y-p.y,d=hyp(ox,oy)||1,dot=(ox*dx+oy*dy)/d;if(d>900)continue;const s=(dot<.35?-3:0)+dot*2-d/600;if(s>bs){bs=s;best=q}}
    if(best){const tx=best.x+(best.vx||0)*.25,ty=best.y+(best.vy||0)*.25,d=hyp(tx-b.x,ty-b.y)||1;dx=(tx-b.x)/d;dy=(ty-b.y)/d;sp=clamp(d*1.38+170,430,1080)*pk(p.team,'pass');b.pass={from:p.id,team:p.team}}else{sp=520;b.pass=null}}
  else{const gx=oppGoalX(p),tg=hyp(gx-b.x,CY-b.y)||1,dot=(dx*(gx-b.x)+dy*(CY-b.y))/tg;if(dot>-.3&&Math.abs(gx-b.x)<1150){const kk=G.K[p.team?0:1],cy2=kk.y>CY?CY-GH+24:CY+GH-24,ex=gx-b.x,ey=cy2-b.y,el=hyp(ex,ey);const am=Math.abs(gx-b.x)<760?.8:.6;dx=lerp(dx,ex/el,am);dy=lerp(dy,ey/el,am);l=hyp(dx,dy);dx/=l;dy/=l}
    sp=(640+620*pw)*pk(p.team,'shot');if(p.boostU>tnow){sp*=1.38;p.boostU=0;b.fire=sp>1150?1:0}vz=pw>.8?140:50;b.pass=null}
  b.owner=null;b.held=-1;b.vx=dx*sp;b.vy=dy*sp;b.z=Math.max(b.z,3);b.vz=vz;b.last=p.id;b.lastTeam=p.team;b.noPick=p.id;b.noPickU=tnow+260;p.kickA=.28;p.face=dx<0?-1:1;ev('K',p.id,pw>0||sup?1:0,b.fire)}
function doSkill(p,ax,ay){const tnow=now();if(p.cd>tnow||p.stun>0||G.ph!=='play')return;const sk=STARS[p.star].sk,b=G.ball;
  if(sk==='lob'){if(b.owner!==p.id)return;const gx=oppGoalX(p),ty=CY+(Math.random()-.5)*GH,d=hyp(gx-b.x,ty-b.y)||1;b.owner=null;b.vx=(gx-b.x)/d*900;b.vy=(ty-b.y)/d*900;b.z=10;b.vz=520;b.last=p.id;b.lastTeam=p.team;b.noPick=p.id;b.noPickU=tnow+400;b.lob=1;b.fire=0;b.pass=null;p.anim=7;p.kickA=.6}
  if(sk==='feint')p.feintU=tnow+1300;if(sk==='dash')p.dashU=tnow+1800;if(sk==='cannon')p.boostU=tnow+6000;if(sk==='magnet')p.magU=tnow+1900;if(sk==='slide'){p.slideU=tnow+560;p.slideW=1;p.tkPend=0}
  p.cd=tnow+8000;ev('SK',p.id,sk)}
function doTackle(p,ax,ay){const tnow=now();if(G.ph!=='play'||p.stun>0||(p.tcd||0)>tnow||p.slideU>tnow)return;if(G.ball.owner===p.id)return;
  if(ax!=null){const l=hyp(ax,ay);if(l>.2){p.fx=ax/l;p.fy=ay/l;if(Math.abs(p.fx)>.15)p.face=p.fx<0?-1:1}}
  p.slideU=tnow+380;p.slideW=0;p.tkPend=1;p.tcd=tnow+3000;ev('TS',p.id)}
function steal(from,to,stun){const b=G.ball;b.owner=to.id;to.immU=now()+700;from.immU=0;if(stun){from.stun=stun;ev('STN',from.id,stun)}addSup(to,18);ev('STL',to.id)}
function ballTick(dt){const b=G.ball,tnow=now();
  if(b.held>=0){const k=G.K[b.held];b.x=b.held?FX1-52:FX0+52;b.y=k.y;b.z=30;b.vx=b.vy=0;return}
  if(b.owner){const p=G.P[b.owner];if(!p||hyp(p.x-b.x,p.y-b.y)>170)b.owner=null}
  b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;b.vz-=1500*dt;if(b.z<=0){b.z=0;if(b.vz<-160){b.vz*=-.42;if(b.lob){b.lob=0}}else b.vz=0}
  const fr=b.z>2?.82:.27;b.vx*=Math.pow(fr,dt);b.vy*=Math.pow(fr,dt);const sp=hyp(b.vx,b.vy);if(sp<520)b.fire=0;
  for(const id in G.P){const p=G.P[id];if(p.magU>tnow&&b.owner!==p.id){const d=hyp(p.x-b.x,p.y-b.y);if(d<260&&d>20){b.vx+=(p.x-b.x)/d*1600*dt;b.vy+=(p.y-b.y)/d*1600*dt}}}
  if(b.y<FY0+10){b.y=FY0+10;b.vy=Math.abs(b.vy)*.7}if(b.y>FY1-8){b.y=FY1-8;b.vy=-Math.abs(b.vy)*.7}
  const inMouth=Math.abs(b.y-CY)<GH-8&&b.z<120;
  for(const side of [0,1]){const gx=side?FX1:FX0,s=side?1:-1;if(s*(b.x-gx)>-10){if(inMouth||s*(b.x-gx)>0){if(s*(b.x-gx)>12){goal(side?0:1);return}if(Math.abs(b.y-CY)>GH-8){b.y=CY+Math.sign(b.y-CY)*(GH-9);b.vy*=-.5}}else{b.x=gx-s*10;b.vx=-b.vx*.7}}}}
function goal(tm){if(G.ph!=='play')return;const b=G.ball;G.s[tm]++;const sc=b.last&&G.P[b.last]?b.last:null,own=sc&&G.P[sc].team!==tm;if(sc&&!own){G.goals[sc]=(G.goals[sc]||0)+1;addSup(G.P[sc],25);G.P[sc].celT=1.7}
  ev('GL',tm,sc||'',own?1:0,G.s[0],G.s[1]);b.vx*=.2;b.vy*=.2;b.fire=0;G.ph='goal';G.pt=5.8;if(G.gold||G.s[tm]>=WIN_GOALS){G.ph='goalEnd';G.pt=5.8}}
function keeperTick(dt){const b=G.ball;G.K.forEach((k,i)=>{const gx=i?FX1-30:FX0+30;
  if(k.fly>0){k.fly-=dt;k.a=4;return}
  if(k.cd>0)k.cd-=dt;if(b.held===i){k.hold-=dt;k.a=0;if(k.hold<=0){k.cd=.9;let best=null,bd=1e9;for(const id in G.P){const p=G.P[id];if(p.team!==i)continue;const d=hyp(p.x-gx,p.y-k.y)+Math.random()*120;if(d<bd){bd=d;best=p}}b.held=-1;const tx=best?best.x:CX,ty=best?best.y:CY,d=hyp(tx-b.x,ty-b.y)||1,sp=clamp(d*1.38+170,430,1080);b.vx=(tx-b.x)/d*sp;b.vy=(ty-b.y)/d*sp;b.z=20;b.vz=200;b.last=null;b.lastTeam=i;b.noPick=null;b.pass=null;ev('K','',0,0)}return}
  let ty=CY+(b.y-CY)*.5;const tow=i?b.vx>200:b.vx<-200;if(tow){const tt=(gx-b.x)/(b.vx||1);if(tt>0&&tt<1.2)ty=b.y+b.vy*tt}
  ty=clamp(ty,CY-GH+14,CY+GH-14);const kp=pk(i,'keeper');let sp=310*kp;if(k.dive>0){k.dive-=dt;sp=920*kp}else if(tow&&b.vx*b.vx>250000&&Math.abs(gx-b.x)<260&&Math.abs(ty-k.y)>36){k.dive=.42;k.dy=Math.sign(ty-k.y)||1;ev('DV',i)}
  const dy=ty-k.y;k.y+=clamp(dy,-sp*dt,sp*dt);k.a=k.dive>0?2:Math.abs(dy)>3?1:0;
  if(!(k.cd>0)&&b.held<0&&b.z<85&&Math.abs(b.x-gx)<36&&Math.abs(b.y-k.y)<(k.dive>0?56:40)*Math.sqrt(kp)){const s=hyp(b.vx,b.vy);
    if(b.fire){k.fly=1.1;k.a=4;b.vx*=.9;ev('KF',i)}
    else if(s<640&&(!b.lob||b.z<40)){b.held=i;k.hold=.9;b.vx=b.vy=0;b.owner=null;ev('SV',i,1);if(b.last&&G.P[b.last])addSup(G.P[b.last],10)}
    else{b.vx=-b.vx*.35;b.vy=(Math.random()-.5)*520+b.vy*.25;b.vz=180;b.x=gx+(i?-38:38);b.noPick=null;ev('SV',i,0);if(b.last&&G.P[b.last])addSup(G.P[b.last],12)}}})}
function botAI(p,dt){const b=G.ball,tnow=now(),d=p.team?-1:1,ogx=oppGoalX(p),mgx=p.team?FX1:FX0;const A=p.ai;A.t-=dt;
  const mates=Object.values(G.P).filter(q=>q.team===p.team),opps=Object.values(G.P).filter(q=>q.team!==p.team);
  let tx=A.tx,ty=A.ty;
  if(b.owner===p.id){tx=ogx-d*120;ty=CY+(p.y-CY)*.35;let near=null,nd=1e9;for(const o of opps){const od=hyp(o.x-p.x,o.y-p.y);if(od<nd&&(o.x-p.x)*d>-20){nd=od;near=o}}
    if(near&&nd<120){ty=p.y+(p.y>near.y?150:-150)}
    if(A.t<=0){A.t=.18+Math.random()*.15;const gd=Math.abs(ogx-p.x);
      if(p.sup>=100&&gd<700&&Math.random()<.5){doKick(p,1,ogx-p.x,CY-p.y,1);return [0,0]}
      if(gd<520&&Math.random()<.5){const kk=G.K[p.team?0:1],cy2=kk.y>CY?CY-GH+26:CY+GH-26;doKick(p,.55+Math.random()*.45,ogx-p.x,cy2-p.y,0);return [0,0]}
      if(near&&nd<95&&Math.random()<.45){const m=mates.filter(q=>q!==p).sort((a,c)=>((c.x-a.x)*d))[0];if(m){doKick(p,0,m.x-p.x,m.y-p.y,0);return [0,0]}}
      if(p.cd<tnow&&Math.random()<.25){const sk=STARS[p.star].sk;if((sk==='feint'||sk==='dash')&&near&&nd<160)doSkill(p);else if(sk==='cannon'&&gd<650)doSkill(p);else if(sk==='lob'&&gd>350&&gd<650)doSkill(p)}}}
  else{const carrier=b.owner?G.P[b.owner]:null,ours=carrier&&carrier.team===p.team;
    if(ours){const slot=mates.filter(q=>q!==carrier).indexOf(p);tx=clamp(carrier.x+d*190,FX0+80,FX1-80);ty=clamp(carrier.y+(slot?170:-170),FY0+40,FY1-40)}
    else{const px=b.x+b.vx*.22,py=b.y+b.vy*.22;let chaser=null,cd2=1e9;for(const q of mates){const dd=hyp(q.x-px,q.y-py)*(q.bot?1:.8);if(dd<cd2){cd2=dd;chaser=q}}
      if(chaser===p||(b.held<0&&hyp(p.x-px,p.y-py)<140)){tx=px;ty=py;if(carrier&&p.cd<tnow&&hyp(carrier.x-p.x,carrier.y-p.y)<110&&Math.random()<dt*2){const sk=STARS[p.star].sk;if(sk==='slide'||sk==='magnet'||sk==='dash')doSkill(p)}
        if(carrier&&carrier.team!==p.team&&(p.tcd||0)<tnow&&hyp(carrier.x-p.x,carrier.y-p.y)<95&&Math.random()<dt*1.1)doTackle(p,b.x-p.x,b.y-p.y)}
      else{const slot=mates.filter(q=>q!==chaser).indexOf(p);tx=lerp(mgx,b.x,.5)+d*20;ty=lerp(CY,b.y,.6)+(slot?110:-110);tx=clamp(tx,FX0+70,FX1-70)}}
    if(!b.owner&&b.held<0&&hyp(b.x-p.x,b.y-p.y)<46&&b.z<40&&A.t<=0){A.t=.25;if(Math.abs(ogx-p.x)<520&&Math.random()<.5){doKick(p,.8,ogx-p.x,CY-p.y,0);return [0,0]}}}
  A.tx=tx;A.ty=ty;let mx=tx-p.x,my=ty-p.y;const l=hyp(mx,my);if(l<12)return [0,0];return [mx/l,my/l]}
function moveP(p,dx,dy,dt){const S=STARS[p.star],tnow=now();if(p.stun>0){p.stun-=dt;p.anim=4;p.vx=p.vy=0;return}
  let sp=S.sp*(p.bot?.9:1)*pk(p.team,'spd');if(G.ball.owner===p.id)sp*=.88;if(p.dashU>tnow)sp*=1.65;if(p.feintU>tnow)sp*=1.2;
  if(p.slideU>tnow){sp=640;dx=p.fx;dy=p.fy}
  const l=hyp(dx,dy);if(l>1){dx/=l;dy/=l}p.vx=dx*sp;p.vy=dy*sp;p.x=clamp(p.x+p.vx*dt,FX0+18,FX1-18);p.y=clamp(p.y+p.vy*dt,FY0+12,FY1-6);
  if(l>.15){const n=hyp(dx,dy)||1;p.fx=dx/n;p.fy=dy/n;if(Math.abs(dx)>.15)p.face=dx<0?-1:1}
  p.anim=p.slideU>tnow?5:p.kickA>0?2:l>.15?1:0}
function hostTick(dt){if(!G)return;const tnow=now();G.pt-=dt;
  if(G.ph==='kick'){if(G.pt<=0){G.ph='play';ev('GO')}}
  else if(G.ph==='goal'||G.ph==='goalEnd'){if(G.pt<=0){if(G.ph==='goalEnd'){G.ph='end';endMatch();return}G.ph='kick';G.pt=1.4;resetKick()}}
  else if(G.ph==='play'){if(!G.gold){G.c-=dt;if(G.c<=0){G.c=0;if(G.s[0]===G.s[1]){G.gold=1;ev('GG')}else{G.ph='end';endMatch();return}}}}
  for(const id in G.P){const p=G.P[id];if(p.kickA>0)p.kickA-=dt;if(p.celT>0)p.celT-=dt}
  if(G.ph==='play'){
    for(const id in G.P){const p=G.P[id];if(p.bot){const [dx,dy]=botAI(p,dt);moveP(p,dx,dy,dt)}else if(id===ME.id){}else{if(p.stun>0)p.stun-=dt;const tn=p.anim}}
    const bots=Object.values(G.P).filter(p=>p.bot);for(const a of bots)for(const q of Object.values(G.P)){if(a===q)continue;const dx=a.x-q.x,dy=a.y-q.y,d=hyp(dx,dy);if(d>0&&d<26&&!(G.ball.owner===q.id&&q.team!==a.team)){a.x+=dx/d*(26-d)*.5;a.y+=dy/d*(26-d)*.5}}
    const b=G.ball;
    if(b.held<0&&b.z<30){let best=null,bd=1e9;for(const id in G.P){const p=G.P[id];if(p.stun>0)continue;if(b.noPick===id&&tnow<b.noPickU)continue;const d=hyp(b.x-p.x,b.y-p.y);if(d<34&&d<bd){bd=d;best=p}}
      if(best){const s=hyp(b.vx,b.vy);if(b.fire){best.stun=.7;ev('STN',best.id,.7);b.noPick=best.id;b.noPickU=tnow+300}else if(s>760&&b.lastTeam!==best.team&&Math.random()<.4){b.vx*=-.3;b.vy=(Math.random()-.5)*400;b.noPick=best.id;b.noPickU=tnow+200;ev('DF',best.id)}
        else{if(b.pass&&b.pass.team===best.team&&b.pass.from!==best.id&&G.P[b.pass.from]){addSup(G.P[b.pass.from],14)}if(b.lastTeam>=0&&b.lastTeam!==best.team&&b.last)ev('INT',best.id);if(b.owner!==best.id){ev('TC',best.id);if(b.owner&&G.P[b.owner]&&G.P[b.owner].team!==best.team){ev('STL',best.id);addSup(best,4)}}
          const pv=hyp(best.vx||0,best.vy||0),tv=Math.max(150,pv*(PK(best.team).ctrl?1.0:1.12)+(PK(best.team).ctrl?60:90))*(best.feintU>tnow?1.15:1),bs=hyp(b.vx,b.vy),cv2=bs>520?Math.random()<.5:1;if(cv2&&pv<70){b.vx*=.08;b.vy*=.08;b.x=lerp(b.x,best.x+best.fx*30,.6);b.y=lerp(b.y,best.y+4+best.fy*12,.6)}else if(cv2){b.vx=best.fx*tv+(Math.random()-.5)*40;b.vy=best.fy*tv+(Math.random()-.5)*40}else{b.vx*=-.35;b.vy=(Math.random()-.5)*300}b.vz=0;b.owner=best.id;b.pass=null;b.fire=0;b.lob=0;b.last=best.id;b.lastTeam=best.team;b.noPick=best.id;b.noPickU=tnow+(cv2?190:120)}}}
    for(const id in G.P){const q=G.P[id];if(q.tkPend&&q.slideU<=tnow){q.tkPend=0;q.stun=.35;ev('STN',q.id,.35)}if(q.slideU>tnow&&b.held<0&&hyp(q.x-b.x,q.y-b.y)<(q.slideW?84:62)){const c=b.owner&&G.P[b.owner];q.tkPend=0;if(c&&c.team!==q.team&&hyp(c.x-q.x,c.y-q.y)<90){const st=q.slideW?1.4:.9;c.stun=st;ev('STN',c.id,st);G.tk=G.tk||{};const n=G.tk[q.id]=(G.tk[q.id]||0)+1;addSup(q,6);if(n%3===0)addSup(q,100);ev('TK',q.id,n)}b.owner=q.id;b.vx=q.fx*420;b.vy=q.fy*420;b.noPick=q.id;b.noPickU=tnow+220;ev('STL',q.id);q.slideU=0;break}}
    ballTick(dt);keeperTick(dt)}
  else if(G.ph==='goal'||G.ph==='goalEnd'){ballTick(dt);for(const id in G.P){const p=G.P[id];if(p.celT>0){p.anim=3;if(p.cel==='slide'){p.x=clamp(p.x+p.face*160*dt,FX0+18,FX1-18)}}else if(!p.stun)p.anim=0}}
  G.K.forEach((k,i)=>{if(G.ph!=='play'&&k.a!==4)k.a=G.ph==='goal'||G.ph==='goalEnd'?(G.ball.lastTeam===i?0:0):0});
  if(G.P[ME.id]){const p=G.P[ME.id];p.x=M.x;p.y=M.y;p.face=M.face;p.fx=M.fx;p.fy=M.fy;p.vx=M.vx||0;p.vy=M.vy||0;if(G.ph==='play')p.anim=M.anim;if(p.celT>0)p.anim=3;p.stun=Math.max(0,M.stun)}}
function snap(){const b=G.ball;return {t:'st',ph:G.ph,pt:+G.pt.toFixed(2),c:Math.ceil(G.c),gd:G.gold,s:G.s,rp:G.rp,
  P:Object.values(G.P).map(p=>[p.id,Math.round(p.x),Math.round(p.y),p.face,p.anim,(p.dashU>now()?1:0)|(p.feintU>now()?2:0)|(p.magU>now()?4:0)|(p.boostU>now()?8:0),Math.round(p.sup),p.stun>0?1:0]),
  B:[Math.round(b.x),Math.round(b.y),Math.round(b.z),b.owner||'',b.fire?1:0,Math.round(b.vx),Math.round(b.vy),b.held],K:G.K.map(k=>[Math.round(k.y),k.a,k.dy||1]),ev:G.ev.slice(-12),en:G.evn}}
function endMatch(){const res={t:'end',s:G.s,goals:G.goals,tk:G.tk||{},roster:ROSTER};for(let i=0;i<3;i++)setTimeout(()=>send(res),i*700);onEnd(res)}
/* ---------- client view ---------- */
function applySnap(m){if(!V)return;V.ph=m.ph;V.pt=m.pt;V.c=m.c;V.gd=m.gd;const prevS=V.s;V.s=m.s;
  for(const r of m.P){const p=V.P[r[0]];if(!p)continue;p.tx=r[1];p.ty=r[2];if(p.x==null){p.x=r[1];p.y=r[2]}p.face=r[3];p.anim=r[4];p.fl=r[5];p.sup=r[6];p.stn=r[7]}
  const b=V.B;b.tx=m.B[0];b.ty=m.B[1];b.z=m.B[2];b.owner=m.B[3]||null;b.fire=m.B[4];b.vx=m.B[5];b.vy=m.B[6];b.held=m.B[7];if(b.x==null){b.x=b.tx;b.y=b.ty}
  m.K.forEach((k,i)=>{V.K[i].ty=k[0];V.K[i].a=k[1];V.K[i].dy=k[2];if(V.K[i].y==null)V.K[i].y=k[0]});
  if(m.rp!==rpSeen){rpSeen=m.rp;const me=m.P.find(r=>r[0]===ME.id);if(me){M.x=me[1];M.y=me[2];M.face=M.fx=me[3];M.fy=0;M.stun=0}for(const r of m.P){const p=V.P[r[0]];if(p){p.x=r[1];p.y=r[2]}}if(b){b.x=b.tx;b.y=b.ty}}
  if(!isHost){const n=m.en;const list=m.ev;const fresh=n-evSeen;if(fresh>0){list.slice(-Math.min(fresh,list.length)).forEach(onEv);evSeen=n}}}
function onEv(e){const k=e[0];
  if(k==='K'){if(!sfx('kick',e[2]?.8:.45,e[2]?1:1.25))tone(180,.08,'square',.12,90);if(e[3]){noise(.6,.4,500);shake=10}}
  else if(k==='SUP'){big('🔥',600);noise(.7,.5,400);shake=14}
  else if(k==='GL'){const own=e[3],sc=e[2];big(own?T('own'):T('goal'),1500);if(!sfx('goal',.8))tone(660,.4,'square',.15);crowd(2.6,.45);shake=16;burst(e[1]?FX0:FX1,CY,e[1]?'#ff3d8b':'#22e3ff',40);
    if(sc&&!own){goalLog[sc]=(goalLog[sc]||0)+1;if(sc===ME.id){myGoals++;vib([80,40,160])}}startReplay(sc);}
  else if(k==='SV'){big(T('saved'),700);if(!sfx('ball',.6))tone(300,.1,'square',.12);crowd(1.1,.2)}
  else if(k==='KF'){big('💥',600);shake=12}
  else if(k==='STL'){fxText(T('steal'),e[1]);if(!sfx('bump',.5))tone(140,.12,'square',.12,70)}
  else if(k==='TK'){const n=e[2];if(e[1]===ME.id){myTk=n;vib([40,20,40])}fxText('🦵 '+T('tackle').toUpperCase()+'! '+(n%3||3)+'/3',e[1]);if(!sfx('bump',.7))tone(120,.15,'square',.14,60);shake=Math.max(shake,8);if(n%3===0){if(e[1]===ME.id){big(T('tkBonus'),1300);if(!sfx('medal',.6))tone(1200,.2,'square',.1)}const p=V.P[e[1]];if(p)burst(p.x,p.y-40,'#ffb020',26)}}
  else if(k==='TS'){if(e[1]!==ME.id&&!sfx('whoosh',.3))tone(300,.12,'sawtooth',.05,120)}
  else if(k==='STN'){if(e[1]===ME.id){M.stun=e[2];vib([60,30,60])}}
  else if(k==='SK'){const p=V.P[e[1]];if(p)burst(p.x,p.y-60,STARS[p.star]?STARS[p.star].col:'#fff',14);if(!sfx('whoosh',.5))tone(500,.25,'sawtooth',.08,1200)}
  else if(k==='GO'){$('#tip').hidden=true;big(T('kickoff'),550);if(!sfx('go',.6))tone(880,.2,'square',.12)}
  else if(k==='GG'){big(T('golden'),1600);crowd(2,.35)}
  else if(k==='TC'){if(e[1]===ME.id)vib(15)}
  else if(k==='DF'){if(!sfx('bump',.4,1.3))tone(220,.06,'square',.08)}}
function hostEvents(){const n=G.ev.length;for(let i=hostEvents.i||0;i<n;i++)onEv(G.ev[i]);hostEvents.i=n;if(G.ev.length>200){G.ev.splice(0,100);hostEvents.i-=100;}}
function viewFromRoster(r){V={ph:'kick',pt:3,c:MATCH,gd:0,s:[0,0],P:{},B:{x:CX,y:CY,z:0,owner:null},K:[{y:CY,a:0},{y:CY,a:0}]};for(const x of r)V.P[x.id]={...x,x:null,y:null,face:x.team?-1:1,anim:0,fl:0,sup:0,seed:Math.random()*9};rpSeen=-1;evSeen=0;goalLog={};myGoals=0;lastClip=null;REC=[];REPLAY=null}
/* ---------- fx ---------- */
let shake=0;function burst(x,y,col,n){if(window.R3D&&R3D.ok){R3D.burst(x,y,col,Math.min(n,24));return}for(let i=0;i<n;i++){const a=Math.random()*6.28,s=120+Math.random()*420;fx.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-200,t:0,l:.9+Math.random()*.6,c:col,r:3+Math.random()*4})}}
function fxText(txt,id){const p=V&&V.P[id];if(p)fx.push({x:p.x,y:p.y-150,vx:0,vy:-60,t:0,l:1,txt})}
let bigT=0;function big(s,ms){const b=$('#big');b.textContent=s;clearTimeout(bigT);bigT=setTimeout(()=>b.textContent='',ms)}
/* ---------- replay ---------- */
function recFrame(t){if(!V)return;REC.push({t,P:Object.values(V.P).map(p=>[p.id,p.x,p.y,p.face,p.anim]),B:[V.B.x,V.B.y,V.B.z,V.B.fire],K:V.K.map(k=>[k.y,k.a,k.dy])});while(REC.length&&t-REC[0].t>4.5)REC.shift()}
function startReplay(sc){const t=now()/1000;REPLAY={start:t+1.5,from:t-2.4,to:t+.25,sc,len:4.2,rec:false};}
function replayFrame(t){if(!REPLAY)return null;if(t<REPLAY.start)return null;if(!REPLAY.fr)REPLAY.fr=REC.filter(r=>r.t>=REPLAY.from-.1&&r.t<=REPLAY.to+.1);const k=(t-REPLAY.start)/REPLAY.len;if(k>1||!REPLAY.fr.length){stopRec();REPLAY=null;return null}
  if(!REPLAY.rec&&REPLAY.sc===ME.id){REPLAY.rec=true;startRec()}
  const tt=REPLAY.from+(REPLAY.to-REPLAY.from)*k;let f=REPLAY.fr[0];for(const r of REPLAY.fr){if(r.t>tt)break;f=r}return f}
let mr=null,chunks=[];function startRec(){try{if(!cv.captureStream||!window.MediaRecorder)return;const st=cv.captureStream(30);const types=['video/mp4','video/webm;codecs=vp9','video/webm'];const ty=types.find(x=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(x))||'';mr=new MediaRecorder(st,ty?{mimeType:ty,videoBitsPerSecond:2500000}:undefined);chunks=[];mr.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};mr.onstop=()=>{if(chunks.length)lastClip=new Blob(chunks,{type:mr.mimeType||'video/webm'})};mr.start()}catch(e){mr=null}}
function stopRec(){try{if(mr&&mr.state!=='inactive')mr.stop()}catch(e){}mr=null}
/* ================= input ================= */
const zone=$('#zone'),stick=$('#stick'),knob=$('#knob');let stickId=null,sc0=null;
function stickPos(x,y){stick.style.left=x+'px';stick.style.top=y+'px';stick.style.bottom='auto'}
zone.addEventListener('pointerdown',e=>{e.preventDefault();audio();stickId=e.pointerId;sc0=[e.clientX,e.clientY];stickPos(e.clientX,e.clientY);zone.setPointerCapture(e.pointerId)});
zone.addEventListener('pointermove',e=>{if(e.pointerId!==stickId)return;let dx=e.clientX-sc0[0],dy=e.clientY-sc0[1];const l=hyp(dx,dy),R=50;if(l>R){sc0[0]+=dx*(1-R/l)*.35;sc0[1]+=dy*(1-R/l)*.35;stickPos(sc0[0],sc0[1]);dx*=R/l;dy*=R/l}inp.dx=dx/R;inp.dy=dy/R;knob.style.transform=`translate(${dx}px,${dy}px)`});
const endStick=e=>{if(e.pointerId!==stickId)return;stickId=null;inp.dx=inp.dy=0;knob.style.transform=''};zone.addEventListener('pointerup',endStick);zone.addEventListener('pointercancel',endStick);
const keys={};addEventListener('keydown',e=>{if(e.repeat)return;keys[e.key]=1;if(phase!=='game')return;if(e.key===' '){e.preventDefault();kickStart()}if(e.key==='x'||e.key==='X'||e.key==='j'||e.key==='J')passPress();if(e.key==='e'||e.key==='E'||e.key==='Shift')skillPress();if(e.key==='f'||e.key==='F'||e.key==='q'||e.key==='Q')supPress();if(e.key==='r'||e.key==='R'||e.key==='c'||e.key==='C')tackPress()});
addEventListener('keyup',e=>{keys[e.key]=0;if(e.key===' '&&phase==='game')kickEnd()});
const keyDir=()=>{const dx=(keys.ArrowRight||keys.d||keys.D?1:0)-(keys.ArrowLeft||keys.a||keys.A?1:0),dy=(keys.ArrowDown||keys.s||keys.S?1:0)-(keys.ArrowUp||keys.w||keys.W?1:0);return dx||dy?[dx,dy]:null};
const bK=$('#bKick'),bS=$('#bSkill'),bU=$('#bSup'),bT=$('#bTack'),bP=$('#bPass');bP.addEventListener('pointerdown',e=>{e.preventDefault();audio();passPress()});let tackCd=0;
bK.addEventListener('pointerdown',e=>{e.preventDefault();audio();kickStart()});bK.addEventListener('pointerup',e=>{e.preventDefault();kickEnd()});bK.addEventListener('pointercancel',()=>kickEnd());
bS.addEventListener('pointerdown',e=>{e.preventDefault();skillPress()});bU.addEventListener('pointerdown',e=>{e.preventDefault();supPress()});bT.addEventListener('pointerdown',e=>{e.preventDefault();audio();tackPress()});
function canAct(){return V&&V.ph==='play'&&M.stun<=0}
function kickStart(){if(!canAct()||kickDown)return;kickDown=now()}
function kickEnd(){if(!kickDown)return;const d=(now()-kickDown)/1000;kickDown=0;if(!canAct())return;const pw=d<.18?.62:clamp(.62+(d-.18)/.6*.38,.62,1);act('kick',pw)}
function passPress(){if(!canAct())return;act('kick',0);vib(15)}
function act(k,pw){const [ax,ay]=aimVec();M.kickA=.28;if(isHost){const p=G.P[ME.id];if(k==='kick')doKick(p,pw,ax,ay,0);else if(k==='sup')doKick(p,1,ax,ay,1);else if(k==='tackle')doTackle(p,ax,ay);else doSkill(p,ax,ay)}else send({t:'act',k,pw,ax:+ax.toFixed(2),ay:+ay.toFixed(2)})}
function aimVec(){const k=keyDir();let dx=k?k[0]:inp.dx,dy=k?k[1]:inp.dy;if(hyp(dx,dy)<.25){dx=M.fx;dy=M.fy}return [dx,dy]}
function skillPress(){if(!canAct()||now()<skillCd)return;const sk=STARS[myStar()].sk;if(sk==='lob'&&(!V.B.owner||V.B.owner!==ME.id)){big(T('needBall'),700);return}skillCd=now()+8000;
  if(sk==='dash')M.dashU=now()+1800;if(sk==='feint')M.feintU=now()+1300;if(sk==='slide'){M.slideT=.42;M.sdx=M.fx;M.sdy=M.fy}act('skill',0);vib(20)}
function tackPress(){if(!canAct()||now()<tackCd||M.slideT>0)return;if(V.B.owner===ME.id){big(T('tackle')+' ✋⚽',600);return}tackCd=now()+3000;const [ax,ay]=aimVec(),l=hyp(ax,ay)||1;M.sdx=ax/l;M.sdy=ay/l;M.fx=M.sdx;M.fy=M.sdy;if(Math.abs(M.sdx)>.15)M.face=M.sdx<0?-1:1;M.slideT=.38;act('tackle',0);vib(25);if(!sfx('whoosh',.45))tone(300,.18,'sawtooth',.07,120)}
function supPress(){if(!canAct())return;const me=V.P[ME.id];if(!me||me.sup<100)return;if(hyp(V.B.x-M.x,V.B.y-M.y)>80){big(T('needBall'),700);return}act('sup',1);hud.supHide=now()+900;bU.classList.remove('ready')}
function myTeam(){const r=ROSTER.find(x=>x.id===ME.id);return r?r.team:0}
function myStar(){const r=ROSTER.find(x=>x.id===ME.id);return r?r.star:PR.star}
function moveMe(dt){if(!V)return;const k=keyDir();let dx=k?k[0]:inp.dx,dy=k?k[1]:inp.dy;const play=V.ph==='play';if(!play){dx=dy=0}
  if(M.stun>0){M.stun-=dt;dx=dy=0;M.anim=4}const S=STARS[myStar()],tnow=now();let sp=S.sp*pk(myTeam(),'spd');if(V.B.owner===ME.id)sp*=.88;if(M.dashU>tnow)sp*=1.65;if(M.feintU>tnow)sp*=1.2;if(kickDown)sp*=.8;
  if(M.slideT>0){M.slideT-=dt;sp=640;dx=M.sdx;dy=M.sdy}const l=hyp(dx,dy);if(l>1){dx/=l;dy/=l}M.vx=dx*sp;M.vy=dy*sp;M.x=clamp(M.x+M.vx*dt,FX0+18,FX1-18);M.y=clamp(M.y+M.vy*dt,FY0+12,FY1-6);
  if(l>.15){const n=hyp(dx,dy)||1;M.fx=dx/n;M.fy=dy/n;if(Math.abs(dx)>.15)M.face=dx<0?-1:1}if(M.kickA>0)M.kickA-=dt;
  if(M.stun<=0)M.anim=M.slideT>0?5:M.kickA>0?2:l>.15?1:0;
  if(!isHost&&tnow-lastSend>66){lastSend=tnow;send({t:'in',x:Math.round(M.x),y:Math.round(M.y),f:M.face,fx:+M.fx.toFixed(2),fy:+M.fy.toFixed(2),a:M.anim,vx:Math.round(M.vx),vy:Math.round(M.vy)})}}
/* ================= render ================= */
function resize(){const w=innerWidth,h=innerHeight;cv.width=w*DPR;cv.height=h*DPR;SC=Math.min(w/W,h/H);OX=(w-W*SC)/2;OY=(h-H*SC)/2;$('#rot').hidden=!(phase==='game'&&h>w*1.05)}
addEventListener('resize',resize);
let lastT=0;function frame(ts){requestAnimationFrame(frame);const raw=Math.min(.25,(ts-lastT)/1000||0),dt=Math.min(.05,raw);lastT=ts;const t=ts/1000;
  if(phase!=='game'||!V)return;
  const steps=Math.max(1,Math.ceil(raw/.05-1e-6)),sd=raw/steps||dt;for(let i=0;i<steps;i++){moveMe(sd);if(isHost&&G)hostTick(sd)}if(isHost&&G){hostEvents();const s=snap();applySnap(s);if(!solo&&ts-(frame.ls||0)>66){frame.ls=ts;send(s)}}
  else if(!isHost&&lastHost&&now()-lastHost>9000&&phase==='game'){phase='end';showMsg(T('hostLeft'))}
  for(const id in V.P){const p=V.P[id];if(id===ME.id){p.x=M.x;p.y=M.y;p.face=M.face;if(V.ph==='play'||M.stun>0)p.anim=M.anim;continue}if(p.tx==null)continue;const k=Math.min(1,dt*14);p.x+=(p.tx-p.x)*k;p.y+=(p.ty-p.y)*k}
  const b=V.B;if(b.tx!=null){if(isHost){b.x=b.tx;b.y=b.ty}else{b.x+=((b.tx+(b.vx||0)*.05)-b.x)*Math.min(1,dt*15);b.y+=((b.ty+(b.vy||0)*.05)-b.y)*Math.min(1,dt*15)}}
  V.K.forEach(k=>{if(k.ty!=null)k.y+=(k.ty-k.y)*Math.min(1,dt*14)});
  recFrame(t);draw(t,dt)}
const CAM={x:CX,y:CY,z:1};
function draw3(t,dt){const w=innerWidth,h=innerHeight;R3D.show(true);const rf=replayFrame(t);let P,B,K;
  if(rf){P=rf.P.map(r=>({...V.P[r[0]],x:r[1],y:r[2],face:r[3],anim:r[4]}));B={x:rf.B[0],y:rf.B[1],z:rf.B[2],fire:rf.B[3],vx:0,vy:0};K=rf.K.map(k=>({y:k[0],a:k[1],dy:k[2]}))}else{P=Object.values(V.P);B=V.B;K=V.K}
  const PP=P.map(p=>({...p,me:p.id===ME.id,name:p.bot?T('S')[p.star][0]:p.name}));let charge=null;if(kickDown&&!rf){const d=(now()-kickDown)/1000;charge=d<.18?.62:clamp(.62+(d-.18)/.6*.38,.62,1)}
  const own=!rf&&(V.B.owner===ME.id||kickDown);const k=keyDir();const md=[k?k[0]:inp.dx,k?k[1]:inp.dy];
  R3D.render({kits:[0,1].map(i=>({j:TEAMS[i].c,s:TEAMS[i].sh,so:TEAMS[i].c,gk:TEAMS[i].k})),t,dt,P:PP,B,K,rf:!!rf,charge,meP:V.P[ME.id]?{x:M.x,y:M.y}:null,aim:own?aimVec():null,myDir:Math.hypot(md[0],md[1])>.15?md:null,shake});if(shake>0)shake=Math.max(0,Math.min(5,shake)-dt*30);
  ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,w,h);minimap(w,h,P,B);
  if(rf){ctx.fillStyle='#ff3d8b';rr(ctx,16,16+(h>500?40:30),170,40,10);ctx.fill();ctx.font='900 22px Rubik, sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText((Math.floor(t*2)%2?'● ':'○ ')+T('replay'),101,36+(h>500?40:30))}
  hud(t)}
function draw(t,dt){if(window.R3D&&R3D.ok)return draw3(t,dt);const w=innerWidth,h=innerHeight;ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='#07071a';ctx.fillRect(0,0,w,h);
  let sx=0,sy=0;if(shake>0){sx=(Math.random()-.5)*shake;sy=(Math.random()-.5)*shake;shake=Math.max(0,Math.min(5,shake)-dt*30)}
  const rf=replayFrame(t);const Z=Math.max(h/600,w/1180);CAM.z=Z;const fb=rf?{x:rf.B[0],y:rf.B[1]}:V.B;let tx=fb.x,ty=fb.y-40;if(!rf&&V.P[ME.id]){tx=lerp(fb.x,M.x,.3);ty=lerp(fb.y,M.y,.3)-40}
  const hw=w/(2*Z),hh=h/(2*Z);tx=hw*2>=W?W/2:clamp(tx,hw-30,W-hw+30);ty=hh*2>=H?H/2:clamp(ty,hh+40,H-hh+20);const ck=Math.min(1,dt*(rf?6:3.5));if(!CAM.init){CAM.x=tx;CAM.y=ty;CAM.init=1}CAM.x+=(tx-CAM.x)*ck;CAM.y+=(ty-CAM.y)*ck;
  ctx.setTransform(DPR*Z,0,0,DPR*Z,DPR*(w/2-(CAM.x+sx)*Z),DPR*(h/2-(CAM.y+sy)*Z));if(!pitchC)pitchC=paintPitch();ctx.drawImage(pitchC,0,0,W,H);drawField(ctx);
  let P,B,K;
  if(rf){P=rf.P.map(r=>({...V.P[r[0]],x:r[1],y:r[2],face:r[3],anim:r[4]}));B={x:rf.B[0],y:rf.B[1],z:rf.B[2],fire:rf.B[3]};K=rf.K.map(k=>({y:k[0],a:k[1],dy:k[2]}))}
  else{P=Object.values(V.P);B=V.B;K=V.K}
  drawGoal(ctx,0,false);drawGoal(ctx,1,false);
  const L=[];for(const p of P)if(p.x!=null)L.push({y:p.y,f:()=>drawPerson(ctx,{...p,me:p.id===ME.id,rar:p.rar},t)});
  K.forEach((k,i)=>L.push({y:k.y,f:()=>drawKeeperFig(ctx,k,i,t)}));L.push({y:B.y+1,f:()=>drawBall(ctx,B,t)});L.sort((a,c)=>a.y-c.y);for(const o of L)o.f();
  drawGoal(ctx,0,true);drawGoal(ctx,1,true);
  if(!rf){for(const p of P){if(p.x==null)continue;const S=STARS[p.star],hy=p.y-142*S.h*VS;ctx.font='800 22px Rubik, sans-serif';ctx.textAlign='center';ctx.direction=/[֐-׿]/.test(p.name)?'rtl':'ltr';ctx.lineWidth=5;ctx.strokeStyle='#000c';const nm=(p.id===ME.id?'▼ ':'')+(p.bot?T('S')[p.star][0]:p.name);ctx.strokeText(nm,p.x,hy);ctx.fillStyle=p.id===ME.id?'#b6ff3b':TEAMS[p.team].c;ctx.fillText(nm,p.x,hy);
      if(p.sup>=100){ctx.font='18px sans-serif';ctx.fillText('🔥',p.x+(ctx.measureText(nm).width/2+12),hy)}}
    if(kickDown){const d=(now()-kickDown)/1000,pw=d<.18?0:clamp((d-.18)/.75,.3,1),S=STARS[myStar()];ctx.fillStyle='#000a';rr(ctx,M.x-44,M.y-165*S.h*VS-16,88,14,7);ctx.fill();ctx.fillStyle=pw>.85?'#ff3d8b':'#b6ff3b';rr(ctx,M.x-41,M.y-165*S.h*VS-13,82*pw,8,4);ctx.fill()}
    const tm=now();if(V.B.owner===ME.id||kickDown){const [ax,ay]=aimVec(),l=hyp(ax,ay)||1;ctx.strokeStyle='rgba(182,255,59,.55)';ctx.lineWidth=3;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(V.B.x,V.B.y-15);ctx.lineTo(V.B.x+ax/l*120,V.B.y-15+ay/l*120);ctx.stroke();ctx.setLineDash([])}}
  else{ctx.save();ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(0,0,w,h);ctx.fillStyle='#ff3d8b';rr(ctx,16,16+(innerHeight>500?40:30),170,40,10);ctx.fill();ctx.font='900 22px Rubik, sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText((Math.floor(t*2)%2?'● ':'○ ')+T('replay'),101,36+(innerHeight>500?40:30));ctx.restore()}
  for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;if(f.t>f.l){fx.splice(i,1);continue}f.x+=f.vx*dt;f.y+=f.vy*dt;if(!f.txt)f.vy+=600*dt;ctx.globalAlpha=1-f.t/f.l;if(f.txt){ctx.font='900 30px Rubik, sans-serif';ctx.textAlign='center';ctx.lineWidth=6;ctx.strokeStyle='#000';ctx.strokeText(f.txt,f.x,f.y);ctx.fillStyle='#ffd23f';ctx.fillText(f.txt,f.x,f.y)}else{ctx.fillStyle=f.c;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,7);ctx.fill()}ctx.globalAlpha=1}
  minimap(w,h,P,B);hud(t)}
function minimap(w,h,P,B){const mw=Math.min(170,w*.2),mh=mw*(FY1-FY0)/(FX1-FX0),x0=w-mw-12,y0=12,k=mw/(FX1-FX0);ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='rgba(7,7,26,.7)';rr(ctx,x0-4,y0-4,mw+8,mh+8,8);ctx.fill();ctx.fillStyle='rgba(30,120,67,.6)';ctx.fillRect(x0,y0,mw,mh);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1;ctx.strokeRect(x0,y0,mw,mh);ctx.beginPath();ctx.moveTo(x0+mw/2,y0);ctx.lineTo(x0+mw/2,y0+mh);ctx.stroke();
  if(!(window.R3D&&R3D.ok)){const Z=CAM.z,vw=w/Z,vh=h/Z;ctx.strokeStyle='rgba(255,255,255,.35)';ctx.strokeRect(x0+(CAM.x-vw/2-FX0)*k,y0+(CAM.y-vh/2-FY0)*k,vw*k,vh*k)}
  for(const p of P){if(p.x==null)continue;const me=p.id===ME.id;ctx.fillStyle=me?'#b6ff3b':TEAMS[p.team].c;ctx.beginPath();ctx.arc(x0+(p.x-FX0)*k,y0+(p.y-FY0)*k,me?4.5:3.2,0,7);ctx.fill()}ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x0+(B.x-FX0)*k,y0+(B.y-FY0)*k,3,0,7);ctx.fill()}
let lastClk='',myTk=0;function hud(t){if(V.ph==='kick'){const n=Math.ceil(V.pt);if(n>0&&n!==hud.cn){hud.cn=n;big(String(n),Math.min(950,V.pt*1000));if(!sfx('tick',.5))tone(600,.1,'square',.1)}}else{if(hud.cn){hud.cn=0;$('#tip').hidden=true}}$('#sA').textContent=V.s[0];$('#sB').textContent=V.s[1];const c=V.gd?'⭐ GG':Math.floor(V.c/60)+':'+String(V.c%60).padStart(2,'0');if(c!==lastClk){lastClk=c;$('#clk').textContent=c;if(V.ph==='play'&&!V.gd&&V.c<=5&&V.c>0)if(!sfx('tick',.4))tone(900,.06,'square',.08)}
  const me=V.P[ME.id],tnow=now();if(me){const r=me.sup>=100&&!(hud.supHide>tnow);bU.classList.toggle('ready',r);bU.lastChild.textContent=T('sup');bK.style.setProperty('--sp',Math.min(100,me.sup).toFixed(0));if(r&&!hud.sr){hud.sr=1;big(T('supReady'),900);if(!sfx('medal',.5))tone(1200,.2,'square',.1)}if(!r)hud.sr=0}
  const cd=skillCd-tnow;bS.classList.toggle('cd',cd>0);bS.lastChild.textContent=cd>0?Math.ceil(cd/1000)+'s':T('skill');const tc=tackCd-tnow;bT.classList.toggle('cd',tc>0);bT.lastChild.textContent=tc>0?Math.ceil(tc/1000)+'s':(myTk?'×'+myTk:T('tackle'))}
/* ================= network ================= */
let LP=new Map(),lobbyTimer=0,hiTimer=0,inLobby=false;
function connect(code,cb){room=code;client=window.roomClient?roomClient(topic(),'wss://broker.emqx.io:8084/mqtt',{clientId:'tn_'+ME.id,clean:true,reconnectPeriod:2000,connectTimeout:8000}):window.mqtt.connect('wss://broker.emqx.io:8084/mqtt',{clientId:'tn_'+ME.id});
  client.on('connect',()=>{client.subscribe(topic(),{qos:0},()=>cb&&cb())});client.on('message',(t,buf)=>{let m;try{m=JSON.parse(buf.toString())}catch(e){return}if(m.from===ME.id)return;onMsg(m)})}
function onMsg(m){if(isHost){
    if(m.t==='hi'){if(!LP.has(m.from)){if(LP.size>=6){send({t:'full',to:m.from});return}const tc=[0,0];LP.forEach(p=>tc[p.team]++);const team=tc[0]<=tc[1]?0:1;LP.set(m.from,{id:m.from,name:String(m.name||'?').slice(0,14),star:freeStar(team,m.star),team,cel:CELS.includes(m.cel)?m.cel:'sky',rar:clamp(m.rar|0,0,3)})}else{const p=LP.get(m.from);p.name=String(m.name||p.name).slice(0,14)}broadcastLobby();if(phase==='game'&&G)send({t:'start',roster:ROSTER,cl:CL,to:m.from})}
    else if(m.t==='pick'){const p=LP.get(m.from);if(!p||phase!=='lobby')return;if(m.team!=null&&(m.team===0||m.team===1)){const n=[...LP.values()].filter(q=>q.team===m.team).length;if(n<3){p.team=m.team;if([...LP.values()].some(q=>q!==p&&q.team===p.team&&q.star===p.star))p.star=freeStar(p.team,p.star)}}
      if(m.star&&STARS[m.star]&&![...LP.values()].some(q=>q!==p&&q.team===p.team&&q.star===m.star)){p.star=m.star;p.rar=clamp(m.rar|0,0,3)}if(m.cel&&CELS.includes(m.cel))p.cel=m.cel;broadcastLobby()}
    else if(m.t==='in'&&G&&G.P[m.from]){const p=G.P[m.from];p.x=m.x;p.y=m.y;p.face=m.f||1;p.fx=m.fx;p.fy=m.fy;p.vx=m.vx;p.vy=m.vy;if(G.ph==='play'&&p.celT<=0)p.anim=m.a}
    else if(m.t==='act'&&G&&G.P[m.from]){const p=G.P[m.from];if(m.k==='kick')doKick(p,m.pw||0,m.ax,m.ay,0);else if(m.k==='sup')doKick(p,1,m.ax,m.ay,1);else if(m.k==='skill')doSkill(p,m.ax,m.ay);else if(m.k==='tackle')doTackle(p,m.ax,m.ay)}
    else if(m.t==='bye'){LP.delete(m.from);if(phase==='lobby')broadcastLobby()}}
  else{if(m.t==='lobby'||m.t==='st'||m.t==='start'||m.t==='end')lastHost=now();
    if(m.t==='lobby'){if(m.cl)setClubs(m.cl[0],m.cl[1]);if(phase==='lobby'||phase==='end'&&m.again||phase==='join'){LP=new Map(m.players.map(p=>[p.id,p]));inLobby=LP.has(ME.id);if(phase!=='lobby')showLobby();else renderLobby()}}
    else if(m.t==='start'&&(!m.to||m.to===ME.id)&&phase!=='game'){if(m.cl)setClubs(m.cl[0],m.cl[1]);startClient(m.roster)}
    else if(m.t==='st'&&phase==='game')applySnap(m);
    else if(m.t==='end'&&phase==='game')onEnd(m);
    else if(m.t==='full'&&m.to===ME.id)showMsg(T('full'))}}
function freeStar(team,pref){const used=new Set([...LP.values()].filter(q=>q.team===team).map(q=>q.star));if(pref&&STARS[pref]&&!used.has(pref))return pref;return SIDS.find(s=>!used.has(s))||'tino'}
function broadcastLobby(again){send({t:'lobby',players:[...LP.values()],cl:CL,again:again?1:0});if(phase==='lobby')renderLobby()}
/* ================= screens ================= */
const scr=id=>{for(const s of ['menu','lobby','coll','end'])$('#'+s).hidden=s!==id;const g=id==='game';$('#hud').hidden=!g;if(!g)$('#mecard').hidden=true;$('#ctrl').hidden=!g;$('#tip').hidden=true;cv.style.visibility=g?'visible':'hidden';if(window.R3D&&R3D.show){R3D.show(g&&R3D.ok);if(!g&&R3D.reset)R3D.reset()}resize()};
function langBtn(){return `<button class="lang" id="lgB">🌐 ${LANG.toUpperCase()}</button><a class="home" href="../?lang=${LANG}">${T('home')}</a>`}
function bindLang(re){const b=$('#lgB');if(b)b.onclick=()=>{LANG=LANGS[(LANGS.indexOf(LANG)+1)%3];localStorage.setItem('tn_lang',LANG);applyDir();setLabels();re()}}
function setLabels(){bK.lastChild.textContent=T('kick');bP.lastChild.textContent=T('pass');bS.lastChild.textContent=T('skill');bU.lastChild.textContent=T('sup');$('#rotT').textContent=T('rot')}
function profHtml(){const l=level(PR.xp),a=lvXp(l),b=lvXp(l+1),rk=rankOf(PR.rp);return `<div class="prof"><div class="lv">${T('lv')} ${l}</div><div style="flex:1"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(PR.name||'—')}</b><span class="rank" style="color:${RCOL[rk]}">🏆 ${T('RK')[rk]} · ${PR.rp}</span></div><div class="bar"><i style="width:${Math.round((PR.xp-a)/(b-a)*100)}%"></i></div></div></div>`}
function showMenu(){phase='menu';scr('menu');const m=$('#menu');m.innerHTML=`${langBtn()}<div class="logo">TAGSHIM <b>NIGHT</b></div><h1>${T('title')}</h1><p class="sub">${T('tag')}</p>${profHtml()}
  <div class="col"><input id="nm" maxlength="14" placeholder="${T('nick')}" value="${esc(PR.name)}"><button class="btn" id="bQ">${T('quick')}</button><button class="btn pk" id="bF">${T('friends')}</button>
  <div class="row"><input id="cd" maxlength="4" placeholder="${T('codePh')}" style="text-transform:uppercase"><button class="btn gh" id="bJ" style="flex:0 0 auto">${T('join')}</button></div><button class="btn gh" id="bC">${T('coll')}</button></div><p class="st" style="margin-top:16px;font-size:11px;opacity:.7">Characters: <a style="color:inherit" href="https://github.com/polygonalmind/100Avatars" target="_blank" rel="noopener">100Avatars by Polygonal Mind</a> · <a style="color:inherit" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> · modified (kits, animations)<br>v9 · ${window.R3D&&R3D.ok?'3D':window.R3D&&R3D.loading?'3D…':'2D'}</p>`;
  bindLang(showMenu);const nm=()=>{PR.name=($('#nm').value.trim()||PR.name||'Star'+(Math.random()*90+10|0)).slice(0,14);saveP()};
  $('#bQ').onclick=()=>{audio();nm();soloLobby()};$('#bF').onclick=()=>{audio();nm();createRoom()};$('#bJ').onclick=()=>{audio();nm();const c=$('#cd').value.trim().toUpperCase();if(c.length===4)joinRoom(c)};$('#bC').onclick=()=>showColl()}
function showMsg(s){phase='end';scr('end');$('#end').innerHTML=`<div class="logo">TAGSHIM <b>NIGHT</b></div><p class="res" style="font-size:28px">${esc(s)}</p><div class="col"><button class="btn" id="bM">${T('menu')}</button></div>`;$('#bM').onclick=()=>{leave();showMenu()}}
function leave(){try{send({t:'bye'});client&&client.end()}catch(e){}client=null;room=null;isHost=false;solo=false;G=null;V=null;LP=new Map();clearInterval(lobbyTimer);clearInterval(hiTimer);history.replaceState(null,'',location.pathname+'?lang='+LANG)}
function myLP(){return {id:ME.id,name:PR.name,star:PR.star,team:0,cel:PR.cel,rar:PR.cards[PR.star]||0}}
function createRoom(){leave();isHost=true;const code=Array.from({length:4},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.random()*32|0]).join('');LP=new Map([[ME.id,myLP()]]);connect(code,()=>broadcastLobby());history.replaceState(null,'',location.pathname+'?room='+code+'&lang='+LANG);clearInterval(lobbyTimer);lobbyTimer=setInterval(()=>{if(phase==='lobby')broadcastLobby()},1500);showLobby()}
function joinRoom(code){leave();isHost=false;phase='join';scr('lobby');$('#lobby').innerHTML=`<div class="logo">TAGSHIM <b>NIGHT</b></div><h1>${T('title')}</h1><p class="st">${T('room')} <span class="code">${esc(code)}</span>…</p>`;
  connect(code,()=>{const hi=()=>send({t:'hi',name:PR.name,star:PR.star,cel:PR.cel,rar:PR.cards[PR.star]||0});hi();hiTimer=setInterval(()=>{if(!inLobby&&phase!=='game')hi()},1200)});lastHost=0}
function showLobby(){phase='lobby';scr('lobby');renderLobby()}
function renderLobby(){const el=$('#lobby');const mine=LP.get(ME.id),link=location.origin+location.pathname+'?room='+room+'&lang='+LANG;const lv=level(PR.xp);
  const tl=t=>[...LP.values()].filter(p=>p.team===t).map(p=>`<div>${p.id===ME.id?'▶ ':''}${esc(p.name)} · ${esc(T('S')[p.star][0])}</div>`).join('')+Array.from({length:3-[...LP.values()].filter(p=>p.team===t).length},()=>`<div style="opacity:.5">🤖 ${T('bot')}</div>`).join('');
  el.innerHTML=`${langBtn()}<div class="logo">TAGSHIM <b>NIGHT</b></div><h1 style="font-size:clamp(28px,6vw,44px)">${T('title')}</h1>${room?`<p class="st">${T('room')} <span class="code">${esc(room)}</span></p>`:''}
   <div class="col">${room?`<div class="row"><button class="btn pk" id="bInv">${T('invite')}</button><button class="btn gh" id="bCp">${T('copy')}</button></div>`:''}
   <div class="teams"><div class="team" style="box-shadow:inset 0 0 0 2px ${TEAMS[0].c}"><h3 style="color:${TEAMS[0].c}">${esc(clubName(0))}</h3>${tl(0)}</div><div class="team" style="box-shadow:inset 0 0 0 2px ${TEAMS[1].c}"><h3 style="color:${TEAMS[1].c}">${esc(clubName(1))}</h3>${tl(1)}</div></div>
   <div class="lbl">${T('clubs')}</div><div class="teams">${[0,1].map(t=>{const c=CLUBS[CL[t]];return `<div class="team" style="box-shadow:inset 0 0 0 2px ${c.c};text-align:center"><div style="display:flex;align-items:center;justify-content:space-between;gap:6px">${isHost?`<button class="chip clb" data-t="${t}" data-d="-1">◀</button>`:''}<b style="color:${c.c};font-size:17px">${esc(c.n[LANG]||c.n.en)}</b>${isHost?`<button class="chip clb" data-t="${t}" data-d="1">▶</button>`:''}</div><div style="display:flex;justify-content:center;gap:4px;margin:8px 0"><i style="width:22px;height:22px;border-radius:6px;background:${c.c}"></i><i style="width:22px;height:22px;border-radius:6px;background:${c.sh}"></i></div><small style="color:var(--mut);font-size:13px">${esc(c.p[LANG]||c.p.en)}</small></div>`}).join('')}</div>
   ${mine?`<button class="btn gh" id="bSw">${T('sw')}</button><div class="lbl">${T('pick')}</div><div class="stars" id="stG"></div><div class="lbl">${T('cel')}</div><div class="chips" id="celG"></div>`:''}
   ${isHost?`<button class="btn gold" id="bSt">${T('start')}</button>`:`<p class="st">${T('waitHost')}</p>`}<button class="btn gh" id="bBk">${T('back')}</button></div>`;
  bindLang(renderLobby);
  if(room){$('#bInv').onclick=()=>{const txt=T('invMsg')+' '+link;if(navigator.share)navigator.share({text:txt,url:link}).catch(()=>{});else open('https://wa.me/?text='+encodeURIComponent(txt))};$('#bCp').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(link);big(T('copied'),900)}}
  if(mine){const sg=$('#stG');for(const s of SIDS){const taken=[...LP.values()].some(q=>q.id!==ME.id&&q.team===mine.team&&q.star===s),rar=PR.cards[s]||0;const d=document.createElement('div');d.className='card'+(mine.star===s?' on':'')+(taken?' taken':'');const c=document.createElement('canvas');c.width=180;c.height=207;portrait(c,s,rar,mine.team);d.appendChild(c);d.insertAdjacentHTML('beforeend',`<span class="rb" style="background:${RCOL[rar]}">${T('R')[rar]}</span><b>${esc(T('S')[s][0])} ${esc(T('S')[s][1])}</b>⚡ ${esc(T('S')[s][2])}`);if(!taken)d.onclick=()=>pick({star:s,rar});sg.appendChild(d)}
    const cg=$('#celG');for(const c of CELS){const ok=lv>=CEL_LV[c];const b=document.createElement('button');b.className='chip'+(mine.cel===c?' on':'');b.disabled=!ok;b.textContent=(ok?'':'🔒 ')+T('C')[c]+(ok?'':' · '+T('locked')+' '+CEL_LV[c]);b.onclick=()=>pick({cel:c});cg.appendChild(b)}
    $('#bSw').onclick=()=>pick({team:1-mine.team})}
  document.querySelectorAll('.clb').forEach(b=>b.onclick=()=>{const t=+b.dataset.t,d=+b.dataset.d;let n=CL[t];do{n=(n+d+CLUBS.length)%CLUBS.length}while(n===CL[1-t]);const c=[...CL];c[t]=n;setClubs(c[0],c[1]);try{localStorage.setItem('tn_cl',JSON.stringify(c))}catch(e){}if(solo)renderLobby();else broadcastLobby()});
  if(isHost)$('#bSt').onclick=()=>{audio();if(solo)startSolo();else hostStart()};$('#bBk').onclick=()=>{leave();showMenu()}}
function pick(o){if(o.star){PR.star=o.star}if(o.cel)PR.cel=o.cel;saveP();if(isHost){const p=LP.get(ME.id);if(o.team!=null){const n=[...LP.values()].filter(q=>q.team===o.team).length;if(n<3){p.team=o.team;if([...LP.values()].some(q=>q!==p&&q.team===p.team&&q.star===p.star))p.star=freeStar(p.team,p.star)}}if(o.star){p.star=o.star;p.rar=o.rar}if(o.cel)p.cel=o.cel;broadcastLobby()}else send({t:'pick',...o})}
function buildRoster(){const R=[];for(const p of LP.values())R.push({id:p.id,name:p.name,star:p.star,team:p.team,cel:p.cel,rar:p.rar,bot:0});
  for(const tm of [0,1]){const n=R.filter(r=>r.team===tm).length;const used=new Set(R.filter(r=>r.team===tm).map(r=>r.star));const free=SIDS.filter(s=>!used.has(s)).sort(()=>Math.random()-.5);for(let i=n;i<3;i++){const s=free.pop();R.push({id:'bot'+tm+i,name:'',star:s,team:tm,cel:CELS[Math.random()*3|0],rar:Math.random()<.25?1:0,bot:1})}}return R}
function hostStart(){const R=buildRoster();newMatch(R);for(let i=0;i<3;i++)setTimeout(()=>send({t:'start',roster:R,cl:CL}),i*500);beginGame(R)}
function soloLobby(){leave();isHost=true;solo=true;room=null;LP=new Map([[ME.id,myLP()]]);try{const c=JSON.parse(localStorage.getItem('tn_cl')||'null');if(c&&CLUBS[c[0]]&&CLUBS[c[1]]&&c[0]!==c[1])setClubs(c[0],c[1])}catch(e){}showLobby()}
function startSolo(){if(window.R3D&&R3D.loading&&!startSolo.w){startSolo.w=1;big('3D…',8000);const t0=now(),wt=()=>{if(!R3D.loading||now()-t0>8000){big('',1);startSolo()}else setTimeout(wt,150)};wt();return}startSolo.w=0;hostStart()}
function startClient(R){ROSTER=R;clearInterval(hiTimer);beginGame(R)}
function beginGame(R){ROSTER=R;viewFromRoster(R);phase='game';scr('game');setLabels();hostEvents.i=0;skillCd=0;tackCd=0;myTk=0;hud.supHide=0;M.stun=0;M.dashU=M.feintU=0;M.slideT=0;const me=R.find(r=>r.id===ME.id);if(me){const [x,y]=kickoffPos(me,R.filter(r=>r.team===me.team).indexOf(me));M.x=x;M.y=y;M.face=M.fx=me.team?-1:1;M.fy=0}
  const tp=$('#tip');tp.textContent=T('tipCtl');tp.hidden=false;hud.cn=0;crowd(3,.25);
  if(me){const nm=T('S')[me.star][0],cl=clubName(me.team);const mc=$('#mecard');mc.innerHTML=`<img src="img/${me.star}${me.team}.png" alt=""><b>${esc(nm)}</b>`;mc.style.borderColor=TEAMS[me.team].c;mc.hidden=false;big(T('youAre')(nm,cl),1800)}}
function onEnd(m){if(phase!=='game')return;phase='end';stopRec();const me=m.roster.find(r=>r.id===ME.id);const myT=me?me.team:0,win=m.s[myT]>m.s[1-myT];
  const g=m.goals||{};let mvp=null,mv=-1;for(const id in g)if(g[id]>mv){mv=g[id];mvp=id}const mvpR=m.roster.find(r=>r.id===mvp);
  const lv0=level(PR.xp),rk0=rankOf(PR.rp);const tk=m.tk||{};let tkB=null,tkV=1;for(const id in tk)if(tk[id]>tkV){tkV=tk[id];tkB=id}const tkR=m.roster.find(r=>r.id===tkB),myT2=tk[ME.id]||0,iMaster=tkB===ME.id;
  const xp=40+(win?60:0)+(g[ME.id]||0)*25+myT2*10+(iMaster?50:0);if(iMaster)PR.tkm=(PR.tkm||0)+1;PR.xp+=xp;PR.games++;if(win){PR.wins++;PR.rp+=25}else PR.rp=Math.max(0,PR.rp-10);
  const roll=Math.random()+(win?.08:0),rar=roll>.985?3:roll>.88?2:roll>.6?1:0,sid=SIDS[Math.random()*SIDS.length|0],isNew=rar>(PR.cards[sid]||0);if(isNew)PR.cards[sid]=rar;else PR.xp+=40;saveP();
  const lv1=level(PR.xp),rk1=rankOf(PR.rp);
  if(!sfx(win?'win':'lose',.7))[523,659,784].forEach((f,i)=>setTimeout(()=>tone(win?f:f/2,.2,'square',.1),i*150));
  scr('end');const e=$('#end');e.innerHTML=`<div class="logo">TAGSHIM <b>NIGHT</b></div><p class="res" style="color:${win?'#b6ff3b':'#ff3d8b'}">${win?T('win'):T('lose')}</p>
   <div class="sb" style="margin:6px 0 10px"><span class="a">${m.s[0]}</span><span class="tm">:</span><span class="b">${m.s[1]}</span></div>
   ${mvpR?`<p class="st">⭐ ${T('mvp')}: <b style="color:#fff">${esc(mvpR.bot?T('S')[mvpR.star][0]:mvpR.name)}</b> · ⚽ ${mv}</p>`:''}
   ${tkR?`<p class="st" style="color:#ffb020">🦵 ${T('tkMaster')}: <b style="color:#fff">${esc(tkR.bot?T('S')[tkR.star][0]:tkR.name)}</b> · ${tkV}${iMaster?' · +50 XP 🏅':''}</p>`:''}${myT2&&!iMaster?`<p class="st">🦵 ${T('tkLine')}: ${myT2}</p>`:''}
   <p class="st">+${xp} XP${lv1>lv0?' · 🎉 '+T('levelUp')+' '+lv1:''}${rk1!==rk0?' · 🏆 '+T('rankUp')+' '+T('RK')[rk1]:''}</p>
   <div class="pack" id="pk"><div class="in"><div class="f">🃏<br>${T('pack')}</div><div class="bk"><canvas width="300" height="345"></canvas><b style="margin-top:6px">${esc(T('S')[sid][0])} · <span style="color:${RCOL[rar]}">${T('R')[rar]}</span></b><span class="st">${isNew?T('newCard'):T('dupCard')}</span></div></div></div>
   <div class="col">${lastClip?`<button class="btn pk" id="bSh">${T('share')}</button>`:''}${isHost&&!solo?`<button class="btn" id="bAg">${T('again')}</button>`:solo?`<button class="btn" id="bAg">${T('again')}</button>`:`<p class="st">${T('waitHost')}</p>`}<button class="btn gh" id="bMn">${T('menu')}</button></div>`;
  portrait($('#pk canvas'),sid,rar,myT);$('#pk').onclick=()=>{if(!$('#pk').classList.contains('open')){$('#pk').classList.add('open');if(!sfx(rar>=2?'medal':'buy',.7))tone(1000,.2,'square',.1);if(rar>=2)burstDom()}};
  if(lastClip)$('#bSh').onclick=async()=>{const ext=lastClip.type.includes('mp4')?'mp4':'webm',file=new File([lastClip],'street-stars-goal.'+ext,{type:lastClip.type});try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:T('invMsg')+' '+location.origin+location.pathname})}else{const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=file.name;a.click()}}catch(err){}};
  const ag=$('#bAg');if(ag)ag.onclick=()=>{if(solo){G=null;showLobby()}else{G=null;phase='lobby';broadcastLobby(1);showLobby()}};$('#bMn').onclick=()=>{leave();showMenu()}}
function burstDom(){const c=$('#pk');c.animate([{filter:'brightness(2.2)'},{filter:'brightness(1)'}],{duration:700})}
function showColl(){phase='coll';scr('coll');const el=$('#coll');el.innerHTML=`${langBtn()}<div class="logo">TAGSHIM <b>NIGHT</b></div><h1 style="font-size:clamp(28px,6vw,44px)">${T('collT')}</h1><p class="sub">${T('collS')}</p>${profHtml()}<div class="col"><div class="stars" id="cG"></div><button class="btn gh" id="bBk">${T('back')}</button></div>`;
  bindLang(showColl);const cg=$('#cG');for(const s of SIDS){const rar=PR.cards[s]||0,d=document.createElement('div');d.className='card';const c=document.createElement('canvas');c.width=180;c.height=207;portrait(c,s,rar,0);d.appendChild(c);d.insertAdjacentHTML('beforeend',`<span class="rb" style="background:${RCOL[rar]}">${T('R')[rar]}</span><b>${esc(T('S')[s][0])} ${esc(T('S')[s][1])}</b>⚡ ${esc(T('S')[s][2])}`);cg.appendChild(d)}$('#bBk').onclick=()=>showMenu()}
/* ================= boot ================= */
setLabels();resize();requestAnimationFrame(frame);
addEventListener('beforeunload',()=>{try{send({t:'bye'})}catch(e){}});
const rq=Q.get('room');if(rq&&/^[A-Z0-9]{4}$/i.test(rq)){if(!PR.name){PR.name='Star'+(Math.random()*90+10|0);saveP()}joinRoom(rq.toUpperCase())}else showMenu();
window.__TN={get G(){return G},get V(){return V},M,ME,startSolo,PR};
})();
