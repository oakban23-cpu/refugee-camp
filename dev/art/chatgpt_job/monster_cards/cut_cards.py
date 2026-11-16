"""ตัดภาพการ์ดจาก ChatGPT → การ์ดสำเร็จรูป (ภาพ+กรอบ ไม่มีชื่อ) 384×512 + หลังการ์ด
ใช้: python3 -I cut_cards.py <โฟลเดอร์ภาพที่แตก> <โฟลเดอร์ผลลัพธ์>"""
import sys, os, json
from PIL import Image, ImageDraw
import numpy as np

D, O = sys.argv[1], sys.argv[2]
os.makedirs(O, exist_ok=True)
CW, CH = 384, 512
A1 = ['mum', 'sco', 'anu', 'shd', 'hnd', 'knt', 'wcl', 'wtr']
A2 = ['wtu', 'wko', 'wwf', 'whp', 'wkn', 'aze', 'wtp', 'phr']
MVP = {'aze', 'wtp', 'phr'}
DESERT = {'mum', 'sco', 'anu'}


def cell(im, i):
    x, y = (i % 4) * CW, (i // 4) * CH
    return im.crop((x, y, x + CW, y + CH))


def clean_alpha(a):
    a = a.astype(np.int32)
    a[a < 24] = 0
    a[a >= 200] = 255
    return a.astype(np.uint8)


fr = Image.open(os.path.join(D, 'cards_frames.png')).convert('RGBA')
info = {}
frames = {}
for k in range(3):
    c = np.array(cell(fr, k))
    a = clean_alpha(c[..., 3])
    rgb = c[..., :3].astype(np.int32)
    # ถ้าพื้นนอกกรอบทึบ (เทาเข้ม) → ทำให้ใส: พิกเซลที่ติดขอบภาพและมืด/ใส ถือเป็นด้านนอก
    gc = rgb[256, 2]  # สีพื้นนอกกรอบ (ถ้าทึบ)
    near = np.abs(rgb - gc).sum(axis=2) < 18
    bg = ((a < 20) | near).astype(np.uint8) * 255
    m = Image.fromarray(bg, 'L')
    # flood จากขอบทั้งหมด หาด้านนอก
    outside = Image.new('L', m.size, 0)
    mm = m.copy()
    for (sx, sy) in [(0, 0), (CW - 1, 0), (0, CH - 1), (CW - 1, CH - 1), (CW // 2, 0), (CW // 2, CH - 1), (0, CH // 2), (CW - 1, CH // 2)]:
        if mm.getpixel((sx, sy)) == 255:
            ImageDraw.floodfill(mm, (sx, sy), 128)
    out = np.array(mm) == 128
    a[out] = 0
    # หน้าต่าง: พิกเซลใสที่ไม่ใช่ด้านนอก (รูกลางกรอบ)
    hole = (a < 20) & (~out)
    ys, xs = np.nonzero(hole)
    win = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())) if len(xs) else None
    # ขอบเขตการ์ดทั้งใบ
    ys2, xs2 = np.nonzero(a > 0)
    box = (int(xs2.min()), int(ys2.min()), int(xs2.max()), int(ys2.max()))
    c[..., 3] = a
    frames[k] = (c, hole, out)
    info[k + 1] = {'win': win, 'box': box}
    print('frame', k + 1, 'window', win, 'card box', box, 'outside px', int(out.sum()))

# หลังการ์ด: ช่อง 4 (ตัดพื้นเทานอกการ์ดออกแบบเดียวกัน)
b = np.array(cell(fr, 3))
brgb = b[..., :3].astype(np.int32)
ba = clean_alpha(b[..., 3])
bnear = np.abs(brgb - brgb[2, 2]).sum(axis=2) < 18
m = Image.fromarray((((ba < 20) | bnear).astype(np.uint8) * 255), 'L')
for (sx, sy) in [(0, 0), (CW - 1, 0), (0, CH - 1), (CW - 1, CH - 1)]:
    if m.getpixel((sx, sy)) == 255:
        ImageDraw.floodfill(m, (sx, sy), 128)
ba[np.array(m) == 128] = 0
b[..., 3] = ba
ys, xs = np.nonzero(ba > 0)
bb = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
Image.fromarray(b).crop(bb).save(os.path.join(O, 'hd-cardb.webp'), quality=88, method=6)
info['back'] = bb
print('back bbox', bb)


def frame_for(cid):
    return 3 if cid in MVP else (1 if cid in DESERT else 2)


for sheet, ids in [('cards_art_01.png', A1), ('cards_art_02.png', A2)]:
    im = Image.open(os.path.join(D, sheet)).convert('RGBA')
    for i, cid in enumerate(ids):
        art = np.array(cell(im, i))
        k = frame_for(cid) - 1
        fc, hole, out = frames[k]
        comp = Image.alpha_composite(Image.fromarray(art), Image.fromarray(fc))
        ca = np.array(comp)
        alpha = np.maximum(fc[..., 3], np.where(hole, 255, 0)).astype(np.uint8)
        alpha[out] = 0
        ca[..., 3] = alpha
        Image.fromarray(ca).save(os.path.join(O, 'hd-card-%s.webp' % cid), quality=86, method=6)
json.dump({str(k): v for k, v in info.items()}, open(os.path.join(O, 'info.json'), 'w'))
print('done')
