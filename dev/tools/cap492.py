import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
FAKE="""()=>{const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=()=>Promise.resolve();e.userChoice=new Promise(()=>{});window.dispatchEvent(e)}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Arin'+str(random.randint(10,99)),'melee',30)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){};banner=null;try{chatLog.length=0}catch(e){}}")
        await A.ev(FAKE);await A.wait(300)
        await A.ev("()=>{PWA.t0=performance.now()-200000;localStorage.setItem('refugee_pwa_ask','{}');pwaAskNow()}");await A.wait(600)
        await A.pg.screenshot(path='../coverw/c_ask.png')
        await A.ev("()=>{const c=$('pwac');if(c)c.remove();PWA.card=0;cfgUI()}");await A.wait(400)
        el=await A.pg.query_selector('#ov [data-pwarow]');await el.scroll_into_view_if_needed();bb=await el.bounding_box()
        await A.pg.screenshot(path='../coverw/c_set.png',clip={'x':0,'y':max(0,bb['y']-200),'width':390,'height':270})
        await A.ev("()=>{ov.hidden=true;fsIOS=()=>true;PWA.ev=null;pwaCard('ios')}");await A.wait(500)
        await A.pg.screenshot(path='../coverw/c_ios.png',clip={'x':0,'y':100,'width':390,'height':330})
    finally: p.terminate()
asyncio.run(main())
