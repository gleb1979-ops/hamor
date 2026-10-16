(window.EPISODES=window.EPISODES||{}).school=function(E,TXT,cv){const h=EPC(E,TXT,cv,{a:'#10202a',b:'#1a3040',dot:'180,220,255'}),g=h.g,{seg,ease,lerp,pop,path,T1,T2,T3,T4,T5}=h;
const map=h.floor('school');
function chair(x,y,pin){g.save();g.translate(x,y);E.rr(g,-26,-50,52,12,4);E.sh(g,'#a0662e',3);E.rr(g,-26,-90,52,40,6);E.sh(g,'#b8793a',3);g.fillStyle='#6b4423';g.fillRect(-24,-38,6,38);g.fillRect(18,-38,6,38);
  if(pin){g.fillStyle='#d32f2f';g.beginPath();g.arc(0,-56,7,0,7);g.fill();g.strokeStyle='#888';g.lineWidth=3;g.beginPath();g.moveTo(0,-56);g.lineTo(0,-46);g.stroke()}g.restore()}
// teacher path: [t,x,y,face]
const TP=[[0,700,330,1],[4,760,330,1],[5.5,800,320,-1],[8.2,840,330,-1],[8.6,840,330,-1],[11,900,330,1],[12,960,330,1],[13.5,880,330,1],[15,960,330,1],[16.5,900,330,1],[16.8,900,330,-1],[19,860,340,-1]];
const KICK={girl:12.4,tall:13.9,nerd:15.4};
function friend(c,t){const i=h.FR.indexOf(c),base=[[560,700],[660,740],[760,700],[860,740]][i];const enter=[[0,base[0],1000],[3.6,base[0],base[1]]];
  if(t<T2)return path(t,enter);if(c==='fat'){if(t<16.8)return path(t,[[T2,base[0],base[1]],[16,780,560]]);return path(t,[[16.8,780,560],[18,1180,250,1],[22,1180,250,-1]])}
  const k=KICK[c];const back=[k-1.2,base[0],base[1]],near=[k-.15,0,0];const tp=path(k,TP);return path(t,[[T2+.3,base[0],base[1]],[k-.9,base[0],base[1]],[k-.12,tp[0]-60,tp[1]+20,1],[k+.5,tp[0]-60,tp[1]+20,1],[k+1.4,base[0],base[1]-120]])}
function teacherSt(t){if(t>8.6&&t<9.8)return 2;for(const k of Object.values(KICK))if(t>k&&t<k+.9)return 2;if(t>16.8&&t<18)return 1;if(t>T3&&t<T4)return 2;return 0}
function scenes(t){h.clip();h.cam(lerp(760,800,seg(t,0,4)),500,2.0);g.drawImage(map,0,0);
  const pin=t>7&&t<8.6;h.add(300,()=>chair(840,350,pin));
  const tp=path(t,TP),st=teacherSt(t),sit=t>8.2&&t<8.6;
  h.add(tp[1],()=>E.drawTeacher(g,{k:'teach',x:tp[0],y:tp[1]-(st===2?0:0)+(sit?12:0),a:tp[3]<0?Math.PI:0,st,moving:tp[2]},tp[2]?t:0));
  h.FR.forEach((c,i)=>{const p=friend(c,t);const cor=c==='fat'&&t>16.8;h.add(p[1],()=>h.hero(c,p[0],p[1],t+i*.3,{mv:p[2],face:p[3],stun:cor&&t<17.6}))});
  const dk=path(t,[[0,960,980,-1],[4,960,720,-1],[5.8,960,720],[7,860,380,-1],[7.5,860,380],[8,1010,460,1],[T3,1010,460,-1],[22,1000,500,-1]]);
  h.add(dk[1],()=>h.hero('donkey',dk[0],dk[1],t,{mv:dk[2],face:dk[3]}));
  if(t>T5-3.5){const p=path(t,[[T4,420,300,1],[T4+1,560,380,1]]);h.add(p[1],()=>E.drawTeacher(g,{k:'pe',x:p[0],y:p[1],a:0,st:t>T4+1.2?1:0,moving:p[2]},t))}
  h.flush();
  // overlays
  if(t>1&&t<5.4)h.emo('anger',tp[0],tp[1]-300,1.4*pop(t,1));
  if(t>7&&t<8.6)h.emo('laugh',dk[0],dk[1]-250,1.3*pop(t,7.1));
  if(t>8.6&&t<10.8)h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo('laugh',p[0],p[1]-250,1.2*pop(t,8.8+i*.07))});
  for(const [c,k] of Object.entries(KICK))if(t>k-.05&&t<k+.6){const tp2=path(k,TP);g.fillStyle='#ffe14d';for(let j=0;j<6;j++){const a=j/6*6.28,r=30+seg(t,k,k+.6)*50;E.star(g,tp2[0]-30+Math.cos(a)*r,tp2[1]-60+Math.sin(a)*r*.6,7);g.fill()}h.say(TXT.kick,tp2[0]-110,tp2[1]-200,t,k,26,'#ffffff','#e8412c',-.15)}
  if(t>16.8&&t<18.6){const p=friend('fat',t);h.say(TXT.corner,p[0],p[1]-270,t,16.9,28,'#ffffff','#7b3fe4')}
  if(t>T3&&t<T4){h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo(i===1?'faceSad':'laugh',p[0],p[1]-250,1.2*pop(t,T3+.2+i*.08))});for(let i=0;i<14;i++){const k=(t-T3)*.6+h.rnd(i);g.save();g.translate(520+h.rnd(i+3)*520,180+((k*300)%560));g.rotate(t*2+i);g.fillStyle='#fff';g.fillRect(-14,-18,28,36);g.strokeStyle='#9ab';g.lineWidth=2;g.strokeRect(-14,-18,28,36);g.restore()}}
  if(t>T4+1.2){h.say(TXT.whistle,560,120,t,T4+1.2,30,'#ffffff','#2f7bff');h.FR.forEach((c,i)=>{const p=friend(c,t);h.emo('exclamation',p[0],p[1]-250,1.2*pop(t,T4+1.5+i*.07))})}
  g.restore();
  if(t>T2&&t<T4){const n=Object.values(KICK).filter(k=>t>k).length;h.counter(t,[{label:'🦶 '+n},{label:'😈 '+(t>8.6?1:0)}])}
  h.next(t)}
