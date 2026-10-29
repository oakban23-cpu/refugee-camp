"""v565 ร้านฝันร้าย
   ① ผ่านฝันร้ายได้เศษ (ครั้งแรก 3L · ซ้ำ L) · ย้อนหลังจาก me.ngm.f ครั้งเดียว
   ② หน้าโหมดฝันร้ายมีการ์ดร้าน → ร้าน · เศษไม่พอแลกไม่ได้ · แลกชุด/สัตว์เลี้ยง/พาหนะ/สีย้อม/หิน ได้ของจริงและหักเศษถูก · ของชิ้นเดียวขึ้น «มีแล้ว»
   ③ คอกสัตว์: อาชาฝันร้ายซื้อด้วยทองไม่ได้ · เซฟ/โหลดเก็บเศษ/ของใหม่ครบ
   ④ รางวัลอันดับสัปดาห์ก่อนจากกระดานเซิร์ฟเวอร์ (รับครั้งเดียว) · ผู้เล่นอื่นเห็นพาหนะ 10 และสัตว์เลี้ยง 15 · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Ns' + str(random.randint(100, 999)), 'archer', 99)
        B = await new_client(b, 'Nb' + str(random.randint(100, 999)), 'melee', 99)
        await A.ev("()=>{AUTO.on=false;ov.hidden=true;gmGod=false;me.sty.s=STY.length;try{gmUsed=false}catch(e){}}")
        # ① เศษจากการผ่าน + ย้อนหลัง
        r = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.ngm={b:{},w:{k:nmWk(),b:{}},f:{},n:0,c:0,r:{},rt:1};
          const out={};nmArm('gdl',2);nmClear();out.first=me.ngm.c;nmArm('gdl',2);nmClear();out.rep=me.ngm.c-out.first;
          const s=snap();const c=cleanChar(JSON.parse(JSON.stringify(s)));c.ngm={b:{rte:2,gdl:1},w:{k:'',b:{}},f:{'rte:1':1,'rte:2':1,'gdl:1':1},n:3,c:5};applySave(c);out.retro=me.ngm.c;
          const c2=cleanChar(JSON.parse(JSON.stringify(snap())));applySave(c2);out.again=me.ngm.c;return out}""")
        rep('ผ่านฝันร้ายได้เศษ (ครั้งแรก ระดับ 2 = 6 · ซ้ำ = 2) · ย้อนหลัง 3L ต่อด่านที่เคยผ่าน (5+3+6+3 = 17) ครั้งเดียว', r['first'] == 6 and r['rep'] == 2 and r['retro'] == 17 and r['again'] == 17, r)
        # ② ร้าน
        s = await A.ev("""()=>{me.ngm.c=100;nmUI();const card=!!ov.querySelector('[data-nmshop]');ov.querySelector('[data-nmshop]').click();const k=ov.dataset.k,n=ov.querySelectorAll('[data-nmbuy]').length;
          const dis=ov.querySelector('[data-nmbuy="mt"]').disabled;nmShopBuy('mt');const msg=(ov.querySelector('.note')||{}).textContent||'';const still=!(me.mts||[]).includes(NMMT)&&me.ngm.c===100;
          me.ngm.c=2000;const W=wdrSt();delete W.o.ngm;me.pets=(me.pets||[]).filter(i=>i!==NMPT);me.mts=(me.mts||[]).filter(i=>i!==NMMT);const d0=dyCnt('d8'),s0=me.inv.s3|0;nmShopUI();
          ['set','pet','mt','d8','s3'].forEach(id=>ov.querySelector('[data-nmbuy="'+id+'"]').click());
          const got={set:!!W.o.ngm,pet:me.pets.includes(NMPT),mt:me.mts.includes(NMMT),d8:dyCnt('d8')-d0,s3:(me.inv.s3|0)-s0,c:me.ngm.c};
          const own=['set','pet','mt'].every(id=>!ov.querySelector('[data-nmbuy="'+id+'"]'))&&ov.querySelectorAll('button[disabled]').length>=3;
          nmShopBuy('set');const c2=me.ngm.c;return {card,k,n,dis,msg,still,got,own,c2}}""")
        okS = s['card'] and s['k'] == 'nms' and s['n'] == 9 and s['dis'] and 'ไม่พอ' in s['msg'] and s['still'] and s['got'] == {'set': True, 'pet': True, 'mt': True, 'd8': 1, 's3': 5, 'c': 2000 - 250 - 400 - 600 - 120 - 20} and s['own'] and s['c2'] == s['got']['c']
        rep('ร้าน: การ์ดในหน้าฝันร้าย → 9 รายการ · เศษไม่พอแลกไม่ได้ · แลกชุด/บากุ/อาชา/สีย้อม/หินได้ของจริง หักเศษถูก · ของชิ้นเดียวขึ้น «มีแล้ว» แลกซ้ำไม่ได้', okS, s)
        # ③ คอกสัตว์ + เซฟ
        m = await A.ev("""()=>{me.mts=me.mts.filter(i=>i!==NMMT);if(me.mt===NMMT)me.mt=me.mts[0]||0;mountUI('',true);const b=[...ov.querySelectorAll('.sr')].find(r=>r.textContent.includes('อาชาฝันร้าย'));const bt=b&&b.querySelector('button');const txt=bt&&[bt.textContent,bt.disabled];
          me.mts=me.mts.filter(i=>i!==NMMT);const g0=me.gold;mountBuy(NMMT);const no=!me.mts.includes(NMMT)&&me.gold===g0;me.mts.push(NMMT);me.mt=NMMT;
          me.wdr.s.f='ngm';me.pet=NMPT;me.ngm.r={n260101:1};const keep=JSON.stringify([me.ngm.c,me.ngm.r,me.ngm.rt]);const c=cleanChar(JSON.parse(JSON.stringify(snap())));applySave(c);
          return {txt,no,keep:JSON.stringify([me.ngm.c,me.ngm.r,me.ngm.rt])===keep,mt:me.mt,mts:me.mts.includes(NMMT),pet:me.pet,set:!!wdrSt().o.ngm,aura:wdrSt().s.f}}""")
        rep('คอกสัตว์: อาชาฝันร้ายซื้อด้วยทองไม่ได้ (ปุ่ม 🌙 ร้านฝันร้าย) · เซฟ/โหลด: เศษ รางวัลที่รับแล้ว พาหนะ 10 สัตว์เลี้ยง 15 ชุด+ออร่าอยู่ครบ', m['txt'] and 'ร้านฝันร้าย' in m['txt'][0] and m['txt'][1] and m['no'] and m['keep'] and m['mt'] == 10 and m['mts'] and m['pet'] == 15 and m['set'] and m['aura'] == 'ngm', m)
        # ④ อันดับสัปดาห์ก่อน (ส่งคะแนนเข้าตารางสัปดาห์ก่อนตรง ๆ แล้วอ่านกลับ)
        w = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const pk=nmWkOf(Date.now()-7*864e5);emitM('lbs',{k:pk,t:9,n:myName,cls:me.cls,lv:me.lv,pc:1});await w(1200);lbFetch(true);await w(2500);
          me.ngm.r={};const c0=me.ngm.c;nmWeekClaim();const c1=me.ngm.c;nmWeekClaim();const c2=me.ngm.c;return {pk,rows:(lbData[pk]||[]).length,got:c1-c0,again:c2-c1,mark:!!me.ngm.r[pk]}}""")
        rep('รางวัลอันดับ 1 ฝันร้ายสัปดาห์ที่แล้ว +80 เศษ (อ่านจากกระดานเซิร์ฟเวอร์) · รับครั้งเดียว', w['rows'] >= 1 and w['got'] == 80 and w['again'] == 0 and w['mark'], w)
        # ⑤ คนอื่นเห็นพาหนะ/สัตว์เลี้ยงใหม่
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX+200,y:CY+200})}"); await B.ev("()=>{ov.hidden=true;enterMap(1,{x:CX+220,y:CY+200})}"); await A.wait(1500)
        await A.ev("()=>{if(!me.riding)mountToggle()}"); await A.wait(2500)
        o = await B.ev(f"()=>{{const o=Object.values(others).find(q=>q.n===({json.dumps(A.name)}));return o?{{mt:o.mt,pt:o.pt,rd:o.rd,ride:o.riding}}:null}}")
        rep('ผู้เล่นอื่นในห้องเห็นอาชาฝันร้าย (10) และบากุ (15) · เซิร์ฟเวอร์ไม่ตัดเลขพาหนะ', bool(o) and o['mt'] == 10 and o['pt'] == 15, o)
        E = [e for e in A.errs + B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
