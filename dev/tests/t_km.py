import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for hr,nm in [(12,'day'),(22,'night')]:
            await A.ev(f"()=>{{gmGod=true;window.DNH={hr};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);ov.hidden=true;enterMap(35,{{x:2100,y:1000}})}}");await A.wait(3000)
            await A.ev("""()=>{window.__cz=window.__cz||camZoomT;window.camZoomT=()=>2.4;mons=[];const P=[[2068,985],[2105,940],[2146,990]];window.rt3Cam=rt3Cam=()=>[2105,960];if(!window.__hk){window.__hk=1;const o=drawNyxFx;window.drawNyxFx=drawNyxFx=function(){window.__n=(window.__n||0)+1;o();me.x=2100;me.y=1500;mons=[];P.forEach(([x,y],t)=>{try{drawMon(x,y,t,performance.now()/1000,t===1?-1:1,0,0)}catch(e){console.error(e)}})}}}""")
            await A.wait(1500);print(await A.ev('()=>[window.__n,curMap,typeof drawMonT,bTheme(),ZM.z]'));await A.pg.screenshot(path=f'../p6/km_{nm}.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
