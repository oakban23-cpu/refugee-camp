# REFUGEE: painted icons, part 3: skill runes (160 icons on 7 sheets)

This is the third batch. The first two are already in the game and look great (see `approved_example/`). **Use the same painting quality and the same grid format.**

## What these are
Each skill has two optional **runes** (variant A / variant B) that change how the skill behaves. In the game they appear as **small round rune tokens** next to the skill, often at only **28–40 px**. They are currently emoji (see `reference_current_icons/`).

## Design: one consistent "skill rune" token
- Paint each one as a **round carved rune-stone disc** (like a thick coin or seal) with a **metal rim in the class colour** and a **glowing symbol** on its face that shows the rune effect.
- It must be **clearly different from the link runes** on `approved_link_runes_06.png`. Those are faceted crystal spheres; these are flat carved stone seals with a metal rim.
- Class rim and colour families:
  - Warrior: crimson red / steel / gold
  - Ranger: forest green / mint / storm teal
  - Priest: warm gold / white; violet for curse runes
  - Assassin: violet / black smoke / steel
  - Mage: sky blue / ice white / fire orange / arcane purple
- The **symbol's colour** follows the effect: fire = orange, ice = pale blue, lightning = electric yellow, poison = green, healing = green/pink, curse = violet, and so on.
- **Very bold, simple symbols.** These are tiny on screen, so use one shape per token with strong contrast. No fine detail.
- Paint the disc centred over a dark background that fills the cell. Keep the disc inside a centred circle about **85% of the cell width**, because the game crops these to a circle.
- **No text, letters or numbers.** No realistic faces. Nothing gory.
- Within one sheet, every token must have a **different symbol**. Variant A and variant B of the same skill sit next to each other (cells 1&2, 3&4 and so on), so make the pair clearly different from each other.

## Sheet format (same as before)
- **7 sheets**: `skills_07.png` … `skills_13.png`, each **1536×1024**, in a **6 × 4 grid** of exactly **256×256** cells with no gutters (`templates/`).
- Cells are numbered **1–24**, left to right and top to bottom. Cells marked **(empty)** stay **plain black**. Only sheet 13 has empty cells (17–24).

## skills_07.png
1. **Warrior**: a sword spinning in a continuous storm vortex
2. **Warrior**: a magnet-like pull: spiral lines drawing inward to a sword
3. **Warrior**: two quick dash streaks one after another (double dash)
4. **Warrior**: a trail of fire left behind a dash streak
5. **Warrior**: two ground cracks crossing in an X
6. **Warrior**: a pool of glowing lava along a ground crack
7. **Warrior**: a crimson droplet with a rising rage flame (bloodthirst)
8. **Warrior**: a stone-skin shield like solid rock
9. **Warrior**: a shield reflecting red sparks back outward
10. **Warrior**: a rallying war horn with a protective aura
11. **Warrior**: a long-lasting whirl of six orbiting swords
12. **Warrior**: six swords converging on a single point
13. **Warrior**: a shield slam sending a full 360 ring shockwave
14. **Warrior**: stacked vengeance: a burning red rage sigil with three layered rings
15. **Warrior**: three crescent waves fanning out
16. **Warrior**: one giant wide crescent tidal wave
17. **Warrior**: a sword hovering and spinning in place at the end of its path
18. **Warrior**: a returning sword dragging a chain-like pull line back
19. **Warrior**: a huge stomping demon foot cracking the ground
20. **Warrior**: demonic crimson energy siphoning into a fist
21. **Warrior**: three rippling quake rings after an impact
22. **Warrior**: monsters pulled into an impact crater (inward arrows)
23. **Warrior**: three swords falling in a triangle formation
24. **Warrior**: a planted sword glowing and about to explode

## skills_08.png
1. **Warrior**: three blood rifts fanning out from a point
2. **Warrior**: a blood rift with healing crimson wisps rising
3. **Warrior**: five spectral knight helmets in a ring
4. **Warrior**: a spectral knight shield dome protecting a group
5. **Warrior**: a tower shield bristling with iron thorns
6. **Warrior**: a shield with a walking footstep beneath it (mobile guard)
7. **Warrior**: two golden walls falling toward each other
8. **Warrior**: a standing golden wall with a pushing shockwave
9. **Ranger**: a rain of arrows narrowed to a tight bullseye
10. **Ranger**: frost arrows raining down with ice crystals
11. **Ranger**: a backward leap with three arrows shot forward
12. **Ranger**: a small bomb left behind with a lit fuse
13. **Ranger**: a sun beam bursting on a target
14. **Ranger**: three light beams spreading in a fan
15. **Ranger**: pinning chains jumping between three targets
16. **Ranger**: an arrow cracking an armour plate
17. **Ranger**: lightning sparks around a crescent trap
18. **Ranger**: two crescent-moon traps side by side
19. **Ranger**: five star arrows homing onto one target
20. **Ranger**: a shower of nine star arrows scattering
21. **Ranger**: two tornadoes moving apart in a V
22. **Ranger**: one large stationary tornado sucking things in
23. **Ranger**: seven arrows in a very wide fan
24. **Ranger**: an arrow with an exploding head

