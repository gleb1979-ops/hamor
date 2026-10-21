import re,json,sys
srcs=['/home/claude/hamor/svinec/index.html','/home/claude/hamor/shared/mute.js']
WIDE=re.compile(r"[А-Яа-яЁё][А-Яа-яЁё0-9 ,.!?:;«»\"—–\-'’…·%+×/№()]*")
NARROW=re.compile(r"[А-Яа-яЁё][А-Яа-яЁё ,.!?:;«»—–\-'’…]*")
SPLIT=re.compile(r"[:·—«»\"!?.,()]+")
EDGE=re.compile(r"^[\s«»\"(—–\-·:,.!?…;]*(.*?)[\s«»\")—–\-·:,.!?…;]*$",re.S)
def core(t):
    m=EDGE.match(t);return m.group(1) if m else t.strip()
keys={}
for f in srcs:
    s=open(f).read()
    # skip JS comments roughly: remove /* */ and // lines
    s=re.sub(r'/\*.*?\*/','',s,flags=re.S)
    s=re.sub(r'(?m)^\s*//.*$','',s); s=re.sub(r'(?m)^\s*#.*$','',s) if f.endswith('.py') else s
    for m in WIDE.finditer(s):
        w=m.group(0)
        for k in [w.strip(),core(w)]+[core(n) for n in NARROW.findall(w)]+[core(p) for n in NARROW.findall(w) for p in SPLIT.split(n)]:
            if k and re.search('[А-Яа-яЁё]',k):
                if k not in keys:
                    i=m.start();keys[k]=s[max(0,i-70):i+len(w)+40].replace('\n',' ')
print(len(keys),sum(len(k) for k in keys),file=sys.stderr)
json.dump(keys,open('keys.json','w'),ensure_ascii=False,indent=0)
