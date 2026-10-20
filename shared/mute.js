/* Тагшим: кнопка «Выключить звук» для всех игр. Глушит WebAudio (через общий узел громкости), <audio>/<video> и озвучку. Состояние общее для всех игр сайта. */
(function(){
  var K='tagshim_mute',M=false;try{M=localStorage.getItem(K)==='1'}catch(e){}
  var gains=[],AN=window.AudioNode,ADN=window.AudioDestinationNode;
  if(AN&&ADN){var oc=AN.prototype.connect;
    var gainFor=function(ctx){if(!ctx.__tgMute){var g=ctx.createGain();g.gain.value=M?0:1;oc.call(g,ctx.destination);ctx.__tgMute=g;gains.push(g)}return ctx.__tgMute};
    AN.prototype.connect=function(dst){if(dst instanceof ADN&&this!==(this.context&&this.context.__tgMute)){try{var a=[].slice.call(arguments);a[0]=gainFor(this.context);oc.apply(this,a);return dst}catch(e){}}return oc.apply(this,arguments)}}
  if(window.HTMLMediaElement){var op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(M)this.muted=true;else if(this.__tgM){this.muted=false}this.__tgM=1;return op.apply(this,arguments)}}
  if(window.speechSynthesis&&speechSynthesis.speak){var os=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=function(u){if(M)return;return os(u)}}
  function apply(){for(var i=0;i<gains.length;i++){try{gains[i].gain.value=M?0:1}catch(e){}}var ms=document.querySelectorAll('audio,video');for(var j=0;j<ms.length;j++)ms[j].muted=M;if(M&&window.speechSynthesis)try{speechSynthesis.cancel()}catch(e){}
    var b=document.getElementById('tgMute');if(b){b.textContent=M?'🔇':'🔊';b.title=M?'Включить звук':'Выключить звук';b.setAttribute('aria-label',b.title)}}
  window.tagshimMute=function(v){M=v==null?!M:!!v;try{localStorage.setItem(K,M?'1':'0')}catch(e){}apply();return M};
  function mk(){if(document.getElementById('tgMute'))return;var b=document.createElement('button');b.id='tgMute';b.type='button';
    b.style.cssText='position:fixed;z-index:2147483000;left:max(6px,env(safe-area-inset-left));top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,.35);background:rgba(10,8,14,.55);color:#fff;font-size:18px;line-height:1;padding:0;cursor:pointer;opacity:.75;touch-action:manipulation;-webkit-tap-highlight-color:transparent';
    var stop=function(e){e.stopPropagation()};b.addEventListener('pointerdown',stop);b.addEventListener('touchstart',stop,{passive:true});b.addEventListener('mousedown',stop);
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();window.tagshimMute()});document.body.appendChild(b);apply()}
  if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk);
  addEventListener('storage',function(e){if(e.key===K){M=e.newValue==='1';apply()}});
})();
