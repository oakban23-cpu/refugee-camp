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
                pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and 'twv' in m.text else None)
                await pg.goto(URL);await pg.wait_for_timeout(2500)
                await pg.evaluate(SETUP,['mage','Tt'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;me.twCp=41;me.twBest=47;me.twc=230}")
                ck(tag+' 10 themes by decade',await pg.evaluate("()=>twvT(1)[0]==='ประตูหินโบราณ'&&twvT(10)[0]==='ประตูหินโบราณ'&&twvT(11)[0]==='ห้องสมุดวิญญาณ'&&twvT(100)[0]==='บัลลังก์ห้วงความว่าง'&&twvT(101)[0]==='ประตูหินโบราณ'"))
                await pg.evaluate("()=>{twEnterUI()}")
                r=await pg.evaluate("()=>({b:ov.querySelectorAll('.twvb').length,lk:ov.querySelectorAll('.twvb.lk').length,done:ov.querySelectorAll('.twvb.done').length,cur:ov.querySelectorAll('.twvb.cur').length,st:[...ov.querySelectorAll('.twvb [data-twc]')].map(b=>+b.dataset.twc).sort((a,b)=>a-b),join:!!$('twjoin')&&!!$('twcode'),main:+ov.querySelector('.twvw .card [data-twc]').dataset.twc})")
                ck(tag+' enter: tower bands',r['b']==10 and r['lk']==5 and r['done']==4 and r['cur']==1 and r['st']==[1,11,21,31,41] and r['join'] and r['main']==41,r)
                ck(tag+' enter: no overflow',await pg.evaluate("()=>{const P=ov.querySelector('.pn');return P.scrollWidth<=P.clientWidth+2}"))
                await pg.evaluate("()=>{document.querySelector('[data-twvshop]').click()}");ck(tag+' enter: shop button',await pg.evaluate("()=>ov.dataset.k==='tws'"))
                await pg.evaluate("()=>{twEnterUI();document.querySelector('.twvb [data-twc=\"31\"]').click()}");await pg.wait_for_timeout(2500)
                ck(tag+' enter: band start creates room at floor 31',await pg.evaluate("()=>isTw()&&twSF(curMap)===31"),await pg.evaluate("()=>[curMap,isTw()]"))
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};dg.ph='lobby';TWCL=null;twBegin(33)}");await pg.wait_for_timeout(2400)
                c=await pg.evaluate("()=>{const e=$('twcard');return e?[e.classList.contains('on'),e.textContent]:null}")
                ck(tag+' card: floor + theme + type',c and c[0] and 'ชั้น 33' in c[1] and 'โรงหลอมลาวา' in c[1],c)
                ck(tag+' theme palette applied',await pg.evaluate("()=>MAPS[curMap].tile===TWV.T[3][3].tile&&/โรงหลอมลาวา/.test(MAPS[curMap].n)"))
                await pg.wait_for_timeout(3000);ck(tag+' card hides',await pg.evaluate("()=>!$('twcard').classList.contains('on')"))
                ck(tag+' progress bar draws',await pg.evaluate("()=>{try{twvBar(W/2,60);return true}catch(e){return String(e)}}"))
                await pg.evaluate("()=>{dg.ph='lobby';TWCL=null;twBegin(40)}");await pg.wait_for_timeout(2400)
                ck(tag+' boss card style',await pg.evaluate("()=>$('twcard').classList.contains('boss')&&/ชั้นบอส/.test($('twcard').textContent)"))
                await pg.evaluate("()=>{TWV.off=1;dg.ph='lobby';twBegin(41);ov.hidden=false;twEnterUI()}");await pg.wait_for_timeout(400)
                ck(tag+' off switch → old UI',await pg.evaluate("()=>!ov.querySelector('.twvw')&&!!ov.querySelector('[data-twc]')"))
                await pg.close()
    finally:p.terminate()
    ck('no page errors/warnings',not errs,errs[:5])
    print('SUMMARY',sum(T),'/',len(T),'ok')
asyncio.run(main())
