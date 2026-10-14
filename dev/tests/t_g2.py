import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'G'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{gmGod=true;window.DNH=12;me.sty={s:STY.length,n:0,a:0,e:1,e4:2,p6h:2,e6:1,p7m:1,e7:1,p6b:7};setInterval(()=>{mons=[];PALG.card=null},200)}")
        for mp,x,y,nm in [(30,1600,1820,'g30'),(32,1600,380,'g32')]:
            await A.ev(f"()=>{{ov.hidden=true;enterMap({mp},{{x:{x},y:{y}}})}}");await A.wait(5000);await A.ev(f"()=>{{me.x={x};me.y={y}}}");await A.wait(800)
            await A.pg.screenshot(path=f'../p6/{nm}.png')
        await A.ev("()=>{hfgEnter()}");await A.wait(3000);await A.ev("()=>{me.x=CX-170;me.y=CY+330}");await A.wait(800);await A.pg.screenshot(path='../p6/gdg.png')
        await b.close()
    p.terminate()
asyncio.run(main())
