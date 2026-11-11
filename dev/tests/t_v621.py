"""v621 รูนเสริมภาพวาด 160: จับคู่ด้วยรหัสครบ · การ์ดรูนในหน้าต่างสกิล · หน้าช่างรูนเดิม · ทุกอาชีพ · ปิดได้"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):
    R.append(ok);print(('PASS ' if ok else 'FAIL ')+n,d,flush=True)
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':844,'height':390},device_scale_factor=2,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(3800)
            a=await pg.evaluate("""()=>{const all=[];for(const c of ['melee','archer','sup','assn','mage']){for(const k of [0,1,2,3,4,5]){const r=RUNES[c][k];if(r)['a','b'].forEach(e=>r[e]&&all.push(r[e][0]))}
              if(RUNESB[c])['a','b'].forEach(e=>all.push(RUNESB[c][e][0]));for(const D of Object.values(Q8D[c]).concat(Object.values(Q8DB[c]||{})))['a','b'].forEach(e=>all.push(D.R[e][0]))}
              return [RNI.ok,RNI.err,new Set(all).size,all.filter(id=>!RNI.m.has(id)),new Set([...RNI.m.values()]).size]}""")
            rep('โหลด hd-skic3.webp · รูนทุกตัวในเกม (160) มีภาพของตัวเอง ไม่ซ้ำ',a[0]==160 and a[1]=='' and a[2]==160 and a[3]==[] and a[4]==160,a)
            for cls in ('melee','sup','mage'):
                await pg.evaluate(SETUP, [cls,'Rn'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1000)
                a=await pg.evaluate("()=>{const r=[];for(const k of [0,1,2,3]){const h=skwRune(k),R0=RUNES[me.cls][k];const ids=[...h.matchAll(/<span class=\"kri\"><img class=\"rni\" src=\"([^\"]+)\"/g)].map(m=>m[1]);r.push(ids.length===2&&ids[0]===RNI.m.get(R0.a[0])&&ids[1]===RNI.m.get(R0.b[0]))}return r}")
                rep(f'{cls}: การ์ดรูน A/B ในหน้าต่างสกิลเป็นภาพของรูนตัวนั้นจริง (สกิล 1–3 + อัลติ)',all(a),a)
            await pg.evaluate("()=>{skwOpen('rune',0)}"); await pg.wait_for_timeout(700)
            a=await pg.evaluate("()=>{const K=[...ov.querySelectorAll('.kri')];return [K.length,K.filter(e=>e.querySelector('img.rni')).length,[...ov.querySelectorAll('img.rni')].every(i=>i.complete&&i.naturalWidth>0)]}")
            rep('หน้าต่างสกิล › รูนหลัก: แสดงภาพและโหลดขึ้นจริง',a[0]==2 and a[1]==2 and a[2],a)
            await pg.screenshot(path='../v621_rune.png')
            await pg.evaluate("()=>{ov.hidden=true;runeUI()}"); await pg.wait_for_timeout(600)
            a=await pg.evaluate("()=>{const I=[...ov.querySelectorAll('.rnrow .ico')].filter(e=>e.textContent!=='⚪');return [ov.dataset.k,I.length,I.filter(e=>e.querySelector('img.rni')).length]}")
            rep('หน้าช่างรูนไอริส (แบบเดิม): ทุกแถวรูนเป็นภาพ (ช่อง "ไม่ใส่รูน" ยังเป็น ⚪)',a[0]=='rune' and a[1]>=8 and a[2]==a[1],a)
            a=await pg.evaluate("()=>{RNI.off=1;const h=skwRune(0);RNI.off=0;return [h.includes('img class=\"rni\"'),h.includes(RUNES[me.cls][0].a[1])]}")
            rep('ปิด RNI.off=1 → อีโมจิเดิม',a==[False,True],a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
