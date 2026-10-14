import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.sty={s:STY.findIndex(x=>x.p7fd),n:0,a:1,e6:1};hfgEnter()}");await A.wait(2500)
        await A.ev("()=>{dg={ph:'boss',w:0,tl:900,nx:0};HF.st='boss';HF.S=100;me.x=CX;me.y=CY+300;window.__cz=window.camZoomT;window.camZoomT=()=>1.7;mons=[];for(let t=0;t<3;t++){const x=CX-90+t*90,y=CY+230,hp=1e9;mons.push({id:++mid,x,y,tx:x,ty:y,t,L:134,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0,stun:99})}}")
        await A.wait(700);await A.pg.screenshot(path='../p6/v_mons.png')
        print(await A.ev("()=>mons.map(m=>[m.t,Math.round(m.x),Math.round(m.y)]).join('|')"))
        await b.close()
    p.terminate()
asyncio.run(main())
