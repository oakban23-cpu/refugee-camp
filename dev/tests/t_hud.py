import asyncio,random,json
from h import *
J="""()=>{const out=[];document.querySelectorAll('body *').forEach(e=>{const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return;const r=e.getBoundingClientRect();if(r.width<24||r.height<24||r.width>360&&r.height>600)return;if(e.tagName==='CANVAS')return;
 let p=e.parentElement,fx=cs.position==='fixed'||cs.position==='absolute';if(!fx)return;out.push([e.id||e.className.toString().slice(0,20),Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)])});return out}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{enterMap(4,{x:1600,y:1600})}");await A.wait(1500)
        r=await A.ev(J)
        for x in r: print(x)
        print(await A.ev("()=>[SW0,H,W,innerWidth,innerHeight,cv.getBoundingClientRect().top,cv.getBoundingClientRect().left]"))
        await b.close()
    p.terminate()
asyncio.run(main())
