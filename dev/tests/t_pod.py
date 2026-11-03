import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs=[]
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Pd' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(4000)
            await pg.evaluate("()=>{const f=()=>{lbData=Object.assign(lbData||{},{wb:[['Kira','melee',60,999],['Kuma','mage',55,800],['Nox','ranged',40,500]]})};f();setInterval(f,200);me.x=WBS[0].x+70;me.y=WBS[0].y+60}")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path='np/v583_pod2.jpg', type='jpeg', quality=85)
            print(errs)
    finally:
        p.terminate()
asyncio.run(main())
