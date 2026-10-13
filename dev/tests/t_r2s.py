import asyncio,json
from h import *
CLOSE="()=>{let k=0;while(SD.on&&k<120){if(SD.choice){const c=SD.onChoose;stClose();if(c)c(1);break}stNext();k++}return SD.on}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Root','melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===21)")
        await A.ev(f"()=>{{me.hp=me.mh=1e9;me.sty={{s:{i0},n:0,a:0,e:2}};ov.hidden=true;enterMap(1,rootBack())}}");await A.wait(1500)
        async def talk(mp,sel,xy):
            await A.ev(f"()=>{{if(curMap!=={mp})enterMap({mp},{xy});}}");await A.wait(1500)
            await A.ev(f"()=>{{const N={xy};me.x=N.x;me.y=N.y;npcSel={sel};stNpcClick()}}");await A.wait(400)
            await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE);await A.wait(400)
            return await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]")
        async def tick():
            await A.wait(1500);await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE);await A.wait(300)
            return await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]")
        print('gate locked?',await A.ev("()=>stP4ok()"))
        print('s1',await talk(1,4,'rootBack()'))
        # use the hole gate
        await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===23);me.x=G.x;me.y=G.y}");await A.wait(2500)
        print('after gate',await A.ev("()=>curMap"))
        print('s2',await tick())
        print('s3',await talk(23,1,'{x:MAPS[23].npc.x,y:MAPS[23].npc.y+40}'))
        await A.ev("()=>{me.sty.a=1;me.sty.n=70}");print('s4',await tick())
        print('s5',await talk(23,1,'{x:MAPS[23].npc.x,y:MAPS[23].npc.y+40}'))
        await A.ev("()=>{enterMap(24,{x:1600,y:300})}");await A.wait(1500);await A.ev(CLOSE)
        await A.ev("()=>{me.sty.a=1;me.sty.n=70}");print('s6',await tick())
        await A.ev("()=>{enterMap(25,{x:1600,y:300})}");print('s7',await tick())
        print('s8',await talk(25,1,'{x:MAPS[25].npc.x,y:MAPS[25].npc.y+40}'))
        await A.ev("()=>{me.sty.a=1;me.sty.n=80}");print('s9',await tick())
        print('s10',await talk(25,1,'{x:MAPS[25].npc.x,y:MAPS[25].npc.y+40}'))
        print('ach',await A.ev("()=>{achCheck();return [!!me.ach.stI,me.stt.rv,!!me.ach.rexp]}"))
        print('rs',await A.ev("()=>{const a=gdGet('rs');rsGive(5,'test');gdSet('rs',gdGet('rs')+1);const c=cleanChar(JSON.parse(JSON.stringify(snap())));return [a,gdGet('rs'),c.mat.rs,MKG.includes('rs'),GDM.rs&&GDM.rs.n]}"))
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
