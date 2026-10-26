"""v531 หน้าต่างในเกมโฉมใหม่: โทนเดียวกับหน้าเลือกตัวละคร · จอแนวนอนกว้างเรียง 2 คอลัมน์ · แนวตั้งเลย์เอาต์เดิม"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
GEO="""()=>{const P=ov.firstElementChild,r=P.getBoundingClientRect(),x=document.getElementById('ovx').getBoundingClientRect();
 return {pn2:P.classList.contains('pn2'),c2:P.classList.contains('pn2c'),l:P.querySelectorAll('.pn2l').length,w:Math.round(r.width),l0:Math.round(r.left),sh:ov.scrollHeight,ch:ov.clientHeight,
  xr:Math.round(x.right),pr:Math.round(r.right),bg:getComputedStyle(P).backgroundImage.slice(0,40),n:PNV.n,err:PNV.err,
  nav:[...P.querySelectorAll('button:not(.cell):not(.tab):not(.pri):not(.rb)')].filter(b=>/60, 78, 120/.test(getComputedStyle(b).backgroundImage)).length}}"""
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
        A=await new_client(b,'Pn'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false}");await A.wait(600)
        async def op(ui):
            await A.ev(f"()=>{{ov.hidden=false;{ui}()}}");await A.wait(600);return await A.ev(GEO)
        g=await op('gearUI')
        rep('แนวตั้ง: ติดตั้งโทนใหม่ · เลย์เอาต์คอลัมน์เดียวเหมือนเดิม · ปุ่มรองไม่เป็นสีน้ำเงินเดิม',await A.ev("()=>document.body.classList.contains('pnv')") and not g['pn2'] and not g['c2'] and 'radial-gradient' in g['bg'] and g['nav']==0 and not g['err'],json.dumps(g))
        await A.ev("()=>{ov.hidden=true}")
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(500);await A.ev('()=>dispatchEvent(new Event("resize"))');await A.wait(900)
        g=await op('gearUI')
        rep('PC: หน้าต่างอุปกรณ์ขยายกว้าง 2 คอลัมน์ · ปุ่มปิดอยู่มุมขวาของหน้าต่าง',g['pn2'] and g['c2'] and g['w']>=1000 and abs(g['xr']-(g['pr']-12))<30,json.dumps(g))
        n0=g['n'];await A.wait(2500);n1=await A.ev("()=>PNV.n")
        rep('ไม่คำนวณวนซ้ำตอนหน้าต่างนิ่ง',n1-n0<=3,[n0,n1])
        s=await op('shopUI')
        rep('ร้านยา (สั้น): คงขนาดเดิม ไม่แตกคอลัมน์',not s['pn2'] and s['w']<=620,json.dumps(s))
        m=await op('mountUI')
        rep('พาหนะ: รายการยาวเป็นตาราง 2 คอลัมน์ทั้งหน้าอยู่ในจอ',m['pn2'] and m['l']==1 and m['sh']<=m['ch']+2,json.dumps(m))
        t=await op('treeUI')
        rep('ตัวละคร/สเตตัส: 2 คอลัมน์ เลื่อนน้อยลง (สูง ≤ 1.3 จอ)',t['c2'] and t['sh']<=t['ch']*1.3,json.dumps(t))
        await A.ev("()=>{const b=ov.querySelectorAll('[data-tab]')[1];b&&b.click()}");await A.wait(600);t2=await A.ev(GEO)
        rep('สลับแท็บ → คำนวณเลย์เอาต์ใหม่ (ไม่ค้างแบบเดิม)',t2['n']>t['n'] and t2['pn2'],json.dumps(t2))
        await A.ev("()=>{ov.hidden=true}")
        await A.pg.set_viewport_size({'width':844,'height':390});await A.wait(500);await A.ev('()=>dispatchEvent(new Event("resize"))');await A.wait(900)
        g=await op('gearUI')
        rep('มือถือแนวนอน: อุปกรณ์ 2 คอลัมน์ เลื่อนน้อยลง',g['c2'] and g['sh']<1400,json.dumps(g))
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(500);await A.ev('()=>dispatchEvent(new Event("resize"))');await A.wait(900)
        g=await A.ev(GEO)
        rep('หมุนกลับแนวตั้ง (หน้าต่างเปิดค้าง) → กลับคอลัมน์เดียว',not g['pn2'] and not g['c2'],json.dumps(g))
        await A.ev("()=>{PNV.on=0;document.body.classList.remove('pnv');ov.hidden=true;ov.hidden=false;gearUI()}");await A.wait(500)
        g=await A.ev(GEO)
        rep('ปิดได้ (PNV.on=0) → หน้าต่างแบบเดิม',not g['pn2'] and 'radial' not in g['bg'],json.dumps(g))
        er=[e for e in A.errs if 'ERR_TUNNEL' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
