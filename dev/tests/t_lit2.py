import asyncio,random,sys
from h import *
from PIL import Image
MP=[int(x) for x in sys.argv[1].split(',')]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog,#sk{display:none!important}';document.head.appendChild(s)}")
        crops=[]
        for mp in MP:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;AUTO.on=false;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1500)
            pos=await A.ev("()=>{const m=mons.filter(m=>m.t!==3).sort((a,b)=>Math.hypot(a.x-1600,a.y-1600)-Math.hypot(b.x-1600,b.y-1600))[0];if(!m)return null;me.x=m.x+150;me.y=m.y+260;for(const q of mons){q.tg=null}window.__m=m;return [m.x,m.y,m.t]}")
            await A.wait(600)
            for cap in (0,14):
                await A.ev(f"()=>{{MLB.cap={cap};const m=window.__m;m.x=m.x;}}");await A.wait(400)
                r=await A.ev("()=>{const m=window.__m,z=ZM.z,c=cv.getBoundingClientRect();return [Math.round((m.x-cam.x)*z+c.left),Math.round((m.y-cam.y)*z+c.top)]}")
                await A.pg.screenshot(path='../p6/_l.png');im=Image.open('../p6/_l.png');x,y=r;crops.append(im.crop((x-60,y-80,x+60,y+30)).resize((240,220)))
            print(mp,pos)
        W=Image.new('RGB',(240*4,220*((len(crops)+3)//4)))
        for i,c in enumerate(crops):W.paste(c,((i%4)*240,(i//4)*220))
        W.save('../p6/lit_cmp.png')
        await b.close()
    p.terminate()
asyncio.run(main())
