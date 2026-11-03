"""v583 ค่ายชุดที่ 2 (hd-camp3.webp): ซุ้มข้าง ตอ./ตต. · กระดานค่าหัว · แท่นอันดับ · แท่นไซลัส
   ① ไฟล์เสิร์ฟได้ ② แต่ละจุดวาดจากภาพใหม่ (นับ drawImage · กระดานอยู่ในแคชพื้น → ตรวจด้วยการสร้างแคชใหม่) ③ ปิด HD → แบบเดิม ④ รูปปั้นยืนบนขั้นแท่น ⑤ ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
CNT = """async(P)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=P.x;me.y=P.y;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im===CK3.img)n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<12)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return +(n/fr).toFixed(2)}"""
SP = {'east': '{x:CX+CAMP.R+40,y:CY+60}', 'west': '{x:CX-CAMP.R-40,y:CY+60}', 'podium': '{x:WBS[0].x,y:WBS[0].y+90}', 'altar': '{x:TFN.x,y:TFN.y+80}', 'board': '{x:CX+CAMP.BOARD[0],y:CY+CAMP.BOARD[1]+90}'}
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-camp3.webp') as r:
            rep('hd-camp3.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            ctx = await b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2)
            pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Ct' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;window.DNH=12;AUTO.on=false;gmGod=true;HDI.on=true;LOWQ=false;enterMap(1,{x:CX,y:CY})}"); await pg.wait_for_timeout(4500)
            res = {}
            for k, ex in SP.items():
                P = await pg.evaluate(f"()=>{{const P={ex};return {{x:P.x,y:P.y}}}}")
                res[k] = await pg.evaluate(CNT, P)
                await pg.screenshot(path=f'np/v583_{k}.jpg', type='jpeg', quality=82)
            rep('ซุ้มข้าง/แท่นอันดับ/แท่นไซลัส วาดจากภาพใหม่', all(res[k] >= 1 for k in ('east', 'west', 'podium', 'altar')), res)
            bd = await pg.evaluate("""()=>{const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im===CK3.img)n++;return od.apply(this,arguments)};CAMP.cache=null;try{campBuild()}catch(e){}C.drawImage=od;return n}""")
            rep('กระดานค่าหัวในแคชพื้นค่ายใช้ภาพใหม่', bd >= 1, bd)
            st = await pg.evaluate("()=>{const G=ck3PodGeo();return WBS.map((s,i)=>({h:+(s.y-7.5-G.tops[i]).toFixed(1)}))}")
            rep('รูปปั้นยืนบนขั้นแท่น (ทองสูงสุด)', st[0]['h'] < st[1]['h'] + 30 and all(5 < q['h'] < 40 for q in st), st)
            o = await pg.evaluate("()=>{HDI.on=false;const a=ck3On();HDI.on=true;return a}")
            rep('ปิด HD → แบบเดิม', not o, o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
