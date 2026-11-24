import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/lcg/'
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Lp1',80]);await pg.wait_for_timeout(3000)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true}")
            await pg.evaluate("()=>{LCG.on=1;cgShow(20)}");await pg.wait_for_timeout(2000);await pg.screenshot(path=O+'portNew.jpg',type='jpeg',quality=60)
            print(await pg.evaluate("()=>{const b=CGX.el.querySelector('.bg'),c=getComputedStyle(b);return[CGX.el.className,c.display,c.filter,b.src.slice(-14),b.naturalWidth,c.opacity,c.visibility]}"))
    finally:p.terminate()
asyncio.run(main())
