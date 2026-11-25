# REFUGEE music synth engine (numpy, offline). All original synthesis, no samples.
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
SR = 44100
RNG = np.random.default_rng(7)

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
NOTE = {'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
def nm(s):
    """'F#4' -> midi"""
    n = NOTE[s[0]]; i = 1
    while i < len(s) and s[i] in '#b':
        n += 1 if s[i] == '#' else -1; i += 1
    return n + 12 * (int(s[i:]) + 1)

class Bus:
    def __init__(self, n):
        self.n = n; self.L = np.zeros(n, np.float32); self.R = np.zeros(n, np.float32); self.sL = np.zeros(n, np.float32); self.sR = np.zeros(n, np.float32)
class Track:
    def __init__(self, bus, pan=0.0, send=0.25, gain=1.0):
        self.b = bus; self.pan = pan; self.send = send; self.gain = gain; self.peak = 0.0
    def add(self, t, y, pan=None):
        p = self.pan if pan is None else max(-1, min(1, pan))
        B = self.b; i = int(round(t * SR)); j = min(B.n, i + len(y))
        if j <= i or i < 0: return
        y = (y[:j - i] * self.gain).astype(np.float32)
        self.e = getattr(self, 'e', 0.0) + float((y.astype(np.float64) ** 2).sum())
        a = (p + 1) * np.pi / 4; l = y * np.cos(a); r = y * np.sin(a)
        B.L[i:j] += l; B.R[i:j] += r; B.sL[i:j] += l * self.send; B.sR[i:j] += r * self.send

def tvec(d): return np.arange(int(d * SR)) / SR

def adsr(n, a, d, s, r, hold):
    """hold = seconds until release starts"""
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-4), s + (1 - s) * np.exp(-(t - a) / max(d, 1e-4)))
    rel = t > hold
    if rel.any():
        lv = e[min(n - 1, int(hold * SR))]
        e[rel] = lv * np.exp(-(t[rel] - hold) / max(r, 1e-4) * 3.0)
    return e

def wavetable(amps, N=4096):
    ph = np.arange(N) / N * 2 * np.pi
    y = np.zeros(N)
    for k, a in enumerate(amps, 1):
        if a: y += a * np.sin(k * ph + (0.3 * k * k))
    return y / (np.abs(y).max() + 1e-9)

def wt_play(tab, freq):
    """freq: per-sample frequency array"""
    N = len(tab)
    ph = (np.cumsum(freq) / SR + RNG.random()) % 1.0
    x = ph * N; i = x.astype(np.int64); fr = x - i
    return tab[i % N] * (1 - fr) + tab[(i + 1) % N] * fr

def vib(n, f, rate=5.2, depth=0.004, delay=0.25, cents=0.0):
    t = np.arange(n) / SR
    ramp = np.clip((t - delay) / 0.5, 0, 1)
    return f * 2 ** (cents / 1200) * (1 + depth * ramp * np.sin(2 * np.pi * rate * t + RNG.random() * 6.28))

def lp(y, fc, order=2):
    sos = butter(order, min(fc, SR * 0.45), 'low', fs=SR, output='sos'); return sosfilt(sos, y)
def hp(y, fc, order=2):
    sos = butter(order, fc, 'high', fs=SR, output='sos'); return sosfilt(sos, y)
def bp(y, lo, hi, order=2):
    sos = butter(order, [lo, min(hi, SR * 0.45)], 'band', fs=SR, output='sos'); return sosfilt(sos, y)

