import json
from PIL import Image, ImageDraw, ImageFont
P = '/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/ghpack/'
F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
F2 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 11)
# kind: 'b' building/prop standing on a base line (red line at 90% of the box) · 'f' flat / top-down item (no base line)
SH = {
 'gh_01_halls': (3, 2, [
  ('HALL_T1', 'War-camp command pavilion: huge canvas tent on a wooden frame, open front with a map table, 2 WHITE flags', 'b'),
  ('HALL_T2', 'Timber longhouse hall: log walls, carved roof beams, wooden steps, 2 WHITE hanging banners', 'b'),
  ('HALL_T3', 'Stone guild hall: grey stone, teal slate roof, arched double door, buttresses, 2 WHITE banners', 'b'),
  ('HALL_T4', 'Fortress keep: tall square keep, corner turrets, crenellations, iron-banded door, WHITE banners', 'b'),
  ('HALL_T5', 'Castle palace: grand castle, many spires, wide staircase, gold trim, rose window, tall WHITE banners', 'b'),
  ('GUILD_MONUMENT', 'Guild monument: tall carved stone plinth, 2 braziers, a PLAIN WHITE round medallion on the front', 'b')]),
 'gh_02_gates': (4, 2, [
  ('GATE_T1', 'Log palisade gate with two small lookout posts, gate OPEN', 'b'),
  ('GATE_T2', 'Timber gatehouse with a roofed walkway on top, gate OPEN', 'b'),
  ('GATE_T3', 'Stone gatehouse, raised portcullis, gate OPEN', 'b'),
  ('GATE_T4', 'Iron gate between two round stone towers, gate OPEN', 'b'),
  ('GATE_T5', 'Grand castle gate: tall towers with spires, open golden doors', 'b'),
  ('TOWER_T12', 'Wooden corner watchtower (tiers 1-2)', 'b'),
  ('TOWER_T34', 'Round stone corner tower with crenellations (tiers 3-4)', 'b'),
  ('TOWER_T5', 'Tall castle corner tower with a spire and a WHITE banner', 'b')]),
 'gh_05_facilities': (4, 3, [
  ('TREASURY_LO', 'Treasury (early): supply wagon + iron strongbox under a canvas awning', 'b'),
  ('TREASURY_HI', 'Treasury (late): small stone vault, round golden vault door', 'b'),
  ('WAREHOUSE_LO', 'Warehouse (early): open timber shed with sacks and crates', 'b'),
  ('WAREHOUSE_HI', 'Warehouse (late): stone storehouse with big wooden doors', 'b'),
  ('KITCHEN_LO', 'Kitchen (early): cauldron over a fire, log benches, hanging pots', 'b'),
  ('KITCHEN_HI', 'Kitchen (late): stone kitchen house, chimney, bread oven', 'b'),
  ('BARRACKS_LO', 'Barracks (early): two soldier tents + weapon rack', 'b'),
  ('BARRACKS_HI', 'Barracks (late): stone barracks with armour racks by the door', 'b'),
  ('GUILD_BOARD', 'Guild notice board on posts with pinned papers and a small WHITE pennant', 'b'),
  ('FARM_PLOT', 'Empty farm plot SEEN FROM ABOVE: dark tilled soil, 4 furrows, low wooden border', 'f'),
  ('STABLE', 'Small horse stable with two horses, hay, water trough', 'b'),
  ('WELL', 'Stone water well with a wooden roof and bucket', 'b')]),
 'gh_06_decor': (6, 4, [
  ('CAMPFIRE_RING', 'Campfire in a stone ring with log seats', 'b'), ('BONFIRE_BIG', 'Big festival bonfire', 'b'),
  ('STATUE_FOUNTAIN', 'Round fountain with a knight statue', 'b'), ('CRYSTAL_FOUNTAIN', 'Fountain with a floating glowing crystal', 'b'),
  ('FLOWER_PLANTER', 'Long stone planter with flowers', 'b'), ('POTTED_TREE', 'Small tree in a big stone pot', 'b'),
  ('BENCH', 'Wooden bench with iron legs', 'b'), ('LANTERN_WOOD', 'Wooden post with a hanging lantern', 'b'),
  ('LANTERN_GOLD', 'Ornate gold street lamp', 'b'), ('BANNER_POLE', 'Tall pole with a WHITE flag', 'b'),
  ('WEAPON_RACK', 'Weapon rack: swords, spears, shields', 'b'), ('ARMOR_STAND', 'Armour stand with plate armour', 'b'),
  ('BARREL_STACK', 'Stack of barrels', 'b'), ('CRATE_STACK', 'Stack of wooden crates', 'b'),
  ('HAY_BALES', 'Hay bales', 'b'), ('FIREWOOD_PILE', 'Firewood pile with an axe', 'b'),
  ('SUPPLY_CART', 'Supply cart with sacks', 'b'), ('ANVIL_FORGE', 'Anvil next to a small glowing forge', 'b'),
  ('ARCHERY_TARGET', 'Archery target on a stand', 'b'), ('TRAINING_DUMMY', 'Straw training dummy', 'b'),
  ('STANDING_TORCH', 'Standing iron torch, burning', 'b'), ('WAR_DRUM', 'Big war drum on a stand', 'b'),
  ('FLOWER_BUSH', 'Round flowering bush', 'b'), ('ROSE_ARCH', 'Rose arch for a garden path', 'b')]),
}
J = {}
for k, (cols, rows, items) in SH.items():
    W, H = 1536, 1024; im = Image.new('RGB', (W, H), (255, 0, 255)); d = ImageDraw.Draw(im); cw, ch = W / cols, H / rows; out = []
    for i, (n, desc, kind) in enumerate(items):
        c, r = i % cols, i // cols; x0, y0 = round(c * cw), round(r * ch); x1, y1 = round((c + 1) * cw), round((r + 1) * ch)
        d.rectangle([x0, y0, x1 - 1, y1 - 1], outline=(110, 110, 110), width=2)
        m = 14; bx = [x0 + m, y0 + m + 18, x1 - m, y1 - m - 14]
        d.rectangle(bx, outline=(40, 110, 220), width=2)
        if kind == 'b':
            by = round(bx[1] + (bx[3] - bx[1]) * 0.90); d.line([bx[0], by, bx[2], by], fill=(230, 30, 30), width=2)
        d.text((x0 + 6, y0 + 3), '%d %s' % (i + 1, n), fill=(20, 20, 20), font=F)
        d.text((x0 + 6, y1 - 15), desc[:int(cw / 6.3)], fill=(40, 40, 40), font=F2)
        out.append(dict(n=i + 1, name=n, desc=desc, kind=kind, cell=[x0, y0, x1, y1], box=bx))
    im.save(P + 'pack/templates/' + k + '_template.png'); J[k] = dict(grid=[cols, rows], items=out)
