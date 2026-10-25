import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v528 หน้าเลือกตัวละครโฉมใหม่ แนวตั้ง/แนวนอน
GEO="""()=>{const w=ov.querySelector('.csw'),R=s=>{const e=w&&w.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
  const go=R('.cs-go');return {cs3:!!(w&&w.classList.contains('cs3')),stage:R('.cs-stage'),ro:R('.cs-roster'),sd:R('.cs-side'),go,emp:w?w.querySelectorAll('.cs-emp').length:-1,cards:w?w.querySelectorAll('.cs-roster button[data-cs]').length:-1,cl:w?w.querySelectorAll('.cs-roster .cs-cl').length:-1,
   ovs:[ov.scrollHeight,ov.clientHeight],vw:innerWidth,vh:innerHeight,tip:(()=>{const t=document.getElementById('tipc');return !!t&&getComputedStyle(t).display!=='none'&&!t.hidden})(),err:CSV.err,flex:w?getComputedStyle(w.querySelector('.cs-roster .cs-cls')).flexDirection:''}}"""
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Cs'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false}");await A.wait(1200)
        await A.ev("""()=>{try{writeSave()}catch(e){};const base=saves.chars[me.slot]||Object.values(saves.chars)[0]||{};const mk=(k,c,lv)=>{const o=JSON.parse(JSON.stringify(base));o.cls=c;o.lv=lv;o.nm=k;o.cls2=0;o.rb=0;o.eq={};saves.chars['x'+c]=o};mk('ลมเหนือ','archer',64);mk('เมฆา','mage',41);mk('ชบา','sup',12)}""")
        await A.ev("()=>{tipShow(TIPL[0]);TIPS.hide=performance.now()+9000}")
        await A.ev("()=>{csMode='';ov.hidden=false;intro()}");await A.wait(900)
        g=await A.ev(GEO)
        rep('ติดตั้ง + แนวตั้ง: จัดเลย์เอาต์ใหม่ · ช่องว่างเหลือการ์ดเดียว · การ์ดบอกอาชีพครบ 4 ตัว',g['cs3'] and g['emp']==1 and g['cards']==4 and g['cl']==4 and not g['err'],json.dumps(g))
        rep('แนวตั้ง: เวทีกว้างเต็ม สูง ≥ 30% ของจอ · แถบตัวละครเรียงแนวนอนใต้เวที · ปุ่มเล่นอยู่ในจอ',g['stage'][2]>=330 and g['stage'][3]>=g['vh']*.3 and g['flex']=='row' and g['ro'][1]>g['stage'][1]+g['stage'][3]-4 and g['go'][1]+g['go'][3]<=g['vh'],json.dumps(g))
        rep('การ์ดคำแนะนำไม่ค้างทับหน้าเลือกตัวละคร',not g['tip'],json.dumps(g))
        for vw,vh,nm in [(844,390,'มือถือแนวนอน'),(1180,820,'แท็บเล็ต'),(1440,900,'PC')]:
            await A.pg.set_viewport_size({'width':vw,'height':vh});await A.wait(700)
            g=await A.ev(GEO)
            three=g['ro'][0]+g['ro'][2]<=g['stage'][0]+2 and g['stage'][0]+g['stage'][2]<=g['sd'][0]+2
            fit=g['ovs'][0]<=g['ovs'][1]+2 and g['stage'][1]+g['stage'][3]<=vh+1 and g['go'][1]>=0 and g['go'][1]+g['go'][3]<=vh
            rep(f'{nm} {vw}×{vh}: 3 คอลัมน์ (รายชื่อ · เวที · ข้อมูล) · ทั้งหน้าไม่ต้องเลื่อน · ปุ่มเล่นอยู่ในจอ · เวทีสูง ≥ 70%',three and fit and g['flex']=='column' and g['stage'][3]>=vh*.7,json.dumps(g))
        # คลิกการ์ดตัวอื่น → เลือก + เลย์เอาต์ยังอยู่
        await A.ev("()=>{const b=ov.querySelector('.cs-roster button[data-cs=\"xmage\"]');b.click()}");await A.wait(500)
        r=await A.ev("()=>[csSel,!!ov.querySelector('.csw.cs3'),!!ov.querySelector('.cs-roster button[data-cs=\"xmage\"].on')]")
        rep('กดการ์ดตัวละคร → เลือกตัวนั้น เลย์เอาต์ใหม่คงอยู่',r==['xmage',True,True],json.dumps(r))
        await A.ev("()=>{ov.querySelector('.cs-emp').click()}");await A.wait(500)
        g=await A.ev(GEO);r=await A.ev("()=>[csMode,ov.querySelectorAll('.cs-roster button[data-cp]').length,!!ov.querySelector('.cs-side #csni'),!!ov.querySelector('.cs-side .cs-go[data-new]')]")
        rep('การ์ด «สร้างตัวละคร» → หน้าเลือกอาชีพ (รายชื่ออาชีพซ้าย · ช่องชื่อ+ปุ่มสร้างขวา)',r[0]=='new' and r[1]>=5 and r[2] and r[3] and g['ovs'][0]<=g['ovs'][1]+2,json.dumps([r,g]))
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(600)
        await A.ev("()=>{const i=ov.querySelector('#csni');i.value='ทดสอบ';i.dispatchEvent(new Event('input',{bubbles:true}))}");await A.wait(200)
        r=await A.ev("()=>[ov.querySelector('.cs-pn')&&ov.querySelector('.cs-pn').textContent,ov.querySelector('.cs-side .cs-go').disabled]")
        rep('พิมพ์ชื่อ → เวทีแสดงชื่อ ปุ่มสร้างกดได้',r[0]=='ทดสอบ' and not r[1],json.dumps(r,ensure_ascii=False))
        r=await A.ev("()=>{CSV.on=0;csMode='';intro();const a=!!ov.querySelector('.csw.cs3');CSV.on=1;intro();return [a,!!ov.querySelector('.csw.cs3')]}")
        rep('ปิด CSV.on → หน้าแบบเดิม · เปิดกลับ → แบบใหม่',r==[False,True],json.dumps(r))
        r=await A.ev("()=>{const n=_csPt?1:0;let t0=performance.now();for(let i=0;i<60;i++)csTick();return (performance.now()-t0)/60}")
        rep('เวทีวาด 1 เฟรม < 12 ms (จอ 390×844)',r<12,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
