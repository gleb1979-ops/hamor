/* Тагшим: кнопка «Выключить звук» для всех игр. Глушит WebAudio (через общий узел громкости), <audio>/<video> и озвучку. Состояние общее для всех игр сайта. */
(function(){
  var K='tagshim_mute',M=false;try{M=localStorage.getItem(K)==='1'}catch(e){}
  var gains=[],meds=[],ctxs=[],AN=window.AudioNode,ADN=window.AudioDestinationNode;
  /* громкость меняем и .value, и по расписанию; ровно 0 не ставим (iOS/Safari после чистого нуля мог «усыпить» ветку и не вернуть звук) */
  function setG(g){var v=M?0.0001:1;try{var t=g.context.currentTime;g.gain.cancelScheduledValues(0);g.gain.setValueAtTime(v,t)}catch(e){}try{g.gain.value=v}catch(e){}}
  if(AN&&ADN){var oc=AN.prototype.connect;
    var gainFor=function(ctx){if(!ctx.__tgMute){var g=ctx.createGain();setG(g);oc.call(g,ctx.destination);ctx.__tgMute=g;gains.push(g);ctxs.push(ctx)}return ctx.__tgMute};
    AN.prototype.connect=function(dst){if(dst instanceof ADN&&this!==(this.context&&this.context.__tgMute)){try{var a=[].slice.call(arguments);a[0]=gainFor(this.context);oc.apply(this,a);return dst}catch(e){}}return oc.apply(this,arguments)}}
  if(window.HTMLMediaElement){var op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(M)this.muted=true;else if(this.__tgM){this.muted=false}if(!this.__tgM&&meds.length<64)meds.push(this);this.__tgM=1;return op.apply(this,arguments)}}
  if(window.speechSynthesis&&speechSynthesis.speak){var os=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=function(u){if(M)return;return os(u)}}
  function apply(){for(var i=0;i<gains.length;i++)setG(gains[i]);if(!M)for(var c=0;c<ctxs.length;c++){try{if(ctxs[c].state!=='running'&&ctxs[c].state!=='closed'){var r=ctxs[c].resume();if(r&&r.catch)r.catch(function(){})}}catch(e){}}var ms=document.querySelectorAll('audio,video');for(var j=0;j<ms.length;j++)ms[j].muted=M;for(var q=0;q<meds.length;q++)meds[q].muted=M;if(M&&window.speechSynthesis)try{speechSynthesis.cancel()}catch(e){}
    var b=document.getElementById('tgMute');if(b){b.textContent=M?'🔇':'🔊';b.title=M?'Включить звук':'Выключить звук';b.setAttribute('aria-label',b.title)}}
  window.tagshimMute=function(v){M=v==null?!M:!!v;try{localStorage.setItem(K,M?'1':'0')}catch(e){}apply();return M};
  function mk(){if(document.getElementById('tgMute'))return;var b=document.createElement('button');b.id='tgMute';b.type='button';
    b.style.cssText='position:fixed;z-index:2147483000;left:max(6px,env(safe-area-inset-left));top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,.35);background:rgba(10,8,14,.55);color:#fff;font-size:18px;line-height:1;padding:0;cursor:pointer;opacity:.75;touch-action:manipulation;-webkit-tap-highlight-color:transparent';
    var stop=function(e){e.stopPropagation()};b.addEventListener('pointerdown',stop);b.addEventListener('touchstart',stop,{passive:true});b.addEventListener('mousedown',stop);
    /* на телефоне жмём по touchend сами: игры во время матча гасят «клик» после касания (защита от двойного тапа), и кнопка переставала откликаться */
    var lt=0;b.addEventListener('touchend',function(e){e.stopPropagation();if(e.cancelable)e.preventDefault();lt=Date.now();window.tagshimMute()},{passive:false});
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(Date.now()-lt<800)return;window.tagshimMute()});document.body.appendChild(b);apply()}
  if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk);
  addEventListener('storage',function(e){if(e.key===K){M=e.newValue==='1';apply()}});
})();
