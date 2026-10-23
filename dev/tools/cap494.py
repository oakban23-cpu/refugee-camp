import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['melee','Arin'+str(random.randint(10,99)),30]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){};banner=null;fsIOS=()=>true;PWA.ev=null;pwaCard('ios')}");await pg.wait_for_timeout(600)
        await pg.screenshot(path='../v494/card.png',clip={'x':0,'y':90,'width':390,'height':430})
        await pg.evaluate("()=>{document.querySelector('#pwac .pwab').click()}");await pg.wait_for_timeout(2500)
        el=await pg.query_selector('#accbox');bb=await el.bounding_box()
        await pg.screenshot(path='../v494/acc.png',clip={'x':0,'y':max(0,bb['y']-20),'width':390,'height':min(360,bb['height']+40)})
    finally: p.terminate()
asyncio.run(main())
