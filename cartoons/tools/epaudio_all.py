import numpy as np,subprocess,wave,sys,math
SR=44100;L=30.0
def load(n):
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f'/home/claude/hamor/sfx/{n}.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    return np.frombuffer(raw,dtype=np.int16).astype(np.float64)/32768
cache={}
mid=lambda m:440*2**((m-69)/12)
def build(ep,theme,cues):
    N=int(SR*L);mix=np.zeros(N)
    def put(t,n,vol=.6,rate=1.0):
        a=cache.setdefault(n,load(n))
        if rate!=1.0:a=np.interp(np.arange(0,len(a)-1,rate),np.arange(len(a)),a)
        i=int(t*SR);e=min(N,i+len(a));mix[i:e]+=a[:e-i]*vol
    def env(n,a=.01,r=.2):
        e=np.ones(n);k=max(1,int(a*SR));e[:k]=np.linspace(0,1,k);k2=max(1,min(n,int(r*SR)));e[-k2:]*=np.linspace(1,0,k2);return e
    def tone(t,f,d,vol=.15,kind='tri'):
        n=int(d*SR);x=np.arange(n)/SR;ph=2*np.pi*f*x
        w=np.sin(ph) if kind=='sin' else (2/np.pi)*np.arcsin(np.sin(ph)) if kind=='tri' else np.sign(np.sin(ph))*.5
        i=int(t*SR);e=min(N,i+n);mix[i:e]+=(w*env(n,.01,min(.3,d*.6))*vol)[:e-i]
    def bray(t,vol=.18,n=2):
        parts=[(650,950,.16),(320,250,.2)]*n
        for k,(f0,f1,d) in enumerate(parts):
            m=int(d*SR);f=np.linspace(f0,f1,m);ph=2*np.pi*np.cumsum(f)/SR;w=(ph/(2*np.pi)%1)*2-1;w=w*.6+np.sin(ph*2)*.3
            i=int((t+sum(p[2] for p in parts[:k]))*SR);e=min(N,i+m);mix[i:e]+=(w*env(m,.02,.05)*vol)[:e-i]
    def noise(t,d,vol,smooth=250,dec=1.6):
        n=int(d*SR);x=np.convolve(np.random.RandomState(int(t*10)).randn(n),np.ones(smooth)/smooth,'same')*6*np.exp(-np.arange(n)/SR*dec);i=int(t*SR);e=min(N,i+n);mix[i:e]+=x[:e-i]*vol
    # music themes: (scale degrees, root, tempo, wave)
    TH={'happy':([0,4,7,12,7,4,2,5],60,.3,'sin'),'spooky':([0,3,7,12,7,3,1,6],57,.42,'sin'),'western':([0,4,7,9,7,4,2,4],55,.28,'tri'),'tense':([0,3,5,7,8,7,5,3],57,.24,'tri'),'fair':([0,4,7,12,9,7,4,7],62,.26,'sin'),'beach':([0,2,4,7,9,7,4,2],60,.32,'sin'),'italian':([0,4,7,12,11,7,5,4],60,.25,'tri'),'snow':([0,4,7,11,12,11,7,4],64,.34,'sin')}
    sc,root,sp,wv=TH[theme];k=0;t=.3
    while t<26.3:
        tone(t,mid(root+sc[k%8]+12),sp*.8,.03,wv)
        if k%2==0:tone(t,mid(root+[0,5,7,0][(k//8)%4]-12),sp*1.6,.06,'tri')
        k+=1;t+=sp
    for c in cues:
        if c[0]=='bray':bray(c[1],*(c[2:]))
        elif c[0]=='noise':noise(*c[1:])
        elif c[0]=='tone':tone(*c[1:])
        else:put(*c)
    put(26.5,'go',.6);put(26.9,'buy',.45)
    for k2,m in enumerate([60,64,67,72,67,72,76,79]):tone(26.6+k2*.18,mid(m),.2,.045,'square')
    for m in (72,76,79):tone(28.2,mid(m),.9,.045,'tri')
    mix[-int(.8*SR):]*=np.linspace(1,0,int(.8*SR));mix=mix/max(1e-9,np.abs(mix).max())*.9
    w=wave.open(f'ep/audio_{ep}.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
EPS={
 'school':('tense',[(1.2,'err',.3),(7.0,'click',.6),(7.4,'pick',.4),('bray',7.2,.12,1),(8.6,'hpunch1',.6),(8.62,'ko',.4,1.4),(8.9,'team',.3,1.3),(12.4,'kick',.7),(12.45,'punch0',.4),(13.9,'kick',.7),(15.4,'kick',.7),(16.8,'err',.5),(17.0,'lose',.3,1.3),(19.0,'win',.5),(24.2,'whoosh',.4),('tone',24.4,1800,.6,.08,'sin'),('tone',24.5,2000,.5,.08,'sin')]),
 'soccer':('happy',[(1,'whoosh',.3),(5.6,'click',.4),(8.3,'kick',.8),('bray',8.0,.14,1),(8.8,'bump',.6),(9.4,'err',.3),(12.6,'kick',.5),(13.6,'kick',.7),(13.6,'ball',.4),(15.1,'kick',.8),(15.6,'goal',.8),(15.7,'team',.5),(20.2,'kick',.9),(20.25,'whoosh',.6,.7),(22.9,'punch1',.4,.6),('noise',22.9,1.2,.4,400,2)]),
 'snow':('snow',[(1.3,'pick',.3),(5.8,'whoosh',.3,.6),('bray',6.3,.14,1),(8.4,'bump',.6,.7),(8.5,'snow0',.6),(11.6,'snow1',.5),(12.3,'snow2',.5),(13.1,'snow0',.5),(13.8,'snow1',.5),(14.6,'snow2',.5),(15.3,'snow0',.5),(15.4,'medal',.4),(16.6,'whoosh',.5),(17.05,'ko',.5),(17.6,'snow1',.5),(20.2,'whoosh',.5,.6),(23.9,'snow2',.7),(24.3,'hpunch2',.5),(24.4,'err',.4)]),
 'box':('tense',[(1,'whoosh',.3),(6,'ko',.35,1.6),(7,'ko',.35,1.6),(7.8,'ko',.35,1.6),(8.6,'ko',.35,1.6),('bray',6.2,.14,1),(11.5,'punch0',.6),(12.4,'punch1',.6),(13.3,'punch2',.6),(14,'hpunch0',.7),(15.9,'hpunch1',.7),(16,'err',.3),(17.2,'punch0',.6),(17.8,'hpunch2',.8),(19.0,'ko',.8),(19.2,'win',.5),(23.6,'medal',.5),(24.2,'pick',.4)]),
 'villain':('fair',[(1,'pick',.3),(6.4,'click',.5),(7.4,'click',.5),(8.6,'click',.5),(9.2,'punch0',.6),(9.25,'err',.4),(12,'pick',.4),(12.8,'pick',.4),(13.6,'pick',.4),(14.4,'pick',.4),(15.4,'pick',.4),(16.3,'pick',.4),(17.1,'pick',.4),(17.9,'pick',.4),(20.3,'whoosh',.5),(20.4,'err',.4),('bray',20.6,.18,2),(23.6,'whoosh',.4,.7),('bray',24.2,.14,1)]),
 'balloon':('fair',[(1.2,'whoosh',.3),('bray',2,.12,1),(7.2,'bump',.6,1.6),(8.4,'bump',.6,1.6),(12.2,'bump',.6,1.6),(13.4,'bump',.6,1.6),(13.9,'pick',.4),(14.6,'pick',.4),(15,'bump',.6,1.6),(16,'pick',.4),(16.6,'bump',.6,1.6),(17.3,'pick',.4),(17.9,'pick',.4),(20.5,'whoosh',.4,.6),(21.5,'whoosh',.4,.5),(23.2,'whoosh',.5,.5)]),
 'train':('western',[(3.6,'bump',.6,.7),(3.7,'snow0',.3),('tone',6.1,330,.5,.12,'square'),('tone',6.7,330,.5,.12,'square'),('tone',7.3,294,.8,.12,'square'),('bray',8.3,.14,1),(12.6,'pick',.5),(13,'pick',.5),(13.9,'err',.5),(14,'click',.5),(14.2,'buy',.5),(14.8,'buy',.5),(16.8,'click',.5),(17.4,'team',.4),(17.6,'buy',.5),(19.2,'win',.6),(23.6,'whoosh',.4),(24.2,'err',.5),(24.3,'ko',.3,1.3)]),
 'dino':('spooky',[(1,'whoosh',.25,.7),(8.6,'whoosh',.4,.5),(8.7,'medal',.4,.6),('noise',9.4,1.2,.5,120,1.8),(12.4,'pick',.4),(13.2,'pick',.4),(13.6,'err',.5),('noise',13.7,.8,.35,120,2),(15.6,'pick',.4),(15.8,'punch0',.5),(16.8,'pick',.4),(17.8,'pick',.4),(19.2,'win',.5),('noise',23.2,2.2,.9,250,1.4),('noise',24.6,2,.8,250,1.4),(25.5,'err',.3)]),
 'pirate':('beach',[(.4,'whoosh',.4,.6),(2.2,'bump',.4,.7),(6,'snow0',.5,.6),(7,'snow1',.5,.6),(8,'snow2',.5,.6),('bray',6.3,.12,1),(12.6,'pick',.5),(13.6,'pick',.5),(14.8,'pick',.5),(15.5,'punch1',.5),(16,'pick',.5),(17.4,'buy',.6),(17.5,'medal',.5),(19.4,'click',.5),(19.6,'win',.4),(23.3,'medal',.5),(23.6,'goal',.4)]),
 'sniper':('spooky',[(1,'whoosh',.25,.7),('bray',6.6,.13,1),(7.0,'click',.7),(7.05,'err',.4),('noise',7.1,.6,.3,400,3),(8.6,'whoosh',.3,.6),('bray',8.5,.12,1),(9.8,'click',.4,.7),(10.0,'click',.4,.8),(10.2,'click',.4,.9),('tone',13.3,2400,.25,.05,'sin'),(15.5,'whoosh',.5,.8),('noise',16.3,1.1,.8,120,2.2),(16.35,'ko',.4,.7),(17.2,'snow0',.5,.5),('noise',17.2,.35,.9,25,9),(17.3,'pick',.5),(17.4,'ko',.4,1.3),(19.3,'click',.6),(19.6,'win',.45),('bray',20.6,.16,2),(23.2,'whoosh',.3,.5),('tone',25.0,1800,.2,.04,'sin'),('tone',25.2,1600,.25,.04,'sin')]),
 'pizza':('italian',[(1,'pick',.3),(6.4,'click',.4),(6.6,'click',.4,.7),(6.8,'click',.4),(7,'click',.4,.7),('tone',6.5,1800,.08,.04,'sin'),('tone',6.65,2100,.08,.04,'sin'),(12.6,'pick',.5),(13.6,'pick',.5),(14.8,'pick',.5),(16,'pick',.5),(17.4,'whoosh',.5,.6),('noise',17.4,1.4,.25,60,1),(19.2,'win',.5),(19.5,'team',.4),('bray',23.4,.16,1),(24.4,'err',.5),(24.5,'ko',.5),(24.7,'bump',.5),(25,'lose',.4)]),
}
for ep in (sys.argv[1:] or EPS):
    th,c=EPS[ep];build(ep,th,c);print('audio',ep)
