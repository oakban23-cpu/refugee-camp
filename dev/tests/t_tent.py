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
        await A.ev("()=>{const S=tSt();me.gold=1e6;S.own.rug2=1;S.d.rug='rug2';S.own.wal2=1;S.d.wal='wal2';const F=fsSt();F.n.w4=1;F.b.w4=4000;me.stt.b.m1=12;tentHome()}"); await A.wait(2500)
        print('A in tent', await A.ev("()=>[curMap,tentMine()]"))
        await B.ev(f"()=>tentVisit('{A.uid}')"); await B.wait(3500)
        print('B in tent', await B.ev("()=>[curMap,tentHere(),tentMine(),MAPS[curMap]&&MAPS[curMap].tent?JSON.stringify(MAPS[curMap].tent).slice(0,200):null]"))
        await B.wait(2000)
        print('see each other', await A.ev(f"()=>!!others['{B.uid}']"), await B.ev(f"()=>!!others['{A.uid}']"))
        print('A visit log', await A.ev("()=>[me.tent.v,JSON.stringify(me.tent.vl),chatLog.length]"))
        await B.ev("()=>{me.y=TRY1-20;me.x=CX}"); await B.wait(300)
        print('B exit btn', await B.ev("()=>$('tnb').textContent"), await B.ev("()=>$('tnb').hidden"))
        await B.pg.screenshot(path='tent_B.png')
        await B.ev("()=>tentExit()"); await B.wait(800); print('B back', await B.ev("()=>curMap"))
        # offline owner: visit nonexistent uid
        await B.ev("()=>tentVisit('zzzzzz')"); await B.wait(6500); print('timeout', await B.ev("()=>[TNQ,banner&&banner.s]"))
        for c in (A,B):print(c.name,[e for e in c.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
