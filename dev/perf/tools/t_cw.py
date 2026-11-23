import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3000);await pg.evaluate(SETUP,['mage','Cw1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true;enterMap(9,{x:1600,y:1950});await new Promise(r=>setTimeout(r,2500));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150));me.x=1600;me.y=1950}")
            await pg.wait_for_timeout(1500)
            r=await pg.evaluate("""async()=>{const d=g.getTransform().a;const run=(f,n=20)=>{g.save();g.setTransform(d,0,0,d,-cam.x*d,-cam.y*d);const a=performance.now();for(let i=0;i<n;i++){f();g.getImageData(0,0,1,1)}const t=(performance.now()-a)/n;g.restore();return Math.round(t*100)/100};
              const o={};o.flush=run(()=>{});o.cwNorth=run(()=>cwDraw(-1e9,CY));o.cwSouth=run(()=>cwDraw(CY,1e9));
              const runs=[];{const y0=Math.max(cam.y,CW.oy,CY),y1=Math.min(cam.y+H,CW.oy+CW.c.height);const T=CW.T,r0=Math.floor((y0-CW.oy)/T),r1=Math.floor((y1-CW.oy-1e-6)/T);for(let r=r0;r<=r1;r++)runs.push(CW.rows[r].length)}o.runsPerRow=runs;
              /* one small drawImage from CW.c */const sx=cam.x-CW.ox,sy=cam.y-CW.oy+200;o.oneSmall=run(()=>g.drawImage(CW.c,sx,sy,50,50,cam.x,cam.y,50,50));
              /* same from an ImageBitmap copy */const bm=await createImageBitmap(CW.c);o.oneSmallBitmap=run(()=>g.drawImage(bm,sx,sy,50,50,cam.x,cam.y,50,50));
              /* from a small canvas */const sc=document.createElement('canvas');sc.width=64;sc.height=64;sc.getContext('2d').drawImage(CW.c,sx,sy,64,64,0,0,64,64);o.oneSmallFromSmallCanvas=run(()=>g.drawImage(sc,0,0,50,50,cam.x,cam.y,50,50));
              /* CG ground tile canvas 256 */o.cgDraw=run(()=>cgDraw());
              o.astUnder=run(()=>astUnder());o.cityDayFx=run(()=>cityDayFx(1));o.vig=run(()=>{VIG.skip=0;vigDraw('rgba(0,0,0,.4)')});
              o.CWsize=[CW.c.width,CW.c.height];return o}""")
            print(r)
    finally:p.terminate()
asyncio.run(main())
