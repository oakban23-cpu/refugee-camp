"""v566 ตรวจความลื่นบนมือถือรุ่นกลาง (จำลอง Galaxy A55: 384×832 · DPR 2.8125 · CPU ช้าลง ×THR)
   python3 perf566.py OUTDIR [SCENES]   SCENES = load,camp,pfn,pnq,cwn,mvp (คั่นด้วยจุลภาค)
   env THR (4) · SEC (8) · PROF=1 เก็บ CPU profile แยกตามฟังก์ชัน · HSRV = โฟลเดอร์เซิร์ฟเวอร์ที่จะวัด
   วัด: โหลด = ไบต์ที่ส่งจริง · เวลาจนหน้าปกพร้อม · เวลาสคริปต์ (CDP) · ฉาก = ms ต่อเฟรม (สคริปต์/งานหลัก) · fps · ฟังก์ชันที่กินเวลาสูงสุด"""
import asyncio, sys, json, os, time, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
SC = (sys.argv[2] if len(sys.argv) > 2 else 'load,camp,pfn,pnq,cwn,mvp').split(',')
THR = float(os.environ.get('THR', '4')); SEC = float(os.environ.get('SEC', '8')); PROF = os.environ.get('PROF') == '1'
VW, VH, DPR = 384, 832, 2.8125
BOTJS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'b10bot.js'), encoding='utf-8').read()
FR = """()=>new Promise(res=>{const T=[];let l=performance.now(),st=l;const f=t=>{T.push(t-l);l=t;if(t-st<%d)requestAnimationFrame(f);else res(T)};requestAnimationFrame(f)})"""
def callers(prof, names, top=10):
    nodes = {n['id']: n for n in prof['nodes']}; par = {}
    for n in prof['nodes']:
        for c in n.get('children', []): par[c] = n['id']
    dt = prof.get('timeDeltas', []); out = {}
    for i, sid in enumerate(prof.get('samples', [])):
        n = nodes.get(sid)
        if not n or n['callFrame']['functionName'] not in names: continue
        p = nodes.get(par.get(sid)); chain = []
        while p and len(chain) < 3:
            cf = p['callFrame']; chain.append((cf['functionName'] or '(anon)') + ':' + str(cf.get('lineNumber', 0))); p = nodes.get(par.get(p['id']))
        k = n['callFrame']['functionName'] + ' <- ' + ' <- '.join(chain)
        out[k] = out.get(k, 0) + (dt[i] if i < len(dt) else 0)
    return [(k, round(v / 1000, 1)) for k, v in sorted(out.items(), key=lambda x: -x[1])[:top]]
def incl(prof, top=30):
    nodes = {n['id']: n for n in prof['nodes']}; par = {}
    for n in prof['nodes']:
        for c in n.get('children', []): par[c] = n['id']
    dt = prof.get('timeDeltas', []); tot = {}
    for i, sid in enumerate(prof.get('samples', [])):
        d = dt[i] if i < len(dt) else 0; seen = set(); q = sid
        while q is not None:
            cf = nodes[q]['callFrame']
            if cf.get('lineNumber', -1) >= 0:
                k = (cf['functionName'] or '(anon)') + ':' + str(cf['lineNumber'])
                if k not in seen: seen.add(k); tot[k] = tot.get(k, 0) + d
            q = par.get(q)
    return [(k, round(v / 1000, 1)) for k, v in sorted(tot.items(), key=lambda x: -x[1])[:top]]
def agg(prof, top=18):
    nodes = {n['id']: n for n in prof['nodes']}; self_t = {}
    dt = prof.get('timeDeltas', []); smp = prof.get('samples', [])
    for i, s in enumerate(smp):
        n = nodes.get(s); d = dt[i] if i < len(dt) else 0
        if not n: continue
        cf = n['callFrame']; k = (cf['functionName'] or '(anon)') + ':' + str(cf.get('lineNumber', 0))
        self_t[k] = self_t.get(k, 0) + d
    tot = sum(self_t.values()) or 1
    return [(k, round(v / 1000, 1), round(v / tot * 100, 1)) for k, v in sorted(self_t.items(), key=lambda x: -x[1])[:top]]
