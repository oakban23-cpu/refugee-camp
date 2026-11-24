import asyncio, sys, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/lcg/shots/'
os.makedirs(O,exist_ok=True)
NS=json.loads(sys.argv[1]);FR=int(sys.argv[2]) if len(sys.argv)>2 else 1;VW=sys.argv[3] if len(sys.argv)>3 else '915x412'
w,h=map(int,VW.split('x'))
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':w,'height':h},device_scale_factor=1)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Lc1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;ov.hidden=true}")
            for n in NS:
                await pg.evaluate("n=>{cgShow(n)}",n);await pg.wait_for_timeout(2500)
                for f in range(FR):
                    await pg.screenshot(path=O+'c%02d_%03d.jpg'%(n,f),type='jpeg',quality=80)
                    if FR>1:await pg.wait_for_timeout(66)
            print('ST',await pg.evaluate("()=>JSON.stringify(LCG.st)"))
            print('ERR',errs)
    finally:p.terminate()
asyncio.run(main())
