import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'H','melee',99)
        await A.ev("()=>{me.sty={s:STY.findIndex(x=>x.zEnd7),n:0,a:0,e:1};ov.hidden=true;enterMap(1,{x:1585,y:1290})}");await A.wait(2500)
        await A.pg.screenshot(path='hole_locked.png')
        print('locked',await A.ev("()=>{me.x=1585;me.y=1200;useGate();return [curMap,document.getElementById('gtb').style.display]}"))
        await A.ev("()=>{me.sty.s=STY.findIndex(x=>x.zEnd7)+1;me.x=1585;me.y=1290}");await A.wait(1500)
        await A.pg.screenshot(path='hole_open.png')
        await A.ev("()=>{me.x=1585;me.y=1200}");await A.wait(500)
        print('open',await A.ev("()=>{const d=document.getElementById('gtb').style.display;useGate();return [d,curMap]}"))
        await A.wait(1500);print('back',await A.ev("()=>{me.x=1600;me.y=120;useGate();return 0}"));await A.wait(1500);print(await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"))
    finally: p.terminate()
asyncio.run(main())
