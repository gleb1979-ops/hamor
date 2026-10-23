"""Список файлов для кнопки «📥 Офлайн» во всех играх Тагшима -> /offline.json.
Запускать после добавления/удаления картинок в любой игре: python3 tools/mk_offline.py"""
import os,re,json
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIPD={'src','video','download','i18n_src','server','.git','tools','node_modules','privacy','cartoons','models_src'}
SKIPE=('.py','.md','.zip','.mp4','.mov','.psd','.txt','.toml','.jsonc','.sh')
HIDDEN=set()   # скрытые игры (своя кнопка, не в общем списке) — сейчас нет
def is_game(d): return os.path.isfile(os.path.join(R,d,'index.html'))
def files_of(d,stop_games=True):
    out=[]
    for root,ds,fs in os.walk(os.path.join(R,d)):
        rel=os.path.relpath(root,R)
        ds[:]=[x for x in ds if x not in SKIPD and not (stop_games and is_game(os.path.join(rel,x)))]
        for f in fs:
            if f.endswith(SKIPE) or f.startswith('.'):continue
            out.append('/'+os.path.join(rel,f).replace(os.sep,'/'))
    return sorted(out)
games={}
for root,ds,fs in os.walk(R):
    rel=os.path.relpath(root,R)
    ds[:]=[x for x in ds if x not in SKIPD]
    if rel=='.' or 'index.html' not in fs:continue
    top=rel.split(os.sep)[0]
    if top in HIDDEN or top in SKIPD:continue
    games[rel.replace(os.sep,'/')]=None
deps={};gf={}
for g in games:
    fl=files_of(g);gf[g]=fl+['/'+g+'/']
    txt=''
    for f in fl:
        if f.endswith(('.html','.js')):
            try:txt+=open(R+f,encoding='utf-8',errors='ignore').read()
            except:pass
    ds=set()
    for m in re.finditer(r"""['"(`](\.\./(?:\.\./)?[a-z0-9_-]+)/""",txt):
        p=os.path.normpath(os.path.join(g,m.group(1))).replace(os.sep,'/')
        if p.startswith('..'):continue
        if p not in ('shared','sfx'):ds.add(p)
    for m in re.finditer(r"""['"(`]/([a-z0-9_-]+)/[a-z0-9_./-]*\.(?:webp|png|jpg|mp3|ogg|js|json|glb)""",txt):
        if m.group(1) not in HIDDEN and m.group(1)!=g.split('/')[0]:ds.add(m.group(1))
    deps[g]=sorted(d for d in ds if os.path.isdir(os.path.join(R,d)) and d not in HIDDEN)
extra={}
for g in deps.values():
    for d in g:
        if d not in gf and d not in extra:extra[d]=files_of(d)
core=['/','/index.html','/manifest.json','/favicon.png','/net.js','/update.js','/sw.js','/og-hub.png']+files_of('shared',False)+files_of('sfx',False)+files_of('brand',False)
core=[c for c in core if c=='/' or os.path.isfile(R+c)]
J={'core':core,'games':gf,'deps':deps,'extra':extra}
_a=set(core)
for v in gf.values():_a|=set(v)
for v in extra.values():_a|=set(v)
J['mb']=round(sum(os.path.getsize(R+f) for f in _a if os.path.isfile(R+f))/1e6)
json.dump(J,open(os.path.join(R,'offline.json'),'w'),separators=(',',':'))
allf=set(core)
for v in gf.values():allf|=set(v)
for v in extra.values():allf|=set(v)
size=sum(os.path.getsize(R+f) for f in allf if os.path.isfile(R+f))
print(len(gf),'games',len(allf),'files',round(size/1e6,1),'MB');print({g:d for g,d in deps.items() if d})
