"""v573 วาร์ประหว่างโหลดแมพ
   ① เปลี่ยนแมพ → วาร์ปขึ้นทันที (แอนิเมชัน CSS) · เฟรมแรกข้ามการวาด · ปิดเมื่อพร้อม (≤ 2 วิ) · ระหว่างวาร์ปไม่รับดาเมจ
   ② แมพเดิม/ระหว่างบทพูด → ไม่ขึ้นวาร์ป
   ③ จำลองมือถือ (CPU ×4): หลังเปิดจอ 3 วิแรก เฟรมกระตุก (> 250 ms) น้อยกว่าแบบไม่มีวาร์ป · ④ ภาพวาร์ป · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:1200], flush=True)
AFTER = """async([m,off])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));WARP.off=off;gmGod=true;ov.hidden=true;
  const t0=performance.now();enterMap(m,{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600});
  if(!off){while(WARP.on&&performance.now()-t0<4000)await w(30)}const rev=performance.now();const T=[];let l=rev,go=1;const f=t=>{if(!go)return;T.push(t-l);l=t;requestAnimationFrame(f)};requestAnimationFrame(f);
  await w(3000);go=0;WARP.off=0;return {map:m,wait:Math.round(rev-t0),frames:T.length,hitch:T.filter(d=>d>250).length,max:Math.round(Math.max(...T))}}"""
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 384, 'height': 832}, device_scale_factor=2.8125, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', 'Wp' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(2500)
        a = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;ov.hidden=true;let inner=0;const od=draw;
          const t0=performance.now();enterMap(17,{x:MAPS[17].sx||1600,y:MAPS[17].sy||1600});const el=document.getElementById('warpov');const vis0=!!el&&!el.hidden,skip0=WARP.skip;
          const an=el?getComputedStyle(el.querySelector('.wr')).animationName:'';me.inv3=0;await w(120);const hp0=me.hp;hurt(500);const hp1=me.hp;
          while(WARP.on&&performance.now()-t0<5000)await w(30);const dur=Math.round(performance.now()-t0);await w(400);
          return {vis0,skip0,an,noDmg:hp1===hp0,dur,hidden:el.hidden,name:el.querySelector('.wn').textContent,stat:WARP.stat.ms.slice(-1)[0]}}""")
        rep('เปลี่ยนแมพ → วาร์ปขึ้นทันที (CSS หมุน) · ข้ามเฟรมแรก · ไม่รับดาเมจ · ปิดเองภายใน 2 วิ', a['vis0'] and a['skip0'] == 1 and a['an'] == 'wspin' and a['noDmg'] and a['dur'] <= 2400 and a['hidden'] and a['name'] == 'หุบเหวลมหวน', a)
        b2 = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const el=document.getElementById('warpov');enterMap(curMap,{x:me.x+50,y:me.y});const same=WARP.on;
          stSay([['nar','ทดสอบ']],()=>{});const sd=SD.on;enterMap(21,{x:MAPS[21].sx||1600,y:MAPS[21].sy||1600});const cut=WARP.on;try{stClose()}catch(e){}await w(300);return {same,cut,sd}}""")
        rep('ย้ายในแมพเดิม / ระหว่างบทพูด → ไม่ขึ้นวาร์ป', not b2['same'] and b2['sd'] and not b2['cut'], b2)
        # ภาพระหว่างวาร์ป
        await pg.evaluate("()=>{WARP.min=1500;enterMap(24,{x:MAPS[24].sx||1600,y:MAPS[24].sy||1600})}"); await pg.wait_for_timeout(500)
        await pg.screenshot(path='np/v573_warp.jpg', type='jpeg', quality=75)
        await pg.evaluate("()=>{WARP.min=280}"); await pg.wait_for_timeout(2500)
        cdp = await ctx.new_cdp_session(pg); await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})
        res = []
        for m, other in ((2, 4), (15, 20), (21, 1)):
            await pg.evaluate(f"()=>{{WARP.off=1;enterMap({other},{{x:MAPS[{other}].sx||1600,y:MAPS[{other}].sy||1600}})}}"); await pg.wait_for_timeout(3000)
            off = await pg.evaluate(AFTER, [m, 1])
            await pg.evaluate(f"()=>{{WARP.off=1;enterMap({other},{{x:MAPS[{other}].sx||1600,y:MAPS[{other}].sy||1600}})}}"); await pg.wait_for_timeout(3000)
            on = await pg.evaluate(AFTER, [m, 0])
            res.append({'map': m, 'off': off, 'on': on})
        await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 1})
        tot_off = sum(r['off']['hitch'] for r in res); tot_on = sum(r['on']['hitch'] for r in res)
        rep('จำลองมือถือ: 3 วิแรกหลังเห็นจอ เฟรมกระตุก (> 250 ms) น้อยลง', tot_on < tot_off, {'off': tot_off, 'on': tot_on, 'detail': res})
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
