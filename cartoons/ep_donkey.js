/* Episode 1: Who's the Donkey? (vertical 1080x1920) */
(window.EPISODES=window.EPISODES||{}).donkey=function(E,TXT,cv){
const W=1080,H=1920,BS=cv.width/W,g=cv.getContext('2d');
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a),0,1),ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,lerp=(a,b,k)=>a+(b-a)*k;
const back=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function rnd(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)}
const FONT='Rubik, "Noto Color Emoji", Arial Black, sans-serif';
const T1=5.5,T2=10.5,T3=18,T4=22.5,T5=26.5,TEND=30;
const FR=['girl','fat','tall','nerd'];
// interior map
E.setLoc('diner');const map=document.createElement('canvas');map.width=E.AW;map.height=E.AH;E.paintDiner(map.getContext('2d'));
function scr(){g.setTransform(BS,0,0,BS,0,0)}
function cam(cx,cy,s){g.setTransform(s*BS,0,0,s*BS,(W/2-cx*s)*BS,(970-cy*s)*BS)}
function sk(k){g.setTransform(k*BS,0,0,k*BS,0,0)}
function hero(c,x,y,t,o){o=o||{};E.drawHero(g,{id:'ep_'+c,c,x,y,face:o.face||1,moving:!!o.mv,stun:o.stun?1:0,hat:o.hat||null,score:1},t)}
function emo(k,x,y,s){const im=E.FXI['e_'+k];if(!im||s<=0)return;const w=im.width*s,h=im.height*s;g.drawImage(im,x-w/2,y-h/2,w,h)}
function wrap(s,max){const out=[];for(const para of s.split('\n')){const w=para.split(' ');let cur='';for(const word of w){const tt=cur?cur+' '+word:word;if(g.measureText(tt).width>max&&cur){out.push(cur);cur=word}else cur=tt}out.push(cur)}return out}
function text(s,x,y,size,col,opt){opt=opt||{};g.save();g.font=`${opt.w||900} ${size}px ${FONT}`;g.textAlign='center';g.textBaseline='middle';const lines=wrap(s,opt.max||960),lh=size*1.18;let y0=y-(lines.length-1)*lh/2;
  for(const l of lines){g.lineJoin='round';g.lineWidth=size*.22;g.strokeStyle=opt.sc||'#2b1b30';g.strokeText(l,x,y0);g.fillStyle=col;g.fillText(l,x,y0);y0+=lh}g.restore()}
function pop(t,a){const k=seg(t,a,a+.35);return k<=0?0:back(k)}
function bands(t){scr();const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#2a1414');gr.addColorStop(.5,'#3a1d16');gr.addColorStop(1,'#2a1414');g.fillStyle=gr;g.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const x=rnd(i)*W,y=rnd(i+99)*H,a=.15+.3*Math.abs(Math.sin(t*1.7+i));g.fillStyle=`rgba(255,200,80,${a})`;g.beginPath();g.arc(x,y,2+rnd(i+7)*2,0,7);g.fill()}}
function caption(t,a,b,s){if(t<a||t>b)return;const k=pop(t,a),out=seg(t,b-.25,b);g.save();scr();g.globalAlpha=1-out;g.translate(W/2,150);g.scale(k*(1-out*.3),k*(1-out*.3));text(s,0,0,72,'#ffe066',{max:1000});g.restore()}
function clipScene(){scr();g.save();g.beginPath();g.rect(0,300,W,1340);g.clip()}
// ---------- street with diner facade (screen coords)
function street(t,zoom){clipScene();const z=zoom||1;g.save();g.translate(W/2,1640);g.scale(z,z);g.translate(-W/2,-1640);
  const sky=g.createLinearGradient(0,300,0,1100);sky.addColorStop(0,'#6fc7ff');sky.addColorStop(1,'#cdeeff');g.fillStyle=sky;g.fillRect(-400,0,W+800,1100);
  g.fillStyle='#fff';for(const [x,y] of [[140,420],[520,380],[900,450]]){const dx=(t*12)%60;g.beginPath();g.ellipse(x+dx,y,70,22,0,0,7);g.ellipse(x+40+dx,y-14,46,22,0,0,7);g.fill()}
  // building
  g.fillStyle='#e8d2b0';g.fillRect(120,640,840,560);g.fillStyle='#c9ab82';for(let y=660;y<1200;y+=40)g.fillRect(120,y,840,3);
  // awning
  for(let i=0;i<12;i++){g.fillStyle=i%2?'#ffffff':'#e8412c';g.beginPath();g.moveTo(100+i*73.3,820);g.lineTo(173+i*73.3,820);g.lineTo(173+i*73.3,880);g.quadraticCurveTo(136+i*73.3,905,100+i*73.3,880);g.closePath();g.fill()}
  g.strokeStyle='#2b1b30';g.lineWidth=4;g.strokeRect(100,820,880,60);
  // sign
  const glow=.6+.4*Math.sin(t*4);g.fillStyle='#1b1220';g.beginPath();g.roundRect(250,560,580,150,30);g.fill();g.strokeStyle=`rgba(255,197,49,${glow})`;g.lineWidth=8;g.stroke();
  g.drawImage(E.burgerSprite,270,585,100,100);g.drawImage(E.burgerSprite,710,585,100,100);text('BURGERS',540,636,68,'#ffc531',{sc:'#e8412c'});
  // windows + door
  for(const x of [170,690]){g.fillStyle='#9ad8f5';g.fillRect(x,920,220,180);g.strokeStyle='#5a3a22';g.lineWidth=10;g.strokeRect(x,920,220,180);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(x+20,935,30,150)}
  g.fillStyle='#7a4a24';g.fillRect(450,920,180,280);g.strokeStyle='#4a2a14';g.lineWidth=8;g.strokeRect(450,920,180,280);g.fillStyle='#ffc531';g.beginPath();g.arc(605,1060,10,0,7);g.fill();
  // sidewalk
  g.fillStyle='#b9b2aa';g.fillRect(-400,1200,W+800,450);g.fillStyle='#a49d95';for(let x=-400;x<W+400;x+=120)g.fillRect(x,1200,4,450);
  g.restore()}
function carrot(x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);g.beginPath();g.moveTo(-26,-60);g.quadraticCurveTo(0,-74,26,-60);g.lineTo(4,70);g.quadraticCurveTo(0,78,-4,70);g.closePath();g.fillStyle='#ff8a1e';g.fill();g.lineWidth=4;g.strokeStyle='#2b1b30';g.stroke();
  g.strokeStyle='#d96a0a';g.lineWidth=3;for(const yy of [-30,0,30]){g.beginPath();g.moveTo(-14,yy);g.lineTo(-2,yy+4);g.stroke()}
  g.fillStyle='#3fa34d';for(const a of [-.5,0,.5]){g.save();g.translate(0,-66);g.rotate(a);g.beginPath();g.ellipse(0,-26,9,28,0,0,7);g.fill();g.stroke();g.restore()}g.restore()}
