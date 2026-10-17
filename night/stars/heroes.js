/* Tagshim Night heroes art for Street Stars (2D canvas, used as 3D billboards and card portraits) */
(function(){
function nightArt(g){const NOUT='#1d1226';
const sh=(f,lw=4)=>{g.fillStyle=f;g.fill();g.lineWidth=lw;g.strokeStyle=NOUT;g.lineJoin='round';g.stroke()};
const rr=(x,y,w,h,r)=>{g.beginPath();g.roundRect(x,y,w,h,r)};
const circ=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,7)};
const ell=(x,y,a,b,r=0)=>{g.beginPath();g.ellipse(x,y,a,b,r,0,7)};
function limb(x1,y1,x2,y2,w,col){g.lineCap='round';g.strokeStyle=NOUT;g.lineWidth=w+6;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.strokeStyle=col;g.lineWidth=w;g.stroke()}
function eye(x,y,r,px=0,py=0,lid=0){ell(x,y,r,r*1.15);sh('#fff',3);g.fillStyle='#1d1226';circ(x+px*r*.35,y+py*r*.35,r*.55);g.fill();g.fillStyle='#fff';circ(x+px*r*.35+r*.2,y+py*r*.35-r*.25,r*.18);g.fill();if(lid){g.fillStyle=NOUT;g.beginPath();g.moveTo(x-r*1.2,y-r*1.4);g.lineTo(x+r*1.2,y-r*(1.4-lid));g.lineTo(x+r*1.2,y-r*.2);g.lineTo(x-r*1.2,y-r*.2);g.closePath();g.save();ell(x,y,r,r*1.15);g.clip();g.fillStyle='rgba(0,0,0,0)';g.restore()}}
function brow(x,y,w,a){g.strokeStyle=NOUT;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(x-w,y-a);g.lineTo(x+w,y+a);g.stroke()}
function grin(x,y,w,h,teeth){g.beginPath();g.moveTo(x-w,y);g.quadraticCurveTo(x,y+h*2,x+w,y);g.closePath();sh('#8a1f2c',3);if(teeth){g.save();g.clip();g.fillStyle='#fff';g.fillRect(x-w,y-2,w*2,h*.55);g.restore()}}
function sneaker(x,y,col,s=1,f=1){g.save();g.translate(x,y);g.scale(s*f,s);g.beginPath();g.moveTo(-14,0);g.lineTo(-14,-16);g.quadraticCurveTo(-4,-22,6,-14);g.quadraticCurveTo(26,-10,28,0);g.closePath();sh(col,3.5);g.fillStyle='#fff';g.fillRect(-14,-5,42,5);g.strokeStyle=NOUT;g.lineWidth=2;g.strokeRect(-14,-5,42,5);g.restore()}
function shadow(w=70){g.fillStyle='rgba(0,0,0,.35)';ell(0,4,w,14);g.fill()}
const D={};
D.banana=()=>{shadow(55);limb(-14,-70,-24,-8,11,'#f7d23c');limb(14,-70,22,-8,11,'#f7d23c');sneaker(-26,-4,'#1d1d24');sneaker(24,-4,'#1d1d24');
 g.beginPath();g.moveTo(-18,-60);g.bezierCurveTo(-55,-130,-40,-220,10,-262);g.bezierCurveTo(25,-250,30,-238,22,-226);g.bezierCurveTo(-8,-190,8,-110,30,-60);g.quadraticCurveTo(6,-46,-18,-60);sh('#ffd84a');
 g.fillStyle='rgba(200,150,0,.35)';g.beginPath();g.moveTo(10,-226);g.bezierCurveTo(-8,-190,8,-110,30,-60);g.lineTo(18,-58);g.bezierCurveTo(-2,-110,-12,-180,6,-222);g.fill();
 g.beginPath();g.moveTo(8,-262);g.lineTo(16,-282);g.lineTo(26,-276);g.lineTo(20,-254);g.closePath();sh('#6b4a1f',3);
 rr(-44,-196,86,26,8);sh('#1d1d24',3);g.fillStyle='#e8412c';g.fillRect(-44,-188,86,6);g.beginPath();g.moveTo(-44,-188);g.quadraticCurveTo(-80,-200,-92,-170);g.quadraticCurveTo(-72,-182,-44,-176);g.closePath();sh('#1d1d24',3);
 eye(-16,-183,9,1,0);eye(14,-183,9,1,0);brow(-16,-197,10,4);brow(14,-197,10,-4);
 g.beginPath();g.moveTo(-10,-150);g.quadraticCurveTo(4,-140,16,-152);g.lineWidth=4;g.strokeStyle=NOUT;g.stroke();
 limb(-30,-130,-62,-150,10,'#ffd84a');limb(30,-120,64,-140,10,'#ffd84a');
 g.save();g.translate(-62,-150);g.rotate(-.6);rr(-4,-60,8,64,3);sh('#c9d2dc',3);rr(-10,-2,20,8,3);sh('#6b4a1f',2);g.restore();
 g.save();g.translate(64,-140);g.rotate(.6);rr(-4,-60,8,64,3);sh('#c9d2dc',3);rr(-10,-2,20,8,3);sh('#6b4a1f',2);g.restore()};
D.burgerdino=()=>{shadow(80);g.beginPath();g.moveTo(40,-60);g.quadraticCurveTo(110,-60,130,-20);g.quadraticCurveTo(100,-40,50,-30);g.closePath();sh('#4fb84f');
 for(const x of [-30,26]){rr(x-12,-70,26,70,10);sh('#4fb84f');for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-12+i*9,0);g.lineTo(x-8+i*9,8);g.lineTo(x-4+i*9,0);sh('#fff',2)}}
 ell(0,-80,74,28);sh('#e2a04a');ell(0,-104,80,14);sh('#ffc531');g.beginPath();for(let x=-80;x<=80;x+=16)g.lineTo(x,-118+((x/16)%2?10:0));g.lineTo(80,-104);g.lineTo(-80,-104);g.closePath();sh('#5cc560',3);
 ell(0,-122,78,20);sh('#7a3f1f');
 g.beginPath();g.moveTo(-82,-150);g.quadraticCurveTo(-80,-250,0,-252);g.quadraticCurveTo(80,-250,82,-150);g.closePath();sh('#f0a845');
 g.fillStyle='#fff6d0';for(const [x,y] of [[-40,-200],[-10,-222],[24,-210],[50,-185],[-56,-175]]){ell(x,y,6,3,.5);g.fill()}
 g.fillStyle='#fff';for(let x=-70;x<=70;x+=14){g.beginPath();g.moveTo(x,-148);g.lineTo(x+7,-132);g.lineTo(x+14,-148);g.fill()}g.strokeStyle=NOUT;g.lineWidth=2;
 eye(-30,-206,14,1,.3);eye(28,-206,14,1,.3);brow(-30,-226,14,-5);brow(28,-226,14,5);
 limb(-70,-110,-100,-90,9,'#4fb84f');limb(70,-110,100,-92,9,'#4fb84f');for(const [x,y] of [[-104,-88],[104,-90]]){circ(x,y,7);sh('#4fb84f',3)}};
