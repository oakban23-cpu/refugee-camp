import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
# แสงไฟส่องตัว: วาดลงแคนวาสเปล่า วัดความสว่างด้านที่หันเข้าหาไฟ vs ด้านตรงข้าม
RIM="""(o)=>{const G0=g,c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d'),z=(ZM.z||1)*DPR;
  const cx=cam.x+W/2,cy=cam.y+H/2,m0=mons.slice(),L0=HDL.L,C0=HDL.C;mons.length=0;window.DNH=22;HDL.L=o.L.map(l=>[cx+l[0],cy+l[1]-18,l[2],l[3],l[4]]);HDL.C=[[cx,cy,1]];const n0=HD3.n;g=x;try{hd3Rim()}finally{g=G0;mons.push(...m0);HDL.L=L0;HDL.C=C0}
  const d=x.getImageData(0,0,c.width,c.height).data,A=(dx,dy)=>{let s=[0,0,0],k=0;for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){const X=Math.round((W/2+dx)*DPR)+i,Y=Math.round((H/2+dy)*DPR)+j,q=(Y*c.width+X)*4;s[0]+=d[q];s[1]+=d[q+1];s[2]+=d[q+2];k++}return s.map(v=>v/k|0)};
  return{n:HD3.n-n0,L:A(-12,-18),Rr:A(12,-18)}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate('()=>{window.__hd2=1}')
            await pg.evaluate(SETUP,['archer','T45'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;HD2.on=1;HD2.fq=999;FQ.avg=10;LOWQ=false;window.DNH=22}");await pg.wait_for_timeout(1200)
            r=await pg.evaluate("()=>[HD2.rim,HD2.ray,HDL.Lp.filter(l=>typeof l[4]==='string').length,HDL.Lp.length]")
            rep('เปิดเป็นค่าเริ่มต้น + เก็บสีของแสงไฟแต่ละดวง',r[0]==1 and r[1]==1 and r[3]>2 and r[2]>=r[3]*.8,r)
            r=await pg.evaluate("async()=>{const n=HD3.n;await new Promise(r=>setTimeout(r,600));return HD3.n-n}")
            rep('ค่ายกลางคืน: ตัวละครใกล้กองไฟได้แสงส่อง',r>2,r)
            r=await pg.evaluate(RIM,{'L':[[-70,0,80,.6,'255,140,40']]})
            rep('ไฟอยู่ซ้าย → ด้านซ้ายของตัวสว่างกว่าด้านขวา และเป็นสีของไฟ (ส้ม)',r['n']>=1 and sum(r['L'])>sum(r['Rr'])+30 and r['L'][0]>r['L'][2]+20,r)
            r=await pg.evaluate(RIM,{'L':[[70,0,80,.6,'120,200,255']]})
            rep('ไฟสีฟ้าอยู่ขวา → ด้านขวาสว่างเป็นสีฟ้า',sum(r['Rr'])>sum(r['L'])+30 and r['Rr'][2]>r['Rr'][0]+20,r)
            r=await pg.evaluate(RIM,{'L':[[-400,0,60,.6,'255,140,40']]})
            rep('ไฟไกลเกินระยะ → ไม่ส่อง',r['n']==0,r)
            # ลำแสง
            async def ray(mp,h):
                await pg.evaluate("(m)=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;gmGod=true;if(curMap!==m)enterMap(m,{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600})}",mp)
                await pg.wait_for_timeout(3500)
                return await pg.evaluate("async(h)=>{ov.hidden=true;window.DNH=h;HD2.fq=999;FQ.avg=10;LOWQ=false;const n=HD3.rn;await new Promise(r=>setTimeout(r,500));return[curMap,HD3.rn-n,HD2.blA.toFixed(3)]}",h)
            a=await ray(32,10)
            rep('แมพที่มีลำแสง (ซากอารัณยา) กลางวัน → วาดลำแสง',a[0]==32 and a[1]>2,a)
            r=await pg.evaluate("""async()=>{const C=cv,grab=()=>{const x=document.createElement('canvas');x.width=C.width;x.height=C.height;x.getContext('2d').drawImage(C,0,0);return x.getContext('2d').getImageData(0,0,C.width,C.height).data};
              HD2.ray=0;await new Promise(r=>setTimeout(r,300));const a=grab();HD2.ray=1;await new Promise(r=>setTimeout(r,300));const b=grab();let s=0,n=0;for(let i=0;i<a.length;i+=4*61){s+=(b[i]+b[i+1]+b[i+2])-(a[i]+a[i+1]+a[i+2]);n++}return s/n}""")
            rep('ลำแสงทำให้ภาพสว่างขึ้นจริง',r>3,r)
            b2=await ray(1,10);c2=await ray(26,22)
            rep('ความแรงตามแมพ: แสงฟุ้งแมพมืด/กลางคืน (แกนพิภพ) แรงกว่าค่ายกลางวัน',float(c2[2])>float(b2[2])*1.2,[b2,c2])
            r=await pg.evaluate("async()=>{const n=HD3.rn;await new Promise(r=>setTimeout(r,400));return[curMap,HD3.rn-n]}")
            rep('แมพที่ไม่มีลำแสง (แกนพิภพ) → ไม่วาด',r[1]==0,r)
            r=await pg.evaluate("async()=>{HD2.on=0;const a=HD3.n,b=HD3.rn;await new Promise(r=>setTimeout(r,400));const o=[HD3.n-a,HD3.rn-b];HD2.on=1;return o}")
            rep('ปิดลุค HD-2D → ไม่มีแสงส่องตัว/ลำแสง',r==[0,0],r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>HD3.err||HDL.err||HD2.err"),[errs,await pg.evaluate("()=>[HD3.err,HDL.err,HD2.err]")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
