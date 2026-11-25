# REFUGEE v663 – 10 map themes, rendered loops. Melodies in scale degrees (1 = tonic of the melody octave).
import sys, json, numpy as np
from comp import *
from syn import pluck, bell, sustain, wind, timpani, framedrum, shaker, swell, crackle, lp, hp, bp, tvec

TH = {}
# ---------------------------------------------------------------- melodies (deg, beats)
def P(s):
    """'3:1 5:1 8:1.5 r:.5 | ...' → [(3,1),(5,1),(8,1.5),(None,.5),...]"""
    out = []
    for tok in s.replace('|', ' ').split():
        d, b = tok.split(':'); out.append((None if d == 'r' else int(d), float(b)))
    return out

TH['camp'] = dict(name='Hearth of the Camp', bpm=84, meter=4, root=62, sc=[0,2,4,5,7,9,11], prog=[1,5,6,4,1,4,5,1], intro=4,
  A=P('3:1 5:1 8:1.5 7:.5 | 7:1 6:.5 5:.5 9:2 | 8:1 7:.5 6:.5 10:1.5 9:.5 | 6:1.5 5:.5 4:1 5:1 | 3:1 5:1 8:1.5 9:.5 | 11:1.5 10:.5 8:1 6:1 | 7:1 9:1 12:1 11:1 | 10:2 8:2'),
  B=P('10:2 12:2 | 12:1.5 11:.5 9:2 | 10:1.5 9:.5 8:1 10:1 | 11:3 10:1 | 12:1.5 10:.5 8:2 | 8:1 9:1 11:2 | 9:1.5 7:.5 9:1 12:1 | 8:4'),
  leadA='flute', leadB='violin', leadC='oboe', acc='guitar', acc2='harp', pad='string_soft', bass='bass', drums={'B':'h...s.s.h...s.s.','C':'h...s.s.h.h.s.s.'},
  amb='birds', ir=(1.8, 1.5, 1.0), loud=-18)
TH['bone'] = dict(name='Lullaby of Bones', bpm=64, meter=3, root=50, mel_oct=24, sc=[0,1,3,5,7,8,10], prog=[1,1,6,7,1,4,2,5], intro=4,
  A=P('5:1 3:1 1:1 | 3:1.5 2:.5 1:1 | 6:2 5:1 | 7:2 4:1 | 5:1 8:1 7:1 | 6:1.5 5:.5 4:1 | 2:1 4:1 6:1 | 5:3'),
  B=P('8:2 5:1 | 3:1.5 4:.5 5:1 | 6:1 8:1 10:1 | 9:2 7:1 | 8:1.5 7:.5 5:1 | 4:1 6:1 8:1 | 9:1.5 8:.5 6:1 | 5:2 r:1'),
  leadA='musicbox', leadB='choir_lead', leadC='musicbox', acc='harp_sparse', pad='string_soft', bass='bass', drums={'all':'b...........'},
  amb='wind', ir=(3.2, 2.8, 1.6), loud=-19)
TH['hell'] = dict(name='Forge of Cinders', bpm=104, meter=4, root=52, sc=[0,1,4,5,7,8,10], prog=[1,2,1,7,1,2,6,5], intro=4,
  A=P('1:1.5 3:.5 5:1 3:1 | 2:2 4:1 2:1 | 3:1 5:1 8:2 | 7:1.5 6:.5 4:2 | 5:1 8:1 10:1 8:1 | 9:2 11:1 9:1 | 6:2 3:1 6:1 | 5:3 r:1'),
  B=P('8:1 10:1 12:2 | 11:1 9:1 13:2 | 12:1.5 10:.5 8:2 | 11:2 9:2 | 10:1 12:1 15:2 | 13:1.5 11:.5 9:2 | 10:2 13:2 | 12:3 r:1'),
  leadA='brass', leadB='violin', leadC='brass', acc='ostinato', pad='string', bass='bass_pulse', drums={'all':'T...t.T.T...t.t.','B':'T.t.t.T.T.t.tttt','C':'T.t.t.T.T.t.tttt'},
  amb='fire', ir=(2.2, 1.8, 1.0), loud=-17, mel_oct=12)
