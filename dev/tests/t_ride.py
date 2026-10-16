"""v414 ซ้อนท้ายสัตว์ขี่ 2–3 เครื่อง"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
D='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Drv','melee',60);B=await new_client(b,'Pas','sup',60);C=await new_client(b,'Obs','archer',60)
        for c in (A,B,C):
            await c.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;setInterval(()=>{if(typeof gmGod!=='undefined')gmGod=true;banner=null},300)}")
        await A.ev("()=>{me.x=CX+300;me.y=CY+380;me.mts=[1,2];me.mt=2;mountToggle()}")
        await B.ev("()=>{me.x=CX+330;me.y=CY+385}");await C.ev("()=>{me.x=CX+380;me.y=CY+420}")
        for _ in range(16):
            if await B.ev("(u)=>!!(others[u]&&others[u].mt>0)",A.uid): break
            await A.wait(500)
        await A.wait(800)
        t=await B.ev("()=>{rdUI();const b=$('rdb');return{f:RDF,tx:b.textContent,h:b.hidden}}")
        rep('คนซ้อนเห็นปุ่มขอซ้อนท้าย',t['f']=='req:'+A.uid and not t['h'],json.dumps(t,ensure_ascii=False))
        await B.ev("()=>$('rdb').click()");await A.wait(1200)
        q=await A.ev("()=>{rdUI();return{f:RDF,tx:$('rdb').textContent}}")
        rep('เจ้าของได้คำขอ ต้องกดรับ (ไม่ใช่เพื่อน)',q['f']=='acc',json.dumps(q,ensure_ascii=False))
        await A.ev("()=>$('rdb').click()");await A.wait(1500)
        r=await B.ev("()=>({on:RDE.on,o:RDE.o,rp:rideRp()})")
        rep('รับแล้ว คนซ้อนขึ้นหลังสัตว์',r['on']==1 and r['o']==A.uid,json.dumps(r))
        await A.ev("()=>{joy={dx:40,dy:0,mv:1}}");await A.wait(1500);await A.ev("()=>{joy=null}");await A.wait(1500)
        pa=await A.ev("()=>[me.x,me.y]");pb=await B.ev("()=>[me.x,me.y]")
        rep('เจ้าของวิ่ง คนซ้อนตามไปด้วย',abs(pa[0]-pb[0])<30 and abs(pa[1]-pb[1])<20,f'A={pa} B={pb}')
        s=await A.ev("(u)=>{const o=others[u];return o?{rp:o.rp}:null}",B.uid)
        rep('เจ้าของเห็นว่ามีคนซ้อน',s and s['rp']==A.uid,json.dumps(s))
        s2=await C.ev("([a,b])=>({rp:others[b]&&others[b].rp,mt:others[a]&&others[a].mt})",[A.uid,B.uid])
        rep('คนที่ 3 เห็นคนซ้อนนั่งหลังเจ้าของ',s2['rp']==A.uid and s2['mt']>0,json.dumps(s2))
        await C.ev("(u)=>{const o=others[u];me.x=o.x+50;me.y=o.y+10}",A.uid);await C.wait(800)
        cbtn=await C.ev("()=>{rdUI();return RDF}")
        rep('คนอื่นขอซ้อนไม่ได้เมื่อมีคนซ้อนแล้ว',not cbtn.startswith('req:'),cbtn)
        for nm,c in (('A',A),('B',B),('C',C)):
            open(D+'ride_%s.png'%nm,'wb').write(await c.pg.screenshot())
        k=await A.ev("()=>{rdUI();return RDF}")
        rep('เจ้าของมีปุ่มให้คนซ้อนลง',k=='kick:'+B.uid,k)
        await A.ev("()=>$('rdb').click()");await A.wait(1500)
        r2=await B.ev("()=>RDE.on")
        rep('เจ้าของกดให้ลง คนซ้อนลง',r2==0,str(r2))
        nB=await B.ev("()=>me.nm||myName")
        await A.ev("(n)=>{friSt().L.push({n,c:'sup',lv:60,at:Date.now(),ls:Date.now()})}",nB)
        await B.ev("(u)=>{const o=others[u];me.x=o.x+20;me.y=o.y;rdUI();$('rdb').click()}",A.uid);await A.wait(1600)
        r3=await B.ev("()=>RDE.on?RDE.o:''")
        rep('คนในรายชื่อเพื่อนซ้อนได้ทันที',r3==A.uid,str(r3))
        await B.ev("()=>{joy={dx:30,dy:0,mv:1}}");await B.wait(1200);await B.ev("()=>{joy=null}");await B.wait(300)
        rep('คนซ้อนดันจอยค้าง = กระโดดลง',await B.ev("()=>RDE.on")==0)
        await B.ev("(u)=>{const o=others[u];me.x=o.x+20;me.y=o.y;rdUI();$('rdb').click()}",A.uid);await A.wait(1600)
        on=await B.ev("()=>RDE.on");await A.ev("()=>{dismount()}");await A.wait(2000)
        rep('เจ้าของลงจากสัตว์ = คนซ้อนลงเอง',on==1 and await B.ev("()=>RDE.on")==0)
        E=[e for c in (A,B,C) for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not E,str(E[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
