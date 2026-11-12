import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
H="""window.__bx=(m,cf,hf)=>{const og=g,oc=curMap;const C=document.createElement('canvas');C.width=600;C.height=500;const G=C.getContext('2d');g=G;curMap=3;try{drawBossAnim(m,performance.now()/1000,hf||0,cf||0,m.hp<m.mh*.3)}finally{g=og;curMap=oc}
 const d=G.getImageData(0,0,600,500).data;let x0=999,x1=-1,y0=999,y1=-1,n=0;for(let y=0;y<500;y++)for(let x=0;x<600;x++)if(d[(y*600+x)*4+3]>150){n++;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}return{x0,x1,y0,y1,n,cx:(x0+x1)/2}};
window.__mk=(o)=>{const m=Object.assign({id:800000+Math.floor(Math.random()*99999),t:3,x:300,y:330,hp:99,mh:100,castT:0},o||{});BMS[m.id]={x:m.x,y:m.y,t:performance.now()/1000,mv:0,dir:1,ph:0};return m};0"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','Tx'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            await pg.evaluate(H);await pg.evaluate("()=>{me.x=100;me.y=330}")
            rep('ติดตั้งตัวห่อท่าบอส (BXA)',await pg.evaluate("()=>BXA.on===1&&typeof bxaKey==='function'"))
            r=await pg.evaluate("()=>{const m=__mk({hp:100});const a=__bx(m);const b=__mk({hp:100});BXA.s[b.id]={born:0,drop:false,land:1,er:false,ert:0,ck:0,ct:0,tz:1e15,tt:0,ss:0};const c=__bx(b);return [a.y0,c.y0]}")
            rep('ปรากฏตัวเต็มเลือด: เริ่มสูงกว่าพื้นมาก (ทิ้งดิ่ง)',r[0]<r[1]-80,r)
            r=await pg.evaluate("""()=>{const pre={born:0,drop:false,land:1,er:false,ert:0,ck:0,ct:0,tz:1e15,tt:0,ss:0};const m=__mk();BXA.s[m.id]=Object.assign({},pre);const n0=__bx(m,0);
              const w=__mk();BXA.s[w.id]=Object.assign({},pre);w.castT=1;const wu=__bx(w,1-.26);const s=__mk();BXA.s[s.id]=Object.assign({},pre);s.castT=2;const sk=shk;shk=0;const st=__bx(s,1-.44);const sh=shk;shk=sk;return [n0.cx,wu.cx,st.cx,sh]}""")
            rep('ร่าย 3 จังหวะ: ง้างถอยหลัง แล้วพุ่งไปข้างหน้า + จอสั่นตอนกระแทก',r[1]<r[0]-2 and r[2]>r[0]+10 and r[3]>=.3,r)
            r=await pg.evaluate("()=>{const m=__mk({hp:20});BXA.s[m.id]={born:0,drop:false,land:1,er:false,ert:0,ck:0,ct:0,tz:1e15,tt:0,ss:0};const sk=shk;shk=0;const n=BXA.rg.length;__bx(m);const r=[shk,BXA.s[m.id].er,BXA.rg.length>=n];shk=sk;return r}")
            rep('เลือดต่ำกว่า 30%: คำรามเข้าโหมดคลั่ง (จอสั่นแรง)',r[0]>=.7 and r[1],r)
            r=await pg.evaluate("()=>{const m=__mk();BXA.s[m.id]={born:0,drop:false,land:1,er:false,ert:0,ck:0,ct:0,tz:0,tt:0,ss:0};__bx(m);return !!BXA.s[m.id].tt}")
            rep('ยืนนิ่งถึงเวลา → เริ่มท่าคำรามข่มขู่',r)
            r=await pg.evaluate("()=>{const m=__mk();BXA.on=0;const a=__bx(m,.5);BXA.on=1;return a.n>1000}")
            rep('BXA.on=0 ปิดได้ (วาดแบบเดิม)',r)
            r=await pg.evaluate("""()=>{const pre={born:0,drop:false,land:1,er:false,ert:0,ck:0,ct:0,tz:1e15,tt:0,ss:0};const og=g;const C=document.createElement('canvas');C.width=600;C.height=500;g=C.getContext('2d');const ms=[];for(let i=0;i<20;i++){const m=__mk();BXA.s[m.id]=Object.assign({},pre);m.castT=1;ms.push(m)}
               const run=on=>{BXA.on=on;const t0=performance.now();for(let r=0;r<15;r++)ms.forEach((m,i)=>drawBossAnim(m,r*.05,0,(i%10)/10,false));return performance.now()-t0};run(1);run(0);const a=run(0),b=run(1),c=run(0),d=run(1);BXA.on=1;g=og;return [(b+d)/(a+c),a,b]}""")
            rep('ความเร็ว: ไม่ช้ากว่าเดิมเกิน 1.25 เท่า',r[0]<1.25,r)
            # in game tower
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;AUTO.on=false;ov.hidden=true;twCreate(1)}");await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;dg.ph='lobby';TWCL=null;twBegin(10);banner=null}");await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{me.blPick=null;try{$('blpk').hidden=true}catch(e){}}");await pg.wait_for_timeout(5000)
            await pg.evaluate("()=>{const b=mons.find(q=>q.t===3);if(b){me.x=b.x-150;me.y=b.y+30}}");await pg.wait_for_timeout(1500)
            r=await pg.evaluate("()=>{const b=mons.find(q=>q.t===3);return b?[!!BXA.s[b.id],BXA.s[b.id]&&BXA.s[b.id].land>0]:null}")
            rep('ในเกม: บอสหอคอยชั้น 10 ใช้ท่าใหม่ และลงพื้นแล้ว',r and r[0] and r[1],r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
