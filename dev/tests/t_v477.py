"""v477 มอนดัง (ติดคุณสมบัติสุ่ม 9 แบบ) + กระดานค่าหัว · ออนไลน์ 2 เครื่อง (โฮสต์ + สมาชิก)"""
import asyncio, sys, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
PIN="""()=>{if(window.__pin)return;window.__pin=setInterval(()=>{for(const m of mons){if(m.__fx){m.x=m.__fx[0];m.y=m.__fx[1];m.tx=m.x;m.ty=m.y}}},16)}"""
SPAWN="""([af,dx,dy,root])=>{for(const m of mons)if(m.nm||m.__keep)m.hp=0;mons=mons.filter(m=>m.hp>0);mons.forEach(m=>{if(m.t<3){m.x=-9000;m.y=-9000;m.tx=-9000;m.ty=-9000}});NMG.F=[];NMG.B=[];
  const P=Object.values(others)[0]||me;const id=nmGM(af,0,4);const m=mons.find(q=>q.id===id);m.x=m.tx=P.x+dx;m.y=m.ty=P.y+dy;m.hx=m.x;m.hy=m.y;m.dmx=.4;m.hp=m.mh=Math.max(m.mh,2e6);
  if(root)m.__fx=[m.x,m.y];m.nmT.g=99;window.__N=m;return [id,m.nm,Math.round(P.x),Math.round(P.y)]}"""
