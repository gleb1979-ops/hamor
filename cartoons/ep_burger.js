/* Episode 2: Burger Rush (vertical 1080x1920) */
(window.EPISODES=window.EPISODES||{}).burger=function(E,TXT,cv){
const W=1080,H=1920,BS=cv.width/W,g=cv.getContext('2d');
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a),0,1),ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,lerp=(a,b,k)=>a+(b-a)*k;
const back=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function rnd(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)}
const FONT='Rubik, "Noto Color Emoji", Arial Black, sans-serif';
const T1=5.5,T2=11,T3=19,T4=23,T5=26.5,TEND=30;
const FR=['girl','fat','tall','nerd'];
E.setLoc('diner');const map=document.createElement('canvas');map.width=E.AW;map.height=E.AH;E.paintDiner(map.getContext('2d'));
function scr(){g.setTransform(BS,0,0,BS,0,0)}
const SC=2.0,SY=970;let CAM=[750,520,SC];
function cam(cx,cy,s){CAM=[cx,cy,s];g.setTransform(s*BS,0,0,s*BS,(W/2-cx*s)*BS,(SY-cy*s)*BS)}
function w2s(x,y){return [W/2+(x-CAM[0])*CAM[2],SY+(y-CAM[1])*CAM[2]]}
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
const BUR=E.burgerSprite;
// ---------- burger machine at world (750,250)
const MX=750,MY=372;
function machine(t,crazy){const sh=crazy?Math.sin(t*45)*5:0;g.save();g.translate(MX+sh,MY);
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,8,120,22,0,0,7);g.fill();
  E.rr(g,-110,-170,220,170,18);E.sh(g,'#c9ccd6',4);E.rr(g,-96,-156,192,70,10);E.sh(g,'#22303a',3);
  g.fillStyle=crazy?`hsl(${(t*400)%360},90%,60%)`:'#7dff8a';g.font='900 34px Rubik, Arial Black';g.textAlign='center';g.textBaseline='middle';g.fillText(crazy?'MAX!!':'🍔 OK',0,-120);
  for(let i=0;i<4;i++){g.fillStyle=crazy&&((t*8+i)|0)%2?'#ff3b30':'#ffc531';g.beginPath();g.arc(-75+i*50,-62,10,0,7);g.fill();g.lineWidth=2.5;g.strokeStyle=E.OUT;g.stroke()}
  E.rr(g,-46,-40,92,40,8);E.sh(g,'#1b1220',3);// chute
  // big red button on side
  g.beginPath();g.ellipse(132,-90,24,10,0,0,7);E.sh(g,'#7a1a12',3);g.beginPath();g.ellipse(132,-96-(crazy?0:6),22,9,0,0,7);E.sh(g,'#ff3b30',3);
  // pipe + steam
  E.rr(g,80,-215,26,50,6);E.sh(g,'#9aa0ac',3);if(crazy)for(let i=0;i<4;i++){const k=((t*1.5+i*.25)%1);g.fillStyle=`rgba(255,255,255,${.6*(1-k)})`;g.beginPath();g.arc(93+Math.sin(t*5+i)*10,-225-k*120,14+k*20,0,7);g.fill()}
  g.restore()}
// flying burgers: 16 with landing spots
const LAND=[];for(let i=0;i<16;i++){LAND.push([420+rnd(i+11)*660,470+rnd(i+31)*360,6+i*.27])}
// assignment: girl 5, tall 4, nerd 4 (1 stolen), fat 3 (eats)
const OWN={girl:[0,4,8,12,15],tall:[1,5,9,13],nerd:[2,6,10,14],fat:[3,7,11]};
const PICK={};FR.forEach(c=>OWN[c].forEach((b,j)=>PICK[b]={c,t:T2+.6+(j+1)*(7.0/(OWN[c].length+.5))+FR.indexOf(c)*.12}));
function friendPos(c,t){const i=FR.indexOf(c);const home=[[560,700],[680,740],[820,700],[940,740]][i];
  if(t<T2){const p=ease(seg(t,.2,2.6));return [home[0],lerp(980,home[1],p),t>.2&&t<2.6,1]}
  let x=home[0],y=home[1],prev=T2+.3,mv=false,face=1;
  for(const b of OWN[c]){const pt=PICK[b].t;if(t<prev)break;const k=ease(seg(t,prev,pt));const [lx,ly]=LAND[b];if(t>prev&&t<pt){mv=true;face=lx<x?-1:1}x=lerp(x,lx+20,k);y=lerp(y,ly+30,k);prev=pt+.15}
  if(t>=T3){const k=ease(seg(t,T3,T3+1));mv=t<T3+1;const gx=[560,680,820,940][i],gy=640;face=gx<x?-1:1;x=lerp(x,gx,k);y=lerp(y,gy,k)}
  return [x,y,mv,face]}
