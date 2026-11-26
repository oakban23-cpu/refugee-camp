import sys,numpy as np,random
from PIL import Image,ImageFilter
from scipy import ndimage
src,out=sys.argv[1],sys.argv[2]
a=np.asarray(Image.open(src).convert('RGB')).astype(int)
m=a.max(2)>40;m=ndimage.binary_opening(m,iterations=2);lab,n=ndimage.label(m)
st=[]
for i,sl in enumerate(ndimage.find_objects(lab)):
    ys,xs=sl
    if (ys.stop-ys.start)<100:continue
    rgb=a[ys,xs];al=(lab[ys,xs]==i+1)
    al=ndimage.binary_erosion(al,iterations=3)
    alf=np.asarray(Image.fromarray((al*255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.2)))
    im=np.dstack([rgb,alf]).astype('uint8');st.append(Image.fromarray(im))
print('stones',len(st))
random.seed(7);N=1024
bg=np.zeros((N,N,3),float)+[118,104,90]
noise=np.asarray(Image.fromarray((np.random.RandomState(3).rand(64,64)*255).astype('uint8')).resize((N,N),Image.BICUBIC)).astype(float)/255
bg+= (noise[...,None]-.5)*14
canvas=Image.fromarray(bg.clip(0,255).astype('uint8')).convert('RGBA')
cols,rows=24,26;cw,ch=N/cols,N/rows
shadow=Image.new('RGBA',(N,N),(0,0,0,0));top=Image.new('RGBA',(N,N),(0,0,0,0))
for r in range(rows):
    off=(cw/2 if r%2 else 0)+random.uniform(-3,3)
    for c in range(cols):
        s=random.choice(st);w=int(cw*random.uniform(.9,.98));h=int(ch*random.uniform(.9,.98))
        p=s.resize((w,h),Image.LANCZOS)
        cx=c*cw+off+cw/2+random.uniform(-1.5,1.5);cy=r*ch+ch/2+random.uniform(-1.5,1.5)
        x0,y0=int(round(cx-w/2)),int(round(cy-h/2))
        sh=Image.new('RGBA',p.size,(20,14,8,0));sh.putalpha(p.getchannel('A').point(lambda v:int(v*.55)))
        for dx in (-N,0,N):
            for dy in (-N,0,N):
                shadow.alpha_composite(sh,(0,0)) if False else None
                X,Y=x0+dx,y0+dy
                if X>-w and X<N and Y>-h and Y<N:
                    shadow.paste(sh,(X+2,Y+3),sh);top.paste(p,(X,Y),p)
shadow=shadow.filter(ImageFilter.GaussianBlur(2))
canvas.alpha_composite(shadow);canvas.alpha_composite(top)
# soften contrast a little
o=np.asarray(canvas.convert('RGB')).astype(float);mu=o.mean((0,1));o=mu+(o-mu)*.85
Image.fromarray(o.clip(0,255).astype('uint8')).save(out)
