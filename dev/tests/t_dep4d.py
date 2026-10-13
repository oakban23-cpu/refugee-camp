import asyncio,random,sys
from h import *
M="""()=>new Promise(res=>{const a=[];const iv=setInterval(()=>{a.push(PF.draw)},50);setTimeout(()=>{clearInterval(iv);a.sort((x,y)=>x-y);res([Math.round(a.reduce((s,v)=>s+v,0)/a.length*10)/10,Math.round(a[Math.floor(a.length*.9)]*10)/10])},1500)})"""
WJ="""()=>{window.__w=window.__w||[];if(!window.__wh){window.__wh=1;const o=console.warn;console.warn=(...a)=>{window.__w.push(String(a[0])+" "+String(a[1]&&a[1].stack||a[1]).slice(0,300))}}}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        for mp in [27,29]:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;ov.hidden=true;enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}});}}");await A.wait(1200);await A.ev(WJ)
            await A.ev(f"()=>{{me.y=MAPS[{mp}].sy+({mp}===31?500:-500)*({mp}===9?0.6:1);me.x=MAPS[{mp}].sx+60;if(typeof PALG!=='undefined')PALG.title=null}}");await A.wait(1800)
            pf=await A.ev(M);print(await A.ev('()=>[depOn(),DEPM[curMap],isDg(),isTw(),isArena(),typeof d4Screen,(()=>{let n=0;const o=d4Screen;window.d4Screen=d4Screen=function(){n++;return o()};return 1})()]'));await A.wait(500);print(await A.ev('()=>[me.y,cam.y,PF.draw]'))
            await A.pg.screenshot(path=f'../p6/d4_{mp}.png');print(mp,pf)
        print(await A.ev('()=>[window.__w.length,curMap,JSON.stringify(PALG.title),PALG.zone]'));print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
