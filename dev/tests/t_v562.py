"""v562 กันพุ่งทะลุกำแพงทั้งเกม (เจอจาก net/dashprobe.py)
   ① จุดที่เดิมพุ่งแล้วติดนอกพื้นที่ (แมพเปิด + รังกัดแผ่นดิน): พุ่ง (dash 110) ตรงจุด/มุมเดิม → ยังอยู่ในพื้นที่หลัก · ไม่ทะลุแนวชน
   ② สกิลทางเลือกที่เลื่อนตัว: กระโดดดาบ (mj) · แหวกมิติ (zm) พุ่งเข้ากำแพง → หยุดก่อนชน ไม่ออกนอกพื้นที่
   ③ ที่โล่งยังพุ่งได้เต็มระยะ (110 / 140 / 200) · ไม่มี error"""
import asyncio, sys, random, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
_src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dashprobe.py')).read()
PROBE = _src.split('PROBE = r"""')[1].split('"""')[0]
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:1200], flush=True)
# (ชนิด, แมพ/ฟังก์ชันเข้า, จุดยืน, มุมพุ่ง) — จุดที่ dashprobe เจอว่าติด
CASES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 't_v562_cases.json')))
CHK = r"""async([S,a,how])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.down=0;me.x=S[0];me.y=S[1];await w(250);const S2=[me.x,me.y],m=__dpC(S2[0],S2[1]);
  if(how==='dash')dash(a,110,0);
  else{me.face=a;mons.length=0;const P=1,k=0;try{(how==='mj'?Q8F.mj:Q8F.zm).call(Q8F,k,P,0,'')}catch(e){return {err:String(e)}}}
  await w(900);const c=__dpC(me.x,me.y);return {S:S2.map(Math.round),P:[Math.round(me.x),Math.round(me.y)],mv:Math.round(Math.hypot(me.x-S2[0],me.y-S2[1])),main:m,c,ok:c===m}}"""
async def enter(A, kind, j):
    await A.ev("()=>{try{if(isDg())dgLeave()}catch(e){}me.down=0;me.hp=me.mh}"); await A.wait(800)
    if kind == 'map':
        await A.ev(f"()=>{{const M=MAPS[{j}];enterMap({j},{{x:M.sx,y:M.sy+60}})}}")
    else:
        await A.ev("()=>{enterMap(45,{x:1600,y:1300})}"); await A.wait(800); await A.ev(f"()=>{{{j}()}}")
    await A.wait(2600)
    await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<60){stNext();k++}stClose()}catch(e){}}"); await A.wait(300)
    return await A.ev(PROBE, 1)
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Vw' + str(random.randint(100, 999)), 'melee', 99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;me.gold=1e8;ov.hidden=true;gmGod=true;me.mp=me.mm=1e6}")
        out = {}
        for i, c in enumerate(CASES):
            await enter(A, c['kind'], c['id'])
            r = await A.ev(CHK, [c['S'], c['a'], 'dash']); out[f"{i}:{c['kind']}:{c['id']}"] = r
        rep('จุดที่เดิมพุ่งแล้วติดนอกพื้นที่ (%d จุด): พุ่งแล้วยังอยู่ในพื้นที่หลัก' % len(CASES), all(v.get('ok') for v in out.values()), out)
        # ② สกิลเลื่อนตัวเข้ากำแพง: ใช้จุดแรกของรายการ (แมพเปิด)
        c0 = CASES[0]; await enter(A, c0['kind'], c0['id'])
        lp = {}
        for how in ('mj', 'zm'):
            lp[how] = await A.ev(CHK, [c0['S'], c0['a'], how]); await A.wait(400)
        rep('กระโดดดาบ (mj) / แหวกมิติ (zm) เข้ากำแพง → หยุดก่อนชน ไม่ออกนอกพื้นที่', all(v.get('ok') for v in lp.values()), lp)
        # ③ ที่โล่ง: แมพ 1 กลางทุ่ง
        await enter(A, 'map', 1)
        fr = {}
        for how, L in (('dash', 110), ('mj', 140), ('zm', 200)):
            r = await A.ev(CHK, [[1600, 1500], 0.0, how]); r['L'] = L; fr[how] = r; await A.wait(300)
        rep('ที่โล่งยังพุ่งได้เต็มระยะ (พุ่ง 110 · กระโดดดาบ 140 · แหวกมิติ 200)', all(abs(v.get('mv', 0) - v['L']) <= 8 for v in fr.values()), fr)
        E = [e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
