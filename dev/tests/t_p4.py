import asyncio,json
from h import *
CLOSE="()=>{let k=0;while(SD.on&&k<120){if(SD.choice){const c=SD.onChoose;stClose();if(c)c(1);break}stNext();k++}return SD.on}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Star','melee',99)
        # ---- stars
        r=await A.ev("""()=>{const d0=M('dm');gainXP(me.x,me.y,1200000);const A1=JSON.parse(JSON.stringify(me.ast));astAdd('dm',5);astAdd('red',1);astAdd('cdm',100);const d1=M('dm');
          const cc=cleanChar(JSON.parse(JSON.stringify(snap())));return {A1,ast:me.ast,free:astFree(),d0,d1,clean:cc.ast,lvb:document.getElementById('lvb').textContent,txp:document.getElementById('txp').textContent}}""")
        print('stars',json.dumps(r,ensure_ascii=False))
        await A.ev("()=>{charTab='st';treeUI()}");await A.wait(300)
        el=await A.pg.query_selector('.pn');await A.pg.screenshot(path='p4_star.png')
        print('reset',await A.ev("()=>{me.gold=200000;astReset();return [astUsed(),me.gold]}"))
        # cheat clamp
        print('clamp',await A.ev("()=>{const c=JSON.parse(JSON.stringify(snap()));c.ast={n:999,x:5,p:{dm:999,hp:50,cdm:50,red:50}};return cleanChar(c).ast}"))
        # ---- story
        i0=await A.ev("()=>STY.findIndex(x=>x.c===19)")
        print('first p4 step',i0)
        await A.ev(f"()=>{{me.sty={{s:{i0},n:0,a:0,e:1}};ov.hidden=true;enterMap(1,rootBack())}}");await A.wait(1500)
        async def talk(mp,sel,xy):
            await A.ev(f"()=>{{if(curMap!=={mp})enterMap({mp},{xy});}}");await A.wait(1200)
            await A.ev(f"()=>{{const N={xy};me.x=N.x;me.y=N.y;npcSel={sel};stNpcClick()}}");await A.wait(400)
            await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE);await A.wait(500)
            return await A.ev("()=>[me.sty.s,me.sty.a,me.sty.n,stTxt()]")
        print('s1',await talk(1,4,'rootBack()'))
        print('s2',await talk(5,1,'{x:MAPS[5].npc.x,y:MAPS[5].npc.y+40}'))
        await A.ev("()=>{me.sty.a=1;me.sty.n=60;stTick()}");await A.wait(800);await A.ev(CLOSE);await A.wait(1200);await A.ev(CLOSE)
        print('s3',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        print('s4',await talk(5,1,'{x:MAPS[5].npc.x,y:MAPS[5].npc.y+40}'))
        print('s5',await talk(1,4,'rootBack()'))
        # s6 enter instance
        await A.ev("()=>{const N=rootBack();me.x=N.x;me.y=N.y;npcSel=4;stNpcClick()}");await A.wait(300);await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE);await A.wait(1500)
        print('inst',await A.ev("()=>[curMap,ROOTI(),dg.ph,dg.w,mons.length,dgStatusText()]"))
        await A.wait(6000)
        print('waves',await A.ev("()=>[dg.ph,dg.w,mons.length,mons.slice(0,3).map(m=>m.L)]"))
        await A.ev("()=>{dg.w=5;mons=[];dg.nx=0}");await A.wait(2500)
        print('boss',await A.ev("()=>{const b=mons.find(m=>m.t===3);return [dg.ph,!!b,b&&b.mh,dgStatusText()]}"))
        await A.ev("()=>{me.hp=me.mh=1e9}")
        await A.wait(9000)
        print('ai1',await A.ev("()=>{const b=mons.find(m=>m.t===3);return [b&&b.tl.length,b&&b.r1,mons.length]}"))
        await A.ev("()=>{const b=mons.find(m=>m.t===3);b.hp=b.mh*.25}");await A.wait(5000)
        print('ai2',await A.ev("()=>{const b=mons.find(m=>m.t===3);return [b&&b.tl.map(z=>z.k||'-').join(','),mons.filter(m=>m.t===1).length]}"))
        await A.pg.screenshot(path='p4_boss.png')
        await A.ev("()=>{dgEnd(1)}");await A.wait(1000)
        print('reward',await A.ev("()=>[me.sty.n,me.sty.a,me.gold,me.ast.n]"))
        await A.wait(9500);await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        print('s7',await talk(1,4,'rootBack()'))
        await A.wait(1500);await A.ev(CLOSE)
        print('end',await A.ev("()=>{achCheck();return [stTxt(),!!me.ach.stH,!!me.ach.ast10]}"))
        print('repeat',await A.ev("()=>{const N=rootBack();me.x=N.x;me.y=N.y;npcSel=4;stNpcClick();return [SD.on,SD.q.map(l=>l[1]).join('|').slice(0,80)]}"))
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
