"""v529 ภาค 8 บทที่ 3 · สุสานเรือ: แมพ 39 (เดินเฉพาะเมฆแข็ง/ซาก/สะพาน · กระแสลม · ฟ้าผ่า) · สมุดปูม 5 เล่ม · ล่า 40 · นาวิน · ดวลบนเรือดำ (กัปตันกริฟ) · กริฟแยก p8g · ฉายา"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(80)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(80)
        if not on:break
SH='../v529/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ra'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Rb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p8s3)");n7=await A.ev("()=>STY.length-STY.findIndex(x=>x.p8s3)")
        rep('ภาค 8 บทที่ 3 ต่อจากบทที่ 2 (7 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p8c2)")+1 and n7==7,[i0,n7])
        for C,pg in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:{pg}}};me.wv=[1,9,32,38,2,3];ov.hidden=true;enterMap(38,{{x:2000,y:1900}})}}")
        await A.wait(2500)
        h0=await A.ev("()=>MAPS[38].gates.filter(G=>G.to===39).map(G=>gHid(G))")
        qa=await A.ev("()=>{const N=MAPS[38].npc;me.x=N.x;me.y=N.y+40;npcSel=1;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        qb=await B.ev("()=>{const N=MAPS[38].npc;me.x=N.x;me.y=N.y+40;npcSel=1;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('คุยซารา: บทพูดแยกตาม p8g (ลูกเรือเรือดำบอกทาง / เรือดำหายไป)','รอพบผู้ถือตรา' in qa and 'บังเอิญ' not in qa and 'บังเอิญ' in qb and 'รอพบผู้ถือตรา' not in qb,[qa[-200:],qb[-200:]])
        await adv(A);await adv(B)
        h1=await A.ev("()=>MAPS[38].gates.filter(G=>G.to===39).map(G=>gHid(G))")
        rep('ประตู «สุสานเรือเมฆ» ที่ปลายสะพานเหนือ ซ่อนก่อนคุยซารา · เปิดหลังคุย',h0==[True] and h1==[False],[h0,h1])
        await A.ev("()=>{me.x=2900;me.y=1250;useGate()}");await A.wait(3000);await adv(A)
        m=await A.ev("()=>[curMap,stCur().p8lg?1:0,Math.round(me.x),Math.round(me.y),sgIn(me.x,me.y,0),MAPS[39].mvpOnly]")
        lv=await A.ev("()=>{const L=mons.filter(m=>m.t<3).map(m=>m.L);return [Math.min(...L),Math.max(...L),mons.filter(m=>m.t<3).every(m=>sgIn(m.hx,m.hy,0,1)&&!sgSafe(m.hx,m.hy)),mons.filter(m=>m.t<3&&!(sgIn(m.hx,m.hy,0,1)&&!sgSafe(m.hx,m.hy))).slice(0,4).map(m=>[Math.round(m.hx),Math.round(m.hy),Math.round(m.x),Math.round(m.y)])]}")
        rep('ขึ้นเรือไปแมพ 39: เกิดบนเมฆแข็ง · ขั้นตามหาปูม · มอน Lv 138–142 เกิดบนพื้นเดินได้ ไม่เกิดที่จุดขึ้นฝั่ง',m[0]==39 and m[1]==1 and m[4] and 138<=lv[0] and lv[1]<=143 and lv[2],[m,lv])
        # ===== เดิน: ทะเลเมฆเดินไม่ได้ · สะพานได้ =====
        w=await A.ev("""async()=>{me.x=900;me.y=1600;SGS.lx=me.x;SGS.ly=me.y;await new Promise(r=>setTimeout(r,300));const a=[Math.round(me.x),Math.round(me.y)];me.x=300;me.y=2300;await new Promise(r=>setTimeout(r,300));const bk=[Math.round(me.x),Math.round(me.y)];
          const br=sgIn(1100,1680,0),sea=sgIn(1100,1400,0),aqS=aqWalkable(2100,2100),aqW=aqWalkable(1860+80,1790+62);return {a,bk,br,sea,aqS,aqW}}""")
        rep('ทะเลเมฆเดินไม่ได้ (ดึงกลับจุดล่าสุด) · สะพานไม้เดินได้ · ออโต้เควสไม่เดินผ่านกระแสลม',w['bk']==w['a'] and w['br'] and not w['sea'] and not w['aqS'] and not w['aqW'],w)
        # ===== กระแสลม =====
        await A.ev("()=>{mons=[];const w=SGW[0];me.x=w[0]+20;me.y=w[1]+15;SGS.lx=me.x;SGS.ly=me.y}");await A.wait(400)
        mid=await A.ev("()=>[SGS.w,Math.round(me.x),Math.round(me.y)]")
        await A.wait(2600)
        f=await A.ev("()=>[sgIsle(me.x,me.y,0),Math.round(me.x),Math.round(me.y),SGS.w]")
        await A.pg.screenshot(path=SH+'t_wind.jpg',quality=78)
        await A.ev("()=>{const w=SGW[1];me.x=w[0]-10;me.y=w[1]-8;SGS.lx=me.x;SGS.ly=me.y}");await A.wait(2800)
        f2=await A.ev("()=>[sgIsle(me.x,me.y,0),Math.round(me.x),Math.round(me.y)]")
        rep('กระแสลม: ก้าวเข้าไปแล้วลมหอบข้ามเมฆไปซากสำเภาเงิน · ลมพัดกลับมาเกาะกลาง',mid[0]==0 and f[0]==5 and f2[0]==2,[mid,f,f2])
        # ===== ปูม (ออโต้เควสเกาะไกลพาไปต้นลม) =====
        aq=await A.ev("async()=>{me.x=520;me.y=1600;SGS.lx=me.x;SGS.ly=me.y;me.sty.p8lg=1|2|4;await new Promise(r=>setTimeout(r,300));return JSON.stringify(arAqT(stCur()))}")
        got=[]
        for i in range(5):
            r=await A.ev(f"async()=>{{const[x,y]=sgLog({i});me.x=x;me.y=y+20;SGS.lx=me.x;SGS.ly=me.y;mons=[];if({i}===0)me.sty.p8lg=0;await new Promise(r=>setTimeout(r,1400));return [me.sty.p8lg|0,me.sty.n,PALG.card&&PALG.card.h]}}")
            got.append(r)
        await A.pg.screenshot(path=SH+'t_log.jpg',quality=78)
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('สมุดปูม 5 เล่ม (ยืน 1 วิ = อ่าน · การ์ดเรื่องเล่าทีละเล่ม · ออโต้เควสพาเกาะไกลไปต้นลม) → ขั้นล่า',got[-1][0]==31 and all('ปูม' in (g[2] or '') or 'หน้ากระดาษ' in (g[2] or '') or 'สมุด' in (g[2] or '') for g in got) and s3[0]==i0+3 and 'กระแสลม' in aq,[aq,got,s3])
        # ===== ฟ้าผ่า =====
        fb=await A.ev("""async()=>{const iv=setInterval(()=>{mons.length=0},30);gmGod=false;me.hp=me.mh;me.x=1620;me.y=1700;SGS.lx=me.x;SGS.ly=me.y;mons=[];SGS.warn=[];const k0=SGS.hk|0;SGS.warn.push({x:me.x,y:me.y,t:.6,d:.6});await new Promise(r=>setTimeout(r,1100));const h=(SGS.hk|0)>k0?100-Math.round(SGS.hd/me.mh*100):100;
          me.hp=me.mh;me.x=520;me.y=1600;SGS.lx=me.x;SGS.ly=me.y;SGS.warn=[];SGS.bt=0;await new Promise(r=>setTimeout(r,1200));const safe=SGS.warn.length;gmGod=true;clearInterval(iv);return [Math.round(h),SGS.bolt.length>=0,safe]}""")
        rep('ฟ้าผ่า: วงเตือนแล้วผ่า ยืนในวงเสียเลือด ~8% · จุดขึ้นฝั่งไม่มีฟ้าผ่า',fb[0]<=95 and fb[0]>=85 and fb[2]==0,fb)
        # ===== ล่า 40 =====
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A)
        s4=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่ามอน 40 → คุยนาวินที่จุดขึ้นฝั่ง',s4[0]==i0+4 and 'นาวิน' in s4[1],s4)
        await B.ev(f"()=>{{me.sty.s={i0+4};me.sty.a=0;me.sty.n=0;enterMap(39,{{x:600,y:1600}})}}");await B.wait(2600)
        na=await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        nb=await B.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('นาวินอ่านปูม (วาฬกลืนฟ้า) · กริฟตะโกนแยกตาม p8g',na[0]=='navin3' and 'วาฬกลืนฟ้า' in na[1] and 'ขอบใจ' in na[1] and 'ปิดท่าใส่' in nb and 'ขอบใจ' not in nb,[na[0],na[1][-160:],nb[-160:]])
        await adv(A);await adv(B)
        # ===== ดวลบนเรือดำ: แพ้ก่อน =====
        await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2500)
        rid=await A.ev("()=>curMap")
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:CX-400,y:CY+60}})}}");await B.wait(3000)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        g0=await A.ev("()=>[GDLI(),dg.ph,isHost(),(mons.find(m=>m.t===3)||{}).hp>0,MAPS[curMap].boss.n,curMap>=70000&&curMap<71000]")
        await A.pg.screenshot(path=SH+'t_duel.jpg',quality=78)
        # เรือเอียง: ไถล (ทั้งสองเครื่อง) + ถังกลิ้ง
        await A.ev("()=>{GDL.nt=0}");await A.wait(1800)
        x0a=await A.ev("()=>{me.x=CX-100;me.y=CY+40;return me.x}");x0b=await B.ev("()=>{me.x=CX-60;me.y=CY-60;return me.x}")
        await A.wait(1500)
        ta=await A.ev("()=>[GDL.tl,Math.round(me.x),GDL.br.length]");tb=await B.ev("()=>[GDL.tl,Math.round(me.x)]")
        await A.pg.screenshot(path=SH+'t_tilt.jpg',quality=78)
        tilt_ok=ta[0]!=0 and tb[0]==ta[0] and (ta[1]-x0a)*ta[0]>80 and (tb[1]-x0b)*tb[0]>80 and ta[2]>=3
        rep('เรือเอียง: ทั้งสองเครื่องไถลไปทางเดียวกัน · ถังไม้กลิ้ง ≥ 3 ใบ',tilt_ok,[ta,tb,x0a,x0b])
        # ท่าบอส: ปืนใหญ่ · คานใบเรือ · สมอดึง
        mech=await A.ev("""async()=>{const Bo=mons.find(m=>m.t===3);Bo.inv=0;Bo.stun=0;Bo.g1=0;Bo.g2=0;Bo.g3=0;me.x=CX-500;me.y=CY+20;await new Promise(r=>setTimeout(r,600));const a=[GDFX.c.length,GDFX.b.length,GDFX.a.length];
          const x0=me.x;await new Promise(r=>setTimeout(r,1800));return {a,pulled:Math.round(me.x-x0),bx:Math.round(Bo.x)}}""")
        await A.pg.screenshot(path=SH+'t_mech.jpg',quality=78)
        rep('ท่ากริฟ: ปืนใหญ่ (วงแดง) · คานใบเรือกวาด (แถบครึ่งดาดฟ้า) · โยนสมอใส่คนไกลแล้วดึงเข้าหา',g0[0] and g0[1]=='boss' and g0[3] and g0[4]=='กัปตันกริฟ' and g0[5] and mech['a'][0]>=1 and mech['a'][1]>=1 and mech['a'][2]>=1 and mech['pulled']>40,[g0,mech])
        ad=await A.ev("async()=>{const Bo=mons.find(m=>m.t===3);Bo.hp=Bo.mh*.6;await new Promise(r=>setTimeout(r,800));return mons.filter(m=>m.gdl&&m.t!==3).length}")
        rep('เลือดกริฟต่ำกว่า 70% → ลูกเรือวิญญาณปีนขึ้นมา',ad>=3,ad)
        await A.ev("()=>{me.hp=0;me.down=5}");await B.ev("()=>{me.hp=0;me.down=5}");await A.wait(4500)
        fl=await A.ev("()=>[dg.ph,dg.why||'']");await A.wait(6000)
        fl2=await A.ev("()=>[curMap,me.sty.s,me.sty.n]")
        rep('ทั้งทีมล้ม = แพ้ → กลับสุสานเรือ · ขั้นเนื้อเรื่องไม่ผ่าน',fl[0]=='fail' and fl2[0]==39 and fl2[1]==i0+5 and fl2[2]==0,[fl,fl2])
        await A.ev("()=>{me.down=0;me.hp=me.mh}");await B.ev("()=>{me.down=0;me.hp=me.mh}")
        # ===== ชนะ =====
        await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2500)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1500)
        for k in range(30):
            ph=await A.ev("()=>{const i=mons.findIndex(m=>m.t===3);if(i>=0){mons[i].inv=0;mons[i].stun=0;mons[i].hp=Math.min(mons[i].hp,50);try{dmgMon(mons[i].id,mons[i].hp+10)}catch(e){}}return dg.ph}")
            if ph=='win':break
            await A.wait(500)
        wn=await A.ev("()=>[dg.ph,me.sty.n,me.sty.a]")
        await A.wait(11000);await adv(A)
        bk=await A.ev("()=>[curMap,me.sty.s,stTxt(),MAPS[39].npc2.x>0]")
        rep('ชนะกริฟ → กลับสุสานเรือ · กริฟโผล่ที่จุดขึ้นฝั่ง · ขั้นต่อไปคุยกริฟ',wn[0]=='win' and bk[0]==39 and bk[1]==i0+6 and 'กริฟ' in bk[2] and bk[3],[wn,bk])
        await A.ev("()=>{me.x=600;me.y=1760;SGS.lx=me.x;SGS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1200);await A.pg.screenshot(path=SH+'t_grif.jpg',quality=78)
        qg=await A.ev("()=>{const N=MAPS[39].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stN3]")
        rep('คุยกริฟ (p8g=1 ยื่นดาบ · ซาราต้อนรับกลับ) → จบบทที่ 3 · ฉายา «ผู้อ่านปูมเรือ»',qg[0]=='grif' and 'ยื่นด้าม' in qg[1] and 'โยนดาบ' not in qg[1] and en[0]==en[1] and 'จบภาค 8 บทที่ 3' in en[2] and en[3],[qg[0],qg[1][-120:],en])
        rp=await A.ev("()=>{const N=MAPS[39].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();const c=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';stClose();return c}")
        rep('จบบทแล้วคุยนาวินเล่นดวลบนเรือดำซ้ำได้','ดวลบนเรือดำ' in rp,rp)
        wm=await A.ev("()=>[WMN[39]&&WMN[39][2],WMLV[39]]")
        rep('แผนที่โลกมีสุสานเรือเมฆ (Lv 138–142)',wm[0]=='สุสานเรือเมฆ' and wm[1]==[138,142],wm)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
