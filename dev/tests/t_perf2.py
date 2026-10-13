import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Pf'+str(random.randint(1000,9999)), 'mage', 90)
        await A.ev("()=>{gmGod=true;me.x=1450;me.y=2420}")
        await A.wait(1000)
        r=await A.ev("""()=>{const out={};for(const lq of [false,true]){LOWQ=lq;fxs=[];const L=['u3sw','u3bh','u3dk','u3tp','u3yl','u3bd'];L.forEach((k,i)=>{const a=i*1.047;handleFx({k,x:Math.round(me.x+Math.cos(a)*120),y:Math.round(me.y+Math.sin(a)*90),r:200,u:uid,by:'zz'+i})});
              ['s6sw','s6rg','s6bw','s6ob'].forEach(k=>handleFx({k,x:me.x,y:me.y,r:k==='s6rg'?140:60,u:uid,len:6,by:'yy'}));
              fxs.forEach(f=>f.t=f.d*.5);let t0=performance.now();for(let i=0;i<30;i++){g.save();fxs.forEach(f=>drawFx(f));g.restore()}out[lq?'low':'high']=+((performance.now()-t0)/30).toFixed(2);
              t0=performance.now();for(let i=0;i<30;i++){g.save();drawFx(fxs.find(f=>f.k==='u3sw'));g.restore()}out[(lq?'low':'high')+'_one']=+((performance.now()-t0)/30).toFixed(2)}LOWQ=false;fxs=[];return out}""")
        print('ms per frame for 6 ults + 4 s6 fx:',r)
        await b.close()
    p.terminate()
asyncio.run(main())
