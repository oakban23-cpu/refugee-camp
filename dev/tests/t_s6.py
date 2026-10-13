import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'S6'+str(random.randint(1000,9999)), 'melee', 70)
        await A.ev("()=>{gmGod=true;me.rb=1;me.rbC2={br:1,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=1;applyBr();me.x=1450;me.y=2420}")
        await A.wait(1500)
        await A.ev("()=>{const _a=addHit;window.__D={n:0,d:0};addHit=function(m,d,cr,lv,ck){__D.n++;__D.d+=d;return _a(m,d,cr,lv,ck)}}")
        print('s5 visible',await A.ev("()=>[!$('s5').hidden,$('s5').innerHTML.slice(0,40),CL[me.cls].s[5],skOpen(5)]"))
        await A.pg.screenshot(path='s6_hud.png')
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        for cls in ['melee','archer','sup','assn','mage']:
            for br in [1,2]:
                r=await A.ev("""([c,b])=>{me.cls=c;me.br=b;applyBr();applyS6();me.mp=999;me.sk[5]=0;S6={};
                  const mm=mons.filter(m=>m.hp>0).sort((a,b)=>dist(a,me)-dist(b,me));if(mm[0]){me.x=mm[0].x-60;me.y=mm[0].y;lockId=mm[0].id}
                  __D={n:0,d:0};useSkill(5);return [c,b,CL[c].s[5],+(me.sk[5]||0).toFixed(1),Math.round(pd())]}""",[cls,br])
                await A.wait(int(__import__('os').environ.get('SW','450')))
                await A.ev("()=>{banner=null;dn=[]}")
                await A.pg.screenshot(path=f'../fx/s6_{cls}{br}.png',clip={'x':20,'y':222,'width':350,'height':350})
                await A.wait(2200)
                hp2=await A.ev("()=>[__D.n,Math.round(__D.d),me.s6gT|0,me.shv|0,S6RG.length]")
                print(r,'hits',hp2)
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
