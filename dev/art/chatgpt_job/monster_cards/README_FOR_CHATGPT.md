# REFUGEE — Monster cards: painted card art + card frames

You are painting **collectible monster cards** for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones. Another assistant (Claude) will cut the sheets and assemble the cards automatically, so **please follow the format exactly**.

Players collect cards dropped by monsters and equip them for bonuses. There are **16 cards**: 13 normal monster cards and 3 golden **MVP** cards from world bosses. Right now each card is a flat vector drawing of the monster on a plain gradient (`refs/current_cards_all.jpg`), which looks cheap next to the rest of the game, where the maps, bosses and story art are all hand-painted.

The game builds each card from **two parts**:
1. **Card art**: a painted illustration of the monster in its home environment (sheets `cards_art_01.png` and `cards_art_02.png`).
2. **Card frame**: an ornate frame with a **transparent window** and an **empty name plate**, where the game writes the Thai name (sheet `cards_frames.png`).

## Style
- Match the game's approved painted art in `refs/style/` and the painted bosses in `refs/monsters/mvp_*_painted_boss.png`: painted anime-fantasy illustration, clean dark outlines on the monster, soft painted volume, dramatic rim light, and rich but not neon colours.
- Make each card look like a **premium trading-card illustration**: the monster is the hero, in a dynamic and characterful pose, with a painted background of its home area, depth (a blurred foreground or background), and atmospheric light (dust, sparks, mist, stars). Monsters must look **appealing and collectible**: cute ones stay cute, scary ones look cool.
- **Keep each monster's design** from `refs/monsters/NN_xxx.png` (shape, colours, signature features) but paint it properly, with more detail and volume.
- **No text, letters, numbers or logos anywhere** in the art or the frames.

---

## Part 1 — Card art: `cards_art_01.png` and `cards_art_02.png`
- Each sheet is **1536×1024, opaque**, in **4 columns × 2 rows** (cells 384×512). Cells are numbered left to right, top row first. See `templates/template_art_sheet_4x2_384x512.png`.
- Each cell is **one full-bleed illustration** that fills the whole cell edge to edge: **no borders, no frame, no gaps** between cells.
- The frame will cover the edges. Keep the monster **inside the green window**, with its head and face in the **upper-middle** (yellow oval).
- The **bottom ~22% of the cell is hidden behind the name plate** (red box). Paint ground or background there, not the monster's face.

**`cards_art_01.png`**
1. **Mummy** (`01_mum`): a shambling bandaged mummy with a **glowing teal eye and aura** leaking through the wrappings, arms reaching forward. Background: torch-lit sandstone tomb corridor in the **Desert of the Pharaoh's Tomb**.
2. **Sand Scorpion** (`02_sco`): an armoured **orange-brown** desert scorpion with a raised stinger and big pincers, sand spraying. Background: golden dunes at sunset with ruined pillars.
3. **Anubis Soldier** (`03_anu`): a tall **jackal-headed guard** in navy and gold Egyptian armour with **glowing gold eyes**, holding a long spear. Background: a dim temple hall with hieroglyph pillars and a gold light shaft.
4. **Sky Crystal Spirit** (`04_shd`): a floating **pink-violet crystal** with a single eye inside, a small halo above and tiny orbiting crystal shards. Background: the **Sky Rift Fields**, with a starry violet sky cracked by glowing rifts and floating rocks.
5. **Rift Wolf** (`05_hnd`): a sleek **dark purple wolf** with **violet crystal spikes** on its back and a **glowing cyan head and eyes**, leaping forward with a violet energy trail. Background: the Sky Rift Fields at night.
6. **Fallen-Star Knight** (`06_knt`): a **silver-armoured knight** with a small halo, a **gold star emblem** on the chest and a navy cape, raising a sword that sparkles like a falling star. Background: a meteor-strewn rift plain with falling stars.
7. **Cloud Spirit** (`08_wcl`): an adorable **fluffy white cloud creature** with a small blushing face and big shiny eyes, floating happily. Background: the **West Wind Bridge**, an old stone bridge high above a sea of clouds in bright daylight.
8. **Ancient Treant** (`09_wtr`): a **giant tree creature** growing out of a **cracked clay pot**, with pink star-shaped flowers in its leafy crown, **glowing green eyes** and long branch arms. Background: the **Abandoned Floating Garden**, overgrown ruins on a floating island.

