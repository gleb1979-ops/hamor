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
# bouncy music whole piece (except end), C major oom-pah
chords=[(48,[60,64,67]),(53,[60,65,69]),(55,[59,62,67]),(48,[60,64,67])]
t=0.3
while t<26.3:
    root,ch=chords[int(t/1.6)%4]
    tone(t,mid(root),.18,.07,'tri');tone(t+.4,mid(ch[0]),.12,.035,'square');tone(t+.8,mid(root+7),.18,.06,'tri');tone(t+1.2,mid(ch[1]),.12,.035,'square')
    mel=[72,76,79,76,74,77,81,77,71,74,79,74,72,76,84,79][int(t/.4)%16] if t<10.3 or t>18 else None
    t+=1.6
for k in range(64):
    tt=.3+k*.4
    if tt<10.3 or (18<tt<22.3):tone(tt,mid([72,76,79,76,74,77,81,77,71,74,79,74,72,76,84,79][k%16]),.2,.035,'sin')
# growl
n=int(1.0*SR);gr=np.convolve(np.random.RandomState(3).randn(n),np.ones(600)/600,'same')*8*np.sin(np.linspace(0,np.pi,n))*(1+.5*np.sin(np.arange(n)/SR*40));i=int(4.2*SR);mix[i:i+n]+=gr*.6
put(5.6,'click',.5);bray(6.1,[(650,900,.15),(320,260,.18)],.1);put(7.2,'pick',.5)   # door, donkey hi, sign
bray(7.9,[(700,950,.12),(330,260,.15),(700,950,.12),(330,260,.15)],.12)  # donkey laugh
for k,tt in enumerate([10.9,11.5,12.1]):put(tt,'tick',.7)
put(12.7,'go',.7)
for tt in [13.0,13.15,13.35]:put(tt,'whoosh',.35,1.3)
put(14.1,'whoosh',.3,.8);put(14.25,'bump',.4)
put(14.6,'err',.4);bray(14.7,[(650,950,.22),(320,250,.3),(650,950,.22),(320,250,.32)],.22)
for k in range(5):tone(15.0+k*.13,600+k*40,.1,.03,'square')   # laughs
for k in range(9):put(18.3+k*.2,'click',.3,.55+(k%2)*.3)  # chomp
put(20.2,'medal',.6);put(20.4,'win',.5)
for k in range(10):put(22.6+k*.38,['punch0','pick','bump','punch1','pick'][k%5],.35,1+(k%3)*.15)
put(26.5,'go',.6);put(26.9,'buy',.45);bray(27.3,[(650,950,.16),(320,250,.2)],.14)
for k2,m in enumerate([60,64,67,72,67,72,76,79]):tone(26.6+k2*.18,mid(m),.2,.045,'square')
for m in (72,76,79):tone(28.2,mid(m),.9,.045,'tri')
mix[-int(.8*SR):]*=np.linspace(1,0,int(.8*SR))
mix=mix/max(1e-9,np.abs(mix).max())*.9
w=wave.open('ep/audio_d.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close();print('audio ok')
