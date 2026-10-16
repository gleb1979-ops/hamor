(window.EPISODES=window.EPISODES||{}).hospital=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#0d2a3a',b:'#14445a',dot:'180,240,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const office=h.floor('hospital','office'),ward=h.floor('hospital','ward');
const nurse=(x,y,t,st,face,mv)=>E.GART.nurse(g,{x,y,a:face<0?Math.PI:0,st:st||0,k:'nurse',moving:mv!==false},t);
const plaster=(x,y,face)=>{g.save();g.translate(x-(face||1)*14,y-70);g.rotate(.5);E.rr(g,-20,-8,40,16,6);E.sh(g,'#f5c99a',2);g.fillStyle='#e2a876';g.fillRect(-6,-6,12,12);g.restore()};
const dirt=(x,y,t,n)=>{g.fillStyle='rgba(122,74,28,.9)';for(let i=0;i<(n||7);i++){const a=i*2.3+1;g.beginPath();g.ellipse(x+Math.cos(a)*24,y-40-((i*37)%100),8+(i%3)*3,6+(i%2)*3,a,0,7);g.fill()}E.drawFlies(g,x,y-160,t,4)};
const SHOT={girl:11.6,fat:12.2,tall:12.8,nerd:13.4,donkey:14.5};
const shot=(c,t)=>t>SHOT[c];
/* ---------- scene A: ward, beds, the syringe arrives ---------- */
const BEDS={girl:[225,232],fat:[475,232],tall:[895,232],nerd:[225,777],donkey:[475,777]};
function sceneA(t){g.drawImage(ward,0,0);const jump=t>4.3;
  for(const c of [...h.FR,'donkey']){const [x,y]=BEDS[c];
    if(!jump){g.save();g.translate(x+44,y-6);g.rotate(-Math.PI/2);h.hero(c,0,0,t,{stun:t<2.2});g.restore();g.fillStyle=c==='donkey'?'#d3b3ff':'#7fb3ff';E.rr(g,x-62,y-26,104,34,8);g.fill();g.strokeStyle='#2b1b30';g.lineWidth=3;g.stroke();
      if(t>3.1)h.emo('exclamation',x+40,y-120,.8*pop(t,3.1+(x%7)*.03))}
    else{const k=seg(t,4.3,4.9),base=y<500?y+110:y-70,yy=lerp(y,base,k)-Math.sin(k*Math.PI)*140;h.hero(c,x+40+k*60,yy,t,{mv:t>4.9,face:-1})}}
  const [nx,ny,mv,f]=path(t,[[0,1300,520,-1],[2.6,760,520,-1],[5.5,700,520,-1]]);nurse(nx,ny,t,t>2.8?1:0,f,mv);
  if(t>2.6&&t<4.4){g.save();g.translate(nx-40,ny-150);const k=pop(t,2.6);g.scale(k,k);g.rotate(-.3);E.rr(g,-14,-110,28,110,6);E.sh(g,'#e9f7ff',4);g.fillStyle='rgba(120,230,90,.85)';g.fillRect(-10,-80,20,72);g.fillStyle='#9aa4b0';g.fillRect(-4,-150,8,40);g.restore()}
  if(t>2.9)h.say(TXT.shot,nx,ny-330,t,2.9,46,'#fff','#e8412c');
  if(t>4.4)h.say(TXT.aaa,500,420,t,4.4,64,'#ffc531','#e8412c',-.08)}
/* ---------- scene B/C: office chase + injections ---------- */
const KB={girl:[[5.5,420,700],[7,860,690],[8.6,1080,520],[10.2,760,470],[11,560,640]],
  fat:[[5.5,330,610],[8.5,800,580],[9.7,800,580],[11,960,700]],
  tall:[[5.5,470,520],[7.4,1000,780],[9,1160,650],[11,1110,520]],
  nerd:[[5.5,380,800],[6.95,700,790],[8.3,700,790],[10.2,1000,800],[11,1010,800]],
  donkey:[[5.5,300,700],[7.8,620,660],[9.4,300,500]]};
