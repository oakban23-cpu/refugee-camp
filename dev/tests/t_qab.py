import asyncio,random
from h import *
M="()=>{const t0=performance.now();for(let i=0;i<40;i++){draw()}return +((performance.now()-t0)/40).toFixed(2)}"
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7ls)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:1,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false;mons=[]}},20);enterMap(10,{{x:1500,y:1300}})}}");await A.wait(3500)
        on=[];off=[]
        for k in range(5):
            await A.ev(f"()=>{{me.sty.s={i0}}}");await A.wait(300);on.append(await A.ev(M))
            await A.ev("()=>{me.sty.s=STY.findIndex(x=>x.p7c1)}");await A.wait(300);off.append(await A.ev(M))
        print('streams on',on);print('streams off',off)
        await b.close()
    p.terminate()
asyncio.run(main())
