"""v539 หน้าเลือกตัวละครฉากกองไฟ: ตัวละครของผู้เล่นนั่งรอบไฟ (ชุด/ร่างจริง) · แตะเลือก = ลุกยืนในลำแสง · ขอนว่างแตะ = สร้างตัวละคร · 8 ตัวนั่งหน้ากองไฟเพิ่ม"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
TAP="""async(id)=>{const cv=document.getElementById('csv'),R=cv.getBoundingClientRect(),P=CFV.pos.find(p=>p.c===id);if(!P)return 'nopos';cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:R.left+P.x,clientY:R.top+P.y,bubbles:true}));await new Promise(r=>setTimeout(r,500));return [csMode,csSel]}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Cs'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false}");await A.wait(1000)
        await A.ev("""()=>{try{writeSave()}catch(e){};const base=saves.chars[me.slot]||Object.values(saves.chars)[0]||{};const mk=(k,c,lv,c2)=>{const o=JSON.parse(JSON.stringify(base));o.cls=c;o.lv=lv;o.nm=k;o.cls2=c2;o.br=1;o.rb=0;o.eq={};saves.chars['x'+c]=o};mk('ลมเหนือ','archer',64,1);mk('เมฆา','mage',99,2);mk('ชบา','sup',12,0)}""")
        for vw,vh in ((390,844),(1280,720)):
            await A.pg.set_viewport_size({'width':vw,'height':vh});await A.wait(400)
            await A.ev("()=>{csMode='';csSel=Object.keys(saves.chars).find(k=>k[0]!=='x');ov.hidden=false;intro()}");await A.wait(1300)
            r=await A.ev("()=>{const st=ov.querySelector('.cs-stage');return [st.classList.contains('csfire'),st.classList.contains('cssel'),CFV.pos.length,CFV.pos.filter(p=>p.E&&p.E.emp).length,CFV.pos.map(p=>p.E&&p.E.lv).filter(Boolean).length,CFV.sel,CFV.err]}")
            rep(f'{vw}×{vh}: ตัวละครของผู้เล่น 4 ตัว + ขอนว่าง 1 นั่งรอบกองไฟ (มีเลเวล) · ตัวที่เลือกอยู่ยืน',r[0] and r[1] and r[2]==5 and r[3]==1 and r[4]==4 and r[5].startswith('s:') and not r[6],r)
            t=await A.ev(TAP,'s:xmage');await A.wait(900)
            m=await A.ev("()=>{const E=CFV.pos.find(p=>p.c==='s:xmage').E;return [CFV.sel,CFV.prev&&CFV.prev.startsWith('s:'),E.c2,E.cls,!!document.querySelector('.csw [data-cs=\"xmage\"].on'),document.querySelector('.cs-nm').textContent.includes('เมฆา')]}")
            rep(f'{vw}×{vh}: แตะตัวละครบนเวที → เลือกตัวนั้น (ร่างอาชีพจริง · การ์ดในรายชื่อ/ชื่อด้านบนตรงกัน) · ตัวเดิมนั่งกลับ',t==['','xmage'] and m[0]=='s:xmage' and m[1] and m[2]>=1 and m[3]=='mage' and m[4] and m[5],[t,m])
            e=await A.ev(TAP,'emp')
            n2=await A.ev("()=>[csMode,ov.querySelector('.cs-stage').classList.contains('csfire'),ov.querySelector('.cs-stage').classList.contains('cssel'),CFV.pos.length]")
            rep(f'{vw}×{vh}: แตะขอนว่าง → หน้าสร้างตัวละคร (ฉากกองไฟแบบเลือกอาชีพ)',e[0]=='new' and n2[0]=='new' and n2[1] and not n2[2] and n2[3]==5,[e,n2])
        await A.ev("""()=>{const base=saves.chars.xarcher;const mk=(k,c)=>{const o=JSON.parse(JSON.stringify(base));o.cls=c;o.nm=k;o.cls2=0;saves.chars['y'+k]=o};['assn','melee','mage','archer'].forEach((c,i)=>mk('y'+i,c))}""")
        await A.ev("()=>{csMode='';ov.hidden=false;intro()}");await A.wait(1300)
        r=await A.ev("()=>{const P=CFV.pos,fy=Math.max(...P.map(p=>p.y));return [P.length,P.filter(p=>p.E&&p.E.emp).length,CFV.err]}")
        await A.pg.screenshot(path='../v539/t_8.jpg',quality=80)
        rep('ตัวละครครบ 8 ตัว: นั่งรอบไฟทั้งหมด (ไม่มีขอนว่าง)',r[0]==8 and r[1]==0 and not r[2],r)
        r=await A.ev("()=>{csMode='empty';ov.hidden=false;intro();return [csMode,ov.querySelector('.cs-stage')?ov.querySelector('.cs-stage').classList.contains('csfire'):'none']}")
        rep('โหมดช่องว่างใช้เวทีเดิม',r[0]!='empty' or r[1] in (False,'none'),r)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
