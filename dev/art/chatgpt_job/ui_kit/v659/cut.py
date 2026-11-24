"""ตัดชิ้น UI จาก 4 แผ่น → hd-ui-<name>.webp (ครอปพอดีขอบภาพจริง) + รายงานขนาด"""
import json,sys
import numpy as np
from PIL import Image
from scipy import ndimage
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
O=S+'uicut/'
J=json.load(open(S+'uipack/tools/sheets.json'))
rep={}
for sh,D in J.items():
    im=Image.open(S+'uiin/'+sh+'.png').convert('RGBA');a=np.array(im)
    for it in D['items']:
        c=it['cell'];sub=a[c[1]:c[3],c[0]:c[2]].copy();al=sub[...,3]>12
        ys,xs=np.nonzero(al);x0,y0,x1,y1=xs.min(),ys.min(),xs.max()+1,ys.max()+1
        p=Image.fromarray(sub[y0:y1,x0:x1]);nm=it['name'].lower().replace('_','')
        if it['name']=='WINDOW_BG':
            bg=np.array(p.convert('RGB')).astype(float);lo=np.stack([ndimage.gaussian_filter(bg[...,k],24,mode='wrap') for k in range(3)],-1)
            p=Image.fromarray(np.clip(bg-lo+bg.reshape(-1,3).mean(0),0,255).astype(np.uint8)).resize((256,227),Image.LANCZOS)
        if it['kind']=='tile_h':
            # ครอปขอบบนล่างที่จาง · ให้ต่อซ้ายขวาได้
            p=p.crop((0,0,p.width,p.height))
        p.save(O+'hd-ui-'+nm+'.webp',quality=90,method=6)
        rep[it['name']]=dict(file='hd-ui-'+nm+'.webp',w=p.width,h=p.height,kind=it['kind'])
json.dump(rep,open(O+'pieces.json','w'),indent=1)
for k,v in rep.items():print(k,v['w'],v['h'],v['kind'])
