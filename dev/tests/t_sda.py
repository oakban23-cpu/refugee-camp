import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'A'+str(random.randint(100,999)),'mage',99);B=await new_client(b,'B'+str(random.randint(100,999)),'melee',99)
        for C in (A,B):await C.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(1,{x:1600,y:1600})}")
        await A.ev("()=>{me.sty.p7sq=3}");await A.wait(5000)
        await B.ev("()=>{me.x=1640;me.y=1600}");await B.wait(1500)
        print('B sees',await B.ev("()=>Object.values(others).map(o=>[o.n,o.sd])"))
        await B.pg.screenshot(path='../p6/k_sda.png')
        print(A.errs[:3],B.errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
