import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
M="()=>{const t0=performance.now();for(let i=0;i<20;i++){draw()}return +((performance.now()-t0)/20).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i1},n:0,a:0,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1500)
        await A.ev("()=>{me.x=CX;me.y=CY+150}");await A.wait(1500)
        print('boss full hp',await A.ev(M),await A.ev("()=>[mons.length,mons.map(m=>m.t+':'+(m.inv|0)).join(',')]"))
        await A.ev("()=>{const B=qshBoss();B.hp=B.mh*.38}");await A.wait(2500)
        print('boss 38%',await A.ev(M),await A.ev("()=>[mons.length,mons.map(m=>m.t+':'+(m.inv|0)+':'+(m.sh?1:0)).join(','),Object.keys(qshBoss()).join(' ')]"))
        print('only boss',await A.ev("()=>{const s=mons;mons=s.filter(m=>m.t===3);const t0=performance.now();for(let i=0;i<20;i++){draw()}const r=+((performance.now()-t0)/20).toFixed(2);mons=s;return r}"))
        print('only adds',await A.ev("()=>{const s=mons;mons=s.filter(m=>m.t!==3);const t0=performance.now();for(let i=0;i<20;i++){draw()}const r=+((performance.now()-t0)/20).toFixed(2);mons=s;return r}"))
        print('boss no inv',await A.ev("()=>{const s=mons;mons=s.filter(m=>m.t===3);const B=mons[0],iv=B.inv;B.inv=0;const t0=performance.now();for(let i=0;i<20;i++){draw()}const r=+((performance.now()-t0)/20).toFixed(2);B.inv=iv;mons=s;return r}"))
        await b.close()
    p.terminate()
asyncio.run(main())
