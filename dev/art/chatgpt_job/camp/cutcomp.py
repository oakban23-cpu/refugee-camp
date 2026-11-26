import sys,json,numpy as np
from PIL import Image
from scipy import ndimage
f,names,out=sys.argv[1],sys.argv[2].split(','),sys.argv[3]
a=np.asarray(Image.open(f).convert('RGBA')).copy();al=a[...,3].astype(int)
al=np.where(al<48,0,np.clip((al-48)*255//(255-48),0,255));a[...,3]=al
m=ndimage.binary_closing(al>0,iterations=4);lab,n=ndimage.label(m);sz=ndimage.sum(m,lab,range(1,n+1))
comps=[]
for i,sl in enumerate(ndimage.find_objects(lab)):
    if sz[i]<1500:continue
    ys,xs=sl;comps.append((ys.start,ys.stop,xs.start,xs.stop,i+1))
H=a.shape[0];comps.sort(key=lambda c:(0 if (c[0]+c[1])/2<H/2 else 1,c[2]))
print(len(comps),'pieces for',len(names))
res={}
for nm,(y0,y1,x0,x1,li) in zip(names,comps):
    sub=a[y0:y1,x0:x1].copy();sub[...,3]=np.where(lab[y0:y1,x0:x1]==li,sub[...,3],0)
    Image.fromarray(sub).save(out+'/'+nm+'.png');res[nm]=[int(x0),int(y0),int(x1-x0),int(y1-y0)];print(nm,res[nm],'edge' if x0==0 or y0==0 or x1==a.shape[1] or y1==H else '')
