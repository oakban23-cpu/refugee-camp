import asyncio,random,sys
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false},40)}")
        await A.ev("()=>{gmGod=true;const M=dgMap(79001);enterMap(79001,{x:M.sx,y:M.sy})}");await A.wait(1500)
        await A.ev("()=>{try{dgStart()}catch(e){}}");await A.wait(1500)
        print(await A.ev("()=>[dg.ph,mons.length,me.x|0,me.y|0]"))
        ims=[]
        for k,dy in enumerate([0,-500,-1000,-1500]):
            await A.ev(f"()=>{{try{{const c=ESCI&&ESCI();}}catch(e){{}};me.y=MAPS[curMap].sy+{dy};AUTO.on=true}}");await A.wait(2500)
            await A.pg.screenshot(path=f'../p6/esc_{k}.png');ims.append(Image.open(f'../p6/esc_{k}.png').crop((0,74,390,810)).resize((260,490)))
            print(k,await A.ev("()=>{const d=g.getImageData(0,0,cv.width,cv.height).data;let s=0,n=0,hi=0;for(let i=0;i<d.length;i+=40){const l=(d[i]*.3+d[i+1]*.59+d[i+2]*.11);s+=l;n++;if(l>235)hi++}return [Math.round(s/n),Math.round(hi/n*100)]}"))
        W=Image.new('RGB',(260*4,490))
        for i,im in enumerate(ims):W.paste(im,(i*260,0))
        W.save('../p6/esc_grid.png')
        await b.close()
    p.terminate()
asyncio.run(main())
