import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def adv(A,n=20):
    for i in range(n):
        await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(100)
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'B'+str(random.randint(1000,9999)), 'melee', 99)
        for kind in ['cas','orn']:
            await A.ev(f"()=>{{gmGod=true;ov.hidden=true;{kind}Enter()}}");await A.wait(2500)
            await A.ev("()=>dgStart()");await adv(A,25);await A.wait(800)
            await A.ev("()=>{const m=mons.find(q=>q.t===3);me.x=m.x+40;me.y=m.y+200;m.c1=99;m.c2=99;m.o1=99;m.o2=99}");await A.wait(800)
            # starfall
            await A.ev("()=>{const m=mons.find(q=>q.t===3);if(m.c2!==undefined)m.c2=0;m.o2=0}");await A.wait(900);await A.pg.screenshot(path=f'../fx/bx_{kind}_star1.png')
            await A.wait(750);await A.pg.screenshot(path=f'../fx/bx_{kind}_star2.png')
            # lines
            await A.ev("()=>{const m=mons.find(q=>q.t===3);m.c1=0;m.o1=0;m.c2=99;m.o2=99}");await A.wait(700);await A.pg.screenshot(path=f'../fx/bx_{kind}_line1.png')
            await A.wait(650);await A.pg.screenshot(path=f'../fx/bx_{kind}_line2.png')
            # big ring
            await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.3;m.s1=1;m.s2=1;m.inv=0;m.stun=0;mons=mons.filter(q=>q.t===3);m.c4=0;m.o4=0;m.o5=99;m.c1=99;m.o1=99;m.c2=99;m.o2=99}");await A.wait(1300);await A.pg.screenshot(path=f'../fx/bx_{kind}_ring1.png')
            await A.wait(1300);await A.pg.screenshot(path=f'../fx/bx_{kind}_ring2.png')
            if kind=='orn':
                await A.ev("()=>{const m=mons.find(q=>q.t===3);m.o5=0;m.o4=99}");await A.wait(2200);await A.pg.screenshot(path=f'../fx/bx_orn_ecl1.png')
                await A.wait(1500);await A.pg.screenshot(path=f'../fx/bx_orn_ecl2.png')
            await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(1500);await A.ev("()=>dgLeave()");await A.wait(2500)
        print([e for e in A.errs if 'TUNNEL' not in e][:6])
        await b.close()
    p.terminate()
asyncio.run(main())
