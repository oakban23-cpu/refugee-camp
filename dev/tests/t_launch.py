"""v420 หอขี่คอ: โยนขึ้น + บอสกวาดหอ (4 เครื่อง)"""
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
        for c in C: await c.ev("()=>{window.__skc=0;const _s=skcFx;skcFx=function(o){window.__skc++;return _s.apply(this,arguments)}}")
        for c in (B,Cc,Dd):
            await c.ev(CLIMB,A.uid);await A.wait(700)
        await A.wait(1200)
        rep('ปีนครบ 3 ชั้น',await A.ev("()=>skRiders(uid).length")==3)
        sc=[await c.ev("()=>window.__skc|0") for c in (A,Dd)]
        rep('ปีนขึ้นแบบตีลังกา: ทุกเครื่องเห็น (fx skc)',all(x>=1 for x in sc),json.dumps(sc))
        bt=await A.ev("()=>{sklUI();const b=$('skl');return b&&!b.hidden?b.textContent:''}")
        rep('ฐานมีปุ่ม 🤸 โยนขึ้น',bt.startswith('🤸 โยนขึ้น') and '3' in bt,bt)
        nb=await B.ev("()=>{sklUI();const b=$('skl');return !!(b&&!b.hidden)}")
        rep('คนบนคอไม่มีปุ่มโยน',not nb)
        # พาหอไปใกล้มอน
        tgt=await A.ev("()=>{const L=mons.filter(q=>q.hp>0&&!q.pv&&q.t!==3).sort((p,q)=>Math.hypot(p.x-me.x,p.y-me.y)-Math.hypot(q.x-me.x,q.y-me.y));const m=L[0];if(!m)return null;me.x=m.x-75;me.y=m.y;me.face=0;return [m.x,m.y,L.length]}")
        await A.wait(1500)
        for c in (B,Cc,Dd): await c.ev("()=>{window.__lh=0;const _l=skLand;skLand=function(u,J){if(u===uid)window.__lh=1;return _l.apply(this,arguments)};window.__hits=0;const _a=addHit;addHit=function(){window.__hits++;return _a.apply(this,arguments)}}")
        base0=await A.ev("()=>[me.x,me.y]")
        await A.ev("()=>$('skl').click()");await A.wait(780)
        air=list(await asyncio.gather(*[c.ev("()=>[SKE.b,!!SKE.jump,me.inv3>0]") for c in (B,Cc,Dd)]))
        rep('โยนแล้ว: คนบนคอหลุดจากหอ ลอยอยู่ และไม่โดนตี',all(a[0]=='' and a[1] and a[2] for a in air),json.dumps(air))
        rep('ทุกเครื่องเห็นการโยน (ฐานเห็น 3 คนลอย)',await A.ev("()=>Object.keys(SKJ).length")==3)
        dmg_b=await B.ev("()=>{const h=me.hp;hurt(200);return me.hp===h}")
        rep('ลอยกลางอากาศโดนตีไม่เข้า',dmg_b)
        await A.wait(1700)
        land=[await c.ev("()=>[Math.round(me.x),Math.round(me.y),!!SKE.jump,window.__lh,window.__hits]") for c in (B,Cc,Dd)]
        spread=len({(l[0]//8,l[1]//8) for l in land})==3
        far=all(55<((l[0]-base0[0])**2+(l[1]-base0[1])**2)**.5<130 for l in land)
        rep('ลงพื้นกระจายรอบฐาน 3 จุด',spread and far and not any(l[2] for l in land),json.dumps(land)+' base '+json.dumps(base0))
        rep('ลงพื้นแล้วกระแทกมอน (ดาเมจเข้า)',all(l[3]==1 for l in land) and sum(l[4] for l in land)>0,json.dumps([l[3:] for l in land]))
        await A.wait(800)
        st=await A.ev("()=>({b:SKB0,n:skRiders(uid).length})")
        ab=await A.ev("()=>{const mm=mons.filter(q=>q.hp>0&&!q.pv).sort((p,q)=>Math.hypot(p.x-me.x,p.y-me.y)-Math.hypot(q.x-me.x,q.y-me.y))[0];if(mm){me.x=mm.x-20;me.y=mm.y}const n0=me.atkN|0;return new Promise(r=>setTimeout(()=>r((me.atkN|0)-n0),2500))}")
        rep('ฐานว่างแล้ว กลับมาตีได้',st['b']==0 and ab>0,json.dumps(st)+' atk '+str(ab))
        mul=await A.ev("()=>[1,2,3].map(n=>[1,2,3].filter(l=>l<=n).map(l=>+(1.5+.45*n+.3*l).toFixed(2)))")
        rep('หอสูงกว่า/ชั้นสูงกว่า = แรงกว่า',mul[2][2]>mul[0][0] and mul[2][0]>mul[0][0],json.dumps(mul))
        # คูลดาวน์
        await B.ev(CLIMB,A.uid);await A.wait(1500)
        cd=await A.ev("()=>{sklUI();const t=$('skl').textContent;skLaunch();return [t,Object.keys(SKJ).length]}")
        rep('คูลดาวน์ 12 วิ (กดซ้ำทันทีไม่ได้)','(' in cd[0] and cd[1]==0,json.dumps(cd))
        # ---- บอสกวาดหอ ----
        await Cc.ev(CLIMB,A.uid);await A.wait(1500)
        host=None
        for c in C:
            if await c.ev("()=>isHost()"):host=c
        rep('มีโฮสต์',host is not None)
        await A.ev("()=>{me.hp=me.mh}");
        for c in (B,Cc): await c.ev("()=>{me.hp=me.mh;me.inv3=0}")
        for c in (A,B,Cc): await c.ev("()=>{window.__sf=0;setInterval(()=>{if(SKF)window.__sf=1},30)}")
        await host.ev("(u)=>{const P=skPos(u);const X={id:'tbX',t:3,hp:99999,mh:99999,x:P.x+170,y:P.y,lv:60,k:0,s:1};mons.push(X);window.__pin=setInterval(()=>{const m=mons.find(q=>q.id==='tbX');if(m){m.x=P.x+170;m.y=P.y}},50)}",A.uid)
        got=False
        for _ in range(16):
            await A.wait(500)
            if await B.ev("()=>SKW.length>0"):got=True;break
        rep('บอสใกล้หอ → เล็งวงแดงใต้หอ (ทุกเครื่องเห็น)',got and await A.ev("()=>SKW.length>0") and await Dd.ev("()=>SKW.length>0"))
        h0=[await c.ev("()=>Math.round(me.hp/me.mh*100)") for c in (A,B,Cc)]
        await A.wait(1900)
        h1=[await c.ev("()=>[Math.round(me.hp/me.mh*100),SKE.b,!!window.__sf]") for c in (A,B,Cc)]
        rep('อยู่ในวงตอนฟาด → หอพัง คนบนร่วง ทุกคนเสียเลือดและมึน',all(h[1]=='' and h[2] for h in h1[1:]) and h1[0][0]<h0[0] and h1[1][0]<h0[1] and h1[0][2],json.dumps(h0)+' '+json.dumps(h1))
        mv=await A.ev("()=>{SKF={t:.9,x:me.x,y:me.y};const x0=me.x;joy={dx:40,dy:0,mv:1};return new Promise(r=>setTimeout(()=>{const a=me.x;joy=null;r([x0,a])},400))}")
        rep('มึนอยู่เดินไม่ได้',abs(mv[0]-mv[1])<1,json.dumps(mv))
        await host.ev("()=>{clearInterval(window.__pin);const i=mons.findIndex(m=>m.id==='tbX');if(i>=0)mons.splice(i,1);for(const k in SKWC)delete SKWC[k]}")
        await A.wait(1500)
        # หลบ: ฐานพาหอเดินออกจากวง
        await B.ev(CLIMB,A.uid);await A.wait(1500)
        for c in (A,B): await c.ev("()=>{me.hp=me.mh;me.inv3=0}")
        p0=await A.ev("()=>[me.x,me.y]")
        await host.ev("(u)=>{const P=skPos(u);fx({k:'skw',m:'zz',mx:Math.round(P.x+170),my:Math.round(P.y),x:Math.round(P.x),y:Math.round(P.y),r:95,w:1.4})}",A.uid)
        await A.ev("()=>{joy={dx:0,dy:40,mv:1}}");await A.wait(2000);await A.ev("()=>{joy=null}")
        await A.wait(400)
        dd=[await c.ev("()=>[Math.round(me.hp/me.mh*100),SKE.b,!!SKF]") for c in (A,B)]
        rep('ฐานพาหอออกจากวงทัน → หอไม่พัง ไม่เสียเลือด',dd[0][0]==100 and dd[1][0]==100 and dd[1][1]==A.uid and not dd[0][2],json.dumps(dd))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
