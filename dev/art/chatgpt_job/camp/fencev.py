import sys,numpy as np
from PIL import Image
S=sys.argv[1];a=np.asarray(Image.open(S+'/cpin/cp_08_fence_v.png').convert('RGBA')).astype(float)
al=a[...,3];al=np.where(al<40,0,np.clip((al-40)*255/(215),0,255));a[...,3]=al
def loop(col,y0,y1,K):
    t=col[y0:y1].copy();w=np.linspace(0,1,K)[:,None,None];t[:K]=col[y1:y1+K]*(1-w)+col[y0:y0+K]*w;return t
for n,(x0,x1),(y0,y1),K in (('FENCE_RAIL_V',(266,366),(498,745),16),('FENCE_STONE_V',(878,1004),(66,1004),24)):
    t=loop(a[:,x0:x1],y0,y1,K);im=Image.fromarray(t.clip(0,255).astype('uint8'));xs=np.where(np.asarray(im)[...,3].max(0)>20)[0];im=im.crop((xs.min(),0,xs.max()+1,im.height))
    im.save(S+'/cpfence/'+n+'.png');print(n,im.size)
ims=[Image.open(S+'/cpfence/%s.png'%n) for n in ('FENCE_RAIL_V','FENCE_STONE_V')];H=1100;o=Image.new('RGB',(300,H),(70,120,50))
for i,im in enumerate(ims):
    for y in range(0,H,im.height):o.paste(im,(30+i*150,y),im)
o.save(S+'/cpfence/prev_v.jpg')
