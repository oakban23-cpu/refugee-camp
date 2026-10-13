import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{gmGod=true;LOWQ=false;ov.hidden=true;enterMap(1,{x:1600,y:1700})}");await A.wait(3000)
        await A.ev("()=>{LOWQ=false;enterMap(9,{x:1600,y:1700})}");await A.wait(3500);await A.pg.screenshot(path='../p6/img_city.png')
        await A.ev("()=>{LOWQ=false;enterMap(19,{x:1600,y:900})}");await A.wait(3500)
        print(await A.ev("()=>({city:HDI.ok,city2:HDI.ok2,camp:CHI.ok,fort:typeof FHI!=='undefined'?FHI.ok:'na',on:HDI.on,low:LOWQ})"))
        print([e for e in A.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
