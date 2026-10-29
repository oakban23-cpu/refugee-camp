"""v560 กลไกฉากดันภาค 8–9 มีดาเมจจริง (สเกลดาเมจบอส = ท่าบอส/ภาค 10 · ตัวคูณต่ำกว่าภาค 10)
   ① ทุกกลไกใน *Sim ของ 6 ดัน (เรือดำ · ท้องวาฬ · ตาพายุ · หอนาฬิกาดาว · ใจกลางตาข่าย · ยอดหอทอดาว) + ท่าครีบ/หางในตาพายุ
      = ตัวคูณใหม่ × BS().dm × bossX() และลดเลือดจริง (ไม่ใช่ DT.dm/66 ≈ 1.1 แบบเดิม)
   ② ปาร์ตี้: เพื่อน (ไม่ใช่โฮสต์) โดนกลไกเดียวกันจริงผ่าน dmgOut
   ③ ท่าที่ไม่ได้แตะ (ท่าบอสใน *AI · ภาค 10) ยังเท่าเดิม · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from b10lib import PROF_JS, prof
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
HOOK="""()=>{window.__dd=[];window.__hd=[];if(!window.__hk){window.__hk=1;const w=n=>{const o=window[n];if(typeof o!=='function')return;window[n]=function(u,d){__dd.push([n,u,Math.round(d)]);return o.apply(this,arguments)};try{eval(n+'=window[n]')}catch(e){}};
  ['wblHit','wskHit','ctHit','cwHit','wvHit'].forEach(w);const oh=hurt;window.hurt=hurt=function(d){__hd.push(Math.round(d));return oh.apply(this,arguments)}}return 1}"""
# เตรียมดัน: เข้า → บอสเกิด มึนค้าง ไม่ใช้ท่าของตัวเอง · ผู้เล่นไม่อมตะ
PREP="""async([E,RS])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));window[E]();await w(1600);dg={ph:'boss',w:0,tl:5000,nx:0};mons=[];teles=[];bossCd=1e9;eval(RS+'()');spawnBoss();
  const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.a1=99;Bm.a2=99;Bm.s1=1;Bm.s2=1;Bm.stun=99;Bm.g1=99;Bm.g2=99;Bm.g3=99;gmGod=false;me.down=0;me.hp=me.mh;me.shv=0;me.dgI=0;try{VZ3.bi[curMap+':b:'+MAPS[curMap].boss.n]=1;VZ3.bi[curMap+':mvp:'+MAPS[curMap].boss.n]=1}catch(e){}me.x=Bm.x+90;me.y=Bm.y+70;/* เปิดตัวบอส (อมตะ 3.6 วิ) ให้จบก่อน/ข้าม */await w(2500);me.inv3=0;me.hp=me.mh;return [curMap,BS().dm*bossX(),BS().dm,bossX()]}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Va'+str(random.randint(100,999)),'mage',99)
        await A.ev(PROF_JS,[prof('P9','mage')])
        await A.ev("()=>{window.DNH=12;AUTO.on=false;me.gold=1e8;ov.hidden=true;me.inv.hp=0;enterMap(45,{x:1600,y:1300})}");await A.wait(1500)
        await A.ev(HOOK)
        out={}
        async def leave():
            await A.ev("()=>{gmGod=true;if(isDg())dgLeave()}");await A.wait(1300);await A.ev("()=>{me.down=0;me.hp=me.mh;enterMap(45,{x:1600,y:1300})}");await A.wait(1100)
        # ---------- เรือดำ ----------
        pr=await A.ev(PREP,['gdlEnter','gdlReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=CX-200;me.y=CY+40;await w(300);me.hp=me.mh;me.inv3=0;__hd=[];const h0=me.hp;
          GDL.tl=1;GDL.tt=4.5;GDL.wn=0;const t=(me.x-(GDX0+30))/360;GDL.br=[{y:me.y,t0:performance.now()-t*1000+120,h:{}}];await w(700);GDL.tl=0;GDL.br=[];gmGod=true;
          return {raw:__hd.slice(),lost:Math.round(h0-me.hp),exp:Math.round(35*BS().dm*bossX())}}""")
        out['เรือดำ ถังไม้']=r;r['ok']=r['exp'] in r['raw'] and r['lost']>0
        await leave()
        # ---------- ท้องวาฬ ----------
        pr=await A.ev(PREP,['wblEnter','wblReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const dm=BS().dm*bossX();me.x=CX-470;me.y=CY;await w(300);me.hp=me.mh;me.inv3=0;
          __dd=[];let h0=me.hp;WBQ.ac=2;WBQ.at=4.5;WBQ.tk=0;WBQ.st=99;await w(1300);WBQ.ac=0;WBQ.at=99;const acid=__dd.filter(x=>x[0]==='wblHit'&&x[1]===uid).map(x=>x[2]),la=Math.round(h0-me.hp);
          me.x=CX-470;me.y=CY+150;await w(250);me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;const outer=wbOuter(me.x,me.y);WBQ.sq=1;WBQ.sk=.05;await w(400);const sq=__dd.filter(x=>x[0]==='wblHit'&&x[1]===uid).map(x=>x[2]),ls=Math.round(h0-me.hp);WBQ.sq=0;WBQ.st=99;
          me.x=WBRB[1];me.y=CY;await w(250);me.hp=me.mh;me.inv3=0;__dd=[];WBQ.ac=2;WBQ.at=2;WBQ.tk=0;await w(900);const safe=__dd.filter(x=>x[0]==='wblHit'&&x[1]===uid).length;WBQ.ac=0;WBQ.at=99;gmGod=true;
          return {acid,la,ea:Math.round(8*dm),outer,sq,ls,es:Math.round(45*dm),safe}}""")
        r2=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const Bm=mons.find(m=>m.t===3);Bm.hp=Bm.mh*.495;await w(300);const ph=WBQ.sh,lk=Bm.wbpT;await w(6600);
          Bm.inv=1;addHit(Bm,1000,0,1,'mage');const st=Bm.shT;Bm.inv=0;await w(300);Bm.hp=Bm.mh*.3;await w(800);const f=Bm.hp/Bm.mh;return {ph,lk:Math.round(lk||0),st:Math.round(st||0),f:Math.round(f*1000)/1000}}""")
        rep('ท้องวาฬ: ช่วงไข่มุก (ล็อกเลือด 6 วิ) จบแล้ว ตีบอสตอนขึ้นโล่ → เลือดไม่ค้าง 50% (เดิมค้างตลอด ฆ่าไม่ตาย)',r2['ph']==1 and r2['lk']>0 and r2['f']<.35,r2)
        out['ท้องวาฬ กรด/ผนังบีบ']=r;r['ok']=len(r['acid'])>=2 and all(v==r['ea'] for v in r['acid']) and r['la']>0 and r['outer'] and r['sq']==[r['es']] and r['ls']>0 and r['safe']==0
        await leave()
        # ---------- ตาพายุ ----------
        pr=await A.ev(PREP,['wskEnter','wskReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const dm=BS().dm*bossX(),Bm=mons.find(m=>m.t===3);me.x=CX+200;me.y=CY;await w(300);me.hp=me.mh;me.inv3=0;
          __dd=[];let h0=me.hp;Bm.dvH=Bm.hp;WSK.dv=2;WSK.dt=6;WSK.tk=0;await w(1300);WSK.dv=0;WSK.nd=99;const dive=__dd.filter(x=>x[0]==='wskHit'&&x[1]===uid).map(x=>x[2]),ld=Math.round(h0-me.hp);
          Bm.hp=Bm.mh*.45;WSK.lt=99;await w(200);me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;WSK.lp={t:.05,p:[[Math.round(me.x),Math.round(me.y)]]};await w(400);const bolt=__dd.filter(x=>x[0]==='wskHit'&&x[1]===uid).map(x=>x[2]),lb=Math.round(h0-me.hp);
          if(!mons.some(m=>m.wsp))wskParts();await w(300);const fin=mons.find(m=>m.wsp==='fl'||m.wsp==='fr');let fh=null;if(fin){fin.g1=99;fin.stun=0;me.x=fin.x;me.y=fin.y+40;await w(300);me.hp=me.mh;me.inv3=0;__hd=[];fin.sl0={k:fin.wsp,t:.05,x:Math.round(me.x),y:Math.round(me.y),r:190};await w(500);fh=__hd.slice()}
          gmGod=true;return {dive,ld,ed:Math.round(8*dm),bolt,lb,eb:Math.round(45*dm),fin:!!fin,fh,ef:Math.round(40*dm)}}""")
        out['ตาพายุ ดำลงเมฆ/ฟ้าผ่า/ครีบ']=r;r['ok']=len(r['dive'])>=2 and all(v==r['ed'] for v in r['dive']) and r['ld']>0 and r['bolt']==[r['eb']] and r['lb']>0 and r['fin'] and r['ef'] in (r['fh'] or [])
        await leave()
        # ---------- หอนาฬิกาดาว ----------
        pr=await A.ev(PREP,['ctwEnter','ctwReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const dm=BS().dm*bossX();
          const put=()=>{const[ah,am]=ctAng(),[sh,sm]=ctSpd(),a=am+Math.sign(sm)*.12;me.x=CX+Math.cos(a)*300;me.y=CY+Math.sin(a)*300};put();await w(30);me.hp=me.mh;me.inv3=0;__dd=[];CTH[uid]=0;let h0=me.hp;put();await w(500);
          const hand=__dd.filter(x=>x[0]==='ctHit'&&x[1]===uid).map(x=>x[2]),lh=Math.round(h0-me.hp);
          me.x=CX-60;me.y=CY+380;await w(200);me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;CTH[uid]=performance.now()+9e9;CT.gt=99;CT.gc={t:.05,p:[[Math.round(me.x),Math.round(me.y)]]};await w(400);const gear=__dd.filter(x=>x[0]==='ctHit'&&x[1]===uid).map(x=>x[2]),lg=Math.round(h0-me.hp);
          me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;CT.ts=2;CT.tt=3;CT.lit=[3];CT.tk=0;await w(1300);CT.ts=0;CT.tt=99;CT.lit=[];const stop=__dd.filter(x=>x[0]==='ctHit'&&x[1]===uid).map(x=>x[2]),lt=Math.round(h0-me.hp);CTH[uid]=0;
          gmGod=true;return {hand,lh,eh:Math.round(12*dm),gear,lg,eg:Math.round(50*dm),stop,lt,et:Math.round(7*dm)}}""")
        out['หอนาฬิกาดาว เข็ม/เฟือง/หยุดเวลา']=r;r['ok']=r['hand']==[r['eh']] and r['lh']>0 and r['gear']==[r['eg']] and r['lg']>0 and len(r['stop'])>=2 and all(v==r['et'] for v in r['stop']) and r['lt']>0
        await leave()
        # ---------- ใจกลางตาข่าย ----------
        pr=await A.ev(PREP,['cwnEnter','cwnReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const dm=BS().dm*bossX();me.x=CX+Math.cos(CWSP[2])*300;me.y=CY+Math.sin(CWSP[2])*300;await w(300);me.hp=me.mh;me.inv3=0;
          __dd=[];let h0=me.hp;CWN.st=99;CWN.sp=[2];CWN.spt=.05;await w(400);const sp=__dd.filter(x=>x[0]==='cwHit'&&x[1]===uid).map(x=>x[2]),ls=Math.round(h0-me.hp);
          me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;CWN.ft=99;CWN.fp=[[CX-300,CY-200]];CWN.fs=.05;await w(400);const fear=__dd.filter(x=>x[0]==='cwHit'&&x[1]===uid).map(x=>x[2]),lf=Math.round(h0-me.hp);
          me.x=CX-300;me.y=CY-200;await w(200);me.hp=me.mh;me.inv3=0;__dd=[];CWN.fp=[[CX-300,CY-200]];CWN.fs=.05;await w(400);const inLight=__dd.filter(x=>x[0]==='cwHit'&&x[1]===uid).length;
          gmGod=true;return {sp,ls,es:Math.round(45*dm),fear,lf,ef:Math.round(70*dm),inLight}}""")
        out['ใจกลางตาข่าย ซี่ใย/ความกลัว']=r;r['ok']=r['sp']==[r['es']] and r['ls']>0 and r['fear']==[r['ef']] and r['lf']>0 and r['inLight']==0
        await leave()
        # ---------- ยอดหอทอดาว ----------
        pr=await A.ev(PREP,['wvrEnter','wvrReset'])
        r=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const dm=BS().dm*bossX(),Bm=mons.find(m=>m.t===3);me.x=CX+250;me.y=CY+60;await w(2600);me.hp=me.mh;me.inv3=0;
          __dd=[];let h0=me.hp;WVR.nt=99;WVR.nd={t:.05,a:[Math.atan2(me.y-CY,me.x-CX)]};await w(400);const nd=__dd.filter(x=>x[0]==='wvHit'&&x[1]===uid).map(x=>x[2]),ln=Math.round(h0-me.hp);
          Bm.hp=Bm.mh*.2;WVR.ank=0;await w(2600);WVR.ank=0;mons.filter(m=>m.ank).forEach(m=>m.hp=0);WVR.mt=99;me.hp=me.mh;me.inv3=0;__dd=[];h0=me.hp;WVR.mp={t:.05,p:[[Math.round(me.x),Math.round(me.y)]]};await w(400);const mt=__dd.filter(x=>x[0]==='wvHit'&&x[1]===uid).map(x=>x[2]),lm=Math.round(h0-me.hp);
          gmGod=true;return {ph:WVR.ph,nd,ln,en:Math.round(50*dm),mt,lm,em:Math.round(55*dm)}}""")
        out['ยอดหอทอดาว เข็ม/ดาวตก']=r;r['ok']=r['nd']==[r['en']] and r['ln']>0 and r['mt']==[r['em']] and r['lm']>0
        await leave()
        for k,v in out.items(): rep('กลไก '+k+' = ตัวคูณใหม่ × ดาเมจบอส และลดเลือดจริง',v['ok'],v)
        # ---------- ② ปาร์ตี้: เพื่อนโดนจริง ----------
        Bc=await new_client(b,'Vb'+str(random.randint(100,999)),'archer',99)
        await Bc.ev(PROF_JS,[prof('P9','archer')])
        await A.ev("()=>{gmGod=true;enterMap(45,{x:1600,y:1300})}");await Bc.ev("()=>{window.DNH=12;AUTO.on=false;ov.hidden=true;me.inv.hp=0;enterMap(45,{x:1620,y:1310})}");await A.wait(2000)
        await A.ev(f"()=>ptInvite('{Bc.uid}')");await Bc.wait(1500);await Bc.ev("()=>ptAccept()");await Bc.wait(2200)
        await A.ev("()=>{ctwEnter()}");await A.wait(2200);rid=await A.ev("()=>curMap")
        await Bc.ev(f"()=>{{dgJoin({rid});if(curMap!=={rid})dgEnter({rid})}}");await Bc.wait(2500)
        await A.ev("""()=>{dg={ph:'boss',w:0,tl:5000,nx:0};mons=[];teles=[];bossCd=1e9;ctwReset();spawnBoss();const Bm=mons.find(m=>m.t===3);Bm.w1=999;Bm.w2=999;Bm.w3=999;Bm.a1=99;Bm.a2=99;Bm.s1=1;Bm.s2=1;Bm.stun=99;CT.gt=99;CT.tt=99;me.x=CX-200;me.y=CY+400;gmGod=true}""")
        await Bc.ev("()=>{gmGod=false;me.down=0;me.x=CX+60;me.y=CY+420;window.__pin=setInterval(()=>{me.x=CX+60;me.y=CY+420},50)}");await A.wait(2500)
        await Bc.wait(2500);await Bc.ev("()=>{me.hp=me.mh;me.shv=0;me.dgI=0;me.inv3=0}");h0=await Bc.ev("()=>me.hp")
        sent=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const u=Object.keys(others)[0],o=others[u];CTH[u]=CTH[uid]=performance.now()+9e9;for(const k in CTH)CTH[k]=performance.now()+9e9;__dd=[];CT.gc={t:.05,p:[[Math.round(o.x),Math.round(o.y)]]};await w(500);return {u,ox:Math.round(o.x-CX),oy:Math.round(o.y-CY),dd:__dd.filter(x=>x[0]==='ctHit').map(x=>[x[1]===uid?'host':'mem',x[2]]),exp:Math.round(50*BS().dm*bossX())}}""")
        await Bc.wait(1500)
        h1=await Bc.ev("()=>me.hp")
        await Bc.ev("()=>{clearInterval(window.__pin);gmGod=true}")
        rep('ปาร์ตี้: เพื่อนที่ไม่ใช่โฮสต์โดนฝนเฟืองจริง (โฮสต์ส่ง 50× ผ่าน dmgOut → เลือดเพื่อนลด)',any(x[0]=='mem' and x[1]==sent['exp'] for x in sent['dd']) and h1<h0-sent['exp']*.25,[sent,round(h0),round(h1)])
        # ---------- ③ ของที่ไม่แตะ ----------
        nt=await A.ev("()=>[typeof ptdDmg,DT[32].dm,DT[26].dm,DT[31].dm]")
        rep('ตาราง DT ไม่เปลี่ยน (ดาเมจบอส/เลือด/รางวัลเดิม) · ภาค 10 ยังเหมือน v553',nt==['function',80,70,82],nt)
        E=[e for C in (A,Bc) for e in C.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
