import asyncio,random,sys
from h import *
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f,w=1500):
    await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>380);if(typeof PALG!=='undefined')PALG.title=null}}");await A.wait(w);await A.pg.screenshot(path='../p6/'+f+'.png')
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
async def main():
    M=int(sys.argv[1]) if len(sys.argv)>1 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 7 · บทที่ 2 · ราคาของดาว'))")
        print('i0',i0)
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:{M}}};ov.hidden=true;enterMap(34,{{x:1600,y:600}});setInterval(()=>{{FQ.avg=0;LOWQ=false}},50)}}");await A.wait(2500)
        print('gate hidden before',await A.ev("()=>gHid(MAPS[34].gates.find(g=>g.to===35))"))
        r=await A.ev("()=>{const N=MAPS[34].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('til',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gHid(MAPS[34].gates.find(g=>g.to===35)),JSON.stringify((aqRoute(35)||[]).map(g=>g.to))]"))
        await shot(A,2250,2920,'k_gate34')
        await A.ev("()=>{me.x=2250;me.y=3040;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length,mons.slice(0,4).map(m=>m.L)]"))
        await shot(A,1650,560,'k_top');await shot(A,1650,1480,'k_pit');await shot(A,820,900,'k_camp');await shot(A,500,1500,'k_tun');await shot(A,1650,2450,'k_south');await shot(A,2500,1200,'k_east')
        r=await A.ev("()=>{const N=MAPS[35].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('brom',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[35].npc2.x]"))
        await shot(A,2470,2680,'k_rub')
        print('aq',await A.ev("()=>JSON.stringify(kmAqT(stCur()))"))
        for i in range(4):
            await A.ev(f"()=>{{me.x=KMIN[{i}][0];me.y=KMIN[{i}][1]+30}}");await A.wait(700)
        await adv(A);print('rescue',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7rs,stTxt(),me.sty.p7sd]"))
        for i in range(40):
            if await A.ev("()=>me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<30;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),me.sty.p7sd]"))
        await shot(A,2000,1460,'k_cel')
        r=await A.ev("()=>{const N=MAPS[35].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('cel',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[35].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(300)
        await skip(A,10);await A.wait(2000);print('inst',r,await A.ev("()=>[curMap,MDFI(),dg.ph,trees.length]"))
        await A.ev("()=>{dgStart()}");await skip(A,14);await A.wait(1500)
        print('run',await A.ev("()=>[dg.ph,MDF.st,MDF.wv,MDF.hp]"))
        await A.ev("()=>{me.x=CX+60;me.y=CY+160}")
        await A.wait(7000);await A.pg.screenshot(path='../p6/k_w1.png')
        print('wave',await A.ev("()=>[dg.ph,MDF.st,MDF.wv,MDF.q,mons.filter(m=>m.mdf).length,MDF.hp]"))
        await A.wait(5000);print('wave+5',await A.ev("()=>[MDF.st,MDF.wv,mons.filter(m=>m.mdf).length,MDF.hp,mons.filter(m=>m.mdf).map(m=>Math.round(Math.hypot(m.x-CX,m.y-CY))).slice(0,6)]"))
        await A.pg.screenshot(path='../p6/k_w1b.png')
        await A.ev("()=>{MDF.wv=3;MDF.st='wave';MDF.q=0;mons.forEach(m=>{if(m.mdf)m.hp=0})}");await A.wait(3000)
        print('boss',await A.ev("()=>[dg.ph,MDF.st,!!mons.find(q=>q.t===3)]"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);if(m){m.x=CX+150;m.y=CY-150}}");await A.wait(3500);await A.pg.screenshot(path='../p6/k_b1.png')
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.w1=0}");await A.wait(1500);await A.pg.screenshot(path='../p6/k_b2.png')
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=m.mh*.4;m.inv=0}");await A.wait(4000)
        print('b40',await A.ev("()=>[mons.filter(m=>m.mdf).length,MDF.hp]"))
        await A.ev("()=>{const m=mons.find(q=>q.t===3);m.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.sty.p7sd]"))
        await A.wait(11000);await adv(A)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[35].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40)
        ok=False
        for i in range(30):
            ok=await A.ev("()=>!!SD.choice&&typeof SD.onChoose==='function'")
            if ok:break
            await A.ev("()=>{if(SD.on&&SD.typ)stNext()}");await A.wait(150)
        print('choice',r,ok)
        await A.ev(f"()=>{{SD.onChoose({M})}}");await adv(A,60);await A.wait(1500);await adv(A,20)
        print('chosen',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7m,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[35].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40);await A.wait(800)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),me.sty.p7sd]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stS2]"))
        # ร้านเศษดาว
        r=await A.ev("()=>{const N=MAPS[35].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(400)
        print('menu',r,await A.ev("()=>!!SD.choice"))
        await A.ev("()=>{me.sty.p7sd=200;SD.onChoose(2)}");await A.wait(700)
        print('shop',await A.ev("()=>!!SD.choice"))
        await A.ev("()=>{SD.onChoose(3)}");await A.wait(500)
        print('bought',await A.ev("()=>[me.sty.p7sd,me.sty.p7so,me.sty.p7sq]"))
        await shot(A,1500,700,'k_aura3',1200)
        await A.ev("()=>{me.sty.p7so=15;me.sty.p7sq=1}");await A.wait(800);await A.pg.screenshot(path='../p6/k_aura1.png')
        await A.ev("()=>{me.sty.p7sq=2}");await A.wait(800);await A.pg.screenshot(path='../p6/k_aura2.png')
        print('save',await A.ev("()=>JSON.stringify(cleanChar(JSON.parse(JSON.stringify(snap()))).sty)"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
