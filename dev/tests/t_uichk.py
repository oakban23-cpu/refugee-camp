import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['melee','Uck',60]);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=false;shopUI()}");await pg.wait_for_timeout(800)
            print(await pg.evaluate("""()=>{const r=[];for(const s of ['.pn','.pn .card','#stq','#ovx']){const e=document.querySelector(s);if(!e){r.push(s+' none');continue}const c=getComputedStyle(e);r.push(s+' | bis='+c.borderImageSource.slice(0,60)+' | bw='+c.borderTopWidth+' bs='+c.borderTopStyle+' | bg='+c.backgroundImage.slice(0,80)+' | cls='+document.documentElement.className)}return r.join('\\n')}"""))
            # หา rule ที่ตั้ง border-image บน .pn
            print(await pg.evaluate("""()=>{const out=[];for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}for(const r of rs){if(r.selectorText&&/\\.pn\\b/.test(r.selectorText)&&/border(-image)?:|background:/.test(r.cssText)&&r.cssText.includes('important')&&!r.selectorText.includes('uik'))out.push(r.cssText.slice(0,200))}}return out.slice(0,15).join('\\n')}"""))
    finally:p.terminate()
asyncio.run(main())
