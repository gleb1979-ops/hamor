/* Street Stars — 3D renderer (three.js). Game logic stays in game.js; this file only draws. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const W=1600,H=900,FX0=100,FX1=1500,FY0=200,FY1=850,CX=800,CY=525,GH=112;
const U=1/80;const wx=x=>(x-CX)*U,wz=y=>(y-CY)*U;
const FW=(FX1-FX0)*U,FD=(FY1-FY0)*U;
const MODEL={tino:'cappy',bryce:'jimmy',ayla:'kate',zane:'jennifer',bakari:'kyle',kai:'shiro',gk:'robert'};
const SKIN={cappy:'#f3c7a2',jimmy:'#f5c49b',kate:'#f6d0c3',jennifer:'#a9653e',kyle:'#f0b398',shiro:'#f7ddd3',robert:'#efa489'};
const SHIRTLESS={jimmy:1};
const KIT=[{j:'#18c9ec',s:'#11143a',so:'#18c9ec',gk:'#f3ff5a'},{j:'#ff3d8b',s:'#11143a',so:'#ff3d8b',gk:'#7dff6a'}];
const BOOT=['#1b1b24','#d9e2f2','#ffd23f','#ff5ad8'];


const R3D={ok:false,loading:true};window.R3D=R3D;
/* ---------- renderer & scene ---------- */
const cv=document.createElement('canvas');cv.id='cv3';Object.assign(cv.style,{position:'fixed',inset:'0',width:'100%',height:'100%',display:'none',zIndex:'0'});document.body.prepend(cv);
let rd;try{rd=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance'})}catch(e){R3D.loading=false;cv.remove();throw new Error('no webgl: 2D mode')}rd.outputColorSpace=THREE.SRGBColorSpace;rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;rd.toneMapping=THREE.ACESFilmicToneMapping;rd.toneMappingExposure=1.15;
const scene=new THREE.Scene();scene.fog=new THREE.Fog(0x0b0a24,26,70);
const cam=new THREE.PerspectiveCamera(36,1,.1,200);
function canvasTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t}
scene.background=canvasTex(4,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#05031a');gr.addColorStop(.6,'#1d1050');gr.addColorStop(1,'#3a1650');g.fillStyle=gr;g.fillRect(0,0,w,h)});
scene.add(new THREE.HemisphereLight(0xb9c4ff,0x2a1a40,1.25));
const sun=new THREE.DirectionalLight(0xfff4e0,2.6);sun.position.set(-4,12,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);const sc=sun.shadow.camera;sc.left=-11;sc.right=11;sc.top=8;sc.bottom=-8;sc.near=1;sc.far=40;sun.shadow.bias=-.0005;sun.shadow.normalBias=.02;scene.add(sun);scene.add(sun.target);
const rimC=new THREE.DirectionalLight(0x22e3ff,1.1);rimC.position.set(-10,4,-6);scene.add(rimC);const rimP=new THREE.DirectionalLight(0xff3d8b,1.1);rimP.position.set(10,4,-6);scene.add(rimP);
/* rooftop floor */
const roof=new THREE.Mesh(new THREE.PlaneGeometry(80,60),new THREE.MeshStandardMaterial({color:0x17162e,roughness:.95,map:canvasTex(512,512,(g,w,h)=>{g.fillStyle='#1a1934';g.fillRect(0,0,w,h);g.strokeStyle='#242246';g.lineWidth=3;for(let i=0;i<=w;i+=64){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(w,i);g.stroke()}})}));
roof.material.map.wrapS=roof.material.map.wrapT=THREE.RepeatWrapping;roof.material.map.repeat.set(20,15);roof.rotation.x=-Math.PI/2;roof.position.y=-.01;roof.receiveShadow=true;scene.add(roof);
/* pitch */
const pitchTex=canvasTex(2048,Math.round(2048*FD/FW),(g,w,h)=>{const n=12;for(let k=0;k<n;k++){g.fillStyle=k%2?'#1f8048':'#1c7542';g.fillRect(k*w/n,0,w/n+1,h)}
  for(let i=0;i<9000;i++){g.fillStyle=`rgba(${i%2?255:0},${i%2?255:30},${i%2?255:0},.035)`;g.fillRect(Math.random()*w,Math.random()*h,2,2)}
  const s=w/(FX1-FX0),L=v=>v*s;g.strokeStyle='rgba(255,255,255,.92)';g.lineWidth=L(5);g.strokeRect(L(7),L(7),w-L(14),h-L(14));g.beginPath();g.moveTo(w/2,L(7));g.lineTo(w/2,h-L(7));g.stroke();g.beginPath();g.arc(w/2,h/2,L(95),0,7);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(w/2,h/2,L(7),0,7);g.fill();
  for(const sd of [0,1]){const x0=sd?w-L(7):L(7),d=sd?-1:1;g.strokeRect(sd?x0-L(200):x0,h/2-L(220),L(200),L(440));g.strokeRect(sd?x0-L(85):x0,h/2-L(140),L(85),L(280));g.beginPath();g.arc(x0+d*L(150),h/2,L(6),0,7);g.fill()}
  const vg=g.createRadialGradient(w/2,h/2,h*.2,w/2,h/2,w*.6);vg.addColorStop(0,'rgba(255,255,255,.05)');vg.addColorStop(1,'rgba(0,0,20,.35)');g.fillStyle=vg;g.fillRect(0,0,w,h)});
const pitch=new THREE.Mesh(new THREE.PlaneGeometry(FW,FD),new THREE.MeshStandardMaterial({map:pitchTex,roughness:.9}));pitch.rotation.x=-Math.PI/2;pitch.receiveShadow=true;scene.add(pitch);
/* neon frame */
function neon(x,z,len,rot,col){const m=new THREE.Mesh(new THREE.BoxGeometry(len,.07,.07),new THREE.MeshBasicMaterial({color:col}));m.position.set(x,.04,z);m.rotation.y=rot;scene.add(m);
  const gl=new THREE.Mesh(new THREE.PlaneGeometry(len,.9),new THREE.MeshBasicMaterial({map:glowTex,color:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));gl.rotation.x=-Math.PI/2;gl.rotation.z=-rot;gl.position.set(x,.02,z);scene.add(gl)}
const glowTex=canvasTex(8,128,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.85)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,w,h)});
const ED=.35;neon(-FW/4,-FD/2-ED,FW/2+ED,0,0x22e3ff);neon(FW/4,-FD/2-ED,FW/2+ED,0,0xff3d8b);neon(-FW/4,FD/2+ED,FW/2+ED,0,0x22e3ff);neon(FW/4,FD/2+ED,FW/2+ED,0,0xff3d8b);
neon(-FW/2-ED,-FD/2+(FD/2-GH*U)/2-ED/2,FD/2-GH*U+ED,Math.PI/2,0x22e3ff);neon(-FW/2-ED,FD/2-(FD/2-GH*U)/2+ED/2,FD/2-GH*U+ED,Math.PI/2,0x22e3ff);neon(FW/2+ED,-FD/2+(FD/2-GH*U)/2-ED/2,FD/2-GH*U+ED,Math.PI/2,0xff3d8b);neon(FW/2+ED,FD/2-(FD/2-GH*U)/2+ED/2,FD/2-GH*U+ED,Math.PI/2,0xff3d8b);
/* cage fence */
const fenceTex=canvasTex(128,128,(g,w,h)=>{g.clearRect(0,0,w,h);g.strokeStyle='rgba(200,210,255,.55)';g.lineWidth=3;g.beginPath();g.moveTo(0,0);g.lineTo(w,h);g.moveTo(w,0);g.lineTo(0,h);g.stroke()});fenceTex.wrapS=fenceTex.wrapT=THREE.RepeatWrapping;
function fence(x,z,len,rot,hgt){const t=fenceTex.clone();t.needsUpdate=true;t.repeat.set(len/.45,hgt/.45);const m=new THREE.Mesh(new THREE.PlaneGeometry(len,hgt),new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide,depthWrite:false,color:0x9aa4ff}));m.position.set(x,hgt/2,z);m.rotation.y=rot;scene.add(m);
  const pm=new THREE.MeshStandardMaterial({color:0x3a3a6a,metalness:.6,roughness:.4});for(let i=0;i<=Math.round(len/2.4);i++){const p=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,hgt+.1,8),pm);const k=i/Math.round(len/2.4)-.5;p.position.set(x+Math.cos(rot)*k*len,hgt/2,z-Math.sin(rot)*k*len);p.castShadow=true;scene.add(p)}
  const rail=new THREE.Mesh(new THREE.BoxGeometry(len,.06,.06),pm);rail.position.set(x,hgt,z);rail.rotation.y=rot;scene.add(rail)}
