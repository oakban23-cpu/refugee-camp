import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'D'+str(random.randint(1000,9999)), 'melee', 99)
        i0=await A.ev("()=>STY.findIndex(x=>x.g==='cas')")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:1,e:1,e4:1}};ov.hidden=true;casEnter()}}");await A.wait(2500)
        await A.ev("()=>{dg={ph:'boss',w:0,tl:600,nx:0};SR=0;mons=[];bossCd=1e9;spawnBoss();me.x=CX;me.y=CY}");await A.wait(500)
        for i in range(6):
            await A.wait(1500)
            print(await A.ev("()=>{const m=mons.find(q=>q.t===3);return m?[Math.round(m.x),Math.round(m.y),m.c1,m.c2,!!m.dsh,m.tl.length,m.inv,m.stun,isHost(),CFX.length,curMap]:'none'}"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.3;me.x=m.x;me.y=m.y+150}")
        for i in range(5):
            await A.wait(1200);print(await A.ev("()=>{const m=mons.find(q=>q.t===3);return [(m.hp/m.mh).toFixed(2),m.inv,m.c3,m.c4,!!m.dsh,m.tg,mons.length]}"))
        print(await A.ev("()=>[mons.filter(q=>q.cg).length,mons.find(q=>q.t===3).c4]"))
        await A.pg.screenshot(path='../fx/g_boss2.png')
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(2500)
        print('after hp0',await A.ev("()=>[dg.ph,me.sty.n,me.ach.stCa,mons.filter(q=>q.t===3).length]"))
        print(A.errs[:4])
        await b.close()
    p.terminate()
asyncio.run(main())
