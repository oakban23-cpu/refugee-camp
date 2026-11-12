# REFUGEE — Boss repaint (49 bosses, hand-painted)

You are painting game sprites for **REFUGEE (ค่ายผู้อพยพ)**, a browser RPG played on phones. Another assistant (Claude) will cut the sheets automatically and put each boss into the game, so **please follow the format exactly**.

Every boss in the game is currently drawn with simple vector shapes. You can see them in `current_bosses/boss_NN_current.jpg`, which use **the same layout as the sheets you will paint**. Please **repaint every boss as hand-painted fantasy game art**. Keep **the same character**: the same creature or person, silhouette idea, colour scheme, weapon and key features. Make it far richer, with real painted texture and volume.

## Style — match `good_example/`
- `approved_style_*.png` is art already approved for this game. **Match its painting style, outline weight, lighting and level of detail.**
- Hand-painted fantasy game art with **painted texture and volume**: cloth folds, metal sheen and scratches, scales, feathers, bone, crystal facets, glowing runes. **Do not use flat vector fills with outlines only.**
- Clean dark outline, warm light from the upper left, self-shading on the right side.
- Cute-but-epic proportions that fit a chibi RPG (slightly big heads on humanoids are fine), but each boss must look **powerful and threatening**.
- **Front view**, facing the viewer (a slight turn to the right is fine). The game mirrors the sprite when the boss turns.
- Standing or hovering in a neutral, ready pose, with all limbs, wings and weapons fully visible.

## Characters that already have portraits
`character_portraits/` contains approved dialogue portraits of some bosses. The file name says which sheet and cell each one belongs to. For these bosses, **the face, hair, crown and costume must match the portrait**. Keep the boss-sized body and weapon from the current boss.

## Sheet format
- **7 sheets**, each **1536×1024, transparent background**:
  - `boss_01.png` … `boss_05.png`: **4 columns × 2 rows** (cells 384×512) for upright bosses (`template_portrait_4x2.png`).
  - `boss_06.png`, `boss_07.png`: **3 columns × 2 rows** (cells 512×512) for wide or huge bosses (`template_wide_3x2.png`).
- Cells are numbered left to right, top row first. Cell N of `boss_NN.png` must be **the same boss** as cell N of `current_bosses/boss_NN_current.jpg`.
- One boss per cell, centred, **feet or base touching the bottom area of the cell**. Fill about **85% of the cell** and do not touch the cell edges.
- **No ground, no floor, no cast shadow, no big aura or halo outside the body, no text, no UI.** Glow that is part of the body (eyes, runes, crystals, flames on the body) is good. The game draws shadows, auras, hit flashes and spell effects itself.
- The world boss and guild boss reference images show a name label above them. **Ignore that text.**
- Empty cells (`boss_05.png` cells 6–8) stay fully transparent.

## The bosses
**boss_01.png**
1. **Poison Mist King**: king of toxic fog. Match the portrait: green skin, crown, dark green hooded robe. Add a staff with a green orb and toxic green mist swirling around his hands and feet.
2. **Azael, the Fallen Angel**: match the portrait (golden-blond angel in white and gold armor). Six large white wings, a halo, a glowing holy sword and violet light.
3. **Ancient Bone King**: crowned skeleton king (match the portrait) in a purple royal cape and old armor, holding a long sword.
4. **Hellfire Demon Lord**: red horned demon (match the portrait) with bat wings, a flaming crown, molten cracks in the skin and a fireball in one hand.
5. **Eternal Ice Emperor**: match the portrait (pale blue skin, ice-crystal crown). Crystal plate armor and an ice greatsword.
6. **Abyss King**: match the portrait for the face and crown. Teal fish-scaled sea-king armor, fin crest, shell pauldrons, a trident and a glowing sea orb.
7. **Goblin King of the Gold Sack**: fat green goblin king with a crown, red-and-white royal cape, a huge sack of gold over the shoulder and a jewelled scepter.
8. **Undying Pharaoh Nefer-Rah**: mummy pharaoh in a gold-and-blue nemes headdress, with wide turquoise-and-gold wings and a golden sun disc behind the head.

**boss_02.png**
1. **Crypt Warden**: dark armored knight with a horned helm and purple glowing eyes, a huge scythe and a hanging lantern.
2. **Black Root King**: hulking golem of black twisted roots with a glowing amber core and eyes, and a crown of sprouts.
3. **Cassian, Commander of the Star Guard**: match the portrait (blond knight in silver plate and blue cape). Star-tipped spear and a rose-emblem shield, boss-sized and heroic.
4. **King Orien, Lord of the Star Throne**: old king with a long white beard, gold crown, purple-and-gold star robe and a star scepter.
5. **Envoy of Hunger**: tall hooded cosmic figure in a starry violet robe, with a black-hole void in the chest and thin spider-like legs.
6. **Shadow of Azael**: match the portrait (dark hooded figure, black wings, red eyes). Tattered black wings and a dark broken halo.
7. **Shadow Bell-Ringer**: hooded figure with a glowing face carrying a wooden bell frame with a bronze bell and a hammer, with a sun emblem on the chest.
8. **Fallen Bell Warden**: clockwork guardian with a brass bell or horn for a head, a clock face on the chest and cog arms.

