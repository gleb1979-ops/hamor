/* Shared toolkit for the cartoon episodes (vertical 1080x1920, deterministic t) */
window.EPC=function(E,TXT,cv,theme){
const W=1080,H=1920,BS=cv.width/W,g=cv.getContext('2d'),SY=970;
const h={g,W,H,E,TXT,T1:5.5,T2:11,T3:19,T4:23,T5:26.5,LEN:30,FR:['girl','fat','tall','nerd']};
h.cl=(v,a,b)=>Math.max(a,Math.min(b,v));h.seg=(t,a,b)=>h.cl((t-a)/(b-a),0,1);h.ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;h.lerp=(a,b,k)=>a+(b-a)*k;
const back=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
h.rnd=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)};
h.pop=(t,a)=>{const k=h.seg(t,a,a+.35);return k<=0?0:back(k)};
const FONT='Rubik, "Noto Color Emoji", Arial Black, sans-serif';h.FONT=FONT;
h.scr=()=>g.setTransform(BS,0,0,BS,0,0);
h.CAM=[750,520,2];h.cam=(cx,cy,s)=>{h.CAM=[cx,cy,s];g.setTransform(s*BS,0,0,s*BS,(W/2-cx*s)*BS,(SY-cy*s)*BS)};
h.w2s=(x,y)=>[W/2+(x-h.CAM[0])*h.CAM[2],SY+(y-h.CAM[1])*h.CAM[2]];
h.sk=k=>g.setTransform(k*BS,0,0,k*BS,0,0);
h.clip=()=>{h.scr();g.save();g.beginPath();g.rect(0,300,W,1340);g.clip()};
h.hero=(c,x,y,t,o)=>{o=o||{};E.drawHero(g,{id:'ep_'+c,c,x,y,face:o.face||1,moving:!!o.mv,stun:o.stun?1:0,hat:o.hat||null,score:o.score==null?1:o.score,bag:o.bag||0},t)};
h.emo=(k,x,y,s)=>{const im=E.FXI['e_'+k];if(!im||s<=0)return;const w=im.width*s,hh=im.height*s;g.drawImage(im,x-w/2,y-hh/2,w,hh)};
h.wrap=(s,max)=>{const out=[];for(const para of String(s).split('\n')){const w=para.split(' ');let cur='';for(const word of w){const tt=cur?cur+' '+word:word;if(g.measureText(tt).width>max&&cur){out.push(cur);cur=word}else cur=tt}out.push(cur)}return out};
h.text=(s,x,y,size,col,opt)=>{opt=opt||{};g.save();g.font=`${opt.w||900} ${size}px ${FONT}`;g.textAlign='center';g.textBaseline='middle';const lines=h.wrap(s,opt.max||960),lh=size*1.18;let y0=y-(lines.length-1)*lh/2;
  for(const l of lines){g.lineJoin='round';g.lineWidth=size*.22;g.strokeStyle=opt.sc||'#2b1b30';g.strokeText(l,x,y0);g.fillStyle=col;g.fillText(l,x,y0);y0+=lh}g.restore()};
