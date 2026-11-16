import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
PROBE="""(o)=>{const G0=g,c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');if(o.fill){x.fillStyle=o.fill;x.fillRect(0,0,c.width,c.height)}
  const m0=mons.slice(),C0=HDL.Cp;mons.length=0;HDL.Cp=o.C||[];POP.test=1;window.DNH=o.h||11;const n0=POP.n;g=x;try{popGround()}finally{g=G0;mons.push(...m0);HDL.Cp=C0;POP.test=0}
  const z=(ZM.z||1)*DPR,at=(X,Y)=>Array.from(x.getImageData(Math.round(X),Math.round(Y),1,1).data),sat=p=>{const mx=Math.max(p[0],p[1],p[2]),mn=Math.min(p[0],p[1],p[2]);return mx?((mx-mn)/mx):0};
  const pc=at((me.x-cam.x)*z,(me.y-cam.y)*z),cc=at(4,4),ws=o.w?at((o.w[0]-cam.x)*z,(o.w[1]-cam.y)*z):null;
  return{n:POP.n-n0,me:pc,corner:cc,sMe:+sat(pc).toFixed(3),sCor:+sat(cc).toFixed(3),ws}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate('()=>{window.__hd2=1}')
            await pg.evaluate(SETUP,['assn','T47'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;HD2.on=1;HD2.fq=999;FQ.avg=10;LOWQ=false;window.DNH=11}");await pg.wait_for_timeout(1000)
            r=await pg.evaluate("async()=>{const n=POP.n;await new Promise(r=>setTimeout(r,500));return[POP.on,POP.n-n]}")
            rep('เปิดเป็นค่าเริ่มต้น และทำงานในเกมจริง (เงาใต้เท้าทุกตัว)',r[0]==1 and r[1]>3,r)
            r=await pg.evaluate(PROBE,{'fill':'rgb(210,140,60)'})
            rep('พื้นขอบจอหม่น+มืดลง แต่รอบตัวเรายังสด',r['sCor']<r['sMe']-.12 and sum(r['corner'][:3])<sum(r['me'][:3])-40,r)
            r=await pg.evaluate("(P)=>{const f=eval(P);return f({fill:'rgb(120,120,120)'})}",PROBE)
            rep('รอบตัวเราสว่างกว่าพื้นเดิม (สปอตไลต์)',sum(r['me'][:3])>360+6,r)
            r=await pg.evaluate("(P)=>{const f=eval(P);return f({C:[[me.x+60,me.y+15,1]],w:[me.x+60,me.y+15]})}",PROBE)
            rep('เงาใต้เท้าตัวละคร: มีเงาเข้มที่ตำแหน่งเท้า',r['ws'] and r['ws'][3]>90,r)
            r=await pg.evaluate("(P)=>{const f=eval(P);const o=[];POP.on=0;o.push(f({C:[[me.x,me.y,1]]}).n);POP.on=1;HD2.on=0;o.push(f({C:[[me.x,me.y,1]]}).n);HD2.on=1;LOWQ=true;o.push(f({C:[[me.x,me.y,1]]}).n);LOWQ=false;return o}",PROBE)
            rep('ปิดได้: ปิดเฉพาะข้อนี้ / ปิดลุค HD-2D / โหมดประหยัด',r==[0,0,0],r)
            r=await pg.evaluate("""async()=>{cfgUI();await new Promise(r=>setTimeout(r,300));const b=document.querySelector('[data-hd2pop] button');if(!b)return['no row'];const t0=b.textContent;b.click();await new Promise(r=>setTimeout(r,100));const o=[t0,b.textContent,POP.on,localStorage.getItem('refugee_hd2pop')];b.click();return o}""")
            rep('ตั้งค่า: แถว 🔆 เปิด/ปิด + จำในเครื่อง',r==['เปิดอยู่','ปิดอยู่',0,'0'],r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>POP.err||HDL.err||HD2.err"),[errs,await pg.evaluate("()=>[POP.err,HDL.err,HD2.err]")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
