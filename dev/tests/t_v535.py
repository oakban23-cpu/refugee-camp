"""v535 ภาค 9 บทที่ 1 · บันไดดาว: ออร์รี (แยก e8) · บันไดดาวไปแมพ 40 ลานดาวลอย (เกาะลอย · สะพานแสง · สายธารดาว · ฝนดาวตก) · เศษดาว 5 ชิ้น · ล่า 40 · ลูมิน่า · ฉายา"""
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
SH='../v535/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Qa'+str(random.randint(100,999)),'mage',99)
        B=await new_client(b,'Qb'+str(random.randint(100,999)),'melee',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p9s1)");n5=await A.ev("()=>STY.length-STY.findIndex(x=>x.p9s1)")
        rep('ภาค 9 บทที่ 1 ต่อจากจบภาค 8 (5 ขั้น)',i0==await A.ev("()=>STY.findIndex(x=>x.p8c5)")+1 and n5==5,[i0,n5])
        for C,e8 in ((A,1),(B,2)):
            await C.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={{s:{i0},n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8g:1,e8:{e8}}};me.wv=[1,9,32,36,38,39,2,3];ov.hidden=true;enterMap(36,{{x:1600,y:2800}})}}")
        await A.wait(2600)
        h0=await A.ev("()=>MAPS[36].gates.filter(G=>G.to===40).map(G=>gHid(G))")
        qa=await A.ev("()=>{const N=MAPS[36].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        qb=await B.ev("()=>{const N=MAPS[36].npc;npcSel=1;me.x=N.x;me.y=N.y+40;stNpcClick();return SD.q.map(l=>l[1]).join('|')}")
        rep('คุยออร์รีที่ยอดหอดูดาว: ดาวถูกดึงขึ้นไป · เซเลสต์แยกตาม e8 (วาฬเลี้ยวหนี / กำแพงพายุหมุนเร็ว)',qa[0]=='orr' and 'บันไดดาว' in qa[1] and 'เลี้ยวหนี' in qa[1] and 'กำแพงพายุ' in qb and 'เลี้ยวหนี' not in qb,[qa[0],qa[1][-120:],qb[-120:]])
        await adv(A);await adv(B)
        h1=await A.ev("()=>MAPS[36].gates.filter(G=>G.to===40).map(G=>gHid(G))")
        rep('ประตู «บันไดดาว» ซ่อนก่อนคุย · เปิดหลังคุย',h0==[True] and h1==[False],[h0,h1])
        await A.ev("()=>{me.x=1500;me.y=2700;useGate()}");await A.wait(3000);await adv(A)
        m=await A.ev("()=>[curMap,stCur().p9sf?1:0,q9Isle(me.x,me.y,0),MAPS[40].n,WMN[40]&&WMN[40][2],WMLV[40]]")
        lv=await A.ev("()=>{const L=mons.filter(m=>m.t<3).map(m=>m.L);return [Math.min(...L),Math.max(...L),mons.filter(m=>m.t<3).every(m=>q9In(m.hx,m.hy,0,1)&&!q9Safe(m.hx,m.hy))]}")
        await A.pg.screenshot(path=SH+'t_arrive.jpg',quality=78)
        rep('ขึ้นบันไดดาว → แมพ 40 ลานดาวลอย (เกาะบันได) · ขั้นเศษดาว · มอน Lv 144–148 บนเกาะ ไม่เกิดที่ลานบันได · แผนที่โลก',m[0]==40 and m[1]==1 and m[2]==0 and m[3]=='ลานดาวลอย' and m[4]=='ลานดาวลอย' and m[5]==[144,148] and 144<=lv[0] and lv[1]<=149 and lv[2],[m,lv])
        w=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x=900;me.y=2600;Q9S.lx=me.x;Q9S.ly=me.y;await w(300);const a=[Math.round(me.x),Math.round(me.y)];me.x=200;me.y=1900;await w(300);const bk=[Math.round(me.x),Math.round(me.y)];
          return {a,bk,br:q9In(940,2300,0),vo:q9In(1000,1600,0),aqS:aqWalkable(2300,1900),noon:worldLight.toString().includes('curMap===40')}}""")
        rep('ความว่างเดินไม่ได้ (ดึงกลับ) · สะพานแสงเดินได้ · ออโต้เควสไม่เดินผ่านธารดาว · ไม่มีกลางวันกลางคืน',w['bk']==w['a'] and w['br'] and not w['vo'] and not w['aqS'] and w['noon'],w)
        await A.ev("()=>{mons=[];const s=Q9W[0];me.x=s[0]+18;me.y=s[1]+12;Q9S.lx=me.x;Q9S.ly=me.y}");await A.wait(400)
        mid=await A.ev("()=>Q9S.w");await A.wait(2400)
        f=await A.ev("()=>[q9Isle(me.x,me.y,0),Math.round(me.x),Math.round(me.y)]")
        await A.ev("()=>{const s=Q9W[1];me.x=s[0]-12;me.y=s[1]-14;Q9S.lx=me.x;Q9S.ly=me.y}");await A.wait(3200)
        f2=await A.ev("()=>q9Isle(me.x,me.y,0)")
        rep('สายธารดาว: ลอยข้ามความว่างไปเกาะดาวตก · ธารกลับพามาเกาะซากเครื่องจักร',mid==0 and f[0]==4 and f2==3,[mid,f,f2])
        aq=await A.ev("async()=>{me.x=560;me.y=2600;Q9S.lx=me.x;Q9S.ly=me.y;me.sty.p9sf=1|2|8|16;await new Promise(r=>setTimeout(r,300));return JSON.stringify(arAqT(stCur()))}")
        got=[]
        for i in range(5):
            r=await A.ev(f"async()=>{{const[x,y]=q9Shard({i});me.x=x;me.y=y+20;Q9S.lx=me.x;Q9S.ly=me.y;mons=[];if({i}===0)me.sty.p9sf=0;await new Promise(r=>setTimeout(r,1400));return [me.sty.p9sf|0,me.sty.n,PALG.card&&PALG.card.h]}}")
            got.append(r)
        await A.pg.screenshot(path=SH+'t_shard.jpg',quality=78)
        await adv(A)
        s3=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('เศษดาว 5 ชิ้น (ยืน 1 วิ · การ์ดเสียงดาวทีละชิ้น · ออโต้เควสเกาะไกลพาไปต้นธาร) → ขั้นล่า',got[-1][0]==31 and all('เศษดาว' in (g[2] or '') for g in got) and s3[0]==i0+3 and 'สายธาร' in aq,[aq,got,s3])
        await A.ev("()=>{PALG.card=null;PALG.title=null}");
        await A.pg.bring_to_front();await A.wait(300)
        await adv(A);mt=await A.ev("""async()=>{try{stClose()}catch(e){};PALG.card=null;mons.forEach(m=>{m.stun=99;m.x=m.hx=3000;m.y=m.hy=3000});gmGod=false;me.hp=me.mh;me.x=1250;me.y=2050;Q9S.lx=me.x;Q9S.ly=me.y;Q9S.warn=[];const k0=Q9S.hk|0;Q9S.warn.push({x:me.x,y:me.y,t:.5,d:.5});await new Promise(r=>setTimeout(r,1200));const h=(Q9S.hk|0)>k0?Math.round(Q9S.hd/me.mh*100):-(Q9S.met.length*100+(Q9S.warn.length)*10+(me.inv3>0?1:0));
          me.hp=me.mh;me.x=560;me.y=2600;Q9S.lx=me.x;Q9S.ly=me.y;Q9S.warn=[];Q9S.mt=0;await new Promise(r=>setTimeout(r,1200));const safe=Q9S.warn.length;gmGod=true;return [h,safe]}""")
        rep('ฝนดาวตก: วงส้มเตือนแล้วตก ยืนในวงเสียเลือด ~8% · ลานบันไดไม่มีดาวตก',7<=mt[0]<=9 and mt[1]==0,mt)
        for i in range(30):
            if await A.ev("()=>stCur().g==='kill'&&me.sty.a===1&&!SD.on"):break
            await adv(A,3)
        await A.pg.bring_to_front();await A.ev("()=>{for(let i=0;i<40;i++)stKill(0,0)}");await adv(A);await A.wait(500);await adv(A)
        s4=await A.ev("()=>[me.sty.s,stTxt()]")
        rep('ล่า 40 → คุยเด็กเรืองแสง',s4[0]==i0+4,s4)
        await A.ev("()=>{me.x=1850;me.y=1530;Q9S.lx=me.x;Q9S.ly=me.y;mons=[];PALG.title=null;PALG.card=null}");await A.wait(1500);await A.pg.screenshot(path=SH+'t_lum.jpg',quality=78)
        ql=await A.ev("()=>{const N=MAPS[40].npc;npcSel=1;me.x=N.x;me.y=N.y+40;const k=stTalkKey();stNpcClick();return [k,SD.q.map(l=>l[1]).join('|')]}")
        await adv(A);await A.ev("()=>{achCheck()}")
        en=await A.ev("()=>[me.sty.s,STY.length,stTxt(),!!me.ach.stQ1,MAPS[40].npc2.x>0]")
        rep('ลูมิน่า: ตาข่ายดาวของโอเรียน → จบบทที่ 1 · ฉายา «ผู้ก้าวขึ้นบันไดดาว» · เซเลสต์อยู่ที่ลานบันได',ql[0]=='lum' and 'ตาข่ายดาว' in ql[1] and en[0]==en[1] and 'จบภาค 9 บทที่ 1' in en[2] and en[3] and en[4],[ql[0],ql[1][-100:],en])
        E=[e for e in A.errs+B.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
