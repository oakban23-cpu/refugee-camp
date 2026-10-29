"""v566 ฝันร้ายทีม (ปาร์ตี้ 2–4 คน)
   ① หน้าโหมดฝันร้ายในปาร์ตี้: การ์ดทีม · หัวหน้ากดเริ่มได้ · สมาชิกกดเริ่มไม่ได้ (บอกให้หัวหน้าเริ่ม)
   ② หัวหน้าเริ่ม → สมาชิกได้คำชวน → กดเข้า → ฝันร้ายเปิดบนเครื่องสมาชิกด้วยระดับ/คำสาปเดียวกัน (ป้ายทีม)
   ③ ดาเมจ: สมาชิกตีบอส → เลือดบอสบนเครื่องหัวห้องลด ÷hpf · สมาชิกโดนตี ×dmf
   ④ ชนะ (สถานะ win ซิงก์จากหัวห้อง) → ทั้งสองเครื่องบันทึกระดับทีม · ทอง · เศษฝันร้าย · กระดานทีม qYYMMDD (2 คน)
   ⑤ ระดับที่สูงกว่าที่สมาชิกปลด → สมาชิกช่วยได้แต่ไม่บันทึก · คนนอกปาร์ตี้เข้าห้อง → ไม่นับ · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
TOWN = "enterMap(45,{x:1600,y:1300})"
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Pa' + str(random.randint(100, 999)), 'archer', 99)
        B = await new_client(b, 'Pb' + str(random.randint(100, 999)), 'melee', 99)
        for C in (A, B):
            await C.ev("()=>{window.DNH=12;gmGod=false;AUTO.on=false;me.gold=1e7;ov.hidden=true;try{gmUsed=false}catch(e){};me.ngm={b:{},w:{k:nmWk(),b:{}},f:{},n:0,c:0,r:{},rt:1};nmEnsure();" + TOWN + "}")
        await A.wait(2500)
        await A.ev(f"()=>ptInvite('{B.uid}')"); await B.wait(1500); await B.ev("()=>ptAccept()"); await B.wait(2500)
        for C in (A, B):
            await C.ev("()=>{me.sty.s=STY.length;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true}")
        u = await A.ev("()=>{nmUI();return {pty:!!ov.querySelector('.nmpty'),go:!ov.querySelector('[data-nmgo=\"gdl\"]').disabled,n:PTY&&PTY.mem.length}}")
        v = await B.ev("()=>{nmUI();return {pty:!!ov.querySelector('.nmpty'),go:ov.querySelector('[data-nmgo=\"gdl\"]').disabled,why:nmWhy(NMD.find(e=>e[0]==='gdl'),1)}}")
        rep('ในปาร์ตี้: การ์ดฝันร้ายทีม · หัวหน้ากดเริ่มได้ · สมาชิกกดเริ่มไม่ได้ (หัวหน้าเป็นคนเริ่ม)', u['n'] == 2 and u['pty'] and u['go'] and v['pty'] and v['go'] and 'หัวหน้า' in v['why'], [u, v])
        # ② เริ่ม
        await A.ev("()=>{ov.hidden=true;nmGo('gdl',1)}"); await A.wait(2500)
        a1 = await A.ev("()=>({on:nfOn(),pt:NFC&&NFC.pt&&NFC.pt.mem.length,map:curMap,host:isHost()})")
        i1 = await B.ev("()=>({inv:dInv?dInv.id:0,pend:!!NMPEND})")
        await B.ev("()=>{if(dInv)$('dinvb').click()}"); await B.wait(3000)
        b1 = await B.ev("()=>({on:nfOn(),map:curMap,L:NFC&&NFC.L,mods:NFC&&NFC.mods,cr:NFC&&NFC.cr,pt:NFC&&NFC.pt&&NFC.pt.mem.length,void:NFC&&NFC.void,badge:(document.getElementById('nmbadge')||{}).textContent})")
        a1b = await A.ev("()=>({void:NFC&&NFC.void,mods:NFC&&NFC.mods,o:Object.keys(others).length})")
        rep('หัวหน้าเริ่ม → สมาชิกได้คำชวน → เข้าห้องเดียวกัน ฝันร้ายเปิดระดับ/คำสาปเดียวกัน · ป้าย «ฝันร้ายทีม» · ไม่โดนตัดสิทธิ์', a1['on'] and a1['pt'] == 2 and i1['inv'] == a1['map'] and i1['pend'] and b1['on'] and b1['map'] == a1['map'] and b1['L'] == 1 and b1['mods'] == a1b['mods'] and b1['cr'] == 1 and not b1['void'] and not a1b['void'] and a1b['o'] >= 1 and 'ทีม' in (b1['badge'] or ''), [a1, i1, b1, a1b])
        # ③ ดาเมจ (หัวห้องคือเครื่องที่ isHost)
        H, M = (A, B) if await A.ev("()=>isHost()") else (B, A)
        await H.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};dg={ph:'boss',w:0,tl:3000,nx:0};mons=[];bossCd=1e9;spawnBoss();const B=mons.find(m=>m.t===3);B.stun=999;B.inv=0;B.mh*=50;B.hp=B.mh}")
        await M.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await H.wait(2500)
        h0 = await H.ev("()=>{const B=mons.find(m=>m.t===3);return B?B.hp:0}")
        bb = await M.ev("()=>{const B=mons.find(m=>m.t===3);if(!B)return null;addHit(B,200000,0,0,'melee');return NFC.hpf}")
        await H.wait(2000)
        h1 = await H.ev("()=>{const B=mons.find(m=>m.t===3);return B?B.hp:0}")
        hb = await M.ev("()=>{me.inv3=0;me.hp=me.mh;let a=me.hp;hurt(1000);const t1=a-me.hp;NFC.void=1;me.hp=me.mh;a=me.hp;hurt(1000);const t0=a-me.hp;NFC.void=0;me.hp=me.mh;return [t1,t0,NFC.dmf]}")
        d = h0 - h1
        rep('สมาชิกตีบอส → เลือดบอสบนเครื่องหัวห้องลด 200,000÷hpf · สมาชิกโดนตี ×dmf', bool(bb) and abs(d - 200000 / bb) < 200000 / bb * .25 and abs(hb[0] / max(1, hb[1]) - hb[2]) < .15, [h0, h1, d, bb, hb])
        # ④ ชนะ: หัวห้องจบดัน → สถานะ win ซิงก์ไปอีกเครื่อง
        await H.ev("()=>{const B=mons.find(m=>m.t===3);if(B){B.hp=1;addHit(B,1e9,0,0,'archer')}}"); await H.wait(4500)
        ra = await A.ev("()=>({ph:dg.ph,pb:me.ngm.pb.gdl|0,pw:me.ngm.pw.b.gdl|0,b:me.ngm.b.gdl|0,c:me.ngm.c,sp:nmScoreP(),s:nmScore()})")
        rb = await B.ev("()=>({ph:dg.ph,pb:me.ngm.pb.gdl|0,b:me.ngm.b.gdl|0,c:me.ngm.c,sp:nmScoreP()})")
        rep('ชนะ → ทั้งหัวหน้าและสมาชิกบันทึกระดับทีม 1 (ไม่ปนกับเดี่ยว) · เศษฝันร้ายครั้งแรก 3', ra['pb'] == 1 and rb['pb'] == 1 and ra['b'] == 0 and rb['b'] == 0 and ra['c'] == 3 and rb['c'] == 3 and ra['sp'] == 1 and ra['s'] == 0, [ra, rb])
        await A.wait(1000)
        lb = await A.ev("()=>new Promise(res=>{lbFetch(true);setTimeout(()=>res((lbData&&lbData[nmQk()])||null),2500)})")
        rep('กระดานอันดับทีม qYYMMDD: มีทั้งสองคน · คะแนน 1 · ทีม 2 คน', bool(lb) and len(lb) == 2 and all(r[3] == 1 and r[4] == 2 for r in lb), lb)
        # ⑤ ระดับ 2: หัวหน้าปลดแล้ว (ทีม 1) แต่ให้สมาชิกไม่มีสิทธิ์ (ลบความคืบหน้าสมาชิก) → ช่วยได้ไม่บันทึก · แล้วคนนอกปาร์ตี้เข้าห้อง → ไม่นับ
        for C in (A, B):
            await C.ev("()=>{try{if(isDg())dgLeave()}catch(e){};me.down=0;me.hp=me.mh;ov.hidden=true}")
        await A.wait(1500)
        for C in (A, B):
            await C.ev("()=>{" + TOWN + "}")
        await B.ev("()=>{me.ngm.pb={};me.ngm.pf={};dInv=null}")
        await A.wait(1800)
        await A.ev("()=>{ov.hidden=true;nmGo('gdl',2)}"); await A.wait(2500)
        await B.ev("()=>{if(dInv)$('dinvb').click()}"); await B.wait(3000)
        b2 = await B.ev("()=>({on:nfOn(),L:NFC&&NFC.L,cr:NFC&&NFC.cr})")
        H, M = (A, B) if await A.ev("()=>isHost()") else (B, A)
        await H.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};dg={ph:'boss',w:0,tl:3000,nx:0};mons=[];bossCd=1e9;spawnBoss()}")
        await M.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await H.wait(2000)
        await H.ev("()=>{const B=mons.find(m=>m.t===3);if(B){B.hp=1;addHit(B,1e9,0,0,'archer')}}"); await H.wait(4500)
        r2 = await A.ev("()=>({pb:me.ngm.pb.gdl|0})"); r2b = await B.ev("()=>({pb:me.ngm.pb.gdl|0,c:me.ngm.c,ban:banner&&banner.s})")
        rep('ระดับ 2 ที่สมาชิกยังไม่ปลด: สมาชิกเข้าร่วมได้ (ระดับ 2) แต่ไม่บันทึก/ไม่ได้เศษ · หัวหน้าบันทึกทีมระดับ 2', b2['on'] and b2['L'] == 2 and b2['cr'] == 0 and r2['pb'] == 2 and r2b['pb'] == 0 and r2b['c'] == 3, [b2, r2, r2b])
        # คนนอกปาร์ตี้
        for C in (A, B):
            await C.ev("()=>{try{if(isDg())dgLeave()}catch(e){};me.down=0;me.hp=me.mh;ov.hidden=true}")
        await A.wait(1500)
        await A.wait(9000)
        await A.ev("()=>{" + TOWN + "}"); await A.wait(1500)
        why = await A.ev("()=>[nmWhy(NMD.find(e=>e[0]==='gdl'),1),run,me.down,SD.on,isDg(),curMap]")
        await A.ev("()=>{ov.hidden=true;nmGo('gdl',1)}"); await A.wait(2500)
        rid = await A.ev("()=>curMap")
        C = await new_client(b, 'Pc' + str(random.randint(100, 999)), 'mage', 99)
        await C.ev(f"()=>{{ov.hidden=true;window.DNH=12;dgJoin('{rid}')}}"); await C.wait(3500)
        vo = await A.ev("()=>({void:NFC&&NFC.void,o:Object.keys(others).length})")
        rep('ฝันร้ายทีม: คนนอกปาร์ตี้เข้าห้องด้วยรหัส → รอบนั้นไม่นับ', vo['void'] == 1, [vo, why, rid])
        E = [e for e in A.errs + B.errs + C.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
