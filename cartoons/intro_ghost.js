/* Episode: Ghost Castle (vertical 1080x1920, deterministic renderFrame(t)) */
(window.EPISODES=window.EPISODES||{}).ghost=function(E,TXT,cv){
const W=1080,H=1920,SC=2.0,SY=970,CX=760,CY=530;const BS=cv.width/W;const g=cv.getContext('2d');
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),seg=(t,a,b)=>cl((t-a)/(b-a),0,1),ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,lerp=(a,b,k)=>a+(b-a)*k;
const back=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function rnd(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)}
const FONT='Rubik, "Noto Color Emoji", Arial Black, sans-serif';
// --- prerendered hall map
E.MP.ghost='hall';const map=document.createElement('canvas');map.width=E.AW;map.height=E.AH;E.paintGhostMap(map.getContext('2d'));
// --- scene timing (seconds)
const T1=5.5,T2=11.5,T3=19,T4=22.5,T5=26.5,TEND=30;
// candles (world coords) and which friend lights them + when
const CANDLES=[[560,330,'girl',12.6],[960,330,'tall',12.9],[560,760,'fat',14.4],[960,760,'nerd',14.9],[660,440,'girl',16.2],[860,440,'tall',16.5],[660,690,'fat',17.4],[860,690,'nerd',17.7]];
const OUTT=[8.9,9.2,9.45,9.65,9.85,10.05,10.25,10.45];// blow-out times
const FR=['girl','fat','tall','nerd'];
// ---------- helpers
function cam(cx,cy,s){g.setTransform(s*BS,0,0,s*BS,(W/2-cx*s)*BS,(SY-cy*s)*BS)}
function scr(){g.setTransform(BS,0,0,BS,0,0)}
function hero(c,x,y,t,o){E.drawHero(g,{c,x,y,face:o.face||1,moving:!!o.mv,stun:o.stun?1:0,hat:null,score:1},t)}
function emo(k,x,y,s){const im=E.FXI['e_'+k];if(!im)return;const w=im.width*s,h=im.height*s;g.drawImage(im,x-w/2,y-h/2,w,h)}
function text(s,x,y,size,col,opt){opt=opt||{};g.save();g.font=`${opt.w||900} ${size}px ${FONT}`;g.textAlign=opt.al||'center';g.textBaseline='middle';
  const lines=wrap(s,opt.max||960);const lh=size*1.18;let y0=y-(lines.length-1)*lh/2;
  for(const l of lines){g.lineJoin='round';g.lineWidth=size*.22;g.strokeStyle=opt.sc||'#2b1b30';g.strokeText(l,x,y0);g.fillStyle=col;g.fillText(l,x,y0);y0+=lh}g.restore()}
