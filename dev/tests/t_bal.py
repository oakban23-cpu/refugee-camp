import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
async def main():
    p = start_server()
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Bl'+str(random.randint(1000,9999)), 'melee', 90)
        await A.ev("()=>{gmGod=true;me.rb=1;me.rbC2={br:1,brU:{1:1,2:1}};me.cls2=1;me.brU={1:1,2:1};me.br=1;applyBr();me.x=1450;me.y=2420;me.tr={};me.ab={str:0,vit:0,int:0,agi:0,luk:0}}")
        await A.wait(2500)
        await A.ev("""()=>{const _a=addHit;window.__D={d:0};addHit=function(m,d,cr,lv,ck){if(m&&m.__pin)__D.d+=d;return _a(m,d,cr,lv,ck)};
          window.__pinSet=()=>{const L=mons.filter(m=>m.hp>0&&m.t<3).slice(0,6);const X=me.x+110,Y=me.y;L.forEach((m,i)=>{m.__pin=1;m.hp=m.mh=1e9;const a=i*1.2566;m.__px=i?X+Math.cos(a)*55:X;m.__py=i?Y+Math.sin(a)*35:Y});return L.length};
          clearInterval(window.__pi);window.__pi=setInterval(()=>{mons.forEach(m=>{if(m.__pin){m.x=m.__px;m.y=m.__py;m.hp=m.mh=1e9}})},30)}""")
        res={}
        for k in [5,2]:
          for cls in ['melee','archer','sup','assn','mage']:
            for br in [1,2]:
                n=await A.ev("([c,b])=>{me.cls=c;me.br=b;me.rbC2.br=b;applyBr();applyS6();mons.forEach(m=>{delete m.__pin});me.x=1450;me.y=2420;return __pinSet()}",[cls,br])
                await A.wait(300)
                await A.ev("([k])=>{const T=mons.find(m=>m.__pin);lockId=T&&T.id;me.face=0;me.mp=9999;me.sk[k]=0;S6={};me.combo=8;__D.d=0;useSkill(k)}",[k])
                await A.wait(6500)
                v=await A.ev("()=>[__D.d/pd(),me.sk[5]>0||me.sk[2]>0]")
                res[f'{k}:{cls}{br}']=round(v[0],1)
                print(k,cls,br,'n',n,'pd-mult',round(v[0],1),flush=True)
        json.dump(res,open('bal.json','w'))
        await b.close()
    p.terminate()
asyncio.run(main())
