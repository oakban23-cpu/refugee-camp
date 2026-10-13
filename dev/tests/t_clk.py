import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(70):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on){if(SD.typ){stNext()}stNext()}return SD.on}")
        await A.wait(110)
        if not on:break
async def talk(A,sel):
    r=await A.ev(f"()=>{{const N=MAPS[32].{'npc' if sel==1 else 'npc2'};npcSel={sel};me.x=N.x;me.y=N.y+40;return stNpcClick()}}");await adv(A);return r
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 6 · บทที่ 4 · หอนาฬิกาหยุดเดิน'))")
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,p6s:31,p6b:7}};ov.hidden=true;enterMap(32,{{x:2060,y:2620}})}}");await A.wait(3000)
        print('eda1',await talk(A,1),await A.ev("()=>[me.sty.s,stTxt()]"))
        for i in range(4):
            await A.ev(f"()=>{{me.x=ARGR[{i}][0];me.y=ARGR[{i}][1]+20}}");await A.wait(500)
            if i==0:await A.pg.screenshot(path='../p6/k_gear.png')
        await adv(A);print('gears',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6g,stTxt()]"))
        print('eda2',await talk(A,1),await A.ev("()=>[me.sty.s,stTxt()]"))
        await A.ev("()=>{me.x=2120;me.y=2600}");await A.wait(1200);await A.pg.screenshot(path='../p6/k_gate.png')
        r=await A.ev("()=>{const N=MAPS[32].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(300)
        for i in range(10):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(2000);print('inst',r,await A.ev("()=>[curMap,CLKI(),dg.ph]"))
        await A.pg.screenshot(path='../p6/k_lobby.png')
        await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(7000);await A.pg.screenshot(path='../p6/k_boss1.png')
        print('boss',await A.ev("()=>{const m=mons.find(q=>q.t===3);return [dg.ph,m&&Math.round(m.hp/m.mh*100),CLKH.on,CLKH.w0,CLKB.length]}"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.4;m.inv=0}");await A.wait(6000);await A.pg.screenshot(path='../p6/k_boss2.png')
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.2;m.inv=0}");await A.wait(6000);await A.pg.screenshot(path='../p6/k_boss3.png')
        print('ph3',await A.ev("()=>{const m=mons.find(q=>q.t===3);return [m.ckp,m.ck&&m.ck.dir]}"))
        await A.pg.set_viewport_size({'width':1100,'height':800});await A.ev("()=>{me.x=CX;me.y=CY+300}");await A.wait(1500);await A.pg.screenshot(path='../p6/k_desk.png');await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.ach.stCk]"))
        await A.wait(11000);await adv(A)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),MAPS[32].npc2.x]"))
        await A.ev("()=>{me.x=2200;me.y=2640}");await A.wait(1000);await A.pg.screenshot(path='../p6/k_ves.png')
        print('ves',await talk(A,2),await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await adv(A,60)
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>me.ach.stCk"),await A.ev("()=>[me.sty.s,stTxt()]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
