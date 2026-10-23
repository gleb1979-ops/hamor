import json,math,random
from PIL import Image,ImageDraw,ImageFilter
random.seed(7)
W,H=1672,941;RWI=58  # ширина дороги в пикселях картинки (RW128 / RK2.2)
# петля улиц баррио (по часовой на экране: низ → вправо → вверх → влево → вниз)
CP=[(560,725),(760,725),(760,645),(1100,645),(1100,725),(1425,725),(1425,470),(1335,470),(1335,335),(1425,335),(1425,190),(1005,190),(1005,265),(705,265),(705,190),(245,190),(245,440),(330,440),(330,560),(245,560),(245,725)]
def fillet(P,R=34,step=6):
    out=[];n=len(P)
    for i in range(n):
        a=P[i-1];b=P[i];c=P[(i+1)%n]
        v1=(a[0]-b[0],a[1]-b[1]);l1=math.hypot(*v1);v2=(c[0]-b[0],c[1]-b[1]);l2=math.hypot(*v2)
        r=min(R,l1/2.2,l2/2.2);p1=(b[0]+v1[0]/l1*r,b[1]+v1[1]/l1*r);p2=(b[0]+v2[0]/l2*r,b[1]+v2[1]/l2*r)
        for k in range(9):
            t=k/8;out.append(((1-t)**2*p1[0]+2*(1-t)*t*b[0]+t*t*p2[0],(1-t)**2*p1[1]+2*(1-t)*t*b[1]+t*t*p2[1]))
    # равномерно по длине
    res=[out[0]];acc=0
    for i in range(1,len(out)+1):
        p=out[i%len(out)];q=res[-1];dd=math.hypot(p[0]-q[0],p[1]-q[1])
        while dd>=step:
            q=(q[0]+(p[0]-q[0])*step/dd,q[1]+(p[1]-q[1])*step/dd);res.append(q);dd=math.hypot(p[0]-q[0],p[1]-q[1])
    return res[:-1]
def chaikin(P,it=4):
    for _ in range(it):
        Q=[]
        for i in range(len(P)):
            a=P[i];b=P[(i+1)%len(P)]
            Q.append((a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25));Q.append((a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75))
        P=Q
    return P
CL=fillet(CP)
# начнём петлю снизу по центру
i0=min(range(len(CL)),key=lambda i:(CL[i][0]-560)**2+(CL[i][1]-725)**2);CL=CL[i0:]+CL[:i0]
# дома внутри (прямоугольники) — твёрдые
HOUSES=[(320,265,470,360),(400,600,560,670),(520,320,640,380),(1070,250,1230,330),(1180,560,1340,660),(1240,400,1290,440),(870,330,960,380)]
PLAZA=(650,420,910,560)   # футбольная площадка — открыто
TREES=[(420,420,26),(560,560,28),(600,430,20),(955,560,26),(960,420,22),(720,340,20),(845,585,18),(640,610,18),(1160,420,30),(1100,560,22),(1010,585,18),(300,655,18),(1270,330,18),(560,250,18)]
OTHER=[(700,610,16,'r'),(1365,615,14,'w'),(500,600,15,'d')]  # блоки, покрышки, колонка, диван
PATHS=[
 [(330,500),(400,500),(480,495),(650,490),(910,490),(1060,495),(1200,500),(1300,520),(1425,520)],
 [(780,265),(780,300),(780,420),(780,560),(780,645)],
 [(1005,265),(1010,300),(1030,360),(1100,460),(1200,480),(1335,470)],
 [(330,725),(330,690),(345,600),(420,520),(560,495),(650,490)]]
def circ_from_rect(x0,y0,x1,y1):
    w,h=x1-x0,y1-y0;r=min(w,h)/2;n=max(1,round(max(w,h)/(r*1.4)));out=[]
    for k in range(n):
        t=(k+.5)/n
        if w>=h:out.append((x0+w*t,(y0+y1)/2,r*1.05))
        else:out.append(((x0+x1)/2,y0+h*t,r*1.05))
    return out
OBI=[]
for hx in HOUSES:
    for c in circ_from_rect(*hx):OBI.append([round(c[0]),round(c[1]),round(c[2]),'h'])
