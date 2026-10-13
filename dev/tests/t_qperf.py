import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
M="()=>{mons=mons.filter(m=>m.t===3);const t0=performance.now();for(let i=0;i<30;i++){draw()}return +((performance.now()-t0)/30).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7ls)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:1,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);enterMap(10,{{x:1500,y:1300}})}}");await A.wait(3000)
        print('map10 streams',[await A.ev(M) for _ in range(3)])
        await A.ev("()=>{me.sty.s=STY.findIndex(x=>x.p7c1)}");await A.wait(1500)
        print('map10 plain',[await A.ev(M) for _ in range(3)])
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{me.sty.s={i1};me.sty.a=0;qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1200)
        await A.ev("()=>{QS.nt=0;const B=qshBoss();B.hp=B.mh*.38;B.q2=0;B.q3=0;me.x=CX;me.y=CY+150}");await A.wait(2500)
        print('qsh',[await A.ev(M) for _ in range(3)],await A.ev("()=>[QS.o.length,QS.z.length,!!QS.inh]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
