import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'melee'); B = await new_client(b, 'Bravo', 'archer')
        errs=[]
        for c in (A,B):
            c.pg.on("pageerror",lambda e:errs.append(str(e)[:200]))
            await c.ev("()=>{gmSetLv(99);gmGod=true;me.sty.s=STY.length;SLOTS.forEach(sl=>{me.eq[sl]=makeSetItem(5,sl)});recalc();ov.hidden=true;enterMap(19,{x:1600,y:1100})}")
        await A.wait(15000)
        for c in (A,B): print(await c.ev("()=>[isHost(),guards.length,guards.filter(q=>q.ar).length,mons.filter(m=>!m.p).length,mons.length,Object.values(others).map(o=>o.sw)]"))
        print(errs[:5])
        await b.close()
    p.kill()
asyncio.run(main())