const CART=t=>[-140+(t-7.9)*1150,560];
function heroB(c,t){const [x,y,mv,f]=path(t,KB[c]);return [x,y,mv&&!stunB(c,t),f]}
function stunB(c,t){return (c==='fat'&&t>8.5&&t<9.7)||(c==='nerd'&&t>6.95&&t<8.3)}
const NB=[[5.5,180,600],[7,520,660],[8.8,860,620],[10.3,680,560],[11,620,620],[11.55,600,650],[12.15,920,700],[12.75,1060,540],[13.35,960,800],[14,420,520],[14.4,330,520],[15,330,520]];
function hop(c,t){const a=SHOT[c];return t>a&&t<a+.6?Math.sin(seg(t,a,a+.6)*Math.PI)*70:0}
function sceneB(t){g.drawImage(office,0,0);
  if(t>6.3&&t<7.0){const k=seg(t,6.3,7);g.fillStyle=`rgba(232,65,44,${.3+k*.3})`;g.beginPath();g.ellipse(700,790,64,26,0,0,7);g.fill();g.strokeStyle='rgba(232,65,44,.9)';g.lineWidth=4;g.beginPath();g.ellipse(700,790,64*(1-k*.6),26*(1-k*.6),0,0,7);g.stroke()}
  if(t>7&&t<9)for(let i=0;i<8;i++){const a=i*.8;g.fillStyle='rgba(200,240,255,.9)';g.beginPath();g.moveTo(700+Math.cos(a)*50,790+Math.sin(a)*18);g.lineTo(706+Math.cos(a)*58,792+Math.sin(a)*22);g.lineTo(696+Math.cos(a)*44,796+Math.sin(a)*16);g.fill()}
  for(const c of [...h.FR,'donkey']){if(c==='donkey'&&t>9.4&&t<14.1)continue;
    let [x,y,mv,f]=heroB(c,t);if(c==='donkey'&&t>=14.1){const k=seg(t,14.1,14.5);x=lerp(300,380,k);y=lerp(500,560,k)}
    const sy=y-hop(c,t);h.add(y,()=>{h.hero(c,x,sy,t,{mv,face:t>11?(x<750?1:-1):f,stun:stunB(c,t)||(c==='donkey'&&t>14.5)});if(shot(c,t))plaster(x,sy,t>11?(x<750?1:-1):f)})}
  if(t>9.4&&t<14.1){const sh=t>13.8?Math.sin(t*60)*4:0;h.ears(300+sh,450,1,t)}
  const [nx,ny,mv,nf]=path(t,NB);h.add(ny,()=>nurse(nx,ny,t,1,nf,mv));
  if(t>7.9&&t<9.6){const [cx,cy]=CART(t);h.add(cy,()=>E.drawCart(g,cx,cy,t))}
  h.flush();
  if(t>6.3&&t<7){const k=seg(t,6.3,7);E.drawJar(g,700,790-430*(1-k)*(1-k),1.2)}
  if(t>7&&t<8.2){h.say(TXT.bam,700,560,t,7,44,'#ffc531','#e8412c');h.emo('stars',700,660,.7*pop(t,7))}
  if(t>8.5&&t<9.7){h.say(TXT.bam,800,350,t,8.5,44,'#ffc531','#e8412c',.1);h.emo('stars',800,450,.7*pop(t,8.5))}
  if(t>9.4&&t<11)h.say(TXT.hide,330,350,t,9.6,34,'#fff','#7b3fe4');
  for(const c of h.FR)if(t>SHOT[c]&&t<SHOT[c]+1.1){const [x,y]=heroB(c,t);h.say(TXT.ai,x,y-270,t,SHOT[c],42,'#fff','#e8412c')}
  if(t>13.8&&t<14.5)h.say(TXT.found,330,330,t,13.8,36,'#fff','#e8412c');
  if(t>14.5)h.say(TXT.aai,420,300,t,14.5,60,'#ffc531','#e8412c',-.1)}
