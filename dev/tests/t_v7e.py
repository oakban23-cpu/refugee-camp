import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        HR=int(sys.argv[1]) if len(sys.argv)>1 else 12
        await A.ev(f"()=>{{gmGod=true;window.DNH={HR};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50)}}")
        async def shot(s,mp,x,y,name,z=None,w=2500,extra=''):
            await A.ev(f"()=>{{me.sty={s};ov.hidden=true;enterMap({mp},{{x:{x},y:{y}}})}}");await A.wait(w)
            await A.ev(f"()=>{{me.x={x};me.y={y};mons=[];PALG.card=null;{extra}}}")
            if z: await A.ev(f"()=>{{window.__cz=window.__cz||window.camZoomT;window.camZoomT=()=>{z}}}")
            await A.wait(1500);await A.pg.screenshot(path=f'../p6/{name}.png')
            if z: await A.ev("()=>{window.camZoomT=window.__cz}")
        i0="STY.findIndex(x=>x.p7tb)"
        await shot("{s:STY.findIndex(x=>x.p7tb),n:0,a:1,e6:1,p7m:1}",33,1600,1380,'v_hand',.42)
        await shot("{s:STY.findIndex(x=>x.p7fd),n:0,a:0,e6:1,p7m:1}",33,1600,1390,'v_forge')
        await shot("{s:STY.findIndex(x=>x.p7e7),n:0,a:0,e6:1,p7m:1}",33,1600,1390,'v_forge2')
        await shot("{s:STY.length,n:0,a:0,e6:1,p7m:1,e7:1}",33,1600,1390,'v_e7a')
        await shot("{s:STY.length,n:0,a:0,e6:2,p7m:2,e7:2}",1,1600,1560,'v_e7b',None,9000)
        await shot("{s:STY.length,n:0,a:0,e6:2,p7m:2,e7:2}",1,1600,1560,'v_e7bz',.5,2500)
        await shot("{s:STY.length,n:0,a:0,e6:1,p7m:1,e7:1}",32,1600,1600,'v_e7c')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