function ears(x,y,k,t){// donkey ears popping on a head at (x,y)
  for(const [ex,a] of [[-14,-.3],[14,.3]]){g.save();g.translate(x+ex,y);g.rotate(a+Math.sin(t*6+ex)*.06);g.scale(k,k);g.beginPath();g.ellipse(0,-34,13,36,0,0,7);g.fillStyle='#b07a45';g.fill();g.lineWidth=4;g.strokeStyle='#2b1b30';g.stroke();g.beginPath();g.ellipse(0,-34,6,24,0,0,7);g.fillStyle='#f0b8a8';g.fill();g.restore()}}
function coupon(x,y,s,t,bite){g.save();g.translate(x,y);g.rotate(Math.sin(t*3)*.08);g.scale(s,s);const gr=g.createLinearGradient(-110,-60,110,60);gr.addColorStop(0,'#ffe066');gr.addColorStop(.5,'#ffc531');gr.addColorStop(1,'#e0a812');
  g.beginPath();g.moveTo(-110,-60);g.lineTo(110,-60);g.lineTo(110,60);if(bite){g.lineTo(-70,60);g.arc(-90,60,20,0,Math.PI,true)}g.lineTo(-110,60);g.closePath();g.fillStyle=gr;g.fill();g.lineWidth=6;g.strokeStyle='#8a5a10';g.stroke();
  g.setLineDash([10,8]);g.strokeStyle='#b07f0a';g.lineWidth=3;g.strokeRect(-96,-46,192,92);g.setLineDash([]);g.drawImage(E.burgerSprite,-98,-40,80,80);text('FREE',38,0,52,'#ffffff',{sc:'#8a5a10'});
  for(let i=0;i<4;i++){const a=t*4+i*1.6;g.fillStyle='#fff';E.star(g,Math.cos(a)*140,Math.sin(a)*80,8);g.fill()}g.restore()}
// ---------- scenes
const K=2.3;function H2(c,x,y,t,o){sk(K);hero(c,x/K,y/K,t,o);scr()}
const HT=c=>E.headTop(c,null)*K;// negative px from feet to head top
function s1(t){street(t);
  FR.forEach((c,i)=>{const p=ease(seg(t,.3,4.2)),x=lerp(-160-i*220,130+i*215,p),y=1610-(i%2)*30;H2(c,x,y,t+i*.3,{mv:t>.3&&t<4.2})});
  if(t>3.6)emo('drops',345+40,1580+HT('fat')-40,2.8*pop(t,3.6));
  if(t>4.2){const k=pop(t,4.2);g.save();g.translate(345,1580+HT('fat')-120);g.scale(k,k);g.rotate(-.1);text(TXT.grr,0,0,52,'#ffffff',{sc:'#e8412c'});g.restore()}
  g.restore()}
