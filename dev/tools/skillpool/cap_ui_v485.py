import asyncio,sys,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
OUT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v485/'
VP=[('ph',390,800,1),('pc',1280,800,0)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for cls in os.environ.get('CLS','melee,sup').split(','):
          for nm,w,h,mob in VP:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
            await pg.goto(URL);await pg.wait_for_timeout(1500);await pg.evaluate(SETUP,[cls,'ui',60]);await pg.wait_for_timeout(2200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;me.cls2=1;me.br=1;try{applyBr()}catch(e){};try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;banner=null}")
            await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{q8Open()}");await pg.wait_for_timeout(500)
            await pg.evaluate("()=>{const e=ov.querySelectorAll('.q8s')[2];if(e)e.scrollIntoView()}");await pg.wait_for_timeout(300);await pg.screenshot(path=OUT+f'ui_{cls}_{nm}_pool.png')
            await pg.evaluate("()=>{document.querySelector('[data-q8=\"3:1\"]').click()}");await pg.wait_for_timeout(300)
            await pg.evaluate("()=>{document.querySelector('[data-q8=\"4:1\"]').click()}");await pg.wait_for_timeout(400)
            await pg.evaluate("()=>{const e=ov.querySelectorAll('.q8s')[3];if(e)e.scrollIntoView()}");await pg.wait_for_timeout(300);await pg.screenshot(path=OUT+f'ui_{cls}_{nm}_pool2.png')
            await pg.evaluate("()=>{ov.hidden=true;me.sk[3]=0;me.sk[4]=0}");await pg.wait_for_timeout(600);await pg.screenshot(path=OUT+f'ui_{cls}_{nm}_hud.png')
            print(cls,nm,'errs',E[:3],flush=True);await ctx.close()
    finally: p.terminate()
asyncio.run(main())
