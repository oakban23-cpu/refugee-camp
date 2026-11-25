import asyncio, sys, urllib.request, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
IDS=[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45]
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
        for i in IDS:
            r=urllib.request.urlopen(URL+f'bgm-p{i}.mp3');b=r.read()
            if r.headers['Content-Type']!='audio/mpeg' or len(b)<400000:bad.append((i,len(b)))
        rep('เพลงประจำแมพ 34 ไฟล์ เสิร์ฟเป็น audio/mpeg',not bad,bad)
        async with async_playwright() as pw:
            br=await pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
            pg=await (await br.new_context(viewport={'width':915,'height':412})).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['archer','Bgmp',40]);await pg.wait_for_timeout(1500);await pg.evaluate(CL)
            await pg.evaluate("()=>{try{AC.resume()}catch(e){}}")
            r=await pg.evaluate("()=>[Object.keys(BGMP.M).map(Number).sort((a,b)=>a-b),Object.keys(MAPS).map(Number).filter(k=>k<=45).length]")
            maps=set(range(1,11))|set(r[0])
            rep('ทุกแมพในโลกมีเพลงไม่ซ้ำ: แมพ 1-10 ใช้เพลงธีม 10 เพลง + อีก 34 แมพมีเพลงของตัวเอง',r[0]==IDS and len(maps)==44,r)
            # บังคับแมพ (ทั้งธีมเป็นทุ่ง) ตรวจว่าเพลงของแมพนั้นเล่น และเพลงสังเคราะห์เงียบ
            await pg.evaluate("()=>{const o=BGMM.th;BGMM.th=()=>window.__fth||o();BGMP.cm=()=>window.__fm}")
            res={};mem=[]
            for i in [11,19,27,35,45,12,30,44]:
                await pg.evaluate("(i)=>{window.__fm=i;window.__fth='sky'}",i)
                ok=await wait(pg,f"()=>BGM.cur==='p{i}'&&mzTheme()===''",15000);res[i]=ok
                mem.append(await pg.evaluate("()=>Object.keys(BGM.B).filter(k=>BGM.B[k]).length"))
            rep('เข้าแมพไหน ได้เพลงของแมพนั้น (ทดสอบ 8 แมพ) และเพลงสังเคราะห์เดิมเงียบ',all(res.values()),res)
            rep('เก็บเพลงในแรมไม่เกิน 2 เพลง',max(mem)<=2,mem)
            r=await pg.evaluate("()=>{const n=BGM.n;return[n.loopStart,Math.round(n.loopEnd*100)/100,Math.round((BGM.T[BGM.cur].L+.5)*100)/100,Math.round(n.buffer.duration*100)/100]}")
            rep('จุดวนเพลงแมพถูกต้อง',r[0]==.5 and abs(r[1]-r[2])<.02 and r[3]>=r[1],r)
            # แมพ 1-10 ยังใช้เพลงธีม
            await pg.evaluate("()=>{window.__fm=3;window.__fth='hell'}");ok=await wait(pg,"()=>BGM.cur==='m_hell'",15000)
            rep('แมพ 1-10 ยังใช้เพลงธีมของตัวเอง (แดนไฟ)',ok,await pg.evaluate("()=>BGM.cur"))
            # ดันเจี้ยน → ไม่ใช้เพลงแมพ
            r=await pg.evaluate("async()=>{const o=BGMP.dg;BGMP.dg=()=>true;window.__fm=35;window.__fth='tower';await new Promise(r=>setTimeout(r,1500));const k=bgmpKey();BGMP.dg=o;return k}")
            rep('ในดันเจี้ยน ไม่ใช้เพลงแมพ (ใช้ธีมหอคอย)',r=='',r)
            # กลางคืน
            await pg.evaluate("()=>{window.__fm=19;window.__fth='sky'}");await wait(pg,"()=>BGM.cur==='p19'",15000)
            r=await pg.evaluate("async()=>{const o=bgmNightOn;window.bgmNightOn=bgmNightOn=()=>true;await new Promise(r=>setTimeout(r,2600));const v=BGM.f.frequency.value;window.bgmNightOn=bgmNightOn=o;return v}")
            rep('กลางคืน เพลงแมพนุ่มลง',r<9000,r)
            r=await pg.evaluate("async()=>{BGMP.on=0;await new Promise(r=>setTimeout(r,1800));const a=BGM.cur;BGMP.on=1;return a}")
            rep('BGMP.on=0 → กลับใช้เพลงธีม v663',r in ('m_sky',''),r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
