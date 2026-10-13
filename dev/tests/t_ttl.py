import asyncio,random
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{me.ach.stCa=1;me.ach.stP5=1;me.ach.p5mem=1;me.title='stP5';ov.hidden=false;evTab='ac';eventUI()}");await A.wait(1200)
        await A.ev("()=>{const e=[...document.querySelectorAll('#ov *')].find(x=>x.children.length===0&&/ผู้นำแห่งรุ่งอรุณ/.test(x.textContent)&&x.closest('.card')&&!x.closest('.tabs'));if(e)e.scrollIntoView({block:'center'})}");await A.wait(400)
        await A.pg.screenshot(path='../v339_ttl.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
