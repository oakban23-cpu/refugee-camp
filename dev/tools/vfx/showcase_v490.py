# ภาพเทียบก่อน/หลัง v489: แถวละสกิล (ซ้าย = เดิม · ขวา = ใหม่)
import os
from PIL import Image,ImageDraw,ImageFont
D='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v490/'
F=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',22);F2=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',17)
ROWS=[('','วังวนดาบ','ปุ่ม 1 · นักดาบ','ob',0,1,'b0','a1'),('','ลูกไฟระเบิด','ปุ่ม 1 · จอมเวท','ob',8,1,'b0','a1'),('','ร่างเงาพันคม','อัลติ · มือสังหาร','ob',15,0,'b0','a1'),
      ('','ป้อมปราการนิรันดร์','อัลติ · นักดาบสายทมิฬ','od',1,1,'b0','a1'),('','พายุอสนี','อัลติ · นักธนูสายทมิฬ','od',3,2,'b0','a1'),('','ประตูนรก','อัลติ · จอมเวทสายทมิฬ','od',5,2,'b0','a1'),
      ('','อุกกาบาตหยุดกาล','อัลติ · จอมเวทสายแสง','oa',5,2,'b0','a1'),('','อรุณรุ่งนิรันดร์','อัลติ · นักสวดสายแสง','oa',9,2,'b0','a1'),('','ระฆังวิญญาณ','อัลติ · นักสวดสายทมิฬ','od',9,2,'b0','a1'),
      ('','ดาบพิพากษาสวรรค์','อัลติจุติ · นักดาบ','ou',0,2,'b0','a1',3)]
ONLY=os.environ.get('ROWS')
if ONLY: ROWS=[ROWS[int(i)] for i in ONLY.split(',')]
sc=.72;w=int(620*sc);h=int(350*sc);pad=8;lab=34
S=Image.new('RGB',(pad*3+w*2,pad+46+len(ROWS)*(h+lab+pad)),(22,16,30));d=ImageDraw.Draw(S)
d.text((pad,10),'เดิม',font=F,fill=(200,200,210));d.text((pad*2+w,10),'ใหม่ (v490)',font=F,fill=(255,214,110));y=46
for row in ROWS:
    em,nm,sub,G,r,c,b,a=row[:8];ca=row[8] if len(row)>8 else c
    d.text((pad,y+4),nm,font=F,fill=(255,236,190));d.text((pad+int(F.getlength(nm))+14,y+9),sub,font=F2,fill=(190,180,210))
    for i,T in enumerate((b,a)):
        fn=D+f'raw/{G}_{T}_{r}_{ca if i else c}.jpg'
        if os.path.exists(fn):S.paste(Image.open(fn).resize((w,h)),(pad+i*(w+pad),y+lab))
        else:d.text((pad+i*(w+pad)+10,y+lab+10),'(ไม่มีภาพ '+T+')',font=F2,fill=(255,120,120))
    y+=h+lab+pad
S.save(D+os.environ.get('OUT','showcase.jpg'),quality=88);print(S.size)
