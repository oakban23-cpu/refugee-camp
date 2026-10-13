import asyncio,random,sys
from h import *
from PIL import Image
H_=float(sys.argv[1]) if len(sys.argv)>1 else 12
PTS=[(1650,600),(1650,1450),(820,900),(520,1520),(1650,2380),(2450,2700)]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7cs)")
        await A.ev(f"()=>{{window.DNH={H_};gmGod=true;me.sty={{s:{i0},n:0,a:1,e:1,e4:2,p6h:2,e6:1}};const s=document.createElement('style');s.textContent='#topb,#clog{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);enterMap(35,{{x:1600,y:430}})}}");await A.wait(2500)
        print(await A.ev("()=>[wxNow(),dnState().dk,isNight(),MAPS[35].npc2.x]"))
        ims=[]
        for k,(x,y) in enumerate(PTS):
            await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>300);PALG.title=null}}");await A.wait(1500)
            await A.pg.screenshot(path=f'../p6/kmv_{k}.png');ims.append(Image.open(f'../p6/kmv_{k}.png').crop((0,74,390,810)).resize((260,490)))
        W=Image.new('RGB',(260*6,490))
        for i,im in enumerate(ims):W.paste(im,(i*260,0))
        W.save(f'../p6/kmv_grid_{int(H_)}.png');print('errs',[e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
