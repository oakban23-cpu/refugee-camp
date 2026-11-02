"""v575 การ์ดเควสกางค้าง
   ① สู้อยู่ (มอนใกล้) แตะการ์ดที่ย่อ → กางค้าง ≥ 10 วิ (เดิม: ย่อกลับทันที)  ② รีโหลดแล้วยังกาง
   ③ กด ‹ → กลับเป็นแบบย่ออัตโนมัติ  ④ ภาพ  ⑤ ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
FIGHT = "()=>{ov.hidden=true;gmGod=true;AUTO.on=false;const m=mons.find(m=>m.t<3&&m.hp>0);if(m){me.x=m.x+120;me.y=m.y;m.x=me.x-150}return vz3Fight()}"
ST = "()=>{const T=$('topb'),q=$('stq'),r=q.getBoundingClientRect();return {vzmin:T.classList.contains('vzmin'),pin:HPIN.on,min:q.classList.contains('min'),h:Math.round(r.height),x:r.left+r.width/2,y:r.top+r.height/2,near:vz3Fight().fight}}"
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1280, 'height': 600})
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        nm = 'Hp' + str(random.randint(100, 999))
        await pg.evaluate(SETUP, ['mage', nm, 60]); await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{localStorage.setItem('refugee_stqmin','0');localStorage.setItem('refugee_hudpin','0');HPIN.on=0;enterMap(2,{x:MAPS[2].sx||1600,y:MAPS[2].sy||1600})}"); await pg.wait_for_timeout(8000)
        await pg.evaluate(FIGHT); await pg.wait_for_timeout(800)
        s0 = await pg.evaluate(ST)
        # จำลองแบบเดิม (ไม่ค้าง): ปิด HPIN ชั่วคราว ด้วยการเรียก handler v468 ตรง
        await pg.mouse.click(s0['x'], s0['y']); await pg.wait_for_timeout(300)
        s1 = await pg.evaluate(ST)
        await pg.evaluate(FIGHT)
        L = []
        for _ in range(5):
            await pg.wait_for_timeout(2000); await pg.evaluate(FIGHT); L.append(await pg.evaluate(ST))
        rep('สู้อยู่ แตะการ์ดที่ย่อ → กางค้าง 10 วิ ไม่ย่อเอง', s0['vzmin'] and s0['near'] and not s1['vzmin'] and s1['pin'] and all(not x['vzmin'] for x in L) and L[-1]['h'] > s0['h'] + 10, {'before': s0, 'after': s1, 'during': [[x['vzmin'], x['near'], x['h']] for x in L]})
        await pg.screenshot(path='np/v575_open.jpg', type='jpeg', quality=70)
        await pg.reload(); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', nm, 60]); await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{enterMap(2,{x:MAPS[2].sx||1600,y:MAPS[2].sy||1600})}"); await pg.wait_for_timeout(8000)
        await pg.evaluate(FIGHT); await pg.wait_for_timeout(1500)
        s2 = await pg.evaluate(ST)
        rep('รีโหลดแล้ว การ์ดยังกางค้างตอนสู้', s2['pin'] and not s2['vzmin'] and s2['near'], s2)
        bx = await pg.evaluate("()=>{const r=document.querySelector('#stq [data-sqx]').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}")
        await pg.mouse.click(bx[0], bx[1]); await pg.wait_for_timeout(600); await pg.evaluate(FIGHT); await pg.wait_for_timeout(600)
        s3 = await pg.evaluate(ST)
        rep('กด ‹ → กลับเป็นแบบย่ออัตโนมัติ (ไม่ค้าง)', not s3['pin'] and s3['vzmin'] and not s3['min'], s3)
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
