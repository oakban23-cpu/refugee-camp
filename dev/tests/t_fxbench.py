import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0]
URLS={'v404':'file:///tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/old401/index.html','new':'file:///mnt/user-data/outputs/refugee-online/public/index.html'}
K=[('s6rg',{'r':140}),('s6rg',{'r':210}),('torn',{'r':90,'a':0,'len':1}),('torn',{'r':70,'a':0})]
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for name,url in URLS.items():
          for q in ['low','high']:
            pg=await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)).new_page()
            await pg.goto(url);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee',2]);await pg.evaluate("(q)=>{setGQ(q)}",q);await pg.wait_for_timeout(1500)
            out=[]
            for k,o in K:
                ms=await pg.evaluate("""([k,o])=>{const N=150;let best=1e9;for(let rep=0;rep<5;rep++){const t=performance.now();g.save();g.setTransform(DPR,0,0,DPR,0,0);g.translate(-cam.x,-cam.y);
                  for(let i=0;i<N;i++){const f=Object.assign({k,x:me.x,y:me.y,t:3,d:6,s:7,u:'zz'},o);FXB[k](f,.4,f.x,f.y,f.r,performance.now()/1000+i*.01)}
                  g.restore();g.getImageData(0,0,1,1);best=Math.min(best,(performance.now()-t)/N)}return +best.toFixed(3)}""",[k,o])
                out.append(f"{k}{o.get('r')}:{ms}ms")
            print(name,q,' '.join(out),flush=True);await pg.context.close()
asyncio.run(main())
