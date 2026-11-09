import sys,json
from PIL import Image
D,O=sys.argv[1],sys.argv[2];PD=sys.argv[3] if len(sys.argv)>3 else None
sprites=[]
def cells(path,pref,take):
    im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W//4,H//3
    for n in take:
        r,c=(n-1)//4,(n-1)%4;cell=im.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch))
        a=cell.getchannel('A').point(lambda v:255 if v>20 else 0);bb=a.getbbox()
        if not bb:print('empty',pref,n);continue
        sp=cell.crop(bb);mh=300
        if sp.height>mh:sp=sp.resize((max(1,round(sp.width*mh/sp.height)),mh),Image.LANCZOS)
        sprites.append((pref+'_'+str(n),sp))
for t in range(1,11):cells(f'{D}/props_{t:02d}.png',f'p{t}',range(1,9))
cells(f'{D}/shared_01.png','s',range(1,13))
def cells2(path,themes):
    im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W//4,H//2
    for r,t in enumerate(themes):
        for c in range(4):
            cell=im.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch));a=cell.getchannel('A').point(lambda v:255 if v>20 else 0);bb=a.getbbox()
            if not bb:print('empty',t,c);continue
            sp=cell.crop(bb);mh=300
            if sp.height>mh:sp=sp.resize((max(1,round(sp.width*mh/sp.height)),mh),Image.LANCZOS)
            sprites.append((f'q{t}_{c+1}',sp))
if PD:
    for k in range(5):cells2(f'{PD}/pillars_{k+1:02d}.png',[2*k+1,2*k+2])
# shelf pack
sprites.sort(key=lambda s:-s[1].height);AW=2048;x=y=sh=0;pos={}
for k,sp in sprites:
    if x+sp.width+2>AW:x=0;y+=sh+2;sh=0
    pos[k]=[x,y,sp.width,sp.height];x+=sp.width+2;sh=max(sh,sp.height)
AH=y+sh;A=Image.new('RGBA',(AW,AH),(0,0,0,0))
for k,sp in sprites:A.paste(sp,tuple(pos[k][:2]))
A.save(O+'/hd-gpt10.webp',quality=86,method=6);json.dump(pos,open(O+'/twa_pos.json','w'))
print('atlas',AW,AH,len(pos))
for t in range(1,11):
    f=Image.open(f'{D}/floor_{t:02d}.png').convert('RGBA');f.save(O+f'/hd-twf{t:02d}.webp',quality=80,method=6)
tp=Image.open(f'{D}/tower_portrait.png').convert('RGB').resize((640,960),Image.LANCZOS);tp.save(O+'/hd-twp.webp',quality=78,method=6)
