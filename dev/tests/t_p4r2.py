import asyncio,json
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Root','melee',99)
        await A.ev("()=>{me.hp=me.mh=1e9;ov.hidden=true;enterMap(1,{x:1430,y:1560})}");await A.wait(2500)
        await A.pg.screenshot(path='r2_camp.png')
        for mp in [23,24,25,26]:
            await A.ev(f"()=>{{enterMap({mp},{{x:1600,y:{420 if mp in (23,25) else 900}}})}}");await A.wait(3500)
            if mp in (24,26):
                await A.ev("()=>{const m=mons.filter(m=>m.t<3);if(m[0]){me.x=m[0].x;me.y=m[0].y+90}}");await A.wait(1200)
            print(mp,await A.ev("()=>[MAPS[curMap].n,mons.length,mons.slice(0,4).map(m=>m.t+':'+m.L).join(' '),gxTheme&&0]".replace("gxTheme&&0","0")))
            await A.pg.screenshot(path=f'r2_{mp}.png')
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
