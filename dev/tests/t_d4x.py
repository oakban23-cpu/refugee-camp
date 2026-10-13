import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;LOWQ=false;enterMap(27,{x:1600,y:2400})}");await A.wait(2000)
        print(await A.ev("()=>{let e=null;try{d4Screen()}catch(x){e=String(x.stack).slice(0,300)}return [curMap,DEPM[curMap],depOn(),!!DEP4[DEPM[curMap]],e,LOWQ,isNight()]}"))
        print(await A.ev("()=>{const c=d4DrapeSpr(0);const d=c.getContext('2d').getImageData(60,60,1,1).data;let n=0;const o=d2VineSpr;return [c.width,c.height,[...d]]}"))
        print(await A.ev("()=>new Promise(r=>{let n=0;const o=d4Screen;d4Screen=function(){n++;const a=[...g.getImageData(30,60,1,1).data];o();const b=[...g.getImageData(30,60,1,1).data];window.__px=[a,b,g.getTransform().a,g.globalCompositeOperation,g.globalAlpha]};setTimeout(()=>r([n,window.__px,SW0,H,DPR,ZM.z,cam.y]),500)})"))
        await A.wait(300);await A.pg.screenshot(path="../p6/dbg27.png")
        print(await A.ev("()=>{try{plxScreen();return 'ok'}catch(e){return String(e.stack).slice(0,500)}}"))
        await b.close()
    p.terminate()
asyncio.run(main())
