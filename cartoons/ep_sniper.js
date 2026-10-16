(window.EPISODES=window.EPISODES||{}).sniper=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#060a1c',b:'#0e1636',dot:'160,200,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const city=h.floor('sniper','city'),forest=h.floor('sniper','forest');
const CS=[[170,320,'bin'],[470,320,'wall'],[800,320,'box'],[1080,320,'wall'],[1340,320,'bin'],[300,535,'car'],[730,535,'car'],[1160,535,'car'],[160,765,'box'],[520,765,'wall'],[930,765,'bin'],[1320,765,'box']];
const FS=[[190,330,'bush'],[500,330,'rock'],[810,330,'bush'],[1110,330,'log'],[1350,330,'bush'],[330,545,'log'],[730,545,'bush'],[1170,545,'rock'],[170,765,'rock'],[540,765,'bush'],[950,765,'log'],[1330,765,'bush']];
const LAMPS=[[620,300,170],[990,690,170],[150,410,130]];
const HIDE={girl:[520,765],fat:[930,765],nerd:[470,320],tall:[800,320]},SW=[985,395];
const DK=[730,535],FLASH=16.3,SHOT=17.2;
let dk=null;
function dark(t){return t<7.1?0:t<7.5?seg(t,7.1,7.5):t<19.3?1:1-seg(t,19.3,19.9)}
function friend(c,t){const i=h.FR.indexOf(c),walk=[[620,640],[700,700],[820,640],[900,700]][i],hd=HIDE[c];
  if(t<8.2)return path(t,[[0,walk[0]-40,walk[1]+330],[4.2,walk[0],walk[1]],[8.2,walk[0],walk[1]]]);
  if(t<T3)return path(t,[[8.2,walk[0],walk[1]],[9.6,hd[0],hd[1],hd[0]<DK[0]?1:-1]]);
  const end=[[610,700],[880,700],[600,600],[900,600]][i];return path(t,[[T3,hd[0],hd[1]],[T3+1.4,end[0],end[1],end[0]<760?1:-1]])}
function donkey(t){if(t<T3+.2)return path(t,[[0,1180,900,-1],[4,1150,760,-1],[6.4,SW[0]+60,SW[1]+10,-1],[7.4,SW[0]+60,SW[1]+10,-1],[9.2,DK[0],DK[1],-1]]);return path(t,[[T3+.2,DK[0],DK[1]],[T3+1.3,760,640,-1]])}
function duck(t){return t<9.2||t>16.4?0:t<9.6?seg(t,9.2,9.6)*42:t>16.1?42*(1-seg(t,16.1,16.4)):42}
function swBox(on){g.save();g.translate(SW[0],SW[1]);g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(0,4,30,8,0,0,7);g.fill();E.rr(g,-24,-74,48,76,6);E.sh(g,'#5b6475',3);g.fillStyle='#ffc531';g.beginPath();g.moveTo(-6,-58);g.lineTo(4,-58);g.lineTo(-2,-46);g.lineTo(6,-46);g.lineTo(-6,-30);g.lineTo(-2,-42);g.lineTo(-8,-42);g.closePath();g.fill();
  g.strokeStyle='#2b1b30';g.lineWidth=5;g.beginPath();g.moveTo(24,-40);g.lineTo(40,on?-58:-22);g.stroke();g.fillStyle='#e8412c';g.beginPath();g.arc(40,on?-58:-22,7,0,7);g.fill();g.restore()}
function covers(S){for(const s of S)h.add(s[1]+1,()=>E.snCover(g,s[0],s[1],s[2]))}
function cityWorld(t){g.drawImage(city,0,0);covers(CS);h.add(SW[1],()=>swBox(t<7));
  const armed=t>9.8&&t<T3;h.FR.forEach((c,i)=>{const p=friend(c,t);h.add(p[1],()=>{h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3]});if(armed)E.snRifle(g,{c,x:p[0],y:p[1],face:p[3]})})});
  const d=donkey(t),st=t>SHOT&&t<T3+1.8;h.add(t>9.2&&t<T3+.2?DK[1]:d[1],()=>{h.hero('donkey',d[0],d[1]+duck(t),t,{mv:d[2],face:d[3],stun:st})});
  h.flush()}
