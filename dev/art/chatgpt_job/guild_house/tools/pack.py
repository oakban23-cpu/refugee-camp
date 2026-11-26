import json,sys,numpy as np,glob,os
from PIL import Image,ImageFilter
from scipy import ndimage
S=sys.argv[1];info=json.load(open(S+'/gh6/pieces.json'));P=S+'/gh6/pc/'
items=[]
for k in info:
    im=Image.open(P+k+'.png');items.append((k,im))
    if os.path.exists(P+k+'_m.npy'):
        m=np.load(P+k+'_m.npy');m=ndimage.binary_dilation(m,iterations=1)
        mi=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(.7))
        al=np.minimum(np.asarray(mi),np.asarray(im)[...,3])
        mm=np.zeros(al.shape+(4,),'uint8');mm[...,:3]=255;mm[...,3]=al
        mimg=Image.fromarray(mm).resize((im.width//2,im.height//2),Image.LANCZOS)
        items.append((k+'_m',mimg))
# glow: warm bright clusters
G={}
for k in ['LANTERN_WOOD','LANTERN_GOLD','STANDING_TORCH','CAMPFIRE_RING','BONFIRE_BIG','ANVIL_FORGE','HALL_T1','HALL_T4','GATE_T4','KITCHEN_LO','KITCHEN_HI','GUILD_MONUMENT','CRYSTAL_FOUNTAIN','GUILD_BOARD','TREASURY_LO','WAREHOUSE_LO']:
    a=np.asarray(Image.open(P+k+'.png')).astype(int);r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
    if k=='CRYSTAL_FOUNTAIN':w=(al>200)&(b>200)&(g>180)&(r<170)
    else:w=(al>200)&(r>235)&(g>150)&(b<150)&(r-b>110)
    lab,n=ndimage.label(ndimage.binary_dilation(w,iterations=3));sz=ndimage.sum(w,lab,range(1,n+1))
    L=[]
    for i in np.argsort(-sz)[:4]:
        if sz[i]<12:continue
        ys,xs=np.where((lab==i+1)&w);L.append([round(xs.mean()/a.shape[1],3),round(ys.min()/a.shape[0]*.4+ys.mean()/a.shape[0]*.6,3),int(sz[i])])
    G[k]=L
# monument disk
a=np.asarray(Image.open(P+'GUILD_MONUMENT.png')).astype(int);wm=(a[...,3]>200)&(a[...,:3].min(2)>225)
lab,n=ndimage.label(wm);sz=ndimage.sum(wm,lab,range(1,n+1));i=np.argmax(sz);ys,xs=np.where(lab==i+1)
disk=[round(xs.mean()/a.shape[1],3),round(ys.mean()/a.shape[0],3),round((xs.max()-xs.min())/2/a.shape[1],3),round((ys.max()-ys.min())/2/a.shape[0],3)]
# shelf pack
items.sort(key=lambda t:-t[1].height);W=2048;x=y=sh=0;R={}
for k,im in items:
    if x+im.width+2>W:x=0;y+=sh+2;sh=0
    R[k]=[x,y,im.width,im.height];x+=im.width+2;sh=max(sh,im.height)
H=y+sh;at=Image.new('RGBA',(W,H))
for k,im in items:at.paste(im,tuple(R[k][:2]))
at.save(S+'/gh6/hd-gh.webp',quality=88,method=6)
meta={k:dict(r=R[k],b=round(info[k]['base']/info[k]['h'],3)) for k in info}
for k in R:
    if k.endswith('_m'):meta[k[:-2]]['m']=R[k]
for k,v in G.items():meta[k]['g']=v
meta['GUILD_MONUMENT']['disk']=disk
json.dump(meta,open(S+'/gh6/meta.json','w'),separators=(',',':'))
print(W,H,os.path.getsize(S+'/gh6/hd-gh.webp'));print(G);print(disk)
