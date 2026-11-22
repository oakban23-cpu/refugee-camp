import sys
from PIL import Image,ImageDraw,ImageFont
O=sys.argv[1]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
N=['wave','dance','rest by the fire','bow','laugh','send love','cheer','thumbs up','cry','angry','high five','hug','pair pose','photo mode']
im=Image.new('RGB',(1024,1024),(0,0,0));d=ImageDraw.Draw(im)
for c in range(16):
    x,y=(c%4)*256,(c//4)*256;d.rectangle([x,y,x+255,y+255],outline=(70,70,70),width=2)
    if c<len(N):
        d.rounded_rectangle([x+16,y+16,x+240,y+240],radius=60,outline=(255,255,255),width=6)
        d.text((x+24,y+22),str(c+1),font=F(28),fill=(255,220,120))
        w=d.textlength(N[c],font=F(22));d.text((x+128-w/2,y+118),N[c],font=F(22),fill=(255,235,190))
    else:
        w=d.textlength('(empty)',font=F(22));d.text((x+128-w/2,y+118),'(empty)',font=F(22),fill=(110,110,110))
im.save(O+'/template_emotes_4x4.png')
