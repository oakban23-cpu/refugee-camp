import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'M'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;ov.hidden=true;enterMap(38,{x:900,y:1700})}");await A.wait(3000)
        print(await A.ev("()=>{window.__M=[0,1,2].map(t=>mons.find(m=>m.t===t));return window.__M.map(m=>m?m.t:-1)}"))
        for t in range(3):
            r=await A.ev(f"()=>{{const m=window.__M[{t}];if(m&&!mons.includes(m))mons.push(m);if(!m)return 0;mons=mons.filter(q=>q===m||q.t===3);me.x=m.x-90;me.y=m.y+10;PHS.lx=me.x;PHS.ly=me.y;PALG.title=null;return [m.x,m.y,m.L]}}")
            print(t,r);await A.wait(900);await A.pg.screenshot(path=f'../v495/mon{t}.png',clip={'x':60,'y':250,'width':270,'height':300})
        await A.ev("()=>{const[x,y]=phRS()[1];me.x=x-60;me.y=y+40;PHS.lx=me.x;PHS.ly=me.y;mons=[];me.sty={s:STY.findIndex(x=>x.p8rs),a:1,n:0,e:1,e4:2,p6h:2,e6:1,e7:1,p7m:1}}");await A.wait(400);await A.pg.screenshot(path='../v495/smoke2.png')
        await A.ev("()=>{me.x=2800;me.y=1700;PHS.lx=me.x;PHS.ly=me.y;mons=[]}");await A.wait(1500);await A.pg.screenshot(path='../v495/pier2.png')
        print([e for e in A.errs][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