/* ---------- scene D/E: ward, bedpans, the slip ---------- */
const PUD=[960,560];
function sceneD(t){g.drawImage(ward,0,0);E.drawPuddle(g,[0,3,PUD[0],PUD[1],100],t);
  if(t>20)E.drawPuddle(g,[0,4,PUD[0]+120,PUD[1]+40,100],t);
  const G1=path(t,[[15,330,330],[18.4,1290,480],[19.5,1290,480],[23,1100,560]]),fl=t>18.4;
  h.add(G1[1],()=>{h.hero('girl',G1[0],G1[1],t,{mv:G1[2],face:G1[3]});plaster(G1[0],G1[1],G1[3]);if(!fl)E.drawPan(g,G1[0]+G1[3]*36,G1[1]-64,1.05,1,t)});
  const F1=path(t,[[15,460,320],[19,740,420],[23,760,430]]);h.add(F1[1],()=>{h.hero('fat',F1[0],F1[1],t,{mv:F1[2]&&t<19,face:F1[3]});plaster(F1[0],F1[1],F1[3]);if(t<19)E.drawPan(g,F1[0]+F1[3]*40,F1[1]-70,1.05,1,t)});
  const T1p=[1180,760],N1=[1060,770];h.add(T1p[1],()=>{h.hero('tall',T1p[0],T1p[1],t,{face:-1});plaster(T1p[0],T1p[1],-1)});h.add(N1[1],()=>{h.hero('nerd',N1[0],N1[1],t,{face:1});plaster(N1[0],N1[1],1)});
  // donkey runs, slips at 19
  let D=path(t,[[15,300,700],[17.3,700,640],[19,PUD[0]-20,PUD[1]]]),drot=0,dy=0;if(t>17.7&&t<19){D=[D[0]+Math.sin(t*9)*28,D[1]+Math.cos(t*7)*22,D[2],D[3]];drot=Math.sin(t*10)*.18}
  if(t>19){const k=seg(t,19,19.8);D=[lerp(PUD[0]-20,PUD[0]+110,k),PUD[1]+40*k,false,1];drot=k*2.6;dy=-Math.sin(k*Math.PI)*120}
  h.add(D[1],()=>{g.save();g.translate(D[0],D[1]+dy);g.rotate(t>19?Math.min(drot,1.57):drot);h.hero('donkey',0,0,t,{mv:D[2],face:D[3],stun:t>19.8});g.restore();if(shot('donkey',t)&&t<19)plaster(D[0],D[1],D[3]);if(t>19.8)dirt(D[0],D[1]+20,t,6);if(t<19)E.drawPan(g,D[0]+36,D[1]-64,1.05,1,t)});
  const GP=[lerp(420,1150,seg(t,15,21)),650];h.add(GP[1],()=>E.GART.grandpa(g,{x:GP[0],y:GP[1],a:0,st:0},t));
  // nurse watching, then pan lands on her head
  const NP=[1240,640];h.add(NP[1],()=>{nurse(NP[0],NP[1],t,t>20.1?2:0,-1,false);if(t>20.1){dirt(NP[0],NP[1],t,5);g.save();g.translate(NP[0],NP[1]-182);g.rotate(Math.PI);E.drawPan(g,0,0,1.3,0,t);g.restore()}});
  h.flush();
  if(t>17.4&&t<21){const a=1-seg(t,19.6,21),cx=640,cy=610;g.save();g.globalAlpha=a*.75;for(let i=0;i<7;i++){const an=i*.9+t*.8,r=40+(i%3)*18,k=Math.min(1,(t-17.4)*3);g.fillStyle=i%2?'#a8d86a':'#c6e88a';g.beginPath();g.arc(cx+Math.cos(an)*r*1.4*k,cy-30+Math.sin(an)*r*.6*k,(34+(i%2)*10)*k,0,7);g.fill()}g.restore()}
  if(t>17.4&&t<18.8)h.say(TXT.fart,700,420,t,17.4,46,'#c6e88a','#3d6b1a',-.1);
  if(t>17.7&&t<19){for(let i=0;i<4;i++){const a=t*7+i*1.57;E.star(g,D[0]+Math.cos(a)*32,D[1]-215+Math.sin(a)*10,9);g.fillStyle='#ffe14d';g.fill()}h.emo('swirl',D[0]+40,D[1]-240,.6*pop(t,17.7))}
  if(t>19&&t<20.1){const k=seg(t,19,20.1),x=lerp(PUD[0]+30,NP[0],k),y=lerp(PUD[1]-70,NP[1]-190,k)-Math.sin(k*Math.PI)*380;g.save();g.translate(x,y);g.rotate(k*9);E.drawPan(g,0,0,1.3,1,t);g.restore()}
  if(t>18.4&&t<19.6)h.say(TXT.flush,1290,250,t,18.4,40,'#fff','#2f7bff');
  if(t>19&&t<20.4)h.say(TXT.slip,PUD[0],PUD[1]-260,t,19,52,'#fff','#2f7bff',-.1);
  if(t>20.1&&t<22.2)h.say(TXT.fuu,NP[0]-60,NP[1]-330,t,20.1,52,'#ffc531','#7a4a1c',.08);
  if(t>20.4)for(const [c,p] of [['girl',G1],['fat',F1],['tall',T1p],['nerd',N1]])h.emo('laugh',p[0],p[1]-280,.7*pop(t,20.4+c.length*.05));
  if(t>21.3)h.say(TXT.sorry,PUD[0]+120,PUD[1]-200,t,21.3,30,'#fff','#e8412c')}
