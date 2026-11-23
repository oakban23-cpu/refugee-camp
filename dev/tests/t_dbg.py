import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412})).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(4000);await pg.evaluate(SETUP,['mage','Db1',80]);await pg.wait_for_timeout(3500)
            print(await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;gearUI();PERF.menuFps=5;let e1='';let r;try{r=perfMenuOpen()}catch(e){e1=String(e)}return[r,e1,typeof run,run,!!me.cls,ov.hidden,PERF.menu,PERF.lastDraw,PERF.st]}"))
            await pg.wait_for_timeout(1000)
            print(await pg.evaluate("()=>{let e='';try{gearUI()}catch(x){e=String(x)}return[e,ov===document.getElementById('ov'),ov.hidden,document.getElementById('ov').hidden,ov.dataset.k,perfMenuOpen()]}"))
    finally:p.terminate()
asyncio.run(main())
