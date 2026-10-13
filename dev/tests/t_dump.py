import asyncio,random,sys,json
from h import *
from playwright.async_api import async_playwright
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        out={}
        for m in [1,2,3,4,5,6,7,8,10,11]:
            await A.ev(f"()=>{{gmGod=true;ov.hidden=true;enterMap({m},{{x:MAPS[{m}].sx,y:MAPS[{m}].sy}})}}");await A.wait(1800)
            d=await A.ev("""()=>{const M=MAPS[curMap];const L=(typeof LMS!=='undefined'&&LMS[curMap])?lmList(curMap).map(q=>[q.x|0,q.y|0,q.t,LMT[q.t].r]):[];
             return {n:M.n,sx:M.sx,sy:M.sy,sr:M.sr,gates:M.gates.map(G=>[G.x,G.y,G.to]),boss:[M.boss.x,M.boss.y],nests:M.nests,npc:[M.npc,M.npc2,M.npc3,M.npc4,M.npc5,M.npc6].filter(Boolean).map(n=>[n.x,n.y]),lm:L,
               trees:trees.filter(t=>!t.inv).map(t=>[t.x|0,t.y|0,t.r|0]),fsw:(typeof FSW!=='undefined'?FSW.map(w=>[w.x,w.y,w.rx,w.ry]):[]),prp:PRP?{b:PRP.b.map(q=>[q.x|0,q.y|0]),g:PRP.g.map(q=>[q.x|0,q.y|0,q.r|0]),s:PRP.s.map(q=>[q.x|0,q.y|0]),sh:PRP.sh.map(q=>[q.x|0,q.y|0])}:null}}""")
            out[m]=d
        json.dump(out,open('../dep/maps.json','w'))
        await b.close()
    p.terminate()
asyncio.run(main())
