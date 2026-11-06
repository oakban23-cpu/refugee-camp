# REFUGEE — งานภาพชุดสุดท้าย: ต้นไม้ 24 แมพ + ซี่โครงยักษ์ (sheet_08b)

You are making hand-painted game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG. Another assistant (Claude) will cut your sheets automatically and put them into the game, so **follow the format exactly**.

## Style — must match `style_reference/approved_sheet_*.png`
These four sheets were approved and are already in the game. Match them: hand-painted fantasy game asset, clean dark outlines, warm highlights and self-shading, front view from about 20° above, rich but not neon colour.
- Transparent background. **No ground plane, no cast shadow, no text/letters/numbers, no people, no animals.**
- Light stays inside the object (glowing cracks, crystals, lanterns). **No halo/aura around the silhouette** — the game adds glow itself. Clean alpha: nothing faint outside the silhouette.
- Look at `refs/scenes/mapNN.jpg` for each map's colour mood and `refs/current_trees/mapNN_current_trees.png` for what the objects are now (simple vectors). Keep the same idea and silhouette type, paint it much richer.

## Sheet format
- One PNG per sheet, **1536×1024, transparent**, **4 columns × 3 rows**; cells 1–4 top row left→right, 5–8 middle, 9–12 bottom.
- One object per cell, centred, about 75% of the cell height, clear empty space around it, nothing touching the cell edges or other objects.
- Objects of the same map must be drawn **at the same scale** (they stand next to each other in the game). Trees/columns stand upright with their base at the bottom of the object.
- File names exactly as below.

## Sheets

### sheet_T01.png
- **Cells 1–6 — map 02 หุบเขากระดูก (Bone Valley)**: Bare dead tree: dark brown twisted trunk, thin crooked leafless branches, a few pale bone-white knots on the bark. Make 6 different branch shapes/heights.
- **Cells 7–12 — map 03 ดินแดนเพลิงนรก (Hellfire Lands)**: Dark basalt boulder, angular and heavy, with glowing orange lava cracks across its face. 6 different boulder shapes and crack patterns.
- refs: `refs/current_trees/map02_current_trees.png`, `refs/current_trees/map03_current_trees.png`, `refs/scenes/map02.jpg`, `refs/scenes/map03.jpg`

### sheet_T02.png
- **Cells 1–6 — map 04 วิหารน้ำแข็งนิรันดร์ (Eternal Ice Temple)**: Cluster of pale icy-blue crystals standing on a small round snow mound. 6 different cluster arrangements (3–5 crystals).
- **Cells 7–12 — map 05 ลานหอคอยวิญญาณ (Spirit Tower Court)**: Round puffy spirit tree with dense indigo/violet foliage and a short dark trunk; a faint pale wisp of light above the crown. 3 indigo-blue + 3 violet-purple, different crown shapes.
- refs: `refs/current_trees/map04_current_trees.png`, `refs/current_trees/map05_current_trees.png`, `refs/scenes/map04.jpg`, `refs/scenes/map05.jpg`

### sheet_T03.png
- **Cells 1–6 — map 06 ซากนครจมบาดาล (Sunken City Ruins)**: Broken dark-teal sunken stone pillar wrapped in green seaweed strands, with tiny glowing white pearls/bubbles on it. 6 different break heights and seaweed.
- **Cells 7–12 — map 07 เหมืองทองร้าง (Abandoned Gold Mine)**: Angular brown rock spike / jagged boulder, some with small gold-ore flecks. 6 different shapes.
- refs: `refs/current_trees/map06_current_trees.png`, `refs/current_trees/map07_current_trees.png`, `refs/scenes/map06.jpg`, `refs/scenes/map07.jpg`

### sheet_T04.png
- **Cells 1–6 — map 08 ทะเลทรายสุสานฟาโรห์ (Pharaoh Desert)**: 2 weathered sandstone blocks with a carved ankh-like symbol (a symbol only, no letters) + 4 rounded layered sandstone rocks with tan/brown stripes.
- **Cells 7–12 — map 10 ทุ่งรอยแยกนภา (Sky-Rift Plain)**: Dark indigo crystalline rock with a thin glowing violet crack. 6 different rock shapes.
- refs: `refs/current_trees/map08_current_trees.png`, `refs/current_trees/map10_current_trees.png`, `refs/scenes/map08.jpg`, `refs/scenes/map10.jpg`

### sheet_T05.png
- **Cells 1–6 — map 11 ดินแดนหลังรอยแยก (Beyond the Rift)**: Dark purple-black void rock; 3 plain with a faint pink crack, 3 with glowing pink crystal spikes growing out of the top.
- **Cells 7–12 — map 12 สะพานลมตะวันตก (West Wind Bridge)**: Grey stone cairn / rock spire with a snow cap and little white clouds around its base; 3 plain, 3 with a small blue pennant flag on top.
- refs: `refs/current_trees/map11_current_trees.png`, `refs/current_trees/map12_current_trees.png`, `refs/scenes/map11.jpg`, `refs/scenes/map12.jpg`

