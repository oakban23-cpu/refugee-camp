import asyncio,random,sys
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;setInterval(()=>{FQ.avg=0;LOWQ=false},50);me.sty={s:STY.findIndex(x=>x.p7fd),n:0,a:1,e6:1};hfgEnter()}");await A.wait(2500)
        await A.ev("()=>{dg={ph:'boss',w:0,tl:900,nx:0};HF.st='boss';HF.S=100;spawnBoss();const B=mons.find(q=>q.t===3);B.x=CX+230;B.y=CY-230;B.h1=99;B.h2=99;B.h3=99;B.h4=99;me.x=CX+230;me.y=CY-60;window.__cz=window.camZoomT;window.camZoomT=()=>1.25}")
        await A.wait(2000);await A.pg.screenshot(path='../p6/v_boss.png')
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.hp=B.mh*.4;B.inv=0;for(let t=0;t<3;t++){const x=CX-110+t*110,y=CY+120,hp=1e9;mons.push({id:++mid,x,y,tx:x,ty:y,t,L:134,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})}me.x=CX;me.y=CY+260}")
        await A.wait(1500);await A.pg.screenshot(path='../p6/v_mons.png')
        await A.ev("()=>{const B=mons.find(q=>q.t===3);B.x=CX+230;B.y=CY-230;B.stun=0;me.x=CX+230;me.y=CY-40}");await A.wait(800);await A.pg.screenshot(path='../p6/v_boss2.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
