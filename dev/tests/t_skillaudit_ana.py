import json,sys,collections,glob
R=[]
for f in sorted(glob.glob('meas_*.json')):R+=json.load(open(f))
def summ(r):
    if 'err' in r:return f"{r['cls']} {r['state']} k{r['k']}{r['e']} ERR {r['err']}"
    P=r['P']*(r.get('rnPow') or 1);pd=r['pd']
    H=r['H'];ids=set(h[2] for h in H)
    mult=collections.Counter(round(h[1]/pd/r['P'],2) for h in H)
    top=', '.join(f"{m}x{n}" for m,n in sorted(mult.items(),key=lambda x:-x[1])[:6])
    span=(min(h[0] for h in H),max(h[0] for h in H)) if H else None
    cks=sorted(set(h[3] for h in H))
    F=collections.Counter(f[1] for f in r['F']);fx=' '.join(f"{k}{'x'+str(n) if n>1 else ''}" for k,n in F.items())
    fxr=sorted(set(f"{f[1]}:r{f[2]}" + (f":d{f[3]}" if f[3] else '') for f in r['F'] if f[1] not in ('msg','u3bn','pc','el','rx','emo','tb')))[:10]
    KEEP=['shield','shv','inv3','rage','rgP','stealth','taunt','clone','clone2','mark','atk','rcrT','rasT','s6gT','s6rT','rnBlood','rnRock','rnThorn','rnSmk','rnSpin','rnD2','bst','combo','pull','dg','cast','mp','rsp','s2cd','zsT','free','freeC']
    me1={k:v for k,v in r['me150'].items() if k in KEEP or k.startswith('rn') or k.startswith('s6')}
    cc=collections.Counter();cc2=collections.Counter()
    for m in r['mon150']:
        for k in m:
            if k not in('id','x','y'):cc[k]+=1
    for m in r['mon1400']:
        for k in m:
            if k not in('id','x','y'):cc2[k]+=1
    heal=r['hp']-round(r['mh']*.5)
    return (f"{r['cls']:6} {r['state']:4} k{r['k']}{r['e'] or '-'} «{r['name']}» mp{r['mp']}/{r['mcBase']} cd{r['cd']}/{r['cdBase']} P{r['P']} rn{r.get('rnPow')} dx{r['dx']} dy{r['dy']} pose:{r.get('cast')}\n"
            f"    hits {len(H)} on {len(ids)} mons, t={span}, ck={cks}\n    mult(d/pd/P): {top}\n    fx: {fx}\n    fxr: {fxr}\n    fields: {r['fields']}\n"
            f"    me: {json.dumps(me1,ensure_ascii=False)[:400]}\n    monCC@.15s {dict(cc)} @1.4s {dict(cc2)}  heal:{heal} ({round(heal/r['mh']*100)}%)  errs:{r['errs'][:2]}")
for r in R:
    if len(sys.argv)>1 and r['cls'] not in sys.argv[1].split(','):continue
    print(summ(r))
