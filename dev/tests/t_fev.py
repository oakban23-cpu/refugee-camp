import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'mage'); B = await new_client(b, 'Bravo', 'assn')
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(6,{x:1500,y:1500});}")
        await A.wait(3000)
        H,O=(A,B) if await A.ev("()=>isHost()") else (B,A)
        for c in (H,O): await c.ev("()=>{me.x=1500;me.y=1500;me.stt.fev=0;gmGod=true}")
        await H.wait(1200)
        print('start',await H.ev("()=>fevStart('box',1520,1500)"))
        await H.wait(2500)
        print('O sees',await O.ev("()=>FEVC?[FEVC.k,FEVC.ph,Math.round(FEVC.p),me.fevP===FEVC.id]:null"))
        await H.ev("()=>{FEV.gp=24.6}");await H.wait(3000)
        print('fev count H',await H.ev("()=>me.stt.fev"),'O',await O.ev("()=>me.stt.fev"))
        print('O far test');await O.ev("()=>{me.x=200;me.y=200;me.fevP=0}");await H.ev("()=>{fevStart('met',1500,1500)}");await H.wait(2500);await H.ev("()=>{FEV.t=1}");await H.wait(3000)
        print('fev count H',await H.ev("()=>me.stt.fev"),'O (far, no reward)',await O.ev("()=>me.stt.fev"))
        for c in (A,B):print(c.name,[e for e in c.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
