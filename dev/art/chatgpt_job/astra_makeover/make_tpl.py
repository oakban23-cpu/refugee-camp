import sys,math,json
from PIL import Image,ImageDraw,ImageFont
O=sys.argv[1]
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
def wrap(d,t,f,w):
    out=[];cur=''
    for word in t.split():
        if d.textlength((cur+' '+word).strip(),font=f)>w and cur:out.append(cur);cur=word
        else:cur=(cur+' '+word).strip()
    out.append(cur);return out
def grid(name,W,H,cols,rows,labels,note,box=None):
    im=Image.new('RGB',(W,H),(255,0,255));d=ImageDraw.Draw(im);cw,ch=W//cols,H//rows
    for i in range(cols*rows):
        x,y=(i%cols)*cw,(i//cols)*ch;d.rectangle([x,y,x+cw-1,y+ch-1],outline=(255,255,255),width=3)
        if i<len(labels) and labels[i]:
            m=int(cw*.06);d.rectangle([x+m,y+m,x+cw-m,y+ch-m],outline=(60,60,60),width=2)
            if box:d.line([x+m,y+ch-int(ch*box),x+cw-m,y+ch-int(ch*box)],fill=(255,40,40),width=4)
            d.text((x+12,y+8),str(i+1),font=F(30),fill='white')
            for k,l in enumerate(wrap(d,labels[i],F(22),cw-40)):
                w=d.textlength(l,font=F(22));d.text((x+cw/2-w/2,y+ch*.42+k*27),l,font=F(22),fill='white')
        else:d.text((x+cw/2-50,y+ch/2),'(empty)',font=F(24,False),fill=(230,230,230))
    d.text((10,H-34),note,font=F(20,False),fill='white')
    im.save(O+'/'+name)
# decals
DEC=json.load(open(sys.argv[2]))
grid('template_decals_6x4.png',1536,1024,6,4,[x[0] for x in DEC['decals']],'magenta = transparent background · top-down view (looking straight down)')
grid('template_houses_4x2.png',1536,1024,4,2,[x[0] for x in DEC['houses']],'magenta = transparent · red line = where the building touches the ground (front base)',box=.1)
grid('template_walls_4x2.png',1536,1024,4,2,[x[0] for x in DEC['walls']],'magenta = transparent · red line = ground line',box=.1)
grid('template_gardens_4x2.png',1536,1024,4,2,[x[0] for x in DEC['gardens']],'magenta = transparent · seen from above at an angle like the buildings',box=.12)
grid('template_islets_4x2.png',1536,1024,4,2,[x[0] for x in DEC['islets']],'magenta = transparent · floating islands seen from above at an angle')
# gate
im=Image.new('RGB',(1536,1024),(255,0,255));d=ImageDraw.Draw(im)
d.rectangle([150,120,1386,920],outline=(60,60,60),width=3);d.line([150,880,1386,880],fill=(255,40,40),width=5)
d.rectangle([640,430,896,880],outline=(255,255,0),width=4);d.text((660,600),'open archway',font=F(26),fill='white');d.text((660,635),'(players walk',font=F(22,False),fill='white');d.text((660,662),'through here)',font=F(22,False),fill='white')
for x0 in(250,1040):d.rectangle([x0,200,x0+246,880],outline=(255,255,255),width=3);d.text((x0+40,500),'gate tower',font=F(26),fill='white')
d.text((300,150),'wall continues out of frame on both sides →',font=F(24,False),fill='white');d.text((20,960),'magenta = transparent · red line = ground · the gate faces the viewer',font=F(22,False),fill='white')
im.save(O+'/template_gate.png')
# wall segment
im=Image.new('RGB',(1536,1024),(255,0,255));d=ImageDraw.Draw(im)
d.rectangle([0,330,1535,760],outline=(255,255,255),width=4);d.line([0,760,1535,760],fill=(255,40,40),width=5)
d.text((40,280),'battlements / walkway top',font=F(26),fill='white');d.text((40,520),'stone wall face (seamless: left edge continues the right edge)',font=F(26),fill='white')
d.text((40,790),'ground line (red) · below is transparent',font=F(24,False),fill='white');d.text((40,240),'above is transparent',font=F(24,False),fill='white')
for x in(0,1535):d.line([x,330,x,760],fill=(255,255,0),width=8)
im.save(O+'/template_wall_segment.png')
# island underside
im=Image.new('RGB',(1536,1024),(255,0,255));d=ImageDraw.Draw(im);cx,cy,r=768,-48,768
d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=(90,90,110),outline=(255,255,255),width=5)
pts=[]
for i in range(0,181):
    a=math.radians(i);x=cx+math.cos(a)*r;dep=(170+120*math.sin(a))*min(1,math.sin(a)*3);pts.append((x,cy+math.sin(a)*r+dep))
d.line(pts,fill=(255,200,40),width=5)
d.text((560,300),'CITY (the game draws it here)',font=F(30),fill='white');d.text((600,345),'keep this area transparent',font=F(26,False),fill='white')
d.text((520,760),'rock underside of the floating island',font=F(28),fill='white');d.text((560,800),'(hangs down, roughly to the yellow line,',font=F(22,False),fill='white');d.text((560,828),'crystals, roots, waterfalls may go lower)',font=F(22,False),fill='white')
d.text((20,980),'white circle = rim of the island top · magenta = transparent',font=F(22,False),fill='white')
im.save(O+'/template_island_underside.png')
print('ok')
