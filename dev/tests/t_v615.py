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
            pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            pg.on('console',lambda m:errs.append(m.text[:200]) if m.type in('warning','error') and ('twa' in m.text or '404' in m.text) else None)
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','Ta'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;me.twCp=91;twCreate(1)}");await pg.wait_for_timeout(3000)
            ck('atlas loaded + 172 sprites (40 new pillars)',await pg.evaluate("()=>TWAR.ok===1&&Object.keys(TWAR.f).length===172&&Object.keys(TWAR.f).filter(k=>k[0]==='q').length===40"))
            for f,ti in [(5,0),(33,3),(63,6),(95,9)]:
                await pg.evaluate(f"()=>{{dg.ph='lobby';TWCL=null;twBegin({f})}}");await pg.wait_for_timeout(1200)
                r=await pg.evaluate(f"()=>{{const o=TWAR.fl[{ti}];window.__c=0;const dI=g.drawImage;g.drawImage=function(){{if(arguments[0]===(o&&o.img))__c++;return dI.apply(this,arguments)}};twaGround();g.drawImage=dI;return [o&&o.ok,__c]}}")
                ck(f'floor {f}: theme image loaded + drawn',r==[1,1],r)
            ck('decor cleared inside arena',await pg.evaluate("()=>decor.every(d=>Math.hypot(d.x-CX,d.y-CY)>=DR-10)"))
            ck('pillars use new pillar sprites',await pg.evaluate("()=>{const t=trees.find(t=>!t.k&&!t.inv);const ks=[];const p=twaPut;window.twaPut=twaPut=function(k){ks.push(k);return p.apply(this,arguments)};const r=twaPillar(t);twaPut=p;window.twaPut=p;return r===true&&ks.length===1&&ks[0][0]==='q'}"))
            await pg.evaluate("()=>{mons=[];dg.ph='clear';dg.nx=99;me.x=CX;me.y=CY+300}");await pg.wait_for_timeout(600)
            ck('stairs gate sprite draws',await pg.evaluate("()=>{let n=0;const p=twaPut;window.twaPut=twaPut=function(k){if(k==='s_1'||k==='s_2')n++;return p.apply(this,arguments)};drawTwStairs();twaPut=p;window.twaPut=p;return n===1}"))
            await pg.evaluate("()=>{dg.ph='lobby';TWCL=null;twBegin(4)}");await pg.wait_for_timeout(2600)
            ck('card shows floor-type icon image',await pg.evaluate("()=>!!document.querySelector('#twcard .k4 img')"))
            await pg.evaluate("()=>{ov.hidden=false;twEnterUI()}")
            ck('enter UI tower background',await pg.evaluate("()=>/hd-twp/.test(ov.querySelector('.twvt').style.backgroundImage)"))
            await pg.evaluate("()=>{HDI.on=false;ov.hidden=true}")
            ck('HD off → old pillars/floor',await pg.evaluate("()=>{const t=trees.find(t=>!t.k&&!t.inv);return twaPillar(t)===false&&!twaOn()}"))
            await pg.evaluate("()=>{HDI.on=true;TWAR.off=1}");ck('off switch',await pg.evaluate("()=>!twaOn()"))
            await pg.evaluate("()=>{TWAR.off=0}")
            ck('non-tower map unaffected',await pg.evaluate("()=>{const c=curMap;return isTw()}"))
    finally:p.terminate()
    ck('no page errors',not errs,errs[:5])
    print('SUMMARY',sum(T),'/',len(T),'ok')
asyncio.run(main())
