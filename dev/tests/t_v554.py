"""v554 แผนที่โฉมใหม่ ภาค 1 (แมพ 1–8, 10, 11): พื้นผิวละเอียด + แสงเงา + ต้นไม้/ของประดับ/รังวาดใหม่
   ① ทุกแมพภาค 1 ใช้ตัววาดใหม่ได้ ชังก์สร้างเสร็จ ไม่มีข้อผิดพลาด
   ② ตำแหน่งต้นไม้/ของประดับ/รัง ไม่เปลี่ยน (ไม่แตะข้อมูลเกม) · ปิดระบบ (MX.on=0) แล้วกลับไปวาดแบบเดิมได้
   ③ แมพที่ยังไม่ทำ/ดันเจี้ยน = ใช้ตัววาดเดิม · โหมดภาพต่ำทำงาน · แคชแมพอื่นถูกทิ้งเมื่อย้ายแมพ"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
MAPS1=[1,2,3,4,5,6,7,8,10,11]
SNAP="""()=>JSON.stringify({t:trees.map(t=>[Math.round(t.x),Math.round(t.y),Math.round(t.r)]),d:decor.length,n:(MAPS[curMap].nests||[]).map(n=>[n[0]|0,n[1]|0]),v:(VM.k===curMap?VM.P.length:-1)})"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Mx'+str(random.randint(100,999)),'melee',99)
        EX=lambda:[e for e in A.errs if 'ERR_TUNNEL_CONNECTION_FAILED' not in e]
        await A.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;ov.hidden=true}")
        ok0=await A.ev("()=>[typeof mxGround,typeof MXC,MX.v,Object.keys(MXC).map(Number).sort((a,b)=>a-b)]")
        rep('โหลดโมดูลแผนที่ใหม่ (v554) · ธีมครบ 10 แมพของภาค 1',ok0[0]=='function' and all(m in ok0[3] for m in MAPS1),ok0)
        res=[];snaps={}
        for mp in MAPS1:
            await A.ev(f"()=>{{enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}})}}");await A.wait(1500)
            pt=await A.ev("()=>{const N=MAPS[curMap].nests||[];const q=N.length?N[0]:[1600,1600];me.x=q[0];me.y=q[1]+90;return [me.x,me.y]}")
            await A.wait(1200);z=0
            for _ in range(80):
                busy=await A.ev("()=>[...MX.jobs.values()].filter(J=>J.vis).length");z=z+1 if not busy else 0
                if z>=3: break
                await A.wait(150)
            await A.wait(400)
            r=await A.ev("""()=>{const ks=[...GX.ch.keys()].filter(k=>k.indexOf('mx554|'+curMap+'|')===0).length;let nd=0;const o=mxNest;window.__nc=0;
              return {on:mxOn(),ks,jobs:[...MX.jobs.values()].filter(J=>J.vis).length,vsp:[...MX.vsp.keys()].filter(k=>k.indexOf(curMap+'|')===0).length,tile:Object.keys(MX.tile).length,tsp:Object.keys(MX.tsp).length,err:(window.__err||[]).slice(-3)}}""")
            for _ in range(40):
                if r['jobs']==0: break
                await A.wait(150)
                r=await A.ev("""()=>{const ks=[...GX.ch.keys()].filter(k=>k.indexOf('mx554|'+curMap+'|')===0).length;let nd=0;const o=mxNest;window.__nc=0;
              return {on:mxOn(),ks,jobs:[...MX.jobs.values()].filter(J=>J.vis).length,vsp:[...MX.vsp.keys()].filter(k=>k.indexOf(curMap+'|')===0).length,tile:Object.keys(MX.tile).length,tsp:Object.keys(MX.tsp).length,err:(window.__err||[]).slice(-3)}}""")
            snaps[mp]=await A.ev(SNAP)
            res.append([mp,r])
        ok=all(r['on'] and r['ks']>=2 and r['jobs']==0 for _,r in res)
        rep('ทุกแมพภาค 1 เปิดตัววาดใหม่ · ชังก์พื้นที่เห็นบนจอสร้างเสร็จครบ',ok,res)
        rep('ไม่มีข้อผิดพลาดระหว่างวาดทุกแมพ',not EX() and all(not r['err'] for _,r in res),[EX()[:4],[r['err'] for _,r in res if r['err']]])
        tl=[r['tile'] for _,r in res]
        rep('ย้ายแมพแล้วทิ้งแคชกระเบื้องของแมพเก่า (กระเบื้องในหน่วยความจำ ≤ 6 ต่อแมพ)',max(tl)<=6,tl)
        # ② ตำแหน่งเดิม: ปิดระบบ (เส้นทางเดิม) → ข้อมูลต้นไม้/ของ/รัง เท่ากันทุกตัว
        diff=[]
        for mp in (1,3,5,8,11):
            await A.ev("()=>{MX.on=0}")
            await A.ev(f"()=>{{enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}})}}");await A.wait(1500)
            s0=await A.ev(SNAP)
            k0=await A.ev("()=>({mx:[...GX.ch.keys()].filter(k=>k.indexOf('mx554|')===0).length,old:[...GX.ch.keys()].filter(k=>k.indexOf('mx554|')!==0).length,on:mxOn()})")
            await A.ev("()=>{MX.on=1}")
            if s0!=snaps[mp]: diff.append([mp,len(s0),len(snaps[mp])])
            diff.append(['k',mp,k0]) if (k0['on'] or k0['old']<1) else None
        rep('ตำแหน่งต้นไม้/ของประดับ/รัง ตรงกับต้นฉบับทุกตัว · ปิดระบบแล้วกลับไปวาดพื้นแบบเดิมได้',not diff,diff)
        # รังใช้ตัววาดใหม่ + วงประแดงเดิมยังอยู่
        await A.ev("()=>{enterMap(1,{x:MAPS[1].sx,y:MAPS[1].sy})}");await A.wait(1200)
        ns=await A.ev("""async()=>{const N=MAPS[1].nests[0];me.x=N[0];me.y=N[1]+60;await new Promise(r=>setTimeout(r,900));let dash=0;const o=g.setLineDash.bind(g);g.setLineDash=function(a){if(a&&a[0]===6&&a[1]===5)dash++;return o(a)};
          const ow=mxNest;let c=0;window.mxNest=mxNest=function(){c++;return ow.apply(this,arguments)};await new Promise(r=>setTimeout(r,500));window.mxNest=mxNest=ow;g.setLineDash=o;return [c,dash]}""")
        rep('รังวาดใหม่ (หลุม + หนามสีประจำแมพ) และยังมีวงประแดงบอกเขตรังแบบเดิม',ns[0]>0 and ns[1]>0,ns)
        # ③ แมพที่ยังไม่ทำ / ดันเจี้ยน → ตัววาดเดิม
        oth=[]
        for mp in (27,38):
            await A.ev(f"()=>{{enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}})}}");await A.wait(1200)
            oth.append([mp,await A.ev("()=>[mxOn(),[...GX.ch.keys()].filter(k=>k.indexOf('mx554|')===0).length]")])
        await A.ev("()=>{enterMap(45,{x:1600,y:1300})}");await A.wait(1200)
        await A.ev("()=>{ptdEnter()}");await A.wait(1800)
        dg=await A.ev("()=>[isDg(),mxOn()]")
        await A.ev("()=>{if(isDg())dgLeave()}");await A.wait(1200)
        rep('แมพภาคอื่น/ดันเจี้ยน ยังใช้ตัววาดเดิม (ยังไม่เปลี่ยน)',all(not x[1][0] for x in oth) and dg[0] and not dg[1],[oth,dg])
        # โหมดภาพต่ำ
        await A.ev("()=>{LOWQ=true;try{GX.ch.clear()}catch(e){};MX.jobs.clear();MX.done.clear();enterMap(6,{x:MAPS[6].sx,y:MAPS[6].sy})}");await A.wait(1500)
        for _ in range(40):
            if not await A.ev("()=>[...MX.jobs.values()].filter(J=>J.vis).length"): break
            await A.wait(150)
        lq=await A.ev("()=>[mxOn(),[...GX.ch.keys()].filter(k=>k.indexOf('mx554|6|')===0).length,(window.__err||[]).slice(-2)]")
        await A.ev("()=>{LOWQ=false}")
        rep('โหมดภาพต่ำ: ตัววาดใหม่ทำงาน (ข้ามขอบคม/ไม้พุ่มเล็ก) ไม่มีข้อผิดพลาด',lq[0] and lq[1]>=2 and not lq[2],lq)
        # ความเร็ว: เวลาสร้างต่อชังก์เฉลี่ย (เครื่องทดสอบ ซอฟต์แวร์เรนเดอร์)
        st=await A.ev("()=>({bt:Math.round(MX.bt),nb:MX.nb,per:Math.round(MX.bt/(MX.nb||1)*10)/10})")
        rep('เวลาสร้างพื้นต่อชังก์เฉลี่ย < 60 มิลลิวินาที (แบ่งทำทีละขั้นข้ามเฟรม)',st['per']<60,st)
        rep('ไม่มีข้อผิดพลาดตลอดการทดสอบ',not EX(),EX()[:5])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
