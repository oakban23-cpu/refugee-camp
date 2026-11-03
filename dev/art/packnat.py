from PIL import Image
import json,glob,os
H={'tree_oak_a':300,'tree_oak_b':290,'tree_pine':300,'tree_birch':290,'tree_blossom':260,'bush_berry':150,'rock_moss':170,'rock_big':170,'fallen_log':130,'stump_mush':150,'ruin_pillar':200,'glow_mush':180}
ims=[]
for k,h in H.items():
    im=Image.open('cutn/'+k+'.png');bb=im.getchannel('A').point(lambda a:255 if a>8 else 0).getbbox();im=im.crop(bb)
    s=h/im.height;im=im.resize((max(1,round(im.width*s)),h),Image.LANCZOS);ims.append((k,im))
W=1024;x=y=rh=0;pos={}
for k,im in sorted(ims,key=lambda t:-t[1].height):
    if x+im.width>W:x=0;y+=rh+2;rh=0
    pos[k]=[x,y,im.width,im.height];x+=im.width+2;rh=max(rh,im.height)
A=Image.new('RGBA',(W,y+rh),(0,0,0,0))
for k,im in ims:A.paste(im,tuple(pos[k][:2]))
import numpy as np
a=np.asarray(A).astype(np.float32);rgb=a[...,:3];l=rgb.mean(2,keepdims=True);rgb=(l+(rgb-l)*.88)*.84;rgb[...,2]*=1.03
A=Image.fromarray(np.dstack([np.clip(rgb,0,255),a[...,3:]]).astype(np.uint8),'RGBA')
A.save('hd-nat.webp','WEBP',quality=82,method=6);print(A.size,os.path.getsize('hd-nat.webp'));print(json.dumps(pos,separators=(',',':')))
