# ตัดภาพของแต่งเต็นท์ (ChatGPT) → hd-tent.webp (atlas) + hd-tenttx.webp (ผ้า/พื้น) + tent_pos.json
import sys,json
from PIL import Image
D,O=sys.argv[1],sys.argv[2]
P={'tent_01':(4,2,['bed1','bed2','bed3','wardrobe','tab1','tab2','fir1','fir2']),
   'tent_02':(4,2,['lit1','lit2','lit3','pla1','pla2','pla3','cei1','cei2']),
   'tent_03':(4,2,['wal1','wal2','wal3','ped','book','fish','shelf',None]),
   'tent_04':(3,2,['rug1','rug2','rug3',None,None,None])}
MX={'rug1':520,'rug2':520,'rug3':520}
sprites=[];info={}
for sh,(cols,rows,keys) in P.items():
    im=Image.open(f'{D}/{sh}.png').convert('RGBA');W,H=im.size;cw,ch=W//cols,H//rows
    for n,k in enumerate(keys):
        if not k:continue
        r,c=divmod(n,cols);cell=im.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch))
        a=cell.getchannel('A').point(lambda v:255 if v>24 else 0);bb=a.getbbox()
        if not bb:print('EMPTY',sh,k);continue
        if bb[0]==0 or bb[1]==0 or bb[2]==cw or bb[3]==ch:print('touch edge',sh,k,bb)
        sp=cell.crop(bb);m=MX.get(k,300);s=min(1,m/max(sp.size))
        if s<1:sp=sp.resize((max(1,round(sp.width*s)),max(1,round(sp.height*s))),Image.LANCZOS)
        sprites.append((k,sp))
sprites.sort(key=lambda s:-s[1].height);AW=2048;x=y=shh=0;pos={}
for k,sp in sprites:
    if x+sp.width+2>AW:x=0;y+=shh+2;shh=0
    pos[k]=[x,y,sp.width,sp.height];x+=sp.width+2;shh=max(shh,sp.height)
AH=y+shh;A=Image.new('RGBA',(AW,AH),(0,0,0,0))
for k,sp in sprites:A.paste(sp,tuple(pos[k][:2]))
A.save(O+'/hd-tent.webp',quality=82,method=6)
# ผ้า/พื้น: 4×2 ช่อง 384×512 → 320×426 (ตัดขอบ 6px กันเส้นรอยต่อ)
im=Image.open(f'{D}/tent_05.png').convert('RGB');W,H=im.size;cw,ch=W//4,H//2;T=Image.new('RGB',(1280,852))
for n in range(8):
    r,c=divmod(n,4);cell=im.crop((c*cw+6,r*ch+6,(c+1)*cw-6,(r+1)*ch-6)).resize((320,426),Image.LANCZOS);T.paste(cell,(c*320,r*426))
T.save(O+'/hd-tenttx.webp',quality=80,method=6)
json.dump(pos,open(O+'/tent_pos.json','w'))
print('atlas',AW,AH,len(pos))
