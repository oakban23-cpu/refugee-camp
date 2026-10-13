import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'R'+str(random.randint(1000,9999)), 'melee', 99)
        for mp,x,y in [(27,1600,1600),(28,1600,1950)]:
            await A.ev(f"()=>{{gmGod=true;me.sty={{s:110,n:0,a:1,e:1,e4:1}};ov.hidden=true;enterMap({mp},{{x:{x},y:{y}}})}}");await A.wait(2500);await A.ev(f"()=>{{gmGod=true;me.x={x};me.y={y}}}");await A.wait(300)
            await A.ev(f"()=>{{mons=[];me.hp=me.mh;const L=110;for(const t of [1,1,2,0]){{const a=Math.random()*6.28,px=me.x+Math.cos(a)*200,py=me.y-120+Math.sin(a)*120,hp=mhp(t,L);mons.push({{id:++mid,x:px,y:py,tx:px,ty:py,t,L,p:1,hx:px,hy:py,hp,mh:hp,tg:null,tt:0,ac:0,w:null,lg:0}})}}}}");
            print('pos',await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"))
            seen=0
            for i in range(12):
                await A.wait(400);r=await A.ev("()=>[MPS.length,MPV.length,MPV.map(p=>p.kd).join(',')]")
                seen=max(seen,r[1])
                if mp==27: print(i,await A.ev("()=>[Math.round(me.x),Math.round(me.y),me.down,SD.on,curMap]"))
                if r[1]>=2 and i>4: await A.pg.screenshot(path=f'../fx/rng_{mp}.png')
            print(mp,'maxvis',seen,await A.ev("()=>[me.hp,me.mh,mons.map(m=>m.t+':'+Math.round(Math.hypot(m.x-me.x,m.y-me.y))).join(' ')]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:4])
        await b.close()
    p.terminate()
asyncio.run(main())
