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

mid=lambda m:440*2**((m-69)/12)
import math
def rnd(i):
    s=math.sin(i*127.1+311.7)*43758.5453;return s-math.floor(s)
chords=[(48,[60,64,67]),(53,[60,65,69]),(55,[59,62,67]),(48,[60,64,67])]
t=0.3
while t<26.3:
    root,ch=chords[int(t/1.2)%4];sp=1.2 if 3.6<t<19 else 1.6
    tone(t,mid(root),.16,.07,'tri');tone(t+sp/4,mid(ch[0]),.1,.03,'square');tone(t+sp/2,mid(root+7),.16,.06,'tri');tone(t+3*sp/4,mid(ch[1]),.1,.03,'square')
    t+=sp
mel=[72,76,79,76,74,77,81,77,71,74,79,74,72,76,84,79]
for k in range(90):
    tt=.3+k*.3
    if tt<26.3:tone(tt,mid(mel[k%16]+(2 if 5.5<tt<19 else 0)),.16,.03,'sin')
put(3.35,'click',.7);put(3.45,'err',.5)
for k in range(10):tone(3.6+k*.2,880 if k%2 else 660,.12,.04,'square')  # alarm
T2=11
LAND=[(6+i*.27) for i in range(16)]
for st in LAND:put(st,'whoosh',.22,1.5)
OWN={'girl':[0,4,8,12,15],'tall':[1,5,9,13],'nerd':[2,6,10,14],'fat':[3,7,11]}
FR=['girl','fat','tall','nerd']
for c in FR:
    for j,b in enumerate(OWN[c]):
        pt=T2+.6+(j+1)*(7.0/(len(OWN[c])+.5))+FR.index(c)*.12
        if c=='fat':
            for q in range(4):put(pt+q*.15,'click',.3,.6+(q%2)*.3)
        else:put(pt,'pick',.45)
put(14.2,'punch1',.6);put(14.25,'bump',.4)
bray(16.6,[(650,950,.15),(320,250,.2),(650,950,.15),(320,250,.2)],.15)
put(19.4,'win',.6);put(19.6,'goal',.3);put(20.0,'lose',.25,1.2)
put(23.6,'whoosh',.3,.7);put(24.4,'err',.5);put(24.6,'ko',.3,1.3);bray(25.1,[(650,950,.15),(320,250,.2)],.14)
put(26.5,'go',.6);put(26.9,'buy',.45)
for k2,m in enumerate([60,64,67,72,67,72,76,79]):tone(26.6+k2*.18,mid(m),.2,.045,'square')
for m in (72,76,79):tone(28.2,mid(m),.9,.045,'tri')
mix[-int(.8*SR):]*=np.linspace(1,0,int(.8*SR))
mix=mix/max(1e-9,np.abs(mix).max())*.9
w=wave.open('ep/audio_b.wav','wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close();print('audio ok')
