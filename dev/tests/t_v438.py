"""v438 หอคอยหยุดเวลารอทั้งปาร์ตี้ · ช่วงปลอดภัยหลังฉากเนื้อเรื่อง"""
import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',95);Bc=await new_client(b,'Bee','mage',95)
        for c in (A,Bc): await c.ev(CLR);await c.ev("()=>{me.twBl=[];me.blPick=null;me.twCp=91;me.twBest=99}")
        await A.ev("()=>{twCreate(91)}");await A.wait(2500)
        rid=await A.ev("()=>curMap");await Bc.ev("(id)=>{dgEnter(id)}",rid);await A.wait(4000)
        H,M=(A,Bc) if await A.ev("()=>isHost()") else (Bc,A)
        print('room',rid,'host',H.name,await M.ev("()=>[curMap,isTw(),dg.ph]"))
        await H.ev("()=>{twStart()}");await H.wait(2500)
        s0=await H.ev("()=>[dg.ph,!!me.blPick]");s1=await M.ev("()=>[dg.ph,!!me.blPick]")
        rep('เริ่มปีน: ทั้งโฮสต์และเพื่อนได้หน้าเลือกพรเริ่มต้น',s0==['run',True] and s1==['run',True],str(s0)+str(s1))
        await H.ev("()=>{blChoose(0)}");await H.wait(1500)
        a=await H.ev("()=>[+dg.tl.toFixed(1),mons.length,U54.bp,u55MatePick(),!$('u55w').hidden]");await H.wait(2500)
        b2=await H.ev("()=>[+dg.tl.toFixed(1),mons.length,U54.bp]")
        rep('① โฮสต์เลือกแล้ว แต่เพื่อนยังเลือกอยู่ → เวลาไม่ลด ไม่มีมอน · มีป้าย «รอเพื่อน»',a[2]==1 and a[3] and a[4] and b2[0]==a[0] and b2[1]==0,str(a)+str(b2))
        await M.ev("()=>{blChoose(0)}");await H.wait(4000)
        c2=await H.ev("()=>[+dg.tl.toFixed(1),mons.length,U54.bp,u55MatePick()]")
        rep('① เพื่อนเลือกเสร็จ → เวลาเดินต่อ มอนออก',c2[0]<b2[0] and c2[1]>0 and c2[2]==0 and not c2[3],str(c2))
        for c in (A,Bc): await c.ctx.close()
        # ---------- ② ----------
        N=await new_client(b,'Ned','melee',40)
        await N.ev(CLR);await N.ev("()=>{enterMap(2,{x:1600,y:1600})}");await N.wait(2500)
        r=await N.ev("""()=>new Promise(res=>{gmGod=false;me.hp=me.mh;stSay([['nar','ทดสอบฉากเนื้อเรื่อง']],()=>{});const a=SD.on;hurt(50);const h1=me.hp;let k=0;while(SD.on&&k<10){stNext();k++}if(SD.on)stClose();hurt(50);const h2=me.hp;
          setTimeout(()=>{hurt(50);const h3=me.hp;gmGod=true;res([a,me.mh-h1,me.mh-h2,me.mh-h3])},1800)})""")
        rep('② ระหว่างฉากเนื้อเรื่องและ 1.5 วิหลังปิด ไม่โดนดาเมจ · หลังจากนั้นโดนตามปกติ',r[0] and r[1]==0 and r[2]==0 and r[3]>0,str(r))
        Es=[e for e in N.errs if 'Failed to load resource' not in e];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
