# REFUGEE v665 – boss battle tracks (orchestral + rock hybrid) and dungeon tracks
import sys, json, numpy as np
import mapmus as mm, permap as pm
from mapmus import TH, render, deg2m, chord_of, ivs, lead_fn
from comp import *
from syn import pluck, bell, sustain, timpani, framedrum, swell, crackle, lp, hp, bp, wavetable, wt_play, adsr, vib, make_ir, mixdown, fold_loop, master

# ---------- extra battle instruments ----------
def kick(v=0.8):
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 46 + 70 * np.exp(-t / 0.03); ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) * np.exp(-t / 0.12) + bp(RNG.standard_normal(n), 2000, 6000) * np.exp(-t / 0.004) * 0.3
    return np.tanh(y * 1.6) * v * 0.5
def snare(v=0.7):
    n = int(0.3 * SR); t = np.arange(n) / SR
    y = bp(RNG.standard_normal(n), 1200, 7000) * np.exp(-t / 0.06) * 0.8 + np.sin(2 * np.pi * 185 * t) * np.exp(-t / 0.05) * 0.6
    return y * v * 0.45
def hat(v=0.4):
    n = int(0.06 * SR); t = np.arange(n) / SR
    return hp(RNG.standard_normal(n), 7500) * np.exp(-t / 0.012) * v * 0.3
def crash(v=0.6):
    n = int(2.2 * SR); t = np.arange(n) / SR
    return hp(RNG.standard_normal(n), 4500) * np.exp(-t / 0.55) * np.clip(t / 0.003, 0, 1) * v * 0.28
def taiko(v=0.8):
    n = int(0.9 * SR); t = np.arange(n) / SR
    f = 62 * (1 + 0.35 * np.exp(-t / 0.04)); ph = 2 * np.pi * np.cumsum(f) / SR
    y = np.sin(ph) * np.exp(-t / 0.32) + 0.5 * np.sin(1.6 * ph) * np.exp(-t / 0.15) + lp(RNG.standard_normal(n), 800) * np.exp(-t / 0.02) * 0.7
    return np.tanh(y * 1.3) * v * 0.55
_gtab = {}
def dist_gtr(ms, dur, v=0.5):
    """palm-muted power chord: detuned saws → hard drive → cab-ish filters"""
    n = int((dur + 0.08) * SR); y = np.zeros(n)
    for m in ms:
        f = mtof(m)
        key = int(np.log2(f) * 6)
        if key not in _gtab: _gtab[key] = wavetable([(1 / k) for k in range(1, max(2, min(40, int(12000 / f))))])
        for c in (-7, 7):
            y += wt_play(_gtab[key], np.full(n, f * 2 ** (c / 1200)))
    t = np.arange(n) / SR; env = np.clip(t / 0.003, 0, 1) * np.exp(-t / max(0.05, dur * 0.6))
    y = np.tanh(y * env * 5.0) * 0.55
    y = lp(hp(y, 90), 3400); y = y + 0.6 * bp(y, 700, 1800)
    rel = t > dur; y[rel] *= np.exp(-(t[rel] - dur) / 0.02)
    return y * v
def braam(ms, dur, v=0.6):
    ys = [y for m in ms for y, p in sustain(m, dur, 'brass', v / len(ms) ** 0.5, 3, 9, 0.35, 0.8, vdepth=0.001)]
    n = max(len(y) for y in ys); out = np.zeros(n)
    for y in ys: out[:len(y)] += y
    return np.tanh(out * 1.5)

# ---------- battle palettes ----------
B4 = {  # 16 steps: K kick S snare T taiko x hat C crash
 'drive':  'K.x.S.x.K.K.S.x.', 'gallop': 'K.xKS.xKK.xKS.xx', 'taiko': 'T..T..T.T.T.T...', 'blast': 'KxKxSxKxKxKxSxKx', 'half': 'K.x.x.x.S.x.x.x.'}
BOSS = [
 # key, name, mode, root, bpm, progs, leads(A,B,C), drums(I,A,B,C), guitar?, choir?, amb
 ('b_wild', 'Fangs of the Wild', 'minor', 50, 140, [1,6,7,1,4,6,5,5], ('brass','violin','brass'), ('taiko','drive','gallop','drive'), True, False, None),
 ('b_dark', 'Requiem of Bones', 'hminor', 49, 132, [1,6,4,5,1,6,7,5], ('choir_lead','brass','choir_lead'), ('taiko','half','drive','gallop'), False, True, None),
 ('b_fire', 'Crucible of Embers', 'phrdom', 52, 152, [1,2,1,7,1,2,6,5], ('brass','violin','brass'), ('taiko','gallop','blast','gallop'), True, False, 'fire'),
 ('b_frost', 'Shards of the Cold Star', 'minor', 47, 136, [1,6,3,7,1,6,4,5], ('violin','choir_lead','violin'), ('half','drive','taiko','drive'), False, True, None),
 ('b_astra', 'Banner of the Fallen Sky', 'minor', 55, 144, [1,7,6,7,1,4,5,5], ('horn_lead','violin','brass'), ('taiko','drive','gallop','drive'), True, True, None),
 ('b_mvp', 'The World Trembles', 'hminor', 53, 156, [1,6,4,5,1,2,5,1], ('brass','choir_lead','brass'), ('taiko','gallop','blast','blast'), True, True, None),
]

