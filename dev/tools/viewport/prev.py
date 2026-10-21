import asyncio,sys
from playwright.async_api import async_playwright
old=open('old_valance.js').read();new=open('drape.js').read()
HTML="""<html><body style="margin:0;background:#000"><canvas id=c></canvas><script>
let DPR=2,LOWQ=false;const cv=document.getElementById('c');let g=cv.getContext('2d');
%s
%s
function bg(W,H){g.fillStyle='#8f8c94';g.fillRect(0,0,W,H);g.fillStyle='#6d1626';g.fillRect(W/2-90,0,180,H);g.strokeStyle='#c9a04a';g.lineWidth=3;g.strokeRect(W/2-90,-5,180,H+10);
 for(let x=40;x<W;x+=150){g.fillStyle='#d8d4dc';g.fillRect(x,120,40,300);g.fillStyle='#2a2060';g.fillRect(x+8,150,24,60)}}
window.render=(W,H,which)=>{cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';g.setTransform(DPR,0,0,DPR,0,0);bg(W,H);if(which==='old')d4Valance(1.2,W,74);else d4Drape(1.2,W,H)}
</script></body></html>"""%(old,new)
open('prev.html','w').write(HTML)
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();pg=await b.new_page(device_scale_factor=2)
        E=[];pg.on('pageerror',lambda e:E.append(str(e)))
        await pg.goto('file:///tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v480/prev.html')
        for W,H,nm in [(360,800,'p'),(992,620,'l'),(916,334,'s')]:
            for w in ['old','new']:
                await pg.set_viewport_size({'width':W,'height':H})
                await pg.evaluate(f"()=>render({W},{H},'{w}')");await pg.wait_for_timeout(100)
                await pg.screenshot(path=f'pv_{nm}_{w}.png')
        print(E)
asyncio.run(main())
