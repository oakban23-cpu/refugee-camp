# REFUGEE v662 skill sound bank – all synthesized (numpy), rendered offline, packed into one mp3 "sprite"
import sys, json, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from syn import make_ir, SR
R = np.random.default_rng(662)

def T(d): return np.arange(int(d * SR)) / SR
def N(d): return R.standard_normal(int(d * SR))
def sos(kind, f, q=1.0):
    f = np.clip(f, 25, SR * 0.45)
    if kind == 'bp':
        bw = f / q; lo = max(20, f - bw / 2); hi = min(SR * 0.45, f + bw / 2)
        return butter(2, [lo, hi], 'band', fs=SR, output='sos')
    return butter(2, f, 'low' if kind == 'lp' else 'high', fs=SR, output='sos')
def filt(x, kind, f, q=1.0): return sosfilt(sos(kind, f, q), x)
def tvf(x, kind, f0, f1, q=1.0, curve=1.0, blk=256):
    """time-varying filter: cutoff sweeps f0→f1 (exponential)"""
    n = len(x); y = np.zeros(n); zi = None
    for i in range(0, n, blk):
        u = (i / max(1, n - 1)) ** curve; f = f0 * (f1 / f0) ** u
        s = sos(kind, f, q)
        if zi is None or zi.shape != (s.shape[0], 2): zi = np.zeros((s.shape[0], 2))
        y[i:i + blk], zi = sosfilt(s, x[i:i + blk], zi=zi)
    return y
def env(n, a, d, shape='exp'):
    t = np.arange(n) / SR
    up = np.clip(t / max(a, 1e-4), 0, 1)
    if shape == 'exp': return up * np.exp(-np.maximum(0, t - a) / max(d, 1e-4))
    return up * np.clip(1 - np.maximum(0, t - a) / max(d, 1e-4), 0, 1)
def bell_env(n, peak, width):
    t = np.arange(n) / SR; return np.exp(-((t - peak) / width) ** 2)
def sweep(d, f0, f1, curve=1.0, wave='sin'):
    t = T(d); u = (t / d) ** curve; f = f0 * (f1 / f0) ** u
    ph = 2 * np.pi * np.cumsum(f) / SR + R.random() * 6.28
    if wave == 'sin': return np.sin(ph)
    if wave == 'tri': return 2 / np.pi * np.arcsin(np.sin(ph))
    if wave == 'saw':
        y = np.zeros_like(t)
        for k in range(1, 14): y += np.sin(k * ph) / k * (k * f.mean() < 12000)
        return y * 0.6
def ring(freqs, amps, decs, d):
    t = T(d); y = np.zeros_like(t)
    for f, a, dc in zip(freqs, amps, decs):
        if f < 16000: y += a * np.exp(-t / dc) * np.sin(2 * np.pi * f * t + R.random() * 6)
    return y * np.clip(t / 0.0015, 0, 1)
def crackles(d, n, lo=1500, hi=9000, amp=1.0, decay_spread=(0.002, 0.01), dist='uniform'):
    L = int(d * SR); y = np.zeros(L)
    for _ in range(n):
        i = int((R.random() ** (2 if dist == 'early' else 1)) * (L - 600)); m = R.integers(60, 500)
        b = R.standard_normal(m) * np.exp(-np.arange(m) / SR / R.uniform(*decay_spread)) * R.random() ** 1.5
        y[i:i + m] += b
    return filt(filt(y, 'hp', lo), 'lp', hi) * amp
def sat(x, k=1.5): return np.tanh(x * k) / np.tanh(k)
def punch(y, g=0.8, lo=170, hi=1400):
    return filt(filt(np.tanh(y * 5), 'hp', lo), 'lp', hi) * g

class Clip:
    def __init__(self, d): self.L = np.zeros(int(d * SR)); self.R = np.zeros(int(d * SR))
    def add(self, y, t=0.0, pan=0.0, g=1.0):
        i = int(t * SR); j = min(len(self.L), i + len(y)); y = y[:j - i] * g
        if np.ndim(pan) == 0:
            a = (pan + 1) * np.pi / 4; self.L[i:j] += y * np.cos(a); self.R[i:j] += y * np.sin(a)
        else:
            p = np.interp(np.arange(j - i), np.linspace(0, j - i, len(pan)), pan); a = (p + 1) * np.pi / 4
            self.L[i:j] += y * np.cos(a); self.R[i:j] += y * np.sin(a)
    def st(self): return np.stack([self.L, self.R])

