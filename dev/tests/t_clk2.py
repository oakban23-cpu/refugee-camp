import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':1100,'height':800})
        await A.ev("()=>{gmGod=true;LOWQ=false;clkEnter()}");await A.wait(2500)
        await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.ev("()=>{ZM.z=Math.max(ZM.min||.5,.5);me.x=CX+250;me.y=CY+150}");await A.wait(5000)
        await A.pg.screenshot(path='../p6/k_wide.png')
        print(await A.ev("()=>[ZM.z,ZM.min,CLKH.on,CLKH.a0,mons.find(q=>q.t===3).x|0,mons.find(q=>q.t===3).y|0]"))
        await b.close()
    p.terminate()
asyncio.run(main())
