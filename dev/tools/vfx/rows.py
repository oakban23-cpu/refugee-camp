# ประกอบภาพจาก raw: python3 rows.py G TAG rows(0,1) cols(0,2,4) out [TAG2 → วางคู่ก่อน/หลัง]
import sys
from PIL import Image,ImageDraw,ImageFont
D='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v489/'
G,TAG,R,Cc,out=sys.argv[1:6];TAGS=[TAG]+(sys.argv[6:7] or [])
R=[int(x) for x in R.split(',')];Cc=[int(x) for x in Cc.split(',')];sc=float(__import__('os').environ.get('SC','1'))
F=ImageFont.truetype('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf',16)
ims=[[[Image.open(D+f'raw/{G}_{T}_{r}_{c}.jpg') for c in Cc] for T in TAGS] for r in R]
w=int(ims[0][0][0].width*sc);h=int(ims[0][0][0].height*sc);pad=4
S=Image.new('RGB',(pad+len(Cc)*(w+pad),pad+len(R)*len(TAGS)*(h+pad)),(20,16,26));d=ImageDraw.Draw(S);y=pad
for rr in ims:
    for T,row in zip(TAGS,rr):
        for i,im in enumerate(row):S.paste(im.resize((w,h)),(pad+i*(w+pad),y))
        d.text((pad+4,y+2),T,font=F,fill=(255,230,120));y+=h+pad
S.save(D+out,quality=88);print(S.size)
