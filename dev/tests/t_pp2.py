import asyncio,random
from h import *
from PIL import Image
MAPS=[1,2,3,4,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog,#mn,#aud{display:none!important}';document.head.appendChild(s)}")
        crops=[]
        for mp in MAPS:
            await A.ev(f"()=>{{gmGod=true;LOWQ=false;enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(1200)
            await A.ev("()=>{const t=trees.find(t=>t.pp&&!t.small);if(t){me.x=t.x+70;me.y=t.y+150}if(typeof PALG!=='undefined')PALG.title=null}");await A.wait(1300)
            r=await A.ev("()=>{const t=trees.find(t=>t.pp&&!t.small);if(!t)return null;const z=ZM.z,r=cv.getBoundingClientRect();return [Math.round((t.x-cam.x)*z+r.left),Math.round((t.y-cam.y)*z+r.top),t.pp]}")
            await A.pg.screenshot(path=f'../p6/ppz_{mp}.png')
            if r:
                im=Image.open(f'../p6/ppz_{mp}.png');x,y=r[0],r[1];crops.append(im.crop((x-90,y-160,x+90,y+50)))
            print(mp,r)
        W=Image.new('RGB',(180*8,210*3))
        for i,c in enumerate(crops):W.paste(c,((i%8)*180,(i//8)*210))
        W.save('../p6/ppz_grid.png')
        await b.close()
    p.terminate()
asyncio.run(main())
