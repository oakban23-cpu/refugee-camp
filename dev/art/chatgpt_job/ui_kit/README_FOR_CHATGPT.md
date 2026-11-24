# REFUGEE — Painted game UI kit (4 sheets)

You are painting the **user interface skin** for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones (portrait and landscape) and PC. Another assistant (Claude) will cut your sheets into pieces and build every window, button and HUD element in the game out of them.

Today the UI is clean but plain: flat dark panels, thin gold lines, simple gold pill buttons (see `refs/current_ui/`). Everything else in the game is now **painted art** (bosses, story illustrations, cards, icons, title screen). Please make the UI look like it belongs to the same painted fantasy world: **a premium mobile MMORPG UI**.

## Deliver exactly 4 PNG files
| file | what |
|---|---|
| `ui_01_windows.png` | window frame, window texture, panels, tabs, small parts (12 pieces) |
| `ui_02_buttons.png` | 8 button styles |
| `ui_03_hud.png` | on-screen HUD parts (12 pieces) |
| `ui_04_dialog.png` | dialogue box, name plate, portrait frame, arrow, notification frame |

- **Size 1536×1024 landscape** for every sheet (3:2).
- **Transparent background** (real alpha). If you truly cannot make transparency, use a **flat solid #FF00FF magenta** background, the same colour everywhere, with no glow or gradient on it. Never use a checkerboard pattern.
- **Follow the templates exactly**: `templates/ui_0X_..._template.png`. Each blue box is where one piece goes. Keep every piece **inside its blue box** and **centred** in it, at roughly the box's size. Do not draw the blue/red guide lines, the grey cell lines or the labels.
- Leave clear empty space between pieces. Pieces must not touch each other.

