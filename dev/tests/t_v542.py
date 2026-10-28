"""v542 ภาค 9 บทที่ 5 · ผู้ทอ (บทจบ): ดันยอดหอทอดาว ผู้ทอ 3 ร่าง · ฉากจบ e9 สองทาง · รางวัลจบภาค (ฉายา · ดาวน้อย · ดาวหางเงิน)"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
async def adv(A,n=24):
    for i in range(n):
        await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(80)
    for i in range(90):
        on=await A.ev("()=>{if(!isDg())mons=mons.filter(m=>m.t===3||Math.hypot(m.x-me.x,m.y-me.y)>340);stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}return SD.on&&!SD.choice}")
        await A.wait(80)
        if not on:break
async def until_a(A):
    for i in range(30):
        if await A.ev("()=>me.sty.a===1&&!SD.on"):break
        await adv(A,3)
TALK="(n)=>{const N=n===1?MAPS[42].npc:MAPS[42].npc2;npcSel=n;me.x=N.x;me.y=N.y+40;WB9S.lx=me.x;WB9S.ly=me.y;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}"
GOD5="const mh0=me.mh;me.mh=5e6;me.hp=me.mh;gmGod=false;"
UNGOD="gmGod=true;me.mh=mh0;me.hp=me.mh;"
SH='../v542/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Wa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Wb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p9s8)");n3=await A.ev("()=>STY.length-STY.findIndex(x=>x.p9s8)")
        rep('บทจบต่อจากบทที่ 4 (3 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p9c4)")+1 and n3>=3,[i0,n3])
        for C,q9,e8 in ((A,1,1),(B,2,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:1,e8:{e8},p9sf:31,p9gr:15,p9st:63,q9:{q9},p9ec:7}};me.ach.stQ4=1;me.wv=[1,9,32,36,38,39,40,41,42,2,3];ov.hidden=true;enterMap(42,{{x:WB9C.x,y:WB9C.y+120}})}}")
        await A.wait(2600)
        la=await A.ev(TALK,1);lb=await B.ev(TALK,1)
        await adv(A);await adv(B)
        rep('ลูมิน่า: บทพูดแยกตาม e8+q9 (ช่องที่วาฬชนขาด / ปีนขึ้นเงียบ ๆ) → ขั้นยอดหอ',la[0]=='lum3' and 'วาฬดาวชนขาด' in la[1] and 'เงียบ' not in la[1] and 'เงียบ' in lb[1] and 'วาฬดาว' not in lb[1] and await A.ev("()=>stCur().g")=='wvr',[la[1][-120:],lb[1][-120:]])
        info={}
        for C,nm in ((A,'A'),(B,'B')):
            await until_a(C);await C.ev(TALK,1);await adv(C,6)
            for i in range(20):
                if await C.ev("()=>WVRI()"):break
                await C.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}}");await C.wait(300)
            await C.ev("()=>dgStart()");await adv(C,8);await C.wait(1500)
            info[nm]=await C.ev("()=>{const B=mons.find(m=>m.t===3);return [WVRI(),curMap>=45000&&curMap<46000,MAPS[curMap].n,B&&B.n||MAPS[curMap].boss.n,B?Math.round(B.mh):0,WVRFX.ph]}")
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=80)
        rep('เข้ายอดหอทอดาว (ห้อง 45xxx) · บอสผู้ทอ ร่าง ① · q9=1 เลือด +10%',info['A'][0] and info['A'][1] and info['A'][2]=='ยอดหอทอดาว' and info['A'][3]=='ผู้ทอ' and abs(info['A'][4]/info['B'][4]-1.1)<.02 and info['A'][5]==1,info)
        nd=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"WVR.wh=99;WVR.tr=0;me.x=CX+250;me.y=CY+60;const k0=WVR.hk|0;WVR.nd=null;WVR.nt=0;await w(300);const n=WVR.nd?WVR.nd.a.length:0;await w(1400);const r=[n,(WVR.hk|0)-k0];"+UNGOD+"WVR.nt=99;return r}")
        rep('ร่าง ①: เข็ม 3 แนว (เล็งผู้เล่น) เตือนแล้วยิง ยืนในแนวโดน',nd[0]==3 and nd[1]>=1,nd)
        p2=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const B=mons.find(m=>m.t===3);B.hp=B.mh*.6;await w(2600);"+GOD5+"const ph=WVR.ph,fph=WVRFX.ph;me.x=CX+200;me.y=CY+200;const k0=WVR.rk|0;WVR.rp=null;WVR.rt=0;WVR.st=99;await w(1800);const x0=me.x;me.x+=80;await w(300);const stuck=Math.abs(me.x-x0)<5;const r=[ph,fph,(WVR.rk|0)-k0,stuck];"+UNGOD+"WVR.rt=99;WVRFX.root=0;return r}")
        await A.pg.screenshot(path=SH+'t_ph2.jpg',quality=80)
        rep('ร่าง ② กี่ทอ: ด้ายรัดใต้เท้า โดนแล้วติดกับที่',p2[0]==2 and p2[1]==2 and p2[2]==1 and p2[3],p2)
        p3=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const B=mons.find(m=>m.t===3);B.hp=B.mh*.3;await w(2600);const n=mons.filter(m=>m.ank&&m.hp>0).length;B.hp=B.mh*.2;await w(400);const lock=Math.round(B.hp/B.mh*100);WVR.wh=0;await w(2000);const n2=mons.filter(m=>m.ank&&m.hp>0).length;mons.filter(m=>m.ank).forEach(m=>m.hp=0);await w(500);B.hp=B.mh*.2;await w(400);return [WVR.ph,n,lock,n2,WVR.ank,Math.round(B.hp/B.mh*100)]}")
        await A.pg.screenshot(path=SH+'t_ph3.jpg',quality=80)
        rep('ร่าง ③ แกนกลาง: หมุดด้าย 3 หมุด ล็อกเลือด 33% · วาฬดาวงับหมุดไป 1 · ทำลายครบเลือดลดต่อ',p3[0]==3 and p3[1]==3 and p3[2]==33 and p3[3]==2 and p3[4]==0 and p3[5]==20,p3)
        mt=await A.ev("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));"+GOD5+"WVR.wh=99;me.x=CX-150;me.y=CY+150;const k0=WVR.hk|0;WVR.mp=null;WVR.mt=0;await w(1700);const r=(WVR.hk|0)-k0;"+UNGOD+"WVR.mt=99;return r}")
        rep('ร่าง ③: ดึงดาวลงมาเป็นอุกกาบาต (วงเตือนใต้เท้า)',mt>=1,mt)
        for C in (A,B):
            for i in range(30):
                if await C.ev("()=>dg.ph==='win'||dgRew"):break
                await C.ev("()=>{WVR.ank=0;mons.forEach(m=>{if(m.t!==3)m.hp=0});mons=mons.filter(m=>m.t===3);const B=mons.find(m=>m.t===3&&m.hp>0);if(B){B.inv=0;B.hp=1;me.x=B.x;me.y=B.y+80;try{dmgMon(B,1e6)}catch(e){B.hp=0}}}");await C.wait(400)
            for i in range(40):
                if await C.ev("()=>curMap===42"):break
                await C.wait(500)
            await adv(C)
        s2=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k]")
        rep('ชนะผู้ทอ → กลับทุ่งตาข่าย → ขั้นตัดสินชะตา (เซเลสต์)',s2==[42,i0+2,'cel42'],s2)
        ends={}
        for C,e in ((A,1),(B,2)):
            await until_a(C);await C.ev(TALK,2)
            for i in range(60):
                if await C.ev("()=>!!(SD.on&&SD.choice)"):break
                await C.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await C.wait(80)
            cs=await C.ev("()=>SD.choice?SD.choice.map(c=>c[0]).join('|'):''")
            await C.ev(f"()=>SD.onChoose({e})");await C.wait(400)
            seen=[]
            for i in range(160):
                q=await C.ev("()=>{const t=SD.on?SD.q.map(l=>l[1]).join('|'):'';if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}stTick();return t}")
                if q and q not in seen: seen.append(q)
                await C.wait(80)
                if await C.ev("()=>!SD.on&&(me.sty.s>=STY.length||!!(stCur()&&stCur().pas1))"):break
            await C.wait(1200);await C.ev("()=>{achCheck()}")
            ends[e]=[cs,'|'.join(seen),await C.ev("()=>[me.sty.e9,me.sty.s,STY.length,stTxt(),!!me.ach.stQ5a,!!me.ach.stQ5b,me.pets.includes(PETS.findIndex(P=>P&&P.star9)),PETS[PETS.findIndex(P=>P&&P.star9)].n,(me.mts||[]).includes(8),MOUNTS[8]&&MOUNTS[8].n]")]
        a1,a2=ends[1],ends[2]
        rep('ฉากจบ e9: ทางเลือก 2 ทาง · บทจบแยกตามทาง (ดาวกลับฟ้า / สะพานดาว · ออร์รีนับดาวครบ / นับคนขึ้นสะพาน)','คืนดาว' in a1[0] and 'สะพานดาว' in a1[0] and 'กระพริบสามครั้ง' in a1[1] and 'นับดาวครบ' in a1[1] and 'สะพานดาว' in a2[1] and 'นับคนที่เดินขึ้นไป' in a2[1] and 'นับดาวครบ' not in a2[1],[a1[1][-200:],a2[1][-200:]])
        rep('รางวัลจบภาค: ฉายาตามฉากจบ (ผู้คืนดาวสู่ฟ้า / ผู้ถักสะพานดาว) · สัตว์เลี้ยงดาวน้อย · สัตว์ขี่ดาวหางเงิน · ข้อความจบภาค 9',a1[2][0]==1 and a2[2][0]==2 and a1[2][4] and not a1[2][5] and a2[2][5] and not a2[2][4] and a1[2][6] and a1[2][7]=='ดาวน้อย' and a1[2][8] and a1[2][9]=='ดาวหางเงิน' and (a1[2][1]==a1[2][2] or 'ภาค 10' in a1[2][3]) and ('จบภาค 9 ห้วงดาวไร้ขอบ' in a1[2][3] or 'ภาค 10' in a1[2][3]),[a1[2],a2[2]])
        rp=await A.ev("()=>{const N=MAPS[42].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.choice?SD.choice.map(c=>c[0]).join('|'):''}")
        await A.ev("()=>{try{stClose()}catch(e){}}")
        rep('เล่นซ้ำยอดหอทอดาวผ่านเซเลสต์หลังจบภาค','ยอดหอทอดาว' in rp,rp)
        dr=await A.ev("()=>{const c=document.createElement('canvas');c.width=300;c.height=150;const x=c.getContext('2d'),g0=g;let ok=1;try{g=x;drawPet(PETS.findIndex(P=>P&&P.star9),60,100,1,1,0,2);drawMount(8,200,100,1,1,1,2);PALK.q9spire({x:150,y:140},1)}catch(e){ok=String(e)}finally{g=g0}return ok}")
        rep('วาดสัตว์เลี้ยง/สัตว์ขี่/ยอดหอหลังจบภาคได้ไม่ error',dr==1,dr)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
