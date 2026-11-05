"""v594 ย่านวงแหวนล่าง HD: ไฟล์ · ของ 6 ชนิดวาดจากภาพใหม่ · ปิด HD → เดิม · แผงถูกเผายังเป็นเดิม · ภาพก่อน/หลัง"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
KS = ['mhouse', 'mruin', 'mrub', 'mtow', 'mstall', 'bcrate']
CNT = """async(k)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const L=trees.filter(t=>t.k===k&&!t.inv);if(!L.length)return -1;const t=L[Math.floor(L.length/2)];me.x=t.x+40;me.y=t.y+120;ov.hidden=true;banner=null;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im&&im.width&&Object.values(MKA.c).some(s=>s.c===im))n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<12)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return +(n/fr).toFixed(2)}"""
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-market.webp') as r:
            rep('hd-market.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Mk' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;try{AMB.off=1}catch(e){}enterMap(31,{x:MKC.x,y:MKC.y+300})}"); await pg.wait_for_timeout(5000)
            res = {}
            for k in KS:
                res[k] = await pg.evaluate(CNT, k)
                await pg.screenshot(path=f'np/v594_{k}_after.jpg', type='jpeg', quality=80)
            rep('ของ 6 ชนิดวาดจากภาพใหม่', all(v >= 1 for v in res.values()), res)
            await pg.evaluate("()=>{me.x=MKC.x+80;me.y=MKC.y+560}"); await pg.wait_for_timeout(800)
            await pg.screenshot(path='np/v594_wide_after.jpg', type='jpeg', quality=82)
            g = await pg.evaluate("()=>{const t=trees.filter(t=>t.k==='mstall')[2];me.x=t.x+30;me.y=t.y+60;return 1}"); await pg.wait_for_timeout(900)
            await pg.screenshot(path='np/v594_ground_after.jpg', type='jpeg', quality=84)
            await pg.evaluate("()=>{const t=trees.filter(t=>t.k==='mruin')[1];me.x=t.x+30;me.y=t.y+60}"); await pg.wait_for_timeout(900)
            await pg.screenshot(path='np/v594_ruin_after.jpg', type='jpeg', quality=84)
            await pg.evaluate("()=>{MKD2.off=1;PALC.m.clear();const t=trees.filter(t=>t.k==='mstall')[2];me.x=t.x+30;me.y=t.y+60}"); await pg.wait_for_timeout(900)
            await pg.screenshot(path='np/v594_ground_before.jpg', type='jpeg', quality=84)
            await pg.evaluate("()=>{MKD2.off=0;PALC.m.clear();me.x=MKC.x+80;me.y=MKC.y+560}"); await pg.wait_for_timeout(900)
            await pg.evaluate("()=>{MKA.off=1;MKD2.off=1;PALC.m.clear()}"); await pg.wait_for_timeout(500)
            await pg.screenshot(path='np/v594_wide_before.jpg', type='jpeg', quality=82)
            o = await pg.evaluate("()=>{MKA.off=0;HDI.on=false;const a=mkaOn();HDI.on=true;const b=mkaOn();return [a,b]}")
            rep('ปิด HD → แบบเดิม / เปิด → ใหม่', o == [False, True], o)
            o = await pg.evaluate("()=>{const L=trees.filter(t=>t.k==='mstall'&&t.si%3===0);if(!L.length)return 'none';me.sty=me.sty||{};const _s=me.sty.s;me.sty.s=p6I('p6sab');const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(){n++;return od.apply(this,arguments)};PALK.mstall(L[0],1);C.drawImage=od;me.sty.s=_s;return n}")
            rep('แผงถูกเผายังวาดแบบเดิม', o == 0 or o == 'none', o)
            await pg.evaluate("()=>{enterMap(1,{x:1600,y:1700})}"); await pg.wait_for_timeout(2500)
            o = await pg.evaluate("()=>mkaOn()")
            rep('แมพอื่นไม่ใช้', o is False, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
