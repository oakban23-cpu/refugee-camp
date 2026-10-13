import asyncio,sys,json,os,urllib.request
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
os.environ['ADMIN_KEY']='test-secret-123'
import h
from h import *
def req(path,key=None,data=None):
    r=urllib.request.Request(URL.rstrip('/')+path,data=data,headers=({'x-admin-key':key} if key else {})|({'Content-Type':'application/json'} if data else {}),method='POST' if data else 'GET')
    try:
        with urllib.request.urlopen(r,timeout=5) as f:return f.status,f.read().decode()
    except urllib.error.HTTPError as e:return e.code,e.read().decode()
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha','melee');B=await new_client(b,'Bravo','mage')
        await B.ev("()=>{enterMap(9,{x:1600,y:1700})}");await A.wait(3000)
        print('nokey',req('/admin/api')[0]);print('bad',req('/admin/api','nope')[0])
        st,body=req('/admin/api','test-secret-123');j=json.loads(body);print('ok',st,j['online'],j['byMap'],[x['n'] for x in j['players']],j['today'],j['srv']['rss']//1048576,'MB')
        st,body=req('/admin/ann','test-secret-123',json.dumps({'t':'ทดสอบประกาศ <b>ปิดปรับปรุง</b>'}).encode());print('ann',st,body)
        await A.wait(800);print('A got:',await A.ev("()=>[banner&&banner.s,chatLog.slice(-1)[0]&&chatLog.slice(-1)[0].t]"))
        pg=await b.new_page(viewport={'width':1100,'height':900});await pg.goto(URL+'admin');await pg.wait_for_timeout(500)
        await pg.fill('#k','test-secret-123');await pg.click('button[type=submit]');await pg.wait_for_timeout(1500)
        await pg.screenshot(path='admin_desk.png',full_page=True)
        m=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);await m.goto(URL+'admin');await m.wait_for_timeout(500);await m.fill('#k','test-secret-123');await m.click('button[type=submit]');await m.wait_for_timeout(1500);await m.screenshot(path='admin_mob.png',full_page=True)
        pe=[];pg.on('pageerror',lambda e:pe.append(str(e)))
        await pg.wait_for_timeout(6000);print('admin errs',pe)
        for i in range(9):s=req('/admin/api','wrong')[0]
        print('lock',s,req('/admin/api','test-secret-123')[0])
        e=[x for c in (A,B) for x in c.errs if 'ERR_' not in x];print('client errs',e[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
