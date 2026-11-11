# REFUGEE — Spirit Tower edge decorations (redo, hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played on phones. Another assistant (Claude) will cut the sheets automatically, so **please follow the format exactly**.

The Spirit Tower has 100 floors in 10 themes. Each floor is a round arena ringed by pillars. The floors (`floors/`) and the pillars (`good_example/approved_tower_pillars_*.png`) are already done and approved. Between the pillars, along the arena edge, stand a few **large and medium scene objects** (altars, archways, bookshelves, crystal clusters and so on).

Those objects are still from the first batch and look wrong next to the new pillars. See `bad_example/current_decor_too_flat.jpg`, with one row per theme, and `ingame_floor73.jpg`, where the flat ribcage, altar and gravestone stand next to painted pillars. They are **flat vector shapes with plain outlines and no texture**. The two medium objects of each theme are also **almost identical**. Please repaint all 40.

These are **objects in the scene, not icons**: no badge, no frame, no background.

## What "good" looks like — match `good_example/`
- `approved_tower_pillars_02.png` and `_04.png` are the new pillars these objects will stand next to. **Match that painting style, outline weight, lighting and level of detail exactly.**
- `approved_sheet_R05.png` and `_R08.png` show other approved props from the game.
- Hand-painted fantasy game art with **painted texture and volume**: stone grain, chips and cracks, moss, wood grain, metal sheen, bone pores, crystal facets. **Do not use flat vector fills with outlines only.**
- Clean dark outline, warm light from the upper left, self-shading on the right side, ambient occlusion where parts meet.
- Front view from about 20° above, so we see a little of the top surfaces.
- Rich but not neon colour, using each theme's palette (see `floors/floor_NN.jpg`).

## Sheet format
- **5 sheets** `decor_01.png … decor_05.png`, each **1536×1024, transparent background**.
- **4 columns × 2 rows** (cells are 384×512). The **top row is the first theme** of that sheet and the **bottom row is the second theme**.
- Each row, left to right:
  1. **Large A**: a large centrepiece, about pillar height, but wider and heavier than a pillar.
  2. **Large B**: a second large centrepiece with a **clearly different silhouette** from Large A.
  3. **Medium A**: a medium object, about waist height in the world.
  4. **Medium B**: a second medium object. **It must not be a recolour or copy of Medium A**, so give it a different shape and purpose.
- **Paint every object as large as its cell allows** (about 85% of the cell width or height, whichever is reached first). The medium objects are shown smaller in the game, but the game scales them, so they still need full detail and a **bold, readable silhouette**.
- One object per cell, centred, resting on its base at the bottom. Leave clear space around each one and **do not touch the cell edges**.
- **No ground plane, no floor tile, no cast shadow, no halo or aura outside the silhouette, no text, letters or numbers, no people.** Light belongs **inside** the object (flames, crystals, glowing cracks); the game adds glow itself. Keep the alpha clean, with nothing faint outside the object.

## Themes and objects
**decor_01.png**
- Top row, theme 01 **Ancient Gate Hall** (grey weathered stone, moss, violet spirit glow):
  1. A ruined stone archway (not a door) with a violet glowing geometric keystone, a chipped top and moss.
  2. A spirit crystal shrine: a violet crystal floating above a stepped stone plinth with carved sigils.
  3. A cracked stone offering pedestal with melted violet candles and a small bronze bowl.
  4. A heavy carved stone urn with iron ring handles and a violet glow in the cracks.
- Bottom row, theme 02 **Spirit Library** (dark wood, brass, soft blue light):
  1. A tall overflowing bookshelf with leaning books, scrolls and a brass ladder.
  2. A carved lectern on a small dais with an open grimoire floating above it, pages glowing blue.
  3. A tall stack of old tomes tied with a strap, with a scroll and a quill on top.
  4. A brass-bound reading desk globe (a world globe in a wooden stand) with a blue candle.

**decor_02.png**
- Top row, theme 03 **Frost Crystal Hall** (pale blue ice, frost, snow):
  1. A large cluster of ice crystal prisms growing from a frozen rock.
  2. A frozen arch made of ice blocks with icicles and snow on top.
  3. A crystal geode split open on a frosted rock, glowing cold blue inside.
  4. A snow-covered old supply chest frozen shut, with icicles and a frosted iron lock.
- Bottom row, theme 04 **Lava Forge** (black basalt, iron, orange lava):
  1. A stone forge furnace with a chimney and an open mouth glowing orange inside.
  2. A giant iron crucible on a stepped stand, tipped slightly, with molten metal at the lip.
  3. A blacksmith's anvil on a tree stump, with a hammer resting on it.
  4. A pile of glowing iron ingots and coal in a small mine cart.

**decor_03.png**
- Top row, theme 05 **Glowing Fungal Grotto** (mossy earth, roots, teal and violet glow):
  1. A giant mushroom tree: a cluster of three tall mushrooms on a root mass, with violet caps and teal spots.
  2. One huge mushroom with glowing teal gills under a wide cap and roots gripping the ground.
  3. A mossy tree stump covered in glowing teal shelf fungi.
  4. A cluster of round glowing spore pods (puffballs), violet with teal light, on moss.
- Bottom row, theme 06 **Clockwork Chamber** (brass, copper, steel):
  1. A giant upright gear on an iron frame with pistons and rivets.
  2. A brass orrery machine with turning rings, a teal core and a copper base.
  3. A wooden crate overflowing with brass cogs, springs and a wrench.
  4. A copper steam boiler tank with a pressure gauge (dial without numbers), a valve wheel and a small steam puff.

**decor_04.png**
- Top row, theme 07 **Sky Terrace** (white-gold marble, sky blue, cloud wisps):
  1. A broken white marble arch with gold trim and carved stone wings on top.
  2. A marble pedestal holding a pair of large carved stone wings (wings only, no figure) and a gold spire.
  3. A broken fluted column stump with a plain cloth banner on a gold pole (no letters).
  4. A marble planter urn with gold handles, small white flowers and a cloud wisp curling around it.
- Bottom row, theme 08 **Dragon Bone Crypt** (obsidian, old bone, green ghost fire):
  1. A giant dragon ribcage arching up from an obsidian base.
  2. A horned dragon skull on an obsidian altar, with green ghost-fire in the eye sockets.
  3. A bone-and-obsidian gravestone with a pair of small horns and a green glowing crack.
  4. A pile of old bones with a big curved dragon claw on top.

**decor_05.png**
- Top row, theme 09 **Star Observatory** (deep navy, gold, brass):
  1. A large brass armillary sphere on a navy and gold stand, with a glowing star at the centre.
  2. A navy arch with gold constellation inlay and a starry glow inside the arch.
  3. A brass telescope on a wooden tripod, aimed upward.
  4. A celestial globe (navy, with gold stars) on a carved pedestal with a rolled star chart.
- Bottom row, theme 10 **Void Throne** (black-violet obsidian, pink-gold cosmic cracks):
  1. A broken obsidian throne with a cracked back and pink-gold light in the cracks.
  2. A cluster of pink-violet crystal spires growing out of broken black rock.
  3. A tall shard monolith floating a little above a cracked base, with pink-gold veins.
  4. A broken column base with a pink-gold void orb hovering above it in a ring of small shards.

## Checklist before sending
- All 40 objects are painted with texture and volume, **not flat**, and match the approved pillars.
- In each row, the 4 objects have 4 different silhouettes, and the two medium objects are not the same object recoloured.
- The background is transparent, with no shadow or ground, no text, and nothing touching the cell edges.

Deliver `decor_01.png … decor_05.png` with these file names, zipped. If you can only do part of it, do them **in order**.
