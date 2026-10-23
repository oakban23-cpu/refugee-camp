import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
CLEAN="""()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){};banner=null;window.DNH=12;try{dn.push=()=>0}catch(e){};try{wxNow=()=>0;vzWxTick=()=>{};VZ.wx=null}catch(e){};try{chatLog.length=0}catch(e){};setGQ('high');LITEQ=0;lqSet=()=>{};
  me.x=1600;me.y=1700;me.face=0}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,vp,out in (('n',{'width':390,'height':844},'shot-1'),('w',{'width':844,'height':390},'shot-2')):
            ctx=await b.new_context(viewport=vp,device_scale_factor=2,has_touch=True,is_mobile=True)
            pg=await ctx.new_page();c=Client(ctx,pg,nm)
            await pg.goto(URL);await pg.wait_for_timeout(2000)
            await pg.evaluate(SETUP,['melee','Arin'+str(random.randint(10,99)),62]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{me.cls2=1;me.br=1;try{applyBr()}catch(e){}}")
            await pg.evaluate(CLEAN);await pg.wait_for_timeout(2500);await pg.evaluate(CLEAN);await pg.wait_for_timeout(800)
            await pg.screenshot(path=f'../coverw/{out}.png')
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