TH['ice'] = dict(name='Glass Tundra', bpm=72, meter=4, root=64, sc=[0,2,4,6,7,9,11], prog=[1,2,1,7,6,2,5,1], intro=2,
  A=P('5:2 3:1 4:1 | 2:2 6:2 | 5:1.5 3:.5 1:2 | 7:2 9:2 | 8:1.5 6:.5 3:2 | 4:1 6:1 9:2 | 7:2 5:2 | 8:4'),
  B=P('10:2 12:2 | 11:2 13:2 | 12:1 10:1 8:2 | 9:1.5 11:.5 14:2 | 13:2 10:2 | 11:1 9:1 6:2 | 9:2 7:2 | 8:4'),
  leadA='celesta', leadB='flute', leadC='glock', acc='harp', pad='choir', bass='bass', drums={}, amb='wind_ice', ir=(3.4, 3.0, 2.0), loud=-19, mel_oct=0)
TH['tower'] = dict(name='Spire of Echoes', bpm=80, meter=4, root=49, sc=[0,1,3,5,6,8,10], prog=[1,6,7,1,4,5,1,1], intro=4,
  A=P('1:2 3:2 | 6:2 8:2 | 7:3 6:1 | 5:2 3:2 | 4:2 6:1 8:1 | 9:2 7:2 | 8:1.5 7:.5 5:2 | 8:4'),
  B=P('10:2 12:2 | 13:2 10:2 | 11:2 9:1 7:1 | 8:3 r:1 | 11:2 13:2 | 12:2 14:2 | 15:1.5 14:.5 12:2 | 10:4'),
  leadA='choir_lead', leadB='violin', leadC='choir_lead', acc='pizz', pad='string_soft', bass='drone', drums={'all':'k...k...k...k...','B':'k...k...k.s.k...'},
  amb='cave', ir=(3.0, 2.6, 1.4), loud=-19, mel_oct=12)
TH['sunk'] = dict(name='Drowned Chapel', bpm=66, meter=3, root=57, sc=[0,2,3,5,7,9,10], prog=[1,4,1,7,6,4,5,1], intro=2,
  A=P('5:1.5 3:.5 1:1 | 4:2 6:1 | 5:1 8:1 7:1 | 7:2 4:1 | 6:1.5 8:.5 10:1 | 11:2 8:1 | 9:1.5 7:.5 5:1 | 8:3'),
  B=P('10:1.5 12:.5 15:1 | 13:2 11:1 | 12:2 10:1 | 11:1.5 9:.5 7:1 | 10:2 8:1 | 6:1 8:1 11:1 | 12:2 9:1 | 8:3'),
  leadA='flute', leadB='violin', leadC='celesta', acc='harp', pad='string_soft', bass='bass', drums={}, amb='water', ir=(3.6, 3.2, 2.0), loud=-19, mel_oct=12)
TH['mine'] = dict(name='Lanterns Below', bpm=100, meter=4, root=55, sc=[0,2,4,7,9], hsc=[0,2,4,5,7,9,11], prog=[1,4,1,5,1,4,5,1], intro=4,
  A=P('3:.5 4:.5 6:1 4:.5 3:.5 1:1 | 5:1 6:1 5:.5 4:.5 5:1 | 4:1 3:.5 2:.5 1:2 | 2:1 4:1 7:2 | 6:.5 7:.5 8:1 6:1 4:1 | 5:1.5 6:.5 5:1 3:1 | 4:1 2:1 4:.5 5:.5 4:1 | 1:2 r:2'),
  B=P('8:1 9:1 8:.5 6:.5 4:1 | 10:1.5 9:.5 6:2 | 8:1 6:1 4:2 | 7:1.5 6:.5 7:1 9:1 | 8:2 6:1 8:1 | 10:1 11:1 10:1 8:1 | 9:1.5 7:.5 9:1 7:1 | 6:2 r:2'),
  padv=0.3, leadA='whistle', leadB='flute', leadC='whistle', acc='banjo_chop', pad='string_soft', bass='bass_walk', drums={'all':'h.s.h.shh.s.hsm.'},
  amb='cave', ir=(1.6, 1.3, 0.8), loud=-18, mel_oct=12)
