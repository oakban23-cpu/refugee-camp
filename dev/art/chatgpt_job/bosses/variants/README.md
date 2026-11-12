# REFUGEE — Boss variant poses and damage states (24 images)

You already painted the 49 bosses for **REFUGEE**, and they are in the game now. Thank you, they look great! Some bosses change their look during the fight: armor cracks when HP is low, they change form, or they strike a telegraph pose before a big attack. Please paint **those alternate versions of the same bosses**. Claude will cut them automatically and swap them in during the fight.

## The most important rule: same boss, same size, same spot
- `base_cells/var_NN_base.png` shows **your own approved painting** of the boss for every cell of sheet `var_NN`, with exactly the same cell size and position.
- **Start from that painting.** Keep the same art style, colors, size, proportions and position in the cell. **Keep the feet or base exactly where they are in the base cell.** Change only what is described for that cell.
- `what_changes/var_NN_changes.jpg` shows, for every cell, the old in-game version: **left = normal, right = this variant**. Use it only to understand **what changes**, and never copy its flat style.

## Sheet format (the same as the boss sheets)
- `var_01.png`, `var_02.png`: **4 columns × 2 rows** (cells 384×512).
- `var_03.png`, `var_04.png`, `var_05.png`: **3 columns × 2 rows** (cells 512×512).
- 1536×1024, **transparent background**. Cells are numbered left to right, top row first. Cells not listed below stay empty (fully transparent).
- No ground, no cast shadow, no big aura outside the body, no text. Glow that belongs to the body is fine.

## The variants
**var_01.png** (4×2)
1. **Cassian — wounded (HP below 50%)**: deep cracks across the chest plate and pauldrons, a chipped helmet, and eyes glowing warm gold instead of white. Same pose.
2. **King Orien — phase 3 (HP below 33%)**: his crown has lifted off his head and **floats above it** with a glowing halo ring under it. His chest gem blazes and a few star sparks rise from the robe.
3. **Reflection of Orien — cracked (HP below 80%)**: a few glowing white cracks run across the crystal mask and robe.
4. **Reflection of Orien — shattering (HP below 50%)**: many more cracks, some missing shards on the shoulders and robe edge, and a bright crack running down the body. The eye holes glow brighter.
5. **Star-Devouring Queen — "listening"**: the head **tilts to one side** and one hand is raised **cupped to the ear**, listening. Wings stay open.
6. **Star-Devouring Queen — "the eye that does not exist"**: a **third eye opens in the middle of her forehead**, large, glowing pink-white. Same pose otherwise.
7. **Star-Devouring Queen — "inhaling the sky"**: her **wings and hair are pulled inward and forward** toward her mouth as if sucked in by a huge breath, arms raised and mouth open. (In-game this is also shown semi-transparent as her empty shell.)
8. **Hunger of the Stars — "fire-swallowing tendril"**: one long thin arm or tendril **stretches far out to the right side** with an open clawed hand, reaching to grab. Keep the body in the same place; the tendril extends outward.

**var_02.png** (4×2)
1. **Hunger of the Stars — "swallowing the sky"**: the toothed maw opens **much wider** (the ring of teeth spread apart, a deep dark void inside), and the eyes around the rim are pulled inward. The tendrils hang lower.

**var_03.png** (3×2)
1. **Star Wolf King — wounded (HP below 50%)**: glowing cracks across the body and crystal spines, a few spines broken off, and fiercer, brighter eyes.
2. **Cloud Kraken — enraged (HP below 50%)**: the body turns **pink-violet**, with glowing magenta veins, pink glowing eyes and small lightning crackles on the tentacles.
3. **The Weaver — form 2**: two of the six legs are gone (4 legs left), the armored body plates are cracked, and the glowing core in the body is larger.
4. **The Weaver — form 3**: only 2 legs remain, the armor is broken open, and a **huge blazing violet core** is exposed in the body.
5. **The Root Devourer — casting**: the root hands **lift the glowing half-heart up to the mouth**, and the heart blazes brighter.
6. **The Root Devourer — cracking**: many glowing orange cracks spread over the basalt shell, with small chunks lifting off.

**var_04.png** (3×2)
1. **The Root Devourer — shell peeling**: large shell plates break away and float outward, revealing **molten glowing flesh** underneath.
2. **The Root Devourer — molten core form**: the shell is gone. A blazing **molten core body** with a **crown of fire** on top, bright yellow-orange, eyes glowing white.
3. **World Boss — slam (left arm)**: the arm on the **left side of the image is raised high** with claws up, ready to smash down.
4. **World Boss — slam (right arm)**: the arm on the **right side of the image is raised high** with claws up, ready to smash down.
5. **World Boss — fire breath / roar**: the **mouth is wide open** with fire glowing deep inside, head pushed slightly forward.
6. **World Boss — nova**: the **ribcage chest bursts open** with a **blinding white-gold core** inside, arms spread to the sides.

**var_05.png** (3×2)
1. **Guild Boss — shield raise**: the **tower shield is lifted up high** in front of the body.
2. **Guild Boss — hammer slam**: the **giant hammer is raised high overhead**, ready to smash.
3. **Guild Boss — nova**: the gem in the chest plate blazes **white-hot**, with light leaking from the armor seams.

Deliver `var_01.png … var_05.png` with these file names, zipped. If you can only do part of it, do them **in order**.
