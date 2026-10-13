import asyncio,random,sys
from h import *
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(90):
        on=await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f,w=1500):
    await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>380);if(typeof PALG!=='undefined')PALG.title=null}}");await A.wait(w);await A.pg.screenshot(path='../p6/'+f+'.png')
async def main():
    E6=int(sys.argv[1]) if len(sys.argv)>1 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 7 · บทที่ 1 · เข็มทิศดาว'))")
        print('i0',i0)
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:{E6}}};ov.hidden=true;enterMap(1,{{x:1600,y:1600}});setInterval(()=>{{FQ.avg=0}},50)}}");await A.wait(2500)
        print('gate hidden before',await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===34);return gHid(G)}"))
        r=await A.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;return stNpcClick()}");await adv(A)
        print('cmd',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gHid(MAPS[1].gates.find(g=>g.to===34)),JSON.stringify((aqRoute(34)||[]).map(g=>g.to))]"))
        await A.ev("()=>{me.x=2650;me.y=1240}");await A.wait(1200);await A.pg.screenshot(path='../p6/p7_gate1.png')
        await A.ev("()=>{me.x=2650;me.y=1150;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length,mons.slice(0,4).map(m=>m.L)]"))
        await shot(A,1600,520,'p7_top');await shot(A,1500,1250,'p7_great');await shot(A,2600,1620,'p7_camp');await shot(A,900,1000,'p7_crater');await shot(A,1700,2100,'p7_south')
        # compass mid-distance
        await A.ev("()=>{me.x=1010+520;me.y=1050+260}");await A.wait(1500);await A.pg.screenshot(path='../p6/p7_compass_far.png')
        await A.ev("()=>{me.x=1010+120;me.y=1050+120}");await A.wait(1500);await A.pg.screenshot(path='../p6/p7_compass_near.png')
        print('aq',await A.ev("()=>JSON.stringify(sfAqT(stCur()))"))
        for i in range(5):
            await A.ev(f"()=>{{me.x=SFSH[{i}][0];me.y=SFSH[{i}][1]+20}}");await A.wait(600)
        await adv(A);print('shards',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7sc,stTxt()]"))
        for i in range(40):
            if await A.ev("()=>me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[34].npc2.x]"))
        await A.wait(600)
        await shot(A,2660,1560,'p7_cel')
        r=await A.ev("()=>{const N=MAPS[34].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('cel',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[34].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('til',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stS1]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
