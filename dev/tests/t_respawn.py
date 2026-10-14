import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'R'+str(random.randint(100,999)),'melee',60)
        ev=A.ev
        await ev("()=>{gmGod=false;me.gold=100000;enterMap(2,{x:900,y:1600});ov.hidden=true}");await A.wait(4000)
        # พาตัวไปกลางฝูงมอน แล้วตาย
        await ev("()=>{const m=mons.filter(q=>q.t<3)[0];me.x=m.x+20;me.y=m.y;me.inv3=0;hurt(me.hp*50)}");await A.wait(500)
        await ev("()=>reviveHere()");await A.wait(300)
        r=await ev("()=>{const near=mons.filter(m=>m.t<3&&Math.hypot(m.x-me.x,m.y-me.y)<250);return JSON.stringify({rsp:+me.rsp.toFixed(2),near:near.length,tgMe:mons.filter(m=>m.tg===uid).length})}");print('t0',r)
        await ev("()=>{window.__h0=me.hp;window.__a0=me.atkT||0;window.__x0=me.x;window.__sk=me.sk.slice();useSkill(0);useSkill(1)}")
        await A.wait(1500)
        r=await ev("()=>JSON.stringify({rsp:+me.rsp.toFixed(2),hpLost:window.__h0-me.hp,attacked:(me.atkT||0)!==window.__a0,skillsUsed:me.sk[0]>0.5||me.sk[1]>0.5,tgMe:mons.filter(m=>m.tg===uid).length})");print('t1.5',r)
        # เดินได้
        await ev("()=>{joy={ox:0,oy:0,dx:40,dy:0,t0:performance.now(),mv:1}}");await A.wait(500);await ev("()=>{joy=null}")
        print('moved',await ev("()=>Math.round(me.x-window.__x0)"))
        await A.pg.screenshot(path='../vis/rsp2.png')
        await A.wait(1600)
        r=await ev("()=>{const a0=me.atkT||0;useSkill(0);return JSON.stringify({rsp:me.rsp,skillOk:me.sk[0]>0.5})}");print('after 3s',r)
        await A.wait(1500);print('attacks resumed',await ev("()=>(me.atkT||0)>window.__a0"))
        print('ERR',[e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
