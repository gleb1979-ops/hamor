/* Свинец или серебро — языки RU / EN / ES. Переводит весь текст интерфейса и холста на лету. */
(function(){
const D=window.I18N_D||{};
const LANGS=['ru','en','es'],LBL={ru:'RU',en:'EN',es:'ES'};
let L=null;try{L=localStorage.getItem('svn_lang')}catch(e){}
if(LANGS.indexOf(L)<0){const n=((navigator.languages&&navigator.languages[0])||navigator.language||'en').slice(0,2).toLowerCase();L=(n==='ru'||n==='uk'||n==='be'||n==='kk')?'ru':(n==='es'||n==='pt'||n==='ca'||n==='gl')?'es':'en'}
const li=LANGS.indexOf(L);
document.documentElement.lang=L;
const CYR=/[А-Яа-яЁё]/;
const WIDE=/[А-Яа-яЁё][А-Яа-яЁё0-9 ,.!?:;«»"—–\-'’…·%+×\/№()]*/g;
const NARROW=/[А-Яа-яЁё][А-Яа-яЁё ,.!?:;«»—–\-'’…]*/g;
const SPLIT=/([:·—«»"!?.,()]+)/;
const EDGE=/^([\s«»"'(—–\-·:,.!?…;]*)([\s\S]*?)([\s«»"')—–\-·:,.!?…;]*)$/;
function get(k){const e=D[k];return e?e[li-1]:null}
function look(k){if(!k.trim())return null;let v=get(k.trim());if(v!=null){const a=k.match(/^\s*/)[0],b=k.match(/\s*$/)[0];return a+v+b}
 const m=k.match(EDGE);if(m&&m[2]){v=get(m[2]);if(v!=null)return m[1]+v+m[3]}return null}
function piece(n){const y=look(n);if(y!=null)return y;
 return n.split(SPLIT).map(p=>{if(!CYR.test(p))return p;const z=look(p);return z!=null?z:p}).join('')}
const cache=new Map();
function tr(s){if(li===0||typeof s!=='string'||!CYR.test(s))return s;let r=cache.get(s);if(r!==undefined)return r;
 r=look(s);if(r==null&&s.indexOf('\n')>=0)r=s.split('\n').map(tr).join('\n');if(r==null)r=s.replace(WIDE,m=>{const x=look(m);return x!=null?x:m.replace(NARROW,piece)});
 if(cache.size>8000)cache.clear();cache.set(s,r);return r}
const I18N=window.I18N={lang:L,tr,next(){const n=LANGS[(li+1)%3];try{localStorage.setItem('svn_lang',n)}catch(e){}location.reload()}};
if(li===0){fixBtn();document.addEventListener('DOMContentLoaded',fixBtn);return}
function fixBtn(){const b=document.querySelector('#langb .nt');if(b&&b.textContent!==LBL[L])b.textContent=LBL[L]}
const st=document.createElement('style');st.textContent='.ru-only{display:none!important}';document.head.appendChild(st);
/* холст */
const C=CanvasRenderingContext2D.prototype;
for(const f of ['fillText','strokeText','measureText']){const o=C[f];C[f]=function(t,...a){return o.call(this,typeof t==='string'?tr(t):t,...a)}}
/* окна */
for(const f of ['alert','confirm','prompt']){const o=window[f];if(o)window[f]=function(t,...a){return o.call(window,typeof t==='string'?tr(t):t,...a)}}
/* страница */
const ATTR=['placeholder','title','aria-label'];
function doNode(n){if(n.nodeType===3){const pp=n.parentNode;if(pp&&(pp.tagName==='SCRIPT'||pp.tagName==='STYLE'))return;const v=n.nodeValue;if(CYR.test(v)){const t=tr(v);if(t!==v)n.nodeValue=t}return}
 if(n.nodeType!==1||n.tagName==='SCRIPT'||n.tagName==='STYLE')return;
 for(const a of ATTR){const v=n.getAttribute&&n.getAttribute(a);if(v&&CYR.test(v)){const t=tr(v);if(t!==v)n.setAttribute(a,t)}}
 const w=document.createTreeWalker(n,5,null);let x;while(x=w.nextNode()){if(x.nodeType===3){const v=x.nodeValue;if(CYR.test(v)){const p=x.parentNode;if(p&&(p.tagName==='SCRIPT'||p.tagName==='STYLE'))continue;const t=tr(v);if(t!==v)x.nodeValue=t}}else for(const a of ATTR){const v=x.getAttribute(a);if(v&&CYR.test(v)){const t=tr(v);if(t!==v)x.setAttribute(a,t)}}}}
function all(){if(document.body)doNode(document.body);if(CYR.test(document.title))document.title=tr(document.title);fixBtn()}
new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')doNode(m.target);else for(const n of m.addedNodes)doNode(n);if(m.type==='attributes')doNode(m.target)}fixBtn()})
 .observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR});
document.addEventListener('DOMContentLoaded',all);if(document.readyState!=='loading')all();
})();