def battle_melody(T, rng):
    A = pm.gen_melody(T, rng, 'A'); Bm = pm.gen_melody(T, rng, 'B'); return A, Bm

def render_boss(entry, out):
    key, name, mode, root, bpm, prog, leads, drums, gtr, choir, amb = entry
    rng = np.random.default_rng(abs(hash(key)) % 100000 + 7)
    sc = pm.MODES[mode]
    T = dict(name=name, bpm=bpm, meter=4, root=root, sc=sc, prog=prog, intro=4, mel_oct=0)
    T['mel_oct'] = min((-12, 0, 12, 24), key=lambda o: abs(root + o - (57 if leads[0] in ('brass', 'choir_lead', 'horn_lead') else 62)))
    rng = np.random.default_rng(sum(map(ord, key)) * 31)
    T['A'], T['B'] = battle_melody(T, rng)
    song = Song(bpm, 4, 28); Bs = song.bus
    lead = Track(Bs, 0.08, 0.28, 1.0); lead2 = Track(Bs, -0.2, 0.28, 0.75); spc = Track(Bs, -0.25, 0.22, 0.8); gt = Track(Bs, 0.35, 0.1, 1.25)
    padt = Track(Bs, 0, 0.4, 0.55); bas = Track(Bs, 0, 0.12, 0.85); dr = Track(Bs, 0, 0.12, 1.0); hit = Track(Bs, 0, 0.35, 0.8); ambt = Track(Bs, 0, 0.1, 1.0)
    for bar in range(28):
        sec = 'I' if bar < 4 else 'A' if bar < 12 else 'B' if bar < 20 else 'C'
        deg = prog[(bar - 4) % 8] if bar >= 4 else prog[bar % 2 * 7]  # intro alternates i and v
        ch = chord_of(T, deg); r0 = ch[0]
        while r0 > 52: r0 -= 12
        while r0 < 40: r0 += 12
        ch = [r0 + (c - chord_of(T, deg)[0]) for c in chord_of(T, deg)]
        # spiccato 16ths (strings): root-root-fifth-root… rising energy
        pat = [0, 0, 2, 0, 0, 0, 2, 1, 0, 0, 2, 0, 1, 0, 2, 1]
        sv = {'I': .3 + .05 * bar, 'A': .42, 'B': .38, 'C': .46}[sec]
        for i, k in enumerate(pat):
            m = ch[min(k, 2)] + 12
            for y, p in sustain(m, 0.16 * song.beat, 'string', sv * (1.15 if i % 4 == 0 else 0.85), 2, 6, 0.004, 0.05, vdepth=0.0):
                spc.add(song.t(bar, i * 0.25) + song.hum(.002), y, spc.pan + p)
        # distorted guitar chugs (8ths) in A/C, palm-muted power chords
        if gtr and sec in ('A', 'C'):
            pw = [ch[0], ch[0] + 7, ch[0] + 12]
            for i in range(8):
                if sec == 'A' and i in (3, 7): continue
                gt.add(song.t(bar, i * 0.5) + song.hum(.002), dist_gtr([m - 12 for m in pw], 0.18 * song.beat, 0.55 if i % 2 == 0 else 0.4), 0.4 if i % 2 else -0.4)
        # bass pulse 8ths
        for i in range(8):
            for y, p in sustain(ch[0] - 12, 0.4 * song.beat, 'bass', 0.36, 2, 5, 0.005, 0.06): bas.add(song.t(bar, i * 0.5), y, p)
        # pads / choir
        if sec in ('B', 'C') or (choir and sec == 'A'):
            Q['_'] = ivs(chord_of(T, deg)); pad(song, padt, bar, 4.05, ch[0] + 12, '_', 'choir' if choir else 'string', 0.38 if sec != 'A' else 0.26, 55, 74, voices=4, a=0.3, r=0.6)
        # brass stabs on 1 and the "and" of 2 in B; braam at section starts
        if sec == 'B':
            for b0 in (0, 1.5):
                for y, p in sustain(ch[0] + 12, 0.35 * song.beat, 'brass', 0.5, 3, 8, 0.01, 0.15): hit.add(song.t(bar, b0), y, p)
                for y, p in sustain(ch[2] + 12, 0.35 * song.beat, 'brass', 0.4, 3, 8, 0.01, 0.15): hit.add(song.t(bar, b0), y, p)
        if bar in (4, 12, 20):
            hit.add(song.t(bar), braam([ch[0], ch[0] + 7, ch[0] + 12], 2.2 * song.beat, 0.8), 0)
        # drums
        dsel = drums[{'I': 0, 'A': 1, 'B': 2, 'C': 3}[sec]]; dp = B4[dsel]
        if sec == 'I' and bar < 2: dp = 'T.......T.......'
        for i, c in enumerate(dp):
            t = song.t(bar, i * 0.25) + song.hum(.002)
            if c == 'K': dr.add(t, kick(0.85))
            elif c == 'S': dr.add(t, snare(0.75), 0.05)
            elif c == 'x': dr.add(t, hat(0.5 if i % 4 == 2 else 0.32), 0.25)
            elif c == 'T': dr.add(t, taiko(0.85), -0.1)
        if bar % 4 == 0 and bar >= 4: dr.add(song.t(bar), crash(0.7), 0.3)
        if bar == 3: dr.add(song.t(bar), swell(4 * song.beat, 0.6), 0)
        if bar in (11, 19, 27):  # fill
            for i in range(8): dr.add(song.t(bar, 2 + i * 0.25), taiko(0.45 + i * 0.06) if i % 2 == 0 else snare(0.4 + i * 0.05), 0)
        # timpani on chord changes in B/C
        if sec in ('B', 'C'): dr.add(song.t(bar), timpani(ch[0], 0.5), 0)
    base = root + T['mel_oct']
    def mel(tr, start, notes, kind, vel, off=0):
        fn = lead_fn(kind)
        melody(song, tr, start, [(deg2m(T, d, base) + off if d else None, b) for d, b in notes], lambda m, d, v: fn(m, d, v), gap=0.95, vel=vel)
    mel(lead, 4, T['A'], leads[0], 0.7)
    mel(lead, 12, T['B'], leads[1], 0.68)
    mel(lead, 20, T['A'], leads[2], 0.72)
    mel(lead2, 20, T['A'], 'violin', 0.42, 12)          # octave doubling in the final section
    if amb == 'fire': ambt.add(0, crackle(song.L + 6, 6.0, 0.14))
    ir = make_ir(2.2, 1.8, 1.0, 3.0)
    y = mixdown(Bs, ir, 0.7); y = fold_loop(y, song.Ls, 0.5); y = master(y, 0.89)
    np.save(out, y.astype(np.float32))
    for nmx, tr in (('lead', lead), ('spicc', spc), ('gtr', gt), ('pad', padt), ('bass', bas), ('drums', dr), ('hits', hit)):
        sys.stderr.write('track %s %.1f dB\n' % (nmx, 10 * np.log10(getattr(tr, 'e', 0) / song.Ls + 1e-12)))
    return dict(L=song.Ls / SR, Ls=song.Ls, bpm=bpm, name=name, A=T['A'], B=T['B'], T=dict(root=root, sc=sc, prog=prog, mel_oct=T['mel_oct']))

