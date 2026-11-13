import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/cg/'
GO="""async([m,shot])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=true;ov.hidden=true;try{if(SD.on)stClose()}catch(e){}
 const t0=performance.now();enterMap(m,{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600});const el=document.getElementById('warpov');
 let seen=null;for(let i=0;i<60&&WARP.on;i++){await w(25);if(el.classList.contains('rg')&&!seen){const im=el.querySelector('.rgi');const r=im.getBoundingClientRect();
   seen={src:im.getAttribute('src'),ok:im.complete&&im.naturalWidth>0&&getComputedStyle(im).display!=='none'&&r.width>100,a:el.querySelector('.rgt b').textContent,b:el.querySelector('.rgt i').textContent,nm:el.querySelector('.wn').textContent,tvis:getComputedStyle(el.querySelector('.rgt')).display!=='none'};
   if(shot){window.__shot=1;while(window.__shot)await w(30)}}}
 let mn=WARP.min;while(WARP.on&&performance.now()-t0<4000){mn=Math.max(mn,WARP.min);await w(25)}return{dur:Math.round(performance.now()-t0),seen,map:curMap,mn}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();ctx=await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True);pg=await ctx.new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T7'+str(random.randint(100,999)),99]);await pg.wait_for_timeout(3500)
            r=await pg.evaluate("""async()=>{const bad=[];for(let n=1;n<=10;n++){const x=await fetch(rgSrc(n),{method:'HEAD'});if(!x.ok)bad.push(n)}
               const miss=Object.keys(MAPS).map(Number).filter(k=>k<100&&!rgOf(k));return[bad,miss,/rgApply/.test(warpShow.toString())]}""")
            rep('ติดตั้ง: ภาพครบ 10 ภาค · ทุกแมพหลัก 1–45 อยู่ในภาคใดภาคหนึ่ง',r[0]==[] and r[1]==[] and r[2],r)
            await pg.evaluate("()=>{enterMap(1,{x:MAPS[1].sx||1600,y:MAPS[1].sy||1600})}");await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{RGC.last=1;rgLoad(2)}");await pg.wait_for_timeout(800)
            # เข้าภาคใหม่ (ถ่ายภาพระหว่างการ์ดขึ้น)
            task=asyncio.ensure_future(pg.evaluate(GO,[9,1]))
            for i in range(80):
                await asyncio.sleep(.05)
                if await pg.evaluate("()=>!!window.__shot"):break
            await pg.wait_for_timeout(350);await pg.screenshot(path=O+'t637_land.jpg',type='jpeg',quality=82);await pg.evaluate("()=>{window.__shot=0}")
            a=await task
            s=a['seen'] or {}
            rep('เข้าภาคใหม่ (ค่าย → อัสตรา): การ์ดภาพภาค 2 + ชื่อภาค + ชื่อแมพ',s.get('ok') and 'rg02' in s.get('src','') and s.get('a')=='ภาค 2' and s.get('b')=='ฟ้าแตก' and s.get('nm')=='นครลอยฟ้าอัสตรา' and s.get('tvis'),a)
            rep('เข้าภาคใหม่: ค้างให้อ่านอย่างน้อย ~1.2 วิ (ไม่เกิน 2.4)',1150<=a['dur']<=2500,a)
            await pg.wait_for_timeout(600)
            b2=await pg.evaluate(GO,[10,0])
            rep('ย้ายแมพในภาคเดิม (อัสตรา → ทุ่งรอยแยก): การ์ดภาค 2 แต่ไม่บังคับค้าง (เวลาขั้นต่ำเท่าเดิม)',(b2['seen'] or {}).get('ok') and b2['mn']<1000,b2)
            r=await pg.evaluate("()=>WARP.min")
            rep('ค่าเวลาขั้นต่ำของวาร์ปคืนค่าเดิมหลังปิด',r==280,r)
            # ภาพยังไม่โหลด → กราดิเอนต์เดิมก่อน แล้วภาพขึ้นเมื่อโหลดเสร็จ
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));delete RGC.img[5];const _rs=rgSrc;rgSrc=r=>_rs(r)+'?nc='+Date.now();WARP.max=3000;WARP.min=2500;enterMap(27,{x:MAPS[27].sx||1600,y:MAPS[27].sy||1600});
               const el=document.getElementById('warpov');const a=el.classList.contains('rg');let b=false;for(let i=0;i<60&&WARP.on;i++){await w(30);if(el.classList.contains('rg')){b=true;break}}
               WARP.max=2000;rgSrc=_rs;while(WARP.on)await w(30);WARP.min=280;return[a,b,el.querySelector('.rgi').getAttribute('src')]}""")
            rep('ภาพยังไม่มา → ใช้กราดิเอนต์เดิมก่อน แล้วภาพขึ้นทันทีที่โหลดเสร็จ',(not r[0]) and r[1] and 'rg05' in (r[2] or ''),r)
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));MAPS[9876]={n:'ห้องทดสอบ',bg:'#203040'};warpShow(9876);await w(200);const el=document.getElementById('warpov');const x=el.classList.contains('rg');warpHide();delete MAPS[9876];await w(300);
               RGC.off=1;enterMap(30,{x:MAPS[30].sx||1600,y:MAPS[30].sy||1600});await w(300);const y=el.classList.contains('rg');while(WARP.on)await w(30);RGC.off=0;return[x,y]}""")
            rep('แมพนอกรายการ (ดัน/ห้องพิเศษ) และ RGC.off=1 → หน้าวาร์ปแบบเดิม',r==[False,False],r)
            await pg.set_viewport_size({'width':412,'height':860});await pg.wait_for_timeout(600)
            task=asyncio.ensure_future(pg.evaluate(GO,[38,1]))
            for i in range(80):
                await asyncio.sleep(.05)
                if await pg.evaluate("()=>!!window.__shot"):break
            await pg.wait_for_timeout(350);await pg.screenshot(path=O+'t637_port.jpg',type='jpeg',quality=82);await pg.evaluate("()=>{window.__shot=0}")
            c=await task
            rep('จอแนวตั้ง: การ์ดภาค 8 ขึ้นเต็มจอ',(c['seen'] or {}).get('ok') and 'rg08' in (c['seen'] or {}).get('src',''),c)
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(800);const f=()=>{const v=document.getElementById('vzf');return!!v&&v.classList.contains('on')&&getComputedStyle(v).display!=='none'};
               const v0=document.getElementById('vzf');if(v0)v0.classList.remove('on');enterMap(39,{x:MAPS[39].sx||1600,y:MAPS[39].sy||1600});await w(120);const during=WARP.on&&f();while(WARP.on)await w(30);await w(500);return[during,f()]}""")
            rep('ป้ายชื่อแมพเดิมไม่ทับการ์ดภาค: เลื่อนไปขึ้นหลังวาร์ปปิด',r==[False,True],r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>RGC.err||''"),errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
