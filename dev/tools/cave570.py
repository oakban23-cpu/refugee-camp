import asyncio,sys,json,os
sys.path.insert(0,'.')
from h import *
def agg(prof, top=18):
    nodes = {n['id']: n for n in prof['nodes']}; self_t = {}
    dt = prof.get('timeDeltas', []); smp = prof.get('samples', [])
    for i, sm in enumerate(smp):
        n = nodes.get(sm); d = dt[i] if i < len(dt) else 0
        if not n: continue
        cf = n['callFrame']; k = (cf['functionName'] or '(anon)') + ':' + str(cf.get('lineNumber', 0))
        self_t[k] = self_t.get(k, 0) + d
    return [(k, v / 1000) for k, v in self_t.items()]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Cv1',99]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{try{lqWindow=function(){}}catch(e){};gmGod=true;AUTO.on=false;ov.hidden=true;enterMap(24,{x:MAPS[24].sx||1600,y:MAPS[24].sy||1600})}");await pg.wait_for_timeout(6000)
        await pg.evaluate("()=>{ov.hidden=true;banner=null}")
        cdp=await ctx.new_cdp_session(pg);await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4});await pg.wait_for_timeout(1500)
        await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{'interval':500});await cdp.send('Profiler.start')
        fr=await pg.evaluate("()=>new Promise(res=>{let n=0;const t0=performance.now();const f=()=>{n++;if(performance.now()-t0<8000)requestAnimationFrame(f);else res(n)};requestAnimationFrame(f)})")
        pr=(await cdp.send('Profiler.stop'))['profile'];A=agg(pr,100000);tot=sum(t[1] for t in A)
        gl=sum(t[1] for t in A if t[0].startswith('glowAt'));js=sum(t[1] for t in A if not t[0].endswith(':-1'))
        print(json.dumps({'fps':round(fr/8,1),'glowAt_ms_per_frame':round(gl/fr,2),'js_ms_per_frame':round(js/fr,1)}))
    finally: p.terminate()
asyncio.run(main())
