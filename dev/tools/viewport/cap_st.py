import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[v for v in [('pc',1440,900,0),('phoneL',844,390,1),('pcfhd',1920,1080,0)] if v[0] in os.environ.get('VPS','pc,phoneL').split(',')]
SFX=os.environ.get('SFX','')
ST=[
 ('tent',"()=>{tentHome()}",3000),
 ('cap',"()=>{tentExit&&tentExit();enterMap(28,{x:1600,y:2860})}",3500),
 ('mvp',"()=>{enterMap(10,{x:1500,y:1300})}",3500),
 ('field',"()=>{enterMap(13,{x:CX,y:CY})}",3000),
 ('vault',"()=>{enterMap(3,{x:1300,y:1500});setTimeout(()=>tmVaultEnter({vid:100777,x:1300,y:1500,q:2,L:40,mp:3,o:uid}),1200)}",4000),
 ('cas',"()=>{try{tmVaultExit()}catch(e){};casEnter();setTimeout(()=>{try{dgStart()}catch(e){}},2000)}",5000),
 ('wm',"()=>{wmUI()}",1200),
 ('gear',"()=>{ov.hidden=true;gearUI()}",1200),
 ('fish',"()=>{ov.hidden=true;enterMap(1,{x:1600,y:1600});setTimeout(()=>{try{fsOpen()}catch(e){}},1500)}",3000),
 ('dead',"()=>{ov.hidden=true;try{$('fsx').click()}catch(e){};gmGod=false;me.hp=0}",2500),
]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h,mob in VPS:
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=bool(mob),has_touch=bool(mob),device_scale_factor=1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,['melee','ส'+nm[:6]+str(random.randint(10,99)),70]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
            for k,js,ms in ST:
                if os.environ.get('ONLY') and k not in os.environ['ONLY'].split(','):continue
                try:
                    await pg.evaluate(js);await pg.wait_for_timeout(ms)
                    info=await pg.evaluate("()=>[curMap,W,H,Math.round(cam.x),Math.round(cam.y),Math.round(me.x),Math.round(me.y)]")
                    print(nm,k,info,flush=True)
                    await pg.screenshot(path=f'st_{nm}_{k}{SFX}.png')
                except Exception as ex: print(nm,k,'ERR',str(ex)[:200])
            print('  errs',E[:4])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