/* ---------- scene F: discharged, bicycles ---------- */
function bike(x,y,t,c,col,dirty){g.save();g.translate(x,y);const wob=Math.sin(t*5+x*.01)*.04;g.rotate(wob);
  const wheel=wx=>{g.beginPath();g.arc(wx,0,34,0,7);g.lineWidth=7;g.strokeStyle='#2b1b30';g.stroke();g.lineWidth=2;g.strokeStyle='#9aa4b0';for(let i=0;i<4;i++){const a=t*10+i*.785;g.beginPath();g.moveTo(wx+Math.cos(a)*30,Math.sin(a)*30);g.lineTo(wx-Math.cos(a)*30,-Math.sin(a)*30);g.stroke()}};
  wheel(-52);wheel(52);g.strokeStyle=col;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(-52,0);g.lineTo(-10,-46);g.lineTo(34,-46);g.lineTo(52,0);g.moveTo(-10,-46);g.lineTo(4,0);g.lineTo(-52,0);g.moveTo(34,-46);g.lineTo(40,-70);g.stroke();
  g.strokeStyle='#2b1b30';g.lineWidth=6;g.beginPath();g.moveTo(30,-74);g.lineTo(52,-70);g.stroke();
  h.hero(c,-6,-34,t,{mv:true,face:1});plaster(-6,-34,1);if(dirty)dirt(-6,-34,t,6);
  g.fillStyle='#2b1b30';E.rr(g,-24,-56,30,10,5);g.fill();g.restore()}
