import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(50):
        on=await A.ev("()=>{mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on){if(SD.typ){stNext()}stNext()}return SD.on}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f):
    await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>450)}}");await A.wait(1400);await A.pg.screenshot(path='../p6/'+f+'.png')
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 6 · บทที่ 2 · ตลาดสองฟ้า'))")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:0,e:1,e4:2}};ov.hidden=true;enterMap(9,{{x:1600,y:1400}})}}");await A.wait(2500)
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A)
        print('qn',r,await A.ev("()=>[me.sty.s,stTxt(),JSON.stringify((aqRoute(31)||[]).map(g=>g.to))]"))
        await A.ev("()=>{me.x=1200;me.y=2075}");await A.wait(800);await A.pg.screenshot(path='../p6/m_citygate.png')
        await A.ev("()=>{useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length]"))
        r=await A.ev("()=>{const N=MAPS[31].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('eda',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await shot(A,1700,2000,'m_plaza_burn')
        for c in range(5):
            await A.ev(f"()=>{{const L=MKCLUE[{c}];me.x=L.x;me.y=L.y}}");await A.wait(500)
            if c==0: await A.pg.screenshot(path='../p6/m_clue.png')
        await adv(A)
        print('clue',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6cl,stTxt()]"))
        await shot(A,2500,1500,'m_ruin')
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[31].npc2.x]"))
        r=await A.ev("()=>{const N=MAPS[31].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,25);await A.wait(500)
        print('hed choice',r,await A.ev("()=>[SD.on,me.sty.a]"))
        for i in range(30):
            ok=await A.ev("()=>{if(SD.on&&!SD.onChoose&&SD.typ)stNext();return typeof SD.onChoose==='function'}")
            if ok:break
            await A.wait(150)
        print('choice ready',ok,await A.ev("()=>[SD.on,me.sty.a]"))
        await A.ev("()=>{SD.onChoose(2)}");await adv(A)
        print('hed',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6h,stTxt()]"))
        await A.wait(800);await A.ev("()=>{stTick()}");await A.wait(500)
        print('fest on',await A.ev("()=>[MKF.on,MKF.t,stTxt()]"))
        for i in range(8):
            await A.ev(f"()=>{{me.x=MKLAN[{i}][0];me.y=MKLAN[{i}][1]+10;MKF.wis=[]}}");await A.wait(400)
            if i==3:await A.pg.screenshot(path='../p6/m_fest.png')
        await adv(A)
        print('fest',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[31].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,60)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>me.ach.stMk"))
        await shot(A,1600,1900,'m_festplaza');await shot(A,1600,1000,'m_north')
        r=await A.ev("()=>{const N=MAPS[31].npc;npcSel=1;me.x=N.x;me.y=N.y+40;$('npcb').onclick();return SD.on}");print('tea',r);await A.ev("()=>{stClose()}")
        await A.ev("()=>{enterMap(30,{x:1600,y:1850})}");await A.wait(2500);await A.pg.screenshot(path='../p6/m_stairs.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
