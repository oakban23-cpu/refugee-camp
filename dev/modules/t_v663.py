import asyncio, sys, urllib.request, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
K=['camp','bone','hell','ice','tower','sunk','mine','desert','sky','rift']
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
        for k in K:
            r=urllib.request.urlopen(URL+f'bgm-m-{k}.mp3');b=r.read()
            if r.headers['Content-Type']!='audio/mpeg' or len(b)<500000:bad.append((k,len(b)))
        rep('เพลงแมพ 10 ไฟล์ เสิร์ฟเป็น audio/mpeg',not bad,bad)
        async with async_playwright() as pw:
            br=await pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
            pg=await (await br.new_context(viewport={'width':915,'height':412})).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Bgmm',30]);await pg.wait_for_timeout(1500);await pg.evaluate(CL)
            await pg.evaluate("()=>{try{AC.resume()}catch(e){}}")
            t0=await pg.evaluate("()=>BGMM.th()")
            ok=await wait(pg,"()=>BGM.cur==='m_'+BGMM.th()",15000)
            s=await pg.evaluate("()=>({cur:BGM.cur,mz:MZ.key,mzt:mzTheme(),keys:Object.keys(BGM.B).filter(k=>BGM.B[k])})")
            rep(f'เข้าเกม → เพลงแมพใหม่ ({t0}) เล่น และเพลงสังเคราะห์เดิมเงียบ',ok and s['mzt']=='' ,s)
            rep('เข้าเกมแล้ว คืนแรมเพลงหน้าปก/กองไฟ',not any(k in s['keys'] for k in ('title','camp')),s['keys'])
            r=await pg.evaluate("()=>{const n=BGM.n;return[n.loop,n.loopStart,Math.round(n.loopEnd*100)/100,Math.round(n.buffer.duration*100)/100,Math.round((BGM.T[BGM.cur].L+.5)*100)/100]}")
            rep('จุดวนเพลงแมพถูกต้อง อยู่ในไฟล์',r[0] and r[1]==.5 and abs(r[2]-r[4])<.02 and r[3]>=r[2],r)
            # ไปแมพอื่นตามธีม: บังคับธีมทุกแบบ ตรวจว่าโหลด+เล่นได้ และ MZ เงียบ
            res={};mem=[]
            for k in K:
                await pg.evaluate("(k)=>{window.__forceT=k}",k)
                if k==K[0]:await pg.evaluate("()=>{const o=BGMM.th;BGMM.th=()=>window.__forceT||o()}")
                ok=await wait(pg,f"()=>BGM.cur==='m_{k}'",15000)
                res[k]=ok;mem.append(await pg.evaluate("()=>Object.keys(BGM.B).filter(k=>BGM.B[k]).length"))
            rep('เล่นได้ครบทั้ง 10 ธีม (ค่าย สุสาน ไฟ น้ำแข็ง หอคอย เมืองจม เหมือง ทะเลทราย ฟ้า รอยแยก)',all(res.values()),res)
            rep('เก็บเพลงที่ถอดรหัสแล้วในแรมไม่เกิน 3 เพลง (v665: +เพลงบอสภูมิภาคที่โหลดรอ)',max(mem)<=3,mem)
            # กลางคืน → กรองเสียง
            r=await pg.evaluate("async()=>{const o=bgmNightOn;window.bgmNightOn=bgmNightOn=()=>true;await new Promise(r=>setTimeout(r,2600));const v=BGM.f.frequency.value;window.bgmNightOn=bgmNightOn=o;await new Promise(r=>setTimeout(r,300));return v}")
            rep('กลางคืน: เพลงนุ่มลง (กรองเสียงสูง)',r<9000,r)
            # บอส/ธีมพิเศษ → ไฟล์หยุด ให้ระบบเดิม
            r=await pg.evaluate("async()=>{window.__forceT='rk:test';await new Promise(r=>setTimeout(r,1500));return [BGM.cur,mzTheme()]}")
            rep('ธีมบอส (rk) → ออกจากเพลงแมพ: เพลงบอสไฟล์ใหม่ (v665) หรือร็อกเดิมระหว่างโหลด',(r[0].startswith('b_') and r[1]=='') or (r[0]=='' and r[1]=='rk:test'),r)
            await pg.evaluate("()=>{window.__forceT='hell'}");await wait(pg,"()=>BGM.cur==='m_hell'")
            await pg.evaluate("()=>setMusic(false)");ok1=await wait(pg,"()=>BGM.cur===''",3000);await pg.evaluate("()=>setMusic(true)");ok2=await wait(pg,"()=>BGM.cur==='m_hell'",5000)
            rep('ปุ่มเพลง ปิด/เปิด ได้',ok1 and ok2)
            r=await pg.evaluate("async()=>{BGMM.on=0;await new Promise(r=>setTimeout(r,1500));const a=[BGM.cur,mzTheme()];BGMM.on=1;return a}")
            rep('BGMM.on=0 → กลับใช้เพลงสังเคราะห์เดิม',r==['','hell'],r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
