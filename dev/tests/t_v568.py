"""v568 ปิดโหมดคลั่งชั่วคราว
   ① เติมเกจตรง ๆ / ฆ่ามอนรัว ๆ / หลบ → เกจไม่ขึ้น ไม่เข้าโหมดคลั่ง · เกจบนจอซ่อน · ค่าพลังไม่ได้โบนัสคลั่ง
   ② ป้าย «สังหาร ×N» ยังขึ้น · ③ ไม่มี error"""
import asyncio, sys, random
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
        A = await new_client(b, 'Fv' + str(random.randint(100, 999)), 'melee', 99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;ov.hidden=true;enterMap(2,{x:900,y:900})}"); await A.wait(3000)
        r = await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const as0=M('as'),dm0=M('dm');
          fvAdd(500);for(let i=0;i<12;i++)fvKill(me.x,me.y,i%3,0);await w(800);
          const call=($('fvcall')||{}).textContent||'';const e=$('fvg');
          return {g:FV.g,on:FV.on,hid:!e||e.hidden,as:M('as')===as0,dm:M('dm')===dm0,call,dis:FVDIS}}""")
        rep('โหมดคลั่งปิด: เติมเกจ 500 + ฆ่า 12 ตัวรวด → เกจ 0 · ไม่เข้าโหมด · เกจบนจอซ่อน · ค่าพลังไม่เปลี่ยน', r['g'] == 0 and r['on'] == 0 and r['hid'] and r['as'] and r['dm'], r)
        rep('ป้าย «สังหาร ×N» ยังขึ้นตามเดิม', 'สังหาร' in r['call'], r['call'])
        E = [e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
