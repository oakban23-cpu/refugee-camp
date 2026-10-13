import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
VW=int(sys.argv[1]) if len(sys.argv)>1 else 900
VH=int(sys.argv[2]) if len(sys.argv)>2 else 700
SPOTS=sys.argv[3].split(',') if len(sys.argv)>3 else None
P={'serv':(1600,2830),'nave':(1600,1560),'mir':(620,1720),'arc':(2700,1400),'dawn':(2520,2330),'thr':(1600,780),'orr':(560,640),'gard':(2660,660),'door':(1600,470),'mir2':(420,1500),'arc2':(2300,1250)}
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':VW,'height':VH})
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','W'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{gmGod=true;me.sty={s:103,n:0,a:1,e:1,e4:1};ov.hidden=true;enterMap(27,{x:1600,y:2700})}");await c.wait(2500)
        await pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        for nm in (SPOTS or P.keys()):
            x,y=P[nm]
            await c.ev(f"()=>{{me.x={x};me.y={y};banner=null;mons.length=0}}");await c.wait(1400)
            await c.ev("()=>{mons.length=0}");await c.wait(150)
            await pg.screenshot(path=f'../fx/px_{nm}_{VW}.png')
        print('errs',[e for e in c.errs][:6])
        print(await c.ev("()=>({ch:PALC.m.size,trees:trees.length,dec:PAL.dec.length})"))
        await b.close()
    p.terminate()
asyncio.run(main())
