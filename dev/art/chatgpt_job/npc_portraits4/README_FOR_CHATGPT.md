# REFUGEE — Dialogue portraits for the last 10 speakers

You are painting **dialogue portraits** for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG played on phones. Another assistant (Claude) will cut the sheets automatically, so **please follow the format exactly**.

When a character speaks in the story, the game shows their **half-body portrait** standing above the dialogue box, plus a **round face icon** cut from the same image. 47 speakers already have approved portraits (`approved_portraits/all_existing_portraits.jpg`). These **10 speakers** still show only an emoji, so please paint them.

## Style: match `approved_portraits/`
- Match the existing portraits **exactly**: painted anime-fantasy character art, soft cel shading with painted volume, clean dark outline, warm light from the upper left, rich but not neon colours.
- **Half-body bust**: head, shoulders and chest down to about the waist, facing the viewer or turned slightly to the **right**, with an expressive face that fits the line they speak.
- Monsters and gods are painted as **"portrait-style busts"** too: the head and upper body of the creature, filling the frame the same way a person would. Keep them readable and characterful, not just a blob.
- Use the references in `refs/` for each character's design and colours.

## Sheet format
- **2 sheets**: `npc_01.png` (8 cells) and `npc_02.png` (2 cells, the rest empty), each **1536×1024, transparent background**.
- **4 columns × 2 rows** (cells 384×512), numbered left to right, top row first. See `templates/template_4x2_bust_384x512.png`.
- One character per cell. **The face sits in the upper part of the cell** (about where the blue circle is in the template), and the bust is **cut off at the bottom edge of the cell** (waist), like the approved portraits.
- **No background, no frame, no text, no big aura outside the body.** Glow that is part of the character (glowing eyes, a crown of light) is fine. Keep the alpha clean.
- Empty cells stay fully transparent.

## The 10 characters

**npc_01.png**
1. **The Voice Beneath the Seal** (`god`): the ancient god of light sealed under the Spirit Tower for 300 years. A majestic, sorrowful **golden being made of light**: a radiant face with **large glowing golden eyes**, long flowing hair like streams of light, faint wing shapes behind the shoulders, and **broken glowing chains** across the chest and shoulders. Ancient, sad, kind. Gender-neutral and serene. See `refs/god_story_scene_03.jpg` and `_05.jpg`.
2. **King Orien, voice from the throne** (`orn`): the cursed old king of the floating city Astra. Long white beard, gold crown, purple-and-gold star robe, **cold silver glowing eyes**, a cruel commanding sneer. Wisps of icy silver light curl around him. See `refs/orn_king_orien_boss.jpg` and `refs/orn_story_scene_12_throne_hall.jpg`.
3. **Reflection of Orien, the young astronomer** (`orn7`): the **same Orien before he became king**, seen in a memory inside a crystal mirror. A gentle, tired middle-aged astronomer with a shorter brown-grey beard, round spectacles pushed up on his forehead, a navy star-stitched astronomer's coat and brass instruments on his belt. A kind, regretful smile. Give him a slight **icy-blue crystal shimmer** along the edges to show he is a reflection. See `refs/orn7_reflection_of_orien_boss.jpg`.
4. **The Star-Devouring Queen** (`qnx`): a pale, beautiful but terrifying cosmic queen with a dark crown, huge purple moth wings behind her shoulders, a gown of night sky, and a glowing void gem on her chest. **Both eyes are dark empty voids with tiny stars inside** (her eyes were stolen). A hungry, smiling expression. See `refs/qnx_qsh_star_devouring_queen_boss.jpg`.
5. **The Queen, only a shell remains** (`qsh`): the **same queen after her defeat**, now a hollow, cracked shell: her porcelain-like skin is cracked with violet light leaking out, the wings are torn and ragged, the crown is broken, and she is **semi-transparent** in places. Blind and bitter, but still proud.
6. **Nera, the Eye of the Queen** (`eye`): the queen's last remaining eye, living on its own. A **giant floating eye** with a pink-violet iris and a star-shaped pupil, framed by dark moth-wing-like eyelids and lashes, with thin tendrils of starlight trailing below it like a cloak. It stares straight at the viewer. Fill the bust area as if it were a head and shoulders.
7. **The Root Devourer** (`rte`): a massive basalt-shelled maw monster from deep underground: a cracked black stone head with **lava-glowing teeth and cracks**, several eyes on root-like stalks, and gnarled root hands near the bottom. Ancient and greedy. See `refs/rte_root_devourer_boss.jpg` and `refs/rte_story_scene_11.jpg`.
8. **Goblin King of the Gold Sack** (`b7`): a fat green goblin king with a lopsided crown, a red-and-white royal cape, gold coins stuffed in his collar, hugging a **huge sack of gold**, eyes wide and greedy, mouth open shouting. Comic but nasty. See `refs/b7_goblin_king_boss.jpg`.

**npc_02.png**
1. **Mine worker** (`wk`): a tired but warm-hearted miner from the star mine: a man in his 30s with a soot-smudged face, a dented brass mining helmet with a small lamp, rolled-up sleeves, suspenders, a pickaxe resting on his shoulder, and a tiny **glowing star crystal** in his work-gloved hand. A humble, hopeful expression. (Context: he works for the greedy mine owner in `refs/wk_boss_brom_mine_owner.jpg`.)
2. **Black Ship crew member** (`bkc`): a ragged young sky-pirate sailor from Captain Grif's Black Ship: a dark bandana, a patched black coat with brass buttons, a worn rope belt, a broken cutlass at his side, and an exhausted, desperate face with tear-streaks. He came to beg for a safe harbour for the children on his ship, not to fight.
3–8. *(empty)*

---

## Checklist before sending
- **2 sheets**: `npc_01.png` and `npc_02.png`, each **1536×1024** with a **transparent background**.
- Half-body busts, with the **face in the upper part of the cell** and the bust cut off at the bottom of the cell.
- Same painted anime style as the approved portraits.
- No text, frames or background.

Deliver `npc_01.png` and `npc_02.png` zipped.
