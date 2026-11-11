# REFUGEE: skill icons, painted redo (60 icons)

You are painting game UI art for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy browser RPG played mostly on phones. Another assistant (Claude) will cut your sheets automatically and put the icons into the game, so **please follow the format exactly**.

Right now every skill icon is a simple flat vector drawing (see `reference_current_icons/`). We want **rich hand-painted MMORPG skill icons** instead. Each new icon must keep the **same idea** as the old one, which is listed below for every cell.

## Style
- Hand-painted fantasy MMORPG skill icon, in the style of premium mobile RPGs: painted light and volume, glow, magic particles, and a strong focal shape.
- **Full-bleed square painting.** Every cell is one complete icon that fills the whole 256×256 cell, with its own dark atmospheric background (no transparency). **Do not paint any frame, border, rounded corner or bevel.** The game adds the frame, the class-coloured border and the cooldown overlay itself.
- **Readable at 40 px.** Use one big bold central shape with strong light/dark contrast and the brightest point near the centre. Avoid fine detail that turns to mush when small. Before finishing, imagine each icon shrunk to the size of a fingertip.
- Each class has its own colour family (see below), so a player can tell the class at a glance. Within one class, every icon must have a **different silhouette**.
- **No text, letters, numbers or real-looking writing.** Geometric sigils are fine.
- No realistic people or faces. Stylised silhouettes of summoned creatures are fine where the skill needs them (imps, golem, demon king, shadow clone).
- Keep it non-gory: no blood splatter or gore. "Blood" skills read as crimson energy.
- See `style_reference/` for the painting quality and palette of the game world.

## Upgraded versions
Cells marked **ULTIMATE** are big skills: make them more dramatic than normal skills.
Cells marked **AWAKENED** are the top-tier upgraded ultimates. They should look like **a grander, golden/radiant evolution** of that class's ultimate, with more glow and ornament, still readable.

## Sheet format
- **3 sheets** `skills_01.png`, `skills_02.png`, `skills_03.png`, each **1536×1024**.
- A grid of **6 columns × 4 rows**, with cells exactly **256×256** and no gaps or gutters. `templates/` shows the grid.
- The **top two rows are the first class** and the **bottom two rows are the second class**. Cells are numbered 1–6 on the class's first row and 7–12 on its second row, left to right.
- Sheet 3 has only one class (top two rows). Leave its bottom two rows **plain black**.
- Paint each icon so that its important content stays within the central ~85% of the cell, so nothing important touches the cell edge (the game frame covers the edge slightly).

## skills_01.png
**Top two rows: Warrior** (colour family: crimson red, steel, gold accents)
1. a sword sweeping in a full red circle around itself, spinning slash trail
2. a forward dash: one sword thrust with speed lines and a straight slash streak
3. a greatsword slammed into the ground, the earth splitting in a long glowing crack ahead (ULTIMATE)
4. a demonic red rage aura: a burning horned helm or clenched fist wreathed in crimson flame
5. a roaring war cry: shock rings bursting outward from a shield-and-sword emblem, blood-red
6. six spectral blood-red swords orbiting in a ring, points outward
7. a golden dome shield with light reflecting off it, deflecting strikes
8. a split in the earth burning with blood-red fire, a sword stabbed at its head (ULTIMATE, 2nd class "Blood Demon King")
9. a war banner planted in the ground with a golden protective circle and shock rings (ULTIMATE, branch class "Iron Bastion Warlord")
10. a tower shield bashing forward with a fan-shaped stun shockwave and dizzy stars
11. AWAKENED: a colossal holy sword falling from the sky, a cross-shaped crack and three shock rings below; more gold and radiance
12. AWAKENED: a giant golden divine shield slamming the ground, radiant wings of light behind it

