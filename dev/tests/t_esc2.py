import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'A'+str(random.randint(1000,9999)),'mage',99)
        B=await new_client(b,'B'+str(random.randint(1000,9999)),'melee',99)
        await A.ev("()=>{gmGod=true;escEnter()}");await A.wait(2500)
        id=await A.ev("()=>curMap");print('id',id)
        await B.ev(f"()=>{{gmGod=true;dgJoin('{id}')}}");await B.wait(3000)
        print('B in',await B.ev("()=>[curMap,ESCI(),ESC.y,ESC.hp]"),await A.ev("()=>isHost()"),await B.ev("()=>isHost()"))
        H,O=(A,B) if await A.ev("()=>isHost()") else (B,A)
        await H.ev("()=>{dgStart()}")
        for i in range(12):
            await H.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await H.wait(150)
        await H.wait(5000)
        print('host',await H.ev("()=>[dg.ph,Math.round(ESC.y),ESC.st,mons.length]"))
        print('other',await O.ev("()=>[dg.ph,Math.round(ESC.y),ESC.st,mons.length]"))
        print([e for e in A.errs+B.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
