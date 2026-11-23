import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412})).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Cf1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3000));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150))}")
            r=await pg.evaluate("""()=>{const L=citySprites(),R=CITY.R,out={};
              const obs=[];for(const q of L)obs.push([q.x0,q.y-30,q.x1,q.y+12]);for(const [a,b,c,d] of CITY.rects)obs.push([a,b,c,d]);for(const [x,y,r] of CITY.circ)obs.push([x-r,y-r,x+r,y+r]);for(const n of CITY.npcs)obs.push([n.x-30,n.y-40,n.x+30,n.y+20]);
              let G=[];try{G=(MAPS[9].gates||[]).map(q=>[q.x,q.y])}catch(e){}
              for(const q of G)obs.push([q[0]-70,q[1]-70,q[0]+70,q[1]+70]);
              const road=(x,y)=>Math.abs(x-CX)<70||Math.abs(y-CY)<70;
              const res=[];for(let y=CY-R+100;y<CY+R-60;y+=20)for(let x=CX-R+100;x<CX+R-100;x+=20){if(Math.hypot(x-CX,y-CY)>R-90||Math.hypot(x-CX,y-CY)<330||road(x,y))continue;
                 const fb=[x-55,y-100,x+55,y+16];let md=1e9;for(const o of obs){const dx=Math.max(o[0]-fb[2],fb[0]-o[2],0),dy=Math.max(o[1]-fb[3],fb[1]-o[3],0);md=Math.min(md,Math.hypot(dx,dy))}res.push([x,y,Math.round(md)])}
              const q={};for(const [x,y,m] of res){const k=(x<CX?'W':'E')+(y<CY?'N':'S');if(!q[k]||m>q[k][2])q[k]=[x,y,m]}
              return {q,G,top:res.sort((a,b)=>b[2]-a[2]).slice(0,25)}}""")
            print(json.dumps(r))
    finally:p.terminate()
asyncio.run(main())
