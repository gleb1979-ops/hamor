(window.EPISODES=window.EPISODES||{}).fish=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#0c3046',b:'#145a73',dot:'170,230,255'}),g=h.g,{seg,ease,lerp,pop,T1,T3,T4,T5}=h;
const RIDERS=['girl','fat','tall','nerd','donkey'];
const T6=21.2;// cut to the sea cove
/* seats on the pond (game coordinates of the fishing map) */
const SEAT={girl:[706,262,-1],fat:[796,270,1],donkey:[752,372,1],nerd:[628,486,-1],tall:[880,490,1]};
const BOB={girl:[628,214],fat:[880,206],donkey:[752,150],nerd:[596,392],tall:[912,396]};
const BUCKET=[772,506];
/* ---------- helpers ---------- */
const hand=(c,x,y,face)=>[x+face*22,y+h.ht(c)*.55];
function rod(c,x,y,face,bx,by,bend,cast){const [hx,hy]=hand(c,x,y,face),L=78,a=-1.05+bend*.55,tx=hx+face*Math.cos(a)*L,ty=hy+Math.sin(a)*L;
  g.lineCap='round';g.strokeStyle=E.OUT;g.lineWidth=5;g.beginPath();g.moveTo(hx,hy);g.quadraticCurveTo(hx+face*L*.55,hy-L*.5+bend*14,tx,ty);g.stroke();g.strokeStyle='#8a5a2b';g.lineWidth=3;g.stroke();
  g.fillStyle='#333';g.beginPath();g.arc(hx+face*8,hy-4,4,0,7);g.fill();
  if(cast>0){g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.3;g.beginPath();g.moveTo(tx,ty);const mx=(tx+bx)/2,my=Math.max(ty,by)+(1-bend)*30;g.quadraticCurveTo(mx,my,lerp(tx,bx,cast),lerp(ty,by,cast));g.stroke()}
  g.lineCap='butt';return [tx,ty]}