fence(0,-FD/2-.75,FW+1.5,0,2.6);fence(-FW/2-.75,0,FD+1.5,Math.PI/2,2.6);fence(FW/2+.75,0,FD+1.5,Math.PI/2,2.6);fence(0,FD/2+.75,FW+1.5,0,.55);
/* goals */
const netTex=canvasTex(64,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=2;g.strokeRect(0,0,w,h)});netTex.wrapS=netTex.wrapT=THREE.RepeatWrapping;
function goal(side){const gx=side?FW/2:-FW/2,d=side?1:-1,gw=GH*2*U,gh=1.25,dep=.75,G=new THREE.Group();const pm=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.3,metalness:.2,emissive:side?0x501028:0x0a3a48});
  const post=(x,z)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,gh,12),pm);m.position.set(x,gh/2,z);m.castShadow=true;G.add(m)};post(gx,-gw/2);post(gx,gw/2);const cb=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,gw,12),pm);cb.rotation.x=Math.PI/2;cb.position.set(gx,gh,0);cb.castShadow=true;G.add(cb);
  const nm=(w2,h2)=>{const t=netTex.clone();t.needsUpdate=true;t.repeat.set(w2/.14,h2/.14);return new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide,depthWrite:false})};
  const back=new THREE.Mesh(new THREE.PlaneGeometry(gw,gh),nm(gw,gh));back.rotation.y=Math.PI/2;back.position.set(gx+d*dep,gh/2,0);G.add(back);
  const top=new THREE.Mesh(new THREE.PlaneGeometry(dep,gw),nm(dep,gw));top.rotation.x=-Math.PI/2;top.position.set(gx+d*dep/2,gh,0);G.add(top);
  for(const z of [-gw/2,gw/2]){const s=new THREE.Mesh(new THREE.PlaneGeometry(dep,gh),nm(dep,gh));s.position.set(gx+d*dep/2,gh/2,z);G.add(s)}scene.add(G)}
