import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(36,{x:1600,y:2780})}");await A.wait(2500)
        r=await A.ev("""()=>{const out=[];const c=document.createElement('canvas');c.width=256;c.height=256;const x=c.getContext('2d');
          for(let oy=0;oy<3200;oy+=384)for(let ox=0;ox<3200;ox+=384){x.setTransform(256/384,0,0,256/384,-ox*256/384,-oy*256/384);try{obPaint(x,ox,oy,384)}catch(e){out.push([ox,oy,String(e).slice(0,120)])}}
          return JSON.stringify(out)}""")
        print('paint errors',r)
        print(await A.ev("()=>{try{return JSON.stringify({cs:GX.CS})}catch(e){return String(e)}}"))
        await A.ev("()=>{window.camZoomT=()=>.36;me.x=1650;me.y=2250}");await A.wait(8000);await A.pg.screenshot(path='../p6/obv_over3.png')
        await b.close()
    p.terminate()
asyncio.run(main())