function sceneF(t){h.scr();const sky=g.createLinearGradient(0,300,0,1640);sky.addColorStop(0,'#8fd3ff');sky.addColorStop(1,'#d8f2ff');g.fillStyle=sky;g.fillRect(0,300,1080,1340);
  g.fillStyle='#ffe066';g.beginPath();g.arc(900,420,60,0,7);g.fill();
  g.fillStyle='#f4f7fb';g.fillRect(140,560,560,560);g.strokeStyle='#2b1b30';g.lineWidth=5;g.strokeRect(140,560,560,560);g.fillStyle='#e8412c';g.fillRect(400,590,40,110);g.fillRect(365,625,110,40);
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){if(r===2&&c>0&&c<3)continue;g.fillStyle='#7fc8f0';g.fillRect(180+c*130,730+r*120,80,70);g.strokeRect(180+c*130,730+r*120,80,70)}
  g.fillStyle='#4f8cff';g.fillRect(350,980,140,140);g.strokeRect(350,980,140,140);h.text('🏥',420,935,60,'#fff');
  g.fillStyle='#6fc36f';g.fillRect(0,1120,1080,120);g.fillStyle='#5a5a66';g.fillRect(0,1240,1080,330);g.strokeStyle='#fff';g.lineWidth=8;g.setLineDash([50,40]);g.beginPath();g.moveTo(-((t*400)%90),1360);g.lineTo(1080,1360);g.stroke();g.setLineDash([]);
  g.fillStyle='#6fc36f';g.fillRect(0,1570,1080,70);
  g.save();g.translate(420,1120);g.scale(.9,.9);nurse(0,0,t,0,1,false);g.restore();
  const wave=Math.sin(t*8)*.4;h.emo('heart',470,860,.6*pop(t,T4+.6));
  const riders=[['girl',0,'#ff6fae'],['fat',1,'#4f8cff'],['tall',2,'#3fbf6f'],['nerd',3,'#ff9f2e'],['donkey',4.3,'#b07a45']];
  g.save();g.translate(0,0);
  for(const [c,i,col] of riders){const x=lerp(-200-i*230,1500-i*230,seg(t,T4,T5)*.95+.05),y=1380+(i%2)*90;g.save();g.translate(x,y);g.scale(1.5,1.5);bike(0,0,t,c,col,c==='donkey');g.restore()}
  {const x=lerp(-700,1150,seg(t,T4,T5)),y=1560;g.save();g.translate(x,y);g.scale(1.4,1.4);for(let i=0;i<4;i++){const k=((t*2+i/4)%1);g.fillStyle=`rgba(168,216,106,${.6*(1-k)})`;g.beginPath();g.arc(-110-k*120,-40-k*20,18+k*30,0,7);g.fill()}E.GART.grandpa(g,{x:0,y:0,a:0,st:0},t);g.restore();if(t>T4+1)h.say(TXT.gpa,h.cl(x+40,170,910),1290,t,T4+1,30,'#fff','#3d6b1a')}
  g.restore();
  h.say(TXT.bye,540,470,t,T4+.3,70,'#ffc531','#2e7d32',-.05);
  if(t>T4+1.5)h.say(TXT.wait,540,1610,t,T4+1.5,30,'#fff','#e8412c')}
let cs=null;
function scenes(t){h.clip();
  const S=1.75,cx=x=>h.cl(x,320,1180),cy=y=>h.cl(y,420,500);
  if(t<T1){h.cam(cx(t<2.6?lerp(560,820,seg(t,0,2.6)):lerp(820,600,seg(t,3.6,4.6))),cy(500),S);sceneA(t)}
  else if(t<15){let x=0,y=0;const L=['girl','fat','tall','nerd'];if(t<11){for(const c of L){const p=heroB(c,t);x+=p[0];y+=p[1]}x/=4;y/=4}else{const p=path(t,NB);x=p[0];y=p[1]}
    cs=cs&&t-cs.t<.2?{x:lerp(cs.x,x,.12),y:lerp(cs.y,y,.12),t}:{x,y,t};h.cam(cx(cs.x),cy(cs.y-60),S);sceneB(t)}
  else if(t<T4){const x=t<17?lerp(500,800,seg(t,15,17)):t<19?lerp(800,1000,seg(t,17,19)):lerp(1000,1080,seg(t,19,20.1));h.cam(cx(x),cy(560),S);sceneD(t)}
  else sceneF(t);
  g.restore();
  if(t>T1&&t<15){const n=h.FR.concat('donkey').filter(c=>shot(c,t)).length;h.counter(t,[{label:'💉 '+n+'/5'}])}
  else if(t>15&&t<T4)h.counter(t,[{label:'🚽 '+(t>18.4?1:0)},{label:'💩 '+(t>20.1?1:0)}]);
  h.next(t)}