**boss_03.png**
1. **Vesper, Guardian of Aranya**: match the portrait (dark teal hooded cloak over old silver armor, golden hourglass emblem). Spear and a faint golden halo.
2. **Abyss King — True Form**: a larger, monstrous indigo version of the Abyss King, with many glowing tentacles, constellation spots, a crown of fins and a trident.
3. **Nyx the Shadow Weaver**: match the portrait for the woman (black hair, violet gown, tiara). She rises from a giant dark spider body with a web halo behind her and a glowing hourglass mark.
4. **Star-Devouring Queen**: pale queen with a crown and huge purple moth wings, in a cosmic gown with a glowing void gem.
5. **Hunger of the Stars**: round floating purple void maw with a ring of teeth, many eyes around the rim and thin tendrils hanging below.
6. **Captain Grif**: match the portrait (tricorne hat, black coat, red scarf). Boss-sized, with a cutlass and a mechanical arm.
7. **Pearl Keeper**: giant pale-blue jellyfish guardian holding a glowing pearl, with long lightning-crackling tentacles.
8. **Keeper of Time**: clockwork construct with a clock-tower head, a brass gear body and clock-hand blades radiating outward.

**boss_04.png**
1. **Reflection of Orien**: crystalline, icy-blue mirror ghost of King Orien, with a crown, staff and starry robe.
2. **Rosaline, Silver-Thorn Bloom**: giant pink rose with an eye at its centre, thorny green vines as arms and silver thorns.
3. **The Last Puppet King**: porcelain puppet king in a navy robe with gold stars and gold ball joints, hanging from puppet strings tied to a wooden cross-bar above.
4. **Tower floor 10 boss**: dark purple spider queen with a skull mark and a crown of green flames.
5. **Tower floor 20 boss**: silver armored knight with a blue flame for a head and a greatsword.
6. **Tower floor 30 boss**: lava rock golem with glowing orange cracks.
7. **Tower floor 40 boss**: floating ice-crystal spirit with one big eye and crystal shards around it.
8. **Tower floor 50 boss**: violet sorceress with small wings and floating crystal-orb lanterns.

**boss_05.png**
1. **Tower floor 60 boss**: angry treant with an apple-tree crown and glowing green eyes.
2. **Tower floor 70 boss**: horned dark necromancer with a skull staff.
3. **Tower floor 80 boss**: fire phoenix with blazing wings.
4. **Tower floor 90 boss**: frost giant with a horned helm and a huge ice hammer.
5. **Tower floor 100 boss**: golden void emperor in a tall white-and-gold robe, with a crown and a ring of floating golden rings around him.
6–8. *(empty)*

**boss_06.png** (wide cells)
1. **Tempest, the Storm Roc**: giant eagle with dark-blue wings spread wide, a white chest, a golden beak and crackling lightning on its talons.
2. **Star Wolf King**: navy wolf with glowing crystal spines along its back, star sparkles, glowing eyes and bared fangs.
3. **Cloud Kraken**: purple octopus rising out of a puffy white cloud, with yellow eyes and tentacles curling around.
4. **Sky-Swallowing Whale**: huge purple whale with constellation markings, a big smiling mouth and a puffy white cloud base (no water spout needed).
5. **Vorath, Keeper of the Star Nest**: giant purple star-moth and spider hybrid, with purple wings, spider legs and a vertical toothed mouth on its chest.
6. **The Shadow Bearer**: huge hunched dark-violet titan carrying an enormous stone slab on its back, with glowing cracks.

**boss_07.png** (wide cells)
1. **The Weaver**: giant spider working at a wooden loom frame, purple and gold.
2. **Giant Root-Gnawer**: huge burrowing beetle-grub with golden spikes on its back and big mandibles.
3. **Earth-Biting Queen**: ant or termite queen with a huge pale egg-sac abdomen and a dark armored head and legs.
4. **The Root Devourer**: massive basalt-shelled maw with lava-glowing teeth, eyes on root stalks and root hands clutching half of a glowing heart.
5. **World Boss, the Abyssal Colossus**: giant horned lava demon with a ribcage chest and fiery mouth, rising from a ring of magma (paint the magma ring as part of its base, kept compact).
6. **Guild Boss, the War-Armored Fiend**: huge steel-and-gold war golem with a tower shield, a giant hammer and two banners on its back (blank banners, no symbols or letters).

## Checklist before sending
- All 49 bosses are hand-painted with texture and volume, **not flat**, and match the approved style.
- Every cell matches the same boss in `current_bosses/`, and the portrait bosses match their portraits.
- The background is transparent, with no ground, shadow, big aura or text, and nothing touching the cell edges.

Deliver `boss_01.png … boss_07.png` with these file names, zipped. If you can only do part of it, do them **in order**. Each sheet is useful on its own.
