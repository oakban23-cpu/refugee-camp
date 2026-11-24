import json
from PIL import Image, ImageDraw, ImageFont
P='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/vfxpack/'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',16);F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',11)
SH={
'vfx_01_steel':[('SLASH_ARC','crescent sword slash, white-hot core, orange-red edges','h'),('SLASH_SPIN','almost full 300° spinning blade ring, gold-white','c'),
 ('CROSS_SLASH','X-shaped double slash, crimson with white core','c'),('THRUST_STREAK','long horizontal piercing streak, sharp tip at the right','h'),
 ('IMPACT_BURST','star-shaped impact flash with long spikes, white centre, orange','c'),('SHOCKWAVE_RING','thin glowing shockwave ring with dust sparks, flat circle','c'),
 ('GROUND_CRACKS','glowing lava-red cracks radiating from the centre','c'),('DEMON_FLAME','upward crimson demonic flame tongues (aura behind a hero)','v'),
 ('SPARK_BURST','many small hot sparks flying outward','c'),('SHIELD_DOME','glowing hexagon energy shield bubble, gold-blue, mostly hollow','c'),
 ('DASH_TRAIL','speed streak lines, horizontal, fading to the left','h'),('CLAW_MARKS','three parallel glowing red claw scratches, diagonal','c')],
'vfx_02_arcane':[('FIRE_EXPLOSION','big fiery explosion burst, orange-yellow core','c'),('FIREBALL','fireball flying right with a flame tail to the left','h'),
 ('FLAME_PILLAR','tall vertical pillar of fire','v'),('ICE_SHATTER','burst of sharp ice crystals flying outward, cyan-white','c'),
 ('FROST_NOVA','ring of frost and snowflake sparkles, flat circle','c'),('ICE_SPEAR','long ice spear pointing right, glowing cyan','h'),
 ('LIGHTNING_BOLT','vertical jagged lightning bolt from top to bottom, blue-white','v'),('LIGHTNING_ORB','crackling ball of electricity','c'),
 ('METEOR','meteor falling diagonally down-left with a long fire trail','c'),('FIRE_CIRCLE','orange runic magic circle, flat, seen from the front','c'),
 ('ARCANE_CIRCLE','violet runic magic circle with star pattern, flat','c'),('VOID_VORTEX','purple swirling vortex with bright rim and dark core','c')],
'vfx_03_light_shadow':[('HOLY_CIRCLE','golden holy rune circle with cross and sun motifs, flat','c'),('LIGHT_PILLAR','vertical beam of holy light from the sky','v'),
 ('HEAL_SPARKLES','rising green-gold sparkles and small light crosses','v'),('HALO_RAYS','golden halo ring with radiant rays','c'),
 ('ANGEL_WINGS','pair of radiant golden angel wings made of light, spread','w'),('LIGHT_SWORD','giant sword made of light pointing down','v'),
 ('SHADOW_SLASH','violet-black crescent slash with purple glow edges','h'),('SHADOW_WISPS','smoky purple shadow wisps with glowing edges','c'),
 ('POISON_SPLASH','toxic green splash burst with droplets','c'),('CURSE_SIGIL','purple curse rune circle with a skull motif, flat','c'),
 ('MOON_CRESCENT','huge silver-violet crescent moon blade','c'),('SOUL_WISP','ghostly blue spirit flame wisp with tail','v')],
'vfx_04_wind_ult':[('WIND_ARROW','arrow of green-white wind flying right with a swirl trail','h'),('ARROW_RAIN','many glowing arrow streaks falling down','v'),
 ('WIND_TORNADO','small tornado of green-white wind with leaves','v'),('STAR_ARROW','blue star-comet arrow flying right','h'),
 ('PIERCE_BEAM','long straight horizontal energy beam, white core, blue-green edges','h'),('LEAF_STORM','ring of glowing leaves spinning','c'),
 ('ULT_SIGIL','large complex gold-white ultimate magic sigil, flat','c'),('MEGA_BLAST','huge white-gold energy explosion','c'),
 ('GOD_RAYS','fan of light rays shining downward','w'),('STAR_FLARE','4-point star flare sparkle with lens glints','c'),
 ('GLOW_ORB','soft round glowing energy orb, white-gold','c'),('ENERGY_SPIRAL','spiral of energy ribbons, cyan-violet','c')]}
J={}
for k,items in SH.items():
    im=Image.new('RGB',(1536,1024),(0,0,0));d=ImageDraw.Draw(im);cw,ch=384,1024/3;out=[]
    for i,(n,desc,shape) in enumerate(items):
        c,r=i%4,i//4;x0,y0=round(c*cw),round(r*ch);x1,y1=round((c+1)*cw),round((r+1)*ch)
        d.rectangle([x0,y0,x1-1,y1-1],outline=(70,70,70),width=2)
        m=22;bx=[x0+m,y0+m+16,x1-m,y1-m]
        d.rectangle(bx,outline=(40,110,200),width=2)
        d.text((x0+8,y0+5),'%d  %s'%(i+1,n),fill=(230,230,230),font=F)
        d.text((x0+8,y1-18),desc[:58],fill=(150,150,150),font=F2)
        out.append(dict(n=i+1,name=n,desc=desc,shape=shape,cell=[x0,y0,x1,y1]))
    im.save(P+'pack/templates/'+k+'_template.png');J[k]=out
json.dump(J,open(P+'tools/sheets.json','w'),indent=1)
print('ok')