IRS = {'s': make_ir(0.7, 0.6, 0.35, 1.0, pre=0.008), 'm': make_ir(1.4, 1.2, 0.7, 2.0, pre=0.012), 'l': make_ir(2.6, 2.2, 1.3, 3.2, pre=0.02)}
HEAVY = set()
def finish(c, rv='m', wet=0.25, tail=0.6, heavy=False):
    y = c.st(); n = y.shape[1]; ir = IRS[rv]
    pad = np.zeros((2, int(tail * SR))); y = np.concatenate([y, pad], 1)
    w0 = fftconvolve(y[0], ir[0])[:y.shape[1]]; w1 = fftconvolve(y[1], ir[1])[:y.shape[1]]
    y = y + wet * np.stack([w0 * .9 + w1 * .1, w1 * .9 + w0 * .1])
    y = np.stack([filt(ch, 'hp', 35) for ch in y])
    lo = np.stack([filt(ch, 'lp', 140) for ch in y]); y = (y - lo) + 0.5 * lo   # less sub (phones can't play it anyway)
    if heavy:
        pk = np.abs(y).max(); y = np.tanh(y / pk * 2.2) / np.tanh(2.2)          # gentle limiter → louder body
    # trim trailing silence (-60 dB), fade 20 ms
    a = np.abs(y).max(0); thr = a.max() * 0.0032; idx = np.where(a > thr)[0]; end = min(y.shape[1], idx[-1] + int(0.02 * SR)) if len(idx) else y.shape[1]
    y = y[:, :end]; f = min(int(0.02 * SR), end); y[:, -f:] *= np.linspace(1, 0, f)
    return y / (np.abs(y).max() + 1e-9) * 0.89

S = {}
def reg(name, fn, var=1):
    for v in range(var): S[name if var == 1 else f'{name}{v}'] = fn(v)

# ---------- melee / physical ----------
def swing(v):
    d = 0.34 + 0.03 * v; c = Clip(d); n = len(T(d))
    nz = tvf(N(d), 'bp', 500 + 120 * v, 3200 + 300 * v, q=1.6, curve=0.6) * bell_env(n, 0.11 + 0.01 * v, 0.055)
    c.add(nz, 0, np.linspace(-0.55, 0.55, 8) * (1 if v % 2 else -1), 1.0)
    c.add(filt(N(d), 'hp', 6000) * bell_env(n, 0.12, 0.03), 0, 0, 0.25)
    c.add(ring([2350 + 90 * v, 3720, 5160], [0.5, 0.3, 0.2], [0.09, 0.07, 0.05], 0.3), 0.1, 0.2, 0.18)
    return finish(c, 's', 0.18, 0.25)
reg('swing', swing, 3)
def hit(v):
    d = 0.3; c = Clip(d); n = len(T(d))
    b = sweep(0.16, 135 + 15 * v, 52) * env(len(T(.16)), 0.002, 0.05); c.add(b, 0, 0, 0.8); c.add(punch(b, 0.7), 0, 0, 1.0)
    c.add(filt(N(.08), 'lp', 2600 + 400 * v) * env(len(T(.08)), 0.001, 0.018), 0, 0, 0.9)
    c.add(filt(N(.012), 'hp', 3000), 0, 0, 0.5)
    c.add(filt(N(.12), 'bp', 900, 1.2) * env(len(T(.12)), 0.003, 0.03), 0.004, 0.15, 0.35)
    return finish(c, 's', 0.12, 0.2, heavy=True)
reg('hit', hit, 3)
def crit(v):
    d = 0.6; c = Clip(d)
    b = sat(sweep(0.32, 110, 38) * env(len(T(.32)), 0.002, 0.11), 2); c.add(b, 0, 0, 0.75); c.add(punch(b, 0.8), 0, 0, 1.0)
    c.add(tvf(N(.22), 'lp', 5000, 400) * env(len(T(.22)), 0.001, 0.05), 0, 0, 0.9)
    c.add(filt(N(.1), 'bp', 1600, 0.9) * env(len(T(.1)), 0.002, 0.03), 0.005, -0.2, 0.6)
    c.add(ring([1480, 2310, 3530, 4690], [0.6, 0.4, 0.3, 0.2], [0.35, 0.25, 0.18, 0.12], 0.6), 0.008, 0.25, 0.22)
    return finish(c, 'm', 0.2, 0.4, heavy=True)
reg('crit', crit, 2)
def spin(v):
    d = 0.75; c = Clip(d); n = len(T(d))
    for i, (t0, f) in enumerate([(0, 700), (0.17, 900), (0.34, 1150)]):
        dd = 0.34; nn = len(T(dd))
        c.add(tvf(N(dd), 'bp', f * 0.6, f * 3, q=1.8, curve=0.7) * bell_env(nn, 0.12, 0.06), t0, [-0.7, 0.7] if i % 2 == 0 else [0.7, -0.7], 0.9)
    c.add(filt(N(d), 'lp', 600) * bell_env(n, 0.35, 0.2), 0, 0, 0.35)
    c.add(ring([2900, 4400, 6100], [0.5, 0.3, 0.2], [0.2, 0.15, 0.1], 0.6), 0.45, 0, 0.12)
    return finish(c, 's', 0.2, 0.3)
