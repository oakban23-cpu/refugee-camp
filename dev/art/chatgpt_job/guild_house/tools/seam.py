import sys,numpy as np
from PIL import Image
for f in sys.argv[1:]:
    im=Image.open(f);a=np.asarray(im.convert('RGB')).astype(float)
    h,w,_=a.shape
    dx=np.abs(np.diff(a,axis=1)).mean(); dy=np.abs(np.diff(a,axis=0)).mean()
    sx=np.abs(a[:,0]-a[:,-1]).mean(); sy=np.abs(a[0]-a[-1]).mean()
    # also check duplicated edge
    print(f.split('/')[-1],im.size,im.mode,'interiorX %.1f seamX %.1f | interiorY %.1f seamY %.1f'%(dx,sx,dy,sy),'mean',a.mean((0,1)).round(0),'std %.1f'%a.mean(2).std())
