# REFUGEE v664 – one unique track per world map (maps 11-45; maps 1-10 keep their v663 themes)
# Melodies come from a motif-based generator: 2-bar motif → sequence → return → cadence (A), contrasting B.
# Strong beats are always chord tones of that bar's chord; seeds make every map's tune different and repeatable.
import sys, json, numpy as np
import mapmus as mm
from mapmus import TH, render
from syn import pluck

MODES = {'major': [0,2,4,5,7,9,11], 'minor': [0,2,3,5,7,8,10], 'dorian': [0,2,3,5,7,9,10], 'mixo': [0,2,4,5,7,9,10],
         'lydian': [0,2,4,6,7,9,11], 'phryg': [0,1,3,5,7,8,10], 'hminor': [0,2,3,5,7,8,11], 'phrdom': [0,1,4,5,7,8,10]}
PROGS = {'major': [[1,5,6,4,1,4,5,1],[1,6,4,5,1,6,2,5],[1,4,1,5,6,4,2,5],[1,3,4,5,1,6,4,5]],
         'mixo': [[1,7,4,1,1,7,4,5],[1,4,7,1,1,4,5,1]], 'lydian': [[1,2,1,7,6,2,5,1],[1,2,5,1,6,2,3,1]],
         'minor': [[1,6,3,7,1,6,4,5],[1,4,7,3,6,4,5,1],[1,7,6,7,1,4,5,1],[1,6,7,1,4,6,5,1]],
         'dorian': [[1,4,1,7,1,4,5,1],[1,2,1,4,7,4,5,1]], 'phryg': [[1,2,1,7,1,2,6,5],[1,7,6,2,1,4,2,1]],
         'hminor': [[1,4,5,1,6,4,5,1],[1,6,4,5,1,4,7,1]], 'phrdom': [[1,2,1,7,1,2,1,1],[1,7,6,2,1,4,2,1]]}
# (map, name, mode, root, bpm, meter, leadA, leadB, leadC, acc, pad, bass, drums, amb, ir, mel_oct)
D4 = {'h': 'h...s.s.h...s.s.', 'march': 'T...t.t.T...t.tt', 'taiko': 'T.t.t.T.T.t.tttt', 'tick': 'k...k...k...k...', 'shanty': 'd...k.k.d.d.k...',
      'darb': 'd..k.kd.d.k.k.k.', 'city': 'h.s.h.shh.s.hs..', 'gear': 'k.k.k.k.k.k.k.km', 'soft': 'h.......h.......', 'bell': 'b...............'}
