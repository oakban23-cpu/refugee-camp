import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw);if(window._nm2)mons=[]},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([a.length,Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10,mons.length])},3000)})"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        for nm in [0,1]:
            await A.ev(f"()=>{{window._nm2={nm}}}")
            for mp,x,y in [(32,1600,1400),(32,760,1500),(32,2450,1200)]:
                await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;if(curMap!=={mp})enterMap({mp},{{x:{x},y:{y}}});me.x={x};me.y={y}}}");await A.wait(3000)
                print(nm,mp,x,y,await A.ev(M))
        await b.close()
    p.terminate()
asyncio.run(main())
