import asyncio,random,sys,base64
from h import *
from PIL import Image
J="""()=>{const out=document.createElement('canvas');out.width=720;out.height=200;const o=out.getContext('2d');o.fillStyle='#223254';o.fillRect(0,0,720,200);const g0=g;
 for(let t=0;t<3;t++){g=o;o.setTransform(2.4,0,0,2.4,120+t*240,150);try{drawMon(0,0,t,performance.now()/1000,1,0,0)}catch(e){}}
 o.setTransform(1,0,0,1,0,0);g=g0;return out.toDataURL()}"""
J2="""()=>{const out=document.createElement('canvas');out.width=240;out.height=200;const o=out.getContext('2d');o.fillStyle='#1c2650';o.fillRect(0,0,240,200);const g0=g;g=o;o.setTransform(2.6,0,0,2.6,120,165);try{celD(0,0,performance.now()/1000,1)}catch(e){}g=g0;return out.toDataURL()}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;enterMap(34,{x:1600,y:430})}");await A.wait(2000)
        d=await A.ev(J);open('../p6/p7_mons.png','wb').write(base64.b64decode(d.split(',')[1]))
        d=await A.ev(J2);open('../p6/p7_celc.png','wb').write(base64.b64decode(d.split(',')[1]))
        await A.ev("()=>{window.DNH=23;const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.x=1150;me.y=1520}");await A.wait(3000)
        await A.pg.screenshot(path='../p6/p7_night.png')
        await A.ev("()=>{window.DNH=12}");await A.wait(2500);await A.pg.screenshot(path='../p6/p7_dayfight.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
