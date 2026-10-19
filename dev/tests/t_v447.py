"""v447 แรงค์สไตล์ D→S"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Sty','melee',60)
        await A.ev("()=>{ov.hidden=true;const N=MAPS[2].nests[0];enterMap(2,{x:N[0],y:N[1]})}");await A.wait(3000)
        await A.ev("()=>{AUTO.on=false;try{aqHB(false)}catch(e){};gmGod=true;FV.g=0;window.__keep=setInterval(()=>{mons.forEach(m=>{if(m.t<3){m.hp=Math.max(m.hp,1)}})},50)}")
        r=await A.ev("()=>{U61.p=0;U61.r=0;u61Upd();return {p:U61.p,r:U61.r,show:(()=>{try{u61Hud();return 1}catch(e){return 0}})()}}")
        rep('แต้ม 0 = แรงค์ D', r['p']==0 and r['r']==0, json.dumps(r))
        # เอามอนมารอบตัว
        GA="()=>{const L=mons.filter(m=>m.t<3&&m.hp>0).slice(0,4);L.forEach((m,i)=>{m.x=me.x+40+i*10;m.y=me.y+5;m.hp=m.mh})}"
        await A.ev(GA)
        m1=await A.ev("()=>{U61.p=0;U61.last=[];me.mp=me.mm;me.sk[1]=0;me.manT=performance.now();useSkill(1);return U61.p}")
        await A.ev("()=>{U61.p=0}")
        a1=await A.ev("()=>{AUTO.on=true;U61.last=[];me.mp=me.mm;me.sk[1]=0;me.manT=0;useSkill(1);const v=U61.p;AUTO.on=false;return v}")
        rep('กดสกิลเอง ได้แต้มเต็ม · ออโต้ร่ายได้ราว 25%', m1>=24 and a1<m1*.45, json.dumps([m1,a1]))
        v=await A.ev("()=>{U61.p=0;U61.last=[1];me.mp=me.mm;me.sk[1]=0;me.manT=performance.now();useSkill(1);const a=U61.p;U61.p=0;me.sk[0]=0;me.manT=performance.now();useSkill(0);return [a,U61.p]}")
        rep('สลับสกิลไม่ซ้ำได้แต้มมากกว่ากดซ้ำ', v[1]>v[0]+8, json.dumps(v))
        d=await A.ev("()=>{U61.p=0;me.dgP=0;perfectDodge();return U61.p}")
        rep('หลบสมบูรณ์ +45', abs(d-45)<1, str(d))
        h=await A.ev("()=>{U61.p=300;U61.act=performance.now();gmGod=false;me.hp=me.mh;hurt(Math.round(me.mh*.1));gmGod=true;me.hp=me.mh;return U61.p}")
        rep('โดนตีแรง แต้มหาย 30% (300→210)', 200<=h<=215, str(h))
        await A.ev("()=>{window.__away=setInterval(()=>{mons.forEach(m=>{if(m.t<3){m.x=-9999;m.y=-9999}})},30)}");await A.wait(400)
        await A.ev("()=>{U61.p=300;U61.act=performance.now()-2600}");await A.wait(1000)
        i=await A.ev("()=>U61.p")
        rep('ไม่ได้สู้เกิน 2.5 วิ แต้มลดเร็ว (~45/วิ)', 245<=i<=265, str(i))
        rw=await A.ev("()=>{FV.on=0;FV.cool=0;U61.p=0;U61.r=0;u61Upd();const g0=fdM('gd'),x0=fdM('xp');FV.g=0;U61.p=600;U61.act=performance.now();u61Upd();return [g0,fdM('gd'),x0,fdM('xp'),U61.r,FV.g]}")
        rep('แรงค์ S: ทอง/EXP +35% และเติมเกจคลั่ง', abs(rw[1]-rw[0]-.35)<1e-6 and abs(rw[3]-rw[2]-.35)<1e-6 and rw[4]==4 and rw[5]>=14, json.dumps(rw))
        await A.wait(400)
        await A.pg.screenshot(path='/home/claude/promo3/brk/rank_S.png')
        o=await A.ev("()=>{const s=sgOff;sgOff=()=>true;U61.p=0;u61Add(50,true);const v=U61.p;sgOff=s;return v}")
        rep('ลานประลอง/ด่าน trial ไม่นับแต้ม', o==0, str(o))
        await A.ev("()=>clearInterval(__away)")
        hud=await A.ev("()=>{U61.p=250;U61.act=performance.now();u61Upd();let e=null;try{u61Hud()}catch(x){e=String(x)}return e}")
        rep('วาดป้ายแรงค์ไม่ error', hud is None, str(hud))
        # เล่นจริง: กดสกิลเองวนไป 25 วิ ควรถึงอย่างน้อย A
        await A.ev("()=>{U61.p=0;U61.r=0;u61Upd();window.__pl=setInterval(()=>{const L=mons.filter(m=>m.t<3&&m.hp>0).slice(0,4);L.forEach((m,i)=>{m.x=me.x+40+i*12;m.y=me.y+5})},200);let i=0;window.__sk=setInterval(()=>{me.mp=me.mm;const k=[0,1,3,4][i++%4];me.sk[k]=0;me.manT=performance.now();useSkill(k)},1600)}")
        tl=[]
        for i in range(30):
            await A.wait(2000);tl.append(await A.ev("()=>U61.r"))
        await A.ev("()=>{clearInterval(__sk);clearInterval(__pl)}")
        tA=next((i*2+2 for i,x in enumerate(tl) if x>=3),None);tS=next((i*2+2 for i,x in enumerate(tl) if x>=4),None)
        print('timeline',tl,'A at',tA,'S at',tS)
        rep('กดเองสลับสกิล: ถึง A ใน 15–40 วิ และ S ช้ากว่า A', tA is not None and 15<=tA<=40 and (tS is None or tS>tA+6), json.dumps([tA,tS]))
        errs=[x for x in A.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
