# REFUGEE: painted UI icons (HUD buttons + menu icons): 54 icons on 3 sheets

This is the fourth batch for the same game. Your skill icons are already in the game and look great (`approved_example/approved_skills_01.png`). Now the **on-screen buttons and menu icons** still use emoji or flat vector icons, so they clash with the painted skill buttons. See `game_hud_current_screenshot.png` and `game_menu_current_screenshot.png`.

## Style
- Same hand-painted fantasy MMORPG look and quality as the approved skill icons: painted light and volume, glow, and one bold focal object.
- **These are UI icons, so they should be calmer than skill icons.** Use a single clear object, little background action, and a cohesive **warm gold / bronze / parchment** UI palette over a **dark navy background**. That palette matches the game UI (navy panels with gold trim). Add an accent colour only where it carries meaning: red for health, blue for mana, green for AUTO, red slash for "off".
- **Full-bleed square painting** filling its whole 256×256 cell, with a dark navy atmospheric background. **No frame, border, rounded corner or bevel.** The game adds them.
- **Readable at 32 px.** One object, strong silhouette, high contrast. No fine clutter.
- **No text, letters or numbers anywhere.** For "what is new" and "AUTO", show it with a symbol, not a word. No realistic human faces. Silhouettes are fine.
- Every icon must have a **different silhouette**.

## Two kinds of cells
- **Cells 1–7 of sheet 1 are on-screen round action buttons** (next to the skill buttons). The game shows them **cropped to a circle**, so keep the object inside a centred circle about 80% of the cell, like the approved skill icons.
- **All other cells are menu tiles and window-header icons**, shown at about 32–40 px inside rounded squares.

## Sheet format (same grid as before)
- **3 sheets**: `hud_01.png`, `hud_02.png`, `hud_03.png`, each **1536×1024**, in a **6 × 4 grid** of exactly **256×256** cells with no gutters (`templates/`).
- Cells are numbered **1–24**, left to right and top to bottom. **(empty)** cells stay plain black. Only sheet 3 has empty cells (7–24).
- `reference_current_icons/` shows what each cell is now.

## hud_01.png
1. main menu: three stacked gold bars on a round shield-like medallion, inviting and clean
2. change target: a glowing red-gold crosshair reticle locking onto a target
3. auto-hunt bot: a small cute mechanical owl/golem head with a hunting crosshair eye (not a human face)
4. auto-skill battle: two crossed swords inside a circular auto-repeat arrow loop, green energy
5. dodge roll: a swift wind gust swoosh with motion streaks, pale cyan
6. health potion: a round glass flask of glowing red potion with a cork, heart-shaped sparkle
7. mana potion: a round glass flask of glowing blue potion with a cork, star-shaped sparkle
8. events calendar: an ornate fantasy calendar page with a glowing ribbon bookmark
9. chat: a parchment speech bubble with a quill mark (no letters)
10. emotes: a cheerful glowing smiling face orb (simple, cartoon)
11. sound on: a brass horn speaker with sound waves
12. sound off: the same brass horn speaker crossed out with a red slash
13. music: a golden music note with a soft glow
14. what is new: a sparkling gift scroll/star burst announcing news (no letters)
15. character: a heroic helmet silhouette with sparkles of power
16. equipment: an adventurer leather backpack with buckles
17. quests: a quest board/clipboard with a pinned parchment and a check mark
18. dungeon: a dark castle gate entrance with a glowing doorway
19. party: three hero silhouettes standing together, team crest
20. invite friends: two golden chain links joined with a sparkle
21. celebration event: festive fireworks and confetti burst
22. mounts: a horse head with a saddle and bridle
23. pets: a glowing paw print with a small heart
24. cards: a fan of three ornate collectible cards

## hud_02.png
1. elements: an alchemy flask with swirling fire, ice and lightning inside
2. fishing: a fishing rod with a bobber and a splashing fish
3. tent/home: a cozy campaign tent with warm light inside
4. auto-skill settings: a small brass clockwork gear-head automaton (not human)
5. settings: a polished bronze gear
6. gallery: an ornate golden picture frame with a landscape inside
7. statistics: a small rising bar chart carved on a stone tablet
8. developer tools: crossed hammer and wrench
9. character switch: a hooded hero silhouette portrait in a round frame with swap arrows
10. story: a rolled parchment scroll with a wax seal
11. dark winged messenger: a single large black-violet feather
12. rare merchant: a violet gemstone heart in a small coin purse
13. shop: a market stall with a striped awning
14. arena: two crossed swords in front of a round shield
15. rune smith: a glowing blue diamond rune crystal
16. rebirth altar: a sunrise over a sacred altar with rising light
17. world map: an unrolled old map with a red marker
18. friends: two friendly hero silhouettes side by side
19. gathering/crafting: a pickaxe striking a glowing ore
20. mail: a sealed envelope with a wax seal
21. wardrobe: an elegant outfit on a mannequin/clothes rack
22. camp upgrade: a wooden scaffold with a hammer, building in progress
23. trade: two hands shaking over gold coins
24. spirit tower: a tall slender glowing spirit tower

## hud_03.png
1. tower coins: a stack of glowing tower tokens/coins
2. rename: a quill writing on a name plate (no letters)
3. buy: a small merchant cart with goods
4. enhance: a smith hammer striking a glowing upgraded sword
5. royal forge: crossed hammers over an anvil with sparks
6. nightmare mode: a blood-red crescent moon with dark mist
7. (empty)
8. (empty)
9. (empty)
10. (empty)
11. (empty)
12. (empty)
13. (empty)
14. (empty)
15. (empty)
16. (empty)
17. (empty)
18. (empty)
19. (empty)
20. (empty)
21. (empty)
22. (empty)
23. (empty)
24. (empty)

## Deliver
Deliver `hud_01.png`, `hud_02.png` and `hud_03.png` with these file names, zipped, **in order**.
