import asyncio,random
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'A'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(35,{x:1500,y:800});setInterval(()=>{FQ.avg=0;LOWQ=false},50)}");await A.wait(2500)
        ims=[]
        for k in (1,2,3):
            await A.ev(f"()=>{{me.sty.p7sq={k};banner=null;mons=[]}}");await A.wait(900)
            await A.pg.screenshot(path=f'../p6/k_sdb{k}.png');ims.append(Image.open(f'../p6/k_sdb{k}.png').crop((135,330,255,480)).resize((240,300)))
        W=Image.new('RGB',(720,300))
        for i,im in enumerate(ims):W.paste(im,(i*240,0))
        W.save('../p6/k_sdb.png');print(A.errs[:3])
        await b.close()
    p.terminate()
asyncio.run(main())
