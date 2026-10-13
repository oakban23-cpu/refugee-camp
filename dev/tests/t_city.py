import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        print(await A.ev("()=>JSON.stringify({r:CITY.rects,c:CITY.circ,n:CITY.npcs.map(n=>[n.k,n.x|0,n.y|0])})"))
        for x,y,f in [(1300,2000,'c1'),(1900,2000,'c2'),(1200,1700,'c3')]:
            await A.ev(f"()=>{{gmGod=true;ov.hidden=true;if(curMap!==9)enterMap(9,{{x:{x},y:{y}}});me.x={x};me.y={y}}}");await A.wait(2500)
            await A.pg.screenshot(path='../p6/'+f+'.png')
        await b.close()
    p.terminate()
asyncio.run(main())
