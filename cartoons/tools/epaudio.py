import numpy as np,subprocess,wave
SR=44100;L=30.0;N=int(SR*L);mix=np.zeros(N)
def load(n):
    raw=subprocess.run(['ffmpeg','-v','quiet','-i',f'/home/claude/hamor/sfx/{n}.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    return np.frombuffer(raw,dtype=np.int16).astype(np.float64)/32768
cache={}
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
def bray(t,parts,vol=.22):
    for k,(f0,f1,d) in enumerate(parts):
        n=int(d*SR);f=np.linspace(f0,f1,n);ph=2*np.pi*np.cumsum(f)/SR;w=(ph/(2*np.pi)%1)*2-1
        w=w*.6+np.sin(ph*2)*.3;i=int((t+sum(p[2] for p in parts[:k]))*SR);e=min(N,i+n);mix[i:e]+=(w*env(n,.02,.05)*vol)[:e-i]
mid=lambda m:440*2**((m-69)/12)
t=0.2
while t<19:
    root=[57,53,55,52][int(t/2.4)%4]
    for k,iv in enumerate([0,3,7,12,7,3]):
        tt=t+k*.4
        if tt<19:tone(tt,mid(root+iv),.6,.05,'sin');tone(tt+.2,mid(root+iv+12),.3,.015,'sin')
    tone(t,mid(root-12),2.3,.06,'tri');t+=2.4
noise=np.random.RandomState(1).randn(N);wind=np.convolve(noise,np.ones(400)/400,'same')*1.2
wenv=np.clip(np.sin(np.arange(N)/SR*.7)*.5+.6,0,1);wenv[int(19*SR):]=0;mix+=wind*wenv*.25
n=int(2.2*SR);th=np.convolve(np.random.RandomState(2).randn(n),np.ones(250)/250,'same')*6*np.exp(-np.arange(n)/SR*1.6);i=int(2.62*SR);mix[i:i+n]+=th*.9
put(2.8,'whoosh',.35,.8);bray(2.9,[(700,900,.18),(300,260,.22)],.12)
put(5.5,'whoosh',.4,.7)
for k2,f in enumerate([400,480,560,700]):tone(7.2+k2*.12,f,.5,.05,'sin')
put(8.05,'ko',.8,.9);put(8.08,'hpunch1',.4,.7)
bray(8.25,[(650,950,.22),(320,250,.28),(650,950,.22),(320,250,.3)],.2)
for tt in [8.9,9.2,9.45,9.65,9.85,10.05,10.25,10.45]:put(tt,'whoosh',.35,1.4)
for tt in [12.6,12.9,14.4,14.9,16.2,16.5,17.4,17.7]:put(tt,'pick',.55)
put(15.1,'bump',.5,1.2);put(15.5,'punch0',.7);put(15.55,'kick',.4,1.3)
put(17.9,'team',.6);put(19.0,'win',.7);put(19.3,'goal',.35)
for k2 in range(13):
    tt=19.4+k2*.25;tone(tt,mid([72,76,79,84,79,76,72,76,79,84,88,84,79][k2]),.22,.05,'tri')
    if k2%2==0:tone(tt,mid(48+[0,0,5,7,0,0,5][k2//2]),.24,.06,'tri')
put(23.0,'whoosh',.3,.6)
for k2 in range(8):put(24.1+k2*.18,'click',.25,.6+(k2%2)*.3)   # chewing
bray(24.6,[(600,850,.16),(300,260,.2)],.14)
put(24.4,'err',.4)
for k2,m in enumerate([62,65,69,68,62,65,69,70]):tone(22.8+k2*.45,mid(m),.4,.05,'sin')
put(26.5,'go',.6);put(26.9,'buy',.45)
for k2,m in enumerate([60,64,67,72,67,72,76,79]):tone(26.6+k2*.18,mid(m),.2,.045,'square')
for m in (72,76,79):tone(28.2,mid(m),.9,.045,'tri')
mix[-int(.8*SR):]*=np.linspace(1,0,int(.8*SR))
mix=mix/max(1e-9,np.abs(mix).max())*.9
w=wave.open('ep/audio.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close();print('audio ok')
