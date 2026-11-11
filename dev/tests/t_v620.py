"""v620 ไอคอนภาพวาดชุด 2: สกิลทางเลือก 45 · รูนลิงก์ 23 (ช่องรูน/รายการ/รายละเอียด/หน้ารูนเดิม) · ไม่ยุ่งหน้าอื่น · ปิดได้"""
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
            await pg.goto(URL); await pg.wait_for_timeout(3600)
            a=await pg.evaluate("()=>[SKIC2.ok,SKIC2.err,LRI.n,new Set([...LRI.m.values()]).size,Object.keys(SGD).every(id=>LRI.m.has(lriKey(SGD[id][0])))]")
            rep('โหลด hd-skic2.webp: สกิลทางเลือก 45 · รูนลิงก์ 23 ครบ ไม่ซ้ำ',a==[45,'',23,23,True],a)
            a=await pg.evaluate("""()=>{const bad=[];for(const c of ['melee','archer','sup','assn','mage']){for(const D of Object.values(Q8D[c]).concat(Object.values(Q8DB[c]||{}))){if(!SKIC.map.has(Q8IMG[D.id]))bad.push(D.id)}}
              const s=SKIC.map.get(Q8IMG.mw),b=SKIC.map.get(SKI.melee[0]);return [bad,!!s&&s!==b]}""")
            rep('สกิลทางเลือกทุกอาชีพ (รวมสายแยก) มีภาพวาดของตัวเอง',a==[[],True],a)
            await pg.evaluate(SETUP, ['mage','Lr'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;const X=sgSt();X.i=X.i||{};Object.keys(SGD).forEach(id=>X.i[id]=2)}")
            # skImg เมื่อสลับเป็นสกิลทางเลือก (ตาราง SKI ถูกแทนด้วย Q8IMG)
            a=await pg.evaluate("()=>{const o=SKI.mage[0];SKI.mage[0]=Q8IMG.gl;try{const h=skImg('mage',0,30);return [h.includes('skp'),h.includes(SKIC.map.get(Q8IMG.gl).slice(0,60))]}finally{SKI.mage[0]=o}}")
            rep('ปุ่ม/หน้าต่างสกิลที่ใส่สกิลทางเลือก แสดงภาพวาดของสกิลนั้น',a==[True,True],a)
            await pg.evaluate("()=>{skwOpen('link',0);SKW6.sh=0;treeUI()}"); await pg.wait_for_timeout(900)
            a=await pg.evaluate("()=>{const K=[...ov.querySelectorAll('.kgi')];return [K.length,K.filter(e=>e.querySelector('img.lri')).length,[...ov.querySelectorAll('img.lri')].every(i=>i.complete&&i.naturalWidth>0)]}")
            rep('หน้าต่างสกิล › ลิงก์รูน: รายการ/รายละเอียดรูนเป็นเม็ดรูนภาพวาด',a[0]>=3 and a[1]==a[0] and a[2],a)
            a=await pg.evaluate("async()=>{const b=ov.querySelector('[data-skwp]');if(!b)return 'nopick';b.click();await new Promise(r=>setTimeout(r,500));const c=[...ov.querySelectorAll('.kdt button')].find(x=>/ใส่|ลิงก์/.test(x.textContent)&&!x.disabled);if(c)c.click();await new Promise(r=>setTimeout(r,600));const S=[...ov.querySelectorAll('[data-skws]')];return [S.length,S.filter(x=>x.querySelector('img.lri')).length,S.map(x=>x.textContent.trim().slice(0,2))]}")
            rep('ใส่รูนลงช่องแล้ว ช่องรูนเป็นเม็ดรูนภาพวาด (ช่องว่าง/ล็อกยังเป็นสัญลักษณ์เดิม)',isinstance(a,list) and a[1]>=1,a)
            await pg.evaluate("()=>{SKW6.on=0;sgUI()}"); await pg.wait_for_timeout(700)
            a=await pg.evaluate("()=>{const G=[...ov.querySelectorAll('.gi')];return [ov.dataset.k,G.length,G.filter(e=>e.querySelector('img.lri')).length,G.filter(e=>!e.querySelector('img.lri')).map(e=>e.textContent).slice(0,4)]}")
            rep('หน้ารูนแบบเดิม (sgUI): ไอคอนรูนเป็นภาพวาด (เหลือแค่ 🔒)',a[0]=='rune' and a[2]>=1 and all(t in ('🔒','➕') for t in a[3]),a)
            await pg.evaluate("()=>{SKW6.on=1;ov.hidden=true;qlUI()}"); await pg.wait_for_timeout(600)
            a=await pg.evaluate("()=>[ov.dataset.k,ov.querySelectorAll('img.lri').length]")
            rep('หน้าอื่น (สมุดเควส) ไม่ถูกแปลงอีโมจิ',a[1]==0,a)
            a=await pg.evaluate("async()=>{LRI.off=1;ov.hidden=true;skwOpen('link',0);await new Promise(r=>setTimeout(r,400));const n=ov.querySelectorAll('img.lri').length;LRI.off=0;return n}")
            rep('ปิด LRI.off=1 → อีโมจิเดิม',a==0,a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
            await pg.evaluate("()=>{LRI.off=0;skwOpen('link',0)}"); await pg.wait_for_timeout(800); await pg.screenshot(path='../v620_link.png')
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