function s2(t){street(t,1.25);
  const dk=ease(seg(t,T1+.3,T1+1.5));H2('donkey',lerp(540,560,dk),1500,t,{mv:t<T1+1.5});
  FR.forEach((c,i)=>H2(c,[110,300,790,975][i],1630-(i%2)*30,t+i*.4,{face:i<2?1:-1}));
  if(t>T1+1.6){const k=pop(t,T1+1.6);g.save();g.translate(300,1050);g.scale(k,k);g.fillStyle='#6b4a2f';g.fillRect(-8,0,16,150);g.fillStyle='#f6ecd2';g.beginPath();g.roundRect(-150,-110,300,130,18);g.fill();g.lineWidth=6;g.strokeStyle='#6b4a2f';g.stroke();
    g.drawImage(E.burgerSprite,-140,-100,100,100);text('=',0,-46,70,'#2b1b30',{sc:'#f6ecd2'});carrot(90,-46,.6,.4);g.restore()}
  if(t>T1+2.4)emo('laugh',640,1500+HT('donkey')-50,3*pop(t,T1+2.4));
  g.restore()}
const CX=560,CY=1180,TGT=[[CX-250,1560],[CX-80,1610],[CX+90,1560],[CX+250,1610]];
function s3(t){street(t,1.1);
  const rise=pop(t,T2+.2);carrot(CX,CY-60*rise,1.5*rise,Math.sin(t*3)*.06);
  const order={girl:13.0,tall:13.15,nerd:13.35,fat:14.1};const start=[[90,1630],[300,1660],[800,1660],[1000,1630]];
  FR.forEach((c,i)=>{const [sx,sy]=start[i],go=order[c],k=ease(seg(t,go,go+.45)),[tx,ty]=TGT[i];const x=lerp(sx,tx,k),y=lerp(sy,ty,k)-Math.sin(k*Math.PI)*80;
    H2(c,x,y,t+i*.4,{mv:t>go&&t<go+.45,face:tx>=sx?1:-1,stun:c==='fat'&&t>14.1&&t<14.6})});
  H2('donkey',980,1330,t,{face:-1});
  for(const [n,a] of [['3',T2+.4],['2',T2+1.0],['1',T2+1.6],[TXT.go,T2+2.2]]){if(t>a&&t<a+.6){const k=pop(t,a);g.save();g.translate(W/2,760);g.scale(k*1.6,k*1.6);text(n,0,0,120,'#ffc531',{sc:'#e8412c'});g.restore()}}
  if(t>14.6){const [fx,fy]=TGT[1];const k=pop(t,14.6);ears(fx+4,fy+HT('fat')+30,k*1.7,t);
    if(t<16.6){g.save();g.translate(fx+60,fy+HT('fat')-170);g.scale(k,k);g.rotate(.08);text(TXT.ia,0,0,64,'#ffe066',{sc:'#3a1650'});g.restore()}}
  if(t>14.9){[0,2,3].forEach((i,j)=>{const c=FR[i];emo('laugh',TGT[i][0],TGT[i][1]+HT(c)-60,2.6*pop(t,14.9+j*.08))});emo('laugh',980,1330+HT('donkey')-60,2.6*pop(t,15.2))}
  g.restore()}
function s4(t){street(t,1.1);const P=[[CX-280,1590],[CX-100,1630],[CX+100,1590],[CX+280,1630]];
  FR.forEach((c,i)=>H2(c,P[i][0],P[i][1],t+i*.3,{}));ears(P[1][0]+4,P[1][1]+HT('fat')+30,1.7,t);
  H2('donkey',CX+20,1440,t,{face:-1});
  if(t<T3+2.2){const k=1-seg(t,T3+.3,T3+2.2);if(k>0)carrot(CX-110,1440+HT('donkey')+120,.8*k+.05,.6)}
  if(t>T3+.3&&t<T3+2.2){g.save();g.translate(CX+170,1440+HT('donkey')-40);text(TXT.chomp,0,0,58,'#ffffff',{sc:'#e8412c'});g.restore()}
  if(t>T3+2.2){const k=pop(t,T3+2.2);coupon(W/2,820,k*1.4,t,t>T3+3.6)}
  if(t>T3+2.6)FR.forEach((c,i)=>emo(['heart','stars','heart','exclamation'][i],P[i][0],P[i][1]+HT(c)-60,2.4*pop(t,T3+2.6+i*.07)));
  g.restore()}
