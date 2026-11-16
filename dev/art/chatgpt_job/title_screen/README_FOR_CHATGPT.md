# REFUGEE — Title screen upgrade: painted logo + layered key art (parallax)

You are painting the **title screen** for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones in both landscape and portrait. Another assistant (Claude) will put the images into the game automatically, so **please follow the format exactly**.

The title screen already has a painted cover (`refs/current_cover_landscape_1536x1024.jpg` and `refs/current_cover_portrait_720x1279.jpg`; see how it looks in the game in `refs/current_title_screen_*_in_game.jpg`). Two things are missing:
1. The **logo** is only a plain font (`refs/current_logo_plain_font.jpg`).
2. The cover is a single flat picture. We want to **split it into 3 depth layers** so the game can move them slightly at different speeds (parallax), with the sky farthest, the camp in the middle and the heroes closest. This gives an "HD-2D" diorama feeling.

**Repaint the same scene and the same 5 heroes as the current cover**, keeping their designs, colours and mood, but as separate layers.

## Style
- Match the current cover and `refs/approved_*` exactly: painted anime-fantasy key art, rich warm firelight against a cool dusk or night sky, glowing lanterns, clean dark outlines on characters, and soft painted volume.
- The 5 heroes are the game's 5 classes. Keep their designs from the current cover:
  - **red-haired knight** in dark armour and a torn red cape, with a big sword (front, centre)
  - **green-hooded archer** with a bow
  - **golden priestess** with a halo and a sun staff
  - **blue star-witch** with a big hat and a staff
  - **masked purple assassin** with an orange scarf and daggers
  - a **glowing blue spirit deer** behind them
- **No text anywhere** in the layers. Only the logo image contains letters.

## Files to deliver (7 PNG files)

### 1) `logo.png`: **1536×1024, transparent background**
- The word **REFUGEE** in big, heavy **engraved gold capital letters** (a classic fantasy serif like the current font, but now **painted**). Give the letters bevelled metal with a bright top edge, darker gold at the bottom, small scratches and a warm glow.
- A small **emblem** is built into the logo: a **tent with a flame** inside a round crest (the refugee camp), sitting **behind or above the middle of the word**, with crossed sword and staff behind it. A short ribbon or a thin ornamental line under the word is optional, but **leave the ribbon empty with no writing on it**.
- Spell it exactly **R-E-F-U-G-E-E**. Add **no other text**. The Thai subtitle stays as game text.
- Centre the logo with about **10% empty margin on every side**. No background, no frame, and no big glow halo spreading to the edges. Keep the alpha clean.

### 2) Landscape layers: **1536×1024 each**
Follow `templates/template_landscape_1536x1024.png`. Phones only show the **yellow band** (rows ~163–861), so keep important things inside it. **The left area is reserved for the logo and the "tap to start" button**: keep it calmer and darker (dusk sky, camp in shadow) with **no heroes there**.
- `land_1_sky.png` (**opaque**, no transparency): **only the far background**. Dusk sky with glowing orange clouds, distant floating ruins and waterfalls on the left, misty mountains, and the giant ancient winged statue and glowing rune monolith on the right. **No camp, no people.** Paint the sky and mountains **all the way down to the bottom**, because the camp layer will cover the lower part.
- `land_2_camp.png` (**transparent background**): **only the camp**. Wooden palisade gates with blue banners, rows of tents, string lanterns, the big **bonfire** in the middle, two armoured guards and small villagers around the fire. Everything **above the palisade and tents is transparent** (the sky shows through). The ground must reach the **bottom edge**.
- `land_3_heroes.png` (**transparent background**): **only the 5 heroes and the spirit deer**, grouped on the **right side** (blue box in the template), in dynamic poses facing slightly left, cut off by the bottom edge. Add a few foreground grass tufts or embers at the bottom if you like. **Everything else is transparent**, so no ground strip and no background.

### 3) Portrait layers: **1024×1536 each**
Follow `templates/template_portrait_1024x1536.png`. The **logo goes at the top** and the **button at the bottom**, so keep the top sky and the very bottom calmer.
- `port_1_sky.png` (**opaque**): same far background, composed vertically (floating ruins left, statue and monolith right), painted down to the bottom.
- `port_2_camp.png` (**transparent**): the same camp, seen from the gate looking in, with the bonfire in the centre. Transparent above the tents. Ground to the bottom edge.
- `port_3_heroes.png` (**transparent**): the same 5 heroes and the deer, grouped in the **lower middle** (blue box), knight in front, cut off by the bottom edge.

## Rules for the layers
- **Same lighting and colours across all 3 layers**, so they fit back together into one picture. Put them on top of each other in your head (sky → camp → heroes) and they must look like the current cover.
- Transparent layers need **clean alpha**: fully transparent background (no grey or white haze), crisp edges and no leftover fringe. Glows that belong to an object (the fire, lanterns, staff light, the deer's glow) are fine but should stay close to the object.
- No text, watermark, frame or UI.

## Checklist before sending
- [ ] `logo.png` (1536×1024, transparent): spelled exactly REFUGEE, with the emblem and margin
- [ ] `land_1_sky.png` (opaque) · `land_2_camp.png` (transparent) · `land_3_heroes.png` (transparent): 1536×1024
- [ ] `port_1_sky.png` (opaque) · `port_2_camp.png` (transparent) · `port_3_heroes.png` (transparent): 1024×1536
- [ ] Heroes match the current cover, nothing important sits in the logo or button area, and the important content in landscape stays inside the yellow band

Deliver the 7 PNG files with these exact names, zipped. If you can only do part of it, do them **in this order**: logo → landscape 3 → portrait 3.
