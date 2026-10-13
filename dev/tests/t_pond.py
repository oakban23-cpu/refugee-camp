import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'melee')
        await A.wait(1500)
        print(await A.ev("()=>[curMap,FSWM,FSW.length,FSW[0]&&FSW[0].x]"))
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};me.x=1348;me.y=2196;banner=null}");await A.wait(800)
        await A.pg.screenshot(path='pond_start.png')
        print(A.errs[:3]);await b.close()
    p.terminate()
asyncio.run(main())
