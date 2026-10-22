"""v489 เอฟเฟกต์อลังการ: ชั้นภาพเสริมของสกิลในคลังสกิล — ครบทุกชนิด · ไม่มี error · เพื่อนเห็น · ปิดได้ · เพดานอนุภาค · ล้างตอนเปลี่ยนแมพ · ความเร็ว"""
import asyncio, sys, json, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
async def waitc(c,js,arg=None,ms=4000,step=100):
    r=None
    for _ in range(ms//step):
        r=await c.ev(js,arg) if arg is not None else await c.ev(js)
        if r: return r
        await c.wait(step)
    return r
KINDS=['q8pop','q8rift','q8cst','q8clk','q8veil','q8dawn','q8wall','q8tar','q8hnd','q8hbt','q8cage','q8sph',
 'q8shk','q8av','q8cone','q8sky','q8sar','q8drg','q8moon','q8mcut','q8chn','q8hlr','q8kn','q8kns','q8gale','q8wbl','q8cyc','q8hand','q8cln','q8cls','q8rit','q8rp',
 'q8wave','q8boom','q8fan','q8flag','q8lance','q8blink','q8shur','q8hook','q8bar','q8ham','q8leap','q8gsw','q8snipe','q8hawk','q8dive','q8orb','q8bliz','q8dag','q8scy','q8beam','q8orbs','q8ray','q8hl',
 'q8grd','q8gsl','q8wnd','q8imp','q8imf','q8orbt','q8vdo']
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',80);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',80)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await A.wait(3200)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;banner=null;try{propsHit=function(){};propsFx=function(){}}catch(e){}}")
        await A.ev("()=>{me.x=1600;me.y=1600;me.face=0;window.__pin=setInterval(()=>{if(!window.__free){me.x=1600;me.y=1600}},40)}");await B.ev("()=>{me.x=1560;me.y=1640;window.__pin=setInterval(()=>{me.x=1560;me.y=1640},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000);await waitc(A,"(u)=>!!others[u]",B.uid,8000)
        host=await A.ev("()=>isHost()");H=A if host else B
        await H.ev("()=>{window.__mp=setInterval(()=>{let i=0;for(const m of mons){if(m.t>=3||i>=4){m.x=-9999;m.y=-9999;continue}const P=[[80,0],[140,12],[200,-10],[260,8]][i];m.x=1600+P[0];m.y=1600+P[1];m.tx=m.x;m.ty=m.y;m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;i++}},30)}")
        for c in (A,B): await c.ev("()=>{me.cls2=1;me.br=1;me.rb=1;me.lv=80;try{applyBr();applyS6()}catch(e){};setGQ('high');LITEQ=0;lqSet=()=>{}}")
        await A.wait(800)
        # ===== ครบทุกชนิด =====
        w=await A.ev("(K)=>{const miss=K.filter(k=>!(FXB[k]&&FXB[k].__p9)),extra=Object.keys(Object.assign({},P9X,P9U)).filter(k=>K.indexOf(k)<0);return {q:p9Q(),miss,extra,n:K.length-miss.length}}",KINDS)
        rep('ชั้นภาพเสริมห่อเอฟเฟกต์สกิลคลังสกิลครบทุกชนิด ('+str(len(KINDS))+')', w['q']==1 and not w['miss'], w)
        # ===== เล่นทุกชนิดทุกช่วงเวลา: ไม่มี error · มีอนุภาค/วง/รอย =====
        st=await A.ev("""async(K)=>{P9.en=0;P9.er='';const m=mons.find(q=>q.x>1600&&q.hp>0),id=m?m.id:0,out={};
          for(const k of K){P9.p.length=0;const sw0=GX.sw.length,b0=P9.b.length+P9.d.length;const D=FXD[k]||2;
            const f={k,by:uid,x:1700,y:1600,r:80,a:.2,len:240,d:D,t:D,s:3,u:'',sx:1600,sy:1600,pts:[[id,0]],lp:{0:[1700,1600]},la:[0,0],v:20};if(k==='q8beam'){f.sx=id;f.sy=0;f.r=200}if(k==='q8boom'){f.sx=.36;f.sy=0}if(k==='q8drg'){f.sx=1.1;f.sy=1}
            let mx=0;for(let i=0;i<=16;i++){f.t=D*(1-i/16);try{drawFx(f)}catch(e){P9.en++;P9.er=k+' orig '+e}mx=Math.max(mx,P9.p.length+P9.z.length+(GX.sw.length-sw0)+(P9.b.length+P9.d.length-b0));await new Promise(r=>setTimeout(r,8))}
            out[k]=mx}
          const none=Object.keys(out).filter(k=>!out[k]);return {en:P9.en,er:P9.er,none,tot:Object.values(out).reduce((a,b)=>a+b,0)}}""",KINDS)
        rep('เล่นเอฟเฟกต์ทุกชนิดตั้งแต่ต้นจนจบ: ตัวเสริมไม่มี error · ทุกชนิดมีอนุภาค/วงคลื่น/แสงลำ/รอยพื้น', st['en']==0 and not st['none'], st)
        # ===== ร่ายจริง: คนร่ายเห็นอนุภาค + ขอบจอ · อีกเครื่องเห็นอนุภาค (ไม่มีขอบจอของคนอื่น) =====
        await B.ev("()=>{P9.p.length=0;P9.o.length=0}");await A.ev("()=>{P9.p.length=0;P9.o.length=0;Q8S.length=0;me.mp=me.mm;me.cd=99}")
        cast=await A.ev("""async()=>{const ok=Q8F.zm(5,1,0,'');await new Promise(r=>setTimeout(r,900));return {ok,n:P9.p.length,vg:P9.o.some(o=>o.ty==='vg'),dec:P9.d.length}}""")
        bs=await waitc(B,"()=>P9.p.length>20&&{n:P9.p.length,vg:P9.o.some(o=>o.ty==='vg')}",ms=2000,step=60)
        rep('ร่ายรอยแยกโลหิตจริง: คนร่ายได้อนุภาค + รอยพื้น + ขอบจอแดง · อีกเครื่องเห็นอนุภาคด้วย (ไม่มีขอบจอของคนอื่น)', cast['ok'] and cast['n']>20 and cast['vg'] and cast['dec']>=1 and bs and not bs['vg'], [cast,bs])
        await A.wait(2500)
        # ===== ปิดเอฟเฟกต์เต็ม / โหมดประหยัด =====
        off=await A.ev("""async()=>{const v0=CFGV.vfx;CFGV.vfx=0;P9.en=0;await new Promise(r=>setTimeout(r,120));const q=p9Q(),n0=P9.p.length;me.sk[5]=0;me.mp=me.mm;Q8S.length=0;const ok=Q8F.zw(5,1,0,'');await new Promise(r=>setTimeout(r,900));
          const r={q,n0,ok,n:P9.p.length,d:P9.d.length,o:P9.o.length,en:P9.en};CFGV.vfx=v0;const l0=LOWQ;LOWQ=true;r.lq=p9Q();LOWQ=l0;LITEQ=1;r.lt=p9Q();for(let i=0;i<3000;i++)p9P({ty:'gl',x:1600,y:1600,l:5});r.capL=P9.p.length;LITEQ=0;for(let i=0;i<3000;i++)p9P({ty:'gl',x:1600,y:1600,l:5});r.cap=P9.p.length;return r}""")
        rep('ปิด «เอฟเฟกต์สกิลแบบเต็ม» แล้วไม่มีภาพเสริม (สกิลยังใช้ได้) · โหมดประหยัด = ปิด · โหมดลดภาพอัตโนมัติ = ครึ่งเดียว · เพดานอนุภาค 560/280', off['q']==0 and off['n']==0 and off['d']==0 and off['ok'] and off['en']==0 and off['lq']==0 and off['lt']==.5 and off['capL']<=280 and off['cap']<=560, off)
        # ===== ล้างตอนเปลี่ยนแมพ =====
        await A.ev("()=>{for(let i=0;i<50;i++)p9P({ty:'gl',x:1600,y:1600,l:9});p9Mark({ty:'glow',x:1600,y:1600,r:20,c:'255,0,0',l:9});P9.map=-7}")
        cl=await waitc(A,"()=>P9.map===curMap&&{n:P9.p.length,d:P9.d.length}",ms=2000,step=50)
        rep('เปลี่ยนแมพแล้วล้างอนุภาค/รอยพื้นที่ค้าง', cl['n']==0 and cl['d']==0, cl)
        # ===== ความเร็ว: วาดอนุภาค 560 ตัว + วงคลื่น =====
        pf=await A.ev("""()=>{P9.p.length=0;for(let i=0;i<600;i++)p9P({ty:['gl','sk','sm','ch','st','fl','sh','lf'][i%8],x:1500+Math.random()*300,y:1500+Math.random()*200,z:Math.random()*60,vx:20,vy:10,vz:30,c:'255,200,120',s:3,l:9});
          const n=P9.p.length,t0=performance.now();for(let i=0;i<20;i++){P9.tdt=performance.now()-16;p9Draw()}return {n,ms:Math.round((performance.now()-t0)/20*100)/100}}""")
        rep('วาดอนุภาคเต็มเพดาน (560 ตัวผสมทุกแบบ) ใช้เวลาต่อเฟรมไม่มาก', pf['n']<=560 and pf['ms']<14, pf)
        er=await A.ev("()=>({en:P9.en||0,er:P9.er||''})");er2=await B.ev("()=>({en:P9.en||0,er:P9.er||''})")
        E=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'ERR_CONNECTION' not in e]
        rep('ไม่มี error ในหน้าเกมทั้งสองเครื่อง', not E and er['en']==0 and er2['en']==0, [E[:3],er,er2])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
