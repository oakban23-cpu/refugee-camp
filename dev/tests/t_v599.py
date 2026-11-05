"""v599 เหมืองดาวคาร์น HD: ไฟล์ · 11 ชนิดใช้ภาพใหม่ · พื้นใหม่ · ไม่มีภาพซ้อน · 🆘/คนงานที่ช่วยแล้วยังแสดง · ปิด HD → เดิม · ภาพก่อน/หลัง"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
KS = ['ktent','koff','ktun','kcrn','klift','kcart','kore','kpole','kfire','krub','kmesa']
CNT = """async(k)=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const L=trees.filter(t=>t.k===k&&!t.inv);if(!L.length)return -1;const t=L[Math.floor(L.length/2)];me.x=t.x+40;me.y=t.y+150;ov.hidden=true;banner=null;await w(900);
  const C=CanvasRenderingContext2D.prototype,od=C.drawImage;let n=0;C.drawImage=function(im){if(im&&Object.values(KMA.c).some(s=>s.c===im))n++;return od.apply(this,arguments)};
  let fr=0;await new Promise(r=>{const q=()=>{fr++;if(fr<12)requestAnimationFrame(q);else r()};requestAnimationFrame(q)});C.drawImage=od;return +(n/fr).toFixed(2)}"""
OVL = r"""()=>{const B=[];for(const t of trees){if(!t.k||t.inv)continue;const b=ovfBox(t,35);if(b)B.push(b)}const O=[];for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const h=ovfHit(B[i],B[j]);if(h)O.push([B[i].t.k,B[i].x|0,B[i].y|0,B[j].t.k,B[j].x|0,B[j].y|0,+h.toFixed(2)])}return O}"""
SP = {'camp': "[KCAMP.x,KCAMP.y+60]", 'pit': "[KPIT.x,KPIT.y-KPIT.r-20]", 'office': "[1880,600]", 'tun': "[KTUN[0][0]+60,KTUN[0][1]+40]", 'mesa': "[KMESA[5][0]+40,KMESA[5][1]+120]"}
async def main():
    p = start_server()
    try:
        with urllib.request.urlopen(URL.rstrip('/') + '/hd-mine.webp') as r:
            rep('hd-mine.webp เสิร์ฟได้', r.status == 200 and r.headers.get('Content-Type') == 'image/webp')
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            pg = await (await b.new_context(viewport={'width': 900, 'height': 760})).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Km' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;HDI.on=true;LOWQ=false;window.__n=0;const o=kmgPaint2;window.kmgPaint2=kmgPaint2=function(){__n++;return o.apply(this,arguments)};enterMap(35,{x:KCAMP.x,y:KCAMP.y+80})}"); await pg.wait_for_timeout(5500)
            res = {}
            for k in KS: res[k] = await pg.evaluate(CNT, k)
            rep('ของ 11 ชนิดวาดจากภาพใหม่', all(v >= 1 for v in res.values()), res)
            n = await pg.evaluate("()=>__n"); rep('พื้นใหม่ทำงาน', n > 0, n)
            o = await pg.evaluate(OVL); lg = await pg.evaluate("()=>OVF.log.length"); rep('ไม่มีภาพซ้อน', len(o) == 0, [o[:4], 'จัดไป', lg])
            for mode in ['after', 'before']:
                if mode == 'before': await pg.evaluate("()=>{KMA.off=1;KMG2.off=1;PALC.m.clear()}")
                for k, P in SP.items():
                    await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await pg.evaluate("(P)=>{me.x=P[0];me.y=P[1];ov.hidden=true;banner=null;try{mons.length=0}catch(e){}}", await pg.evaluate("()=>" + P)); await pg.wait_for_timeout(1100)
                    await pg.screenshot(path=f'np/v599_{k}_{mode}.jpg', type='jpeg', quality=84)
            o = await pg.evaluate("()=>{const t=trees.find(t=>t.k==='krub');window.__s0=JSON.stringify(me.sty);me.sty.s=STY.findIndex(s=>s&&s.p7rs);me.sty.a=1;const C=CanvasRenderingContext2D.prototype,of=C.fillText;let sos=0;C.fillText=function(s){if(s==='🆘')sos++;return of.apply(this,arguments)};PALK.krub(t,1);C.fillText=of;me.sty=JSON.parse(__s0);return [STY.findIndex(s=>s&&s.p7rs),sos]}")
            rep('หินถล่ม: ยังขึ้น 🆘 ตอนคนงานติด', o[0] < 0 or o[1] == 1, o)
            o = await pg.evaluate("()=>{const t=trees.find(t=>t.k==='koff');const C=CanvasRenderingContext2D.prototype,of=C.fillText;let s=0;C.fillText=function(x){if(x==='สำนักงานบรอม')s++;return of.apply(this,arguments)};PALK.koff(t,1);C.fillText=of;return s}")
            rep('สำนักงานยังมีป้ายชื่อ', o == 1, o)
            o = await pg.evaluate("()=>{KMA.off=0;KMG2.off=0;HDI.on=false;const a=kmaOn();HDI.on=true;return [a,kmaOn()]}"); rep('ปิด HD → เดิม', o == [False, True], o)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
