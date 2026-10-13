import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Vd'+str(random.randint(1000,9999)), 'melee', 60)
        await A.wait(800)
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        print(await A.ev("()=>{vmBuild();const o=VM.P[150];me.x=o.x;me.y=o.y+30;window.__cnt=0;const f0=vmGround;window.vmGround=function(){window.__cnt++;return f0()};return [o.k,o.x|0,o.y|0]}"))
        await A.wait(1500)
        print(await A.ev("()=>[window.__cnt, VM.P.filter(o=>o.x>cam.x&&o.x<cam.x+W&&o.y>cam.y&&o.y<cam.y+H).length, cam.x|0, cam.y|0, W, H]"))
        await A.pg.screenshot(path='vmdbg.png')
        await b.close()
    p.terminate()
asyncio.run(main())
