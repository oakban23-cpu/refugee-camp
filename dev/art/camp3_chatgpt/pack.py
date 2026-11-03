from PIL import Image;import numpy as np,json,os
from scipy import ndimage as nd
D='c3/';CFG={'side':(110,100),'board':(110,190),'podium':(110,360),'altar':(35,290)}  # (alpha thr, target px width)
fr={};ims=[]
for k,(thr,tw) in CFG.items():
  a=np.asarray(Image.open(D+f'raw_{k}.png').convert('RGBA')).copy();A=a[...,3]
  if k!='altar':a[A<thr,3]=0;a[A>=thr,3]=np.maximum(A[A>=thr],235)
  else:a[A<thr,3]=0
  m=a[...,3]>0;l,n=nd.label(m);sz=nd.sum(m,l,range(1,n+1));a[~np.isin(l,np.where(np.array(sz)>=150)[0]+1),3]=0
  im=Image.fromarray(a);bb=im.getchannel('A').point(lambda x:255 if x>0 else 0).getbbox();im=im.crop(bb)
  s=tw/im.width;im=im.resize((tw,round(im.height*s)),Image.LANCZOS)
  b=np.asarray(im).astype(np.float32);rgb=b[...,:3];L=rgb.mean(2,keepdims=True);rgb=(L+(rgb-L)*.92)*.93
  im=Image.fromarray(np.dstack([np.clip(rgb,0,255),b[...,3:]]).astype(np.uint8),'RGBA')
  ims.append((k,im,bb,s))
x=0;H=max(i.height for _,i,_,_ in ims);A=Image.new('RGBA',(sum(i.width+2 for _,i,_,_ in ims),H),(0,0,0,0))
for k,im,bb,s in ims:A.paste(im,(x,0));fr[k]=[x,0,im.width,im.height];x+=im.width+2;print(k,'crop',bb,'scale',round(s,4),im.size)
A.save(D+'hd-camp3.webp','WEBP',quality=86,method=6);print(A.size,os.path.getsize(D+'hd-camp3.webp'));print(json.dumps(fr,separators=(',',':')))
