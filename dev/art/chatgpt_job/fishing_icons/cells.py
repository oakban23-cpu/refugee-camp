RAR=['common','uncommon','rare','epic','LEGENDARY (grand, glowing, awe-inspiring)']
WAT={'w':'freshwater river','bog':'misty purple swamp','lava':'lava lake','ice':'frozen ice lake','deep':'abyssal deep sea','sand':'desert oasis','sky':'sky-island cloud sea','void':'cosmic void'}
FB={'w0':'a tilapia fish, silver-grey','w1':'a giant freshwater prawn with long blue claws','w2':'a giant snakehead fish, dark and muscular','w3':'a huge Mekong giant catfish, river king','w4':'a jade water dragon, serpentine, glowing green',
'bog0':'a mud catfish with whiskers, murky brown','bog1':'a swamp field crab, greenish','bog2':'a ghostly spirit eel, translucent violet','bog3':'a haunted skeleton fish, bones with ghostly glow','bog4':'a swamp queen giant squid, purple, crowned',
'lava0':'an ember fish with glowing coal scales','lava1':'a lava shrimp, red-hot shell','lava2':'a magma pufferfish, spiky and glowing orange','lava3':'a fire salamander dripping flames','lava4':'an ancient lava dragon, molten and majestic',
'ice0':'a snow fish, white and pale blue','ice1':'an ice-leg crab with frosted claws','ice2':'a crystal fish with transparent faceted body','ice3':'a small white beluga whale','ice4':'an ice fish emperor, dragon-like with an ice crown',
'deep0':'a lantern anglerfish with a glowing lure','deep1':'a bioluminescent squid','deep2':'an abyssal pufferfish, dark with glowing spots','deep3':'a shadow abyss shark','deep4':'a moonlight whale glowing silver-blue',
'sand0':'an oasis fish, sandy gold','sand1':'a water scorpion','sand2':'a pharaoh goldfish with gold scales and a tiny headdress pattern','sand3':'a sand octopus, ochre','sand4':'a golden naga serpent, regal',
'sky0':'a cloud fish, white and fluffy-finned','sky1':'a wind shrimp, translucent','sky2':'a wind manta ray gliding','sky3':'a cloud whale floating','sky4':'a storm bird-fish hybrid with lightning wings',
'void0':'a little starfish fish sparkling','void1':'a galaxy shrimp with nebula shell','void2':'a shooting-star fish with a comet tail','void3':'a cosmic squid with starry tentacles','void4':'a celestial sky whale full of stars'}
FOOD=[('grill','salt-grilled fish on a skewer'),('tom','a pot of spicy tom yum fish soup'),('lucky','lucky rice balls with fish filling'),('sushi','a platter of mixed sushi'),('curry','a bowl of sour orange curry with snakehead fish'),
('spicy','fiery lava-grilled chilli fish'),('sashimi','ice sashimi on a frosty plate'),('ramen','a bowl of abyssal ramen with glowing fish cake'),('feast','a royal fish feast set in a lacquered box'),
('smoke','charcoal-smoked fish on a rack'),('stew','a fish stew in a stone hearth pot')]
RODS=[('r0','a bamboo fishing rod, simple'),('r1','a teak wood fishing rod with brass reel'),('r2','a steel fishing rod, sleek'),('r3','a naga-silver fishing rod with serpent engraving and blue gems'),('r4','a golden dragon fishing rod, legendary, with a dragon head tip and glowing gold')]
ELX=[('xdm','Rage elixir: a potion bottle of glowing crimson liquid with a flame motif (damage up)'),('xhp','Heartstone elixir: a potion of glowing green with a stone heart charm (max HP up)'),
('xsp','Whirlwind elixir: a potion of swirling yellow with wind streaks (speed up)'),('xxp','Sage elixir: a potion of deep blue with an open-book/star motif (EXP up)'),('xlk','Fortune elixir: a potion of violet with gold coins and a four-leaf sparkle (luck)')]
STN=[('s1','Enhancement stone tier 1: a rough grey whetstone with a faint blue glowing rune'),('s2','Enhancement stone tier 2: a polished mithril-blue stone with a brighter glowing rune'),('s3','Enhancement stone tier 3: a radiant pink-gold star-forged stone, legendary glow')]
import json
F=json.load(open(__file__.rsplit('/',1)[0]+'/data.json'))['fish']
C=[]
for fid,e,n,b,r in F: C.append(('fish','f|'+fid,n,f'Fish ({WAT[b]}, {RAR[r]}): {FB[fid]}.'))
for k,d in FOOD: C.append(('food','d|'+k,k,f'Cooked dish: {d}, served appetisingly with steam or glow.'))
for k,d in RODS: C.append(('rod','r|'+k,k,f'Fishing rod: {d}. Shown diagonally.'))
for k,d in ELX: C.append(('elx','x|'+k,k,f'{d}.'))
for k,d in STN: C.append(('stn','s|'+k,k,f'{d}.'))
