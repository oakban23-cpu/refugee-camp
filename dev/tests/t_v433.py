"""v433 ภาพตอนสู้ 7 ข้อ"""
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
        A=await new_client(b,'Ann','melee',95)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;enterMap(28,{x:1600,y:1700})}")
        await A.wait(2500)
        ga=await A.ev("()=>{g.globalAlpha=.5;const a=g.globalAlpha;v33On(.5);g.globalAlpha=1;const b=g.globalAlpha,raw=V33GA.get.call(g);g.globalAlpha=2;const c=g.globalAlpha;v33Off();const own=Object.getOwnPropertyDescriptor(g,'globalAlpha');const d=g.globalAlpha;g.globalAlpha=1;return[a,b,raw,c,own?1:0,d]}")
        rep('ตัวคูณความทึบของเอฟเฟกต์ทำงาน และค่าผิดช่วงยังถูกเมินเหมือนเดิม',ga==[0.5,1,0.5,1,0,0.5],str(ga))
        mul=await A.ev("()=>{const own={k:'x',r:40,by:uid},oth={k:'x',r:40,by:'zz'};const a=v33Mul(own),b=v33Mul(oth);const save=fxs.slice();for(let i=0;i<9;i++)fxs.push({k:'ring',x:me.x,y:me.y,r:120,t:1,d:1});V33.fr=-1;const c=v33Mul(own),d=v33Mul(oth);fxs.length=0;save.forEach(f=>fxs.push(f));V33.fr=-1;return[a,b,+c.toFixed(2),+d.toFixed(2)]}")
        rep('② เอฟเฟกต์ของคนอื่นจางลง (×0.68) · เอฟเฟกต์ใหญ่ซ้อน 9 อันลดลงเหลือ ≤ 55%',mul[0]==1 and abs(mul[1]-0.68)<.01 and mul[2]<=0.55 and mul[3]<mul[2],str(mul))
        df=await A.ev("()=>{const f={k:'ring',x:me.x,y:me.y,r:120,t:.5,d:1,s:1,by:'zz'};let err='';try{for(let i=0;i<5;i++){V33.fr=-1;drawFx(f)}}catch(e){err=String(e)}return[err,V33M,+g.globalAlpha.toFixed(3)]}")
        rep('วาดเอฟเฟกต์ของคนอื่นผ่านตัวคูณแล้วคืนค่าปกติ ไม่มี error',df[0]=='' and df[1]==1 and df[2]==1,str(df))
        rx=await A.ev("()=>{for(let i=0;i<3;i++)rxFx({k:'rx',r:'dawn',id:1,x:me.x,y:me.y,tm:1,n1:'พรานเงา',n2:'Ann'});const e=V33.rx.dawn;let err='';try{v33RxHud()}catch(x){err=String(x)}return[e&&e.c,e&&e.n1,err]}")
        rep('① คอมโบทีมเข้าป้ายรวมชิดซ้ายจอ นับ ×3 พร้อมชื่อคนร่วมคอมโบ',rx[0]==3 and rx[1]=='พรานเงา' and rx[2]=='',json.dumps(rx,ensure_ascii=False))
        lab=await A.ev("()=>V33ON===1")
        rep('① ป้ายในฉากไม่วาดบรรทัดชื่อคอมโบทีมซ้ำ',lab)
        dm=await A.ev("()=>{dn.length=0;for(let i=0;i<5;i++)dn.push({x:me.x+i*2,y:me.y-20,v:59,t:.6,d0:.6,vx:5,vy:-100});dn.push({x:me.x,y:me.y-20,v:300,t:.9,d0:.9,c:1,vx:0,vy:-100});dnStack();const L=dn.filter(d=>d.t>0);return L.map(d=>[d.v,d.n||1,d.c||0])}")
        rep('③ เลข 59 ห้าครั้งติดกันรวมเป็น 295 ×5 · คริติคอลไม่ถูกรวม',sorted(dm)==sorted([[295,5,0],[300,1,1]]),str(dm))
        nb=await A.ev("()=>{NTB.length=0;const a=[];for(let i=0;i<5;i++)a.push(ntBud(100,100,80,.3));const s=a.reduce((x,y)=>x+y,0);NTB.length=0;const lone=ntBud(500,500,80,.3);NTB.length=0;const tiny=ntBud(100,100,6,.5);return[+s.toFixed(2),lone,tiny]}")
        rep('⑥ แสงกลางคืน 5 ดวงจุดเดียวกัน รวมไม่เกิน 0.95 (เดิม 1.5) · ดวงเดี่ยวไม่ถูกลด · หิ่งห้อยไม่นับ',nb[0]<=0.95 and nb[1]==0.3 and nb[2]==0.5,str(nb))
        await A.ev("()=>{const L=mons.filter(m=>m.t<3&&m.hp>0&&!m.pv).slice(0,6);L.forEach((m,i)=>{m.x=me.x+(i%2);m.y=me.y+(i>>1);m.mh*=50;m.hp=m.mh;m.__t6=1})}")
        await A.wait(1500)
        sp=await A.ev("()=>{const L=mons.filter(m=>m.__t6&&m.hp>0);let mn=1e9,mp=1e9;for(let i=0;i<L.length;i++){mp=Math.min(mp,Math.hypot(L[i].x-me.x,L[i].y-me.y));for(let j=i+1;j<L.length;j++)mn=Math.min(mn,Math.hypot(L[i].x-L[j].x,L[i].y-L[j].y))}return[L.length,Math.round(mn),Math.round(mp)]}")
        rep('④ มอน 6 ตัวที่ยืนจุดเดียวกับผู้เล่น กระจายออก (ห่างกัน ≥ 10 · ห่างผู้เล่น ≥ 14)',sp[0]>=5 and sp[1]>=10 and sp[2]>=14,str(sp))
        atk=await A.ev("()=>new Promise(r=>{mons.filter(m=>m.__t6&&m.hp>0).forEach((m,i)=>{m.x=me.x+(i%3-1)*16;m.y=me.y+4+(i>>1)*5});const h0=me.hp;gmGod=false;me.mh=1e7;me.hp=1e7;setTimeout(()=>{const d=1e7-me.hp;gmGod=true;r(d)},2500)})")
        rep('④ มอนที่ถูกดันยังตีผู้เล่นโดน',atk>0,str(atk))
        ln=await A.ev("""()=>new Promise(r=>{const L=mons.filter(m=>m.__t6&&m.hp>0);const x=me.x,y=me.y;L.forEach((m,i)=>{m.x=x+80+(i%3)*8;m.y=y+5+(i>>1)*6});const dec0=GX.dec.length;
          skLaunchFx({k:'skl',R:[uid],x:Math.round(x),y:Math.round(y),d:1,by:'zz'});const tr=fxs.some(f=>f.k==='sktr'&&f.u===uid);
          setTimeout(()=>{const J=SKJ[uid];const kb=L.filter(m=>m.__kb).length;r({tr,land:J?J.land:-1,crack:GX.dec.length>dec0&&GX.dec.some(d=>d.t==='crack'),shk:fxs.some(f=>f.k==='skshk'),kb,hs:hsUntil>0})},1150)})""")
        rep('⑤ โยนขึ้น: มีหางแสงตอนลอย · ลงพื้นมีรอยแตก+คลื่นกระแทก · มอนในวงกระเด็น · หยุดค้างเสี้ยววิ',ln['tr'] and ln['land']==1 and ln['crack'] and ln['shk'] and ln['kb']>=2 and ln['hs'],json.dumps(ln))
        await A.wait(600)
        kbd=await A.ev("()=>{const L=mons.filter(m=>m.__t6&&m.hp>0);return[L.filter(m=>m.__kb).length,Math.round(Math.min(...L.map(m=>Math.hypot(m.x-me.x,m.y-me.y))))]}")
        rep('⑤ กระเด็นจบแล้วมอนกลับมาเดินปกติ',kbd[0]==0,str(kbd))
        tr=await A.ev("()=>{const J={t0:performance.now()-400,lv:1,n:1,d:1,sx:me.x,sy:me.y,tx:me.x+80,ty:me.y,land:0};SKJ.__t=J;let err='';try{FXB.sktr({u:'__t'},.5,0,0,60,0);FXB.skshk({s:1},.4,me.x,me.y,90)}catch(e){err=String(e)}delete SKJ.__t;return err}")
        rep('⑤ ตัววาดหางแสง/คลื่นกระแทกไม่มี error',tr=='',tr)
        mm=await A.ev("()=>{let n=0;phOn();uisMini(MAPS[curMap],3200,()=>{n++});const a=n;phOff();uisMini(MAPS[curMap],3200,()=>{n++});return[a,n]}")
        rep('⑦ โหมดถ่ายรูปไม่วาดแผนที่มุมจอ (ออกจากโหมดแล้ววาดปกติ)',mm==[0,1],str(mm))
        pk=await A.ev("()=>{const a=pfKey();const save=fxs.slice();for(let i=0;i<7;i++)fxs.push({k:'ring',x:me.x,y:me.y,r:40,t:1,d:1});const b=pfKey();fxs.length=0;save.forEach(f=>fxs.push(f));return[a,b]}")
        rep('ตัววัดความลื่นแยกผลตอนสู้หนัก',('สู้หนัก' not in pk[0]) and ('สู้หนัก' in pk[1]),json.dumps(pk,ensure_ascii=False))
        await A.wait(1500)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
