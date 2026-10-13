import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Star','melee',99)
        await A.ev("()=>{rootEnter()}");await A.wait(1500)
        await A.ev("()=>{let k=0;while(SD.on&&k<50){stNext();k++}}");await A.wait(1500)
        await A.ev("()=>{dg.w=5;mons=[];dg.nx=0;me.hp=me.mh=1e9}");await A.wait(2500)
        print(await A.ev("()=>{const b=mons.find(m=>m.t===3);b.hp=b.mh*.2;b.inv=0;b.stun=0;const pl=[{x:me.x,y:me.y,u:uid}];for(let i=0;i<30;i++)rootAI(b,.1,pl,0,1);return [b.tl.map(z=>z.k||'-').join(','),mons.map(m=>m.t+':'+m.L).join(' ')]}"))
        await A.wait(2500);await A.pg.screenshot(path='p4_boss.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
    finally: p.terminate()
asyncio.run(main())
