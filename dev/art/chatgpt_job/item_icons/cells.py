# 5 tier looks: tiers 0-1 → G0, 2 → G1, 3 → G2, 4 → G3, 5-6 → G4
TG=[0,0,1,2,3,4,4]; REP=[1,2,3,4,6]  # tier used for reference picture of each look
GN=['Basic','Elite','Mystic','Relic','Legendary']
GD=['BASIC: plain worn materials, leather wraps and dull iron, simple and humble',
    'ELITE: polished silver steel with cool blue accents and one small blue gem, clean craftsmanship',
    'MYSTIC: dark blued steel etched with glowing violet arcane runes and a violet gem, magical aura',
    'RELIC: ornate royal gold with filigree and fiery orange-red gems, regal and rich',
    'LEGENDARY: blackened crimson metal with cosmic star-dust glow in pink-violet, the most ornate and powerful, small floating star sparks']
WP=[('melee:0','Warrior','a one-handed longsword'),('melee:1','Warrior','a battle axe'),('melee:2','Warrior','a curved saber'),
    ('archer:0','Ranger','a hunting bow'),('archer:1','Ranger','a long recurve war bow'),('archer:2','Ranger','a crossbow'),
    ('mage:0','Mage','a staff topped with a glowing orb'),('mage:1','Mage','a staff topped with a large crystal shard'),('mage:2','Mage','a staff topped with a crescent moon'),
    ('sup:0','Priest','a holy staff topped with a lotus flower'),('sup:1','Priest','a holy cross-topped staff'),('sup:2','Priest','a holy lantern on a staff'),
    ('assn:0','Assassin','a pair of crossed twin daggers'),('assn:1','Assassin','a pair of claw blades (katar-style)'),('assn:2','Assassin','a curved karambit dagger')]
AR=[('h','heavy plate armour (chest piece with pauldrons)'),('l','light leather armour (fitted jerkin with straps)'),('r','a mage robe (long robe with collar and sash)')]
HM=[('h0','an open-face knight helmet'),('h1','a hood/cowl with a metal brow band'),('h2','a circlet crown headpiece')]
C=[]  # (kind,key,label_th,brief)
for k,cls,w in WP:
    for g in range(5): C.append(('w',f'w|{k}|{g}',f'อาวุธ {cls} {k}',f'{cls} weapon: {w}. {GD[g]}'))
for k,a in AR:
    for g in range(5): C.append(('a',f'a|{k}|{g}','เกราะ',f'Body armour: {a}, shown flat on its own, no person. {GD[g]}'))
for k,h in HM:
    for g in range(5): C.append(('h',f'h|{k}|{g}','หมวก',f'Headgear: the SAME TYPE of headgear as in this cell\'s reference picture (helmet, hood, crown, hat...), shown on its own with NO head or face inside. {GD[g]}'))
for g in range(5): C.append(('c',f'c|{g}','เครื่องประดับ',f'Accessory: the SAME TYPE as this cell\'s reference picture (necklace, amulet, pendant, medallion, charm). {GD[g]}'))
for g in range(5): C.append(('b',f'b|{g}','รองเท้า',f'Boots: a pair of boots. {GD[g]}'))
SETS=[(1,'Abyssal King set (teal sea-green, pearls, coral, waves)',{'w':'a trident','a':'scale armour','c':'a pearl ring','h':'a coral crown','b':'wave boots'}),
      (2,'Abyssal Guardian set (deep blue, shells, sea-stone)',{'w':'a guardian spear','a':'shell-plate armour','c':'a sea-stone bracelet','h':'a seashell helmet','b':'stone boots'}),
      (3,'Dawn Angel set (white and warm gold, feathers, sunrise light)',{'w':'a spear of dawn light','a':'feathered armour','c':'a golden halo charm','h':'an angel crown','b':'winged boots'}),
      (4,'Storm Bird set (sky blue, lightning, storm feathers)',{'w':'a lightning halberd','a':'storm-feather armour','c':'a storm-eye pendant','h':'a lightning-crest crown','b':'whirlwind boots'}),
      (5,'Shadow Weaver set (violet and black, spider silk, shadows)',{'w':'a shadow-silk weapon (thread-wrapped blade)','a':'a shadow weaver cloak','c':'a shuttle-shaped shadow ring','h':'a shadow weaver mask','b':'shadow-step boots'}),
      (6,'World Root set (amber gold and living wood, roots and leaves)',{'w':'a golden root-heart weapon','a':'root-bark armour','c':'an amber resin ring','h':'an ancient root crown','b':'root-walker boots'})]
for sid,sn,P in SETS:
    for sl in 'wachb': C.append(('set',f's|{sid}|{sl}',f'ชุดเซ็ต {sid} {sl}',f'LEGENDARY SET piece, {sn}: {P[sl]}. Rich, unique, clearly part of this themed set.'))
MATS=[('ps','a protective stone: a shield-shaped grey stone with a glowing blue cross (prevents breaking)'),('twc','a spirit tower coin: a silver-blue coin with a tower emblem'),
 ('sc','abyssal scales: a small pile of teal fish scales'),('hr','an abyssal heart: a glowing deep-sea crystal heart'),('fe','a dawn feather: a white-gold glowing feather'),
 ('sf','a storm feather: a sky-blue feather crackling with lightning'),('rs','golden root sap: a drop of amber resin in a small vial'),('nt','shadow thread: a spool of violet-black thread'),
 ('ec','an eclipse shard: a black crystal shard with a pink-violet rim'),('o1','iron ore: a rusty iron ore chunk'),('o2','mithril ore: a glowing pale-blue ore chunk'),
 ('o3','meteor ore: a golden starry ore chunk'),('gm','a raw gemstone: an uncut multicolour gem'),('h1','green herb: a bundle of green herb leaves'),
 ('h2','silver moon flower: a softly glowing silver-white flower'),('h3','starlight lotus: a lotus sparkling with stars'),('rt','spirit mushroom: a glowing ghostly mushroom'),
 ('d1','red dye: a small round dye pot of crimson dye'),('d2','blue dye: a dye pot of indigo blue'),('d3','green dye: a dye pot of emerald green'),('d4','pink dye: a dye pot of sakura pink'),
 ('d5','black dye: a dye pot of midnight black with a shimmer'),('d6','white dye: a dye pot of pearl white'),('d7','gold dye: a dye pot of shining gold'),('d8','rainbow dye: a dye pot swirling with rainbow colours and stars'),
 ('bty','a bounty coin: a bronze coin with a crossed-swords target emblem'),('rnsh','rune dust: a small pile of glowing cyan rune powder'),('rnsg','link-rune shard: a broken shard of a glowing rune gem'),
 ('xgfs','a bucket of fresh fish'),('xgfd','a packed meal box of cooked food'),('xgrb','a rebirth shard: a glowing sunrise-gold crystal shard')]
for k,d in MATS: C.append(('mat',f'm|{k}',k,f'Material: {d}.'))
