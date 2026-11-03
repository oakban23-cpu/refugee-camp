import numpy as np, cv2, glob, os
from scipy import ndimage as nd
from PIL import Image, ImageDraw
T0,T1=6,16
def cut(path):
    im=cv2.imread(path)[:,:,::-1].astype(np.float32);H,W,_=im.shape
    B=np.median(np.concatenate([im[0],im[:,0],im[:,-1],im[-1]]),axis=0)
    d=np.sqrt(((im-B)**2).sum(2))
    mx=im.max(2);mn=im.min(2);sat=mx-mn;v=im.mean(2)
    # background: near bg color, connected to border
    lab,n=nd.label(d<T1);seeds=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])));seeds.discard(0)
    bg=np.isin(lab,list(seeds))
    # shadow: neutral, darker than bg, connected to bg
    sh_c=(~bg)&(sat<16)&(v<B.mean()-3)&(v>B.mean()-110)
    sl,sn=nd.label(sh_c);tb=nd.binary_dilation(bg,iterations=2)
    ids=np.unique(sl[tb&sh_c]);ids=ids[ids>0];shadow=np.isin(sl,ids)
    # enclosed flat-bg pockets
    tl,tn=nd.label(d<T1*0.7)
    if tn:
        tsz=nd.sum(d<T1*0.7,tl,range(1,tn+1))
        for i,z in enumerate(tsz):
            if z>120:
                m=tl==(i+1)
                if not (m&bg).any(): bg|=m
    fg=~bg&~shadow
    # glow halos: light, close to bg color, touching background -> drop
    soft=fg&(d<75)&(v>=B.mean()-10)
    gl,gn=nd.label(soft);tb2=nd.binary_dilation(bg|shadow,iterations=1)
    gid=np.unique(gl[tb2&soft]);gid=gid[gid>0]
    for _ in range(1):
        pass
    fg=fg&~np.isin(gl,gid)
    fl,fn=nd.label(fg)
    if fn>1:
        sz=nd.sum(fg,fl,range(1,fn+1));big=np.array(sz)>=max(sz)*0.02;fg=np.isin(fl,np.where(big)[0]+1)
    a=np.clip((d-T0)/(T1-T0),0,1)
    alpha=fg.astype(np.float32)
    edge=nd.binary_dilation(fg,iterations=1)&~fg&~shadow
    alpha[edge]=a[edge]*.6
    alpha=cv2.GaussianBlur(alpha,(3,3),.7);alpha[nd.binary_erosion(fg,iterations=2)]=1
    am=np.maximum(alpha,1e-3)[...,None]
    col=np.where(alpha[...,None]>0.98,im,np.clip((im-(1-am)*B)/am,0,255))
    # shadow layer: black with alpha from darkness (soft)
    sa=np.clip((B.mean()-v)/110*1.3,0,.55)*shadow
    sa=cv2.GaussianBlur(sa.astype(np.float32),(5,5),1.5)
    out_a=alpha+sa*(1-alpha)
    out_c=np.where(alpha[...,None]>0, col*(alpha/np.maximum(out_a,1e-3))[...,None], 0)
    out=np.dstack([np.clip(out_c,0,255),out_a*255]).astype(np.uint8)
    return out
fs=sorted(glob.glob('rawn/*.png'))
for f in fs:
    o=cut(f);cv2.imwrite('cutn/'+os.path.basename(f),cv2.cvtColor(o,cv2.COLOR_RGBA2BGRA))
S=Image.new('RGB',(6*256,2*276),(46,74,38));dr=ImageDraw.Draw(S)
for i,f in enumerate(sorted(glob.glob('cutn/*.png'))):
    im=Image.open(f).resize((256,256));x=(i%6)*256;y=(i//6)*276;S.paste(im,(x,y+20),im);dr.text((x+4,y+4),os.path.basename(f),fill=(255,230,150))
S.save('cutn_sheet.jpg',quality=88);print('ok')