function wrap(s,max){const out=[];for(const para of s.split('\n')){const w=para.split(' ');let cur='';for(const word of w){const tt=cur?cur+' '+word:word;if(g.measureText(tt).width>max&&cur){out.push(cur);cur=word}else cur=tt}out.push(cur)}return out}
function pop(t,a){const k=seg(t,a,a+.35);return k<=0?0:back(k)}
function bands(t){scr();const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#120d1e');gr.addColorStop(.5,'#1d1530');gr.addColorStop(1,'#120d1e');g.fillStyle=gr;g.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){const x=rnd(i)*W,y=rnd(i+99)*H,a=.25+.5*Math.abs(Math.sin(t*1.7+i));g.fillStyle=`rgba(255,250,220,${a})`;g.beginPath();g.arc(x,y,1.2+rnd(i+7)*1.8,0,7);g.fill()}}
function caption(t,a,b,s,size){if(t<a||t>b)return;const k=pop(t,a),out=seg(t,b-.25,b);const sc=k*(1-out*.3);g.save();scr();g.globalAlpha=1-out;g.translate(W/2,150);g.scale(sc,sc);text(s,0,0,size||74,'#ffe066',{max:1000});g.restore()}
function subtag(t){scr();g.globalAlpha=.85;text(TXT.tag,W/2,1850,44,'#ffffff',{w:800});g.globalAlpha=1}
function sceneClip(){scr();g.save();g.beginPath();g.rect(0,300,W,1340);g.clip()}

// ---------- donkey (5th hero), world units, feet at (x,y)
function donkey(x,y,t,o){o=o||{};const mv=!!o.mv,face=o.face||1,OUT=E.OUT;g.save();g.translate(x,y);g.scale(face*.74,.74);
  const step=mv?Math.sin(t*12):0,bob=mv?Math.abs(Math.sin(t*12))*5:0,jump=o.jump||0;g.translate(0,-bob-jump);
  g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(0,bob+jump+2,80,12,0,0,7);g.fill();
  const leg=(lx,a,dark)=>{g.save();g.translate(lx,-62);g.rotate(a);g.beginPath();g.roundRect(-9,0,18,62,6);g.fillStyle=dark?'#8a5a2e':'#9c6a38';g.fill();g.lineWidth=3;g.strokeStyle=OUT;g.stroke();g.fillStyle='#3a2a20';g.beginPath();g.roundRect(-10,52,20,12,4);g.fill();g.stroke();g.restore()};
  leg(-44,-step*.35,1);leg(36,step*.35,1);
  // tail
  g.strokeStyle=OUT;g.lineWidth=7;g.beginPath();g.moveTo(-70,-108);g.quadraticCurveTo(-96,-90+Math.sin(t*5)*6,-92,-62);g.stroke();g.strokeStyle='#9c6a38';g.lineWidth=4;g.stroke();
  g.fillStyle='#4a3020';g.beginPath();g.ellipse(-92,-58,7,11,0,0,7);g.fill();
  // body
  g.beginPath();g.ellipse(-4,-102,76,44,0,0,7);g.fillStyle='#a8743f';g.fill();g.lineWidth=3.5;g.strokeStyle=OUT;g.stroke();
  g.fillStyle='#d9b483';g.beginPath();g.ellipse(-4,-84,48,20,0,0,7);g.fill();
  leg(-30,step*.35,0);leg(50,-step*.35,0);
  // neck + head
  g.save();g.translate(58,-128);g.rotate(o.chew?Math.sin(t*14)*.05:0);
  g.beginPath();g.moveTo(-20,10);g.quadraticCurveTo(-6,-40,10,-58);g.lineTo(40,-44);g.quadraticCurveTo(26,-10,20,20);g.closePath();g.fillStyle='#a8743f';g.fill();g.stroke();
  g.fillStyle='#4a3020';g.beginPath();g.moveTo(-14,4);g.quadraticCurveTo(-4,-36,10,-56);g.lineTo(2,-58);g.quadraticCurveTo(-16,-34,-24,2);g.closePath();g.fill();
  // ears
  for(const [ex,er] of [[4,-.35],[22,-.12]]){g.save();g.translate(ex,-66);g.rotate(er+(o.scared?-.25:0)+Math.sin(t*3+ex)*.04);g.beginPath();g.ellipse(0,-30,11,32,0,0,7);g.fillStyle='#a8743f';g.fill();g.stroke();g.fillStyle='#e8b8a0';g.beginPath();g.ellipse(0,-30,5,22,0,0,7);g.fill();g.restore()}
  // head
  g.beginPath();g.ellipse(28,-62,32,24,.25,0,7);g.fillStyle='#a8743f';g.fill();g.stroke();
  g.beginPath();g.ellipse(52,-48,22,17,.2,0,7);g.fillStyle='#d9b483';g.fill();g.stroke();
  g.fillStyle=OUT;g.beginPath();g.ellipse(58,-52,3,4,0,0,7);g.fill();
  const jaw=o.chew?Math.abs(Math.sin(t*14))*4:0;g.lineWidth=2.5;g.beginPath();if(o.scared){g.ellipse(48,-38,7,6,0,0,7);g.fillStyle='#5a1a1a';g.fill();g.stroke()}else{g.arc(48,-42+jaw,8,.2,2.6);g.stroke()}
  // eye
  g.fillStyle='#fff';g.beginPath();g.ellipse(26,-70,o.scared?10:8,o.scared?11:9,0,0,7);g.fill();g.lineWidth=2;g.stroke();g.fillStyle=OUT;g.beginPath();g.arc(28+(o.scared?0:1),-69,o.scared?3:4,0,7);g.fill();
  if(o.chew&&o.paper){g.save();g.translate(64,-38);g.rotate(.2);g.fillStyle='#f0dca0';g.fillRect(-4,-10,30,22);g.strokeStyle='#8a6a3a';g.lineWidth=2;g.strokeRect(-4,-10,30,22);g.strokeStyle='#d42b2b';g.lineWidth=3;g.beginPath();g.moveTo(8,-4);g.lineTo(18,6);g.moveTo(18,-4);g.lineTo(8,6);g.stroke();g.restore()}
  g.restore();g.restore()}
// ---------- scene 1: castle exterior
function exterior(t){sceneClip();const gr=g.createLinearGradient(0,300,0,1640);gr.addColorStop(0,'#1b2350');gr.addColorStop(.7,'#3b2a5a');gr.addColorStop(1,'#2a1d3a');g.fillStyle=gr;g.fillRect(0,300,W,1340);
  for(let i=0;i<70;i++){const x=rnd(i+3)*W,y=346+rnd(i+50)*600,a=.3+.6*Math.abs(Math.sin(t*2+i));g.fillStyle=`rgba(255,255,230,${a})`;g.fillRect(x,y,3,3)}
  g.fillStyle='#fff6c8';g.beginPath();g.arc(820,520,90,0,7);g.fill();g.fillStyle='rgba(255,246,200,.12)';g.beginPath();g.arc(820,520,150,0,7);g.fill();
  g.fillStyle='#e8dca8';g.beginPath();g.arc(790,500,16,0,7);g.arc(850,550,10,0,7);g.fill();
  // bats
  for(let i=0;i<3;i++){const bx=(t*140+i*260)%1300-100,by=600+Math.sin(t*3+i)*40+i*40,f=Math.sin(t*20+i)*16;g.fillStyle='#0d0a18';g.beginPath();g.moveTo(bx,by);g.quadraticCurveTo(bx-20,by-12-f,bx-40,by+f*.4);g.quadraticCurveTo(bx-20,by-2,bx,by+8);g.quadraticCurveTo(bx+20,by-2,bx+40,by+f*.4);g.quadraticCurveTo(bx+20,by-12-f,bx,by);g.fill()}
  // hill + castle
  g.fillStyle='#17122a';g.beginPath();g.moveTo(0,1060);g.quadraticCurveTo(540,800,1080,1040);g.lineTo(1080,1640);g.lineTo(0,1640);g.fill();
  const cx=540,base=900;g.save();g.translate(cx,base);g.scale(.8,.8);g.translate(-cx,-base);g.fillStyle='#0f0b1d';
  g.fillRect(cx-220,base-260,440,280);for(const [x,w,h] of [[-260,100,420],[160,100,420],[-60,120,520]]){g.fillRect(cx+x,base-h,w,h+20);g.beginPath();g.moveTo(cx+x-14,base-h);g.lineTo(cx+x+w/2,base-h-110);g.lineTo(cx+x+w+14,base-h);g.fill()}
  for(let i=0;i<9;i++)g.fillRect(cx-220+i*52,base-290,30,32);
  const flick=.7+.3*Math.sin(t*9);g.fillStyle=`rgba(255,200,90,${flick})`;for(const [x,y] of [[-225,-330],[195,-330],[-15,-420],[-15,-300],[-120,-180],[90,-180]]){g.beginPath();g.roundRect(cx+x,base+y,30,46,[15,15,2,2]);g.fill()}
  g.fillStyle='#24183a';g.beginPath();g.roundRect(cx-55,base-120,110,140,[55,55,0,0]);g.fill();g.restore();
  // path
  g.fillStyle='#3a2c4a';g.beginPath();g.moveTo(cx-50,base+16);g.lineTo(cx+50,base+16);g.lineTo(cx+380,1640);g.lineTo(cx-520,1640);g.fill();
  // lightning
  const L=t>2.6&&t<3.0;if(L){g.fillStyle=`rgba(230,235,255,${.55*(1-seg(t,2.6,3))})`;g.fillRect(0,300,W,1340);g.strokeStyle='#fff';g.lineWidth=6;g.beginPath();g.moveTo(160,300);g.lineTo(230,520);g.lineTo(180,540);g.lineTo(260,760);g.stroke()}
  // friends walking in (screen coords, scale 1.05)
  const k=1.7;g.save();g.setTransform(k*BS,0,0,k*BS,0,0);
  FR.forEach((c,i)=>{const start=-200-i*220,end=170+i*240;const p=ease(seg(t,.3,3.2));const x=lerp(start,end,p),y=1560-(i%2)*50;const mv=t>.3&&t<3.2;
    const scared=t>2.7;hero(c,x/k,y/k,t+i*.3,{mv,face:1,stun:scared&&t<3.6});})
  {const p=ease(seg(t,.6,3.4)),x=lerp(-420,40,p);donkey(x/k,1600/k,t,{mv:t>.6&&t<3.4,scared:t>2.7,jump:t>2.7&&t<3.3?Math.abs(Math.sin((t-2.7)*10))*40:0})}
  g.restore();
  if(t>2.75)for(let i=0;i<4;i++){const x=170+i*240,y=1560-(i%2)*50-470;emo(i==1?'drops':'exclamation',x,y-pop(t,2.75+i*.08)*10,3*pop(t,2.75+i*.08))}
  g.restore()}
// ---------- world drawing for hall scenes
function candleOff(x,y){g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y+2,16,5,0,0,7);g.fill();E.rr(g,x-14,y-6,28,8,3);E.sh(g,'#c9a24a',2);E.rr(g,x-7,y-40,14,36,3);E.sh(g,'#e8e0c8',2.5);g.strokeStyle=E.OUT;g.lineWidth=2;g.beginPath();g.moveTo(x,y-40);g.lineTo(x,y-46);g.stroke()}
function smoke(x,y,k){for(let i=0;i<3;i++){g.fillStyle=`rgba(200,200,210,${.35*(1-k)})`;g.beginPath();g.arc(x+Math.sin(k*6+i)*8,y-50-k*60-i*14,6+k*10,0,7);g.fill()}}
function friendPos(c,t){// returns [x,y,mv,face]
  const i=FR.indexOf(c);const enter=[[640,980,640,590],[720,1000,720,630],[800,980,800,590],[880,1000,880,630]][i];
  if(t<T2){const p=ease(seg(t,T1,T1+2.2));return [enter[0],lerp(enter[1],enter[3],p),t>T1&&t<T1+2.2,1]}
  // scene 3: go to candles in order
  const mine=CANDLES.filter(q=>q[2]===c);let x=enter[2],y=enter[3]+30,mv=false,face=1;
  let prevT=T2+.4;for(const q of mine){const arr=q[3]-.15;if(t<prevT)break;const p=ease(seg(t,prevT,arr));const nx=lerp(x,q[0]+(q[0]<750?50:-50),p),ny=lerp(y,q[1]+20,p);mv=mv||(t>prevT&&t<arr);face=q[0]<x?-1:1;x=nx;y=ny;prevT=q[3]+.25}
  if(t>=T3){// gather to center
    const p=ease(seg(t,T3,T3+1.2));const gx=[640,720,800,880][i],gy=[580,620,580,620][i];mv=t<T3+1.2;face=gx<x?-1:1;x=lerp(x,gx,p);y=lerp(y,gy,p)}
  return [x,y,mv,face]}
