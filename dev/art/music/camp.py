# REFUGEE character select ("Campfire Gathering") – G major, 92 bpm, 3/4, 32-bar loop (~62.6 s)
# shares the main theme's opening motif (3rd–5th–root leap) in a waltz rhythm
import sys, numpy as np
from comp import *

song = Song(92, 3, 32)
B = song.bus
gtr = Track(B, -0.18, 0.22, 1.25)
gbass = Track(B, -0.1, 0.15, 1.3)
oca = Track(B, 0.15, 0.28, 0.6)
fid = Track(B, 0.25, 0.3, 0.7)
padt = Track(B, 0.0, 0.35, 0.6)
perc = Track(B, 0.0, 0.12, 1.0)
amb = Track(B, 0.0, 0.05, 1.0)
cel = Track(B, -0.35, 0.4, 1.1)

IN_CH = [(55,'M',43),(48,'M',43),(55,'M',43),(50,'sus4',38)]
A_CH = [(55,'M',43),(50,'M',42),(52,'m',40),(48,'M',36),(55,'M',47),(48,'M',36),(57,'m7',45),(50,'M',38)]
A2_CH = A_CH[:6] + [(57,'m7',45),(55,'M',43)]
B_CH = [(52,'m',40),(48,'M',36),(55,'M',43),(50,'M',38),(52,'m',40),(48,'M',36),(57,'m7',45),(50,'7',38)]
OUT_CH = [(55,'M',43),(48,'M',36),(55,'M',47),(50,'sus4',38)]
CH = IN_CH + A_CH + A2_CH + B_CH + OUT_CH

MEL_A = [('B4',.5),('D5',.5),('G5',1.5),('F#5',.5), ('F#5',1),('E5',.5),('D5',.5),('A5',1), ('G5',1.5),('F#5',.5),('E5',1), ('E5',1.5),('D5',.5),('C5',1),
 ('B4',.5),('D5',.5),('G5',1.5),('A5',.5), ('C6',1.5),('B5',.5),('G5',1), ('A5',1),('G5',.5),('E5',.5),('F#5',1), ('A5',3)]
MEL_A2 = MEL_A[:-5] + [('A5',1),('G5',.5),('E5',.5),('F#5',1), ('G5',3)]
MEL_B = [('E5',1),('G5',1),('B5',1), ('C6',1.5),('B5',.5),('G5',1), ('D6',1),('B5',1),('G5',1), ('A5',2),('F#5',1),
 ('G5',.5),('A5',.5),('B5',2), ('C6',1),('B5',.5),('A5',.5),('G5',1), ('A5',1),('E5',1),('C6',1), ('C6',1),('A5',1),('F#5',1)]
HARM_B = [('B4',3),('E5',3),('D5',3),('D5',3),('B4',3),('E5',3),('C5',3),('C5',3)]
OUTRO = [('B4',.5),('D5',.5),('G5',2), ('E5',3), ('D5',3), (None,3)]

def oc(m, d, v): return wind(m, d, 'ocarina', v, a=0.05, r=0.16, breath=0.06, vdepth=0.005)
def fd(m, d, v):
    out = sustain(m, d, 'fiddle', v, voices=2, spread=4, a=0.09, r=0.3, vrate=5.6, vdepth=0.005, vdelay=0.18)
    return sum(y for y, p in out)

for bar, (r, q, bs) in enumerate(CH):
    sec = 'in' if bar < 4 else 'A' if bar < 12 else 'A2' if bar < 20 else 'B' if bar < 28 else 'out'
    gv = {'in': 0.62, 'A': 0.55, 'A2': 0.55, 'B': 0.5, 'out': 0.55}[sec]
    patt = [0, 2, 3, 4, 3, 2] if bar % 4 != 3 else [0, 2, 3, 5, 4, 3]
    if q == 'sus4':
        arp(song, gtr, bar, 1.5, r, 'sus4', patt[:3], 0.5, gv, kind='guitar'); arp(song, gtr, bar + 0.5, 1.5, r, 'M', patt[3:], 0.5, gv, kind='guitar')
    elif bar == 18:  # Am7 | D7 split
        arp(song, gtr, bar, 2, 57, 'm7', patt[:4], 0.5, gv, kind='guitar'); arp(song, gtr, bar + 2 / 3, 1, 50, '7', [2, 3], 0.5, gv, kind='guitar')
    else:
        arp(song, gtr, bar, 3, r, q, patt, 0.5, gv, kind='guitar')
    # thumb bass on 1 (and soft on 3 in B)
    bb = bs if bs >= 40 else bs + 12
    gbass.add(song.t(bar) + song.hum(0.004), pluck(bb, 0.7, 2.4 * song.beat, 'guitar'))
    if sec in ('A2', 'B'):
        gbass.add(song.t(bar, 2) + song.hum(0.004), pluck(bb + 7, 0.45, 0.9 * song.beat, 'guitar'))
    # warm pad
    pv = {'in': 0.2, 'A': 0.22, 'A2': 0.26, 'B': 0.32, 'out': 0.2}[sec]
    pad(song, padt, bar, 3.1, r, 'M' if q == 'sus4' and bar not in (3, 31) else q, 'string_soft', pv, 52, 67, voices=3, spread=8, a=0.7, r=0.9)
    # percussion: shaker 8ths (off-beats louder), frame drum on 1
    if sec in ('A2', 'B'):
        for i in range(6):
            perc.add(song.t(bar, i * 0.5) + song.hum(0.006), shaker(0.5 if i % 2 else 0.28), 0.3)
    if sec == 'B' or (sec == 'A2' and bar >= 16):
        perc.add(song.t(bar), framedrum(0.55, True), -0.1)
        if bar % 2: perc.add(song.t(bar, 2), framedrum(0.3, False), 0.15)

melody(song, cel, 0, [('B5',.5),('D6',.5),('G6',2)], lambda m, d, v: bell(m, v, 'celesta'), vel=0.55)
melody(song, cel, 2, [('D6',.5),('G6',.5),('B6',2)], lambda m, d, v: bell(m, v, 'celesta'), vel=0.45)
melody(song, oca, 4, MEL_A, oc, gap=0.96, vel=0.72)
melody(song, oca, 12, MEL_A2, oc, gap=0.96, vel=0.68)
melody(song, fid, 12, [(None, 3 * 4)] + [('D5',3),('E5',3),('E5',3),('D5',3)], fd, gap=1.0, vel=0.3)  # soft fiddle drone joins
melody(song, fid, 20, MEL_B, fd, gap=0.98, vel=0.66)
melody(song, oca, 20, HARM_B, oc, gap=0.98, vel=0.36)
melody(song, oca, 28, OUTRO, oc, gap=0.96, vel=0.5)
# campfire ambience (spans the whole loop + tail, folded → seamless)
amb.add(0, crackle(song.L + 6, 6.0, 0.16))
amb.add(0, crickets(song.L + 6, 0.012), 0.4)

ir = make_ir(1.7, 1.4, 0.9, 2.6, pre=0.015)
y = mixdown(B, ir, 0.8)
y = fold_loop(y, song.Ls, 0.5)
y = master(y, 0.89)
np.save(sys.argv[1], y.astype(np.float32))
for k, v in list(globals().items()):
    if isinstance(v, Track): print('track', k, round(10 * np.log10(getattr(v, 'e', 0) / song.Ls + 1e-12), 1), 'dB')
print('loop seconds', song.L, 'samples', song.Ls)
