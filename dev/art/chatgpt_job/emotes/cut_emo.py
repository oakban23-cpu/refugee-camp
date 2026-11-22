"""ตัดสติกเกอร์อีโมต 14 อัน (4×4 ช่อง 256) → hd-emo.webp atlas 7×2 ช่องละ 128
   พื้นดำ = floodfill จากขอบภาพ (ขอบขาว die-cut หยุด fill) · ขอบนอกทำ alpha ตามความสว่าง (ขาวผสมดำ → ขาวโปร่งบางส่วน)"""
import sys,os
import numpy as np
from PIL import Image
from scipy import ndimage as nd
src,O=sys.argv[1],sys.argv[2]
im=np.array(Image.open(src).convert('RGB')).astype(float)
mx=im.max(2);dark=mx<40
lab,n=nd.label(dark);edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
bg=np.isin(lab,list(edge))
# กันช่องว่าง 15–16 และร่องระหว่างช่อง: ทุกอย่างที่ต่อกับพื้นดำนอกสุด
near=nd.binary_dilation(bg,iterations=2)&~bg
a=np.where(bg,0.0,1.0);rgb=im.copy()
L=im.mean(2)
fr=near
a[fr]=np.clip((L[fr]-30)/(225-30),0,1);rgb[fr]=255  # ขอบนอกเป็นขาวโปร่งตามความสว่าง
C=128;at=Image.new('RGBA',(C*7,C*2),(0,0,0,0));info=[]
for c in range(14):
    x0,y0=(c%4)*256,(c//4)*256
    ca=a[y0:y0+256,x0:x0+256];ys,xs=np.nonzero(ca>.1)
    bx0,bx1,by0,by1=xs.min(),xs.max(),ys.min(),ys.max();touch=[bx0==0,by0==0,bx1==255,by1==255]
    cx,cy=(bx0+bx1)/2,(by0+by1)/2;h=max(bx1-bx0,by1-by0)/2+4
    rg=np.dstack([rgb[y0:y0+256,x0:x0+256],ca*255]).clip(0,255).astype(np.uint8)
    t=Image.fromarray(rg,'RGBA');sq=Image.new('RGBA',(int(2*h),int(2*h)),(0,0,0,0));sq.paste(t,(int(h-cx),int(h-cy)))
    at.paste(sq.resize((C,C),Image.LANCZOS),((c%7)*C,(c//7)*C));info.append((c+1,int(2*h),touch))
at.save(os.path.join(O,'hd-emo.webp'),quality=88,method=6)
print(info)
