import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[('pc',1277,845,0),('ph',788,288,1),('pp',390,844,1)]
SFX=os.environ.get('SFX','')
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=2 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,['melee','P'+nm+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(27,{x:1600,y:2300})}")
            await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};PALG.title=null;PALG.card=null}")
            await pg.wait_for_timeout(1500)
            r=await pg.evaluate("()=>{let rain=0;const now=Date.now();for(let i=0;i<400;i++){const w=vzWxOf(27,now+i*3600e3);if(w)rain++}return {map:curMap,wx:VZ.wx,rain,glake:VZBW.glake,drp:DRP.k,n:DRP.n}}")
            print(nm,json.dumps(r,ensure_ascii=False),flush=True)
            await pg.screenshot(path=f'pal_{nm}{SFX}.png')
            print('  errs',E[:3])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
