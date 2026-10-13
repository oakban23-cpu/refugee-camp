import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['mage','A'+str(random.randint(1000,9999)),85]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{me.ab={int:20,vit:5};charTab='ab';ov.hidden=false;treeUI()}");await c.wait(700)
        await pg.screenshot(path='../fx/ab2_0.png')
        await c.ev("()=>{document.getElementById('ov').scrollTop=700}");await c.wait(300);await pg.screenshot(path='../fx/ab2_1.png')
        await c.ev("()=>{document.querySelector('[data-ab=\"luk\"][data-q=\"10\"]').click()}");await c.wait(300)
        print('luk+10',await c.ev("()=>[me.ab.luk,spts()]"))
        await c.ev("()=>{document.querySelector('[data-abauto]').click()}");await c.wait(400)
        print('auto',await c.ev("()=>[JSON.stringify(me.ab),spts(),banner&&banner.s]"))
        await c.ev("()=>{document.getElementById('ov').scrollTop=0}");await c.wait(300);await pg.screenshot(path='../fx/ab2_2.png')
        await c.ev("()=>{ov.hidden=true;gmGod=true;me.sty={s:110,n:0,a:1,e:1,e4:1,p5m:0};enterMap(28,{x:1600,y:2860})}");await c.wait(2500)
        await c.ev("()=>{me.x=1350;me.y=2520;mons.length=0}");await c.wait(1500);await c.ev("()=>{mons.length=0}");await c.wait(200);await pg.screenshot(path='../fx/gnest.png')
        print([e for e in c.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
