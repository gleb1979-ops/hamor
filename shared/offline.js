/* Тагшим: кнопка «📥 Офлайн» для всех игр. Скачивает игру (на главной — все игры) в телефон,
   дальше она открывается и играется без интернета: самолёт, корабль, метро. Список файлов — /offline.json
   (собирается tools/mk_offline.py). Кэш общий с /sw.js ('tagshim-v2'). */
(function(){
  if(window.__tgOff)return;window.__tgOff=1;
  var CN='tagshim-v2',KEY='tagshim_off';
  var path=location.pathname.replace(/index\.html$/,'').replace(/^\/+|\/+$/g,'');
  var GAME=path||'*';                     // '*' = главная: все игры
  if(/^svinec(\/|$)/.test(path))return;   // у «Свинца» своя кнопка
  function lang(){var l='';try{l=localStorage.getItem('byd-lang3')||''}catch(e){}if(!l)l=(document.documentElement.lang||navigator.language||'en');l=l.slice(0,2).toLowerCase();return l==='ru'||l==='uk'||l==='be'?'ru':l==='he'||l==='iw'?'he':l==='es'?'es':'en'}
  var T={
   ru:{dl:'Скачиваю',keep:'Не закрывай страницу',dn:'Скачано',rd:'Офлайн готов',one:'Скачать эту игру — играть без интернета',all:'Скачать все игры — играть без интернета',ok:'Готово! Теперь это работает без интернета — в самолёте, на корабле, где угодно.',okall:'Готово! Все игры Тагшима сохранены в телефоне и работают без интернета — в самолёте, на корабле, где угодно.',home:'Чтобы открывать как приложение: в Safari нажми «Поделиться», затем «На экран Домой». В Chrome открой меню и выбери «Установить приложение».',net:'Онлайн-игра с друзьями работает только с интернетом.',need:'Нужен интернет, чтобы скачать. Потом всё будет работать без сети.',part:'Скачалось не всё. Проверь интернет и нажми ещё раз.',no:'Этот браузер не умеет сохранять игры. Открой в Safari или Chrome.',ask:'Скачать все игры в телефон? Это примерно {mb} МБ — лучше через Wi-Fi.'},
   en:{dl:'Downloading',keep:'Keep this page open',dn:'Downloaded',rd:'Offline ready',one:'Download this game — play offline',all:'Download all games — play offline',ok:'Done! It now works without internet — on a plane, on a ship, anywhere.',okall:'Done! All Tagshim games are saved on your phone and work without internet — on a plane, on a ship, anywhere.',home:'To open it like an app: in Safari tap “Share”, then “Add to Home Screen”. In Chrome open the menu and choose “Install app”.',net:'Online play with friends needs internet.',need:'You need internet to download. After that everything works offline.',part:'Not everything downloaded. Check your connection and tap again.',no:'This browser can’t save games. Open it in Safari or Chrome.',ask:'Download all games to your phone? About {mb} MB — Wi-Fi recommended.'},
   he:{dl:'מוריד',keep:'אל תסגרו את הדף',dn:'הורד',rd:'מוכן לאופליין',one:'הורד את המשחק — שחק בלי אינטרנט',all:'הורד את כל המשחקים — שחק בלי אינטרנט',ok:'מוכן! עכשיו זה עובד בלי אינטרנט — במטוס, באונייה, בכל מקום.',okall:'מוכן! כל משחקי תגשים שמורים בטלפון ועובדים בלי אינטרנט — במטוס, באונייה, בכל מקום.',home:'כדי לפתוח כמו אפליקציה: ב-Safari לחץ „שתף” ואז „הוסף למסך הבית”. ב-Chrome פתח את התפריט ובחר „התקן אפליקציה”.',net:'משחק אונליין עם חברים דורש אינטרנט.',need:'צריך אינטרנט כדי להוריד. אחר כך הכול עובד בלי רשת.',part:'לא הכול הורד. בדוק את החיבור ולחץ שוב.',no:'הדפדפן הזה לא יכול לשמור משחקים. פתח ב-Safari או Chrome.',ask:'להוריד את כל המשחקים לטלפון? בערך {mb} MB — עדיף ב-Wi-Fi.'},
   es:{dl:'Descargando',keep:'No cierres la página',dn:'Descargado',rd:'Listo sin internet',one:'Descargar este juego — jugar sin internet',all:'Descargar todos los juegos — jugar sin internet',ok:'¡Listo! Ahora funciona sin internet: en el avión, en el barco, donde sea.',okall:'¡Listo! Todos los juegos de Tagshim están guardados en tu teléfono y funcionan sin internet.',home:'Para abrirlo como app: en Safari toca «Compartir» y luego «Añadir a pantalla de inicio». En Chrome abre el menú y elige «Instalar app».',net:'El juego online con amigos necesita internet.',need:'Necesitas internet para descargar. Después todo funciona sin conexión.',part:'No se descargó todo. Revisa tu conexión y toca otra vez.',no:'Este navegador no puede guardar juegos. Ábrelo en Safari o Chrome.',ask:'¿Descargar todos los juegos al teléfono? Unos {mb} MB — mejor con Wi-Fi.'}};
  function t(k){return (T[lang()]||T.en)[k]}
  function done(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}}
  function mark(g){var d=done();d[g]=Date.now();try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}}
  var busy=false,btn;
  function label(x){if(btn)btn.textContent=x}
  /* видимая панель прогресса — главное, чтобы человек видел, что идёт скачивание и когда оно закончилось */
  var P=null;function panel(pct,mb,done,bad){if(!P){P=document.createElement('div');P.id='tgOffP';P.setAttribute('role','status');
     P.style.cssText='position:fixed;z-index:2147483001;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));width:min(92vw,420px);box-sizing:border-box;padding:12px 16px 14px;border-radius:16px;background:rgba(18,16,24,.94);color:#fff;font:600 15px system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.15)';
     P.innerHTML='<div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><span id="tgOffT"></span><b id="tgOffN" style="font-variant-numeric:tabular-nums"></b></div><div style="height:8px;border-radius:5px;background:rgba(255,255,255,.15);margin-top:8px;overflow:hidden"><i id="tgOffB" style="display:block;height:100%;width:0;background:#5ad05a;border-radius:5px;transition:width .3s"></i></div><div id="tgOffS" style="font:500 12px system-ui,sans-serif;opacity:.75;margin-top:6px"></div>';
     document.body.appendChild(P)}
   P.style.display='block';var T=document.getElementById('tgOffT'),N=document.getElementById('tgOffN'),B=document.getElementById('tgOffB'),S=document.getElementById('tgOffS');
   if(done){T.textContent=bad?t('part'):'✔ '+t('rd');N.textContent=bad?'':'100%';B.style.width='100%';B.style.background=bad?'#e0a030':'#5ad05a';S.textContent=bad?'':t('net');setTimeout(function(){if(P)P.style.display='none'},bad?6000:5000);return}
   T.textContent='📥 '+t('dl')+(mb?' · '+mb+' MB':'');N.textContent=pct+'%';B.style.width=pct+'%';S.textContent=t('keep')}
  function topBtn(x){var b=document.getElementById('offTop');if(b)b.textContent=x}
  function list(J,g){var s={},add=function(a){(a||[]).forEach(function(f){s[f]=1})};add(J.core);
    var gs=g==='*'?Object.keys(J.games):[g];
    gs.forEach(function(k){add(J.games[k]);(J.deps[k]||[]).forEach(function(d){add(J.games[d]||J.extra[d])})});
    return Object.keys(s)}
  function run(ask){
    if(busy)return;if(!window.caches||!window.fetch){if(ask)alert(t('no'));return}
    busy=true;
    fetch('/offline.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(J){
      var g=GAME;if(g!=='*'&&!J.games[g]){var p=g.split('/')[0];g=J.games[p]?p:'*'}
      var L=list(J,g);
      if(ask&&g==='*'&&!confirm(t('ask').replace('{mb}',J.mb||'75'))){busy=false;return}
      var MB=g==='*'?(J.mb||''):'';if(ask){panel(0,MB);topBtn('📥 0%')}
      return caches.open(CN).then(function(c){var i=0,n=0,bad=0;
        function next(){if(i>=L.length)return Promise.resolve();var part=L.slice(i,i+6);i+=6;
          return Promise.all(part.map(function(u){return c.match(u,{ignoreSearch:true}).then(function(m){if(m)return;return fetch(u,{cache:'no-cache'}).then(function(r){if(r.ok)return c.put(u,r);bad++})}).catch(function(){bad++}).then(function(){n++})}))
            .then(function(){var pc=Math.round(n/L.length*100);if(ask){label(pc+'%');panel(pc,MB);topBtn('📥 '+pc+'%')}return next()})}
        return next().then(function(){busy=false;
          if(!bad){mark(g);label('✔');if(ask){panel(100,MB,1,0);topBtn('✔ '+t('dn'));alert(t(g==='*'?'okall':'ok')+'\n\n'+t('home')+'\n\n'+t('net'))}}
          else{label('📥');if(ask){panel(0,MB,1,1);topBtn('📥 ⟳');alert(t('part'))}}})})
    }).catch(function(){busy=false;label('📥');if(P)P.style.display='none';if(ask)alert(t('need'))})}
  window.tagshimOffline=run;
  try{if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('/sw.js').catch(function(){})}catch(e){}
  function mk(){if(GAME==='*'){var d0=done();if(d0['*']){var fx=function(){topBtn('✔ '+t('dn'))};fx();setTimeout(fx,600);setTimeout(fx,2000);if(navigator.onLine)setTimeout(function(){run(0)},9000)}return}
    if(document.getElementById('tgOff'))return;btn=document.createElement('button');btn.id='tgOff';btn.type='button';
    btn.title=t(GAME==='*'?'all':'one');btn.setAttribute('aria-label',btn.title);
    var d=done();btn.textContent=(d[GAME]||d['*'])?'✔':'📥';
    btn.style.cssText='position:fixed;z-index:2147483000;left:max(6px,env(safe-area-inset-left));top:calc(50% + 26px);width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,.35);background:rgba(10,8,14,.55);color:#fff;font-size:16px;line-height:1;padding:0;cursor:pointer;opacity:.75;touch-action:manipulation;-webkit-tap-highlight-color:transparent';
    var stop=function(e){e.stopPropagation()};btn.addEventListener('pointerdown',stop);btn.addEventListener('touchstart',stop,{passive:true});btn.addEventListener('mousedown',stop);
    btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();run(1)});
    document.body.appendChild(btn);
    /* уже скачано — после обновления тихо докачать новое */
    if((d[GAME]||d['*'])&&navigator.onLine)setTimeout(function(){run(0)},9000)}
  if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk);
})();
