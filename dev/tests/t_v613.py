import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
T=[]
def ck(n,c,info=''):
    T.append(bool(c));print(('OK  ' if c else 'FAIL ')+n,info if not c else '',flush=True)
MOCK="try{friPoll=()=>{};friSt().L.push({n:'Ann',c:'archer',lv:50});FRIS['Ann']={t:Date.now()+1e7,c:'archer',lv:50,mp:4,u:'uAnn'}}catch(e){};GDS.g={e:'⚔️',nm:'Test',tag:'TT',lvl:2,mem:[[1,myName,'melee',75,2,1,1,0],[3,'Ann','archer',50,0,1,4,0],[4,'Cid','sup',40,0,0,0,0],[5,'Eve','assn',44,0,1,7,0]],max:20,me:1,r:2,col:0,log:[],hq:0,xp:0};"
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            for vw,vh in [(915,412),(412,915)]:
                tag=f'[{vw}x{vh}]'
                pg=await (await b.new_context(viewport={'width':vw,'height':vh},is_mobile=True,has_touch=True)).new_page()
                pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
                pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and any(k in m.text for k in ('shv','fgv','wmv','pvf')) else None)
                await pg.goto(URL);await pg.wait_for_timeout(2500)
                await pg.evaluate("()=>{window.__skw=1}");await pg.evaluate(SETUP,['melee','Tw'+str(random.randint(100,999)),75]);await pg.wait_for_timeout(2600)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;me.gold=100000;me.bag=[];for(const sl of SLOTS)me.eq[sl]=null;recalc()}")
                C=lambda sel:pg.evaluate("(s)=>{const b=document.querySelector(s);if(!b)return 'no:'+s;b.click();return 'ok'}",sel)
                # ---- shop gear
                await pg.evaluate("()=>{ov.hidden=false;shopTab='gear';shopSel=-1;shopUI()}")
                ck(tag+' shop: price under goods + sell tab',await pg.evaluate("()=>ov.querySelectorAll('.shvc small').length>=3&&!!ov.querySelector('[data-tab=\"shop:sell\"]')&&!document.querySelector('.gwsh')"))
                await C('[data-sp="0"]')
                ck(tag+' shop: detail sheet w/ compare',await pg.evaluate("()=>!!document.querySelector('.gwsh [data-buyg]')&&!!document.querySelector('.gwsh .gwcmp')"))
                n0=await pg.evaluate("()=>me.bag.length");await C('.gwsh [data-buyg]');await pg.wait_for_timeout(100)
                ck(tag+' shop: buy from sheet',await pg.evaluate("(a)=>me.bag.length===a+1",n0))
                await pg.evaluate("()=>{shopSel=stk().findIndex(x=>x);shopUI()}");cr=await C('[data-shx]');print('dbg',cr,await pg.evaluate("()=>[shopSel,document.querySelectorAll('[data-shx]').length]"));ck(tag+' shop: close sheet',await pg.evaluate("()=>!document.querySelector('.gwsh')&&shopSel===-1 && true"),await pg.evaluate("()=>[shopSel,!!document.querySelector('.gwsh'),ov.dataset.k,shopTab]"))
                # ---- sell tab
                await pg.evaluate("()=>{me.bag=[];for(let i=0;i<12;i++){const it=genItem(60,null,undefined,0);it.r=i%3;me.bag.push(it)}me.bag[0].lk=1;me.bag[1].r=3;shopTab='sell';SHV.s.clear();shopUI()}")
                ck(tag+' sell: tab renders grid + bar',await pg.evaluate("()=>ov.querySelectorAll('[data-shs]').length===12&&!!ov.querySelector('.shvbar [data-shsell][disabled]')&&ov.querySelector('.tab.on').dataset.tab==='shop:sell'"))
                await C('[data-shs="0"]');ck(tag+' sell: locked not selectable',await pg.evaluate("()=>SHV.s.size===0"))
                await C('[data-shs="2"]');ck(tag+' sell: tap selects',await pg.evaluate("()=>SHV.s.size===1&&!!ov.querySelector('.cell.shon')"))
                await C('[data-shq="r0"]');ck(tag+' sell: select up to Basic',await pg.evaluate("()=>[...SHV.s].every(it=>it.r===0||it===me.bag[2])&&SHV.s.size>=3&&!SHV.s.has(me.bag[0])"))
                g0=await pg.evaluate("()=>[me.gold,me.bag.length,SHV.s.size,[...SHV.s].reduce((a,it)=>a+sellPrice(it),0)]")
                await C('[data-shsell]');ck(tag+' sell: 10+ or Mystic needs confirm (small batch sells directly)',await pg.evaluate("(g)=>g[2]<10?me.bag.length===g[1]-g[2]:SHV.cf===1",g0))
                ck(tag+' sell: gold added exactly',await pg.evaluate("(g)=>me.gold===g[0]+g[3]",g0))
                await C('[data-shq="all"]');n=await pg.evaluate("()=>SHV.s.size");await C('[data-shsell]')
                ck(tag+' sell: Mystic → confirm first',await pg.evaluate("()=>SHV.cf===1&&me.bag.length>1"))
                await C('[data-shsell]');ck(tag+' sell: confirmed sells all but locked',await pg.evaluate("()=>me.bag.length===1&&me.bag[0].lk===1"))
                await C('[data-tab="shop:pot"]');ck(tag+' shop: other tabs still work',await pg.evaluate("()=>ov.querySelector('.tab.on').dataset.tab==='shop:pot'&&!!ov.querySelector('[data-buy]')"))
                # ---- smith
                await pg.evaluate("()=>{const it=genItem(70,null,undefined,0);it.r=4;it.u=6;it.sl=SLOTS[0];me.eq[SLOTS[0]]=it;me.inv.s1=3;smSel=null;smithUI()}")
                ck(tag+' smith: grid layout + hint',await pg.evaluate("()=>!!ov.querySelector('.fgvg .fgvl [data-smi]')&&!!ov.querySelector('.fgvr')"))
                await C('[data-smi="eq:'+await pg.evaluate("()=>SLOTS[0]")+'"]')
                ck(tag+' smith: forge panel',await pg.evaluate("()=>{const p=ov.querySelector('.fgp');return !!p&&/\\+6/.test(p.querySelector('.fgu').textContent)&&!!p.querySelector('.fgga')&&!!p.querySelector('[data-smu]')}"))
                pc=await pg.evaluate("()=>[+ov.querySelector('.fgga b').textContent.match(/(\\d+)%/)[1],Math.round(fgRate(6,0)*100)]")
                ck(tag+' smith: gauge = real rate incl. heat',pc[0]==pc[1],pc)
                await pg.evaluate("()=>{FG.quick=1}")
                u0=await pg.evaluate("()=>[me.eq[SLOTS[0]].u,me.inv.s1,me.gold]");await C('.fgp [data-smu]');await pg.wait_for_timeout(300)
                ck(tag+' smith: hammer works from panel',await pg.evaluate("(a)=>me.inv.s1===a[1]-1&&me.gold<a[2]",u0),[u0,await pg.evaluate("()=>[me.eq[SLOTS[0]].u,me.inv.s1,me.gold]")])
                ck(tag+' smith: rules folded',await pg.evaluate("()=>[...ov.querySelectorAll('details.fgvd summary')].some(s=>/กติกา/.test(s.textContent))"))
                # ---- world map
                await pg.evaluate("()=>{me.qs=[{id:'tq9',t:'kill',mp:4,n:4,h:0,g:100,xp:100}];wmUI(4)}")
                ck(tag+' wm: in-map section with merchant quest nav',await pg.evaluate("()=>!!ov.querySelector('.wmvq [data-aq=\"tq9\"]')"))
                lay=await pg.evaluate("()=>{const a=ov.querySelector('.wmsc').getBoundingClientRect(),b=ov.querySelector('.wmd').getBoundingClientRect();return [Math.round(a.right),Math.round(b.left),Math.round(a.bottom),Math.round(b.top)]}")
                ck(tag+' wm: side-by-side on landscape, stacked on portrait',(lay[0]<=lay[1]) if vw>vh else (lay[2]<=lay[3]+2),lay)
                qm=await pg.evaluate("()=>{const q=wmQuestMap();if(q)wmUI(q);return q}")
                if qm:
                    ck(tag+' wm: story row on quest map',await pg.evaluate("()=>!!ov.querySelector('[data-wmvn=\"st\"]')"))
                    await C('[data-wmvn="st"]');ck(tag+' wm: story nav starts',await pg.evaluate("()=>!!AQ&&AQ.src==='st'"))
                    await pg.evaluate("()=>{try{aqStop()}catch(e){}}")
                await pg.evaluate("()=>{ov.hidden=false;wmUI(4)}");await C('[data-aq="tq9"]');ck(tag+' wm: merchant nav starts',await pg.evaluate("()=>!!AQ&&AQ.src==='bq'"))
                await pg.evaluate("()=>{try{aqStop()}catch(e){};me.qs=[]}")
                # ---- party / guild
                await pg.evaluate("()=>{"+MOCK+"ov.hidden=false;partyUI()}")
                ck(tag+' party: invite card lists friend+guild',await pg.evaluate("()=>{const c=$('pvfc');return !!c&&/Ann/.test(c.textContent)&&/Eve/.test(c.textContent)&&!!c.querySelector('[data-pvi=\"Ann\"]')&&!/Cid/.test(c.textContent)}"))
                await pg.evaluate("()=>{window.__inv=[];const o=ptOut;window.ptOut=ptOut=function(u,k,d){__inv.push([u,k]);}}")
                await C('[data-pvi="Ann"]');ck(tag+' party: invite sends to friend uid cross-map',await pg.evaluate("()=>__inv.some(x=>x[0]==='uAnn'&&x[1]==='inv')"),await pg.evaluate("()=>__inv"))
                await pg.evaluate("()=>partyList()");ck(tag+' party: card survives list refresh',await pg.evaluate("()=>!!$('pvfc')&&/Ann/.test($('pvfc').textContent)"))
                await pg.evaluate("()=>{GDS.tab='mem';gdUI()}")
                ck(tag+' guild: invite buttons on online members',await pg.evaluate("()=>!!ov.querySelector('[data-gds=\"3\"] [data-pvi=\"Ann\"]')&&!!ov.querySelector('[data-gds=\"5\"] [data-pvx]')&&!ov.querySelector('[data-gds=\"4\"] .pvgi')&&!ov.querySelector('[data-gds=\"1\"] .pvgi')"),await pg.evaluate("()=>[...ov.querySelectorAll('[data-gds]')].map(r=>r.dataset.gds+':'+(r.querySelector('.pvgi')?r.querySelector('.pvgi').outerHTML.slice(0,60):'-'))"))
                await pg.evaluate("()=>{GDS.g=null;ov.hidden=true}")
                await pg.close()
    finally:p.terminate()
    ck('no page errors/warnings',not errs,errs[:5])
    print('SUMMARY',sum(T),'/',len(T),'ok')
asyncio.run(main())
