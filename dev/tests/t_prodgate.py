import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':900,'height':900})).new_page(); errs=[]
            pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(3000)
            await pg.evaluate(SETUP, ['mage', 'Pg' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY+CAMP.R-120})}"); await pg.wait_for_timeout(5000)
            print(await pg.evaluate("()=>({gate:typeof GATE!=='undefined'?[GATE.ok,GATE.src]:null,c2:C2.gate,c2on:c2On(),gon:typeof gateOn==='function'?gateOn():null,src:String(c2Gate).slice(0,80)})"))
            await pg.screenshot(path='np/prodgate.jpg', type='jpeg', quality=75); print(errs[:3])
    finally:
        p.terminate()
asyncio.run(main())
