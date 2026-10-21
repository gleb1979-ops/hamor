import json
s=open('runtime.js').read()
D={}
for i in range(8): D.update(json.load(open(f'out_{i}.json')))
for k,v in list(D.items()):
    c=k.strip(" '\"")
    if c!=k and c and c not in D: D[c]=[x.strip(" '\"") for x in v]
for k,v in list(D.items()):
    if len(k)<60 and k.upper() not in D: D[k.upper()]=[x.upper() for x in v]
D["СВИНЕЦ ИЛИ СЕРЕБРО"]=["PLATA O PLOMO","PLATA O PLOMO"]
print(len(D))
open('/home/claude/hamor/svinec/i18n.js','w').write('window.I18N_D='+json.dumps(D,ensure_ascii=False,separators=(',',':'))+';\n'+s)
