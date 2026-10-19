"""v450 ค่ายกว้างขึ้น: ทุก NPC/ประตู/จุดในค่ายใช้งานได้ · ชนกำแพงถูก · มอนถูกดันออก · จุดเกิดไม่ติดสิ่งกีดขวาง · เดินไวในค่าย"""
import asyncio, sys, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
INCOL="(x,y)=>CAMP.cols.some(([cx,cy,r])=>Math.hypot(x-(CX+cx),y-(CY+cy))<r)"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Cmp','melee',99)
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY+60})}");await A.wait(2500)
        await A.ev("()=>{AUTO.on=false;try{aqHB(false)}catch(e){};HB.on=false;gmGod=true;window.__nomon=setInterval(()=>{mons.forEach(m=>{if(m.t<3&&!m.dum&&Math.hypot(m.x-CX,m.y-CY)<1000){m.x=200;m.y=200}})},40)}")
        r=await A.ev("()=>({R:CAMP.R,sr:MAPS[1].sr,cw:CAMP.cache&&CAMP.cache.width,S:CAMP.S})")
        rep('ค่ายกว้างขึ้น: รั้ว 340→493 · เขตปลอดภัย 330→480 · แคชภาพ 2040px',r['R']==493 and r['sr']==480 and r['cw']==2040,json.dumps(r))
        # NPC ทุกตัว
        res=[]
        for k in ['npc','npc2','npc3','npc4','npc5','npc6']:
            o=await A.ev(f"""()=>new Promise(res=>{{const N=MAPS[1].{k};me.x=N.x;me.y=N.y+34;setTimeout(()=>{{res([N.n,Math.round(Math.hypot(me.x-N.x,me.y-N.y)),$('npcb').style.display,$('npcb').textContent,({INCOL})(N.x,N.y+34)])}},450)}})""")
            res.append(o)
        ok=all(o[1]<70 and o[2]=='block' and o[0] in o[3] and not o[4] for o in res)
        rep('NPC ทั้ง 6: ยืนหน้า NPC ได้ (ไม่ถูกสิ่งกีดขวางดันออก) และขึ้นปุ่มคุยถูกคน',ok,json.dumps(res,ensure_ascii=False))
        g=await A.ev(f"""()=>new Promise(res=>{{const L=MAPS[1].gates.filter(G=>!gHid(G)&&Math.hypot(G.x-CX,G.y-CY)<900);const out=[];let i=0;const nx=()=>{{if(i>=L.length){{res(out);return}}const G=L[i++];me.x=G.x;me.y=G.y+30;setTimeout(()=>{{out.push([G.nm||G.to,$('gtb').style.display,Math.round(Math.hypot(me.x-G.x,me.y-G.y))]);nx()}},400)}};nx()}})""")
        rep('ประตูในค่ายทุกบาน: ยืนแล้วขึ้นปุ่มผ่านประตู',len(g)>=2 and all(x[1]=='block' for x in g),json.dumps(g,ensure_ascii=False))
        t=await A.ev("()=>new Promise(res=>{me.x=TNE.x;me.y=TNE.y+20;setTimeout(()=>res([$('tnb')&&$('tnb').textContent,Math.round(Math.hypot(me.x-TNE.x,me.y-TNE.y))]),500)})")
        rep('ลานเต็นท์: ยืนที่ทางเข้าแล้วขึ้นปุ่ม «เข้าเต็นท์ของฉัน»',t[0] and 'เต็นท์' in t[0],json.dumps(t,ensure_ascii=False))
        f=await A.ev("()=>{const N=MAPS[1].npc6;me.x=N.x;me.y=N.y+30;return [fsNearCook(),FSW.length?[Math.round(FSW[0].x),Math.round(FSW[0].y)]:null,Math.round(Math.hypot(FSW[0].x-N.x,FSW[0].y-N.y))]}")
        rep('บึงตกปลา/ครัวป้าบัว ขยับตามกัน (ระยะบึง-ครัวใกล้เคียงเดิม)',f[0] and f[1] and 100<f[2]<200,json.dumps(f))
        w=await A.ev("()=>{const s=WBS[0];const r=wbsTap(s.x,s.y-20);ov.hidden=true;return r}")
        rep('อนุสาวรีย์บอสโลก: แตะรูปปั้นตำแหน่งใหม่เปิดอันดับได้',w is True,str(w))
        pts=await A.ev(f"""()=>{{const f={INCOL};const P={{tentExit:[TNE.x+10,TNE.y+60],wbBack:[WBP.x,WBP.y+70],rba:[RBA.x,RBA.y+40],center:[CX,CY+60]}};
          const G=(MAPS[9].gates||[]).filter(g=>g.to===1);G.forEach((g,i)=>P['from9_'+i]=[g.arr.x,g.arr.y]);for(const k in MAPS){{if(+k===1)continue;(MAPS[k].gates||[]).forEach((g,i)=>{{if(g.to===1&&g.arr&&Math.hypot(g.arr.x-CX,g.arr.y-CY)<900)P['m'+k+'_'+i]=[g.arr.x,g.arr.y]}})}}
          const out={{}};for(const k in P){{const[x,y]=P[k];out[k]=f(x,y)?'IN-COL':Math.round(Math.hypot(x-CX,y-CY))}}return out}}""")
        bad=[k for k,v in pts.items() if v=='IN-COL']
        rep('จุดเกิดทุกแบบเข้าค่าย (กลับจากแมพอื่น/เต็นท์/บอสโลก) ไม่ตกอยู่ในสิ่งกีดขวาง',not bad,json.dumps(pts))
        # เดินออกทางประตูตะวันออก vs ชนรั้วแนวทแยง
        e=await A.ev("()=>new Promise(res=>{me.x=CX+200;me.y=CY;joy={ox:0,oy:0,dx:40,dy:0,t0:performance.now(),mv:1};setTimeout(()=>{joy=null;res(Math.round(Math.hypot(me.x-CX,me.y-CY)))},3200)})")
        d=await A.ev("()=>new Promise(res=>{me.x=CX+250;me.y=CY-250;joy={ox:0,oy:0,dx:28,dy:-28,t0:performance.now(),mv:1};setTimeout(()=>{joy=null;res(Math.round(Math.hypot(me.x-CX,me.y-CY)))},2500)})")
        rep('เดินตามถนนออกประตูตะวันออกได้ · เดินทแยงชนรั้วออกไม่ได้',e>493+30 and d<=493+16,json.dumps([e,d]))
        c=await A.ev("()=>new Promise(res=>{const[x,y,r]=CAMP.cols[0];me.x=CX+x;me.y=CY+y;setTimeout(()=>res(Math.round(Math.hypot(me.x-(CX+x),me.y-(CY+y)))-r),300)})")
        rep('เซฟเก่าที่ยืนทับอาคาร: ถูกดันออกมาเอง',c>=-1,str(c))
        await A.ev("()=>clearInterval(__nomon)")
        m=await A.ev("()=>new Promise(res=>{const q=mons.find(m=>m.t<3&&!m.dum);q.x=CX+120;q.y=CY;q.tg=null;setTimeout(()=>res(Math.round(Math.hypot(q.x-CX,q.y-CY))),400)})")
        rep('มอนที่หลงเข้าค่ายถูกดันออกนอกรั้วใหม่',m>=493+10,str(m))
        await A.ev("()=>{window.__nomon=setInterval(()=>{mons.forEach(m=>{if(m.t<3&&!m.dum&&Math.hypot(m.x-CX,m.y-CY)<1000){m.x=200;m.y=200}})},40)}");await A.wait(300)
        # ออโต้เดินจากนอกค่ายไปหาไอริส (ผ่านประตู ไม่ติดรั้ว)
        a=await A.ev("()=>new Promise(res=>{const N=MAPS[1].npc5;me.x=CX-60;me.y=CY+493+160;const C=CL[me.cls];const st=aqStep;aqStep=()=>{};AQ={src:'t',det:0,ev:0,sx:me.x,sy:me.y,t:0};const iv=setInterval(()=>{try{aqWalk(N.x,N.y+30,.05,C)}catch(e){}},50);setTimeout(()=>{clearInterval(iv);AQ=null;aqStep=st;res(Math.round(Math.hypot(me.x-N.x,me.y-N.y-30)))},16000)})")
        rep('ออโต้เดินจากนอกค่ายไปถึงไอริสช่างรูน (อ้อมเข้าประตู)',a<60,str(a))
        # เดินไวในค่าย
        q=await A.ev("()=>{me.x=CX;me.y=CY+60;const L=u64Dest();const i=L.findIndex(d=>d.n.includes('แม่ครัว'));u64Go(i);const N=MAPS[1].npc6;return [L.length,Math.round(Math.hypot(me.x-N.x,me.y-N.y))]}")
        rep('เดินไวในค่าย: ไปถึงป้าบัวทันที',q[0]>=9 and q[1]<70,json.dumps(q))
        await A.ev("()=>clearInterval(__nomon)")
        q2=await A.ev("()=>{const m=mons.find(m=>m.t<3&&!m.dum);m.x=me.x+100;m.y=me.y;m.hp=m.mh;const x0=me.x;const L=u64Dest();u64Go(0);return [u64Why(),Math.round(me.x-x0)]}")
        rep('มีมอนอยู่ใกล้: ใช้เดินไวไม่ได้',q2[0]!='' and q2[1]==0,json.dumps(q2,ensure_ascii=False))
        btn=await A.ev("()=>new Promise(res=>{const a=!$('u64b').hidden;enterMap(2,{x:400,y:1600});setTimeout(()=>res([a,$('u64b').hidden]),900)})")
        rep('ปุ่มเดินไวขึ้นเฉพาะในค่าย',btn[0] and btn[1],json.dumps(btn))
        errs=[x for x in A.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
