import asyncio,random,sys
from h import *
MAPS=[int(x) for x in sys.argv[1].split(',')]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in MAPS:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1000)
            for i,(x,y) in enumerate([(800,800),(2400,800),(800,2400),(2400,2400)]):
                await A.ev(f"()=>{{me.x={x};me.y={y};ZM.z=.4;}}");await A.wait(900)
                await A.pg.screenshot(path=f'../p6/ov_{mp}_{i}.png')
        await b.close()
    p.terminate()
asyncio.run(main())
