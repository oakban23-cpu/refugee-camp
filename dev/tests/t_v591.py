"""v590+v591 ผาท่าเรือเมฆ HD: ① ไฟล์เสิร์ฟได้ ② ของ 8 แบบวาดจากภาพใหม่ (นับ drawImage) ③ ปิด HD/แมพอื่น → แบบเดิม ④ ภาพก่อน/หลัง · ไม่มี error"""
import asyncio, sys, random, urllib.request, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
SP = {'phwreck2': (1900, 2600), 'phlh': (2300, 600), 'phhouse': (1990, 1110), 'phmed': (1860, 1760), 'phanc': (2010, 1600), 'phcrane': (2150, 1170), 'phwreck': (2170, 2650), 'phdep': (1880, 1330), 'phcrate': (1940, 1990)}
CNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P[0]+60;me.y=P[1]+150;ov.hidden=true;banner=null;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im===HBA.img)n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<12)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return +(n/fr).toFixed(2)}"""
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-harbor.webp') as r:
            rep('hd-harbor.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Hv' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;AMB.off=1;enterMap(38,{x:2000,y:1800})}"); await pg.wait_for_timeout(5000)
            res = {}
            for k, P in SP.items():
                res[k] = await pg.evaluate(CNT, list(P))
                await pg.screenshot(path=f'np/v591_{k}_after.jpg', type='jpeg', quality=78)
            rep('ของ 8 แบบวาดจากภาพใหม่', all(v >= 1 for k,v in res.items() if k!='phwreck2'), res)
            await pg.evaluate("()=>{HBA.off=1;HBG.off=1;try{CG.c=null;CGG.it=null}catch(e){};try{PHV.m.clear()}catch(e){}}")
            for k, P in SP.items():
                await pg.evaluate(CNT, list(P)); await pg.screenshot(path=f'np/v591_{k}_before.jpg', type='jpeg', quality=78)
            o = await pg.evaluate("()=>{HBA.off=0;HDI.on=false;const a=hbaOn();HDI.on=true;return a}")
            rep('ปิด HD → แบบเดิม', not o, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