function litAt(i,t){if(t<OUTT[i])return t<T5;return t>=CANDLES[i][3]}
function hall(t){scr();sceneClip();cam(CX+Math.sin(t*.4)*20,CY,SC);g.drawImage(map,0,0);
  const sorted=[];
  CANDLES.forEach((q,i)=>{sorted.push({y:q[1],d:()=>{if(litAt(i,t))E.drawCandle(g,q[0],q[1],t);else{candleOff(q[0],q[1]);const ko=seg(t,OUTT[i],OUTT[i]+1);if(ko>0&&ko<1)smoke(q[0],q[1],ko)}}})});
  // ghosts
  const gA=t<T2?seg(t,7.2,8):1-seg(t,T3,T3+1.2);
  const gx=t<T2?lerp(700,780,seg(t,7.2,8.6)):760+Math.sin(t*1.3)*170,gy=t<T2?lerp(380,410,seg(t,7.2,8)):420+Math.sin(t*2.1)*50-seg(t,T3,T3+1.2)*300;
  const stunG=t>15.6&&t<17.2;
  if(gA>0)sorted.push({y:gy,d:()=>{E.drawGhostShape(g,gx,gy,t,gA*(stunG?.45:.9),Math.sin(t*1.3)>0?1:-1);if(stunG){g.fillStyle='#ffe14d';for(let k=0;k<3;k++){const a=t*6+k*2.1;E.star(g,gx+Math.cos(a)*30,gy-170+Math.sin(a)*8,8);g.fill()}}}});
  const g2A=t<T2?0:(seg(t,T2,T2+1)*(1-seg(t,T3,T3+1)));if(g2A>0){const x2=760+Math.cos(t*.9)*200,y2=740+Math.sin(t*1.7)*40-seg(t,T3,T3+1)*400;sorted.push({y:y2,d:()=>E.drawGhostShape(g,x2,y2,t,g2A*.85,Math.cos(t*.9)>0?-1:1,'#ff6fae')})}
  // friends
  const scared=t>8&&t<9.2;
  FR.forEach((c,i)=>{const [x,y,mv,face]=friendPos(c,t);const jump=scared?Math.abs(Math.sin((t-8)*10+i))*30:0;const cel=t>T3+1.2&&t<T5?Math.abs(Math.sin(t*7+i*1.3))*28:0;
    sorted.push({y,d:()=>hero(c,x,y-jump-cel,t+i*.37,{mv,face,stun:scared||(c==='fat'&&t>15.1&&t<15.7)})})});
  {let dx,dy,mv=false,face=1;const fp=friendPos('fat',t);
    if(t<T2){const p=ease(seg(t,T1+.5,T1+2.9));dx=lerp(560,560,p);dy=lerp(1020,640,p);mv=t>T1+.5&&t<T1+2.9}
    else if(t<T3){dx=fp[0]-110;dy=fp[1]+10;mv=fp[2];face=fp[3]}
    else{const p=ease(seg(t,T3,T3+1.2));dx=lerp(fp[0]-110,560,p);dy=lerp(fp[1]+10,640,p);mv=t<T3+1.2}
    const scared=t>8&&t<9.6,j=scared?Math.abs(Math.sin((t-8)*8))*70:(t>T3+1.2&&t<T5?Math.abs(Math.sin(t*6))*26:0);
    sorted.push({y:dy,d:()=>donkey(dx,dy,t,{mv,face,scared:scared||(t>T2&&t<T3&&Math.sin(t*2)>.6),jump:j})})}
  sorted.sort((a,b)=>a.y-b.y).forEach(o=>o.d());
  // darkness
  const dk=t<OUTT[0]?0:t<T3?.86*seg(t,OUTT[0],OUTT[7]):.86*(1-seg(t,T3,T3+.8));
  if(dk>.01){const Ls=[];FR.forEach(c=>{const [x,y]=friendPos(c,t);Ls.push([x,y-60,c==='nerd'?260:200])});{const fp=friendPos('fat',t);Ls.push([fp[0]-110,fp[1]-60,170])}CANDLES.forEach((q,i)=>{if(litAt(i,t))Ls.push([q[0],q[1]-40,150])});E.drawDark(g,dk,Ls)}
  // flash by nerd
  if(t>15.5&&t<16.1){const [nx,ny]=friendPos('nerd',t);const k=seg(t,15.5,16.1),R=150+k*420,gr=g.createRadialGradient(nx,ny-80,10,nx,ny-80,R);gr.addColorStop(0,`rgba(255,255,235,${.95*(1-k)})`);gr.addColorStop(1,'rgba(255,255,235,0)');g.fillStyle=gr;g.beginPath();g.arc(nx,ny-80,R,0,7);g.fill()}
  // lighting sparkles
  CANDLES.forEach((q,i)=>{const k=seg(t,q[3],q[3]+.5);if(k>0&&k<1)for(let j=0;j<8;j++){const a=j/8*6.283;g.fillStyle=`rgba(255,220,90,${1-k})`;E.star(g,q[0]+Math.cos(a)*k*70,q[1]-50+Math.sin(a)*k*50,6+4*(1-k));g.fill()}});
  // emotes
  if(t>8&&t<9.6)FR.forEach((c,i)=>{const [x,y]=friendPos(c,t);emo(i==1?'drops':'exclamation',x,y-280,2*pop(t,8+i*.07))});
  if(t>8.05&&t<9.4){const k=pop(t,8.05);g.save();g.translate(gx+150,gy-110);g.scale(k,k);g.rotate(-.12);text(TXT.boo,0,0,90,'#ffffff',{sc:'#3a1650'});g.restore()}
  if(t>8.25&&t<9.6){const k=pop(t,8.25);g.save();g.translate(660,390);g.scale(k,k);g.rotate(-.08);text(TXT.ia,0,0,50,'#ffe066',{sc:'#3a1650'});g.restore()}
  if(t>T3+1.3&&t<T5)FR.forEach((c,i)=>{const [x,y]=friendPos(c,t);emo(['heart','laugh','stars','heart'][i],x,y-290,2*pop(t,T3+1.3+i*.1))});
  // confetti
  if(t>T3+.8&&t<T5){const k=t-(T3+.8);for(let i=0;i<70;i++){const x=480+rnd(i)*560,y=160+((k*(220+rnd(i+5)*180)+rnd(i+9)*300)%720),a=k*4+i;g.save();g.translate(x,y);g.rotate(a);g.fillStyle=['#ffc531','#e8412c','#5cc560','#4f8cff','#ff6fae'][i%5];g.fillRect(-7,-4,14,8);g.restore()}}
  g.restore();g.restore();
  // counter HUD
  if(t>T2&&t<T3+1.6){const n=CANDLES.filter((q,i)=>t>=q[3]).length;scr();g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.roundRect(W/2-170,1680,340,104,52);g.fill();text('🕯 '+n+' / 8',W/2,1732,62,n===8?'#7dff8a':'#ffe066',{sc:'#000'})}
  }
