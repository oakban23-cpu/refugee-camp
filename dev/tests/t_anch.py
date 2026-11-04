import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context()).new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'An' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(3000)
            r = await pg.evaluate("""()=>{const M=MAPS[1],o={};for(const k in M){const v=M[k];if(v&&typeof v==='object'&&typeof v.x==='number'&&typeof v.y==='number')o[k]=[Math.round(v.x-CX),Math.round(v.y-CY),v.n||''];}
              const G={};for(const n of ['RBA','TFN','GHG','TG','SGT','STG','FORGE','WELL','WBG','CTP','MKT','PETN','BTY']){try{const v=eval(n);if(v&&typeof v.x==='number')G[n]=[Math.round(v.x-CX),Math.round(v.y-CY)]}catch(e){}}
              try{G.WBS0=[WBS[0].x-CX|0,WBS[0].y-CY|0]}catch(e){}
              return {M:o,G,gates:(M.gates||[]).map(q=>[q.x-CX|0,q.y-CY|0,q.n||q.to]),board:CAMP.BOARD,lamp:CAMP.LAMP&&CAMP.LAMP.slice(0,3)}}""")
            print(json.dumps(r, ensure_ascii=False))
    finally:
        p.terminate()
asyncio.run(main())