goal(0);goal(1);
/* skyline backdrop */
const sky=canvasTex(4096,1024,(g,w,h)=>{g.clearRect(0,0,w,h);for(let i=0;i<260;i++){g.fillStyle=`rgba(255,255,255,${.2+(i%5)*.15})`;g.fillRect((i*389+17)%w,(i*137+5)%(h*.45),3,3)}
  g.fillStyle='#fff6dc';g.shadowColor='#fff';g.shadowBlur=60;g.beginPath();g.arc(w*.78,h*.18,48,0,7);g.fill();g.shadowBlur=0;
  for(const [layer,col,hmin,hmax] of [[0,'#120e38',260,520],[1,'#0b0926',180,420]]){let x=-20,i=layer*7;while(x<w){const bw=110+((i*47)%150),bh=hmin+((i*61)%(hmax-hmin));g.fillStyle=col;g.fillRect(x,h-bh,bw,bh);
    for(let wy=h-bh+20;wy<h-10;wy+=30)for(let wx2=x+14;wx2<x+bw-18;wx2+=24){const q=(wx2*7+wy*13+i*3)%17;if(q<5){g.fillStyle=['#ffd36a','#22e3ff','#ff3d8b','#ffd36a','#b6ff3b'][q];g.globalAlpha=layer?.95:.55;g.fillRect(wx2,wy,11,15);g.globalAlpha=1}}x+=bw+8;i++}}
  const sign=(x,y,txt,col)=>{g.save();g.font='900 64px Rubik, Arial, sans-serif';const tw=g.measureText(txt).width+60;g.fillStyle='#07071a';g.fillRect(x-tw/2,y-46,tw,92);g.strokeStyle=col;g.lineWidth=7;g.shadowColor=col;g.shadowBlur=40;g.strokeRect(x-tw/2,y-46,tw,92);g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,x,y+4);g.restore()};
  sign(w*.25,h*.48,'TAGSHIM NIGHT','#b6ff3b');sign(w*.62,h*.56,'STREET STARS','#ff3d8b')});
const skyM=new THREE.Mesh(new THREE.PlaneGeometry(90,22),new THREE.MeshBasicMaterial({map:sky,transparent:true,fog:false}));skyM.position.set(0,9,-30);scene.add(skyM);
/* floodlights */
for(const [x,z] of [[-FW/2-1.3,-FD/2-1.3],[FW/2+1.3,-FD/2-1.3]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,6,8),new THREE.MeshStandardMaterial({color:0x3a3a6a,metalness:.5}));p.position.set(x,3,z);scene.add(p);const hd=new THREE.Mesh(new THREE.BoxGeometry(1,.4,.25),new THREE.MeshBasicMaterial({color:0xfffbe0}));hd.position.set(x,6,z);hd.lookAt(0,0,0);scene.add(hd);
  const fl=new THREE.Sprite(new THREE.SpriteMaterial({map:radTex,color:0xfff3c0,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));fl.scale.set(4,4,1);fl.position.set(x,6,z);scene.add(fl)}
