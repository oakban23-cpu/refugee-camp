import sys,numpy as np
from PIL import Image
S=sys.argv[1];a=np.asarray(Image.open(S+'/cpin/cp_07_fence_h.png').convert('RGBA')).astype(float)
# rail: one period, no post at the edges
rail=a[105:340,600:905].copy()
# stone: crossfade loop
K=24;x0,x1=226,1248;st=a[490:660,x0:x1].copy();src=a[490:660]
t=np.linspace(0,1,K)[None,:,None]
st[:,:K]=src[:,x1:x1+K]*(1-t)+src[:,x0:x0+K]*t
for n,arr in (('FENCE_RAIL_H',rail),('FENCE_STONE_H',st)):
    im=Image.fromarray(arr.clip(0,255).astype('uint8'));ys=np.where(np.asarray(im)[...,3].max(1)>20)[0];im=im.crop((0,ys.min(),im.width,ys.max()+1))
    im.save(S+'/cpfence/'+n+'.png');print(n,im.size)
    w=im.width;t3=Image.new('RGBA',(w*3,im.height),(70,120,50,255))
    for i in range(3):t3.alpha_composite(im,(i*w,0))
    t3.save(S+'/cpfence/'+n+'_tiled.png')
