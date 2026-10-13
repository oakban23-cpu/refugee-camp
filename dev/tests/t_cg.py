import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.length-1)")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:0,e:1,e4:2}};ov.hidden=true;enterMap(9,{{x:1200,y:2100}})}}");await A.wait(2500)
        for gx,gy,f in [(1200,2045,'cg1'),(1460,2020,'cg2'),(1050,2050,'cg3')]:
            await A.ev(f"()=>{{const G=MAPS[9].gates.find(g=>g.mk);G.x={gx};G.y={gy};me.x={gx};me.y={gy}+90}}");await A.wait(1200)
            await A.pg.screenshot(path='../p6/'+f+'.png')
        await b.close()
    p.terminate()
asyncio.run(main())
