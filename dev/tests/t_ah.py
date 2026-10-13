import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.p6c3)+1")
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,p6s:31,p6b:7}};ov.hidden=true;enterMap(32,{{x:720,y:1560}})}}");await A.wait(3000)
        await A.ev("()=>{mons=[];me.x=720;me.y=1560}");await A.wait(1200);await A.pg.screenshot(path='../p6/a_houses.png')
        await A.ev("()=>{mons=[];me.x=1500;me.y=2470}");await A.wait(1500);await A.pg.screenshot(path='../p6/a_bridge.png')
        await A.ev("()=>{mons=[];me.x=1600;me.y=1500}");await A.wait(1500);await A.pg.screenshot(path='../p6/a_plaza2.png')
        await A.pg.set_viewport_size({'width':1100,'height':800});await A.ev("()=>{me.x=1600;me.y=900}");await A.wait(1500);await A.pg.screenshot(path='../p6/a_desk.png')
        print(await A.ev("()=>PRP&&[PRP.b.length,PRP.s.length]"))
        await b.close()
    p.terminate()
asyncio.run(main())
