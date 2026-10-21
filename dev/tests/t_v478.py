"""v478 แผนที่สมบัติ: ภาพสเก็ตช์ · ตามหา (อุณหภูมิ/ประกาย) · ขุด · หีบ/ผู้พิทักษ์/ห้องทองคำ · แชร์ในปาร์ตี้ (ออนไลน์ 2 เครื่อง)"""
import asyncio, sys, json, math
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
GIVE="""([mp,i,q])=>{const T=tmSt();const o={id:tmId(),mp,i,q,t:Date.now()};T.L.push(o);T.a=o.id;return o}"""
CLEAN="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true}"
async def goto(c,mp,x,y):
    await c.ev(f"()=>{{enterMap({mp},{{x:{x},y:{y}}})}}");await c.wait(1300);await c.ev(CLEAN)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Hst','melee',70);B=await new_client(b,'Mem','mage',70)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};me.cd=99;setInterval(()=>{me.cd=99},30)}")
        # ---- ข้อมูลจุดขุด ----
        r=await A.ev("()=>{const K=Object.keys(TMD);let n=0,bad=0;K.forEach(k=>{TMD[k].forEach(d=>{n++;if(!(d[0]>100&&d[0]<3100&&d[1]>100&&d[1]<3100))bad++})});return {maps:K.length,n,bad}}")
        rep('มีจุดขุดครบทุกแมพสนาม (แมพละ 2–3 จุด)', r['maps']>=30 and r['n']>=r['maps']*2 and r['bad']==0, r)
        # ---- ได้แผนที่ · เต็ม 10 ใบ ----
        r=await A.ev("()=>{me.tm=null;const T=tmSt();let ok=0;for(let i=0;i<12;i++)if(tmGive(1+(i%3),'ทดสอบ'))ok++;const L=T.L;return {ok,n:L.length,valid:L.every(o=>TMD[o.mp]&&TMD[o.mp][o.i]&&WMLV[o.mp]),uniq:new Set(L.map(o=>o.mp+':'+o.i)).size,act:!!T.a}}")
        rep('ได้แผนที่สมบัติ ชี้ไปจุดขุดที่มีจริง · เก็บได้สูงสุด 10 ใบ', r['ok']==10 and r['n']==10 and r['valid'] and r['act'], r)
        r=await A.ev("()=>{const o=snap();const c=JSON.parse(JSON.stringify(o));c.tm.L.push({id:'<x>',mp:999,i:0,q:9});const k=cleanChar(c);me.tm=null;applySave(k);return {n:me.tm.L.length,a:!!me.tm.a,bad:me.tm.L.some(o=>o.mp===999)}}")
        rep('เซฟ/โหลดแผนที่ครบ · กรองแผนที่เสีย', r['n']==10 and r['a'] and not r['bad'], r)
        # ---- หน้า UI + ภาพสเก็ตช์จาก hd-tmap.webp ----
        await A.ev("()=>{tmUI()}");await A.wait(1500)
        r=await A.ev("()=>{const cs=[...ov.querySelectorAll('canvas[data-tms]')];const c=cs[0];let px=0;try{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;for(let i=0;i<d.length;i+=40)if(d[i+3]>0&&(d[i]+d[i+1]+d[i+2])<600)px++}catch(e){}return {cards:ov.querySelectorAll('.tmc').length,atlas:TMA.ok,px,ud:ov.innerHTML.includes('undefined')||ov.innerHTML.includes('NaN')}}")
        rep('หน้าแผนที่สมบัติ: การ์ด 10 ใบ · โหลดภาพสเก็ตช์แล้ววาดลงการ์ด', r['cards']==10 and r['atlas']==1 and r['px']>50 and not r['ud'], r)
        r=await A.ev("()=>{const b=$('tmb');typeof menuToggle==='function'&&menuToggle();const s=b&&b.closest('.ui8s');const t=s?s.querySelector('.ui8h').textContent:'';try{$('mnp').hidden=true}catch(e){}return {btn:!!b,sec:t}}")
        rep('ปุ่ม «สมบัติ» อยู่หมวดผจญภัย', r['btn'] and 'ผจญภัย' in r['sec'], r)
        # ---- ปาร์ตี้ ----
        await A.ev(f"()=>{{PTY={{id:'tp1',lead:uid,mem:[ptMe(),{{u:'{B.uid}',n:'Mem',cls:'mage',lv:70,hp:1,mh:1,mp:curMap,s:Date.now()}}]}}}}")
        await B.ev(f"()=>{{PTY={{id:'tp1',lead:'{A.uid}',mem:[{{u:'{A.uid}',n:'Hst',cls:'melee',lv:70,hp:1,mh:1,mp:curMap,s:Date.now()}},ptMe()]}}}}")
        # เลือกจุดขุดในแมพ 4 (ใกล้จุดเกิด) ให้ทั้งสองเครื่องไปแมพนั้น
        mp=await A.ev("()=>{const K=Object.keys(TMD).map(Number).filter(m=>m>=3&&m<=8);return K[0]}")
        sp=await A.ev(f"()=>TMD[{mp}][0]")
        o=await A.ev(GIVE,[mp,0,1]);await A.ev("()=>{const T=tmSt();T.L=T.L.filter(q=>q.mp!==%d||q.id===T.a);tmShare()}"%mp)
        await A.wait(1200)
        r=await B.ev("()=>Object.values(TMS.pt).map(o=>[o.mp,o.i,o.n])")
        rep('ติดตามแผนที่แล้วแชร์ให้เพื่อนในปาร์ตี้เห็น', len(r)==1 and r[0][0]==mp, r)
        for c in (A,B): await goto(c,mp,sp[0]+900 if sp[0]<1600 else sp[0]-900,sp[1])
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        H,M=(A,B) if await A.ev("()=>isHost()") else (B,A)
        await H.ev("()=>{setInterval(()=>{fillT=1e9;sp=1e9;bossCd=1e9;mons=mons.filter(m=>m.nm||m.tgb||m.t>=3)},100)}")
        await A.wait(800)
        h1=await A.ev("()=>{const e=$('tmh');return e&&!e.hidden?e.textContent:''}")
        await A.ev(f"()=>{{me.x={sp[0]}+150;me.y={sp[1]}}}");await A.wait(1600)
        h2=await A.ev("()=>{const e=$('tmh');return e&&!e.hidden?e.textContent:''}")
        gl=await A.ev("()=>fxs.some(f=>f.k==='tmgl')")
        hm=await B.ev("()=>{const e=$('tmh');return e&&!e.hidden?e.textContent:''}")
        rep('ในแมพเป้าหมาย: ป้ายอุณหภูมิใต้แผนที่เล็ก ไกล→ใกล้ เปลี่ยนเป็นร้อน · ใกล้มากมีประกายที่พื้น · เพื่อนก็เห็นป้าย', bool(h1) and bool(h2) and h1!=h2 and gl and bool(hm), [h1,h2,gl,hm])
        # ขุดแล้วยกเลิกเพราะขยับ
        await A.ev(f"()=>{{me.x={sp[0]};me.y={sp[1]}+10}}");await A.wait(400)
        r=await A.ev("()=>{bars();const b=$('npcb');return [b.style.display,b.textContent]}")
        await A.ev("()=>{$('npcb').click()}");await A.wait(500);await A.ev("()=>{me.x+=40}");await A.wait(600)
        c1=await A.ev("()=>({dig:!!TMS.dig,n:tmSt().L.length})")
        rep('ยืนตรงจุด → ปุ่ม ⛏️ ขุด · ขยับระหว่างขุด = ยกเลิก (แผนที่ไม่หาย)', r[0]=='block' and 'ขุด' in r[1] and not c1['dig'], [r,c1])
        # ขุดสำเร็จ → หีบ (บังคับผล)
        n0=await A.ev(f"()=>{{me.x={sp[0]};me.y={sp[1]}+10;return tmSt().L.length}}");await A.wait(300)
        await M.ev(f"()=>{{me.x={sp[0]}+60;me.y={sp[1]}}}")
        dA0=await A.ev("()=>drops.length");dB0=await B.ev("()=>drops.length")
        await A.ev("()=>{window.__R=Math.random;bars();$('npcb').click()}");await A.wait(400)
        await A.ev("()=>{const f=window.__R;let k=0;Math.random=()=>{k++;return k===1?.01:f()};setTimeout(()=>{Math.random=f},2500)}")
        await A.wait(1700)
        r=await A.ev("()=>({n:tmSt().L.length,d:tmSt().n.d,c:tmSt().n.c,drops:drops.length})")
        dB1=await B.ev("()=>drops.length")
        rep('ขุดสำเร็จ (1.4 วิ) → 📦 หีบสมบัติ: ได้ทอง/อุปกรณ์ · แผนที่ใบนั้นหายไป · เพื่อนปาร์ตี้ข้าง ๆ ได้ของด้วย', r['n']==n0-1 and r['c']>=1 and r['drops']>dA0 and dB1>dB0, [n0,r,dA0,dB0,dB1])
        # ผู้พิทักษ์: เพื่อน (M) ขุดแผนที่ที่ A แชร์
        sp2=await A.ev(f"()=>TMD[{mp}][1]||TMD[{mp}][0]")
        i2=1 if await A.ev(f"()=>!!TMD[{mp}][1]") else 0
        o2=await A.ev(GIVE,[mp,i2,2]);await A.ev("()=>tmShare()");await A.wait(1000)
        await M.ev(f"()=>{{me.x={sp2[0]};me.y={sp2[1]}+10}}");await A.ev(f"()=>{{me.x={sp2[0]}+70;me.y={sp2[1]}}}");await A.wait(500)
        await M.ev("()=>{bars();const b=$('npcb');window.__t=b.textContent;b.click();const f=Math.random;let k=0;Math.random=()=>{k++;return k===1?.7:f()};setTimeout(()=>{Math.random=f},2600)}")
        await M.wait(2600)
        g=await H.ev("()=>{const m=mons.find(q=>q.nm&&(q.nm&TMGB));return m?{id:m.id,c:m.nm,n:nmName(m.nm)}:null}")
        gone=await A.ev(f"()=>!tmSt().L.some(q=>q.id==='{o2['id']}')")
        rep('เพื่อนขุดแผนที่ที่แชร์ได้ → 👹 ผู้พิทักษ์สมบัติโผล่ (ชื่อ «ผู้พิทักษ์…») · แผนที่ของเจ้าของหายไป', bool(g) and g['n'].startswith('ผู้พิทักษ์') and gone, [g,gone])
        dA0=await A.ev("()=>drops.length");dB0=await B.ev("()=>drops.length")
        await H.ev("()=>{const m=mons.find(q=>q.nm&&(q.nm&TMGB));if(m){m.esh=0;m.ekv=0;m.hp=0}}");await A.wait(1500)
        dA1=await A.ev("()=>drops.length");dB1=await B.ev("()=>drops.length")
        rep('ล้มผู้พิทักษ์ → หีบใหญ่ให้ทั้งปาร์ตี้ที่อยู่ใกล้', dA1>dA0+5 and dB1>dB0+5, [dA0,dA1,dB0,dB1])
        # ห้องทองคำ
        await A.ev(f"()=>{{me.x={sp[0]};me.y={sp[1]}+10}}")
        o3=await A.ev(GIVE,[mp,0,3]);await A.wait(400)
        await A.ev("()=>{bars();$('npcb').click();const f=Math.random;let k=0;Math.random=()=>{k++;return k===1?.99:f()};setTimeout(()=>{Math.random=f},2500)}")
        await A.wait(1900)
        vp=await A.ev("()=>TMS.vp?{vid:TMS.vp.vid}:null");vpB=await B.ev("()=>TMS.vp?{vid:TMS.vp.vid}:null")
        r=await A.ev(f"()=>{{me.x={sp[0]};me.y={sp[1]}+20;bars();const b=$('npcb');return [b.style.display,b.textContent]}}")
        await A.ev("()=>{$('npcb').click()}");await A.wait(1800)
        v=await A.ev("()=>({mp:curMap,vault:!!(MAPS[curMap]&&MAPS[curMap].vault),gold:drops.filter(d=>d.k==='g').length,hud:($('tmvh')||{}).textContent||'',tgb:mons.filter(m=>m.tgb).length})")
        rep('🌀 ห้องทองคำ: ประตูเปิดที่หลุม (เพื่อนเห็น) · เข้าแล้วอยู่ห้องแยก มีกองทอง ตัวจับเวลา ก็อบลินถุงทอง', bool(vp) and bool(vpB) and v['vault'] and v['mp']>=80001 and v['gold']>=22 and 'ห้องทองคำ' in v['hud'] and v['tgb']>=1, [vp,vpB,r,v])
        g0=await A.ev("()=>me.gold")
        await A.ev("()=>{me.x=CX-230;me.y=CY-110}");await A.wait(900)
        r=await A.ev("()=>({ch:TMV&&TMV.ch.filter(c=>c[2]).length,dr:drops.length})")
        await A.ev("()=>{TMV.until=performance.now()+300}");await A.wait(1500)
        r2=await A.ev(f"()=>({{mp:curMap,x:Math.round(me.x),y:Math.round(me.y),tm:!!TMV}})")
        rep('เปิดหีบในห้องทองคำได้ · หมดเวลาแล้วกลับมาที่หลุมเดิม', r['ch']==1 and r2['mp']==mp and abs(r2['x']-sp[0])<80 and not r2['tm'], [r,r2])
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for x in R if x[1]), len(R)))
asyncio.run(main())