D.cattoaster=()=>{shadow(70);for(const x of [-40,40]){limb(x,-30,x,-6,12,'#ff9f2e');ell(x+4,-4,14,7);sh('#ff9f2e',3)}
 g.beginPath();g.moveTo(70,-60);g.quadraticCurveTo(130,-80,110,-150);g.lineWidth=18;g.strokeStyle=NOUT;g.stroke();g.lineWidth=12;g.strokeStyle='#ff9f2e';g.stroke();
 rr(-72,-150,144,124,26);sh('#cfd8e2');g.fillStyle='rgba(255,255,255,.55)';rr(-62,-140,22,96,10);g.fill();rr(30,-128,40,10,4);sh('#3a3a44',2.5);circ(-40,-60,8);sh('#e8412c',2.5);circ(-14,-60,8);sh('#5cc560',2.5);
 for(const x of [-30,8]){rr(x-4,-160,30,16,4);sh('#3a3a44',2)}
 for(const [x,y,r] of [[-60,-262,-.3],[40,-280,.4]]){g.save();g.translate(x,y);g.rotate(r);g.beginPath();g.moveTo(-22,20);g.lineTo(-22,-12);g.quadraticCurveTo(-22,-28,0,-28);g.quadraticCurveTo(22,-28,22,-12);g.lineTo(22,20);g.closePath();sh('#e8b05a');g.fillStyle='#f6dfa8';rr(-15,-18,30,32,8);g.fill();g.restore();g.strokeStyle='#ffc531';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-10+i*10,y+40);g.lineTo(x-14+i*10,y+58);g.stroke()}}
 g.beginPath();g.moveTo(-52,-176);g.lineTo(-44,-226);g.lineTo(-18,-196);g.closePath();sh('#ff9f2e');g.beginPath();g.moveTo(52,-176);g.lineTo(44,-226);g.lineTo(18,-196);g.closePath();sh('#ff9f2e');
 ell(0,-172,58,40);sh('#ff9f2e');g.fillStyle='#e07f12';for(const x of [-14,0,14]){g.fillRect(x-3,-212,6,14)}ell(0,-160,26,16);sh('#fff3e0',2);
 eye(-22,-180,10,0,.2);eye(22,-180,10,0,.2);g.fillStyle='#ff8fa3';g.beginPath();g.moveTo(-5,-166);g.lineTo(5,-166);g.lineTo(0,-160);g.fill();
 g.strokeStyle=NOUT;g.lineWidth=2;for(const d of [-1,1])for(const a of [-1,1]){g.beginPath();g.moveTo(d*20,-160+a*3);g.lineTo(d*58,-164+a*8);g.stroke()}
 g.beginPath();g.moveTo(-8,-154);g.quadraticCurveTo(0,-148,8,-154);g.stroke()};
