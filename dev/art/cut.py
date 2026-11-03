import numpy as np, cv2, glob, os
from scipy import ndimage as nd
T0,T1=7,20
import sys
KEEP=float(sys.argv[3]) if len(sys.argv)>3 else 1.01
SRC=sys.argv[1] if len(sys.argv)>1 else 'raw';DST=sys.argv[2] if len(sys.argv)>2 else 'cut'
GLOW=('thu.png','qn.png','hnt.png','kn.png','lum.png')
def cut(path,glow=False):
    im=cv2.imread(path)[:,:,::-1].astype(np.float32)
    H,W,_=im.shape
    border=np.concatenate([im[0],im[:,0],im[:,-1]])
    B=np.median(border,axis=0)
    d=np.sqrt(((im-B)**2).sum(2))
    cand=d<T1
    lab,n=nd.label(cand)
    seeds=set(np.unique(lab[0]))|set(np.unique(lab[:int(H*.7),0]))|set(np.unique(lab[:int(H*.7),-1]))
    seeds.discard(0)
    bg=np.isin(lab,list(seeds))
    # enclosed background pockets (between arm and body): same flat color, big enough
    tight=d<T1*0.6
    tl,tn=nd.label(tight)
    if tn:
        tsz=nd.sum(tight,tl,range(1,tn+1))
        for i,z in enumerate(tsz):
            if z>2500:
                m=tl==(i+1)
                if not (m&bg).any(): bg|=m
    fg=~bg
    # keep largest fg component (drop floating islands like scenery)
    fl,fn=nd.label(fg)
    if fn>1:
        sz=nd.sum(fg,fl,range(1,fn+1));keep=np.argmax(sz)+1
        small=(fl!=keep)&(fl>0)
        # keep islands that are tiny-and-close? drop all others
        big=np.array(sz)>=sz[keep-1]*KEEP
        fg=np.isin(fl,np.where(big)[0]+1)
    if glow:
        soft=fg&(d<60)
        sl,sn=nd.label(soft)
        tb=nd.binary_dilation(~fg,iterations=1)
        ids=np.unique(sl[tb&soft]);ids=ids[ids>0]
        g=np.isin(sl,ids)
        fg=fg&~g
        ga=np.clip((d-T0)/60,0,1)
    # soft alpha in band near boundary
    a=np.clip((d-T0)/(T1-T0),0,1)
    near=nd.binary_dilation(~fg,iterations=2)&fg
    alpha=np.where(fg,1.0,0.0)
    alpha[near]=np.maximum(a[near],0.0)
    edge_bg=nd.binary_dilation(fg,iterations=1)&~fg
    alpha[edge_bg]=a[edge_bg]*0.6
    alpha=cv2.GaussianBlur(alpha.astype(np.float32),(3,3),0.7)
    alpha[nd.binary_erosion(fg,iterations=3)]=1
    if glow: alpha=np.where(g,0.0,alpha)
    # unmix bg color
    am=np.maximum(alpha,1e-3)[...,None]
    col=np.clip((im-(1-am)*B)/am,0,255)
    col=np.where(alpha[...,None]>0.98,im,col)
    out=np.dstack([col,alpha*255]).astype(np.uint8)
    return out
for f in sorted(glob.glob(SRC+'/*.png')):
    k=os.path.basename(f);o=cut(f,k in GLOW)
    cv2.imwrite(DST+'/'+k,cv2.cvtColor(o,cv2.COLOR_RGBA2BGRA))
# contact sheet on dark bg
from PIL import Image
fs=sorted(glob.glob(DST+'/*.png'));S=Image.new('RGB',(6*256,2*276),(18,22,40))
from PIL import ImageDraw;dr=ImageDraw.Draw(S)
for i,f in enumerate(fs):
    im=Image.open(f).resize((256,256));x=(i%6)*256;y=(i//6)*276
    S.paste(im,(x,y+20),im);dr.text((x+4,y+4),os.path.basename(f),fill=(255,220,120))
S.save(DST+'_sheet.jpg',quality=88);print('ok')
