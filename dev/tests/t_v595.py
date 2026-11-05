"""v595 พื้น/กำแพงย่านวงแหวนล่าง: ใช้ mktPaintHD เมื่อเปิด HD · ปิด → เดิม · ภาพก่อน/หลัง 4 จุด · ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:500], flush=True)
SP = {'plaza': "[MKC.x+80,MKC.y+560]", 'wall': "[MKC.x+Math.cos(.4)*(MKR-120),MKC.y+Math.sin(.4)*(MKR-120)]", 'gap': "[MKC.x+Math.cos(1.1)*(MKR-100),MKC.y+Math.sin(1.1)*(MKR-100)]", 'fount': "[MKC.x+200,MKC.y+300]", 'gate': "[1600,560]"}
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Mw' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;window.__n=0;const o=mktPaintHD;window.mktPaintHD=mktPaintHD=function(){__n++;return o.apply(this,arguments)};enterMap(31,{x:MKC.x,y:MKC.y+300})}"); await pg.wait_for_timeout(5000)
            n = await pg.evaluate("()=>__n"); rep('ใช้พื้นใหม่', n > 0, n)
            for mode in ['after', 'before']:
                if mode == 'before': await pg.evaluate("()=>{MKW.off=1;PALC.m.clear()}")
                for k, P in SP.items():
                    await pg.evaluate("(P)=>{me.x=P[0];me.y=P[1];ov.hidden=true;banner=null}", await pg.evaluate("()=>" + P)); await pg.wait_for_timeout(1000)
                    await pg.screenshot(path=f'np/v595_{k}_{mode}.jpg', type='jpeg', quality=84)
            o = await pg.evaluate("()=>{MKW.off=0;HDI.on=false;const a=mkwOn();HDI.on=true;return [a,mkwOn()]}"); rep('ปิด HD → เดิม', o == [False, True], o)
            t = await pg.evaluate("()=>{const t=performance.now();for(let i=0;i<6;i++)palChunk(4+i%3,4+(i/3|0),1);return performance.now()-t}"); rep('วาดแผ่นพื้นไม่ช้า (6 แผ่น)', t < 600, round(t))
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
