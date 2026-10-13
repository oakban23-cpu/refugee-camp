import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':900,'height':700})
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','W'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{gmGod=true;me.sty={s:103,n:0,a:1,e:1,e4:1};ov.hidden=true;enterMap(27,{x:1600,y:2700})}");await c.wait(2500)
        await pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        for nm,x,y in [('w_hall',1600,1900),('w_mirror',600,1700),('w_arch',2650,1250),('w_north',1600,800)]:
            await c.ev(f"()=>{{me.x={x};me.y={y};banner=null}}");await c.wait(1000)
            await pg.screenshot(path=f'../fx/p5_{nm}.png')
        print([e for e in c.errs][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
