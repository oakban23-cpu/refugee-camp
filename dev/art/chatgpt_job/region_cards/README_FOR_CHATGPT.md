# REFUGEE — Region title cards (10 landscape paintings)

You already painted the 29 story scenes for **REFUGEE (ค่ายผู้อพยพ)**. They are in the game now and look wonderful, thank you! This job is a smaller set in the **same style**: **one landscape painting for each of the 10 chapters (regions) of the world**.

## How they are used
When the player travels to another map, a **loading screen** appears for 1–2 seconds. Right now it is a plain dark gradient with a spinning ring. These paintings replace it. The game shows the painting **full screen**, slowly panning, with:
- the **chapter name** in large gold letters in the **upper-middle**,
- the **map name** in smaller letters in the **lower-middle**,
- a small glowing loading ring.

So each painting is an **establishing shot**: a wide, breathtaking view of the whole region that tells the player at a glance "this is where you are".

## Format: every image
- **10 images**, **1536×1024 landscape**, PNG, named `region_01.png … region_10.png`.
- **Full-bleed painting**: no text, letters, logo, signature, UI, frame or letterbox bars.
- **A landscape, not a character scene**: no main characters and no close-up people. Tiny distant silhouettes (travellers on a bridge, a ship, a lantern-lit window) are welcome for scale.
- **Composition** (see `template_safe_area.png`):
  - The top ~170 px and bottom ~170 px may be **cropped** on wide phone screens, so put the important landmarks in the middle band.
  - Keep the **upper-middle** area somewhat calm (sky, mist, soft light), because the chapter name sits there.
  - Put the region's **signature landmark** clearly in the middle, slightly below centre, with depth from foreground to far background.
  - The game darkens the edges a little; that is fine.

## Style: match `style/`
- `approved_story_scene_*.jpg` are your own approved story scenes and `approved_game_cover.jpg` is the game's cover. **Match them exactly**: rich painterly anime fantasy, glowing magic light, atmospheric haze, sparkles and fireflies, warm gold accents, cinematic depth.
- All 10 images must look like **one matching set**, each with its own colour mood (listed below), so the player feels the journey change.

## References for each region
`regions/rNN_*/` contains your story scenes set in that region (`story_scene_NN.jpg`) and painted props from the game maps (`props_*.jpg`). Use them so the places look **exactly like the same world**: same architecture, materials and landmarks. The props are sprites, so do not copy their angle.

---

## The 10 regions
Paint them **in order**. Each image is useful on its own.

**region_01. Chapter 1 · The Broken Seal: the old lands of Aranya.** Colour mood: dusk gold and poison green. A view from a forest hill at dusk: in the mid-ground, the **refugee camp** (wooden palisade, gate with sun banners, canvas tents, a campfire with smoke rising, lanterns). Beyond it rolling valleys filled with drifting **poison-green mist**, and on the horizon the **colossal 100-floor Spirit Tower** piercing the clouds with a faint golden light at its top. Far to the sides, hints of other lands: a bone-white valley, a red glow of hellfire, icy peaks.

**region_02. Chapter 2 · The Broken Sky: the floating city and the rift.** Colour mood: night blue, white-gold and violet. The **floating city Astra**, white-and-gold spires on a flying island above an endless **sea of clouds**, held up by a huge glowing **Star Heart** beneath it, with waterfalls pouring off the island edges. A long **sky bridge** runs east to a wide plain of glowing star-eggs, above which a **jagged violet crack** splits the night sky.

**region_03. Chapter 3 · The Shadow Land Beneath the Clouds.** Colour mood: deep indigo with teal and violet glow. The forgotten land **beneath the cloud sea**: the sky is a low ceiling of dark clouds. Below are a forest of **giant glowing mushrooms** (teal and violet), a misty purple bog, and the black ruins of an old city. Far off, a dark abyss with a shadow throne. One **pale shaft of starlight** falls through a hole in the clouds from far above (the Cloud Gate).

**region_04. Chapter 4 · The Divided Heart: under the earth.** Colour mood: amber, molten orange and ghost blue. A vast **underground cavern** crossed by **giant ancient roots**. A **glowing underground lake** reflects them. A long stair leads down to a **tomb of a hundred knights**, a field of planted swords glowing ghost-blue. In the deepest distance the cavern opens onto the **World Core**, a molten orange-gold glow.

**region_05. Chapter 5 · The Floating Throne: the palace of Astra.** Colour mood: royal white-gold, silver and starlight. The **royal palace of Astra** at twilight: grand white-gold halls and stairs, the **queen's floating garden islands** with silver thorny rose vines and white flowers, and at the very top a high hall with the **Star Throne** glowing through tall windows. A few silver-cold light streaks hint at danger.

**region_06. Chapter 6 · The Dawn Bridge.** Colour mood: sunrise pink-gold and cloud white. At sunrise a **bridge of golden light** curves down from the floating city to the land far below. Along the way: the **Lower Ring district** with red paper lanterns and market roofs, the **floating ruins of Aranya** (upside-down houses, broken towers and old bronze bells hanging in the air) and, far off, the **Empty Heart Pit**, a huge round pit with spiral stairs and broken giant gears.

**region_07. Chapter 7 · The Gatherer of Fallen Stars.** Colour mood: midnight navy with golden star-light. A night plain scattered with **glowing craters where stars have fallen**, a few tents and lanterns of star collectors, a mine cut into a cliff with **glowing star crystals**, and on a tall peak the **Orion observatory**, a brass-domed tower with a giant telescope. Shooting stars streak across the sky.

**region_08. Chapter 8 · The Endless Sea of Clouds.** Colour mood: moonlit blue with warm lantern orange. The **cloud harbor** on a high cliff: a red-and-white **lighthouse**, wooden piers, sky ships with sails, a market. Beyond it the **endless sea of clouds** under a full moon, with floating lanterns. In the mist on one side lie the wrecks of old sky ships (the ship graveyard), and the back of a **giant whale** with constellation markings arcs out of the clouds in the distance.

**region_09. Chapter 9 · The Endless Starfield.** Colour mood: cosmic violet, silver and brass. Out in space: a **stairway of light** rises from the observatory into the stars, leading to **floating star platforms**, enormous turning **brass gear rings**, and a vast **web of silver threads** strung with captured stars like dewdrops. Galaxies and nebulae fill the background.

**region_10. Chapter 10 · The Land That Carries the Sky (final chapter).** Colour mood: warm golden lantern light against deep earth darkness. The ground has collapsed into a **huge abyss** at the edge of the camp (a red flag at the rim, ropes going down). Deep below, the **Deep Root City** glows warmly: houses built inside giant roots, round windows, glowing mushroom lamps and rope bridges. Further down, in the darkness, a gigantic **net of roots**, and at the bottom the faint enormous silhouette of the **stone giant** kneeling and holding up the land.

---

## Checklist before sending
- Exactly **10 files**, `region_01.png … region_10.png`, **1536×1024 landscape**.
- Landscapes only: no main characters, **no text or letters**, no UI or borders.
- The signature landmark sits in the middle band, and the upper-middle stays calm for the title.
- Same painterly anime-fantasy style as your story scenes, with a different colour mood for each region.

Deliver the images zipped.
