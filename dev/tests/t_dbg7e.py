import asyncio,random
from h import *
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        await A.ev("()=>{gmGod=true;me.sty={s:192,n:0,a:0,e:1,e4:2,p6h:2,e6:1,p7m:1,e7:1};ov.hidden=true;enterMap(32,{x:1600,y:1600})}");await A.wait(3000)
        print('m32',await A.ev("()=>[MAPS[32].n,p6Past('p7e7'),hfE7(),curMap,isDg()]"))
        print('call',await A.ev("()=>{try{hfEndWorld();return MAPS[32].n}catch(e){return 'ERR '+e.message}}"))
        print('nyx',await A.ev("()=>{let n=0;const o=drawNyxFx;window.__c=0;return String(drawNyxFx).slice(0,200)}"))
        await A.ev("()=>{hfgEnter()}");await A.wait(2500);print('in',await A.ev("()=>[curMap,HFGI(),dg.ph]"))
        await A.ev("()=>{dg={ph:'boss',w:0,tl:900,nx:0};HF.st='boss';spawnBoss();const B=mons.find(q=>q.t===3);B.x=CX;B.y=CY-300;me.x=CX+200;me.y=CY+250;window.__t=0;const o=hfgLocal;window.hfgLocal=hfgLocal=function(dt){window.__t++;return o(dt)};HFX.inh={t0:performance.now(),d:3200}}")
        for i in range(4):
            await A.wait(300);print(await A.ev("()=>[Math.round(me.x),Math.round(me.y),HFLT|0,window.__t,!!HFX.inh,me.down,dg.ph]"))
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
