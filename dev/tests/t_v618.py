"""v618 ลดการวาดซ้ำ: ภาพเฟรมเดียวกันเปิด/ปิดแต่ละสวิตช์ต้องเหมือนกัน · นับพิกเซลที่ลดลง · ผนังท้องวาฬจำกัด % เลือด"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):
    R.append(ok);print(('PASS ' if ok else 'FAIL ')+n,d,flush=True)
CMP=r"""async([sw,pre])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons=[];run=false;await w(80);
  const shot=()=>{const x=document.createElement('canvas');x.width=120;x.height=260;const X=x.getContext('2d');X.imageSmoothingQuality='high';X.drawImage(cv,0,0,120,260);return X.getImageData(0,0,120,260).data};
  const P=performance.now;const T=P.call(performance);performance.now=()=>T;const rnd=Math.random;let seed=1;const sr=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
  const pass=(off)=>{eval(sw+'.off='+off);seed=1;Math.random=sr;try{eval(pre||'');draw();seed=1;draw();seed=1;draw()}finally{Math.random=rnd}return shot()};
  try{const A=pass(0),B=pass(1);let s=0,mx=0,n=0;for(let i=0;i<A.length;i+=4)for(let c=0;c<3;c++){const d=Math.abs(A[i+c]-B[i+c]);s+=d;if(d>mx)mx=d;n++}return [+(s/n).toFixed(3),mx]}
  finally{performance.now=P;eval(sw+'.off=0');run=true}}"""
PIX=r"""async()=>{const C=CanvasRenderingContext2D.prototype,od=C.drawImage,ofr=C.fillRect;let on=1,fr=0,tot=0;
const add=(ctx,x,y,w,h)=>{if(ctx!==g)return;const M=ctx.getTransform();let X0=M.a*x+M.e,Y0=M.d*y+M.f,X1=X0+M.a*w,Y1=Y0+M.d*h;if(X1<X0)[X0,X1]=[X1,X0];if(Y1<Y0)[Y0,Y1]=[Y1,Y0];tot+=Math.max(0,Math.min(cv.width,X1)-Math.max(0,X0))*Math.max(0,Math.min(cv.height,Y1)-Math.max(0,Y0))};
C.drawImage=function(){const a=arguments,n=a.length;if(n===3)add(this,a[1],a[2],a[0].width,a[0].height);else if(n===5)add(this,a[1],a[2],a[3],a[4]);else add(this,a[5],a[6],a[7],a[8]);return od.apply(this,a)};
C.fillRect=function(x,y,w,h){add(this,x,y,w,h);return ofr.apply(this,arguments)};const cnt=()=>{if(on){fr++;requestAnimationFrame(cnt)}};requestAnimationFrame(cnt);
await new Promise(r=>setTimeout(r,1500));on=0;C.drawImage=od;C.fillRect=ofr;return +(tot/Math.max(1,fr)/(cv.width*cv.height)).toFixed(2)}"""
async def go(pg,mp,x=None,y=None,dnh=12):
    await pg.evaluate(f"()=>{{window.DNH={dnh};HDI.on=true;LOWQ=false;AUTO.on=false;gmGod=true;ov.hidden=true;const M=MAPS[{mp}];enterMap({mp},{{x:{x or 'M.sx||1600'},y:{y or 'M.sy||1600'}}})}}"); await pg.wait_for_timeout(5000)
    await pg.evaluate("()=>{ov.hidden=true;banner=null;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); pg = await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage','Wq'+str(random.randint(100,999)),99]); await pg.wait_for_timeout(1500)
            # ① นครรากลึก
            await go(pg,44,1600,1900)
            a=await pg.evaluate("()=>[MX.cov===curMap,MX.skipBg]")
            FULL=r'''async()=>{const C=CanvasRenderingContext2D.prototype,of=C.fillRect;let full=0,fr=0,on=1;C.fillRect=function(x,y,w,h){if(on&&this===g&&w>=SW0*.9&&h>=H*.9){const st=(new Error().stack||'').split('\n')[2]||'';if(/at draw /.test(st))full++}return of.apply(this,arguments)};const cnt=()=>{if(on){fr++;requestAnimationFrame(cnt)}};requestAnimationFrame(cnt);await new Promise(r=>setTimeout(r,1200));on=0;C.fillRect=of;return +(full/Math.max(1,fr)).toFixed(2)}'''
            p1=await pg.evaluate(FULL); await pg.evaluate("()=>{PLCV.off=1;MX.cov=0}"); await pg.wait_for_timeout(300); p0=await pg.evaluate(FULL); await pg.evaluate("()=>{PLCV.off=0}"); await pg.wait_for_timeout(300)
            rep('นครรากลึก: พื้นชิ้นพาเลตครบ → ไม่เทพื้นหลังเต็มจอ (ปิด PLCV = เททุกเฟรม)',a==[True,True] and p1<.2 and p0>.9,[a,p0,p1])
            d=await pg.evaluate(CMP,['PLCV','MX.cov=0'])
            rep('นครรากลึก: ภาพเปิด/ปิด PLCV เหมือนกัน',d[0]<.3,d)
            # ② ③ ⑦ ค่าย
            await go(pg,1,1600,1600)
            c=await pg.evaluate("()=>[CPO.r|0,CPO.sk>0,MX.cov]")
            rep('ค่าย: วัดวงทึบของภาพค่ายได้ (≥ 400) · ข้ามชิ้นพื้นใต้ภาพค่าย · พื้นนับว่าครบ',c[0]>=400 and c[1] and c[2]==1,c)
            for sw in ('CPO','MXCV','DFO'):
                d=await pg.evaluate(CMP,[sw,''])
                rep(f'ค่าย: ภาพเปิด/ปิด {sw} เหมือนกัน',d[0]<.3,d)
            # ④ ⑤ แมพมืด
            await go(pg,22)
            d=await pg.evaluate(CMP,['NTM',''])
            rep('ห้วงบัลลังก์เงา: รวมสีย้อม+ความมืดชั้นเดียว ภาพเหมือนเดิม (ต่างแค่การปัดสี ≤ 4/255)',d[0]<1 and d[1]<=4,d)
            d=await pg.evaluate(CMP,['NLD',''])
            rep('ห้วงบัลลังก์เงา: ตัดแสงมอนซ้ำ ภาพต่างน้อยมาก',d[0]<1.5,d)
            await go(pg,7,None,None,17.2)
            d=await pg.evaluate(CMP,['NTM',''])
            rep('ช่วงเย็น (แมพทั่วไป): รวมสีย้อมกับความมืด ภาพเหมือนเดิม',d[0]<.3,d)
            # ⑥ ผนังท้องวาฬ
            s=await pg.evaluate("()=>{const mh=me.mh;const a=wbSqD(uid,45*999),b=wbSqD(uid,10);const o=others;others={zz:{mh:5000,hp:5000}};let c;try{c=wbSqD('zz',45*999)}finally{others=o};return [a/mh,b,c]}")
            rep('ผนังท้องวาฬ: แรงสุด 35% เลือด · ดาเมจน้อยไม่เปลี่ยน · คนอื่นคิดจากเลือดเขา',abs(s[0]-.35)<.01 and s[1]==10 and s[2]==1750,s)
            rep('ไม่มี error หน้าเว็บ',not errs,errs[:3])
    finally: p.terminate()
asyncio.run(main())
print('SUMMARY',sum(R),'/',len(R))
