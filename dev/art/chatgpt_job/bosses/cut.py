import sys,json,os
from PIL import Image
D,P,O=sys.argv[1],sys.argv[2],sys.argv[3]
plan=json.load(open(P));res={}
for e in plan:
    sh=e['sheet'];im=Image.open(f'{D}/{sh}.png').convert('RGBA');W,H=im.size
    cols,rows=(4,2) if int(sh[-2:])<=5 else (3,2);cw,ch=W//cols,H//rows;n=e['cell']-1;c,r=n%cols,n//cols
    cell=im.crop((c*cw,r*ch,(c+1)*cw,(r+1)*ch));a=cell.getchannel('A');bb=a.point(lambda v:255 if v>24 else 0).getbbox()
    if not bb:print('EMPTY',e);continue
    edge=bb[0]==0 or bb[1]==0 or bb[2]==cw or bb[3]==ch
    sp=cell.crop(bb);k=min(1,480/sp.height,600/sp.width)
    if k<1:sp=sp.resize((round(sp.width*k),round(sp.height*k)),Image.LANCZOS)
    # clean faint alpha
    al=sp.getchannel('A').point(lambda v:0 if v<10 else v);sp.putalpha(al)
    fn=f'hd-bs{e["id"]:02d}.webp';sp.save(f'{O}/{fn}',quality=86,method=6)
    res[e['id']]={'f':fn,'w':sp.width,'h':sp.height,'key':e['key'],'edge':edge}
json.dump(res,open(O+'/cut.json','w'),ensure_ascii=False,indent=0)
tot=sum(os.path.getsize(f'{O}/{v["f"]}') for v in res.values());print(len(res),'files',round(tot/1e6,2),'MB',[v['key'] for v in res.values() if v['edge']])
