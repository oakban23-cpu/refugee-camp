import asyncio,random,sys
from h import *
from PIL import Image
H_=float(sys.argv[1]) if len(sys.argv)>1 else 12
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7mr)")
        await A.ev(f"()=>{{window.DNH={H_};gmGod=true;me.sty={{s:{i0},n:2,a:1,e:1,e4:2,p6h:2,e6:1,p7m:1,p7mr:32768|2|(3<<3)|(7<<6)|(3<<9)|(6<<12)}};const s=document.createElement('style');s.textContent='#topb,#clog,#stq{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>420)}},50);enterMap(36,{{x:1600,y:2780}})}}");await A.wait(2500)
        print(await A.ev("()=>[obChain().links,JSON.stringify(obChain().lit),FSW.map(w=>[w.x,w.y,w.b])]"))
        ims=[]
        PTS=[(1600,2780),(1600,900),(1600,1450),(2500,1000),(2200,1800),(900,1700)]
        for k,(x,y) in enumerate(PTS):
            await A.ev(f"()=>{{me.x={x};me.y={y};PALG.title=null}}");await A.wait(1500)
            await A.pg.screenshot(path=f'../p6/obv_{k}.png');ims.append(Image.open(f'../p6/obv_{k}.png').crop((0,74,390,810)).resize((260,490)))
        W=Image.new('RGB',(260*6,490))
        for i,im in enumerate(ims):W.paste(im,(i*260,0))
        W.save(f'../p6/obv_grid_{int(H_)}.png')
        await A.ev("()=>{window.camZoomT=()=>.36;me.x=1650;me.y=1350}");await A.wait(3500);await A.pg.screenshot(path=f'../p6/obv_over_{int(H_)}.png')
        await A.ev("()=>{me.x=1650;me.y=2250}");await A.wait(2500);await A.pg.screenshot(path=f'../p6/obv_over2_{int(H_)}.png')
        print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
