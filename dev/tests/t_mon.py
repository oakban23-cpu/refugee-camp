import asyncio,random,sys
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.pg.set_viewport_size({'width':390,'height':844})
        await A.ev("()=>{gmGod=true;ov.hidden=true;enterMap(30,{x:1330,y:2050})}");await A.wait(3000)
        await A.ev("()=>{mons=[];for(let t=0;t<3;t++)for(let k=0;k<2;k++){const x=1270+t*60,y=1990+k*50,hp=mhp(t,112);mons.push({id:++mid,x,y,tx:x,ty:y,t,L:112,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})}}");await A.wait(1500)
        await A.ev("()=>{ZM.z=Math.min(1.6,(ZM.max||1.6))}");await A.wait(800)
        await A.pg.screenshot(path='../p6/mons.png')
        await b.close()
    p.terminate()
asyncio.run(main())