## Style
- Match `refs/style/` (approved art of this game): `approved_card_frame_gold.jpg`, `approved_card_frame_purple.jpg`, `approved_card_back.jpg`, `game_logo.jpg`, `approved_title_screen.jpg`, `approved_ui_icons.jpg`.
- **Materials**: antique **gold and bronze filigree**, engraved metal, small gems (amber, sapphire), over **dark plum-brown / deep navy** leather or lacquered wood. Light comes from the **top-left**. Crisp, sharp, hand-painted detail, readable at small size.
- **Palette**: gold `#e7b75a` / light gold `#f3d08a`, dark base `#140f19` / `#1d1626`, accents ember red `#e0645a`, leaf green `#78c67c`, star violet `#9b7be0`.
- **One consistent set**: same gold, same engraving style, same corner motif on all 4 sheets. A good motif: a small **sun / star sigil** (the game's symbol) in corners and on the header.
- **No text, letters, numbers or symbols that read as words** anywhere (the game draws its own Thai text on top). The only allowed marks: the X shape on the close button, the down arrow, the compass ticks and a north diamond.
- No characters, no people, no monsters. No drop shadows outside the piece bigger than ~10 px.

### What we do NOT want (we got this before and could not use it)
- Flat vector shapes with plain colour fills and no painted detail.
- Thick plastic or glossy "3D bevel" buttons like a generic app.
- Pieces that bleed outside their box, touch other pieces, or have text inside them.

## How the pieces are used (please respect this or they will look broken)
Many pieces are **stretched by the game** with "9-slice". In the templates, **red lines** show the cut lines.
- **Corners** (outside the red lines) are drawn as-is: **put all ornaments inside the corner zones**.
- **Edges** between the red lines get **stretched or repeated**, so they must be **a plain, uniform molding** (straight lines, a simple repeated bead or rope pattern). **No unique ornament in the middle of an edge.**
- For pieces marked **"centre empty"** the area inside the border must be **fully transparent** (the game puts content there).
- Pieces with only **two vertical red lines** (buttons, tabs, bars, chips, name plate) stretch **left-right only**: decorate the two **end caps**, keep the middle section uniform.
- **"seamless"** pieces are tiled: the left edge must continue perfectly into the right edge (and top into bottom for `WINDOW_BG`).
- Round pieces with a **hole** (avatar ring, skill rings, minimap ring, portrait frame, icon socket): the hole must be **fully transparent** and perfectly round (square for the portrait frame).

---

## Sheet 1 · `ui_01_windows.png` (grid 4×3, numbered left→right, top→bottom)
1. **WINDOW_FRAME**: the main window border used for every menu (equipment, shop, quests…). Thick ornate border, **gold filigree corners with the sun sigil**, plain straight molding on the edges, **centre empty**.
2. **WINDOW_BG**: seamless **dark** texture behind window content: deep plum-brown leather or dark lacquered wood with a very faint gold dust / star pattern. **Very low contrast and dark** (white text must read on it). Fill the whole cell, seamless in all directions.
3. **PANEL_FRAME**: a thinner border for sub-panels inside windows. Subtle bronze line, small corner tips. Centre empty.
4. **HEADER_ORNAMENT**: horizontal flourish placed under a window title: symmetric gold scrollwork with a small gem in the middle.
5. **CLOSE_BUTTON**: round button, gold rim, dark ember-red centre with an engraved **X** shape.
6. **ICON_SOCKET**: round gold socket ring that holds a window's emblem icon. Hole in the middle empty.
7. **TAB_ACTIVE**: selected tab, a **glowing gold plaque** with decorated end caps.
8. **TAB_IDLE**: the same tab shape, **dark** with a faint gold rim (not selected).
9. **DIVIDER_LINE**: thin gold line that fades out at both ends, tiny diamond in the middle.
10. **CORNER_ORNAMENT**: one **top-left** corner flourish only (the game mirrors it to other corners).
11. **CHIP_FRAME**: small pill label frame (used for "gold 14.8K", "bag 0/120"): dark glass inside, thin gold edge.
12. **ITEM_SLOT**: square inventory slot: bronze rim, dark inset bottom, subtle inner shadow. The centre stays dark (the item icon goes on top).

## Sheet 2 · `ui_02_buttons.png` (grid 2×4)
Eight buttons, **same shape**: a horizontal plaque with **decorated end caps** (small sun sigil or gem on each end), **uniform middle**, **no text**.
1. **BTN_PRIMARY**: warm **gold**, main action (Buy, Confirm, Navigate). 2. **BTN_PRIMARY_DOWN**: the same, **pressed**: a bit darker, slightly inset, no outer glow.
3. **BTN_SECONDARY**: **dark bronze / leather** with a gold rim. 4. **BTN_SECONDARY_DOWN**: pressed.
5. **BTN_DANGER**: **crimson** with gold rim (delete, leave). 6. **BTN_CONFIRM**: **emerald** with gold rim.
7. **BTN_SPECIAL**: **violet arcane** with silver-gold rim and faint star sparkles (premium / event).
8. **BTN_DISABLED**: grey weathered stone, desaturated, no glow.
The middle part of all buttons must be **dark or mid-tone enough that white or dark text reads clearly** (gold button: text will be dark brown; others: text will be white).

## Sheet 3 · `ui_03_hud.png` (grid 4×3)
These sit **over the game world** all the time, so keep them **compact and elegant, not heavy**.
1. **AVATAR_RING**: round portrait ring for the player's face (top-left of screen). Gold ring with sun sigil at the top and a small empty plate at the bottom (for the level number). Big round **transparent hole**.
2. **BAR_FRAME**: holder for the HP/MP bars: slim dark trough with gold end caps. **Hollow inside** (transparent).
3. **BAR_FILL_HP**: glossy **crimson** liquid strip, highlight along the top, seamless left-right.
4. **BAR_FILL_MP**: the same in **sapphire blue**.
5. **BAR_FILL_EXP**: the same in **gold**.
6. **SKILL_RING**: round frame around a skill button (skill icon goes in the transparent hole). Bronze-gold.
7. **SKILL_RING_ULT**: frame for the ultimate skill: larger, more ornate, **fiery gold** with ember accents. Transparent hole.
8. **ROUND_BUTTON**: round menu button: dark centre disc (an icon goes on top), gold rim.
9. **MINIMAP_RING**: round minimap ring with compass tick marks and a small **north diamond** at the top. Transparent hole.
10. **JOY_BASE**: virtual joystick base: **translucent** dark ring with 4 small direction notches.
11. **JOY_KNOB**: joystick knob: polished bronze-gold sphere with a sun sigil.
12. **TRACKER_FRAME**: small panel border for the quest tracker (top-left): parchment-scroll style corners, plain edges, centre empty.

## Sheet 4 · `ui_04_dialog.png` (see template)
1. **DIALOG_FRAME** (top, wide): the story dialogue box border, the most visible frame in the game. Rich gold filigree corners with the sun sigil, plain molding edges, **centre empty**.
2. **NAME_PLATE**: plaque for the speaker's name: gold with decorated end caps, dark middle for white text.
3. **PORTRAIT_FRAME**: square ornate frame for a character portrait. **Square transparent hole.**
4. **NEXT_ARROW**: small glowing amber gem shaped like an arrow pointing **down** ("tap to continue").
5. **TOAST_FRAME**: small notification frame (rewards, alerts): dark glass, gold corners, centre empty.

## Reference folders
- `refs/style/`: approved art of the game. **Match this quality and palette.**
- `refs/current_ui/`: the current UI (portrait + landscape). Shows where each piece is used and how small it appears on a phone.
- `templates/`: the exact layout of each sheet.

Thank you! Please send the 4 PNGs with the exact file names above.
