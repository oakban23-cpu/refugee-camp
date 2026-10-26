"""v537 ภาค 9 บทที่ 3 · ทุ่งตาข่ายดาว: แมพ 42 (เส้นด้าย · ด้ายกระตุก · ดาวติดใย 6 ดวง) · ล่า 40 · ดักแด้ใจกลาง ทางเลือก q9 (1 ตัดด้ายหลัก → ต้านฝูง / 2 แก้ปม) · ฉายา"""
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
SH='../v537/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Qa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Qb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p9s3)");n7=await A.ev("()=>STY.length-STY.findIndex(x=>x.p9s3)")
        rep('บทที่ 3 ต่อจากบทที่ 2 (7 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p9c2)")+1 and n7==7,[i0,n7])
        for C in (A,B):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:1,e8:1,p9sf:31,p9gr:15}};me.ach.stQ2=1;me.wv=[1,9,32,36,38,39,40,41,2,3];ov.hidden=true;enterMap(41,{{x:Q9D[0].x+60,y:Q9D[0].y}})}}")
        await A.wait(2600)
        h0=await A.ev("()=>MAPS[41].gates.filter(G=>G.to===42).map(G=>gHid(G))")
        ql=await A.ev("()=>{const N=MAPS[41].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await B.ev("()=>{const N=MAPS[41].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}")
        await adv(A);await adv(B)
        h1=await A.ev("()=>MAPS[41].gates.filter(G=>G.to===42).map(G=>gHid(G))")
        rep('คุยลูมิน่า (วงแหวนเฟือง): ทุ่งตาข่ายดาว · ประตูท่าตะวันออกซ่อนก่อนคุย เปิดหลังคุย',ql[0]=='lum2' and 'ทุ่งตาข่ายดาว' in ql[1] and h0==[True] and h1==[False],[ql[0],h0,h1])
        for C in (A,B):
            await C.ev("()=>{const G=MAPS[41].gates.find(G=>G.to===42);me.x=G.x;me.y=G.y;Q9Q.lx=me.x;Q9Q.ly=me.y;useGate()}")
        await A.wait(3000);await adv(A);await adv(B)
        m=await A.ev("()=>[curMap,stCur().p9st?1:0,wb9Zone(me.x,me.y),MAPS[42].n,WMN[42]&&WMN[42][2],WMLV[42],bTheme()]")
        lv=await A.ev("()=>{const L=mons.filter(m=>m.t<3).map(m=>m.L);return [Math.min(...L),Math.max(...L),mons.filter(m=>m.t<3).every(m=>wb9In(m.hx,m.hy,0)&&!wb9Safe(m.hx,m.hy))]}")
        await A.ev("()=>{PALG.card=null;PALG.title=null}");await A.wait(600)
        await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=80)
        rep('ประตูเฟือง → แมพ 42 (หมุดยึดขอบตาข่าย) · ขั้นปลดดาว · มอนธีม 44 Lv 152–156 บนตาข่าย · แผนที่โลก',m[0]==42 and m[1]==1 and m[2]=='land' and m[3]=='ทุ่งตาข่ายดาว' and m[4]=='ทุ่งตาข่ายดาว' and m[5]==[152,156] and m[6]==44 and 152<=lv[0] and lv[1]<=157 and lv[2],[m,lv])
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons.forEach(m=>{m.stun=99;m.x=m.hx=3000;m.y=m.hy=3000});WB9S.tg=99;const[x,y]=wb9P(560,1);me.x=x;me.y=y;WB9S.lx=x;WB9S.ly=y;await w(300);const a=[Math.round(me.x),Math.round(me.y)];
          me.x=WB9C.x+260;me.y=WB9C.y+120;await w(300);const bk=[Math.round(me.x),Math.round(me.y)];return {a,bk,th:wb9In(x,y,0),hub:wb9In(WB9C.x+80,WB9C.y,0),vo:wb9In(WB9C.x+260,WB9C.y+120,0),aq:aqWalkable(WB9C.x+260,WB9C.y+120),noon:worldLight.toString().includes('curMap===42')}}""")
        rep('เส้นด้าย/ใจกลางเดินได้ · ห้วงว่างเดินไม่ได้ (ดึงกลับ) · ออโต้เควสไม่เดินกลางอากาศ · ไม่มีกลางวันกลางคืน',w['a']==w['bk'] and w['th'] and w['hub'] and not w['vo'] and not w['aq'] and w['noon'],w)
        tg=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const mh0=me.mh;me.mh=5e6;mons.forEach(m=>{m.stun=99;m.x=m.hx=3000;m.y=m.hy=3000});gmGod=false;me.hp=me.mh;const s=WB9SEG[1],x=s[0]+(s[2]-s[0])*.5,y=s[1]+(s[3]-s[1])*.5;me.x=x;me.y=y;WB9S.lx=x;WB9S.ly=y;const k0=WB9S.hk|0,h0=me.hp;WB9S.sp=1;WB9S.ph=1;WB9S.t=.3;WB9S.hit=0;await w(1600);const r=[(WB9S.hk|0)-k0,Math.round((h0-me.hp)/me.mh*100)];gmGod=true;me.mh=mh0;me.hp=me.mh;WB9S.tg=99;return r}""")
        rep('ด้ายกระตุก: เส้นเรืองเตือนแล้วแรงกระตุกวิ่งผ่าน ยืนบนเส้นโดน ~7%',tg[0]==1 and 6<=tg[1]<=8,tg)
        got=[]
        for i in range(6):
            r=await A.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));const[x,y]=WB9ST[{i}];PALG.card=null;WB9S.tg=99;WB9S.ph=0;const st=performance.now();while(((me.sty.p9st|0)>>{i}&1)===0&&performance.now()-st<6000){{me.x=x;me.y=y+10;WB9S.lx=me.x;WB9S.ly=me.y;await w(80)}}return [me.sty.p9st|0,me.sty.n,PALG.card&&PALG.card.h]}}""")
            got.append(r)
        await A.pg.screenshot(path=SH+'t_star.jpg',quality=80)
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ปลดดาว 6 ดวง (ยืนข้างดาว 2.5 วิ · การ์ดเสียงดาว) → ขั้นล่า',got[-1][0]==63 and all('ดาว' in (g[2] or '') for g in got) and s3[0]==i0+3,[got[-1],s3])
        rs=await B.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await new Promise(r=>setTimeout(r,500));const[x,y]=WB9ST[0];me.sty.a=1;gmGod=false;WB9S.tg=99;WB9S.ph=0;me.x=x;me.y=y+10;WB9S.lx=me.x;WB9S.ly=me.y;await w(1500);const p1=WB9S.lt;WB9S.sp=0;WB9S.ph=2;WB9S.t=0;WB9S.hit=0;
          const s=WB9SEG[0];/* ด้ายกระตุกระหว่างตัด → เริ่มใหม่ */wb9Hit();gmGod=true;me.hp=me.mh;return [Math.round(p1*10)/10,WB9S.lt,me.sty.p9st|0]}""")
        rep('โดนด้ายกระตุกระหว่างตัดใย = เริ่มนับใหม่',rs[0]>=1 and rs[1]==0 and rs[2]==0,rs)
        await B.ev("()=>{me.sty.p9st=63;me.sty.n=6}");await adv(B)
        for C in (A,B):
            await until_a(C)
            await C.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(C);await C.wait(400);await adv(C)
        s4=await A.ev("()=>[me.sty.s,stCur().k,stTxt()]")
        rep('ล่า 40 → ไปหาลูมิน่าที่ใจกลาง',s4[0]==i0+4 and s4[1]=='lum3',s4)
        await A.ev("()=>{me.x=WB9C.x-40;me.y=WB9C.y+120;WB9S.lx=me.x;WB9S.ly=me.y;PALG.card=null}");await A.wait(1200);await A.pg.screenshot(path=SH+'t_hub.jpg',quality=80)
        ch={}
        for C,e in ((A,1),(B,2)):
            ql=await C.ev("()=>{const N=MAPS[42].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
            for i in range(60):
                if await C.ev("()=>!!(SD.on&&SD.choice)"):break
                await C.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await C.wait(80)
            cs=await C.ev("()=>SD.choice?SD.choice.map(c=>c[0]).join('|'):''")
            await C.ev(f"()=>SD.onChoose({e})");await C.wait(500);await adv(C);await until_a(C)
            ch[e]=[ql[0],'ดักแด้' in ql[1],cs,await C.ev("()=>[me.sty.q9,stCur().p9kt?1:0,stTxt(),wb9Free()]")]
        rep('ดักแด้ใจกลาง: ทางเลือก ตัดด้ายหลัก / แก้ปมทีละปม · ข้อความขั้นต่างกัน · ดาวหลุดหมดเฉพาะทาง 1',ch[1][0]=='lum3' and ch[1][1] and 'ตัดด้ายหลัก' in ch[1][2] and 'แก้ปม' in ch[1][2] and ch[1][3][0]==1 and ch[2][3][0]==2 and ch[1][3][1]==1 and ch[2][3][1]==1 and 'ระลอก' in ch[1][3][2] and 'ปม' in ch[2][3][2] and ch[1][3][3] and not ch[2][3][3],ch)
        fa=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const t0=WB9S.tg;WB9S.ph=0;WB9S.tg=0;await w(100);await w(2400);const tg=WB9S.tg;for(let i=0;i<39;i++)stKill(0,0);const n1=me.sty.n;stKill(0,0);return [n1,me.sty.n,Math.round(tg*10)/10]}""")
        await adv(A)
        sA=await A.ev("()=>[me.sty.s,stCur().k]")
        rep('ทางเลือก 1: ด้ายกระตุกถี่ขึ้น · ล่า 8 ตัว = 1 ระลอก · ครบ 5 ระลอก → ไปหาเซเลสต์',fa[0]==4 and fa[1]==5 and fa[2]<=7.5 and sA==[i0+6,'cel42'],[fa,sA])
        sh=await B.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.sty.p9kk=0;me.sty.n=0;WB9S.kp=[0,0,0,0,0];gmGod=false;me.hp=me.mh;const[x,y]=WB9K[0];while(wb9Calm())await w(50);const k0=WB9S.kk|0;me.x=x;me.y=y;WB9S.lx=x;WB9S.ly=y;await w(900);const r=[(WB9S.kk|0)-k0,me.sty.p9kk|0];gmGod=true;me.hp=me.mh;return r}""")
        kn=[]
        for i in range(5):
            r=await B.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));const[x,y]=WB9K[{i}];WB9S.tg=99;WB9S.ph=0;const st=performance.now();while(((me.sty.p9kk|0)>>{i}&1)===0&&performance.now()-st<12000){{const c=wb9Calm();me.x=x+(c?0:120);me.y=y+(c?0:-90);WB9S.lx=me.x;WB9S.ly=me.y;await w(60)}}return [me.sty.p9kk|0,me.sty.n]}}""")
            kn.append(r)
        await adv(B)
        sB=await B.ev("()=>[me.sty.s,stCur().k]")
        rep('ทางเลือก 2: แก้ปม 5 ปมตอนใยนิ่ง · ยืนบนปมตอนใยสั่น = โดน + เสียความคืบหน้า → ไปหาเซเลสต์',kn[-1][0]==31 and sh[0]>=1 and sh[1]==0 and sB==[i0+6,'cel42'],[kn,sh,sB])
        ends={}
        for C,e in ((A,1),(B,2)):
            await C.ev("()=>{enterMap(42,{x:WB9LD.x+30,y:WB9LD.y-50})}");await C.wait(1800)
            qc=await C.ev("()=>{const N=MAPS[42].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
            await adv(C);await C.ev("()=>{achCheck()}")
            ends[e]=[qc[0],'กล้องใหญ่' in qc[1],'ยังหลับ' in qc[1],await C.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stQ3,wb9Free()]")]
        rep('เซเลสต์: บทพูดแยกตาม q9 → จบบทที่ 3 · ฉายา «ผู้ปลดดาวจากตาข่าย» · ดาวหลุดหมดหลังจบบท',ends[1][0]=='cel42' and ends[1][1] and not ends[1][2] and ends[2][2] and not ends[2][1] and all(ends[e][3][0]==ends[e][3][1] and 'จบภาค 9 บทที่ 3' in ends[e][3][2] and ends[e][3][3] and ends[e][3][4] for e in (1,2)),ends)
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