reg('spin', spin)
def impact(v):
    d = 1.2; c = Clip(d)
    b = sat(sweep(0.8, 82, 30, 0.6) * env(len(T(.8)), 0.003, 0.28), 2.2); c.add(b, 0, 0, 0.7); c.add(punch(b, 0.85), 0, 0, 1.0)
    c.add(tvf(N(0.7), 'lp', 4200, 160, curve=0.5) * env(len(T(.7)), 0.002, 0.16), 0, 0, 0.85)
    c.add(filt(N(.02), 'hp', 2500) * env(len(T(.02)), 0.0005, 0.005), 0, 0, 0.8)
    c.add(crackles(0.9, 26, 900, 6000, 1.0, dist='early'), 0.04, 0.3, 0.45)
    c.add(crackles(0.9, 20, 900, 6000, 1.0, dist='early'), 0.05, -0.3, 0.45)
    return finish(c, 'm', 0.3, 0.8, heavy=True)
reg('impact', impact)
def cracks(v):
    d = 1.0; c = Clip(d); n = len(T(d))
    c.add(crackles(0.55, 90, 250, 3200, 1.0, (0.003, 0.02), 'early'), 0, -0.2, 1.0)
    c.add(crackles(0.55, 70, 250, 3200, 1.0, (0.003, 0.02), 'early'), 0.02, 0.2, 1.0)
    c.add(filt(N(d), 'lp', 140) * env(n, 0.02, 0.35), 0, 0, 0.6)
    b = sweep(0.5, 60, 35) * env(len(T(.5)), 0.003, 0.2); c.add(b, 0, 0, 0.4); c.add(punch(b, 0.5), 0, 0, 1.0)
    return finish(c, 'm', 0.22, 0.6, heavy=True)
reg('cracks', cracks)
def shock(v):
    d = 0.8; c = Clip(d); n = len(T(d))
    b = sweep(0.5, 64, 34) * env(len(T(.5)), 0.004, 0.18); c.add(b, 0, 0, 0.6); c.add(punch(b, 0.7), 0, 0, 1.0)
    c.add(tvf(N(0.6), 'bp', 300, 2400, q=0.9, curve=0.6) * bell_env(len(T(.6)), 0.12, 0.1), 0, [-0.8, 0.8], 1.1)
    c.add(tvf(N(0.6), 'bp', 320, 2600, q=0.9, curve=0.6) * bell_env(len(T(.6)), 0.13, 0.1), 0, [0.8, -0.8], 1.1)
    return finish(c, 'm', 0.3, 0.6, heavy=True)
reg('shock', shock)
def roar(v):
    d = 1.3; c = Clip(d); n = len(T(d)); t = T(d)
    f = 92 * (1 + 0.04 * np.sin(2 * np.pi * 7 * t)) * (1 + 0.25 * np.exp(-t / 0.15))
    ph = 2 * np.pi * np.cumsum(f) / SR; saw = sum(np.sin(k * ph) / k for k in range(1, 30))
    gr = filt(filt(saw, 'bp', 700, 1.5), 'lp', 2400) + 0.6 * filt(saw, 'bp', 1300, 2.5)
    gr *= env(n, 0.06, 0.5) * (0.8 + 0.2 * np.abs(np.sin(2 * np.pi * 13 * t)))
    c.add(sat(gr, 2), 0, 0, 0.8)
    fire = filt(N(d), 'lp', 1500) * (0.6 + 0.4 * filt(np.abs(N(d)), 'lp', 25) * 3) * env(n, 0.08, 0.5)
    c.add(fire, 0, [-0.4, 0.4], 0.6)
    c.add(crackles(d, 30, 2000, 8000, 0.5), 0.1, 0, 0.5)
    return finish(c, 'm', 0.28, 0.6, heavy=True)
reg('roar', roar)
def dome(v):
    d = 1.6; c = Clip(d); n = len(T(d)); t = T(d)
    for f, p in [(440, -0.4), (660, 0.4), (990, 0), (1320, 0.2)]:
        y = sweep(d, f * 0.8, f, 0.3) * env(n, 0.25, 0.7) * (0.75 + 0.25 * np.sin(2 * np.pi * 6 * t + p * 3))
        c.add(y, 0, p, 0.25)
    c.add(ring([1760, 2640, 3960, 5290], [0.5, 0.35, 0.25, 0.15], [0.9, 0.6, 0.4, 0.3], 1.4), 0.02, 0, 0.35)
    c.add(filt(N(d), 'hp', 6000) * env(n, 0.3, 0.5), 0, 0, 0.12)
    return finish(c, 'l', 0.35, 1.2)
