import asyncio,random,sys
from h import *
async def adv(A,n=30):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(110)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(110)
        if not on:break
async def shot(A,x,y,f,w=1500,keep=0):
    mf="" if keep else "mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>380);"
    await A.ev("()=>{me.x="+str(x)+";me.y="+str(y)+";"+mf+"if(typeof PALG!=='undefined')PALG.title=null}");await A.wait(w);await A.pg.screenshot(path='../v495/'+f+'.jpg',quality=80)
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 8 · บทที่ 1 · เสียงตอบจากทะเลเมฆ'))")
        print('i0',i0,await A.ev("()=>STY.length"))
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:1}};ov.hidden=true;enterMap(1,{{x:1600,y:1600}});setInterval(()=>{{FQ.avg=0}},50)}}");await A.wait(2500)
        print('gate hidden before',await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===38);return [gHid(G),wpGateOk(G)]}"))
        r=await A.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;return stNpcClick()}");await adv(A)
        await A.ev("()=>{window.DNH=12}");print('cmd',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gHid(MAPS[1].gates.find(g=>g.to===38)),JSON.stringify((aqRoute(38)||[]).map(g=>g.to))]"))
        await A.ev("()=>{me.x=2650;me.y=2160}");await A.wait(1500);await A.pg.screenshot(path='../v495/gate_camp.jpg',quality=80)
        await A.ev("()=>{me.x=2650;me.y=2250;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),trees.length,mons.length,mons.slice(0,6).map(m=>m.L+':'+m.t)]"))
        await shot(A,330,1600,'spawn');await shot(A,2000,1700,'harbor');await shot(A,2300,760,'light');await shot(A,2100,2560,'wreck');await shot(A,2800,1700,'pier');await shot(A,900,1000,'meadow',keep=1);await shot(A,1500,2600,'south',keep=1)
        print('aq',await A.ev("()=>JSON.stringify(phAqT(stCur()))"))
        await A.ev("()=>{const[x,y]=phRS()[0];me.x=x;me.y=y+30}");await A.wait(1600);await A.pg.screenshot(path='../v495/sailor.jpg',quality=80)
        print('carry',await A.ev("()=>[PHS.carry,PHS.pk,PHS.pt]"))
        for i in range(5):
            await A.ev(f"()=>{{const[x,y]=phRS()[{i}];me.x=x;me.y=y+30}}");await A.wait(1500)
            await A.ev("()=>{me.x=PHMED.x-60;me.y=PHMED.y+80}");await A.wait(500)
            if i==2: await A.pg.screenshot(path='../v495/med.jpg',quality=80)
        await adv(A);print('rescue',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p8rs,stTxt()]"))
        for i in range(40):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await shot(A,1050,1050,'fight',keep=1)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A)
        print('kill',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('sara',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{me.x=PHLB.x;me.y=PHLB.y}");await A.wait(1500);await A.pg.screenshot(path='../v495/light_ring.jpg',quality=80);await A.wait(1500)
        await adv(A);print('light',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),gP8lit()]"))
        await A.ev("()=>{window.DNH=21}");await shot(A,2300,900,'light_on');
        r=await A.ev("()=>{const N=MAPS[38].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('navin',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stN1]"))
        await A.ev("()=>{wmUI(38)}");await A.wait(800);await A.pg.screenshot(path='../v495/worldmap.jpg',quality=80);await A.ev("()=>{ov.hidden=true}")
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