# ---------- plucked / struck (additive) ----------
def pluck(m, vel=0.8, dur=None, kind='harp'):
    f = mtof(m)
    if kind == 'harp':
        T60 = float(np.clip(5.0 * (220 / f) ** 0.5, 1.4, 7)); K = 18; pw = 1.1; pos = 0.2; B = 0.00012; nz = 0.012
    elif kind == 'guitar':
        T60 = float(np.clip(3.4 * (196 / f) ** 0.45, 1.0, 5)); K = 18; pw = 1.45; pos = 0.13; B = 0.00008; nz = 0.02
    elif kind == 'pizz':
        T60 = float(np.clip(0.9 * (196 / f) ** 0.3, 0.35, 1.2)); K = 14; pw = 1.5; pos = 0.18; B = 0.00005; nz = 0.015
    elif kind == 'oud':
        T60 = float(np.clip(2.2 * (196 / f) ** 0.4, 0.8, 3.5)); K = 22; pw = 1.0; pos = 0.08; B = 0.00012; nz = 0.03
    elif kind == 'banjo':
        T60 = float(np.clip(1.3 * (196 / f) ** 0.4, 0.5, 2.0)); K = 22; pw = 0.95; pos = 0.06; B = 0.0001; nz = 0.035
    elif kind == 'piano':
        T60 = float(np.clip(7.0 * (262 / f) ** 0.6, 1.5, 12)); K = 22; pw = 1.1; pos = 0.12; B = 0.0004; nz = 0.008
    L = T60 if dur is None else min(T60, dur + 0.35)
    n = int((L + 0.05) * SR); t = np.arange(n) / SR
    y = np.zeros(n)
    bright = 0.55 + 0.45 * min(vel, 1.0)
    for k in range(1, K + 1):
        fk = k * f * np.sqrt(1 + B * k * k)
        if fk > 15000: break
        a = (1 / k ** pw) * abs(np.sin(np.pi * k * pos)) * (bright ** (k - 1) if k > 1 else 1)
        rate = 6.9 / T60 * (1 + 0.28 * (k - 1) ** 1.2)
        if kind == 'piano':
            env = 0.72 * np.exp(-t * rate * 3.2) + 0.28 * np.exp(-t * rate * 0.7)
            ph = RNG.random() * 6.28
            y += a * env * 0.5 * (np.sin(2 * np.pi * fk * t + ph) + np.sin(2 * np.pi * fk * 1.0005 * t + ph + 1))
        else:
            y += a * np.exp(-t * rate) * np.sin(2 * np.pi * fk * t + RNG.random() * 6.28)
    att = np.clip(t / 0.003, 0, 1); y *= att
    # pluck/hammer noise
    nn = int(0.03 * SR); noise = RNG.standard_normal(nn) * np.exp(-np.arange(nn) / SR / 0.006)
    noise = bp(noise, max(200, f * 1.5), min(9000, f * 8)) * nz * (vel ** 1.5) * 8
    y[:nn] += noise
    if dur is not None:  # damp after dur
        rel = t > dur
        y[rel] *= np.exp(-(t[rel] - dur) / 0.12)
    return y * vel * 0.32

