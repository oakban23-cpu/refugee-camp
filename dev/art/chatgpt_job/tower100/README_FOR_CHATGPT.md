# REFUGEE — Spirit Tower (100 floors) art job

You are painting game art for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played mostly on phones. Another assistant (Claude) will cut your images automatically and put them into the game, so **please follow the format exactly**.

The **Spirit Tower** is a 100-floor challenge dungeon. Every floor is one big **round arena** (seen from above at a slight angle), and players climb a glowing staircase to the next floor. Right now every floor is the same flat grey tiles with a few pillars (see `refs/current_*.jpg`), and it looks boring. We are giving **every 10 floors their own look** (10 themes) and adding painted props.

## Style — match `style_reference/`
- Hand-painted fantasy game art, the same look as the approved sheets in `style_reference/`.
- Clean dark outlines, warm highlights and self-shading, and rich colours that are not neon.
- For props, use a front view from about 20° above. Sheets `approved_props_sheet_R05.png` and `approved_props_sheet_R08.png` show the exact props format that already works in the game.
- **No text, letters, numbers or runes that look like real writing.** Symbols and geometric sigils are fine.
- **No people, no monsters, no animals.**

## Image types

### A) Arena floors `floor_01.png … floor_10.png` — 1024×1024
- **Top-down view, flat floor only.** Nothing stands up from it: no pillars, no furniture, no characters.
- One **circular arena that fills the canvas**: a circle about 1000 px across, centred. **Everything outside the circle must be transparent.**
- Give the circle a decorative **rim band** about 40–60 px wide (a stone/metal/bone border that suits the theme).
- Inside, paint floor tiles or ground in the theme. Add **one large central sigil/emblem** (a summoning circle or geometric pattern) about 45% of the diameter, inlaid in the floor.
- **Readability matters more than detail.** Monsters, players and spell effects are drawn on top, so keep the inner 70% **calm and low-contrast**: medium-dark values, small detail, no bright spots. Put the richer detail on the rim and the emblem.
- Use even lighting. No strong cast shadows and no vignette.
- It does not need to tile seamlessly; it is used as one image.

### B) Theme props `props_01.png … props_10.png` — 1536×1024, transparent, 4 columns × 3 rows
- Cells are numbered 1–4 on the top row, 5–8 in the middle and 9–12 at the bottom, left to right.
- Put one object in each cell, centred and about 75% of the cell height. Leave clear space around it; nothing may touch the cell edges or other objects.
- All objects on one sheet share **the same scale**, because they stand together around the same arena. Upright objects stand on their base at the bottom.
- **No ground plane, no cast shadow, no halo or aura around the silhouette.** Light belongs *inside* the object (flames, crystals, glowing cracks) and the game adds glow itself. Keep the alpha clean, with nothing faint outside the silhouette.
- Cell layout, the same for every theme:
  - **1–3**: tall pillar or column, 3 variants (one intact, one cracked, one with decoration such as a banner without letters, vines or chains). These ring the arena edge.
  - **4**: light source: brazier, lamp or crystal on a stand, with the flame or glow inside.
  - **5–6**: large theme centrepiece objects (about pillar height, but wider).
  - **7–8**: medium objects (waist height).
  - **9–12**: small clutter (knee height or lower): rubble, bones, books, crystals and so on.

### C) Shared tower pieces `shared_01.png` — 1536×1024, transparent, 4×3 (same rules as B)
1. **Staircase gate up**: a short flight of stone stairs rising into a tall arched gateway filled with swirling violet-white light. Front view, about 20° from above. This is the exit to the next floor.
2. **Boss staircase gate**: the same shape, but heavier, with gold and crimson and a crimson-gold light inside.
3. **Arrival landing**: a small square stone landing with 3 steps going down, plus a faint violet rune ring on top (no letters).
4. **Rest-floor healing shrine**: a round stone fountain with glowing green-teal water and small crystal lotus flowers.
5. **Treasure chest, closed**: dark wood with violet-gold metal and a spirit-crystal lock.
6. **The same chest, open**, with gold and crystal light inside.
7. **Checkpoint obelisk**: a tall slim obelisk with a floating crystal on top (saves progress every 10 floors).
8. **Boss seal altar**: a low round altar platform with chains and a cracked crimson seal on top.
9. **Floor-type icon "clear"**: crossed swords on a round dark badge.
10. **Floor-type icon "survive"**: an hourglass on a round dark badge.
11. **Floor-type icon "hunt"**: a skull with a crown on a round dark badge.
12. **Floor-type icon "rest"**: a campfire with a heart-shaped flame on a round dark badge.

Cells 9–12 are UI icons: make them bold and readable at 40 px, and keep all four badges the same size.

### D) Tower illustration `tower_portrait.png` — 1024×1536 (portrait), opaque background
- One tall, slender **Spirit Tower** rising from a misty ruined valley at night, piercing the clouds up into a starry, cosmic sky. Use this image as the background of the tower entrance screen.
- The tower is split into **10 visible bands from bottom to top**. Each band's windows and trim use the colour of its theme (the theme list below, in order, bottom = theme 1).
- Keep the **middle third of the width** fairly simple, because a progress marker will be drawn over the tower. The tower should stand roughly from 8% to 92% of the image height.
- No text.

## The 10 themes (floors)
| # | Floors | Theme | Colours / motifs |
|---|---|---|---|
| 01 | 1–10 | **Ancient Gate Hall** | weathered grey stone slabs, moss in the cracks, faint violet spirit runes (symbols only), iron torches |
| 02 | 11–20 | **Spirit Library** | dark polished wood planks and inlaid stone, tall bookshelves, floating candles, scrolls, soft blue spirit light |
| 03 | 21–30 | **Frost Crystal Hall** | pale blue ice tiles with frost patterns, frozen columns, ice crystal clusters, snow drifts |
| 04 | 31–40 | **Lava Forge** | black basalt tiles with thin glowing orange lava seams, anvils, chains, crucibles, forge furnace |
| 05 | 41–50 | **Glowing Fungal Grotto** | dark mossy earth with roots, teal and violet glowing mushrooms, hanging vines, pools of faint glow |
| 06 | 51–60 | **Clockwork Chamber** | brass and copper floor plates with gear inlays, gear pillars, pipes with steam valves, pendulums |
| 07 | 61–70 | **Sky Terrace** | white-gold marble with cloud wisps drifting over it, broken sky columns, wind banners (plain cloth, no letters), bird-wing statues (statues only) |
| 08 | 71–80 | **Dragon Bone Crypt** | obsidian floor with fossil bone inlays, giant rib arches, skulls, green ghost-flame braziers |
| 09 | 81–90 | **Star Observatory** | deep navy tiles with gold constellation lines and stars, brass astrolabes, telescopes, floating crystal orbs |
| 10 | 91–100 | **Void Throne** | black-violet void floor with floating cracked shards, pink-gold cosmic veins, broken throne pieces, floating crystal spires |

## Deliverables (22 files)
`floor_01.png … floor_10.png`, `props_01.png … props_10.png`, `shared_01.png`, `tower_portrait.png`

Use these file names exactly. If you can only do part of it, deliver them **in this order**: `floor_01–10` → `shared_01` → `props_01–10` → `tower_portrait`. Zip the files and send them back.
