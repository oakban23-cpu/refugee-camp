"""v492 ติดตั้งเป็นแอป: manifest/ไอคอน/ภาพตัวอย่าง · service worker · Chrome ถือว่าติดตั้งได้ · ปุ่มในตั้งค่า · การ์ดชวน · iPhone · เปิดแบบแอป · ออฟไลน์ · safe-area · ไม่มี error"""
import asyncio, sys, random, json, urllib.request, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image
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
def get(u):
    r=urllib.request.urlopen(URL+u,timeout=5);return r.status,r.headers.get('Content-Type',''),r.headers.get('Cache-Control',''),r.read()
FAKE="""()=>{window.__pr=0;const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=()=>{window.__pr++;return Promise.resolve()};e.userChoice=Promise.resolve({outcome:window.__acc?'accepted':'dismissed'});window.dispatchEvent(e);return e.defaultPrevented}"""
async def main():
    p=start_server()
    try:
      # ===== ไฟล์ฝั่งเซิร์ฟเวอร์ =====
      st,ct,cc,b=get('manifest.webmanifest');M=json.loads(b)
      ic={}
      for i in M['icons']+M.get('screenshots',[]):
          s2,c2,_,b2=get(i['src']);im=Image.open(io.BytesIO(b2));ic[i['src']]=(s2,c2,'%dx%d'%im.size==i['sizes'],i.get('purpose'))
      rep('manifest.webmanifest ส่งถูกชนิด (application/manifest+json · ไม่แคช) · ชื่อ/ไอคอน 192·512·maskable/ภาพตัวอย่างแนวตั้ง-แนวนอน ขนาดตรงไฟล์จริง · เต็มจอ หมุนได้',
          st==200 and 'manifest+json' in ct and 'no-cache' in cc and M['short_name']=='REFUGEE' and M['display']=='fullscreen' and M['start_url']=='/' and M['orientation']=='any'
          and all(v[0]==200 and v[2] for v in ic.values()) and any(v[3]=='maskable' for v in ic.values()) and {'narrow','wide'}<={s['form_factor'] for s in M['screenshots']}, [st,ct,cc,ic])
      st,ct,cc,b=get('sw.js')
      rep('sw.js ส่งเป็น JavaScript ไม่แคช · ดักเฉพาะการเปิดหน้า (ไม่เก็บหน้าเกมไว้ในเครื่อง)', st==200 and 'javascript' in ct and 'no-cache' in cc and b"mode !== 'navigate'" in b and b'caches.' not in b, [st,ct,cc])
      async with async_playwright() as pw:
        bw=await pw.chromium.launch()
        A=await new_client(bw,'Pw'+str(random.randint(100,999)),'melee',30)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){}}")
        # ===== service worker + Chrome ติดตั้งได้ =====
        sw=await waitc(A,"async()=>{const r=await navigator.serviceWorker.getRegistration();return r&&r.active?{scope:r.scope,st:r.active.state}:null}",ms=8000,step=200)
        cdp=await A.ctx.new_cdp_session(A.pg)
        man=await cdp.send('Page.getAppManifest');ie=None
        try: ie=await cdp.send('Page.getInstallabilityErrors')
        except Exception as e: ie={'err':str(e)[:120]}
        errs=[e for e in (ie or {}).get('installabilityErrors',[])]
        rep('service worker ทำงาน (scope /) · Chrome อ่าน manifest ไม่มีข้อผิดพลาด · ไม่มีเหตุผลที่ติดตั้งไม่ได้', sw and sw['scope'].endswith('/') and man.get('url','').endswith('manifest.webmanifest') and not man.get('errors') and 'err' not in ie and not errs,
            [sw,man.get('url'),man.get('errors'),ie])
        # ===== ปุ่มในตั้งค่า: ยังไม่มีหน้าติดตั้ง → «วิธีติดตั้ง» เปิดการ์ดเมนู · มีหน้าติดตั้ง → «ติดตั้ง» เรียก prompt =====
        r0=await A.ev("""async()=>{cfgUI();const row=ov.querySelector('[data-pwarow]');if(!row)return {row:0};const cap=row.parentNode.querySelector('.cap').textContent,b=row.querySelector('button'),t=b.textContent,sm=row.querySelector('small').textContent;
          b.click();await new Promise(r=>setTimeout(r,200));const c=$('pwac'),tx=c?c.textContent:'';if(c)c.querySelector('.x').click();return {row:1,cap,t,sm,card:!!c,menu:/ติดตั้งแอป/.test(tx)&&/หน้าจอหลัก/.test(tx),gone:!$('pwac')}}""")
        pv=await A.ev(FAKE);await A.wait(100)
        r1=await A.ev("""async()=>{const row=ov.querySelector('[data-pwarow]'),b=row.querySelector('button');const t=b.textContent,on=b.classList.contains('on');b.click();await new Promise(r=>setTimeout(r,300));
          return {t,on,pr:window.__pr,ev:!!PWA.ev,t2:row.querySelector('button').textContent,ask:JSON.parse(localStorage.getItem('refugee_pwa_ask')||'{}')}}""")
        await A.ev("()=>{window.__acc=1}");await A.ev(FAKE)
        r2=await A.ev("""async()=>{const row=ov.querySelector('[data-pwarow]');row.querySelector('button').click();await new Promise(r=>setTimeout(r,300));window.dispatchEvent(new Event('appinstalled'));await new Promise(r=>setTimeout(r,100));
          const sm=row.querySelector('small').textContent,ms=(chatLog||[]).slice(-3).map(m=>m.t).join(' | ');ov.hidden=true;return {pr:window.__pr,ok:PWA.ok,sm,ms}}""")
        rep('ตั้งค่า → คุณภาพภาพ มีแถว «📲 ติดตั้งเป็นแอป» · ยังติดตั้งตรงไม่ได้ = การ์ดบอกวิธีผ่านเมนู · พอเบราว์เซอร์พร้อม (ไม่ให้แถบของ Chrome เด้งเอง) ปุ่มเป็น «ติดตั้ง» เปิดหน้าติดตั้ง · ติดตั้งเสร็จแจ้งในแชต',
            r0['row'] and 'คุณภาพภาพ' in r0['cap'] and r0['t']=='วิธีติดตั้ง' and r0['card'] and r0['menu'] and r0['gone'] and pv and r1['t']=='ติดตั้ง' and r1['on'] and r1['pr']==1 and not r1['ev'] and r1['t2']=='วิธีติดตั้ง'
            and r2['pr']==1 and r2['ok']==1 and 'ติดตั้งแล้ว' in r2['sm'] and 'ติดตั้ง REFUGEE แล้ว' in r2['ms'], [r0,pv,r1,r2])
        # ===== การ์ดชวนในเกม =====
        await A.ev("()=>{PWA.ok=0;localStorage.removeItem('refugee_pwa_ask');window.__acc=0}");await A.ev(FAKE)
        a=await A.ev("""async()=>{const o={};PWA.t0=performance.now();o.early=pwaAskNow();PWA.t0=performance.now()-200000;ov.hidden=false;o.ovOpen=pwaAskNow();ov.hidden=true;
          const cm=curMap;o.map=cm;o.yes=pwaAskNow();const c=$('pwac');o.card=!!c;o.go=!!(c&&c.querySelector('.go'));o.txt=c?c.textContent.slice(0,40):'';
          c.querySelector('.go').click();await new Promise(r=>setTimeout(r,300));o.pr=window.__pr;o.gone=!$('pwac');o.again=pwaAskNow();
          const k=JSON.parse(localStorage.getItem('refugee_pwa_ask')||'{}');o.n=k.n;return o}""")
        rep('การ์ดชวนติดตั้ง: ไม่ขึ้นก่อนเล่น 2.5 นาที/ตอนหน้าต่างเปิด · ขึ้นตอนอยู่ในค่าย กด «ติดตั้ง» เปิดหน้าติดตั้ง · ไม่ถามซ้ำทันที', not a['early'] and not a['ovOpen'] and a['map']==1 and a['yes'] and a['card'] and a['go'] and a['pr']==1 and a['gone'] and not a['again'] and a['n']==1, a)
        b2=await A.ev("""async()=>{localStorage.setItem('refugee_pwa_ask',JSON.stringify({n:1,t:Date.now()-4*864e5}));const o={};const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=()=>Promise.resolve();e.userChoice=Promise.resolve({outcome:'dismissed'});window.dispatchEvent(e);
          o.y=pwaAskNow();const c=$('pwac');c.querySelector('.x').click();o.gone=!$('pwac');o.again=pwaAskNow();localStorage.setItem('refugee_pwa_ask',JSON.stringify({n:3,t:0}));o.max=pwaAskNow();
          localStorage.setItem('refugee_pwa_ask',JSON.stringify({n:0,t:0}));return o}""")
        rep('ปัด «ไว้ทีหลัง» → เว้น 3 วัน · ถามครบ 3 ครั้งแล้วไม่ถามอีก', b2['y'] and b2['gone'] and not b2['again'] and not b2['max'], b2)
        # ===== iPhone =====
        io_=await A.ev("""async()=>{const i0=fsIOS;fsIOS=()=>true;PWA.ev=null;localStorage.setItem('refugee_pwa_ask','{}');const o={};o.ask=pwaAskNow();const c=$('pwac');o.txt=c?c.textContent:'';if(c)c.querySelector('.x').click();
          cfgUI();const row=ov.querySelector('[data-pwarow]');o.t=row.querySelector('button').textContent;o.sm=row.querySelector('small').textContent;row.querySelector('button').click();await new Promise(r=>setTimeout(r,200));const c2=$('pwac');o.c2=c2?/หน้าจอโฮม/.test(c2.textContent):false;if(c2)c2.querySelector('.x').click();ov.hidden=true;fsIOS=i0;return o}""")
        rep('iPhone/iPad: การ์ดชวนบอกขั้นตอน แชร์ ⬆️ → เพิ่มไปยังหน้าจอโฮม · ปุ่มในตั้งค่า «วิธีติดตั้ง» เปิดขั้นตอนเดียวกัน', io_['ask'] and 'แชร์' in io_['txt'] and 'หน้าจอโฮม' in io_['txt'] and io_['t']=='วิธีติดตั้ง' and 'หน้าจอโฮม' in io_['sm'] and io_['c2'], io_)
        # ===== เปิดจากไอคอนแล้ว (แอป) =====
        sa=await A.ev("""async()=>{const s0=pwaStand,f0=fsStand;pwaStand=()=>true;fsStand=()=>true;localStorage.setItem('refugee_pwa_ask','{}');const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=()=>{};e.userChoice=Promise.resolve({});window.dispatchEvent(e);
          const o={ask:pwaAskNow()};cfgUI();o.row=!!ov.querySelector('[data-pwarow]');o.fsrow=!!ov.querySelector('[data-fsrow]');ov.hidden=true;localStorage.setItem('refugee_fs','1');FSV.arm=true;
          document.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));await new Promise(r=>setTimeout(r,300));o.fs=!!fsEl();pwaStand=s0;fsStand=f0;FSV.arm=false;localStorage.setItem('refugee_fs','0');return o}""")
        rep('เปิดแบบแอปแล้ว: ไม่ชวนติดตั้ง · ไม่มีแถวติดตั้ง/เต็มจอในตั้งค่า · ไม่สั่งเต็มจอซ้อน', not sa['ask'] and not sa['row'] and not sa['fsrow'] and not sa['fs'], sa)
        # ===== safe-area (รอยบากจอแนวนอน) =====
        await A.pg.set_viewport_size({'width':844,'height':390});await A.wait(900)
        s0=await A.ev("()=>{const a=$('app').getBoundingClientRect();return {l:Math.round(a.left),r:Math.round(innerWidth-a.right),vw:VW.on}}")
        await A.ev("()=>{window.__sa=saIns;saIns=()=>34;fitStage()}");await A.wait(400)
        s1=await A.ev("()=>{const a=$('app').getBoundingClientRect(),c=cv.getBoundingClientRect();return {l:Math.round(a.left),r:Math.round(innerWidth-a.right),cl:Math.round(c.left),cr:Math.round(innerWidth-c.right)}}")
        await A.ev("()=>{saIns=window.__sa;fitStage()}");await A.wait(400)
        s2=await A.ev("()=>{const a=$('app').getBoundingClientRect();return {l:Math.round(a.left),r:Math.round(innerWidth-a.right)}}")
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(600)
        rep('จอแนวนอนมีรอยบาก (safe-area 34px): สนามหลบขอบซ้าย-ขวาเท่ากัน · ไม่มีรอยบาก = เหมือนเดิม', s0['vw'] and s1['cl']>=34 and s1['cr']>=34 and abs(s1['cl']-s1['cr'])<=2 and s2==dict(l=s0['l'],r=s0['r']), [s0,s1,s2])
        # ===== เซิร์ฟเวอร์/เน็ตหลุด → หน้าแจ้ง · กลับมาแล้วเข้าเกมได้ =====
        p.terminate();p.wait();await A.wait(300)
        try: await A.pg.reload(timeout=10000)
        except Exception as e: pass
        await A.wait(800);off=await A.ev("()=>({t:document.body.innerText.slice(0,80),btn:!!document.querySelector('button')})")
        p=start_server();await A.pg.reload();await A.wait(2500)
        back=await A.ev("()=>({ttl:!!document.getElementById('ttl'),game:typeof enterMap==='function',ctl:!!navigator.serviceWorker.controller})")
        rep('เปิดเกมตอนต่อเซิร์ฟเวอร์ไม่ได้ (ไม่มีเน็ต) → หน้า «ต้องต่ออินเทอร์เน็ต» มีปุ่มลองใหม่ · กลับมาออนไลน์แล้วโหลดเกมจริงผ่าน service worker ได้', 'ต้องต่ออินเทอร์เน็ต' in off['t'] and off['btn'] and back['game'] and back['ttl'] and back['ctl'], [off,back])
        E=[e for e in A.errs if 'ERR_TUNNEL' not in e and 'ERR_CONNECTION' not in e and 'ERR_INTERNET_DISCONNECTED' not in e and 'ERR_NETWORK_CHANGED' not in e and '503' not in e and 'ERR_CONNECTION_REFUSED' not in e and 'WebSocket' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