def bell(m, vel=0.6, kind='celesta'):
    f = mtof(m)
    if kind == 'celesta':
        P = [(1, 1, 1.6), (2.0, 0.18, 0.7), (3.0, 0.07, 0.4), (4.13, 0.12, 0.28), (5.4, 0.05, 0.18)]
    else:  # glock
        P = [(1, 1, 2.2), (2.76, 0.35, 0.8), (5.40, 0.18, 0.4), (8.93, 0.08, 0.2)]
    n = int(2.6 * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for r, a, T in P:
        if f * r > 16000: continue
        y += a * np.exp(-t * 6.9 / (T * (1.2 if f < 800 else 1))) * np.sin(2 * np.pi * f * r * t + RNG.random() * 6)
    y *= np.clip(t / 0.002, 0, 1)
    return y * vel * 0.22

# ---------- sustained (wavetable) ----------
_tabcache = {}
def tab_for(kind, f):
    key = (kind, int(np.log2(f) * 6))
    if key in _tabcache: return _tabcache[key]
    kmax = max(1, int(15000 / f))
    if kind == 'string':
        amps = [(1 / k) * np.exp(-k * f / 5200) for k in range(1, min(40, kmax) + 1)]
    elif kind == 'string_soft':
        amps = [(1 / k ** 1.15) * np.exp(-k * f / 3000) for k in range(1, min(30, kmax) + 1)]
    elif kind == 'brass':
        amps = [(1 / k ** 0.7) * np.exp(-k * f / 2300) for k in range(1, min(30, kmax) + 1)]
    elif kind == 'horn':
        amps = [(1 / k ** 0.9) * np.exp(-k * f / 1400) for k in range(1, min(24, kmax) + 1)]
    elif kind == 'choir':
        def form(x):
            return (np.exp(-((x - 730) / 160) ** 2) + 0.55 * np.exp(-((x - 1150) / 170) ** 2) + 0.28 * np.exp(-((x - 2650) / 260) ** 2) + 0.06)
        amps = [(1 / k ** 0.6) * form(k * f) for k in range(1, min(30, kmax) + 1)]
    elif kind == 'flute':
        amps = [1, 0.4, 0.18, 0.1, 0.06, 0.035, 0.02][:kmax]
    elif kind == 'ocarina':
        amps = [1, 0.06, 0.035, 0.01][:kmax]
    elif kind == 'bass':
        amps = [(1 / k) * np.exp(-k * f / 700) for k in range(1, min(30, kmax) + 1)]
    elif kind == 'fiddle':
        amps = [(1 / k ** 0.85) * (np.exp(-((k * f - 2900) / 900) ** 2) * 0.6 + np.exp(-k * f / 2500)) for k in range(1, min(36, kmax) + 1)]
    tb = wavetable(amps); _tabcache[key] = tb; return tb

def sustain(m, dur, kind='string', vel=0.6, voices=1, spread=8.0, a=0.4, r=0.6, vrate=5.3, vdepth=0.003, vdelay=0.2, pan_spread=0.0):
    """returns list of (y, pan_offset)"""
    f = mtof(m); n = int((dur + r * 1.6 + 0.05) * SR)
    out = []
    for v in range(voices):
        c = 0 if voices == 1 else (v / (voices - 1) * 2 - 1) * spread + RNG.normal() * 1.2
        fr = vib(n, f, vrate * (1 + RNG.normal() * 0.06), vdepth, vdelay, c)
        y = wt_play(tab_for(kind, f), fr)
        out.append((y, 0 if voices == 1 else (v / (voices - 1) * 2 - 1) * pan_spread))
    env = adsr(n, a, max(0.3, dur * 0.6), 0.78, r, dur) * vel / max(1, voices) ** 0.6
    return [(y * env, p) for y, p in out]

def wind(m, dur, kind='flute', vel=0.6, a=0.06, r=0.14, breath=0.05, vdelay=0.28, vdepth=0.0045):
    f = mtof(m); n = int((dur + r * 1.6 + 0.05) * SR)
    fr = vib(n, f, 5.0, vdepth, vdelay)
    # tiny pitch scoop on attack
    t = np.arange(n) / SR; fr = fr * (1 - 0.006 * np.exp(-t / 0.04))
    y = wt_play(tab_for(kind, f), fr)
    env = adsr(n, a, 0.6, 0.86, r, dur)
    # gentle swell for long notes
    if dur > 0.8: env *= 0.9 + 0.1 * np.clip(t / dur, 0, 1)
    nz = RNG.standard_normal(n); nz = bp(nz, f * 0.9, f * 3.2) * breath
    chiff = np.exp(-t / 0.03) * 0.9 + 0.25
    y = y + nz * chiff
    return y * env * vel * 0.5

# ---------- percussion ----------
def timpani(m, vel=0.6):
    f = mtof(m); n = int(2.2 * SR); t = np.arange(n) / SR
    fr = f * (1 + 0.02 * np.exp(-t / 0.08))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    y = (np.sin(ph) * np.exp(-t / 0.65) + 0.5 * np.sin(1.5 * ph) * np.exp(-t / 0.35) + 0.3 * np.sin(1.99 * ph) * np.exp(-t / 0.3))
    nz = lp(RNG.standard_normal(n), 900) * np.exp(-t / 0.02) * 0.6
    return (y + nz) * vel * 0.4

def swell(dur, vel=0.4):
    n = int((dur + 1.4) * SR); t = np.arange(n) / SR
    env = np.where(t < dur, (t / dur) ** 2.2, np.exp(-(t - dur) / 0.45))
    y = hp(RNG.standard_normal(n), 4500) * env
    return y * vel * 0.18

def shaker(vel=0.3):
    n = int(0.09 * SR); t = np.arange(n) / SR
    env = np.clip(t / 0.012, 0, 1) * np.exp(-t / 0.025)
    return bp(RNG.standard_normal(n), 5000, 11000) * env * vel * 0.35

def framedrum(vel=0.5, low=True):
    n = int(0.6 * SR); t = np.arange(n) / SR
    f0 = 95 if low else 180
    ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.5 * np.exp(-t / 0.03))) / SR
    y = np.sin(ph) * np.exp(-t / (0.22 if low else 0.1))
    y += bp(RNG.standard_normal(n), 300, 2500) * np.exp(-t / 0.015) * 0.4
    return y * vel * 0.45