function scope(t,cx,cy,R,world){g.save();g.beginPath();g.arc(cx,cy,R,0,7);g.clip();g.fillStyle='#000';g.fillRect(cx-R,cy-R,2*R,2*R);g.translate(cx,cy);g.scale(1.6,1.6);g.translate(-cx,-cy);g.filter='brightness(1.7) saturate(.35)';world(t);g.filter='none';g.restore();
  g.save();g.beginPath();g.arc(cx,cy,R,0,7);g.clip();g.globalCompositeOperation='multiply';g.fillStyle='#8dffa6';g.fillRect(cx-R,cy-R,2*R,2*R);g.globalCompositeOperation='source-over';g.fillStyle='rgba(0,0,0,.13)';for(let y=cy-R;y<cy+R;y+=6)g.fillRect(cx-R,y,2*R,2);
  const vg=g.createRadialGradient(cx,cy,R*.55,cx,cy,R);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.75)');g.fillStyle=vg;g.fillRect(cx-R,cy-R,2*R,2*R);g.restore();
  g.lineWidth=16;g.strokeStyle='#050607';g.beginPath();g.arc(cx,cy,R+8,0,7);g.stroke();g.lineWidth=2.5;g.strokeStyle='#4dff7c';g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();
  g.strokeStyle='rgba(0,0,0,.9)';g.lineWidth=2.5;g.beginPath();g.moveTo(cx-R,cy);g.lineTo(cx-12,cy);g.moveTo(cx+12,cy);g.lineTo(cx+R,cy);g.moveTo(cx,cy-R);g.lineTo(cx,cy-12);g.moveTo(cx,cy+12);g.lineTo(cx,cy+R);g.stroke();
  g.lineWidth=7;g.beginPath();g.moveTo(cx-R,cy);g.lineTo(cx-R*.62,cy);g.moveTo(cx+R*.62,cy);g.lineTo(cx+R,cy);g.moveTo(cx,cy+R*.62);g.lineTo(cx,cy+R);g.stroke();g.fillStyle='#ff2d2d';g.beginPath();g.arc(cx,cy,3.5,0,7);g.fill()}
function darkness(a,holes){if(a<=0)return;if(!dk){dk=document.createElement('canvas');dk.width=750;dk.height=430}const d=dk.getContext('2d');d.setTransform(.5,0,0,.5,0,0);d.globalCompositeOperation='source-over';d.clearRect(0,0,1500,860);d.fillStyle=`rgba(3,5,16,${.965*a})`;d.fillRect(0,E.TOP-14,1500,860);d.globalCompositeOperation='destination-out';
  for(const [x,y,r,al] of holes){if(r<2||al<=0)continue;const gr=d.createRadialGradient(x,y,r*.25,x,y,r);gr.addColorStop(0,`rgba(0,0,0,${Math.min(1,al)})`);gr.addColorStop(1,'rgba(0,0,0,0)');d.fillStyle=gr;d.beginPath();d.arc(x,y,r,0,7);d.fill()}d.globalCompositeOperation='source-over';g.drawImage(dk,0,0,1500,860)}
