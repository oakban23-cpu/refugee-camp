import asyncio
from h import *
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':1000,'height':800});pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(URL);await pg.wait_for_timeout(2000)
        await pg.evaluate(SETUP,['melee','Sz',99]);await pg.wait_for_timeout(1500)
        for mp in [19,21,23,25,26]:
            await pg.evaluate(f"()=>{{me.hp=me.mh=1e9;ov.hidden=true;enterMap({mp},{{x:1600,y:1300}});document.querySelectorAll('#stq,#clog').forEach(e=>e.style.display='none')}}");await pg.wait_for_timeout(2000)
            await pg.evaluate("""()=>{mons=[];let id=1;const pick=(t,want)=>{for(let k=0;k<5000;k++){id++;const z=szOf({id,t});if(want(z))return id}return id};
              const L=[[0,z=>z<.8],[0,z=>z>1.3],[1,z=>z<.8],[2,z=>z>2],[2,z=>z>1.4&&z<2],[1,z=>z>1]];
              L.forEach(([t,w],i)=>{const iid=pick(t,w),x=me.x-150+(i%3)*150,y=me.y-150+Math.floor(i/3)*120,hp=1e9;mons.push({id:iid,x,y,tx:x,ty:y,t,L:100,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,stun:999})});mid=id+10}""")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'sz_{mp}.png',clip={'x':300,'y':180,'width':400,'height':330})
        # ranged test: let monsters act
        await pg.evaluate("()=>{enterMap(23,{x:1600,y:1300});me.hp=me.mh=1e9}");await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{mons=[];for(let i=0;i<4;i++){const x=me.x+200,y=me.y-60+i*40,hp=1e6;mons.push({id:++mid,x,y,tx:x,ty:y,t:1,L:100,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})}}");await pg.wait_for_timeout(4000)
        print('proj',await pg.evaluate("()=>[MPS.length,MPV.length,me.hp<me.mh]"))
        print('errs',errs[:3])
    finally: p.terminate()
asyncio.run(main())
