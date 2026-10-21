import json,math,sys,os
from PIL import Image,ImageFilter,ImageOps,ImageStat
sys.path.insert(0,'.')
from sketch import sketch
C={}
for f in sorted(os.listdir('.')):
    if f.startswith('cands') and f.endswith('.json'): C.update(json.load(open(f)))
TW,TH=192,140;CROP=(int(os.environ.get('CW','240')),int(os.environ.get('CH','175')))
EXC=json.load(open('exclude.json')) if os.path.exists('exclude.json') else {}
def score(fn):
    im=Image.open(fn).convert('RGB');w,h=im.size;cw,ch=CROP
    c=im.crop((w//2-cw//2,h//2-ch//2,w//2+cw//2,h//2+ch//2))
    g=ImageOps.grayscale(c).filter(ImageFilter.MedianFilter(3))
    e=g.filter(ImageFilter.FIND_EDGES);es=ImageStat.Stat(e).mean[0]
    st=ImageStat.Stat(c).stddev;sd=sum(st)/3
    # center detail (landmark near the X)
    cc=g.crop((cw//2-40,ch//2-30,cw//2+40,ch//2+30)).filter(ImageFilter.FIND_EDGES);ce=ImageStat.Stat(cc).mean[0]
    return es*1.0+sd*.35+ce*.6,c
TMD={};tiles=[];sheet=[]
for m,L in sorted(C.items(),key=lambda kv:int(kv[0])):
    sc=[]
    for (x,y,mv,fn) in L:
        if mv>3 or [x,y] in EXC.get(str(m),[]):continue
        s,c=score(fn);sc.append((s,x,y,c,fn))
    sc.sort(key=lambda q:-q[0]);sel=[]
    for q in sc:
        if all(math.hypot(q[1]-p[1],q[2]-p[2])>=600 for p in sel):sel.append(q)
        if len(sel)>=3:break
    TMD[int(m)]=[]
    for q in sel:
        k=len(tiles);sk=sketch(q[3],(TW,TH),seed=k+1);tiles.append(sk);TMD[int(m)].append([int(q[1]),int(q[2]),k]);sheet.append((m,q[1],q[2],q[3].resize((TW,TH)),sk,round(q[0],1)))
    print(m,[(round(q[0],1),q[1],q[2]) for q in sel])
cols=10;rows=(len(tiles)+cols-1)//cols
at=Image.new('RGB',(cols*TW,rows*TH),(230,210,160))
for i,t in enumerate(tiles):at.paste(t,((i%cols)*TW,(i//cols)*TH))
at.save('hd-tmap.webp','WEBP',quality=62,method=6)
print('tiles',len(tiles),'atlas',at.size,os.path.getsize('hd-tmap.webp'))
json.dump(TMD,open('tmd.json','w'),separators=(',',':'))
open('../ux82d.js','w').write('\n/* v478 · จุดขุดสมบัติ (สร้างจาก v478/select_build.py): แมพ → [[x,y,ช่องในภาพ hd-tmap.webp],…] */\nconst TMD='+json.dumps(TMD,separators=(',',':'))+';\n')
# contact sheets: original | sketch, 6 rows each page
for pg in range((len(sheet)+11)//12):
    S=sheet[pg*12:(pg+1)*12];im=Image.new('RGB',(2*TW*2+20,len(S)*TH//2*1+ (len(S)+1)//2*0),(40,30,20))
    W2=TW*2+10;im=Image.new('RGB',(W2*2,((len(S)+1)//2)*(TH+16)),(40,30,20))
    from PIL import ImageDraw
    d=ImageDraw.Draw(im)
    for i,(m,x,y,o,sk,s) in enumerate(S):
        cx=(i%2)*W2;cy=(i//2)*(TH+16)
        im.paste(o,(cx,cy+14));im.paste(sk,(cx+TW,cy+14));d.text((cx+2,cy+1),f'm{m} ({x},{y}) s={s}',fill=(255,230,180))
    im.save(f'sheet_{pg}.jpg',quality=82)
