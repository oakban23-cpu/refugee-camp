import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':1300,'height':1300})).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Cv' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(5000)
            for nm,(dx,dy) in {'c':(0,0),'n':(0,-380),'s':(0,380),'e':(380,0),'w':(-380,0)}.items():
                await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x=CX+{dx};me.y=CY+{dy}}}"); await pg.wait_for_timeout(1500)
                await pg.screenshot(path=f'np/camp_{nm}.jpg', type='jpeg', quality=80)
            print(await pg.evaluate("()=>({CX,CY,R:CAMP.R,keys:Object.keys(CAMP)})"))
    finally:
        p.terminate()
asyncio.run(main())
