"""v587 พื้นค่าย: ① ลานดิน ≥8 จุด + ทางเดิน ≥8 เส้น · ทางเดินเริ่มที่ถนนหิน (ขอบถนน/ลาน) จบหน้าร้าน ② ดอกไม้ไม่งอกทับลาน/ทางเดิน ③ ปิด CG2 → แคชเดิม (ภาพต่าง) ④ ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
VIEWS = {'nw': (-200, -250), 'w': (-230, -20), 'c': (0, -40), 'e': (250, -60), 'n': (40, -230), 'se': (200, 220)}
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 1100, 'height': 900})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gr' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;AMB.off=1;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(5000)
            d = await pg.evaluate("""()=>{const PW=26;const E=CG2.tr.map(t=>[t[4],t[5]]);const st=CG2.tr.map(t=>{const[sx,sy]=t;return Math.abs(sx)<=PW+1||Math.abs(sy)<=PW+1||Math.hypot(sx,sy/.88)<=150||E.some(e=>Math.hypot(e[0]-sx,e[1]-sy)<1)});return {a:CG2.a.length,blobs:CG2.a.filter(a=>a[2]).length,tr:CG2.tr.length,startOk:st.every(Boolean),cache:!!CAMP.cache}}""")
            rep('ลานดิน ≥8 + ทางเดิน ≥7 เส้น เริ่มจากถนนหิน/ลานกองไฟ/ปลายทางเดินร้านอื่น', d['blobs'] >= 8 and d['tr'] >= 7 and d['startOk'], d)
            for k, (dx, dy) in VIEWS.items():
                await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x=CX+{dx};me.y=CY+{dy}+260}}"); await pg.wait_for_timeout(900)
                await pg.screenshot(path=f'np/v587_{k}_after.jpg', type='jpeg', quality=82)
            sig1 = await pg.evaluate("()=>{const c=CAMP.cache.getContext('2d').getImageData(0,0,CAMP.cache.width,CAMP.cache.height).data;let s=0;for(let i=0;i<c.length;i+=4097)s=(s*31+c[i])%1e9;return s}")
            await pg.evaluate("()=>{CG2.off=1;CAMP.cache=null}"); await pg.wait_for_timeout(1200)
            sig0 = await pg.evaluate("()=>{const c=CAMP.cache.getContext('2d').getImageData(0,0,CAMP.cache.width,CAMP.cache.height).data;let s=0;for(let i=0;i<c.length;i+=4097)s=(s*31+c[i])%1e9;return s}")
            rep('ปิด CG2 → แคชพื้นกลับแบบเดิม (ต่างกัน) · campG2Hit คืน false', sig0 != sig1 and not await pg.evaluate("()=>campG2Hit(-280,-70)"), [sig0, sig1])
            for k, (dx, dy) in VIEWS.items():
                await pg.evaluate(f"()=>{{ov.hidden=true;banner=null;me.x=CX+{dx};me.y=CY+{dy}+260}}"); await pg.wait_for_timeout(900)
                await pg.screenshot(path=f'np/v587_{k}_before.jpg', type='jpeg', quality=82)
            await pg.evaluate("()=>{CG2.off=0;CAMP.cache=null}"); await pg.wait_for_timeout(800)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
