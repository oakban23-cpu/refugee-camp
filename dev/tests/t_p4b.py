import asyncio,json
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Star','melee',99)
        await A.ev("()=>{me.sty.a=0;rootEnter()}");await A.wait(1500)
        await A.ev("()=>{let k=0;while(SD.on&&k<50){stNext();k++}}");await A.wait(1500)
        await A.ev("()=>{dg.w=5;mons=[];dg.nx=0;me.hp=me.mh=1e9}");await A.wait(2500)
        for i in range(6):
            print(await A.ev("()=>{const b=mons.find(m=>m.t===3);return b?[+(b.hp/b.mh).toFixed(2),b.r1&&+b.r1.toFixed(1),b.r2,b.r3,b.tl.map(z=>z.k||'-').join(','),mons.map(m=>m.t).join(''),b.inv,b.stun]:'noboss'}"))
            if i==1: await A.ev("()=>{const b=mons.find(m=>m.t===3);b.hp=b.mh*.25}")
            if i>=2: await A.ev("()=>{mons=mons.filter(m=>m.t!==4)}")
            await A.wait(2000)
        await A.pg.screenshot(path='p4_boss.png')
    finally: p.terminate()
asyncio.run(main())
