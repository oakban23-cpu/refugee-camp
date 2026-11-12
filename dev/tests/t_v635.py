import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
# วาดบอสแยก: คืน [เวลา/ครั้ง, ผลรวม alpha, ผลต่างครึ่งบน, ผลต่างแถบเท้า] เทียบกับภาพ "ปิด" ที่ T เดียวกัน
ISO="""([mp,on,T,n])=>{const og=g,oc=curMap,ob=BXA.on,b3=BX3.on;FQ.avg=10;BXA.on=0;BX3.on=0;curMap=mp;
 const mk=()=>{const C=document.createElement('canvas');C.width=600;C.height=600;return C};
 const draw=(C,o,k)=>{const G=C.getContext('2d');let t0=performance.now();for(let i=0;i<k;i++){G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,600,600);BXM.on=o;g=G;g.setTransform(1.5,0,0,1.5,0,0);const m={id:777301,t:3,x:200,y:270,hp:100,mh:100,castT:0};if(!BMS[m.id])BMS[m.id]={x:m.x,y:m.y,t:performance.now()/1000,mv:0,dir:1,ph:0};
   const ly=gxLayerBegin();const G0=g;if(ly)g=ly;try{drawBossAnim(m,T,0,0,false);gxLayerBox(m.x,m.y-60,300,300)}finally{g=G0}gxLayerEnd(ly)}return(performance.now()-t0)/k};
 const A=mk(),B=mk();draw(A,0,1);const dt=draw(B,on,n);g=og;curMap=oc;BXA.on=ob;BX3.on=b3;BXM.on=1;
 const a=A.getContext('2d').getImageData(0,0,600,600).data,b=B.getContext('2d').getImageData(0,0,600,600).data;let sa=0,sb=0,dTop=0,dFeet=0;const fy=Math.round(300*1.5);
 for(let y=0;y<600;y++)for(let x=0;x<600;x++){const i=(y*600+x)*4+3;sa+=a[i];sb+=b[i];const d=Math.abs(a[i]-b[i]);if(y<fy-130)dTop+=d;else if(y>fy-14&&y<fy+6)dFeet+=d}
 return[dt,sa,sb,dTop,dFeet]}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T5'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(3000)
            rep('ติดตั้ง BXM (ห่อ drawBossAnim ชั้นนอกสุด)',await pg.evaluate("()=>BXM.on===1&&typeof bxmBlit==='function'&&/bxmBlit/.test(drawBossAnim.toString())"))
            r=await pg.evaluate(ISO,[3,1,10.9,1])
            rep('ตัวบนขยับ (ต่างจากแบบแข็ง) แต่เท้ายังอยู่ที่เดิม',r[3]>20000 and r[4]<r[3]*.08,[r[3],r[4]])
            rep('ไม่มีส่วนไหนของบอสหาย/ถูกตัด (ปริมาณเนื้อภาพเท่าเดิม ±4%)',abs(r[2]-r[1])<r[1]*.04,[r[1],r[2]])
            r2=await pg.evaluate(ISO,[3,0,10.9,1])
            rep('BXM.on=0 → ภาพเหมือนเดิมทุกพิกเซล',r2[3]==0 and r2[4]==0,r2)
            # สปริง: โดนตี → ตัวบนเหวี่ยง แล้วกลับมานิ่ง
            await pg.evaluate("()=>{const now=performance.now()/1000;BXM.s[777301]={x:0,v:-95,y:0,vy:-40,t:now,px:200,hf:0,ck:0,ld:0,ph:0}}")
            xs=[]
            for i in range(40):
                await pg.evaluate(ISO,[3,1,11+i*.05,1]);xs.append(await pg.evaluate("()=>BXM.s[777301].x"));await pg.wait_for_timeout(40)
            rep('โดนตี: ตัวบนเหวี่ยงแล้วดีดกลับ (มีจังหวะเลยจุด) และค่อยนิ่ง',min(xs)<-1.5 and max(xs)>.2 and abs(xs[-1])<1,[round(min(xs),2),round(max(xs),2),round(xs[-1],2)])
            for mp in (8,14,22):await pg.evaluate(ISO,[mp,1,10,3])
            t1=(await pg.evaluate(ISO,[22,1,10.3,20]))[0];t0=(await pg.evaluate(ISO,[22,0,10.3,20]))[0]
            rep('ความเร็ว: ส่วนที่เพิ่ม ≤ 4 ms ต่อบอสต่อเฟรม (headless CPU)',t1-t0<4,[round(t0,2),round(t1,2)])
            rep('เฟรมช้า / โหมดประหยัด → ข้าม',await pg.evaluate("""()=>{const og=g,n=BXM.n,C=document.createElement('canvas');C.width=C.height=300;const m={id:777302,t:3,x:100,y:150,hp:100,mh:100,castT:0};
               g=C.getContext('2d');FQ.avg=99;try{drawBossAnim(m,10,0,0,false)}catch(e){}const a=BXM.n===n;FQ.avg=10;const lq=LOWQ;LOWQ=true;try{drawBossAnim(m,10,0,0,false)}catch(e){}LOWQ=lq;g=og;return a&&BXM.n===n}"""))
            # ในเกมจริง: บอสหอคอย + BX3 ยังทำงานร่วมกัน
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;ov.hidden=true;twCreate(1)}");await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin(30);banner=null}");await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{me.blPick=null;try{$('blpk').hidden=true;$('twcard').remove()}catch(e){}}");await pg.wait_for_timeout(4000)
            await pg.evaluate("()=>{const b=mons.find(m=>m.t===3);if(b){me.x=b.x-190;me.y=b.y+40}BXM.fq=999;BX3.fq=999;window.__n=[BXM.n,BX3.n]}");await pg.wait_for_timeout(2500)
            n=await pg.evaluate("()=>[BXM.n-__n[0],BX3.n-__n[1],!!mons.find(m=>m.t===3),BXM.err||'',BX3.err||'']")
            rep('ในเกมจริง (หอคอยชั้น 30): บอสขยับ + เงา 3 มิติยังทำงาน ไม่มี error',n[2] and n[0]>5 and n[1]>5 and not n[3] and not n[4],n)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
