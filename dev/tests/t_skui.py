import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
        pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
        await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['mage','S'+str(random.randint(1000,9999)),85]);await pg.wait_for_timeout(2000)
        await c.ev("()=>{me.cls2=1;charTab='tr';ov.hidden=false;treeUI()}");await c.wait(800)
        info=await c.ev("()=>{const p=document.querySelector('#ov .pn')||document.getElementById('ov');const sc=[p,document.getElementById('ov')].find(e=>e.scrollHeight>e.clientHeight+5);return sc?[sc.id||sc.className,sc.scrollHeight,sc.clientHeight]:null}")
        print(info)
        for i in range(8):
            await pg.screenshot(path=f'../fx/skui_{i}.png')
            more=await c.ev(f"()=>{{const p=[document.querySelector('#ov .pn'),document.getElementById('ov')].find(e=>e&&e.scrollHeight>e.clientHeight+5);if(!p)return false;const o=p.scrollTop;p.scrollTop+=p.clientHeight*.85;return p.scrollTop>o}}")
            await c.wait(300)
            if not more: break
        print('shots',i+1)
        await b.close()
    p.terminate()
asyncio.run(main())