for x,y,r in TREES:OBI.append([x,y,r,'t'])
for x,y,r,k in OTHER:OBI.append([x,y,r,k])
# --- проверки: препятствия не на дороге и не на тропах
def segd(px,py,a,b):
    ax,ay=a;bx,by=b;dx,dy=bx-ax,by-ay;L=dx*dx+dy*dy or 1;t=max(0,min(1,((px-ax)*dx+(py-ay)*dy)/L));return math.hypot(px-ax-dx*t,py-ay-dy*t)
def droad(x,y):return min(math.hypot(x-p[0],y-p[1]) for p in CL)
bad=[]
for x,y,r,k in OBI:
    if droad(x,y)<RWI/2+r+6:bad.append(('road',x,y,r,k))
    for P in PATHS:
        if min(segd(x,y,P[i],P[i+1]) for i in range(len(P)-1))<r+16:bad.append(('path',x,y,r,k))
print('конфликты',bad)
json.dump({'CL':[[round(x,1),round(y,1)] for x,y in CL],'OBI':OBI,'PATHS':[[list(p) for p in P] for P in PATHS],'HOUSES':HOUSES,'PLAZA':PLAZA},open('layout.json','w'))
# --- чистая схема для ChatGPT
im=Image.new('RGB',(W,H),(58,74,52));d=ImageDraw.Draw(im)
# внешние кварталы (декор): дома вокруг петли
random.seed(3)
placed=[]
for _ in range(6000):
    x=random.randint(-20,W);y=random.randint(-20,H);w=random.randint(46,96);h=random.randint(38,72)
    cx,cy=x+w/2,y+h/2
    if any(not(x+w+8<a or x>c+8 or y+h+8<b or y>e+8) for a,b,c,e in placed):continue
    if droad(cx,cy)<RWI/2+max(w,h)/2+14:continue
    # не внутрь петли
    inside=False;n=len(CL);j=n-1
    for i in range(n):
        xi,yi=CL[i];xj,yj=CL[j]
        if (yi>cy)!=(yj>cy) and cx<(xj-xi)*(cy-yi)/(yj-yi)+xi:inside=not inside
        j=i
    if inside:continue
    placed.append((x,y,x+w,y+h))
    col=random.choice([(214,120,90),(232,196,120),(120,170,200),(200,110,150),(150,200,140),(240,230,210)])
    d.rectangle([x,y,x+w,y+h],fill=col,outline=(60,40,30),width=2)
# дорога: тротуар + асфальт + пунктир
pts=CL+[CL[0]]
d.line(pts,fill=(170,165,155),width=RWI+16,joint='curve')
d.line(pts,fill=(70,70,76),width=RWI,joint='curve')
for i in range(len(CL)):
    a=CL[i];b=CL[(i+1)%len(CL)]
    if (i//3)%2==0:d.line([a,b],fill=(235,235,225),width=3)
# площадь
d.rectangle(PLAZA,fill=(86,150,80),outline=(240,240,240),width=3);cx=(PLAZA[0]+PLAZA[2])/2;d.line([(cx,PLAZA[1]),(cx,PLAZA[3])],fill=(240,240,240),width=3);d.ellipse([cx-28,(PLAZA[1]+PLAZA[3])/2-28,cx+28,(PLAZA[1]+PLAZA[3])/2+28],outline=(240,240,240),width=3)
# тропы
for P in PATHS:d.line(P,fill=(196,160,110),width=30,joint='curve')
# дома внутри
for x0,y0,x1,y1 in HOUSES:
    d.rectangle([x0,y0,x1,y1],fill=(205,110,80),outline=(60,30,20),width=3);d.line([(x0,(y0+y1)/2),(x1,(y0+y1)/2)],fill=(150,70,50),width=3)
# деревья
for x,y,r in TREES:d.ellipse([x-r,y-r,x+r,y+r],fill=(40,120,50),outline=(20,60,25),width=3)
for x,y,r,k in OTHER:d.ellipse([x-r,y-r,x+r,y+r],fill={'b':(150,150,150),'r':(30,30,30),'w':(90,140,190),'d':(150,60,60)}[k],outline=(20,20,20),width=2)
im.save('base_clean.png')
# проверочная версия с зонами столкновений
ch=im.copy();d2=ImageDraw.Draw(ch)
for x,y,r,k in OBI:d2.ellipse([x-r,y-r,x+r,y+r],outline=(255,0,255),width=2)
for P in PATHS:d2.line(P,fill=(255,255,0),width=2)
ch.save('base_check.png')
print('точек дороги',len(CL),'препятствий',len(OBI))
