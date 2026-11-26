import sys,numpy as np
from PIL import Image
from scipy import ndimage
f,cols,rows,names,out=sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),sys.argv[4].split(','),sys.argv[5]
a=np.asarray(Image.open(f).convert('RGBA')).copy();al=a[...,3].astype(int)
al=np.where(al<48,0,np.clip((al-48)*255//(255-48),0,255));a[...,3]=al
H,W=al.shape;m=al>0;lab,n=ndimage.label(m);sz=ndimage.sum(m,lab,range(1,n+1));cm=ndimage.center_of_mass(m,lab,range(1,n+1))
cell={}
for i in range(n):
    if sz[i]<40:continue
    cy,cx=cm[i];k=int(cy//(H/rows))*cols+int(cx//(W/cols));cell.setdefault(k,[]).append(i+1)
for k,nm in enumerate(names):
    L=cell.get(k,[]);mk=np.isin(lab,L);ys,xs=np.where(mk);y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    sub=a[y0:y1,x0:x1].copy();sub[...,3]=np.where(mk[y0:y1,x0:x1],sub[...,3],0);Image.fromarray(sub).save(out+'/'+nm+'.png')
    print(nm,[int(x0),int(y0),int(x1-x0),int(y1-y0)],'parts',len(L),'EDGE' if x0==0 or y0==0 or x1==W or y1==H else '')
