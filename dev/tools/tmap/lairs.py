import asyncio,sys,json,math
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
async def main():
    p=start_server()
    out={}
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':390,'height':844})
        pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,['melee','cap',140]);await pg.wait_for_timeout(1000)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
        maps=await pg.evaluate("()=>Object.keys(WMLV).map(Number).filter(k=>k!==1&&MAPS[k])")
        print(maps)
        for m in maps:
            r=await pg.evaluate("""(m)=>{enterMap(m,{x:MAPS[m].sx,y:MAPS[m].sy});try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;
              const M=MAPS[m],P=[];for(let i=0;i<90;i++){const n0=mons.length;try{spawnPack()}catch(e){return {err:String(e)}}const nw=mons.slice(n0).filter(q=>q.p&&q.hx!==undefined);if(nw.length)P.push([Math.round(nw[0].hx),Math.round(nw[0].hy),nw[0].L])}
              mons.length=0;return {P,sx:M.sx,sy:M.sy,gates:(M.gates||[]).map(G=>[G.x,G.y]),boss:M.boss?[M.boss.x,M.boss.y]:null,nests:M.nests||[],hub:!!M.hub,dg:!!M.dg,mvp:!!M.mvpOnly,n:M.n}}""",m)
            out[m]=r
            print(m,r.get('n'),len(r.get('P',[])),r.get('err',''),flush=True)
        print('errs',E[:5])
    finally: p.terminate()
    json.dump(out,open('lairs_raw.json','w'),ensure_ascii=False)
asyncio.run(main())
