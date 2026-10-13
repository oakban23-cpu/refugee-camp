import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'L6'+str(random.randint(1000,9999)), 'sup', 70)
        await A.ev("()=>{gmGod=true;me.rb=1;me.rbC2={br:2,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=2;applyBr();me.x=1450;me.y=2420}")
        await A.wait(2500)
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        r=await A.ev("""()=>{let best=null,bn=0;mons.forEach(m=>{if(m.hp<=0||m.t===3)return;const n=mons.filter(q=>q.hp>0&&Math.hypot(q.x-m.x,q.y-m.y)<220).length;if(n>bn){bn=n;best=m}});if(!best)return 'none';mons.forEach(m=>{m.hp=m.mh=1e7});me.x=best.x-90;me.y=best.y;lockId=best.id;me.mp=999;useSkill(5);return [bn,S6.ln&&[...S6.ln.ids].length]}""")
        print(r)
        await A.wait(700)
        print(await A.ev("()=>{const f=fxs.find(f=>f.k==='s6ln');return f?[f.t,JSON.stringify(f.pts),f.pts.map(q=>!!mons.find(m=>m.id===q[0])),Math.round(me.x),Math.round(me.y),Math.round(f.x),Math.round(f.y)]:'nofx'}"))
        await A.ev("()=>{banner=null;dn=[]}")
        await A.pg.screenshot(path='../fx/s6_sup2.png',clip={'x':20,'y':222,'width':350,'height':350})
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
