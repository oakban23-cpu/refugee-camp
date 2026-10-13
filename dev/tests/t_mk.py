import asyncio,os,json,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
def adm(path,body=None):
    r=urllib.request.Request(URL+path,data=json.dumps(body).encode() if body is not None else None,headers={'x-admin-key':'k123','Content-Type':'application/json'},method='POST' if body is not None else 'GET')
    return json.load(urllib.request.urlopen(r))
async def reg(c,name):
    await c.ev("(n)=>{ov.hidden=false;mktUI()}",name);await c.wait(300)
    html=await c.ev("()=>ov.innerText.slice(0,200)");print(' market before login:',html.replace('\n',' ')[:160])
    await c.pg.fill('#acn',name);await c.pg.fill('#acp','1234');await c.pg.click('#acr');await c.wait(2000)
    print(' after reg:',await c.ev("()=>[ACC&&ACC.a,me.cls,ov.dataset.k,(ov.innerText||'').slice(0,120).replace(/\\n/g,' ')]"))
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        S=await new_client(b,'Seller');B=await new_client(b,'Buyer','mage')
        for c in (S,B): await c.ev("()=>{const e=document.getElementById('procv');if(e)e.remove();window.PRO_ON=0}")
        await S.ev("()=>{me.gold=100000;writeSave()}");await B.ev("()=>{me.gold=50000;writeSave()}")
        print('seller');await reg(S,'seller1');print('buyer');await reg(B,'buyer1')
        # seller lists a card/stuff
        await S.ev("()=>{me.inv.s3=50;mkTab='sell';mktUI();document.getElementById('mkpr').value='20000';mkAct('s','st:s3:10')}");await S.wait(1500)
        await S.ev("()=>{mkTab='sell';mktUI();document.getElementById('mkpr').value='900000';mkAct('s','st:s3:10')}");await S.wait(1500)
        await B.ev("()=>{mkTab='buy';mkFetch()}");await B.wait(1000)
        L=await B.ev("()=>MKD&&MKD.L.map(x=>[x.id,x.p])");print('listings',L)
        # buyer hack: set gold locally high but not saved? try buying 900k listing with 50k
        await B.ev("()=>{me.gold+=800000}");await B.ev("()=>accSync()");await B.wait(2500)
        print('after +800k flags',[(r['a'],r['fo']) for r in adm('admin/api')['acc']['rows']])
        await B.ev("()=>{me.gold+=800000}");await B.ev("()=>accSync()");await B.wait(2500)
        print('after 2nd +800k flags',[(r['a'],r['fo'],[(f['k'],f['v']) for f in r['fl']]) for r in adm('admin/api')['acc']['rows']])
        cheap=[x for x in L if x[1]==20000][0][0];exp=[x for x in L if x[1]==900000][0][0]
        await B.ev(f"()=>mkAct('b','{cheap}')");await B.wait(4000)
        print('buy cheap',await B.ev("()=>[me.gold,(document.querySelector('.note')||{}).textContent]"))
        sv=json.load(open(DD+'/saves/buyer1.json'));print('buyer saved gold',[c['gold'] for c in sv['data']['chars'].values()])
        print('admin flags',[(r['a'],r['fo'],[f['k'] for f in r['fl']]) for r in adm('admin/api')['acc']['rows']])
        await B.ev(f"()=>mkAct('b','{exp}')");await B.wait(4000)
        print('buy expensive while flagged',await B.ev("()=>(document.querySelector('.note')||{}).textContent"))
        print('clear',adm('admin/accmod',{'a':'buyer1','op':'clear'}))
        await B.ev(f"()=>mkAct('b','{exp}')");await B.wait(4000)
        print('buy expensive after clear',await B.ev("()=>[me.gold,(document.querySelector('.note')||{}).textContent]"))
        # seller collect
        await S.ev("()=>{mkTab='mine';mkFetch()}");await S.wait(1000)
        await S.ev("()=>mkAct('c')");await S.wait(1500)
        print('seller gold',await S.ev("()=>[me.gold,(document.querySelector('.note')||{}).textContent]"))
        await S.ev("()=>{accLast=0;writeSave().then(()=>accPush())}");await S.wait(2500)
        print('flags after seller collect',[(r['a'],r['fo']) for r in adm('admin/api')['acc']['rows']])
        # ban
        print(adm('admin/accmod',{'a':'seller1','op':'mkban'}))
        await S.ev("()=>{mkTab='sell';mktUI();document.getElementById('mkpr').value='100';mkAct('s','st:s3:1')}");await S.wait(1500)
        print('banned sell',await S.ev("()=>(document.querySelector('.note')||{}).textContent"))
        # lock
        print(adm('admin/accmod',{'a':'seller1','op':'lock'}))
        await S.ev("()=>{MKD=null;mkFetch()}");await S.wait(1200)
        print('locked market',await S.ev("()=>[ACC,(ov.innerText||'').slice(0,90).replace(/\\n/g,' ')]"))
        await S.pg.screenshot(path='mk_lock.png')
        print('errs',S.errs[:3],B.errs[:3])
        pg=await (await b.new_context(viewport={'width':1100,'height':900})).new_page()
        await pg.goto(URL+'admin');await pg.evaluate("()=>localStorage.setItem('rf_admin_key','k123')");await pg.reload();await pg.wait_for_timeout(2500)
        el=await pg.query_selector('[data-acm]');await el.scroll_into_view_if_needed();await pg.screenshot(path='mk_admin.png')
    finally: p.terminate();print(p.stdout.read().decode()[-1200:])
asyncio.run(main())
