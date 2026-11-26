import json,sys,numpy as np,os
from PIL import Image
S=sys.argv[1]
def wrapres(im,nw,nh,axis):
    # resize a seamless tile along axis keeping periodicity: tile 3x, resize, crop middle
    if axis==0:
        t=Image.new('RGBA',(im.width*3,im.height));[t.paste(im,(i*im.width,0)) for i in range(3)]
        t=t.resize((nw*3,nh),Image.LANCZOS);return t.crop((nw,0,2*nw,nh))
    t=Image.new('RGBA',(im.width,im.height*3));[t.paste(im,(0,i*im.height)) for i in range(3)]
    t=t.resize((nw,nh*3),Image.LANCZOS);return t.crop((0,nh,nw,2*nh))
H=Image.open(S+'/ghin/gh_03_walls_horizontal.png').convert('RGBA');a=np.asarray(H)
rows=[];meta={}
for i in range(5):
    y0,y1=i*204,i*204+204;sub=a[y0:y1,:1535];ys=np.where((sub[...,3]>8).any(1))[0];t,b=ys.min(),ys.max()+1
    base=[180,384,588,792,996][i]-y0
    im=Image.fromarray(sub[t:b]);sc=.62;nw=round(1535*sc);nh=round(im.height*sc)
    rows.append(wrapres(im,nw,nh,0));meta['H%d'%(i+1)]=dict(base=round((base-t)/im.height,3))
V=Image.open(S+'/ghin/gh_04_walls_vertical.png').convert('RGBA');a=np.asarray(V);cols=[]
for i in range(5):
    sub=a[:1023,i*306:i*306+306];xs=np.where((sub[...,3]>8).any(0))[0];l,r=xs.min(),xs.max()+1
    im=Image.fromarray(sub[:,l:r]);sc=.5;cols.append(wrapres(im,round(im.width*sc),round(1023*sc),1))
W=max(r.width for r in rows)+2+sum(c.width+2 for c in cols);Hh=max(sum(r.height+2 for r in rows),max(c.height for c in cols))
at=Image.new('RGBA',(W,Hh));y=0
for i,r in enumerate(rows):at.paste(r,(0,y));meta['H%d'%(i+1)]['r']=[0,y,r.width,r.height];y+=r.height+2
x=max(r.width for r in rows)+2
for i,c in enumerate(cols):at.paste(c,(x,0));meta['V%d'%(i+1)]=dict(r=[x,0,c.width,c.height]);x+=c.width+2
at.save(S+'/gh6/hd-gh-w.webp',quality=88,method=6);json.dump(meta,open(S+'/gh6/wmeta.json','w'));print(at.size,os.path.getsize(S+'/gh6/hd-gh-w.webp'),meta)
# textures
T=['dirt','planks','cobble','marble'];tat=Image.new('RGB',(2048,2048));tm={}
for i,k in enumerate(T):
    im=np.asarray(Image.open(S+'/ghtex/tex_gh_%s.png'%k).convert('RGB')).astype(float)
    for ax in (0,1):
        n=10;a2=im.copy();h=im.shape[1-ax] if False else None
        if ax==0: # x seam
            L=im[:,0].copy();Rr=im[:,-1].copy();Mm=(L+Rr)/2
            for j in range(n):
                w=(1-j/n)*.5;a2[:,j]=im[:,j]*(1-w)+Mm*w;a2[:,-1-j]=im[:,-1-j]*(1-w)+Mm*w
        else:
            L=im[0].copy();Rr=im[-1].copy();Mm=(L+Rr)/2
            for j in range(n):
                w=(1-j/n)*.5;a2[j]=im[j]*(1-w)+Mm*w;a2[-1-j]=im[-1-j]*(1-w)+Mm*w
        im=a2
    t=Image.fromarray(im.clip(0,255).astype('uint8')).convert('RGBA');t=wrapres(wrapres(t,1024,t.height,0),1024,1024,1).convert('RGB')
    x,y=(i%2)*1024,(i//2)*1024;tat.paste(t,(x,y));tm[k]=[x,y,1024,1024]
tat.save(S+'/gh6/hd-gh-t.webp',quality=80,method=6);print(os.path.getsize(S+'/gh6/hd-gh-t.webp'),tm)
