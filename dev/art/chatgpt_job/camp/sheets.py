import json
from PIL import Image, ImageDraw, ImageFont
P='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/cppack/'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16);F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',11)
SH={
 'cp_01_water':(4,3,[
  ('BRIDGE_WOOD','Wooden footbridge crossing a stream left-to-right, railings, no water drawn','b'),
  ('BRIDGE_STONE','Small arched stone bridge crossing left-to-right, mossy, no water drawn','b'),
  ('FISHING_DOCK','Short wooden fishing pier on posts, a bucket and a rod','b'),
  ('REEDS_A','Clump of green reeds for a stream bank','b'),
  ('REEDS_B','Clump of cattails / bulrushes','b'),
  ('BANK_ROCKS','Cluster of mossy bank rocks with grass','b'),
  ('LOG_IN_WATER','Fallen mossy log half in water (draw only the log)','b'),
  ('WATER_ROCKS','2-3 wet rocks sticking out of water (draw only the rocks)','b'),
  ('LILY_PADS','Lily pads with 2 pink flowers SEEN FROM ABOVE (flat)','f'),
  ('STEPPING_STONES','Row of 4 flat stepping stones SEEN FROM ABOVE (flat)','f'),
  ('WATER_FLOWERS','Small yellow/white water flowers floating, SEEN FROM ABOVE (flat)','f'),
  ('DUCK_FAMILY','A mother duck and 3 ducklings swimming (top-down 3/4)','b')]),
 'cp_02_ponds':(2,1,[
  ('POND_LARGE','Large natural pond SEEN FROM ABOVE: clear water, muddy/sandy bank, reeds, stones, lily pads. Fill the box.','f'),
  ('POND_SMALL','Small round pond / puddle SEEN FROM ABOVE with stones around and some reeds','f')]),
 'cp_03_nests':(4,2,[
  ('NEST_WOLF','Wolf den: dark rocky cave mouth in a mound, claw marks, bones','b'),
  ('NEST_SPIDER','Spider nest: thick webs between dead stumps, egg sacs','b'),
  ('NEST_BONES','Bone pile nest: skulls, ribs, a broken shield, purple wisps','b'),
  ('NEST_SLIME','Slime pool: bubbling green goo puddle in a ring of rocks','b'),
  ('NEST_BOAR','Boar burrow: dug dirt mound, roots, tusk marks, muddy hole','b'),
  ('NEST_GOBLIN','Goblin camp: small crude hide tent, totem with a skull, spears','b'),
  ('NEST_MUSHROOM','Glowing mushroom ring with a dark hole in the middle','b'),
  ('NEST_RUIN','Cursed ruin: broken stone arch with dark red glow inside','b')]),
 'cp_04_forest':(6,5,[
  ('OAK_BIG','Big round oak tree','b'),('OAK','Oak tree','b'),('PINE','Tall pine tree','b'),('PINE_SMALL','Small pine tree','b'),('BIRCH','Birch tree','b'),('BLOSSOM','Pink blossom tree','b'),
  ('MAPLE','Orange-red maple tree','b'),('WILLOW','Weeping willow (for the stream)','b'),('DEAD_TREE','Bare dead tree','b'),('SAPLING','Young sapling','b'),('FRUIT_TREE','Apple tree with red apples','b'),('TREE_STUMP','Big tree stump with moss','b'),
  ('BUSH_ROUND','Round green bush','b'),('BUSH_BERRY','Bush with red berries','b'),('BUSH_FLOWER','Bush with white flowers','b'),('FERN','Fern clump','b'),('TALL_GRASS','Tall grass clump','b'),('THORNS','Thorny bramble','b'),
  ('ROCK_BIG','Big grey boulder with moss','b'),('ROCK_MED','Medium rock','b'),('ROCKS_SMALL','3 small rocks','b'),('ROCK_FLAT','Flat rock slab','b'),('LOG','Fallen log with moss','b'),('ROOTS','Gnarled roots coming out of the ground','b'),
  ('FLOWERS_RED','Clump of red poppies','b'),('FLOWERS_BLUE','Clump of bluebells','b'),('FLOWERS_YELLOW','Clump of yellow daisies','b'),('MUSHROOMS_RED','Red spotted mushrooms','b'),('MUSHROOMS_BROWN','Brown mushrooms on moss','b'),('STANDING_STONE','Old carved standing stone with moss','b')]),
 'cp_05_props':(6,4,[
  ('SIGNPOST','Wooden signpost with 3 BLANK arrow boards (no text)','b'),('LANTERN_POST','Wooden post with hanging lantern','b'),('CAMPFIRE_SMALL','Small campfire with a cooking spit','b'),('CAULDRON','Cooking cauldron on a tripod over fire','b'),('WATER_BARREL','Rain barrel with a ladle','b'),('WOODPILE','Stacked firewood under a small roof','b'),
  ('CHICKEN','A chicken (white)','b'),('CHICKEN_BROWN','A brown hen','b'),('CHICKEN_COOP','Small chicken coop','b'),('GOAT','A goat','b'),('DOG','A friendly camp dog lying down','b'),('CAT','A cat sitting','b'),
  ('LAUNDRY_LINE','Laundry line between two poles with clothes','b'),('BEDROLLS','2 bedrolls and a backpack','b'),('TOOL_RACK','Rack with shovel, pick, saw','b'),('WHEELBARROW','Wheelbarrow with dirt','b'),('SACKS','Pile of grain sacks','b'),('CRATES_OPEN','Open crates with apples and carrots','b'),
  ('FLOWER_POTS','3 clay flower pots','b'),('BENCH_LOG','Log bench','b'),('TABLE_STOOLS','Small wooden table with 2 stools and mugs','b'),('WELL_SMALL','Small stone well with a bucket','b'),('BANNER_CAMP','Tall pole with a long WHITE banner','b'),('TORCH_STAND','Standing wooden torch, burning','b')]),
}
J={}
for k,(cols,rows,items) in SH.items():
    W,H=1536,1024;im=Image.new('RGB',(W,H),(255,0,255));d=ImageDraw.Draw(im);cw,ch=W/cols,H/rows;out=[]
    for i,(n,desc,kind) in enumerate(items):
        c,r=i%cols,i//cols;x0,y0=round(c*cw),round(r*ch);x1,y1=round((c+1)*cw),round((r+1)*ch)
        d.rectangle([x0,y0,x1-1,y1-1],outline=(110,110,110),width=2);m=14;bx=[x0+m,y0+m+18,x1-m,y1-m-14];d.rectangle(bx,outline=(40,110,220),width=2)
        if kind=='b':by=round(bx[1]+(bx[3]-bx[1])*0.90);d.line([bx[0],by,bx[2],by],fill=(230,30,30),width=2)
        d.text((x0+6,y0+3),'%d %s'%(i+1,n),fill=(20,20,20),font=F);d.text((x0+6,y1-15),desc[:int(cw/6.3)],fill=(40,40,40),font=F2)
        out.append(dict(n=i+1,name=n,desc=desc,kind=kind,cell=[x0,y0,x1,y1],box=bx))
    im.save(P+'pack/templates/'+k+'_template.png');J[k]=dict(grid=[cols,rows],items=out)