**`cards_art_02.png`**
1. **Clockwork Turret** (`10_wtu`): a **grandfather-clock body** on three spindly brass legs, with a big clock face, a brass cannon barrel on the side and spinning gears, puffing steam. Background: the **Cloud Clock Tower**, with giant gears and clock faces in the clouds.
2. **Sky Koi** (`11_wko`): a graceful **orange-and-white koi** with tiny star spots and long flowing fins, **swimming through the air** with bubbles. Background: the **Meteor Lake**, a glowing lake under a starry sky with reflections.
3. **Lightning Wolf** (`12_wwf`): a **dark navy wolf** with **pale-blue crystal spikes** on its back and a **glowing yellow head and eyes**, crackling with lightning. Background: the **Crystal Lightning Forest**, with blue crystal trees and lightning in the sky.
4. **Harpy** (`13_whp`): a fierce **harpy** with big **purple wings**, feathered body, talons and a **glowing yellow face**, diving. Background: the **Howling Wind Chasm**, with cliffs and swirling wind streaks.
5. **Storm Temple Knight** (`14_wkn`): a **blue-and-silver armoured knight** with a tall plume, a **lightning-bolt emblem** and a sword crackling with lightning. Background: the ruined **Storm Temple**, with broken columns and storm clouds.
6. **MVP: Azael, the Fallen Angel** (`07_aze`, see `mvp_azael_painted_boss.png`): a towering angel in white and violet robes with **huge radiant wings**, a blindfold, and cracks of violet light across the body, floating with divine power. **Epic, golden-hour, god-ray lighting.**
7. **MVP: Tempest, the Storm Roc** (`15_wtp`, see `mvp_tempest_painted_boss.png`): a colossal **blue storm eagle** with a white chest and wings spread wide, **lightning crackling** around it, above stormy clouds. Epic.
8. **MVP: Immortal Pharaoh Neferrah** (`16_phr`, see `mvp_pharaoh_painted_boss.png`): an undead **pharaoh** in a **gold and turquoise headdress** with golden wings and a staff, and a glowing curse aura, in a golden tomb throne room. Epic.

**MVP art (cells 6–8 of sheet 02)** should feel clearly **more epic** than normal cards: bigger, more dramatic lighting, light rays and particles.

---

## Part 2 — Frames: `cards_frames.png`
**1536×1024**, **4 columns × 2 rows** (cells 384×512). See `templates/template_frames_sheet_4x2_384x512.png`.
- **Cells 1–3 are frames with a transparent background**:
  - The **window** (green box, about x 26–358, y 26–392 in the cell) is **fully transparent**, because the card art shows through it.
  - The **name plate** (yellow box, about x 30–354, y 402–488) is a **plain empty plate** with **no writing**. Keep it fairly dark or calm so white or gold Thai text is readable on it.
  - Everything outside the card shape is transparent too. Corners can be rounded or ornate. The frame border itself should be about **18–26 px** thick around the window.
- **Cell 4 is the card back** (opaque, the whole cell). The game shows it when a card drops and flips on the ground.

1. **Bronze frame** (desert-region cards): **antique bronze and sandstone** with engraved Egyptian-style details, small turquoise gems in the corners, and a warm worn-metal look.
2. **Starlight frame** (sky-region cards): **silver and violet**, with a starry enamel inlay, small crystal gems, and thin glowing star lines.
3. **Gold MVP frame**: a **lavish gold** frame with a **small crown at the top centre**, red and gold gems, filigree, and a subtle radiant glow inside the metal. It must look clearly **rarer and richer** than the other two.
4. **Card back**: a deep navy or burgundy back with a gold ornamental border and, in the centre, the camp emblem (a **tent with a flame** inside a round crest, like the game logo). Symmetrical, with no text.

Cells 5–8 stay empty (transparent).

## Rules
- Keep the alpha clean in the frames: fully transparent window and outside, and crisp edges with no grey haze.
- No text, letters or numbers anywhere.
- Keep the card art cells exactly aligned to the 384×512 grid so they can be cut automatically.

## Checklist before sending
- [ ] `cards_art_01.png` (8 cells) and `cards_art_02.png` (8 cells): 1536×1024, opaque, full-bleed, monster inside the window, face in the upper-middle
- [ ] `cards_frames.png`: 1536×1024 with 3 frames (transparent window, empty name plate) + card back
- [ ] Designs match `refs/monsters/`, the MVP art is clearly more epic, and there is no text anywhere

Deliver the 3 PNG files with these exact names, zipped. If you can only do part of it, do them **in this order**: `cards_frames.png` → `cards_art_02.png` (it holds the MVP cards) → `cards_art_01.png`.