var radTex;function mkRad(){return canvasTex(128,128,(g,w,h)=>{const gr=g.createRadialGradient(64,64,2,64,64,64);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.35,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,w,h)})}
/* ---------- ball ---------- */
const ballTex=canvasTex(512,256,(g,w,h)=>{g.fillStyle='#f4f6fb';g.fillRect(0,0,w,h);g.fillStyle='#16161f';const pts=[[64,64],[192,40],[320,64],[448,40],[0,180],[128,200],[256,180],[384,200],[512,180],[64,128+64],[192,128],[320,128+20],[448,128]];for(const [x,y] of pts){g.beginPath();for(let k=0;k<5;k++){const a=k*1.2566-1.57;g.lineTo(x+Math.cos(a)*26,y+Math.sin(a)*22)}g.closePath();g.fill()}});
const BR=.2;const ball=new THREE.Mesh(new THREE.SphereGeometry(BR,32,24),new THREE.MeshStandardMaterial({map:ballTex,roughness:.4}));ball.castShadow=true;scene.add(ball);
const ballRing=new THREE.Mesh(new THREE.RingGeometry(BR*1.5,BR*1.9,40),new THREE.MeshBasicMaterial({color:0xfff07a,transparent:true,opacity:.7,depthWrite:false}));ballRing.rotation.x=-Math.PI/2;ballRing.position.y=.02;scene.add(ballRing);
const fireS=[];for(let i=0;i<10;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:radTex||null,color:0xff8a20,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));s.visible=false;scene.add(s);fireS.push(s)}
/* ---------- characters ---------- */
const loader=new GLTFLoader();const SRC={};
const PART={Head:0,Neck:0,HeadTop_End:0,LeftEye:0,RightEye:0,Spine:1,Spine1:1,Spine2:1,LeftShoulder:1,RightShoulder:1,Hips:2};
function partOf(n,t){if(n in PART)return PART[n];if(/^(Left|Right)Arm$/.test(n))return t<.5?1:5;if(/^(Left|Right)ForeArm$/.test(n))return 6;if(/^(Left|Right)Hand/.test(n))return 7;if(/^(Left|Right)UpLeg$/.test(n))return t<.62?2:5;if(/^(Left|Right)Leg$/.test(n))return t<.18?5:3;if(/^(Left|Right)(Foot|Toe)/.test(n))return 4;return 0}
const bn=b=>b.name.replace(/^.*mixamorig_?/,'');
function prepModel(root){root.traverse(o=>{if(!o.isSkinnedMesh)return;o.castShadow=true;o.frustumCulled=false;const g=o.geometry;if(g.userData.kitU)return;if(!g.getAttribute('normal'))g.computeVertexNormals();
  const sk=o.skeleton,P={};sk.bones.forEach((b,i)=>{const m=new THREE.Matrix4().copy(sk.boneInverses[i]).invert();P[bn(b)]=new THREE.Vector3().setFromMatrixPosition(m)});
  const y=n=>P[n]?P[n].y:0,ax=n=>P[n]?Math.abs(P[n].x):0;const hip=y('Hips'),knee=(y('LeftLeg')+y('RightLeg'))/2,ank=(y('LeftFoot')+y('RightFoot'))/2,neck=y('Neck'),spine=y('Spine');
  const sh=(ax('LeftArm')+ax('RightArm'))/2,el=(ax('LeftForeArm')+ax('RightForeArm'))/2,wr=(ax('LeftHand')+ax('RightHand'))/2,uleg=(y('LeftUpLeg')+y('RightUpLeg'))/2;
  g.userData.kitU={kNeck:neck+(y('Head')-neck)*.15,kSh:sh+(el-sh)*.45,kEl:el,kWr:wr+(wr-el)*.05,kWaist:spine+(spine-hip)*.1,kThigh:uleg+(knee-uleg)*.55,kKnee:knee-(knee-ank)*.12,kAnk:ank+(knee-ank)*.06,kArmY:y('LeftArm')}})}
