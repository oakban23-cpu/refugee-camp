import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/astra3/'
PTS=json.loads(sys.argv[1]);FT=json.loads(sys.argv[3]) if len(sys.argv)>3 else None;PRE=sys.argv[2] if len(sys.argv)>2 else 's'
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Cs1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;ov.hidden=true;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3000));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150))}")
            for i,(x,y) in enumerate(PTS):
                if FT:await pg.evaluate("([x,y])=>{AX.FOUNT[0]=[x,y];CSPR=null}",FT[i])
                await pg.evaluate("([x,y])=>{me.x=x;me.y=y;try{cam.x=x;cam.y=y}catch(e){}}",[x,y]);await pg.evaluate("()=>{try{TIPS.t=1e15;const c=document.getElementById('tipc');if(c)c.hidden=true}catch(e){}}");await pg.wait_for_timeout(900)
                await pg.screenshot(path=O+'%s%d.jpg'%(PRE,i),type='jpeg',quality=75)
            print('ERR',errs)
    finally:p.terminate()
asyncio.run(main())