function icon(t){g.save();g.scale(2.2,2.2);nurse(0,90,t,1,1,false);g.restore();g.save();g.translate(150,40);g.scale(2.2,2.2);E.drawPan(g,0,0,1,1,t);g.restore()}
const caps=[[.3,5.4,'c1'],[5.6,10.9,'c2'],[11.1,14.9,'c3'],[15.1,18.9,'c4'],[19.1,22.9,'c5'],[23.1,26.4,'c6']];
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,caps,icon,[T1,15,T4,T5])}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).hospital={
 ru:{c1:'Утро в больнице… А вот и медсестра! 💉',c2:'Все врассыпную! Банки падают, каталки едут!',c3:'Укол нашёл всех… даже Ослика под диваном!',c4:'Несём утки в туалет… а тут дед на каталке! 💨',c5:'Мокрый пол… ШЛЁП! Утка прилетела медсестре на голову 💩',c6:'Всех выписали! Домой — на велосипедах! 🚲',
  shot:'УКОЛЬЧИК!',aaa:'АААА!',bam:'БАМ!',hide:'меня тут нет…',ai:'АЙ!',found:'ВОТ ТЫ ГДЕ!',aai:'АААЙ!!!',flush:'+1 🚽',slip:'ШЛЁП!',fuu:'ФУУУ!',sorry:'Я НЕ СПЕЦИАЛЬНО!',bye:'ВЫПИСАНЫ!',fart:'💨 ПУУУК!',gpa:'Подождите деда!',wait:'А Ослика помыть забыли! 🪰',
  next:'Продолжение следует… 🚲',tag:'🏥 Серия 16 · Весёлая больница',title:'Весёлая больница',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Morning in the hospital… here comes the nurse! 💉',c2:'Run! Jars are falling, trolleys are rolling!',c3:'The syringe found everyone… even the Donkey under the couch!',c4:'Carrying bedpans… and here comes grandpa on a gurney! 💨',c5:'Wet floor… SPLAT! The bedpan landed on the nurse’s head 💩',c6:'Everyone is discharged! Home — by bicycle! 🚲',
  shot:'A LITTLE SHOT!',aaa:'AAAAH!',bam:'BAM!',hide:'I’m not here…',ai:'OUCH!',found:'GOT YOU!',aai:'OOOUCH!!!',flush:'+1 🚽',slip:'SPLAT!',fuu:'EWWW!',sorry:'IT WAS AN ACCIDENT!',bye:'DISCHARGED!',fart:'💨 PFFFT!',gpa:'Wait for grandpa!',wait:'They forgot to wash the Donkey! 🪰',
  next:'To be continued… 🚲',tag:'🏥 Episode 16 · Crazy Hospital',title:'Crazy Hospital',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'בוקר בבית החולים… והנה האחות! 💉',c2:'כולם בורחים! צנצנות נופלות, עגלות נוסעות!',c3:'הזריקה מצאה את כולם… אפילו את החמור מתחת לספה!',c4:'סוחבים סירים… והנה סבא על עגלה! 💨',c5:'רצפה רטובה… פלאץ׳! הסיר נחת לאחות על הראש 💩',c6:'כולם השתחררו! הביתה — באופניים! 🚲',
  shot:'זריקונת!',aaa:'אאאא!',bam:'בום!',hide:'אני לא פה…',ai:'איי!',found:'הנה אתה!',aai:'אאאיי!!!',flush:'+1 🚽',slip:'פלאץ׳!',fuu:'איכס!',sorry:'זה לא בכוונה!',bye:'השתחררנו!',fart:'💨 פּוּוּק!',gpa:'חכו לסבא!',wait:'שכחו לרחוץ את החמור! 🪰',
  next:'המשך יבוא… 🚲',tag:'🏥 פרק 16 · בית החולים המטורף',title:'בית החולים המטורף',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