function s5(t){clipScene();cam(780,560,2.0);g.drawImage(map,0,0);
  // flying burgers
  for(let i=0;i<14;i++){const ph=(t*1.3+rnd(i)*3)%1.6,x=240+rnd(i+3)*1000+Math.cos(i)*ph*200,y=200+ph*420-Math.sin(ph*2)*140;g.save();g.translate(x,y);g.rotate(t*6+i);g.drawImage(E.burgerSprite,-36,-36,72,72);g.restore()}
  FR.forEach((c,i)=>{const x=600+i*110+Math.sin(t*5+i)*40,y=650+(i%2)*60;hero(c,x,y,t*1.4+i,{mv:true,face:Math.sin(t*5+i)>0?1:-1,stun:(t*3+i)%4<.6})});
  hero('donkey',1010,600,t,{mv:true,face:-1});
  g.restore();
  scr();const k=pop(t,T4+2.2);if(t>T4+2.2){g.save();g.translate(W/2,1720);g.scale(k,k);text(TXT.next,0,0,54,'#ffe066',{w:800});g.restore()}}
function endCard(t){bands(t);const k=pop(t,T5);if(k>.01){sk(3.4*k);hero('donkey',(W/2)/(3.4*k),860/(3.4*k),t,{})}scr();
  g.save();g.translate(W/2,1000);g.scale(k,k);text(TXT.title,0,0,104,'#ffc531',{sc:'#5a2410'});g.restore();
  const k2=pop(t,T5+.4);g.save();g.translate(W/2,1150);g.scale(k2,k2);text(TXT.cta,0,0,54,'#ffffff',{w:800,max:900});g.restore();
  if(!TXT.live){const k3=pop(t,T5+.8);g.save();g.translate(W/2,1360);g.scale(k3,k3);g.fillStyle='#e8412c';g.beginPath();g.roundRect(-330,-70,660,140,70);g.fill();text(TXT.url,0,0,60,'#ffffff',{sc:'#7a1a0e'});g.restore()}}
function render(t){scr();g.clearRect(0,0,W,H);if(t<T5)bands(t);
  if(t<T1)s1(t);else if(t<T2)s2(t);else if(t<T3)s3(t);else if(t<T4)s4(t);else if(t<T5)s5(t);else endCard(t);
  caption(t,.4,T1-.1,TXT.c1);caption(t,T1+.2,T2,TXT.c2);caption(t,T2+.2,14.5,TXT.c3);caption(t,14.6,T3,TXT.c4);caption(t,T3+.2,T4,TXT.c5);caption(t,T4+.2,T5,TXT.c6);
  if(t<T5){scr();g.globalAlpha=.85;text(TXT.tag,W/2,1850,44,'#ffffff',{w:800});g.globalAlpha=1}
  for(const b of [T1,T2,T4,T5]){const d=Math.abs(t-b);if(d<.22){scr();g.fillStyle=`rgba(0,0,0,${1-d/.22})`;g.fillRect(0,0,W,H)}}
  if(t<.3){scr();g.fillStyle=`rgba(0,0,0,${1-t/.3})`;g.fillRect(0,0,W,H)}}
return {len:TEND,render,endAt:T5};
};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).donkey={
 ru:{c1:'Четверо друзей ужасно проголодались…',grr:'УРРР…',c2:'Но у дверей бургерной — Ослик: «Хотите бургер? Сначала сыграйте!»',go:'ЖМИ!',c3:'Кто схватит морковку последним — тот ОСЁЛ!',ia:'И-А-А!',c4:'Пухляш — осёл! 😂',chomp:'ХРУМ!',c5:'Ослик слопал приз… но дал золотой талон!',
  c6:'Но бургер-машина сошла с ума!',next:'Продолжение следует… 🍔',tag:'🫏 Серия 1 · Кто осёл?',title:'Кто осёл?',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Four friends are SO hungry…',grr:'GRRRL…',c2:'But the Donkey blocks the door: "Want a burger? Play first!"',go:'TAP!',c3:'Last one to grab the carrot is the DONKEY!',ia:'HEE-HAW!',c4:'Chubby is the donkey! 😂',chomp:'CHOMP!',c5:'The Donkey ate the prize… but gave a golden ticket!',
  c6:'But the burger machine went crazy!',next:'To be continued… 🍔',tag:'🫏 Episode 1 · Who\'s the Donkey?',title:'Who\'s the Donkey?',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'ארבעה חברים רעבים נורא…',grr:'גרררר…',c2:'אבל ליד הדלת מחכה החמור: "רוצים המבורגר? קודם תשחקו!"',go:'לחצו!',c3:'מי שתופס את הגזר אחרון — הוא החמור!',ia:'אִי-אָה!',c4:'השמנמן הוא החמור! 😂',chomp:'קראנץ׳!',c5:'החמור אכל את הפרס… אבל נתן כרטיס זהב!',
  c6:'אבל מכונת ההמבורגרים השתגעה!',next:'המשך יבוא… 🍔',tag:'🫏 פרק 1 · מי חמור?',title:'מי חמור?',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
