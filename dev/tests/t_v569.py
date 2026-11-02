"""v569 ตัววัดละเอียด + ความละเอียดปรับเอง
   ① หน้าวัดความลื่นมีปุ่ม 🔬 · วัด 3 วิด้วย JS Self-Profiling (เซิร์ฟเวอร์เปิด Document-Policy) → ผลมีฟังก์ชันสูงสุด · ข้อความที่คัดลอกมีบรรทัด 🔬
   ② ผลแยกแมพมี คำนวณ/ปุ่ม/อื่น
   ③ กราฟิกสูง (จอ ×3): เฟรมช้า 2 รอบ → ลดความละเอียด 0.25 · ลื่น 4 รอบ → เพิ่มคืน · ไม่ต่ำกว่า ×2 · เปลี่ยนโหมดแล้วรีเซ็ต
   ④ อัตโนมัติบนเครื่องไม่ใช่สเปกต่ำ: ต่ำกว่า 30 FPS 3 รอบ → ประหยัด · ⑤ ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
async def main():
    p = start_server()
    try:
      hd = dict(urllib.request.urlopen(URL).headers)
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 864}, device_scale_factor=3, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['archer', 'Pv' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;ov.hidden=true;enterMap(2,{x:900,y:900})}"); await pg.wait_for_timeout(4000)
        u = await pg.evaluate("()=>{perfUI();return {btn:!!ov.querySelector('[data-pf=\"prof\"]'),prof:typeof Profiler==='function'}}")
        await pg.evaluate("()=>{pfProfile(3)}"); await pg.wait_for_timeout(5000)
        r = await pg.evaluate("()=>({p:PFX.prof,t:pfText()})")
        P = r['p'] or {}
        rep('ปุ่ม 🔬 · เซิร์ฟเวอร์เปิด js-profiling · วัด 3 วิได้ผลฟังก์ชันสูงสุด · ข้อความคัดลอกมีบรรทัด 🔬', u['btn'] and u['prof'] and hd.get('Document-Policy') == 'js-profiling' and P.get('n', 0) > 50 and len(P.get('self', [])) >= 5 and '🔬 วัดละเอียด' in r['t'], {'hdr': hd.get('Document-Policy'), 'n': P.get('n'), 'js': P.get('js'), 'self': P.get('self', [])[:5]})
        rep('ผลแยกแมพมีเวลา คำนวณ/ปุ่ม/อื่น', 'คำนวณ' in r['t'] and 'ปุ่ม' in r['t'] and ' อื่น ' in r['t'], [l for l in r['t'].split('\n') if l.startswith('- ')][:3])
        q = await pg.evaluate("""()=>{ov.hidden=true;setGQ('high');const d0=DPR,o=[d0];pfResTick(40);o.push(DPR);pfResTick(40);o.push(DPR);for(let i=0;i<12;i++)pfResTick(40);o.push(DPR);
          for(let i=0;i<4;i++)pfResTick(15);o.push(DPR);setGQ('high');o.push(DPR);return {o,DPR0,cv:cv.width}}""")
        o = q['o']
        rep('กราฟิกสูง: ช้า 2 รอบลด 0.25 · ไม่ต่ำกว่า ×2 · ลื่น 4 รอบเพิ่มคืน · ตั้งโหมดใหม่รีเซ็ต', o[0] == q['DPR0'] and o[1] == o[0] and o[2] == o[0] - .25 and o[3] == 2 and o[4] == 2.25 and o[5] == q['DPR0'], q)
        a = await pg.evaluate("()=>{setGQ('auto');const l0=LOWQ;pfResTick(40);pfResTick(40);const l1=LOWQ;pfResTick(40);return {l0,l1,l2:LOWQ,lite:LITEQ,dpr:DPR}}")
        rep('อัตโนมัติ (เครื่องไม่ใช่สเปกต่ำ): ต่ำกว่า 30 FPS 3 รอบ → ประหยัด', a['lite'] or (not a['l0'] and not a['l1'] and a['l2']), a)
        await pg.evaluate("()=>{setGQ('auto')}")
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
