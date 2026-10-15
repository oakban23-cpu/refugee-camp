import asyncio,json,sys
from playwright.async_api import async_playwright
SETUP=open('../fx/cap2.py').read().split('SETUP="""')[1].split('"""')[0].replace("setInterval(()=>{me.hp=me.mh;me.mp=me.mm;me.down=0;dn.length=0},30);","")
CLS=sys.argv[1].split(',') if len(sys.argv)>1 else ['melee','archer','sup','assn','mage']
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch();errs=[]
        for c in CLS:
            pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page()
            pg.on('pageerror',lambda e:errs.append(c+':'+str(e)[:200]))
            pg.on('console',lambda m:(m.type=='warning' and ('r27' in m.text or 'r26' in m.text)) and errs.append(c+':W:'+m.text[:200]))
            await pg.goto('file:///mnt/user-data/outputs/refugee-online/public/index.html');await pg.wait_for_timeout(2300)
            await pg.evaluate(SETUP,[c,2]);await pg.wait_for_timeout(500)
            await pg.evaluate("""()=>{try{terMons=function(){};terGet=function(){return null}}catch(e){};AUTO.on=false;me.x=1500;me.y=1500;me.face=0;window.__H=[];const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([performance.now()|0,+d,m.id,ck]);return _a.apply(this,arguments)};
              setInterval(()=>{let i=0;for(const m of mons){if(m.t>=3||i>=8){m.x=-9999;m.y=-9999;continue}const P=[[60,-20],[80,20],[110,-10],[140,15],[170,-15],[200,10],[230,-5],[260,10]][i];m.x=1500+P[0];m.y=1500+P[1];m.tx=m.x;m.ty=m.y;m.mh=9e9;m.hp=9e9;m.sp=0;i++}},10)}""")
            plans=[('B2',4,'me.cls2=1;me.br=2;me.rb=0')] if c in('melee','archer') else []
            plans+=[('A3',5,'me.cls2=1;me.br=1;me.rb=1'),('B3',5,'me.cls2=1;me.br=2;me.rb=1')]
            for st,k,code in plans:
                ui=await pg.evaluate("()=>{%s;applyBr();me.lv=Math.max(me.lv,95);runeUI();const rows=[...ov.querySelectorAll('.rnrow b')].map(x=>x.textContent);ov.hidden=true;return [Object.values(RUNES[me.cls][%d]).map(q=>q[0]+' '+q[2]),rows.length]}"%(code,k))
                print(c,st,'UI',ui)
                for e in ['','a','b']:
                    r=await pg.evaluate(f"""()=>{{fxs.length=0;fields.length=0;me.x=1500;me.y=1500;me.face=0;me.shv=0;me.s6gT=0;S6.sw=S6.bw=S6.ob=S6.ln=null;S6RG.length=0;const S=rnSt();Object.values(RUNES[me.cls][{k}]).forEach(q=>S.u[q[0]]=1);S.e[{k}]='{e}';me.sk[{k}]=0;me.mp=me.mm;me.hp=Math.round(me.mh*.4);const mp0=me.mp;lockId=mons.find(m=>m.x>1500&&m.t<3).id;__H=[];window.__t0=performance.now();useSkill({k});
                      return {{rn:rnOf({k}),id:rnIdOf({k}),cd:+(+me.sk[{k}]).toFixed(2),cdb:cdOf({k}),mp:mp0-me.mp,fields:fields.map(f=>f.k+':'+f.t+':r'+f.r+':sp'+f.sp),fx:fxs.map(f=>f.k+':'+(+f.d).toFixed(1)),sh:me.shv}}}}""")
                    if c=='melee' and st=='B3':
                        for i in range(6):
                            await pg.wait_for_timeout(400);await pg.evaluate("()=>{try{hurt(Math.round(me.mh*.03))}catch(e){};me.hp=Math.max(me.hp,me.mh*.4)}")
                        await pg.wait_for_timeout(5000)
                    else:
                        await pg.wait_for_timeout(10500 if (c in('sup','assn') and e) else 8000)
                    h=await pg.evaluate("()=>{const H=__H.map(h=>[h[0]-(__t0|0),h[1]/pd(),h[2],h[3]]);const tot=H.reduce((s,h)=>s+h[1],0);const ck={};H.forEach(h=>ck[h[3]]=+((ck[h[3]]||0)+h[1]).toFixed(1));return {n:H.length,tot:+tot.toFixed(1),ck,span:H.length?[H[0][0],H[H.length-1][0]]:0,mons:new Set(H.map(h=>h[2])).size,hp:Math.round((me.hp/me.mh)*100),cdNow:+(+me.sk[%d]).toFixed(1)}}"%k)
                    print('  ',c,st,e or '-',json.dumps(r,ensure_ascii=False),h)
            await pg.context.close()
        # q6 refund
        pg=await (await b.new_context(viewport={'width':400,'height':800})).new_page();pg.on('pageerror',lambda e:errs.append('rf:'+str(e)[:200]))
        await pg.goto('file:///mnt/user-data/outputs/refugee-online/public/index.html');await pg.wait_for_timeout(2300)
        await pg.evaluate(SETUP,['mage',2]);await pg.wait_for_timeout(300)
        print('refund before',await pg.evaluate("()=>{const S=rnSt();S.sh=5;S.u.q6a=3;S.u.q6b=1;S.e[5]='a';return [S.sh,JSON.stringify(S.u)]}"))
        await pg.wait_for_timeout(2600)
        print('refund after',await pg.evaluate("()=>{const S=rnSt();return [S.sh,JSON.stringify(S.u),S.e[5],banner&&banner.s]}"))
        print('errs',errs)
asyncio.run(main())
