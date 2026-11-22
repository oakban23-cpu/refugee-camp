"""ตัดภาพแผนที่โลก: map_1..3 → hd-wm1..3.webp · เหรียญ 44 อัน → hd-wmmed.webp (atlas 11×4 ช่องละ 128, เรียงตาม id 1–36, 38–45)"""
import sys,os,math
import numpy as np
from PIL import Image
D,O=sys.argv[1],sys.argv[2]
for i,n in [(1,'sky'),(2,'clouds'),(3,'ground')]:
    Image.open(os.path.join(D,'map_%d_%s.png'%(i,n))).convert('RGB').save(os.path.join(O,'hd-wm%d.webp'%i),quality=80,method=6)
ids=[i for i in range(1,46) if i!=37]
C=128;at=Image.new('RGBA',(C*11,C*4),(0,0,0,0));info=[]
for k,mid in enumerate(ids):
    sh=Image.open(os.path.join(D,'medallions_%02d.png'%(k//24+1))).convert('RGB');c=k%24
    cell=np.array(sh.crop(((c%6)*256,(c//6)*256,(c%6)*256+256,(c//6)*256+256))).astype(float)
    mx=cell.max(2);m=mx>30;ys,xs=np.nonzero(m)
    cx,cy=(xs.min()+xs.max())/2,(ys.min()+ys.max())/2
    # รัศมีขอบจริง: วัดแนวทแยง 4 ทิศ (หลบเพชรประดับที่ 4 ทิศหลัก)
    rs=[]
    for dx,dy in [(1,1),(1,-1),(-1,1),(-1,-1)]:
        r=0
        for t in range(40,190):
            x,y=int(cx+dx*t/math.sqrt(2)),int(cy+dy*t/math.sqrt(2))
            if 0<=x<256 and 0<=y<256 and m[y,x]:r=t
        rs.append(r)
    R=float(np.median(rs))
    yy,xx=np.mgrid[0:256,0:256];dd=np.hypot(xx-cx,yy-cy)
    a=np.clip((mx-14)/40,0,1)              # นอกวง: ดำ → ใส
    a=np.where(dd<=R-2,1.0,a)
    a=np.where(dd>R+16,0,a)
    rgba=np.dstack([cell,a*255]).astype(np.uint8)
    h=R+12;box=(int(round(cx-h)),int(round(cy-h)),int(round(cx+h)),int(round(cy+h)))
    im=Image.fromarray(rgba,'RGBA').crop(box).resize((C,C),Image.LANCZOS)
    at.paste(im,((k%11)*C,(k//11)*C));info.append((mid,round(cx),round(cy),round(R)))
at.save(os.path.join(O,'hd-wmmed.webp'),quality=86,method=6)
print(info)
