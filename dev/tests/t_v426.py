"""v426 กันก๊อป: Origin check ฝั่งเซิร์ฟเวอร์ + ตัวเกมบน Render ล็อกเมื่อเปิดนอกเว็บทางการ"""
import asyncio, sys, json, socket, base64, os, shutil
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
def hs(origin=None, host=None):
    s=socket.create_connection(('127.0.0.1',PORT),timeout=4)
    k=base64.b64encode(os.urandom(16)).decode()
    h='GET /ws HTTP/1.1\r\nHost: %s\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: %s\r\nSec-WebSocket-Version: 13\r\n'%(host or 'localhost:%d'%PORT,k)
    if origin is not None: h+='Origin: %s\r\n'%origin
    s.sendall((h+'\r\n').encode())
    try: d=s.recv(200).decode('latin1')
    except Exception as e: d='ERR '+str(e)
    s.close(); return d.split('\r\n')[0]
HTML=open(SRV+'/public/index.html',encoding='utf-8').read()
COPY=__file__.rsplit('/',1)[0]+'/copy426'
async def lockinfo(pg):
    return await pg.evaluate("()=>{const d=document.getElementById('rfglk');return{lk:!!d&&getComputedStyle(d).display!=='none',why:d?d.getAttribute('data-why'):'',txt:d?d.innerText.slice(0,400):'',game:typeof me!=='undefined',tg:typeof TG==='number'?TG:'obj'}}")
