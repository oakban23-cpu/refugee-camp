import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        await A.ev("()=>{gmGod=true;ov.hidden=true;setInterval(()=>{FQ.avg=0;LOWQ=false},50);const M=MAPS[13];const n=(M.nests||[])[0]||[M.sx,M.sy];enterMap(13,{x:n[0]+60,y:n[1]+60})}");await A.wait(3000)
        await A.ev("()=>{const L=mons.filter(m=>m.t<3&&m.hp>0).slice(0,14);L.forEach((m,i)=>{m.x=me.x-200+(i%7)*65;m.y=me.y-60+Math.floor(i/7)*70;m.tg=null});window.__L=L}");await A.wait(400)
        for rnd in range(2):
          for ol in (0,1):
            r=await A.ev(f"()=>{{U58.olm={ol};MLB.cap=12;__L.forEach((m,i)=>{{m.x=me.x-200+(i%7)*65;m.y=me.y-60+Math.floor(i/7)*70}});const t0=performance.now();for(let i=0;i<40;i++)draw();return +((performance.now()-t0)/40).toFixed(2)}}")
            print('outline',ol,'ms/frame',r,flush=True)
        print('cap',await A.ev("()=>MLB.cap"),'errs',[e for e in A.errs if 'TUNNEL' not in e][:3])
        await b.close()
    p.terminate()
asyncio.run(main())
