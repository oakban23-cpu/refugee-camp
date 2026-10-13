import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f,w=1400):
    await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>450)}}");await A.wait(w);await A.pg.screenshot(path='../p6/'+f+'.png')
async def main():
    E6=int(sys.argv[1]) if len(sys.argv)>1 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.length-1)")
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,p6s:31,p6b:7,p6g:15}};ov.hidden=true;enterMap(9,{{x:1600,y:1400}})}}");await A.wait(2500)
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A)
        print('qn',r,await A.ev("()=>[me.sty.s,stTxt(),JSON.stringify((aqRoute(33)||[]).map(g=>g.to))]"))
        await A.ev("()=>{enterMap(32,{x:2120,y:2820})}");await A.wait(2500);await A.ev("()=>{me.x=2120;me.y=2930}");await A.wait(600)
        await A.pg.screenshot(path='../p6/h_gate32.png')
        await A.ev("()=>{me.x=2120;me.y=2900;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length]"))
        if E6==1:
            await shot(A,1600,560,'h_top');await shot(A,1600,1250,'h_core');await shot(A,2180,1120,'h_anchor');await shot(A,900,2200,'h_terr')
        for i in range(4):
            await A.ev(f"()=>{{me.x=HPAN[{i}][0];me.y=HPAN[{i}][1]+40}}");await A.wait(500)
        await adv(A);print('anchors',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p6an,stTxt()]"))
        for i in range(40):
            if await A.ev("()=>me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<50;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[33].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('eda',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[33].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(300)
        for i in range(10):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        await A.wait(2000);print('inst',r,await A.ev("()=>[curMap,VSPI(),dg.ph]"))
        await A.ev("()=>{dgStart()}")
        for i in range(14):
            await A.ev("()=>{if(SD.on){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
        if E6==1:
            await A.wait(5500);await A.pg.screenshot(path='../p6/h_b1.png')
            await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.5;m.inv=0;m.v3=0}");await A.wait(1600);await A.pg.screenshot(path='../p6/h_b2.png')
            await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.2;m.inv=0}");await A.wait(5000);await A.pg.screenshot(path='../p6/h_b3.png')
            print('phase',await A.ev("()=>{const m=mons.find(q=>q.t===3);return [m.vp,!!m.vh,VHD.on,VLN.length]}"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.ach.stVs]"))
        await A.wait(11000);await adv(A)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),MAPS[33].npc2.x]"))
        r=await A.ev("()=>{const N=MAPS[33].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40)
        ok=False
        for i in range(30):
            ok=await A.ev("()=>!!SD.choice&&typeof SD.onChoose==='function'")
            if ok:break
            await A.ev("()=>{if(SD.on&&SD.typ)stNext()}");await A.wait(150)
        print('choice',r,ok)
        await A.ev(f"()=>{{SD.onChoose({E6})}}");await adv(A,80);await A.wait(1500);await adv(A,20)
        print('end',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.e6,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stP6,me.ach.stVs]"))
        await shot(A,1600,1250,'h_end'+str(E6),2000)
        await A.ev("()=>{enterMap(32,{x:1600,y:1450})}");await A.wait(2500);await A.pg.screenshot(path='../p6/h_ar_end'+str(E6)+'.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
