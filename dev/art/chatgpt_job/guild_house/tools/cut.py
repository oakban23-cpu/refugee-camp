import json,sys,numpy as np
from PIL import Image
S=sys.argv[1];J=json.load(open(S+'/ghpack/tools/sheets.json'))
CAP={'gh_01_halls':560,'gh_02_gates':400,'gh_05_facilities':300,'gh_06_decor':170}
SPEC={'GUILD_MONUMENT':240,'STATUE_FOUNTAIN':300,'CRYSTAL_FOUNTAIN':300,'CAMPFIRE_RING':230,'BONFIRE_BIG':170,'TOWER_T12':190,'TOWER_T34':190,'TOWER_T5':190,'FARM_PLOT':160,'STABLE':300}
info={}
for sh,cap in CAP.items():
    im=Image.open(S+'/ghin/'+sh+'.png').convert('RGBA');a=np.asarray(im)
    for it in J[sh]['items']:
        x0,y0,x1,y1=it['cell'];sub=a[y0:y1,x0:x1];al=sub[:,:,3]>8
        ys,xs=np.where(al);bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
        p=Image.fromarray(sub[by0:by1,bx0:bx1]);n=it['name'];c=SPEC.get(n,cap)
        # base = red line (box 90%) relative to piece top
        box=it['box'];base=round(box[1]+(box[3]-box[1])*.9)-y0-by0
        sc=min(1,c/p.width)
        if sc<1:p=p.resize((round(p.width*sc),round(p.height*sc)),Image.LANCZOS)
        p.save(S+'/gh6/pc/'+n+'.png');info[n]=dict(w=p.width,h=p.height,base=round(base*sc),kind=it['kind'],src=sh,off=[int(x0+bx0),int(y0+by0)],sc=sc)
json.dump(info,open(S+'/gh6/pieces.json','w'),indent=0)
for k,v in info.items():print(k,v['w'],v['h'],'base',v['base'],'sc %.2f'%v['sc'])
