"""v495 ภาค 8 บทที่ 1 · เสียงตอบจากทะเลเมฆ: ประตูผาตะวันออกเฉียงใต้ · แมพ 38 ผาท่าเรือเมฆ · ช่วยลูกเรือ 5 คน · ล่า 40 · ซารา · จุดประภาคาร · นาวิน · ฉายา · ขอบผา/สะพานเดินตกไม่ได้ · ตกปลาเมฆ · แผนที่โลก · เล่นหลายคน"""
import asyncio, sys, random, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(100)
    for i in range(90):
        on=await A.ev("()=>{mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(100)
        if not on:break
SHOT='../v495/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Nv'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Nb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.c===STCH.indexOf('ภาค 8 · บทที่ 1 · เสียงตอบจากทะเลเมฆ'))")
        last7=await A.ev("()=>STY.findIndex(x=>x.p7c5)")
        rep('ภาค 8 บทที่ 1 ต่อจากบทสุดท้ายของภาค 7 พอดี (7 ขั้น)',i0==last7+1 and await A.ev("()=>STY.length")-i0==7,[i0,last7])
        for C,e7 in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0-1},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:{e7},p7m:1}};ov.hidden=true;enterMap(1,{{x:1600,y:1600}})}}")
        await A.wait(2500)
        g0=await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===38);return [!!G,gHid(G),wpGateOk(G),stTxt()]}")
        await A.ev(f"()=>{{me.sty.s={i0};me.sty.a=0;me.sty.n=0}}");await B.ev(f"()=>{{me.sty.s={i0};me.sty.a=0;me.sty.n=0}}")
        g1=await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===38);return [gHid(G),wpGateOk(G),stTxt()]}")
        rep('ประตูผาท่าเรือเมฆในค่ายซ่อนไว้จนกว่าจะคุยเรนน์ (ยังไม่จบภาค 7 = ไม่เห็น)',g0[0] and g0[1] and not g0[2] and g1[0] and 'เรนน์' in g1[2],[g0,g1])
        # ===== ขั้น 1: คุยเรนน์ (แยกบทพูดตาม e7) =====
        q1={}
        for C in (A,B):
            q1[C]=await C.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('คุยเรนน์: e7=1 พูดถึงอารัณยาลอยคืนฟ้า · e7=2 พูดถึงหัวใจกลางนครลี้ภัย (ไม่ปนกัน)', 'อารัณยาลอยคืนฟ้า' in q1[A] and 'นครลี้ภัย' not in q1[A] and 'นครลี้ภัย' in q1[B] and 'อารัณยาลอยคืนฟ้า' not in q1[B] and 'ผาท่าเรือเก่า' in q1[A], [len(q1[A]),len(q1[B])])
        cz=await A.ev("()=>[!!CZDEF.p8o,CZORD.includes('p8o'),czFind(CZDEF.p8o.get())]")
        rep('ฉากเปิดภาค 8 เป็นคัตซีน (ดูซ้ำได้ในรายการฉากสำคัญ)',cz[0] and cz[1] and cz[2]=='p8o',cz)
        await adv(A);await adv(B)
        s1=await A.ev("()=>{const G=MAPS[1].gates.find(g=>g.to===38);return [me.sty.s,gHid(G),wpGateOk(G),JSON.stringify((aqRoute(38)||[]).map(g=>g.to)),stTxt()]}")
        rep('คุยแล้วประตูเปิด · ออโต้เควสพาไปแมพ 38',s1[0]==i0+1 and not s1[1] and s1[2] and s1[3]=='[38]' and 'ผาท่าเรือเมฆ' in s1[4],s1)
        await A.ev("()=>{me.x=2650;me.y=2170}");await A.wait(1600);await A.pg.screenshot(path=SHOT+'t_gate.jpg',quality=78)
        # ===== ขั้น 2: เข้าแมพ =====
        await A.ev("()=>{me.x=2650;me.y=2250;useGate()}");await A.wait(2600);await adv(A)
        m=await A.ev("()=>[curMap,me.sty.s,me.sty.a,MAPS[38].n,bTheme(),mons.length,Math.min(...mons.map(m=>m.L)),Math.max(...mons.map(m=>m.L)),mons.filter(m=>!phIn(m.x,m.y,0)).length,TIER[38][0],stTxt()]")
        rep('เข้าผาท่าเรือเมฆ: ขั้นเดินทางผ่าน · มอนธีม 38 Lv 134–138 · เกิดบนแผ่นดินทุกตัว',m[0]==38 and m[1]==i0+2 and m[4]==38 and m[5]>=30 and m[6]>=134 and m[7]<=138 and m[8]==0,m)
        # ภาพแมพ
        for nm,x,y in (('t_spawn',330,1600),('t_harbor',2000,1720),('t_light',2300,780),('t_wreck',2120,2600),('t_pier',2700,1700)):
            await A.ev(f"()=>{{me.x={x};me.y={y};PHS.lx={x};PHS.ly={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>420);PALG.title=null}}");await A.wait(2600);await A.pg.screenshot(path=SHOT+nm+'.jpg',quality=78)
        # ===== ขอบผา/สะพาน =====
        K=A.pg.keyboard
        async def hold(keys,ms):
            for k in keys: await K.down(k)
            await A.wait(ms)
            for k in keys: await K.up(k)
            await A.wait(200)
            return await A.ev("()=>[Math.round(me.x),Math.round(me.y),phIn(me.x,me.y,-12)]")
        await A.ev("()=>{document.activeElement&&document.activeElement.blur();const y=1450;me.x=phEdge(y)-90;me.y=y;PHS.lx=me.x;PHS.ly=me.y;mons=[]}")
        e1=await hold(['KeyD'],1800);ed=await A.ev("()=>phEdge(1450)")
        await A.ev("()=>{const y=1700;me.x=2600;me.y=y;PHS.lx=me.x;PHS.ly=me.y}")
        e2=await hold(['KeyW'],1500);e3=await hold(['KeyD'],4200)
        await A.ev("()=>{me.x=2900;me.y=2300;}");await A.wait(400)
        e4=await A.ev("()=>[Math.round(me.x),Math.round(me.y),phIn(me.x,me.y,-12)]")
        rep('เดินตกขอบผาไม่ได้ · บนสะพานเดินออกข้างไม่ได้ แต่เดินไปถึงปลายสะพานได้ · หลุดออกไปกลางเมฆถูกดึงกลับ',e1[2] and e1[0]>ed-60 and e2[2] and e2[1]>1640 and e3[2] and e3[0]>2920 and e3[0]<2992 and e4[2],[e1,round(ed),e2,e3,e4])
        fs=await A.ev("()=>{me.x=2974;me.y=1700;PHS.lx=me.x;PHS.ly=me.y;mons=[];return [FSW.length,FSW.map(w=>w.b).join(','),!!fsWaterAt(me.x,me.y,34)]}");await A.wait(600)
        fo=await A.ev("()=>{try{fsOpen()}catch(e){return 'err '+e}return FS.open}");await A.wait(900);await A.pg.screenshot(path=SHOT+'t_fish.jpg',quality=78);await A.ev("()=>{try{fsClose()}catch(e){}}");fs.append(fo)
        rep('ปลายสะพานกลางตกปลาเมฆได้ (บ่อ sky)',fs[0]>=1 and 'sky' in fs[1] and fs[2] and fs[3] is True,fs)
        # ===== ขั้น 3: ช่วยลูกเรือ =====
        aq=await A.ev("()=>{const st=stCur();return [st.p8rs?1:0,JSON.stringify(arAqT(st)),JSON.stringify(phRS()[0])]}")
        rep('ออโต้เควสชี้ไปหาลูกเรือคนที่ใกล้สุด (ควันแดง)',aq[0]==1 and '"mp":38' in aq[1] and 'reach' in aq[1],aq)
        await A.ev("()=>{const[x,y]=phRS()[2];me.x=x+110;me.y=y+40;PHS.lx=me.x;PHS.ly=me.y;PALG.title=null;mons=[]}");await A.wait(500);await A.pg.screenshot(path=SHOT+'t_smoke.jpg',quality=78)
        await A.ev("()=>{const[x,y]=phRS()[0];me.x=x;me.y=y+30;PHS.lx=me.x;PHS.ly=me.y}");await A.wait(500)
        c0=await A.ev("()=>[PHS.carry,PHS.pk]");await A.wait(900)
        c1=await A.ev("()=>[PHS.carry]")
        await A.ev("()=>{me.x+=200;me.y-=40}");await A.wait(800)
        c2=await A.ev("()=>[PHS.carry,Math.round(Math.hypot(PHS.fx-me.x,PHS.fy-me.y))]")
        rep('ยืนข้างลูกเรือ 1 วิ → พยุงขึ้น · เดินไปลูกเรือเดินตาม',c0[0]==-1 and c0[1]==0 and c1[0]==0 and c2[0]==0 and c2[1]<60,[c0,c1,c2])
        await A.pg.screenshot(path=SHOT+'t_carry.jpg',quality=78)
        await A.ev("()=>{me.down=3}");await A.wait(300);c3=await A.ev("()=>[PHS.carry,me.sty.p8rs|0]");await A.ev("()=>{me.down=0;me.hp=me.mh}")
        rep('ล้มระหว่างพยุง → ลูกเรือกลับไปรอที่ควันแดง (ยังไม่นับ)',c3[0]==-1 and c3[1]==0,c3)
        got=[]
        for i in range(5):
            await A.ev(f"()=>{{const[x,y]=phRS()[{i}];me.x=x;me.y=y+30;PHS.lx=me.x;PHS.ly=me.y}}");await A.wait(1500)
            await A.ev("()=>{me.x=PHMED.x-60;me.y=PHMED.y+80}");await A.wait(500)
            got.append(await A.ev("()=>[me.sty.p8rs|0,me.sty.n,PALG.card&&PALG.card.h]"))
            if i==3: await A.pg.screenshot(path=SHOT+'t_med.jpg',quality=78)
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,me.sty.a,stTxt()]")
        rep('พาลูกเรือครบ 5 คนไปเต็นท์พยาบาล (การ์ดเรื่องเล่าทีละคน) → ขั้นต่อไป',got[-1][0]==31 and all('ลูกเรือนาวาเมฆ' in (g[2] or '') for g in got) and s3[0]==i0+3,[got,s3])
        # ===== ขั้น 4: ล่า 40 =====
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A)
        s4=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่าสัตว์เมฆ 40 ตัว → ไปคุยกัปตันซารา',s4[0]==i0+4 and 'ซารา' in s4[1],s4)
        # ===== ขั้น 5: ซารา =====
        await A.ev("()=>{PALG.card=null}")
        qs=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await A.wait(400);await A.pg.screenshot(path=SHOT+'t_sara.jpg',quality=78)
        await adv(A)
        s5=await A.ev("()=>[me.sty.s,me.sty.a,stTxt(),JSON.stringify(arAqT(stCur()))]")
        rep('คุยซารา (e7=1 ได้ยินเรื่องผู้พิทักษ์ผมเงินส่งมา) → จุดประภาคาร · ออโต้เควสชี้ไปประตูประภาคาร',qs[0]=='sara' and 'ผู้พิทักษ์ผมเงิน' in qs[1] and 'กลางเมืองของท่าน' not in qs[1] and s5[0]==i0+5 and 'ประภาคาร' in s5[2] and '"mp":38' in s5[3],[qs[0],s5])
        # ===== ขั้น 6: ประภาคาร =====
        await A.ev("()=>{me.x=PHLB.x;me.y=PHLB.y;PHS.lx=me.x;PHS.ly=me.y;mons=[]}");await A.wait(1000)
        l1=await A.ev("()=>[gP8lit(),me.sty.n,Math.round(PHS.lp*10)/10]")
        await A.ev("()=>{me.x=PHLB.x-200;me.y=PHLB.y+120}");await A.wait(700)
        l2=await A.ev("()=>[Math.round(PHS.lp*10)/10]")
        await A.ev("()=>{me.x=PHLB.x;me.y=PHLB.y}");await A.wait(1400);await A.pg.screenshot(path=SHOT+'t_ring.jpg',quality=78);await A.wait(1600)
        await adv(A)
        l3=await A.ev("()=>[gP8lit(),me.sty.s,stTxt()]")
        rep('ยืนหน้าประตูประภาคาร 2.5 วิ ถึงจุดไฟได้ (เดินออกแล้วเกจลด) → ไปหานาวิน',not l1[0] and l1[1]==0 and l1[2]>0 and l2[0]<l1[2] and l3[0] and l3[1]==i0+6 and 'นาวิน' in l3[2],[l1,l2,l3])
        await A.ev("()=>{window.DNH=21;me.x=2180;me.y=670;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(2500);await A.pg.screenshot(path=SHOT+'t_night.jpg',quality=78);await A.ev("()=>{window.DNH=12}")
        # ===== ขั้น 7: นาวิน =====
        qn=await A.ev("()=>{const N=MAPS[38].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.length]}")
        await adv(A);await A.ev("()=>{achCheck()}")
        s7=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!(me.ach&&me.ach.stN1),(typeof TITLES!=='undefined')]")
        rep('คุยนาวิน → จบภาค 8 บทที่ 1 · ได้ฉายา «ผู้ได้ยินเสียงตอบ» · ข้อความรอบทต่อไป',qn[0]=='navin' and s7[0]==s7[1] and 'จบภาค 8 บทที่ 1' in s7[2] and s7[3],[qn,s7])
        # ===== B (e7=2): ซาราพูดถึงหัวใจกลางเมือง =====
        await B.ev(f"()=>{{me.sty.s={i0+4};me.sty.a=0;enterMap(38,{{x:2000,y:1900}})}}");await B.wait(2600)
        qb=await B.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        await adv(B)
        rep('e7=2: ซาราเล่าว่าตามแสงหัวใจกลางเมืองมา (ไม่พูดเรื่องผู้พิทักษ์ผมเงิน)','กลางเมืองของท่าน' in qb and 'ผู้พิทักษ์ผมเงิน' not in qb,len(qb))
        # ===== เล่นหลายคน: เห็นกันในแมพ 38 =====
        await A.ev("()=>{me.x=2050;me.y=1900}");await A.wait(2500)
        mp=await B.ev("()=>{const o=Object.values(others||{});return [curMap,o.length,o.map(p=>p.n||p.name||'').join(',')]}")
        rep('สองคนอยู่ผาท่าเรือเมฆพร้อมกันเห็นกัน',mp[0]==38 and mp[1]>=1,mp)
        # ===== แผนที่โลก · กระดานค่าหัว =====
        wm=await A.ev("()=>{wmUI(38);const t=ov.textContent;ov.hidden=true;return [JSON.stringify(WMN[38]),JSON.stringify(WMLV[38]),/ผาท่าเรือเมฆ/.test(t),!!NMLR[38],wmReach()[38]?1:0]}")
        rep('แผนที่โลกมีผาท่าเรือเมฆ (Lv 134–138) · ไปถึงได้ · มีจุดมอนค่าหัว',wm[2] and wm[3] and wm[4]==1 and '134' in wm[1],wm)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
