"""v563 ผู้เล่นใหม่ 20 นาทีแรก
   ① ออโต้เควสช่วงบทสอนขั้น 1–2: พาออกไปล่ามอนตัวแรก (เดิมค้าง «รอรับเควสใหม่») → บทสอนผ่าน → เนื้อเรื่องเริ่ม
   ② หน้าสร้างตัวละคร (จอแนวตั้ง): กดสร้างโดยไม่ใส่ชื่อ → ช่องชื่อ + ข้อความเตือนเลื่อนขึ้นมาให้เห็น (ไม่อยู่ใต้แถบปุ่ม)
   ③ คัตซีน: แตะกลางฉาก (ไม่ใช่กล่องบทพูด) → บทพูดไปต่อ
   ④ หน้าเข้าหอคอย: ปุ่มเริ่มปีนเป็นปุ่มหลัก «▶ เริ่มปีน» และกดแล้วเข้าหอคอยได้ · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        # ② หน้าสร้างตัวละคร (เครื่องใหม่)
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.touchscreen.tap(195, 738); await pg.wait_for_timeout(3000)
        await pg.evaluate("()=>{const i=document.getElementById('csni');if(i){i.value='';i.dispatchEvent(new Event('input',{bubbles:true}))}}")
        await pg.get_by_text('สร้างตัวละคร').first.click(); await pg.wait_for_timeout(900)
        r = await pg.evaluate("()=>{const nb=document.querySelector('.cs-namebox'),m=document.getElementById('csnm'),bar=document.querySelector('.cs-act');const a=nb.getBoundingClientRect(),c=bar.getBoundingClientRect(),mm=m.getBoundingClientRect();return {msg:m.textContent,nbTop:Math.round(a.top),nbBot:Math.round(a.bottom),msgBot:Math.round(mm.bottom),barTop:Math.round(c.top),vh:innerHeight}}")
        rep('สร้างตัวละครโดยไม่ใส่ชื่อ → ช่องชื่อและข้อความเตือนเลื่อนขึ้นพ้นแถบปุ่ม', 'ชื่อ' in r['msg'] and r['msgBot'] <= r['barTop'] and r['nbTop'] >= 0, r)
        # เกมจริง: ตัวละครใหม่ Lv 1 + บทสอน
        A = await new_client(b, 'Nw' + str(random.randint(100, 999)), 'archer', 1)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};localStorage.removeItem('refugee_tut');me.lv=1;me.xp=0;me.sty={s:0,n:0,a:0};enterMap(1,{x:CX,y:CY+40});tutStart()}")
        await A.wait(1500)
        s0 = await A.ev("()=>({tut:tutI,xp:me.xp,sty:[me.sty.s,me.sty.a]})")
        await A.ev("()=>{aqStart('st')}")
        got = None
        for k in range(30):
            await A.wait(2000)
            s = await A.ev("()=>({tut:tutI,xp:me.xp,lv:me.lv,sd:!!SD.on,cz:!!(typeof CZ!=='undefined'&&CZ.on),sty:[me.sty.s,me.sty.a],aq:AQ&&AQ.msg,out:Math.round(Math.hypot(me.x-CX,me.y-CY))})")
            if s['sd'] or s['cz'] or s['sty'] != s0['sty']:
                got = s; break
        rep('ออโต้เควสตอนบทสอนขั้น 1–2: ออกไปล่ามอนตัวแรก → บทสอนผ่าน → เนื้อเรื่องเริ่ม (เดิมค้าง «รอรับเควสใหม่»)', got is not None and got['tut'] >= 2 and (got['xp'] > 0 or got['lv'] > 1), [s0, got or s])
        # ③ คัตซีนแตะกลางฉาก
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};if(typeof CZ!=='undefined'&&CZ.on)czEnd();AQ&&aqStop&&aqStop()}"); await A.wait(800)
        cz = await A.ev("()=>{let id=null;for(const k in CZDEF){id=k;break}stSay([['nar','บรรทัดที่หนึ่ง'],['nar','บรรทัดที่สอง'],['nar','บรรทัดที่สาม']],()=>{});if(!CZ.on){czStart('',1);czLine()}return [id,!!SD.on,typeof CZ!=='undefined'&&CZ.on]}")
        await A.wait(2000)
        i0 = await A.ev("()=>[SD.i,!!SD.on,CZ.on]")
        await A.pg.touchscreen.tap(195, 300); await A.wait(400); await A.pg.touchscreen.tap(195, 300); await A.wait(600)
        i1 = await A.ev("()=>[SD.i,!!SD.on,CZ.on]")
        rep('คัตซีน: แตะกลางฉาก (นอกกล่องบทพูด) → บทพูดไปต่อ', i0[2] and (i1[0] > i0[0] or not i1[1]), [cz, i0, i1])
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        # ④ หอคอย
        await A.ev("()=>{me.lv=17;enterMap(5,{x:TWDOOR.x,y:TWDOOR.y+60})}"); await A.wait(1800)
        tw = await A.ev("()=>{twEnterUI();const b=ov.querySelector('button[data-twc]');return b?[b.className,b.textContent.trim()]:null}")
        await A.ev("()=>{ov.querySelector('button[data-twc]').click()}"); await A.wait(3000)
        tw2 = await A.ev("()=>({map:curMap,tw:typeof isTw==='function'&&isTw(),ov:!ov.hidden})")
        rep('หน้าเข้าหอคอย: ปุ่ม «▶ เริ่มปีน» เป็นปุ่มหลัก · กดแล้วเข้าหอคอยได้', tw and 'pri' in tw[0] and tw[1].startswith('▶ เริ่มปีน') and tw2['tw'], [tw, tw2])
        # ⑤ แตะกล่องเควสในห้องรอหอคอย → เริ่มปีน · กำลังสู้ → เปิดล่าอัตโนมัติ
        d0 = await A.ev("()=>({ph:dg.ph,tw:isTw(),dgb:!$('dgb').hidden})")
        await A.ev("()=>{HB.on=false;const e=$('stq');if(e&&!e.hidden)e.click();else aqStart('st')}"); await A.wait(3000)
        d1 = await A.ev("()=>({ph:dg.ph,hb:!!HB.on})")
        await A.ev("()=>{const e=$('stq');if(e&&!e.hidden)e.click();else aqStart('st')}"); await A.wait(800)
        d2 = await A.ev("()=>({ph:dg.ph,hb:!!HB.on,b:banner&&banner.s})")
        rep('แตะกล่องเควสในห้องรอหอคอย → เริ่มปีนให้ · แตะอีกครั้งระหว่างสู้ → เปิดล่าอัตโนมัติ', d0['ph']=='lobby' and d1['ph'] in ('run','boss') and d2['hb'], [d0, d1, d2])
        E = errs + [e for e in A.errs if 'ERR_' not in e and not e.startswith('console')]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
