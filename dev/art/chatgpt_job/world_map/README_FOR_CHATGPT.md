# REFUGEE: painted World Map (3 tall paintings) + 44 map medallions

You have already painted a lot of art for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG for phones: the title screen, the story scenes, and the 10 region landscapes (`refs/approved_style_region_paintings.jpg`). All of it is in the game and looks wonderful.

This job is the **World Map**. Right now it is flat colour bands with emoji on round dots (`refs/current_world_map_screen.jpg`). Players open it all the time to travel, so it should look like a treasure map of the whole world.

Another assistant (Claude) puts the images into the game automatically, so **please follow the format exactly**.

## How the game uses it
- The map is **one tall vertical picture** that the player scrolls up and down. The **top is the starfield and the sky islands**, then the **sea of clouds** and the dark land **beneath the clouds**, then the **ground**, and at the bottom the **underground**.
- Because it is very tall, you paint it as **3 portrait images, 1024×1536**. The game stacks them in this order, top to bottom:
  1. `map_1_sky.png`
  2. `map_2_clouds.png`
  3. `map_3_ground.png`
  
  `templates/overview_all_3_stacked.jpg` shows all three together.
- **On top of your painting, the game draws:**
  - a round **medallion** for every place (the red numbered circles in the templates);
  - the place name and level under each medallion;
  - the travel roads between places (the thin white lines).
  
  So **paint the landmark of each place around its numbered circle** (roughly 150–250 px across, centred on the circle). Leave the roads to the game, but the golden light bridge (see below) is part of the painting.
- **Medallions:** the emoji are replaced by **44 small painted medallions**, one per place (part 2 below).

## Style
- Same painterly anime-fantasy style and quality as the region landscapes and the title art (`refs/`). Rich colour, soft painted light, magical atmosphere.
- **Point of view:** a fantasy **cut-away / cross-section map**, seen from slightly above. Each place is a small, clear, readable vignette (a city on its island, a temple, a lake, a cave), like a hand-painted map in an art book. It is **not** a realistic satellite view.
- **No text, letters, numbers, labels, compass, frame, border or UI** anywhere. The templates' numbers and names are only for placement and must not be painted.
- No characters and no monsters (tiny distant ships or lanterns are fine).
- The **area right around each numbered circle** must stay readable: the medallion sits there and the name goes just below it. Avoid very bright or very busy detail exactly under the circle and the name. Put the landmark itself around and behind that spot.

## Seams between the 3 images
- The **bottom 80 px of image 1** and the **top 80 px of image 2** are **soft clouds and mist**. The game blends them together, so they don't have to match exactly.
- The same applies to the **bottom 80 px of image 2** and the **top 80 px of image 3**: soft mist or haze, with no landmarks in those strips.
- **The golden light bridge (Dawn Bridge) is the backbone of the map.** It is a glowing golden path that starts under Astra in image 1 (x ≈ 565 px), goes down through the whole of image 2 near the centre (x ≈ 520–570), and lands at the Refugee Camp at the top of image 3 (number 1). Keep it at the same x where it crosses each seam (about x 555), so it lines up.
- Please keep **the same lighting and palette family** across the three images: night sky in the upper part, dawn-gold clouds, warm earthy land, then dark earth with glowing details.

---

## Image 1: `map_1_sky.png` (1024×1536, opaque): Starfield + sky islands
Follow `templates/template_map_1_sky.png`.

Top ~25%: **outer space**, deep violet with nebulae, galaxies and star dust (places 40–42). The rest: **floating islands in a night-blue sky** above the clouds, each place on its own island or part of the big Astra island. The city **Astra (9)** is the biggest and brightest island, with the glowing **Star Heart** under it. From under Astra the **golden light bridge** begins and goes straight down out of the bottom of the image. A **stairway of light** rises from the Orion Observatory (36) to the Floating Star Platforms (40).

Places in this image (number: name, centre in px, what to paint):