h.say=(s,x,y,t,a,size,col,sc,rot)=>{if(t<a)return;const k=h.pop(t,a);g.save();g.translate(x,y);g.scale(k,k);g.rotate(rot||0);h.text(s,0,0,size||52,col||'#ffffff',{sc:sc||'#e8412c'});g.restore()};
const th=theme||{a:'#2a1414',b:'#3a1d16',dot:'255,200,80'};
h.bands=t=>{h.scr();const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,th.a);gr.addColorStop(.5,th.b);gr.addColorStop(1,th.a);g.fillStyle=gr;g.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const x=h.rnd(i)*W,y=h.rnd(i+99)*H,a=.15+.3*Math.abs(Math.sin(t*1.7+i));g.fillStyle=`rgba(${th.dot},${a})`;g.beginPath();g.arc(x,y,2+h.rnd(i+7)*2,0,7);g.fill()}};
h.caption=(t,a,b,s)=>{if(!s||t<a||t>b)return;const k=h.pop(t,a),out=h.seg(t,b-.25,b);g.save();h.scr();g.globalAlpha=1-out;g.translate(W/2,150);g.scale(k*(1-out*.3),k*(1-out*.3));h.text(s,0,0,70,'#ffe066',{max:1000});g.restore()};
// floors of game maps
h.floor=(loc,map,vm)=>{E.setLoc(loc);if(map)E.MP[loc]=map;if(vm)E.setVM&&E.setVM(vm);E.setLoc(loc);const c=document.createElement('canvas');c.width=E.AW;c.height=E.AH;E.drawFloor(c.getContext('2d'));return c};
// path keyframes: [[t,x,y],...] -> [x,y,moving,face]
h.path=(t,K)=>{if(t<=K[0][0])return [K[0][1],K[0][2],false,K[0][3]||1];for(let i=1;i<K.length;i++){const a=K[i-1],b=K[i];if(t<=b[0]){const k=h.ease(h.seg(t,a[0],b[0]));const mv=Math.hypot(b[1]-a[1],b[2]-a[2])>4;const face=b[3]||(b[1]<a[1]?-1:b[1]>a[1]?1:(a[3]||1));return [h.lerp(a[1],b[1],k),h.lerp(a[2],b[2],k),mv,face]}}const z=K[K.length-1];return [z[1],z[2],false,z[3]||1]};
// depth-sorted world list
h.list=[];h.add=(y,fn)=>h.list.push({y,fn});h.flush=()=>{h.list.sort((a,b)=>a.y-b.y).forEach(o=>o.fn());h.list=[]};
h.ht=c=>E.headTop(c,null);
h.ears=(x,y,k,t)=>{for(const [ex,a] of [[-14,-.3],[14,.3]]){g.save();g.translate(x+ex,y);g.rotate(a+Math.sin(t*6+ex)*.06);g.scale(k,k);g.beginPath();g.ellipse(0,-34,13,36,0,0,7);g.fillStyle='#b07a45';g.fill();g.lineWidth=4;g.strokeStyle='#2b1b30';g.stroke();g.beginPath();g.ellipse(0,-34,6,24,0,0,7);g.fillStyle='#f0b8a8';g.fill();g.restore()}};
h.confetti=(t,t0,x0,y0,w,hh)=>{const k=t-t0;if(k<0)return;for(let i=0;i<60;i++){const x=x0+h.rnd(i)*w,y=y0+((k*(220+h.rnd(i+5)*180)+h.rnd(i+9)*300)%hh),a=k*4+i;g.save();g.translate(x,y);g.rotate(a);g.fillStyle=['#ffc531','#e8412c','#5cc560','#4f8cff','#ff6fae'][i%5];g.fillRect(-7,-4,14,8);g.restore()}};
h.counter=(t,items)=>{h.scr();items.forEach((it,i)=>{const n=items.length,x=W/2+(i-(n-1)/2)*240,y=1720;g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.roundRect(x-105,y-44,210,88,44);g.fill();
  if(it.c){g.fillStyle=E.CH[it.c].col;g.beginPath();g.arc(x-66,y,17,0,7);g.fill()}h.text(it.label,x+(it.c?16:0),y,46,'#ffffff',{sc:'#000'})})};
h.endCard=(t,icon)=>{h.bands(t);const k=h.pop(t,h.T5);h.scr();if(k>.01){g.save();g.translate(W/2,800);g.scale(k,k);icon(t);g.restore()}
  g.save();g.translate(W/2,1010);g.scale(k,k);h.text(TXT.title,0,0,Math.min(98,1500/Math.max(1,TXT.title.length)),'#ffc531',{sc:'#5a2410',max:1000});g.restore();
  const k2=h.pop(t,h.T5+.4);g.save();g.translate(W/2,1160);g.scale(k2,k2);h.text(TXT.cta,0,0,54,'#ffffff',{w:800,max:900});g.restore();
  if(!TXT.live){const k3=h.pop(t,h.T5+.8);g.save();g.translate(W/2,1370);g.scale(k3,k3);g.fillStyle='#e8412c';g.beginPath();g.roundRect(-330,-70,660,140,70);g.fill();h.text(TXT.url,0,0,60,'#ffffff',{sc:'#7a1a0e'});g.restore()}};
h.next=t=>{if(t<h.T4+2.3)return;const k=h.pop(t,h.T4+2.3);h.scr();g.save();g.translate(W/2,1720);g.scale(k,k);h.text(TXT.next,0,0,52,'#ffe066',{w:800});g.restore()};
// master renderer: scenes(t) draws scene content; caps = [[a,b,key],...]
h.render=(t,scenes,caps,icon,cuts)=>{h.scr();g.clearRect(0,0,W,H);if(t<h.T5){h.bands(t);scenes(t)}else h.endCard(t,icon);
  for(const [a,b,k] of caps)h.caption(t,a,b,TXT[k]);
  if(t<h.T5){h.scr();g.globalAlpha=.85;h.text(TXT.tag,W/2,1850,44,'#ffffff',{w:800});g.globalAlpha=1}
  for(const b of (cuts||[h.T4,h.T5])){const d=Math.abs(t-b);if(d<.22){h.scr();g.fillStyle=`rgba(0,0,0,${1-d/.22})`;g.fillRect(0,0,W,H)}}
  if(t<.3){h.scr();g.fillStyle=`rgba(0,0,0,${1-t/.3})`;g.fillRect(0,0,W,H)}};
h.CAPS=[[.3,5.4,'c1'],[5.6,10.9,'c2'],[11.1,15,'c3'],[15.1,18.9,'c4'],[19.1,22.9,'c5'],[23.1,26.4,'c6']];
return h};
