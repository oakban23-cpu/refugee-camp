# shared composition helpers
import numpy as np
from syn import *

Q = {'M': [0, 4, 7], 'm': [0, 3, 7], 'm7': [0, 3, 7, 10], '7': [0, 4, 7, 10], 'sus4': [0, 5, 7], 'sus2': [0, 2, 7], 'M7': [0, 4, 7, 11], 'add9': [0, 4, 7, 14]}

class Song:
    def __init__(self, bpm, beats_per_bar, bars, tail=9.0):
        self.bpm = bpm; self.bpb = beats_per_bar; self.bars = bars
        self.beat = 60.0 / bpm; self.bar = self.beat * beats_per_bar
        self.L = self.bar * bars; self.Ls = int(round(self.L * SR))
        self.bus = Bus(self.Ls + int(tail * SR))
    def t(self, bar, beat=0.0): return bar * self.bar + beat * self.beat
    def hum(self, s=0.008): return float(RNG.normal() * s)

def melody(song, tr, start_bar, notes, fn, gap=0.92, vel=0.7, accent=None, **kw):
    """notes: [(name|None, beats)] sequential. fn(m, dur, vel) -> y"""
    b = 0.0
    for i, (n, d) in enumerate(notes):
        if n is not None:
            dur = d * song.beat * gap
            v = vel * (1.08 if (b % song.bpb) == 0 else 1.0) * (1 + RNG.normal() * 0.03)
            if accent and i in accent: v *= accent[i]
            y = fn(nm(n) if isinstance(n, str) else n, dur, v, **kw)
            tr.add(song.t(start_bar, b) + song.hum(0.006), y)
        b += d
    return b

def chord_tones(root, q, lo, hi):
    out = []
    for o in range(-3, 5):
        for iv in Q[q]:
            m = root + iv + 12 * o
            if lo <= m <= hi: out.append(m)
    return sorted(set(out))

def pad(song, tr, bar, beats, root, q, kind='string_soft', vel=0.35, lo=55, hi=71, voices=4, spread=9, a=0.6, r=0.9, pan_spread=0.6, top=None):
    ms = chord_tones(root, q, lo, hi)
    if top is not None: ms = [m for m in ms if m <= top]
    for m in ms:
        for y, p in sustain(m, beats * song.beat, kind, vel / max(3, len(ms)) ** 0.5, voices, spread, a, r, pan_spread=pan_spread):
            tr.add(song.t(bar) + song.hum(0.01), y, tr.pan + p)

def arp(song, tr, bar, beats, root, q, pattern, step=0.5, vel=0.55, base=None, kind='harp', swell=None):
    r = root
    while r < 45: r += 12
    while r > 56: r -= 12
    ivs = Q[q]
    tones = []
    for o in range(0, 4):
        for iv in ivs:
            tones.append(r + iv + 12 * o)
    tones = sorted(set(tones))
    n = int(round(beats / step))
    for i in range(n):
        idx = pattern[i % len(pattern)]
        m = tones[min(idx, len(tones) - 1)]
        v = vel * (1.12 if i == 0 else 0.85 + 0.15 * np.sin(i / n * np.pi)) * (1 + RNG.normal() * 0.05)
        if swell: v *= swell(i / max(1, n - 1))
        y = pluck(m, v, None, kind)
        pan = (m - 62) / 30.0
        tr.add(song.t(bar, i * step) + song.hum(0.005), y, tr.pan + pan * 0.7)
