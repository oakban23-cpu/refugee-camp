import asyncio
from h import *
CLOSE="()=>{let k=0;while(SD.on&&k<120){stNext();k++}return SD.on}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Root','melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===21)")
        await A.ev(f"()=>{{me.sty={{s:{i0}+1,n:0,a:0,e:1}};ov.hidden=true;enterMap(1,{{x:1470,y:1420}})}}");await A.wait(1500)
        await A.ev("()=>useGate()");await A.wait(1500)
        print('map',await A.ev("()=>curMap"));await A.wait(1500);await A.ev(CLOSE);await A.wait(1000)
        print(await A.ev("()=>[me.sty.s,stTxt()]"))
        await A.ev("()=>{me.x=1600;me.y=120;useGate()}");await A.wait(1500);print('back',await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"))
        await A.ev(f"()=>{{me.sty={{s:STY.findIndex(x=>x.zEnd8)+1,n:0,a:0,e:1}};me.stt.rv=15;achCheck()}}")
        print(await A.ev("()=>[!!me.ach.stI,!!me.ach.rexp,stTxt()]"))
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
