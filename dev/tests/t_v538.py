"""v538 หน้าสร้างตัวละครฉากกองไฟ: ตัวละครทุกอาชีพนั่งล้อมกองไฟ · แตะตัวละคร/ปุ่มอาชีพ = เลือก (ลำแสง · ลุกยืน · แสดงท่า) · โหมดอื่นใช้เวทีเดิม"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Cf'+str(random.randint(100,999)),'mage',30)
        for vw,vh in ((390,844),(1280,720)):
            await A.pg.set_viewport_size({'width':vw,'height':vh});await A.wait(400)
            await A.ev("()=>{csMode='new';csPick='melee';ov.hidden=false;intro()}");await A.wait(1200)
            r=await A.ev("()=>{const st=ov.querySelector('.cs-stage'),cv=document.getElementById('csv'),R=cv.getBoundingClientRect();return [st.classList.contains('csfire'),CFV.pos.length,CFV.pos.map(p=>p.c).join(','),CFV.sel,Math.round(R.height),!!st.querySelector('.cs-tap'),CFV.err]}")
            rep(f'{vw}×{vh}: เวทีกองไฟ ตัวละคร 5 อาชีพรอบไฟ · เลือกดาบอสูรอยู่',r[0] and r[1]==5 and r[3]=='n:melee' and r[4]>=280 and r[5] and not r[6],r)
            t=await A.ev("""async()=>{const cv=document.getElementById('csv'),R=cv.getBoundingClientRect(),P=CFV.pos.find(p=>p.c==='n:sup');cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:R.left+P.x,clientY:R.top+P.y,bubbles:true}));await new Promise(r=>setTimeout(r,250));
              const a=[csPick,CFV.sel,CFV.prev,!!document.querySelector('.csw [data-cp="sup"].on')];await new Promise(r=>setTimeout(r,900));const P2=CFV.pos.find(p=>p.c==='n:sup');return a.concat([document.getElementById('csv').parentElement.classList.contains('csfire'),Math.round(P2.r)])}""")
            rep(f'{vw}×{vh}: แตะตัวละครบนเวที → เลือกอาชีพนั้น (ตัวเดิมนั่งกลับ) · ปุ่มอาชีพตรงกัน',t[0]=='sup' and t[1]=='n:sup' and t[2]=='n:melee' and t[3] and t[4],t)
            ps=await A.ev("()=>{const o=[];for(const te of[.1,.4,1,3,4.5,6.5,9])o.push(JSON.stringify(cfPose('archer',te)).slice(0,140));return o}")
            rep(f'{vw}×{vh}: ลุกยืน (นั่ง→ยืน) แล้ววนท่า เปิดตัว/ยืนรอ/โจมตี/สกิล',('"sit":0.' in ps[0] or '"sit":1' in ps[0]) and '"sit":0' in ps[2] and any('"ak":0.' in q for q in ps) and any('big' in q for q in ps),ps)
        await A.ev("()=>{csMode='';ov.hidden=false;intro()}");await A.wait(800)
        r=await A.ev("()=>{const st=ov.querySelector('.cs-stage');return st?st.classList.contains('csfire'):null}")
        rep('หน้าเลือกตัวละคร (v539) ก็เป็นฉากกองไฟ',r is True,r)
        await A.pg.set_viewport_size({'width':390,'height':844});await A.ev("()=>{csMode='new';csPick='assn';ov.hidden=false;intro()}");await A.wait(1500)
        await A.pg.screenshot(path='../v538/t_new.jpg',quality=80)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