// ---------- scene 5: map
function mapScene(t){const k=ease(seg(t,T4,T4+1.4));scr();g.save();
  sceneClip();const cx=lerp(CX,840,k),cy=lerp(CY,620,k),s=lerp(SC,2.9,k);cam(cx,cy,s);g.drawImage(map,0,0);CANDLES.forEach(q=>E.drawCandle(g,q[0],q[1],t));
  // parchment on floor
  const px=900,py=690;const taken=t>T4+1.6;g.save();if(taken)g.globalAlpha=0;g.translate(px,py);g.rotate(-.08);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-48,-26,100,62);g.fillStyle='#f0dca0';g.beginPath();g.moveTo(-50,-32);g.lineTo(50,-30);g.lineTo(46,30);g.lineTo(-48,32);g.closePath();g.fill();g.strokeStyle='#8a6a3a';g.lineWidth=2;g.stroke();
  g.strokeStyle='#8a6a3a';g.setLineDash([4,4]);g.beginPath();g.moveTo(-34,18);g.quadraticCurveTo(-10,-20,20,4);g.stroke();g.setLineDash([]);g.strokeStyle='#d42b2b';g.lineWidth=4;g.beginPath();g.moveTo(16,-4);g.lineTo(30,10);g.moveTo(30,-4);g.lineTo(16,10);g.stroke();
  g.fillStyle='#4a6ad0';g.beginPath();g.ellipse(-26,-14,12,7,0,0,7);g.fill();g.restore();g.globalAlpha=1;
  const shine=.5+.5*Math.sin(t*8);if(!taken){g.fillStyle=`rgba(255,240,150,${.35*shine})`;g.beginPath();g.arc(px,py,70,0,7);g.fill()}
  hero('fat',700,560,t+.3,{face:1});hero('tall',620,580,t+.6,{face:1});hero('girl',680,640,t,{face:1});hero('nerd',800,690,t,{mv:t<T4+.6,face:1});
  {const p=ease(seg(t,T4+.2,T4+1.4));const chew=t>T4+1.6;donkey(lerp(1060,900,p),730,t,{mv:t<T4+1.4,face:-1,chew,paper:chew})}
  if(t>T4+1.9)FR.forEach((c,i)=>emo(i%2?'exclamation':'anger',[680,700,620,800][i],[330,280,300,420][i],1.5*pop(t,T4+1.9+i*.08)));
  g.restore();g.restore()}
