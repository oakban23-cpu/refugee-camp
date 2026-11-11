"""ตัดไอคอนชุด 2 (skills_04–06 · 6×4 ช่อง 256) → atlas 12 คอลัมน์ ลำดับต่อเนื่อง: สกิลทางเลือก 45 (แผ่น 4 ช่อง 1–24, แผ่น 5 ช่อง 1–21) แล้วรูนลิงก์ 23 (แผ่น 6)
ใช้: python3 -I cut_part2.py <art_dir> <out.webp> [cell_px]"""
import sys
from PIL import Image
art,out=sys.argv[1],sys.argv[2];C=int(sys.argv[3]) if len(sys.argv)>3 else 160
cells=[(4,n) for n in range(24)]+[(5,n) for n in range(21)]+[(6,n) for n in range(23)]
cols=12;rows=(len(cells)+cols-1)//cols;A=Image.new('RGB',(cols*C,rows*C));ims={}
for i,(s,n) in enumerate(cells):
    if s not in ims: ims[s]=Image.open(f'{art}/skills_0{s}.png').convert('RGB')
    im=ims[s];W,H=im.size;cw,ch=W/6,H/4;r,c=n//6,n%6;ins=3
    A.paste(im.crop((round(c*cw)+ins,round(r*ch)+ins,round((c+1)*cw)-ins,round((r+1)*ch)-ins)).resize((C,C),Image.LANCZOS),((i%cols)*C,(i//cols)*C))
A.save(out,'WEBP',quality=88,method=6);print(out,A.size,len(cells))
