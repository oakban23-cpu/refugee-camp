import json,sys,numpy as np
from PIL import Image
from scipy import ndimage
S=sys.argv[1];info=json.load(open(S+'/gh6/pieces.json'))
DYE=['HALL_T1','HALL_T2','HALL_T3','HALL_T4','HALL_T5','GUILD_MONUMENT','GATE_T1','GATE_T2','GATE_T3','GATE_T4','GATE_T5','TOWER_T12','TOWER_T5','TREASURY_LO','WAREHOUSE_LO','WAREHOUSE_HI','KITCHEN_HI','BARRACKS_LO','BARRACKS_HI','GUILD_BOARD','STABLE','BANNER_POLE']
tiles=[]
for k in DYE:
    a=np.asarray(Image.open(S+'/gh6/pc/'+k+'.png')).astype(int);r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
    mx=np.maximum(np.maximum(r,g),b);mn=np.minimum(np.minimum(r,g),b)
    m=(al>200)&(mn>120)&((mx-mn)<38)&(mx>150)
    lab,n=ndimage.label(m);sz=ndimage.sum(m,lab,range(1,n+1));H,W=m.shape;keep=np.zeros_like(m)
    EX={'GUILD_MONUMENT':lambda x,y,w,h:w>.4*W,'STABLE':lambda x,y,w,h:y>.35*H and x>.45*W and x<.8*W,'HALL_T5':lambda x,y,w,h:y>.68*H,'HALL_T1':lambda x,y,w,h:False,'HALL_T3':lambda x,y,w,h:y+h/2<.42*H or y>.8*H,'GATE_T3':lambda x,y,w,h:y+h/2<.42*H,'WAREHOUSE_HI':lambda x,y,w,h:y+h/2<.35*H,'GATE_T4':lambda x,y,w,h:y+h/2<.25*H}
    for i,sl in enumerate(ndimage.find_objects(lab)):
        ys,xs=sl;w=xs.stop-xs.start;h=ys.stop-ys.start;ar=sz[i]
        if ar<120 or ar/(w*h)<.42:continue
        if EX.get(k,lambda *a:False)(xs.start,ys.start,w,h):continue
        keep|=lab==i+1
    np.save(S+'/gh6/pc/'+k+'_m.npy',keep)
    v=a[...,:3].copy();v[keep]=(v[keep]*.3+np.array([255,0,0])*.7).astype(int)
    bg=np.zeros_like(v)+[40,70,40];al2=(al/255)[...,None];o=(v*al2+bg*(1-al2)).astype('uint8')
    tiles.append(Image.fromarray(o))
W=sum(t.width for t in tiles[:8]);
rows=[tiles[i:i+6] for i in range(0,len(tiles),6)]
H=sum(max(t.height for t in r) for r in rows);Wm=max(sum(t.width for t in r) for r in rows)
out=Image.new('RGB',(Wm,H));y=0
for r in rows:
    x=0
    for t in r:out.paste(t,(x,y));x+=t.width
    y+=max(t.height for t in r)
out.save(S+'/gh6/mask_prev.jpg',quality=80);print(out.size)
