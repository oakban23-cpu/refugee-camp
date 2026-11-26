import asyncio, sys, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
F=['b-wild','b-dark','b-fire','b-frost','b-astra','b-mvp','d-dg','d-tw','d-raid']
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){};try{ov.hidden=true}catch(e){}}"
async def wait(pg,cond,ms=10000):
    for _ in range(ms//200):
        if await pg.evaluate(cond):return True
        await pg.wait_for_timeout(200)
    return False
async def main():
    p=start_server();errs=[]
    try:
        bad=[]
        for f in F:
            r=urllib.request.urlopen(URL+f'bgm-{f}.mp3');b=r.read()
            if r.headers['Content-Type']!='audio/mpeg' or len(b)<300000:bad.append((f,len(b)))
        rep('เพลงบอส 6 + ดันเจี้ยน 3 ไฟล์ เสิร์ฟเป็น audio/mpeg',not bad,bad)
        async with async_playwright() as pw:
            br=await pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
            pg=await (await br.new_context(viewport={'width':915,'height':412})).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Boss',60]);await pg.wait_for_timeout(1500);await pg.evaluate(CL)
            await pg.evaluate("()=>{try{AC.resume()}catch(e){}const o=BGMM.th;BGMM.th=()=>window.__fth||o();BGMP.cm=BGMB.cm=()=>window.__fm||curMap;window.__dg=0;window.__tw=0;window.__raid=0;BGMB.dg=BGMP.dg=()=>!!window.__dg||!!window.__tw;BGMB.tw=()=>!!window.__tw;BGMB.raid=()=>!!window.__raid}")
            # อยู่ในแมพ 30 → เพลงแมพ + โหลดเพลงบอสภูมิภาค (อัสตรา) รอไว้
            await pg.evaluate("()=>{window.__fm=30;window.__fth='sky'}")
            ok=await wait(pg,"()=>BGM.cur==='p30'&&!!BGM.B.b_astra",20000)
            rep('อยู่ในแมพ: เพลงแมพเล่น + โหลดเพลงบอสของภูมิภาครอไว้แล้ว',ok,await pg.evaluate("()=>[BGM.cur,Object.keys(BGM.B).filter(k=>BGM.B[k])]"))
            # บอสโผล่ → เพลงบอสทันที (ไม่ต้องรอโหลด) และร็อกสังเคราะห์เงียบ
            await pg.evaluate("()=>{window.__fth='rk:ผู้สำเร็จราชการ'}")
            t=await pg.evaluate("async()=>{const t0=performance.now();for(let i=0;i<40;i++){if(BGM.cur==='b_astra')break;await new Promise(r=>setTimeout(r,100))}return [BGM.cur,performance.now()-t0,mzTheme()]}")
            rep('บอสโผล่ → เปลี่ยนเป็นเพลงบอสภายใน 0.6 วิ และเพลงร็อกเดิมเงียบ',t[0]=='b_astra' and t[1]<600 and t[2]=='',t)
            r=await pg.evaluate("()=>{const n=BGM.n;return[n.loopStart,Math.round(n.loopEnd*100)/100,Math.round((BGM.T.b_astra.L+.5)*100)/100,Math.round(n.buffer.duration*100)/100]}")
            rep('จุดวนเพลงบอสถูกต้อง',r[0]==.5 and abs(r[1]-r[2])<.02 and r[3]>=r[1],r)
            # สู้จบ → กลับเพลงแมพทันที (เก็บไว้ในแรมระหว่างสู้)
            await pg.evaluate("()=>{window.__fth='sky'}")
            t=await pg.evaluate("async()=>{const t0=performance.now();for(let i=0;i<40;i++){if(BGM.cur==='p30')break;await new Promise(r=>setTimeout(r,100))}return [BGM.cur,performance.now()-t0]}")
            rep('สู้จบ → กลับเพลงแมพภายใน 0.6 วิ',t[0]=='p30' and t[1]<600,t)
            # ตระกูลบอสตามแมพ + MVP
            fam={}
            for m,th,exp in [(3,'rk:x','b_fire'),(2,'rk:x','b_dark'),(4,'rk:x','b_frost'),(7,'rk:x','b_wild'),(29,'rk:x','b_astra'),(30,'rk:MVP:x','b_mvp')]:
                fam[m]=await pg.evaluate("([m,th])=>{window.__fm=m;window.__fth=th;return bgmbKey()}",[m,th])==exp
            rep('เพลงบอสตามภูมิภาค (ไฟ/มืด/น้ำแข็ง/ป่า/อัสตรา) และ MVP ใช้เพลงใหญ่สุด',all(fam.values()),fam)
            # ดันเจี้ยน
            r=await pg.evaluate("()=>{const o=[];window.__fm=10500;window.__dg=1;window.__fth='tower';o.push(bgmbKey());window.__fth='rift';window.__raid=1;o.push(bgmbKey());window.__fth='rk:x';o.push(bgmbKey());window.__raid=0;window.__dg=0;window.__tw=1;window.__fth='tower';o.push(bgmbKey());window.__fth='rk:tw3';o.push(bgmbKey());window.__tw=0;return o}")
            rep('ดันเจี้ยนทั่วไป/เรด/บอสเรด/หอคอย/บอสหอคอย ได้เพลงถูกแบบ',r==['d_dg','d_raid','b_mvp','d_tw','b_dark'],r)
            for k in ('d_dg','d_tw','d_raid','b_mvp','b_fire','b_frost','b_wild','b_dark'):
                await pg.evaluate("(k)=>{const m={d_dg:[10500,1,0,0,'tower'],d_tw:[10500,0,1,0,'tower'],d_raid:[10500,1,0,1,'rift'],b_mvp:[30,0,0,0,'rk:MVP:x'],b_fire:[3,0,0,0,'rk:x'],b_frost:[4,0,0,0,'rk:x'],b_wild:[7,0,0,0,'rk:x'],b_dark:[2,0,0,0,'rk:x']}[k];window.__fm=m[0];window.__dg=m[1];window.__tw=m[2];window.__raid=m[3];window.__fth=m[4]}",k)
                ok=await wait(pg,f"()=>BGM.cur==='{k}'",15000)
                if not ok:rep(f'เล่น {k}',False,await pg.evaluate("()=>BGM.cur"))
            mem=await pg.evaluate("()=>Object.keys(BGM.B).filter(k=>BGM.B[k]).length")
            rep('เล่นได้ครบทั้ง 9 เพลง และแรมเก็บไม่เกิน 3 เพลง',mem<=3,mem)
            await pg.evaluate("()=>{window.__dg=0;window.__tw=0;window.__raid=0;window.__fm=3;window.__fth='rk:x'}");await wait(pg,"()=>BGM.cur==='b_fire'")
            r=await pg.evaluate("async()=>{BGMB.on=0;await new Promise(r=>setTimeout(r,1500));const a=[BGM.cur,mzTheme()];BGMB.on=1;return a}")
            rep('BGMB.on=0 → บอสกลับใช้ร็อกเดิม',r[0]=='' and r[1]=='rk:x',r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
