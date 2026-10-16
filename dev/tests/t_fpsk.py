import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0]
URL='file:///mnt/user-data/outputs/refugee-online/public/index.html'
GQ=sys.argv[1]
K=[('idle',{}),('s6sw',{'r':72,'dur':4.55}),('s6rg',{'r':210,'dur':9}),('s6bw',{'r':105,'len':8,'dur':9}),('s6ob',{'r':46,'dur':5}),('torn',{'r':90,'dur':4,'len':1,'a':0}),('golem',{'r':140,'dur':8}),
   ('r27rf',{'dur':7}),('r27cd',{'r':44}),('r27hl',{'r':140}),('r27sum',{'sx':-1}),('r27ln',{'sx':-150,'r':34}),('r27x',{'r':44}),('s6im',{'sx':-60,'big':1}),('s6gd',{'r':150})]
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True);pg=await ctx.new_page()
        await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['melee',2]);await pg.evaluate("(q)=>{setGQ(q);AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};const N=MAPS[2].nests[0];me.x=N[0]-160;me.y=N[1]+60;mons.forEach(m=>{m.x=-9999;m.y=-9999})}",GQ);await pg.wait_for_timeout(2500)
        await pg.evaluate("()=>{window.__F=[];let l=performance.now();(function f(){const n=performance.now();__F.push(n-l);l=n;requestAnimationFrame(f)})()}")
        base=None
        for rep in range(2):
          for k,o in K:
            await pg.evaluate("""([k,o])=>{fxs.length=0;fields.length=0;S6RG.length=0;clearInterval(window.__SP);if(k==='idle'){__F.length=0;return}
              const sp=()=>{fxs=fxs.filter(f=>f.k!==k);[[-120,-60],[130,-50],[-110,90],[120,100]].forEach((p,i)=>{const u='bot'+i,x=Math.round(me.x+p[0]),y=Math.round(me.y+p[1]);const q=Object.assign({},o,{k,u,by:u,x,y});if(q.sx!=null){q.sx=x+q.sx;q.sy=y}try{handleFx(q)}catch(e){}})};sp();window.__SP=setInterval(sp,1500);__F.length=0}""",[k,o])
            await pg.wait_for_timeout(3500)
            r=await pg.evaluate("()=>{const F=__F.slice(3),avg=F.reduce((a,b)=>a+b,0)/F.length;return +avg.toFixed(1)}")
            if k=='idle':base=r
            if rep==1:print(GQ,k.ljust(7),r,'ms','(+%.1f)'%(r-base),flush=True)
asyncio.run(main())