D.shark=()=>{shadow(60);limb(-18,-80,-24,-14,13,'#5f87b8');limb(18,-80,26,-14,13,'#5f87b8');sneaker(-30,-6,'#e8412c',1.5);sneaker(28,-6,'#e8412c',1.5);
 g.beginPath();g.moveTo(0,-292);g.bezierCurveTo(70,-270,72,-120,46,-72);g.quadraticCurveTo(0,-56,-46,-72);g.bezierCurveTo(-72,-120,-70,-270,0,-292);sh('#6f98c9');
 g.fillStyle='#f2f6fb';g.beginPath();g.moveTo(-36,-200);g.quadraticCurveTo(0,-176,36,-200);g.bezierCurveTo(44,-140,30,-90,0,-74);g.bezierCurveTo(-30,-90,-44,-140,-36,-200);g.fill();
 g.beginPath();g.moveTo(-6,-288);g.lineTo(-26,-330);g.lineTo(22,-286);g.closePath();sh('#5f87b8');
 rr(-44,-286,88,26,12);sh('#ffc531',3);g.beginPath();g.moveTo(-44,-266);g.lineTo(-84,-262);g.lineTo(-84,-254);g.lineTo(-40,-260);g.closePath();sh('#ffc531',3);
 eye(-22,-232,11,.5,0);eye(22,-232,11,.5,0);brow(-22,-250,11,4);brow(22,-250,11,-4);
 g.beginPath();g.moveTo(-34,-196);g.quadraticCurveTo(0,-160,34,-196);g.quadraticCurveTo(0,-180,-34,-196);sh('#8a1f2c',3);g.fillStyle='#fff';for(let x=-28;x<=24;x+=9){g.beginPath();g.moveTo(x,-193+Math.abs(x)*.25);g.lineTo(x+4,-183);g.lineTo(x+8,-192+Math.abs(x)*.25);g.fill()}
 g.beginPath();g.moveTo(-60,-150);g.lineTo(-100,-110);g.lineTo(-54,-118);g.closePath();sh('#5f87b8');g.beginPath();g.moveTo(60,-150);g.lineTo(100,-110);g.lineTo(54,-118);g.closePath();sh('#5f87b8');
 g.strokeStyle='#4a6f9c';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.moveTo(-50+i*7,-170);g.lineTo(-46+i*7,-150);g.stroke()}};
