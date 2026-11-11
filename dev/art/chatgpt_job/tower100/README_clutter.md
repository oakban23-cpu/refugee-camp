# REFUGEE — Spirit Tower floor clutter (hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played on phones. Another assistant (Claude) will cut the sheets automatically, so **please follow the format exactly**.

The Spirit Tower has 100 floors in 10 themes. Each floor is one big round arena. The floor, pillars, edge decorations and centre pieces are all painted and approved (`good_example/`). The **open floor of the arena still looks empty** (`ingame_empty_floor43.jpg`, `ingame_empty_floor13.jpg`). We want to scatter **small clutter** over it so it feels lived-in and ruined.

The first batch of clutter was **tiny, flat vector shapes and nearly identical across themes**, so it was never used (`bad_example/current_clutter_too_flat_and_tiny.jpg`). Please paint 40 new pieces.

## How they are used — important
- Each piece lies **on the arena floor** among players and monsters, and is drawn **under** them. On screen it is small, about **30–50 px wide**.
- So each piece must have a **chunky, simple, readable silhouette**, mostly **wider than tall** (things lying on the ground, low piles, fallen fragments).
- Use **muted, earthy colours**, a little darker and less saturated than the big decorations, so it reads as part of the floor. If there is any glow, keep it small and dim.
- **Never paint anything that looks like a pickup or loot**: no gold coins, no gems lying loose, no potions, no hearts, no chests, no keys, no weapons. Players must not mistake clutter for items to collect.
- No creatures, no people.

## What "good" looks like — match `good_example/`
- Match the painting style, outline weight, lighting and detail of `approved_tower_decor_01.png`, `_04.png` and `approved_tower_shared_01.png`.
- Hand-painted fantasy game art with **painted texture and volume** (stone grain, chips, moss, wood grain, bone pores, metal sheen). **Do not use flat vector fills with outlines only.**
- Clean dark outline, warm light from the upper left, self-shading on the right side.
- Seen from about **35° above**, a bit more top-down than the big decorations, because these lie flat on the floor.

## Sheet format
- **5 sheets** `clutter_01.png … clutter_05.png`, each **1536×1024, transparent background**.
- **4 columns × 2 rows** (cells are 384×512). The **top row is the first theme** of that sheet and the **bottom row is the second theme** (see `template_layout.png`).
- One object per cell, centred, resting at the bottom half of the cell. **Paint each piece large**, filling about **85% of the cell width**. The game shrinks it, so it needs full detail.
- **No ground plane, no floor patch, no cast shadow, no halo, no text, letters or numbers.** Keep the alpha clean, with nothing faint outside the object.
- The 4 pieces in a row must have **4 clearly different silhouettes**.

## Themes and pieces
**clutter_01.png**
- Top row, theme 01 **Ancient Gate Hall** (grey stone, moss, faint violet):
  1. A low pile of broken grey stone rubble with moss in the gaps.
  2. A fallen broken pillar segment lying on its side, chipped at both ends.
  3. A cracked floor-slab chunk with a faint violet geometric sigil, half sunk.
  4. A fallen rusty iron wall bracket with a short length of chain.
- Bottom row, theme 02 **Spirit Library** (dark wood, old paper, dim blue):
  1. A toppled pile of old leather books.
  2. An old book lying open with a few loose pages scattered around it.
  3. A bundle of rolled scrolls tied with a faded ribbon.
  4. A fallen brass candle holder with melted, unlit candles.

**clutter_02.png**
- Top row, theme 03 **Frost Crystal Hall** (pale ice, snow):
  1. A small low cluster of ice crystals.
  2. A snow drift half covering a frozen rock.
  3. Broken icicle shards lying in a little heap.
  4. A frost-covered broken stone urn lying on its side, with snow inside.
- Bottom row, theme 04 **Lava Forge** (black basalt, dim orange):
  1. Basalt rubble with one thin dim orange lava seam.
  2. A cooled puddle of dark slag with faint glowing cracks.
  3. A loose iron chain coiled with a pair of old tongs.
  4. A small cracked clay crucible tipped over, empty.

**clutter_03.png**
- Top row, theme 05 **Glowing Fungal Grotto** (moss, roots, dim teal and violet):
  1. A small cluster of tiny teal mushrooms on a moss clump.
  2. A mossy rock with a few small violet mushrooms.
  3. A tangle of twisted roots breaking out of the ground.
  4. A fallen, deflated spore pod with a dim glow at its split.
- Bottom row, theme 06 **Clockwork Chamber** (brass, copper, steel):
  1. Scattered loose gears and bolts in a low heap.
  2. A broken copper pipe segment with a small valve wheel.
  3. A bent brass spring coil with a cog beside it.
  4. A tipped-over oil can with a small dark oil puddle.

**clutter_04.png**
- Top row, theme 07 **Sky Terrace** (white marble, gold trim, cloud):
  1. A fallen marble column drum (a short round slice) lying on its side.
  2. A broken carved marble wing fragment lying flat (stone only).
  3. Low marble rubble with a small cloud wisp curling over it.
  4. The shards of a broken gold-trimmed marble urn.
- Bottom row, theme 08 **Dragon Bone Crypt** (old bone, obsidian, dim green):
  1. A small pile of old bones with a cracked small skull (animal-like, not human).
  2. A few big vertebrae lying in a row.
  3. A broken curved horn lying on the ground.
  4. Obsidian shards mixed with bone fragments.

**clutter_05.png**
- Top row, theme 09 **Star Observatory** (navy, aged brass):
  1. A fallen brass astrolabe ring lying flat.
  2. A dropped rolled star chart, half unrolled.
  3. A broken brass telescope tube with a cracked lens.
  4. A small heap of navy stone rubble with tiny gold star inlays.
- Bottom row, theme 10 **Void Throne** (black-violet obsidian, dim pink-gold):
  1. A few small obsidian shards hovering just above a crack in the ground.
  2. A low cluster of small dull pink-violet crystals.
  3. A cracked void rock with a thin dim pink-gold vein.
  4. A broken piece of a throne armrest lying on its side.

## Checklist before sending
- All 40 pieces are painted with texture, **not flat**, and match the approved style.
- They are low and wide, muted in colour, and clearly readable at small size.
- Nothing looks like loot (coins, gems, potions, hearts, keys, chests, weapons).
- The background is transparent, with no shadow, no ground patch and no text.

Deliver `clutter_01.png … clutter_05.png` with these file names, zipped. If you can only do part of it, do them **in order**.
