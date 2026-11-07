import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
T=[]
def ck(n,c,info=''):
    T.append(bool(c));print(('OK  ' if c else 'FAIL ')+n,info if not c else '',flush=True)
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            for vw,vh in [(915,412),(412,915)]:
                tag=f'[{vw}x{vh}]'
                pg=await (await b.new_context(viewport={'width':vw,'height':vh},is_mobile=True,has_touch=True)).new_page()
                pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
                pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and any(k in m.text for k in ('gw','sws','ql','f19','mtst')) else None)
                await pg.goto(URL);await pg.wait_for_timeout(2500)
                await pg.evaluate("()=>{window.__skw=1}");await pg.evaluate(SETUP,['melee','Tv'+str(random.randint(100,999)),75]);await pg.wait_for_timeout(2600)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;me.bag=[];for(const sl of SLOTS)me.eq[sl]=null;recalc()}")
                C=lambda sel:pg.evaluate("(s)=>{const b=document.querySelector(s);if(!b)return 'no:'+s;b.click();return 'ok'}",sel)
                # 1 mounts
                await pg.evaluate("()=>{me.lv=170;me.gold=1e9;mountUI(undefined,true)}");await pg.wait_for_timeout(150)
                m=await pg.evaluate("()=>({buy:[...ov.querySelectorAll('[data-mtb]')].map(b=>+b.dataset.mtb),st:[...ov.querySelectorAll('button')].filter(b=>/จบภาค/.test(b.textContent)).map(b=>b.textContent)})")
                ck(tag+' mount: story mounts not buyable',not any(i in m['buy'] for i in (7,8,9)) and '📜 จบภาค 9' in m['st'] and '📜 จบภาค 10' in m['st'],m)
                r=await pg.evaluate("()=>{mountBuy(8);return ov.querySelector('.note')?ov.querySelector('.note').textContent:''}")
                ck(tag+' mount: correct chapter message',('ภาค 9' in r),r)
                await pg.evaluate("()=>{me.lv=75;me.gold=5000}")
                # 4 gear
                await pg.evaluate("()=>{for(let i=0;i<4;i++){const it=genItem(70,null,undefined,0);it.sl=SLOTS[i%SLOTS.length];me.bag.push(it)};gsel=null;GWV.t='eq';gearUI()}")
                ck(tag+' gear: new layout',await pg.evaluate("()=>!!ov.querySelector('.gwtb')&&!!ov.querySelector('.gwg .gwl [data-gp^=\"eq:\"]')&&!!ov.querySelector('.gwg [data-gs]')&&!ov.querySelector('.gwsh')"))
                ck(tag+' gear: no horizontal overflow',await pg.evaluate("()=>{const P=ov.querySelector('.pn');return P.scrollWidth<=P.clientWidth+2}"))
                sl=await pg.evaluate("()=>me.bag[0].sl")
                await C(f'[data-gp="eq:{sl}"]')
                ck(tag+' gear: empty slot filters bag',await pg.evaluate("(s)=>gearSel===s&&[...ov.querySelectorAll('[data-gp^=\"bag:\"]')].every(b=>me.bag[+b.dataset.gp.slice(4)].sl===s)",sl))
                await pg.evaluate("()=>{gearSel='all';gearUI()}")
                await C('[data-gp="bag:0"]');await pg.wait_for_timeout(100)
                ck(tag+' gear: detail sheet opens with compare row',await pg.evaluate("()=>!!document.querySelector('.gwsh .det [data-eq]')&&!!document.querySelector('.gwsh .gwcmp')"))
                n0=await pg.evaluate("()=>me.bag.length");await C('.gwsh [data-eq]');await pg.wait_for_timeout(100)
                ck(tag+' gear: equip from sheet',await pg.evaluate("(a)=>me.bag.length===a-1&&!!me.eq[me.bag.length>=0?Object.keys(me.eq).find(k=>me.eq[k]):'']",n0))
                await C('[data-gwx]');ck(tag+' gear: close sheet',await pg.evaluate("()=>!document.querySelector('.gwsh')&&gsel===null"))
                it=await pg.evaluate("()=>{const it=genItem(70,null,undefined,0);it.sl=Object.keys(me.eq).find(k=>me.eq[k]);me.bag.push(it);gsel='bag:'+(me.bag.length-1);gearUI();return 1}")
                ck(tag+' gear: compare shows equipped item',await pg.evaluate("()=>{const c=document.querySelector('.gwsh .gwcmp');return !!c&&c.textContent.indexOf('ใส่อยู่')>=0&&!!c.querySelector('.cell')}"))
                g0=await pg.evaluate("()=>me.gold");cr=await C('.gwsh [data-sell]');ck(tag+' gear: sell from sheet',await pg.evaluate("(g)=>me.gold>g&&!document.querySelector('.gwsh')",g0),[cr,await pg.evaluate("()=>[me.gold,gsel,!!document.querySelector('.gwsh'),document.querySelector('.gwsh .bt')&&document.querySelector('.gwsh .bt').innerHTML.slice(0,300)]"),g0])
                await C('[data-gwt="goods"]');ck(tag+' gear: goods tab',await pg.evaluate("()=>!ov.querySelector('.gwg')&&[...ov.querySelectorAll('.card .cap')].some(c=>/ของใช้/.test(c.textContent))"))
                await C('[data-gwt="eq"]');ck(tag+' gear: autosell folded',await pg.evaluate("()=>!!ov.querySelector('details.gwas [data-asl]')"))
                await pg.evaluate("()=>{GWV.off=1;gearUI()}");ck(tag+' gear: off switch',await pg.evaluate("()=>!ov.querySelector('.gwtb')"));await pg.evaluate("()=>{GWV.off=0}")
                # 5 stats
                await pg.evaluate("()=>{charTab='ab';treeUI()}")
                ck(tag+' stat: layout',await pg.evaluate("()=>!!ov.querySelector('.swsg .swsl .sk2top')&&ov.querySelectorAll('.swsg .swsr .ab2').length>=4"))
                await C('.ab2 [data-ab="str"]') if await pg.evaluate("()=>!!document.querySelector('.ab2 [data-ab=\"str\"]')") else await C('.ab2 .bs button')
                await pg.wait_for_timeout(60)
                ck(tag+' stat: changed totals flash with delta',await pg.evaluate("()=>{const c=ov.querySelector('.sk2top .ch.swup em');return !!c&&/^\\+/.test(c.textContent)}"))
                ck(tag+' stat: clicked row highlighted',await pg.evaluate("()=>!!ov.querySelector('.ab2.swhit')"))
                await pg.evaluate("()=>{charTab='tr';treeUI()}");ck(tag+' skill tab still new window',await pg.evaluate("()=>!!ov.querySelector('.skw')&&!ov.querySelector('.swsg')"))
                # 6 quests
                await pg.evaluate("()=>{QLV.t='st';questUI()}")
                ck(tag+' quest: tabs + story card',await pg.evaluate("()=>ov.querySelectorAll('.qltb [data-qlt]').length>=3&&!!ov.querySelector('[data-qln=\"st\"]')"))
                await C('[data-qln="st"]');await pg.wait_for_timeout(200)
                ck(tag+' quest: navigate starts auto quest',await pg.evaluate("()=>!!AQ&&AQ.src==='st'&&ov.hidden"))
                await pg.evaluate("()=>{ov.hidden=false;questUI()}");await C('[data-qln="st"]')
                ck(tag+' quest: navigate again stops',await pg.evaluate("()=>!AQ"))
                await pg.evaluate("()=>{me.qs=board().slice(0,2).map(q=>Object.assign({},q,{h:0}));QLV.t='bq';questUI()}")
                ck(tag+' quest: merchant tab rows',await pg.evaluate("()=>ov.querySelectorAll('[data-aq]').length===2&&ov.querySelectorAll('[data-qx]').length===2"))
                await C('[data-qx]');ck(tag+' quest: cancel works',await pg.evaluate("()=>me.qs.length===1&&!!ov.querySelector('.qltb')"))
                await pg.evaluate("()=>{const q=me.qs[0];q.h=q.n;questUI()}");g0=await pg.evaluate("()=>me.gold")
                ck(tag+' quest: claim dot',await pg.evaluate("()=>!!ov.querySelector('[data-qlt=\"bq\"] .qdot')"))
                cr=await C('[data-qc]');ck(tag+' quest: claim reward',await pg.evaluate("(g)=>me.qs.length===0&&me.gold>g",g0),[cr,await pg.evaluate("()=>[me.qs.length,me.gold]"),g0])
                await C('[data-qlt="bty"]');ck(tag+' quest: bounty tab',await pg.evaluate("()=>!!ov.querySelector('[data-qlo=\"bty\"]')"))
                await C('[data-qlo="bty"]');ck(tag+' quest: open bounty board',await pg.evaluate("()=>ov.dataset.k==='bty'"))
                # 3 map 19
                await pg.evaluate("()=>{ov.hidden=true;enterMap(19,{x:MAPS[19].sx||1600,y:MAPS[19].sy||1600});try{me.x=FORT.x;me.y=FORT.y+120}catch(e){}}");await pg.wait_for_timeout(2500)
                ck(tag+' map19: beacon draws without error',await pg.evaluate("()=>curMap===19"))
                await pg.close()
    finally:p.terminate()
    ck('no page errors/warnings',not errs,errs[:5])
    print('SUMMARY',sum(T),'/',len(T),'ok')
asyncio.run(main())
