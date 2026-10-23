"""v502 วาร์ปบอสโลกไปโผล่ดันอื่น: ศึกป้องกันท่าเรือเมฆเคยใช้เลขห้อง 86xxx ชนลานบอสโลก → ย้ายไป 72xxx · เรดเคยสุ่มเลข 71000–79999 ชนดันเนื้อเรื่อง → 71xxx เท่านั้น ·
   ใส่รหัสเข้าลานบอสโลก (ห้องเดี่ยว) ไม่ได้เหมือนเดิม · ป้ายชวนเข้าห้องบอกชื่อดันถูก"""
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
        A=await new_client(b,'Wb'+str(random.randint(100,999)),'melee',140)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}enterMap(1,{x:1600,y:1600})}");await A.wait(1500)
        res=[]
        for i in range(4):
            r=await A.ev("""async()=>{wbEnter();await new Promise(r=>setTimeout(r,1500));const o=[curMap,isWB(),!!(MAPS[curMap]&&MAPS[curMap].hdf),MAPS[curMap]&&MAPS[curMap].n];dgLeave();await new Promise(r=>setTimeout(r,1200));return o}""")
            res.append(r)
        rep('กดวาร์ปบอสโลก → เข้าลานบอสโลกทุกครั้ง (ไม่โผล่ศึกท่าเรือเมฆ)',all(86000<=x[0]<87000 and x[1] and not x[2] for x in res),res)
        h=await A.ev("""async()=>{hdfEnter();await new Promise(r=>setTimeout(r,1500));const o=[curMap,HDFI(),isWB(),MAPS[curMap]&&MAPS[curMap].n];dgLeave();await new Promise(r=>setTimeout(r,1200));return o}""")
        rep('ศึกป้องกันท่าเรือเมฆใช้ห้อง 72000–72999 · ยังเข้าได้ปกติ',72000<=h[0]<73000 and h[1] and not h[2],h)
        rd=await A.ev("""async()=>{const R0=Math.random,o=[];for(const v of[0,.37,.999]){Math.random=()=>v;let id=0;const _e=dgEnter;window.dgEnter=dgEnter=x=>{id=x;return true};try{dgCreate(7)}finally{window.dgEnter=dgEnter=_e;Math.random=R0}const M=dgMap(id);o.push([id,!!(M&&M.rd),M&&M.n])}return o}""")
        rep('เปิดเรดห้วงลึก: เลขห้อง 71000–71999 เสมอ → เป็นเรดจริง (เดิมสุ่มถึง 79999 แล้วโผล่ดันเนื้อเรื่อง)',all(71000<=x[0]<72000 and x[1] for x in rd),rd)
        j=await A.ev("""async()=>{const o=[];let msg='';const _u=dungeonUI;window.dungeonUI=dungeonUI=t=>{msg=t};try{dgJoin('86123');o.push([curMap,msg]);msg='';const L0=me.lv;me.lv=100;dgJoin('72123');o.push([curMap,msg]);me.lv=L0;msg=''}finally{window.dungeonUI=dungeonUI=_u}
          me.lv=140;dgJoin('72123');await new Promise(r=>setTimeout(r,1500));o.push([curMap,HDFI()]);dgLeave();await new Promise(r=>setTimeout(r,1200));return o}""")
        rep('ใส่รหัสห้อง: ลานบอสโลก (ห้องเดี่ยว) เข้าไม่ได้ · ศึกท่าเรือต้อง Lv 130+ · ถึงเลเวลเข้าได้',j[0][0]<10000 and 'ไม่ถูกต้อง' in j[0][1] and '130' in j[1][1] and j[2][0]==72123 and j[2][1],j)
        iv=await A.ev("""async()=>{const o=[];for(const id of[72345,86123,71234,77222]){dInv={id,tr:Math.floor(id/10000),n:'เพื่อน',until:Date.now()+9e4};await new Promise(r=>setTimeout(r,300));o.push($('dinvb').textContent)}dInv=null;return o}""")
        rep('ป้ายชวนเข้าห้องบอกชื่อดันถูกตามเลขห้อง',('ศึกป้องกันท่าเรือเมฆ' in iv[0]) and ('ลานบอสโลก' in iv[1]) and ('เรด' in iv[2]) and ('ศาลาราชินี' in iv[3]),iv)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