TH['desert'] = dict(name='Sands of the Pharaoh', bpm=92, meter=4, root=52, sc=[0,1,4,5,7,8,10], prog=[1,1,2,1,7,2,1,1], intro=4,
  A=P('1:.5 2:.5 3:1 5:1 3:.5 2:.5 | 1:3 r:1 | 2:1 4:1 6:1 4:1 | 3:1.5 2:.5 1:2 | 7:1 6:.5 7:.5 9:2 | 9:1 8:.5 9:.5 11:2 | 10:1 9:.5 8:.5 5:1 3:1 | 8:3 r:1'),
  B=P('8:1 10:1 12:2 | 12:1 10:.5 9:.5 8:2 | 9:2 11:1 13:1 | 12:1.5 10:.5 8:2 | 14:2 11:2 | 13:1 11:1 9:2 | 10:1.5 9:.5 8:1 5:1 | 8:4'),
  padv=0.35, dronev=0.5, leadA='oud', leadB='ney', leadC='oud', acc='oud_drone', pad='string_soft', bass='drone', drums={'all':'d..k.kd.d.k.k.k.'},
  amb='wind', ir=(1.8, 1.5, 0.9), loud=-18, mel_oct=12)
TH['sky'] = dict(name='Banners over the Spire', bpm=84, meter=4, root=60, sc=[0,2,4,5,7,9,11], prog=[1,6,4,5,1,3,4,5], intro=4,
  A=P('5:1 8:1 10:1.5 9:.5 | 8:1 6:1 10:2 | 11:1.5 10:.5 8:1 6:1 | 7:2 9:2 | 10:1 12:1 15:1.5 14:.5 | 12:1 10:1 14:2 | 13:1.5 12:.5 11:1 13:1 | 12:3 r:1'),
  B=P('15:2 12:1 10:1 | 13:2 10:2 | 11:1 13:1 15:1.5 13:.5 | 12:2 14:2 | 15:1.5 14:.5 12:1 10:1 | 14:2 12:2 | 13:1 11:1 13:1 15:1 | 12:2 14:2'),
  leadA='horn_lead', leadB='violin', leadC='violin', acc='strings_8', pad='string', bass='bass', drums={'all':'T.......t...t.t.','B':'T...s.t.T.s.t.tt','C':'T...s.t.T.s.t.tt'},
  amb=None, ir=(2.8, 2.4, 1.4), loud=-17, mel_oct=0)
TH['rift'] = dict(name='Between the Stars', bpm=70, meter=4, root=50, sc=[0,2,4,6,8,10], prog=[1,2,1,6,1,3,2,1], intro=2,
  A=P('3:2 5:2 | 4:2 6:2 | 7:3 5:1 | 6:2 2:2 | 3:1 5:1 7:2 | 9:2 7:2 | 8:2 6:2 | 7:4'),
  B=P('9:2 11:2 | 12:2 10:2 | 13:3 11:1 | 12:2 10:2 | 11:1.5 9:.5 7:2 | 9:2 11:2 | 10:2 8:2 | 7:4'),
  leadA='choir_lead', leadB='glass', leadC='choir_lead', acc='glass_arp', pad='choir', bass='drone', drums={}, amb='void', ir=(4.0, 3.6, 2.4), loud=-19, mel_oct=12)

# ---------------------------------------------------------------- instruments
def deg2m(T, d, base):
    sc = T['sc']; n = len(sc); i = d - 1; o, r = divmod(i, n); return base + sc[r] + 12 * o
def chord_of(T, deg):
    sc = T.get('hsc', T['sc']); n = len(sc); root = T['root']
    ms = []
    for k in (0, 2, 4):
        i = deg - 1 + k; o, r = divmod(i, n); ms.append(root + sc[r] + 12 * o)
    return ms
def ivs(ms): return [m - ms[0] for m in ms]

