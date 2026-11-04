"""v593 ลานเต็นท์ส่วนตัว: ดินวาดก่อนคน → ผู้เล่น/ทหารบนลานไม่ถูกทับ · ตรวจด้วยพิกเซลตรงตัวละคร (เทียบกับปิดลาน)"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 800})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['melee', 'Ty' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;AMB.off=1;enterMap(1,{x:TNE.x-90,y:TNE.y+60})}"); await pg.wait_for_timeout(4500)
            d = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=TNE.x-90;me.y=TNE.y+60;ov.hidden=true;banner=null;await w(800);
               const C=CanvasRenderingContext2D.prototype,of=C.ellipse;let order=[],tag='';const _g=tgGround;window.tgGround=tgGround=function(){order.push('ground');return _g.apply(this,arguments)};const _d=drawWBGuards;window.drawWBGuards=drawWBGuards=function(){order.push('guards');return _d.apply(this,arguments)};
               const _t=drawTentGate;window.drawTentGate=drawTentGate=function(){order.push('tents');return _t.apply(this,arguments)};
               await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));window.tgGround=tgGround=_g;window.drawWBGuards=drawWBGuards=_d;window.drawTentGate=drawTentGate=_t;return order.slice(0,3)}""")
            rep('ลานดินวาดก่อนทหารและเต็นท์', d[:3] == ['ground', 'guards', 'tents'], d)
            await pg.screenshot(path='np/v593_after.jpg', type='jpeg', quality=82)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
