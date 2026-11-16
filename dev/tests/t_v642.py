import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate('()=>{window.__hd2=1}')
            await pg.evaluate(SETUP,['archer','T42'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000)
            r=await pg.evaluate("()=>[HD2.on,HD2.pv,localStorage.getItem('refugee_hd2')]")
            rep('ลุค HD-2D + ฉากเอียงเปิดเป็นค่าเริ่มต้น',r[0]==1 and r[1]==1,r)
            await pg.evaluate("()=>{HD2.fq=999;FQ.avg=10;LOWQ=false}");await pg.wait_for_timeout(500)
            r=await pg.evaluate("async()=>{const n=HD2.n;await new Promise(r=>setTimeout(r,500));return[HD2.n-n,HD2.pvA]}")
            rep('ทำงานทุกเฟรม พร้อมฉากเอียง',r[0]>3 and r[1]==1,r)
            r=await pg.evaluate("()=>{let m=0;for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){const a=hd2Fwd(i/20,j/20),b=hd2Inv(a[0],a[1]);m=Math.max(m,Math.abs(b[0]-i/20),Math.abs(b[1]-j/20))}const c=hd2Fwd(.5,.5),t=hd2Fwd(0,0),u=hd2Fwd(0,1);return[m,c,t,u]}")
            rep('สูตรเอียง/ผกผันตรงกัน · กลางจอไม่ขยับ · บนแคบ ล่างกว้าง',r[0]<1e-6 and abs(r[1][0]-.5)<1e-9 and abs(r[1][1]-.5)<1e-9 and r[2][0]>0.05 and r[3][0]<-0.05,r)
            # ภาพจริง: จุดสว่างที่ตำแหน่งโลกใกล้มุมบนซ้าย ต้องไปโผล่ตามสูตร
            r=await pg.evaluate("""async()=>{HD2.du=0;HD2.bl=0;HD2.ts=0;HD2.gr=0;HD2.hz=0;const z=ZM.z,tx=.2,ty=.15,wx=cam.x+tx*W/z,wy=cam.y+ty*H/z;
              const o=zmPost;zmPost=function(){g.save();g.setTransform(DPR*z,0,0,DPR*z,-cam.x*DPR*z,-cam.y*DPR*z);g.fillStyle='#ff00ff';g.fillRect(wx-3,wy-3,6,6);g.restore();return o.apply(this,arguments)};
              await new Promise(r=>setTimeout(r,300));const C=cv,c=document.createElement('canvas');c.width=C.width;c.height=C.height;const x=c.getContext('2d');x.drawImage(C,0,0);const d=x.getImageData(0,0,C.width,C.height).data;zmPost=o;
              let sx=0,sy=0,n=0;const ff=hd2Fwd(tx,ty);for(let y=Math.floor(C.height*(ff[1]-.06));y<C.height*(ff[1]+.06);y+=1)for(let X=Math.floor(C.width*(ff[0]-.06));X<C.width*(ff[0]+.06);X+=1){const i=(y*C.width+X)*4;if(d[i]+d[i+2]-2*d[i+1]>180){sx+=X;sy+=y;n++}}
              HD2.du=HD2.bl=HD2.ts=HD2.gr=HD2.hz=1;const f=hd2Fwd(tx,ty);return[n,sx/n/C.width,sy/n/C.height,f]}""")
            rep('ภาพที่ออกมาเอียงตามสูตรจริง (จุดทดสอบมุมบนซ้าย)',r[0]>4 and abs(r[1]-r[3][0])<.012 and abs(r[2]-r[3][1])<.012,r)
            r=await pg.evaluate("""()=>{const z=ZM.z;mons.length=0;const tx=.22,ty=.2,f=hd2Fwd(tx,ty),wx=cam.x+tx*W/z,wy=cam.y+ty*H/z;
              mons.push({id:'tq1',t:Object.keys(MT)[0],x:wx,y:wy,hp:100,mh:100,sl:0});lockId=null;tapTarget({x:f[0]*W,y:f[1]*H});const a=lockId;
              lockId=null;HD2.pvA=0;tapTarget({x:tx*W,y:ty*H});const b=lockId;HD2.pvA=1;mons.length=0;return[a,b]}""")
            rep('แตะมอนสเตอร์ตรงภาพที่เอียงแล้ว → เล็งถูกตัว',r==['tq1','tq1'],r)
            r=await pg.evaluate("""async()=>{cfgUI();await new Promise(r=>setTimeout(r,300));const b=document.querySelector('[data-hd2pv] button'),a=document.querySelector('[data-hd2row] button');if(!b)return['no row'];const t0=b.textContent;b.click();await new Promise(r=>setTimeout(r,100));
              const n=HD2.n;await new Promise(r=>setTimeout(r,300));return[a.textContent,t0,b.textContent,HD2.pv,HD2.pvA,localStorage.getItem('refugee_hd2pv'),HD2.n-n>0]}""")
            rep('ตั้งค่า: แถว «ฉากเอียงลึก» ปิดได้แยก (ลุคยังทำงาน) + จำในเครื่อง',r==['เปิดอยู่','เปิดอยู่','ปิดอยู่',0,0,'0',True],r)
            r=await pg.evaluate("()=>{hd2Set(0);hd2PvSet(1);return[HD2.on,localStorage.getItem('refugee_hd2')]}")
            await pg.wait_for_timeout(300);r2=await pg.evaluate("async()=>{const n=HD2.n;await new Promise(r=>setTimeout(r,300));return[HD2.n-n,HD2.pvA]}")
            rep('ปิดลุคทั้งหมดได้ → ไม่เอียง ไม่ทำงาน',r==[0,'0'] and r2==[0,0],[r,r2])
            r=await pg.evaluate("async()=>{hd2Set(1);HD2.fq=27;FQ.avg=99;await new Promise(r=>setTimeout(r,300));const a=HD2.pvA;FQ.avg=10;return a}")
            rep('เครื่องหน่วง → ปิดเอง และแตะจอกลับเป็นแบบไม่เอียง',r==0,r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>HD2.err"),[errs,await pg.evaluate("()=>HD2.err")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
