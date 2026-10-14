import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'A'+str(random.randint(1000,9999)),'mage',99)
        B=await new_client(b,'B'+str(random.randint(1000,9999)),'melee',99)
        for X in (A,B): await X.ev("()=>{gmGod=true;me.sty={s:STY.findIndex(x=>x.p7fd),n:0,a:1,e6:1}}")
        await A.ev("()=>{hfgEnter()}");await A.wait(2500)
        rid=await A.ev("()=>curMap");print('room',rid)
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:CX,y:CY+380}})}}");await B.wait(3000)
        print('host?',await A.ev("()=>isHost()"),await B.ev("()=>isHost()"),await A.ev("()=>Object.keys(others).length"))
        await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(1500)
        await A.ev("()=>{me.x=HFST[0][0];me.y=HFST[0][1]}");await B.ev("()=>{me.x=HFST[1][0];me.y=HFST[1][1]}");await A.wait(5000)
        print('A',await A.ev("()=>[dg.ph,HF.sg.join(''),+HF.S.toFixed(1),HF.hp]"))
        print('B',await B.ev("()=>[dg.ph,HF.sg.join(''),+HF.S.toFixed(1),HF.hp,mons.filter(m=>m.t!==3).length]"))
        await A.ev("()=>{mons=[];HF.S=99.8}");await A.wait(2500)
        print('boss A/B',await A.ev("()=>[dg.ph,!!mons.find(q=>q.t===3)]"),await B.ev("()=>[dg.ph,HF.st,!!mons.find(q=>q.t===3)]"))
        await A.ev("()=>{const M=mons.find(q=>q.t===3);M.h1=0;M.stun=0}");await A.wait(1000)
        print('B sees tether',await B.ev("()=>!!HFX.tt"))
        print([e for e in A.errs+B.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