async def waitfx(c,k,ms=2600):
    for _ in range(ms//60):
        r=await c.ev("(k)=>{const f=fxs.find(f=>f.k===k);return f?{x:f.x,y:f.y,pts:f.pts,mx:me.x,my:me.y}:null}",k)
        if r: return r
        await c.wait(60)
    return None
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Hst','melee',60);B=await new_client(b,'Mem','mage',60)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(10,{x:1600,y:1500})}")
        await A.wait(3500)
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        H,M=(A,B) if await A.ev("()=>isHost()") else (B,A)
        for c in (H,M): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;try{HB.on=false}catch(e){};me.cd=99;setInterval(()=>{me.cd=99},30)}")
        await H.ev("()=>{gmGod=true;me.x=1600;me.y=1900;mons=mons.filter(m=>m.t>=3);setInterval(()=>{fillT=1e9;sp=1e9;bossCd=1e9;mons=mons.filter(m=>m.nm||m.mn||m.__fx||m.__test||m.t>=3)},100)}");await M.ev("()=>{me.x=1600;me.y=1500;gmGod=false;me.hp=me.mh}")
        await H.ev(PIN)
        # ---- อัตราโผล่ + สร้างจริงจากการเกิดฝูง ----
        d=await H.ev("()=>{let n=0;for(let id=1;id<=200000;id++)if((Math.imul(id^0x51ed27,0x2c1b3c6d)>>>0)%10000<NMR)n++;return n/200000}")
        rep('อัตรามอนดังจากมอนฝูง ~0.6%', 0.0055<d<0.0065, d)
        r=await H.ev("""()=>{mons=mons.filter(m=>!m.nm);NMG.cd=0;let k=mid+1;while(!((Math.imul(k^0x51ed27,0x2c1b3c6d)>>>0)%10000<NMR))k++;const ok=[];
          for(let tries=0;tries<40;tries++){mid=k-1;const n0=mons.length;spawnPack();const nw=mons.slice(n0);nw.forEach(m=>m.__test=1);const q=nw.find(m=>m.id===k);if(q&&!shOf(q)){window.__K=k;return k}while(!((Math.imul(++k^0x51ed27,0x2c1b3c6d)>>>0)%10000<NMR));}return 0}""")
        await H.wait(400)
        r2=await H.ev("()=>{const m=mons.find(q=>q.id===window.__K);return m?{nm:m.nm|0,el:m.el|0,name:m.nm?nmName(m.nm):'',cd:NMG.cd,host:isHost(),ok:nmOK(),nmb:m.nmb,elb:m.elb,alive:mons.filter(q=>q.nm).map(q=>q.id),k:window.__K}:{k:window.__K,host:isHost()}}")
        rep('มอนฝูงที่เกิดใหม่ (id เข้าเกณฑ์) กลายเป็นมอนดัง + เป็นหัวหน้ามอน + ตั้งเวลาพัก 150 วิ', bool(r2 and r2['nm']>0 and r2['el']>0 and r2['cd']>140), r2)
        await H.wait(800)
        an=await M.ev("()=>chatLog.slice(-6).map(l=>l.t||'').filter(t=>t.includes('มอนดัง')).length")
        dd=await H.ev("()=>{const m=mons.find(q=>q.id===window.__K);const P=Object.values(others)[0];return m&&P?Math.round(Math.hypot(m.x-P.x,m.y-P.y)):-1}")
        rep('ประกาศ «มอนดังปรากฏตัว» ถึงสมาชิกทั้งแมพ (ไกลเกิน 520)', an>=1 or 0<=dd<520, [an,dd])
        await H.ev("()=>{mons=mons.filter(m=>!m.__test)}")
        # ---- ซิงก์: สมาชิกเห็นมอนดัง รหัส/เลือดตรงกัน ----
        r=await H.ev(SPAWN,[1|2|8|64|128,140,0,1]);await H.wait(900)
        hm=await H.ev("()=>({nm:__N.nm,mh:Math.round(__N.mh),hp:Math.round(__N.hp)})")
        mm=await M.ev(f"()=>{{const m=mons.find(q=>q.id==={r[0]});return m?{{nm:m.nm,mh:Math.round(m.mh),el:m.el,name:nmName(m.nm)}}:null}}")
        rep('สมาชิกได้รหัสมอนดังตรงกับโฮสต์ (คุณสมบัติ/ชื่อ)', bool(mm and mm['nm']==hm['nm']), [hm,mm])
        await H.ev("()=>{__N.hp=__N.mh=nmHpK(__N.nm,__N.t)*mhp(__N.t,__N.L)*EKHP*tierH()*szHp(szOf(__N))}");await H.wait(600)
        hm=await H.ev("()=>Math.round(__N.mh)");mm=await M.ev(f"()=>{{const m=mons.find(q=>q.id==={r[0]});return m?Math.round(m.mh):0}}")
        rep('เลือดเต็มของมอนดังฝั่งสมาชิกคิดตรงกับโฮสต์', mm>0 and abs(mm-hm)/hm<0.02, [hm,mm])
        # ---- 🪞 กระจกสะท้อน ----
        await M.ev("()=>{gmGod=false;me.mh=Math.max(me.mh,5000);me.hp=me.mh}")
        await H.ev("()=>{__N.nmRf=1;__N.nmT.rf=99;__N.hp=__N.mh}");await H.wait(700)
        r=await M.ev(f"()=>{{const m=mons.find(q=>q.id==={r[0]});const on=nmRefOn(m);const h0=me.hp,b0=hitBuf.length;NMG.rfT=0;addHit(m,1000,0);const add=hitBuf.slice(b0);return {{on,dh:Math.round(h0-me.hp),sent:add.map(x=>x[1])}}}}")
        rep('🪞 กระจกทำงาน: สมาชิกตีเข้าแค่ 30% และโดนสะท้อนกลับ', r['on'] and r['dh']>0 and (r['sent'] and r['sent'][0]<=300), r)
        await H.ev("()=>{__N.nmRf=0}");await H.wait(600)
        r=await M.ev(f"()=>{{const m=mons.find(q=>q.id==={hm and 0 or 0}||q.nm);const h0=me.hp,b0=hitBuf.length;addHit(m,1000,0);return {{on:nmRefOn(m),dh:Math.round(h0-me.hp),sent:hitBuf.slice(b0).map(x=>x[1])}}}}")
        rep('🪞 กระจกปิด: ตีเข้าเต็ม ไม่สะท้อน', (not r['on']) and r['dh']<=0 and r['sent'] and r['sent'][0]>=900, r)
        # ---- ⚡ วาร์ปจู่โจม ----
        r=await H.ev(SPAWN,[2,260,0,1]);await H.wait(700)
        await M.ev("()=>{me.hp=me.mh;fxs=fxs.filter(f=>!/^nm/.test(f.k))}")
        await H.ev("()=>{__N.__fx=null;__N.nmT.g=0;__N.nmT.cd={1:0};__N.root=0}")
        f=await waitfx(M,'nmbw');w=[round(f['x']-f['mx']),round(f['y']-f['my'])] if f else None
        h0=await M.ev("()=>me.hp");await H.wait(1100)
        r=await M.ev("()=>{const m=mons.find(q=>q.nm);return {dh:Math.round(window.__h0-me.hp),d:m?Math.round(Math.hypot(m.x-me.x,m.y-me.y)):-1,hp:me.hp}}".replace('window.__h0',str(h0)))
        rep('⚡ วาร์ปจู่โจม: เห็นวงม่วงที่ตัวเองก่อน แล้วมอนวาร์ปมาโผล่ + โดนดาเมจ', w is not None and abs(w[0])<40 and abs(w[1])<40 and r['dh']>0 and 0<=r['d']<120, [w,r])
        await M.ev("()=>{me.x=1600;me.y=1500}");await M.wait(500)
        await H.ev("()=>{const P=Object.values(others)[0];__N.__fx=[P.x+260,P.y];__N.nmT.g=99}");await H.wait(500)
        await M.ev("()=>{me.hp=me.mh;fxs=fxs.filter(f=>!/^nm/.test(f.k))}");await H.ev("()=>{__N.__fx=null;__N.nmT.g=0;__N.nmT.cd={1:0};__N.root=0}")
        f=await waitfx(M,'nmbw')
        await M.ev("()=>{me.x-=170}");h0=await M.ev("()=>me.hp");await H.wait(1100)
        h1=await M.ev("()=>me.hp")
        rep('⚡ วาร์ปจู่โจม: เดินออกจากวงม่วงทัน ไม่โดน', bool(f) and h1>=h0, [bool(f),h0,h1])
        await H.ev("()=>{__N.nmT.g=99;__N.__fx=[__N.x+300,__N.y]}");await M.ev("()=>{me.x=1600;me.y=1500}");await M.wait(500)
        # ---- ❄️ ระเบิดเหมันต์ (เดินช้า) ----
        r=await H.ev(SPAWN,[16,120,0,1]);await H.wait(700)
        await M.ev("()=>{me.hp=me.mh;me.nmSlw=0}");await H.ev("()=>{__N.nmT.g=0;__N.nmT.cd={4:0};__N.root=0}");await H.wait(1500)
        r=await M.ev("()=>({slow:me.nmSlw>performance.now(),mul:tbMoveMul(),dh:Math.round(me.mh-me.hp),warn:fxs.some(f=>f.k==='nmfx')})")
        rep('❄️ ระเบิดเหมันต์: อยู่ในวงโดนดาเมจและเดินช้าลง (×0.55)', r['slow'] and abs(r['mul']-.55)<.01 and r['dh']>0, r)
        # ---- 🌀 วังวนดูด ----
        r=await H.ev(SPAWN,[128,220,0,1]);await H.wait(700)
        await M.ev("()=>{me.hp=me.mh;me.pull=null}");x0=await M.ev("()=>me.x")
        await H.ev("()=>{__N.nmT.g=0;__N.nmT.cd={7:0};__N.root=0}");await H.wait(1400)
        r=await M.ev(f"()=>({{pull:!!me.pull,dx:Math.round(me.x-{x0})}})")
        await H.wait(1300)
        r2=await M.ev("()=>({dh:Math.round(me.mh-me.hp),d:Math.round(Math.hypot(window.__nx-me.x,0))})".replace('window.__nx',str(x0+220)))
        rep('🌀 วังวนดูด: ถูกดูดเข้าหามอน แล้วโดนระเบิดกลางวง', r['dx']>60 and r2['dh']>0, [r,r2])
        await M.ev("()=>{me.x=1600;me.y=1500;me.pull=null}");await M.wait(500)
        # ---- 💣 ทุ่นระเบิด ----
        r=await H.ev(SPAWN,[256,200,0,1]);await H.wait(700)
        await M.ev("()=>{me.hp=me.mh;fxs=fxs.filter(f=>!/^nm/.test(f.k))}");await H.ev("()=>{__N.nmT.g=0;__N.nmT.cd={8:0};__N.root=0}")
        f=await waitfx(M,'nmmw');w=[round(math.hypot(p[0]-f['mx'],p[1]-f['my'])) for p in f['pts']] if f and f.get('pts') else None
        await H.wait(1700);r=await M.ev("()=>Math.round(me.mh-me.hp)")
        rep('💣 ทุ่นระเบิด: เห็นวงตกรอบตัวก่อน แล้วยืนนิ่งโดนระเบิด', bool(w) and min(w)<40 and r>0, [w,r])
        await M.ev("()=>{me.hp=me.mh;fxs=fxs.filter(f=>!/^nm/.test(f.k))}");await H.ev("()=>{__N.nmT.g=0;__N.nmT.cd={8:0}}")
        f=await waitfx(M,'nmmw')
        await M.ev("()=>{me.y-=170}");await H.wait(1700);r=await M.ev("()=>Math.round(me.mh-me.hp)")
        rep('💣 ทุ่นระเบิด: เดินออกจากวงทัน ไม่โดน', bool(f) and r==0, [bool(f),r])
        await M.ev("()=>{me.x=1600;me.y=1500}");await M.wait(500)
        # ---- 🔥 รอยเพลิง ----
        r=await H.ev(SPAWN,[1,150,0,0]);await H.ev("()=>{__N.nmT.g=99}");await M.ev("()=>{me.hp=me.mh;fxs=fxs.filter(f=>!/^nm/.test(f.k))}")
        await H.wait(3000)
        n=await H.ev("()=>NMG.F.length")
        fp=await M.ev("()=>{const L=fxs.filter(f=>f.k==='nmft');const f=L[L.length-1];return f?[Math.round(f.x),Math.round(f.y),L.length]:null}")
        await H.ev("()=>{mons=mons.filter(m=>m!==__N)}")
        if fp: await M.ev(f"()=>{{me.x={fp[0]};me.y={fp[1]};me.hp=me.mh}}")
        await H.wait(1100);r=await M.ev("()=>Math.round(me.mh-me.hp)")
        rep('🔥 รอยเพลิง: เดินแล้วทิ้งไฟ (สมาชิกเห็นไฟ) · ยืนในไฟโดนดาเมจ', n>=2 and bool(fp) and r>0, [n,fp,r])
        await M.ev("()=>{me.x=1600;me.y=1500;me.hp=me.mh}");await H.wait(3300)
        # ---- 💚 ออร่าฟื้นฟู ----
        r=await H.ev(SPAWN,[4,300,0,1])
        h=await H.ev("()=>{const q={id:++mid,x:__N.x+60,y:__N.y,tx:__N.x+60,ty:__N.y,t:0,L:20,p:1,hx:__N.x+60,hy:__N.y,hp:500,mh:1000,tg:null,tt:0,ac:9,w:null,lg:0,nmb:1,elb:1,tzb:1,shb:1,szb:1,__fx:[__N.x+60,__N.y]};mons.push(q);window.__Q=q;__N.nmT.hl=0;return q.hp}")
        await H.wait(1900);h2=await H.ev("()=>__Q.hp")
        hl=await M.ev("()=>fxs.some(f=>f.k==='nmhl')")
        rep('💚 ออร่าฟื้นฟู: มอนข้าง ๆ เลือดเพิ่ม (สมาชิกเห็นคลื่นฟื้นฟู)', h2>h and hl, [h,h2,hl])
        # ---- 💨 ปราดเปรียว ----
        r=await H.ev(SPAWN,[64,300,0,1]);await H.wait(300)
        rep('💨 ปราดเปรียว: ความเร็วเดิน ×1.5', await H.ev("()=>__N.nsp")==1.5)
        # ---- 🧬 แยกร่าง + รางวัลเมื่อล้ม ----
        r=await H.ev(SPAWN,[32,80,0,1]);await H.wait(700)
        b0=await M.ev("()=>{const B=btySt();return {c:B.c,nk:B.nk,dr:drops.length}}")
        await H.ev("()=>{__N.__fx=null;__N.hp=0}");await H.wait(900)
        mn=await H.ev("()=>mons.filter(m=>m.mn&&m.hp>0&&Math.hypot(m.x-__N.x,m.y-__N.y)<120).length")
        b1=await M.ev("()=>{const B=btySt();return {c:B.c,nk:B.nk,dr:drops.length,bn:banner&&banner.s}}")
        rep('🧬 แยกร่าง: ล้มแล้วแตกเป็นร่างแยก 3 ตัว', mn==3, mn)
        rep('ล้มมอนดัง: สมาชิกที่อยู่ใกล้ได้เหรียญค่าหัว +1 · นับล้ม · ของดรอป', b1['c']==b0['c']+1 and b1['nk']==b0['nk']+1 and b1['dr']>b0['dr'], [b0,b1])
        await H.ev("()=>{mons=mons.filter(m=>!m.mn)}")
        # ---- กระดานค่าหัว: ใบประกาศ · ตามรอย · ปล่อยเป้า · ปิดค่าหัว ----
        bd=await M.ev("()=>btyBoard().map(S=>({mp:S.mp,st:S.st,n:S.n,x:S.x,y:S.y,cx:S.cx,cy:S.cy,bid:S.bid,c:S.c}))")
        bdH=await H.ev("()=>btyBoard().map(S=>S.bid)")
        rep('ใบประกาศ 3 ใบ (★/★★/★★★) · คนความคืบหน้าเท่ากันได้ชุดเดียวกัน', len(bd)==3 and sorted([x['st'] for x in bd])==[1,2,3] and [x['bid'] for x in bd]==bdH, [x['bid']+' '+x['n'] for x in bd])
        S=[x for x in bd if x['st']==1][0]
        for c in (H,M): await c.ev(f"()=>{{enterMap({S['mp']},{{x:{S['x']}+400,y:{S['y']}}});}}")
        await H.wait(3000)
        for c in (H,M): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;gmGod=true}")
        for _ in range(16):
            if H.uid in await M.ev("()=>Object.keys(others)"): break
            await H.wait(500)
        H2,M2=(H,M) if await H.ev("()=>isHost()") else (M,H)
        await H2.ev(f"()=>{{me.x={S['x']}+700;me.y={S['y']};mons.forEach(m=>{{if(m.t<3){{m.x=-9000;m.y=-9000}}}})}}")
        await M.ev(f"()=>{{me.x={S['x']}+260;me.y={S['y']}}}");await H.wait(800)
        mini=await M.ev("()=>{let ok=0;try{const c=document.createElement('canvas');const g0=g;g=c.getContext('2d');try{nmMini(0,0,.02);nmGround();ok=1}finally{g=g0}}catch(e){return String(e)}return ok}")
        await M.ev(f"()=>{{me.x={S['x']}+150;me.y={S['y']}}}");await H.wait(2500)
        sp=await H2.ev(f"()=>{{const m=mons.find(q=>q.nm&&nmSt(q.nm)===1);return m?{{c:m.nm,x:Math.round(m.x),y:Math.round(m.y)}}:null}}")
        seen=await M.ev("()=>({m:mons.some(q=>q.nm&&nmSt(q.nm)===1),bn:banner&&banner.s||''})")
        rep('เข้าใกล้รัง → โฮสต์ปล่อยเป้าค่าหัวออกมา (รหัสตรงกับใบประกาศ) · สมาชิกเห็น', bool(sp) and (sp['c']&0x1ffff)==S['c'] and seen['m'] and mini==1, [sp,S['c'],seen,mini])
        c0=await M.ev("()=>{const B=btySt();return {c:B.c,g:me.gold,bk:B.bk}}")
        await H2.ev("()=>{const m=mons.find(q=>q.nm&&nmSt(q.nm)===1);if(m){m.x=me.x;m.y=me.y;m.esh=0;m.ekv=0;m.hp=0}}")
        await M.ev(f"()=>{{me.x={S['x']}+700+30;me.y={S['y']}}}")
        await H.wait(1500)
        c1=await M.ev(f"()=>{{const B=btySt();return {{c:B.c,g:me.gold,bk:B.bk,cl:!!B.cl['{S['bid']}']}}}}")
        rep('ล้มเป้าค่าหัว → ผู้ถือใบประกาศได้ค่าหัว (เหรียญ 3+1 · ทอง · นับปิดค่าหัว)', c1['cl'] and c1['c']==c0['c']+4 and c1['g']>c0['g'] and c1['bk']==c0['bk']+1, [c0,c1])
        r=await M.ev("()=>{const L=btyBoard(),B=btySt();L.forEach(S=>B.cl[S.bid]=1);const c=B.c;btyChest();return {c0:c,c1:B.c,ch:B.ch}}")
        rep('ครบทุกใบ → เปิดหีบนักล่าได้ (+5 เหรียญ)', r['c1']==r['c0']+5 and r['ch']==1, r)
        r=await M.ev("()=>{const B=btySt();B.c=20;const s0=gdGet('s1');btyBuy('s1');return {c:B.c,s:gdGet('s1')-s0,gd:gdGet('bty')}}")
        rep('ร้านแลก: แลกหินตีบวกขั้นแรก ×3 ด้วย 4 เหรียญ · เหรียญอยู่ในรายการของ (bty)', r['c']==16 and r['s']==3 and r['gd']==16, r)
        r=await M.ev("()=>{const o=snap();const c=JSON.parse(JSON.stringify(o));c.bty.log.push(['<b>x',3,1,5]);c.bty.cl['bad']=1;const k=cleanChar(c);const b0=JSON.stringify(me.bty);me.bty=null;applySave(k);return {has:!!o.bty,c:me.bty&&me.bty.c,bad:!!(me.bty&&me.bty.cl.bad),esc:JSON.stringify(me.bty.log).includes('<')}}")
        rep('เซฟ/โหลด me.bty ครบ · กรองค่าแปลก', r['has'] and r['c']==16 and not r['bad'] and not r['esc'], r)
        # ---- หน้า UI · ปุ่มเมนู · กระดานในค่าย · ฉายา ----
        r=await M.ev("()=>{const b=$('byb');const sec=b&&b.closest('.ui8s');typeof menuToggle==='function'&&menuToggle();const b2=$('byb');const s2=b2&&b2.closest('.ui8s');const t=s2?s2.querySelector('.ui8h').textContent:'';b2&&b2.click();return {btn:!!b2,sec:t,open:ov.dataset.k==='bty'&&!ov.hidden,cards:ov.querySelectorAll('.byp').length,done:ov.querySelectorAll('.byp.done').length}}")
        rep('ปุ่ม «ค่าหัว» อยู่หมวดผจญภัย · กดแล้วเปิดกระดาน 3 ใบ (ปิดแล้วขึ้นสถานะ)', r['btn'] and 'ผจญภัย' in r['sec'] and r['open'] and r['cards']==3 and r['done']==3, r)
        for t in ['s','r']:
            ok=await M.ev(f"()=>{{BTYTAB='{t}';btyUI();return ov.innerHTML.length>500&&!ov.innerHTML.includes('undefined')&&!ov.innerHTML.includes('NaN')}}")
            rep('แท็บ '+('ร้านแลก' if t=='s' else 'บันทึกล่า')+' แสดงครบ ไม่มี undefined/NaN', ok)
        r=await M.ev("()=>{ov.hidden=true;enterMap(1,{x:1660,y:1460});try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;return 1}")
        await M.wait(1500)
        r=await M.ev("()=>{bars();const b=$('npcb');const t=b.textContent,vis=b.style.display;b.click();return {t,vis,open:ov.dataset.k==='bty'&&!ov.hidden}}")
        rep('ยืนหน้ากระดานประกาศกลางค่าย → ปุ่ม «ดูกระดานค่าหัว» เปิดกระดาน', 'ค่าหัว' in r['t'] and r['vis']=='block' and r['open'], r)
        r=await M.ev("()=>({a:['bhT1','bhT2','bhT3'].every(k=>ACHM[k]),t:['bhT1','bhT2','bhT3'].every(k=>TTB[k])})")
        rep('ฉายานักล่า 3 อัน + โบนัสฉายา', r['a'] and r['t'], r)
        errs=[e for c in (H,M) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for x in R if x[1]), len(R)))
asyncio.run(main())
