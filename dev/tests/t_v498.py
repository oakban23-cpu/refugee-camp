"""v498 ภาค 8 บทที่ 2 · ราคาของการเปิดประตู: สภาค่าย (แยก p7m/e7) · คลังเสบียง (สมุนไพร/แร่/ปลา) · ซ่อมเรือตามจังหวะ · ดันเจี้ยนป้องกันท่าเรือ (แพ้/ชนะ · หนวดฟาด · หนวดรัด · เล่นสองคน) · ทางเลือก p8g · เรือเหาะ · ฉายา · เล่นซ้ำ"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(100)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(100)
        if not on:break
SH='../v498/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Pb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p8k)");n7=await A.ev("()=>STY.findIndex(x=>x.p8c2)-STY.findIndex(x=>x.p8k)+1")
        rep('ภาค 8 บทที่ 2 ต่อจากบทที่ 1 (7 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p8c1)")+1 and n7==7,[i0,n7])
        for C,e7,pm in ((A,2,2),(B,1,1)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:{e7},p7m:{pm},p8rs:31}};me.wv=[1,9,32,38,2,3];ov.hidden=true;enterMap(1,{{x:1600,y:1600}})}}")
        await A.wait(2500)
        qa=await A.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        qb=await B.ev("()=>{const N=MAPS[1].npc4;me.x=N.x;me.y=N.y+40;npcSel=4;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('สภาค่าย: บทพูดแยกตามทางเลือกเดิม (สหกรณ์/บรอม · นครลี้ภัย/ค่าย)','สหกรณ์' in qa and 'นับเลขเป็น' not in qa and 'นครลี้ภัย' in qa and 'นับเลขเป็น' in qb and 'สหกรณ์คนงานคาร์นเคย' not in qb and 'สภาค่ายประชุม' in qb,[len(qa),len(qb)])
        await adv(A);await adv(B)
        await A.ev("()=>{me.x=2650;me.y=2250;useGate()}");await A.wait(2600);await adv(A)
        m=await A.ev("()=>[curMap,stCur().p8sp?1:0,JSON.stringify(arAqT(stCur()))]")
        rep('ไปผาท่าเรือ: ขั้นส่งเสบียง · ออโต้เควสพาไปคลังเสบียง',m[0]==38 and m[1]==1 and 'คลังเสบียง' in m[2],m)
        # ===== คลังเสบียง =====
        far=await A.ev("async()=>{me.x=PHDEP.x+400;me.y=PHDEP.y+300;PHS.lx=me.x;PHS.ly=me.y;await new Promise(r=>setTimeout(r,500));const P=$('p8sp');return !P||P.hidden}")
        await A.ev("()=>{me.x=PHDEP.x;me.y=PHDEP.y+60;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;const G=gtSt();G.m={};const S=fsSt();S.c={};gtAdd('h1',4)}");await A.wait(700)
        d0=await A.ev("()=>{const P=$('p8sp');return {vis:P&&!P.hidden,dis:[...P.querySelectorAll('button')].map(b=>b.disabled)}}")
        await A.ev("()=>{gtAdd('h3',8);gtAdd('o1',3);gtAdd('o2',9);const S=fsSt();S.c.sky3=2;S.c.w0=4}");await A.wait(700)
        await A.pg.screenshot(path=SH+'t_depot.jpg',quality=78)
        d1=await A.ev("async()=>{for(const i of[0,1,2]){const b=$('p8sp').querySelector('[data-p8s=\"'+i+'\"]');if(b)b.click();await new Promise(r=>setTimeout(r,250))}const S=fsSt();return {bits:me.sty.p8sp,n:me.sty.n,h1:gtHas('h1'),h3:gtHas('h3'),o1:gtHas('o1'),o2:gtHas('o2'),w0:S.c.w0|0,sky3:S.c.sky3|0}}")
        rep('คลังเสบียง: แผงขึ้นเฉพาะตอนอยู่ใกล้ · ของไม่พอปุ่มกดไม่ได้ · ส่งแล้วหักของขั้นต่ำก่อน (ปลาธรรมดาก่อนปลาหายาก)',far and d0['vis'] and all(d0['dis']) and d1['bits']==7 and d1['h1']==0 and d1['h3']==2 and d1['o1']==0 and d1['o2']==2 and d1['w0']==0 and d1['sky3']==1,[far,d0,d1])
        await adv(A)
        # ===== ซ่อมเรือ =====
        await A.ev("()=>{const B=PHBERTH[0];me.x=B.r[0];me.y=B.r[1];PHS.lx=me.x;PHS.ly=me.y;mons=[]}");await A.wait(800)
        r0=await A.ev("()=>{const v=$('p8rp')&&!$('p8rp').hidden;P8RP.pos=P8RP.zc;P8RP.last=0;p8Hit();const h1=P8RP.h;P8RP.pos=P8RP.zc>.5?0:1;P8RP.last=0;p8Hit();return [v,h1,P8RP.h]}")
        await A.pg.screenshot(path=SH+'t_repair.jpg',quality=78)
        for i in range(4):
            await A.ev(f"()=>{{const B=PHBERTH[{i}];me.x=B.r[0];me.y=B.r[1];PHS.lx=me.x;PHS.ly=me.y;mons=[]}}");await A.wait(600)
            for k in range(3): await A.ev("()=>{if(P8RP.on>=0){P8RP.pos=P8RP.zc;P8RP.last=0;p8Hit()}}");await A.wait(120)
        r1=await A.ev("()=>[me.sty.p8rp,me.sty.n,PALG.card&&PALG.card.h]")
        await adv(A);r2=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ซ่อมเรือ: ยืนในวงแล้วแผงขึ้น · ตอกโดน +1 พลาด −1 · ครบ 3 หมุดต่อลำ ครบ 4 ลำ → ขั้นต่อไป',r0[0] and r0[1]==1 and r0[2]==0 and r1[0]==15 and 'ซ่อมเรือแล้ว' in (r1[2] or '') and r2[0]==i0+3,[r0,r1,r2])
        await A.ev("()=>{me.x=2700;me.y=1300;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1300);await A.pg.screenshot(path=SH+'t_ships.jpg',quality=78)
        await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A)
        # ===== ดันเจี้ยน: แพ้ก่อน =====
        await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2500)
        rid=await A.ev("()=>curMap")
        await B.ev(f"()=>{{dgMap({rid});enterMap({rid},{{x:CX,y:CY+380}})}}");await B.wait(3000)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1200)
        g0=await A.ev("()=>[HDFI(),dg.ph,HDF.st,isHost()]")
        await A.ev("()=>{HDF.nt=0}");await A.wait(3500)
        w=await A.ev("()=>[HDF.st,HDF.wv,mons.filter(m=>m.hdf).length]")
        await A.ev("()=>{HDF.e=[100,37,100];HDF.bt=0}");await A.wait(1200)
        bs=await B.ev("()=>[HDFI(),Math.round(HDF.e[1]),HDF.st]")
        rep('ดันเจี้ยนป้องกันท่าเรือ: เข้าจากซารา · เริ่มคลื่น · อีกเครื่องเห็นเลือดเครื่องดาวตรงกับโฮสต์',g0[0] and g0[1]=='run' and w[0]=='wave' and w[2]>0 and bs[0] and abs(bs[1]-37)<=2,[g0,w,bs])
        await A.ev("()=>{HDF.e=[0,0,0]}");await A.wait(1500)
        f=await A.ev("()=>[dg.ph,dg.why||'']");await A.wait(5500)
        f2=await A.ev("()=>[curMap,me.sty.s,me.sty.n]")
        rep('เครื่องดาวพังหมด 3 เครื่อง = แพ้ → กลับผาท่าเรือ ขั้นเนื้อเรื่องไม่ผ่าน',f[0]=='fail' and 'เครื่องดาว' in f[1] and f2[0]==38 and f2[1]==i0+4 and f2[2]==0,[f,f2])
        # ===== ดันเจี้ยน: ชนะ =====
        await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A);await A.wait(2500)
        await A.ev("()=>{dgStart()}");await adv(A);await A.wait(1000)
        for k in range(60):
            st=await A.ev("()=>{mons.forEach(m=>{if(m.hdf&&m.t!==3)m.hp=0});HDF.q=0;if(HDF.st==='brk')HDF.nt=0;HDF.e=HDF.e.map(v=>Math.max(v,60));return dg.ph}")
            if st=='boss':break
            await A.wait(400)
        await A.wait(1200)
        mech=await A.ev("async()=>{const Bo=mons.find(m=>m.t===3);Bo.inv=0;Bo.w1=0;Bo.w2=0;me.x=Bo.x;me.y=Bo.y+260;await new Promise(r=>setTimeout(r,900));const a=[HDLN.length,mons.filter(m=>m.hdg>=0).length,HDF.g];const e0=HDF.e.slice();await new Promise(r=>setTimeout(r,1500));return {a,e0,e1:HDF.e.slice(),bn:MAPS[curMap].boss.n}}")
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=78)
        gi=mech['a'][2]
        rep('บอสคราเคนเมฆ: หนวดฟาดขึ้นแถบเตือน · หนวดรัดเครื่องดาว (มีหนวดให้ตี · เครื่องที่ถูกรัดเลือดลด)',mech['a'][0]>=1 and mech['a'][1]>=1 and gi>=0 and mech['e1'][gi]<mech['e0'][gi] and mech['bn']=='คราเคนเมฆ',mech)
        lv=await A.ev("()=>{const e=$('vzbx');return e?e.textContent:''}")
        for k in range(30):
            ph=await A.ev("()=>{const i=mons.findIndex(m=>m.t===3);if(i>=0){mons[i].inv=0;mons[i].stun=0;mons[i].hp=Math.min(mons[i].hp,50);try{dmgMon(i,mons[i].hp+10)}catch(e){}}return dg.ph}")
            if ph=='win':break
            await A.wait(500)
        wn=await A.ev("()=>[dg.ph,me.sty.n,me.sty.a]")
        await A.wait(11000);await adv(A)
        bk=await A.ev("()=>[curMap,me.sty.s,stTxt()]")
        rep('ล้มคราเคน → ชนะ · กลับผาท่าเรือ · ขั้นต่อไปคือตัดสินใจเรื่องท่าเรือ',wn[0]=='win' and bk[0]==38 and bk[1]==i0+5 and 'ตัดสินใจ' in bk[2],[wn,bk,lv[:80]])
        # ===== ทางเลือก p8g =====
        await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A)
        ch=await A.ev("()=>[SD.on,SD.choice?SD.choice.map(c=>c[0]):null]")
        await A.ev("()=>{if(SD.onChoose)SD.onChoose(1)}");await adv(A);await A.wait(1200);await adv(A)
        af=await A.ev("()=>[me.sty.s,me.sty.p8g,gP8g(),stTxt()]")
        rep('เลือก 🚪 เปิดท่าให้ทุกลำ → p8g=1 · เรือดำเทียบท่า · ขั้นต่อไปคุยนาวิน',ch[0] and ch[1] and len(ch[1])==2 and af[1]==1 and af[2]==1 and 'นาวิน' in af[3],[ch,af])
        qn=await A.ev("()=>{const N=MAPS[38].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stN2]")
        rep('คุยนาวิน (บทพูดตามทางเลือก: เรือดำจุดโคม) → จบบทที่ 2 · ได้ฉายา «ผู้ถือกุญแจท่าเรือ»','จุดโคมแล้ว' in qn and 'ลอยมืดอยู่ข้างนอก' not in qn and en[0]==await A.ev("()=>STY.findIndex(x=>x.p8s3)") and 'ซารา' in en[2] and en[3],[en])
        await A.ev("()=>{me.x=2700;me.y=1000;PHS.lx=me.x;PHS.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1300);await A.pg.screenshot(path=SH+'t_end.jpg',quality=78)
        # ===== เรือเหาะ =====
        sh=await A.ev("()=>{wmCd=15;const r=[wmWhy(1),wmWhy(9),wmWhy(32),wmWhy(2)];wmUI(1);const btn=ov.querySelector('[data-wmgo]');const t=btn?btn.textContent:'';const note=!!ov.querySelector('.p8wm');ov.hidden=true;return {r,t,note}}")
        rep('⛵ เรือเหาะ: วาประหว่างท่า (ค่าย/อัสตรา/อารัณยา) ไม่ติดคูลดาวน์ · แมพอื่นยังติด · ปุ่มเขียน «ขึ้นเรือเหาะ»',sh['r'][0]=='' and sh['r'][1]=='' and sh['r'][2]=='' and 'วาปได้อีกครั้ง' in sh['r'][3] and 'เรือเหาะ' in sh['t'] and sh['note'],sh)
        # ===== เล่นซ้ำ =====
        await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A)
        rp=await A.ev("()=>{const N=MAPS[38].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();const c=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';stClose();return c}")
        rep('จบบทแล้ว (เริ่มบทที่ 3 กับซาราก่อน) คุยซาราเล่นศึกป้องกันท่าเรือซ้ำได้',('เฝ้าท่าเรือ' in rp),rp)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