reg('dome', dome)
def claw(v):
    d = 0.35; c = Clip(d)
    for i in range(3):
        dd = 0.06; c.add(tvf(N(dd), 'bp', 5200, 1800, q=2.5) * env(len(T(dd)), 0.002, 0.02), 0.045 * i, -0.4 + 0.4 * i, 0.9)
    c.add(sweep(0.12, 150, 70) * env(len(T(.12)), 0.002, 0.04), 0.09, 0, 0.5)
    return finish(c, 's', 0.15, 0.25, heavy=True)
reg('claw', claw)
# ---------- mage ----------
def fire_boom(v):
    d = 1.6; c = Clip(d); n = len(T(d))
    c.add(tvf(N(1.0), 'lp', 2200, 120, curve=0.5) * env(len(T(1.0)), 0.012, 0.3), 0, 0, 1.0)
    b = sat(sweep(0.7, 70, 30) * env(len(T(.7)), 0.006, 0.25), 2); c.add(b, 0, 0, 0.6); c.add(punch(b, 0.8), 0, 0, 1.0)
    c.add(filt(N(.03), 'hp', 2000) * env(len(T(.03)), 0.001, 0.008), 0, 0, 0.5)
    c.add(crackles(1.4, 45, 1800, 9000, 1.0), 0.15, 0.35, 0.35)
    c.add(crackles(1.4, 45, 1800, 9000, 1.0), 0.15, -0.35, 0.35)
    c.add(filt(N(d), 'lp', 900) * env(n, 0.15, 0.6) * 0.5, 0, 0, 0.6)
    return finish(c, 'm', 0.28, 0.8, heavy=True)
reg('fire_boom', fire_boom)
def fire_fly(v):
    d = 0.8; c = Clip(d); n = len(T(d)); t = T(d)
    fl = 0.65 + 0.35 * np.sin(2 * np.pi * 17 * t + 1)
    c.add(tvf(N(d), 'lp', 500, 3000, curve=1.6) * bell_env(n, 0.55, 0.22) * fl, 0, [0.7, -0.5], 1.0)
    c.add(sweep(d, 140, 90) * bell_env(n, 0.55, 0.2), 0, 0, 0.35)
    return finish(c, 's', 0.2, 0.3, heavy=True)
reg('fire_fly', fire_fly)
def flame(v):
    d = 1.5; c = Clip(d); n = len(T(d)); t = T(d)
    fl = 0.55 + 0.45 * filt(np.abs(N(d)), 'lp', 18) * 3.5
    c.add(filt(N(d), 'lp', 1100) * env(n, 0.12, 0.7) * fl, 0, [-0.3, 0.3], 1.0)
    c.add(tvf(N(.6), 'bp', 300, 2600, q=1.2) * env(len(T(.6)), 0.08, 0.2), 0, 0, 0.5)
    c.add(filt(N(d), 'lp', 120) * env(n, 0.1, 0.6), 0, 0, 1.2)
    c.add(crackles(d, 40, 2200, 9000, 1.0), 0.05, 0, 0.35)
    return finish(c, 'm', 0.25, 0.6)
reg('flame', flame)
def ice(v):
    d = 1.0; c = Clip(d)
    c.add(filt(N(.03), 'hp', 3500) * env(len(T(.03)), 0.0005, 0.006), 0, 0, 0.9)
    c.add(tvf(N(.3), 'hp', 6000, 2500) * env(len(T(.3)), 0.002, 0.06), 0, 0, 0.5)
    for i in range(34):
        f = R.uniform(2400, 7400); t0 = (R.random() ** 1.8) * 0.5
        c.add(ring([f, f * 1.47, f * 2.13], [1, 0.5, 0.3], [R.uniform(0.04, 0.22)] * 3, 0.4), t0, R.uniform(-0.8, 0.8), 0.09 * (1 - t0))
    c.add(sweep(0.2, 300, 120) * env(len(T(.2)), 0.002, 0.05), 0, 0, 0.6)
    c.add(filt(N(.15), 'bp', 1800, 1) * env(len(T(.15)), 0.001, 0.03), 0, 0, 0.6)
    return finish(c, 'm', 0.3, 0.6)
reg('ice', ice)
def frost(v):
    d = 1.4; c = Clip(d); n = len(T(d))
    c.add(tvf(N(d), 'hp', 2500, 7500, curve=0.6) * env(n, 0.05, 0.4), 0, [-0.6, 0.6], 0.7)
    c.add(tvf(N(.8), 'bp', 400, 3000, q=1.2) * bell_env(len(T(.8)), 0.15, 0.12), 0, 0, 0.6)
    for i, f in enumerate([1319, 1976, 2637, 3520]):
        c.add(ring([f, f * 2.76], [1, 0.3], [0.7, 0.3], 1.2), 0.05 + i * 0.06, -0.5 + i * 0.33, 0.14)
    return finish(c, 'l', 0.35, 1.0)
