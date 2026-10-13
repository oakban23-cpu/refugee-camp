import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7or)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e6:1,p7m:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);enterMap(36,{{x:1600,y:2780}})}}");await A.wait(3000)
        for H in (12,22):
            await A.ev(f"()=>{{window.DNH={H}}}")
            for (x,y) in [(1600,2780),(1600,900),(1600,1450),(2300,1300),(1300,2100)]:
                await A.ev(f"()=>{{me.x={x};me.y={y};mons=[]}}");await A.wait(1500)
                r=[]
                for k in range(3):
                    r.append(await A.ev("()=>{mons=[];const t0=performance.now();for(let i=0;i<30;i++){draw()}return +((performance.now()-t0)/30).toFixed(2)}"));await A.wait(300)
                r.append(await A.ev("()=>{const o={};const T=(k,f)=>{const t0=performance.now();for(let i=0;i<30;i++)f();o[k]=+((performance.now()-t0)/30).toFixed(2)};g.save();T('gfx',()=>obGroundFx());T('scr',()=>obScreen(performance.now()/1000,1,H));T('beam',()=>obDraw());T('night',()=>obNight());g.restore();return JSON.stringify(o)}"))
                print(H,(x,y),r)
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
