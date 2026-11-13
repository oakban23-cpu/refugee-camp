# REFUGEE — Private tent interior: furniture & decorations (hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones. Another assistant (Claude) will cut the sheets automatically, so **please follow the format exactly**.

Every player owns a **private tent** in the refugee camp. Inside, they buy and place furniture (bed, rug, lamps, table, plants, wall decor, fireplace, ceiling light) in fixed slots. Friends can visit. Everything **outside** the tent (camp buildings, stalls, trees) is already hand-painted and approved (`good_example/`), but the **tent interior is still flat vector shapes**, so it no longer matches. See `current_tent/`, which shows the same tent with each fabric theme and all furniture tiers, and `current_tent_empty_slots.jpg` (empty tent).

Please repaint **all furniture and decorations** (sheets 01–04) and the **wall fabrics and floors** (sheet 05).

## Style: match `good_example/`
- Match the painting style, outline weight, lighting and detail of the approved camp props (`approved_camp_*.jpg`, `approved_palace_props.jpg`, `approved_root_city_props.jpg`).
- Hand-painted fantasy game art with **painted texture and volume**: wood grain, cloth folds, fur, brass and iron sheen, glass and crystal, embroidery. **Do not use flat vector fills with outlines only.**
- Clean dark outline, warm light from the upper left, self-shading on the right side.
- **Cosy and lived-in**: a warm refugee camp that becomes a real home. Each item comes in tiers (cheap → mid → luxury), so **make the higher tiers clearly richer and more impressive**.
- Furniture standing on the floor is seen from the **front, about 35° from above** (we see a little of the top surfaces), like the camp props. Wall items are seen **straight from the front**. Rugs are painted **flat from directly above** (see sheet 04).

## Sheet format (sheets 01–04)
- **1536×1024, transparent background.** Cells are numbered left to right, top row first.
- Sheets 01–03: **4 columns × 2 rows** (cells 384×512, `templates/template_4x2_cells_384x512.png`).
- Sheet 04: **3 columns × 2 rows** (cells 512×512, `templates/template_3x2_cells_512x512.png`).
- One object per cell, centred. Objects that stand on the floor rest at the **bottom of the cell** (on the red line in the template). **Paint each object large**, filling about 85% of the cell, and do not touch the cell edges.
- **No floor, no cast shadow, no glow halo outside the object, no text, letters or numbers.** Light belongs **inside** the object (flames, glowing crystals); the game adds glow itself. Keep the alpha clean.
- Empty cells stay fully transparent.

## The items

**tent_01.png (4×2): big furniture**
1. **Straw bed**: a simple low wooden frame with a straw mattress, a rough linen sheet, a patched blanket and a small pillow. Humble but clean.
2. **Feather bed**: a sturdy carved wooden bed with a thick white feather mattress, a deep blue quilted blanket with stitched patterns and two fluffy pillows.
3. **Royal bed**: a grand bed with a gold-trimmed headboard and footboard, crimson velvet blankets with gold embroidery, silk pillows and a small canopy with drapes.
4. **Wardrobe** (fixed furniture, every tent has it): a tall wooden wardrobe with two doors, brass handles and a carved top. One door is slightly open, showing hanging clothes inside.
5. **Wooden tea table**: a small low wooden table with a clay teapot, two cups and a little plate of snacks.
6. **Alchemy table**: a dark violet-stained wooden table with three glowing potion flasks (green, pink, orange), an open notebook, a small brass scale and a mortar.
7. **Iron charcoal stove**: a squat black iron stove with a short chimney pipe, a glowing charcoal opening and a cooking pot on top.
8. **Stone fireplace**: a wide fireplace of cream stone blocks with a mantel holding two candles, a burning log fire inside and an iron cooking pot hanging over it.