reg('frost', frost)
def zap(v):
    d = 1.5; c = Clip(d); n = len(T(d)); t = T(d)
    c.add(filt(N(.012), 'hp', 1200) * env(len(T(.012)), 0.0002, 0.003), 0, 0, 0.3)
    dz = 0.3; tz = T(dz); f = 70 * (1 + 0.6 * filt(N(dz), 'lp', 60) * 4)
    ph = 2 * np.pi * np.cumsum(np.abs(f)) / SR; bz = sum(np.sin(k * ph) / k for k in range(1, 40))
    c.add(filt(bz, 'bp', 2200, 0.6) * env(len(tz), 0.001, 0.08) * (0.6 + 0.4 * (R.random(len(tz)) > 0.5)), 0.003, 0, 1.0)
    c.add(punch(filt(N(.5), 'lp', 300) * env(len(T(.5)), 0.01, 0.15), 0.9, 150, 900), 0.02, 0, 1.0)
    c.add(tvf(N(.25), 'hp', 6000, 1800) * env(len(T(.25)), 0.0005, 0.04), 0, 0, 0.7)
    rum = filt(N(d), 'lp', 220) * env(n, 0.08, 0.5) * (0.7 + 0.3 * np.sin(2 * np.pi * 3.1 * t))
    c.add(rum, 0.05, [-0.5, 0.5], 1.0); c.add(punch(rum, 0.5, 120, 600), 0.05, 0, 1.0)
    return finish(c, 'l', 0.25, 0.9, heavy=True)
reg('zap', zap, 2)
def orb(v):
    d = 0.4; c = Clip(d); tz = T(0.22); f = 140 * (1 + 0.5 * filt(N(.22), 'lp', 80) * 4)
    ph = 2 * np.pi * np.cumsum(np.abs(f)) / SR; bz = sum(np.sin(k * ph) / k for k in range(1, 30))
    c.add(filt(bz, 'bp', 2600, 0.7) * env(len(tz), 0.001, 0.06), 0, 0, 0.8)
    c.add(filt(N(.01), 'hp', 2000), 0, 0, 0.6)
    c.add(ring([3100, 4650], [1, 0.4], [0.12, 0.08], 0.3), 0.01, 0.2, 0.25)
    return finish(c, 's', 0.2, 0.3)
reg('orb', orb)
def arcane(v):
    d = 1.6; c = Clip(d); n = len(T(d)); t = T(d)
    for f, p in [(587, -0.5), (880, 0.5), (1175, 0), (1760, 0.3)]:
        c.add(sweep(d, f * 0.5, f, 0.25, 'tri') * env(n, 0.35, 0.6) * (0.8 + 0.2 * np.sin(2 * np.pi * 5 * t)), 0, p, 0.18)
    for i, f in enumerate([1175, 1480, 1760, 2349, 2960, 3520]):
        c.add(ring([f], [1], [0.25], 0.4), 0.05 + i * 0.05, -0.6 + i * 0.24, 0.16)
    c.add(tvf(N(d), 'bp', 600, 4000, q=2, curve=0.4) * env(n, 0.3, 0.5), 0, 0, 0.18)
    return finish(c, 'l', 0.4, 1.2)
reg('arcane', arcane)
def void(v):
    d = 1.6; c = Clip(d); n = len(T(d)); t = T(d)
    b = sweep(d, 70, 38) * env(n, 0.5, 0.6); c.add(b, 0, 0, 0.35); c.add(punch(b, 0.4, 150, 700), 0, 0, 1.0)
    sw = tvf(N(d), 'bp', 200, 1400, q=3, curve=0.5) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t)) * env(n, 0.6, 0.5)
    c.add(sw, 0, np.sin(np.linspace(0, 6 * np.pi, 40)) * 0.8, 1.6)
    c.add(sweep(0.4, 900, 120) * env(len(T(.4)), 0.3, 0.06), d - 0.5, 0, 0.25)
    return finish(c, 'l', 0.35, 1.0, heavy=True)
reg('void', void)
def meteor(v):
    d = 0.9; c = Clip(d); n = len(T(d))
    c.add(sweep(d, 2400, 380, 0.8) * np.clip(T(d) / d, 0, 1) ** 1.5, 0, [0.6, -0.4], 0.25)
    c.add(tvf(N(d), 'lp', 300, 2400, curve=1.5) * np.clip(T(d) / d, 0, 1) ** 2, 0, [0.6, -0.4], 0.8)
    return finish(c, 's', 0.2, 0.2)
reg('meteor', meteor)
def mshot(v):
    d = 0.45; c = Clip(d); n = len(T(d))
    c.add(tvf(N(.3), 'bp', 900, 3800, q=2) * env(len(T(.3)), 0.01, 0.08), 0, [-0.3, 0.3], 0.6)
    c.add(sweep(.25, 600 + 80 * v, 1400 + 120 * v, 0.5, 'tri') * env(len(T(.25)), 0.005, 0.07), 0, 0, 0.35)
    for i, f in enumerate([2093, 2637, 3136]):
        c.add(ring([f], [1], [0.1], 0.25), 0.03 + i * 0.03, 0.2, 0.12)
    return finish(c, 's', 0.25, 0.35)
