"""v480 พระราชวังอัสตรา: ไม่มีฝน/นกในอาคาร · ผ้าม่านน้ำเงินวาดใหม่ (กรอบเวทีชิดขอบบน) ทั้งแนวตั้ง/แนวนอน"""
import asyncio, sys, json, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
PIX="""()=>{const c=document.getElementById('c'),x=c.getContext('2d'),d=DPR,px=(u,v)=>Array.from(x.getImageData(Math.round(u*d),Math.round(v*d),1,1).data).slice(0,3);
  return {rod:px(SW0/2+DRP.swg*.25,3),left:px(6,(ZM.on?ZM.h0:H)*.7),right:px(SW0-6,(ZM.on?ZM.h0:H)*.7),mid:px(SW0/2,(ZM.on?ZM.h0:H)*.6),W:SW0,H:ZM.on?ZM.h0:H,n:DRP.n,k:DRP.k}}"""
gold=lambda p:p[0]>150 and p[1]>100 and p[2]<p[0]*.75
blue=lambda p:p[2]>p[0]+25 and p[2]>60
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(27,{x:1600,y:2300})}");await A.wait(3500)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};PALG.title=null;PALG.card=null;for(const m of mons)m.x=-9999}");await A.wait(1200)
        r=await A.ev("""()=>{const now=Date.now();let p27=0,p24=new Set(),p1=0;for(let i=0;i<600;i++){const t=now+i*420e3;if(vzWxOf(27,t))p27++;const w=vzWxOf(24,t);if(w)p24.add(w.k);if(vzWxOf(13,t))p1++}
          return {map:curMap,wx:VZ.wx,p27,p24:[...p24],p1,cr:VZCR.palace,bird:VZ.crit.filter(c=>c.k==='bird').length,wxNow:wxNow()}}""")
        rep('พระราชวังอัสตรา (ในร่ม): ไม่มีฝน/สภาพอากาศเลยตลอด 600 ช่วงเวลา · ไม่มีนกบิน (เหลือกลีบดอก)', r['map']==27 and r['wx'] is None and r['p27']==0 and r['wxNow']==0 and 'bird' not in r['cr'] and r['bird']==0, r)
        rep('ทะเลสาบใต้ดินเรืองแสง: หมอกแทนฝน · สวนลอยฟ้าร้าง (กลางแจ้ง) ยังมีฝนเป็นช่วง ๆ เหมือนเดิม', r['p24']==['fog'] and r['p1']>0, r)
        x=await A.ev(PIX)
        rep('แนวตั้ง: ผ้าม่านใหม่ — ราวทองชิดขอบบน · ม่านน้ำเงินสองข้างถึงพื้น · กลางจอไม่มีแถบคาด', gold(x['rod']) and blue(x['left']) and blue(x['right']) and not blue(x['mid']) and x['n']==3, x)
        await A.pg.set_viewport_size({'width':788,'height':288});await A.wait(1200)
        x=await A.ev(PIX)
        rep('มือถือแนวนอน 788×288: ระบายเต็มความกว้าง (จำนวนโค้งตามความกว้าง) · ม่านข้างถึงพื้น', gold(x['rod']) and blue(x['left']) and blue(x['right']) and x['n']>=7 and str(x['W']) in x['k'], x)
        await A.pg.set_viewport_size({'width':1277,'height':845});await A.wait(1200)
        x=await A.ev(PIX)
        rep('PC 1277×845: ผ้าม่านใหม่ปรับตามจอ', gold(x['rod']) and blue(x['left']) and blue(x['right']) and x['n']>=7 and str(x['W']) in x['k'], x)
        # แคชไม่สร้างใหม่ทุกเฟรมตอนกล้องซูม (ใกล้บอส)
        n0=await A.ev("()=>{window.__nb=0;const o=drpBuild;drpBuild=function(){window.__nb++;return o.apply(this,arguments)};ZM.cr=performance.now()+1500;return DRP.k}");await A.wait(1500)
        nb=await A.ev("()=>window.__nb")
        rep('ภาพผ้าม่านแคชไว้ (ไม่สร้างใหม่ระหว่างกล้องซูม)', nb==0, [n0,nb])
        errs=[e for e in A.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
