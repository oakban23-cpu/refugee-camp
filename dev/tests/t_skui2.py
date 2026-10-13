import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def shots(c,pg,pre,n=4):
    await c.ev("()=>{document.getElementById('ov').scrollTop=0}");await c.wait(300)
    for i in range(n):
        await pg.screenshot(path=f'../fx/{pre}_{i}.png')
        more=await c.ev("()=>{const p=document.getElementById('ov');const o=p.scrollTop;p.scrollTop+=p.clientHeight*.8;return p.scrollTop>o}")
        await c.wait(300)
        if not more: return i+1
    return n
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vw,vh in [(390,844),(1100,800)]:
            ctx = await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2)
            pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
            await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['mage','S'+str(random.randint(1000,9999)),85]);await pg.wait_for_timeout(2000)
            await c.ev("()=>{me.cls2=1;me.tr={f1:2,f2:2,f3:2,i1:1,f4:1};skSub='';charTab='tr';ov.hidden=false;treeUI()}");await c.wait(800)
            print(vw,'tree',await shots(c,pg,f'sk2t_{vw}',5))
            await c.ev("()=>{document.querySelector('[data-n=\"i2\"]').click()}");await c.wait(300)
            print('alloc i2',await c.ev("()=>[me.tr.i2,pts()]"))
            await c.ev("()=>{document.querySelector('[data-sksub=\"act\"]').click()}");await c.wait(400)
            await c.ev("()=>{const d=document.querySelectorAll('.sk2a');d[0].open=true;d[2].open=true}");await c.wait(300)
            print(vw,'act',await shots(c,pg,f'sk2a_{vw}',3))
            await c.ev("()=>{document.querySelector('[data-sksub=\"tree\"]').click()}");await c.wait(300)
            await c.ev("()=>{document.querySelector('[data-skauto]').click()}");await c.wait(500)
            print('auto',await c.ev("()=>[pts(),JSON.stringify(me.tr).length,banner&&banner.s]"))
            await shots(c,pg,f'sk2u_{vw}',1)
            print([e for e in c.errs if 'TUNNEL' not in e][:4])
            await ctx.close()
        await b.close()
    p.terminate()
asyncio.run(main())
