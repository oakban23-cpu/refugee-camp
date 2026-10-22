import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Fs'+str(random.randint(100,999)),'melee',30)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){};banner=null}")
        await A.wait(800)
        await A.pg.screenshot(path='../v491/p_port.png')
        await A.pg.click('#fsb');await A.wait(600)
        await A.pg.screenshot(path='../v491/p_port_on.png',clip={'x':230,'y':100,'width':160,'height':70})
        await A.pg.click('#fsb');await A.wait(600)
        await A.pg.screenshot(path='../v491/p_port_off.png',clip={'x':230,'y':100,'width':160,'height':70})
        for w,h in ((844,390),(788,288),(1440,900)):
            await A.pg.set_viewport_size({'width':w,'height':h});await A.wait(1500)
            print(w,h,await A.ev("()=>({sh:VW.sh,k:VW.k,aud:$('aud').style.cssText,u6:getComputedStyle(document.documentElement).getPropertyValue('--vwu6r')})"))
            await A.pg.screenshot(path=f'../v491/p_{w}.png')
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(600)
        await A.ev("()=>cfgUI()");await A.wait(400)
        el=await A.pg.query_selector('#ov [data-fsrow]');await el.scroll_into_view_if_needed()
        bb=await el.bounding_box();await A.pg.screenshot(path='../v491/p_set.png',clip={'x':0,'y':max(0,bb['y']-170),'width':390,'height':240})
        await A.ev("()=>{ov.hidden=true;fsCan=()=>false;fsIOS=()=>true}");await A.pg.click('#fsb');await A.wait(500)
        await A.pg.screenshot(path='../v491/p_ios.png')
    finally: p.terminate()
asyncio.run(main())
