import asyncio,random,sys,base64
from h import *
MP=[int(x) for x in sys.argv[1].split(',')]
J="""()=>{const out=document.createElement('canvas');out.width=720;out.height=100;const oo=out.getContext('2d');
 const g0=g,L0=LOWQ;FQ.avg=0;const ms=mons.filter(m=>m.t!==3).slice(0,3);let i=0;
 for(const m of ms){for(const lit of[0,1]){const c=document.createElement('canvas');c.width=240;c.height=200;const o=c.getContext('2d');o.fillStyle=MAPS[curMap].bg||'#333';o.fillRect(0,0,240,200);g=o;LOWQ=false;o.setTransform(2.2,0,0,2.2,120,150);o.translate(-m.x,-m.y);
   const f=()=>drawMon(m.x,m.y,m.t,1,1,0,0);try{if(lit){MLB.S.add(m);monLit(m,f)}else f()}catch(e){}oo.drawImage(c,0,0,240,200,i*120,0,120,100);i++}}
 g=g0;LOWQ=L0;return out.toDataURL()}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in MP:
            await A.ev(f"()=>{{gmGod=true;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1500)
            d=await A.ev(J);open(f'../p6/lm_{mp}.png','wb').write(base64.b64decode(d.split(',')[1]))
        await b.close()
    p.terminate()
asyncio.run(main())
