# REFUGEE — Refugee Camp makeover (15 images)

You are painting new art for the **Refugee Camp (ค่ายผู้อพยพ)**, the home town of **REFUGEE**, a fantasy MMORPG for phones and PC seen from a **top-down 3/4 view** (camera about 45° above). Another assistant (Claude) will cut your sheets and rebuild the camp with them.

The camp buildings, shops and gates are already painted and approved (`refs/current/existing_*`). What still looks plain is everything **around** them (see `refs/current/camp_now_*.jpg`):
- the **ground** (grass, dirt paths, cobble paths, the round stone plaza)
- the **stream, its banks and the ponds**
- the **monster nests** around the camp (today: identical dark holes)
- the **forest** around the camp (`existing_nature_old.jpg` is the old set: some pieces sit on square grass tiles, which we no longer want)
- small **camp life props** and the **fence** around the camp

The mood: a warm, hopeful frontier camp in a green valley, surrounded by forest. Cosy and alive, not grim.

## Deliver exactly 15 PNG files
| file | size | what |
|---|---|---|
| `tex_camp_grass.png` | 1024×1024 | short green grass (main ground) |
| `tex_camp_meadow.png` | 1024×1024 | grass with scattered tiny flowers and clover (meadow patches) |
| `tex_camp_dirt.png` | 1024×1024 | packed light-brown dirt path with small pebbles |
| `tex_camp_cobble.png` | 1024×1024 | warm grey-beige cobblestone path (stones ~24–32 px) |
| `tex_camp_plaza.png` | 1024×1024 | large worn flagstones for the round plaza (stones ~80–120 px) |
| `tex_camp_mud.png` | 1024×1024 | wet stream-bank mud and sand with tiny pebbles |
| `tex_camp_water.png` | 1024×1024 | clear stream water seen from above: soft blue-green, gentle ripples, a few light glints |
| `cp_01_water.png` | 1536×1024 | 12 water pieces (4×3 grid): bridges, dock, reeds, rocks, lily pads, ducks |
| `cp_02_ponds.png` | 1536×1024 | 2 whole ponds seen from above (2×1 grid) |
| `cp_03_nests.png` | 1536×1024 | 8 monster nests (4×2 grid) |
| `cp_04_trees.png` | 1536×1024 | 12 trees (6×2 grid, tall cells) |
| `cp_05_nature.png` | 1536×1024 | 18 small nature pieces (6×3 grid): stump, bushes, rocks, log, roots, flowers, mushrooms |
| `cp_06_props.png` | 1536×1024 | 24 camp-life props (6×4 grid) |
| `cp_07_fence_h.png` | 1536×512 | 2 horizontal fence strips, one per row |
| `cp_08_fence_v.png` | 1024×1024 | the same 2 fences running north–south, one per column |

### Rules for the sheets (cp_01 … cp_06)
- Follow `templates/<file>_template.png` exactly: one piece per **blue box**, centred, filling the box well. Never draw the guide lines or labels.
- **Red line = ground line**: the bottom of the piece (where it touches the ground) sits on the red line. A soft small contact shadow is fine.
- Pieces marked **flat** (no red line: LILY_PADS, STEPPING_STONES, WATER_FLOWERS, the two ponds) are seen **from straight above**.
- **Transparent background** (real alpha). If you cannot, use flat **#FF00FF magenta** behind the pieces: no gradients or glow on it, never a checkerboard.
- **No ground tile under any piece**: no square/diamond grass base. Just the object (a few blades of grass at its foot are fine).
- Pieces must not touch each other or the cell edges.
- Bridges and the dock: draw **only the structure**, no water around it (the game draws the water).
- Ponds: water + bank only, the outside of the bank fades to transparent.

### Rules for the fences (cp_07, cp_08)
- `cp_07`: 2 rows of 256 px. Each row is **one fence strip that tiles seamlessly left↔right**, seen in the same 3/4 view, base on the red line. Plain repeating pattern, no gate.
- `cp_08`: 2 columns of 512 px. The same fences running **north–south seen from above**, staying between the blue lines (~90 px band), **seamless top↕bottom**.

### Rules for the textures
- Full square, **no transparency**, **seamless in all directions** (left edge continues into right, top into bottom).
- Lit evenly, no vignette, no big shadows, **calm and low-contrast** so characters stand out. Scale: a person is ~48 px tall.
- No objects on them (no big rocks, no flowers bigger than a few pixels, no paths crossing).
- Grass, meadow, dirt and mud must **blend well side by side** (similar brightness), the game mixes them with soft edges.

## Style
- Match the approved art in `refs/style/` — especially `approved_guild_props.jpg`, `approved_guild_buildings.jpg`, `approved_guild_house_tier*.jpg` and `approved_ground_textures.jpg` (that is the exact look we want) — and the existing camp buildings in `refs/current/existing_*_buildings.jpg`.
- Hand-painted, crisp, rich detail but **bold readable shapes** (pieces show at 30–60% size on phones). Light from the **top-left**, soft shadow to the bottom-right.
- `BANNER_CAMP`: the banner cloth is **pure WHITE** (the game recolours it). No emblems.
- **No text, letters or numbers** anywhere (signpost boards are blank). No people. Animals only where listed.
- Monster nests: a bit spooky but still readable and colourful, each one clearly different in silhouette.

## Size in the game (to keep proportions right)
| piece | width on screen (game px) |
|---|---|
| big trees (OAK_BIG, WILLOW) | 160–200 |
| trees | 110–150 |
| bushes, rocks, logs, stumps | 40–90 |
| flower clumps, mushrooms | 30–50 |
| bridges | 150–190 · dock 110 |
| reeds, bank rocks | 40–70 |
| nests | 120–160 |
| props | 30–90 (animals 24–40) |
| ponds | 260–420 |
| player character | ~48 px tall |

## Order of priority (if you must send fewer at a time)
1 the 7 textures → 2 `cp_04_trees` → 3 `cp_05_nature` → 4 `cp_01_water` → 5 `cp_02_ponds` → 6 `cp_03_nests` → 7 `cp_06_props` → 8 `cp_07_fence_h` → 9 `cp_08_fence_v`.

Thank you! Please send the PNGs with the exact file names above.
