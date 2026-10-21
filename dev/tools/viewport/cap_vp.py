import asyncio,sys,json,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[('phoneP',390,844,1,1),('phoneL',844,390,1,1),('tabP',820,1180,1,1),('tabL',1180,820,1,1),('pc',1440,900,0,0),('pcfhd',1920,1080,0,0),('pcsmall',1280,720,0,0)]
SFX=os.environ.get('SFX','')
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob,touch in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(touch),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'{nm}{SFX}_start.png')
            await pg.evaluate(SETUP,['melee','ท'+nm[:7],70]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
            await pg.wait_for_timeout(1500)
            info=await pg.evaluate("()=>{const r=cv.getBoundingClientRect(),a=$('app').getBoundingClientRect();return {W,H,SW0,vr:vwVR(),k:VW.k,vw:VW.on,sh:VW.sh,cw:cv.width,ch:cv.height,css:[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)],app:[Math.round(a.left),Math.round(a.top),Math.round(a.width),Math.round(a.height)],tf:$('app').style.transform,rot:!!document.querySelector('.x')}}")
            print(nm,w,h,json.dumps(info),flush=True)
            await pg.screenshot(path=f'{nm}{SFX}.png')
            # menu open
            await pg.evaluate("()=>{try{$('mb')&&$('mb').click()}catch(e){};try{typeof menuToggle==='function'&&menuToggle()}catch(e){}}");await pg.wait_for_timeout(600)
            await pg.screenshot(path=f'{nm}{SFX}_menu.png')
            await pg.evaluate("()=>{try{$('mnp').hidden=true}catch(e){};btyUI()}");await pg.wait_for_timeout(600)
            await pg.screenshot(path=f'{nm}{SFX}_panel.png')
            await pg.evaluate("()=>{try{$('ovx').click()}catch(e){};try{$('cht').click()}catch(e){}}");await pg.wait_for_timeout(500)
            await pg.screenshot(path=f'{nm}{SFX}_chat.png')
            print('  errs',E[:3])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
