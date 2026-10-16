import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0].replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0},30);")
SH='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.goto('file:///mnt/user-data/outputs/refugee-online/public/index.html');await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,[sys.argv[1] if len(sys.argv)>1 else 'melee',2]);await pg.wait_for_timeout(1500)
        await pg.evaluate("()=>{gmSetLv(40);me.cls2=1;me.br=1;me.rb=0;applyBr();const N=MAPS[2].nests[0];me.x=N[0]-80;me.y=N[1]+40;AUTO.on=true;try{aqHB(true)}catch(e){HB.on=true}}")
        base=await pg.evaluate("()=>({as:M('as'),sp:M('sp'),dm:M('dm'),gd:fdM('gd'),k:me.stt.k,gold:me.gold})")
        print('base',base)
        log=[];shot=set()
        for i in range(120):
            await pg.wait_for_timeout(500)
            r=await pg.evaluate("()=>({t:Math.round(performance.now()/100)/10,g:Math.round(FV.g),on:+FV.on.toFixed(1),kc:FV.kc,k:me.stt.k,vis:!$('fvg').hidden,ov:$('fvov').classList.contains('on'),as:+M('as').toFixed(2),gd:fdM('gd'),call:$('fvcall').className})")
            log.append(r)
            if r['g']>=40 and 'g' not in shot: shot.add('g');await pg.screenshot(path=SH+'fv_gauge.png')
            if r['on']>5 and 'on' not in shot: shot.add('on');await pg.screenshot(path=SH+'fv_on.png')
            if 'on' in r['call'] and 'call' not in shot: shot.add('call');await pg.screenshot(path=SH+'fv_call.png')
            if 'on' in shot and r['on']==0 and 'end' not in shot: shot.add('end');await pg.screenshot(path=SH+'fv_end.png')
            if 'end' in shot and i>40: break
        on=[r for r in log if r['on']>0]
        print('kills',log[-1]['k']-base['k'],'samples',len(log))
        print('first fever at',next((r['t'] for r in log if r['on']>0),None),'kc max',max([r['kc'] for r in log] or [0]))
        print('during fever as/gd',on[0]['as'] if on else None,on[0]['gd'] if on else None,'overlay',on[0]['ov'] if on else None)
        print('calls',sorted(set(r['call'] for r in log)))
        print('gauge trace',[ (r['g'],r['on']) for r in log[::4]])
        # perfect dodge
        pdr=await pg.evaluate("()=>{gmGod=false;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};SD.on=false;FV.on=0;FV.g=10;try{fxs=fxs.filter(f=>f.k!=='fvon')}catch(e){};const m=mons.find(q=>q.hp>0&&q.t<3);me.dgCd=0;dodge();me.dgP=0;me.dgI=.3;const g0=FV.g;window.__hp=me.hp;hurt(Math.round(me.mh*.2));return {slow:Math.round(SLOWU-performance.now()),g0,g1:FV.g,pdg:me.pdg>performance.now(),sd:SD.on,dgI:me.dgI,inv3:me.inv3,skl:!!SKL,ska:!!SKA}}")
        print('perfect dodge',pdr)
        print('errs',errs)
asyncio.run(main())
