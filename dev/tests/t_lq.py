import asyncio,random,sys
from h import *
from PIL import Image
MODE=sys.argv[1];MP=[int(x) for x in sys.argv[2].split(',')]
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s);setInterval(()=>{LOWQ=true},40)}")
        if MODE=='night': await A.ev("()=>{window.DNH=23}")
        if MODE=='rain': await A.ev("()=>{window.DNH=12;wxNow=()=>1}")
        if MODE=='day': await A.ev("()=>{window.DNH=12}")
        ims=[]
        for mp in MP:
            await A.ev(f"()=>{{gmGod=true;enterMap({mp},{{x:MAPS[{mp}].sx,y:MAPS[{mp}].sy}})}}");await A.wait(900)
            await A.ev(f"()=>{{const n=(MAPS[curMap].nests||[])[3];if(n){{me.x=n[0];me.y=n[1]+150}}else{{me.y+= {mp}===31?400:-400}}if(typeof PALG!=='undefined')PALG.title=null;banner=null}}");await A.wait(2200)
            await A.pg.screenshot(path='../p6/_n.png');ims.append(Image.open('../p6/_n.png').crop((0,74,390,810)).resize((195,368)))
        W=Image.new('RGB',(195*min(8,len(ims)),368*((len(ims)+7)//8)))
        for i,im in enumerate(ims):W.paste(im,((i%8)*195,(i//8)*368))
        W.save(f'../p6/lq_{MODE}_grid.png');print('errs',[e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