function wet(x,y,t,n){g.fillStyle='rgba(120,200,255,.85)';for(let i=0;i<(n||4);i++){const q=(t*1.6+i*.27)%1;g.beginPath();g.arc(x-24+i*16,y+q*60,3.2*(1-q*.5),0,7);g.fill()}}
function splatW(x,y,k){g.save();g.translate(x,y);g.scale(k,k);g.fillStyle='#fff';g.strokeStyle=E.OUT;g.lineWidth=2;g.beginPath();g.ellipse(0,0,16,9,0,0,7);g.fill();g.stroke();for(const [dx,l] of[[-10,14],[2,20],[11,11]]){g.beginPath();g.ellipse(dx,6+l/2,3.5,l/2,0,0,7);g.fill()}g.fillStyle='#e7e7d8';g.beginPath();g.ellipse(-3,-2,7,4,0,0,7);g.fill();g.restore()}
function holdFish(c,x,y,face,f,t,s){const [hx,hy]=hand(c,x,y,face);E.fsFishArt(g,hx+face*10,hy-14+Math.sin(t*9)*2,f,s||1.1,t,face>0?-1.3:1.3)}
function flyFish(f,x0,y0,x1,y1,k,t,s){const x=lerp(x0,x1,k),y=lerp(y0,y1,k)-Math.sin(k*Math.PI)*120;E.fsFishArt(g,x,y,f,s||1.1,t,k*9);if(k<.25){g.fillStyle='rgba(200,240,255,.9)';for(let i=0;i<6;i++){const a=-Math.PI*(i/5);g.beginPath();g.arc(x0+Math.cos(a)*k*120,y0+Math.sin(a)*k*90,3,0,7);g.fill()}}}
function ring(x,y,t,big){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=2;for(let r=0;r<2;r++){const q=(t*1.2+r*.5)%1;g.globalAlpha=1-q;g.beginPath();g.ellipse(x,y,14+q*(big?70:36),5+q*(big?20:10),0,0,7);g.stroke()}g.globalAlpha=1}
function say(s,x,y,t,a,size,col,sc,rot){h.say(s,x,y,t,a,(size||30)*(h.CAM[2]>2.6?.8:1),col,sc,rot)}
function stars(x,y,t){E.r3Stars(g,x,y,t,3)}
/* ---------- scene: the pond (0 .. T6) ---------- */
function pond(t){h.cam(752,300,3);g.drawImage(E.fsBgC(0),0,0);
  // caught fish in the bucket
  const L=[];if(t>3)L.push(0);if(t>4.5)L.push(1);if(t>9.2)L.push(2);if(t>10.4)L.push(4);
  const lid=0,st=t>16.6&&t<17.6;h.add(BUCKET[1],()=>E.fsBucket(g,BUCKET[0],BUCKET[1],st?L.slice(0,-1):L,lid,t));
  const intro=t<1.9;
  for(const c of RIDERS){let [x,y,face]=SEAT[c],o={face},mv=false,rot=0,ox=0,oy=0;
    if(intro){// swim to the pier and jump up onto it
      const wx=x+(c==='nerd'?-40:c==='tall'?40:0),wy=Math.min(y,420)-60-(c==='donkey'?80:0);
      if(t<1.3){x=wx+Math.sin(t*3+x)*6;y=wy+Math.sin(t*4+x)*4;h.add(y,()=>{h.hero(c,x,y,t,{face});g.fillStyle='rgba(60,150,210,.92)';g.beginPath();g.ellipse(x,y-6,40,14,0,0,7);g.fill();ring(x,y-6,t,0)});continue}
      const k=seg(t,1.3,1.9);x=lerp(wx,x,k);y=lerp(wy,y,k)-Math.sin(k*Math.PI)*70;rot=(1-k)*face*.5}
    // per-character action offsets
    if(c==='fat'&&t>5.8&&t<9.2)ox=-Math.sin(t*14)*3-seg(t,5.8,6.3)*8;
    if(c==='tall'&&t>16.6&&t<17.4){o.face=-1;ox=-seg(t,16.6,16.9)*14}
    if(t>T6-.01)rot=0;
    const stun=(c==='tall'&&t>17.3&&t<19)||(c==='nerd'&&t>13.8&&t<15.5);
    h.add(y,()=>{g.save();g.translate(x+ox,y+oy);g.rotate(rot);h.hero(c,0,0,t,{face:o.face,mv,stun});g.restore();
      if(intro||t<2.2)wet(x,y+h.ht(c)*.5,t,4);
      if(!intro)drawGear(c,x+ox,y+oy,o.face,t);
      if(stun)stars(x,y+h.ht(c)-12,t);
      if(c==='nerd'&&t>13.8){const k=pop(t,13.8);splatW(x,y+h.ht(c)+4,.9*k);if(t<16)E.drawFlies&&0}
      if(c==='tall'&&t>17.25){const k=seg(t,17.25,17.5);g.strokeStyle='#e8412c';g.lineWidth=3;g.lineCap='round';for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-16+i*9,y+h.ht(c)*.7-12);g.lineTo(x-16+i*9+lerp(0,14,k),y+h.ht(c)*.7-12+lerp(0,26,k));g.stroke()}g.lineCap='butt'}
      if(c==='fat'&&t>20.75){g.fillStyle='rgba(90,180,240,.55)';g.beginPath();g.ellipse(x,y+h.ht(c)*.5,34,46,0,0,7);g.fill();wet(x,y+h.ht(c)*.4,t,5)}})}
  // gull
  if(t>11&&t<15.4){let gx,gy,f=-1;
    if(t<12.3){const k=ease(seg(t,11,12.3));gx=lerp(470,SEAT.nerd[0]+20,k);gy=lerp(60,SEAT.nerd[1]-20,k)}
    else if(t<13.4){const k=ease(seg(t,12.3,13.4));gx=lerp(SEAT.nerd[0]+20,700,k)+Math.sin(k*6)*30;gy=lerp(SEAT.nerd[1]-20,330,k);f=1}
    else{const k=seg(t,13.4,15.4);gx=lerp(700,SEAT.nerd[0],Math.min(1,k*3))+(k>.33?(k-.33)*700:0);gy=lerp(330,SEAT.nerd[1]-60,Math.min(1,k*3))-(k>.33?(k-.33)*500:0);f=1}
    const face=t<12.3?1:t<13.4?1:(t<14?-1:1);h.add(gy+1,()=>{g.save();g.translate(gx,gy);g.scale(1.25,1.25);E.fsGull(g,0,0,face,t,f,1);g.restore()});
    if(t>12.3&&t<12.8)say(TXT.hey,SEAT.nerd[0]-20,SEAT.nerd[1]-170,t,12.3,26,'#fff','#2b5fd9',-.08);
    // the drop
    if(t>13.4&&t<13.8){const k=seg(t,13.4,13.8),px=lerp(SEAT.nerd[0],SEAT.nerd[0],k),py=lerp(SEAT.nerd[1]-60-148,SEAT.nerd[1]+h.ht('nerd'),k*k);h.add(9999,()=>{g.fillStyle='#fff';g.strokeStyle=E.OUT;g.lineWidth=1.5;g.beginPath();g.ellipse(px,py,5,7,0,0,7);g.fill();g.stroke()})}}
  // nerd holds his catch until the gull grabs it
  if(t>11&&t<12.3){const [x,y,f]=SEAT.nerd;h.add(y+1,()=>holdFish('nerd',x,y,f,1,t,1.1))}
  // cat
  if(t>14.8&&t<19){let cx,cy,face=-1,st=0,f=-1;
    if(t<16.4){const k=seg(t,14.8,16.4);cx=lerp(1010,BUCKET[0]+34,k);cy=lerp(530,BUCKET[1]+6,k)}
    else if(t<17.5){cx=BUCKET[0]+34;cy=BUCKET[1]+6;f=t>16.6?2:-1;if(t>17.1){face=1;cx+=seg(t,17.1,17.3)*50}}
    else{const k=seg(t,17.5,18.9);cx=lerp(BUCKET[0]+84,1060,k);cy=lerp(BUCKET[1]+6,520,k);face=1;st=1;f=2}
    h.add(cy,()=>{g.save();g.translate(cx,cy);g.scale(1.25,1.25);E.fsCat(g,0,0,face,t,st,f);g.restore()});
    if(t>15.1&&t<16.4)say(TXT.tiptoe,Math.min(cx,850),cy-80,t,15.1,22,'#fff','#7a4a24');
    if(t>16.7&&t<17.25)say(TXT.shoo,SEAT.tall[0]+10,SEAT.tall[1]-175,t,16.7,30,'#ffc531','#e8412c',.06);
    if(t>17.25&&t<18.6)say(TXT.hiss,cx,cy-90,t,17.2,30,'#fff','#d0701a',-.08)}
  // mermaid
  if(t>18.9){const k=ease(seg(t,18.9,19.7))*(1-seg(t,20.9,21.2)),mx=648,my=318;h.add(140,()=>{g.save();g.translate(mx,my);g.scale(1.35,1.35);E.fsMermaidArt(g,0,0,k,t);
      if(t>19.7&&t<20.15){g.fillStyle='#ffd2b0';g.beginPath();g.ellipse(8,-59,4.5,5,0,0,7);g.fill();g.strokeStyle=E.OUT;g.lineWidth=2.2;g.beginPath();g.arc(8,-58,4,Math.PI*1.1,Math.PI*1.9);g.stroke()}
      g.restore();ring(mx,my+4,t,1)});
    if(t>19.75&&t<20.2)say(TXT.wink,mx+50,my-130,t,19.75,24,'#ff6fae','#5a1440');
    if(t>20.1&&t<20.5){const k=seg(t,20.1,20.5);h.add(9999,()=>flyFish(3,mx-10,my-70,SEAT.girl[0]-20,SEAT.girl[1]-60,k,t,1.3))}
    if(t>20.5){const [x,y,f]=SEAT.girl;h.add(y+1,()=>holdFish('girl',x,y,f,3,t,1.3));say(TXT.gold,x-50,y-125,t,20.5,28,'#ffd23f','#7a4a00',-.06)}
    if(t>20.45&&t<20.85){const k=seg(t,20.45,20.85);h.add(9999,()=>{g.fillStyle='rgba(150,220,255,.95)';for(let i=0;i<12;i++){const a=i/11;g.beginPath();g.arc(lerp(mx+30,SEAT.fat[0],k)+(a-.5)*30*k,lerp(my,SEAT.fat[1]-40,k)-Math.sin(k*Math.PI)*60+(h.rnd(i)-.5)*20,4,0,7);g.fill()}})}
    if(t>20.8)say(TXT.bulk,SEAT.fat[0]+40,SEAT.fat[1]-130,t,20.8,30,'#fff','#0b5d8a',.08)}
  // the big fish: jumps out of the water mid-fight
  if(t>7.2&&t<7.9){const k=seg(t,7.2,7.9),[bx,by]=BOB.fat;h.add(150,()=>{E.fsFishArt(g,bx+10,by-Math.sin(k*Math.PI)*60,2,2.1,t,-1+k*2);ring(bx,by,t,1)})}
  h.flush();h.scr();
  // tension meter during the big-fish fight
  if(t>6&&t<9){const [sx,sy]=h.w2s(SEAT.fat[0]+75,SEAT.fat[1]-10),v=.55+.4*Math.sin(t*5)*Math.sin(t*1.7),k=pop(t,6);g.save();g.translate(sx+120,sy);g.scale(k,k);g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.roundRect(-26,-130,52,260,26);g.fill();
    const gr=g.createLinearGradient(0,120,0,-120);gr.addColorStop(0,'#5cc560');gr.addColorStop(.6,'#ffc531');gr.addColorStop(1,'#e8412c');g.fillStyle=gr;g.beginPath();g.roundRect(-16,120-240*v,32,240*v,16);g.fill();h.text('🎣',0,-160,40,'#fff');g.restore()}
  h.cam(752,300,3);
  // words
  if(t>2.9&&t<4.4)say(TXT.small,SEAT.girl[0]-50,SEAT.girl[1]-125,t,2.9,26,'#fff','#2e7d32');
  if(t>4.4&&t<5.6)say(TXT.small3,SEAT.nerd[0]-10,SEAT.nerd[1]-170,t,4.4,26,'#fff','#2e7d32');
  if(t>5.9&&t<7.2)say(TXT.bite,SEAT.fat[0]+40,SEAT.fat[1]-130,t,5.9,30,'#ffc531','#e8412c',.06);
  if(t>7.2&&t<9)say(TXT.pull,SEAT.donkey[0]-10,SEAT.donkey[1]-170,t,7.2,28,'#fff','#e8412c',-.06);
  if(t>9&&t<10.3)say(TXT.wow,SEAT.fat[0]+40,SEAT.fat[1]-130,t,9,32,'#ffd23f','#7a1a0e',.06);
  if(t>10.3&&t<11.2)say(TXT.boot,SEAT.donkey[0]+40,SEAT.donkey[1]-175,t,10.3,28,'#fff','#6b4423',-.06);
  if(t>13.85&&t<15.6)say(TXT.fu,SEAT.nerd[0]+10,SEAT.nerd[1]-180,t,13.85,34,'#ffc531','#6b4423',-.08);
  if(t>17.3&&t<18.9)say(TXT.ouch,SEAT.tall[0]-40,SEAT.tall[1]-180,t,17.3,30,'#ffc531','#e8412c',.08);
  if(t<1.3)say(TXT.brr,752,200,t,.4,34,'#fff','#0b5d8a',-.05)}