reg('mshot', mshot, 2)
# ---------- support / holy ----------
def holy(v):
    d = 2.0; c = Clip(d); n = len(T(d)); t = T(d)
    for i, f in enumerate([1047, 1319, 1568, 2093]):
        c.add(ring([f, f * 2.01, f * 3.02, f * 4.1], [1, 0.35, 0.15, 0.08], [1.2, 0.6, 0.35, 0.2], 1.8), i * 0.07, -0.45 + i * 0.3, 0.22)
    for f in [262, 330, 392, 523]:
        for dt in (-6, 6):
            ff = f * 2 ** (dt / 1200); ph = 2 * np.pi * ff * t * (1 + 0.004 * np.sin(2 * np.pi * 5 * t))
            y = sum((np.exp(-((k * ff - 730) / 170) ** 2) + 0.5 * np.exp(-((k * ff - 1150) / 180) ** 2) + 0.05) / k ** 0.6 * np.sin(k * ph) for k in range(1, 18))
            c.add(y * env(n, 0.35, 0.8), 0, dt / 10, 0.04)
    c.add(filt(N(d), 'hp', 7000) * env(n, 0.2, 0.6), 0, 0, 0.06)
    return finish(c, 'l', 0.4, 1.4)
reg('holy', holy)
def heal(v):
    d = 1.4; c = Clip(d); n = len(T(d))
    for i, f in enumerate([1047, 1319, 1568, 2093, 2637, 3136]):
        tt = T(1.0); y = sum(np.exp(-tt / (0.6 / k)) * np.sin(2 * np.pi * f * k * tt) / k ** 1.3 for k in range(1, 6)) * np.clip(tt / 0.002, 0, 1)
        c.add(y, i * 0.055, -0.5 + i * 0.2, 0.18)
    for i in range(18):
        f = R.uniform(3000, 7000); c.add(ring([f], [1], [0.08], 0.2), 0.2 + R.random() * 0.8, R.uniform(-0.8, 0.8), 0.06)
    return finish(c, 'l', 0.35, 1.0)
reg('heal', heal)
def smite(v):
    d = 1.6; c = Clip(d)
    c.add(sweep(0.26, 3200, 650, 0.6) * env(len(T(.26)), 0.01, 0.2), 0, [0, 0], 0.25)
    c.add(filt(N(.26), 'hp', 5000) * np.linspace(0.2, 1, len(T(.26))), 0, 0, 0.2)
    b = sat(sweep(0.6, 95, 40) * env(len(T(.6)), 0.002, 0.2), 2); c.add(b, 0.25, 0, 0.7); c.add(punch(b, 0.8), 0.25, 0, 1.0)
    c.add(filt(N(.03), 'hp', 2500) * env(len(T(.03)), 0.0005, 0.006), 0.25, 0, 0.7)
    c.add(ring([659, 1318, 1977, 2700, 3520], [1, 0.5, 0.3, 0.2, 0.12], [1.0, 0.6, 0.4, 0.3, 0.2], 1.3), 0.25, 0, 0.35)
    return finish(c, 'l', 0.35, 1.0, heavy=True)
reg('smite', smite)
def godray(v):
    d = 2.4; c = Clip(d); n = len(T(d)); t = T(d)
    for f in [262, 330, 392, 523, 659]:
        for dt in (-8, 0, 8):
            ff = f * 2 ** (dt / 1200); ph = 2 * np.pi * ff * t * (1 + 0.005 * np.sin(2 * np.pi * 5.3 * t + dt))
            y = sum((np.exp(-((k * ff - 800) / 200) ** 2) + 0.45 * np.exp(-((k * ff - 1200) / 200) ** 2) + 0.04) / k ** 0.6 * np.sin(k * ph) for k in range(1, 16))
            c.add(y * env(n, 0.6, 1.0), 0, dt / 12, 0.03)
    for i, f in enumerate([1568, 2093, 2637]):
        c.add(ring([f, f * 2.0], [1, 0.3], [1.0, 0.5], 1.6), 0.3 + i * 0.12, -0.4 + i * 0.4, 0.16)
    return finish(c, 'l', 0.45, 1.6)
reg('godray', godray)
def wings(v):
    d = 1.8; c = Clip(d); n = len(T(d)); t = T(d)
    flut = filt(N(d), 'bp', 1800, 0.8) * (0.5 + 0.5 * np.sin(2 * np.pi * 11 * t)) ** 2 * env(n, 0.2, 0.6)
    c.add(flut, 0, [-0.7, 0.7], 0.5)
    for i, f in enumerate([523, 784, 1047]):
        c.add(sweep(d, f * 0.98, f, 0.5, 'tri') * env(n, 0.4, 0.7), 0, -0.4 + 0.4 * i, 0.12)
    c.add(ring([2093, 3136], [1, 0.5], [1.0, 0.6], 1.4), 0.4, 0, 0.18)
    return finish(c, 'l', 0.4, 1.2)
