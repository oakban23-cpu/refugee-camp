import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{gmGod=true;escEnter()}");await A.wait(3000)
        await A.ev("()=>{document.querySelectorAll('#stq,.stq').forEach(e=>e.style.display='none');me.x=CX+150;me.y=CY+640}");await A.wait(1500)
        await A.pg.screenshot(path='../p6/x_bot.png')
        print(await A.ev("()=>{const c=document.querySelector('canvas');return [c.width,c.height]}"))
        await b.close()
    p.terminate()
asyncio.run(main())
