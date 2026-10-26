"""v536 ภาค 9 บทที่ 2 · วงแหวนเฟือง: แมพ 41 (วงแหวนหมุน · คลื่นหยุดเวลา · เฟืองเวลา 4 ตัว) · ล่า 40 · ดันหอนาฬิกาดาว (ผู้รักษาเวลา) · สมุดโอเรียน · ฉายา"""
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
SH='../v536/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Qa'+str(random.randint(100,999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p9s2)");n7=await A.ev("()=>STY.length-STY.findIndex(x=>x.p9s2)")
        rep('บทที่ 2 ต่อจากบทที่ 1 (7 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p9c1)")+1 and n7==7,[i0,n7])
        await A.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:1,e8:1,p9sf:31}};me.ach.stQ1=1;me.wv=[1,9,32,36,38,39,40,2,3];ov.hidden=true;enterMap(40,{{x:1850,y:1530}})}}")
        await A.wait(2600)
        h0=await A.ev("()=>MAPS[40].gates.filter(G=>G.to===41).map(G=>gHid(G))")
        ql=await A.ev("()=>{const N=MAPS[40].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A)
        h1=await A.ev("()=>MAPS[40].gates.filter(G=>G.to===41).map(G=>gHid(G))")
        rep('คุยลูมิน่า (ลานดาวลอย): วงแหวนเฟือง · ประตูเฟืองซ่อนก่อนคุย เปิดหลังคุย',ql[0]=='lum' and 'วงแหวนเฟือง' in ql[1] and h0==[True] and h1==[False],[ql[0],h0,h1])
        await A.ev("()=>{me.x=2150;me.y=1560;Q9S.lx=me.x;Q9S.ly=me.y;useGate()}");await A.wait(3000);await adv(A)
        m=await A.ev("()=>[curMap,stCur().p9gr?1:0,q9rZone(me.x,me.y),MAPS[41].n,WMN[41]&&WMN[41][2],WMLV[41]]")
        lv=await A.ev("()=>{const L=mons.filter(m=>m.t<3).map(m=>m.L);return [Math.min(...L),Math.max(...L),mons.filter(m=>m.t<3).every(m=>q9rIn(m.hx,m.hy,0)&&!q9rSafe(m.hx,m.hy))]}")
        await A.ev("()=>{PALG.card=null;PALG.title=null}");await A.wait(800)
        await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=80)
        rep('ประตูเฟือง → แมพ 41 (ลานขึ้นบก) · ขั้นซ่อมเฟือง · มอน Lv 148–152 บนวงแหวน · แผนที่โลก',m[0]==41 and m[1]==1 and m[2]=='land' and m[3]=='วงแหวนเฟือง' and m[4]=='วงแหวนเฟือง' and m[5]==[148,152] and 148<=lv[0] and lv[1]<=153 and lv[2],[m,lv])
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));mons.forEach(m=>{m.stun=99;m.x=m.hx=3000;m.y=m.hy=3000});Q9Q.wt=99;Q9Q.wv=-1;const r=740,a0=1.2;me.x=Q9C.x+Math.cos(a0)*r;me.y=Q9C.y+Math.sin(a0)*r;Q9Q.lx=me.x;Q9Q.ly=me.y;await w(1500);const a1=Math.atan2(me.y-Q9C.y,me.x-Q9C.x);
          const a=[Math.round(me.x),Math.round(me.y)];me.x=Q9C.x;me.y=Q9C.y+300;await w(300);const bk=[Math.round(me.x),Math.round(me.y)];
          return {da:a1-a0,a,bk,sp:q9rIn(Q9C.x,Q9C.y-1000,0),star:q9rIn(Q9C.x,Q9C.y,0),noon:worldLight.toString().includes('curMap===41'),aq:aqWalkable(Q9C.x,Q9C.y)}}""")
        rep('วงแหวนหมุนพาไหล · ดาวแคระกลางวงเดินไม่ได้ (ดึงกลับ) · สะพานซี่ล้อเดินได้ · ไม่มีกลางวันกลางคืน',abs(w['da'])>0.03 and abs(w['bk'][0]-w['a'][0])<40 and abs(w['bk'][1]-w['a'][1])<40 and w['sp'] and not w['star'] and w['noon'] and not w['aq'],w)
        fz=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;me.hp=me.mh;const r=740,a0=2.9;me.x=Q9C.x+Math.cos(a0)*r;me.y=Q9C.y+Math.sin(a0)*r;Q9Q.lx=me.x;Q9Q.ly=me.y;const k0=Q9Q.fk|0;Q9Q.wv=0;await w(2600);const k=(Q9Q.fk|0)-k0;gmGod=true;Q9Q.wt=99;return k}""")
        rep('คลื่นหยุดเวลาจากดาวแคระ: โดนแล้วค้าง',fz>=1,fz)
        await adv(A)
        for i in range(20):
            if await A.ev("()=>me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        pa=await A.ev("()=>[me.sty.a,SD.on,stCur().p9gr?1:0]");print('pre-gear',pa)
        got=[]
        for i in range(4):
            r=await A.ev(f"""async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));const G=Q9G[{i}];PALG.card=null;let t=0;while(!q9rGOn({i})&&t<40){{await w(100);t++}}
              const st=performance.now();let hit=0;while(((me.sty.p9gr|0)>>{i}&1)===0&&performance.now()-st<12000){{const on=q9rGOn({i});me.x=G.x+(on?0:Math.cos(G.a)*-160);me.y=G.y+(on?0:Math.sin(G.a)*-160);Q9Q.lx=me.x;Q9Q.ly=me.y;Q9Q.frz=0;await w(60)}}return [me.sty.p9gr|0,me.sty.n,PALG.card&&PALG.card.h]}}""")
            got.append(r)
        hk=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));return 1}""")
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ซ่อมเฟืองเวลา 4 ตัว (ยืนในวงตอนเขียว · การ์ดเรื่องเฟือง) → ขั้นล่า',got[-1][0]==15 and all('เฟือง' in (g[2] or '') for g in got) and s3[0]==i0+3,[got,s3])
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(500);await adv(A)
        s4=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่า 40 → คุยลูมิน่า',s4[0]==i0+4,s4)
        ql=await A.ev("()=>{const N=MAPS[41].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A)
        s5=await A.ev("()=>[me.sty.s,stCur().g]")
        rep('ลูมิน่าเล่าเรื่องผู้รักษาเวลา → ขั้นดันหอนาฬิกาดาว',ql[0]=='lum2' and 'ผู้รักษาเวลา' in ql[1] and s5==[i0+5,'ctw'],[ql[0],s5])
        await A.ev("()=>{const N=MAPS[41].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick()}");await adv(A,6)
        for i in range(20):
            if await A.ev("()=>CTWI()"):break
            await A.ev("()=>{if(SD.on&&SD.choice&&SD.onChoose){SD.onChoose(1)}}");await A.wait(300)
        d=await A.ev("()=>[CTWI(),curMap>=48000&&curMap<49000,dg.ph,MAPS[curMap].n]")
        await A.ev("()=>dgStart()");await adv(A,6);await A.wait(1500)
        bs=await A.ev("()=>{const B=mons.find(m=>m.t===3);return B?[Math.round(B.mh),B.L,Math.round(B.x),Math.round(B.y),dg.ph]:null}")
        await A.ev("()=>{const B=mons.find(m=>m.t===3);me.x=CX;me.y=CY+260;CT.tt=99}");await A.wait(1200)
        await A.pg.screenshot(path=SH+'t_boss.jpg',quality=80)
        rep('เข้าหอนาฬิกาดาว (ห้อง 48xxx) · บอสผู้รักษาเวลา 11 ล้านกลางหน้าปัด',d[0] and d[1] and d[3]=='หอนาฬิกาดาว' and bs and bs[0]>=11000000 and bs[2]==await A.ev("()=>CX") and bs[4]=='boss',[d,bs])
        hd=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));gmGod=false;me.hp=me.mh;CT.tt=99;CT.gt=99;const[ah,am]=ctAng();const a=ah+.35*1.2;me.x=CX+Math.cos(a)*300;me.y=CY+Math.sin(a)*300;const k0=CT.hk|0;let t=0;while((CT.hk|0)===k0&&t<60){await w(60);t++;const[h2]=ctAng();if(ctOnHand(me.x,me.y,h2))break}await w(200);const k=(CT.hk|0)-k0;gmGod=true;me.hp=me.mh;return [k,t]}""")
        rep('เข็มนาฬิกากวาด: ยืนขวางเข็มโดนดาเมจ',hd[0]>=1,hd)
        ts=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));CT.gt=99;CT.tt=0;CT.ts=0;await w(400);const lit=CT.lit.slice(),s1=CT.ts;const P=CTMK[lit[0]];me.x=P[0];me.y=P[1];CT.tt=.1;await w(500);const s2=CT.ts;
          const sx=me.x,sy=me.y;me.x+=60;await w(200);const free=Math.hypot(me.x-sx,me.y-sy)>30;me.x=CX;me.y=CY+200;await w(300);const fx0=me.x,fy0=me.y;me.x+=80;await w(200);const stuck=Math.hypot(me.x-fx0,me.y-fy0)<5;CT.tt=0;await w(300);return [s1,lit.length,s2,free,stuck,CT.ts]}""")
        rep('หยุดเวลา: ขีดทองเรือง 3 ขีด → เวลาหยุด · ยืนบนขีดทองขยับได้ · นอกขีดค้าง',ts[0]==1 and ts[1]==3 and ts[2]==2 and ts[4],ts)
        gr=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));CT.ts=0;CT.tt=99;CT.lit=[];gmGod=false;me.hp=me.mh;me.x=CX+150;me.y=CY+250;const k0=CT.hk|0;CT.gt=0;await w(1900);const k=(CT.hk|0)-k0;gmGod=true;me.hp=me.mh;CT.gt=99;return k}""")
        rep('ฝนเฟือง: วงเตือนใต้เท้าแล้วเฟืองตก',gr>=1,gr)
        hg=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const B=mons.find(m=>m.t===3);B.hp=B.mh*.49;await w(500);const n=mons.filter(m=>m.hg).length,a=CT.hg;CT.hgt=.3;await w(800);const healed=B.hp/B.mh;
          mons.filter(m=>!m.hg&&m.t<3).forEach(m=>m.hp=0);return [n,a,Math.round(healed*100),mons.filter(m=>m.hg).length]}""")
        await A.pg.screenshot(path=SH+'t_hg.jpg',quality=80)
        rep('เลือด 50%: นาฬิกาทราย 4 ใบ · ไม่ทุบใน 10 วิ บอสฟื้น 10%',hg[0]==4 and hg[1]==1 and 57<=hg[2]<=61 and hg[3]==0,hg)
        await A.ev("()=>{const B=mons.find(m=>m.t===3);B.hp=1;mons=mons.filter(m=>m.t===3)}");
        for i in range(30):
            if await A.ev("()=>dg.ph==='win'||dgRew"):break
            await A.ev("()=>{const B=mons.find(m=>m.t===3&&m.hp>0);if(B){me.x=B.x;me.y=B.y+80;try{dmgMon(B,1e6)}catch(e){B.hp=0}}}");await A.wait(400)
        await A.wait(1500)
        wn=await A.ev("()=>[dg.ph,!!dgRew,me.sty.n]")
        for i in range(40):
            if await A.ev("()=>curMap===41"):break
            await A.wait(500)
        await adv(A)
        s6=await A.ev("()=>[curMap,me.sty.s,stCur()&&stCur().k]")
        rep('ชนะผู้รักษาเวลา → กลับวงแหวน → ขั้นคุยเซเลสต์',wn[1] and s6[0]==41 and s6[1]==i0+6 and s6[2]=='cel41',[wn,s6])
        qc=await A.ev("()=>{const N=MAPS[41].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stQ2]")
        rep('เซเลสต์อ่านสมุดโอเรียน → จบบทที่ 2 · ฉายา «ผู้หมุนเฟืองเวลา»',qc[0]=='cel41' and 'สมุด' in qc[1] and en[0]==en[1] and 'จบภาค 9 บทที่ 2' in en[2] and en[3],[qc[0],en])
        rp=await A.ev("()=>{const N=MAPS[41].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.choice?SD.choice.map(c=>c[0]).join('|'):''}")
        rep('เล่นซ้ำหอนาฬิกาดาวผ่านลูมิน่าหลังจบบท',('หอนาฬิกาดาว' in rp),rp)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
