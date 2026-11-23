# REFUGEE: Astra, the floating capital — full makeover (12 images)

You have painted a lot of the art for **REFUGEE (ค่ายผู้อพยพ)**, a fantasy RPG for phones: the world map, the medallions and the emote stickers are already in the game and look great. Thank you!

This job is about **Astra (นครอัสตรา), the floating capital city**. It is the city players visit most. Its main buildings are already painted:
- palace
- observatory
- shops
- forge
- arena
- crystal fountain

See `refs/approved_style_astra_buildings.jpg`. **This is the style to match exactly.**

The rest of the city is still plain programmer art (`refs/current_astra_city_10_views.jpg`, `refs/current_houses_and_ground_closeup.jpg`):
- one flat cream cobblestone pattern repeated over the whole city;
- one little white house with a blue roof, copied everywhere;
- plain green squares for gardens;
- a flat brown band under the island;
- plain blue sky.

Please paint the pieces below. Claude puts them into the game automatically, so **please follow the formats exactly**.

## How the game looks (important for every image)
- The camera looks **down at the city from above at a steep angle** (classic 2D RPG view).
- **Ground textures and ground decals:** paint them seen **straight from above** (top-down, no perspective, no horizon).
- **Buildings, towers, gardens and islands:** paint them like the approved buildings, seen **from the front and slightly above (3/4 view)**, standing on the ground line.
- **Style:** painterly anime-fantasy game art, clean dark outlines, soft painted shading, warm sunlight from the **upper left**, and a palette of white stone, royal blue, gold and soft greens. It must be the same quality and style as the approved Astra buildings.
- **No text, letters or numbers anywhere** (no signs with writing). No characters or people.
- **Transparent images:** clean alpha, with nothing left in the background: no ground plane, no floor, no glow spreading far, no cast shadow on the ground (the game adds its own shadows). Each piece stays inside its own cell with a margin, and **nothing touches the cell edges**.

---

## 1) `tex_cobble.png`: 1024×1024, opaque, **seamless tile**
The **main street cobblestone** for the whole city. Rounded cobbles in warm cream, sand and pale gold-white tones, slightly uneven, with soft painted light. Joints between stones are a bit darker with a hint of moss in very few places. Keep the stones fairly small: about 18–24 stones across the 1024 px width, so it reads as a large city ground. Use an **even level of detail and brightness everywhere**, with no big dark or bright spots, so it can repeat over a large area without visible repeats.
- **Seamless tile:** the left edge must continue perfectly into the right edge, and the top edge into the bottom edge. The game repeats it in a grid, so there must be no visible seams and no single feature that stands out.

## 2) `tex_avenue.png`: 1024×1024, opaque, **seamless tile**
The **royal avenue paving** for the main roads. Large rectangular slabs of polished white-cream marble laid in a running-bond pattern (about 6–7 slabs across), with fine joints, faint veins in the marble and a few slabs that are a little warmer or cooler in tone. It should look elegant, brighter than the cobblestone and very clean.
- **Seamless tile:** the left edge must continue perfectly into the right edge, and the top edge into the bottom edge. The game repeats it in a grid, so there must be no visible seams and no single feature that stands out.

## 3) `tex_lawn.png`: 1024×1024, opaque, **seamless tile**
A **lush, well-kept garden lawn**: fresh green grass with soft painted light, small clover patches and a few tiny white and yellow flowers spread evenly. Seen from above.
- **Seamless tile:** the left edge must continue perfectly into the right edge, and the top edge into the bottom edge. The game repeats it in a grid, so there must be no visible seams and no single feature that stands out.

## 4) `decals.png`: 1536×1024, transparent, **6 × 4 grid** of 256×256 cells (`templates/template_decals_6x4.png`)
**Ground decals**: small top-down details the game scatters on top of the paving to break up repetition. Each one is seen **straight from above**, has soft natural edges and a transparent background, and fills about 50–80% of its cell. Keep them **subtle and flat**: they lie on the ground, so no tall objects and no cast shadows.