### sheet_T06.png
- **Cells 1–6 — map 13 สวนลอยฟ้าร้าง (Abandoned Sky Garden)**: 2 round green oak-like trees, 3 trees covered in pink and white blossoms, 1 small ivy-covered stone garden statue on a pedestal.
- **Cells 7–12 — map 14 หอนาฬิกาเมฆ (Cloud Clock Tower)**: Brass-and-wood clockwork pillar: a wooden post with brass bands, carrying a big brass gear or a small clock face (no numerals), a little steam puff on top on some. 6 different combos.
- refs: `refs/current_trees/map13_current_trees.png`, `refs/current_trees/map14_current_trees.png`, `refs/scenes/map13.jpg`, `refs/scenes/map14.jpg`

### sheet_T07.png
- **Cells 1–6 — map 15 ทะเลสาบดาวตก (Starfall Lake)**: 3 weeping willow trees with dark teal-green drooping leaves + 3 tall clumps of cattail reeds with brown seed heads.
- **Cells 7–12 — map 16 ป่าผลึกสายฟ้า (Lightning Crystal Forest)**: Cluster of sharp electric-blue crystal spikes on a dark base, faint inner glow. 6 different spike arrangements.
- refs: `refs/current_trees/map15_current_trees.png`, `refs/current_trees/map16_current_trees.png`, `refs/scenes/map15.jpg`, `refs/scenes/map16.jpg`

### sheet_T08.png
- **Cells 1–6 — map 17 หุบเหวลมหวน (Howling Wind Gorge)**: 2 wind-bent dark green pine trees + 4 tall layered sandstone monoliths (beige with darker strata, small pebbles at the base).
- **Cells 7–12 — map 18 ซากวิหารพายุ (Storm Temple Ruins)**: Broken lavender-grey marble column: tall intact one, short broken stub, one toppled on its side, some with ivy and cracks. 6 variants.
- refs: `refs/current_trees/map17_current_trees.png`, `refs/current_trees/map18_current_trees.png`, `refs/scenes/map17.jpg`, `refs/scenes/map18.jpg`

### sheet_T09.png
- **Cells 1–6 — map 19 ป่าเห็ดเรืองแสง (Glowing Mushroom Forest)**: Giant glowing mushroom with a thin pale stalk and a wide cap with light spots; 4 teal/cyan caps + 2 violet caps, different heights, soft glow under the cap.
- **Cells 7–12 — map 20 บึงหมอกม่วง (Purple Mist Swamp)**: 4 dead dark-purple swamp trees with forked bare branches and hanging pale-green moss + 2 clumps of dark dry reeds.
- refs: `refs/current_trees/map19_current_trees.png`, `refs/current_trees/map20_current_trees.png`, `refs/scenes/map19.jpg`, `refs/scenes/map20.jpg`

### sheet_T10.png
- **Cells 1–6 — map 21 ซากนครใต้เมฆ (Ruined City Below the Clouds)**: Broken grey stone pillar/stele with a chipped top and a little rubble at the base, faint white sparkle on some. 6 different heights.
- **Cells 7–12 — map 22 ห้วงบัลลังก์เงา (Abyss of the Shadow Throne)**: Tall black obsidian shard with glowing violet veins; 2 of them with a faint pale cobweb between shard edges. 6 shapes.
- refs: `refs/current_trees/map21_current_trees.png`, `refs/current_trees/map22_current_trees.png`, `refs/scenes/map21.jpg`, `refs/scenes/map22.jpg`

### sheet_T11.png
- **Cells 1–6 — map 23 โพรงรากหิน (Stone-Root Hollow)**: Hollow tree stump / root column of twisted brown roots, with a small warm lantern-glow inside the hollow. 6 shapes.
- **Cells 7–12 — map 24 ทะเลสาบใต้ดินเรืองแสง (Glowing Underground Lake)**: Tall glowing crystal column cluster: 3 cyan, 3 periwinkle-blue, inner light, different heights.
- refs: `refs/current_trees/map23_current_trees.png`, `refs/current_trees/map24_current_trees.png`, `refs/scenes/map23.jpg`, `refs/scenes/map24.jpg`

### sheet_T12.png
- **Cells 1–6 — map 25 สุสานอัศวินร้อยดวง (Hundred-Knight Graveyard)**: 3 old mossy rounded headstones (one with a carved cross) + 3 knight swords planted point-down in a small stone base, faint cold blue glow on the blade.
- **Cells 7–12 — map 26 แกนพิภพ (World Core)**: Dark basalt monolith / rock pillar with glowing orange lava cracks running up it, a small ember glow at the base. 6 shapes.
- refs: `refs/current_trees/map25_current_trees.png`, `refs/current_trees/map26_current_trees.png`, `refs/scenes/map25.jpg`, `refs/scenes/map26.jpg`

### sheet_08b.png — สุสานเรือเมฆ (Cloud Ship Graveyard, map 39)
- **Cells 1–3: giant rib bones (`sgrib`), three heights (short / medium / tall).** Each = a PAIR of long, slender, ivory-white curved rib bones rising from a soft bank of white cloud, both ribs bending inward at the top like part of an enormous skeleton's ribcage, with a narrow gap between the tips. Smooth bone surface, faint joint rings, light grey-blue shading. Tall and thin (about 1 : 1.3 width : height). **Not horns, not tusks, not brown.** See `refs/sgrib_current_3variants.png` and `refs/scenes/map39.jpg`.
- Cells 4–12: leave empty. (The tombstone NPC and griffin captain are characters, so they are not needed.)

## Order of work
sheet_08b first, then sheet_T01 → sheet_T12. After each batch give the PNG files plus a short note only if you changed anything (e.g. `sheet_T05 cell 3: …`).
Do not edit any game code.
