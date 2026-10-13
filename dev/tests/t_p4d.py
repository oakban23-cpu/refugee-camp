import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Star','melee',99)
        await A.ev("()=>{gainXP(me.x,me.y,3000000);astAdd('dm',2);charTab='st';ov.hidden=false;treeUI()}");await A.wait(600)
        await A.pg.screenshot(path='p4_star.png')
        await A.ev("()=>{charTab='ab';treeUI()}");await A.wait(300)
        print(await A.ev("()=>[...document.querySelectorAll('.pwr small')].map(e=>e.textContent).filter(t=>t.includes('ดาว')).slice(0,3)"))
    finally: p.terminate()
asyncio.run(main())
