"""ตัดภาพหน้าเลือกอาชีพ: ฮีโร่ 5 ตัว → hd-csh-<cls>.webp (กรอบแนวตั้งเดียวกันทุกตัว เท้าที่ขอบล่าง) · ฉาก → hd-cs-scene.webp + ตำแหน่งกองไฟ"""
import sys, os, json
from PIL import Image
import numpy as np
D, O = sys.argv[1], sys.argv[2]
os.makedirs(O, exist_ok=True)
MAP = {'melee': 'hero_melee', 'archer': 'hero_archer', 'mage': 'hero_mage', 'assn': 'hero_assassin', 'sup': 'hero_priestess'}
ims = {}
top = 9999
for k, f in MAP.items():
    im = np.array(Image.open(os.path.join(D, f + '.png')).convert('RGBA'))
    a = im[..., 3].astype(int)
    a[a < 24] = 0
    a[a >= 200] = 255
    im[..., 3] = a
    ys, xs = np.nonzero(a > 30)
    top = min(top, ys.min())
    ims[k] = (im, xs.min(), xs.max())
Y0, Y1 = top - 12, 1446 + 6
SC = 0.62
meta = {}
for k, (im, x0, x1) in ims.items():
    x0, x1 = max(0, x0 - 12), min(1024, x1 + 13)
    c = Image.fromarray(im).crop((x0, Y0, x1, Y1))
    c = c.resize((round(c.width * SC), round(c.height * SC)), Image.LANCZOS)
    c.save(os.path.join(O, 'hd-csh-%s.webp' % k), quality=88, method=6)
    meta[k] = {'w': c.width, 'h': c.height}
sc = Image.open(os.path.join(D, 'scene.png')).convert('RGB')
sc.save(os.path.join(O, 'hd-cs-scene.webp'), quality=84, method=6)
a = np.array(sc).astype(int)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
m = (r > 235) & (g > 150) & (b < 150)
ys, xs = np.nonzero(m)
fx, fy = float(np.median(xs)) / sc.width, float(ys.max() - (ys.max() - np.median(ys)) * 0.3) / sc.height
meta['fire'] = [round(fx, 4), round(float(np.median(ys)) / sc.height, 4), round(float(ys.max()) / sc.height, 4)]
meta['scene'] = [sc.width, sc.height]
json.dump(meta, open(os.path.join(O, 'meta.json'), 'w'))
print(json.dumps(meta))
