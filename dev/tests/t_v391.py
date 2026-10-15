import asyncio,os,json
from h import *
SP='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Alpha','mage',60);B=await new_client(b,'Bravo','sup',60)
        for c,dx in ((A,0),(B,40)):await c.ev(f"()=>{{enterMap(1,{{x:{1600+dx},y:1750}});ov.hidden=true}}")
        await A.wait(2500)
        print('GOODS has gt',await A.ev("()=>GOODS.filter(o=>GTI[o.k]).map(o=>o.k).join(',')"))
        await A.ev("()=>{gtAdd('o2',30);gtAdd('gm',4);gtAdd('rt',3)}")
        # ---- trade gathering mats A->B
        u=await B.ev("()=>uid")
        await A.ev(f"()=>trStartReq('{u}')");await A.wait(1500)
        await B.ev("()=>trAccept()");await B.wait(1200)
        await A.ev("()=>{trGoods('o2',1);for(let i=0;i<9;i++)trGoods('o2',1);trGoods('gm',1)}");await A.wait(800)
        print('B sees',await B.ev("()=>tr&&tr.th.gd"))
        await A.ev("()=>trLock()");await B.ev("()=>trLock()");await A.wait(800)
        await A.ev("()=>trConfirm()");await B.ev("()=>trConfirm()");await A.wait(2500)
        print('after trade A',await A.ev("()=>[gtHas('o2'),gtHas('gm')]"),'B',await B.ev("()=>[gtHas('o2'),gtHas('gm')]"))
        # ---- grind
        sh0=await A.ev("()=>rnSt().sh|0")
        r=await A.ev("()=>{GTTAB='sm';gtUI();return gtMake(GTSM,'rgr',5)}")
        print('grind',r,'shards',sh0,'->',await A.ev("()=>rnSt().sh|0"),'rt left',await A.ev("()=>gtHas('rt')"))
        await A.ev("()=>{GTTAB='sm';gtUI()}");await A.wait(300)
        print('grind btn',await A.ev("()=>[...ov.querySelectorAll('[data-gtm=\"rgg\"]')].map(b=>b.textContent)"))
        # ---- dismantle support runes
        await A.ev("()=>{const X=sgSt();X.i.echo=(X.i.echo|0)+3;const r=Object.keys(SGD).find(id=>SGD[id][3]==='rare');X.i[r]=2;window.__r=r;SGTAB='sup';runeUI()}");await A.wait(400)
        n=await A.ev("()=>ov.querySelectorAll('[data-sgdx]').length");sh1=await A.ev("()=>rnSt().sh|0")
        await A.ev("()=>ov.querySelector('[data-sgdx=\"'+window.__r+'\"]').click()");await A.wait(300)
        print('dismantle btns',n,'shards',sh1,'->',await A.ev("()=>rnSt().sh|0"),'rare left',await A.ev("()=>sgSt().i[window.__r]"),'btn after',await A.ev("()=>!!ov.querySelector('[data-sgdx=\"'+window.__r+'\"]')"),await A.ev("()=>(ov.querySelector('.note')||{}).textContent"))
        await A.pg.screenshot(path=SP+'v391_dis.png')
        # ---- goods card cells
        await A.ev("()=>{const S=fsSt();S.c[Object.keys(FISH)[0]]=7;S.c[Object.keys(FISH).find(id=>FISH[id].r===3)]=1;S.f.grill=2;S.f.sushi=1;me.rbq={sh:2}}")
        for k in ['xgfs','xgfd','xgrb','o2','rnsh']:
            t=await A.ev(f"()=>{{invTab='goods';gdSel='{k}';try{{invUI()}}catch(e){{}};const d=document.createElement('div');d.innerHTML=goodsCard('{k}');return d.querySelector('.note').innerText.replace(/\\n/g,' ').slice(0,230)}}")
            print(k,'::',t)
        await A.ev("()=>{ov.hidden=false;ov.dataset.k='x';ov.innerHTML='<div class=\"pn\">'+goodsCard('xgfs')+'</div>'}");await A.wait(300)
        await A.pg.screenshot(path=SP+'v391_goods.png')
        print('errs',[e for e in A.errs+B.errs if 'TUNNEL' not in e][:4])
    finally:
        p.terminate()
asyncio.run(main())