D3 = {'h': 'h...s.h...s.', 'waltz': 'd...k...k...', 'bell': 'b...........', 'soft': 'h...........'}
P = [
 (11,'Beyond the Rift','phryg',58,76,4,'choir_lead','glass','choir_lead','glass_arp','choir','drone',None,'void',(4.0,3.6,2.4),12),
 (12,'West Wind Bridge','mixo',53,96,3,'oboe','flute','oboe','guitar','string_soft','bass','h','wind',(1.8,1.5,0.9),12),
 (13,'The Forsaken Sky Garden','lydian',57,76,4,'flute','celesta','violin','harp','string_soft','bass','soft','birds',(2.6,2.2,1.4),12),
 (14,'Cloud Clocktower','minor',60,108,4,'glock','violin','glock','pizz','string_soft','bass_pulse','tick','cave',(2.2,1.8,1.0),0),
 (15,'Lake of Falling Stars','major',51,68,4,'piano','flute','piano','harp','choir','bass',None,'water',(3.2,2.8,1.8),12),
 (16,'Thunder Crystal Wood','minor',54,112,4,'brass','violin','brass','strings_8','string','bass_pulse','taiko',None,(2.0,1.7,1.0),12),
 (17,'Howling Chasm','dorian',50,84,3,'ney','oboe','ney','oud_drone','string_soft','drone','soft','wind',(2.8,2.4,1.4),12),
 (18,'Ruins of the Storm Temple','minor',58,92,4,'choir_lead','violin','choir_lead','ostinato','string','bass_pulse','march','wind',(3.0,2.6,1.4),12),
 (19,'Glowcap Forest','lydian',55,88,4,'celesta','flute','glock','pizz','string_soft','bass','soft','birds',(2.2,1.8,1.2),12),
 (20,'Violet Mire','phryg',52,70,3,'oboe','choir_lead','oboe','harp_sparse','string_soft','drone',None,'water',(3.2,2.8,1.6),12),
 (21,'City Beneath the Clouds','minor',57,80,4,'violin','piano','violin','piano','string_soft','bass','soft',None,(2.8,2.4,1.4),12),
 (22,'Abyss of the Shadow Throne','hminor',49,72,4,'choir_lead','brass','choir_lead','ostinato','string','drone','march','void',(3.6,3.2,2.0),12),
 (23,'Stone Root Hollow','dorian',50,92,4,'oboe','whistle','oboe','pizz','string_soft','bass_walk','h','cave',(2.0,1.7,1.0),12),
 (24,'Glowing Underground Lake','lydian',53,64,3,'glass','flute','celesta','harp','choir','bass',None,'cave',(3.8,3.4,2.2),12),
 (25,'Graveyard of a Hundred Knights','minor',55,76,4,'horn_lead','choir_lead','horn_lead','strings_8','string','bass','bell','wind',(3.2,2.8,1.6),12),
 (26,'Heart of the World','phrdom',52,120,4,'brass','violin','brass','ostinato','string','bass_pulse','taiko','fire',(2.0,1.7,1.0),12),
 (27,'Palace of Astra','major',62,88,3,'violin','flute','violin','harp','string_soft','bass','waltz',None,(2.8,2.4,1.4),0),
 (28,"The Queen's Hanging Garden",'major',55,72,3,'flute','violin','celesta','harp','string_soft','bass','soft','birds',(2.6,2.2,1.4),12),
 (29,'Throne of Stars','major',58,76,4,'horn_lead','choir_lead','violin','strings_8','choir','bass','march',None,(3.2,2.8,1.6),12),
 (30,'Bridge of Dawn','major',64,92,4,'violin','flute','violin','guitar','string_soft','bass','h','birds',(2.2,1.8,1.2),0),
 (31,'Lower Ring Quarter','mixo',57,104,4,'whistle','flute','whistle','banjo_chop','string_soft','bass_walk','city',None,(1.6,1.3,0.8),12),
 (32,'Ruins of Aranya','dorian',49,72,4,'ney','oud','ney','oud_drone','string_soft','drone','darb','wind',(2.4,2.0,1.2),12),
 (33,'The Hollow Heart','minor',59,60,3,'piano','violin','piano','harp_sparse','string_soft','bass',None,None,(3.2,2.8,1.8),0),
 (34,'Starfall Plains','mixo',50,100,4,'horn_lead','violin','horn_lead','strings_8','string','bass','march','wind',(2.4,2.0,1.2),12),
 (35,'Karn Star Mine','minor',54,104,4,'glock','whistle','glock','pizz','string_soft','bass_walk','gear','cave',(1.8,1.5,0.9),12),
 (36,'Orion Observatory','lydian',57,70,4,'celesta','choir_lead','glass','glass_arp','choir','drone',None,'void',(3.8,3.4,2.2),12),
 (38,'Cloud Harbor Cliffs','major',53,96,3,'whistle','oboe','whistle','guitar','string_soft','bass','waltz','wind',(1.8,1.5,0.9),12),
 (39,'Graveyard of Sky Ships','minor',50,66,3,'musicbox','oboe','musicbox','harp_sparse','string_soft','drone','bell','wind',(3.2,2.8,1.6),24),
 (40,'Plaza of Floating Stars','lydian',52,84,4,'glass','flute','glass','harp','choir','bass','soft',None,(3.0,2.6,1.6),12),
 (41,'The Gear Ring','minor',55,116,4,'brass','glock','brass','ostinato','string','bass_pulse','gear',None,(1.8,1.5,0.9),12),
 (42,'Star-Net Meadow','major',60,92,4,'flute','guitar_lead','flute','guitar','string_soft','bass','soft','crickets',(2.2,1.8,1.2),0),
 (43,'Mouth of the Sunken Land','minor',51,84,4,'choir_lead','brass','choir_lead','ostinato','string','drone','taiko','void',(3.2,2.8,1.6),12),
 (44,'City of Deep Roots','hminor',57,88,3,'oboe','oud','oboe','pizz','string_soft','bass','waltz','cave',(2.4,2.0,1.2),0),
 (45,"The World's Foundation",'minor',48,64,4,'brass','choir_lead','horn_lead','strings_8','string','drone','march','void',(3.6,3.2,2.0),12),
]
RH4 = [[(1,0),(1,0),(1.5,0),(.5,0),(2,0),(2,0)], [(1.5,0),(.5,0),(1,0),(1,0),(3,0),(1,1)], [(.5,0),(.5,0),(1,0),(2,0),(1,0),(1,0),(2,0)],
       [(2,0),(1,0),(1,0),(1.5,0),(.5,0),(2,0)], [(1,0),(.5,0),(.5,0),(2,0),(1,0),(1,0),(2,0)], [(.5,0),(.5,0),(.5,0),(.5,0),(1,0),(1,0),(3,0),(1,1)]]