/* rods, bobbers and catches per character */
function drawGear(c,x,y,face,t){const [bx,by]=BOB[c];let bend=0,cast=seg(t,1.9,2.4),st=1,cat=null;
  if(c==='girl'){if(t>2.3&&t<2.9)st=2;if(t>2.8&&t<3.2){cat=[0,seg(t,2.8,3.2)]}if(t>2.8&&t<3.4)bend=.4;if(t>20.4)cast=0}
  if(c==='nerd'){if(t>3.7&&t<4.3)st=2;if(t>4.2&&t<4.6)cat=[1,seg(t,4.2,4.6)];if(t>10.6&&t<11)st=2;if(t>11&&t<13.8)cast=0}
  if(c==='fat'){if(t>5.8&&t<8.6){st=2;bend=.6+.35*Math.sin(t*5)}if(t>8.6&&t<9.2){cat=[2,seg(t,8.6,9.2)];bend=.5}}
  if(c==='donkey'){if(t>9.4&&t<9.9){st=2;bend=.5}if(t>9.9&&t<10.4)cat=[4,seg(t,9.9,10.4)]}
  if(c==='tall'&&t>16.6&&t<17.6)cast=0;
  const [tx,ty]=rod(c,x,y,face,bx,by,bend,cast);
  if(cast>=1&&!cat){if(st===2){g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1.2;g.beginPath();g.moveTo(tx,ty);g.lineTo(bx,by);g.stroke()}E.fsBobber(g,bx,by,st,t,c.length)}
  if(cat){const [f,k]=cat;flyFish(f,bx,by,BUCKET[0],BUCKET[1]-40,k,t,f===2?1.8:f===4?1.6:1.1)}}
