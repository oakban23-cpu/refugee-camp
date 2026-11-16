import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
# วาดเงาลงแคนวาสเปล่า (ทรานส์ฟอร์มโลกเดียวกับจอ) แล้ววัดความมืดรอบเท้า
PROBE="""(o)=>{const G0=g,c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d'),z=(ZM.z||1)*DPR;x.setTransform(z,0,0,z,-cam.x*z,-cam.y*z);
  const cx=cam.x+W/2,cy=cam.y+H/2,m0=mons.slice();mons.length=0;window.DNH=o.h;HDL.Lp=o.L.map(l=>[cx+l[0],cy+l[1],l[2],l[3]]);HDL.Cp=[[cx,cy,1]];const n0=HDL.n;g=x;try{hdlPass()}finally{g=G0;mons.push(...m0)}
  const d=x.getImageData(0,0,c.width,c.height).data,A=(dx,dy)=>{let s=0,k=0;for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){const X=Math.round((W/2+dx)*z/(ZM.z||1)*(ZM.z||1))+i,Y=Math.round((H/2+dy)*z/(ZM.z||1)*(ZM.z||1))+j;s+=d[(Y*c.width+X)*4+3];k++}return s/k};
  return{n:HDL.n-n0,R:A(28,0),Lf:A(-28,0),D:A(0,28),U:A(0,-28),r1:A(14,0),ul:A(-16,-9),ur:A(16,-9)}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate('()=>{window.__hd2=1}')
            await pg.evaluate(SETUP,['melee','T43'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;HD2.on=1;HD2.fq=999;FQ.avg=10;LOWQ=false;window.DNH=22}");await pg.wait_for_timeout(1200)
            r=await pg.evaluate("()=>[HDL.Lp.length,HDL.Cp.length,HDL.Lp.every(l=>isFinite(l[0])&&isFinite(l[1])),HD2.sh]")
            rep('เก็บตำแหน่งแสงและตัวละครทุกเฟรม (ค่ายตอนกลางคืน)',r[0]>2 and r[1]>2 and r[2] and r[3]==1,r)
            r=await pg.evaluate("async()=>{const n=HDL.n;await new Promise(r=>setTimeout(r,500));return HDL.n-n}")
            rep('วาดเงาจริงในเกม (รอบกองไฟ)',r>3,r)
            r=await pg.evaluate(PROBE,{'h':22,'L':[[-80,0,90,.6]]})
            rep('ไฟอยู่ซ้าย → เงาทอดไปทางขวา (ไม่ไปทางไฟ)',r['n']>=1 and r['R']>25 and r['R']>r['Lf']*3+10,r)
            r=await pg.evaluate(PROBE,{'h':22,'L':[[0,-80,90,.6]]})
            rep('ไฟอยู่บน → เงาทอดลงล่าง',r['D']>25 and r['D']>r['U']*3+10,r)
            a=await pg.evaluate(PROBE,{'h':22,'L':[[-40,0,90,.6]]});b2=await pg.evaluate(PROBE,{'h':22,'L':[[-200,0,90,.6]]})
            rep('ใกล้ไฟเงาเข้ม ไกลไฟเงาจาง/ไม่มี',a['r1']>b2['r1']+15,[a,b2])
            r=await pg.evaluate(PROBE,{'h':22,'L':[]})
            rep('กลางคืนไม่มีไฟใกล้ → ไม่มีเงาทอด',r['n']==0,r)
            r=await pg.evaluate("(P)=>{const f=eval(P);const a=f({h:9,L:[]}),b=f({h:16,L:[]});return[a,b]}",PROBE)
            rep('กลางวันกลางแจ้ง: เงาแดดเอียงตามเวลา (เช้าไปซ้าย บ่ายไปขวา)',r[0]['n']>=1 and r[0]['ul']>r[0]['ur']+8 and r[1]['ur']>r[1]['ul']+8,r)
            r=await pg.evaluate("(P)=>{const f=eval(P);HD2.sh=0;const a=f({h:22,L:[[-80,0,90,.6]]});HD2.sh=1;HD2.on=0;const b=f({h:22,L:[[-80,0,90,.6]]});HD2.on=1;LOWQ=true;const c=f({h:22,L:[[-80,0,90,.6]]});LOWQ=false;return[a.n,b.n,c.n]}",PROBE)
            rep('ปิดลุค HD-2D / ปิดเงา / โหมดประหยัด → ไม่วาด',r==[0,0,0],r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>HDL.err||HD2.err"),[errs,await pg.evaluate("()=>[HDL.err,HD2.err]")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
