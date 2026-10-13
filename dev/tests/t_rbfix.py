import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':390,'height':844})
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','R'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2000)
        print(await c.ev("()=>{me.cls2=1;me.rb=0;me.rbq={sh:0};const r=[];const _r=Math.random;Math.random=()=>.99;for(let i=0;i<5;i++){rbRoll('ทดสอบ',.35);r.push([me.rbq.sh,me.rbq.p])}Math.random=_r;return [r,rbMvpMap(),rbAqT().lb]}"))
        # nyx instance clear gives roll
        print(await c.ev("()=>{me.rbq={sh:0,p:5};me.ach=me.ach||{};me.ach.stG=1;nyxEnter();return [curMap,NYXI()]}"))
        await c.wait(1500)
        print(await c.ev("()=>{dg.ph='win';dgRew=0;dgReward();return [me.rbq.sh,me.rbq.p]}"))
        await c.wait(500);print('hud',await c.ev("()=>{enterMap(1,{x:1600,y:1700});return 1}"));await c.wait(1200)
        print(await c.ev("()=>document.getElementById('rbq').innerText"))
        print('errs',c.errs[:4])
        await b.close()
    p.terminate()
asyncio.run(main())