def crackle(dur, rate=7.0, vel=0.2):
    n = int(dur * SR); y = np.zeros(n)
    k = RNG.poisson(rate * dur)
    for _ in range(k):
        i = RNG.integers(0, n - 2000); L = RNG.integers(80, 900)
        b = RNG.standard_normal(L) * np.exp(-np.arange(L) / (L / 4)) * (RNG.random() ** 2)
        y[i:i + L] += b
    y = hp(y, 1500) * 0.9
    rumble = lp(RNG.standard_normal(n), 220) * 0.18 * (1 + 0.3 * np.sin(np.arange(n) / SR * 0.7))
    return (y + rumble) * vel

def crickets(dur, vel=0.03):
    n = int(dur * SR); t = np.arange(n) / SR
    chirp = (np.sin(2 * np.pi * 4.3 * t) > 0.55) * (np.sin(2 * np.pi * 0.37 * t + 1) > -0.2)
    c = np.sin(2 * np.pi * 4600 * t) * lp(chirp.astype(float), 60)
    c2 = np.sin(2 * np.pi * 5200 * t) * lp((np.sin(2 * np.pi * 3.7 * t + 2) > 0.6).astype(float), 60) * (np.sin(2 * np.pi * 0.23 * t) > 0)
    return (c + c2 * 0.7) * vel

# ---------- reverb ----------
def make_ir(rt_low=2.6, rt_mid=2.2, rt_hi=1.2, length=3.6, pre=0.022, er=True):
    n = int(length * SR); t = np.arange(n) / SR
    chans = []
    for ch in range(2):
        nz = RNG.standard_normal(n)
        lo = lp(nz, 400) * np.exp(-t * 6.9 / rt_low)
        mi = bp(nz, 400, 3500) * np.exp(-t * 6.9 / rt_mid)
        hi = hp(nz, 3500) * np.exp(-t * 6.9 / rt_hi) * 0.6
        ir = lo + mi + hi
        ir *= np.clip(t / 0.04, 0, 1)  # soft onset (diffuse)
        p = int(pre * SR); ir = np.concatenate([np.zeros(p), ir])[:n]
        if er:
            for d, g in [(0.011, .5), (0.019, .35), (0.027, .3), (0.041, .22), (0.053, .18)]:
                j = int((d + (0.003 if ch else 0)) * SR); ir[j] += g * (1 if RNG.random() > .5 else -1) * 3
        chans.append(ir / np.sqrt((ir ** 2).sum()))
    return chans

def mixdown(bus, ir, wet=1.0):
    n = bus.n
    wL = fftconvolve(bus.sL.astype(np.float64), ir[0])[:n]; wR = fftconvolve(bus.sR.astype(np.float64), ir[1])[:n]
    L = bus.L + wet * (wL * 0.9 + wR * 0.1); R = bus.R + wet * (wR * 0.9 + wL * 0.1)
    return np.stack([L, R]).astype(np.float64)

def fold_loop(y, Lsamp, margin):
    """y: stereo (2,n) with n>Lsamp; fold everything past the loop end onto the start (steady-state loop),
    then return [last margin] + loop + [first margin] so any window of length L in it loops seamlessly"""
    out = y[:, :Lsamp].copy(); k = Lsamp
    while k < y.shape[1]:
        seg = y[:, k:k + Lsamp]; out[:, :seg.shape[1]] += seg; k += Lsamp
    m = int(margin * SR)
    return np.concatenate([out[:, -m:], out, out[:, :m]], axis=1)

def master(y, target_peak=0.89):
    # gentle low cut + soft saturation limiter
    y = np.stack([hp(c, 45) for c in y])
    y = y + 0.6 * np.stack([hp(c, 4200) for c in y])
    pk = np.abs(y).max(); y = y / pk * 1.15
    y = np.tanh(y * 1.05) / np.tanh(1.05)
    y = y / np.abs(y).max() * target_peak
    return y
