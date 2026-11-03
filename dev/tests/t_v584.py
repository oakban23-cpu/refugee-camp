"""v584 บรรยากาศค่าย: ① กลางวัน → ใบไม้ในจอ ≥15 + ควันกองไฟวาด ② ใบไม้เคลื่อนตามลม (x เพิ่ม) และวนเกิดใหม่ ③ กลางคืน → หิ่งห้อย ≥20 (กลางวัน 0) ใบไม้น้อยลง
   ④ โหมดประหยัด → จำนวนลดลง ⑤ แมพอื่นไม่ทำงาน ⑥ เวลาเฟรมไม่เพิ่มเกิน ⑦ ภาพกลางวัน/กลางคืน · ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
FR = """async(n)=>{let fr=0;const t0=performance.now();await new Promise(r=>{const q=()=>{fr++;if(fr<n)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});return +((performance.now()-t0)/fr).toFixed(1)}"""
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Am' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY});me.x=CX+40;me.y=CY+60}"); await pg.wait_for_timeout(4000)
            d = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let pf=0;C.drawImage=function(im){if(im===AMB.spr.puff)pf++;return od.apply(this,arguments)};await w(500);C.drawImage=od;
              const x0=AMB.lv.map(l=>l.x);await w(1500);const x1=AMB.lv.map(l=>l.x);let mv=0;for(let i=0;i<x0.length;i++)if(x1[i]-x0[i]>3)mv++;return {lv:AMB.lv.length,puffs:pf,moved:mv,ff:AMB.ff.length,wind:+AMB.wind.toFixed(1)}}""")
            rep('กลางวัน: ใบไม้ ≥15 · ควันกองไฟวาด · ไม่มีหิ่งห้อย', d['lv'] >= 15 and d['puffs'] > 5 and d['ff'] == 0, d)
            rep('ใบไม้ปลิวตามลม (ส่วนใหญ่เคลื่อนไปทางขวา)', d['moved'] >= d['lv'] * .5, d)
            await pg.screenshot(path='np/v584_day.jpg', type='jpeg', quality=84)
            ms_on = await pg.evaluate(FR, 40)
            await pg.evaluate("()=>{AMB.off=1}"); ms_off = await pg.evaluate(FR, 40); await pg.evaluate("()=>{AMB.off=0}")
            rep('เวลาเฟรมไม่เพิ่มมาก (headless)', ms_on <= ms_off * 1.35 + 3, {'on': ms_on, 'off': ms_off})
            await pg.evaluate("()=>{window.DNH=22;me.x=CX-CAMP.R-220;me.y=CY-120}"); await pg.wait_for_timeout(2000)
            n = await pg.evaluate("()=>({ff:AMB.ff.length,lv:AMB.lv.length,dk:ambDark()})")
            rep('กลางคืน: หิ่งห้อย ≥20 · ใบไม้น้อยลง', n['ff'] >= 20 and n['lv'] < d['lv'], n)
            await pg.screenshot(path='np/v584_night.jpg', type='jpeg', quality=84)
            await pg.evaluate("()=>{me.x=CX+20;me.y=CY+40}"); await pg.wait_for_timeout(1200)
            await pg.screenshot(path='np/v584_night_camp.jpg', type='jpeg', quality=84)
            q = await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));LOWQ=true;AMB.ff.length=0;await w(800);const r={lv:AMB.lv.length,ff:AMB.ff.length};LOWQ=false;return r}")
            rep('โหมดประหยัด: จำนวนลดลง', q['lv'] <= 7 and q['ff'] <= 10, q)
            o = await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));window.DNH=12;enterMap(2,{x:CX,y:CY});await w(2500);const a=AMB.t0;await w(600);return {same:AMB.t0===a}}")
            rep('แมพอื่นไม่ทำงาน', o['same'], o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
