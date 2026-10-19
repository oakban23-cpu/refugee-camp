"""v446 เกจทุบบอสให้ล้ม: เกจเติมจากดาเมจทุกคน+สกิล · ล้มพร้อมกันทุกเครื่อง · บอสหยุด · ดาเมจ ×1.5 · จบแล้วรีเซ็ต/ยากขึ้น"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
BO="(()=>mons.find(m=>m.t===3&&!m.wb))()"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Hst','melee',60);B=await new_client(b,'Mem','mage',60)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(2,{x:1600,y:1700})}")
        await A.wait(3500)
        for c in (A,B): await c.ev("()=>{gmGod=true;AUTO.on=false;try{aqHB(false)}catch(e){};setInterval(()=>{mons.forEach(m=>{if(m.t<3){m.x=-9999;m.y=-9999}})},100)}")
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        H,M=(A,B) if await A.ev("()=>isHost()") else (B,A)
        await H.ev("()=>{if(!mons.some(m=>m.t===3))spawnBoss()}");await H.wait(2500)
        FAR="()=>{const m="+BO+";if(m){me.x=m.x-420;me.y=m.y+40;me.cd=99;window.__far&&clearInterval(__far);window.__far=setInterval(()=>{me.cd=99},20)}}"
        for c in (H,M): await c.ev(FAR)
        await H.wait(1500);await H.ev("()=>{const m="+BO+";U60.g[m.id]=0;m.__u60h=m.hp;U60.snt[m.id]=-9}");await H.wait(800)
        a=await H.ev("()=>{const m="+BO+";return m?{id:m.id,hp:m.hp,mh:m.mh,g:U60.g[m.id]||0}:null}")
        bm=await M.ev("()=>{const m="+BO+";return m?{id:m.id,hp:m.hp}:null}")
        rep('มีบอส ทั้งสองเครื่องเห็น เกจเริ่ม 0', a and bm and a['id']==bm['id'] and a['g']==0, json.dumps([a,bm]))
        bid=a['id'];mh=a['mh']
        # สมาชิกตีด้วยสกิล 3 ครั้ง (ดาเมจรวม ~6% เลือด)
        for i in range(3):
            await M.ev(f"()=>{{const m={BO};U60.pT=0;addHit(m,{mh}*.02,0,1,'mage')}}");await M.wait(300)
        await H.wait(1200)
        g1=await H.ev(f"()=>U60.g[{bid}]||0");gm=await M.ev(f"()=>U60.g[{bid}]||0")
        rep('ดาเมจ+สกิลของสมาชิก เติมเกจที่โฮสต์ และสมาชิกเห็นค่าเดียวกัน', 40<g1<100 and abs(gm-g1)<=4, json.dumps([g1,gm]))
        # ตีจนล้ม
        for i in range(6):
            if await H.ev(f"()=>!!(mons.find(m=>m.id==={bid})||{{}}).brkU"): break
            await M.ev(f"()=>{{const m={BO};addHit(m,{mh}*.02,0,1,'mage')}}");await M.wait(500)
        await H.wait(600)
        s=[await c.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});return m?Math.round(((m.brkU||0)-performance.now())/100)/10:-1}}") for c in (H,M)]
        rep('เกจเต็ม → บอสล้มพร้อมกันทั้งสองเครื่อง (~6 วิ)', all(3<x<=6.1 for x in s), json.dumps(s))
        p0=await H.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});return [m.x,m.y]}}")
        a1=await H.ev(f"()=>mons.find(q=>q.id==={bid}).a1");await H.wait(1500)
        p1=await H.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});return [m.x,m.y,(m.tl||[]).length]}}")
        a1b=await H.ev(f"()=>mons.find(q=>q.id==={bid}).a1")
        rep('ระหว่างล้ม บอสไม่เดิน/ไม่ตั้งท่า/ตัวนับท่าไม่เดิน', abs(p1[0]-p0[0])<2 and abs(p1[1]-p0[1])<2 and p1[2]==0 and a1==a1b, json.dumps([p0,p1,a1,a1b]))
        d_brk=await H.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});const h0=m.hp;addHit(m,1000,0);return h0-m.hp}}")
        hud=await M.ev("()=>{let e=null;try{u60Hud()}catch(x){e=String(x)}return e}")
        rep('แถบเกจ/ป้ายวาดได้ไม่ error', hud is None, str(hud))
        await H.wait(5000)
        st=[await c.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});return [!!(m.brkU&&performance.now()<m.brkU),U60.g[{bid}]||0,U60.n[{bid}]||0]}}") for c in (H,M)]
        rep('ครบ 6 วิ บอสลุก เกจรีเซ็ต 0 นับครั้งที่ 1 (ทั้งสองเครื่อง)', all((not x[0]) and x[1]==0 and x[2]==1 for x in st), json.dumps(st))
        th=await H.ev(f"()=>u60Th({bid})")
        rep('ล้มครั้งต่อไปต้องใช้มากขึ้น (14% → 18.2%)', abs(th-.182)<.002, str(th))
        d_n=await H.ev(f"()=>{{const m=mons.find(q=>q.id==={bid});const h0=m.hp;addHit(m,1000,0);return h0-m.hp}}")
        rep('ดาเมจตอนล้ม ×1.5 เทียบตอนปกติ', d_n>0 and abs(d_brk/d_n-1.5)<.08, json.dumps([d_brk,d_n]))
        a2=await H.ev(f"()=>mons.find(q=>q.id==={bid}).a1");await H.wait(1000);a3=await H.ev(f"()=>mons.find(q=>q.id==={bid}).a1")
        rep('ลุกแล้ว AI บอสทำงานต่อ (ตัวนับท่าเดิน)', a2!=a3, json.dumps([a2,a3]))
        errs=[x for x in A.errs+B.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
