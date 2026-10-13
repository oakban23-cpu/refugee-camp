import asyncio, sys, random, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
SH=[float(v) for v in os.environ.get('SH','0.45,1.5,2.6').split(',')]
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'U3'+str(random.randint(1000,9999)), 'melee', 90)
        await A.ev("()=>{gmGod=true;me.rb=1;me.rbC2={br:1,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=1;applyBr();me.x=1450;me.y=2420}")
        await A.wait(1500)
        await A.ev("()=>{const _a=addHit;window.__D={n:0,d:0};addHit=function(m,d,cr,lv,ck){__D.n++;__D.d+=d;return _a(m,d,cr,lv,ck)}}")
        print('ult',await A.ev("()=>[ultOf()[0],CL[me.cls].cds[2],mcOf(2),$('s2').innerHTML.slice(0,30)]"))
        await A.pg.add_style_tag(content='*{visibility:hidden!important} canvas{visibility:visible!important}')
        only=os.environ.get('ONLY')
        for cls in ['melee','archer','sup','assn','mage']:
            for br in [1,2]:
                if only and f'{cls}{br}' not in only.split(','): continue
                r=await A.ev("""([c,b])=>{me.cls=c;me.br=b;applyBr();applyS6();me.mp=999;me.sk[2]=0;S6={};me.inv3=0;
                  const mm=mons.filter(m=>m.hp>0&&m.t!==3).sort((a,b)=>dist(a,me)-dist(b,me));if(mm[0]){me.x=mm[0].x-90;me.y=mm[0].y;lockId=mm[0].id}mons.forEach(m=>{if(m.t!==3)m.hp=m.mh=Math.max(m.mh,5e5)});
                  __D={n:0,d:0};useSkill(2);return [c,b,ultOf()[0],+(me.sk[2]||0).toFixed(1),Math.round(pd())]}""",[cls,br])
                last=0
                for i,t in enumerate(SH):
                    await A.wait(int((t-last)*1000));last=t
                    await A.ev("()=>{banner=null;dn=[]}")
                    full = i==0
                    await A.pg.screenshot(path=f'../fx/u3_{cls}{br}_{i}.png',clip={'x':0,'y':0,'width':390,'height':844} if full else {'x':0,'y':150,'width':390,'height':450})
                await A.wait(1500)
                d=await A.ev("()=>[__D.n,Math.round(__D.d),me.inv3>0?1:0]")
                print(r,'hits',d)
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
