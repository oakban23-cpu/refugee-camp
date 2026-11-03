"""v582 ซุ้มประตูค่ายใหม่ (hd-gate.webp) · ① ไฟล์เสิร์ฟได้ ② เหนือ/ใต้วาดจากภาพใหม่ ③ ปิด HD → แบบเดิม ④ ภาพจอแนวตั้ง ⑤ ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
CNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P.x;me.y=P.y;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im===GATE.img)n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<15)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return {perFrame:+(n/fr).toFixed(2)}}"""
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-gate.webp') as r:
            rep('hd-gate.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gt' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{document.querySelectorAll('.tnote,#tnote').forEach(e=>e.remove())}")
            n = await pg.evaluate(CNT, await pg.evaluate("()=>({x:CX,y:CY-CAMP.R-110})"))
            await pg.screenshot(path='np/v582_gateN.jpg', type='jpeg', quality=82)
            s = await pg.evaluate(CNT, await pg.evaluate("()=>({x:CX,y:CY+CAMP.R-170})"))
            await pg.screenshot(path='np/v582_gateS.jpg', type='jpeg', quality=82)
            rep('ซุ้มเหนือ/ใต้วาดจากภาพใหม่', n['perFrame'] >= 1 and s['perFrame'] >= 1, [n, s])
            o = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));HDI.on=false;CAMP.cache=null;await w(200);const a=gateOn();HDI.on=true;CAMP.cache=null;return {off:a}}""")
            o2 = await pg.evaluate(CNT.replace('n++', 'n++'), await pg.evaluate("()=>({x:CX,y:CY-CAMP.R-110})"))
            rep('ปิด HD → ไม่ใช้ภาพใหม่', not o['off'], o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
