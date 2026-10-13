import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vw,vh in [(390,844),(1100,800),(740,360)]:
            ctx = await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2)
            pg = await ctx.new_page();import h as H;c=Client(ctx,pg,'w')
            await pg.goto(H.URL);await pg.wait_for_timeout(2000);await pg.evaluate(H.SETUP,['melee','U'+str(random.randint(1000,9999)),99]);await pg.wait_for_timeout(2500)
            await c.ev("()=>{document.getElementById('mn').click()}");await c.wait(600)
            print(vw,await c.ev("()=>{const r=document.getElementById('mnp').getBoundingClientRect();return [Math.round(r.width),Math.round(r.height),document.getElementById('tb').innerText.replace(/\\n/g,'|'),document.getElementById('gqb').innerText.replace(/\\n/g,'|')]}"))
            await pg.screenshot(path=f'../fx/menu_{vw}.png')
            await c.ev("()=>{document.getElementById('tb').click()}");await c.wait(500)
            print(' skills open',await c.ev("()=>!ov.hidden&&ov.dataset.k"))
            print([e for e in c.errs if 'TUNNEL' not in e][:3])
            await ctx.close()
        await b.close()
    p.terminate()
asyncio.run(main())
