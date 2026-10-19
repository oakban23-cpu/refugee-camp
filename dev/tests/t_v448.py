"""v448 หัวหน้ามอนใหม่ 2 แบบ: ทุบพื้น · ยิงกระจาย (หลบได้จริง ออนไลน์ 2 เครื่อง)"""
import asyncio, sys, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Hst','melee',40);B=await new_client(b,'Mem','mage',40)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(2,{x:1500,y:1500})}")
        await A.wait(3500)
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        H,M=(A,B) if await A.ev("()=>isHost()") else (B,A)
        for c in (H,M): await c.ev("()=>{AUTO.on=false;try{aqHB(false)}catch(e){};me.cd=99;setInterval(()=>{me.cd=99},30)}")
        await H.ev("()=>{gmGod=true}")
        d=await H.ev("()=>{const c={};let n=0;for(let id=1;id<=200000;id++){const k=ekOf({id,p:1,t:0});if(k){c[k]=(c[k]||0)+1;n++}}return {n,c,len:EKN.length}}")
        rate=d['n']/200000
        rep('หัวหน้ามอนโผล่ ~2.5% และมีครบ 6 แบบ', 0.022<rate<0.028 and len(d['c'])==6 and d['len']==7, json.dumps([rate,d]))
        # เตรียมหัวหน้ามอน 1 ตัวที่โฮสต์ ยึดไว้ห่างจาก M
        SETUP="""(el)=>{mons.forEach(m=>{if(m.t<3&&!m.__e){m.x=-9999;m.y=-9999}});let m=mons.find(q=>q.__e);if(!m){m=mons.find(q=>q.t<3&&q.hp>0);m.__e=1}
          m.el=el;m.hp=m.mh=999999;m.ekc=99;m.u62w=null;m.u62q=[];m.root=0;window.__E=m;const P=Object.values(others)[0];window.__P=P;return [m.id,P?Math.round(P.x):null]}"""
        await H.ev("()=>{window.__lock=setInterval(()=>{const m=window.__E;if(m&&m.__fx){m.x=m.__fx[0];m.y=m.__fx[1]}},20)}")
        r=await H.ev(SETUP,5)
        mx,my=await M.ev("()=>[me.x,me.y]")
        await H.ev(f"()=>{{__E.__fx=[{mx}+100,{my}];__E.x={mx}+100;__E.y={my}}}");await H.wait(1200)
        hp0=await M.ev("()=>{gmGod=false;me.hp=me.mh;return me.hp}")
        await H.ev("()=>{__E.ekc=0}");await H.wait(400)
        tg=await M.ev("()=>fxs.some(f=>f.k==='u62s')")
        await H.wait(1300)
        hp1=await M.ev("()=>me.hp")
        rep('🔨 ทุบพื้น: สมาชิกเห็นวงแดงก่อน แล้วยืนในวงโดนดาเมจ', tg and hp1<hp0, json.dumps([tg,hp0,hp1]))
        await M.ev("()=>{me.hp=me.mh}");await H.ev("()=>{__E.ekc=99}");await H.wait(800)
        await H.ev("()=>{__E.ekc=0}");await H.wait(300)
        await M.ev("()=>{me.x-=200}");await H.wait(1500)
        hp2=await M.ev("()=>me.hp")
        rep('🔨 ทุบพื้น: วิ่งออกจากวงทัน ไม่โดน', hp2==await M.ev("()=>me.mh"), str(hp2))
        # ยิงกระจาย
        mx,my=await M.ev("()=>{me.hp=me.mh;return [me.x,me.y]}")
        await H.ev(SETUP,6);await H.ev(f"()=>{{__E.__fx=[{mx}+220,{my}];__E.x={mx}+220;__E.y={my}}}");await H.wait(1200)
        await H.ev("()=>{__E.ekc=0}");await H.wait(300)
        tg=await M.ev("()=>fxs.some(f=>f.k==='u62v')")
        hpA=await M.ev("()=>me.hp")
        await H.wait(1400)
        hpB=await M.ev("()=>me.hp")
        rep('🏹 ยิงกระจาย: เห็นเส้นเตือนพัด แล้วยืนในแนวโดนลูก', tg and hpA==await M.ev("()=>me.mh") and hpB<hpA, json.dumps([tg,hpA,hpB]))
        await M.ev("()=>{me.hp=me.mh}");await H.ev("()=>{__E.ekc=99}");await H.wait(800)
        await H.ev("()=>{__E.ekc=0}");await H.wait(250)
        await M.ev("()=>{me.y+=42}");await H.wait(1500)
        hpC=await M.ev("()=>me.hp")
        rep('🏹 ยิงกระจาย: ขยับเข้าช่องว่างระหว่างเส้น ไม่โดน', hpC==await M.ev("()=>me.mh"), str(hpC))
        # หลบสมบูรณ์
        await M.ev("()=>{me.y-=42;me.hp=me.mh;me.dgP=0;me.pdg=0}");await H.ev("()=>{__E.ekc=99}");await H.wait(800)
        await H.ev("()=>{__E.ekc=0}");await H.wait(700)
        await M.ev("()=>{window.__dgk=setInterval(()=>{me.dgI=.3},20)}");await H.wait(1000)
        pd_=await M.ev("()=>{clearInterval(__dgk);return [me.hp===me.mh,me.pdg>performance.now()]}")
        rep('หลบตอนลูกมาถึง = หลบสมบูรณ์ (ไม่เสียเลือด + สวนกลับ)', pd_[0] and pd_[1], json.dumps(pd_))
        v=await M.ev("()=>{const m=mons.find(q=>q.el===6);let e=null;try{if(m){drawEkAura(m);drawEkTag(m,30)}}catch(x){e=String(x)}return [!!m,e,EKN[6],EKIC[5]]}")
        rep('สมาชิกเห็นชนิดหัวหน้ามอนใหม่และวาดออร่า/ป้ายได้', v[0] and v[1] is None and v[2]=='ยิงกระจาย' and v[3]=='🔨', json.dumps(v))
        errs=[x for x in A.errs+B.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
