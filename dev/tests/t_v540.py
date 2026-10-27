"""v540 หน้ากองไฟครบชุด: กดเล่นต่อ/สร้าง → เดินออกจากกองไฟก่อนเข้าเกม · ตอนโหลดเห็นถ่านไฟ แล้วไฟลุก · โหลดเสร็จไม่ค้างหน้าช่องว่าง · ออกจากหน้าปกแบบมืดแล้วสว่าง"""
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
        A=await new_client(b,'Cg'+str(random.randint(100,999)),'melee',99)
        rep('ตอนเริ่ม (pick จากโค้ด) ไม่หน่วงเวลา',await A.ev("()=>!!me.cls&&!CFV.go"))
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false}");await A.wait(800)
        await A.ev("""()=>{try{writeSave()}catch(e){};const base=saves.chars[me.slot]||Object.values(saves.chars)[0]||{};const mk=(k,c,lv)=>{const o=JSON.parse(JSON.stringify(base));o.cls=c;o.lv=lv;o.nm=k;o.cls2=0;o.rb=0;o.eq={};saves.chars['x'+c]=o};mk('ลมเหนือ','archer',64);mk('เมฆา','mage',41)}""")
        await A.ev("()=>{window.__sm=saveMode;saveMode='wait';csMode='';ov.hidden=false;intro()}");await A.wait(900)
        w=await A.ev("()=>{const st=ov.querySelector('.cs-stage');return [csMode,st.classList.contains('csfire'),st.classList.contains('cswait'),CFV.pos.length,ov.querySelector('.cs-nm').textContent]}")
        await A.ev("()=>{saveMode=window.__sm;intro()}");await A.wait(300)
        l=await A.ev("()=>[csMode,CFV.ign>0,CFV.pos.filter(p=>p.E&&p.E.lv).length]")
        rep('ระหว่างโหลด: ฉากกองไฟถ่านแดง ขอนว่าง «กำลังจุดไฟ» → โหลดเสร็จไฟลุก กลับหน้าเลือกตัวละคร (ไม่ค้างหน้าช่องว่าง)',w[0]=='empty' and w[1] and w[2] and 'จุดไฟ' in w[4] and l[0]=='' and l[1] and l[2]==3,[w,l])
        await A.ev("()=>{document.querySelector('.csw [data-cs=\"xarcher\"]').click()}");await A.wait(500)
        g=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const s0=me.slot;document.querySelector('.csw .cs-go[data-slot]').click();await w(350);const a=[!!CFV.go,CFV.go&&CFV.go.id,me.slot===s0,document.querySelector('.csw .cs-go').disabled];await w(1300);return a.concat([me.slot,me.cls,!CFV.go])}""")
        rep('กดเล่นต่อ: ตัวที่เลือกเดินออกจากกองไฟ (ปุ่มล็อก) 1.15 วิ แล้วเข้าเกมด้วยตัวนั้น',g[0] and g[1]=='s:xarcher' and g[2] and g[3] and g[4]=='xarcher' and g[5]=='archer' and g[6],g)
        await A.ev("()=>{ov.hidden=true}");await A.wait(300)
        n=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));csMode='new';csPick='assn';csName='เงา'+(Date.now()%1000);ov.hidden=false;intro();await w(900);document.querySelector('.csw .cs-go[data-new]').click();await w(300);const a=[CFV.go&&CFV.go.id,CFV.go&&CFV.go.nm];await w(2500);return a.concat([me.cls,me.nm,!CFV.go])}""")
        rep('สร้างตัวละคร: ชื่อลอยเหนือหัว + เดินออก แล้วเข้าเกมด้วยตัวใหม่',n[0]=='n:assn' and n[1] and n[1].startswith('เงา') and n[2]=='assn' and n[3]==n[1] and n[4],n)
        ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True);pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.mouse.click(195,600);await pg.wait_for_timeout(400)
        a=await pg.evaluate("()=>[!!document.getElementById('cfign'),+getComputedStyle(document.getElementById('cfign')).opacity]")
        await pg.wait_for_timeout(2200)
        c=await pg.evaluate("()=>[!!document.getElementById('ttl'),!!document.getElementById('cfign'),CFV.ign>0,!!document.querySelector('.cs-stage.csfire')]")
        rep('ออกจากหน้าปก: จอมืดลงแล้วค่อยสว่างเข้าฉากกองไฟ (ไฟค่อย ๆ ลุก)',a[0] and c==[False,False,True,True] and not errs,[a,c,errs[:2]])
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
