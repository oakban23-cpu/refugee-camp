"""v585 ประตูแสงดาว/ประตูบ้านกิลด์ใช้ hd-gate.webp เดิม (896×383) · ซุ้มค่ายใช้ hd-campgate.webp (640×408)"""
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
            ctx = await b.new_context(viewport={'width': 1060, 'height': 860})
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gf' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY});me.x=GHG.x-100;me.y=GHG.y-140}"); await pg.wait_for_timeout(5000)
            d = await pg.evaluate("()=>({cg:CGI.img&&[CGI.img.naturalWidth,CGI.img.naturalHeight,CGI.ok],gate:(GATE.img||(gateOn(),GATE.img))&&[GATE.img.naturalWidth,GATE.img.naturalHeight,GATE.ok]})")
            rep('ประตูแสงดาว/บ้านกิลด์ใช้ภาพเดิม 896×383', d['cg'] and d['cg'][:2] == [896, 383] and d['cg'][2] == 1, d)
            rep('ซุ้มประตูค่ายใช้ภาพใหม่ 640×408', d['gate'] and d['gate'][:2] == [640, 408], d)
            await pg.screenshot(path='np/v585_gates.jpg', type='jpeg', quality=85)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
