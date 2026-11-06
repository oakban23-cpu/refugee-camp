import asyncio, sys, random, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
OUT=S+'v606/close/';os.makedirs(OUT,exist_ok=True)
MAPS=[28,29,40,41,43,45,31,35,38,44,5,11,12,16,17,20,21,22,25,26]
CHK=r"""(mp)=>{const bad=[],used=[];const ks=Object.keys(GPA.k).filter(k=>GPA.k[k][0]===mp&&GPA.k[k][4]>=4);
  for(const k of ks){const L=trees.filter(t=>t.k===k);if(!L.length){bad.push('none:'+k);continue}const S=GPA.sets[GPA.k[k][4]];if(S.ok!==1)bad.push('img:'+k+S.ok);
    for(const t of L.slice(0,3)){try{PALK[k](t,1.5);if(t._gp)used.push(k)}catch(e){bad.push('err:'+k+':'+e.message)}}}
  const kj=trees.find(t=>t.k==='kjunk'&&(t.v|0)!==0);if(kj){PALK.kjunk(kj,1);if(kj._gp)bad.push('kjunk v'+kj.v+' used sprite')}
  return {n:ks.length,used:[...new Set(used)].length,bad}}"""
async def main():
    p = start_server();errs=[];fails=0
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch()
            pg = await (await b.new_context(viewport={'width': 700, 'height': 500})).new_page()
            pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
            await pg.goto(URL); await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP, ['mage', 'Tv' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
            for mp in MAPS:
                await pg.evaluate(f"()=>{{window.DNH=12;gmGod=true;AUTO.on=false;HDI.on=true;LOWQ=false;enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(1500)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
                for i in range(10):
                    r=await pg.evaluate(CHK,mp)
                    if not any(x.startswith('img:') for x in r['bad']):break
                    await pg.wait_for_timeout(500)
                ok=not r['bad'] and r['used']==r['n'];fails+=not ok
                print('OK ' if ok else 'BAD', mp, r, flush=True)
            # close-ups with story stubs
            for mp,k,stub in [(31,'mgate',0),(31,'meda',0),(31,'mstage',1),(43,'pasign',0),(29,'pthr',0),(28,'gcol',0),(26,'u13vent',0),(40,'q9gear',0),(44,'pbtrunk',1),(45,'pzpod',0)]:
                await pg.evaluate(f"()=>{{enterMap({mp},{{x:MAPS[{mp}].sx||1600,y:MAPS[{mp}].sy||1600}})}}"); await pg.wait_for_timeout(2500)
                await pg.evaluate("([k,st])=>{try{let q=0;while(SD.on&&q<80){stNext();q++}stClose()}catch(e){};const L=trees.filter(t=>t.k===k);const t=L[Math.floor(L.length/2)];me.x=t.x+(k==='pthr'?30:60);me.y=t.y+(k==='pthr'?20:90);ov.hidden=true;banner=null;try{mons.length=0}catch(e){};document.body.classList.add('csm');if(st){window.__pa=me.sty.pa2j;me.sty.pa2j=31}}",[k,stub])
                await pg.wait_for_timeout(1000)
                await pg.screenshot(path=f'{OUT}{k}.jpg', type='jpeg', quality=80)
                await pg.evaluate("()=>{document.body.classList.remove('csm');if(window.__p6){me.sty.pa2j=window.__pa;window.__p6=null}}")
    finally:
        p.terminate()
    print('PAGEERR',errs[:10]);print('FAILS',fails)
asyncio.run(main())
