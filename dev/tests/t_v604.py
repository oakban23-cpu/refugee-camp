"""v604 พื้นรอบของภาพ ChatGPT 8 แมพ: ทำงานทุกแมพ · ไม่ช้า · ปิด HD → ไม่วาด · ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:500], flush=True)
SPOT = {36: 'obpine', 27: 'cand', 30: 'btent', 32: 'abook', 33: 'hgear', 34: 'sfmet', 43: 'paoak', 39: 'sgmast'}
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Gg' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.__n=0;const o=gpgPaint;window.gpgPaint=gpgPaint=function(){__n++;return o.apply(this,arguments)}}")
            for mp, k in SPOT.items():
                await pg.evaluate(f"()=>{{window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;GPG.off=0;__n=0;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(3800)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                for mode in ['after', 'before']:
                    await pg.evaluate("(v)=>{GPG.off=v;PALC.m.clear()}", 1 if mode == 'before' else 0)
                    await pg.evaluate("(k)=>{const L=trees.filter(t=>t.k===k);const t=L[Math.floor(L.length/2)];if(t){me.x=t.x+30;me.y=t.y+110}ov.hidden=true;banner=null;try{mons.length=0}catch(e){}}", k); await pg.wait_for_timeout(1100)
                    await pg.screenshot(path=f'np/v604_{mp}_{mode}.jpg', type='jpeg', quality=80)
                n = await pg.evaluate("()=>__n"); rep(f'แมพ {mp}: วาดพื้นใหม่', n > 0, n)
            await pg.evaluate("()=>{GPG.off=0}")
            t = await pg.evaluate("()=>{PALC.m.clear();const t0=performance.now();for(let i=0;i<6;i++)palChunk(3+i%3,3+(i/3|0),1);return performance.now()-t0}"); rep('วาดแผ่นพื้นไม่ช้า (6 แผ่น)', t < 700, round(t))
            o = await pg.evaluate("()=>{HDI.on=false;const a=gpgOn();HDI.on=true;return a}"); rep('ปิด HD → ไม่วาด', not o, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
