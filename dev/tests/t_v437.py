"""v437 มอนขยับต่อตอนโฮสต์ค้าง · หอคอยหยุดเวลาตอนเลือกพร · พาไปเต็นท์"""
import asyncio,sys,json,time
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
CMP="()=>mons.filter(m=>!m.pv&&!m.dum).map(m=>[m.id,Math.round(m.x),Math.round(m.y)])"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ---------- ① โฮสต์ค้าง ----------
        C=[await new_client(b,n,c,60) for n,c in [('Ann','melee'),('Bee','mage'),('Cid','archer')]]
        for i,c in enumerate(C):
            await c.ev(CLR);await c.ev("(i)=>{enterMap(2,{x:2450+i*30,y:2480})}",i);await c.wait(1200)
        await C[0].wait(4000)
        hid=await C[0].ev("()=>hostId()");H=[c for c in C if c.uid==hid][0];O=[c for c in C if c is not H]
        V=O[0];vp=await V.ev("()=>[me.x,me.y]")
        await H.ev("([x,y])=>{const L=mons.filter(m=>m.t<3&&m.hp>0&&!m.pv).slice(0,6);L.forEach((m,i)=>{const a=i*1.05;m.x=x+Math.cos(a)*260;m.y=y+Math.sin(a)*260;m.mh*=40;m.hp=m.mh;m.__tv=1});window.__ids=L.map(m=>m.id)}",vp)
        ids=await H.ev("()=>window.__ids")
        await V.wait(1800)
        D="(ids)=>ids.map(id=>{const m=mons.find(q=>q.id===id);return m?Math.round(Math.hypot(m.x-me.x,m.y-me.y)):-1})"
        d0=await V.ev(D,ids)
        await H.ev("()=>{setTimeout(()=>{const t=Date.now();while(Date.now()-t<4000){}},10)}")
        t0=time.time();await V.wait(700)
        d1=await V.ev(D,ids);await V.wait(1200);d2=await V.ev(D,ids)
        st=await V.ev("()=>[U54.ext,U54.en]")
        print('dist',d0,d1,d2,st)
        mv=[a-b for a,b in zip(d1,d2) if a>0 and b>0 and a>60]
        rep('① โฮสต์ค้าง: มอนบนจอเครื่องอื่นยังเดินเข้าหาผู้เล่น ไม่ยืนค้าง',st[1]>=1 and len(mv)>=2 and max(mv)>=25,str(mv)+' '+str(st))
        nh=None
        for k in range(40):
            h2=await V.ev("()=>hostId()")
            if h2!=H.uid: nh=h2;break
            await V.wait(150)
        el=time.time()-t0
        rep('① สลับโฮสต์เร็วขึ้น (ภายใน ~3 วิ หลังค้าง)',nh is not None and el<3.4,'%.2fs'%el)
        await V.wait(3500)
        NH=[c for c in C if c.uid==nh][0] if nh else H
        hm={r[0]:r for r in await NH.ev(CMP)};bad=[];far=[]
        for c in C:
            if c is NH: continue
            L=await c.ev(CMP);me=await c.ev("()=>[me.x,me.y]")
            for r in L:
                if abs(r[1]-me[0])<400 and abs(r[2]-me[1])<400:
                    if r[0] not in hm: bad.append(r[0])
                    elif abs(hm[r[0]][1]-r[1])+abs(hm[r[0]][2]-r[2])>60: far.append(r[0])
        rep('① หลังสลับโฮสต์ ตำแหน่งมอนทุกเครื่องตรงกัน ไม่มีมอนผี',not bad and len(far)<=1,str(bad[:4])+' '+str(far[:4]))
        ext_h=await NH.ev("()=>U54.ext")
        rep('① โฮสต์ใหม่ไม่ขยับมอนแบบคาดเดาซ้ำ',ext_h==0,str(ext_h))
        for c in C: await c.ctx.close()
        # ---------- ② หอคอย ----------
        A=await new_client(b,'Tow','melee',95)
        await A.ev(CLR);await A.ev("()=>{me.twBl=[];me.blPick=null;me.twCp=91;me.twBest=99;twCreate(91)}");await A.wait(4000)
        await A.ev("()=>{twStart()}");await A.wait(2500)
        a=await A.ev("()=>[dg.ph,+dg.tl.toFixed(2),mons.length,!!me.blPick,U54.bp,!!($('blpk').querySelector('.u54bp'))]")
        await A.wait(2000)
        b2=await A.ev("()=>[+dg.tl.toFixed(2),mons.length]")
        rep('② ระหว่างเลือกพรเริ่มต้น เวลาชั้นไม่ลด และยังไม่มีมอน · มีป้ายบอก',a[0]=='run' and a[3] and a[4]==1 and a[5] and b2[0]==a[1] and b2[1]==0,str(a)+str(b2))
        await A.ev("()=>{blChoose(0)}");await A.wait(3500)
        c2=await A.ev("()=>[+dg.tl.toFixed(2),mons.length,U54.bp]")
        rep('② เลือกพรแล้ว เวลาเดินต่อและมอนเริ่มออก',c2[0]<b2[0] and c2[1]>0 and c2[2]==0,str(c2))
        await A.ctx.close()
        # ---------- ③ เต็นท์ ----------
        N=await new_client(b,'Newb','archer',6)
        await N.ev(CLR);await N.ev("()=>{me.tent={};enterMap(1,{x:TNE.x+200,y:TNE.y-150});TIPS.t=0}");await N.wait(3500)
        t=await N.ev("()=>{const c=$('tipc');return[!!c&&!c.hidden,!!(c&&c.querySelector('[data-u54tn]')),U54.tg>performance.now()]}")
        rep('③ ผู้เล่นใหม่ Lv5+ ในค่ายเห็นคำแนะนำเต็นท์ + ลูกศร',t==[True,True,True],str(t))
        await N.ev("()=>{$('tipc').querySelector('[data-u54tn]').click()}");await N.wait(1500)
        t2=await N.ev("()=>[tentMine(),Object.keys(tSt().d).length]")
        rep('③ กด «เข้าเต็นท์เลย» แล้วเข้าเต็นท์และได้ชุดแต่ง',t2==[True,7],str(t2))
        tg=await N.ev("()=>{const sv=U54T.prev;U54T.prev=[[100,100,1],[160,90,0],[400,400,0]];const a=u54TagDim(160,90,{u:'zz'}),b=u54TagDim(100,100,{u:uid}),c=u54TagDim(400,400,{u:'yy'}),d=u54TagDim(130,130,{u:'xx'});U54T.prev=sv;return[a,b,c,d]}")
        rep('④ ป้ายชื่อซ้อน: ป้ายเราชัดเสมอ · ป้ายที่ทับของเรา/คนหน้า จาง · คนยืนเดี่ยวไม่จาง',tg==[1,0,0,1],str(tg))
        await N.ev("()=>{tentExit()}");await N.wait(1500)
        await N.ev("()=>{enterMap(2,{x:1600,y:1600})}");B2=await new_client(b,'Buddy','mage',30);await B2.ev(CLR);await B2.ev("()=>{enterMap(2,{x:1900,y:1700})}");await N.wait(3000)
        tp=await N.ev("()=>{const tb=$('topb');const d=document.createElement('div');d.id='u54tq';d.style.cssText='width:60px;height:60px';tb.appendChild(d);const rc=d.getBoundingClientRect(),cv=document.querySelector('canvas').getBoundingClientRect(),z=ZM.z;return[(rc.left+30-cv.left+CAMF.x-SW0/2)/z,(rc.top+60-cv.top+CAMF.y-H/2)/z]}")
        a0=await N.ev("()=>$('u54tq').classList.contains('u54dim')")
        await B2.ev("([x,y])=>{me.x=x;me.y=y}",tp);await N.wait(1500)
        a1=await N.ev("()=>$('u54tq').classList.contains('u54dim')")
        print('dbg',tp,await N.ev("()=>[curMap,me.x,me.y,Object.values(others).map(o=>[o.n,Math.round(o.x),Math.round(o.y)]),$('u54tq').getBoundingClientRect().top]"))
        await B2.ev("()=>{me.x+=500}");await N.wait(1500)
        a2=await N.ev("()=>{const c=$('u54tq').classList.contains('u54dim');$('u54tq').remove();return c}")
        pd=[a0,a1,a2]
        rep('④ กล่องเควสฝั่งซ้ายจางเมื่อตัวละครอยู่ใต้กล่อง และกลับมาชัดเมื่อเดินออก',pd==[False,True,False],str(pd))
        Es=[e for c in [N] for e in c.errs if 'Failed to load resource' not in e];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