/* ---------- scene: the sea cove, the water dragon ---------- */
const CV={girl:[1000,500],fat:[1080,505],tall:[1160,500],nerd:[920,505],donkey:[1240,510]};
const DR=[1000,335];
function cove(t){h.cam(1080,350,2.4);g.drawImage(E.fsBgC(1),0,0);
  const rise=ease(seg(t,22,22.8))*(1-ease(seg(t,25,25.5))),shadow=seg(t,T6+.1,22)*(1-seg(t,22.3,22.6));
  // dragon shadow under the water
  if(shadow>0){g.fillStyle=`rgba(10,40,60,${.45*shadow})`;g.beginPath();g.ellipse(DR[0]+Math.sin(t*2)*20,DR[1]+10,150,46,0,0,7);g.fill();g.beginPath();g.ellipse(DR[0]-150+Math.sin(t*2)*20,DR[1]+20,60,20,.3,0,7);g.fill()}
  // the wave
  const wk=seg(t,22.7,23.4),down=t>23.3&&t<24.1;
  // glowing rift after the yank
  if(t>25.4){const k=ease(seg(t,25.4,26.2));g.save();g.translate(DR[0]+60,DR[1]+10);for(let i=4;i>=0;i--){g.fillStyle=['#2a0b4a','#5b1fa6','#8b3dff','#c27bff','#f2d9ff'][i];g.beginPath();g.ellipse(0,0,Math.max(.1,(150-i*24)*k+Math.sin(t*6+i)*4*k),Math.max(.1,(56-i*9)*k),0,0,7);g.fill()}
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=3;for(let i=0;i<6;i++){const a=t*3+i;g.beginPath();g.arc(0,0,(60+i*12)*k,a,a+1.2);g.stroke()}g.restore()}
  if(rise>0||t<25.5){h.add(DR[1],()=>{if(rise>0){g.save();g.translate(DR[0],DR[1]);g.scale(.85,.85);E.fsDragonArt(g,0,0,rise,t,t>22.5);g.restore()}})}
  // rope from the friends to the dragon
  const pull=t>24&&t<25.1,yank=seg(t,25,25.5);
  RIDERS.forEach((c,i)=>{let [x,y]=CV[c],rot=0,face=-1,mv=false,stun=false;
    if(down){rot=-Math.PI/2*Math.min(1,seg(t,23.2,23.45))*(i%2?1:-1)*.9;stun=t>23.4}
    if(pull){x+=Math.sin(t*12+i)*3+10;rot=.22;mv=true}
    if(t>25){const k=yank,tx=DR[0]+20+i*20,ty=DR[1]+20;x=lerp(x,tx,ease(k));y=lerp(y,ty,ease(k))-Math.sin(k*Math.PI)*140;rot=k*7*(i%2?1:-1)}
    const vis=t<25.5;if(!vis)return;
    h.add(y,()=>{g.save();g.translate(x,y);g.rotate(rot);h.hero(c,0,0,t,{face,mv,stun});g.restore();if(stun)stars(x+(i%2?40:-40),y-30,t)})});
  if(pull){h.add(DR[1]+1,()=>{const [x0,y0]=CV.donkey,[x1,y1]=[DR[0]+10,DR[1]-180*rise+20];g.strokeStyle=E.OUT;g.lineWidth=4;g.beginPath();g.moveTo(x0+10,y0-40);g.quadraticCurveTo((x0+x1)/2,Math.min(y0,y1)-20+Math.sin(t*9)*8,x1,y1);g.stroke();g.strokeStyle='#e9d29a';g.lineWidth=2.4;g.stroke()})}
  h.flush();
  if(wk>0&&wk<1){const wx=lerp(DR[0]-60,1300,ease(wk)),wy=lerp(DR[1]+30,560,ease(wk));g.save();g.globalAlpha=1-Math.max(0,wk-.8)*5;const gr=g.createLinearGradient(0,wy-120,0,wy+30);gr.addColorStop(0,'#e8f8ff');gr.addColorStop(1,'#2c9fd6');g.fillStyle=gr;
    g.beginPath();g.moveTo(700,wy+30);for(let x=700;x<=1500;x+=20)g.lineTo(x,wy-80-Math.sin(x*.03+t*8)*16-Math.max(0,140-Math.abs(x-wx))*.6);g.lineTo(1500,wy+30);g.closePath();g.fill();
    g.fillStyle='#fff';for(let x=700;x<=1500;x+=26){g.beginPath();g.arc(x,wy-84-Math.sin(x*.03+t*8)*16-Math.max(0,140-Math.abs(x-wx))*.6,6,0,7);g.fill()}g.restore()}
  if(t>25.45&&t<26){for(let j=0;j<16;j++){const q=seg(t,25.45,26),a=-Math.PI*(j/15);g.fillStyle='rgba(200,240,255,.95)';g.beginPath();g.arc(DR[0]+60+Math.cos(a)*q*200,DR[1]+Math.sin(a)*q*160,6,0,7);g.fill()}}
  if(t>T6+.3&&t<22.3)say(TXT.what,1080,330,t,T6+.3,34,'#fff','#2b5fd9',-.05);
  if(t>22.4&&t<23.4)say(TXT.roar,DR[0]+40,DR[1]-300,t,22.4,44,'#ffc531','#0b5d8a',.05);
  if(t>23.4&&t<24.1)say(TXT.wave,1080,380,t,23.4,38,'#fff','#0b5d8a',-.05);
  if(t>24.1&&t<25.1)say(TXT.heave,1100,330,t,24.1,38,'#ffc531','#e8412c',.05);
  if(t>25.1&&t<25.6)say(TXT.aaa,1080,280,t,25.1,40,'#fff','#5b1fa6',-.05)}
