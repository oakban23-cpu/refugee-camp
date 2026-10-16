import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0].replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","")
CLS=sys.argv[1].split(',')
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();errs=[]
        for c in CLS:
            pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page()
            pg.on('pageerror',lambda e:errs.append(c+':'+str(e)[:200]))
            pg.on('console',lambda m:(m.type=='warning' and ('sg' in m.text or 'r27' in m.text)) and errs.append(c+':W:'+m.text[:200]))
            await pg.goto('file:///mnt/user-data/outputs/refugee-online/public/index.html');await pg.wait_for_timeout(2300)
            await pg.evaluate(SETUP,[c,2]);await pg.wait_for_timeout(500)
            await pg.evaluate("""()=>{try{terMons=function(){};terGet=function(){return null}}catch(e){};AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};me.x=1500;me.y=1500;me.face=0;window.__H=[];const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([performance.now()|0,+d,m.id,ck]);return _a.apply(this,arguments)};
              setInterval(()=>{me.mp=me.mm;let i=0;for(const m of mons){if(m.t>=3||i>=8){m.x=-9999;m.y=-9999;continue}const P=[[60,-20],[80,20],[110,-10],[140,15],[170,-15],[200,10],[230,-5],[260,10]][i];m.x=1500+P[0];m.y=1500+P[1];m.tx=m.x;m.ty=m.y;m.mh=9e9;m.hp=9e9;m.sp=0;i++}},10);
              const X=sgSt();Object.keys(SGD).forEach(id=>X.i[id]=3)}""")
            for br in (1,2):
                info=await pg.evaluate("(br)=>{me.cls2=1;me.br=br;me.rb=1;applyBr();me.lv=Math.max(me.lv,95);rnSt().e[5]='';return [sgTags(5).join(' '),Object.keys(SGD).filter(id=>sgOk(id,5)).join(','),sgSockN(),skName(5)]}",br)
                print(c,br,'tags',info[0],'| ok:',info[1],'| sock',info[2],info[3],flush=True)
                ok=info[1].split(',')
                tests=[[]]+[[x] for x in ok]
                for L in tests:
                    r=await pg.evaluate("""(L)=>{fxs.length=0;fields.length=0;me.x=1500;me.y=1500;me.face=0;S6.sw=S6.bw=S6.ob=S6.ln=null;S6RG.length=0;try{SGTO.length=0;SGTR.length=0;SGMI.length=0}catch(e){}
                      const X=sgSt();X.l={5:L.slice()};me.sk[5]=0;me.mp=me.mm;me.hp=Math.round(me.mh*.5);const mp0=me.mp;lockId=(mons.find(m=>m.x>1500&&m.t<3)||{}).id;__H=[];window.__t0=performance.now();useSkill(5);
                      return {links:sgLinks(5).join(','),cd:+(+me.sk[5]).toFixed(1),cdb:+cdOf(5).toFixed(1),mp:mp0-me.mp,pose:me.cast&&me.cast.ty}}""",L)
                    if 'cwdt' in L:
                        await pg.evaluate("()=>{for(let i=0;i<4;i++)setTimeout(()=>{try{hurt(Math.round(me.mh*.06))}catch(e){}},300+i*200)}")
                    await pg.wait_for_timeout(4200)
                    h=await pg.evaluate("()=>{const H=__H.map(h=>[h[0]-(__t0|0),h[1]/pd(),h[2]]);const tot=H.reduce((s,h)=>s+h[1],0);return {n:H.length,tot:+tot.toFixed(1),mons:new Set(H.map(h=>h[2])).size}}")
                    print('   ',c,br,(','.join(L) or '-').ljust(7),json.dumps(r,ensure_ascii=False),h,flush=True)
            ui=await pg.evaluate("()=>{try{curMap=1}catch(e){};SGTAB='sup';runeUI();const t=ov.innerText;ov.hidden=true;return [t.indexOf(skName(5))>=0,t.length]}")
            print(c,'UI has slot5',ui)
            await pg.context.close()
        print('errs',errs)
asyncio.run(main())