function icon(t){h.text('🦶',0,-40,180,'#fff',{sc:'rgba(0,0,0,0)'})}
return {len:h.LEN,endAt:T5,render:t=>h.render(t,scenes,h.CAPS,icon)}};
(window.EPISODE_TXT=window.EPISODE_TXT||{}).school={
 ru:{c1:'Утро. Контрольная… а учительница очень строгая!',c2:'Ослик подложил кнопку на стул 😈',c3:'Пока учитель не смотрит — тайный пинок!',c4:'Ой! Попался — марш в угол!',c5:'Урок сорван! 😆',c6:'«Все на стадион — физкультура!»',kick:'ПИНОК!',corner:'В УГОЛ!',whistle:'ФИИИТЬ!',
  next:'Продолжение следует… ⚽',tag:'🦶 Серия 3 · Teacher Kick',title:'Teacher Kick',cta:'Играй с друзьями — бесплатно, без скачивания!',url:'games.tagshim.com'},
 en:{c1:'Morning. Test day… and the teacher is SO strict!',c2:'The Donkey put a pin on her chair 😈',c3:'When the teacher looks away — a sneaky kick!',c4:'Oops! Caught — go stand in the corner!',c5:'Class is ruined! 😆',c6:'"Everyone to the stadium — PE time!"',kick:'KICK!',corner:'CORNER!',whistle:'TWEEET!',
  next:'To be continued… ⚽',tag:'🦶 Episode 3 · Teacher Kick',title:'Teacher Kick',cta:'Play with friends — free, no download!',url:'games.tagshim.com'},
 he:{c1:'בוקר. מבחן… והמורה ממש קשוחה!',c2:'החמור שם נעץ על הכיסא 😈',c3:'כשהמורה לא מסתכלת — בעיטה בסתר!',c4:'אופס! נתפסת — לפינה!',c5:'השיעור התפוצץ! 😆',c6:'"כולם לאצטדיון — שיעור ספורט!"',kick:'בעיטה!',corner:'לפינה!',whistle:'פריייי!',
  next:'המשך יבוא… ⚽',tag:'🦶 פרק 3 · Teacher Kick',title:'Teacher Kick',cta:'שחקו עם חברים — בחינם, בלי הורדה!',url:'games.tagshim.com'}};
