import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':390,'height':844})
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','W'+str(random.randint(1000,9999)),40]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{gmGod=true;me.sty={s:103,n:0,a:1,e:1,e4:1};ov.hidden=true;enterMap(27,{x:1600,y:2700})}");await c.wait(2000)
        g0=await c.ev("()=>me.gold")
        for i in range(8):
            await c.ev(f"()=>{{const L=PALLORE[{i}];me.x=L.x;me.y=L.y+2;mons.length=0}}");await c.wait(500)
        await c.wait(3200)
        print('lore',await c.ev("()=>[me.sty.p5m,me.sty.p5mr,me.gold-"+str(g0)+",PALG.card&&PALG.card.h]"))
        await pg.screenshot(path='../fx/px_card.png')
        # constellation crown
        for x,y in [[1230,1395],[1268,1292],[1310,1362],[1352,1292],[1392,1395]]:
            await c.ev(f"()=>{{me.x={x};me.y={y};mons.length=0}}");await c.wait(250)
        print('cons',await c.ev("()=>[me.shrB,PALG.aw[0]>performance.now(),banner&&banner.s]"))
        await pg.screenshot(path='../fx/px_cons.png')
        # mirror ghost: mirror index 1 (y=1300)
        await c.ev("()=>{const t=PAL.mirs[1];me.x=t.x+30;me.y=t.y+80;mons.length=0}");await c.wait(2200)
        print('mir',await c.ev("()=>[PAL.mirs[1].mi,!!PALG.mg[1],dn.some(d=>String(d.v).includes('ผู้ถือตรา'))]"))
        await pg.screenshot(path='../fx/px_mirghost.png')
        await c.ev("()=>{me.x=2400;me.y=2250;mons.length=0}");await c.wait(3000)
        await pg.screenshot(path='../fx/px_dawnghost.png')
        print('errs',c.errs[:4])
        await b.close()
    p.terminate()
asyncio.run(main())
