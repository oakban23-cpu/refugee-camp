import asyncio, sys, json, os, glob, shutil
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/lcg/vid/'
shutil.rmtree(O,ignore_errors=True);os.makedirs(O)
NS=json.loads(sys.argv[1]);SEC=float(sys.argv[2]) if len(sys.argv)>2 else 5
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            ctx=await b.new_context(viewport={'width':960,'height':540},record_video_dir=O,record_video_size={'width':960,'height':540})
            pg=await ctx.new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Lv1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true;document.querySelectorAll('#hud,.hud,#tipc').forEach(e=>e.style.visibility='hidden');for(let i=1;i<=29;i++)cgLoad(i)}")
            await pg.wait_for_timeout(4000)
            t0=await pg.evaluate("()=>performance.now()")
            marks=[]
            for n in NS:
                await pg.evaluate("n=>{cgShow(n)}",n);marks.append(n);await pg.wait_for_timeout(int(SEC*1000))
            await ctx.close()
    finally:p.terminate()
    print('VIDS',glob.glob(O+'*.webm'))
asyncio.run(main())