D.dumpling=()=>{shadow(70);limb(-26,-50,-30,-10,12,'#f3e4c6');limb(26,-50,30,-10,12,'#f3e4c6');sneaker(-34,-4,'#2f7bff',1.1);sneaker(32,-4,'#2f7bff',1.1);
 g.beginPath();g.moveTo(-90,-170);g.quadraticCurveTo(-110,-60,-60,-40);g.lineTo(60,-40);g.quadraticCurveTo(110,-60,90,-170);g.lineTo(60,-60);g.lineTo(-60,-60);g.closePath();sh('#e8412c');
 g.beginPath();g.moveTo(-86,-70);g.quadraticCurveTo(-96,-200,0,-206);g.quadraticCurveTo(96,-200,86,-70);g.quadraticCurveTo(0,-38,-86,-70);sh('#fbf3e2');
 g.beginPath();g.moveTo(-80,-140);for(let i=0;i<=8;i++){const x=-80+i*20;g.quadraticCurveTo(x+10,-232+(i%2?6:0),x+20,-140-Math.sin(i/8*Math.PI)*58)}g.lineWidth=0;
 g.beginPath();g.moveTo(-74,-146);g.quadraticCurveTo(0,-250,74,-146);g.quadraticCurveTo(0,-200,-74,-146);sh('#f3e4c6',3);g.strokeStyle='#d8c39a';g.lineWidth=3;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*18,-176-Math.cos(i/3)*16);g.lineTo(i*16,-150);g.stroke()}
 rr(-52,-140,104,28,12);sh('#2f7bff',3);eye(-24,-126,10,0,0);eye(24,-126,10,0,0);
 grin(0,-96,22,12,1);rr(-20,-80,40,30,6);sh('#ffc531',3);g.fillStyle='#e8412c';g.font='900 26px Rubik';g.textAlign='center';g.textBaseline='middle';g.fillText('П',0,-64);
 limb(-70,-100,-110,-150,11,'#f3e4c6');limb(70,-100,108,-150,11,'#f3e4c6');circ(-112,-154,12);sh('#2f7bff',3);circ(110,-154,12);sh('#2f7bff',3)};
D.broccoli=()=>{shadow(55);limb(-14,-60,-20,-8,11,'#7fbf5a');limb(14,-60,22,-8,11,'#7fbf5a');sneaker(-24,-4,'#111');sneaker(24,-4,'#111');
 rr(-26,-140,52,90,20);sh('#9fd66a');g.strokeStyle='#7fbf5a';g.lineWidth=3;g.beginPath();g.moveTo(-6,-130);g.lineTo(-8,-60);g.moveTo(8,-130);g.lineTo(10,-60);g.stroke();
 for(const [x,y,r] of [[-60,-170,34],[60,-170,34],[-40,-215,38],[40,-215,38],[0,-240,40],[0,-180,40],[-70,-205,26],[70,-205,26]]){circ(x,y,r);sh('#3f9b3f',4)}
 g.fillStyle='#4fb84f';for(const [x,y,r] of [[-40,-215,20],[40,-215,20],[0,-240,22],[0,-180,22]]){circ(x-6,y-6,r*.6);g.fill()}
 rr(-50,-200,100,30,12);sh('#111',3);g.fillStyle='#4f8cff';rr(-44,-196,40,22,8);g.fill();rr(4,-196,40,22,8);g.fill();g.fillStyle='#fff';g.fillRect(-38,-192,8,4);g.fillRect(10,-192,8,4);
 g.beginPath();g.moveTo(-18,-158);g.quadraticCurveTo(0,-140,22,-162);g.lineWidth=5;g.strokeStyle=NOUT;g.stroke();
 g.save();g.translate(20,-100);g.rotate(-.5);g.beginPath();g.ellipse(-20,0,40,30,0,0,7);sh('#e8412c');circ(-22,0,9);sh('#1d1226',2);rr(14,-7,110,14,4);sh('#6b4a1f',3);rr(118,-14,26,28,6);sh('#1d1226',3);g.restore();
 limb(-20,-110,-10,-98,10,'#9fd66a');limb(20,-112,52,-130,10,'#9fd66a');
 g.fillStyle='#ffc531';g.font='900 34px Rubik';g.fillText('♪',-90,-120);g.fillText('♫',84,-250)};
D.roboduck=()=>{shadow(65);for(const x of [-30,30]){limb(x,-50,x,-10,8,'#9aa4b0');ell(x+8,-6,20,7);sh('#ff9f2e',3)}
 rr(-96,-170,40,90,12);sh('#8c96a3');for(const x of [-86,-66]){g.fillStyle='#ffb02e';g.beginPath();g.moveTo(x-8,-80);g.quadraticCurveTo(x,-30,x+8,-80);g.fill();g.fillStyle='#fff3a0';g.beginPath();g.moveTo(x-4,-80);g.quadraticCurveTo(x,-54,x+4,-80);g.fill()}
 ell(0,-110,82,64);sh('#ffd21f');g.fillStyle='rgba(255,255,255,.4)';ell(-30,-136,26,12,-.4);g.fill();
 rr(-40,-130,80,40,10);sh('#c9d2dc',3);g.fillStyle=NOUT;for(const [x,y] of [[-32,-122],[32,-122],[-32,-98],[32,-98]]){circ(x,y,3);g.fill()}
 circ(30,-210,52);sh('#ffd21f');g.beginPath();g.moveTo(66,-206);g.quadraticCurveTo(112,-210,104,-186);g.quadraticCurveTo(84,-178,64,-186);g.closePath();sh('#ff8c1a');
 rr(-6,-236,86,30,14);sh('#1d1226',3);g.fillStyle='#4af0ff';rr(2,-230,70,18,9);g.fill();g.fillStyle='#fff';g.fillRect(10,-226,18,4);
 g.strokeStyle='#9aa4b0';g.lineWidth=5;g.beginPath();g.moveTo(30,-262);g.lineTo(30,-292);g.stroke();circ(30,-296,8);sh('#e8412c',3);
 limb(-50,-120,-70,-70,9,'#ffd21f')};