function kitMaterial(src,cols,ku){const m=new THREE.MeshStandardMaterial({map:src.map||null,color:0xffffff,roughness:.75,metalness:0});if(m.map)m.map.colorSpace=THREE.SRGBColorSpace;const un={};for(const k in cols)un[k]={value:new THREE.Color(cols[k])};for(const k in ku)un[k]={value:ku[k]};un.kShirt={value:1};m.userData.un=un;
  m.onBeforeCompile=s=>{Object.assign(s.uniforms,un);s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vBind;').replace('#include <begin_vertex>','#include <begin_vertex>\nvBind=position;');
    s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vBind;uniform vec3 kJ,kS,kSo,kB,kSk,kFa,kHa;uniform float kShirt,kNeck,kSh,kEl,kWr,kWaist,kThigh,kKnee,kAnk,kArmY;').replace('#include <map_fragment>',`#include <map_fragment>
    {float ax=abs(vBind.x),py=vBind.y;vec3 kc=vec3(-1.);bool armZone=ax>kSh*0.82&&py>kWaist&&py<kNeck;
     if(py>kNeck&&!armZone){}
     else if(armZone&&ax>kWr)kc=kHa;
     else if(armZone&&ax>kEl)kc=kFa;
     else if(armZone&&ax>kSh)kc=kSk;
     else if(py>kWaist){if(kShirt>.5)kc=kJ;}
     else if(py>kThigh)kc=kS;
     else if(py>kKnee)kc=kSk;
     else if(py>kAnk)kc=kSo;
     else kc=kB;
     if(kc.x>=0.)diffuseColor.rgb=kc;}`)};
  m.customProgramCacheKey=()=>'kit2';return m}
const BONES=['Hips','Spine','Spine1','Spine2','Neck','Head','LeftArm','LeftForeArm','RightArm','RightForeArm','LeftUpLeg','LeftLeg','RightUpLeg','RightLeg','LeftShoulder','RightShoulder'];
function makeChar(model,kitCols,opt){const src=SRC[model];const root=SkeletonUtils.clone(src.scene);const flip=new THREE.Group();flip.rotation.y=Math.PI;flip.add(root);const holder=new THREE.Group();holder.add(flip);
  root.traverse(o=>{if(o.isSkinnedMesh){o.material=kitMaterial(o.material,kitCols,o.geometry.userData.kitU||{});o.castShadow=true;o.frustumCulled=false}});
  const B={};root.traverse(o=>{if(o.isBone)B[bn(o)]=o});
  // athletic build
  if(B.Spine2&&opt.muscle){B.Spine2.scale.set(1.12,1,1.14);if(B.Neck)B.Neck.scale.set(1/1.12,1,1/1.14)}
  const box=new THREE.Box3().setFromObject(root),hgt=box.max.y-box.min.y;const s=(opt.h||1.62)/hgt;flip.scale.setScalar(s);flip.position.y=-box.min.y*s;
  holder.updateMatrixWorld(true);const rest={};const qf=new THREE.Quaternion();flip.getWorldQuaternion(qf);const qfi=qf.clone().invert();
  for(const n of BONES){const b=B[n];if(!b)continue;const pw=new THREE.Quaternion();b.parent.getWorldQuaternion(pw);pw.premultiply(qfi);rest[n]={l:b.quaternion.clone(),pw,pwi:pw.clone().invert(),p:b.position.clone()}}
  return {holder,flip,B,rest,baseY:flip.position.y,s}}
const qe=new THREE.Quaternion(),eu=new THREE.Euler();
function setB(c,n,x,y,z){const b=c.B[n],r=c.rest[n];if(!b||!r)return;eu.set(x,y,z,'XYZ');qe.setFromEuler(eu);b.quaternion.copy(r.pwi).multiply(qe).multiply(r.pw).multiply(r.l)}
function resetPose(c){for(const n in c.rest)c.B[n].quaternion.copy(c.rest[n].l)}
/* poses: normalized frame — character faces +Z, left = +X */
function pose(c,anim,cel,t,ph,spd){resetPose(c);let y=0,rx=0,rz=0,ry=0;const A=1.3;
  const arms=(lz,rz2,lx,rx2,lb,rb)=>{setB(c,'LeftArm',lx||0,0,lz);setB(c,'RightArm',rx2||0,0,-rz2);setB(c,'LeftForeArm',0,-(lb||0),0);setB(c,'RightForeArm',0,rb||0,0)};
  if(anim===1||anim===6){const s=Math.sin(ph),k=Math.min(1,spd);setB(c,'LeftUpLeg',-s*.75*k,0,0);setB(c,'RightUpLeg',s*.75*k,0,0);setB(c,'LeftLeg',(.25+Math.max(0,s)*1.0)*k,0,0);setB(c,'RightLeg',(.25+Math.max(0,-s)*1.0)*k,0,0);
    arms(A,A,s*.6*k,-s*.6*k,.9,.9);setB(c,'Spine',.14*k,s*.12*k,0);y=Math.abs(Math.cos(ph))*.05*k}
  else if(anim===2){setB(c,'RightUpLeg',-1.35,0,0);setB(c,'RightLeg',.15,0,0);setB(c,'LeftUpLeg',.25,0,0);setB(c,'LeftLeg',.35,0,0);arms(.6,1.2,-.6,.4,.3,.6);setB(c,'Spine',-.15,-.25,0)}
  else if(anim===5){y=-.45;rx=-.25;setB(c,'RightUpLeg',-1.5,0,0);setB(c,'LeftUpLeg',-.4,0,0);setB(c,'LeftLeg',1.6,0,0);arms(.4,.4,.8,.8,.2,.2);setB(c,'Spine',-.5,0,0)}
  else if(anim===4){rx=-1.45;y=.12;arms(.3,.3,0,0,.3,.3);setB(c,'LeftUpLeg',-.2,0,.1);setB(c,'RightUpLeg',.1,0,-.1)}
  else if(anim===7){y=.75;rx=-1.1;setB(c,'RightUpLeg',-2.3,0,0);setB(c,'LeftUpLeg',-.4,0,0);setB(c,'LeftLeg',1.2,0,0);arms(.2,.2,.6,.6,0,0)}
  else if(anim===3){const k=t*6;if(cel==='sky'){arms(-1.25,-1.25,0,0,.15,.15);y=Math.abs(Math.sin(k))*.28;setB(c,'Head',-.35,0,0);setB(c,'Spine',-.15,0,0)}
    else if(cel==='slide'){y=-.5;setB(c,'LeftUpLeg',0,0,.1);setB(c,'RightUpLeg',0,0,-.1);setB(c,'LeftLeg',1.6,0,0);setB(c,'RightLeg',1.6,0,0);setB(c,'Spine',-.45,0,0);arms(.15,.15,-.3,-.3,0,0);setB(c,'Head',-.4,0,0)}
    else if(cel==='spin'){y=Math.abs(Math.sin(k*.7))*.6;ry=k*1.6;arms(0,0,0,0,0,0)}
    else if(cel==='dance'){const s=Math.sin(k*1.3);rz=s*.12;arms(.6+s*.9,.6-s*.9,0,0,1.3,1.3);setB(c,'LeftLeg',.3+Math.max(0,s)*.5,0,0);setB(c,'RightLeg',.3+Math.max(0,-s)*.5,0,0);setB(c,'Spine',0,s*.3,0);y=-Math.abs(s)*.06}
    else{arms(A,.2,0,-1.1,.2,2.4);setB(c,'Head',.1,0,0);y=Math.abs(Math.sin(k*.5))*.04}}
  else{const b=Math.sin(t*2.2)*.03;arms(A+.12,A+.12,-.08,-.08,.12+b,.12+b);setB(c,'LeftLeg',.12,0,0);setB(c,'RightLeg',.12,0,0);setB(c,'LeftUpLeg',-.06,0,.05);setB(c,'RightUpLeg',-.06,0,-.05);setB(c,'Spine',.05+b,0,0)}
  c.flip.position.y=c.baseY+y;c.flip.rotation.set(rx,Math.PI+ry,rz)}
function keeperPose(c,a,t,dy){resetPose(c);let y=0,rz=0,rx=0;
  if(a===2){rz=dy*1.25;y=.35;setB(c,'LeftArm',0,0,-1.3);setB(c,'RightArm',0,0,1.3);setB(c,'LeftUpLeg',0,0,.3);setB(c,'RightUpLeg',0,0,-.3)}
  else if(a===4){rx=-1.45;y=.12}
  else{const ph=t*9;const mv=a===1;setB(c,'LeftUpLeg',-.45,0,.18);setB(c,'RightUpLeg',-.45,0,-.18);setB(c,'LeftLeg',.8+(mv?Math.max(0,Math.sin(ph))*.4:0),0,0);setB(c,'RightLeg',.8+(mv?Math.max(0,-Math.sin(ph))*.4:0),0,0);setB(c,'Spine',.35,0,0);
    setB(c,'LeftArm',-.9,0,.7);setB(c,'RightArm',-.9,0,-.7);setB(c,'LeftForeArm',0,-.4,0);setB(c,'RightForeArm',0,.4,0);y=-.18}
  c.flip.position.y=c.baseY+y;c.flip.rotation.set(rx,Math.PI,rz)}
/* labels & markers */
function textSprite(txt,col,size){const c=document.createElement('canvas'),g=c.getContext('2d');g.font=`800 ${size}px Rubik, Arial, sans-serif`;const w=Math.ceil(g.measureText(txt).width)+24;c.width=w;c.height=size+18;g.font=`800 ${size}px Rubik, Arial, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.direction=/[֐-׿]/.test(txt)?'rtl':'ltr';g.lineWidth=size*.22;g.strokeStyle='rgba(0,0,0,.85)';g.strokeText(txt,w/2,c.height/2);g.fillStyle=col;g.fillText(txt,w/2,c.height/2);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.renderOrder=10;s.scale.set(w/c.height*.26,.26,1);return s}
const chevTex=canvasTex(64,64,(g)=>{g.fillStyle='#b6ff3b';g.strokeStyle='#000';g.lineWidth=5;g.beginPath();g.moveTo(8,14);g.lineTo(56,14);g.lineTo(32,50);g.closePath();g.stroke();g.fill()});
const barC=document.createElement('canvas');barC.width=128;barC.height=20;const barT=new THREE.CanvasTexture(barC);const barS=new THREE.Sprite(new THREE.SpriteMaterial({map:barT,depthTest:false,transparent:true}));barS.renderOrder=11;barS.scale.set(.9,.14,1);barS.visible=false;scene.add(barS);
const aimL=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.12),new THREE.MeshBasicMaterial({color:0xb6ff3b,transparent:true,opacity:.6,depthWrite:false}));aimL.rotation.x=-Math.PI/2;aimL.visible=false;scene.add(aimL);
const ringGeo=new THREE.RingGeometry(.36,.45,40);
const PL={},KP=[];
let KITS=KIT;function getPlayer(p){const KIT=KITS;let o=PL[p.id];const key=p.star+p.team+p.rar+KIT[p.team].j;if(o&&o.key===key)return o;if(o)scene.remove(o.c.holder);
  const model=MODEL[p.star]||'cappy',k=KIT[p.team],cols={kJ:k.j,kS:k.s,kSo:k.so,kB:BOOT[p.rar||0],kSk:SKIN[model],kFa:SKIN[model],kHa:SKIN[model]};
  const c=makeChar(model,cols,{muscle:true,h:p.star==='bakari'?1.7:p.star==='tino'?1.52:1.62});c.holder.traverse(x=>{if(x.material&&x.material.userData.un)x.material.userData.un.kShirt.value=SHIRTLESS[model]?0:1});
  const ring=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:p.me?0xb6ff3b:new THREE.Color(KIT[p.team].j),transparent:true,opacity:.9,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.025;c.holder.add(ring);
  let aura=null;if((p.rar||0)>=2){aura=new THREE.Mesh(new THREE.CircleGeometry(.7,40),new THREE.MeshBasicMaterial({map:radTex,color:p.rar>2?0xff5ad8:0xffd23f,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));aura.rotation.x=-Math.PI/2;aura.position.y=.03;c.holder.add(aura)}
  const lab=textSprite((p.me?'▼ ':'')+p.name,p.me?'#b6ff3b':KIT[p.team].j,44);lab.position.y=p.me?2.1:1.95;c.holder.add(lab);
  const fire=textSprite('🔥','#fff',44);fire.position.set(0,2.4,0);fire.visible=false;c.holder.add(fire);
  const stars=textSprite('💫','#fff',44);stars.position.set(0,1.9,0);stars.visible=false;c.holder.add(stars);
  scene.add(c.holder);o=PL[p.id]={c,key,ring,aura,lab,fire,stars,ang:p.team?-Math.PI/2:Math.PI/2,ph:0,px:null,py:null,spd:0};return o}
function getKeeper(i){const k=KITS[i];if(KP[i]&&KP[i].col===k.gk)return KP[i];if(KP[i])scene.remove(KP[i].c.holder);const c=makeChar('robert',{kJ:k.gk,kS:'#15151c',kSo:k.gk,kB:'#1b1b24',kSk:SKIN.robert,kFa:k.gk,kHa:'#ffffff'},{muscle:true,h:1.72});c.holder.traverse(x=>{if(x.material&&x.material.userData.un)x.material.userData.un.kShirt.value=1});scene.add(c.holder);return KP[i]={c,col:k.gk}}
/* particles */
const parts=[];function burst(x,y,col,n){for(let i=0;i<n;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:radTex,color:new THREE.Color(col),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));const a=Math.random()*6.28,sp=2+Math.random()*5;s.position.set(wx(x),.8,wz(y));s.scale.setScalar(.25);s.userData={vx:Math.cos(a)*sp,vy:2+Math.random()*4,vz:Math.sin(a)*sp,t:0,l:.8+Math.random()*.6};scene.add(s);parts.push(s)}}
R3D.burst=burst;
/* ---------- frame ---------- */
const camT=new THREE.Vector3(),camP=new THREE.Vector3();let camInit=false;
let Q=1,fpsN=0,fpsT0=0;R3D.render=function(S){const pn=performance.now();if(!fpsT0)fpsT0=pn;fpsN++;if(pn-fpsT0>2500){const f=fpsN/((pn-fpsT0)/1000);fpsN=0;fpsT0=pn;if(f<24&&Q>0){Q--;if(Q===0){rd.shadowMap.enabled=false;scene.traverse(o=>{if(o.material)o.material.needsUpdate=true})}}}
  const w=innerWidth,h=innerHeight,dpr=Q?Math.min(2,devicePixelRatio||1):Math.min(1.25,devicePixelRatio||1);if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){rd.setPixelRatio(dpr);rd.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
  const t=S.t,dt=S.dt;const seen=new Set();if(S.kits)KITS=S.kits;
  for(const p of S.P){if(p.x==null)continue;seen.add(p.id);const o=getPlayer(p),c=o.c;const X=wx(p.x),Z=wz(p.y);
    if(o.px!=null){const mx=X-o.px,mz=Z-o.py,d=Math.hypot(mx,mz);o.spd=lerpF(o.spd,Math.min(1.2,d/Math.max(dt,1e-3)/3.6),Math.min(1,dt*10));o.ph+=d*3.3;if(d>.004&&p.anim!==3&&p.anim!==4)o.tang=Math.atan2(mx,mz)}o.px=X;o.py=Z;
    if(p.me&&S.myDir&&(Math.abs(S.myDir[0])+Math.abs(S.myDir[1])>.1))o.tang=Math.atan2(S.myDir[0],S.myDir[1]);if(o.tang==null)o.tang=p.face<0?-Math.PI/2:Math.PI/2;
    let da=o.tang-o.ang;while(da>Math.PI)da-=6.283;while(da<-Math.PI)da+=6.283;o.ang+=da*Math.min(1,dt*12);
    c.holder.position.set(X,0,Z);c.holder.rotation.y=o.ang;const an=p.anim===1&&o.spd<.08?0:p.anim;pose(c,an,p.cel,t+(p.seed||0),o.ph,Math.max(.35,o.spd));
    o.ring.material.opacity=.65+.3*Math.sin(t*6);if(o.aura)o.aura.material.opacity=.5+.3*Math.sin(t*4);o.fire.visible=p.sup>=100&&!S.rf;o.lab.visible=!S.rf;o.stars.visible=p.anim===4;if(o.stars.visible)o.stars.position.x=Math.sin(t*6)*.25}
  for(const id in PL)if(!seen.has(id)){scene.remove(PL[id].c.holder);delete PL[id]}
  S.K.forEach((k,i)=>{const o=getKeeper(i),c=o.c,X=wx(i?FX1-30:FX0+30),Z=wz(k.y);c.holder.position.set(X,0,Z);c.holder.rotation.y=i?-Math.PI/2:Math.PI/2;keeperPose(c,k.a,t,(k.dy||1)*(i?-1:1))});
  const b=S.B,bz=(b.z||0)*U;ball.position.set(wx(b.x),BR+bz,wz(b.y));const vx=b.vx||0,vy=b.vy||0,sp=Math.hypot(vx,vy);if(sp>5){const ax=new THREE.Vector3(vy,0,-vx).normalize();ball.rotateOnWorldAxis(ax,-sp*U*dt/BR)}
  ballRing.position.set(ball.position.x,.02,ball.position.z);ballRing.visible=!b.owner;ballRing.material.opacity=.45+.35*Math.sin(t*7);
  fireS.forEach((s,i)=>{s.visible=!!b.fire;if(b.fire){s.position.set(ball.position.x-vx*U*.012*i,ball.position.y,ball.position.z-vy*U*.012*i);s.scale.setScalar(.6-i*.045);s.material.color.setHSL(.07-i*.006,1,.55);s.material.map=radTex}});
  barS.visible=S.charge!=null;if(S.charge!=null&&S.meP){const g=barC.getContext('2d');g.clearRect(0,0,128,20);g.fillStyle='rgba(0,0,0,.7)';g.fillRect(0,0,128,20);g.fillStyle=S.charge>.85?'#ff3d8b':'#b6ff3b';g.fillRect(3,3,122*S.charge,14);barT.needsUpdate=true;barS.position.set(wx(S.meP.x),2.3,wz(S.meP.y))}
  aimL.visible=!!S.aim&&!S.rf;if(aimL.visible){const a=Math.atan2(S.aim[0],S.aim[1]);aimL.position.set(ball.position.x+Math.sin(a)*.8,.03,ball.position.z+Math.cos(a)*.8);aimL.rotation.z=a-Math.PI/2;aimL.material.opacity=.4+.3*Math.sin(t*8)}
  for(let i=parts.length-1;i>=0;i--){const s=parts[i],d=s.userData;d.t+=dt;if(d.t>d.l){scene.remove(s);parts.splice(i,1);continue}d.vy-=9*dt;s.position.x+=d.vx*dt;s.position.y=Math.max(.05,s.position.y+d.vy*dt);s.position.z+=d.vz*dt;s.material.opacity=1-d.t/d.l}
  // camera
  const asp=w/h,dist=asp>1.6?10.8:asp>1.2?12:15;let tx=ball.position.x,tz=ball.position.z;if(S.meP&&!S.rf){tx=lerpF(tx,wx(S.meP.x),.3);tz=lerpF(tz,wz(S.meP.y),.3)}
  const halfV=Math.tan(cam.fov*Math.PI/360)*dist,halfW=halfV*asp*.92;tx=Math.max(-FW/2-1.2+halfW,Math.min(FW/2+1.2-halfW,tx));if(halfW*2>FW+2.4)tx=0;tz=Math.max(-FD/2+1.2,Math.min(FD/2-.6,tz));
  if(!camInit){camT.set(tx,0,tz);camInit=true}camT.x=lerpF(camT.x,tx,Math.min(1,dt*(S.rf?5:3.2)));camT.z=lerpF(camT.z,tz,Math.min(1,dt*3));
  const sh=S.shake||0;camP.set(camT.x+(Math.random()-.5)*sh*.02,dist*.78+(Math.random()-.5)*sh*.02,camT.z+dist*.66);cam.position.copy(camP);cam.lookAt(camT.x,.6,camT.z-.2);
  sun.position.set(camT.x-4,12,camT.z+7);sun.target.position.set(camT.x,0,camT.z);
  rd.render(scene,cam)};
