"""v596 นครรากลึก HD: ไฟล์ · ของ 7 ชนิดวาดจากภาพใหม่ · พื้นใหม่ · ปิด HD → เดิม · แมพ 45 ใช้เฉพาะเห็ด/โคม · ภาพก่อน/หลัง"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
KS = ['pbhut', 'pbthrone', 'pbstall', 'pbwell', 'pblamp', 'pbmush', 'pbstag']
CNT = """async(k)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const L=trees.filter(t=>t.k===k&&!t.inv);if(!L.length)return -1;const t=L[Math.floor(L.length/2)];me.x=t.x+40;me.y=t.y+130;ov.hidden=true;banner=null;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im&&Object.values(RTA.c).some(s=>s.c===im))n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<12)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return +(n/fr).toFixed(2)}"""
SP = {'hall': "[1600,1620]", 'well': "[1600,1900]", 'huts': "[1620,2000]", 'path': "[1360,1000]", 'edge': "[600,1500]"}
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-root.webp') as r:
            rep('hd-root.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Rt' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;window.__n=0;const o=rtgPaint;window.rtgPaint=rtgPaint=function(){__n++;return o.apply(this,arguments)};enterMap(44,{x:1600,y:1700})}"); await pg.wait_for_timeout(5500)
            res = {}
            for k in KS:
                res[k] = await pg.evaluate(CNT, k)
            rep('ของ 7 ชนิดวาดจากภาพใหม่', all(v >= 1 for v in res.values()), res)
            n = await pg.evaluate("()=>__n"); rep('พื้นใหม่ทำงาน', n > 0, n)
            for mode in ['after', 'before']:
                if mode == 'before': await pg.evaluate("()=>{RTA.off=1;RTG.off=1;PALC.m.clear()}")
                for k, P in SP.items():
                    await pg.evaluate("(P)=>{me.x=P[0];me.y=P[1];ov.hidden=true;banner=null}", await pg.evaluate("()=>" + P)); await pg.wait_for_timeout(1100)
                    await pg.screenshot(path=f'np/v596_{k}_{mode}.jpg', type='jpeg', quality=84)
            o = await pg.evaluate("()=>{RTA.off=0;RTG.off=0;HDI.on=false;const a=rtaOn('pbhut');HDI.on=true;return [a,rtaOn('pbhut')]}"); rep('ปิด HD → เดิม', o == [False, True], o)
            await pg.evaluate("()=>{enterMap(45,{x:1600,y:1600})}"); await pg.wait_for_timeout(3000)
            o = await pg.evaluate("()=>[rtaOn('pbmush'),rtaOn('pbhut'),rtgOn()]"); rep('แมพ 45: เห็ด/โคมใหม่ · บ้าน/พื้นไม่ยุ่ง', o == [True, False, False], o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
