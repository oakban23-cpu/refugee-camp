import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
M="()=>{const t0=performance.now();for(let i=0;i<40;i++){draw()}return +((performance.now()-t0)/40).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;setInterval(()=>{FQ.avg=0;LOWQ=false},50);queenEnter()}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(2000)
        await A.ev("()=>{me.x=CX;me.y=CY+150}");await A.wait(1500)
        print('part2 queen',[await A.ev(M) for _ in range(3)],await A.ev("()=>mons.length"))
        print('part2 queen no mons',[await A.ev("()=>{const s=mons;mons=[];const t0=performance.now();for(let i=0;i<40;i++){draw()}mons=s;return +((performance.now()-t0)/40).toFixed(2)}") for _ in range(2)])
        await A.ev("()=>{dgLeave()}");await A.wait(2500)
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{me.sty={{s:{i1},n:0,a:0,e:1,e6:1}};qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(2000)
        await A.ev("()=>{me.x=CX;me.y=CY+150}");await A.wait(1500)
        print('shell',[await A.ev(M) for _ in range(3)],await A.ev("()=>mons.length"))
        print('shell no mons',[await A.ev("()=>{const s=mons;mons=[];const t0=performance.now();for(let i=0;i<40;i++){draw()}mons=s;return +((performance.now()-t0)/40).toFixed(2)}") for _ in range(2)])
        await A.ev("()=>{window.gxQueenShell=gxQueenShell=function(...a){gxBoss14(...a)}}")
        print('shell as gxBoss14',[await A.ev(M) for _ in range(3)])
        await b.close()
    p.terminate()
asyncio.run(main())
