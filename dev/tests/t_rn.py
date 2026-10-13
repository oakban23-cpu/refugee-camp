import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Alpha', 'mage'); B = await new_client(b, 'Bravo', 'melee')
        for c in (A,B): await c.ev("()=>{ov.hidden=true;enterMap(2,{x:1500,y:1500});}")
        await A.wait(3000)
        H,O=(A,B) if await A.ev("()=>isHost()") else (B,A)
        print('O cls',await O.ev("()=>me.cls"))
        await H.ev("()=>{me.x=1300;me.y=1300;mons=mons.filter(m=>Math.hypot(m.x-1500,m.y-1500)>500);for(let i=0;i<3;i++){const x=1500+120+i*20,y=1500+40,hp=1e7;mons.push({id:++mid,x,y,tx:x,ty:y,t:0,L:20,p:1,hx:x,hy:y,hp,mh:hp,tg:null,tt:0,ac:99,w:null,lg:0,tzb:1,shb:1,szb:1,elb:1,root:99})}}")
        await O.ev("()=>{me.x=1500;me.y=1500;gmGod=true}");await O.wait(2500)
        if await O.ev("()=>me.cls")!='melee':
            print('skip: O not melee');
        before=await H.ev("()=>mons.filter(m=>m.hp>9e6).map(m=>Math.round(Math.hypot(m.x-1500,m.y-1500)))")
        await O.ev("()=>{const S=rnSt();S.u.m0b=1;S.e[0]='b';me.sk=[0,0,0,0,0];me.mp=me.mm;useSkill0(0)}");await O.wait(1500)
        after=await H.ev("()=>mons.filter(m=>m.hp>9e5).map(m=>[Math.round(Math.hypot(m.x-1500,m.y-1500)),Math.round(m.hp)])")
        print('dist before',before,'after',after)
        for c in (A,B):print(c.name,[e for e in c.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
