import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
import numpy as np
from PIL import Image
import io
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;try{ov.hidden=true}catch(e){}}"
def magenta(png):
    b=np.array(Image.open(io.BytesIO(png)).convert('RGB')).astype(int)
    return float(((b[...,0]-b[...,1]>50)&(b[...,2]-b[...,1]>50)&(np.abs(b[...,0]-b[...,2])<70)).mean())
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(5000)
            # PERF-01
            r=await pg.evaluate("async()=>{const a=PERF.st.ttlSkip;let n=0;const d0=draw;window.draw=draw=function(){n++;return d0.apply(this,arguments)};await new Promise(r=>setTimeout(r,1000));window.draw=draw=d0;return[PERF.st.ttlSkip-a,n,perfTtlCover()]}")
            rep('หน้าเริ่มเกม: ไม่เรียกวาดโลกเกม (ข้ามทุกเฟรม)',r[0]>20 and r[1]==0 and r[2],r)
            await pg.evaluate("()=>{PERF.ttl=0;window.__d0=draw;window.draw=draw=function(){g.setTransform(1,0,0,1,0,0);g.fillStyle='#ff00ff';g.fillRect(0,0,cv.width,cv.height)}}");await pg.wait_for_timeout(600)
            m=magenta(await pg.screenshot())
            await pg.evaluate("()=>{window.draw=draw=window.__d0;PERF.ttl=1}")
            rep('หน้าเริ่มเกมบังโลกเกมมิด (ทาโลกเป็นม่วงแล้วมองไม่เห็นเลย)',m<0.001,m)
            await pg.evaluate(SETUP,['mage','Pv'+str(random.randint(100,999)),80]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            r=await pg.evaluate("async()=>{let n=0;const d0=draw;window.draw=draw=function(){n++;return d0.apply(this,arguments)};await new Promise(r=>setTimeout(r,1000));window.draw=draw=d0;return[n,perfTtlCover(),!!document.getElementById('ttl')]}")
            rep('เข้าเกมแล้ว: วาดโลกเต็มอัตราตามปกติ',r[0]>=15 and not r[1],r)
            # PERF-04
            r=await pg.evaluate("async()=>{await new Promise(r=>setTimeout(r,2500));return[TT3.cv?TT3.cv.width:-1,TT3.cv?TT3.cv.isConnected:null]}")
            rep('canvas หน้าเริ่มเกมถูกคืนหน่วยความจำหลังเข้าเกม',r[0] in (0,-1),r)
            # PERF-06
            r=await pg.evaluate("""async()=>{const cnt=async()=>{let n=0;const d0=draw;window.draw=draw=function(){n++;return d0.apply(this,arguments)};let f=0;const t0=performance.now();await new Promise(r=>{const k=()=>{f++;if(performance.now()-t0<1500)requestAnimationFrame(k);else r()};requestAnimationFrame(k)});window.draw=draw=d0;return[n,f]};
              ov.hidden=true;const a=await cnt();ov.hidden=false;gearUI();PERF.menuFps=5;const b=await cnt();PERF.menuFps=20;const gp=$('gpv');PERF.menu=0;const c=await cnt();PERF.menu=1;ov.hidden=true;const d=await cnt();return[a,b,c,d,!!gp]}""")
            a,bb,c,d,gp=r
            rep('เปิดเมนู: วาดโลกข้างหลังตามเพดาน fps ที่ตั้ง (ทดสอบที่ 5 fps → ราว 7 ครั้งใน 1.5 วิ) แต่เฟรมจริงยังวิ่งเต็ม',5<=bb[0]<=9 and bb[1]>=bb[0]*2,r)
            rep('ปิดเมนู/ปิดสวิตช์: วาดทุกเฟรมตามเดิม',a[0]>=a[1]-2 and c[0]>=c[1]-2 and d[0]>=d[1]-2,r)
            # ภาพตอนเปิดเมนู: โลกข้างหลังยังแสดง (ไม่ว่าง)
            await pg.evaluate("()=>{ov.hidden=false;gearUI()}");await pg.wait_for_timeout(600)
            img=np.array(Image.open(io.BytesIO(await pg.screenshot())).convert('L')).astype(int)
            await pg.evaluate("()=>{ov.hidden=true}")
            rep('เปิดเมนู: ฉากข้างหลังยังมีภาพ (ไม่ดำ/ไม่ค้างว่าง)',img.std()>12,img.std())
            # PERF-03 อัสตรา
            r=await pg.evaluate("""async()=>{PERF.relMs=1500;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3000));for(let i=0;i<80&&(AST.ok!==1||AST.re||!CG.c);i++)await new Promise(r=>setTimeout(r,150));const a=[!!CG.c,!!CW.c];
               enterMap(1,{x:1600,y:1700});await new Promise(r=>setTimeout(r,4500));const b=[!!CG.c,!!CW.c];
               enterMap(2,{x:MAPS[2].sx,y:MAPS[2].sy});await new Promise(r=>setTimeout(r,5000));const c=[!!CG.c,!!CW.c,PERF.st.rel.astra|0];
               enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3500));for(let i=0;i<80&&(AST.re||!CG.c||!CW.c);i++)await new Promise(r=>setTimeout(r,150));const d=[!!CG.c,!!CW.c,!!CG.ast];PERF.relMs=60000;return[a,b,c,d,cpwNb().has(1),cpwNb().has(2)]}""")
            rep('อัสตรา: ค่าย (แมพติดเมือง) ยังเก็บแคชไว้ · แมพไกล (2) คืนแคช · กลับเข้าเมืองสร้างใหม่ครบ',r[0]==[True,True] and r[1]==[True,True] and r[2][:2]==[False,False] and r[2][2]>=1 and r[3]==[True,True,True] and r[4] and not r[5],r)
            # PERF-03 นครรากลึก
            r=await pg.evaluate("""async()=>{PERF.relMs=1500;enterMap(44,{x:MAPS[44].sx,y:MAPS[44].sy});await new Promise(r=>setTimeout(r,3500));const a=Object.keys(PBTC).length;enterMap(2,{x:MAPS[2].sx,y:MAPS[2].sy});await new Promise(r=>setTimeout(r,5000));const b=Object.keys(PBTC).length;
               enterMap(44,{x:MAPS[44].sx,y:MAPS[44].sy});await new Promise(r=>setTimeout(r,3500));const c=Object.keys(PBTC).length;PERF.relMs=60000;return[a,b,c,Object.keys(DFOV).length]}""")
            rep('นครรากลึก: ออกไปแมพไกลคืนสไปรต์ลำต้น · กลับมาสร้างใหม่',r[0]>0 and r[1]==0 and r[2]>0,r)
            await pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/probe/v654_44.jpg',type='jpeg',quality=70)
            # PERF-05: ฟังก์ชันตั้งคิวตอนเครื่องว่าง (จำลอง AC กำลังเล่น)
            r=await pg.evaluate("""async()=>{const o=window.rkWarm;let n=0;window.rkWarm=rkWarm=function(){n++};let fake=false;try{if(typeof AC==='undefined'||!AC){window.AC={state:'running'};fake=true}}catch(e){}const ms=musOff;window.musOff=musOff=()=>false;const st0=AC.state;try{AC.state='running'}catch(e){}
               await new Promise(r=>setTimeout(r,5000));window.rkWarm=rkWarm=o;window.musOff=musOff=ms;return[n,PERF.st.rkIdle]}""")
            rep('เตรียมเสียง: ทำผ่านคิวตอนเครื่องว่าง',r[1]>=1,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