- **42: Star-Web Field**, around (853, 207): a vast web of silver threads strung with captured stars like dewdrops
- **41: Gear Ring**, around (555, 133): enormous slowly turning brass gear rings floating in space
- **40: Floating Star Platforms**, around (270, 251): floating star-stone platforms linked by a stairway of light
- **36: Orion Observatory**, around (327, 517): a brass-domed observatory tower with a giant telescope on a tall rocky peak; a stairway of light rises from it up to the star platforms
- **28: Queen's Garden**, around (583, 561): floating garden islands with silver thorny rose vines and white flowers
- **29: Star Throne**, around (853, 487): a high hall at the top of the palace with a glowing star throne seen through tall windows
- **27: Royal Palace**, around (768, 753): grand white-and-gold palace halls and stairs of Astra
- **9: Astra, the Floating City**, around (569, 960): the capital: white-and-gold spires on a big flying island, a glowing blue Star Heart crystal beneath it, waterfalls pouring off the edges
- **10: Rift Plain**, around (853, 1034): a wide floating plain of glowing star-eggs under a jagged violet crack in the sky
- **11: Beyond the Rift**, around (910, 1300): a dark violet void nest behind the sky crack, with a monstrous nest of stars
- **31: Lower Ring**, around (711, 1241): a market district on a ring hanging under the city, with red paper lanterns and curved market roofs
- **12: Wind Bridge**, around (370, 886): a long stone-and-rope bridge between islands, with strong wind streaks
- **14: Cloud Clock Tower**, around (156, 724): a tall clock tower standing on a cloud island
- **16: Crystal Forest**, around (100, 975): an island forest of tall yellow-white crystals crackling with lightning
- **18: Storm Temple**, around (193, 1152): a temple on the highest storm island inside dark thunderclouds with lightning
- **13: Floating Garden**, around (370, 1196): a green island of hanging gardens with vines falling over its edges
- **17: Whirlwind Valley**, around (100, 1365): a valley island with a big swirling tornado
- **15: Star Lake**, around (336, 1382): a calm lake on an island that reflects the stars

## Image 2: `map_2_clouds.png` (1024×1536, opaque): Sea of clouds + the land beneath the clouds
Follow `templates/template_map_2_clouds.png`.

The top ~30% is the **surface of the sea of clouds at sunrise** (pink-gold), with the **golden light bridge** coming down the centre and floating ruins on the right. Below that, the **left third** is the dark **land beneath the clouds**: the cloud sea becomes a low dark ceiling, with a deep indigo, teal and violet glow (places 19–22) and one pale shaft of starlight falling through a hole in the clouds. The **centre** is the light bridge continuing down. On the **right**, misty clouds hold the sky-ship wrecks and the giant whale (39), and below them a **tall cliff rises from the ground** with the lighthouse harbor on top (38).

Places in this image (number: name, centre in px, what to paint):

- **30: Dawn Bridge**, around (555, 162): the TOP of a bridge of golden light; the bridge comes down from Astra above and keeps curving down through the clouds to the camp in the next image
- **32: Floating Ruins of Aranya**, around (754, 354): floating ruins: upside-down houses, broken towers and old bronze bells hanging in the air
- **33: Empty Heart Pit**, around (882, 606): a floating island with a huge round pit, spiral stairs and broken giant gears, a faint violet glow inside
- **39: Sky-Ship Graveyard**, around (825, 916): wrecks of old sky ships in the cloud mist; the back of a giant whale with constellation markings arcs out of the clouds nearby
- **38: Cloud Harbor Cliff**, around (853, 1255): a high cliff rising out of the ground below, with a red-and-white lighthouse, wooden piers and sky ships with sails docked at the top
- **19: Giant Mushroom Forest**, around (242, 325): (beneath the clouds) a forest of giant glowing teal and violet mushrooms
- **20: Purple Mist Bog**, around (128, 620): (beneath the clouds) a misty purple bog with dead trees
- **21: Ruined City Beneath the Clouds**, around (313, 886): (beneath the clouds) black ruins of an old forgotten city
- **22: Shadow Throne**, around (156, 1182): (beneath the clouds) a dark abyss with a black shadow throne and a dark moon