async def main():
    p=start_server()
    try:
        # ---- 1) Origin ----
        rep('Origin เว็บอื่น → 403', '403' in hs('https://copy-site.example'), hs('https://copy-site.example'))
        rep('Origin null (ไฟล์ file://) → 403', '403' in hs('null'))
        rep('Origin ปลอมเป็นโฮสต์อื่น (http://localhost:9999) → 403', '403' in hs('http://localhost:9999'))
        rep('Origin ตรงกับโฮสต์ → 101', '101' in hs('http://localhost:%d'%PORT))
        rep('ผ่านพร็อกซี (Host = refugee-camp.onrender.com) Origin ตรง → 101', '101' in hs('https://refugee-camp.onrender.com','refugee-camp.onrender.com'))
        rep('ไม่มี Origin (ไม่ใช่เบราว์เซอร์) → 101', '101' in hs(None))
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            # ---- 2) เล่นปกติบนเว็บเรา ----
            A=await new_client(b,'Ok','melee',30)
            await A.wait(1500)
            li=await lockinfo(A.pg)
            rep('เปิดจากเว็บเรา: เล่นได้ ต่อออนไลน์ ไม่มีหน้าล็อก', (not li['lk']) and li['game'] and await A.ev("()=>!!(room&&room.ok&&room.ever)"), json.dumps(li))
            # ---- 3) ก๊อปไฟล์ไปเปิดเอง (file://) ----
            shutil.rmtree(COPY,ignore_errors=True);os.makedirs(COPY)
            open(COPY+'/refugee.html','w',encoding='utf-8').write(open('/mnt/user-data/outputs/refugee-online/public/index.html',encoding='utf-8').read())
            ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page();E=[]
            pg.on('pageerror',lambda e:E.append(str(e)[:120]))
            await pg.goto('file://'+COPY+'/refugee.html');await pg.wait_for_timeout(2500)
            li=await lockinfo(pg)
            rep('ไฟล์ก๊อป (file://): ขึ้นหน้า «เล่นได้ที่เว็บทางการ» ทันที', li['lk'] and li['why']=='copy' and 'refugee-camp.onrender.com' in li['txt'], json.dumps(li))
            rep('ไฟล์ก๊อป: สคริปต์เกมไม่ทำงานเลย (ไม่มีตัวละคร/ลูปเกม)', (not li['game']) and li['tg']==0, json.dumps(E[:2]))
            href=await pg.evaluate("()=>document.querySelector('#rfglk a').href")
            rep('ปุ่มพาไปเว็บทางการ', href.startswith('https://refugee-camp.onrender.com'), href)
            await ctx.close()
            # ---- 4) เอาไปวางบนเว็บคนอื่น ----
            ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page()
            await pg.route('http://copy-site.test/**',lambda r:r.fulfill(status=200,content_type='text/html; charset=utf-8',body=HTML) if r.request.resource_type=='document' else r.abort())
            await pg.goto('http://copy-site.test/');await pg.wait_for_timeout(2500)
            li=await lockinfo(pg)
            rep('วางบนเว็บอื่น: ล็อกทันที เกมไม่ทำงาน', li['lk'] and li['why']=='copy' and not li['game'], json.dumps(li))
            await ctx.close()
            # ---- 5) เปิดผ่าน localhost แต่ไม่มีเซิร์ฟเวอร์ของเรา → ไม่มีโหมดออฟไลน์ ----
            ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page()
            await pg.add_init_script("window.__rfgWait=1500")
            await pg.route('http://localhost:9/**',lambda r:r.fulfill(status=200,content_type='text/html; charset=utf-8',body=HTML) if r.request.resource_type=='document' else r.abort())
            await pg.goto('http://localhost:9/');await pg.wait_for_timeout(800)
            l0=await lockinfo(pg)
            await pg.wait_for_timeout(2200)
            li=await lockinfo(pg)
            loc=await pg.evaluate("()=>(typeof room!=='undefined'&&!!room&&!!room.local)||typeof localRoom==='function'")
            rep('localhost ไม่มีเซิร์ฟเวอร์: ต่อไม่ติด → ล็อก ไม่มีโหมดเล่นในเครื่อง', (not l0['lk']) and li['lk'] and li['why']=='copy' and not loc, json.dumps([l0['lk'],li]))
            await ctx.close()
            # ---- 6) เว็บทางการแต่เซิร์ฟเวอร์ล่ม → หน้า «กำลังเชื่อมต่อ» แล้วหายเองเมื่อกลับมา ----
            ctx=await b.new_context(viewport={'width':390,'height':844});pg=await ctx.new_page()
            await pg.add_init_script("window.__rfgWait=1500")
            st={'up':False}
            async def wsh(ws):
                if st['up']:
                    ws.on_message(lambda m:None)
                else:
                    await ws.close()
            await pg.route_web_socket('wss://refugee-camp.onrender.com/ws',wsh)
            await pg.route('https://refugee-camp.onrender.com/**',lambda r:r.fulfill(status=200,content_type='text/html; charset=utf-8',body=HTML) if r.request.resource_type=='document' else r.abort())
            await pg.goto('https://refugee-camp.onrender.com/');await pg.wait_for_timeout(3000)
            li=await lockinfo(pg)
            rep('เว็บทางการ ต่อไม่ติด: ขึ้น «กำลังเชื่อมต่อเซิร์ฟเวอร์…» (ไม่ใช่หน้าว่าก๊อป)', li['lk'] and li['why']=='down' and li['game'], json.dumps(li))
            st['up']=True
            await pg.wait_for_timeout(3500)
            li=await lockinfo(pg)
            rep('เซิร์ฟเวอร์กลับมา → หน้าล็อกหายเอง เล่นต่อได้', not li['lk'], json.dumps(li))
            await ctx.close()
            # ---- 7) เคยต่อติดแล้วหลุดกลางทาง → ไม่ล็อก (เล่นต่อระหว่างต่อใหม่) ----
            await A.ev("()=>{room.ever=1;}")
            p.terminate();p.wait()
            await A.wait(2500)
            li=await lockinfo(A.pg)
            ok1=not li['lk'] and await A.ev("()=>room.ok===false")
            p=start_server()
            await A.wait(4500)
            rep('เคยต่อติดแล้วเซิร์ฟเวอร์หลุด: ไม่ล็อก และต่อใหม่ได้เอง', ok1 and await A.ev("()=>room.ok===true"), json.dumps(li))
            Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
