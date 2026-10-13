import asyncio,json,time,random,math
from playwright.async_api import async_playwright
now=int(time.time()*1000)
S=[[now-i*300000, max(0,int(8+6*math.sin(i/40)+random.random()*3))] for i in range(2000,0,-1)]
days=[{'d':time.strftime('%Y-%m-%d',time.gmtime(now/1000-86400*i)),'peak':10+i%5,'u':20+(i*7)%15,'min':900,'sess':40,'full':0} for i in range(29,-1,-1)]
D={'now':now,'online':9,'conn':10,'max':120,'players':[{'n':'สมชาย','c':'mage','l':72,'mp':9,'on':3600,'inMap':60,'aw':0,'dead':0,'host':1}],'byMap':{'9':5,'12':3,'11042':1},'peak':{'n':17,'at':now-86400e3},
 'today':{'peak':12,'u':25,'min':1500,'sess':44,'full':3},'hours':[2,1,0,0,0,0,1,2,3,4,5,6,7,6,5,6,7,9,11,12,10,8,None,None],'days':days,'samples':S,
 'mk':{'n':4,'val':120000,'sellers':2,'pend':500,'ret':0,'recent':[{'n':'สมชาย','k':'st','d':{'k':'sc','n':20},'p':5000,'at':now}]},'mvp':{'18':{'in':0,'al':1,'k':4,'n':3,'last':{'n':'Bravo','d':77777,'at':now}}},'lb':{'wb':{'n':5,'top':{'n':'Alpha','t':123}}},
 'srv':{'up':90000,'rss':380*1048576,'heap':1,'cpu':12,'bw':80000,'msg':300,'node':'v22','dataDir':'/var/data','persist':True,'disk':{'free':900*1048576,'total':1024*1048576}}}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for vw,nm in [(1100,'ad2_desk.png'),(390,'ad2_mob.png')]:
      pg=await b.new_page(viewport={'width':vw,'height':900},device_scale_factor=1 if vw>500 else 2,color_scheme='dark' if vw<500 else 'light')
      await pg.route('**/admin/api',lambda r:r.fulfill(status=200,content_type='application/json',body=json.dumps(D)))
      await pg.route('**/admin',lambda r:r.fulfill(status=200,content_type='text/html',body=open('/home/claude/refugee-online/admin.html').read()))
      await pg.goto('http://x.test/admin');await pg.evaluate("()=>localStorage.setItem('rf_admin_key','k')");await pg.reload();await pg.wait_for_timeout(800)
      box=await pg.query_selector('#c1 svg');bb=await box.bounding_box();await pg.mouse.move(bb['x']+bb['width']*.6,bb['y']+50);await pg.wait_for_timeout(200)
      await pg.screenshot(path=nm,full_page=True);print(nm,await pg.evaluate("()=>document.documentElement.scrollWidth"))
    await b.close()
asyncio.run(main())
