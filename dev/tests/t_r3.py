import asyncio,json
from h import *
CLOSE="()=>{let k=0;while(SD.on&&k<120){if(SD.choice){const c=SD.onChoose;stClose();if(c)c(window.__ch||1);break}stNext();k++}return SD.on}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Fin','melee',99);B=await new_client(b,'Obs','mage',99)
        # ---- set 6 craft
        r=await A.ev("""()=>{me.hp=me.mh=1e9;ov.hidden=true;enterMap(1,{x:1826,y:1500});me.gold=5e6;me.mat.rs=200;me.mat.ec=200;me.bag=[];
          ['w','a','c','h','b'].forEach(sl=>setCraft('6:'+sl));const its=me.bag.slice();its.forEach(it=>{me.eq[it.sl]=it});me.bag=[];recalc();
          return {n:its.length,L:its.map(i=>i.L),ss:its.map(i=>i.ss),cnt:setCount(6),lk:lkc(me.eq.h),rs:me.mat.rs,stw:me.eq.w.st}}""")
        print('craft',json.dumps(r,ensure_ascii=False))
        print('clean',await A.ev("()=>{const c=cleanItem(JSON.parse(JSON.stringify(me.eq.a)));return [c.ss,c.L,lkc(c)]}"))
        await A.ev("()=>{npcSel=3;ov.hidden=false;smithUI()}");await A.wait(400)
        print('smith has set6',await A.ev("()=>ov.innerText.includes('ชุดรากพิภพ')"))
        await A.ev("()=>{ov.hidden=true}")
        # B sees rw?
        await B.ev("()=>{ov.hidden=true;enterMap(1,{x:1800,y:1520})}");await A.wait(3000)
        print('B sees rw',await B.ev("()=>Object.values(others).map(o=>[o.n,o.rw,o.hd])"))
        await A.pg.screenshot(path='r3_set.png',clip={'x':0,'y':300,'width':390,'height':300})
        # proc
        await A.ev("()=>{mons=[];for(let i=0;i<3;i++){const x=me.x+30+i*20,y=me.y,hp=1e7;mons.push({id:++mid,x,y,tx:x,ty:y,t:0,L:100,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})}me.rtP=0;rootProc(mons[0]);}")
        print('proc',await A.ev("()=>[RTB.length,mons.map(m=>Math.round(m.mh-m.hp))]"))
        # ---- story c23
        i0=await A.ev("()=>STY.findIndex(x=>x.c===23)")
        await A.ev(f"()=>{{mons=[];me.sty={{s:{i0},n:0,a:0,e:2}};enterMap(25,{{x:1730,y:340}})}}");await A.wait(1500)
        async def talk(mp):
            await A.ev(f"()=>{{if(curMap!=={mp})enterMap({mp},{{x:1730,y:340}});}}");await A.wait(1200)
            await A.ev("()=>{const N=MAPS[curMap].npc;me.x=N.x;me.y=N.y+40;npcSel=1;stNpcClick()}");await A.wait(400)
            await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE);await A.wait(400)
            return await A.ev("()=>[me.sty.s,me.sty.a,curMap,stTxt()]")
        print('s1',await talk(25))
        await A.ev("()=>enterMap(26,{x:1600,y:300})");await A.wait(1500);await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE)
        print('s2',await A.ev("()=>[me.sty.s,stTxt()]"))
        await A.ev("()=>{me.sty.a=1;me.sty.n=80}");await A.wait(1500);await A.ev(CLOSE);await A.wait(1500);await A.ev(CLOSE)
        print('s3',await A.ev("()=>[me.sty.s,stTxt()]"))
        print('s4',await talk(26))
        print('inst',await A.ev("()=>[curMap,RTEI(),dg.ph,dgStatusText()]"))
        await A.ev("()=>dgStart()");await A.wait(500);await A.ev(CLOSE);await A.wait(1500)
        print('boss',await A.ev("()=>{const b=mons.find(m=>m.t===3);return [dg.ph,!!b,b&&b.mh]}"))
        await A.wait(6000)
        print('ai',await A.ev("()=>{const b=mons.find(m=>m.t===3);b.inv=0;b.stun=0;b.hp=b.mh*.3;const pl=[{x:me.x,y:me.y,u:uid}];for(let i=0;i<40;i++)rteAI(b,.1,pl,0,1);return [b.tl.length,b.tl.filter(z=>z.k==='mvn').length,mons.filter(m=>m.t===2).length]}"))
        await A.pg.screenshot(path='r3_boss.png')
        await A.ev("()=>dgEnd(1)");await A.wait(1000)
        print('reward',await A.ev("()=>[me.sty.n,me.mat.rs,me.bag.filter(i=>i.L===22).length]"))
        await A.wait(9500);await A.ev(CLOSE);await A.wait(1500)
        print('after',await A.ev("()=>[curMap,me.sty.s,stTxt()]"))
        await A.ev("()=>{window.__ch=2}")
        print('s5',await talk(26))
        await A.wait(1500);await A.ev(CLOSE)
        print('end',await A.ev("()=>{achCheck();return [me.sty.e4,!!me.ach.stK,!!me.ach.stJ,!!me.ach.set6,stTxt(),cleanChar(JSON.parse(JSON.stringify(snap()))).sty]}"))
        print('repeat',await A.ev("()=>{const N=MAPS[26].npc;me.x=N.x;me.y=N.y+40;npcSel=1;stNpcClick();return SD.q.map(l=>l[1]).join('|').slice(0,60)}"))
        print('errs',[e for e in A.errs+B.errs if 'TUNNEL' not in e][:5])
    finally: p.terminate()
asyncio.run(main())
