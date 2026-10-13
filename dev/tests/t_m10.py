import asyncio,random,json
from h import *
from PIL import Image
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(10,{x:1600,y:1600})}");await A.wait(2500)
        r=await A.ev("()=>{const M=MAPS[10];return JSON.stringify({n:M.n,sx:M.sx,sy:M.sy,sr:M.sr,gates:M.gates.map(g=>[g.x,g.y,g.to,g.nm]),npc:M.npc,npc2:M.npc2,npc3:M.npc3,boss:[M.boss.x,M.boss.y,M.boss.n],nests:M.nests,keys:Object.keys(M)})}")
        print(r)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog,#stq{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>420)},50)}")
        ims=[]
        for k,(x,y) in enumerate([(420,1560),(1600,1600),(MX:=2400,1000),(2600,2300),(800,800),(1600,600)]):
            await A.ev(f"()=>{{me.x={x};me.y={y}}}");await A.wait(1300)
            await A.pg.screenshot(path=f'../p6/m10_{k}.png');ims.append(Image.open(f'../p6/m10_{k}.png').crop((0,74,390,810)).resize((260,490)))
        W=Image.new('RGB',(1560,490))
        for i,im in enumerate(ims):W.paste(im,(i*260,0))
        W.save('../p6/m10_grid.png')
        await A.ev("()=>{window.camZoomT=()=>.3;me.x=1600;me.y=1600}");await A.wait(9000);await A.pg.screenshot(path='../p6/m10_over.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