function glint(x,y,a,col){if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle=col||'#e4ffe8';g.translate(x,y);g.beginPath();for(let i=0;i<8;i++){const r=i%2?3:13,an=i*Math.PI/4;g.lineTo(Math.cos(an)*r,Math.sin(an)*r)}g.closePath();g.fill();g.restore()}
const AIM=[[11,560,330],[12.4,820,300],[13.3,1010,340],[14.4,745,455],[19,745,455]];
function forestWorld(t){g.drawImage(forest,0,0);covers(FS);h.flush();const bl=(t%2.2)<.15?0:1;g.fillStyle=`rgba(255,60,60,${bl})`;for(const dx of [-12,12]){g.beginPath();g.ellipse(810+dx,300,6,4,0,0,7);g.fill()}}
function scenes(t){h.clip();
  if(t<T4){h.cam(760,540,1.45);cityWorld(t);const a=dark(t),gl=t>FLASH?1:0;
    const holes=LAMPS.map(([x,y,r])=>[x,y,r*.85,.36]);h.FR.forEach(c=>{const p=friend(c,t);holes.push([p[0],p[1]-60,95,.6])});
    if(t>FLASH&&t<FLASH+1.6){const k=t-FLASH;holes.push([DK[0]+30,DK[1]-60,300,(k<.1?k/.1:k>1.2?(1.6-k)/.4:1)*1.15])}
    if(t>SHOT&&t<SHOT+.4){const p=HIDE.girl;holes.push([p[0],p[1]-70,180,1-(t-SHOT)/.4])}
    darkness(a,holes);
    if(t>FLASH&&t<FLASH+.3){g.fillStyle=`rgba(255,250,225,${.6*(1-(t-FLASH)/.3)})`;g.beginPath();g.arc(DK[0]+30,DK[1]-60,320,0,7);g.fill()}
    if(t>7&&t<8.4)h.say(TXT.click,SW[0],SW[1]-150,t,7,30,'#fff','#2f7bff');
    if(t>7.6&&t<9.4)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo('exclamation',p[0],p[1]-240,1*pop(t,7.6+i*.08))});
    if(t>7.8&&t<9.6)h.say(TXT.oops,760,820,t,7.8,32,'#fff','#7b3fe4');
    if(t>13.2&&t<13.8)glint(DK[0]-8,DK[1]-60,1-Math.abs(t-13.5)/.3);
    if(t>15.5&&t<FLASH){const k=seg(t,15.5,FLASH),p=HIDE.girl,x=lerp(p[0]+30,DK[0]+30,k),y=lerp(p[1]-90,DK[1]-60,k)-Math.sin(k*Math.PI)*220;g.fillStyle='#2e3a2a';g.strokeStyle='#2b1b30';g.lineWidth=2;g.beginPath();g.arc(x,y,11,0,7);g.fill();g.stroke();g.fillStyle=(t*10|0)%2?'#ff4040':'#ffd040';g.beginPath();g.arc(x+5,y-9,4,0,7);g.fill()}
    if(t>SHOT&&t<SHOT+.2){const p=HIDE.girl;g.strokeStyle=`rgba(255,232,150,${1-(t-SHOT)/.2})`;g.lineWidth=4;g.beginPath();g.moveTo(p[0]+70,p[1]-62);g.lineTo(DK[0]+5,DK[1]-95);g.stroke();g.fillStyle='#fff3b0';g.beginPath();g.arc(p[0]+80,p[1]-62,18,0,7);g.fill()}
    if(t>11&&t<T3){const k=pop(t,11),a2=AIM,p=path(t,a2.map(q=>[q[0],q[1],q[2]])),R=170*Math.min(1,k);if(R>2)scope(t,p[0],p[1],R,cityWorld)}
    if(t>FLASH+.1&&t<SHOT+.6)h.say(TXT.there,DK[0]+20,DK[1]-330,t,FLASH+.1,36,'#ffc531','#e8412c');
    if(t>SHOT&&t<SHOT+1)h.say(TXT.bang,HIDE.girl[0]+40,HIDE.girl[1]-280,t,SHOT,34,'#fff','#e8412c');
    if(t>SHOT+.1&&t<SHOT+1.1)h.say('🎯 +1',DK[0],DK[1]-250,t,SHOT+.1,30,'#ffc531','#5a2410');
    if(t>T3+1.4){const d=donkey(t);h.say(TXT.hide,d[0],d[1]-300,t,T3+1.4,28,'#fff','#e8412c');h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i%2?'laugh':'anger',p[0],p[1]-240,1*pop(t,T3+1.6+i*.08))})}
    if(t>8.3&&t<9.6){const d=donkey(t);h.emo('laugh',d[0],d[1]-250,1*pop(t,8.3))}}
  else{h.cam(760,520,1.45);forestWorld(t);darkness(1,[]);for(let i=0;i<18;i++){const x=h.rnd(i)*1500,y=180+h.rnd(i+30)*640,a=Math.max(0,Math.sin(t*1.7+i));g.fillStyle=`rgba(210,255,120,${a*.85})`;g.beginPath();g.arc(x+Math.sin(t+i)*8,y,3,0,7);g.fill()}
    const p=path(t,[[T4,420,420],[T4+1.8,810,330],[T5,810,330]]),R=170*pop(t,T4+.2);if(R>2)scope(t,p[0],p[1],R,forestWorld);
    if(t>T4+1.9)h.say('👀',p[0],p[1]-260,t,T4+1.9,60,'#fff','#e8412c')}
  g.restore();h.next(t)}
