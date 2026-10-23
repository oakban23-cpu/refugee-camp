"""v493 ลื่นขึ้นบนมือถือระดับกลาง: จำกัดเฟรม (จอ 120Hz → 60 · ตั้ง 30 ได้) · HD ในโหมดประหยัด · ไม่วาดของนอกจอ · ของประดับพื้นเป็นภาพแคช · HUD เขียนเฉพาะตอนเปลี่ยน · ตั้งค่าอัตราเฟรม · คำแนะนำ 30 เฟรม"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:500], flush=True)
async def waitc(c,js,arg=None,ms=4000,step=100):
    r=None
    for _ in range(ms//step):
        r=await c.ev(js,arg) if arg is not None else await c.ev(js)
        if r: return r
        await c.wait(step)
    return r
# ขับ rAF เองด้วยเวลาปลอม: นับว่าเกมทำงานจริงกี่เฟรม (FL.run) จากรอบจอทั้งหมด
DRIVE="""async([mode,step,n])=>{flSet(mode);const Q=[],raf0=window.requestAnimationFrame;window.requestAnimationFrame=cb=>{Q.push(cb);return 1};await new Promise(r=>setTimeout(r,120));
  let t=performance.now()+1000;FL.dts.length=0;FL.ri=16.7;FL.c=0;const r0=FL.run;let calls=0,run0=0;
  for(let i=0;i<n;i++){t+=Array.isArray(step)?step[i%step.length]:step;const cbs=Q.splice(0);for(const cb of cbs){try{cb(t)}catch(e){}}calls++;if(i===Math.floor(n/3))run0=FL.run}
  const ran=FL.run-run0,tail=calls-Math.floor(n/3);window.requestAnimationFrame=raf0;const cbs=Q.splice(0);for(const cb of cbs)raf0(cb);
  return {mode,ri:+FL.ri.toFixed(2),ran,tail,ratio:+(ran/tail).toFixed(3),fps:Math.round(ran/tail*(1000/(Array.isArray(step)?step.reduce((a,b)=>a+b,0)/step.length:step)))}}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','low')}catch(e){}")
        pg=await ctx.new_page();A=Client(ctx,pg,'A');pg.on('pageerror',lambda e:A.errs.append(str(e)[:300]));pg.on('console',lambda m:A.errs.append('console: '+m.text[:200]) if m.type=='error' and 'ERR_' not in m.text else None)
        await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Fp'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(1500)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};me.x=1600;me.y=1700}");await A.wait(800)
        # ===== ① จำกัดเฟรม =====
        r120=await A.ev(DRIVE,['auto',1000/120,360])
        r120_60=await A.ev(DRIVE,['60',1000/120,360])
        r120_30=await A.ev(DRIVE,['30',1000/120,480])
        r60_30=await A.ev(DRIVE,['30',1000/60,240])
        r60=await A.ev(DRIVE,['auto',1000/60,240])
        rmax=await A.ev(DRIVE,['max',1000/120,360])
        heavy=await A.ev(DRIVE,['auto',[25,25,25,8.333],360])
        r90=await A.ev(DRIVE,['auto',1000/90,270])
        rep('จอ 120Hz: อัตโนมัติ (มือถือ) = 60 · ตั้ง 60 = 60 · ตั้ง 30 = 30 · สูงสุด = 120 · จอ 60Hz: อัตโนมัติ = 60 · ตั้ง 30 = 30',
            58<=r120['fps']<=62 and 58<=r120_60['fps']<=62 and 29<=r120_30['fps']<=31 and 29<=r60_30['fps']<=31 and 58<=r60['fps']<=61 and rmax['fps']>=118, [r120,r120_60,r120_30,r60_30,r60,rmax])
        rep('เฟรมหนักเกินรอบ (บางเฟรม 25ms) ไม่ข้ามเฟรมซ้ำเติม · จอ 90Hz ไม่ตัดเหลือ 45', heavy['ratio']>=.74 and r90['fps']>=85, [heavy,r90])
        await A.ev("()=>{flSet('auto')}")
        fq=await A.ev("""()=>{flSet('30');FQ.bad=1;GQ='auto';LOWQ=false;const t0=performance.now();for(let i=0;i<200;i++)fpsTick(t0+i*34);const o={low:LOWQ,bad:FQ.bad};setGQ('low');flSet('auto');return o}""")
        rep('ตั้ง 30 เฟรม: ระบบปรับคุณภาพอัตโนมัติไม่เข้าใจผิดว่าเครื่องช้า (ไม่สลับไปโหมดประหยัดเอง)', fq['low'] is False and fq['bad']==0, fq)
        # ===== ⑤ HUD เขียนเฉพาะตอนเปลี่ยน =====
        hud=await A.ev("""async()=>{let n=0;const mo=new MutationObserver(L=>{n+=L.length});for(const id of['thp','tmp','txp','lvb','mni','npcb'])mo.observe($(id),{childList:true,characterData:true,subtree:true});
          await new Promise(r=>setTimeout(r,1000));const idle=n;me.hp=Math.max(1,me.mh-123);await new Promise(r=>setTimeout(r,200));const t=$('thp').textContent;mo.disconnect();const v=+(/(\d+)\//.exec(t)||[])[1];me.hp=me.mh;return {idle,t,ok:v>=me.mh-130&&v<me.mh&&t.indexOf('/'+me.mh)>=0}}""")
        rep('แถบ HP/MP/XP/เลเวล/ชื่อแมพ: ยืนเฉย ๆ 1 วิ ไม่เขียน DOM ซ้ำ · HP เปลี่ยนแล้วตัวเลขเปลี่ยนตาม', hud['idle']==0 and hud['ok'], hud)
        # ===== ③ ไม่วาดของนอกจอ =====
        cu=await A.ev("""async()=>{const a=PVC.sk,d=PVC.dr;await new Promise(r=>setTimeout(r,1500));
          let z=1;try{if(ZM&&ZM.on&&ZM.z>0)z=ZM.z}catch(e){}const vis=guards.filter(q=>!q.dead&&q.x>cam.x-30&&q.x<cam.x+W/z+30&&q.y>cam.y-30&&q.y<cam.y+H/z+60).length,all=guards.filter(q=>!q.dead).length;
          let drawn=0;const f=drawKnight;drawKnight=function(){drawn++;return f.apply(this,arguments)};let calls=0;const f0=f;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));drawKnight=f;
          const T={kn:0};const P=CanvasRenderingContext2D.prototype,bp=P.beginPath;let bn=0;P.beginPath=function(){if(this===g)bn++;return bp.apply(this,arguments)};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));P.beginPath=bp;
          return {skip:PVC.sk-a,dr:PVC.dr-d,vis,all,bn}}""")
        # นับทหารที่ถูกวาดจริงเทียบกับทหารที่อยู่ในจอ
        await A.ev("()=>{me.x=1600;me.y=2130;window.__pk=setInterval(()=>{me.x=1600;me.y=2130},50)}");await A.wait(1500)
        kn=await A.ev("""async()=>{clearInterval(window.__pk);let z=1;try{if(ZM&&ZM.on&&ZM.z>0)z=ZM.z}catch(e){}const W2=W/z,H2=H/z;const inV=guards.filter(q=>!q.dead&&q.x>cam.x+5&&q.x<cam.x+W2-5&&q.y>cam.y+10&&q.y<cam.y+H2-10);
          const seen=new Set();const T0=g.translate;g.translate=function(x,y){seen.add(Math.round(x)+','+Math.round(y));return T0.apply(this,arguments)};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));g.translate=T0;
          const miss=inV.filter(q=>![...seen].some(s=>{const [a,b]=s.split(',').map(Number);return Math.abs(a-q.x)<2&&Math.abs(b-(q.y-(q.ar?30:0)))<2})).length;return {inV:inV.length,miss}}""")
        rep('ทหารยาม/ชาวค่าย/ไก่/ธง/ประตูที่อยู่นอกจอไม่ถูกวาด · ทหารที่อยู่ในจอยังวาดครบทุกคน', cu['skip']>20 and kn['inV']>=1 and kn['miss']==0, [cu,kn])
        # ===== ② ภาพ HD ในโหมดประหยัด =====
        await A.ev("()=>enterMap(9,{x:1600,y:1700})");await A.wait(1500)
        hd=await waitc(A,"()=>LOWQ&&HDI.ok===1&&HD()&&{low:LOWQ,hd:HD(),hdb:HDB(),mem:navigator.deviceMemory}",ms=12000,step=250)
        hd2=await A.ev("()=>{const d=Object.getOwnPropertyDescriptor(Navigator.prototype,'deviceMemory');Object.defineProperty(navigator,'deviceMemory',{configurable:true,get:()=>2});const o={lq:lqHD(),hd:HD()};delete navigator.deviceMemory;return o}")
        rep('โหมดประหยัด + เครื่อง RAM ≥ 4GB: นครอัสตราใช้ภาพ HD (เบากว่าวาดเส้น) · เครื่อง RAM 2GB ยังปิด HD เหมือนเดิม', hd and hd['hd'] and hd2['lq'] and not hd2['hd'], [hd,hd2])
        # ===== ④ ของประดับพื้นเป็นภาพแคช =====
        await A.ev("()=>enterMap(2,{x:600,y:1600})");await A.wait(2500)
        sp=await A.ev("""async()=>{const h0=SPC.hit,m0=SPC.mk;await new Promise(r=>setTimeout(r,1500));const o={on:spcOn(),size:SPC.m.size,hit:SPC.hit-h0,mk:SPC.mk-m0,px:SPC.px,bb:Object.keys(SPC.bb).length,nul:Object.entries(SPC.bb).filter(([k,v])=>!v).map(([k])=>k)};
          setGQ('high');await new Promise(r=>setTimeout(r,300));const h1=SPC.hit;await new Promise(r=>setTimeout(r,800));o.hiOn=spcOn();o.hiHit=SPC.hit-h1;setGQ('low');return o}""")
        rep('โหมดประหยัด: ของประดับพื้น (ดอกไม้ หญ้า หิน กระดูก ฯลฯ) วาดครั้งเดียวแล้วใช้ภาพซ้ำ · หน่วยความจำไม่เกินเพดาน · โหมดสูงวาดสดเหมือนเดิม', sp['on'] and sp['size']>5 and sp['hit']>sp['mk']*5 and sp['px']<=7e6 and not sp['hiOn'] and sp['hiHit']==0, sp)
        # ===== ตั้งค่า → อัตราเฟรม =====
        st=await A.ev("""async()=>{cfgUI();const row=ov.querySelector('[data-flrow]');if(!row)return {row:0};const cap=row.parentNode.querySelector('.cap').textContent;const on0=row.querySelector('.cfgb.on').dataset.flv;
          row.querySelector('[data-flv="30"]').click();await new Promise(r=>setTimeout(r,150));const r2=ov.querySelector('[data-flrow]');const on1=r2.querySelector('.cfgb.on').dataset.flv,sm=r2.querySelector('small').textContent,ls=localStorage.getItem('refugee_fps'),n=ov.querySelectorAll('[data-flrow]').length;
          r2.querySelector('[data-flv="auto"]').click();await new Promise(r=>setTimeout(r,150));const on2=ov.querySelector('[data-flrow] .cfgb.on').dataset.flv;ov.hidden=true;return {row:1,cap,on0,on1,sm,ls,n,on2,mode:FL.mode}}""")
        rep('ตั้งค่า → คุณภาพภาพ มีแถว «🎞️ อัตราเฟรม» (อัตโนมัติ/60/30/สูงสุด) กดแล้วจำค่า ไม่ซ้อนแถว', st['row'] and 'คุณภาพภาพ' in st['cap'] and st['on0']=='auto' and st['on1']=='30' and 'ประหยัดแบต' in st['sm'] and st['ls']=='30' and st['n']==1 and st['on2']=='auto' and st['mode']=='auto', st)
        # ===== คำแนะนำ 30 เฟรม =====
        tip=await A.ev("""async()=>{localStorage.removeItem('refugee_fps_tip');FLT.done=false;FLT.bad=0;const p0=pfLive;pfLive=()=>({fps:26,ms:38,p90:50,dr:10});ov.hidden=true;await new Promise(r=>setTimeout(r,21500));
          const ms=(chatLog||[]).slice(-4).map(m=>m.t).join(' | ');pfLive=p0;return {done:FLT.done,ls:localStorage.getItem('refugee_fps_tip'),ms:ms.slice(-160)}}""")
        rep('โหมดประหยัดแล้วยังต่ำกว่า 40 เฟรมนาน 20 วิ → แนะนำตั้ง 30 เฟรมครั้งเดียว', tip['done'] and tip['ls']=='1' and 'อัตราเฟรม 30' in tip['ms'], tip)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