1. **moss patch between stones:** Soft green moss growing in the gaps of a few stones, irregular organic shape, about 120 px.
2. **moss patch with tiny mushrooms:** A small moss patch with 3-4 tiny white mushrooms.
3. **fallen sakura petals (scatter):** A loose scatter of pink cherry-blossom petals, airy, no background.
4. **sakura petals (thick drift):** A denser little drift of pink petals piled against a stone.
5. **fallen golden leaves:** A few scattered golden and amber autumn leaves.
6. **crack in the paving (long):** A long thin crack running through stone, with tiny chips; dark line only.
7. **crack with grass:** A short crack with little grass tufts and a tiny white daisy growing out of it.
8. **small rain puddle:** A shallow puddle reflecting soft blue sky, irregular edge.
9. **drain grate:** A square iron drain grate set in the paving, with a small gold star emblem.
10. **gold star inlay (small):** A small four-pointed gold star inlaid in a round white marble disc.
11. **star mosaic medallion:** A round mosaic medallion (white, royal blue and gold) with an eight-pointed star, about 240 px - fills the cell.
12. **worn path wear:** A slightly darker, polished, worn oval patch where many feet walk.
13. **repaired stone patch:** A small patch of newer, lighter stones replacing old ones, tidy outline.
14. **daisies at a wall foot:** A strip of small white and yellow daisies and grass, wide and low.
15. **blue wildflowers clump:** A small clump of blue forget-me-nots with leaves.
16. **scattered straw:** Some loose straw / hay strands scattered on the ground.
17. **cart wheel tracks:** Two faint parallel wheel tracks, dusty, fading at both ends.
18. **blue and gold mosaic tiles:** A small cluster of loose blue and gold mosaic tiles set in the ground.
19. **grass tufts in gaps (A):** Several small tufts of grass growing between paving stones, spread out.
20. **grass tufts in gaps (B):** A different arrangement of grass tufts and a clover.
21. **avenue gold curb piece:** A short straight curb edge: white stone with a thin polished gold strip, horizontal, about 230 px long.
22. **avenue curb corner:** The matching curb as an L-shaped corner piece.
23. **stone manhole with star:** A round stone manhole cover with a carved star and a ring of rivets.
24. **fallen feathers:** Two or three white feathers lying on the ground (griffin feathers).

## 5) `houses.png`: 1536×1024, transparent, **4 × 2 grid** of 384×512 cells (`templates/template_houses_4x2.png`)
**8 different Astra townhouses**, replacing the single repeated house. Each house is in 3/4 view facing the viewer, with its **front base on the red line** of its cell, and fills about 80% of the cell height. They must all be the same scale and family: white or cream stone walls with gold trim and Astra royal blue. Make every roof colour and shape clearly different. Doors and windows are lit softly, and every window frame is gold. Show no text on any sign.

1. **House A - blue roof:** Two-storey white stone townhouse, royal-blue slate roof, gold trim, wooden door, flower boxes with red flowers, small chimney.
2. **House B - teal roof:** Narrow tall white house, teal roof with a little round dormer window, hanging shop sign with no text, potted plants by the door.
3. **House C - violet roof:** Wide house, violet roof, timber balcony on the upper floor with hanging laundry/banner cloth, arched door.
4. **House D - red-terracotta roof:** Cosy bakery-like home, terracotta roof, warm lit windows, a bench and bread basket by the door, chimney with smoke wisp.
5. **House E - gold roof corner house:** Corner house with a small round turret and a gold-tiled cone roof, star weather vane, ivy on one wall.
6. **House F - navy roof with archway:** House with a ground-floor archway (covered passage), navy roof, blue-and-gold awning.
7. **House G - small cottage:** Small one-storey cottage, sky-blue roof, round window, climbing roses, little picket fence segment.
8. **House H - noble manor:** Larger manor, white marble columns at the entrance, deep blue roof with gold ridge, two star banners.

## 6) `walls.png`: 1536×1024, transparent, **4 × 2 grid** of 384×512 cells (`templates/template_walls_4x2.png`)
**City wall towers and street pieces.** Each piece is in 3/4 view with its base on the red line, using the same white stone, royal blue and gold as the palace.

1. **Round wall tower A:** Tall round white stone tower with arrow slits, royal-blue cone roof, gold finial and a small star pennant.
2. **Round wall tower B:** Same tower family but with a glowing lantern window and a hanging blue-and-gold star banner.
3. **Square bastion:** Square stone bastion with crenellations (battlements) on top, blue flag on a pole.
4. **Small watch turret:** Small slim watch turret / sentry box with a blue cone roof, for between larger towers.
5. **Bridge gatehouse:** A small arched stone gatehouse facing the viewer, blue roof, open arch in the middle (for the east and west sky bridges).
6. **Ornate street lamp:** Tall white-and-gold street lamp post with a glass lantern glowing warm.
7. **Astra flag pole:** Tall pole with a long royal-blue banner bearing a gold star (no text).
8. **Plaza fountain (small):** Small round white marble fountain with a gold star spout, water sparkling.

## 7) `gate.png`: 1536×1024, transparent (`templates/template_gate.png`)
The **grand south gate of Astra**, where players arrive from the camp below, facing the viewer:
- **Two round gate towers** with blue cone roofs, gold finials and star banners.
- **Between them**, a tall **open archway** with the heavy doors swung fully open. Warm golden light spills out from the city behind, so players can clearly see that they can walk through.
- **A gold four-pointed star emblem** above the arch. No text.
- **Short pieces of the city wall** with battlements running out to the left and right edges.

The base sits on the red line, and everything below it is transparent.

## 8) `wall_segment.png`: 1536×1024, transparent (`templates/template_wall_segment.png`)
A **straight piece of the city wall**, filling the whole width of the image as a horizontal band, seen from the front and slightly above:
- **The front face:** large white stone blocks, a gold trim line, a few arrow slits and a little ivy.
- **On top:** a walkway with battlements (crenellations).
- **Seamless left to right:** the left edge must continue perfectly into the right edge, because the game repeats it all around the city.
- **Base and background:** the base sits on the red line, and everything above the battlements and below the base is transparent.

