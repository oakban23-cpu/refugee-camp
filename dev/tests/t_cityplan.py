import asyncio, sys, json, base64
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/astra3/'
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':1280,'height':720})).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Cp1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3000));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150))}")
            d=await pg.evaluate("""()=>{const c=document.createElement('canvas'),R=CITY.R,s=.5,ox=CX-R-80,oy=CY-R-80;c.width=c.height=(R*2+160)*s;const x=c.getContext('2d');x.scale(s,s);x.translate(-ox,-oy);
              x.drawImage(CG.c,CX-CG.c.width/CG.s/2,CY-CG.c.height/CG.s/2,CG.c.width/CG.s,CG.c.height/CG.s);
              x.strokeStyle='red';x.lineWidth=4;for(const [a,b,c2,e] of CITY.rects)x.strokeRect(a,b,c2-a,e-b);
              x.strokeStyle='orange';for(const [a,b,r] of CITY.circ){x.beginPath();x.arc(a,b,r,0,7);x.stroke()}
              const L=CSPR||citySprites();x.fillStyle='rgba(0,120,255,.35)';for(const q of L){x.fillRect(q.x0,q.y-8,q.x1-q.x0,8)}
              x.fillStyle='black';x.font='bold 22px sans-serif';for(let gx=CX-R;gx<=CX+R;gx+=200){x.fillText(gx,gx,CY-R-40)}for(let gy=CY-R;gy<=CY+R;gy+=200){x.fillText(gy,CX-R-70,gy)}
              x.strokeStyle='rgba(0,0,0,.3)';x.lineWidth=1;for(let gx=CX-R;gx<=CX+R;gx+=100){x.beginPath();x.moveTo(gx,CY-R);x.lineTo(gx,CY+R);x.stroke()}for(let gy=CY-R;gy<=CY+R;gy+=100){x.beginPath();x.moveTo(CX-R,gy);x.lineTo(CX+R,gy);x.stroke()}
              return c.toDataURL('image/jpeg',.8)}""")
            open(O+'plan.jpg','wb').write(base64.b64decode(d.split(',')[1]))
            print(await pg.evaluate("()=>JSON.stringify({circ:CITY.circ.length,rects:CITY.rects.length,CS:CSTALL&&CSTALL.length})"))
    finally:p.terminate()
asyncio.run(main())
