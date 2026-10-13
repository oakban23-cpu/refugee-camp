import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'mage'); B = await new_client(b, 'Bravo', 'melee')
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(1,{x:1600,y:1650})}")
        await A.wait(2000)
        await A.ev(f"()=>ptInvite('{B.uid}')"); await B.wait(1500); await B.ev("()=>ptAccept()"); await B.wait(2500)
        print('party', await A.ev("()=>PTY?PTY.mem.length:0"))
        await B.ev("()=>{enterMap(2,{x:1500,y:900});ov.hidden=true}"); await B.wait(4500)
        print('A sees B', await A.ev(f"()=>{{const m=PTY.mem.find(x=>x.u==='{B.uid}');return [m.mp,m.x,m.y,wpCheck(m.u)]}}"))
        await A.pg.screenshot(path='wp_hud.png')
        # tap row
        await A.pg.click('#ptyhud .pr'); await A.wait(400)
        print('channel', await A.ev("()=>WP&&WP.t"))
        await A.pg.screenshot(path='wp_ch.png')
        await A.wait(2200)
        print('A after', await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y),wpCd|0]"), 'B', await B.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"))
        await A.wait(1500);await A.pg.screenshot(path='wp_arr.png')
        print('B sees A', await B.ev(f"()=>!!others['{A.uid}']"))
        # same-map far warp
        await B.ev("()=>{me.x=2600;me.y=2500}"); await B.wait(2500); await A.ev("()=>{wpCd=0}")
        print('check', await A.ev(f"()=>wpCheck('{B.uid}')"))
        await A.ev(f"()=>ptWarp('{B.uid}')"); await A.wait(2200)
        print('A same-map', await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"))
        # move cancel
        await A.ev("()=>{wpCd=0;me.x=1000;me.y=1000}"); await A.wait(300); await A.ev(f"()=>ptWarp('{B.uid}')"); await A.wait(300); await A.ev("()=>{me.x+=50}"); await A.wait(300)
        print('cancelled', await A.ev("()=>WP===null"))
        # low level deny: B to map 3 (Lv18), A level 5
        await A.ev("()=>{gmSetLv(5);wpCd=0}"); await B.ev("()=>{enterMap(3,{x:1600,y:2900});ov.hidden=true}"); await B.wait(4000)
        print('deny', await A.ev(f"()=>wpCheck('{B.uid}')"))
        for c in (A,B):print(c.name,[e for e in c.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