## Image 3: `map_3_ground.png` (1024×1536, opaque): Ground + underground (cross-section)
Follow `templates/template_map_3_ground.png`.

The top ~55% is **the ground** (the old lands), seen from slightly above. The **Refugee Camp (1)** is in the upper middle where the golden light bridge lands. Around it are many small lands with very different looks (fire, ice, desert, bones, gold mine, lake, meteor plain), like regions on a fantasy map. The **base of the colossal Spirit Tower** rises out of the top-left (5). Then the **ground is cut away** (a cross-section edge of soil, rock and roots) and the bottom ~45% is **the underground**: dark earth and caverns with glowing roots, a glowing lake, ghost-blue swords, a warm root city, the molten core, and at the very bottom the **stone giant** holding up the land. The **Abyss Mouth (43)** is a huge hole at the edge of the ground that leads down into the Deep Root City (44).

Places in this image (number: name, centre in px, what to paint):

- **5: Spirit Tower Plaza**, around (199, 133): the stone plaza at the foot of the colossal 100-floor Spirit Tower (show the tower base rising out of the top of the image)
- **1: Refugee Camp**, around (512, 236): the heart of the map: wooden palisade, gate with sun banners, canvas tents, a campfire with smoke, lanterns. Safe and warm
- **34: Meteor-Fall Plain**, around (768, 103): a night plain with glowing craters where stars have fallen, a few tents of star collectors
- **35: Karn Mine**, around (910, 325): a mine cut into a cliff with glowing blue-white star crystals
- **3: Hellfire Land**, around (270, 414): red-black volcanic land with lava rivers and flames
- **2: Bone Valley**, around (725, 384): a bone-white valley with giant ancient ribs and skulls
- **7: Abandoned Gold Mine**, around (853, 620): a goblin gold mine entrance with mine carts full of gold
- **8: Pharaoh's Tomb**, around (114, 665): a small desert with a pyramid tomb and sand dunes
- **4: Ice Temple**, around (384, 673): snowy icy peaks with a frozen blue temple
- **6: Sunken City**, around (612, 635): a lake with the ruins of a city sunk under the water, glowing blue
- **43: Abyss Mouth**, around (142, 945): the ground has collapsed into a huge abyss: a red flag at the rim, ropes going down into the dark
- **23: Root Cave**, around (427, 960): (underground) a cave crossed by giant ancient roots
- **24: Underground Lake**, around (683, 975): (underground) a glowing turquoise underground lake reflecting the roots
- **25: Knights' Tomb**, around (853, 1211): (underground) a field of planted swords glowing ghost-blue
- **26: World Core**, around (569, 1374): (underground, deepest) a molten orange-gold glowing core
- **44: Deep Root City**, around (156, 1182): (underground) a warm city built inside giant roots: round windows, mushroom lamps, rope bridges
- **45: Foundation of the Land**, around (213, 1433): (underground, bottom) a gigantic stone giant kneeling and holding up the land, wrapped in a net of roots

---

## Part 2: 44 map medallions: `medallions_01.png`, `medallions_02.png`
These replace the emoji on the map, one per place. They are shown **small (about 32–44 px)**, so they must read instantly.

