import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/lcg/'
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':1280,'height':720})).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Lm1',80]);await pg.wait_for_timeout(3000)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true}")
            for n in (29,14):
                await pg.evaluate("n=>{cgShow(n)}",n);await pg.wait_for_timeout(1500)
                await pg.evaluate("()=>{LCG.R.t0=performance.now()-5.82*1000}");await pg.wait_for_timeout(200)
                await pg.screenshot(path=O+'max%02d.png'%n)
    finally:p.terminate()
asyncio.run(main())
