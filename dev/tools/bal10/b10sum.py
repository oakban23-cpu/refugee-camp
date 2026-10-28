"""สรุปผลรัน b10out/*.json เป็นตาราง"""
import json, glob, sys, os
DIR = os.environ.get('B10DIR', 'b10out')
fs = sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), DIR, '*.json')), key=os.path.getmtime)
pat = sys.argv[1] if len(sys.argv) > 1 else ''
rows = []
for f in fs:
    if pat and pat not in os.path.basename(f):
        continue
    r = json.load(open(f))
    P = r.get('players') or []
    if not P:
        continue
    e = r.get('end') or next((p.get('end') for p in P if p.get('end')), None) or {}
    h = P[0]
    bt = h.get('bossT0')
    def agg(k):
        return sum((p.get(k) or 0) for p in P)
    hb = {}
    for p in P:
        for k, v in (p.get('hitBy') or {}).items():
            hb.setdefault(k, [0, 0]); hb[k][0] += v[0]; hb[k][1] += v[1]
    # objective bar at end
    sm = h.get('samp') or []
    last = sm[-1] if sm else []
    obj = ''
    if r['dg'] == 'pfn' and sm:
        mx = max(x[4] for x in sm if len(x) > 4); obj = f"ทรุดสูงสุด {mx}% · ท้าย {last[4] if len(last)>4 else ''}"
    elif r['dg'] == 'ptd' and sm:
        obj = f"ราก {last[4] if len(last)>4 else ''}"
    elif r['dg'] == 'pnq' and sm:
        mn = min(x[4] for x in sm if len(x) > 4); obj = f"ธรณินต่ำสุด {mn}% · ท้าย {last[4] if len(last)>4 else ''}"
    rows.append([os.path.basename(f)[:-5], r['dg'], '+'.join(c[:3] for c in r['cls']), r['prof'], r.get('var'), 'ชนะ' if e.get('win') else ('แพ้:' + e.get('why', '')[:22] if e else 'ไม่จบ'),
                 e.get('t', h.get('t')), round((e.get('t', h.get('t')) or 0) - (bt or 0)) if bt is not None else '', agg('deaths'), agg('pots'), round(min(p['minHp'] for p in P)),
                 agg('big'), agg('dodges'), f"ws {agg('wsI')}/{agg('wsF')}" if r['dg'] == 'pfn' else f"gn {agg('gnI')}/{agg('gnF')} egg {h.get('eggC')}/{h.get('eggH')}" if r['dg'] == 'pnq' else f"bur {h.get('burB')}/{h.get('burN')}" if r['dg'] == 'ptd' else '',
                 obj, ' '.join(f"{k}:{v[0]}/{round(v[1]/1000)}k" for k, v in sorted(hb.items(), key=lambda x: -x[1][1])[:5]), r.get('real')])
hdr = ['run', 'dg', 'cls', 'P', 'v', 'ผล', 'เวลา', 'บอส', 'ตาย', 'ยา', 'HPต่ำสุด%', 'โดนหนัก', 'กลิ้ง', 'กลไก', 'แถบ', 'โดนจาก', 'real']
for r in rows:
    print(' | '.join(str(x) for x in r[1:]))
