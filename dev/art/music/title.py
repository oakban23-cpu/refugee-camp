# REFUGEE main theme ("Embers of Home") – D major, 76 bpm, 4/4, 32-bar loop (~101 s)
import sys, numpy as np
from comp import *
import wave

song = Song(76, 4, 32)
B = song.bus
harp = Track(B, -0.15, 0.35, 1.0)
flute = Track(B, 0.12, 0.30, 1.05)
strings = Track(B, 0.0, 0.42, 0.95)
violins = Track(B, 0.18, 0.38, 1.0)
cello = Track(B, -0.25, 0.28, 0.9)
horn = Track(B, -0.3, 0.45, 0.8)
choir = Track(B, 0.0, 0.55, 0.7)
cel = Track(B, 0.35, 0.5, 0.9)
piano = Track(B, -0.05, 0.38, 1.0)
perc = Track(B, 0.0, 0.35, 1.0)

D, Cs, E, Fs, G, A, Bn = 50, 49, 52, 54, 55, 57, 59
# chords per bar: (root, quality, bass)
A_CH = [(50,'M',38),(57,'M',37),(47,'m',35),(43,'M',31),(50,'M',30),(43,'M7',31),(40,'m7',28),(45,'sus4',33)]
A2_CH = A_CH[:6] + [(40,'m7',28),(50,'M',38)]
B_CH = [(47,'m',35),(43,'M',31),(50,'M',38),(45,'M',33),(47,'m',35),(43,'M',31),(40,'m',28),(45,'M',33)]
IN_CH = [(50,'M',38),(43,'M',38),(50,'M',38),(45,'sus4',33)]
OUT_CH = [(50,'M',38),(43,'M',31),(50,'M',30),(45,'sus4',33)]
CH = IN_CH + A_CH + A2_CH + B_CH + OUT_CH
assert len(CH) == 32

MEL_A = [('F#4',1),('A4',1),('D5',1.5),('C#5',.5), ('C#5',1),('B4',.5),('A4',.5),('E5',2),
 ('D5',1),('C#5',.5),('B4',.5),('F#5',1.5),('E5',.5), ('B4',1.5),('A4',.5),('G4',1),('A4',1),
 ('F#4',1),('A4',1),('D5',1.5),('E5',.5), ('F#5',1.5),('G5',.5),('F#5',1),('E5',1),
 ('D5',1),('E5',.5),('F#5',.5),('B4',1),('C#5',1), ('E5',3),(None,1)]
MEL_A2 = MEL_A[:-7] + [('D5',1),('E5',.5),('F#5',.5),('E5',1),('C#5',1), ('D5',4)]
MEL_B = [('F#5',1.5),('E5',.5),('D5',1),('F#5',1), ('G5',1.5),('F#5',.5),('E5',1),('D5',1),
 ('A5',2),('F#5',1),('D5',1), ('E5',3),('C#5',1),
 ('D5',.5),('E5',.5),('F#5',1),('B5',2), ('A5',1),('G5',.5),('F#5',.5),('G5',1),('E5',1),
 ('G5',1.5),('F#5',.5),('E5',1),('D5',.5),('E5',.5), ('C#5',1),('E5',1),('A5',2)]
COUNTER = [('A5',4),('C#6',2),('A5',2),('D6',2),('B5',2),('B5',4),('A5',4),('B5',2),('D6',2),('G5',4),('F#5',4)]
OUTRO = [('F#5',1),('A5',1),('D6',2),('B5',1.5),('A5',.5),('G5',2),('F#5',2),('E5',2),('E5',4)]

def fl(m, dur, v): return wind(m, dur, 'flute', v, breath=0.05)
def vln(m, dur, v):
    out = sustain(m, dur, 'string', v, voices=5, spread=7, a=0.12, r=0.5, vdepth=0.004, vdelay=0.15, pan_spread=0.5)
    return sum(y for y, p in out)
def hrn(m, dur, v):
    out = sustain(m, dur, 'horn', v, voices=3, spread=5, a=0.18, r=0.45, vdepth=0.002)
    return sum(y for y, p in out)
def pno(m, dur, v): return pluck(m, v, dur + 0.6, 'piano')

