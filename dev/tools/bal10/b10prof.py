"""แสดงค่าสเตตัสของโปรไฟล์ทดสอบสมดุล (5 อาชีพ × L/M/H) + ทดสอบเร่งเวลา"""
import asyncio, sys, json, time
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from b10lib import *
CLS = ['melee', 'archer', 'mage', 'assn', 'sup']
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            for c in CLS:
                A = await new_client(b, 'Bp'+c[:3], c, 99)
                for pn in ('L', 'M', 'H'):
                    r = await A.ev(PROF_JS, [prof(pn, c)])
                    print(pn, json.dumps(r, ensure_ascii=False), flush=True)
            # time scale test
            await A.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;enterMap(45,{x:1600,y:1300})}"); await A.wait(2000)
            for K in (1, 2, 3, 4):
                await A.ev(TSCALE_JS, [K])
                t0 = time.time(); g0 = await A.ev("()=>[performance.now(),window.__fps||0]")
                fr0 = await A.ev("()=>{window.__fc=0;const f=()=>{window.__fc++;requestAnimationFrame(f)};requestAnimationFrame(f);return 1}")
                await A.wait(int(4000))
                g1 = await A.ev("()=>[performance.now(),window.__fc]")
                dt = time.time() - t0
                print('K', K, 'game/real', round((g1[0] - g0[0]) / 1000 / dt, 2), 'fps', round(g1[1] / dt, 1), flush=True)
                await A.ev("()=>{window.__fc=-1e9}")
            print('errs', A.errs[:3])
    finally:
        p.terminate()
asyncio.run(main())
