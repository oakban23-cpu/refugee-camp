import asyncio,os,json,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
async def ui(pg):
    await pg.goto(URL); await pg.wait_for_timeout(2500)
    await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove();localStorage.setItem('refugee_tut','1')}")
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);pg=await ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
        await ui(pg)
        for i in range(30):
            if await pg.evaluate("()=>saveMode")!='wait':break
            await pg.wait_for_timeout(500)
        print('mode',await pg.evaluate("()=>[saveMode,saveState,!!document.getElementById('accbox'),srvAcc()]"))
        await pg.screenshot(path='acc1.png',full_page=True)
        # make a character first locally
        await pg.evaluate("()=>{pick('melee','','ทดสอบ');ov.hidden=true;gmSetLv(40);me.gold=12345}")
        await pg.wait_for_timeout(500)
        await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await pg.evaluate("()=>writeSave()");await pg.wait_for_timeout(500)
        print('local chars',await pg.evaluate("()=>Object.values(saves.chars).map(c=>[c.cls,c.lv,c.gold])"))
        # go back to select screen (simulate): set me.cls null and intro
        await pg.evaluate("()=>{me.cls=null;window.PRO_ON=0;const e=document.getElementById('procv');if(e)e.remove();ov.hidden=false;intro()}");await pg.wait_for_timeout(300)
        await pg.fill('#acn','Tester_1');await pg.fill('#acp','1234');await pg.click('#acr');await pg.wait_for_timeout(1500)
        print('after reg',await pg.evaluate("()=>[ACC&&ACC.a,accRev,saveState,document.getElementById('accbox').innerText.slice(0,80)]"))
        print('file',json.load(open(DD+'/saves/tester_1.json'))['rev'])
        # second register same name
        ctx2=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);pg2=await ctx2.new_page();pg2.on('pageerror',lambda e:errs.append('B '+str(e)[:300]))
        await ui(pg2);await pg2.wait_for_timeout(1500)
        await pg2.fill('#acn','tester_1');await pg2.fill('#acp','9999');await pg2.click('#acr');await pg2.wait_for_timeout(1200)
        print('B taken:',await pg2.evaluate("()=>document.getElementById('acm').textContent"))
        await pg2.fill('#acn','tester_1');await pg2.fill('#acp','9999');await pg2.click('#acl');await pg2.wait_for_timeout(1200)
        print('B wrong pin:',await pg2.evaluate("()=>document.getElementById('acm').textContent"))
        await pg2.fill('#acn','tester_1');await pg2.fill('#acp','1234');await pg2.click('#acl');await pg2.wait_for_timeout(1500)
        print('B login:',await pg2.evaluate("()=>[ACC&&ACC.a,accRev,saveState,Object.values(saves.chars).map(c=>[c.cls,c.lv,c.gold])]"))
        await pg2.screenshot(path='acc2.png',full_page=True)
        # B plays and levels up -> push
        await pg2.evaluate("()=>{const k=Object.keys(saves.chars)[0];pick(scls(k),k);window.PRO_ON=0;{const e=document.getElementById('procv');if(e)e.remove()}ov.hidden=true;try{let q=0;while(SD.on&&q<80){stNext();q++}stClose()}catch(e){};gmSetLv(45);me.gold=999}")
        await pg2.wait_for_timeout(300)
        await pg2.evaluate("()=>{accLast=0;return writeSave()}");await pg2.wait_for_timeout(1500)
        print('B pushed rev',await pg2.evaluate("()=>[accRev,accDirty,saveState]"))
        # A (stale rev) saves a different change -> 409 merge
        await pg.evaluate("()=>{saves.chars.zz={...JSON.parse(JSON.stringify(Object.values(saves.chars)[0])),cls:'mage',lv:3};accLast=0;accKick(1)}");await pg.wait_for_timeout(2500)
        print('A after conflict',await pg.evaluate("()=>[accRev,accDirty,saveState,Object.entries(saves.chars).map(([k,c])=>[k,c.cls,c.lv])]"))
        sv=json.load(open(DD+'/saves/tester_1.json'));print('server',sv['rev'],[(k,c['cls'],c['lv']) for k,c in sv['data']['chars'].items()])
        # fresh reload A -> loads
        await pg.reload();await pg.wait_for_timeout(3500)
        print('A reload',await pg.evaluate("()=>[saveMode,saveState,accLoaded]"))
        # logout
        await pg.evaluate("()=>{const t=document.getElementById('ttl');if(t)t.remove()}")
        await pg.click('#aco');await pg.wait_for_timeout(1500)
        print('A logout',await pg.evaluate("()=>[ACC,Object.keys(saves.chars).length,document.getElementById('acm').textContent]"))
        # admin
        def adm(path,body=None):
            r=urllib.request.Request(URL+path,data=json.dumps(body).encode() if body is not None else None,headers={'x-admin-key':'k123','Content-Type':'application/json'},method='POST' if body is not None else 'GET')
            return json.load(urllib.request.urlopen(r))
        print('admin acc',adm('admin/api')['acc'])
        print('reset',adm('admin/accpin',{'a':'tester_1','pin':'5555'}),'bak',adm('admin/accbak',{'a':'tester_1'}))
        await pg.fill('#acn','tester_1');await pg.fill('#acp','5555');await pg.click('#acl');await pg.wait_for_timeout(1500)
        print('A login new pin',await pg.evaluate("()=>[ACC&&ACC.a,Object.values(saves.chars).map(c=>[c.cls,c.lv])]"))
        print('B token revoked -> push',await pg2.evaluate("async()=>{accLast=0;accDirty=true;await accPush();return [ACC,saveState]}"))
        print('errs',errs)
    finally:
        p.terminate();print(p.stdout.read().decode()[-1500:])
asyncio.run(main())
