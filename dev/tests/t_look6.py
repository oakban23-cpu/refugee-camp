import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=3);pg=await ctx.new_page()
        await pg.goto(URL);await pg.wait_for_timeout(2000)
        out=[]
        for cls in ['melee','archer','mage','sup']:
            await pg.evaluate(SETUP,[cls,'L6',99]);await pg.wait_for_timeout(800)
            await pg.evaluate("()=>{me.hp=me.mh=1e9;ov.hidden=true;enterMap(25,{x:1600,y:1200});me.gold=5e6;me.mat.rs=200;me.mat.ec=200;me.bag=[];['w','a','c','h','b'].forEach(sl=>setCraft('6:'+sl));me.bag.forEach(it=>{me.eq[it.sl]=it});me.bag=[];recalc();mons=[];ov.hidden=true;document.querySelectorAll('#stq,#clog').forEach(e=>e.style.display='none');banner=null}")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'l6_{cls}.png',clip={'x':150,'y':330,'width':90,'height':110})
            await pg.evaluate("()=>{location.reload()}");await pg.wait_for_timeout(2500)
    finally: p.terminate()
asyncio.run(main())