reg('wings', wings)
# ---------- assassin / dark ----------
def shadow(v):
    d = 0.45; c = Clip(d); n = len(T(d))
    c.add(tvf(N(d), 'lp', 300, 1800, curve=0.5) * bell_env(n, 0.1, 0.06), 0, [0.5 * (1 - 2 * v), -0.5 * (1 - 2 * v)], 1.0)
    sh = sweep(0.22, 5200 + 300 * v, 3800) * env(len(T(.22)), 0.002, 0.06) + 0.5 * sweep(0.22, 7400, 5600) * env(len(T(.22)), 0.002, 0.04)
    c.add(sh, 0.06, 0.2, 0.22)
    c.add(sweep(0.18, 110, 50) * env(len(T(.18)), 0.003, 0.06), 0.06, 0, 0.5)
    return finish(c, 'm', 0.25, 0.4, heavy=True)
reg('shadow', shadow, 2)
def curse(v):
    d = 1.2; c = Clip(d); n = len(T(d)); t = T(d)
    wh = sum(filt(N(d), 'bp', f, 6) * g for f, g in [(600, 1), (1050, 0.7), (2400, 0.4)]) * env(n, 0.3, 0.4) * (0.6 + 0.4 * np.sin(2 * np.pi * 4 * t))
    c.add(wh, 0, [-0.6, 0.6, -0.4], 0.9)
    for f in [110, 116.5, 164.8]:
        c.add(sweep(d, f, f * 0.97, 1, 'saw') * env(n, 0.25, 0.5), 0, 0, 0.12)
    return finish(c, 'l', 0.35, 0.8)
reg('curse', curse)
def moon(v):
    d = 1.6; c = Clip(d); n = len(T(d)); t = T(d)
    for i, f in enumerate([988, 1319, 1661, 1976]):
        y = np.sin(2 * np.pi * f * t + i) * env(n, 0.18, 0.6) * (0.8 + 0.2 * np.sin(2 * np.pi * 4.5 * t + i))
        c.add(y, 0, -0.5 + i * 0.33, 0.14)
    c.add(filt(N(d), 'hp', 5000) * env(n, 0.3, 0.5), 0, 0, 0.08)
    return finish(c, 'l', 0.45, 1.2)
reg('moon', moon)
# ---------- archer / wind ----------
def arrow(v):
    d = 0.4; c = Clip(d); n = len(T(d))
    c.add(filt(N(.03), 'bp', 700, 1.2) * env(len(T(.03)), 0.001, 0.01), 0, -0.2, 0.6)  # string release
    c.add(sweep(.05, 180, 90) * env(len(T(.05)), 0.001, 0.02), 0, -0.2, 0.4)
    wh = filt(N(.32), 'bp', 2800 + 300 * v, 5) * bell_env(len(T(.32)), 0.12, 0.08) + 0.4 * sweep(.32, 3300 + 200 * v, 2900) * bell_env(len(T(.32)), 0.12, 0.07)
    c.add(wh, 0.02, [-0.5, 0.6], 0.6)
    return finish(c, 's', 0.15, 0.25)
reg('arrow', arrow, 2)
def arrows(v):
    d = 1.1; c = Clip(d)
    for i in range(9):
        t0 = i * 0.06 + R.random() * 0.03; ww = 0.35
        c.add(filt(N(ww), 'bp', R.uniform(2400, 3800), 6) * bell_env(len(T(ww)), 0.15, 0.07), t0, R.uniform(-0.8, 0.8), 0.35)
        pp = R.uniform(-0.7, 0.7); c.add(sweep(.08, 220, 90) * env(len(T(.08)), 0.001, 0.025), t0 + 0.3, pp, 0.35); c.add(filt(N(.04), 'bp', 900, 1) * env(len(T(.04)), 0.001, 0.01), t0 + 0.3, pp, 0.35)
    return finish(c, 'm', 0.22, 0.4)
reg('arrows', arrows)
def wind(v):
    d = 1.8; c = Clip(d); n = len(T(d)); t = T(d)
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.9 * t)
    c.add(tvf(N(d), 'bp', 350, 900, q=2.5, curve=1) * env(n, 0.3, 0.8) * (0.6 + 0.4 * lfo), 0, [-0.6, 0.6, -0.6], 1.0)
    c.add(filt(N(d), 'bp', 1500, 8) * env(n, 0.4, 0.7) * lfo, 0, [0.5, -0.5], 0.6)
    c.add(filt(N(d), 'lp', 180) * env(n, 0.2, 0.8), 0, 0, 0.9)
    return finish(c, 'm', 0.25, 0.6)
