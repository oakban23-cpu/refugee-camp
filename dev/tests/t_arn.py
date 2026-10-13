import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(60):
        on=await A.ev("()=>{mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on){if(SD.typ){stNext()}stNext()}return SD.on}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f,w=1400):
    await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>450)}}");await A.wait(w);await A.pg.screenshot(path='../p6/'+f+'.png')
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 6 · บทที่ 3 · ซากอารัณยา'))")
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2}};ov.hidden=true;enterMap(30,{{x:1650,y:1700}})}}");await A.wait(2500)
        r=await A.ev("()=>{npcSel=1;me.x=MAPS[30].npc.x;me.y=MAPS[30].npc.y+40;return stNpcClick()}");await adv(A)
        print('til',r,await A.ev("()=>[me.sty.s,stTxt(),JSON.stringify((aqRoute(32)||[]).map(g=>g.to))]"))
        await A.ev("()=>{me.x=1600;me.y=1960}");await A.wait(800);await A.pg.screenshot(path='../p6/a_stairs.png')
        await A.ev("()=>{me.x=1600;me.y=1960;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length]"))
        await shot(A,1600,520,'a_land');await shot(A,1600,1420,'a_plaza');await shot(A,760,1560,'a_west');await shot(A,2450,1260,'a_east');await shot(A,1150,2350,'a_south')
        for i in range(5):
            await A.ev(f"()=>{{me.x=ARSH[{i}][0];me.y=ARSH[{i}][1]+30}}");await A.wait(500)
        await adv(A)
        print('shrine',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6s,stTxt()]"))
        await shot(A,1600,1420,'a_plaza_lit')
        r=await A.ev("()=>{const N=MAPS[32].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('eda',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{for(let i=0;i<45;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        for i in range(3):
            await A.ev(f"()=>{{me.x=ARBL[{i}][0];me.y=ARBL[{i}][1]+40}}");await A.wait(600)
        await adv(A)
        print('bells',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6b,stTxt(),trees.filter(t=>t.hw2).length,arIn(1620,2510)]"))
        await A.ev("()=>{me.x=1300;me.y=2400}");await A.wait(400)
        for k in range(30):
            await A.ev("()=>{const dx=ARGT.x-me.x,dy=ARGT.y+40-me.y,d=Math.hypot(dx,dy);if(d>20){me.x+=dx/d*40;me.y+=dy/d*40}}");await A.wait(60)
        await A.wait(300);await A.pg.screenshot(path='../p6/a_hidden.png');await adv(A)
        print('reach',await A.ev("()=>[me.x|0,me.y|0,me.sty.s,me.sty.a,stTxt()]"))
        await shot(A,2120,2620,'a_clock')
        r=await A.ev("()=>{const N=MAPS[32].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,80)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>me.ach.stAr"))
        await shot(A,1600,1420,'a_plaza_end')
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