- **Format:** 2 sheets, **1536×1024**, each a **6 × 4 grid** of exactly **256×256** cells, with no gutters. Follow `templates/template_medallions_01.png` and `_02.png`. Cells are numbered left to right, top to bottom. On sheet 2, cells 21–24 are **(empty)**: leave them plain black.
- **Each medallion is a round coin**, about **232 px wide**, centred in its cell. Everything **outside the coin is pure black (#000000)**. Do not put a glow, shadow or anything else outside the circle.
- **Rim:** every medallion has the **same ornate antique bronze-gold rim** (fairly thin, about 14–18 px), so all 44 look like one set.
- **Inside the rim:** a **rich hand-painted miniature** of that place's emblem, in its own natural colours (fire is red-orange, ice pale blue, the mushroom teal, and so on), with a soft background that matches the place's mood. Follow the style of the approved skill icons (`refs/approved_style_painted_icons.jpg`): painted light, volume and glow, **one bold central object**, and a strong silhouette. Make it **not** a flat gold-on-gold vector.
- **No text, letters or numbers.** Every medallion must look clearly different from the others, both in colour and in shape.

### medallions_01.png
1. (Refugee Camp) a campfire in front of a canvas tent
2. (Bone Valley) an ancient white skull
3. (Hellfire Land) a burning flame over lava
4. (Ice Temple) a pale blue ice crystal / snowflake
5. (Spirit Tower Plaza) a tall slender glowing spirit tower
6. (Sunken City) sunken city towers under blue water
7. (Abandoned Gold Mine) a mine cart full of gold with a pickaxe
8. (Pharaoh's Tomb) a golden pyramid in the desert
9. (Astra, the Floating City) white-gold city spires on a floating island
10. (Rift Plain) a jagged violet crack in a night sky
11. (Beyond the Rift) a dark violet vortex hole with sparks
12. (Wind Bridge) a curved bridge with wind swirls
13. (Floating Garden) a green leafy vine island
14. (Cloud Clock Tower) a clock tower face
15. (Star Lake) a calm lake reflecting a shooting star
16. (Crystal Forest) a crackling crystal with lightning
17. (Whirlwind Valley) a swirling tornado
18. (Storm Temple) a temple under a thundercloud with lightning
19. (Giant Mushroom Forest) a glowing teal mushroom
20. (Purple Mist Bog) purple mist over a swamp
21. (Ruined City Beneath the Clouds) broken dark city ruins
22. (Shadow Throne) a black crescent moon over a shadow throne
23. (Root Cave) a giant twisted root with a small sprout
24. (Underground Lake) a glowing turquoise water drop

### medallions_02.png
1. (Knights' Tomb) a planted sword glowing ghost-blue
2. (World Core) a molten orange glowing core orb
3. (Royal Palace) a white-gold palace with domes
4. (Queen's Garden) a silver rose with thorny vines
5. (Star Throne) a glowing throne with a star above it
6. (Dawn Bridge) a golden arched bridge of light at sunrise
7. (Lower Ring) a red paper lantern
8. (Floating Ruins of Aranya) an old bronze bell hanging from a broken arch
9. (Empty Heart Pit) a violet glowing heart-shaped hole with spiral stairs
10. (Meteor-Fall Plain) a falling meteor with a fiery tail
11. (Karn Mine) a glowing blue crystal cluster with a pickaxe
12. (Orion Observatory) a brass telescope aimed at a star
13. (Cloud Harbor Cliff) a red-and-white lighthouse with an anchor
14. (Sky-Ship Graveyard) the back of a whale with constellation marks
15. (Floating Star Platforms) a small floating star platform with a light stair
16. (Gear Ring) a large brass gear ring with a star in the centre
17. (Star-Web Field) a silver spider-web with glowing star drops
18. (Abyss Mouth) a deep pit with a red flag at the rim
19. (Deep Root City) a round warm-lit window in a root house
20. (Foundation of the Land) the face of a stone giant holding up rock
21. (empty)
22. (empty)
23. (empty)
24. (empty)

---

## Checklist before sending
- [ ] `map_1_sky.png`, `map_2_clouds.png` and `map_3_ground.png`: 1024×1536, opaque, painted, no text, numbers, labels or frame.
- [ ] Every numbered place has its landmark around its circle position, with the spot under the circle and name kept calm.
- [ ] The seam strips (bottom and top 80 px) are soft mist. The golden light bridge crosses both seams at about x 555.
- [ ] `medallions_01.png` and `medallions_02.png`: 1536×1024, 6×4 cells of 256. Round coins about 232 px wide with the same bronze-gold rim, pure black outside, no text, all different.

Deliver the 5 PNG files with these exact names, zipped. If you can only do part of it, do it **in this order**: the 2 medallion sheets, then the 3 map images.
