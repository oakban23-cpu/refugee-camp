from PIL import Image, ImageDraw
import os
C={'ast':(590,410,520),'cel':(585,390,500),'cmd':(585,330,480),'eda':(565,390,520),'ked':(615,390,560),'lir':(560,370,520),
'navin':(585,370,560),'qn':(530,320,520),'sara':(555,320,540),'thu':(505,420,520),'til':(560,360,560),'ves':(580,390,500)}
def circ(k,sz=160):
    im=Image.open(f'cut/{k}.png');cx,cy,s=C[k]
    c=im.crop((cx-s//2,cy-s//2,cx+s//2,cy+s//2)).resize((sz,sz),Image.LANCZOS)
    return c
if __name__=='__main__':
    S=Image.new('RGB',(12*130,140),(18,22,40));d=ImageDraw.Draw(S)
    for i,k in enumerate(C):
        x=i*130+5
        d.ellipse((x,10,x+120,130),fill=(36,46,80),outline=(226,188,106),width=3)
        c=circ(k,120);m=Image.new('L',(120,120),0);ImageDraw.Draw(m).ellipse((3,3,117,117),fill=255)
        a=c.split()[3];from PIL import ImageChops;a=ImageChops.multiply(a,m);c.putalpha(a)
        S.paste(c,(x,10),c)
    S.save('circ_sheet.jpg',quality=90)
