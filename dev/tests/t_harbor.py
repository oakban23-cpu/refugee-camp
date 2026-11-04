import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':1200,'height':900})).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Hb' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;enterMap(38,{x:2000,y:1800})}"); await pg.wait_for_timeout(4000)
            for i,(x,y) in enumerate([(2000,1800),(2400,1800),(2000,1400),(2400,1400),(2800,1700),(1700,2100)]):
                await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x={x};me.y={y}}}"); await pg.wait_for_timeout(900)
                await pg.screenshot(path=f'np/hb_{i}.jpg', type='jpeg', quality=70)
    finally:
        p.terminate()
asyncio.run(main())
