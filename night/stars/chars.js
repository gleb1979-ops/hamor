/* Street Stars 3D characters: 100Avatars by Polygonal Mind (CC BY 4.0, modified: football kit, poses). */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {VRMLoaderPlugin,VRMUtils} from '@pixiv/three-vrm';
export const MODEL={tino:'cappy',bryce:'jimmy',ayla:'kate',zane:'jenny',bakari:'kyle',kai:'shiro',gk:'gk',banana:'banana',carrot:'carrot',dino:'dino'};
const SKIN={cappy:'#f3c9a5',jimmy:'#f4c79a',kate:'#f6d3c4',jenny:'#b86b45',kyle:'#f0a98a',shiro:'#f6d6c8',gk:'#f2c3a0',banana:'#f7d23a',carrot:'#f08a24',dino:'#3ddc84'};
const BARE={jimmy:1},MUSCLE={jimmy:1},NOKIT={banana:1,carrot:1,dino:1};
const PART={hips:2,spine:1,chest:1,upperChest:1,neck:0,head:0,leftShoulder:1,rightShoulder:1,leftUpperArm:1,rightUpperArm:1,leftLowerArm:4,rightLowerArm:4,leftHand:0,rightHand:0,leftUpperLeg:2,rightUpperLeg:2,leftLowerLeg:3,rightLowerLeg:3,leftFoot:6,rightFoot:6,leftToes:6,rightToes:6};
const buf={};
export function fetchModel(name){return buf[name]||(buf[name]=fetch(new URL('models/'+name+'.vrm',import.meta.url)).then(r=>{if(!r.ok)throw new Error('model '+name);return r.arrayBuffer()}))}
const loader=new GLTFLoader();loader.register(p=>new VRMLoaderPlugin(p));
function numTex(n){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.font='900 92px Arial Black, Rubik, sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineWidth=12;g.strokeStyle='#07071a';g.strokeText(n,64,70);g.fillStyle='#fff';g.fillText(n,64,70);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
export async function makeChar(star,o){const name=MODEL[star]||'cappy';const ab=await fetchModel(name);const g=await loader.parseAsync(ab.slice(0),'');const vrm=g.userData.vrm;VRMUtils.rotateVRM0(vrm);
  const h=vrm.humanoid,raw={};for(const n in PART){const b=h.getRawBoneNode(n);if(b)raw[b.uuid]=n}
  const U={uKit:{value:new THREE.Color(o.kit)},uShorts:{value:new THREE.Color(o.shorts)},uSock:{value:new THREE.Color(o.sock)},uSkin:{value:new THREE.Color(SKIN[name])},uBoot:{value:new THREE.Color(o.boot||'#15151c')},uFlash:{value:0}};
  const bare=BARE[name]&&!o.sleeves,nokit=NOKIT[name];
  vrm.scene.traverse(m=>{if(!m.isSkinnedMesh&&!m.isMesh)return;m.castShadow=true;m.frustumCulled=false;if(!m.isSkinnedMesh)return;
    const geo=m.geometry,si=geo.attributes.skinIndex,sw=geo.attributes.skinWeight,n=si.count,part=new Float32Array(n),bones=m.skeleton.bones,bpos={};
    bones.forEach((bn,bi)=>{const nm=raw[bn.uuid];if(nm)bpos[nm]=new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().copy(m.skeleton.boneInverses[bi]).invert())});
    const pos=geo.attributes.position,vv=new THREE.Vector3(),along=(a,b)=>{const A=bpos[a],B=bpos[b];if(!A||!B)return .5;const ab2=B.clone().sub(A);return vv.clone().sub(A).dot(ab2)/ab2.lengthSq()};
    for(let i=0;i<n;i++){let best=0,bw=-1;for(let k=0;k<4;k++){const w=sw.getComponent(i,k);if(w>bw){bw=w;best=si.getComponent(i,k)}}let nm=null,bn=bones[best];while(bn&&!(nm=raw[bn.uuid]))bn=bn.parent;let p=nm?PART[nm]:0;vv.fromBufferAttribute(pos,i);
      if(nm&&nm.endsWith('UpperLeg')){const sd=nm.startsWith('left')?'left':'right';p=along(sd+'UpperLeg',sd+'LowerLeg')<.55?2:4}
      else if(nm&&nm.endsWith('LowerLeg')){const sd=nm.startsWith('left')?'left':'right';p=along(sd+'LowerLeg',sd+'Foot')<.2?4:3}
      else if(nm&&nm.endsWith('UpperArm')){const sd=nm.startsWith('left')?'left':'right';p=o.sleeves?1:along(sd+'UpperArm',sd+'LowerArm')<.5?1:4}
      else if(nm&&nm.endsWith('LowerArm')&&o.sleeves)p=1;
      if(o.gloves&&nm&&nm.endsWith('Hand'))p=7;
      if(bare&&(p===1||(p===4&&nm&&nm.includes('Arm'))))p=5;
      if(nokit)p=(p===2||p===3)?p:(p===6?6:0);
      part[i]=p}
    geo.setAttribute('kpart',new THREE.BufferAttribute(part,1));
    const mats=(Array.isArray(m.material)?m.material:[m.material]).map(mt=>{const map=mt.map||(mt.uniforms&&mt.uniforms.map&&mt.uniforms.map.value)||null;const s=new THREE.MeshToonMaterial({map,color:map?0xffffff:(mt.color||new THREE.Color(0xcccccc))});
      s.onBeforeCompile=sh=>{Object.assign(sh.uniforms,U);
        sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float kpart;varying float vKp;').replace('#include <begin_vertex>','#include <begin_vertex>\nvKp=kpart;');
        sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vKp;uniform vec3 uKit,uShorts,uSock,uSkin,uBoot;uniform float uFlash;')
          .replace('#include <map_fragment>','#include <map_fragment>\nif(vKp>0.5&&vKp<1.5)diffuseColor.rgb=uKit;else if(vKp>1.5&&vKp<2.5)diffuseColor.rgb=uShorts;else if(vKp>2.5&&vKp<3.5)diffuseColor.rgb=uSock;else if(vKp>3.5&&vKp<4.5)diffuseColor.rgb=uSkin;else if(vKp>5.5&&vKp<6.5)diffuseColor.rgb=uBoot;else if(vKp>6.5)diffuseColor.rgb=vec3(1.0,0.95,0.6);')
          .replace('#include <dithering_fragment>','#include <dithering_fragment>\ngl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0),uFlash);')};
      s.customProgramCacheKey=()=>'kit';return s});m.material=Array.isArray(m.material)?mats:mats[0]});
  if(MUSCLE[name]&&!o.sleeves){for(const n of ['leftUpperArm','rightUpperArm','leftLowerArm','rightLowerArm']){const b=h.getRawBoneNode(n);if(b)b.scale.set(1,1.35,1.35)}const c=h.getRawBoneNode('chest')||h.getRawBoneNode('spine');if(c)c.scale.set(1.22,1.04,1.18)}
  h.update();vrm.update(0);const box=new THREE.Box3().setFromObject(vrm.scene),height=box.max.y-box.min.y;
  const chest=h.getRawBoneNode('upperChest')||h.getRawBoneNode('chest');
  if(chest&&!bare&&!nokit&&o.num!=null){const tex=numTex(o.num),mat=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false});for(const s of [-1,1]){const pl=new THREE.Mesh(new THREE.PlaneGeometry(.15,.15),mat);pl.position.set(0,0,s*.125);pl.rotation.y=s<0?Math.PI:0;chest.add(pl)}}
  const root=new THREE.Group(),body=new THREE.Group();body.add(vrm.scene);root.add(body);
  const S=1.7/height;body.scale.setScalar(S);
  return {root,body,vrm,h,U,height:1.7,name,setKit(k){U.uKit.value.set(k.kit);U.uShorts.value.set(k.shorts);U.uSock.value.set(k.sock)}}}