**Bottom two rows: Ranger** (colour family: forest green, mint, moonlight silver, storm teal)
1. a rain of arrows falling into a circle from above
2. a backflip leap away: curved jump arc with a small bow and wind trail, no damage
3. one blazing arrow piercing in a straight beam of light (ULTIMATE)
4. an arrow pinning a dark shadow to the ground, shadow chains around it
5. a crescent-moon trap glowing on the ground, silver-blue
6. five star-tipped arrows curving in homing arcs toward a target
7. a lightning arrow whose bolt jumps in a zigzag chain
8. three moonlight beams fanning outward from a bow, shattered moon fragments (ULTIMATE, 2nd class "Moonslayer Hunter")
9. a dark storm cloud raining lightning bolts (ULTIMATE, branch class "Storm Hunter")
10. a green tornado moving forward with leaves and blades swirling inside
11. AWAKENED: a constellation forming in the night sky raining star arrows, one giant star arrow in the center
12. AWAKENED: a giant divine cyclone crowned with thunderclouds and many lightning strikes

## skills_02.png
**Top two rows: Priest** (colour family: warm gold, white light, dawn orange; violet for curse skills)
1. soft golden healing light: a glowing open hand or chalice with a rising sparkle and a plus-like glow (no letters)
2. a chant buff: an open prayer book or bell radiating golden power rings and an upward arrow-like flame
3. a miracle: an angelic feather wing and a radiant sunburst lifting a fallen soul upward (ULTIMATE)
4. a holy pillar of light striking down from above onto a target
5. a sacred sun circle on the ground with rays, golden-orange
6. a protective halo ring with small shield runes around it, dawn light
7. ghostly purple soul chains binding several dark orbs together
8. eternal dawn: a rising sun with angel wings, everything bathed in gold (ULTIMATE, 2nd class "Patriarch of Dawn")
9. a cursed spirit bell floating in violet mist, draining wisps toward it (ULTIMATE, branch class "Soul-Curse Seer")
10. a cursed seal sigil glowing violet on the ground with spirit flames rising
11. AWAKENED: heaven descending: great angel wings and a column of heavenly light, gold and white, very radiant
12. AWAKENED: underworld judgment: many spectral hands reaching up from a dark violet portal

**Bottom two rows: Assassin** (colour family: violet, black smoke, steel; poison green only for the poison skill)
1. a dagger striking out of a shadow portal, purple afterimage
2. a cloud of green-purple poison mist with a small skull shape in the fumes (stylized, not gory)
3. many shadow afterimage daggers striking from several directions (ULTIMATE)
4. a glowing violet death mark sigil (geometric target seal) on a dark orb
5. a shadow clone silhouette standing beside a dagger, purple smoke
6. three shadow blades fanning out forward, chains of shadow pinning
7. a whirling wheel of floating swords spinning in a circle
8. a solar eclipse: a black sun with a violet corona and shadow blade streaks around it (ULTIMATE, 2nd class "Lord of Death Shadows")
9. a night storm of spinning blades, dark vortex with crescent blades (ULTIMATE, branch class "Blade Dancer")
10. a spinning blade dance: two curved blades in a twirling trail of steel petals
11. AWAKENED: moonless night: total darkness with a giant crescent-moon slash, many tiny warp sparks
12. AWAKENED: a thousand swords falling in a ring and gathering into one huge burst of steel light

## skills_03.png
**Top two rows: Mage** (colour family: sky blue, ice white, fire orange, arcane purple)
1. a blazing fireball exploding, orange-red
2. a frost burst: ice crystals and a cold snowflake-like ring, icy blue
3. meteors falling into a glowing magic circle (ULTIMATE)
4. chain lightning zigzagging between orbs, electric blue-white
5. a rift in time: a glowing purple crack in space with a clock-like geometric dial (no numbers)
6. three lightning orbs orbiting a center
7. small fiery imp silhouettes diving forward, flame trails (stylized, not scary)
8. a frozen-time clock dial with meteors suspended above it (ULTIMATE, 2nd class "Archmage of Time")
9. a hell gate: a stone portal with infernal fire and burning eyes inside (ULTIMATE, branch class "Demon Summoner")
10. a lava golem fist smashing the ground, molten cracks
11. AWAKENED: a black hole with an accretion ring and a supernova flare, cosmic blue and white
12. AWAKENED: a giant demon king silhouette with horns and claws rising from hellfire

**Bottom two rows:** leave black.

## Deliver
Deliver `skills_01.png`, `skills_02.png` and `skills_03.png` with these file names, zipped. If you can only do part of it, deliver them **in order**. If you can only manage one class at a time, that is fine: paint the cells for that class in the correct rows and leave the other rows black.
