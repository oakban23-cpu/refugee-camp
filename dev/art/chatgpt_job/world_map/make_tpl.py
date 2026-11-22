import json,sys
from PIL import Image,ImageDraw,ImageFont
J='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
exec(open(J+'wmjob/maps.py').read())
P={int(k):v for k,v in json.load(open(J+'wmap/lay.json')).items()}
E=[tuple(map(int,e.split('-'))) for e in json.load(open(J+'wmap/wm.json'))['edges']]
O=sys.argv[1]
F=lambda s,b=True:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
SX=1024/360
ZONES={'A':[(0,0,360,130,(46,30,80),'STARFIELD (outer space above the sky)'),(0,130,360,520,(40,60,120),'SKY ISLANDS above the clouds (night-blue sky)')],
 'B':[(0,520,360,680,(170,140,170),'SEA OF CLOUDS (surface, dawn pink-gold)'),(0,680,165,1040,(30,55,65),'BENEATH THE CLOUDS (dark shadow land)'),(165,680,240,1040,(120,110,90),'light bridge'),(240,680,360,1040,(70,80,110),'cloud mist + harbor cliff')],
 'C':[(0,1040,360,1330,(70,95,50),'GROUND (the old lands)'),(0,1330,360,1560,(60,40,28),'UNDERGROUND (earth cross-section)')]}
def tpl(seg,small=False):
    y0,y1=SEG[seg];sy=1536/(y1-y0);T=lambda x,y:(x*SX,(y-y0)*sy)
    im=Image.new('RGB',(1024,1536),(20,20,24));d=ImageDraw.Draw(im,'RGBA')
    for x0,a,x1,b,c,t in ZONES[seg]:
        p0=T(x0,a);p1=T(x1,b);d.rectangle([p0,p1],fill=c);d.text((p0[0]+14,p0[1]+(96 if p0[1]<5 and seg!='A' else 12)),t,font=F(28),fill=(255,240,200,230))
    if seg in'BC':
        # golden light bridge from 30 down to camp 1
        pts=[T(195,575),T(196,700),T(195,850),T(195,1040),T(181,1110)]
        d.line(pts,fill=(255,210,110,200),width=26,joint='curve')
    if seg=='A':d.line([T(200,325),T(196,520)],fill=(255,210,110,200),width=26)
    # seam bands
    d.rectangle([0,0,1024,80],fill=(255,255,255,70));d.rectangle([0,1456,1024,1536],fill=(255,255,255,70))
    if seg!='A':d.text((20,22),'top 80 px: soft mist / clouds (blends with the image above)',font=F(24,False),fill=(255,255,255,230))
    if seg!='C':d.text((20,1478),'bottom 80 px: soft mist / clouds (blends with the image below)',font=F(24,False),fill=(255,255,255,230))
    for a,b in E:
        if (a,b)==(1,9):continue
        A=P[a];B=P[b]
        if M[a][0]!=seg and M[b][0]!=seg:continue
        d.line([T(*A),T(*B)],fill=(255,255,255,90),width=4)
    for n,(x,y) in P.items():
        if M[n][0]!=seg and not (y0-40<y<y1+40):continue
        cx,cy=T(x,y);r=44
        d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=(255,80,60,220),outline=(255,255,255,255),width=4)
        t=str(n);w=d.textlength(t,font=F(38));d.text((cx-w/2,cy-23),t,font=F(38),fill='white')
        nm=M[n][1];f=F(24);w=d.textlength(nm,font=f);tx=min(max(cx-w/2,6),1018-w)
        d.rectangle([tx-4,cy+r+4,tx+w+4,cy+r+34],fill=(0,0,0,170));d.text((tx,cy+r+6),nm,font=f,fill=(255,235,160))
    return im
for s,nm in [('A','template_map_1_sky.png'),('B','template_map_2_clouds.png'),('C','template_map_3_ground.png')]:
    tpl(s).save(O+'/'+nm)
# overview of all three stacked
ims=[Image.open(O+'/'+n) for n in ['template_map_1_sky.png','template_map_2_clouds.png','template_map_3_ground.png']]
ov=Image.new('RGB',(1024,1536*3));[ov.paste(im,(0,i*1536)) for i,im in enumerate(ims)];ov=ov.resize((512,2304));ov.save(O+'/overview_all_3_stacked.jpg',quality=85)
# medallion sheet templates
ids=sorted(M)
for si in range(2):
    im=Image.new('RGB',(1536,1024),(0,0,0));d=ImageDraw.Draw(im)
    for c in range(24):
        gx,gy=(c%6)*256,(c//6)*256;i=si*24+c
        d.rectangle([gx,gy,gx+255,gy+255],outline=(70,70,70),width=2)
        if i<len(ids):
            d.ellipse([gx+12,gy+12,gx+244,gy+244],outline=(200,160,80),width=5)
            d.text((gx+16,gy+8),str(c+1),font=F(26),fill=(255,255,255))
            n=M[ids[i]][1];f=F(19)
            # wrap
            ws=n.split();lines=[];cur=''
            for w in ws:
                if d.textlength(cur+' '+w,font=f)>200 and cur:lines.append(cur);cur=w
                else:cur=(cur+' '+w).strip()
            lines.append(cur)
            for k,l in enumerate(lines):
                w=d.textlength(l,font=f);d.text((gx+128-w/2,gy+110+k*24),l,font=f,fill=(255,230,170))
        else:d.text((gx+90,gy+115),'(empty)',font=F(22,False),fill=(120,120,120))
    im.save(O+'/template_medallions_%02d.png'%(si+1))
print('ok')
