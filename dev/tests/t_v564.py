"""v564 โหมดฝันร้าย
   ① ปลดตามเนื้อเรื่อง · ทางเข้าในแท็บสัปดาห์ · หน้า 19 ดัน · เลือกระดับไม่เกินที่ปลด · ปาร์ตี้เริ่มไม่ได้
   ② ในดัน: ศัตรูทนขึ้น (ตีเข้าน้อยลง ÷hpf) · โดนตีแรงขึ้น (×dmf) · คำสาป เวลาบีบ/แผลลึก/เงาตามติด ทำงาน
   ③ ผ่าน: บันทึกระดับ (ถาวร + สัปดาห์) · รางวัลครั้งแรก/ผ่านซ้ำ · คะแนนสัปดาห์ส่งกระดานอันดับเซิร์ฟเวอร์ (nYYMMDD) และอ่านกลับได้
   ④ มีคนอื่นในห้อง = ไม่นับ · เซฟ/โหลด me.ngm (ชื่อ me.nm ไม่เปลี่ยน) · ฉายา 4 อัน · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
LEAVE = "()=>{try{if(isDg())dgLeave()}catch(e){};me.down=0;me.hp=me.mh}"
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Nt' + str(random.randint(100, 999)), 'archer', 99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;ov.hidden=true;gmGod=false;me.gold=1e7}")
        # ① ปลด / หน้า
        u = await A.ev("""()=>{const s0=me.sty.s;me.sty.s=0;const lock=NMD.filter(nmOpen).length;me.sty.s=STY.findIndex(s=>s.g==='gdl')+1;const mid=NMD.filter(nmOpen).map(e=>e[0]);me.sty.s=STY.length;const all=NMD.filter(nmOpen).length;
          me.ngm=null;nmEnsure();evTab='wk';eventUI();const ent=!!ov.querySelector('[data-nmopen]');ov.querySelector('[data-nmopen]').click();const rows=ov.querySelectorAll('.nmr').length,k=ov.dataset.k;
          const plus=ov.querySelector('[data-nmd="gdl"][data-v="1"]');const dis=plus&&plus.disabled;me.ngm.b.gdl=3;nmUI();for(let i=0;i<9;i++)ov.querySelector('[data-nmd="gdl"][data-v="1"]').click();const sel=NMSEL.gdl;
          const name=me.nm;return {lock,mid,all,ent,rows,k,dis,sel,name}}""")
        rep('ปลดตามเนื้อเรื่อง (ยังไม่ผ่าน = ล็อกหมด · ผ่านถึงเรือดำ = เปิดถึงเรือดำ · จบเรื่อง = 19 ดัน) · ทางเข้าแท็บสัปดาห์ · หน้า 19 ดัน · เลือกระดับได้ไม่เกินที่ปลด',
            u['lock'] == 0 and u['mid'][-1] == 'gdl' and u['all'] == 19 and u['ent'] and u['rows'] == 19 and u['k'] == 'nm' and u['dis'] and u['sel'] == 4, u)
        pt = await A.ev("()=>{const o=window.PTY;window.PTY=PTY={mem:[{},{}],lead:uid};const w=nmWhy(NMD.find(e=>e[0]==='gdl'),1);window.PTY=PTY=o;return w}")
        rep('อยู่ในปาร์ตี้ → เริ่มฝันร้ายไม่ได้ (เล่นเดี่ยว)', 'เดี่ยว' in pt, pt)
        # ② ในดัน (ฐานฟ้า ระดับ 2)
        await A.ev("()=>{ov.hidden=true;enterMap(45,{x:1600,y:1300})}"); await A.wait(800)
        await A.ev("()=>{nmArm('pfn',2);NFC.mods=['rush','heal','shade'];pfnEnter()}"); await A.wait(2500)
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        f = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const on=nfOn(),c=[NFC.L,+NFC.hpf.toFixed(3),+NFC.dmf.toFixed(3)];
          dg={ph:'boss',w:0,tl:1000,nx:0};mons=[];spawnBoss();const B=mons.find(m=>m.t===3);B.stun=99;B.inv=0;
          const h0=B.hp;addHit(B,100000,0,0,'archer');const d1=h0-B.hp;NFC.void=1;const h1=B.hp;addHit(B,100000,0,0,'archer');const d0=h1-B.hp;NFC.void=0;
          me.inv3=0;me.hp=me.mh;let a=me.hp;hurt(2000);const t1=a-me.hp;NFC.void=1;me.hp=me.mh;a=me.hp;hurt(2000);const t0=a-me.hp;NFC.void=0;
          await w(300);const tl=dg.tl;
          me.hp=me.mh*.3;me.pcd=0;me.inv.hp=5;let hp0=me.hp;usePot('hp');const pot=Math.round(me.hp-hp0);NFC.void=1;me.hp=me.mh*.3;me.pcd=0;hp0=me.hp;usePot('hp');const pot0=Math.round(me.hp-hp0);NFC.void=0;
          me.hp=me.mh;me.inv3=0;try{VZ3.bi[curMap+':b:'+MAPS[curMap].boss.n]=1}catch(e){}me.shv=0;NFC.st=.05;await w(150);me.inv3=0;const hp1=me.hp;await w(1700);const sh=Math.round(hp1-me.hp);
          return {on,c,d1:Math.round(d1),d0:Math.round(d0),t1:Math.round(t1),t0:Math.round(t0),tl:Math.round(tl),pot,pot0,sh,badge:(document.getElementById('nmbadge')||{}).textContent}}""")
        okf = f['on'] and abs(f['d1'] * f['c'][1] - f['d0']) < f['d0'] * .05 and abs(f['t1'] / max(1, f['t0']) - f['c'][2]) < .15 and f['tl'] <= 760 and abs(f['pot'] * 2 - f['pot0']) <= 2 and f['sh'] > 0 and 'ฝันร้าย 2' in (f['badge'] or '')
        rep('ในดันฝันร้าย: ตีเข้า ÷hpf · โดนตี ×dmf · เวลาบีบ 75% · ยาฟื้นครึ่งเดียว · เงาตามติดระเบิดใต้เท้า · ป้ายระดับ', okf, f)
        # ③ ผ่าน + รางวัล + กระดานอันดับ
        r = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));
          try{gmUsed=false}catch(e){}me.ngm={b:{},w:{k:nmWk(),b:{}},f:{},n:0};const g0=me.gold,s0=me.inv.s3|0;NFC.done=0;dgReward();await w(300);const g1=me.gold-g0,s1=(me.inv.s3|0)-s0;
          const st1=JSON.parse(JSON.stringify(me.ngm));return {g1,s1,exp:nmRewG(2,1),st1,score:nmScore()}}""")
        rep('ผ่านฝันร้าย → บันทึกระดับถาวร/สัปดาห์ · รางวัลครั้งแรก (ทอง + หินขั้นสูง ×ระดับ) · ส่งคะแนนสัปดาห์', r['st1']['b'].get('pfn') == 2 and r['st1']['w']['b'].get('pfn') == 2 and 'pfn:2' in r['st1']['f'] and r['g1'] >= r['exp'] and r['s1'] >= 2 and r['score'] == 2, r)
        await A.wait(1500)
        lb = await A.ev("()=>new Promise(res=>{lbFetch(true);setTimeout(()=>res((lbData&&lbData[nmWk()])||null),2500)})")
        rep('กระดานอันดับฝันร้ายสัปดาห์บนเซิร์ฟเวอร์ (nYYMMDD) รับคะแนนและอ่านกลับได้', bool(lb) and any(row[3] == 2 for row in lb), lb)
        # ④ ห้องมีคนอื่น = ไม่นับ
        await A.ev(LEAVE); await A.wait(1200); await A.ev("()=>{enterMap(45,{x:1600,y:1300})}"); await A.wait(600)
        v = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));nmArm('gdl',1);gdlEnter();await w(2200);const pc0=plCount;window.plCount=plCount=()=>2;await w(400);const vo=NFC&&NFC.void;window.plCount=plCount=pc0;
          const b0=JSON.stringify(me.ngm.b);NFC.done=0;dgReward();await w(300);return {vo,same:JSON.stringify(me.ngm.b)===b0}}""")
        rep('มีผู้เล่นอื่นเข้าห้อง → ฝันร้ายรอบนั้นไม่นับ (เล่นแบบปกติ)', v['vo'] == 1 and v['same'], v)
        await A.ev(LEAVE); await A.wait(1000)
        sv = await A.ev("""()=>{const nm0=me.nm;const s=snap();const c=cleanChar(JSON.parse(JSON.stringify(s)));const pk=o=>JSON.stringify([o.b,o.w,o.f,o.n]);const keep=pk(me.ngm);me.ngm=null;applySave(c);
          const ach=['nm1','nm2','nm3','nm4'].every(k=>ACH.some(a=>a[0]===k)&&TTB[k]);return {ok:pk(me.ngm)===keep,has:!!s.ngm,name:me.nm===nm0&&typeof me.nm!=='object',ach}}""")
        rep('เซฟ/โหลดความคืบหน้าฝันร้าย (me.ngm) · ชื่อตัวละคร me.nm ไม่เปลี่ยน · ฉายาใหม่ 4 อัน', sv['ok'] and sv['has'] and sv['name'] and sv['ach'], sv)
        E = [e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
