import asyncio,sys,os,json,shutil,subprocess,time,urllib.request
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import h
from h import *
KEY='k-test-12345'
def req(path,data=None):
    r=urllib.request.Request(URL.rstrip('/')+path,data=json.dumps(data).encode() if data is not None else None,headers={'x-admin-key':KEY,'Content-Type':'application/json'},method='POST' if data is not None else 'GET')
    with urllib.request.urlopen(r,timeout=5) as f:return json.loads(f.read().decode())
async def main():
    shutil.rmtree(h.DD,ignore_errors=True);os.makedirs(h.DD)
    old={'wb':[{'n':'Kira','c':'assn','l':75,'t':38332409,'p':1,'u':'a1','at':1},{'n':'ZMIW','c':'mage','l':73,'t':3250211,'p':1,'u':'b','at':1},{'n':'TEST1','c':'sup','l':75,'t':1546450,'p':1,'u':'b','at':1},{'n':'InwZa007','c':'archer','l':67,'t':1125339,'p':1,'u':'c1','at':1}],
         'm1':[{'n':'A','c':'melee','l':5,'t':30,'p':1,'u':'x','at':1},{'n':'Kira','c':'assn','l':75,'t':12,'p':1,'u':'y','at':1}],'tw':[{'n':'A','c':'melee','l':50,'t':36000-80,'p':1,'u':'x','at':1}]}
    json.dump(old,open(os.path.join(h.DD,'leaderboard.json'),'w'))
    env=dict(os.environ,PORT=str(h.PORT),DATA_DIR=h.DD,ADMIN_KEY=KEY)
    p=subprocess.Popen(['node','server.js'],cwd=h.SRV,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.STDOUT)
    for _ in range(60):
        time.sleep(.3)
        try:urllib.request.urlopen(URL+'health',timeout=1);break
        except Exception:pass
    d=req('/admin/api');print('flags wb',[(r['n'],r['fl']) for r in d['lb']['wb']['rows']])
    print('cap wb 10M ->',req('/admin/lbcap',{'k':'wb','v':10000000}))
    print('del m1 Kira ->',req('/admin/lbdel',{'k':'m1','n':'Kira','c':'assn'}))
    print('ban InwZa007 ->',req('/admin/lbban',{'n':'InwZa007','c':'archer','on':1}))
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'InwZa007','archer');B=await new_client(b,'Neo','mage',lv=30)
        await A.ev("()=>emitM('lbs',{k:'wb',n:'InwZa007',cls:'archer',lv:67,t:2000000,pc:1})")
        await B.ev("()=>emitM('lbs',{k:'wb',n:'Neo',cls:'mage',lv:30,t:5000000,pc:1})")  # 30/75*10M=4M -> reject
        await B.ev("()=>emitM('lbs',{k:'wb',n:'Neo',cls:'mage',lv:30,t:3000000,pc:1})")  # ok
        await B.wait(800)
        d=req('/admin/api');print('wb rows',[(r['n'],r['t']) for r in d['lb']['wb']['rows']]);print('m1',[r['n'] for r in d['lb']['m1']['rows']]);print('ban',d['lbc']['ban']);print('rej',[(x['n'],x['why']) for x in d['lbc']['rej']])
        # market: list fe
        await B.ev("()=>{me.mat.fe=50;mkAct&&0}")
        await B.ev("()=>{emitM('mkl',{t:'zz1',k:'st',d:{k:'fe',n:10},p:999,mid:mkMid()})}");await B.wait(800)
        d=req('/admin/api');print('market recent',d['mk']['recent'])
        # admin UI
        pg=await b.new_page(viewport={'width':1100,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(URL+'admin');await pg.evaluate(f"()=>localStorage.setItem('rf_admin_key','{KEY}')");await pg.reload();await pg.wait_for_timeout(1500)
        el=await pg.query_selector('text=ตารางอันดับ · จัดการ');await el.scroll_into_view_if_needed()
        await pg.screenshot(path='lbadm.png',full_page=True);print('ui errs',errs)
        # tw cap via UI: click tw, set 60 floors
        pg.on('dialog',lambda dl:asyncio.ensure_future(dl.accept()))
        await pg.click('[data-lbk="tw"]');await pg.fill('#lbcap','60');await pg.click('#lbcs');await pg.wait_for_timeout(1500)
        d=req('/admin/api');print('tw after cap60',d['lb']['tw'])
        mob=await b.new_page(viewport={'width':390,'height':844});await mob.goto(URL+'admin');await mob.evaluate(f"()=>localStorage.setItem('rf_admin_key','{KEY}')");await mob.reload();await mob.wait_for_timeout(1500)
        print('mobile overflow',await mob.evaluate("()=>document.documentElement.scrollWidth"))
        await b.close()
    p.terminate()
asyncio.run(main())
