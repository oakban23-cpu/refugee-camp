"""v435 โฮสต์ค้างกลางการต่อสู้: สลับโฮสต์ · มอนตรงกัน · ดาเมจช่วงค้างไม่หาย"""
import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
BOSS="()=>{const m=mons.find(q=>q.t===3);return m?[m.id,Math.round(m.hp),Math.round(m.mh)]:null}"
CMP="()=>mons.filter(m=>!m.pv&&!m.dum).map(m=>[m.id,Math.round(m.x),Math.round(m.y)])"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,60) for n,c in [('Ann','melee'),('Bee','mage'),('Cid','archer')]]
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;enterMap(2,{x:2450+i*30,y:2480})}",i)
            await c.wait(1200)
        await C[0].wait(4000)
        hid=await C[0].ev("()=>hostId()");H=[c for c in C if c.uid==hid][0];O=[c for c in C if c is not H]
        rep('ทุกเครื่องเห็นโฮสต์คนเดียวกัน',len({await c.ev("()=>hostId()") for c in C})==1,H.name)
        await H.ev("()=>{const m=mons.find(q=>q.t===3);if(m){m.mh=5e6;m.hp=5e6}}");await H.wait(1500)
        b0=await O[0].ev(BOSS);print('boss before',b0)
        await H.ev("()=>{setTimeout(()=>{const t=Date.now();while(Date.now()-t<4500){}},10)}")
        await O[0].wait(400)
        # ช่วงโฮสต์ค้าง: อีกสองเครื่องตีบอสรวม 20 ครั้ง ครั้งละ 1,000
        for c in O: await c.ev("()=>{const m=mons.find(q=>q.t===3);if(m)for(let i=0;i<10;i++)hitBuf.push([m.id,1000])}")
        await O[0].wait(6500)
        hs={await c.ev("()=>hostId()") for c in C}
        nh=list(hs)[0]
        rep('โฮสต์ค้าง → เซิร์ฟเวอร์ย้ายโฮสต์ และทุกเครื่องเห็นตรงกัน',len(hs)==1 and nh!=H.uid,str([x[:4] for x in hs]))
        NH=[c for c in C if c.uid==nh][0]
        b1=await NH.ev(BOSS);print('boss after',b1)
        lost=None
        if b0 and b1: lost=(b0[1]-b1[1])
        rep("ดาเมจที่ตีช่วงโฮสต์ค้าง (20,000) ไปถึงโฮสต์ใหม่ (+ดาเมจปกติราว 2.5–4k)",lost is not None and 19000<=lost<=24500,str(lost))
        hm={r[0]:r for r in await NH.ev(CMP)}
        bad=[]
        for c in C:
            if c is NH: continue
            L=await c.ev(CMP);me=await c.ev("()=>[me.x,me.y]")
            near=[r for r in L if abs(r[1]-me[0])<400 and abs(r[2]-me[1])<400]
            ghost=[r[0] for r in near if r[0] not in hm]
            if ghost: bad.append((c.name,ghost[:5]))
        rep('หลังสลับโฮสต์ ไม่มีมอนผีบนเครื่องอื่น',not bad,str(bad))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
