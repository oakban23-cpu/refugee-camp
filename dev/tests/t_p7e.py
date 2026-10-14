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
VES="()=>{const N=MAPS[33].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;return stNpcClick()}"
async def main():
    E6=int(sys.argv[1]) if len(sys.argv)>1 else 1
    E7=int(sys.argv[2]) if len(sys.argv)>2 else 1
    PM=int(sys.argv[3]) if len(sys.argv)>3 else 1
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 7 · บทสุดท้าย · เตาหลอมหัวใจ'))")
        print('i0',i0,await A.ev("()=>STY.length"))
        await A.ev(f"()=>{{gmGod=true;LOWQ=false;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:{E6},p7m:{PM},p7mr:36122,p7sd:3}};ov.hidden=true;enterMap(33,{{x:1600,y:300}});setInterval(()=>{{FQ.avg=0;LOWQ=false}},50)}}");await A.wait(2500);await adv(A)
        print('arrive',await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),MAPS[33].npc2.x,trees.filter(t=>t.k==='htb').length,trees.filter(t=>t.k&&!t.inv&&t.k!=='htb'&&HFB.some(([x,y])=>Math.hypot(t.x-x,t.y-y)<120)).length]"))
        r=await A.ev(VES);await adv(A)
        print('ves1',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify(hfAqT(stCur()))]"))
        await A.ev("()=>{me.x=1600;me.y=1150;mons=[]}");await A.wait(1200);await A.ev("()=>{window.__cz=window.camZoomT;window.camZoomT=()=>.36}");await A.wait(1500);await A.pg.screenshot(path='../p6/e_hand.png');await A.ev("()=>{window.camZoomT=window.__cz}")
        for k in range(40):
            st=await A.ev("""()=>{const q=me.sty,ha=hfHand();let best=-1,bd=1e9;HFB.forEach((_,i)=>{if((q.p7tb|0)>>i&1)return;let d=HFBA[i]-ha;d=((d%6.2832)+6.2832)%6.2832;if(d>6.1)d=0;if(d<bd){bd=d;best=i}});
              if(best>=0){me.x=HFB[best][0];me.y=HFB[best][1]+30}mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>400);return [best,q.p7tb|0,stTxt()]}""")
            if k==3: await A.pg.screenshot(path='../p6/e_bell.png')
            if st[0]<0:break
            await A.wait(700)
        await adv(A);print('bells',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7tb,stTxt(),me.sty.p7sd]"))
        r=await A.ev(VES);await adv(A)
        print('ves2',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]"))
        for i in range(5):
            await A.ev(f"()=>{{const[x,y]=hfSh({i});me.x=x;me.y=y+20}}")
            for k in range(10):
                await A.wait(200);await A.ev(f"()=>{{const[x,y]=hfSh({i});me.x=x;me.y=y+20;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>400)}}")
            if i==0: await A.pg.screenshot(path='../p6/e_shadow.png')
        await adv(A);print('shadows',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.p7ss,stTxt(),me.sty.p7sd]"))
        await A.ev("()=>{me.x=1600;me.y=1500}");await A.wait(1500);await A.pg.screenshot(path='../p6/e_pitforge.png')
        await A.ev("()=>{enterMap(9,{x:1600,y:2100})}");await A.wait(2500)
        r=await A.ev("()=>{const i=CITY.npcs.findIndex(n=>n.k==='qn');const N=CITY.npcs[i];me.x=N.x;me.y=N.y+40;npcSel='x'+i;return stNpcClick()}");await adv(A)
        print('qn',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify((aqRoute(33)||[]).map(g=>g.to))]"))
        await A.ev("()=>{enterMap(33,{x:1600,y:1300})}");await A.wait(2500)
        r=await A.ev(VES);await A.wait(300);await skip(A,10);await A.wait(2500)
        print('inst',r,await A.ev("()=>[curMap,HFGI(),dg.ph,trees.length]"))
        await A.ev("()=>{dgStart()}");await skip(A,14);await A.wait(1500)
        print('run',await A.ev("()=>[dg.ph,HF.st,HF.hp,HF.S]"))
        await A.ev("()=>{me.x=HFST[2][0];me.y=HFST[2][1]}");await A.wait(6000)
        print('sing',await A.ev("()=>[HF.S,HF.sg.join(''),mons.filter(m=>m.hfg).length,HF.hp]"))
        await A.pg.screenshot(path='../p6/e_run.png')
        await A.ev("()=>{mons.forEach(m=>{if(m.hfg){m.x=CX+30;m.y=CY+30}});me.x=HFST[0][0];me.y=HFST[0][1]}");await A.wait(2500)
        print('bite',await A.ev("()=>[HF.hp,HF.S]"))
        await A.ev("()=>{mons=[];HF.S=99.5}");await A.wait(1500)
        print('boss',await A.ev("()=>[dg.ph,HF.st,!!mons.find(q=>q.t===3)]"))
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.h1=0;B.h2=99;B.h3=99;B.stun=0;B.x=CX;B.y=CY-330;me.x=CX;me.y=CY-180}");await A.wait(1200);await A.pg.screenshot(path='../p6/e_tether.png')
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.x=CX;B.y=CY-330;me.x=CX;me.y=CY-180}");await A.wait(2400)
        print('tether block',await A.ev("()=>[HF.hp,HFX.tr&&HFX.tr.ok]"))
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.h1=0;B.stun=0;me.x=HFST[2][0];me.y=HFST[2][1]}");await A.wait(3400)
        print('tether miss',await A.ev("()=>[HF.hp,HFX.tr&&HFX.tr.ok,(mons.find(q=>q.t===3).hp/mons.find(q=>q.t===3).mh).toFixed(3)]"))
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.h1=99;me.x=HFST[1][0];me.y=HFST[1][1];HF.cc=0;HF.ch=0}");await A.wait(7000)
        print('chorus',await A.ev("()=>[HF.ch,HF.cc,mons.find(q=>q.t===3).stun>0]"))
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.hp=B.mh*.3;B.inv=0;B.stun=0;B.h4=0;B.h1=99;me.x=CX+200;me.y=CY+250}");await A.wait(1200)
        p0=await A.ev("()=>[me.x,me.y]");await A.pg.screenshot(path='../p6/e_inh.png');await A.wait(800)
        print('inhale pull',p0,await A.ev("()=>[me.x,me.y,!!HFX.inh]"))
        await A.ev("()=>{me.x=HFST[2][0];me.y=HFST[2][1]}");await A.wait(400);p1=await A.ev("()=>[me.x,me.y]");await A.wait(600)
        print('anchored',p1,await A.ev("()=>[me.x,me.y]"))
        await A.wait(2500);await A.ev("()=>{const B=mons.find(q=>q.t===3);B.h3=0}");await A.wait(1500)
        print('adds',await A.ev("()=>mons.filter(m=>m.hfg).length"))
        await A.ev("()=>{const B=mons.find(q=>q.t===3);me.x=B.x;me.y=B.y+140}");await A.wait(900);await A.pg.screenshot(path='../p6/e_boss.png')
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.hp=0}");await A.wait(1500)
        print('win',await A.ev("()=>[dg.ph,me.sty.n,me.sty.p7sd]"))
        await A.wait(11000);await adv(A)
        print('after',await A.ev("()=>[curMap,me.sty.s,me.sty.a,stTxt()]"))
        r=await A.ev(VES);await adv(A,40)
        ok=False
        for i in range(30):
            ok=await A.ev("()=>!!SD.choice&&typeof SD.onChoose==='function'")
            if ok:break
            await A.ev("()=>{if(SD.on&&SD.typ)stNext()}");await A.wait(150)
        print('choice',r,ok)
        await A.ev(f"()=>{{SD.onChoose({E7})}}");await adv(A,60);await A.wait(1500);await adv(A,20)
        print('chosen',await A.ev("()=>[me.sty.s,me.sty.a,me.sty.e7,stTxt()]"))
        r=await A.ev("()=>{const N=MAPS[33].npc;npcSel=1;me.x=N.x;me.y=N.y+40;return stNpcClick()}");await adv(A,40);await A.wait(800)
        print('end',r,await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),me.sty.p7sd,STY.length]"))
        await A.ev("()=>{achCheck()}");print('title',await A.ev("()=>[me.ach.stS5,me.ach.stP7]"))
        r=await A.ev(VES);await A.wait(400)
        print('repeat menu',r,await A.ev("()=>!!SD.choice"))
        await A.ev("()=>{stClose()}")
        print('shop5',await A.ev("()=>{sdShop('brom');const r=SD.choice&&SD.choice.map(c=>c[0]);stClose();return JSON.stringify(r)}"))
        await A.ev("()=>{me.sty.p7so=(me.sty.p7so|0)|(1<<5);me.sty.p7sq=5}")
        if E7==2:
            await A.ev("()=>{enterMap(1,{x:1600,y:1520})}");await A.wait(9000);await A.pg.screenshot(path='../p6/e_city.png')
            print('city',await A.ev("()=>MAPS[1].n"))
        else:
            await A.ev("()=>{me.x=1600;me.y=1420}");await A.wait(2000);await A.pg.screenshot(path='../p6/e_aranya.png')
            await A.ev("()=>{enterMap(32,{x:1600,y:1600})}");await A.wait(2500);await A.pg.screenshot(path='../p6/e_m32.png')
            print('m32',await A.ev("()=>MAPS[32].n"))
        print('save',await A.ev("()=>JSON.stringify(cleanChar(JSON.parse(JSON.stringify(snap()))).sty)"))
        print([e for e in A.errs if 'TUNNEL' not in e][:8])
        await b.close()
    p.terminate()
asyncio.run(main())
