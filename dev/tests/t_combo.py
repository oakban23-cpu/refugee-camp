import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0].replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","")
URL='file:///mnt/user-data/outputs/refugee-online/public/index.html'
COMBOS={'none':[],'bbw':['brut','blood','wide'],'bbn':['brut','blood','nova'],'bzc':['brut','zap','chain'],'spl':['split','brut','blood'],'ech':['echo','brut','blood']}
async def main():
    c=sys.argv[1];out=[]
    async with async_playwright() as pw:
        b=await pw.chromium.launch();errs=[]
        pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(2300)
        await pg.evaluate(SETUP,[c,2]);await pg.wait_for_timeout(500)
        await pg.evaluate("""()=>{try{terMons=function(){};terGet=function(){return null}}catch(e){};AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};me.x=1500;me.y=1500;me.face=0;
          setInterval(()=>{me.mp=me.mm;me.hp=Math.max(me.hp,me.mh*.6);let i=0;for(const m of mons){if(m.t>=3||i>=8){m.x=-9999;m.y=-9999;continue}const P=[[60,-20],[80,20],[110,-10],[140,15],[170,-15],[200,10],[230,-5],[260,10]][i];m.x=1500+P[0];m.y=1500+P[1];m.tx=m.x;m.ty=m.y;m.sp=0;if(!(m.mh>=1e12)){m.mh=1e12;m.hp=1e12}i++}},10);
          const X=sgSt();Object.keys(SGD).forEach(id=>{X.i[id]=3;X.v[id]=3})}""")
        for br in (1,2):
            await pg.evaluate("(br)=>{me.cls2=1;me.br=br;me.rb=1;applyBr();me.lv=Math.max(me.lv,95);const S=rnSt();[0,1,3,4,5].forEach(k=>S.e[k]='')}",br)
            for k in (0,4,5):
                for nm,L in COMBOS.items():
                    ok=await pg.evaluate("([k,L])=>L.every(id=>sgOk(id,k))",[k,L])
                    if not ok: continue
                    await pg.evaluate("([k,L])=>{S6.sw=S6.bw=S6.ob=S6.ln=null;S6RG.length=0;pend.length=0;fxs.length=0;fields.length=0;try{SGTO.length=0;SGTR.length=0;SGMI.length=0;for(const q in SGCH)delete SGCH[q]}catch(e){}sgSt().l={[k]:L.slice()};mons.forEach(m=>{if(m.mh>=1e12)m.hp=1e12});me.sk=[0,0,0,0,0,0];me.x=1500;me.y=1500;me.face=0;lockId=(mons.find(m=>m.x>1500&&m.t<3)||{}).id;window.__cd=0;useSkill(k);window.__cd=me.sk[k]}",[k,L])
                    await pg.wait_for_timeout(9000)
                    r=await pg.evaluate("()=>{let d=0;mons.forEach(m=>{if(m.mh>=1e12&&m.x>0)d+=1e12-m.hp});return {d:+(d/pd()).toFixed(1),cd:+(+__cd).toFixed(1)}}")
                    r.update(c=c,br=br,k=k,nm=nm);out.append(r);print(json.dumps(r),flush=True)
        print('errs',errs)
    json.dump(out,open('combo_%s.json'%c,'w'))
asyncio.run(main())
