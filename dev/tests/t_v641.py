import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
SHARP="""()=>{const C=cv,W=C.width,H=C.height,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(C,0,0);const d=x.getImageData(0,0,W,H).data;
 const band=(y0,y1)=>{let s=0,n=0;for(let y=Math.floor(H*y0);y<Math.floor(H*y1);y+=2)for(let X=Math.floor(W*.3);X<Math.floor(W*.7);X+=2){const i=(y*W+X)*4,j=i+8;s+=Math.abs(d[i]-d[j])+Math.abs(d[i+1]-d[j+1]);n++}return s/n};return[band(.02,.12),band(.45,.55)]}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T41'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000)
            r=await pg.evaluate("async()=>{const n=HD2.n;await new Promise(r=>setTimeout(r,600));return[HD2.on,HD2.n-n]}")
            rep('ช่วงทดลอง: ปิดเป็นค่าเริ่มต้น (ไม่ทำงานเลย)',r==[0,0],r)
            r=await pg.evaluate("""async()=>{cfgUI();await new Promise(r=>setTimeout(r,300));const b=document.querySelector('[data-hd2row] button');if(!b)return['no row'];const t0=b.textContent;b.click();await new Promise(r=>setTimeout(r,100));
              return[t0,b.textContent,HD2.on,localStorage.getItem('refugee_hd2')]}""")
            rep('ตั้งค่า → คุณภาพภาพ มีแถว «ลุค HD-2D» กดแล้วเปิด + จำในเครื่อง',r==['ปิดอยู่','เปิดอยู่',1,'1'],r)
            await pg.evaluate("()=>{ov.hidden=true}")
            await pg.evaluate("()=>{HD2.on=0}");await pg.wait_for_timeout(500);off=await pg.evaluate(SHARP)
            await pg.evaluate("()=>{HD2.on=1;HD2.fq=999;LOWQ=false}");await pg.wait_for_timeout(500)
            r=await pg.evaluate("async()=>{const n=HD2.n;await new Promise(r=>setTimeout(r,500));return HD2.n-n}");on=await pg.evaluate(SHARP)
            rep('เปิดแล้วทำงานทุกเฟรม',r>3,r)
            rep('ขอบบนของจอเบลอลงชัดเจน แต่กลางจอยังคม (tilt-shift)',on[0]<off[0]*.7 and on[1]>off[1]*.75,[off,on])
            r=await pg.evaluate("async()=>{HD2.fq=27;FQ.avg=99;const n=HD2.n;await new Promise(r=>setTimeout(r,400));const a=HD2.n-n;FQ.avg=10;LOWQ=true;const m=HD2.n;await new Promise(r=>setTimeout(r,400));const b=HD2.n-m;LOWQ=false;return[a,b]}")
            rep('เครื่องหน่วง / โหมดประหยัด → ปิดเอง',r==[0,0],r)
            r=await pg.evaluate("()=>{hd2Set(0);return[HD2.on,localStorage.getItem('refugee_hd2')]}")
            rep('ปิดได้ และจำในเครื่อง',r==[0,'0'],r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>HD2.err"),errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