async def metrics(cdp):
    m = await cdp.send('Performance.getMetrics'); return {x['name']: x['value'] for x in m['metrics']}
async def scene(b, name, setup, res):
    ctx = await b.new_context(viewport={'width': VW, 'height': VH}, device_scale_factor=DPR, has_touch=True, is_mobile=True)
    pg = await ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
    cdp = await ctx.new_cdp_session(pg); await cdp.send('Performance.enable')
    if name == 'load':
        await cdp.send('Network.enable'); tot = {'b': 0}
        cdp.on('Network.loadingFinished', lambda e: tot.__setitem__('b', tot['b'] + e.get('encodedDataLength', 0)))
        await cdp.send('Emulation.setCPUThrottlingRate', {'rate': THR})
        t0 = time.time(); await pg.goto(URL, wait_until='load'); t1 = time.time()
        # หน้าปกพร้อม = ปุ่มเริ่มกดได้ (มี #ttl และวาดเฟรมแล้ว 5 เฟรม)
        await pg.wait_for_function("()=>!!document.getElementById('ttl')", timeout=120000)
        await pg.evaluate(FR % 300); t2 = time.time()
        m = await metrics(cdp)
        nav = await pg.evaluate("()=>{const n=performance.getEntriesByType('navigation')[0];return n?{dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),size:n.encodedBodySize,dec:n.decodedBodySize}:null}")
        heap = await pg.evaluate("()=>performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):null")
        res['load'] = {'bytes': tot['b'], 'html_enc': nav and nav['size'], 'html_dec': nav and nav['dec'], 'dcl_ms': nav and nav['dcl'], 'load_ms': nav and nav['load'], 'title_s': round(t2 - t0, 2),
                       'script_s': round(m.get('ScriptDuration', 0), 2), 'task_s': round(m.get('TaskDuration', 0), 2), 'heap_mb': heap, 'thr': THR}
        print('load', json.dumps(res['load']), flush=True)
        await ctx.close(); return
    await pg.goto(URL); await pg.wait_for_timeout(2500)
    await pg.evaluate(SETUP, ['archer', 'Pf' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
    await pg.evaluate("()=>{try{lqWindow=function(){}}catch(e){};window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true}")
    await pg.evaluate(BOTJS)
    await pg.evaluate(setup); await pg.wait_for_timeout(4000)
    await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;banner=null}")
    await pg.wait_for_timeout(1500)
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': THR}); await pg.wait_for_timeout(1500)
    m0 = await metrics(cdp)
    if PROF:
        await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', {'interval': 500}); await cdp.send('Profiler.start')
    T = await pg.evaluate(FR % int(SEC * 1000))
    m1 = await metrics(cdp)
    top = None
    if PROF:
        p = await cdp.send('Profiler.stop'); top = agg(p['profile'])
        JS = [t for t in agg(p['profile'], 400) if not t[0].endswith(':-1')][:25]; INC = incl(p['profile'])
        AL = agg(p['profile'], 100000); JSS = sum(t[1] for t in AL if not t[0].endswith(':-1')); NAT = sum(t[1] for t in AL if t[0].endswith(':-1') and not t[0].startswith('(')); GC = sum(t[1] for t in AL if t[0].startswith('(garbage'))
        r_c = callers(p['profile'], ('save', 'drawImage', 'restore', 'getContext', 'getBoundingClientRect'))
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 1})
    n = max(1, len(T)); st = await pg.evaluate("()=>({acc:(()=>{try{const c=document.createElement('canvas').getContext('2d');return c.getContextAttributes?JSON.stringify(c.getContextAttributes()):''}catch(e){return''}})(),map:curMap,mons:mons.length,others:Object.keys(others).length,lowq:LOWQ,gq:GQ,dpr:typeof DPR!=='undefined'?DPR:null,ph:dg&&dg.ph})")
    T2 = sorted(T)
    r = {'frames': n, 'fps': round(n / SEC, 1), 'p50': round(T2[n // 2], 1), 'p90': round(T2[int(n * .9)], 1), 'script_ms': round((m1['ScriptDuration'] - m0['ScriptDuration']) * 1000 / n, 1),
         'task_ms': round((m1['TaskDuration'] - m0['TaskDuration']) * 1000 / n, 1), 'st': st, 'errs': errs[:3]}
    if top: r['top'] = top
    if PROF: r['callers'] = r_c
    if PROF: r['js'] = JS; r['incl'] = INC; r['js_ms'] = round(JSS / n, 1); r['canvas_ms'] = round(NAT / n, 1); r['gc_ms'] = round(GC / n, 1)
    res[name] = r; print(name, json.dumps({k: v for k, v in r.items() if k not in ('top','callers','js','incl')}, ensure_ascii=False), flush=True)
    if top:
        for t in top[:12]: print('    ', t, flush=True)
        for t in r['js'][:20]: print('   J', t, flush=True)
        for t in r['incl'][:20]: print('   I', t, flush=True)
    await pg.screenshot(path=f'{OUT}/{name}.jpg', type='jpeg', quality=60)
    await ctx.close()
FAKE = """()=>{const t=Object.values(others)[0];return t?1:0}"""
SET = {
  # ค่ายผู้อพยพ ตอนคนเยอะ: ผู้เล่นปลอม 10 คน (ชุด/อาวุธ/พาหนะ/สัตว์เลี้ยงต่างกัน) เดินวนรอบตัว
  'camp': """()=>{enterMap(1,{x:CX,y:CY+120});setTimeout(()=>{const C=['melee','archer','mage','assn','sup'];for(let i=0;i<10;i++){const u='fk'+i;others[u]={u,n:'คนที่'+i,cls:C[i%5],lv:99,x:CX+Math.cos(i)*160,y:CY+120+Math.sin(i)*110,hp:1e4,mh:1e4,fx:1,mt:(i%10)+1,rd:i%3===0?1:0,pt:(i%14)+1,aw:1,wp:{r:4,L:99},sl:0,at:0};}
     window.__fk=setInterval(()=>{const t=performance.now()/1000;let i=0;for(const u in others){if(!u.startsWith('fk'))continue;const o=others[u];o.x=CX+Math.cos(i+t*.3)*(150+i*8);o.y=CY+120+Math.sin(i+t*.3)*(100+i*5);o.fx=Math.sin(i+t*.3)>0?-1:1;o.mv=1;i++}},50);BOT.on=false},1200)}""",
  'pfn': """()=>{me.sty.s=STY.length;pfnEnter();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};pfnStart();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};BOT.reset();BOT.on=true},1500)},1500)}""",
  'pnq': """()=>{me.sty.s=STY.length;pnqEnter();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};pnqStart();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};BOT.reset();BOT.on=true},1500)},1500)}""",
  'cwn': """()=>{me.sty.s=STY.length;cwnEnter();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};cwnStart();setTimeout(()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};BOT.reset();BOT.on=true},1500)},1500)}""",
  # บอสโลก/MVP: แมพบอส MVP + เรียกบอสทันที ให้บอทสู้
  'mvp': """()=>{enterMap(8,{x:CX,y:CY});setTimeout(()=>{try{mons=mons.filter(m=>m.t!==3);spawnBoss();const B=mons.find(m=>m.t===3);if(B){B.mh*=100;B.hp=B.mh;me.x=B.x+120;me.y=B.y+40}}catch(e){};BOT.reset();BOT.on=true},1500)}""",
}
async def main():
    p = start_server(); res = {}
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(args=['--enable-precise-memory-info']+(['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-gpu-rasterization','--enable-accelerated-2d-canvas'] if os.environ.get('GPU') else []))
            for s in SC:
                try:
                    await scene(b, s, SET.get(s, ''), res)
                except Exception as e:
                    print('ERR', s, str(e)[:300], flush=True); res[s] = {'err': str(e)[:300]}
    finally:
        p.terminate()
    json.dump(res, open(f'{OUT}/perf.json', 'w'), ensure_ascii=False, indent=1)
asyncio.run(main())