## skills_09.png
1. **Ranger**: a hunting flag struck by lightning
2. **Ranger**: a flag in swirling green wind with speed leaves
3. **Ranger**: diving arrows each with a small explosion
4. **Ranger**: one giant divine golden arrow plunging down
5. **Ranger**: a heavy arrow exploding on impact
6. **Ranger**: three arrows in a narrow fan
7. **Ranger**: two hawks diving in turn
8. **Ranger**: a hawk crackling with lightning
9. **Ranger**: stars bursting twice (double flash)
10. **Ranger**: a star shattering into fragments
11. **Ranger**: a wind blade splitting into two
12. **Ranger**: a large finishing cyclone pulling inward
13. **Ranger**: a wind arrow bouncing in an eight-point star pattern
14. **Ranger**: a wind arrow with a small suction vortex
15. **Ranger**: three arrows stuck in the ground each struck by lightning
16. **Ranger**: one huge lightning strike exploding
17. **Priest**: holy light burst that damages: a sun with sharp rays
18. **Priest**: a leafy green regeneration glow
19. **Priest**: a sharp critical star on a team banner
20. **Priest**: a golden speed rune with motion arrows
21. **Priest**: a judgement explosion of light
22. **Priest**: a dove of light spreading protective wings
23. **Priest**: a holy chapel/sacred light pillar against a boss crown
24. **Priest**: two pillars of light striking

## skills_10.png
1. **Priest**: a holy circle turned into a ring of fire
2. **Priest**: a light circle following footsteps
3. **Priest**: a green healing ring with a heart glow
4. **Priest**: a very wide thin halo ring
5. **Priest**: a curse seal draining wisps that heal (violet with green)
6. **Priest**: a curse seal cracking and exploding
7. **Priest**: a light shield with thorns of light
8. **Priest**: a light shield with leaves of regeneration
9. **Priest**: three holy hammers in a row
10. **Priest**: one big holy hammer with a sacred ground circle
11. **Priest**: golden chains with pink life hearts flowing
12. **Priest**: golden chains snapping and exploding
13. **Priest**: a light beam splitting into two
14. **Priest**: a green healing beam
15. **Priest**: divine orbs shooting pink healing light
16. **Priest**: divine orbs exploding
17. **Priest**: an intense blazing dawn sun
18. **Priest**: a long gentle dawn with leaves
19. **Priest**: a violet ritual circle draining souls into healing
20. **Priest**: a fast-forward cursed ritual sigil
21. **Priest**: an exploding cursed doll
22. **Priest**: cursed pins piercing deep
23. **Priest**: two heavy soul chains
24. **Priest**: freed spirits bursting out

## skills_11.png
1. **Assassin**: three dagger strikes in a chain
2. **Assassin**: a shadow step repeating (circular arrow of shadow)
3. **Assassin**: a skull in thick toxic poison cloud
4. **Assassin**: a smoke screen with an evasive silhouette
5. **Assassin**: an executioner blade striking downward
6. **Assassin**: five shadow strikes in a dark night ring
7. **Assassin**: a death mark with a skull execution
8. **Assassin**: a death mark jumping in a chain
9. **Assassin**: a shadow clone exploding
10. **Assassin**: two shadow clones
11. **Assassin**: four shadow figures dashing in a wide fan
12. **Assassin**: one long piercing shadow line
13. **Assassin**: a lingering blade storm
14. **Assassin**: two dash footsteps with blade swirls
15. **Assassin**: a shuriken returning on a curved path
16. **Assassin**: one giant poisoned shuriken
17. **Assassin**: a chain sweeping three hooks
18. **Assassin**: a hook pulling the assassin forward
19. **Assassin**: a full moon stamped many times
20. **Assassin**: a dark moon with a vanishing silhouette
21. **Assassin**: many daggers (eight) in a ring
22. **Assassin**: poisoned daggers dripping green
23. **Assassin**: a scythe spinning three rounds
24. **Assassin**: a scythe draining crimson souls

## skills_12.png
1. **Assassin**: a wider night veil dome
2. **Assassin**: a shadow web entangling
3. **Assassin**: six shadow clones in a ring
4. **Assassin**: shadow clones exploding
5. **Assassin**: a wide ring of blades
6. **Assassin**: blades launching outward to chase
7. **Assassin**: a tight narrow sword cage
8. **Assassin**: swords flying outward from a cage
9. **Mage**: a comet piercing and exploding
10. **Mage**: a fireball splitting into three
11. **Mage**: a monster frozen solid in an ice block
12. **Mage**: an ice crystal armor shell
13. **Mage**: a giant dark meteor falling
14. **Mage**: a blizzard slowing everything
15. **Mage**: one focused massive lightning strike
16. **Mage**: lightning jumping across many points
17. **Mage**: a black hole vortex
18. **Mage**: a clock stopping time inside a circle
19. **Mage**: a lightning orb firing rapidly
20. **Mage**: lightning from an orb chaining onward
21. **Mage**: a giant lava golem fist
22. **Mage**: two golems flanking
23. **Mage**: two ice spears in a V
24. **Mage**: an ice spear exploding into frost

## skills_13.png
1. **Mage**: a double blink teleport
2. **Mage**: an icy patch left behind at a warp point
3. **Mage**: an ice dragon
4. **Mage**: two fire dragons intertwined
5. **Mage**: an arcane orb bursting at the end
6. **Mage**: an arcane orb orbiting in a circle
7. **Mage**: a blizzard following footsteps
8. **Mage**: a blizzard ending in a deep freeze
9. **Mage**: a fast-forward clock
10. **Mage**: a rewinding clock with a healing glow
11. **Mage**: two demonic hands rising
12. **Mage**: a demonic hand pulling and draining
13. **Mage**: a fire imp diving as a bomb
14. **Mage**: three fire imps
15. **Mage**: three hellhound heads
16. **Mage**: an exploding hellhound
17. (empty)
18. (empty)
19. (empty)
20. (empty)
21. (empty)
22. (empty)
23. (empty)
24. (empty)

## Deliver
Deliver `skills_07.png` … `skills_13.png` with these file names, zipped. If it is too many at once, deliver them **in order** over several replies, two or three sheets at a time.
