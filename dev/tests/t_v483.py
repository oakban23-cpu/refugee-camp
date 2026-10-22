"""v483 โมชั่นตัวละคร รอบ 2: เลือดน้อยหอบ/กะเผลก/ถอนหายใจโล่ง · ท่าฉลอง · นั่งพัก/ผิงไฟ — 2 เครื่องเห็นตรงกัน"""
import asyncio, sys, json, random, base64
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
OUTD='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v483/'
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
async def waitc(c,js,arg=None,ms=4000,step=100):
    r=None
    for _ in range(ms//step):
        r=await c.ev(js,arg) if arg is not None else await c.ev(js)
        if r: return r
        await c.wait(step)
    return r
async def shot(c,u,nm):
    await c.ev("(u)=>{rt3Cam2=()=>others[u]?[others[u].x,others[u].y]:null}",u);await c.wait(250)
    png=await c.ev("()=>cv.toDataURL('image/png')");open(OUTD+nm,'wb').write(base64.b64decode(png.split(',')[1]))
    await c.ev("()=>{rt3Cam2=()=>null}")
FORCE_IDLE="(k)=>{const A=ANS[k];if(A){A.it=40;A.mv=0}const I=CHIDL[k];if(I)I.ak=0;const S=SI7[k];if(S){S.hit=0;S.ca=0}return !!A}"
SITQ="(k)=>{const S=SI7[k],A=ANS[k];return S?{st:S.st,s:Math.round((S.s||0)*100)/100,w:!!S.w,fx:A?Math.round(A.fx*100)/100:null}:null}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Na'+str(random.randint(100,999)),'archer',60);B=await new_client(b,'Nb'+str(random.randint(100,999)),'melee',60)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await A.wait(3000)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false}")
        await A.ev("()=>{me.x=1640;me.y=1600;window.__pin=setInterval(()=>{if(me.down<=0&&!window.__free){me.x=1640;me.y=1600}},40)}");await B.ev("()=>{me.x=1580;me.y=1600;window.__pin=setInterval(()=>{if(me.down<=0){me.x=1580;me.y=1600}},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000)
        for c in (A,B): await c.ev("()=>{setInterval(()=>{mons=mons.filter(m=>m.t>=3)},50)}")
        await A.wait(800)
        # ================= ⑥ นั่งพัก =================
        x=await A.ev("()=>{const A=ANS[uid];if(A){A.it=10;A.mv=0}return 1}");await A.wait(300)
        s0=await A.ev(SITQ,A.uid)
        rep('ยืนนิ่งยังไม่ถึงเวลา (10 วิ) = ยังไม่นั่ง', s0 is None or s0['st']==0, s0)
        await A.ev(FORCE_IDLE,A.uid);await B.ev(FORCE_IDLE,A.uid);await A.wait(700)
        sa=await A.ev(SITQ,A.uid);sb=await B.ev(SITQ,A.uid)
        rep('ยืนนิ่งนาน + ไม่ได้สู้ → นั่งลงพัก (ตัวเรา) · อีกเครื่องเห็นนั่งเหมือนกัน (คิดเองไม่ใช้เน็ต) · นอกค่าย = นั่งพักธรรมดา', sa and sa['st']==1 and sa['s']>.9 and not sa['w'] and sb and sb['st']==1 and sb['s']>.9, [sa,sb])
        pose=await A.ev("()=>{const C={ty:'sit',s:1,sit:1,idle:1,p:.5};const o=s7Arm('melee',C);return {pcty:PCTY.has('sit'),r24:R24T.has('sit'),off:!!R24OFF.sit,arm:!!o}}")
        rep('ท่านั่งต่อเข้าระบบท่าเดิม (ไม่ส่งผ่านเน็ต)', not pose['pcty'] and pose['r24'] and pose['off'], pose)
        await shot(B,A.uid,'net_sit.png')
        # ขยับ = ลุกเร็ว
        await A.ev("()=>{window.__free=1;window.__wk=setInterval(()=>{me.wk+=.35;me.x+=2},30)}");await A.wait(380)
        ra=await A.ev(SITQ,A.uid)
        rb=await waitc(B,"(u)=>{const S=SI7[u];return S&&S.st!==1?{st:S.st,s:S.s}:null}",A.uid,ms=2500,step=40)
        await A.ev("()=>{clearInterval(window.__wk);window.__free=0}")
        rep('ขยับ → ลุกขึ้นเร็ว (≤0.25 วิ) ทั้งสองเครื่อง', ra and ra['st']==0 and rb is not None, [ra,rb])
        await A.wait(400)
        # โดนตีระหว่างนั่ง → ลุก · ตี → ลุก
        await A.ev(FORCE_IDLE,A.uid);await A.wait(600)
        a1=await A.ev(SITQ,A.uid)
        h0=await A.ev("()=>{gmGod=false;const a=me.hp;hurt(me.mh*.06);return [a,me.hp,me.mh]}");await A.wait(350)
        a2=await A.ev(SITQ,A.uid);a2['h']=h0
        await A.ev("()=>{me.hp=me.mh;gmGod=true}");await A.wait(600);await A.ev(FORCE_IDLE,A.uid);await A.wait(600)
        a3=await A.ev(SITQ,A.uid)
        await A.ev("()=>{me.atkT=performance.now()/1000;try{me.atkT=0}catch(e){};CHIDL[uid].ak=performance.now()}");await A.wait(350)
        a4=await A.ev(SITQ,A.uid)
        rep('กำลังนั่ง: โดนตี = ลุกทันที · ตี (โจมตี) = ลุกทันที', a1['st']==1 and a2['st']!=1 and a3['st']==1 and a4['st']!=1, [a1,a2,a3,a4])
        # ไม่นั่ง: ขี่สัตว์ / ตกปลา / ล้ม (จำลอง)
        z=await A.ev("""()=>{const k='zzsit';const r={};const L={u:k,ak:0};
          const go=(lk,hp,down,f)=>{delete SI7[k];ANS[k]={mv:0,fx:1,lph:0,t:performance.now(),it:40};CHIDL[k]={ak:0};if(f)FSHR[k]={on:1};else delete FSHR[k];s7Tick(k,'melee',100,100,hp,100,down,lk);SI7[k].hit=0;SI7[k].ca=0;const S=s7Tick(k,'melee',100,100,hp,100,down,lk);return S.st};
          r.ok=go(L,100,false,0);r.mt=go({u:k,ak:0,mt:3},100,false,0);r.fish=go(L,100,false,1);r.dead=go(L,0,true,0);delete FSHR[k];return r}""")
        rep('ไม่นั่งตอน: ขี่สัตว์ · ตกปลา · ล้ม (ปกติ = นั่ง)', z['ok']==1 and z['mt']==0 and z['fish']==0 and z['dead']==0, z)
        # ================= ④ เลือดน้อย =================
        await A.ev("()=>{gmGod=false;me.hp=Math.round(me.mh*.2)}");await A.wait(900)
        la=await A.ev("(k)=>{const L=LH7[k];return L?{k:Math.round(L.k*100)/100,low:L.low}:null}",A.uid)
        lb=await waitc(B,"(k)=>{const L=LH7[k];return L&&L.k>.6?{k:Math.round(L.k*100)/100,low:L.low}:null}",A.uid,ms=3000,step=60)
        X=await A.ev("(k)=>{const L=LH7[k];const s=l7Xf(L,1,0,0),w=l7Xf(L,1,Math.PI/2,1);return {rot:s.rot,wty:w.ty,wrot:w.rot}}",A.uid)
        rep('เลือด < 25%: ตัวค่อมไปข้างหน้า หอบ (ตัวเรา) · อีกเครื่องเห็นจากเลือดใน presence', la and la['k']>.6 and la['low']==1 and lb and X['rot']>.05, [la,lb,X])
        rep('เดินตอนเลือดน้อย = กะเผลก (ตัวทรุดลงข้างหนึ่ง + เอียง) — แค่ภาพ', X['wty']>1.2 and X['wrot']<X['rot'], X)
        sp=await A.ev("""()=>{try{const s0=typeof spd==='function'?spd():null;return {s:s0}}catch(e){return {s:null}}}""")
        await A.wait(1400)
        sw=await B.ev("(k)=>{const L=LH7[k];return L?L.fx.filter(q=>q.k===0).length+'/'+L.fx.filter(q=>q.k===1).length:null}",A.uid)
        await shot(B,A.uid,'net_low.png')
        # ฮีลขึ้น 40% = ยังไม่โล่ง · 55% = ถอนหายใจ
        await A.ev("()=>{me.hp=Math.round(me.mh*.4)}");await A.wait(700)
        h1=await A.ev("(k)=>{const L=LH7[k];return {rel:!!L.relT,low:L.low}}",A.uid)
        await A.ev("()=>{me.hp=Math.round(me.mh*.56)}")
        h2=await waitc(A,"(k)=>{const L=LH7[k];return L.relT?{rel:1,low:L.low}:null}",A.uid,ms=1500,step=30)
        hb=await waitc(B,"(k)=>{const L=LH7[k];return L&&L.relT?{rel:1}:null}",A.uid,ms=3000,step=30)
        await A.wait(450)
        pf=await B.ev("(k)=>{const L=LH7[k];return L?L.fx.some(q=>q.k===2):false}",A.uid)
        ex=await B.ev("(k)=>{const o=others[k];const E=chExpr(k,o.hp,o.mh,false,false);return E.k}",A.uid)
        rep('ฮีลถึง 40% ยังไม่ถอนหายใจ · ถึง 50%+ = ถอนหายใจโล่ง (ไอลมออกปาก + ยิ้ม) ทั้งสองเครื่อง', h1['rel']==False and h1['low']==1 and h2 and hb and pf and ex=='happy', [h1,h2,hb,pf,ex])
        lz=await A.ev("""()=>{const k='zzlow';delete LH7[k];l7Tick(k,10,100,false,0);l7Tick(k,0,100,true,0);const a=LH7[k].low;l7Tick(k,100,100,false,0);return {low:a,rel:!!LH7[k].relT}}""")
        rep('ล้มตอนเลือดน้อยแล้วฟื้นเต็ม = ไม่ถอนหายใจ (ท่าลุกของล้มแทน)', lz['low']==0 and not lz['rel'], lz)
        await A.ev("()=>{me.hp=me.mh;gmGod=true}");await A.wait(1300)
        # ================= ⑤ ท่าฉลอง =================
        await A.ev("()=>{CH7.t=0;me.xp=need(me.lv)-1}")
        l0=await A.ev("()=>me.lv")
        await A.ev("()=>{gainXP(me.x,me.y,500)}")
        ca=await A.ev("()=>{const C=castCur();return [me.lv,C&&C.ty,!!CF7[uid]]}")
        cb=await waitc(B,"(u)=>{const c=RCAST[u];return c&&c.ty==='cheer'?[c.ty,!!CF7[u]]:null}",A.uid,ms=2500,step=30)
        rep('เลเวลอัป → ท่าฉลอง + กระดาษสีโปรย (ตัวเรา) · อีกเครื่องเห็นท่าเดียวกันผ่าน castNet', ca[0]>l0 and ca[1]=='cheer' and ca[2] and cb and cb[1], [l0,ca,cb])
        await B.wait(200);await shot(B,A.uid,'net_cheer.png')
        r1=await A.ev("()=>cheerGo('x')")
        rep('ห่างกันไม่ถึง 4 วิ = ไม่ฉลองซ้ำ', r1==False, r1)
        await A.wait(4200)
        await A.ev("()=>{vz3Show({r:5,sl:'w',lv:60,u:0})}")
        ci=await waitc(A,"()=>{const C=castCur();return C&&C.ty==='cheer'?CH7.src:null}",ms=1500,step=30)
        rep('ได้การ์ดไอเทม Relic+/ตำนาน/ชุด → ท่าฉลอง', ci=='item', ci)
        await A.ev("()=>{try{const e=$('vzs');if(e)e.remove()}catch(e){};VZ3.show.length=0;VZ3.showing=0}")
        await A.wait(1200)
        await A.ev("()=>{CH7.t=0;qKill(me.x+60,me.y,3,1)}")
        cbo=await waitc(A,"()=>{const C=castCur();return C&&C.ty==='cheer'?CH7.src:null}",ms=1500,step=30)
        await A.wait(1100)
        await A.ev("()=>{CH7.t=0;qKill(me.x+900,me.y,3,1)}");await A.wait(700)
        cfar=await A.ev("()=>{const C=castCur();return C&&C.ty}")
        rep('บอสตายใกล้ ๆ → ท่าฉลอง · บอสตายไกล (900) = ไม่ฉลอง', cbo=='boss' and cfar!='cheer', [cbo,cfar])
        await A.ev("()=>{CH7.t=0}")
        nd=await A.ev("()=>{const d=me.down;me.down=5;const r=cheerGo('x');me.down=d;CH7.t=0;return r}")
        ncast=await A.ev("()=>{me.cast={k:0,ty:'draw',t0:performance.now(),d:.5,big:false};const r=cheerGo('x');me.cast=null;CH7.t=0;return r}")
        rep('ไม่ฉลองตอนล้ม / ตอนกำลังร่ายสกิล', nd==False and ncast==False, [nd,ncast])
        # ================= ⑥ ผิงไฟกลางค่าย =================
        for c in (A,B): await c.ev("()=>{clearInterval(window.__pin)}")
        await A.ev("()=>{enterMap(1,{x:CX+72,y:CY+14})}");await B.ev("()=>{enterMap(1,{x:CX+150,y:CY+90})}");await A.wait(3500)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;gmGod=true;try{if(CZ.on)czSkip()}catch(e){}}")
        await A.ev("()=>{me.x=CX+72;me.y=CY+14;me.face=0;window.__pin=setInterval(()=>{me.x=CX+72;me.y=CY+14;me.face=0},40)}");await B.ev("()=>{me.x=CX+150;me.y=CY+90;window.__pin=setInterval(()=>{me.x=CX+150;me.y=CY+90},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000);await A.wait(500)
        await A.ev(FORCE_IDLE,A.uid);await B.ev(FORCE_IDLE,A.uid);await A.wait(900)
        fa=await A.ev(SITQ,A.uid);fb=await B.ev(SITQ,A.uid)
        rep('ใกล้กองไฟกลางค่าย: นั่งผิงไฟ หันหน้าเข้ากองไฟ (กองไฟอยู่ซ้าย → หันซ้าย ทั้งที่ตัวหันขวาอยู่) ทั้งสองเครื่อง', fa and fa['st']==1 and fa['w'] and fa['fx']<-.5 and fb and fb['st']==1 and fb['w'] and fb['fx']<-.5, [fa,fb])
        ex=await B.ev("(k)=>{const o=others[k];return chExpr(k,o.hp,o.mh,false,false).k}",A.uid)
        rep('ผิงไฟ = หน้ายิ้มสบาย', ex=='happy', ex)
        await shot(B,A.uid,'net_fire.png')
        pos=await A.ev("()=>{const C=[[-260,-180],[260,-200],[-300,240],[0,-300],[300,240],[-420,0]];for(const [dx,dy] of C){const x=CX+dx,y=CY+dy;if(!mons.some(m=>Math.hypot(m.x-x,m.y-y)<320))return [x,y]}return [CX-260,CY-180]}")
        await A.ev("(P)=>{clearInterval(window.__pin);me.x=P[0];me.y=P[1];window.__pin=setInterval(()=>{me.x=P[0];me.y=P[1]},40)}",pos);await A.wait(400)
        await A.ev(FORCE_IDLE,A.uid);await A.wait(700)
        ff=await A.ev(SITQ,A.uid);ff['dbg']=await A.ev("()=>{const S=SI7[uid],A=ANS[uid],n=performance.now();return {it:A.it,mv:A.mv,hit:n-S.hit,ca:n-S.ca,ak:n-(CHIDL[uid]||{}).ak,fs:FSHR[uid],dps:!!DPS[uid],hfs:HFS[uid]&&HFS[uid].t0,cast:!!castCur(),rid:me.riding,sky:skyOY(),st:me.stealth}}")
        rep('ในค่ายแต่ไกลกองไฟ = นั่งพักธรรมดา (ไม่ผิงไฟ)', ff and ff['st']==1 and not ff['w'], ff)
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
