import asyncio,random,sys
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{window.DNH=12;gmGod=true;const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false},50);enterMap(34,{x:1700,y:2200})}");await A.wait(2500)
        await A.ev("()=>{me.x=1700;me.y=2200;mons=[]}")
        ims=[]
        for k,js in enumerate(["0","sfScreen=()=>{}","d4Screen=()=>{}","sfGroundFx=()=>{}","depScreen=()=>{}","plxScreen=()=>{}","gxAtmo=()=>{};gxRays=()=>{}"]):
            await A.ev("()=>{"+js+"}");await A.wait(900)
            await A.pg.screenshot(path='../p6/_d.png');ims.append(Image.open('../p6/_d.png').crop((0,300,390,600)).resize((195,150)))
        W=Image.new('RGB',(195*7,150))
        for i,im in enumerate(ims):W.paste(im,(i*195,0))
        W.save('../p6/p7dbg.png')
        await b.close()
    p.terminate()
asyncio.run(main())
