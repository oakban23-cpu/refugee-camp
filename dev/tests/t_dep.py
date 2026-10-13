import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10,mons.length])},2000)})"""
MAPS=[int(x) for x in sys.argv[1].split(',')] if len(sys.argv)>1 else [1,2,3,4,5,6,7,8,10,11]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in MAPS:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;if(curMap!=={mp})enterMap({mp},{{x:1600,y:1600}});}}");await A.wait(1500)
            pos=await A.ev(f"()=>{{const t=(typeof TERD!=='undefined'&&TERD[{mp}])||[];const P=t[0];if(P){{me.x=P[0]+30;me.y=P[1]+P[2]*.72*.3}}return [me.x|0,me.y|0,t.length]}}")
            await A.wait(1500)
            pf=await A.ev(M)
            await A.pg.screenshot(path=f'../p6/dep_{mp}.png')
            print(mp,pos,pf,A.errs[-2:] if A.errs else '')
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(800)
        for mp in MAPS[:3]:
            await A.ev(f"()=>{{if(curMap!=={mp})enterMap({mp},{{x:1600,y:1600}});}}");await A.wait(1500)
            await A.ev(f"()=>{{const P=TERD[{mp}]&&TERD[{mp}][0];if(P){{me.x=P[0];me.y=P[1]+P[2]+60}}}}");await A.wait(1200)
            await A.pg.screenshot(path=f'../p6/depD_{mp}.png')
        print('errs',A.errs[:5])
        await b.close()
    p.terminate()
asyncio.run(main())
