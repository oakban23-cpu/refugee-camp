"""แก้ลายพื้นที่ ChatGPT ทำมาแบบพลิกกระจก 4 ทิศ → tile ใหม่ที่ต่อกันไร้รอยและไม่สมมาตร
   · หินปูถนน/หญ้า/ฟ้า: image quilting แบบวนรอบ (toroidal) + เส้นตัดต่ำสุด (min-cut) ทุกด้านที่ซ้อน
   · แผ่นหินอ่อนถนนหลวง: ตัดแผ่นหินทีละแผ่นแล้วเรียงใหม่แบบสุ่ม (running bond) ให้แถวต่อกันเป็นวง
   ใช้: python3 -I texfix.py <dir ภาพดิบ> <dir ผลลัพธ์>"""
import sys, os
import numpy as np
from PIL import Image
SRC, OUT = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(653)

def load(n):
    return np.array(Image.open(os.path.join(SRC, n + '.png')).convert('RGB')).astype(np.float32)

def mincut_v(err):
    """เส้นตัดแนวตั้งผ่าน err (H×w) คืนคอลัมน์ต่อแถว"""
    H, w = err.shape
    c = err.copy()
    for y in range(1, H):
        p = c[y - 1]
        l = np.r_[np.inf, p[:-1]]
        r = np.r_[p[1:], np.inf]
        c[y] += np.minimum(np.minimum(l, p), r)
    path = np.zeros(H, int)
    path[-1] = int(np.argmin(c[-1]))
    for y in range(H - 2, -1, -1):
        x = path[y + 1]
        lo, hi = max(0, x - 1), min(w, x + 2)
        path[y] = lo + int(np.argmin(c[y, lo:hi]))
    return path

def quilt(src, N, B, O, valid, K=500, tol=1.12):
    """ทำ texture ขนาด N×N ต่อกันไร้รอยแบบวนรอบ จาก src · valid(y,x)=ตำแหน่งบนซ้ายของแพตช์ที่ใช้ได้"""
    st = B - O
    assert N % st == 0
    n = N // st
    out = np.zeros((N, N, 3), np.float32)
    fill = np.zeros((N, N), bool)
    H, W = src.shape[:2]
    cand = np.array([(y, x) for y in range(0, H - B, 4) for x in range(0, W - B, 4) if valid(y, x)])
    for j in range(n):
        for i in range(n):
            ys = (np.arange(B) + j * st) % N
            xs = (np.arange(B) + i * st) % N
            E = out[np.ix_(ys, xs)]
            F = fill[np.ix_(ys, xs)]
            pick = cand[rng.choice(len(cand), min(K, len(cand)), replace=False)]
            if F.any():
                errs = np.array([(((src[y:y + B, x:x + B] - E) ** 2).sum(2) * F).sum() for y, x in pick])
                m = errs.min()
                ok = np.flatnonzero(errs <= m * tol + 1e-6)
                y, x = pick[rng.choice(ok)]
            else:
                y, x = pick[0]
            P = src[y:y + B, x:x + B]
            e = ((P - E) ** 2).sum(2)
            new = np.ones((B, B), bool)
            # ซ้าย / ขวา / บน / ล่าง ที่มีของเดิม → ตัดตามเส้นต่ำสุด
            if F[:, :O].all():
                p = mincut_v(e[:, :O])
                new &= np.arange(B)[None, :] >= p[:, None]
            if F[:, B - O:].all():
                p = mincut_v(e[:, B - O:]) + B - O
                new &= np.arange(B)[None, :] <= p[:, None]
            if F[:O, :].all():
                p = mincut_v(e[:O, :].T)
                new &= np.arange(B)[:, None] >= p[None, :]
            if F[B - O:, :].all():
                p = mincut_v(e[B - O:, :].T) + B - O
                new &= np.arange(B)[:, None] <= p[None, :]
            new |= ~F
            # ขอบตัดนุ่ม 1px ลดรอยหยัก
            R = np.where(new[..., None], P, E)
            out[np.ix_(ys, xs)] = R
            fill[np.ix_(ys, xs)] = True
    return out

def away(lim, c=512, m=56):
    """ไม่เอาแพตช์ที่คร่อมแกนกระจก (x/y = 512) · ภาพต้นฉบับ 1024"""
    def f(y, x):
        return not (y < c + m and y + lim > c - m) and not (x < c + m and x + lim > c - m)
    return f

def save(a, n, q=86):
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(OUT, n), quality=q, method=6)

def check(a):
    return round(float(np.abs(a[:, 0] - a[:, -1]).mean()), 1), round(float(np.abs(a[0] - a[-1]).mean()), 1), round(float(np.abs(a[:, :a.shape[1] // 2] - a[:, a.shape[1] // 2:][:, ::-1]).mean()), 1)

# --- หินปูถนน / หญ้า / ฟ้า ---
import os as _o
ONLY=_o.environ.get('ONLY')
for name, B, O, N, tol in [('tex_cobble', 160, 40, 960, 1.12), ('tex_lawn', 160, 40, 960, 1.12), ('sky_below', 240, 80, 960, 4.0)]:
    if ONLY and ONLY!=name: continue
    src = load(name)
    t = quilt(src, N, B, O, away(B), tol=tol)
    save(t, 'hd-' + name.replace('tex_', 'tx-').replace('sky_below', 'tx-sky') + '.webp')
    print(name, t.shape, 'seamH/seamV/mirror', check(t))

if ONLY: sys.exit(0)
# --- แผ่นหินอ่อน: ตัดแผ่นแล้วเรียงใหม่ ---
src = load('tex_avenue')
L = src.mean(2)
rows = [80, 161, 242, 323, 403, 484]  # รอยต่อแนวนอนในครึ่งบน (วัดจากภาพ)
slabs = []
for a, b in zip(rows[:-1], rows[1:]):
    band = L[a + 6:b - 6]
    c = band.mean(0)
    jx = [i for i in range(3, 1021) if c[i] < c[i - 3] - 6 and c[i] < c[i + 3] - 6 and c[i] == c[max(0, i - 3):i + 4].min()]
    jx = [x for x in jx if abs(x - 512) > 4]
    for x0, x1 in zip(jx[:-1], jx[1:]):
        if x0 < 512 < x1 or x1 - x0 < 120:
            continue
        s = src[a:b, x0:x1]
        slabs.append(s)
        slabs.append(s[::-1])  # กลับบนล่างก็ยังเป็นแผ่นหินที่ดูเป็นธรรมชาติ
print('slabs', len(slabs), sorted(set(s.shape[1] for s in slabs)))
RH, NR, TW = 80, 12, 1024
tile = np.zeros((RH * NR, TW, 3), np.float32)
for r in range(NR):
    row = []
    w = 0
    while w < TW - 60:
        s = slabs[rng.integers(len(slabs))]
        row.append(s)
        w += s.shape[1]
    k = TW / w
    parts = []
    for s in row:
        nw = max(8, int(round(s.shape[1] * k)))
        parts.append(np.array(Image.fromarray(s.astype(np.uint8)).resize((nw, RH), Image.LANCZOS)).astype(np.float32))
    R = np.concatenate(parts, 1)[:, :TW]
    if R.shape[1] < TW:
        R = np.concatenate([R, parts[0][:, :TW - R.shape[1]]], 1)
    R = np.roll(R, int(rng.integers(TW)) if r % 2 else int(rng.integers(TW // 4)), axis=1)
    tile[r * RH:(r + 1) * RH] = R
save(tile, 'hd-tx-avenue.webp')
print('avenue', tile.shape, check(tile))
