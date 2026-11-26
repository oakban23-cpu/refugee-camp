# REFUGEE — Guild House makeover (10 images)

You are painting a brand-new art set for the **Guild House** of **REFUGEE (ค่ายผู้อพยพ)**, a fantasy MMORPG played on phones and PC, seen from a **top-down 3/4 view** (camera about 45° above, like classic 2D MMORPGs). Another assistant (Claude) will cut your sheets into pieces and rebuild the whole guild house with them.

A guild house grows with its guild in **5 tiers**. Today all tiers look too similar: one big empty yard with small, scattered buildings (see `refs/current/guild_house_now_tier1..5.jpg`). We want each tier to feel like its own place, dense and lived-in, and the final castle to look **epic**.

| tier | name | mood | materials |
|---|---|---|---|
| 1 | War Camp | scrappy frontier camp | canvas, rope, raw logs, trodden dirt |
| 2 | Timber Fort | proud wooden stronghold | logs, planks, carved beams |
| 3 | Stone Hold | first real stone buildings | grey stone, teal slate roofs |
| 4 | Fortress | military, heavy, tall | dark stone, iron, crenellations |
| 5 | Castle | royal, golden, majestic | pale stone, marble, gold trim, spires |

## Deliver exactly 10 PNG files
| file | size | what |
|---|---|---|
| `gh_01_halls.png` | 1536×1024 | 5 main halls (one per tier) + guild monument (3×2 grid) |
| `gh_02_gates.png` | 1536×1024 | 5 gates (one per tier) + 3 corner towers (4×2 grid) |
| `gh_03_walls_horizontal.png` | 1536×1020 | 5 horizontal wall strips, one per row |
| `gh_04_walls_vertical.png` | 1530×1024 | 5 vertical side-wall strips, one per column |
| `gh_05_facilities.png` | 1536×1024 | 12 buildings (4×3 grid) |
| `gh_06_decor.png` | 1536×1024 | 24 props (6×4 grid) |
| `tex_gh_dirt.png` | 1024×1024 | ground texture: tier 1–2 trodden dirt with grass tufts |
| `tex_gh_planks.png` | 1024×1024 | ground texture: wooden boardwalk planks (tier 2 paths) |
| `tex_gh_cobble.png` | 1024×1024 | ground texture: grey cobblestone court (tier 3–4) |
| `tex_gh_marble.png` | 1024×1024 | ground texture: pale marble flagstones with thin gold seams (tier 5) |

### Rules for the sheets (01, 02, 05, 06)
- Follow `templates/<file>_template.png` exactly. One piece per **blue box**, centred, filling the box well. Never draw the guide lines or labels.
- **Red line = ground line.** The bottom of the building (where it touches the ground) sits **on the red line**. Small soft contact shadow below it is fine; nothing else under the line.
- **Transparent background** (real alpha). If you cannot do transparency, use flat **#FF00FF magenta** everywhere behind the pieces, no gradients or glow on it, never a checkerboard.
- Pieces must not touch each other or the cell edges.
- `FARM_PLOT` is the only flat piece: an empty tilled field **seen from straight above**, no crops (the game draws the crops).

### Rules for the walls (03, 04)
- `gh_03`: 5 rows of 204 px. Each row is **one wall strip that tiles seamlessly left↔right** (the left edge continues perfectly into the right edge). Same 3/4 view as the buildings: we see the top of the wall and its front face. Base on the red line. Plain repeating pattern, **no unique ornament** (no gates, no towers — those are separate pieces).
- `gh_04`: 5 columns of 306 px. The **side walls** (running north–south) **seen from above**: we see the top of the wall (walkway / logs / crenellations) as a band about 100 px wide between the blue lines, with a little of its inner face. Each column **tiles seamlessly top↕bottom**.
- Background outside the wall: transparent (or #FF00FF).

### Rules for the textures
- Full square, **no transparency**, **seamless in all directions**, lit evenly (no strong vignette, no single big shadow). Readable but **calm and low-contrast**, so characters stand out on top of it. Scale: a person is about 48 px tall, so one cobble is ~24–32 px, one plank ~40 px wide.

## Style
- Match `refs/current/existing_guild_hall_sprites.jpg`, `existing_city_buildings.jpg`, `existing_city_props.jpg`, `existing_fort_walls.jpg` (approved art already in the game: same painterly look, line weight and 3/4 angle) and `refs/style/` (approved key art).
- Hand-painted, crisp, rich detail but **bold readable shapes** (pieces are shown at 30–60% size on phones). Light from the **top-left**, soft shadow to the bottom-right.
- **All flags, banners and pennants are painted pure WHITE / very light grey cloth** with normal shading — the game recolours them to each guild's colour. No emblems on them.
- `GUILD_MONUMENT`: the round medallion is a **plain flat white disk** (the game draws the guild emblem there).
- **No text, letters or numbers** anywhere. **No people** (horses in `STABLE` are fine). No UI frames.
- Keep the 5 tiers clearly different in silhouette and material, but one consistent world.

## Size in the game (to keep proportions right)
| piece | width on screen (game px) |
|---|---|
| HALL_T1…T5 | 300 · 330 · 380 · 420 · 480 |
| GUILD_MONUMENT | 140 |
| GATE_T1…T5 | 200 · 220 · 240 · 260 · 300 |
| towers | 110–140 |
| facilities | 160–220 (FARM_PLOT 150) |
| props | 40–110 |
| player character | ~48 px tall |

## Order of priority (if you must send fewer at a time)
1 `gh_01_halls` → 2 `gh_02_gates` → 3 `gh_03_walls_horizontal` → 4 `gh_04_walls_vertical` → 5 `gh_05_facilities` → 6 `gh_06_decor` → textures.

Thank you! Please send the PNGs with the exact file names above.
