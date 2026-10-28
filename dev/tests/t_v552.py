"""v552 เก็บงานเล็ก: จุดลงประตู 5 แห่งไม่ทับประตูขากลับ (39→38 · 40→36 · 41→40 · 44→43 · 45→44)
   · ระหว่างขั้นดันฐานฟ้า คุยธุลีเลือกได้ว่าจะขึ้นฝ่ามือ (เนื้อเรื่อง) หรือเล่นซ้ำรังกัดแผ่นดิน"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
CASES=[(39,38),(40,36),(41,40),(44,43),(45,44)]
FAR="{s:STY.length,n:0,a:0,e:1,e4:1,p6h:2,e6:1,e7:1,p7m:1,p8g:1,e8:1,q9:1,e9:1,e10:1,pacr:31,parr:31,pa2j:31,pa3p:255,pa4t:31}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Tg'+str(random.randint(100,999)),'mage',99)
        await A.ev(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;me.sty={FAR};me.wv=[1,5,9,23,25,26,32,33,34,35,36,37,38,39,40,41,42,43,44,45,2,3];ov.hidden=true}}")
        res=[]
        for a,bb in CASES:
            await A.ev(f"()=>{{const G=MAPS[{a}].gates.find(G=>G.to==={bb}&&!G.alias);enterMap({a},{{x:G.x+40,y:G.y+40}})}}");await A.wait(1600)
            await A.ev(f"()=>{{const G=MAPS[{a}].gates.find(G=>G.to==={bb}&&!G.alias);me.x=G.x;me.y=G.y;try{{if(curMap===45){{PZS.lx=me.x;PZS.ly=me.y}}if(curMap===44){{PBS.lx=me.x;PBS.ly=me.y}}}}catch(e){{}}mons=[];useGate()}}");await A.wait(1800)
            r1=await A.ev(f"()=>{{const D=MAPS[curMap],H=D.gates.find(H=>H.to==={a}&&!H.alias),G=MAPS[{a}].gates.find(G=>G.to==={bb}&&!G.alias);return [curMap,Math.round(me.x),Math.round(me.y),Math.round(Math.hypot(me.x-G.arr.x,me.y-G.arr.y)),Math.round(Math.hypot(me.x-H.x,me.y-H.y)),Math.round(Math.min(...D.gates.filter(q=>!q.alias&&!gHid(q)).map(q=>Math.hypot(q.x-me.x,q.y-me.y)))),aqWalkable(me.x,me.y)]}}")
            await A.wait(1500)
            r2=await A.ev("()=>[Math.round(me.x),Math.round(me.y)]")
            res.append([a,bb]+r1+[abs(r2[0]-r1[1])+abs(r2[1]-r1[2])])
        ok=all(x[2]==x[1] and x[5]<=30 and x[6]>=100 and x[7]>90 and x[8] and x[9]<=4 for x in res)
        rep('ประตู 5 แห่ง: ลงแมพปลายทางตรงจุดใหม่ ห่างประตูขากลับ ≥100 (ปุ่มใช้ประตูไม่ขึ้นทันที) · เดินได้ · ไม่ถูกดันออก',ok,res)
        st=await A.ev("""()=>{const out=[];for(const id in MAPS){const M=MAPS[id];if(+id<1||+id>60||!M.gates)continue;M.gates.forEach(G=>{const D=MAPS[G.to];if(G.arr&&D&&D.gates&&!G.alias)D.gates.forEach((H,hi)=>{if(!H.alias&&Math.hypot(G.arr.x-H.x,G.arr.y-H.y)<70)out.push(id+'→'+G.to)})})}return out}""")
        rep('ตรวจทั้งเกม: ไม่มีประตูไหนส่งไปลงทับประตูของแมพปลายทางแล้ว',st==[],st)
        # ---------- ธุลีระหว่างขั้นดันฐานฟ้า ----------
        i0=await A.ev("()=>STY.findIndex(x=>x.pa5d)")
        await A.ev(f"()=>{{me.sty={{s:{i0},n:0,a:0,e:1,e4:1,e6:1,e7:1,p7m:1,p8g:1,e8:1,e9:1,pa4t:31}};me.ach.stR4=1;me.pnT=0;ov.hidden=true;enterMap(45,{{x:PZTHU.x+40,y:PZTHU.y+60}})}}");await A.wait(2200)
        T="()=>{const N=MAPS[45].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;PZS.lx=me.x;PZS.ly=me.y;mons=[];stNpcClick();return [SD.on,SD.choice?SD.choice.map(c=>c[0]).join('|'):'',SD.q.map(l=>l[1]).join('|')]}"
        c1=await A.ev(T)
        await A.ev("()=>{SD.onChoose(2)}");await A.wait(500)
        c2=await A.ev("()=>[SD.on,SD.choice?SD.choice.map(c=>c[0]).join('|'):'']")
        await A.ev("()=>{SD.onChoose(1)}")
        for i in range(30):
            if await A.ev("()=>PNQI()"):break
            await A.wait(250)
        inq=await A.ev("()=>[PNQI(),MAPS[curMap].n,me.sty.s,me.sty.n,me.sty.a]")
        await A.ev("()=>{dgLeave()}");await A.wait(1800)
        back=await A.ev("()=>[curMap,me.sty.s,me.sty.n]")
        c3=await A.ev(T)
        await A.ev("()=>{SD.onChoose(1)}");await A.wait(400)
        pre=await A.ev("()=>[SD.on,SD.q.map(l=>l[1]).join('|').slice(0,80)]")
        for i in range(60):
            if await A.ev("()=>PFNI()"):break
            await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(200)
        inf=await A.ev("()=>[PFNI(),MAPS[curMap].n,me.sty.s,me.sty.a]")
        rep('ระหว่างขั้นดันฐานฟ้า คุยธุลี = เลือกได้ (ขึ้นฝ่ามือธรณิน / ลงรังกัดแผ่นดิน / ไว้ก่อน) · ลงรัง = เล่นซ้ำ ไม่แตะเนื้อเรื่อง · ขึ้นฝ่ามือ = เข้าดันเนื้อเรื่องตามเดิม',
            c1[0] and 'ฐานฟ้า' in c1[1] and 'รังกัดแผ่นดิน' in c1[1] and 'ไว้ก่อน' in c1[1] and 'รังกัดแผ่นดิน' in c2[1] and inq[0] and inq[1]=='รังกัดแผ่นดิน' and inq[2]==i0 and inq[3]==0 and back==[45,i0,0] and 'ฐานฟ้า' in c3[1] and pre[0] and inf[0] and inf[1]=='ฐานฟ้า' and inf[2]==i0,[c1[:2],c2,inq,back,c3[1][:60],pre,inf])
        await A.ev("()=>{dgLeave()}");await A.wait(1500)
        x0=await A.ev("()=>{me.sty.s=STY.findIndex(x=>x.pa5s);me.sty.a=0;me.sty.n=0;const N=MAPS[45].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;PZS.lx=me.x;PZS.ly=me.y;stNpcClick();const r=[!!SD.choice,SD.q.map(l=>l[1]).join('|').slice(0,40)];try{let k=0;while(SD.on&&k<60){stNext();k++}stClose()}catch(e){}try{czEnd()}catch(e){};return r}")
        x1=await A.ev("()=>{me.sty.s=STY.length;me.ach.stR5a=1;const N=MAPS[45].npc2;npcSel=2;me.x=N.x;me.y=N.y+40;stNpcClick();const r=SD.choice?SD.choice.map(c=>c[0]).join('|'):'';try{stClose()}catch(e){};return r}")
        rep('ขั้นอื่นไม่โดนกระทบ: ขั้นเปิดบทที่ 5 คุยธุลีเข้าเนื้อเรื่องเลย · หลังจบเรื่องคุยธุลี = เล่นซ้ำรังตามเดิม',not x0[0] and 'ธุลีกำปลายเชือก' in x0[1] and 'รังกัดแผ่นดิน' in x1 and 'ฐานฟ้า' not in x1,[x0,x1])
        E=[e for e in A.errs if 'ERR_' not in e]
        errs=await A.ev("()=>[window.__err]")
        rep('ไม่มี error ในหน้าเกม',not E and not errs[0],[E[:4],errs])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
