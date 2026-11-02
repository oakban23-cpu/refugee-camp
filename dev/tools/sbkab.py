import asyncio,sys,json
sys.path.insert(0,'.')
from h import *
BOTJS=open('b10bot.js',encoding='utf-8').read()
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Ab1',99]);await pg.wait_for_timeout(1500);await pg.evaluate(BOTJS)
        cdp=await ctx.new_cdp_session(pg);await cdp.send('Performance.enable')
        for mp in sys.argv[1].split(','):
            await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}");await pg.wait_for_timeout(4000)
            await pg.evaluate("()=>{ov.hidden=true;const B=mons.filter(m=>m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(B){me.x=B.x+60;me.y=B.y}BOT.reset();BOT.on=true;window.__h=1;const hold=()=>{if(!window.__h)return;FQ.avg=40;requestAnimationFrame(hold)};requestAnimationFrame(hold)}")
            for rep in (1,2):
                for sb in (0,1):
                    await pg.evaluate(f"()=>{{SBK.on={sb};SBK.c.clear();SBK.used=0;MPC.auto=1;MPC.ck.bad=0}}")
                    await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4});await pg.wait_for_timeout(9000)
                    m0=await cdp.send('Performance.getMetrics')
                    fr=await pg.evaluate("()=>new Promise(res=>{let n=0;const t0=performance.now();const f=()=>{n++;if(performance.now()-t0<6000)requestAnimationFrame(f);else res(n)};requestAnimationFrame(f)})")
                    m1=await cdp.send('Performance.getMetrics');await cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
                    g=lambda m,k:[x['value'] for x in m['metrics'] if x['name']==k][0]
                    print(json.dumps({'map':mp,'rep':rep,'sbk':sb,'fps':round(fr/6,1),'script_ms':round((g(m1,'ScriptDuration')-g(m0,'ScriptDuration'))*1000/fr,1),'task_ms':round((g(m1,'TaskDuration')-g(m0,'TaskDuration'))*1000/fr,1),'mpcAuto':await pg.evaluate("()=>MPC.auto"),'ent':await pg.evaluate("()=>SBK.c.size")}),flush=True)
            await pg.evaluate("()=>{window.__h=0}")
    finally: p.terminate()
asyncio.run(main())