reg('wind', wind)
def leaf(v):
    d = 0.9; c = Clip(d); n = len(T(d))
    c.add(tvf(N(d), 'bp', 800, 3000, q=1, curve=0.6) * bell_env(n, 0.3, 0.18), 0, [-0.7, 0.7], 0.6)
    c.add(crackles(d, 70, 2000, 7000, 1.0, (0.001, 0.004)), 0, 0, 0.35)
    return finish(c, 's', 0.2, 0.3)
reg('leaf', leaf)
def star(v):
    d = 0.9; c = Clip(d)
    for i, f in enumerate([2093, 3136, 4186]):
        c.add(ring([f, f * 2.0, f * 2.98], [1, 0.3, 0.15], [0.35, 0.2, 0.1], 0.8), i * 0.03, -0.3 + 0.3 * i, 0.25)
    c.add(filt(N(.02), 'hp', 4000), 0, 0, 0.4)
    for i in range(10):
        f = R.uniform(4000, 8000); c.add(ring([f], [1], [0.05], 0.15), 0.05 + R.random() * 0.4, R.uniform(-0.8, 0.8), 0.07)
    return finish(c, 'm', 0.3, 0.6)
reg('star', star)
def beam(v):
    d = 1.2; c = Clip(d); n = len(T(d)); t = T(d)
    c.add(sweep(0.22, 380, 1900, 0.7, 'tri') * np.linspace(0.2, 1, len(T(.22))), 0, 0, 0.35)
    db = 0.8; tb = T(db); ph = 2 * np.pi * 220 * tb; saw = sum(np.sin(k * ph * (1 + 0.003 * np.sin(2 * np.pi * 0.5 * tb * k))) / k for k in range(1, 30))
    c.add(filt(saw, 'bp', 1800, 0.7) * env(len(tb), 0.01, 0.45) + filt(N(db), 'bp', 3000, 1.5) * env(len(tb), 0.01, 0.3) * 0.6, 0.2, [-0.3, 0.3], 0.6)
    b = sat(sweep(0.5, 120, 45) * env(len(T(.5)), 0.002, 0.15), 2); c.add(b, 0.2, 0, 0.45); c.add(punch(b, 0.6), 0.2, 0, 1.0)
    c.add(filt(N(.03), 'hp', 2500), 0.2, 0, 0.5)
    return finish(c, 'm', 0.3, 0.6, heavy=True)
reg('beam', beam)
def mega(v):
    d = 2.6; c = Clip(d); n = len(T(d))
    b = sat(sweep(1.8, 58, 24, 0.5) * env(len(T(1.8)), 0.004, 0.6), 2.5); c.add(b, 0, 0, 0.65); c.add(punch(b, 0.9, 150, 1200), 0, 0, 1.0)
    c.add(tvf(N(1.8), 'lp', 6000, 90, curve=0.45) * env(len(T(1.8)), 0.003, 0.45), 0, [-0.3, 0.3], 1.0)
    c.add(filt(N(.03), 'hp', 1500) * env(len(T(.03)), 0.0005, 0.008), 0, 0, 1.0)
    c.add(crackles(2.0, 60, 800, 6000, 1.0, dist='early'), 0.05, 0.4, 0.5)
    c.add(crackles(2.0, 60, 800, 6000, 1.0, dist='early'), 0.06, -0.4, 0.5)
    c.add(filt(N(d), 'lp', 90) * env(n, 0.05, 0.9), 0, 0, 0.5)
    return finish(c, 'l', 0.35, 1.6, heavy=True)
reg('mega', mega)
def ultsig(v):  # ultimate sigil charge: riser
    d = 1.4; c = Clip(d); n = len(T(d)); u = np.clip(T(d) / d, 0, 1)
    c.add(tvf(N(d), 'bp', 300, 5000, q=2, curve=1.4) * u ** 2, 0, [-0.5, 0.5], 0.6)
    for f in [110, 165, 220]:
        c.add(sweep(d, f, f * 2, 1.4, 'saw') * u ** 1.6, 0, 0, 0.1)
    return finish(c, 'l', 0.3, 0.6)
reg('ultsig', ultsig)

# ---------- pack ----------
names = list(S); gap = int(0.12 * SR); pos = gap; tbl = {}; parts = [np.zeros((2, gap))]
for k in names:
    y = S[k]; tbl[k] = [round(pos / SR, 4), round(y.shape[1] / SR, 4)]
    parts += [y, np.zeros((2, gap))]; pos += y.shape[1] + gap
out = np.concatenate(parts, 1).astype(np.float32)
np.save(sys.argv[1], out); json.dump(tbl, open(sys.argv[2], 'w'), separators=(',', ':'))
print(len(names), 'clips', round(out.shape[1] / SR, 1), 's')
