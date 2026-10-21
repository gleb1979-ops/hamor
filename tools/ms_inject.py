# вставляет shared/ms_src.js внутрь кода игры (Улица, Свинец) между метками /*MS>*/ … /*<MS*/
import re
src=open('shared/ms_src.js').read()
for P in ['ulica/index.html','svinec/index.html']:
    s=open(P).read()
    blk='/*MS>*/\n'+src+'/*<MS*/\n'
    if '/*MS>*/' in s: s=re.sub(r'/\*MS>\*/\n.*?/\*<MS\*/\n',lambda m:blk,s,flags=re.S)
    else:
        a="let HOLD=0;window.TG_BUSY";assert s.count(a)==1;s=s.replace(a,blk+a)
    a="(me.weapon==='pistol'?' ×'+me.ammo:'')"
    if a in s: s=s.replace(a,"(WEAPONS[me.weapon].gun?' ×'+me.ammo:'')")
    a="· нокаутов: ${G.F[0].kills}</p>${progLine()}"
    if a in s: s=s.replace(a,"· нокаутов: ${G.F[0].kills}</p>${msEnd(won)}${progLine()}")
    open(P,'w').write(s);print(P,'ok')
