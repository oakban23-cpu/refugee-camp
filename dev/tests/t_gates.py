import asyncio,random,json,os
from h import *
OUT='../p6/gates';os.makedirs(OUT,exist_ok=True)
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'G'+str(random.randint(100,999)),'melee',99)
        L=await A.ev("""()=>{gmGod=true;window.DNH=12;me.sty={s:STY.length,n:0,a:0,e:1,e4:2,p6h:2,e6:1,p7m:1,e7:1,p6b:7};setInterval(()=>{mons=[];FQ.avg=0;LOWQ=false;try{if(SD.on)stClose()}catch(e){}},200);
          const o=[];for(const k in MAPS){const id=+k;if(id<1||id>40)continue;(MAPS[id].gates||[]).forEach((G,gi)=>{if(G.alias)return;o.push([id,gi,G.to,G.x,G.y,G.nm||(MAPS[G.to]&&MAPS[G.to].n)||''])})}return o}""")
        print(len(L))
        res=[]
        for id,gi,to,x,y,nm in L:
            await A.ev(f"()=>{{ov.hidden=true;enterMap({id},{{x:{x},y:{y}+150}})}}");await A.wait(1600)
            info=await A.ev(f"()=>{{const G=MAPS[{id}].gates[{gi}];me.x={x};me.y={y}+150;PALG.card=null;banner=null;return [gHid(G)?1:0]}}")
            await A.wait(700)
            fn=f'{OUT}/g_{id}_{gi}.png';await A.pg.screenshot(path=fn,clip={'x':40,'y':160,'width':310,'height':330})
            res.append([id,gi,to,x,y,nm,info[0]]);print(id,gi,to,nm,info,flush=True)
        json.dump(res,open('../gates.json','w'),ensure_ascii=False)
        await b.close()
    p.terminate()
asyncio.run(main())