for bar, (r, q, bs) in enumerate(CH):
    sec = 'in' if bar < 4 else 'A' if bar < 12 else 'A2' if bar < 20 else 'B' if bar < 28 else 'out'
    split = (sec == 'A2' and bar == 18)
    # harp arpeggio
    if sec in ('in', 'A', 'A2', 'out'):
        patt = [0, 2, 3, 4, 5, 4, 3, 2] if bar % 2 == 0 else [0, 2, 4, 5, 6, 5, 4, 2]
        v = {'in': 0.62, 'A': 0.52, 'A2': 0.48, 'out': 0.42}[sec]
        if split:
            arp(song, harp, bar, 2, 40, 'm7', patt, 0.5, v); arp(song, harp, bar + 0.5, 2, 45, '7', patt, 0.5, v)
        elif q == 'sus4' and bar in (11, 31, 3):
            arp(song, harp, bar, 2, r, 'sus4', patt, 0.5, v); arp(song, harp, bar + 0.5, 2, r, 'M', patt, 0.5, v)
        else:
            arp(song, harp, bar, 4, r, q, patt, 0.5, v)
    else:  # B: broader harp in quarter notes + gliss before climax
        arp(song, harp, bar, 4, r, q, [0, 3, 5, 4], 1.0, 0.45)
    # soft string pad
    pv = {'in': 0.34, 'A': 0.28, 'A2': 0.32, 'B': 0.42, 'out': 0.24}[sec]
    if split:
        pad(song, strings, bar, 2.1, 40, 'm7', 'string_soft', pv); pad(song, strings, bar + 0.5, 2, 45, '7', 'string_soft', pv)
    else:
        pad(song, strings, bar, 4.1, r, 'M' if q == 'sus4' and bar != 3 and bar != 31 and bar != 11 else q, 'string_soft', pv)
    # cello / bass
    if sec != 'in' or bar >= 2:
        bv = {'in': 0.22, 'A': 0.26, 'A2': 0.3, 'B': 0.36, 'out': 0.24}[sec]
        for y, p in sustain(bs + (12 if bs < 33 else 0), 3.9 * song.beat, 'bass', bv, 2, 5, 0.15, 0.6):
            cello.add(song.t(bar) + 0.01, y, cello.pan + p)
    # horns + choir in B
    if sec == 'B':
        pad(song, choir, bar, 4.1, r, q, 'choir', 0.34 + 0.06 * (bar >= 24), 57, 74, voices=4, spread=12, a=0.7, r=1.1, pan_spread=0.8)
        pad(song, horn, bar, 4.0, r, q, 'horn', 0.22, 50, 62, voices=2, spread=5, a=0.35, r=0.6)
        tv = 0.45 if bar < 24 else 0.6
        perc.add(song.t(bar), timpani(bs + 12 if bs < 36 else bs, tv))
        perc.add(song.t(bar, 2), timpani(bs + 12 if bs < 36 else bs, tv * 0.6))
    if sec == 'A2' and bar in (12, 16):
        perc.add(song.t(bar), timpani(38, 0.35))

# melodies
melody(song, cel, 0, [('F#5',1),('A5',1),('D6',2)], lambda m, d, v: bell(m, v), vel=0.78)
melody(song, cel, 2, [('A5',1),('D6',1),('F#6',2)], lambda m, d, v: bell(m, v), vel=0.66)
melody(song, flute, 4, MEL_A, fl, gap=0.97, vel=0.72)
melody(song, violins, 12, MEL_A2, vln, gap=1.0, vel=0.62)
melody(song, flute, 12, COUNTER, lambda m, d, v: wind(m, d, 'flute', v, breath=0.035, a=0.18), gap=0.98, vel=0.34)
melody(song, violins, 20, MEL_B, vln, gap=1.0, vel=0.78)
melody(song, horn, 20, MEL_B, lambda m, d, v: hrn(m - 12, d, v), gap=1.0, vel=0.42)
melody(song, flute, 24, MEL_B[13:], fl, gap=0.97, vel=0.42)   # flute doubles the climax
melody(song, piano, 28, OUTRO, pno, gap=1.0, vel=0.55)
melody(song, cel, 29, [(None,2),('D6',1),('F#6',1),(None,4),('A5',1),('B5',1),('C#6',2)], lambda m, d, v: bell(m, v), vel=0.35)
# rising harp gliss into the climax (bar 23 beat 3-4) and cymbal swell
for i, n in enumerate(['A4','B4','C#5','D5','E5','F#5','G5','A5','B5','C#6','D6','E6','F#6','A6','B6','C#7']):
    harp.add(song.t(23, 2 + i * 0.125), pluck(nm(n), 0.35 + i * 0.02, None, 'harp'), -0.4 + i * 0.05)
perc.add(song.t(23, 0.5) - 0.0, swell(3.5 * song.beat, 0.4))
perc.add(song.t(27, 0), swell(4 * song.beat, 0.25))

ir = make_ir(2.8, 2.5, 1.8, 4.0)
y = mixdown(B, ir, 0.85)
y = fold_loop(y, song.Ls, 0.5)
y = master(y, 0.89)
np.save(sys.argv[1], y.astype(np.float32))
for k, v in list(globals().items()):
    if isinstance(v, Track): print('track', k, round(10 * np.log10(getattr(v, 'e', 0) / song.Ls + 1e-12), 1), 'dB')
print('loop seconds', song.L, 'samples', song.Ls, 'file', y.shape[1] / SR)
