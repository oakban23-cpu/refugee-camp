import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate('()=>{window.__ol=1}')
            await pg.evaluate(SETUP,['archer','T48'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;LOWQ=false;FQ.avg=10;enterMap(16,{x:1600,y:1600})}");await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;LOWQ=false;FQ.avg=10;const ms=mons.filter(m=>m.t!==3&&m.hp>0);if(ms.length){me.x=ms[0].x-60;me.y=ms[0].y}setInterval(()=>{me.down=0;me.hp=me.mh},30)}");await pg.wait_for_timeout(800)
            r=await pg.evaluate("async()=>{LOWQ=false;FQ.avg=10;const a=[OL.n,OL.nm,OL.mn||0];await new Promise(r=>setTimeout(r,600));return[OL.on,OL.n-a[0],OL.nm-a[1],(OL.mn||0)-a[2],OL.err]}")
            rep('เปิดเป็นค่าเริ่มต้น: ตัวละคร/NPC มีขอบ · ฝูงมอนมีขอบ · ตัวเรามีขอบสีครีม',r[0]==1 and r[1]>3 and r[2]>3 and r[3]>3 and r[4]=='',r)
            # วัดขอบจริงรอบตัวเรา: เทียบภาพเปิด/ปิด ที่จุดรอบตัว (กรอบรอบตัวเรา) ต้องมีพิกเซลสีครีมเพิ่มขึ้น
            r=await pg.evaluate("""()=>{const run=on=>{OL.on=on;OL.cnt=0;const c=document.createElement('canvas');c.width=c.height=400;const x=c.getContext('2d');x.setTransform(3,0,0,3,200-3*me.x,330-3*me.y);const G0=g;g=x;
                try{drawChar(me.x,me.y,me.cls,1,0,myLk('h'),0,myLk('b'),myLk('w'),myLk('a'),c2v())}finally{g=G0}const d=x.getImageData(0,0,400,400).data;let cream=0,dark=0,op=0;
                for(let i=0;i<d.length;i+=4){if(d[i+3]>200)op++;if(d[i+3]>150&&d[i]>230&&d[i+1]>210&&d[i+2]>160&&d[i+2]<215)cream++}return[op,cream]};
              const a=run(0),b=run(1);OL.on=1;return[a,b]}""")
            rep('ขอบสีครีมรอบตัวเรา: ร่างใหญ่ขึ้นและมีขอบสีครีมจริง',r[1][0]>r[0][0]*1.06 and r[1][1]>r[0][1]+300,r)
            r=await pg.evaluate("""()=>{const G0=g,c=document.createElement('canvas');c.width=c.height=200;const x=c.getContext('2d');let out=[];g=G0;
              const n0=OL.n;x.setTransform(2,0,0,-2,100,150);const s=g;g=x;try{drawChar(0,0,'archer',1,0,0,0,0)}catch(e){}g=s;out.push(OL.n-n0);
              const n1=OL.n;g.save();g.globalAlpha=.3;try{drawChar(0,0,'archer',1,0,0,0,0)}catch(e){}g.restore();out.push(OL.n-n1);return out}""")
            rep('ภาพสะท้อน/ภาพโปร่ง/พรีวิว → ไม่ใส่ขอบ',r==[0,0],r)
            r=await pg.evaluate("async()=>{const o=[];for(const [k,f] of [['off',()=>{OL.on=0}],['lowq',()=>{OL.on=1;LOWQ=true}],['lag',()=>{LOWQ=false;FQ.avg=99}]]){f();const a=OL.n+OL.nm;await new Promise(r=>setTimeout(r,300));o.push(OL.n+OL.nm-a)}LOWQ=false;FQ.avg=10;OL.on=1;return o}")
            rep('ปิดได้ / โหมดประหยัด / เครื่องหน่วง → ไม่วาดขอบ',r==[0,0,0],r)
            r=await pg.evaluate("""async()=>{cfgUI();await new Promise(r=>setTimeout(r,300));const b=document.querySelector('[data-olrow] button');if(!b)return['no row'];const t0=b.textContent;b.click();await new Promise(r=>setTimeout(r,100));const o=[t0,b.textContent,OL.on,localStorage.getItem('refugee_ol')];b.click();return o}""")
            rep('ตั้งค่า: แถว ✏️ เปิด/ปิด + จำในเครื่อง',r==['เปิดอยู่','ปิดอยู่',0,'0'],r)
            r=await pg.evaluate("""async()=>{ov.hidden=true;const T=async on=>{OL.on=on;LOWQ=false;FQ.avg=10;let tot=0,k=0;const f0=zmPost;let last=performance.now();await new Promise(r=>setTimeout(r,200));const t0=performance.now(),n0=OL.n;await new Promise(r=>setTimeout(r,1500));return(performance.now()-t0)};
              const f0=drawChar;let acc=0,cnt=0;drawChar=function(){const t=performance.now();const r=f0.apply(this,arguments);acc+=performance.now()-t;cnt++;return r};
              OL.on=0;acc=0;cnt=0;await new Promise(r=>setTimeout(r,1200));const off=acc/Math.max(1,cnt);OL.on=1;acc=0;cnt=0;await new Promise(r=>setTimeout(r,1200));const on=acc/Math.max(1,cnt);drawChar=f0;return[+off.toFixed(3),+on.toFixed(3),cnt]}""")
            print('INFO เวลาวาดต่อตัว (ms) ปิด/เปิดขอบ', r)
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>OL.err"),[errs,await pg.evaluate("()=>OL.err")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