# ---------- dungeon tracks (reuse per-map generator + arranger) ----------
DUN = [
 (901, 'Depths of the Labyrinth', 'minor', 48, 88, 4, 'choir_lead', 'oboe', 'choir_lead', 'pizz', 'string_soft', 'drone', 'tick', 'cave', (3.2, 2.8, 1.6), 12),
 (902, 'The Endless Ascent', 'dorian', 50, 104, 4, 'horn_lead', 'violin', 'horn_lead', 'strings_8', 'string', 'bass_pulse', 'march', 'wind', (2.6, 2.2, 1.3), 12),
 (903, 'Echoes of Ruin', 'phryg', 54, 96, 4, 'choir_lead', 'brass', 'choir_lead', 'ostinato', 'string', 'drone', 'taiko', 'void', (3.6, 3.2, 2.0), 12),
]
DK = {901: 'd_dg', 902: 'd_tw', 903: 'd_raid'}
for e in DUN:
    k, T = pm.setup(e); TH[DK[e[0]]] = T

if __name__ == '__main__':
    k = sys.argv[1]
    if k.startswith('b_'):
        e = [b for b in BOSS if b[0] == k][0]; info = render_boss(e, sys.argv[2]); print(json.dumps({x: info[x] for x in ('L', 'Ls', 'bpm', 'name')}))
        json.dump({'A': info['A'], 'B': info['B'], **info['T']}, open(sys.argv[2].replace('.npy', '.mel.json'), 'w'))
    else:
        info = render(k, sys.argv[2]); info['name'] = TH[k]['name']; print(json.dumps(info))
