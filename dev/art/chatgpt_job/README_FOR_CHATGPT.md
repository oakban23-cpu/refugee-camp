# READ ME FIRST — REFUGEE art job

You are helping upgrade the art of **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG drawn with HTML5 canvas.
Many map objects are still simple vector drawings. They are being replaced, map by map, with hand-painted sprites.
A different assistant (Claude) will cut your sprite sheets and put them into the game, so the **format below must be followed exactly**.

## What is in this zip
- `game/index.html` — the whole game (source, with comments). Every object has a renderer like ` pbhut(t,T){ … }`.
- `game/hd-*.webp` — sprites that are ALREADY upgraded (camp, harbor, market, Deep Root City, Karn mine). Match this style.
- `style_reference/*.png` — the original sheets you made before (camp, harbor, market, root city, mine). **This is the target style.**
- `screenshots/mapNN_*.jpg` — how each target map looks in the game right now.
- `ART_MANIFEST.md` + `sheets.json` — the full list of sheets to make, what goes in each cell.

## Style (same as style_reference)
Hand-painted game asset, clean dark outlines, warm light, slight top-down view (camera about 20° above), front-facing,
soft glow only where the object glows in the game (lamps, crystals, fire, magic). Colours should follow the map's palette in the screenshot.
No people, no animals unless the object is a statue, **no text or letters anywhere**, no ground plane, no cast shadows (the game adds shadows).

## Sheet format (very important)
- ONE PNG per sheet, **transparent background**, landscape 3:2 (e.g. 1536×1024).
- **4 columns × 3 rows**. Cell order: 1–4 top row left→right, 5–8 middle row, 9–12 bottom row.
- Each object centred in its own cell, fully inside the cell, with clear empty space around it. Nothing touches or overlaps.
- Put object N from the manifest in cell N. Unused cells stay empty.
- File name exactly as in the manifest, e.g. `sheet_07.png`.

## How to work
1. Read `ART_MANIFEST.md`. For each sheet, look up every key in `game/index.html` (search ` key(t,T){`) and the screenshot, and write a one-line visual description of each object.
2. Generate the sheet with those descriptions, following the format above.
3. Check it: 12 cells in the right order, transparent background, no text, nothing overlapping. Regenerate if not.
4. Do the next sheet. Work in manifest order (city / story maps first, field-map trees last).
5. When finished (or after each batch), give the user: the PNG files + a short list `sheet_XX.png: cell 1 = key …` if you changed anything from the manifest.

Do not edit the game code. Only produce images.
