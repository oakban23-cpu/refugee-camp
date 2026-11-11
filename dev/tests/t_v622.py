"""v622 ไอคอน UI ภาพวาด: ปุ่มกลมบนจอ · ยา · เมนู · หัวหน้าต่าง · ปุ่มมุมจอ · สถานะเปิด/ปิด · ไม่ error"""
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
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(3800)
            a=await pg.evaluate("()=>[UIIC.ok,UIIC.err,new Set([...UIIC.m.values()]).size]")
            rep('โหลด hd-uiic.webp ครบ 54 ไม่ซ้ำ (+🎯 ใช้ภาพเป้า)',a[0]>=54 and a[1]=='' and a[2]==54 and True,a)
            await pg.evaluate(SETUP, ['melee','Ui'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{AUTO.on=false;gmGod=true;ov.hidden=true;enterMap(2,{x:1600,y:1600})}"); await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}"); await pg.wait_for_timeout(600)
            a=await pg.evaluate("()=>['mn','tg','ahb','atb','dgx','ph','pm'].map(id=>{const b=document.getElementById(id);if(!b||b.hidden||!b.offsetParent)return [id,'hidden'];const i=b.querySelector('img.uih'),r=i&&i.getBoundingClientRect(),q=b.getBoundingClientRect();return [id,!!i&&i.complete&&i.naturalWidth>0,i?Math.round(r.width/q.width*100):0,!/[\\u{1F300}-\\u{1FAFF}]/u.test(b.textContent)]})")
            vis=[x for x in a if x[1]!='hidden']
            rep('ปุ่มกลมบนจอ (เมนู เป้า บอท AUTO หลบ ยา 2 ขวด) เป็นภาพวาดเต็มวง ไม่เหลืออีโมจิ',len(vis)>=6 and all(x[1] is True and x[2]>=80 and x[3] for x in vis),a)
            a=await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const L=lockId;lockId=null;await w(300);const t1=$('tg').querySelector('small').textContent;const m=mons.find(x=>x.hp>0);if(m)lockId=m.id;await w(400);const t2=$('tg').querySelector('small')&&$('tg').querySelector('small').textContent,img=!!$('tg').querySelector('img.uih');lockId=L;return [t1,t2,img]}")
            rep('ปุ่มเป้า: เปลี่ยนป้าย เป้า→ล็อก แล้วภาพยังอยู่',a[0]=='เป้า' and a[1]=='ล็อก' and a[2],a)
            a=await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const b=$('atb');if(b.hidden)return 'hidden';const o=AUTO.on;AUTO.on=true;autoBtn();await w(150);const f0=getComputedStyle(b.querySelector('img.uih')).filter;AUTO.on=false;autoBtn();await w(150);const f1=b.querySelector('img.uih')?getComputedStyle(b.querySelector('img.uih')).filter:'gone';AUTO.on=o;autoBtn();return [b.classList.contains('on'),f0,f1]}")
            rep('ปุ่ม AUTO: เปิด=ภาพสด ปิด=ภาพหม่น (สลับได้ ภาพไม่หาย)',a=='hidden' or (a[1]=='none' and a[2] not in ('none','gone')),a)
            a=await pg.evaluate("()=>[POTI.hp===UIIC.m.get('ph'),POTI.mp===UIIC.m.get('pm'),potImg('hp',30).includes('image/webp')]")
            rep('ยาเลือด/ยามานา ใช้ภาพใหม่ทุกที่ (POTI)',a==[True,True,True],a)
            a=await pg.evaluate("()=>['evt','cht','emb','sb','mub'].map(id=>{const b=document.getElementById(id);return [id,!!(b&&b.querySelector('img.u58p'))]})")
            rep('ปุ่มมุมจอ ปฏิทิน/แชท/อีโมต/เสียง/เพลง เป็นภาพวาด',all(x[1] for x in a),a)
            a=await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const m0=$('sb').querySelector('img.u58p').src;setMute(!muted);await w(300);const m1=$('sb').querySelector('img.u58p');setMute(!muted);await w(200);return [!!m1,m1&&m1.src!==m0]}")
            rep('กดปิดเสียง → ภาพลำโพงขีดฆ่า (ภาพเปลี่ยน)',a==[True,True],a)
            await pg.evaluate("()=>{menuToggle()}"); await pg.wait_for_timeout(700)
            a=await pg.evaluate("()=>{const I=[...document.querySelectorAll('#mnp button>i')];return [I.length,I.filter(i=>i.querySelector('img.u58p')).length,I.filter(i=>!i.querySelector('img.u58p')).map(i=>i.textContent)]}")
            rep('เมนู: ทุกช่องเป็นภาพวาด (รวม ค่าหัว กิลด์ มีอะไรใหม่)',a[0]>=20 and a[1]==a[0],a)
            await pg.evaluate("()=>{menuToggle&&document.getElementById('mnp')&&!document.getElementById('mnp').hidden&&menuToggle();qlUI()}"); await pg.wait_for_timeout(700)
            a=await pg.evaluate("()=>{const i=ov.querySelector('.ph .ic');return [ov.dataset.k,!!(i&&i.querySelector('img.u58p'))]}")
            rep('หัวหน้าต่าง (สมุดเควส) เป็นภาพวาด',a[1],a)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
