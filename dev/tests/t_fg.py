import asyncio,random,sys
from h import *
async def main():
    tag=sys.argv[1]
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        print(await A.ev("()=>JSON.stringify(DEPM)"))
        mp=int(sys.argv[2]) if len(sys.argv)>2 else 2
        await A.ev(f"()=>{{gmGod=true;window.DNH=12;setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);ov.hidden=true;enterMap({mp},{{x:2400,y:2300}})}}");await A.wait(3000)
        await A.ev("()=>{me.x=2400;me.y=2300;mons=[]}");await A.wait(800)
        await A.pg.screenshot(path=f'../p6/fg_{tag}_a.png')
        await A.ev("()=>{window.__cz=camZoomT;window.camZoomT=()=>1.055}");await A.wait(900)
        await A.pg.screenshot(path=f'../p6/fg_{tag}_b.png')
        await A.ev("()=>{window.camZoomT=window.__cz}");await A.wait(600)
        await A.ev("()=>{me.y=2150}");await A.wait(120);await A.pg.screenshot(path=f'../p6/fg_{tag}_c.png')
        await b.close()
    p.terminate()
asyncio.run(main())
