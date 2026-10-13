import asyncio,random,sys
from h import *
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(110)
        if not on:break
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
async def main():
    E6=int(sys.argv[1]) if len(sys.argv)>1 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 7 · บทที่ 4 · เปลือกราชินี'))")
        print('i0',i0)
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:{E6},p7m:1,p7mr:36122}};ov.hidden=true;enterMap(36,{{x:1700,y:1450}});setInterval(()=>{{FQ.avg=0;LOWQ=false}},50)}}");await A.wait(2500)
        r=await A.ev("()=>{const N=MAPS[36].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('cel6',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify((aqRoute(10)||[]).map(g=>g.to)),MAPS[36].npc2.x]"))
        await A.ev("()=>{enterMap(10,{x:420,y:1600})}");await A.wait(2500)
        print('m10',await A.ev("()=>[MAPS[10].npc2.x,trees.filter(t=>QSA.some(([x,y])=>Math.hypot(t.x-x,t.y-y)<96)).length]"))
        r=await A.ev("()=>{const N=MAPS[10].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('hnt',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify(qsAqT(stCur()))]"))
        await A.ev("()=>{me.x=QSA[0][0]-160;me.y=QSA[0][1]+120;mons=[]}");await A.wait(1500);await A.pg.screenshot(path='../p6/q_stream.png')
        for i in range(4):
            await A.ev(f"()=>{{me.x=QSA[{i}][0];me.y=QSA[{i}][1]+30}}")
            for k in range(14):
                await A.wait(200);await A.ev(f"()=>{{me.x=QSA[{i}][0];me.y=QSA[{i}][1]+30;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>400)}}")
            if i==0: await A.pg.screenshot(path='../p6/q_card.png')
        await adv(A);print('streams',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7ls,stTxt(),MAPS[10].npc2.x,me.sty.p7sd]"))
        await A.ev("()=>{me.x=520;me.y=1700}");await A.wait(1500);await A.pg.screenshot(path='../p6/q_cel10.png')
        r=await A.ev("()=>{const N=MAPS[10].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('cel7',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[10].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(300);await skip(A,8);await A.wait(2000)
        print('inst',r,await A.ev("()=>[curMap,QSHI(),dg.ph,trees.length]"))
        await A.ev("()=>{dgStart()}");await skip(A,14);await A.wait(1500)
        print('boss',await A.ev("()=>[dg.ph,!!qshBoss(),QS.need,QS.nt]"))
        await A.ev("()=>{me.x=CX;me.y=CY+250}");await A.wait(7000)
        print('orbs',await A.ev("()=>[QS.o.length,JSON.stringify(Object.keys(QSV.o)),qshBoss().hp/qshBoss().mh]"))
        await A.pg.screenshot(path='../p6/q_orbs.png')
        dl=0
        for rnd_ in range(6):
            n=await A.ev("()=>QS.o.filter(o=>!o.c).length")
            if n==0:
                await A.ev("()=>{QS.nt=0}");await A.wait(800)
            await A.ev("()=>{const o=QS.o.find(o=>!o.c);if(o){me.x=o.x;me.y=o.y+6}}");await A.wait(500)
            c=await A.ev("()=>QS.o.some(o=>o.c===uid)")
            if rnd_==0: await A.pg.screenshot(path='../p6/q_carry.png')
            await A.ev("()=>{me.x=QSW.x;me.y=QSW.y}");await A.wait(600)
            st=await A.ev("()=>[QS.w,qshBoss().stun|0,+(qshBoss().hp/qshBoss().mh).toFixed(3)]")
            print('carry',rnd_,c,st)
            if QSFX_l:=await A.ev("()=>!!QSFX.ln"):
                await A.pg.screenshot(path='../p6/q_lance.png');print('lance fired');break
        await A.ev("()=>{const B=qshBoss();B.stun=0;QS.nt=0}");await A.wait(400)
        h0=await A.ev("()=>{const B=qshBoss();QS.o.forEach(o=>{o.x=B.x+30;o.y=B.y});return B.hp/B.mh}");await A.wait(600)
        print('absorb',h0,await A.ev("()=>[qshBoss().hp/qshBoss().mh,qshBoss().qsb|0]"))
        await A.ev("()=>{const B=qshBoss();B.hp=B.mh*.38;B.inv=0;B.q2=0;B.q3=0;me.x=CX+150;me.y=CY+150}");await A.wait(1500);await A.pg.screenshot(path='../p6/q_inh.png')
        print('mech',await A.ev("()=>[QS.z.length,!!QS.inh,(QSV.z||[]).length,!!QSFX.inh]"))
        await A.wait(4000);await A.pg.screenshot(path='../p6/q_zones.png')
        await A.ev("()=>{const B=qshBoss();B.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.sty.p7sd]"))
        await A.wait(11000);await adv(A)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[10].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40);await A.wait(800)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),me.sty.p7sd]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stS4]"))
        r=await A.ev("()=>{const N=MAPS[10].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await A.wait(400)
        print('repeat menu',r,await A.ev("()=>!!SD.choice"))
        await A.ev("()=>{stClose()}")
        print('save',await A.ev("()=>JSON.stringify(cleanChar(JSON.parse(JSON.stringify(snap()))).sty)"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
