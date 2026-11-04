import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':1200,'height':900})).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Cy' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            for mp in (9, 38, 44, 31, 35):
                await pg.evaluate(f"()=>{{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;enterMap({mp},{{x:MAPS[{mp}].sx||CX,y:MAPS[{mp}].sy||CY}})}}"); await pg.wait_for_timeout(4000)
                info = await pg.evaluate("()=>{const M=MAPS[curMap],o={};for(const k in M){const v=M[k];if(v&&typeof v==='object'&&typeof v.x==='number')o[k]=[Math.round(v.x),Math.round(v.y),v.n||'']}return {sx:M.sx,sy:M.sy,o}}")
                print(mp, json.dumps(info, ensure_ascii=False)[:900])
                for i,(dx,dy) in enumerate([(0,0),(-500,0),(500,0),(0,-450),(0,450)]):
                    await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x=(MAPS[curMap].sx||CX)+{dx};me.y=(MAPS[curMap].sy||CY)+{dy}}}"); await pg.wait_for_timeout(900)
                    await pg.screenshot(path=f'np/city_{mp}_{i}.jpg', type='jpeg', quality=70)
    finally:
        p.terminate()
asyncio.run(main())
