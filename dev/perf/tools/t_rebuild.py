import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Rb1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,2500));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150))}")
            r=await pg.evaluate("""()=>{const o={};for(const lq of[false,true]){LOWQ=lq;let a=performance.now();CG.c=null;cityGroundBuild();o['ground_'+(lq?'low':'full')]=Math.round(performance.now()-a);a=performance.now();CW.c=null;CW.rows=null;cityWallBuild();cwMask();o['wall_'+(lq?'low':'full')]=Math.round(performance.now()-a)}LOWQ=false;return o}""")
            print(r)
            # จังหวะเข้าเมืองจริง: เฟรมแรกหลัง enterMap(9) จาก camp ที่แคชถูกล้าง
            r=await pg.evaluate("""async()=>{enterMap(1,{x:1600,y:1700});await new Promise(r=>setTimeout(r,2000));CG.c=null;CW.c=null;CW.rows=null;const fr=[];let last=0;const f=t=>{if(last)fr.push(Math.round(t-last));last=t;if(fr.length<40)requestAnimationFrame(f)};enterMap(9,{x:1600,y:1700});requestAnimationFrame(f);await new Promise(r=>setTimeout(r,4000));return fr.sort((a,b)=>b-a).slice(0,5)}""")
            print('frames after re-entry (worst 5 ms):',r)
    finally:p.terminate()
asyncio.run(main())