function count(c,t){let n=OWN[c].filter(b=>t>=PICK[b].t).length;if(c==='nerd'&&t>16.6)n--;if(c==='fat')n=0;return Math.max(0,n)}
function stack(x,y,n,t){for(let i=0;i<n;i++){const w=Math.sin(t*6+i)*3*i*.3;g.drawImage(BUR,x-30+w,y-30-i*22,60,60)}}
function interior(t){clipScene();
  let cx=750,cy=520;if(t<T1){cx=lerp(760,800,seg(t,0,T1));cy=lerp(560,450,seg(t,2.5,T1))}
  cam(cx,cy,SC);g.drawImage(map,0,0);
  const crazy=t>3.6&&t<T3;machine(t,crazy);
  // burgers in air / on floor
  for(let i=0;i<16;i++){const [lx,ly,st]=LAND[i];if(t<st)continue;const pk=PICK[i];if(t>=pk.t)continue;const k=seg(t,st,st+.9);const x=lerp(MX,lx,k),y=lerp(MY-20,ly,k)-Math.sin(k*Math.PI)*260;g.save();g.translate(x,y);g.rotate(k<1?t*10+i:0);g.drawImage(BUR,-32,-32,64,64);g.restore()}
  const L=[];
  FR.forEach((c,i)=>{const [x,y,mv,face]=friendPos(c,t);L.push({y,d:()=>{const pushed=c==='fat'&&t>14.2&&t<15;hero(c,x+(pushed?Math.sin((t-14.2)*20)*6:0),y,t+i*.37,{mv,face,stun:pushed});const n=count(c,t);
    if(t>T2&&n>0)stack(x,y+E.headTop(c,null)-26,n,t)}})});
  // donkey: pushes button at 3.4, wanders, steals at 16.6
  {let dx,dy,mv=false,face=1;if(t<T1){const p=ease(seg(t,.8,3.3));dx=lerp(1100,MX+170,p);dy=lerp(700,MY+20,p);mv=t>.8&&t<3.3;face=-1}
   else if(t<16.0){dx=1000+Math.sin(t)*40;dy=520;mv=true;face=-1}else{const nx=friendPos('nerd',t);const p=ease(seg(t,16.0,16.6)),q=ease(seg(t,16.8,17.8));dx=lerp(lerp(1000,nx[0]+90,p),1150,q);dy=lerp(lerp(520,nx[1],p),560,q);mv=t<17.8;face=q>0?1:-1}
   L.push({y:dy,d:()=>{hero('donkey',dx,dy,t,{mv,face});if(t>16.6&&t<T3)g.drawImage(BUR,dx-30,dy+E.headTop('donkey',null)-50,60,60)}})}
  L.sort((a,b)=>a.y-b.y).forEach(o=>o.d());
  // chomp text above fat when he picks
  for(const b of OWN.fat){const pt=PICK[b].t;if(t>pt&&t<pt+.8){const [x,y]=friendPos('fat',t);text(TXT.chomp,x,y+E.headTop('fat',null)-40,34,'#ffffff',{sc:'#e8412c'})}}
  // push gag
  if(t>14.0&&t<14.8){const [x,y]=friendPos('tall',t);emo('anger',x,y-260,1.4*pop(t,14))}
  if(t>14.2&&t<15.2){const [x,y]=friendPos('fat',t);emo('swirl',x,y-280,1.4*pop(t,14.2))}
  // button press flash
  if(t>3.3&&t<3.9){g.fillStyle=`rgba(255,80,60,${.6*(1-seg(t,3.3,3.9))})`;g.beginPath();g.arc(MX+132,MY-96,40+seg(t,3.3,3.9)*80,0,7);g.fill()}
  if(t>3.4&&t<T1){emo('laugh',MX+190,MY-200,1.4*pop(t,3.4))}
  if(t>16.6&&t<17.6){const [x,y]=friendPos('nerd',t);emo('anger',x,y-270,1.4*pop(t,16.6))}
  // celebration
  if(t>T3+1.1&&t<T4){FR.forEach((c,i)=>{const [x,y]=friendPos(c,t);if(c==='girl'){g.save();g.translate(x,y+E.headTop(c,null)-30-count(c,t)*22-20);g.scale(1.3,1.3);E.star(g,0,0,18);g.fillStyle='#ffc531';g.fill();g.lineWidth=3;g.strokeStyle=E.OUT;g.stroke();g.restore()}
    if(c==='fat')emo('faceSad',x,y-250,1.4*pop(t,T3+1.3));})}
  g.restore();
  // HUD counts
  if(t>T2&&t<T4){scr();FR.forEach((c,i)=>{const x=150+i*260,y=1720;g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.roundRect(x-110,y-44,220,88,44);g.fill();g.fillStyle=E.CH[c].col;g.beginPath();g.arc(x-70,y,18,0,7);g.fill();g.drawImage(BUR,x-38,y-28,56,56);text(String(count(c,t)),x+52,y,52,'#ffffff',{sc:'#000'})})}}