RH3 = [[(1,0),(1,0),(1,0),(2,0),(1,0)], [(1.5,0),(.5,0),(1,0),(3,0)], [(.5,0),(.5,0),(2,0),(1,0),(2,0)], [(2,0),(1,0),(1,0),(1,0),(1,0)], [(1,0),(.5,0),(.5,0),(1,0),(3,0)]]
CAD4 = [(1,0),(1,0),(2,0),(3,0),(1,1)]; CAD3 = [(1,0),(1,0),(1,0),(3,0)]
LONG4 = [[(2,0),(2,0),(1.5,0),(.5,0),(2,0)], [(3,0),(1,0),(2,0),(2,0)], [(1,0),(1,0),(2,0),(4,0)]]
LONG3 = [[(2,0),(1,0),(3,0)], [(3,0),(1.5,0),(.5,0),(1,0)], [(1,0),(2,0),(3,0)]]

def gen_melody(T, rng, part='A'):
    M = T['meter']; sc = T['sc']; n = len(sc); prog = T['prog']; base = T['root'] + T['mel_oct']
    lo, hi = (2, 2 * n - 2) if part == 'A' else (4, 2 * n)
    def pc_ok(deg, bar):
        return mm.deg2m(T, deg, base) % 12 in {c % 12 for c in mm.chord_of(T, prog[bar])}
    def nearest_ct(target, bar):
        for d in range(0, 6):
            for s in (0, 1, -1) if d == 0 else (d, -d):
                g = target + s
                if lo <= g <= hi and pc_ok(g, bar): return g
        return max(lo, min(hi, target))
    def place(rhythm, bar0, start, contour, end_deg=None):
        out = []; b = 0.0; cur = start; k = 0; N = sum(1 for d, r in rhythm if not r)
        for i, (d, r) in enumerate(rhythm):
            if r: out.append((None, d)); b += d; continue
            bar = bar0 + int(b // M); beat = b % M; strong = beat == 0 or (M == 4 and beat == 2) or d >= 1.5
            tgt = cur + contour[k % len(contour)]; k += 1
            last = (i == len([1 for _ in rhythm]) - 1) or all(rr for _, rr in rhythm[i + 1:])
            if last and end_deg is not None: g = nearest_ct(end_deg, bar)
            elif strong: g = nearest_ct(tgt, bar)
            else:
                g = max(lo, min(hi, tgt))
                if abs(g - cur) > 2: g = cur + (2 if g > cur else -2)
            out.append((g, d)); cur = g; b += d
        return out, cur
    RH = RH4 if M == 4 else RH3; CAD = CAD4 if M == 4 else CAD3; LG = LONG4 if M == 4 else LONG3
    tonic = 1 + n if part == 'A' else 1 + n
    shapes = [[0, 1, 1, 2, -1, -1, 0], [2, -1, -1, 1, 2, -2, 0], [0, 2, 1, -1, -1, -1, 1], [1, 1, -2, 2, 1, -1, -2], [0, -1, 2, 2, -1, -2, 1]]
    if part == 'A':
        r1 = RH[rng.integers(len(RH))]; sh = shapes[rng.integers(len(shapes))]; st = int(rng.integers(lo + 1, lo + 5))
        m1, c1 = place(r1, 0, st, sh)
        seq = int(rng.choice([1, 2, -1, 3]))
        m2, c2 = place(r1, 2, st + seq, sh)
        m3, c3 = place(r1, 4, st, sh[::-1] if rng.random() < .5 else sh)
        m4, c4 = place(CAD, 6, c3, [-1, -1, 0, 0], end_deg=tonic)
        return m1 + m2 + m3 + m4
    r1 = LG[rng.integers(len(LG))]; sh = shapes[rng.integers(len(shapes))]; st = int(rng.integers(n + 1, n + 4))
    m1, c1 = place(r1, 0, st, sh)
    m2, c2 = place(r1, 2, st + int(rng.choice([1, -1, 2])), sh)
    r2 = RH[rng.integers(len(RH))]
    m3, c3 = place(r2, 4, c2, [1, 1, -1, 2, -1])
    m4, c4 = place(CAD, 6, c3, [-1, 0, -1, 0], end_deg=5 + n if rng.random() < .5 else tonic)
    return m1 + m2 + m3 + m4

def setup(entry):
    (mid, name, mode, root, bpm, meter, lA, lB, lC, acc, pad, bass, drums, amb, ir, mo) = entry
    rng = np.random.default_rng(1000 + mid)
    sc = MODES[mode]; prog = PROGS[mode][rng.integers(len(PROGS[mode]))]
    dr = {}
    if drums:
        pat = (D4 if meter == 4 else D3).get(drums) or D4.get(drums, '')
        if meter == 3 and len(pat) > 12: pat = pat[:12]
        dr = {'all': pat}
    bellish = lA in ('celesta', 'glock', 'musicbox', 'glass')
    tgt = 70 if bellish else (57 if lA in ('choir_lead', 'brass', 'horn_lead') else 61)
    mo = min((o for o in (-12, 0, 12, 24)), key=lambda o: abs(root + o - tgt))
    T = dict(name=name, bpm=bpm, meter=meter, root=root, sc=sc, prog=prog, intro=4 if bpm >= 84 else 2, leadA=lA, leadB=lB, leadC=lC, acc=acc, pad=pad, bass=bass,
             drums=dr, amb=amb, ir=ir, loud=-18 if bpm >= 90 else -19, mel_oct=mo, padv=0.3 if acc == 'banjo_chop' else 0.5 if acc in ('pizz', 'oud_drone') else 0.62, dronev=0.6, lead_comp=1.9)
    T['A'] = gen_melody(T, rng, 'A'); T['B'] = gen_melody(T, rng, 'B')
    return 'p%d' % mid, T

ALL = dict(setup(e) for e in P)
TH.update(ALL)

if __name__ == '__main__':
    k = sys.argv[1]
    if k == 'check':
        for key, T in ALL.items():
            base = T['root'] + T['mel_oct']; ms = [mm.deg2m(T, d, base) for d, _ in T['A'] + T['B'] if d]
            la = sum(b for _, b in T['A']); lb = sum(b for _, b in T['B'])
            print(key, T['name'], 'range', min(ms), max(ms), 'len', la, lb, 'prog', T['prog'])
    else:
        info = render(k, sys.argv[2]); info['name'] = TH[k]['name']; print(json.dumps(info))
