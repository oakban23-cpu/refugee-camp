"""v482 โมชั่นตัวละคร: ล้ม/ลุก · โดนตีแล้วตัวสะท้าน · ท่าใช้ของ (ดื่มยา ขุด เปิดหีบ โบกมือ) — 2 เครื่องเห็นตรงกัน"""
import asyncio, sys, json, random, base64
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
POSE="""(k)=>{const D=DPS[k];const o=k===uid?me:others[k];if(!o)return {none:1,st:D&&D.st};const cls=k===uid?me.cls:o.cls,hp=k===uid?me.hp:o.hp,mh=k===uid?me.mh:o.mh;
  const P=a6Pose(k,cls,o.x,o.y,hp,mh,k===uid?(Math.cos(me.face)<0?-1:1):(o.fx||1),0);return {st:D?D.st:null,age:D?Math.round(performance.now()-(D.st==='up'?D.t1:D.t0)):null,rot:P?Math.round(P.rot*100)/100:null,lie:P?P.lie:null,drop:P?P.drop:null,dead:P?P.dead:null}}"""
async def waitc(c,js,arg=None,ms=4000,step=100):
    r=None
    for _ in range(ms//step):
        r=await c.ev(js,arg) if arg is not None else await c.ev(js)
        if r: return r
        await c.wait(step)
    return r
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ma'+str(random.randint(100,999)),'archer',60);B=await new_client(b,'Mb'+str(random.randint(100,999)),'melee',60)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await A.wait(3000)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;me.x=1600+(Math.random()*4);me.y=1600}")
        await A.ev("()=>{me.x=1640;me.y=1600;window.__pin=setInterval(()=>{if(me.down<=0){me.x=1640;me.y=1600}},40)}");await B.ev("()=>{me.x=1580;me.y=1600;window.__pin=setInterval(()=>{if(me.down<=0){me.x=1580;me.y=1600}},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000)
        await B.ev("()=>{setInterval(()=>{mons=mons.filter(m=>m.t>=3)},50)}");await A.ev("()=>{setInterval(()=>{mons=mons.filter(m=>m.t>=3)},50)}")
        await A.wait(600)
        # ---- ② โดนตี ----
        await A.ev("()=>{gmGod=false;me.mh=Math.max(me.mh,2000);me.hp=me.mh}");await A.wait(800)
        await A.ev("()=>{hurt(me.mh*.2)}")
        a=await waitc(A,"()=>{const H=HFS[uid];return H&&H.t0&&performance.now()-H.t0<900?{tr:H.tr,sd:H.sd,d:H.d}:null}",ms=1500,step=30)
        bb=await waitc(B,"(u)=>{const H=HFS[u];return H&&H.t0?{tr:H.tr,sd:H.sd}:null}",A.uid,ms=3000,step=40)
        rep('โดนตีแรง (20% เลือด): ตัวเราเซถอยหลายก้าว (ระดับ 3) · อีกเครื่องเห็นเซเหมือนกัน (จากเลือดที่ลด)', a and a['tr']==3 and bb and bb['tr']==3, [a,bb])
        await A.wait(1200)
        await A.ev("()=>{me.hp=me.mh}");await A.wait(800)
        await A.ev("()=>{hurt(me.mh*.03)}")
        a=await waitc(A,"()=>{const H=HFS[uid];return H&&H.t0&&performance.now()-H.t0<500?H.tr:null}",ms=1000,step=20)
        await A.wait(900);await A.ev("()=>{me.hp=me.mh}");await A.wait(600)
        await A.ev("()=>{hurt(me.mh*.35)}")
        a2=await waitc(A,"()=>{const H=HFS[uid];return H&&H.t0&&performance.now()-H.t0<500?H.tr:null}",ms=1000,step=20)
        await A.wait(300)
        f=await A.ev("()=>{const P=a6Pose(uid,me.cls,me.x,me.y,me.hp,me.mh,1,0);return P?{rot:P.rot,tx:P.tx,sy:P.sy,flash:P.flash}:null}")
        rep('โดนเบา (3%) = สะดุ้ง · โดนหนัก (35%) = กระเด็นล้มก้น (ตัวเตี้ยลง เอนหลัง ถอยออกจากทิศมอน)', a==1 and a2==4 and f and f['sy']<.85 and abs(f['tx'])>4, [a,a2,f])
        await A.ev("()=>{me.hp=me.mh}");await A.wait(1300)
        dot=await A.ev("()=>{const k='zzdot';delete HFS[k];let hp=1000;a6Pose(k,'melee',0,0,hp,1000,1,0);const t0=HFS[k].t0;for(let i=0;i<10;i++){hp-=4;a6Pose(k,'melee',0,0,hp,1000,1,0)}const s1=HFS[k].t0===t0;hp-=40;a6Pose(k,'melee',0,0,hp,1000,1,0);return {same:s1,hit:HFS[k].t0!==t0,tr:HFS[k].tr}}")
        rep('เลือดลดทีละนิด (พิษ/ดาเมจต่อเนื่อง < 1.5% ต่อครั้ง) ไม่สะดุ้ง · ลด 4% ครั้งเดียว = สะดุ้ง', dot['same'] and dot['hit'] and dot['tr']==1, dot)
        await A.ev("()=>{me.hp=me.mh;gmGod=true}")
        await A.wait(1500)
        # ---- ① ล้ม/ลุก ----
        await A.ev("()=>{gmGod=false;me.inv3=0;me.dgI=0;hurt(me.mh*5)}")
        d=await waitc(A,"()=>me.down>0&&DPS[uid]&&DPS[uid].st==='dead'",ms=4000,step=50)
        await B.wait(1600)
        pa=await A.ev(POSE,A.uid);pb=await B.ev(POSE,A.uid)
        rep('ล้ม: ตัวเราล้มลงนอนราบ (หมุน ~90°) อาวุธหลุด · อีกเครื่องเห็นนอนเหมือนกัน', d and pa['st']=='dead' and abs(pa['rot'])>=1.35 and pa['lie']==1 and pa['drop']==1 and pb['st']=='dead' and abs(pb['rot'])>=1.35, [pa,pb])
        # ทิศล้มตามอาชีพ: นักธนูล้มหงาย (หัวไปทางหลังตัว)
        rep('นักธนูล้มหงาย (ทิศตรงข้ามกับที่หันหน้า)', (pa['rot']<0)==(await A.ev("()=>Math.cos(me.face)>=0")), pa)
        # คนที่เห็นทีหลัง (เพิ่งเข้ามา) = นอนอยู่แล้ว ไม่เล่นท่าล้ม
        lj=await B.ev("(u)=>{delete DPS[u];delete HFS[u];return 1}",A.uid);await B.wait(150)
        pl=await B.ev(POSE,A.uid)
        rep('คนที่เห็นตอนล้มไปแล้ว (เข้ามาทีหลัง) เห็นนอนอยู่เลย ไม่เล่นท่าล้มซ้ำ', pl['st']=='dead' and pl['age']>=3000 and pl['lie']==1, pl)
        # ภาพบนจอของ B
        await B.ev("(u)=>{rt3Cam2=()=>[others[u].x,others[u].y]}",A.uid);await B.wait(400)
        png=await B.ev("()=>cv.toDataURL('image/png')");open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v482/net_dead.png','wb').write(base64.b64decode(png.split(',')[1]))
        await B.ev("()=>{rt3Cam2=()=>null}")
        # ฟื้นตรงนี้ → ลุก
        await A.ev("()=>{me.gold=1e7;reviveHere();gmGod=true}")
        ua=await waitc(A,"()=>DPS[uid]&&DPS[uid].st==='up'",ms=1500,step=30)
        ub=await waitc(B,"(u)=>DPS[u]&&DPS[u].st==='up'",A.uid,ms=3000,step=40)
        await A.wait(1300)
        ga=await A.ev("()=>!DPS[uid]");gb=await B.ev("(u)=>!DPS[u]",A.uid)
        rep('ฟื้นตรงนี้: ลุกขึ้น (แสงทอง) ทั้งสองเครื่อง แล้วกลับท่าปกติ', ua and ub and ga and gb, [ua,ub,ga,gb])
        # ---- ③ ท่าใช้ของ ----
        await A.ev("()=>{me.inv.hp=Math.max(me.inv.hp|0,3);me.pcd=0;me.hp=me.mh*.5;usePot('hp')}")
        x=await A.ev("()=>{const C=castCur();return C&&C.ty}")
        y=await waitc(B,"(u)=>{const c=RCAST[u];return c&&c.ty}",A.uid,ms=2000,step=30)
        rep('ดื่มยา: ท่ายกขวดกระดก (ขวดแดง HP) · อีกเครื่องเห็น', x=='drinkH' and y=='drinkH', [x,y])
        await A.wait(900)
        await A.ev("()=>{me.inv.mp=Math.max(me.inv.mp|0,3);me.pcd=0;usePot('mp')}")
        y=await waitc(B,"(u)=>{const c=RCAST[u];return c&&c.ty==='drinkM'&&c.ty}",A.uid,ms=2000,step=30)
        rep('ดื่มยา MP: ขวดฟ้า', y=='drinkM', y)
        await A.wait(900)
        # ขุด: ตั้งแผนที่สมบัติแล้วยืนตรงจุด
        for c in (A,B): await c.ev("()=>{clearInterval(window.__pin)}")
        r=await A.ev("""()=>{tmGive(1,'t');const T=tmSt();const o=T.L[T.L.length-1];T.a=o.id;const S=tmSpot(o);window.__tmo=o;enterMap(o.mp,{x:S.x+20,y:S.y});return [o.mp,S.x,S.y]}""")
        await B.ev("(m)=>{enterMap(m[0],{x:m[1]-60,y:m[2]})}",r);await A.wait(3000)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;gmGod=true}")
        await A.ev("(m)=>{me.x=m[1]+20;me.y=m[2];window.__pin=setInterval(()=>{if(!TMS.dig&&!window.__free){me.x=m[1]+20;me.y=m[2]}},40)}",r);await B.ev("(m)=>{me.x=m[1]-60;me.y=m[2];window.__pin=setInterval(()=>{me.x=m[1]-60;me.y=m[2]},40)}",r);await A.wait(1500)
        await waitc(B,"(u)=>!!others[u]",A.uid,8000)
        await B.ev("()=>{window.__pc=[];const o=pcRecv;pcRecv=function(x){try{__pc.push([x&&x.ty,x&&x.by])}catch(e){}return o.apply(this,arguments)}}")
        await A.ev("(m)=>{me.x=m[1]+20;me.y=m[2];tmDigStart()}",r)
        x=await A.ev("(m)=>{const C=castCur();return [C&&C.ty,!!TMS.dig,Math.cos(me.face)<0]}",r)
        y=await waitc(B,"(u)=>(window.__pc||[]).some(q=>q[0]==='dig'&&q[1]===u)&&'dig'",A.uid,ms=2500,step=30)
        rep('ขุดสมบัติ: ท่าจ้วงพลั่ว · หันหน้าหาจุดขุด · อีกเครื่องเห็น', x[0]=='dig' and x[1] and x[2] and y=='dig', [x,y])
        await A.ev("(m)=>{window.__free=1;me.x+=40}",r);await A.wait(300)
        x=await A.ev("()=>{const C=castCur();return [C&&C.ty,!!TMS.dig]}")
        rep('ขยับระหว่างขุด = หยุดขุดและหยุดท่า', x[0] is None and not x[1], x)
        # เปิดหีบ
        await A.ev("()=>{tmChest(1,30,me.x+20,me.y+6,0)}")
        x=await A.ev("()=>{const C=castCur();return [C&&C.ty,Math.cos(me.face)>0]}")
        y=await waitc(B,"(u)=>{const c=RCAST[u];return c&&c.ty==='chest'&&c.ty}",A.uid,ms=2000,step=30)
        far=await B.ev("()=>{tmChest(1,30,me.x+400,me.y,0);const C=castCur();return C&&C.ty}")
        rep('เปิดหีบ: ย่อตัวยกฝาแล้วชูมือ (คนเปิด) · อีกเครื่องเห็น · คนที่อยู่ไกลหีบไม่ทำท่า', x[0]=='chest' and x[1] and y=='chest' and far is None, [x,y,far])
        await A.wait(1100)
        # โบกมือ/หันหา NPC
        x=await A.ev("()=>{AC6.wvT=0;const N={x:me.x-80,y:me.y};a6Talk(N);const C=castCur();return [C&&C.ty,Math.cos(me.face)<0]}")
        y=await waitc(B,"(u)=>{const c=RCAST[u];return c&&c.ty==='wave'&&c.ty}",A.uid,ms=2000,step=30)
        rep('คุยกับ NPC: หันหน้าหา NPC + โบกมือ · อีกเครื่องเห็น', x[0]=='wave' and x[1] and y=='wave', [x,y])
        # npcb click hook (ไม่ error)
        await A.ev("()=>{AC6.wvT=0;try{$('npcb').click()}catch(e){}}");await A.wait(300)
        # ภาพของท่าใช้ของบนจออีกเครื่อง
        await A.wait(900)
        await A.ev("()=>{me.inv.hp=3;me.pcd=0;usePot('hp')}");await B.wait(250)
        await B.ev("(u)=>{rt3Cam2=()=>[others[u].x,others[u].y]}",A.uid);await B.wait(150)
        png=await B.ev("()=>cv.toDataURL('image/png')");open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v482/net_drink.png','wb').write(base64.b64decode(png.split(',')[1]))
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
