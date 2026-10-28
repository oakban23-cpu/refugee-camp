"""v553 สมดุลดันภาค 10 + ปาร์ตี้เข้าดันภาค 8–10 ได้
   ① หัวหน้าเปิดดัน → เพื่อนในปาร์ตี้เห็นปุ่มชวน → กดเข้าห้องเดียวกัน (ครบ 10 ดัน: ท่าเรือ · เรือดำ · ท้องวาฬ · ตาพายุ · หอนาฬิกา · ใจกลางตาข่าย · ยอดหอ · ต้นค้ำ · รัง · ฐานฟ้า)
   ② ใส่รหัสห้องเองได้ · รหัสผิดยังถูกปฏิเสธ · ดันเก่ายังเข้าได้ตามเดิม"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from b10lib import PROF_JS, prof
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
DGS=[('hdf',72000),('gdl',70000),('wbl',46000),('wsk',47000),('ctw',48000),('cwn',49000),('wvr',45000),('ptd',41000),('pnq',43000),('pfn',44000)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ta'+str(random.randint(100,999)),'melee',99)
        B=await new_client(b,'Tb'+str(random.randint(100,999)),'sup',99)
        for C in (A,B):
            await C.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;me.gold=1e8;ov.hidden=true;enterMap(45,{x:1600,y:1300})}")
        await A.wait(2500)
        await A.ev(f"()=>ptInvite('{B.uid}')"); await B.wait(1500); await B.ev("()=>ptAccept()"); await B.wait(2500)
        pty=await A.ev("()=>PTY?PTY.mem.length:0")
        rep('ตั้งปาร์ตี้ 2 คน',pty==2,pty)
        res=[]
        for k,base in DGS:
            await B.ev("()=>{dInv=null}")
            await A.ev(f"()=>{{if(isDg())dgLeave();enterMap(45,{{x:1600,y:1300}})}}");await B.ev(f"()=>{{if(isDg())dgLeave();enterMap(45,{{x:1620,y:1310}})}}");await A.wait(1800)
            await A.ev(f"()=>{{{k}Enter()}}");await A.wait(2200)
            ra=await A.ev("()=>[curMap,isDg(),MAPS[curMap]&&MAPS[curMap].n]")
            inv=await B.ev("()=>[dInv?dInv.id:0,!$('dinvb').hidden,$('dinvb').textContent]")
            await B.ev("()=>{if(dInv)$('dinvb').click()}");await B.wait(2200)
            rb=await B.ev("()=>[curMap,isDg(),Math.round(me.x),Math.round(me.y),ov.hidden]")
            same=await A.ev("()=>Object.keys(others).length")
            res.append([k,ra[0],inv[0],inv[1],rb[0],same,rb[2],rb[3]])
        ok=all(r[1]>=r[0+0] if False else (r[2]==r[1] and r[3] and r[4]==r[1] and r[5]>=1) for r in res)
        rep('เพื่อนในปาร์ตี้เห็นปุ่มชวนและกดเข้าห้องเดียวกันได้ครบ 10 ดัน (ภาค 8–10)',ok,res)
        # รหัสห้องเอง
        await A.ev("()=>{if(isDg())dgLeave()}");await B.ev("()=>{if(isDg())dgLeave()}");await A.wait(1500)
        await A.ev("()=>{pfnEnter()}");await A.wait(2000);rid=await A.ev("()=>curMap")
        await B.ev(f"()=>{{dInv=null;dgJoin('{rid}')}}");await B.wait(2000)
        c1=await B.ev("()=>[curMap,isDg()]")
        await B.ev("()=>{if(isDg())dgLeave()}");await B.wait(1500)
        bad=[]
        for code in ('42010','40500','44999x','70999'):
            await B.ev(f"()=>{{ov.hidden=true;dgJoin('{code}')}}");await B.wait(500)
            bad.append([code,await B.ev("()=>[curMap,isDg(),(ov.querySelector('.note')||{}).textContent||'']")])
            await B.ev("()=>{if(isDg())dgLeave();ov.hidden=true}");await B.wait(800)
        rep('ใส่รหัสห้องฐานฟ้าเองได้ · รหัสที่ไม่มีดันยังขึ้น «รหัสห้องไม่ถูกต้อง»',c1[0]==rid and c1[1] and all(not x[1][1] for x in bad[:3]),[rid,c1,bad])
        # ---------- สมดุลดันภาค 10 ----------
        C=await new_client(b,'Tc'+str(random.randint(100,999)),'mage',99)
        await C.ev(PROF_JS,[prof('L','mage')])
        await C.ev("()=>{window.DNH=12;AUTO.on=false;me.gold=1e8;ov.hidden=true;enterMap(45,{x:1600,y:1300})}");await C.wait(1500)
        RED="(1-Math.min(.6,M('red')))"
        HOOK="""()=>{window.__dd=[];window.__hd=[];window.__fx={};if(!window.__hk){window.__hk=1;const w=n=>{const o=window[n];window[n]=function(u,d){__dd.push([n,u,Math.round(d)]);return o.apply(this,arguments)};try{eval(n+'=window[n]')}catch(e){}};
          ['ptdDmg','pnqDmg','pfnDmg'].forEach(w);const oh=hurt;window.hurt=hurt=function(d){__hd.push(Math.round(d));return oh.apply(this,arguments)};const of=fx;window.fx=fx=function(o){try{if(o&&o.k)__fx[o.k]=o}catch(e){}return of.apply(this,arguments)}}return 1}"""
        await C.ev(HOOK)
        # ① ต้นค้ำ: มุดดินโผล่ใส่คนขวาง = ดาเมจลงจริง (เดิมคิดใน ptdSim แล้วหายเพราะ dmgQ ถูกล้าง) · 60×dm
        await C.ev("()=>{ptdEnter()}");await C.wait(1500)
        er=await C.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));dg={ph:'boss',w:3,tl:3000,nx:0};mons=[];ptdReset();bossCd=1e9;spawnBoss();const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.stun=99;Bm.s1=1;Bm.s2=1;
          const [ex,ey]=ptDest(0);me.x=ex;me.y=ey;gmGod=false;me.down=0;me.hp=me.mh;await w(4200);me.hp=me.mh;me.shv=0;me.dgI=0;__dd=[];const h0=me.hp,e0=PTW.e[0];PTW.bi=0;PTW.bp=[[Bm.x,Bm.y],[ex,ey]];PTW.bd=3.4;PTW.bur=.05;await w(500);
          const d=Math.round(h0-me.hp),q=__dd.filter(x=>x[0]==='ptdDmg'&&x[1]===uid).map(x=>x[2]);gmGod=true;return [q,Math.round(60*BS().dm*bossX()),d,Math.round((e0-PTW.e[0])*10)/10,Bm.stun>0]}""")
        rep('ต้นค้ำ: ยืนขวางตอนมุดดินโผล่ = โดนจริง 60×ดาเมจบอส (เดิม 110× แต่ไม่เคยลงเพราะคิดใน ptdSim) · รากเสียครึ่ง · บอสมึน',er[0]==[er[1]] and er[2]>0 and 2<=er[3]<=3.6 and er[4],er)
        await C.ev("()=>{dgLeave()}");await C.wait(1500)
        # ② รัง: หินร่วงลงจริง 60× · กรวยกรด 75× เตือน 1.3 วิ · เกณฑ์ขัดกัด ~2.8 วิของดาเมจทีม
        await C.ev("()=>{me.down=0;me.hp=me.mh;enterMap(45,{x:1600,y:1300})}");await C.wait(1200);await C.ev("()=>{pnqEnter()}");await C.wait(1500)
        pq=await C.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));dg={ph:'boss',w:2,tl:3000,nx:0};mons=[];pnqReset();PNQ.st='boss';bossCd=1e9;spawnBoss();const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.s1=1;Bm.s2=1;Bm.stun=99;
          me.x=CX+150;me.y=CY+120;gmGod=false;me.down=0;me.hp=me.mh;await w(4200);me.hp=me.mh;me.shv=0;me.dgI=0;const dm=BS().dm*bossX();
          __dd=[];let h0=me.hp;PNQ.rk.push({x:me.x,y:me.y,t:.05});await w(400);const dr=Math.round(h0-me.hp),rq=__dd.filter(x=>x[0]==='pnqDmg'&&x[1]===uid).map(x=>x[2]);me.hp=me.mh;
          Bm.x=me.x-200;Bm.y=me.y;Bm.tx=Bm.x;Bm.ty=Bm.y;Bm.stun=0;Bm.a1=99;Bm.a2=99;Bm.w1=0;__fx={};await w(150);const fa=__fx.pnqa?+__fx.pnqa.dur:0,A2=!!Bm.ac2;Bm.w1=999;__hd=[];h0=me.hp;await w(1600);const da=Math.round(h0-me.hp),ha=__hd.slice();Bm.stun=99;
          const t=performance.now()/1000;PNQ.hs=[[t-10,Bm.hp+3e6],[t,Bm.hp]];pnqGnaw(Bm);const gk=PNQ.gk;PNQ.gn=0;PNQ.gs='';Bm.tf=0;gmGod=true;
          return {rq,er:Math.round(60*dm),dr,fa,A2,ha,ea:Math.round(75*dm),da,gk,egk:Math.round(Math.max(Bm.mh*.012,Math.min(Bm.mh*.04,3e5*2.8)))}}""")
        rep('รัง: หินร่วงหลังกัดเท้าลงจริง 60× (เดิมหาย) · กรวยกรด 75× (เดิม 105×) เตือน 1.3 วิ (เดิม 1.1) · เกณฑ์ขัดตอนกัดเท้า = 2.8 วิของดาเมจทีม (เดิม 3.6)',
            pq['rq']==[pq['er']] and pq['dr']>0 and pq['A2'] and abs(pq['fa']-1.3)<.01 and pq['ea'] in pq['ha'] and pq['da']>0 and pq['gk']==pq['egk'],pq)
        await C.ev("()=>{dgLeave()}");await C.wait(1500)
        # ③ ฐานฟ้า: น้ำหนักในวงยก 45× · บอสดันไม่ฟื้นเลือดทันทีเมื่อผู้เล่นซ่อนตัว (ต้องไม่มีเป้า 4 วิก่อน)
        await C.ev("()=>{me.down=0;me.hp=me.mh;enterMap(45,{x:1600,y:1300})}");await C.wait(1200);await C.ev("()=>{pfnEnter()}");await C.wait(1500)
        pf=await C.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));dg={ph:'boss',w:0,tl:3000,nx:0};mons=[];teles=[];bossCd=1e9;pfnReset();spawnBoss();PFN.at=999;const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.a1=99;Bm.a2=99;Bm.s1=1;Bm.s2=1;Bm.stun=99;
          PFN.man=[0,0,1];me.x=PFC[0][0];me.y=PFC[0][1];gmGod=false;me.down=0;me.hp=me.mh;await w(4200);me.hp=me.mh;me.shv=0;me.dgI=0;__dd=[];const h0=me.hp;PFN.wt.push({u:uid,x:me.x,y:me.y,t:.05});await w(400);
          const dw=Math.round(h0-me.hp),wq=__dd.filter(x=>x[0]==='pfnDmg'&&x[1]===uid).map(x=>x[2]),ew=Math.round(45*BS().dm*bossX());gmGod=true;
          Bm.stun=0;Bm.hp=Bm.mh*.5;Bm.__u60h=Bm.hp;Bm.brkU=0;Bm.noT=0;Bm.x=Bm.hx;Bm.y=Bm.hy;me.x=CX;me.y=Bm.hy+480;me.cd=1e9;lockId=null;await w(2600);const a=Bm.hp/Bm.mh;await w(2600);const b=Bm.hp/Bm.mh;me.cd=0;
          return {wq,ew,dw,a:Math.round(a*1000)/1000,b:Math.round(b*1000)/1000}}""")
        rep('ฐานฟ้า: น้ำหนักสามร้อยปีในวงยก = 45× (เดิม 55×) · บอสไม่มีเป้า (ซ่อนตัว/ยืนไกล) 2.6 วิ ยังไม่ฟื้นเลือด · เกิน 4 วิ จึงฟื้น',pf['wq']==[pf['ew']] and pf['dw']>0 and pf['a']==.5 and pf['b']>.5,pf)
        await C.ev("()=>{dgLeave()}");await C.wait(1200)
        E=[e for C in (A,B,C) for e in C.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
