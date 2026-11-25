import asyncio, sys, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
ST="()=>({cur:BGM.cur,ac:AC?AC.state:String(AC),bt:!!BGM.B.title,bc:!!BGM.B.camp,err:BGM.err,ttl:!!document.getElementById('ttl'),go:(document.querySelector('#ttl .go')||{}).textContent||'',mz:(typeof MZ!=='undefined'&&MZ.key)||''})"
async def wait(pg,cond,ms=8000):
    for _ in range(ms//200):
        if await pg.evaluate(cond):return True
        await pg.wait_for_timeout(200)
    return False
async def main():
    p=start_server();errs=[]
    try:
        # ไฟล์เพลงเสิร์ฟถูกชนิด
        for f in ('bgm-title.mp3','bgm-camp.mp3'):
            r=urllib.request.urlopen(URL+f);b=r.read()
            rep(f'{f} เสิร์ฟเป็น audio/mpeg ({len(b)//1024} KB)',r.headers['Content-Type']=='audio/mpeg' and len(b)>500000 and b[:3] in (b'ID3',b'\xff\xfb',b'\xff\xf3'),r.headers['Content-Type'])
        async with async_playwright() as pw:
            b=await pw.chromium.launch(args=['--autoplay-policy=document-user-activation-required'])
            pg=await (await b.new_context(viewport={'width':412,'height':860})).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            # จำลองเบราว์เซอร์มือถือ: ยังไม่ให้เล่นเสียงจนกว่าจะมีการแตะ
            await pg.add_init_script("(()=>{let G=0;addEventListener('pointerdown',()=>{G=1},true);const C=window.AudioContext;window.AudioContext=function(...a){const c=new C(...a);c.suspend();const r=c.resume.bind(c);c.resume=()=>G?r():Promise.reject(new Error('NotAllowed'));return c}})()")
            await pg.goto(URL)
            ok=await wait(pg,"()=>!!BGM.B.title",10000)
            s=await pg.evaluate(ST);rep('โหลด+ถอดรหัสเพลงหน้าปกได้ ก่อนแตะ',ok and s['ac']!='running' and s['cur']=='',s)
            # แตะครั้งแรก: เปิดเพลง ยังไม่เข้าเกม
            await pg.mouse.click(206,700);await pg.wait_for_timeout(300)
            ok=await wait(pg,"()=>BGM.cur==='title'",5000);s=await pg.evaluate(ST)
            rep('แตะครั้งแรก = เพลงหน้าปกเล่น และหน้าปกยังอยู่',ok and s['ttl'] and 'แตะอีกครั้ง' in s['go'] and s['ac']=='running',s)
            r=await pg.evaluate("()=>{const n=BGM.n;return[n.loop,n.loopStart,Math.round(n.loopEnd*1000)/1000,Math.round(n.buffer.duration*1000)/1000,n.buffer.numberOfChannels]}")
            rep('จุดวนเพลง: .5 → .5+101.05 วิ อยู่ในไฟล์',r[0] and r[1]==.5 and abs(r[2]-101.553)<.01 and r[3]>=r[2],r)
            # แตะครั้งที่สอง: เข้าหน้าเลือกตัวละคร → เพลงกองไฟ
            await pg.mouse.click(206,700)
            ok=await wait(pg,"()=>BGM.cur==='camp'&&!document.getElementById('ttl')",10000);s=await pg.evaluate(ST)
            rep('แตะครั้งที่สอง = เข้าหน้าเลือกตัวละคร + เพลงรอบกองไฟ',ok and not s['ttl'],s)
            r=await pg.evaluate("()=>{const n=BGM.n;return[Math.round(n.loopEnd*1000)/1000,Math.round(n.buffer.duration*1000)/1000]}")
            rep('จุดวนเพลงกองไฟ .5+62.61 วิ',abs(r[0]-63.109)<.01 and r[1]>=r[0],r)
            # ปิดเพลงด้วยปุ่ม 🎵 → หยุด, เปิด → กลับมา
            await pg.evaluate("()=>setMusic(false)");ok1=await wait(pg,"()=>BGM.cur===''",3000)
            await pg.evaluate("()=>setMusic(true)");ok2=await wait(pg,"()=>BGM.cur==='camp'",3000)
            rep('ปุ่มเพลง ปิด/เปิด ได้',ok1 and ok2)
            await pg.evaluate("()=>setMute(true)");ok1=await wait(pg,"()=>BGM.cur===''",3000);await pg.evaluate("()=>setMute(false)")
            rep('ปุ่มเสียงรวม (ปิดเสียง) หยุดเพลงด้วย',ok1)
            # เข้าเกม → เพลงนี้เบาลง เพลงแมพเดิมรับต่อ
            await pg.evaluate(SETUP,['melee','Bgm',10]);ok=await wait(pg,"()=>BGM.cur.indexOf('m_')===0||(BGM.cur===''&&!!(typeof MZ!=='undefined'&&MZ.key))",15000)  # v663: เพลงแมพไฟล์ใหม่รับต่อ;s=await pg.evaluate(ST)
            rep('เข้าเกมแล้ว ส่งต่อให้เพลงแมพ',ok,s)
            # เบราว์เซอร์ที่อนุญาตเสียงอยู่แล้ว: เล่นตั้งแต่หน้าปกโดยไม่ต้องแตะ และแตะครั้งเดียวเข้าเกม
            b2=await pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
            pg2=await (await b2.new_context(viewport={'width':412,'height':860})).new_page();pg2.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg2.goto(URL);ok=await wait(pg2,"()=>BGM.cur==='title'",10000)
            await pg2.mouse.click(206,700);ok2=await wait(pg2,"()=>!document.getElementById('ttl')&&BGM.cur==='camp'",8000)
            rep('ถ้าเบราว์เซอร์อนุญาตเสียง: เพลงขึ้นเองที่หน้าปก แตะครั้งเดียวเข้า',ok and ok2,await pg2.evaluate(ST))
            await b2.close()
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
