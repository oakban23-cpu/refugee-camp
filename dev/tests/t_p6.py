import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(120)
    for i in range(40):
        on=await A.ev("()=>{mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on){if(SD.typ){stNext()}stNext()}return SD.on}")
        await A.wait(120)
        if not on:break
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 6 · บทที่ 1 · สะพานแสง'))")
        await A.ev(f"()=>{{gmGod=true;me.sty={{s:{i0},n:0,a:0,e:1,e4:2}};ov.hidden=true;enterMap(9,{{x:1600,y:2100}})}}");await A.wait(2500)
        print('start',await A.ev("()=>[me.sty.s,stTxt(),gP5end(),JSON.stringify(aqRoute(30)&&aqRoute(30).map(g=>g.to))]"))
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A,30)
        print('qn',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{me.x=1600;me.y=2200;useGate()}");await A.wait(500)
        print('choose',await A.ev("()=>[SD.on,curMap]"))
        await A.ev("()=>{SD.onChoose(2)}");await A.wait(2500);await adv(A,20)
        print('bridge',await A.ev("()=>[curMap,me.x|0,me.y|0,me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{npcSel=1;me.x=MAPS[30].npc.x;me.y=MAPS[30].npc.y+40;return stNpcClick()}");await adv(A,30)
        print('til',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A,30)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{enterMap(1,{x:1720,y:1880})}");await A.wait(2500)
        r=await A.ev("()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,30)
        print('cmd',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[1].npc4;npcSel=4;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(300)
        for i in range(10):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(2000)
        print('inst',r,await A.ev("()=>[curMap,ESCI(),dg.ph]"))
        await A.ev("()=>{dgStart()}");await adv(A,12);await A.wait(500)
        print('run',await A.ev("()=>[dg.ph,ESC.st,ESC.y,ESC.hp,mons.length]"))
        await A.wait(4000);await A.pg.screenshot(path='../p6/esc1.png')
        for k in range(30):
            st=await A.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});me.x=CX+40;me.y=ESC.y+40;return [dg.ph,Math.round(ESC.y),ESC.cp,ESC.wv,Math.round(ESC.hp)]}")
            if k%5==0:print(k,st)
            if st[0]=='boss':break
            await A.wait(1000)
        await A.wait(3000);await A.pg.screenshot(path='../p6/esc2.png')
        await A.ev("()=>{const m=mons.find(q=>q.t===3);me.x=m.x;me.y=m.y+170}");await A.wait(9000);await A.pg.screenshot(path='../p6/esc3.png')
        print('boss',await A.ev("()=>{const m=mons.find(q=>q.t===3);return [m&&m.n,m&&Math.round(m.hp/m.mh*100),ESC.hp,(m&&m.hs||[]).length]}"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.ach.stEs]"))
        await A.wait(10000);await adv(A,30)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A,40)
        print('final',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{achCheck()}");await A.wait(500)
        print('title',await A.ev("()=>[me.ach.stEs,STY.length]"))
        await A.ev("()=>{enterMap(30,{x:1600,y:1800})}");await A.wait(2500)
        r=await A.ev("()=>{npcSel=1;me.x=MAPS[30].npc.x;me.y=MAPS[30].npc.y+40;return stNpcClick()}");await A.wait(400)
        print('repeat',r,await A.ev("()=>SD.on"))
        await A.ev("()=>{stClose();me.x=1600;me.y=2400}");await A.wait(1500);await A.pg.screenshot(path='../p6/walkers.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
