import asyncio, sys, os, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
TAG=os.environ.get('TAG','new')
CLEAN="""()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};banner=null;window.DNH=12;try{dn.push=()=>0}catch(e){};try{wxNow=()=>0;vzWxTick=()=>{};VZ.wx=null}catch(e){};try{chatLog.length=0}catch(e){}}"""
SC=[('camp',1,1600,1700),('gate',1,1600,2160),('stable',1,1339,1801),('f13',13,1100,1900),('f2',2,600,1600),('f4',4,700,1500),('city',9,1600,1700)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','low')}catch(e){}")
        pg=await ctx.new_page();M=Client(ctx,pg,'M');pg.on('pageerror',lambda e:M.errs.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Cmp'+str(random.randint(10,99)),60]);await pg.wait_for_timeout(1500)
        await M.ev(CLEAN)
        for nm,mp,x,y in SC:
            await M.ev("([mp,x,y])=>{if(curMap!==mp)enterMap(mp,{x,y});else{me.x=x;me.y=y}}",[mp,x,y]);await M.wait(3500)
            await M.ev("([x,y])=>{me.x=x;me.y=y;window.__pin&&clearInterval(window.__pin);window.__pin=setInterval(()=>{me.x=x;me.y=y},50);mons.forEach(m=>{if(Math.hypot(m.x-x,m.y-y)<500){m.x=-9999;m.y=-9999}})}",[x,y])
            await M.ev(CLEAN);await M.wait(2500)
            await pg.screenshot(path=f'../v493/{TAG}_{nm}.png')
        print('errs',M.errs[:3])
    finally: p.terminate()
asyncio.run(main())
