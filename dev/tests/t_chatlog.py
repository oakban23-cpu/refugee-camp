import asyncio,sys,os,json,shutil,subprocess,time,urllib.request
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import h
from h import *
KEY='k-test-12345'
def srv():
    env=dict(os.environ,PORT=str(h.PORT),DATA_DIR=h.DD,ADMIN_KEY=KEY)
    p=subprocess.Popen(['node','server.js'],cwd=h.SRV,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.STDOUT)
    for _ in range(60):
        time.sleep(.3)
        try:urllib.request.urlopen(URL+'health',timeout=1);break
        except Exception:pass
    return p
def get(path):
    r=urllib.request.Request(URL.rstrip('/')+path,headers={'x-admin-key':KEY})
    with urllib.request.urlopen(r,timeout=5) as f:return json.loads(f.read().decode())
async def main():
    shutil.rmtree(h.DD,ignore_errors=True);os.makedirs(h.DD);p=srv()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Kira','assn');B=await new_client(b,'Neo','mage',lv=30)
        for c,t in ((A,'สวัสดีครับ'),(B,'อยากให้เพิ่มดันเจี้ยนใหม่'),(A,'บอส MVP ยากไป'),(B,'<script>alert(1)</script>')):
            await c.ev(f"()=>{{room.emit('chat',{{u:uid,n:myName,t:{json.dumps(t)}}})}}");await A.wait(300)
        print(json.dumps(get('/admin/chat?n=10'),ensure_ascii=False)[:600])
        print('search',[x['t'] for x in get('/admin/chat?q='+urllib.parse.quote('ดันเจี้ยน'))['items']])
        pg=await b.new_page(viewport={'width':1100,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('dialog',lambda d:asyncio.ensure_future(d.accept()))
        await pg.goto(URL+'admin');await pg.evaluate(f"()=>localStorage.setItem('rf_admin_key','{KEY}')");await pg.reload();await pg.wait_for_timeout(1500)
        el=await pg.query_selector('#chbox');await el.scroll_into_view_if_needed();await pg.wait_for_timeout(300)
        await pg.screenshot(path='chatadm.png',clip={'x':0,'y':max(0,(await el.bounding_box())['y']-80),'width':1100,'height':560})
        await pg.fill('#chq','บอส');await pg.click('#chs');await pg.wait_for_timeout(800)
        print('ui search rows',await pg.evaluate("()=>document.querySelectorAll('#chbox > div').length"),'xss?',await pg.evaluate("()=>!!document.querySelector('#chbox script')"),errs)
        await b.close()
    p.terminate();p.wait();p=srv()
    print('after restart total',get('/admin/chat?n=5')['total']);p.terminate()
asyncio.run(main())
