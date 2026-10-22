# ภาพเทียบก่อน/หลัง v489: แถวละสกิล (ซ้าย = เดิม · ขวา = ใหม่)
import os
from PIL import Image,ImageDraw,ImageFont
D='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v489/'
F=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',22);F2=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',17)
ROWS=[('🩸','รอยแยกโลหิต','สกิลที่ 6 · นักดาบสายแสง','s6l',0,2,'b0','a3'),('✨','ธนูกลุ่มดาว','สกิลที่ 6 · นักธนูสายแสง','s6l',2,3,'b0','a3'),
      ('⏳','หยุดกาลเวลา','สกิลที่ 6 · จอมเวทสายแสง','s6l',4,2,'b0','a3'),('🌅','อรุณฟื้นคืน','สกิลที่ 6 · นักสวดสายแสง','s6l',6,1,'b0','a3'),
      ('🧱','กำแพงสวรรค์ถล่ม','สกิลที่ 6 · นักดาบสายทมิฬ','s6d',0,3,'b0','a3'),('⚡','ศรเรียกอสนี','สกิลที่ 6 · นักธนูสายทมิฬ','s6d',2,3,'b0','a3'),
      ('🐕','สุนัขนรก','สกิลที่ 6 · จอมเวทสายทมิฬ','s6d',4,1,'b0','a3'),('🌙','จันทราประหาร','อัลติ · มือสังหาร','ul',3,3,'b0','a2'),
      ('✋','หัตถ์ปีศาจ','อัลติ · จอมเวทสายทมิฬ','ud',2,3,'b0','a2'),('⚔️','ดาบเทพตกฟ้า','ปุ่ม 4 · นักดาบ','b34',1,3,'b0','a1')]
ONLY=os.environ.get('ROWS')
if ONLY: ROWS=[ROWS[int(i)] for i in ONLY.split(',')]
sc=.72;w=int(620*sc);h=int(350*sc);pad=8;lab=34
S=Image.new('RGB',(pad*3+w*2,pad+46+len(ROWS)*(h+lab+pad)),(22,16,30));d=ImageDraw.Draw(S)
d.text((pad,10),'เดิม',font=F,fill=(200,200,210));d.text((pad*2+w,10),'ใหม่ (v489)',font=F,fill=(255,214,110));y=46
for em,nm,sub,G,r,c,b,a in ROWS:
    d.text((pad,y+4),nm,font=F,fill=(255,236,190));d.text((pad+int(F.getlength(nm))+14,y+9),sub,font=F2,fill=(190,180,210))
    for i,T in enumerate((b,a)):
        fn=D+f'raw/{G}_{T}_{r}_{c}.jpg'
        if os.path.exists(fn):S.paste(Image.open(fn).resize((w,h)),(pad+i*(w+pad),y+lab))
        else:d.text((pad+i*(w+pad)+10,y+lab+10),'(ไม่มีภาพ '+T+')',font=F2,fill=(255,120,120))
    y+=h+lab+pad
S.save(D+os.environ.get('OUT','showcase.jpg'),quality=88);print(S.size)
