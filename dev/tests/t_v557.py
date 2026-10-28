"""v557 แผนที่โฉมใหม่ ช่วงที่ 4: แมพตระกูลวังอัสตรา (27–45)
   ① พื้นที่วาดเฉพาะแมพยังเป็นของเดิม แต่เติมรายละเอียดตามวัสดุ (หิน/ดิน/ไม้) + แสงเงา/เงาเมฆในแมพกลางแจ้ง → ชิ้นพื้นถูกแทนด้วยชิ้นที่เติมแล้ว
   ② ต้นไม้/พุ่ม/หิน ธรรมชาติของแมพ 28 · 36 · 38 · 43 ใช้ตัววาดใหม่ (ตำแหน่ง/ขนาด/สีเดิม) · MX.on=0 → กลับไปตัววาดเดิม
   ③ ดันเจี้ยนที่ใช้พื้นตระกูลเดียวกัน ไม่ถูกแตะ · ไม่มีข้อผิดพลาด"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
CM=[27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Mc'+str(random.randint(100,999)),'melee',99)
        EX=lambda:[e for e in A.errs if 'ERR_TUNNEL_CONNECTION_FAILED' not in e]
        await A.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;ov.hidden=true}")
        res=[]
        for mp in CM:
            await A.ev(f"()=>{{enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}})}}");await A.wait(1500)
            z=0
            for _ in range(80):
                busy=await A.ev("()=>MX.pj?[...MX.pj.values()].filter(J=>J.vis).length:0");z=z+1 if not busy else 0
                if z>=3: break
                await A.wait(150)
            r=await A.ev("""()=>{let enh=0,tot=0;for(const c of PALC.m.values()){tot++;if(c.width&&!c.__base)enh++}return {on:mxCastOn(),out:mxCastOut(),tot:PALC.m.size,pj:MX.pj?MX.pj.size:-1,nb:MX.nb}}""")
            res.append([mp,r])
        ok=all(r['on'] and r['tot']>=2 and r['pj']==0 for _,r in res)
        rep('แมพตระกูลวัง 27–45 เปิดการเติมรายละเอียด · ชิ้นพื้นที่เห็นทำเสร็จ (ไม่มีงานค้าง)',ok,res)
        outs=[mp for mp,r in res if r['out']]
        rep('แสงเงา/เงาเมฆ เฉพาะแมพกลางแจ้ง (28 30 31 35 36 38 39 43)',sorted(outs)==[28,30,31,35,36,38,39,43],outs)
        # ชิ้นพื้นถูกแทนด้วยชิ้นที่เติมแล้ว (วัดจากความต่างของพิกเซล)
        df=await A.ev("""async()=>{enterMap(43,{x:1600,y:1600});await new Promise(r=>setTimeout(r,1500));for(let i=0;i<40&&MX.pj.size;i++)await new Promise(r=>setTimeout(r,150));
          const k=[...PALC.m.keys()][0],[cx,cy]=k.split(',').map(Number),E=PALC.m.get(k),B=palChunk(cx,cy,PALC.r),w=Math.min(E.width,B.width);const c1=document.createElement('canvas');c1.width=c1.height=64;const x1=c1.getContext('2d');x1.drawImage(E,0,0,w,w,0,0,64,64);const c2=document.createElement('canvas');c2.width=c2.height=64;const x2=c2.getContext('2d');x2.drawImage(B,0,0,w,w,0,0,64,64);
          const a=x1.getImageData(0,0,64,64).data,b=x2.getImageData(0,0,64,64).data;let d=0;for(let i=0;i<a.length;i+=4)d+=Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2]);return Math.round(d/(64*64*3)*100)/100}""")
        rep('ชิ้นพื้นที่แสดงคือชิ้นที่เติมรายละเอียด/แสงเงาแล้ว (ต่างจากชิ้นเดิมเล็กน้อย ไม่ใช่วาดใหม่ทั้งหมด)',0.3<df<25,df)
        # ของธรรมชาติใช้ตัววาดใหม่ · ปิดระบบ → ตัวเดิม
        pk=await A.ev("""async()=>{const out={};for(const [mp,k] of [[43,'paoak'],[43,'parock'],[43,'pabush'],[43,'paltree'],[38,'phtree'],[38,'phbush'],[36,'obpine'],[36,'obrock'],[28,'sft'],[28,'hedge']]){if(curMap!==mp){enterMap(mp,{x:MAPS[mp].sx,y:MAPS[mp].sy});await new Promise(r=>setTimeout(r,1200))}
            const t=trees.find(q=>q.k===k);if(!t){out[k]='none';continue}let n=0;const f=MXPK[k];MXPK[k]=function(){n++;return f.apply(this,arguments)};try{PALK[k](t,performance.now()/1000)}finally{MXPK[k]=f}
            MX.on=0;let m=0;MXPK[k]=function(){m++;return f.apply(this,arguments)};try{PALK[k](t,performance.now()/1000)}finally{MXPK[k]=f;MX.on=1}out[k]=[n,m]}return out}""")
        rep('ต้นไม้/พุ่ม/หิน แมพ 28 36 38 43 ใช้ตัววาดใหม่ · ปิดระบบแล้วกลับไปตัววาดเดิม',all(v!='none' and v[0]==1 and v[1]==0 for v in pk.values()),pk)
        # ดันเจี้ยนตระกูลเดียวกัน
        await A.ev("()=>{enterMap(45,{x:1600,y:1300})}");await A.wait(1200);await A.ev("()=>{ptdEnter()}");await A.wait(1800)
        dg=await A.ev("()=>[isDg(),mxCastOn(),MX.pj?MX.pj.size:0]")
        await A.ev("()=>{if(isDg())dgLeave()}");await A.wait(1200)
        rep('ดันเจี้ยนที่ใช้พื้นตระกูลวัง (เช่น ต้นค้ำ) ไม่ถูกแตะ',dg[0] and not dg[1] and dg[2]==0,dg)
        # โหมดภาพต่ำ
        await A.ev("()=>{LOWQ=true;PALC.m.clear();enterMap(38,{x:MAPS[38].sx,y:MAPS[38].sy})}");await A.wait(1500)
        for _ in range(60):
            if not await A.ev("()=>MX.pj.size"): break
            await A.wait(150)
        lq=await A.ev("()=>[mxCastOn(),PALC.m.size,(window.__err||[]).slice(-2)]");await A.ev("()=>{LOWQ=false}")
        rep('โหมดภาพต่ำทำงาน (ข้ามแสงเงา) ไม่มีข้อผิดพลาด',lq[0] and lq[1]>=2 and not lq[2],lq)
        rep('ไม่มีข้อผิดพลาดตลอดการทดสอบ',not EX(),EX()[:5])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
