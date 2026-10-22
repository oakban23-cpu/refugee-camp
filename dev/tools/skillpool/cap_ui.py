import asyncio,sys,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VP=[('ph',390,800,1),('ls',844,390,1),('pc',1280,800,0)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VP:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
            await pg.goto(URL);await pg.wait_for_timeout(1500);await pg.evaluate(SETUP,[os.environ.get('CLS','archer'),'ui',30]);await pg.wait_for_timeout(2200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;banner=null}")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'ui_{nm}_banner.png')
            await pg.evaluate("()=>{q8Open()}");await pg.wait_for_timeout(500);await pg.screenshot(path=f'ui_{nm}_pool.png')
            await pg.evaluate("()=>{document.querySelector('[data-q8=\"0:1\"]').click()}");await pg.wait_for_timeout(400);await pg.screenshot(path=f'ui_{nm}_pool2.png')
            await pg.evaluate("()=>{ov.hidden=true;me.sk[0]=0}");await pg.wait_for_timeout(500);await pg.screenshot(path=f'ui_{nm}_hud.png')
            await pg.evaluate("()=>{enterMap(1,{x:CX,y:CY});}");await pg.wait_for_timeout(3000)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=false;runeUI()}");await pg.wait_for_timeout(500);await pg.screenshot(path=f'ui_{nm}_rune.png')
            print(nm,'errs',E[:3]);await ctx.close()
    finally: p.terminate()
asyncio.run(main())