# wall strips
im = Image.new('RGB', (1536, 1020), (255, 0, 255)); d = ImageDraw.Draw(im); WH = ['WALL_T1 palisade of sharpened logs', 'WALL_T2 log wall with a wooden walkway on top', 'WALL_T3 grey stone wall',
      'WALL_T4 high stone wall with crenellations', 'WALL_T5 castle wall, crenellations, gold trim']
rowsj = []
for i, t in enumerate(WH):
    y0 = i * 204; y1 = y0 + 204; d.rectangle([0, y0, 1535, y1 - 1], outline=(110, 110, 110), width=2)
    by = y0 + round(204 * 0.88); d.line([0, by, 1535, by], fill=(230, 30, 30), width=2)
    d.text((8, y0 + 4), '%d %s · SEAMLESS LEFT↔RIGHT · base on red line' % (i + 1, t), fill=(20, 20, 20), font=F); rowsj.append(dict(n=i + 1, name='WALL_H_T%d' % (i + 1), row=[y0, y1], base=by))
im.save(P + 'pack/templates/gh_03_walls_horizontal_template.png'); J['gh_03_walls_horizontal'] = dict(rows=rowsj)
im = Image.new('RGB', (1530, 1024), (255, 0, 255)); d = ImageDraw.Draw(im); colsj = []
for i in range(5):
    x0 = i * 306; x1 = x0 + 306; d.rectangle([x0, 0, x1 - 1, 1023], outline=(110, 110, 110), width=2)
    cx = x0 + 153; d.line([cx - 50, 0, cx - 50, 1023], fill=(40, 110, 220), width=2); d.line([cx + 50, 0, cx + 50, 1023], fill=(40, 110, 220), width=2)
    d.text((x0 + 6, 6), 'WALL_V_T%d' % (i + 1), fill=(20, 20, 20), font=F); d.text((x0 + 6, 26), 'side wall seen from above', fill=(40, 40, 40), font=F2)
    d.text((x0 + 6, 40), 'SEAMLESS TOP↕BOTTOM', fill=(40, 40, 40), font=F2); colsj.append(dict(n=i + 1, name='WALL_V_T%d' % (i + 1), col=[x0, x1]))
im.save(P + 'pack/templates/gh_04_walls_vertical_template.png'); J['gh_04_walls_vertical'] = dict(cols=colsj)
json.dump(J, open(P + 'tools/sheets.json', 'w'), indent=1, ensure_ascii=False)
print('ok', list(J))
