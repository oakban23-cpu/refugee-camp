# REFUGEE — Painted skill effects (VFX), 4 sheets

You are painting **skill effect sprites (VFX)** for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy action RPG played on phones (2D, seen from above at an angle). Another assistant (Claude) will cut each effect out and play it in the game with code: **added on top of the scene with additive glow blending**, then **scaled, rotated, stretched and faded** over a fraction of a second. So each picture is **one single frame of a bright, glowing effect**, not an animation strip.

Today the skills are drawn with simple code shapes (rings, dots, lines; see `refs/current_vfx/`). Please make them look like **premium anime-style mobile game VFX** (think Genshin Impact / Honkai / Arknights skill effects): luminous, layered, with a white-hot core, saturated colour, soft bloom and fine sparkle detail.

## Deliver exactly 4 PNG files
| file | theme |
|---|---|
| `vfx_01_steel.png` | blade, impact & fury |
| `vfx_02_arcane.png` | fire, ice, lightning, arcane |
| `vfx_03_light_shadow.png` | holy light, shadow, poison |
| `vfx_04_wind_ult.png` | wind, arrows, ultimate effects |

- **Size 1536×1024**, PNG, grid **4 columns × 3 rows** (12 effects per sheet), numbered left→right, top→bottom. Follow `templates/vfx_0X_..._template.png` exactly. Do **not** draw the grid, boxes or labels.
- **Background: pure black `#000000` everywhere.** No transparency needed. The black becomes invisible in the game (additive blending), so **black = nothing**.
  - Every glow must **fade smoothly into pure black** before the edge of its cell. No grey haze, no dark-blue sky, no vignette, no ground, no scenery.
  - **Nothing may touch or cross the cell borders.** Leave a clear black margin of at least ~20 px around each effect.
- Because black disappears, **do not use black or very dark colours to draw shapes** (dark smoke, black outlines). Everything visible must be **light**: glowing colour, bright cores. Dark shadow effects (sheet 3) are drawn with **glowing violet edges and light wisps**, not black.
- **No characters, weapons held by hands, creatures, text, letters, numbers or UI.** Effects only.
- Flat shapes (magic circles, rings, shockwaves) are painted as **perfect circles facing the viewer**. The game squashes them to lie on the ground.
- Directional effects: **horizontal ones point/fly to the RIGHT**, vertical ones go **top → bottom** (except flames/sparkles that rise, which go up). The game rotates them.

## Style
- Match the colours and glow of `refs/style/` (approved skill icons and story art of this game).
- Each effect: **bright white-hot core → saturated colour → soft outer bloom → fine sparkles**. Crisp shapes, not blurry blobs.
- Same painting style across all 4 sheets.

### What we do NOT want
- Flat vector shapes with one colour, or clip-art looking effects.
- Effects painted on a coloured or textured background, or cut off by the cell edge.
- Realistic photo smoke/fire (it looks muddy when blended); keep it **stylised and luminous**.

## Sheet 1 · `vfx_01_steel.png`: blade, impact & fury (Demon Blade warrior, general hits)
1. **SLASH_ARC**: crescent sword slash, white-hot core, orange-red edges. *(horizontal (fill the cell width))*
2. **SLASH_SPIN**: almost full 300° spinning blade ring, gold-white. *(centred, roughly round)*
3. **CROSS_SLASH**: X-shaped double slash, crimson with white core. *(centred, roughly round)*
4. **THRUST_STREAK**: long horizontal piercing streak, sharp tip at the right. *(horizontal (fill the cell width))*
5. **IMPACT_BURST**: star-shaped impact flash with long spikes, white centre, orange. *(centred, roughly round)*
6. **SHOCKWAVE_RING**: thin glowing shockwave ring with dust sparks, flat circle. *(centred, roughly round)*
7. **GROUND_CRACKS**: glowing lava-red cracks radiating from the centre. *(centred, roughly round)*
8. **DEMON_FLAME**: upward crimson demonic flame tongues (aura behind a hero). *(vertical (fill the cell height))*
9. **SPARK_BURST**: many small hot sparks flying outward. *(centred, roughly round)*
10. **SHIELD_DOME**: glowing hexagon energy shield bubble, gold-blue, mostly hollow. *(centred, roughly round)*
11. **DASH_TRAIL**: speed streak lines, horizontal, fading to the left. *(horizontal (fill the cell width))*
12. **CLAW_MARKS**: three parallel glowing red claw scratches, diagonal. *(centred, roughly round)*