**tent_02.png (4×2): lights and plants**
1. **Oil lantern**: a rustic iron oil lantern hanging from a short wooden post with a hook, with a warm yellow flame inside the glass.
2. **Red paper lanterns**: a pair of round red paper lanterns with gold tassels, hanging one above the other from a short lacquered pole.
3. **Glowing crystal lamp**: a cluster of pale-blue glowing crystals set in a silver-and-brass stand.
4. **Herb pot**: a small clay pot with fresh green herbs and a little wooden label stick (blank).
5. **Bonsai**: a beautiful bonsai tree in a glazed ceramic pot, on a small wooden stand.
6. **Glowing mushrooms**: a pot of teal and violet glowing mushrooms with tiny sparkles, in a mossy stone planter.
7. **Hanging string-light ring**: a rustic wooden ring hung from the ceiling by three ropes, with a string of small warm lights draped around it and a few dried flowers. (It hangs from the top of the cell.)
8. **Crystal chandelier**: an elegant gold chandelier with crystal drops and lit candles. (It hangs from the top of the cell.)

**tent_03.png (4×2): wall decor and fixed pieces**
1. **Camp banner** (wall): a red cloth banner hanging from a wooden rod, with a gold border and a simple **tent emblem** (no letters).
2. **Valley painting** (wall): a gold-framed painting of a mountain valley at sunrise with a river.
3. **Crest of honour** (wall): a blue-and-gold heraldic shield with a star emblem, mounted over two crossed silver swords.
4. **Equipment pedestal** (fixed): a small display pedestal of grey stone with an iron top rim and a red velvet cushion on top, empty (the game shows the player's best item floating above it).
5. **Guestbook lectern** (fixed): a small wooden lectern holding an open guestbook with a white quill pen.
6. **Fish display case** (fixed, wall): a wooden frame with six small glass-front compartments (3 columns × 2 rows), all **empty** with a blue water-like backing (the game draws the fish inside).
7. **Trophy wall shelf** (fixed, wall): a two-tier wooden wall shelf with small carved brackets, **empty**.
8. *(empty)*

**tent_04.png (3×2): rugs, painted flat from directly above**
Paint each rug as a **perfect flat top-down view** (as if photographed from directly above), filling the cell. The game squashes it into perspective itself.
1. **Woven patterned rug**: a round hand-woven rug in warm earthy colours (rust, cream, brown) with a diamond medallion and a border pattern.
2. **Fur rug**: a soft shaggy oval rug of thick cream and light-brown fur.
3. **Royal gold rug**: a round crimson rug with rich gold embroidery, an ornate medallion and a tassel fringe.
4–6. *(empty)*

## tent_05.png: wall fabrics and floors (texture swatches)
**4 columns × 2 rows, cells 384×512.** These are **not objects**: each cell is a **texture swatch that fills the whole cell edge to edge** (no transparency, no outline, no border). The game stretches each swatch over the tent wall or floor and adds its own lighting, so paint them **evenly lit, flat-on, and fairly calm**, with no big highlight or vignette.
- **Top row: tent wall fabrics** (vertical folds or stripes running top to bottom):
  1. **Default canvas**: worn beige-brown tent canvas with gentle vertical folds and a few patches and stitches.
  2. **Red stripe**: red-and-cream vertical striped circus-style canvas.
  3. **Night silk**: deep navy silk with tiny embroidered gold stars.
  4. **Palace damask**: crimson damask with a repeating gold pattern.
- **Bottom row: floors** (seen from directly above, planks running left to right):
  5. **Plain wooden planks**: warm brown worn planks.
  6. **Light planks with a woven mat feel**: honey-coloured planks.
  7. **Dark polished wood**: deep brown, glossy planks.
  8. **Inlaid parquet**: dark red-brown parquet with thin gold inlay lines.

---

## Checklist before sending
- **5 sheets**: `tent_01.png … tent_05.png`, each **1536×1024**.
- Sheets 01–04 have a **transparent background**, one object per cell, standing items resting at the cell bottom, with no shadow or floor.
- Sheet 05 cells are **full-cell texture swatches** with no transparency.
- No text, letters or numbers anywhere. Cheap/mid/luxury tiers are clearly different.
- Painted with texture and volume, matching the approved camp props.

Deliver `tent_01.png … tent_05.png` with these file names, zipped. If you can only do part of it, do them **in order**.
