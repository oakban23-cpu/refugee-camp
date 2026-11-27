import json,sys,os,numpy as np
from PIL import Image
S=sys.argv[1];P=S+'/cpin/pc/';O=S+'/cp7/'
CAP={}
for k in 'OAK_BIG,OAK,PINE,PINE_SMALL,BIRCH,BLOSSOM,MAPLE,WILLOW,DEAD_TREE,SAPLING,FRUIT_TREE,POPLAR'.split(','):CAP[k]=250
for k in 'TREE_STUMP,BUSH_ROUND,BUSH_BERRY,BUSH_FLOWER,FERN,THORNS,ROCK_BIG,ROCK_MED,ROCKS_SMALL,LOG,ROOTS,STANDING_STONE'.split(','):CAP[k]=150
for k in 'FLOWERS_RED,FLOWERS_BLUE,FLOWERS_YELLOW,MUSHROOMS_RED,MUSHROOMS_BROWN,TALL_GRASS'.split(','):CAP[k]=72
for k in 'REEDS_A,REEDS_B,BANK_ROCKS,LOG_IN_WATER,WATER_ROCKS,LILY_PADS,STEPPING_STONES,WATER_FLOWERS,DUCK_FAMILY'.split(','):CAP[k]=120
CAP.update(BRIDGE_WOOD=240,BRIDGE_STONE=240,FISHING_DOCK=150,POND_SMALL=440,POND_LARGE=360)
for k in 'NEST_WOLF,NEST_SPIDER,NEST_BONES,NEST_SLIME,NEST_BOAR,NEST_GOBLIN,NEST_MUSHROOM,NEST_RUIN'.split(','):CAP[k]=230
for k in 'SIGNPOST,LANTERN_POST,CAMPFIRE_SMALL,CAULDRON,WATER_BARREL,WOODPILE,CHICKEN,CHICKEN_BROWN,CHICKEN_COOP,GOAT,DOG,CAT,LAUNDRY_LINE,BEDROLLS,TOOL_RACK,WHEELBARROW,SACKS,CRATES_OPEN,FLOWER_POTS,BENCH_LOG,TABLE_STOOLS,WELL_SMALL,BANNER_CAMP,TORCH_STAND'.split(','):CAP[k]=130
items=[]
for k,c in CAP.items():
    im=Image.open(P+k+'.png').convert('RGBA')
    if k=='BANNER_CAMP':
        a=np.asarray(im).astype(float);mx=a[...,:3].max(2);mn=a[...,:3].min(2);m=(mn>170)&(mx-mn<35)
        tint=np.array([70,110,190]);a[m,:3]=a[m,:3]*tint/255;im=Image.fromarray(a.clip(0,255).astype('uint8'))
    s=min(1,c/max(im.width,im.height*0.8));im=im.resize((max(1,round(im.width*s)),max(1,round(im.height*s))),Image.LANCZOS) if s<1 else im
    items.append((k,im))
for k in ('FENCE_RAIL_H','FENCE_RAIL_V','FENCE_STONE_H','FENCE_STONE_V'):
    im=Image.open(S+'/cpfence/'+k+'.png').convert('RGBA');im=im.resize((round(im.width*.5),round(im.height*.5)),Image.LANCZOS);items.append((k,im))
items.sort(key=lambda t:-t[1].height);W=2048;x=y=sh=0;R={}
for k,im in items:
    if x+im.width+2>W:x=0;y+=sh+2;sh=0
    R[k]=[x,y,im.width,im.height];x+=im.width+2;sh=max(sh,im.height)
at=Image.new('RGBA',(W,y+sh))
for k,im in items:at.paste(im,tuple(R[k][:2]))
at.save(O+'hd-cp.webp',quality=86,method=6);json.dump(R,open(O+'cp_meta.json','w'),separators=(',',':'))
print('atlas',at.size,os.path.getsize(O+'hd-cp.webp'))
# textures 768 each, 3x3 grid (7 used)
T=['grass','meadow','dirt','mud','cobble','plaza','water'];N=768;ta=Image.new('RGB',(N*3,N*3));TM={}
for i,k in enumerate(T):
    im=Image.open(S+'/cptex/tex_camp_%s.png'%k).convert('RGB')
    # wrap-safe resize
    w,h=im.size;t3=Image.new('RGB',(w*3,h*3))
    for a in range(3):
        for b in range(3):t3.paste(im,(a*w,b*h))
    t3=t3.resize((N*3,N*3),Image.LANCZOS).crop((N,N,2*N,2*N))
    x,y=(i%3)*N,(i//3)*N;ta.paste(t3,(x,y));TM[k]=[x,y,N,N]
ta=ta.crop((0,0,N*3,N*3));ta.save(O+'hd-cp-t.webp',quality=82,method=6);json.dump(TM,open(O+'cp_tmeta.json','w'))
print('tex',ta.size,os.path.getsize(O+'hd-cp-t.webp'))