## 9) `gardens.png`: 1536×1024, transparent, **4 × 2 grid** of 384×512 cells (`templates/template_gardens_4x2.png`)
**Garden pieces**, replacing the plain green squares. Paint each one in 3/4 view from above, like the buildings, with its base about on the red line. Make them rich, colourful and well tended, like a royal city garden.

1. **Round flower bed:** Round flower bed edged with white stone, mixed flowers (pink, white, blue, yellow).
2. **Long flower bed:** Long rectangular flower bed (wide), stone border, rows of tulips and lavender.
3. **Topiary hedge row:** A trimmed green hedge row with two cone-shaped topiaries at the ends.
4. **Lily pond:** Small oval pond with a stone rim, water lilies, a few koi.
5. **Rose arch with bench:** A white-gold metal arch covered with climbing roses, a stone bench under it.
6. **Lavender planter:** A long stone planter box full of lavender.
7. **Garden gazebo:** Small white and gold gazebo with a blue dome roof, open sides.
8. **Flowering tree in stone ring:** A small white-blossom tree (not pink) in a round stone ring with grass.

## 10) `sky_below.png`: 1024×1024, opaque, **seamless tile**
The **open sky below the floating city**. The camera looks down past the edge of the island into the void, and this texture fills that view around the island:
- **Colours:** a soft, deep sky blue that gets lighter in hazy patches, with a sense of great depth.
- **Clouds:** a few far-away, soft, flat cloud wisps drifting far below.
- **Light:** subtle warm sunlight haze.
- **Composition:** no horizon, no sun disc and no islands, because the game adds floating islands and moving clouds on top. Keep it calm, low in contrast and even everywhere.
- **Seamless:** the left edge must continue into the right edge, and the top edge into the bottom edge.

## 11) `island_underside.png`: 1536×1024, transparent (`templates/template_island_underside.png`)
The **rock underside of Astra's great floating island**, the part you see hanging below the south edge of the city:
- **The white circle** in the template is the rim of the island's top surface. The city is drawn there, so leave the **inside of the circle completely transparent**.
- **Below the circle:** paint a massive **hanging rock underside**. It is deepest in the middle, roughly down to the yellow line, and thin at the sides, following the curve.
- **Rock and details:** layered earthy and grey rock with strata. Add a band of grass and soil with hanging roots and vines right under the rim, and glowing **blue and violet crystals** set in the rock.
- **Waterfalls:** two or three **thin waterfalls** pouring off the rim and fading into mist below.
- **Mist:** soft clouds hugging the bottom tips of the rock.
- **Top edge:** the top edge of the rock must **follow the white circle** closely all the way around the lower half, so it fits exactly under the city.

## 12) `islets.png`: 1536×1024, transparent, **4 × 2 grid** of 384×512 cells (`templates/template_islets_4x2.png`)
**Small floating islands** that drift around Astra in the sky, plus the two **portal islands** at the ends of the east and west sky bridges. Each one has a grassy top and a rocky underside hanging down, in the same rock style as the big island underside.

1. **Small floating islet A:** Small floating island: grass top with a tree, rocky underside hanging down, a little waterfall.
2. **Small floating islet B:** Small floating island with ruins of a white column, rock underside with blue crystals.
3. **Tiny floating rock:** Tiny floating rock with moss and a flower, very small island.
4. **Floating islet with windmill:** Small floating island with a little windmill (white, blue blades).
5. **Distant floating islet (hazy):** Floating island far away, slightly hazy and bluish (atmospheric perspective).
6. **Floating islet with pines:** Floating island with two pine trees and rocks, roots hanging below.
7. **Portal island (east):** Round floating island with a flat round stone platform on top (empty, the game puts a portal on it), rocky underside, small crystals.
8. **Portal island (west):** Same as cell 7 but with different rocks/plants (still an empty flat stone platform on top).

---

## Priority (if you cannot do everything at once)
Please send them in this order, as several messages if needed:
1. `tex_cobble.png`, `tex_avenue.png` and `houses.png`, which make the biggest difference;
2. `island_underside.png`, `sky_below.png` and `gardens.png`;
3. `tex_lawn.png`, `decals.png`, `walls.png`, `gate.png`, `wall_segment.png` and `islets.png`.

## Checklist before sending
- [ ] Every image has the exact size, grid and file name above.
- [ ] `tex_cobble`, `tex_avenue`, `tex_lawn` and `sky_below` are opaque, seamless on all four sides and even in detail.
- [ ] `wall_segment` is seamless left to right.
- [ ] Every other image is transparent with clean alpha. Each piece is inside its cell, nothing touches the cell edges, and there is no ground plane and no cast shadow.
- [ ] The style and palette match the approved Astra buildings: white stone, royal blue, gold, warm light from the upper left.
- [ ] There is no text anywhere.

Deliver the PNGs with these exact names, zipped. Partial deliveries are fine.
