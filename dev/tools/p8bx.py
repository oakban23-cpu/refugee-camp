import asyncio,random,sys,json
from h import *
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(100)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(100)
        if not on:break
SH='../v498/'
async def shot(A,n):await A.pg.screenshot(path=SH+n+'.jpg',quality=78)
async def main():
    E7=int(sys.argv[1]) if len(sys.argv)>1 else 2
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'X'+str(random.randint(100,999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p8k)");print('i0',i0,await A.ev("()=>STY.length"))
        await A.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:{E7},p7m:2,p8rs:31}};me.wv=[1,9,32,38,2,3];ov.hidden=true;enterMap(1,{{x:1600,y:1600}})}}");await A.wait(2500)
        q=await A.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;stNpcClick();return SD.q.map(l=>l[0]+':'+l[1].slice(0,30))}");print('council',json.dumps(q,ensure_ascii=False)[:900])
        await adv(A);print('s1',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{me.x=2650;me.y=2250;useGate()}");await A.wait(2500);await adv(A)
        print('map',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt(),JSON.stringify(arAqT(stCur()))]"))
        await A.ev("()=>{me.x=PHDEP.x;me.y=PHDEP.y+60;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null}");await A.wait(1500);await shot(A,'depot_nomat')
        print('panel',await A.ev("()=>{const P=$('p8sp');return P?[P.hidden,P.textContent.slice(0,200)]:null}"))
        await A.ev("()=>{gtAdd('h1',6);gtAdd('h2',6);gtAdd('o1',12);const S=fsSt();S.c.sky0=(S.c.sky0|0)+3;S.c.w1=(S.c.w1|0)+4}");await A.wait(700);await shot(A,'depot_mat')
        r=await A.ev("async()=>{for(const i of[0,1,2]){const b=$('p8sp').querySelector('[data-p8s=\"'+i+'\"]');if(b)b.click();await new Promise(r=>setTimeout(r,300))}return [me.sty.p8sp,me.sty.n,gtHas('h1'),gtHas('h2'),gtHas('o1'),fsSt().c.sky0,fsSt().c.w1]}")
        print('deliver',r);await adv(A);print('s2',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify(arAqT(stCur()))]"))
        await A.ev("()=>{me.x=2700;me.y=1300;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null}");await A.wait(1500);await shot(A,'ships_dmg')
        for i in range(4):
            await A.ev(f"()=>{{const B=PHBERTH[{i}];me.x=B.r[0];me.y=B.r[1];PHS.lx=me.x;PHS.ly=me.y;mons=[]}}");await A.wait(700)
            if i==1: await shot(A,'repair_panel')
            for k in range(4):
                await A.ev("()=>{if(P8RP.on>=0){P8RP.pos=P8RP.zc;P8RP.last=0;p8Hit()}}");await A.wait(200)
        await adv(A);print('s3',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p8rp,stTxt()]"))
        await A.ev("()=>{me.x=2700;me.y=1300;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1500);await shot(A,'ships_fixed')
        r=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A);print('s4',await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A);await A.wait(2500)
        print('dg',await A.ev("()=>[curMap,HDFI(),dg.ph,stTxt()]"))
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        print('run',await A.ev("()=>[dg.ph,HDF.st,HDF.wv,dg.tl]"))
        await A.ev("()=>{HDF.nt=0}");await A.wait(4000);await A.ev("()=>{me.x=CX;me.y=CY+150}");await A.wait(1500);await shot(A,'hdf_wave')
        print('wave',await A.ev("()=>[HDF.st,HDF.wv,HDF.q,mons.filter(m=>m.hdf).length,HDF.e]"))
        for w in range(3):
            for k in range(40):
                st=await A.ev("()=>{mons.forEach(m=>{if(m.hdf&&m.t!==3)m.hp=0});HDF.q=0;if(HDF.st==='brk')HDF.nt=0;return [dg.ph,HDF.st,HDF.wv]}")
                if st[0]=='boss':break
                await A.wait(400)
        print('boss?',await A.ev("()=>[dg.ph,HDF.st,mons.filter(m=>m.t===3).length]"))
        await A.wait(1500);await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+260}}");await A.wait(1200);await shot(A,'hdf_boss')
        await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){B.w1=0;B.w2=0}}");await A.wait(800);await shot(A,'hdf_slam')
        await A.wait(1500);await shot(A,'hdf_grab')
        print('mech',await A.ev("()=>[HDF.g,HDLN.length,mons.filter(m=>m.hdg>=0).length,HDF.e]"))
        await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){B.hp=50;me.x=B.x;me.y=B.y+120;AUTO.on=true}}")
        for k in range(30):
            ph=await A.ev("()=>{const i=mons.findIndex(m=>m.t===3);if(i>=0){mons[i].inv=0;mons[i].stun=0;try{dmgMon(i,mons[i].hp+10)}catch(e){return 'err '+e}}return dg.ph}")
            if ph=='win':break
            await A.wait(500)
        print('win',await A.ev("()=>[dg.ph,me.sty.s,me.sty.n,me.sty.a]"))
        await A.wait(11000);await adv(A);print('back',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        await A.ev("()=>{AUTO.on=false}")
        r=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A)
        print('choice',await A.ev("()=>[SD.on,!!SD.choice,me.sty.s]"))
        await A.ev("()=>{if(SD.onChoose)SD.onChoose(1)}");await adv(A);await A.wait(1500);await adv(A)
        print('after',await A.ev("()=>[me.sty.s,me.sty.p8g,stTxt()]"))
        q=await A.ev("()=>{const N=MAPS[38].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1].slice(0,25))}");print('navin',json.dumps(q,ensure_ascii=False))
        await adv(A);await A.ev("()=>{achCheck()}");print('end',await A.ev("()=>[me.sty.s,STY.length,stTxt(),me.ach.stN2]"))
        await A.ev("()=>{me.x=2700;me.y=1000;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1500);await shot(A,'harbor_end')
        r=await A.ev("()=>{wmCd=15;return [wmWhy(1),wmWhy(9),wmWhy(2),p8Ship(1)]}");print('ship',r)
        await A.ev("()=>{wmUI(1)}");await A.wait(600);await shot(A,'wm');await A.ev("()=>{ov.hidden=true}")
        print([e for e in A.errs if 'ERR_' not in e][:6])
    finally: p.terminate()
asyncio.run(main())
