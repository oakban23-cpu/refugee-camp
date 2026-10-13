import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p6fs)")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:1,e:1,e4:2,p6h:2}};ov.hidden=true;enterMap(31,{{x:1600,y:1800}})}}");await A.wait(2500)
        for i in range(8):
            await A.ev(f"()=>{{me.x=MKLAN[{i}][0];me.y=MKLAN[{i}][1]+10}}");await A.wait(500)
            print(i,await A.ev("()=>[me.x|0,me.y|0,MKF.on,MKF.lit.join(''),me.sty.n,me.sty.s]"))
        await b.close()
    p.terminate()
asyncio.run(main())
