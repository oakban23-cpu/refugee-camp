import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page()
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Am' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY});me.x=CX+60;me.y=CY+150}"); await pg.wait_for_timeout(5000)
            r = await pg.evaluate("""async()=>{const C=CanvasRenderingContext2D.prototype,od=C.drawImage;const L=[];C.drawImage=function(im,x,y,w,h){if(im===AMB.spr.puff)L.push([+x.toFixed(0),+y.toFixed(0),+w.toFixed(0),+this.globalAlpha.toFixed(2),this.getTransform().a.toFixed(2)]);return od.apply(this,arguments)};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));C.drawImage=od;return {L:L.slice(0,10),cam:[cam.x|0,cam.y|0,W,H],C:[CX,CY]}}""")
            print(r)
    finally:
        p.terminate()
asyncio.run(main())
