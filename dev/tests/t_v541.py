"""v541 ภาค 9 บทที่ 4 · ภาพสะท้อนในตาข่าย: เศษกระจก 3 ชิ้น · ดันใจกลางตาข่าย (ซี่ใยกระตุก · บ่อแสงดาว · กระจก 4 บาน · วาฬดาว e8=1) · ผลทางเลือก q9 · ฉายา"""
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
SH='../v541/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ra'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Rb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p9s5)");n5=await A.ev("()=>STY.length-STY.findIndex(x=>x.p9s5)")
        rep('บทที่ 4 ต่อจากบทที่ 3 (5 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p9c3)")+1 and n5==5,[i0,n5])
        for C,q9,e8 in ((A,1,1),(B,2,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:1,e8:{e8},p9sf:31,p9gr:15,p9st:63,q9:{q9}}};me.ach.stQ3=1;me.wv=[1,9,32,36,38,39,40,41,42,2,3];ov.hidden=true;enterMap(42,{{x:WB9LD.x+30,y:WB9LD.y-50}})}}")
        await A.wait(2600)
        qa=await A.ev(TALK,2);qb=await B.ev(TALK,2)
        await adv(A);await adv(B);await until_a(A);await until_a(B)
        rep('คุยเซเลสต์: บทพูดแยกตาม q9 (กำแพงกระจก / ละเมอ) → ขั้นเศษกระจก',qa[0]=='cel42' and 'กำแพงกระจก' in qa[1] and 'ละเมอ' not in qa[1] and 'ละเมอ' in qb[1] and await A.ev("()=>!!stCur().p9ec"),[qa[0],qa[1][-90:],qb[1][-90:]])
        got=[]
        for i in range(3):
            r=await A.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));const[x,y]=WB9EC[{i}];PALG.card=null;WB9S.tg=99;WB9S.ph=0;const st=performance.now();while(((me.sty.p9ec|0)>>{i}&1)===0&&performance.now()-st<6000){{me.x=x;me.y=y+10;WB9S.lx=me.x;WB9S.ly=me.y;await w(80)}}return [me.sty.p9ec|0,me.sty.n,PALG.card&&PALG.card.h]}}""")
            got.append(r)
        aq=await B.ev("()=>JSON.stringify(arAqT(stCur()))")
        await A.pg.screenshot(path=SH+'t_echo.jpg',quality=80)
        await adv(A);await B.ev("()=>{me.sty.p9ec=7;me.sty.n=3}");await adv(B)
        s2=await A.ev("()=>[me.sty.s,stCur().k]")
        rep('เศษกระจก 3 ชิ้น (ยืนข้าง 2 วิ · การ์ดความทรงจำโอเรียน · ออโต้เควสพาไป) → ไปหาลูมิน่า',got[-1][0]==7 and all('เศษกระจก' in (g[2] or '') for g in got) and 'เศษกระจก' in aq and s2==[i0+2,'lum3'],[got,aq[:80],s2])
        await until_a(A);await until_a(B)
        la=await A.ev(TALK,1);lb=await B.ev(TALK,1)
        await adv(A);await adv(B)
        rep('ลูมิน่า: เปิดทางใจกลางตาข่าย · ปล่อยวาฬ (e8=1) ได้ยินเสียงวาฬตามมา',la[0]=='lum3' and 'วาฬ' in la[1] and 'วาฬ' not in lb[1] and await A.ev("()=>stCur().g")=='cwn',[la[1][-80:],lb[1][-80:]])
        info={}
        for C,nm in ((A,'A'),(B,'B')):
            await until_a(C)
            await C.ev(TALK,1);await adv(C,6)
            for i in range(20):
                if await C.ev("()=>CWNI()"):break
                await C.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}}");await C.wait(300)
            await C.ev("()=>dgStart()");await adv(C,6);await C.wait(1200)
            info[nm]=await C.ev("()=>{const B=mons.find(m=>m.t===3);return [CWNI(),curMap>=49000&&curMap<50000,MAPS[curMap].n,B&&B.n||MAPS[curMap].boss.n,B?Math.round(B.mh):0,B?Math.round(B.hp/B.mh*100):0,CWN.st]}")
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=80)
        rep('เข้าใจกลางตาข่าย (ห้อง 49xxx) · บอสภาพสะท้อนโอเรียน · q9=1 เลือด +15% · q9=2 เริ่มที่ 88%',info['A'][0] and info['A'][1] and info['A'][2]=='ใจกลางตาข่าย' and info['A'][3]=='ภาพสะท้อนโอเรียน' and abs(info['A'][4]/info['B'][4]-1.15)<.02 and info['A'][5]==100 and 86<=info['B'][5]<=95,info)
        sp=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;const mh0=me.mh;me.mh=5e6;me.hp=me.mh;CWN.ft=99;CWN.wh=99;const a=CWSP[2];me.x=CX+Math.cos(a)*300;me.y=CY+Math.sin(a)*300;const k0=CWN.hk|0;CWN.spt=0;CWN.st=0;await w(300);const S=CWN.sp.slice();await w(1500);const r=[S,(CWN.hk|0)-k0];gmGod=true;me.mh=mh0;me.hp=me.mh;CWN.st=99;return r}""")
        rep('ซี่ใยกระตุก: 3 เส้น (รวมเส้นที่ยืน) เตือนแล้วกระตุก ยืนบนเส้นโดน',len(sp[0])==3 and 2 in sp[0] and sp[1]>=1,sp)
        fp=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;const mh0=me.mh;me.mh=5e6;me.hp=me.mh;CWN.st=99;me.x=CX;me.y=CY+60;let k0=CWN.hk|0;CWN.fs=0;CWN.ft=0;await w(300);const P=CWN.fp.slice();await w(2700);const out=(CWN.hk|0)-k0;
          k0=CWN.hk|0;CWN.ft=0;await w(300);const[x,y]=CWN.fp[0];me.x=x;me.y=y;await w(2700);const inn=(CWN.hk|0)-k0;gmGod=true;me.mh=mh0;me.hp=me.mh;CWN.ft=99;return [P.length,out,inn]}""")
        rep('เงาแห่งความกลัว: บ่อแสงดาว 3 บ่อ · นอกแสงโดน · ในแสงรอด',fp[0]==3 and fp[1]>=1 and fp[2]==0,fp)
        mr=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const B=mons.find(m=>m.t===3);B.hp=B.mh*.49;await w(500);const n=mons.filter(m=>m.mr&&m.hp>0).length;B.hp=B.mh*.3;await w(400);const lock=Math.round(B.hp/B.mh*100);mons.filter(m=>m.mr).forEach(m=>m.hp=0);await w(500);B.hp=B.mh*.3;await w(400);return [n,lock,CWN.mr,Math.round(B.hp/B.mh*100)]}""")
        await A.pg.screenshot(path=SH+'t_mirror.jpg',quality=80)
        rep('เลือด 50%: กระจก 4 บาน ล็อกเลือดไว้ที่ 50% · ทุบหมด เลือดลดต่อได้',mr[0]==4 and mr[1]==50 and mr[2]==0 and mr[3]==30,mr)
        wh=[]
        for C in (A,B):
            wh.append(await C.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));if(!CWNI())return 'no';const B=mons.find(m=>m.t===3&&m.hp>0);if(!B)return 'nob';const k0=CWN.wk|0,h0=B.hp;CWN.wh=0;await w(2000);return [(CWN.wk|0)-k0,Math.round((h0-B.hp)/B.mh*1000)/10]}"""))
        rep('วาฬดาวมาช่วยเฉพาะคนที่ปล่อยวาฬในภาค 8 (ชนตาข่าย บอสเสีย 2.5%)',wh[0][0]==1 and 2<=wh[0][1]<=3 and wh[1][0]==0,wh)
        for C in (A,B):
            await C.ev("()=>{const B=mons.find(m=>m.t===3);CWN.a5=1;CWN.mr=0;mons=mons.filter(m=>m.t===3);B.hp=1}")
            for i in range(30):
                if await C.ev("()=>dg.ph==='win'||dgRew"):break
                await C.ev("()=>{mons.forEach(m=>{if(m.t!==3)m.hp=0});mons=mons.filter(m=>m.t===3);const B=mons.find(m=>m.t===3&&m.hp>0);if(B){B.inv=0;me.x=B.x;me.y=B.y+80;try{dmgMon(B,1e6)}catch(e){B.hp=0}}}");await C.wait(400)
            for i in range(40):
                if await C.ev("()=>curMap===42"):break
                await C.wait(500)
            await adv(C)
        s4=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k]")
        rep('ชนะภาพสะท้อน → กลับทุ่งตาข่าย → ขั้นคุยเซเลสต์',s4==[42,i0+4,'cel42'],s4)
        ends={}
        for C,e in ((A,1),(B,2)):
            await until_a(C)
            qc=await C.ev(TALK,2);await adv(C);await C.ev("()=>{achCheck()}")
            ends[e]=[qc[0],'ต้องขึ้นไป' in qc[1],'ก่อนมันลืมตา' in qc[1],await C.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stQ4]")]
        rep('เซเลสต์: คำพูดสุดท้ายของภาพสะท้อน แยกตาม q9 → จบบทที่ 4 · ฉายา «ผู้มองเห็นภาพสะท้อน»',ends[1][0]=='cel42' and ends[1][1] and not ends[1][2] and ends[2][2] and not ends[2][1] and all(ends[e][3][0]==ends[e][3][1] and 'จบภาค 9 บทที่ 4' in ends[e][3][2] and ends[e][3][3] for e in (1,2)),ends)
        rp=await A.ev("()=>{const N=MAPS[42].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.choice?SD.choice.map(c=>c[0]).join('|'):''}")
        rep('เล่นซ้ำใจกลางตาข่ายผ่านลูมิน่าหลังจบบท','ใจกลางตาข่าย' in rp,rp)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
