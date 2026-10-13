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
async def main():
    E6=int(sys.argv[1]) if len(sys.argv)>1 else 1
    PM=int(sys.argv[2]) if len(sys.argv)>2 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 7 · บทที่ 3 · กระจกของโอเรียน'))")
        print('i0',i0)
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:{E6},p7m:{PM},p7sd:40,p7so:2}};ov.hidden=true;enterMap(35,{{x:1900,y:1450}});setInterval(()=>{{FQ.avg=0;LOWQ=false}},50)}}");await A.wait(2500)
        r=await A.ev("()=>{const N=MAPS[35].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('cel5',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gHid(MAPS[9].gates.find(g=>g.to===36))]"))
        await A.ev("()=>{enterMap(9,{x:1600,y:1420})}");await A.wait(2500)
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A)
        print('qn',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gHid(MAPS[9].gates.find(g=>g.to===36)),JSON.stringify((aqRoute(36)||[]).map(g=>g.to))]"))
        await shot(A,1300,1170,'o_gate9')
        await A.ev("()=>{me.x=1290;me.y=1100;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length,mons.slice(0,4).map(m=>m.L)]"))
        await shot(A,1600,2760,'o_dock');await shot(A,1600,820,'o_dome');await shot(A,1600,1420,'o_plaza');await shot(A,2500,960,'o_m1');await shot(A,900,2150,'o_m4');await shot(A,2350,2450,'o_ice')
        r=await A.ev("()=>{const N=MAPS[36].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('orr',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[36].npc2.x]"))
        for i in range(40):
            if await A.ev("()=>stCur().p7mr&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        print('puzzle start',await A.ev("()=>[stTxt(),JSON.stringify(obChain().lit),obChain().links,JSON.stringify(obAqT(stCur()))]"))
        for step in range(5):
            f=await A.ev("()=>obChain().links")
            await A.ev(f"()=>{{me.x=OBM[{f}][0];me.y=OBM[{f}][1]+OBPL}}")
            ok=False
            for k in range(60):
                await A.wait(300)
                await A.ev(f"()=>{{mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>500);me.x=OBM[{f}][0];me.y=OBM[{f}][1]+OBPL}}")
                if step==0 and k==6: await A.pg.screenshot(path='../p6/o_rot.png')
                if await A.ev("()=>obChain().links")>f: ok=True;break
            print('link',step,ok,await A.ev("()=>[obChain().links,me.sty.n,me.sty.p7mr,me.sty.p7ml,me.sty.p7sd]"))
        await A.wait(1200);await A.pg.screenshot(path='../p6/o_card.png')
        await A.ev("()=>{me.x=1600;me.y=1500}");await adv(A)
        print('solved',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await shot(A,1600,1470,'o_solved',1800);await shot(A,2100,1500,'o_beams',1500)
        for i in range(40):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<30;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[36].npc2.x]"))
        r=await A.ev("()=>{const N=MAPS[36].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(2500);await A.pg.screenshot(path='../p6/o_reveal.png');await adv(A,60)
        print('cel6',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[36].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),me.sty.p7sd]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stS3]"))
        print('shop has 4',await A.ev("()=>{sdShop('brom');const r=SD.choice&&SD.choice.map(c=>c[0]);stClose();return JSON.stringify(r)}"))
        await shot(A,1600,1470,'o_echo',1500)
        print('save',await A.ev("()=>JSON.stringify(cleanChar(JSON.parse(JSON.stringify(snap()))).sty)"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
