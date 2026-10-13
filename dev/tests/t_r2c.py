import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':1000,'height':800});pg=await ctx.new_page()
        await pg.goto(URL);await pg.wait_for_timeout(2000)
        await pg.evaluate(SETUP,['melee','Cam',99]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{me.hp=me.mh=1e9;ov.hidden=true;enterMap(1,{x:1500,y:1500});me.sty.s=STY.findIndex(x=>x.zEnd7)+1;document.querySelectorAll('#stq,#clog').forEach(e=>e.style.display='none')}");await pg.wait_for_timeout(2500)
        await pg.screenshot(path='r2_campwide.png')
        # monster closeups
        for mp in []:
            await pg.evaluate(f"()=>{{enterMap({mp},{{x:1600,y:1500}})}}");await pg.wait_for_timeout(2500)
            await pg.evaluate("""()=>{mons=[];for(let t=0;t<3;t++){const x=me.x-160+t*160,y=me.y-120,L=100,hp=1e9;mons.push({id:++mid,x,y,tx:x,ty:y,t,L,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,stun:999})}}""");await pg.wait_for_timeout(800)
            await pg.screenshot(path=f'r2_mon{mp}.png',clip={'x':260,'y':180,'width':480,'height':300})
    finally: p.terminate()
asyncio.run(main())
