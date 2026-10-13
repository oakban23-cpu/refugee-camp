import asyncio,os,json,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
def adm(path,body=None):
    r=urllib.request.Request(URL+path,data=json.dumps(body).encode() if body is not None else None,headers={'x-admin-key':'k123','Content-Type':'application/json'},method='POST' if body is not None else 'GET')
    return json.load(urllib.request.urlopen(r))
async def say(c,t):
    await c.ev("(t)=>{document.getElementById('cin').value=t;sendChat()}",t);await c.wait(900)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();A=await new_client(b,'Alpha');B=await new_client(b,'Bravo')
        for t in ['สวัสดี','คำหยาบ123','อีกข้อความ']: await say(A,t)
        await say(B,'hello from B')
        L=adm('admin/chat?n=50')['items'];print([(x['id'],x['n'],x['t']) for x in L])
        bad=[x for x in L if x['t']=='คำหยาบ123'][0]
        print(adm('admin/chdel',{'id':bad['id']}));await B.wait(800)
        print('B sees',await B.ev("()=>chatLog.filter(l=>!l.sys).map(l=>l.n+':'+l.t)"))
        # admin UI
        pg=await (await b.new_context(viewport={'width':1100,'height':900})).new_page()
        await pg.goto(URL+'admin');await pg.evaluate("()=>localStorage.setItem('rf_admin_key','k123')");await pg.reload();await pg.wait_for_timeout(2500)
        el=await pg.query_selector('#chbox');await el.scroll_into_view_if_needed();await pg.screenshot(path='chdel.png')
        pg.on('dialog',lambda d:asyncio.ensure_future(d.accept()))
        await pg.click('[data-chn="Alpha"]');await pg.wait_for_timeout(1500)
        print('after deln',[(x['n'],x['t']) for x in adm('admin/chat?n=50')['items']])
        await B.wait(500);print('B sees',await B.ev("()=>chatLog.filter(l=>!l.sys).map(l=>l.n+':'+l.t)"))
        await pg.click('#chx');await pg.wait_for_timeout(1500)
        print('after clear',adm('admin/chat?n=50')['total'],await A.ev("()=>chatLog.filter(l=>!l.sys).length"))
        await say(A,'ใหม่');print('new after clear',[(x['id'],x['t']) for x in adm('admin/chat?n=50')['items']])
        print(A.errs[:2],B.errs[:2])
    finally: p.terminate();print(p.stdout.read().decode()[-500:])
asyncio.run(main())
