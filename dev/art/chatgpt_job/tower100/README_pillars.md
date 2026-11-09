# REFUGEE — Spirit Tower pillars (redo, hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played on phones. Another assistant (Claude) will cut the sheets automatically, so **please follow the format exactly**.

The Spirit Tower has 100 floors in 10 themes. Each floor is a round arena with **32 pillars around its edge**, and every 4th one is a light source. The floors are done (`floors/`) and look good. The pillars we got last time (`bad_example/too_flat_and_samey.jpg`) are **too flat, too simple, and nearly identical across themes, only recoloured**. Please redo them.

## What "good" looks like — match `good_example/`
Those two sheets are already in the game and approved. Match that quality:
- Hand-painted fantasy game art with **painted texture and volume**: stone grain, chips, cracks, moss, metal sheen, wood grain. **Do not use flat vector shapes with outlines only.**
- Clean dark outline, warm light from upper left, self-shading on the right side, ambient occlusion where parts meet.
- Front view from about 20° above, so we see a little of the top of the capital and the base.
- Rich but not neon colour, using each theme's palette (see the floor in `floors/floor_NN.png`).

## Each theme must have its OWN silhouette
**The three pillars of one theme must look like they belong together, and the pillars of different themes must not share a shape.** If you laid out all 10 themes' pillars side by side, someone should be able to tell which theme each one comes from by **silhouette alone**.

## Sheet format
- **5 sheets** `pillars_01.png … pillars_05.png`, each **1536×1024, transparent background**.
- **4 columns × 2 rows** (cells are 384×512). The **top row is the first theme** of that sheet and the **bottom row is the second theme**.
- Each row, left to right:
  1. **Pillar A**: intact, the main design.
  2. **Pillar B**: the same design, damaged or broken (cracked, chipped, top broken off, leaning a little).
  3. **Pillar C**: the same design with an extra feature (decoration, growth, chains, banner, glow and so on, as listed below).
  4. **Light source**: a brazier, lamp or crystal stand in the theme, about 70% of the pillar height, with the flame or glow **inside** the object.
- One object per cell, centred. Pillars stand upright with the base at the bottom and fill about **85% of the cell height**. Leave clear space around each one and **do not touch the cell edges**.
- All 4 objects in a row use **the same scale**.
- **No ground plane, no cast shadow, no halo or aura outside the silhouette, no text, letters or numbers, no people or creatures.** The game adds glow itself. Keep the alpha clean: nothing faint outside the object.

## Themes and pillar designs
**pillars_01.png**
- Top row, theme 01 **Ancient Gate Hall** (floors 1–10, grey stone, violet spirit glow): a square weathered granite column with a stepped base and a heavy capital, faint violet glowing **geometric** sigils carved in the shaft (no letters), and moss in the cracks.
  - C: iron chains with a hanging iron lantern ring.
  - Light: an iron tripod brazier with violet-white spirit fire.
- Bottom row, theme 02 **Spirit Library** (11–20, dark wood, blue light): a carved dark-wood column shaped like a **tall bookcase post**, with built-in little shelves of old books and scrolls up the shaft and brass corner fittings.
  - C: floating blue candles orbiting the top.
  - Light: a brass reading-lamp stand holding a glowing blue spirit flame in a glass globe.

**pillars_02.png**
- Top row, theme 03 **Frost Crystal Hall** (21–30, pale blue ice): a column of **clustered ice crystal prisms** grown together, frosted at the base, with icicles hanging from a flared top.
  - C: snow piled on top with frozen chains.
  - Light: a crystal shard on an ice plinth glowing cold white-blue from inside.
- Bottom row, theme 04 **Lava Forge** (31–40, black basalt, orange lava): a **hexagonal basalt column** (natural columnar basalt) with glowing orange lava seams between the segments and an iron band clamp.
  - C: a hanging hammer and tongs, plus a molten drip.
  - Light: a stone forge brazier with orange coals and flame inside.

**pillars_03.png**
- Top row, theme 05 **Glowing Fungal Grotto** (41–50, mossy green, teal/violet glow): **no stone column**. Use a twisted **giant root-and-stalk** trunk made of braided roots, with glowing teal shelf-fungus growing up the side and a mushroom cap crown.
  - C: violet glowing mushrooms and hanging vines.
  - Light: a single tall mushroom with a glowing teal cap, lit from inside.
- Bottom row, theme 06 **Clockwork Chamber** (51–60, brass, copper): a **brass pipe-and-gear tower** with stacked gears on the shaft, copper pipes wrapping around it, rivets and a pressure gauge (dial without numbers).
  - C: a turning flywheel and steam valve with a small steam puff.
  - Light: a brass gas lamp with a warm amber glass bulb.

**pillars_04.png**
- Top row, theme 07 **Sky Terrace** (61–70, white-gold marble, sky blue): a slender **fluted white marble column** with a gold Ionic scroll capital and small carved wing motifs, and a little cloud wisp around the base.
  - C: a long plain cloth banner (no letters) flowing in the wind.
  - Light: a golden sun-disc lantern on a marble post.
- Bottom row, theme 08 **Dragon Bone Crypt** (71–80, obsidian, bone, green ghost fire): a column made of **stacked giant vertebrae** on an obsidian base, with a curved dragon rib arching off one side.
  - C: a horned dragon skull mounted on top.
  - Light: a bone brazier (claws curling up) holding green ghost-fire.

**pillars_05.png**
- Top row, theme 09 **Star Observatory** (81–90, deep navy, gold): a **navy-lacquered column with gold constellation inlay** lines and star points, topped by a small brass armillary sphere.
  - C: a brass telescope mounted on the side.
  - Light: a glass orb holding a tiny glowing star, held by golden claws on a stand.
- Bottom row, theme 10 **Void Throne** (91–100, black-violet, pink-gold): **no solid column**. Use a **floating stack of broken obsidian shards** hovering in a vertical line above a cracked base, with pink-gold cosmic light in the cracks.
  - C: a crystal spire growing from the shards.
  - Light: a floating pink-gold void crystal above a broken plinth.

Deliver `pillars_01.png … pillars_05.png` with these file names, zipped. If you can only do part of it, do them **in order**.
