import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':900,'height':800})).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Hp' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;enterMap(38,{x:2000,y:1800})}"); await pg.wait_for_timeout(4000)
            L = await pg.evaluate("()=>{const o={};for(const t of trees){if(t.k&&String(t.k).startsWith('ph')&&!['phtree','phrock','phbush','phlamp','phring','phx','phrope'].includes(t.k)){(o[t.k]=o[t.k]||[]).push([t.x|0,t.y|0,t.v])}}return o}")
            print(json.dumps(L))
            for k,v in L.items():
                x,y=v[0][0],v[0][1]
                await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x={x}+160;me.y={y}+120}}"); await pg.wait_for_timeout(900)
                await pg.screenshot(path=f'np/hbp_{k}.jpg', type='jpeg', quality=72)
    finally:
        p.terminate()
asyncio.run(main())
