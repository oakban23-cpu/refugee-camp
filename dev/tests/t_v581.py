"""v581 (หลัง v582: ทดสอบด้วย GATE.off=1 = ซุ้มเดิม) ซุ้มประตูค่ายเหนือ/ใต้กลับเป็นแบบเดิม (ไม่วาดจาก C2.img) · อาคารอื่นยังใช้ภาพใหม่"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
CNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P.x;me.y=P.y;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage,ofr=C.fillRect;let n=0,f=0;C.drawImage=function(im,sx,sy){if(im===C2.img&&sx===0&&sy===0&&arguments.length>5)n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<15)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return {gateSpr:n}}"""
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gt' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;try{GATE.off=1}catch(e){}enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(4500)
            st = await pg.evaluate("()=>({c2:c2On(),gate:C2.gate})")
            rep('ภาพอาคารค่ายยังเปิดอยู่ · ซุ้มประตูปิด', st["c2"], st)
            a = await pg.evaluate(CNT, await pg.evaluate("()=>({x:CX,y:CY-CAMP.R-120})"))
            await pg.screenshot(path='np/v581_gateN.jpg', type='jpeg', quality=80)
            c = await pg.evaluate(CNT, await pg.evaluate("()=>({x:CX,y:CY+CAMP.R-60})"))
            rep('ซุ้มประตูเหนือ/ใต้ไม่วาดจากภาพใหม่', a['gateSpr'] == 0 and c['gateSpr'] == 0, [a, c])
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
