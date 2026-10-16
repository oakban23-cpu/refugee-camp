import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0].replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","")
URL=sys.argv[2] if len(sys.argv)>2 else 'file:///mnt/user-data/outputs/refugee-online/public/index.html'
CASES={'melee':[(1,''),(1,'a'),(1,'b'),(2,''),(2,'b')],'archer':[(1,''),(2,'')],'sup':[(1,''),(2,'')],'assn':[(1,''),(2,''),(2,'b')],'mage':[(1,''),(1,'a'),(2,'')]}
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();errs=[]
        for c in sys.argv[1].split(','):
            pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page();pg.on('pageerror',lambda e:errs.append(c+':'+str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2300)
            await pg.evaluate(SETUP,[c,2]);await pg.wait_for_timeout(500)
            await pg.evaluate("""()=>{try{terMons=function(){};terGet=function(){return null}}catch(e){};AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};me.x=1500;me.y=1500;me.face=0;
              window.__N={hit:0,oh:0,el:0};const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv&&lv!==2&&ck!=='s6l'&&!SGIN&&window.__ON)__N.hit++;return _a.apply(this,arguments)};
              const _o=sgOnHit;sgOnHit=function(k){if(k===5&&window.__ON)__N.oh++;return _o.apply(this,arguments)};
              setInterval(()=>{me.mp=me.mm;me.hp=Math.max(me.hp,me.mh*.5);let i=0;for(const m of mons){if(m.t>=3||i>=8){m.x=-9999;m.y=-9999;continue}const P=[[60,-20],[80,20],[110,-10],[140,15],[170,-15],[200,10],[230,-5],[260,10]][i];m.x=1500+P[0];m.y=1500+P[1];m.tx=m.x;m.ty=m.y;m.mh=9e9;m.hp=9e9;m.sp=0;i++}},10);
              const X=sgSt();Object.keys(SGD).forEach(id=>X.i[id]=3)}""")
            for br,e in CASES[c]:
                await pg.evaluate("(br)=>{me.cls2=1;me.br=br;me.rb=1;applyBr();me.lv=Math.max(me.lv,95)}",br)
                await pg.wait_for_timeout(300)
                await pg.evaluate("(e)=>{S6.sw=S6.bw=S6.ob=S6.ln=null;S6RG.length=0;pend.length=0;const S=rnSt(),R=RUNES[me.cls][5];['a','b'].forEach(q=>S.u[R[q][0]]=1);S.e[5]=e;sgSt().l={5:['wide']};for(const k in SGLAST)delete SGLAST[k];for(const k in SGCK)delete SGCK[k];__N.hit=0;__N.oh=0;window.__ON=1;me.sk[5]=0;lockId=(mons.find(m=>m.x>1500&&m.t<3)||{}).id;useSkill(5);if(me.cls==='melee'&&me.br===2)for(let i=0;i<12;i++)setTimeout(()=>{try{hurt(30)}catch(e){}},300+i*450)}",e)
                await pg.wait_for_timeout(10000)
                n=await pg.evaluate("()=>{window.__ON=0;return Object.assign({},__N)}")
                print(c,br,e or '-','hits',n['hit'],'onhit(slot5)',n['oh'],'= %d%%'%(100*n['oh']/max(1,n['hit'])),flush=True)
            await pg.context.close()
        print('errs',errs)
asyncio.run(main())