function icon(t){g.save();g.scale(1.5,1.5);h.hero('donkey',0,90,t,{});g.restore();g.lineWidth=22;g.strokeStyle='#050607';g.beginPath();g.arc(0,0,220,0,7);g.stroke();g.lineWidth=5;g.strokeStyle='#4dff7c';g.beginPath();g.arc(0,0,208,0,7);g.stroke();g.strokeStyle='rgba(0,0,0,.85)';g.lineWidth=5;g.beginPath();g.moveTo(-208,0);g.lineTo(-20,0);g.moveTo(20,0);g.lineTo(208,0);g.moveTo(0,-208);g.lineTo(0,-20);g.moveTo(0,20);g.lineTo(0,208);g.stroke();g.fillStyle='#ff2d2d';g.beginPath();g.arc(0,0,7,0,7);g.fill()}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).sniper={
 ru:{c1:'После пиццы друзья идут домой через ночной город…',c2:'Ослик выключил в городе весь свет! 😈',c3:'Ночной прицел! Где же он прячется? 🎯',c4:'Граната-вспышка! ВОТ ОН! 💥',c5:'Попался! «Я просто играл в прятки!» 😂',c6:'А в ночном лесу кто-то тоже смотрит в прицел… 👀',click:'ЩЁЛК!',oops:'ОЙ, ТЕМНО!',there:'ВОТ ОН!',bang:'БАХ!',hide:'ЭТО ПРЯТКИ!',
  next:'Продолжение следует… 🌲',tag:'🎯 Серия 14 · Ночной снайпер',title:'Ночной снайпер',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'After the pizza, the friends walk home through the night city…',c2:'The Donkey switched off all the lights in town! 😈',c3:'Night scope on! Where is he hiding? 🎯',c4:'Flash grenade! THERE HE IS! 💥',c5:'Gotcha! "I was just playing hide-and-seek!" 😂',c6:'But in the night forest someone else is looking through a scope… 👀',click:'CLICK!',oops:'UH-OH, DARK!',there:'THERE HE IS!',bang:'BANG!',hide:'HIDE & SEEK!',
  next:'To be continued… 🌲',tag:'🎯 Episode 14 · Night Sniper',title:'Night Sniper',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'אחרי הפיצה החברים הולכים הביתה דרך העיר בלילה…',c2:'החמור כיבה את כל האורות בעיר! 😈',c3:'כוונת לילה! איפה הוא מתחבא? 🎯',c4:'רימון הבזק! הנה הוא! 💥',c5:'נתפסת! "סתם שיחקתי מחבואים!" 😂',c6:'אבל ביער החשוך מישהו גם מסתכל בכוונת… 👀',click:'קליק!',oops:'אוי, חושך!',there:'הנה הוא!',bang:'בום!',hide:'מחבואים!',
  next:'המשך יבוא… 🌲',tag:'🎯 פרק 14 · צלף לילה',title:'צלף לילה',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
