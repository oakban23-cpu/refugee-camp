import json,sys,numpy as np
from PIL import Image,ImageFilter,ImageDraw,ImageFont
S=sys.argv[1];J=json.load(open(S+'/vfxpack/tools/sheets.json'))
out=[];MAX=256
for sh,items in J.items():
  im=np.asarray(Image.open(f'{S}/vfxin/{sh}.png').convert('RGB')).astype(np.float32)
  H,W=im.shape[:2]
  for it in items:
    x0,y0,x1,y1=it['cell'];y1=min(y1,H);c=im[y0:y1,x0:x1]
    m=c.max(2);ys,xs=np.where(m>10)
    bx0,bx1,by0,by1=max(0,xs.min()-6),min(c.shape[1],xs.max()+7),max(0,ys.min()-6),min(c.shape[0],ys.max()+7)
    p=c[by0:by1,bx0:bx1].copy();h,w=p.shape[:2]
    # crush floor + feather border to guarantee black edges
    p=np.clip((p-4)*255/251,0,255)
    fy=np.minimum(np.arange(h),np.arange(h)[::-1]);fx=np.minimum(np.arange(w),np.arange(w)[::-1])
    f=np.clip(np.minimum.outer(fy,fx)/6,0,1)[...,None];p*=f
    BIG={'ULT_SIGIL','HOLY_CIRCLE','ARCANE_CIRCLE','CURSE_SIGIL','FIRE_CIRCLE','FROST_NOVA','MEGA_BLAST','GOD_RAYS','ANGEL_WINGS','SHIELD_DOME'}
    M=320 if it['name'] in BIG else MAX
    img=Image.fromarray(p.astype(np.uint8));sc=min(1,M/max(w,h))
    if sc<1:img=img.resize((max(1,round(w*sc)),max(1,round(h*sc))),Image.LANCZOS)
    out.append(dict(name=it['name'],shape=it['shape'],img=img,sheet=sh))
# shelf pack
out.sort(key=lambda o:-o['img'].size[1]);AW=1024;atl=[];cur=None
def newA():return dict(items=[],x=0,y=0,rh=0)
cur=newA();atl.append(cur)
for o in out:
  w,h=o['img'].size
  if cur['x']+w+2>AW:cur['x']=0;cur['y']+=cur['rh']+2;cur['rh']=0
  if cur['y']+h>1024:cur=newA();atl.append(cur)
  o['r']=[cur['x'],cur['y'],w,h];o['a']=len(atl)-1;cur['items'].append(o);cur['x']+=w+2;cur['rh']=max(cur['rh'],h)
T={}
for i,A in enumerate(atl):
  hh=A['y']+A['rh'];hh=(hh+3)//4*4;C=Image.new('RGB',(AW,hh))
  for o in A['items']:C.paste(o['img'],(o['r'][0],o['r'][1]));T[o['name']]=[i]+o['r']
  C.save(f'{S}/vfxcut/hd-vfx{i+1}.webp',quality=86,method=6);print(i,C.size)
json.dump(T,open(S+'/vfxcut/rects.json','w'),separators=(',',':'))
# contact sheet
names=list(T);cs=Image.new('RGB',(8*200,6*220),(40,40,40));d=ImageDraw.Draw(cs)
for k,n in enumerate(names):
  o=[q for q in out if q['name']==n][0];t=o['img'].copy();t.thumbnail((190,190))
  X,Y=(k%8)*200,(k//8)*220;cs.paste(t,(X+5,Y+5));d.text((X+4,Y+200),n+' '+o['shape'],fill=(255,255,0))
cs.save(S+'/vfxcut/contact.png')
