# REFUGEE — Class selection screen: painted campfire scene + 5 class heroes

You are painting art for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones. Another assistant (Claude) will put the images into the game automatically, so **please follow the format exactly**.

After the title screen, new players see the **class selection screen** (`refs/current_class_select_screen.jpg`): the 5 classes gather around a campfire at night, the player taps one to choose it, and the 5 class cards sit underneath. The title screen is already painted (`refs/all_5_heroes_title_art.jpg`, `refs/approved_style_camp_night.jpg`), but this screen is still simple vector art (flat trees, flat moon, small chibi figures), so it no longer matches.

Please paint **6 images**: 1 campfire scene and 5 class heroes.

## Style
- Match the title key art **exactly**: painted anime-fantasy illustration, clean dark outlines, soft painted volume, warm firelight against a cool night, rich colours.
- **Keep the same 5 hero designs** as the title art. Crops of each hero are in `refs/hero_N_..._from_title_art.jpg`. Same faces, hair, outfits, colours and weapons.
- **No text, letters, numbers, logos or UI** anywhere.

---

## 1) `scene.png`: **1536×1024, opaque**
A **night forest clearing with a campfire** where the heroes rest before their journey. Follow `templates/template_scene_1536x1024.png`:
- The **burning campfire** sits in the centre-bottom (orange ellipse), surrounded by a ring of stones, with a few **logs and flat stones to sit on** around it.
- Around the fire there is **open, flat ground** (green box), because the game places the heroes there. Keep it clear of big objects.
- Behind: tall dark pine trees, a **big pale moon** in the starry sky, faint mountains, fireflies and a few drifting embers. Optionally show the refugee camp's tents and lanterns far in the background through the trees.
- Lighting: warm orange light from the fire on the ground and logs, fading into cool blue night at the edges.
- Phones only show the **middle part** (yellow box, x 346–1190), so keep the fire, the seating ring and the moon inside it. The sides can be just trees.
- **No people, no characters, no animals** (the game adds the heroes).

## 2) Five heroes: **`hero_melee.png`, `hero_archer.png`, `hero_mage.png`, `hero_assassin.png`, `hero_priestess.png`**
Each one is a **separate image, 1024×1536, transparent background**, following `templates/template_character_1024x1536.png`:
- **One full-body character**, standing in a confident heroic idle pose, turned slightly to the side (3/4 view), facing the viewer. Show the whole body from head to feet, with the weapon fully visible.
- **Feet on the red line** (about y 1446) with empty margin below. Keep the whole character **inside the blue box**, with about 9% empty margin on every side. **Do not let anything touch or cross the image edges.**
- **Transparent background with clean alpha**: no ground, no shadow, no floor, no glow halo spreading far, no background. A glow that belongs to the weapon or halo is fine but should stay close to it.
- All 5 the **same scale** (similar head size), so they look right side by side.

1. **`hero_melee.png` — Berserk Demon Blade (ดาบอสูรคลั่ง):** the **red-haired warrior** in dark spiked plate armour with a **torn crimson cape**, holding a **huge sword glowing with red demonic cracks**. Fierce, fearless grin.
2. **`hero_archer.png` — Night Shadow Hunter (พรานเงาราตรี):** the **green-hooded archer** with blond hair, a ragged green cloak, leather armour, an ornate **golden longbow** and a quiver of arrows. Calm, focused eyes.
3. **`hero_mage.png` — Arcane Sorcerer (จอมเวทอาคม):** the **star-witch** with lavender hair, a big **navy witch hat with stars**, a starry blue robe and a staff topped with a **glowing blue crystal**. Gentle, confident smile.
4. **`hero_assassin.png` — Shadow Assassin (เงาลอบสังหาร):** the **masked assassin** with messy purple hair, a black face mask, an **orange scarf** fluttering, dark purple-black armour and **twin daggers**. Low, ready stance.
5. **`hero_priestess.png` — Soul-soothing Chanter (นักสวดปลอบวิญญาณ):** the **golden priestess** with long wavy blonde hair, a **halo**, white and gold robes, holding a **golden sun staff** that glows warm. Kind, serene expression.

---

## Checklist before sending
- [ ] `scene.png`: 1536×1024 opaque, campfire centred, open ground around it, no characters, nothing important outside the middle part
- [ ] 5 hero PNGs, 1024×1536 each, transparent and clean: one full-body hero each, feet on the line, nothing touching the edges, all the same scale
- [ ] Designs match the title art, and there is no text anywhere

Deliver the 6 PNG files with these exact names, zipped. If you can only do part of it, do them **in this order**: the 5 heroes, then `scene.png`.
