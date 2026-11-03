import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Am' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY});me.x=CX+60;me.y=CY+150}"); await pg.wait_for_timeout(9000)
            await pg.evaluate("()=>{banner=null;document.querySelectorAll('#bnr,.bnr,#toast').forEach(e=>e.remove())}")
            await pg.screenshot(path='np/v584_day2.jpg', type='jpeg', quality=88)
            await pg.evaluate("()=>{window.DNH=21.5;me.x=CX-CAMP.R-260;me.y=CY+200}"); await pg.wait_for_timeout(2500)
            await pg.screenshot(path='np/v584_night2.jpg', type='jpeg', quality=88)
    finally:
        p.terminate()
asyncio.run(main())