D.cactus=()=>{shadow(60);rr(-50,-70,100,70,10);sh('#c96b3a');g.fillStyle='#e08a5a';g.fillRect(-50,-70,100,14);g.strokeStyle=NOUT;g.lineWidth=4;g.strokeRect(-50,-70,100,14);
 rr(-36,-240,72,180,36);sh('#3f9b3f');g.strokeStyle='#2f7d32';g.lineWidth=3;for(const x of [-16,0,16]){g.beginPath();g.moveTo(x,-230);g.lineTo(x,-74);g.stroke()}
 g.strokeStyle=NOUT;g.lineWidth=2;for(let i=0;i<14;i++){const x=(i%2?-1:1)*(28+((i*7)%10)),y=-220+i*11;g.beginPath();g.moveTo(x,y);g.lineTo(x+(x>0?8:-8),y-4);g.stroke()}
 g.beginPath();g.moveTo(-36,-150);g.lineTo(-74,-150);g.quadraticCurveTo(-84,-150,-84,-170);g.lineTo(-84,-196);g.lineWidth=30;g.lineCap='round';g.strokeStyle=NOUT;g.stroke();g.lineWidth=22;g.strokeStyle='#3f9b3f';g.stroke();
 g.beginPath();g.moveTo(36,-130);g.lineTo(74,-130);g.quadraticCurveTo(84,-130,84,-150);g.lineTo(84,-176);g.lineWidth=30;g.strokeStyle=NOUT;g.stroke();g.lineWidth=22;g.strokeStyle='#3f9b3f';g.stroke();
 for(const [x,y] of [[-84,-212],[84,-192]]){ell(x,y,24,26);sh('#e8412c');g.fillStyle='#fff';rr(x-16,y+12,32,10,4);g.fill();g.fillStyle='#ffffff66';circ(x-8,y-10,6);g.fill()}
 for(let i=0;i<6;i++){const a=i/6*6.283;ell(Math.cos(a)*12,-252+Math.sin(a)*10,10,6,a);sh('#ff6fae',2)}circ(0,-252,7);sh('#ffc531',2);
 eye(-14,-196,9,.3,0);eye(14,-196,9,.3,0);brow(-14,-210,9,4);brow(14,-210,9,-4);grin(0,-172,14,9,1)};
D.icecream=()=>{shadow(50);limb(-12,-40,-18,-8,10,'#e8b05a');limb(12,-40,20,-8,10,'#e8b05a');sneaker(-22,-4,'#ff6fae');sneaker(22,-4,'#ff6fae');
 g.beginPath();g.moveTo(-50,-140);g.lineTo(50,-140);g.lineTo(0,-40);g.closePath();sh('#e8b05a');g.save();g.clip();g.strokeStyle='#c98a3a';g.lineWidth=3;for(let i=-6;i<6;i++){g.beginPath();g.moveTo(i*16,-150);g.lineTo(i*16+80,-40);g.moveTo(i*16,-150);g.lineTo(i*16-80,-40);g.stroke()}g.restore();
 g.beginPath();g.moveTo(-66,-140);g.quadraticCurveTo(-80,-250,0,-262);g.quadraticCurveTo(80,-250,66,-140);for(let x=66;x>=-66;x-=22){g.quadraticCurveTo(x-11,-110-(x%44?20:0),x-22,-140)}g.closePath();sh('#ff8fc0');
 g.fillStyle='#ffb3d6';ell(-26,-224,16,10,-.5);g.fill();
 for(const [x,y,col] of [[-30,-238,'#5cc560'],[20,-244,'#ffc531'],[40,-220,'#4f8cff'],[-44,-206,'#e8412c']]){rr(x,y,12,5,2);g.fillStyle=col;g.fill()}
 circ(10,-276,14);sh('#e8412c');g.beginPath();g.moveTo(10,-290);g.quadraticCurveTo(16,-310,30,-312);g.lineWidth=3;g.strokeStyle=NOUT;g.stroke();
 rr(-50,-206,100,30,12);sh('#7d3fe0',3);eye(-22,-191,10,.4,0);eye(22,-191,10,.4,0);grin(0,-162,16,10,1);
 limb(-44,-124,-78,-150,9,'#e8b05a');limb(44,-124,80,-110,9,'#e8b05a')};
