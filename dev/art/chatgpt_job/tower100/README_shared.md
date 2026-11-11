# REFUGEE — Spirit Tower shared centre pieces (redo, hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played on phones. Another assistant (Claude) will cut the sheet automatically, so **please follow the format exactly**.

The Spirit Tower has 100 floors. The floors, pillars and edge decorations are all repainted and approved (`good_example/`). The pieces in the **middle of the arena**, which players see on every floor, are still from the first batch: **flat vector shapes with plain outlines and no texture** (`bad_example/current_shared_too_flat.jpg`).

You can see the problem in the game:
- `ingame_rest.jpg`: the flat stair gate and flat fountain stand next to painted pillars.
- `ingame_arrive.jpg`: the flat landing and obelisk.

Please repaint all 12 pieces.

These pieces are **shared by all 10 themes** (grey stone, wood library, ice, lava, fungus, brass, marble, bone, star navy, void), so they must look good on any of them. Use a **neutral ancient tower style**: dark carved stone, aged bronze or gold trim, and **violet-white spirit light**. The boss pieces use **crimson and gold** instead.

## What "good" looks like — match `good_example/`
- `approved_tower_decor_01.png`, `_04.png` and `approved_tower_pillars_01.png` are the objects these pieces stand next to. **Match that painting style, outline weight, lighting and level of detail exactly.**
- Hand-painted fantasy game art with **painted texture and volume**: stone grain, chips, worn edges, metal sheen, glowing carved grooves. **Do not use flat vector fills with outlines only.**
- Clean dark outline, warm light from the upper left, self-shading on the right side, ambient occlusion where parts meet.
- Front view from about 20° above, so we see a little of the top surfaces.
- Pieces 9–12 are small UI badges. Paint them in the style of `approved_badge_style_hud_01.png` (round painted emblem, metal rim, rich colour, readable at 40 px).

## Sheet format
- **1 sheet** `shared_01.png`, **1536×1024, transparent background**.
- **4 columns × 3 rows** (cells are 384×341). Cells are numbered 1–4 on the top row, 5–8 in the middle and 9–12 at the bottom, left to right (see `template_layout.png`).
- One object per cell, centred, resting on its base at the bottom. **Paint each object as large as its cell allows** (about 85% of the cell height or width, whichever is reached first). Leave clear space around it and **do not touch the cell edges**.
- **No ground plane outside the object's own base, no cast shadow, no halo or aura outside the silhouette, no text, letters or numbers, no people or creatures.** Light belongs **inside** the object; the game adds glow and particles itself. Keep the alpha clean, with nothing faint outside the object.

## The 12 pieces
1. **Stair gate up**: the exit to the next floor and the most important piece. A short flight of 3–4 carved stone steps rising into a tall arched stone gateway with bronze trim and carved spirit sigils (geometric, no letters). The arch opening is filled with **swirling violet-white spirit light** (painted inside the arch, opaque enough to read). Make it grand and inviting.
2. **Boss stair gate**: the same gate shape, but heavier and more menacing: dark stone with **crimson and gold** trim, horn-like spikes on the arch, chains at the sides and **crimson-gold swirling light** inside the opening.
3. **Arrival landing**: a low square stone platform with 3 steps going down at the front and a **faint violet rune circle** carved and glowing on its top surface. It is wide and low, not tall.
4. **Rest-floor healing fountain**: a round stone fountain basin with carved rim, **glowing green-teal water**, small crystal lotus flowers floating on it, and a little crystal at the centre spout. Wide and low.
5. **Treasure chest, closed**: dark wood with violet-gold metal bands and a glowing spirit-crystal lock.
6. **The same chest, open**, with gold coins and glowing crystals inside (the light stays inside the chest).
7. **Checkpoint obelisk**: a tall slim carved stone obelisk on a small stepped base, with a **violet crystal floating** just above its tip and glowing sigils down its face. Tall and narrow.
8. **Boss seal altar**: a low round stone altar platform with heavy chains wrapped around it and a **cracked crimson seal disc** on top glowing in its cracks, with gold trim. Wide and low.
9. **Badge "clear the floor"**: crossed swords on a round dark emblem with a metal rim.
10. **Badge "survive"**: an hourglass with glowing sand on a round dark emblem.
11. **Badge "hunt the leader"**: a horned skull with a small crown on a round dark emblem.
12. **Badge "rest"**: a campfire with a heart-shaped flame on a round dark emblem.

Keep badges 9–12 **the same size and the same rim**, each with one bold symbol that reads at 40 px.

Deliver `shared_01.png` with this file name, zipped.
