/* Auto-update: on every open / return to the app, compare the deployed version and reload when it changed. */
(function(){var K='tagshim_v',busy=false;
function inGame(){try{return !!(window.TG_BUSY&&window.TG_BUSY())}catch(e){return false}}
function check(){if(busy)return;if(inGame()){setTimeout(check,20000);return}busy=true;fetch('/version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){busy=false;if(!j||!j.v)return;var old=null;try{old=localStorage.getItem(K)}catch(e){}
  if(old===j.v)return;try{localStorage.setItem(K,j.v)}catch(e){}if(old===null)return;
  var done=function(){location.reload()};var jobs=[];if(window.caches&&caches.keys)jobs.push(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}));
  if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations)jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.update()}))}));
  Promise.all(jobs).then(done,done)}).catch(function(){busy=false})}
check();document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')check()});})();