# fence strips
im=Image.new('RGB',(1536,512),(255,0,255));d=ImageDraw.Draw(im);rows=[]
for i,t in enumerate(['FENCE_RAIL_H  wooden rail fence (2 rails on posts)','FENCE_STONE_H  low dry-stone wall with grass']):
    y0=i*256;d.rectangle([0,y0,1535,y0+255],outline=(110,110,110),width=2);by=y0+round(256*.86);d.line([0,by,1535,by],fill=(230,30,30),width=2)
    d.text((8,y0+4),'%d %s · SEAMLESS LEFT<->RIGHT · base on red line'%(i+1,t),fill=(20,20,20),font=F);rows.append(dict(name=t.split()[0],row=[y0,y0+256],base=by))
im.save(P+'pack/templates/cp_06_fence_h_template.png');J['cp_06_fence_h']=dict(rows=rows)
im=Image.new('RGB',(1024,1024),(255,0,255));d=ImageDraw.Draw(im);cols=[]
for i,t in enumerate(['FENCE_RAIL_V','FENCE_STONE_V']):
    x0=i*512;d.rectangle([x0,0,x0+511,1023],outline=(110,110,110),width=2);cx=x0+256;d.line([cx-45,0,cx-45,1023],fill=(40,110,220),width=2);d.line([cx+45,0,cx+45,1023],fill=(40,110,220),width=2)
    d.text((x0+6,6),t+'  same fence running north-south, seen from above',fill=(20,20,20),font=F);d.text((x0+6,28),'SEAMLESS TOP<->BOTTOM · stay between the blue lines',fill=(40,40,40),font=F2);cols.append(dict(name=t,col=[x0,x0+512]))
im.save(P+'pack/templates/cp_07_fence_v_template.png');J['cp_07_fence_v']=dict(cols=cols)
json.dump(J,open(P+'tools/sheets.json','w'),indent=1,ensure_ascii=False);print('ok',list(J))
