import asyncio,random,base64
from h import *
J="""()=>{const out=document.createElement('canvas');out.width=720;out.height=220;const o=out.getContext('2d');o.fillStyle='#cdd8e6';o.fillRect(0,0,720,220);const g0=g;
 for(let t=0;t<3;t++){g=o;o.setTransform(2.2,0,0,2.2,120+t*240,170);try{drawMon(0,0,t,performance.now()/1000,1,0,0)}catch(e){console.error(e)}}
 o.setTransform(1,0,0,1,0,0);g=g0;return out.toDataURL()}"""
J2="""()=>{const out=document.createElement('canvas');out.width=360;out.height=200;const o=out.getContext('2d');o.fillStyle='#dfe8f2';o.fillRect(0,0,360,200);const g0=g;g=o;o.setTransform(2.6,0,0,2.6,90,165);try{orrD(0,0,1,performance.now()/1000)}catch(e){console.error(e)}o.setTransform(2.6,0,0,2.6,260,165);try{celD(0,0,performance.now()/1000,-1)}catch(e){console.error(e)}g=g0;return out.toDataURL()}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;window.DNH=12;enterMap(36,{x:1600,y:2780})}");await A.wait(2500)
        d=await A.ev(J);open('../p6/ob_mons.png','wb').write(base64.b64decode(d.split(',')[1]))
        d=await A.ev(J2);open('../p6/ob_npc.png','wb').write(base64.b64decode(d.split(',')[1]))
        await A.ev("()=>{const s=document.createElement('style');s.textContent='#topb,#clog,#stq{display:none!important}';document.head.appendChild(s);setInterval(()=>{FQ.avg=0;LOWQ=false;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>420)},50);window.camZoomT=()=>.62;me.x=1600;me.y=820}");await A.wait(4000)
        await A.pg.screenshot(path='../p6/ob_dome.png')
        await A.ev("()=>{window.camZoomT=()=>1;me.x=1400;me.y=1600;window.DNH=12;mons=[];const L=[[0,1500,1500],[1,1650,1560],[2,1500,1640],[0,1700,1660]];L.forEach(([t,x,y],i)=>{const hp=mhp(t,132);mons.push({id:++mid,x,y,tx:x,ty:y,t,L:132,p:0,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0})})}");await A.wait(1200)
        await A.ev("()=>{const s=setInterval(()=>{},50)}");await A.pg.screenshot(path='../p6/ob_fight.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
