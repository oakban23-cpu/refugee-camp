"""ตัดสไปรต์นครอัสตราโฉมใหม่ → atlas
   hd-ast1.webp : บ้าน 8 + หอ/ของริมถนน 8 + สวน 8
   hd-ast2.webp : เกาะลอย 8 + ประตูใต้ + ช่วงกำแพง
   hd-astd.webp : ของประดับพื้น 24 (alpha นุ่ม)
   hd-astu.webp : หน้าผาใต้เกาะ (ลบในวงกลม)
   ใช้: python3 -I cut_ast.py <dir ภาพดิบ> <dir ผลลัพธ์>  → พิมพ์ JSON ตาราง f"""
import sys, os, json
import numpy as np
from PIL import Image
D, O = sys.argv[1], sys.argv[2]

def clean(a, soft=False):
    a = a.copy()
    al = a[..., 3].astype(int)
    if soft:
        al[al < 12] = 0
    else:
        al[al < 24] = 0
        al[al >= 200] = 255
    a[..., 3] = al
    return a

def crop(a, pad=2):
    ys, xs = np.nonzero(a[..., 3] > 8)
    x0, x1, y0, y1 = max(0, xs.min() - pad), min(a.shape[1], xs.max() + pad + 1), max(0, ys.min() - pad), min(a.shape[0], ys.max() + pad + 1)
    return a[y0:y1, x0:x1]

def grid(fn, cols, rows, names, sc, soft=False):
    a = np.array(Image.open(os.path.join(D, fn)).convert('RGBA'))
    a = clean(a, soft)
    H, W = a.shape[:2]
    cw, ch = W // cols, H // rows
    out = {}
    for i, n in enumerate(names):
        if not n:
            continue
        c = a[(i // cols) * ch:(i // cols + 1) * ch, (i % cols) * cw:(i % cols + 1) * cw]
        # เก็บเฉพาะก้อนใหญ่ (ตัดเศษเล็กที่หลุดมาจากช่องข้าง ๆ)
        c = crop(c)
        im = Image.fromarray(c, 'RGBA')
        im = im.resize((max(1, round(im.width * sc)), max(1, round(im.height * sc))), Image.LANCZOS)
        out[n] = im
    return out

def pack(pieces, W, name, gap=3):
    items = sorted(pieces.items(), key=lambda kv: -kv[1].height)
    x = y = sh = 0
    pos = {}
    for k, im in items:
        if x + im.width > W:
            x = 0
            y += sh + gap
            sh = 0
        pos[k] = [x, y, im.width, im.height]
        x += im.width + gap
        sh = max(sh, im.height)
    H = y + sh
    at = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for k, im in items:
        at.paste(im, (pos[k][0], pos[k][1]))
    at.save(os.path.join(O, name), quality=86, method=6)
    return pos, (W, H)

P1 = {}
P1.update(grid('houses.png', 4, 2, ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'], .62))
P1.update(grid('walls.png', 4, 2, ['towA', 'towB', 'bast', 'turr', 'bgate', 'lamp', 'flag', 'fount'], .62))
P1.update(grid('gardens.png', 4, 2, ['gbed', 'glong', 'ghedge', 'gpond', 'garch', 'glav', 'ggaz', 'gtree'], .6))
f1, s1 = pack(P1, 1600, 'hd-ast1.webp')

P2 = {}
P2.update(grid('islets.png', 4, 2, ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'ip0', 'ip1'], .62))
g = crop(clean(np.array(Image.open(os.path.join(D, 'gate.png')).convert('RGBA'))))
gi = Image.fromarray(g, 'RGBA')
P2['gate'] = gi.resize((round(gi.width * .72), round(gi.height * .72)), Image.LANCZOS)
w = crop(clean(np.array(Image.open(os.path.join(D, 'wall_segment.png')).convert('RGBA'))), pad=0)
# ช่วงกำแพงต้องกว้างเต็มภาพ (ต่อกันซ้ายขวา) · ตัดเฉพาะแนวตั้ง
wa = np.array(Image.open(os.path.join(D, 'wall_segment.png')).convert('RGBA'))
wa = clean(wa)
ys = np.nonzero(wa[..., 3].max(1) > 8)[0]
wa = wa[ys.min():ys.max() + 1]
wi = Image.fromarray(wa, 'RGBA')
P2['wseg'] = wi.resize((768, round(wi.height * 768 / wi.width)), Image.LANCZOS)
f2, s2 = pack(P2, 1600, 'hd-ast2.webp')

PD = grid('decals.png', 6, 4, ['d%d' % i for i in range(24)], .62, soft=True)
fd, sd = pack(PD, 1024, 'hd-astd.webp')

# หน้าผาใต้เกาะ: ลบในวงกลม (ศูนย์กลาง 768,-48 รัศมี 768) แล้วตัดเฉพาะแถวที่มีของ
u = np.array(Image.open(os.path.join(D, 'island_underside.png')).convert('RGBA'))
u = clean(u)
yy, xx = np.mgrid[0:u.shape[0], 0:u.shape[1]]
inside = np.hypot(xx - 768, yy + 48) < 768 - 6
u[..., 3][inside] = 0
ys = np.nonzero(u[..., 3].max(1) > 8)[0]
u0 = int(ys.min())
u = u[u0:ys.max() + 1]
ui = Image.fromarray(u, 'RGBA')
ui.save(os.path.join(O, 'hd-astu.webp'), quality=84, method=6)
print(json.dumps({'f1': f1, 's1': s1, 'f2': f2, 's2': s2, 'fd': fd, 'sd': sd, 'u': [ui.width, ui.height, u0]}, separators=(',', ':')))
