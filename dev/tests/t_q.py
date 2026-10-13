import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':1100,'height':800})
        print(await A.ev("()=>[JSON.stringify(MAPS[9].gates),JSON.stringify(MAPS[1].gates.map(g=>[g.x,g.y,g.to])),CITY.R,typeof CAMP!=='undefined'?CAMP.R:0]"))
        for mp,x,y,f in [(1,1720,1700,'q_camp.png'),(9,1600,2100,'q_city.png')]:
            await A.ev(f"()=>{{gmGod=true;ov.hidden=true;enterMap({mp},{{x:{x},y:{y}}})}}");await A.wait(2500)
            await A.ev("()=>{mons=[];ZM.z=Math.max(.6,ZM.min||.6)}");await A.wait(700)
            await A.pg.screenshot(path='../'+f)
        await b.close()
    p.terminate()
asyncio.run(main())