function scenes(t){h.clip();if(t<T6)pond(t);else cove(t);g.restore();
  if(t>T1&&t<T6){const n=(t>3?1:0)+(t>4.5?1:0)+(t>9.2?1:0)+(t>20.5?1:0)-(t>12.3?0:0),b=t>10.4?1:0,p=t>13.8?1:0;h.counter(t,[{label:'🐟 '+n},{label:'🥾 '+b},{label:'💩 '+p}])}
  h.next(t)}
function icon(t){g.save();g.scale(4,4);E.fsFishArt(g,-34,0,3,1.6,t,0);g.restore();g.save();g.translate(150,90);g.scale(.75,.75);E.fsDragonArt(g,0,0,1,t,0);g.restore()}
const caps=[[.3,5.4,'c1'],[5.6,10.9,'c2'],[11.1,14.7,'c3'],[14.9,18.9,'c4'],[19.1,21.1,'c5'],[21.3,23.9,'c6'],[24,26.4,'c7']];
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,caps,icon,[T1,11,T3,T6,T5])}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).fish={
 ru:{c1:'Мокрые после гонки… значит, на рыбалку! 🎣',c2:'Клюёт по-крупному! Тяни-и-и! 🐟',c3:'Чайка украла рыбу… и ещё сверху! 💩',c4:'Кот у ведра! Прогонишь — поцарапает 🐱',c5:'Русалка дарит золотую рыбку! 🧜‍♀️',c6:'Морская бухта… а под водой — ДРАКОН! 🐉',c7:'Все вместе — тянем! …ой, это он нас тянет! 🌀',
  brr:'БРР! МОКРО!',small:'МАЛЁК! +1',small3:'+3!',bite:'КЛЮЁТ!',pull:'ТЯНИ!',wow:'ОГО! +6',boot:'БОТИНОК?! 😂',hey:'ЭЙ!',fu:'ФУ-У-У!',tiptoe:'тихо-тихо…',shoo:'КЫШ!',hiss:'ШШШ!',ouch:'АЙ!',wink:'😉',gold:'ЗОЛОТАЯ! ✨',bulk:'БУЛЬК!',what:'ЭТО ЧТО?!',roar:'РРРОАР!',wave:'ВОЛНА!',heave:'РАЗ-ДВА — ВЗЯЛИ!',aaa:'А-А-А-А!',
  next:'Продолжение следует… ⚡',tag:'🎣 Серия 18 · Рыбалка',title:'Рыбалка',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Soaked after the race… so let\'s go fishing! 🎣',c2:'A big one is biting! Pull-l-l! 🐟',c3:'A seagull stole the fish… and dropped a gift! 💩',c4:'A cat at the bucket! Shoo it — get scratched 🐱',c5:'A mermaid gives a golden fish! 🧜‍♀️',c6:'The sea cove… and under the water — a DRAGON! 🐉',c7:'All together — pull! …uh-oh, it\'s pulling US! 🌀',
  brr:'BRR! WET!',small:'TIDDLER! +1',small3:'+3!',bite:'A BITE!',pull:'PULL!',wow:'WOW! +6',boot:'A BOOT?! 😂',hey:'HEY!',fu:'EWWW!',tiptoe:'sneak, sneak…',shoo:'SHOO!',hiss:'HSSS!',ouch:'OUCH!',wink:'😉',gold:'GOLDEN! ✨',bulk:'SPLOSH!',what:'WHAT IS THAT?!',roar:'RROAAR!',wave:'WAVE!',heave:'ONE, TWO — HEAVE!',aaa:'AAAAH!',
  next:'To be continued… ⚡',tag:'🎣 Episode 18 · Gone Fishing',title:'Gone Fishing',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'רטובים אחרי המרוץ… אז הולכים לדוג! 🎣',c2:'דג גדול נתפס! למשוך! 🐟',c3:'שחף גנב את הדג… וגם הפציץ מלמעלה! 💩',c4:'חתול ליד הדלי! תגרש אותו — הוא שורט 🐱',c5:'בת ים נותנת דג זהב! 🧜‍♀️',c6:'מפרץ הים… ומתחת למים — דרקון! 🐉',c7:'כולם ביחד — מושכים! …אוי, הוא מושך אותנו! 🌀',
  brr:'ברר! רטוב!',small:'דגיג! +1',small3:'+3!',bite:'נשך!',pull:'למשוך!',wow:'וואו! +6',boot:'נעל?! 😂',hey:'היי!',fu:'איכס!',tiptoe:'בשקט בשקט…',shoo:'קישטה!',hiss:'ששש!',ouch:'איי!',wink:'😉',gold:'דג זהב! ✨',bulk:'פלופ!',what:'מה זה?!',roar:'רררואר!',wave:'גל!',heave:'אחת, שתיים — מושכים!',aaa:'אההההה!',
  next:'המשך יבוא… ⚡',tag:'🎣 פרק 18 · דיג',title:'דיג',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