def lead_fn(kind):
    if kind == 'flute': return lambda m, d, v: wind(m, d, 'flute', v, breath=0.05)
    if kind == 'whistle': return lambda m, d, v: wind(m, d, 'ocarina', v * 0.8, a=0.03, r=0.08, breath=0.07, vdepth=0.006)
    if kind == 'ney': return lambda m, d, v: wind(m, d, 'flute', v, a=0.12, breath=0.14, vdepth=0.007, vdelay=0.2)
    if kind == 'oboe': return lambda m, d, v: sum(y for y, p in sustain(m, d, 'fiddle', v * 0.9, 1, 0, 0.06, 0.2, vrate=5.4, vdepth=0.004, vdelay=0.2))
    if kind == 'violin': return lambda m, d, v: sum(y for y, p in sustain(m, d, 'string', v, voices=5, spread=7, a=0.12, r=0.45, vdepth=0.004, vdelay=0.15))
    if kind == 'brass': return lambda m, d, v: sum(y for y, p in sustain(m, d, 'brass', v, voices=3, spread=6, a=0.06, r=0.3, vdepth=0.002))
    if kind == 'horn_lead': return lambda m, d, v: sum(y for y, p in sustain(m, d, 'horn', v * 1.1, voices=3, spread=6, a=0.12, r=0.4, vdepth=0.002))
    if kind == 'choir_lead': return lambda m, d, v: sum(y for y, p in sustain(m, d, 'choir', v, voices=5, spread=11, a=0.35, r=0.7, vdepth=0.005))
    if kind == 'celesta': return lambda m, d, v: bell(m, v * 1.4, 'celesta')
    if kind == 'glock': return lambda m, d, v: bell(m + 12, v * 1.1, 'glock')
    if kind == 'musicbox': return lambda m, d, v: bell(m, v * 1.4, 'glock')
    if kind == 'glass':
        def f(m, d, v):
            a = bell(m, v * 1.2, 'celesta'); b = 0.4 * sum(y for y, p in sustain(m, d, 'flute', v * .5, 1, 0, 0.3, 0.6))
            n = max(len(a), len(b)); y = np.zeros(n); y[:len(a)] += a; y[:len(b)] += b; return y
        return f
    if kind == 'oud':
        def f(m, d, v):
            y = pluck(m, v * 1.1, d + 0.25, 'oud')
            if d >= 0.75:  # tremolo re-pluck on long notes, like an oud player
                n = int(d / 0.25)
                for i in range(1, n):
                    yy = pluck(m, v * 0.55, 0.3, 'oud'); s = int(i * 0.25 * 60 / 92 * 4 * SR / 4)
                    if s < len(y): y[s:s + len(yy)] += yy[:len(y) - s]
            return y
        return f
    if kind == 'piano': return lambda m, d, v: pluck(m, v * 1.6, d + 0.5, 'piano')
    if kind == 'guitar_lead': return lambda m, d, v: pluck(m, v * 1.7, d + 0.2, 'guitar')
    if kind == 'banjo': return lambda m, d, v: pluck(m, v * 2.0, d + 0.1, 'banjo')
    raise ValueError(kind)

