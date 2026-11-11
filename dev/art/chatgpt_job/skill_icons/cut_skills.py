"""ตัดไอคอนสกิลจาก ChatGPT 3 แผ่น (6×4 ช่อง 256) → atlas 12×5 (แถว=อาชีพ melee,archer,sup,assn,mage · คอลัมน์=ช่อง 1–12)
ใช้: python3 -I cut_skills.py <art_dir> <out.webp> [cell_px]"""
import sys
from PIL import Image
art,out=sys.argv[1],sys.argv[2];C=int(sys.argv[3]) if len(sys.argv)>3 else 160
SH=[('melee','archer'),('sup','assn'),('mage',None)];ORD=['melee','archer','sup','assn','mage']
A=Image.new('RGB',(12*C,5*C))
for k,(a,b) in enumerate(SH):
    im=Image.open(f'{art}/skills_0{k+1}.png').convert('RGB');W,H=im.size;cw,ch=W/6,H/4
    for half,c in enumerate((a,b)):
        if c is None: continue
        for i in range(12):
            r=half*2+i//6;col=i%6;ins=3
            box=(round(col*cw)+ins,round(r*ch)+ins,round((col+1)*cw)-ins,round((r+1)*ch)-ins)
            A.paste(im.crop(box).resize((C,C),Image.LANCZOS),(i*C,ORD.index(c)*C))
A.save(out,'WEBP',quality=88,method=6);print(out,A.size)