/* ---------- procedural animation (normalized humanoid bones) ---------- */
const E=new THREE.Euler();
function R(c,n,x,y,z){const b=c.h.getNormalizedBoneNode(n);if(b)b.rotation.set(x,y,z)}
export function pose(c,a,t,o){o=o||{};const ph=t*(o.speed||11)+(o.seed||0),s=Math.sin(ph),cs=Math.cos(ph);let bodyY=0,rx=0,rz=0,ry=0;
  for(const n of ['hips','spine','chest','upperChest','neck','head','leftUpperLeg','rightUpperLeg','leftLowerLeg','rightLowerLeg','leftFoot','rightFoot','leftUpperArm','rightUpperArm','leftLowerArm','rightLowerArm','leftHand','rightHand'])R(c,n,0,0,0);
  const arms=(l,r,lx=0,rx2=0)=>{R(c,'leftUpperArm',lx,0,l);R(c,'rightUpperArm',rx2,0,r)};
  if(a==='idle'){const b=Math.sin(t*2.2+(o.seed||0));arms(1.25,-1.25,0,0);R(c,'leftLowerArm',0,.25,0);R(c,'rightLowerArm',0,-.25,0);R(c,'spine',b*.02,0,0);R(c,'leftUpperLeg',0,0,-.05);R(c,'rightUpperLeg',0,0,.05);bodyY=b*.006}
  else if(a==='run'||a==='dribble'){R(c,'leftUpperLeg',-s*.85,0,0);R(c,'rightUpperLeg',s*.85,0,0);R(c,'leftLowerLeg',.25+Math.max(0,s)*1.15,0,0);R(c,'rightLowerLeg',.25+Math.max(0,-s)*1.15,0,0);
    arms(1.3,-1.3,s*.7,-s*.7);R(c,'leftLowerArm',0,1.2,0);R(c,'rightLowerArm',0,-1.2,0);R(c,'spine',.22,0,0);R(c,'head',-.12,0,0);bodyY=Math.abs(cs)*.05-.02;ry=s*.06}
  else if(a==='kick'){const k=o.k||0;R(c,'rightUpperLeg',lerp(.6,-1.5,k),0,0);R(c,'rightLowerLeg',lerp(1.3,.1,k),0,0);R(c,'leftUpperLeg',.1,0,0);R(c,'leftLowerLeg',.2,0,0);arms(.6,-.9,-.4,.5);R(c,'spine',lerp(.1,-.15,k),lerp(.2,-.2,k),0);bodyY=-.03}
  else if(a==='slide'){rx=-1.05;bodyY=.12;R(c,'rightUpperLeg',-1.1,0,0);R(c,'rightLowerLeg',.1,0,0);R(c,'leftUpperLeg',-.3,0,0);R(c,'leftLowerLeg',1.4,0,0);arms(.5,-.5,-.6,-.6)}
  else if(a==='down'){rx=-1.5;bodyY=.16;arms(.2,-.2,-.3,-.3);R(c,'leftUpperLeg',-.2,0,.15);R(c,'rightUpperLeg',-.1,0,-.2);R(c,'head',.2,Math.sin(t*5)*.4,0)}
  else if(a==='lob'){rx=-1.0;bodyY=.55+Math.sin(Math.min(1,o.k||0)*Math.PI)*.3;R(c,'rightUpperLeg',-2.2,0,0);R(c,'leftUpperLeg',-.4,0,0);R(c,'leftLowerLeg',1.0,0,0);arms(.2,-.2,-.5,-.5)}
  else if(a==='dive'){rz=(o.dir||1)*1.25;bodyY=.25;arms(-.2,.2,0,0);R(c,'leftUpperLeg',0,0,.3);R(c,'rightUpperLeg',0,0,-.3)}
  else if(a==='keeper'){arms(.55,-.55,-.4,-.4);R(c,'leftLowerArm',0,.6,0);R(c,'rightLowerArm',0,-.6,0);R(c,'leftUpperLeg',-.25,0,-.25);R(c,'rightUpperLeg',-.25,0,.25);R(c,'leftLowerLeg',.5,0,0);R(c,'rightLowerLeg',.5,0,0);R(c,'spine',.25,0,0);bodyY=-.07+Math.sin(t*6)*.01;if(o.moving){ry=Math.sin(t*14)*.05;bodyY+=Math.abs(Math.sin(t*14))*.03}}
  else if(a==='hold'){arms(.3,-.3,-1.2,-1.2);R(c,'leftLowerArm',0,.9,0);R(c,'rightLowerArm',0,-.9,0)}
  else if(a==='cel'){const k=t*6,cl=o.cel||'sky';
    if(cl==='sky'){arms(-1.1,1.1,0,0);bodyY=Math.abs(Math.sin(k))*.25;R(c,'head',-.3,0,0)}
    else if(cl==='slide'){bodyY=-.38;rx=-.35;R(c,'leftUpperLeg',-1.2,0,0);R(c,'rightUpperLeg',-1.2,0,0);R(c,'leftLowerLeg',2.3,0,0);R(c,'rightLowerLeg',2.3,0,0);arms(.1,-.1,-.3,-.3);R(c,'head',-.4,0,0)}
    else if(cl==='spin'){bodyY=Math.abs(Math.sin(k*.8))*.45;ry=k*1.6;arms(0,0,0,0)}
    else if(cl==='dance'){ry=Math.sin(k*1.2)*.4;arms(1.2-Math.sin(k*2)*1.4,-1.2-Math.sin(k*2+1)*1.4,0,0);R(c,'hips',0,0,Math.sin(k*2)*.15);R(c,'leftUpperLeg',0,0,Math.sin(k*2)*.2);bodyY=Math.abs(Math.sin(k*2))*.06}
    else if(cl==='shh'){arms(1.25,.2,0,-1.6);R(c,'rightLowerArm',0,-2.1,0);R(c,'head',.05,.2,0);bodyY=Math.abs(Math.sin(k*.6))*.03}}
  c.h.update();c.body.position.y=bodyY;c.body.rotation.set(rx,ry,rz)}
function lerp(a,b,k){return a+(b-a)*k}
