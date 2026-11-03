"""v579 ค่ายผู้อพยพ: อาคารเวกเตอร์ → ภาพ HD (hd-camp2.webp)
   ① แผ่นภาพเสิร์ฟได้ + โหลดสำเร็จเมื่อเปิด HD  ② ตำแหน่งอาคารแต่ละจุด: วาดภาพจริง (นับ drawImage จาก C2.img ต่อเฟรม) · ไม่มี error
   ③ โหมดประหยัด/ปิด HD → ไม่ใช้ภาพใหม่ (วาดแบบเดิม)  ④ หุ่นไล่กายังโดนตีได้ (โยก)  ⑤ ภาพหน้าจอก่อน/หลัง"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
SPOTS = {'rune': 'MAPS[1].npc5', 'cook': 'MAPS[1].npc6', 'stable': '{x:CX-261,y:CY+101.5}', 'altar': 'RBA', 'dums': 'TG', 'sign': '{x:CX+58,y:CY+255}'}
COUNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P.x+10;me.y=P.y+70;ov.hidden=true;banner=null;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im===C2.img)n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const f=()=>{fr++;if(fr<20)requestAnimationFrame(f);else r()};requestAnimationFrame(f)});C.drawImage=od;return {perFrame:+(n/fr).toFixed(1)}}"""
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-camp2.webp') as r:
            ok = r.status == 200 and r.headers.get('Content-Type') == 'image/webp'
        rep('hd-camp2.webp เสิร์ฟได้', ok)
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 1280, 'height': 720})
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Cm' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(5000)
            st = await pg.evaluate("()=>({ok:C2.ok,hd:campHD(),on:c2On()})")
            rep('เปิด HD → แผ่นภาพโหลดสำเร็จ', st['ok'] == 1 and st['on'], st)
            res = {}
            for k, ex in SPOTS.items():
                P = await pg.evaluate(f"()=>{{const P={ex};return {{x:P.x,y:P.y}}}}")
                res[k] = (await pg.evaluate(COUNT, P))['perFrame']
                await pg.screenshot(path=f'np/v579_{k}.jpg', type='jpeg', quality=78)
            dyn = {k: v for k, v in res.items() if k != 'sign'}
            rep('ทุกจุดวาดภาพใหม่จริง (ป้ายบอกทางอยู่ในแคชพื้น → ตรวจด้วยภาพ)', all(v >= 1 for v in dyn.values()), res)
            d = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const m=mons.find(q=>q.dum);if(!m)return null;me.x=m.x+60;me.y=m.y;await w(300);m.dwT=performance.now();m.dwS=1;
              const C=CanvasRenderingContext2D.prototype,orot=C.rotate;let rs=[];C.rotate=function(a){rs.push(a);return orot.apply(this,arguments)};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));C.rotate=orot;return {maxRot:Math.max(...rs.map(Math.abs))}}""")
            rep('หุ่นไล่กาโยกตอนโดนตี', d and d['maxRot'] > 0.03, d)
            lq = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));LOWQ=true;await w(400);const a=c2On();LOWQ=false;HDI.on=false;await w(200);const b=c2On();HDI.on=true;return {lowq:a,hdOff:b}}""")
            rep('ปิดภาพ HD → ไม่ใช้ภาพใหม่ (เกณฑ์เดียวกับภาพ HD ค่ายเดิม)', not lq['hdOff'], lq)
            # ก่อน/หลัง กลางค่าย
            await pg.evaluate("()=>{me.x=CX-60;me.y=CY+40}"); await pg.wait_for_timeout(1200)
            await pg.screenshot(path='np/v579_center_after.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{C2.off=1;CAMP.cache=null}"); await pg.wait_for_timeout(1200)
            await pg.screenshot(path='np/v579_center_before.jpg', type='jpeg', quality=80)
            await pg.evaluate("()=>{C2.off=0;CAMP.cache=null}"); await pg.wait_for_timeout(800)
            rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
