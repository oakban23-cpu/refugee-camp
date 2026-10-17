"""v422 หอขี่คอ: ห้ามในลานประลอง + ฉายา/ชุดรางวัล"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
PTYJS=open(__file__.rsplit('/',1)[0]+'/t_stack.py').read().split('PTYJS="""')[1].split('"""')[0]
CLIMB="(u)=>{const o=others[u];me.x=o.x+8;me.y=o.y;skClimb(u)}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        names=[('Base','melee'),('Up1','archer'),('Up2','mage'),('Up3','sup')]
        C=[await new_client(b,n,c,60) for n,c in names]
        A,B,Cc,Dd=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=false;me.x=CX+300+i*14;me.y=CY+380;setInterval(()=>{banner=null},400)}",i)
        await A.wait(2500)
        mem=[[c.uid,n,cl] for c,(n,cl) in zip(C,names)]
        for c in C: await c.ev(PTYJS,mem)
        await A.wait(1200)
        # ---- ลานประลอง ----
        for c in (A,B): await c.ev("()=>{window.__pv0=MAPS[curMap].pvp;MAPS[curMap].pvp=1}")
        await B.ev(CLIMB,A.uid);await A.wait(600)
        bb=await B.ev("(u)=>[SKE.b,skBtn(u,0)]",A.uid)
        rep('ลานประลอง: ปีนขี่คอไม่ได้ และไม่มีปุ่ม 🧗',bb[0]=='' and bb[1]=='',json.dumps(bb))
        for c in (A,B): await c.ev("()=>{MAPS[curMap].pvp=window.__pv0}")
        await B.ev(CLIMB,A.uid);await A.wait(800)
        on=await B.ev("()=>SKE.b")
        await B.ev("()=>{MAPS[curMap].pvp=1}");await A.wait(600)
        off=await B.ev("()=>SKE.b");await B.ev("()=>{MAPS[curMap].pvp=window.__pv0}")
        rep('ขี่คออยู่แล้วเข้าลานประลอง → ลงจากคออัตโนมัติ',on==A.uid and off=='',f'{on!r} -> {off!r}')
        # ---- หอเต็ม → ฉายาเสาค้ำฟ้า ----
        for c in (B,Cc,Dd):
            await c.ev(CLIMB,A.uid);await A.wait(700)
        await A.wait(1500)
        f=await A.ev("()=>{achCheck();return [me.stt.twf|0,!!me.ach.skT1,ACHM.skT1&&ACHM.skT1[1]]}")
        rep('เป็นฐานแบกหอเต็ม 4 ชั้น → ฉายา «เสาค้ำฟ้า»',f[0]==1 and f[1],json.dumps(f,ensure_ascii=False))
        # ---- โยน → นับสถิติ ----
        await A.ev("()=>{const L=mons.filter(q=>q.hp>0&&!q.pv&&q.t!==3).sort((p,q)=>Math.hypot(p.x-me.x,p.y-me.y)-Math.hypot(q.x-me.x,q.y-me.y));const m=L[0];if(m){me.x=m.x-75;me.y=m.y}me.face=0}")
        await A.wait(1500)
        await A.ev("()=>$('skl').click()");await A.wait(2600)
        st=[await c.ev("()=>[me.stt.twl|0,me.stt.tws|0]") for c in C]
        rep('ท่าโยนนับสถิติ (ฐาน+คนถูกโยนได้ twl · คนลงได้ tws = จำนวนมอนที่โดน)',all(s[0]==1 for s in st) and any(s[1]>0 for s in st[1:]),json.dumps(st))
        # ---- หลบบอสกวาด → twd ----
        await B.ev(CLIMB,A.uid);await A.wait(1500)
        host=None
        for c in C:
            if await c.ev("()=>isHost()"):host=c
        await host.ev("(u)=>{const P=skPos(u);fx({k:'skw',m:'zz',mx:Math.round(P.x+170),my:Math.round(P.y),x:Math.round(P.x),y:Math.round(P.y),r:95,w:1.4})}",A.uid)
        await A.wait(200);await A.ev("()=>{joy={dx:0,dy:40,mv:1}}");await A.wait(1100);await A.ev("()=>{joy=null}");await A.wait(900)
        d=[await c.ev("()=>me.stt.twd|0") for c in (A,B)]
        rep('หลบบอสกวาดหอทัน → นับ twd ทั้งฐานและคนบนคอ',d==[1,1],json.dumps(d))
        # ---- บันทึก/โหลด ----
        sv=await A.ev("()=>{const c=cleanChar(JSON.parse(JSON.stringify(snap())));return [c.stt.twf,c.stt.twl,c.stt.twd,!!c.ach.skT1,c.title]}")
        rep('สถิติหอ + ฉายาหอ ไม่หายตอนเซฟ/โหลด',sv[0]==1 and sv[1]==1 and sv[2]==1 and sv[3],json.dumps(sv))
        # ---- ครบ 4 ฉายา → ชุดแฟชั่น ----
        r=await A.ev("()=>{Object.assign(me.stt,{tws:8,twd:5,twl:100});achCheck();return new Promise(res=>setTimeout(()=>res([['skT1','skT2','skT3','skT4'].map(k=>!!me.ach[k]),wdrOwn('tow'),WDRM.tow&&WDRM.tow.n,me.gold]),2600))}")
        rep('ปลดฉายาหอครบ 4 แบบ → ได้ «ชุดหอคอยมนุษย์»',all(r[0]) and r[1],json.dumps(r,ensure_ascii=False))
        ui=await A.ev("()=>{const k0=ov.dataset.k;ov.dataset.k='wdr';GPV.wt='set';try{const h=wdrHTML();return h.includes('ชุดหอคอยมนุษย์')}catch(e){return String(e)}finally{ov.dataset.k=k0}}")
        rep('ชุดใหม่แสดงในตู้เสื้อผ้า',ui is True,str(ui))
        tt=await A.ev("()=>{me.title='skT4';return [ttTxt('skT4'),ttGr('skT4')]}")
        rep('ฉายาหอมีโบนัสสเตตัส',tt[0]!='' and tt[1]=='g',json.dumps(tt,ensure_ascii=False))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
