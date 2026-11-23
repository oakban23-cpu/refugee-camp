"""t_prof.py · CPU profile (CDP Profiler) ต่อสถานการณ์ → Top ฟังก์ชันตาม self time / total time
ใช้: HSRV=<build> python3 t_prof.py <out.json> [mode=full|low]"""
import asyncio, sys, json, collections
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT = sys.argv[1]
ARG = dict(a.split('=', 1) for a in sys.argv[2:] if '=' in a)
MODE = ARG.get('mode', 'full')
CL = "()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;try{ov.hidden=true}catch(e){};if(!window.__hpk)window.__hpk=setInterval(()=>{try{me.down=0;me.hp=me.mh}catch(e){}},200)}"
GO = "async([m,x,y])=>{if(curMap!==m)enterMap(m,{x:x||MAPS[m].sx||1600,y:y||MAPS[m].sy||1600});await new Promise(r=>setTimeout(r,2500));me.x=x||me.x;me.y=y||me.y}"
PIN = "(m)=>{window.__pin=setInterval(()=>{try{FQ.avg=10;FQ.bad=0;HD2.fq=999;BXM.fq=999;OL.fq=999}catch(e){}try{if(m==='low'){if(!LOWQ){LOWQ=true;applyQ()}}else if(LOWQ){LOWQ=false;applyQ()}}catch(e){}},50);try{setGQ(m==='low'?'low':'high')}catch(e){}}"

def agg(prof):
    nodes = {n['id']: n for n in prof['nodes']}
    parent = {}
    for n in prof['nodes']:
        for c in n.get('children', []):
            parent[c] = n['id']
    self_t = collections.Counter()
    tot_t = collections.Counter()
    js_t = collections.Counter()
    dts = prof['timeDeltas']
    samples = prof['samples']
    total = 0
    for sid, dt in zip(samples, dts[1:] + [0]):
        total += dt
        n = nodes[sid]
        cf = n['callFrame']
        key = '%s:%d' % (cf['functionName'] or '(anon)', cf['lineNumber'] + 1)
        self_t[key] += dt
        # เวลา native (drawImage/save/fill…) → นับให้ฟังก์ชัน JS ที่เรียกโดยตรง
        cur = sid
        while cur is not None and nodes[cur]['callFrame']['lineNumber'] < 0 + 1 and nodes[cur]['callFrame']['url'] == '':
            cur = parent.get(cur)
        if cur is not None:
            c = nodes[cur]['callFrame']
            js_t['%s:%d' % (c['functionName'] or '(anon)', c['lineNumber'] + 1)] += dt
        seen = set()
        cur = sid
        while cur is not None:
            c = nodes[cur]['callFrame']
            k = '%s:%d' % (c['functionName'] or '(anon)', c['lineNumber'] + 1)
            if k not in seen:
                tot_t[k] += dt
                seen.add(k)
            cur = parent.get(cur)
    cat = collections.Counter(); jsf = collections.Counter()
    for sid, dt in zip(samples, dts[1:] + [0]):
        cf = nodes[sid]['callFrame']; nm = cf['functionName']
        if cf['url']:
            cat['js'] += dt; jsf['%s:%d' % (nm or '(anon)', cf['lineNumber'] + 1)] += dt
        elif nm in ('(program)', '(idle)', '(garbage collector)', '(root)'):
            cat[nm] += dt
        else:
            cat['native:' + nm] += dt
    f = lambda c: [[k, round(v / total * 100, 1)] for k, v in c.most_common(30)]
    return dict(total_ms=round(total / 1000), self=f(self_t), total=f(tot_t), jsself=f(js_t), cat=f(cat), jsonly=f(jsf))

async def prof_win(pg, cdp, label, res, sec=6):
    await pg.wait_for_timeout(2000)
    await cdp.send('Profiler.start')
    await pg.wait_for_timeout(int(sec * 1000))
    p = (await cdp.send('Profiler.stop'))['profile']
    a = agg(p)
    res[label] = a
    print('==', label, a['total_ms'], 'ms')

    print('   cat', a['cat'][:8])
    fr = await pg.evaluate("()=>new Promise(r=>{let n=0;const t0=performance.now();const f=()=>{n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/((performance.now()-t0)/1000))};requestAnimationFrame(f)})")
    js = sum(v for k, v in a['cat'] if k == 'js')
    print('   fps %.1f  pureJS %.1f%% = %.1f ms/frame' % (fr, js, js / 100 * 1000 / max(fr, .1)))
    a['fps'] = fr
    for k, v in a['jsonly'][:12]:
        print('   jsonly %5.1f%%  %s' % (v, k))

async def main():
    p = start_server()
    res = {}
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            ctx = await b.new_context(viewport={'width': 915, 'height': 412}, device_scale_factor=2, is_mobile=True, has_touch=True)
            pg = await ctx.new_page()
            cdp = await ctx.new_cdp_session(pg)
            await cdp.send('Profiler.enable')
            await cdp.send('Profiler.setSamplingInterval', {'interval': 200})
            await pg.goto(URL); await pg.wait_for_timeout(3500)
            await pg.evaluate(PIN, MODE)
            await prof_win(pg, cdp, 'S1 title', res)
            await pg.evaluate(SETUP, ['mage', 'Prf1', 80]); await pg.wait_for_timeout(3500); await pg.evaluate(CL)
            await pg.evaluate(GO, [1, 1600, 1700]); await pg.evaluate(CL)
            await prof_win(pg, cdp, 'S2 camp', res)
            await pg.evaluate(GO, [9, 1600, 1950]); await pg.evaluate(CL)
            await pg.wait_for_timeout(3000)
            await prof_win(pg, cdp, 'S3 astra south', res)
            await pg.evaluate(GO, [2, 0, 0]); await pg.evaluate(CL)
            await pg.evaluate("()=>{const ms=mons.filter(m=>m.t!==3&&m.hp>0);if(ms.length){me.x=ms[0].x-60;me.y=ms[0].y}AUTO.on=true;window.__sk=setInterval(()=>{for(const k of[0,1,3]){try{useSkill(k)}catch(e){}}},700)}")
            await prof_win(pg, cdp, 'S4 combat', res)
            await pg.evaluate("()=>{clearInterval(window.__sk);AUTO.on=false}")
            await pg.evaluate(GO, [44, 0, 0]); await pg.evaluate(CL)
            await prof_win(pg, cdp, 'S6 map44', res)
            await pg.evaluate(GO, [1, 1600, 1700]); await pg.evaluate(CL)
            await pg.evaluate("()=>{try{gearUI()}catch(e){}}")
            await prof_win(pg, cdp, 'S7 gear open', res)
    finally:
        p.terminate()
        json.dump(res, open(OUT, 'w'), ensure_ascii=False, indent=1)
asyncio.run(main())
