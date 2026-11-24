import asyncio, sys, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
import numpy as np
from PIL import Image
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true}"
CAP="async()=>{const c=document.querySelector('#cgov canvas.lcg');return c?c.toDataURL('image/png'):null}"
def arr(d):import base64;return np.array(Image.open(io.BytesIO(base64.b64decode(d.split(',')[1]))).convert('RGBA')).astype(int)
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Lt1',80]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            await pg.evaluate("n=>cgShow(n)",6);await pg.wait_for_timeout(2200)
            r=await pg.evaluate("()=>{const d=CGX.el,c=d.querySelector('canvas.lcg');return[d.classList.contains('lcgon'),!!c&&getComputedStyle(c).display,LCG.R&&LCG.R.n,LCG.st.err,getComputedStyle(d.querySelector('.fg')).opacity]}")
            rep('คัตซีนเปิดภาพ → ใช้ภาพมีชีวิต (canvas แสดง ภาพนิ่งซ่อน)',r[0] and r[1]=='block' and r[2]==6 and r[3]=='' and r[4]=='0',r)
            a1=arr(await pg.evaluate(CAP));await pg.wait_for_timeout(900);a2=arr(await pg.evaluate(CAP))
            cov=float((a1[...,3]>250).mean());br=float(a1[...,:3].mean());df=float(np.abs(a1[...,:3]-a2[...,:3]).mean())
            rep('เต็มจอ มีภาพจริง (ไม่ดำ/ไม่โปร่ง)',cov>.99 and br>40,(cov,br))
            rep('ภาพขยับจริง (สองเฟรมห่าง 0.9 วิ ต่างกัน)',df>1.0,df)
            el=await pg.screenshot();im=np.array(Image.open(io.BytesIO(el)).convert('L'))
            rep('ภาพบนจอไม่ดำ (มองเห็นจริงใต้ UI)',im.mean()>40,im.mean())
            # ทุกฉาก
            r=await pg.evaluate("""async()=>{const bad=[];for(let n=1;n<=29;n++){cgShow(n);for(let i=0;i<60&&!(CGX.img[n].complete&&CGX.img[n].naturalWidth);i++)await new Promise(r=>setTimeout(r,100));await new Promise(r=>setTimeout(r,350));
               if(LCG.R.n!==n||LCG.st.err)bad.push([n,LCG.R.n,LCG.st.err])}return[bad,Object.keys(LCG.S).length]}""")
            rep('ครบ 29 ฉาก วาดได้ไม่มี error',r[0]==[] and r[1]==29,r)
            r=await pg.evaluate("async()=>{cgHide();await new Promise(r=>setTimeout(r,1400));return[LCG.R.alive,CGX.el.classList.contains('lcgon')]}")
            rep('ปิดภาพ → หยุดวาด (ไม่กินเครื่องต่อ)',r==[False,False],r)
            r=await pg.evaluate("async()=>{const f0=LCG.st.fr;await new Promise(r=>setTimeout(r,800));return LCG.st.fr-f0}")
            rep('ไม่มีเฟรมวิ่งตอนไม่มีภาพ',r==0,r)
            r=await pg.evaluate("async()=>{LCG.on=0;cgShow(3);await new Promise(r=>setTimeout(r,1500));const a=[CGX.el.classList.contains('lcgon'),getComputedStyle(CGX.el.querySelector('.fg')).opacity];cgHide();LCG.on=1;await new Promise(r=>setTimeout(r,1200));return a}")
            rep('ปิดสวิตช์ LCG.on=0 → กลับเป็นภาพนิ่งแบบเดิม',r==[False,'1'],r)
            r=await pg.evaluate("async()=>{LOWQ=true;try{applyQ()}catch(e){}cgShow(18);await new Promise(r=>setTimeout(r,1200));const f0=LCG.st.fr,t0=performance.now();await new Promise(r=>setTimeout(r,1000));const fps=(LCG.st.fr-f0)/((performance.now()-t0)/1000);const np=LCG.R.P.length;cgHide();LOWQ=false;try{applyQ()}catch(e){}await new Promise(r=>setTimeout(r,1200));return[fps,np]}")
            rep('โหมดประหยัด: ≤ 32 fps และอนุภาคน้อยลง',r[0]<=33 and r[1]<30,r)
            # แกลเลอรี
            r=await pg.evaluate("""async()=>{me.cgv=0x1fffffff;cgView(16);await new Promise(r=>setTimeout(r,1500));const v=document.getElementById('cgview'),c=v&&v.querySelector('canvas.lcg'),b=c&&c.getBoundingClientRect(),i=v.querySelector('img').getBoundingClientRect();
               const a=[!!c,LCG.V&&LCG.V.n,LCG.V&&LCG.V.alive,b&&Math.abs(b.width-i.width)<2&&Math.abs(b.top-i.top)<2];v.querySelector('.r').click();await new Promise(r=>setTimeout(r,800));a.push(LCG.V.n);v.querySelector('.x').click();await new Promise(r=>setTimeout(r,300));a.push(LCG.V.alive);return a}""")
            rep('แกลเลอรี: ภาพเต็มขยับ ตรงกับกรอบภาพ · กดถัดไปเปลี่ยนฉาก · ปิดแล้วหยุด',r[0] and r[1]==16 and r[2] and r[3] and r[4]==17 and r[5] is False,r)
            # แนวตั้ง
            pg2=await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            pg2.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg2.goto(URL);await pg2.wait_for_timeout(3500);await pg2.evaluate(SETUP,['mage','Lt2',80]);await pg2.wait_for_timeout(3500);await pg2.evaluate(CL)
            await pg2.evaluate("n=>cgShow(n)",20);await pg2.wait_for_timeout(2200)
            a=arr(await pg2.evaluate(CAP));H=a.shape[0];rows=(a[...,3]>200).mean(axis=1);top=int(np.argmax(rows>.9));bot=H-int(np.argmax(rows[::-1]>.9))
            rep('จอแนวตั้ง: เห็นทั้งภาพ วางสูงกว่ากลาง ที่เหลือโปร่งให้ฉากหลังเบลอ',.9<(bot-top)/(a.shape[1]/1.5)<1.1 and (top+bot)/2<H/2 and rows[5]<.1,(top,bot,H))
            await pg2.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/lcg/port20.jpg',type='jpeg',quality=75)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
