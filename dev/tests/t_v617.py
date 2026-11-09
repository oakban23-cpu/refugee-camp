"""v617 WLB: แสงกลางคืนรวมลงภาพความละเอียดต่ำ · แมพมืดใช้จริง · ไม่ error · ปิดได้ · ภาพใกล้เดิม · แมพที่ไม่มี worldLight ไม่ยุ่ง"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):
    R.append(ok);print(('PASS ' if ok else 'FAIL ')+n,d,flush=True)
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':390,'height':844})).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage','Wv'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{window.DNH=12;HDI.on=true;LOWQ=false;AUTO.on=false;gmGod=true;ov.hidden=true;enterMap(22,{x:MAPS[22].sx||1600,y:MAPS[22].sy||1600})}"); await pg.wait_for_timeout(3500)
            a=await pg.evaluate("async()=>{const n0=WLB.n;await new Promise(r=>setTimeout(r,800));return [WLB.n-n0,WLB.err,WLB.off,WLB.c&&WLB.c.width,cv.width,g===WLB.mg,GLW.g===g]}")
            rep('แมพ 22 (มืดถาวร): แสงรวมลงภาพเล็กทุกเฟรม · ไม่ error · คืน g/GLW ถูกต้อง',a[0]>5 and a[1]=='' and a[2]==0 and abs(a[3]-a[4]/3)<2 and a[5] and a[6],a)
            # เทียบภาพ: วาดเฟรมเดียวกันแบบเปิด/ปิด (หยุดเวลา) แล้วเทียบความสว่างเฉลี่ย
            d=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];run=false;await w(100);
              const shot=()=>{const x=document.createElement('canvas');x.width=96;x.height=208;x.getContext('2d').drawImage(cv,0,0,96,208);return x.getContext('2d').getImageData(0,0,96,208).data};
              const P=performance.now;const T=P.call(performance);performance.now=()=>T;
              try{WLB.off=0;draw();const A=shot();WLB.off=1;draw();const B=shot();let s=0,n=0;for(let i=0;i<A.length;i+=4){for(let c=0;c<3;c++){s+=Math.abs(A[i+c]-B[i+c]);n++}}return +(s/n).toFixed(2)}finally{performance.now=P;WLB.off=0;run=true}}""")
            rep('ภาพแสงเปิด/ปิด WLB ใกล้กัน (ต่างเฉลี่ย < 4 ต่อช่องสี)',d<4,d)
            b2=await pg.evaluate("async()=>{WLB.off=1;const n0=WLB.n;await new Promise(r=>setTimeout(r,600));const r=WLB.n-n0;WLB.off=0;return r}")
            rep('ปิด WLB.off=1 → กลับวิธีเดิม',b2==0,b2)
            await pg.evaluate("()=>{enterMap(44,{x:1600,y:1900})}"); await pg.wait_for_timeout(2500)
            c=await pg.evaluate("async()=>{const n0=WLB.n;await new Promise(r=>setTimeout(r,600));return [WLB.n-n0,WLB.in]}")
            rep('แมพที่ไม่มีแสงกลางคืน (44) ไม่ใช้ WLB',c==[0,0],c)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
