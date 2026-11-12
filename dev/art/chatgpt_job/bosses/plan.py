import json,sys,os
from PIL import Image,ImageDraw
D=sys.argv[1];P=sys.argv[2]
L=json.load(open(D+'/all_labels.json'))
por=[0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,22,24,26,27,29,30,35,36,38,39,40,41,42,43,44,45,46,47]
wide=[19,21,25,28,2,34,31,32,33,37,48,49]
sheets=[]
for k in range(5):sheets.append(('boss_%02d'%(k+1),'p',por[k*8:k*8+8]))
sheets.append(('boss_06','w',wide[:6]));sheets.append(('boss_07','w',wide[6:]))
os.makedirs(P+'/current_bosses',exist_ok=True)
plan=[]
for name,kind,ids in sheets:
    W,H=1536,1024;cols,rows=(4,2) if kind=='p' else (3,2);cw,ch=W//cols,H//rows
    A=Image.new('RGB',(W,H),(52,56,60));d=ImageDraw.Draw(A)
    for n,i in enumerate(ids):
        c,r=n%cols,n//cols;im=Image.open(f'{D}/ref/b{i:02d}.png');im.thumbnail((int(cw*.84),int(ch*.84)))
        A.paste(im,(c*cw+(cw-im.width)//2,r*ch+ch-im.height-int(ch*.06)),im);d.rectangle((c*cw,r*ch,c*cw+cw-1,r*ch+ch-1),outline=(110,110,120));d.text((c*cw+8,r*ch+6),str(n+1),fill=(255,230,120))
        plan.append({'sheet':name,'cell':n+1,'id':i,'key':L[i]})
    A.save(f'{P}/current_bosses/{name}_current.jpg',quality=88)
json.dump(plan,open(D+'/plan.json','w'),ensure_ascii=False,indent=1)
print(len(plan))
