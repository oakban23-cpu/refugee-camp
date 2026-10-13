import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Ba'+str(random.randint(1000,9999)), 'melee', 80)
        await A.ev("()=>{gmGod=true;window.DNH=13;enterMap(3,{x:MAPS[3].boss.x-90,y:MAPS[3].boss.y+70})}");await A.wait(1500)
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        await A.ev("()=>{mons=mons.filter(m=>m.t===3);if(!mons.length){bossCd=0}}");await A.wait(1500)
        print(await A.ev("()=>mons.filter(m=>m.t===3).map(m=>[m.x|0,m.y|0,m.hp|0,m.mh|0])"))
        await A.ev("()=>{const m=mons.find(m=>m.t===3);m.hp=m.mh*.2;me.x=m.x-90;me.y=m.y+60;}");await A.wait(700)
        await A.pg.screenshot(path='baura_en.png')
        await A.ev("()=>{const m=mons.find(m=>m.t===3);m.hp=m.mh*.8;m.castT=performance.now()}");await A.wait(350)
        await A.pg.screenshot(path='baura_cast.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
