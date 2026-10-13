import asyncio,os,json,urllib.request
os.environ['ADMIN_KEY']='k123'
from h import *
def api(p,b):
    r=urllib.request.Request(URL+p,data=json.dumps(b).encode(),headers={'Content-Type':'application/json'},method='POST')
    try: return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e: return {'status':e.code,**json.load(e)}
async def main():
    p=start_server()
    try:
        r=api('api/acc/register',{'a':'somchai','pin':'1111'});print(r['ok'])
        print(api('api/acc/save',{'a':'somchai','t':r['t'],'r':0,'data':{'v':1,'chars':{'melee':{'cls':'melee','lv':33}}}}))
        print(api('api/acc/register',{'a':'__proto__','pin':'1111'}),api('api/acc/register',{'a':'constructor','pin':'1111'})['ok'])
        print(api('api/acc/login',{'a':'nobody','pin':'1111'}))
        for i in range(7): x=api('api/acc/login',{'a':'somchai','pin':'0000'})
        print('lock',x)
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':1200,'height':900})).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(URL+'admin');await pg.evaluate("()=>localStorage.setItem('rf_admin_key','k123')");await pg.reload();await pg.wait_for_timeout(2500)
            el=await pg.query_selector('#acq');await el.scroll_into_view_if_needed();await pg.screenshot(path='accadm.png');print('errs',errs)
    finally: p.terminate()
asyncio.run(main())