D.pizza=()=>{g.fillStyle='rgba(0,0,0,.35)';ell(0,16,90,12);g.fill();rr(-90,-14,180,16,8);sh('#2f7bff',3);for(const x of [-60,60]){circ(x,8,11);sh('#ffc531',3)}
 limb(-20,-60,-30,-16,11,'#ffd27a');limb(20,-60,34,-16,11,'#ffd27a');sneaker(-36,-12,'#1d1d24');sneaker(36,-12,'#1d1d24');
 g.beginPath();g.moveTo(-86,-250);g.quadraticCurveTo(0,-286,86,-250);g.lineTo(0,-50);g.closePath();sh('#ffc94d');g.beginPath();g.moveTo(-90,-252);g.quadraticCurveTo(0,-292,90,-252);g.lineTo(84,-236);g.quadraticCurveTo(0,-272,-84,-236);g.closePath();sh('#d98c3a',4);
 g.fillStyle='rgba(232,65,44,.35)';g.beginPath();g.moveTo(-72,-236);g.quadraticCurveTo(0,-262,72,-236);g.lineTo(0,-70);g.closePath();g.fill();
 for(const [x,y] of [[-40,-210],[30,-216],[6,-140],[-10,-180]]){circ(x,y,12);sh('#c0392b',3);g.fillStyle='#e74c3c';circ(x-3,y-3,4);g.fill()}
 g.fillStyle='#ffd24a';g.beginPath();g.moveTo(-50,-250);g.quadraticCurveTo(-46,-226,-40,-242);g.fill();
 eye(-18,-182,10,.6,0);eye(16,-182,10,.6,0);grin(0,-150,16,10,1);
 g.beginPath();g.arc(0,-262,40,Math.PI,0);g.closePath();sh('#5cc560',3);g.beginPath();g.moveTo(-40,-262);g.lineTo(-74,-258);g.lineTo(-40,-252);sh('#5cc560',3);
 limb(-56,-200,-96,-220,9,'#ffd27a');limb(56,-200,96,-226,9,'#ffd27a')};
D.keeper=()=>{shadow(70);for(const x of [-26,26]){limb(x,-40,x,-8,12,'#7dff6a');ell(x+6,-4,16,7);sh('#1b1b24',3)}
 rr(-70,-190,140,150,34);sh('rgba(125,255,106,.85)');g.fillStyle='rgba(255,255,255,.45)';rr(-58,-178,30,70,14);g.fill();g.fillStyle='rgba(60,180,60,.35)';for(const [x,y] of [[30,-80],[-20,-60],[40,-150]]){circ(x,y,6);g.fill()}
 eye(-24,-140,13,0,.2);eye(24,-140,13,0,.2);brow(-24,-160,12,-4);brow(24,-160,12,4);grin(0,-104,22,12,1);
 limb(-66,-120,-104,-160,12,'#7dff6a');limb(66,-120,104,-160,12,'#7dff6a');for(const x of [-110,110]){ell(x,-170,26,28);sh('#ffc531',4);g.fillStyle='#fff8';ell(x-8,-180,8,6);g.fill()}
 rr(-40,-208,80,22,8);sh('#1b1b24',3);g.fillStyle='#ffc531';g.font='900 18px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('1',0,-197)};
return D}
const CACHE={};
function canvas(c,col){const k=c+'|'+col;if(CACHE[k])return CACHE[k];const W=300,H=380,s=document.createElement('canvas');s.width=W;s.height=H;const sg=s.getContext('2d');sg.translate(W/2,H-24);sg.scale(.95,.95);try{nightArt(sg)[c]()}catch(e){}
  const o=document.createElement('canvas');o.width=W;o.height=H;const g=o.getContext('2d');if(col){g.shadowColor=col;g.shadowBlur=22;g.drawImage(s,0,0);g.drawImage(s,0,0);g.shadowBlur=0}g.drawImage(s,0,0);return CACHE[k]=o}
window.HERO_ART={canvas,draw:(g,c)=>nightArt(g)[c]()};
})();
