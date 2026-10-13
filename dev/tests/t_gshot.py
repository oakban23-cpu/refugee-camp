import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
VW=int(sys.argv[1]);VH=int(sys.argv[2])
P={'land':(1600,2820),'lawn':(1600,1950),'rose':(860,1260),'pond':(1000,1800),'orch':(2500,1700),'pav':(1600,930),'tree':(1300,2350),'edge':(2900,2300)}
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':VW,'height':VH})
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','W'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{gmGod=true;me.sty={s:110,n:0,a:1,e:1,e4:1,p5m:16383};ov.hidden=true;enterMap(28,{x:1600,y:2860})}");await c.wait(2500)
        await pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        for nm,(x,y) in P.items():
            await c.ev(f"()=>{{me.x={x};me.y={y};banner=null;mons.length=0;PALG.title=null}}");await c.wait(1300)
            await c.ev("()=>{mons.length=0}");await c.wait(150)
            await pg.screenshot(path=f'../fx/gs_{nm}_{VW}.png')
        await c.ev("()=>{me.x=1600;me.y=1950;mons.length=0}");await c.wait(2500);await pg.screenshot(path=f'../fx/gs_mons_{VW}.png')
        print('errs',[e for e in c.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
