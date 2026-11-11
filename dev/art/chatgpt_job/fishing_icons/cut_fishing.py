"""ตัดไอคอนตกปลา (fishing_01–03 · 6×4 ช่อง 256) → atlas 16 คอลัมน์ ลำดับต่อเนื่อง N ช่อง (ตาม item_icons/cells.py)
ใช้: python3 -I cut_items.py <art_dir> <out.webp> [cell_px] [count]"""
import sys
from PIL import Image
art,out=sys.argv[1],sys.argv[2];C=int(sys.argv[3]) if len(sys.argv)>3 else 112;N=int(sys.argv[4]) if len(sys.argv)>4 else 64
cols=16;rows=(N+cols-1)//cols;A=Image.new('RGB',(cols*C,rows*C));ims={}
for i in range(N):
    s,n=1+i//24,i%24
    if s not in ims: ims[s]=Image.open(f'{art}/fishing_{s:02d}.png').convert('RGB')
    im=ims[s];W,H=im.size;cw,ch=W/6,H/4;r,c=n//6,n%6;ins=2
    A.paste(im.crop((round(c*cw)+ins,round(r*ch)+ins,round((c+1)*cw)-ins,round((r+1)*ch)-ins)).resize((C,C),Image.LANCZOS),((i%cols)*C,(i//cols)*C))
A.save(out,'WEBP',quality=86,method=6);print(out,A.size,N)
