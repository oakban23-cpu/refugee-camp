import asyncio,random
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=22;const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false;mons=[]},50);enterMap(35,{x:820,y:900})}");await A.wait(3000)
        ims=[]
        for k,js in enumerate(["()=>{}","()=>{window._d4=DEP4.karn;delete DEP4.karn}","()=>{DEP4.karn=window._d4;window._a2=AMB2.karn;delete AMB2.karn}","()=>{delete DEP4.karn}"]):
            await A.ev(js);await A.wait(1200);await A.pg.screenshot(path=f'../p6/kn{k}.png');ims.append(Image.open(f'../p6/kn{k}.png').crop((0,150,390,600)).resize((260,300)))
        W=Image.new('RGB',(1040,300))
        for i,im in enumerate(ims):W.paste(im,(i*260,0))
        W.save('../p6/kn_grid.png');print(await A.ev("()=>[PALC.warm,DEPM[35],dnState().dk]"))
        await b.close()
    p.terminate()
asyncio.run(main())
