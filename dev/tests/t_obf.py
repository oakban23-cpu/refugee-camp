import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(36,{x:1400,y:1700})}");await A.wait(2500)
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog,#stq{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.x=1400;me.y=1700;mons=[];const L=[[0,1330,1600],[1,1480,1620],[2,1300,1760],[0,1500,1790],[1,1260,1660]];L.forEach(([t,x,y])=>{const hp=mhp(t,132)*50;mons.push({id:++mid,x,y,tx:x,ty:y,t,L:132,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})})}");await A.wait(1500)
        await A.pg.screenshot(path='../p6/ob_fight.png')
        await A.ev("()=>{window.DNH=22}");await A.wait(2000);await A.pg.screenshot(path='../p6/ob_fight_n.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
