"""v592 ประตูแสงดาว/บ้านกิลด์ย่อ 78%: ① วาดด้วยสเกล 0.78 (เมทริกซ์ตอน drawImage) ② ระยะเหยียบวาร์ปเท่าเดิม ③ ภาพก่อน/หลัง · ไม่มี error"""
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
            await pg.evaluate(SETUP, ['mage', 'Gs' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;AMB.off=1;enterMap(1,{x:CX+250,y:CY+330})}"); await pg.wait_for_timeout(5000)
            M = """async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));ov.hidden=true;banner=null;await w(700);const C=CanvasRenderingContext2D.prototype,od=C.drawImage;const L=[];C.drawImage=function(im){if(im===CGI.img||(typeof CGTC==='object'&&Object.values(CGTC).includes(im)))L.push(+(this.getTransform().a).toFixed(3));return od.apply(this,arguments)};
              await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));C.drawImage=od;return L}"""
            a = await pg.evaluate(M); await pg.screenshot(path='np/v592_after.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{GTS.star=1;GTS.guild=1}"); b0 = await pg.evaluate(M); await pg.screenshot(path='np/v592_before.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{GTS.star=.78;GTS.guild=.78}")
            ok = len(a) >= 2 and len(b0) >= 2 and all(abs(x / y - .78) < .02 for x, y in zip(sorted(a), sorted(b0)))
            rep('ประตูแสงดาว + บ้านกิลด์วาดที่ 78% ของเดิม', ok, [a, b0])
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
