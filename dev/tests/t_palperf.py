import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','W'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{gmGod=true;me.sty={s:103,n:0,a:1,e:1,e4:1};ov.hidden=true;setGQ('high');window._dt=[];const _d=draw;window.draw=draw=function(){const t=performance.now();_d();_dt.push(performance.now()-t)}}")
        for m,x,y in [(29,1600,2600),(29,1600,1750),(29,1600,1750),(29,2440,1700),(29,2440,1700),(27,1600,1560)]:
            await c.ev(f"()=>{{if(curMap!=={m})enterMap({m},{{x:{x},y:{y}}});me.x={x};me.y={y}}}");await c.wait(2500)
            await c.ev("()=>{_dt=[]}");await c.wait(3000)
            r=await c.ev("()=>{const a=_dt.slice().sort((p,q)=>p-q);return [a.length,(a.reduce((s,v)=>s+v,0)/a.length).toFixed(2),a[Math.floor(a.length*.95)].toFixed(2),LOWQ]}")
            print(m,x,y,r)
        print('errs',c.errs[:4])
        await b.close()
    p.terminate()
asyncio.run(main())