// ---------- end card
function endCard(t){bands(t);const k=pop(t,T5);scr();g.save();g.translate(W/2,720);g.scale(k*2,k*2);E.drawGhostShape(g,0,60,t,1,1);g.restore();
  g.save();g.translate(W/2,880);g.scale(k,k);text(TXT.title,0,0,96,'#ffc531',{max:980,sc:'#5a2410'});g.restore();
  const k2=pop(t,T5+.4);g.save();g.translate(W/2,1080);g.scale(k2,k2);text(TXT.cta,0,0,54,'#ffffff',{w:800,max:900});g.restore();
  const k3=pop(t,T5+.8);if(!TXT.live){g.save();g.translate(W/2,1290);g.scale(k3,k3);g.fillStyle='#e8412c';g.beginPath();g.roundRect(-330,-70,660,140,70);g.fill();g.fillStyle='#b8301f';g.fillRect(-300,62,600,10);text(TXT.url,0,0,60,'#ffffff',{sc:'#7a1a0e'});g.restore()}
  const k4=pop(t,T5+1.4);g.globalAlpha=k4;text(TXT.next,W/2,1560,50,'#ffe066',{w:800});g.globalAlpha=1}
// ---------- master
function renderFrame(t){scr();g.clearRect(0,0,W,H);
  if(t<T5)bands(t);
  if(t<T1)exterior(t);else if(t<T4)hall(t);else if(t<T5)mapScene(t);else endCard(t);
  // captions
  caption(t,.4,T1-.1,TXT.c1);caption(t,T1+.2,8,TXT.c2);caption(t,8.3,T2,TXT.c3);caption(t,T2+.2,T3,TXT.c4);caption(t,T3+.3,T4,TXT.c5);caption(t,T4+.3,T5,TXT.c6);
  if(t<T5)subtag(t);
  // fades between scenes
  for(const b of [T1,T4,T5]){const d=Math.abs(t-b);if(d<.25){scr();g.fillStyle=`rgba(0,0,0,${1-d/.25})`;g.fillRect(0,0,W,H)}}
  if(t<.3){scr();g.fillStyle=`rgba(0,0,0,${1-t/.3})`;g.fillRect(0,0,W,H)}
}
return {len:TEND,render:renderFrame,endAt:T5};
};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).ghost={
 ru:{c1:'Гроза! Друзья прячутся в старом замке…',c2:'Друзья зашли внутрь…',c3:'А тут ПРИВИДЕНИЯ! И они задули все свечи!',c4:'Зажгите все свечи — и не попадитесь!',c5:'Замок спасён! 🎉',c6:'Ослик, отдай! Это же карта сокровищ!',boo:'БУ!',ia:'И-А-А-А!',tag:'👻 Серия 11 · Замок с привидениями',title:'Замок с привидениями',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com',next:'Продолжение следует… 🏴‍☠️'},
 en:{c1:'A storm! The friends hide in an old castle…',c2:'The friends sneak inside…',c3:'GHOSTS! And they blew out every candle!',c4:'Light all the candles — and don\'t get caught!',c5:'The castle is saved! 🎉',c6:'Donkey, give it back! That\'s a treasure map!',boo:'BOO!',ia:'HEE-HAW!',tag:'👻 Episode 11 · Ghost Castle',title:'Ghost Castle',cta:'Play with friends — free, no download!',url:'games.tagshim.com',next:'To be continued… 🏴‍☠️'},
 he:{c1:'סערה! החברים מסתתרים בטירה עתיקה…',c2:'החברים נכנסים פנימה…',c3:'רוחות רפאים! והן כיבו את כל הנרות!',c4:'הדליקו את כל הנרות — ואל תיתפסו!',c5:'הטירה ניצלה! 🎉',c6:'חמור, תחזיר! זאת מפת אוצר!',boo:'בּוּ!',ia:'אִי-אָה!',tag:'👻 פרק 11 · טירת הרוחות',title:'טירת הרוחות',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com',next:'המשך יבוא… 🏴‍☠️'}};