## Sheet 2 · `vfx_02_arcane.png`: fire, ice, lightning & arcane (Rune Mage)
1. **FIRE_EXPLOSION**: big fiery explosion burst, orange-yellow core. *(centred, roughly round)*
2. **FIREBALL**: fireball flying right with a flame tail to the left. *(horizontal (fill the cell width))*
3. **FLAME_PILLAR**: tall vertical pillar of fire. *(vertical (fill the cell height))*
4. **ICE_SHATTER**: burst of sharp ice crystals flying outward, cyan-white. *(centred, roughly round)*
5. **FROST_NOVA**: ring of frost and snowflake sparkles, flat circle. *(centred, roughly round)*
6. **ICE_SPEAR**: long ice spear pointing right, glowing cyan. *(horizontal (fill the cell width))*
7. **LIGHTNING_BOLT**: vertical jagged lightning bolt from top to bottom, blue-white. *(vertical (fill the cell height))*
8. **LIGHTNING_ORB**: crackling ball of electricity. *(centred, roughly round)*
9. **METEOR**: meteor falling diagonally down-left with a long fire trail. *(centred, roughly round)*
10. **FIRE_CIRCLE**: orange runic magic circle, flat, seen from the front. *(centred, roughly round)*
11. **ARCANE_CIRCLE**: violet runic magic circle with star pattern, flat. *(centred, roughly round)*
12. **VOID_VORTEX**: purple swirling vortex with bright rim and dark core. *(centred, roughly round)*

## Sheet 3 · `vfx_03_light_shadow.png`: holy light (Soul Priest) and shadow & poison (Shadow Assassin)
1. **HOLY_CIRCLE**: golden holy rune circle with cross and sun motifs, flat. *(centred, roughly round)*
2. **LIGHT_PILLAR**: vertical beam of holy light from the sky. *(vertical (fill the cell height))*
3. **HEAL_SPARKLES**: rising green-gold sparkles and small light crosses. *(vertical (fill the cell height))*
4. **HALO_RAYS**: golden halo ring with radiant rays. *(centred, roughly round)*
5. **ANGEL_WINGS**: pair of radiant golden angel wings made of light, spread. *(wide, centred)*
6. **LIGHT_SWORD**: giant sword made of light pointing down. *(vertical (fill the cell height))*
7. **SHADOW_SLASH**: violet-black crescent slash with purple glow edges. *(horizontal (fill the cell width))*
8. **SHADOW_WISPS**: smoky purple shadow wisps with glowing edges. *(centred, roughly round)*
9. **POISON_SPLASH**: toxic green splash burst with droplets. *(centred, roughly round)*
10. **CURSE_SIGIL**: purple curse rune circle with a skull motif, flat. *(centred, roughly round)*
11. **MOON_CRESCENT**: huge silver-violet crescent moon blade. *(centred, roughly round)*
12. **SOUL_WISP**: ghostly blue spirit flame wisp with tail. *(vertical (fill the cell height))*

## Sheet 4 · `vfx_04_wind_ult.png`: wind & arrows (Night Ranger) and ultimate effects for everyone
1. **WIND_ARROW**: arrow of green-white wind flying right with a swirl trail. *(horizontal (fill the cell width))*
2. **ARROW_RAIN**: many glowing arrow streaks falling down. *(vertical (fill the cell height))*
3. **WIND_TORNADO**: small tornado of green-white wind with leaves. *(vertical (fill the cell height))*
4. **STAR_ARROW**: blue star-comet arrow flying right. *(horizontal (fill the cell width))*
5. **PIERCE_BEAM**: long straight horizontal energy beam, white core, blue-green edges. *(horizontal (fill the cell width))*
6. **LEAF_STORM**: ring of glowing leaves spinning. *(centred, roughly round)*
7. **ULT_SIGIL**: large complex gold-white ultimate magic sigil, flat. *(centred, roughly round)*
8. **MEGA_BLAST**: huge white-gold energy explosion. *(centred, roughly round)*
9. **GOD_RAYS**: fan of light rays shining downward. *(wide, centred)*
10. **STAR_FLARE**: 4-point star flare sparkle with lens glints. *(centred, roughly round)*
11. **GLOW_ORB**: soft round glowing energy orb, white-gold. *(centred, roughly round)*
12. **ENERGY_SPIRAL**: spiral of energy ribbons, cyan-violet. *(centred, roughly round)*

## Reference folders
- `refs/style/`: approved art of the game (skill icons, story art, boss art). Match the colour and glow quality.
- `refs/current_vfx/`: the current code-drawn skill effects in real gameplay (left = old, right = current). Your sprites will be layered on these moments.
- `templates/`: exact layout of each sheet.

Thank you! Please send the 4 PNGs with the exact file names above, one sheet at a time.
