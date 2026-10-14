import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'P'+str(random.randint(100,999)),'melee',99)
        for mp in [9,32,30,33,34,36,19]:
            await A.ev(f"()=>{{gmGod=true;ov.hidden=true;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}");await A.wait(2500)
            r=await A.ev("()=>{AQP.gk='';const t0=performance.now();aqGrid();const t1=performance.now();const P=aqPath(me.x,me.y,3000,3000);const t2=performance.now();return [Math.round(t1-t0),Math.round(t2-t1),P?P.length:null]}")
            print(mp,'grid ms',r[0],'path ms',r[1],'len',r[2])
        await b.close()
    p.terminate()
asyncio.run(main())