function wrapperScene(t){clipScene();const k=ease(seg(t,T4,T4+1.2));cam(lerp(750,860,k),lerp(520,600,k),lerp(SC,2.8,k));g.drawImage(map,0,0);machine(t,false);
  FR.forEach((c,i)=>{const x=[640,700,760,900][i],y=[600,560,600,660][i];hero(c,x,y,t+i*.3,{face:1})});hero('donkey',1010,600,t,{face:-1});
  // wrapper paper unfolding in nerd's hands
  const u=seg(t,T4+.6,T4+1.6);g.save();g.translate(915,560);g.rotate(-.05);const w=40+u*110,h=30+u*60;g.fillStyle='#fff6dc';g.fillRect(-w/2,-h/2,w,h);g.strokeStyle='#c9a24a';g.lineWidth=3;g.strokeRect(-w/2,-h/2,w,h);
  if(u>.9){g.font=`900 ${14}px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#d42b2b';g.fillText(TXT.test1,0,-12);g.fillText(TXT.test2,0,10)}g.restore();
  if(t>T4+1.8)FR.forEach((c,i)=>emo(i%2?'drops':'exclamation',[640,700,760,900][i],[600,560,600,660][i]-260,1.3*pop(t,T4+1.8+i*.08)));
  if(t>T4+2.1)emo('laugh',1040,330,1.3*pop(t,T4+2.1));
  g.restore();scr();if(t>T4+2.3){const k=pop(t,T4+2.3);g.save();g.translate(W/2,1720);g.scale(k,k);text(TXT.next,0,0,54,'#ffe066',{w:800});g.restore()}}
function endCard(t){bands(t);const k=pop(t,T5);scr();g.save();g.translate(W/2,760);g.scale(k*2.2,k*2.2);g.drawImage(BUR,-60,-60,120,120);g.restore();
  g.save();g.translate(W/2,1000);g.scale(k,k);text(TXT.title,0,0,104,'#ffc531',{sc:'#5a2410'});g.restore();
  const k2=pop(t,T5+.4);g.save();g.translate(W/2,1150);g.scale(k2,k2);text(TXT.cta,0,0,54,'#ffffff',{w:800,max:900});g.restore();
  if(!TXT.live){const k3=pop(t,T5+.8);g.save();g.translate(W/2,1360);g.scale(k3,k3);g.fillStyle='#e8412c';g.beginPath();g.roundRect(-330,-70,660,140,70);g.fill();text(TXT.url,0,0,60,'#ffffff',{sc:'#7a1a0e'});g.restore()}}
function render(t){scr();g.clearRect(0,0,W,H);if(t<T5)bands(t);
  if(t<T4)interior(t);else if(t<T5)wrapperScene(t);else endCard(t);
  caption(t,.3,3.3,TXT.c1);caption(t,3.4,T1+.3,TXT.c2);caption(t,T1+.4,T2,TXT.c3);caption(t,T2+.2,T3,TXT.c4);caption(t,T3+.2,T4,TXT.c5);caption(t,T4+.2,T5,TXT.c6);
  if(t<T5){scr();g.globalAlpha=.85;text(TXT.tag,W/2,1850,44,'#ffffff',{w:800});g.globalAlpha=1}
  for(const b of [T4,T5]){const d=Math.abs(t-b);if(d<.22){scr();g.fillStyle=`rgba(0,0,0,${1-d/.22})`;g.fillRect(0,0,W,H)}}
  if(t<.3){scr();g.fillStyle=`rgba(0,0,0,${1-t/.3})`;g.fillRect(0,0,W,H)}}
return {len:TEND,render,endAt:T5};
};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).burger={
 ru:{c1:'С золотым талоном — бургеры без конца!',c2:'…но Ослик нажал не ту кнопку 😈',c3:'Бургер-машина сошла с ума!',c4:'Собери больше всех! Толкаться можно!',c5:'Девочка — чемпион! А Пухляш… всё съел 😅',c6:'На обёртке: «Завтра КОНТРОЛЬНАЯ!»',chomp:'ХРУМ!',test1:'ЗАВТРА',test2:'КОНТРОЛЬНАЯ!',
  next:'Продолжение следует… 📚',tag:'🍔 Серия 2 · Бургер-гонка',title:'Бургер-гонка',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'With the golden ticket — endless burgers!',c2:'…but the Donkey pressed the wrong button 😈',c3:'The burger machine went crazy!',c4:'Grab the most! Pushing allowed!',c5:'The Girl wins! And Chubby… ate them all 😅',c6:'On the wrapper: "TEST TOMORROW!"',chomp:'CHOMP!',test1:'TEST',test2:'TOMORROW!',
  next:'To be continued… 📚',tag:'🍔 Episode 2 · Burger Rush',title:'Burger Rush',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'עם כרטיס הזהב — המבורגרים בלי סוף!',c2:'…אבל החמור לחץ על הכפתור הלא נכון 😈',c3:'מכונת ההמבורגרים השתגעה!',c4:'תאספו הכי הרבה! מותר לדחוף!',c5:'הילדה ניצחה! והשמנמן… אכל הכול 😅',c6:'על העטיפה: "מחר מבחן!"',chomp:'קראנץ׳!',test1:'מחר',test2:'מבחן!',
  next:'המשך יבוא… 📚',tag:'🍔 פרק 2 · מרוץ ההמבורגרים',title:'מרוץ ההמבורגרים',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
