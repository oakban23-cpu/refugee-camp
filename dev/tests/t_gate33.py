import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'melee',99)
        r=await A.ev("""()=>{gmGod=true;const i=STY.findIndex(x=>x.g==='map'&&x.m===33&&x.c===STCH.indexOf('ภาค 6 · บทสุดท้าย · หลุมหัวใจว่าง'));me.sty={s:i,n:0,a:1,e:1,e4:2,p6h:2};ov.hidden=true;enterMap(32,{x:1600,y:1600});return [i,stTxt()]}""")
        print(r);await A.wait(3000)
        print(await A.ev("""()=>{const G=MAPS[32].gates.find(g=>g.to===33);return JSON.stringify({G,hid:gHid(G),route:(aqRoute(33)||[]).map(g=>g.to),aq:JSON.stringify(typeof stAq==='function'?stAq():null),inW:typeof arIn==='function'?[arIn(G.x,G.y),arIn(G.x,G.y-80),arIn(2120,2800)]:'na',WH})}"""))
        await A.ev("()=>{me.x=2120;me.y=2600;window.__cz=camZoomT;window.camZoomT=()=>.85}");await A.wait(6000)
        print('qtap',await A.ev("()=>{let r=null;try{r=JSON.stringify(aqTarget?aqTarget():null)}catch(e){r='x'}return r}"))
        print('pos after',await A.ev("()=>[Math.round(me.x),Math.round(me.y)]"))
        await A.ev("()=>{window.camZoomT=window.__cz}")
        await A.ev("()=>{me.x=2120;me.y=2790;useGate()}");await A.wait(3500)
        print('after step',await A.ev("()=>[curMap,stTxt()]"))
        await A.ev("()=>{me.x=1600;me.y=180;useGate()}");await A.wait(3500)
        print('back',await A.ev("()=>[curMap,Math.round(me.x),Math.round(me.y)]"));await A.wait(2500);print('stay',await A.ev("()=>curMap"))
        await b.close()
    p.terminate()
asyncio.run(main())