const lerpF=(a,b,k)=>a+(b-a)*k;
R3D.portrait=(star,team,size)=>{const r2=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r2.outputColorSpace=THREE.SRGBColorSpace;r2.toneMapping=THREE.ACESFilmicToneMapping;r2.setSize(size,Math.round(size*1.15),false);
  const sc2=new THREE.Scene();sc2.add(new THREE.HemisphereLight(0xdfe6ff,0x40305a,1.6));const d=new THREE.DirectionalLight(0xffffff,2.4);d.position.set(1.5,3,3);sc2.add(d);const r1=new THREE.DirectionalLight(0x22e3ff,1.6);r1.position.set(-3,2,-2);sc2.add(r1);const r3=new THREE.DirectionalLight(0xff3d8b,1.6);r3.position.set(3,2,-2);sc2.add(r3);
  const model=MODEL[star],k=KIT[team||0];const c=makeChar(model,{kJ:k.j,kS:k.s,kSo:k.so,kB:BOOT[0],kSk:SKIN[model],kFa:SKIN[model],kHa:SKIN[model]},{muscle:true,h:1.62});c.holder.traverse(x=>{if(x.material&&x.material.userData.un)x.material.userData.un.kShirt.value=SHIRTLESS[model]?0:1});pose(c,0,'sky',0,0,0);c.holder.rotation.y=.35;sc2.add(c.holder);
  const cm=new THREE.PerspectiveCamera(30,1/1.15,.1,50);cm.position.set(0,1.25,3.3);cm.lookAt(0,1.0,0);r2.render(sc2,cm);const u=r2.domElement.toDataURL('image/png');r2.dispose();return u};
R3D.show=v=>{cv.style.display=v?'block':'none'};
R3D.reset=()=>{for(const id in PL){scene.remove(PL[id].c.holder);delete PL[id]}camInit=false};
/* ---------- load ---------- */
radTex=mkRad();
(async()=>{try{const names=['cappy','jimmy','kate','jennifer','kyle','shiro','robert'];await Promise.all(names.map(async n=>{const g=await loader.loadAsync('models/'+n+'.glb?v=4');prepModel(g.scene);SRC[n]=g}));
  // re-create floodlight sprites texture now that radTex exists
  scene.traverse(o=>{if(o.isSprite&&!o.material.map)o.material.map=radTex;o.material&&(o.material.needsUpdate=true)});
  R3D.ok=true;R3D.loading=false;window.dispatchEvent(new Event('r3d'))}catch(e){console.error('R3D load failed',e);R3D.loading=false}})();