# ---------------------------------------------------------------- render one theme
def render(key, out):
    T = TH[key]; song = Song(T['bpm'], T['meter'], T['intro'] + 24); B = song.bus; M = T['meter']
    base = T['root'] + T.get('mel_oct', 0)
    lead = Track(B, 0.1, 0.32, 1.0); lead2 = Track(B, -0.25, 0.32, 0.8); acc = Track(B, -0.18, 0.3, 0.9); acc2 = Track(B, 0.3, 0.35, 0.7)
    padt = Track(B, 0.0, 0.42, 0.75 * T.get('padv', 0.62)); bass = Track(B, -0.05, 0.2, 0.85); dr = Track(B, 0.0, 0.18, 0.9); amb = Track(B, 0.0, 0.1, 1.0)
    prog = T['prog']; nb = song.bars
    for bar in range(nb):
        sec = 'I' if bar < T['intro'] else 'A' if bar < T['intro'] + 8 else 'B' if bar < T['intro'] + 16 else 'C'
        deg = prog[(bar - T['intro']) % 8] if bar >= T['intro'] else prog[bar % 8]
        ch = chord_of(T, deg); r0 = ch[0]; q = ivs(ch)
        Q['_'] = q
        # ---- accompaniment
        a = T['acc']; beats = M
        if a in ('guitar', 'harp'):
            patt = [0, 2, 3, 4, 3, 2, 3, 4][:beats * 2] if M == 4 else [0, 2, 3, 4, 3, 2]
            arp(song, acc, bar, beats, r0, '_', patt, 0.5, 0.5 if a == 'guitar' else 0.45, kind='guitar' if a == 'guitar' else 'harp')
        elif a == 'piano':
            arp(song, acc, bar, beats, r0, '_', [0, 2, 3, 2, 4, 2, 3, 2][:beats * 2], 0.5, 0.42, kind='piano')
        elif a == 'harp_sparse':
            arp(song, acc, bar, beats, r0, '_', [0, 3, 4], 1.0, 0.35, kind='harp')
        elif a == 'ostinato':
            for i in range(beats * 2):
                m = r0 - 12 + (0 if i % 4 != 3 else 1) if True else r0
                for y, p in sustain(m + 12, 0.42 * song.beat * 0.5, 'string', 0.55 if i % 2 == 0 else 0.4, 3, 6, 0.008, 0.06):
                    acc.add(song.t(bar, i * 0.5), y, acc.pan + p)
        elif a == 'pizz':
            for i, k in enumerate([0, 2, 1, 2] * 2):
                if i >= beats * 2: break
                m = ch[min(k, 2)] - (12 if k == 0 else 0)
                acc.add(song.t(bar, i * 0.5) + song.hum(), pluck(m, 0.55, 0.12, 'pizz'), (i % 2 - 0.5) * 0.6)
        elif a == 'banjo_chop':
            for i in range(beats * 2):
                if i % 2 == 1:
                    for m in ch: acc.add(song.t(bar, i * 0.5) + song.hum(.003), pluck(m + 12, 0.75, 0.1, 'banjo'), 0.2)
        elif a == 'oud_drone':
            for i in (0, 1.5, 3) if M == 4 else (0, 1.5):
                acc.add(song.t(bar, i), pluck(T['root'] + (12 if i else 0), 0.85, 0.6, 'oud'), -0.2)
        elif a == 'strings_8':
            for i in range(beats * 2):
                for m in ch[1:]:
                    for y, p in sustain(m + 12, 0.42 * song.beat * 0.5, 'string', 0.3, 2, 6, 0.01, 0.06):
                        acc.add(song.t(bar, i * 0.5), y, acc.pan + p)
        elif a == 'glass_arp':
            arp(song, acc, bar, beats, r0 + 12, '_', [0, 2, 1, 2], 1.0, 0.3, kind='harp')
        if T.get('acc2') and sec in ('B', 'C'):
            arp(song, acc2, bar, beats, r0 + 12, '_', [0, 2, 3, 4, 3, 2, 3, 4][:beats * 2], 0.5, 0.3, kind='harp')
        # ---- pad
        pv = {'I': .26, 'A': .28, 'B': .34, 'C': .34}[sec]
        pad(song, padt, bar, beats + 0.1, r0, '_', T['pad'], pv, 55, 72, voices=4 if T['pad'] == 'choir' else 3, a=0.6, r=1.0)
        # ---- bass
        b = T['bass']; bm = r0 - 12
        while bm > 50: bm -= 12
        while bm < 38: bm += 12
        if b == 'bass':
            for y, p in sustain(bm, (M - 0.1) * song.beat, 'bass', 0.3, 2, 5, 0.12, 0.5): bass.add(song.t(bar), y, p)
        elif b == 'bass_pulse':
            for i in range(M * 2):
                for y, p in sustain(bm, 0.4 * song.beat, 'bass', 0.32, 2, 5, 0.01, 0.08): bass.add(song.t(bar, i * 0.5), y, p)
        elif b == 'bass_walk':
            for i, k in enumerate([0, 2, 1, 2][:M]):
                bass.add(song.t(bar, i), pluck(ch[min(k, 2)] - 24 if ch[0] - 24 > 30 else ch[min(k, 2)] - 12, 0.75, 0.8 * song.beat, 'guitar'))
        elif b == 'drone' and bar % 2 == 0:
            for y, p in sustain(T['root'] - 12 if T['root'] > 45 else T['root'], (2 * M - 0.2) * song.beat, 'bass', 0.26 * T.get('dronev', 1), 3, 8, 0.8, 1.2): bass.add(song.t(bar), y, p)
        # ---- drums (16 steps per 4/4 bar, 12 per 3/4 bar)
        D = T['drums']; pat = D.get(sec, D.get('all')) if sec != 'I' or 'all' in D else None
        if sec == 'I' and key in ('hell', 'sky', 'mine', 'desert'): pat = (D.get('all') or '')[:M * 4]
        if pat:
            for i, c in enumerate(pat[:M * 4]):
                t = song.t(bar, i * 0.25) + song.hum(.004)
                if c == 'T': dr.add(t, timpani(T['root'] - 12 if T['root'] > 45 else T['root'], 0.55), 0)
                elif c == 't': dr.add(t, framedrum(0.45, True), 0.1)
                elif c == 'h': dr.add(t, framedrum(0.4, False), -0.15)
                elif c == 'd': dr.add(t, framedrum(0.55, True), 0)
                elif c == 'k': dr.add(t, framedrum(0.28, False) * 0.8 + 0.4 * shaker(0.4)[:len(framedrum(0.28, False))] if False else framedrum(0.25, False), 0.2)
                elif c == 's': dr.add(t, shaker(0.45), 0.3)
                elif c == 'm': dr.add(t, bell(nm('E6'), 0.25, 'glock'), 0.4)
                elif c == 'b' and bar % 2 == 0: dr.add(t, bell(T['root'] - 12 + 24, 0.5, 'celesta') * 0.9, -0.2)
    # ---- melodies
    i0 = T['intro']
    def mel(tr, start, notes, kind, vel, off=0):
        fn = lead_fn(kind)
        if T.get('lead_comp'): vel *= {'celesta': 2.8, 'glock': 2.6, 'musicbox': 2.8, 'glass': 2.6, 'oud': 2.6, 'piano': 1.9, 'banjo': 1.9, 'guitar_lead': 1.9}.get(kind, 1.0)
        melody(song, tr, start, [(deg2m(T, d, base) + off if d else None, b) for d, b in notes], lambda m, d, v: fn(m, d, v), gap=0.97, vel=vel)
    mel(lead, i0, T['A'], T['leadA'], 0.62)
    mel(lead, i0 + 8, T['B'], T['leadB'], 0.6)
    mel(lead, i0 + 16, T['A'], T['leadC'], 0.58)
    # harmony a 3rd (two scale steps) below in the last section, quieter
    mel(lead2, i0 + 16, [(d - 2 if d and d > 2 else d, b) for d, b in T['A']], T['leadB'] if T['leadB'] not in ('celesta', 'glock', 'musicbox') else 'flute', 0.3)
    # ---- ambience
    L = song.L + 6; am = T['amb']; n = int(L * SR); t = np.arange(n) / SR
    if am == 'fire': amb.add(0, crackle(L, 7.0, 0.2))
    elif am == 'water':
        y = np.zeros(n)
        for _ in range(int(L * 0.9)):
            i = RNG.integers(0, n - 30000); f = RNG.uniform(1400, 2600); tt = np.arange(9000) / SR
            y[i:i + 9000] += np.sin(2 * np.pi * f * tt * (1 + 0.6 * tt)) * np.exp(-tt / 0.03) * RNG.uniform(.2, .6)
        amb.add(0, y * 0.12 + lp(RNG.standard_normal(n), 400) * 0.05)
    elif am in ('wind', 'wind_ice'):
        w = bp(RNG.standard_normal(n), 300, 1400 if am == 'wind' else 3000) * (0.6 + 0.4 * np.sin(2 * np.pi * t / 7.3)) * 0.12
        amb.add(0, w)
    elif am == 'cave':
        y = np.zeros(n)
        for _ in range(int(L * 0.35)):
            i = RNG.integers(0, n - 30000); f = RNG.uniform(900, 1600); tt = np.arange(12000) / SR
            y[i:i + 12000] += np.sin(2 * np.pi * f * tt * (1 + 0.8 * tt)) * np.exp(-tt / 0.05) * RNG.uniform(.2, .5)
        amb.add(0, y * 0.1 + lp(RNG.standard_normal(n), 150) * 0.08)
    elif am == 'void':
        amb.add(0, lp(RNG.standard_normal(n), 120) * 0.12 * (0.6 + 0.4 * np.sin(2 * np.pi * t / 9)))
    elif am == 'crickets':
        from syn import crickets as _cr
        amb.add(0, _cr(L, 0.02), 0.4)
    elif am == 'birds':
        y = np.zeros(n)
        for _ in range(int(L * 0.25)):
            i = RNG.integers(0, n - 40000); f = RNG.uniform(2800, 4200)
            for j in range(RNG.integers(2, 5)):
                tt = np.arange(3500) / SR; s = i + j * 4200
                y[s:s + 3500] += np.sin(2 * np.pi * f * tt * (1 + 3 * tt * (1 if j % 2 else -1))) * np.sin(np.pi * tt / tt[-1]) * 0.25
        amb.add(0, y * 0.18, 0.3)
    import sys as _s
    for nmx, tr in (('lead', lead), ('lead2', lead2), ('acc', acc), ('acc2', acc2), ('pad', padt), ('bass', bass), ('drums', dr), ('amb', amb)):
        _s.stderr.write('track %s %.1f dB\n' % (nmx, 10 * np.log10(getattr(tr, 'e', 0) / song.Ls + 1e-12)))
    ir = make_ir(*T['ir'], length=T['ir'][0] + 0.8)
    y = mixdown(B, ir, 0.8)
    y = fold_loop(y, song.Ls, 0.5)
    y = master(y, 0.89)
    np.save(out, y.astype(np.float32))
    return dict(L=song.Ls / SR, Ls=song.Ls, bars=nb, bpm=T['bpm'])

if __name__ == '__main__':
    k = sys.argv[1]; info = render(k, sys.argv[2]); info['name'] = TH[k]['name']; print(json.dumps(info))
