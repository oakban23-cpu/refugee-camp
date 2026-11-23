import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Ax1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("async()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;ov.hidden=true;enterMap(9,{x:1600,y:1700});await new Promise(r=>setTimeout(r,3000));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150));await new Promise(r=>setTimeout(r,600))}")
            r=await pg.evaluate("()=>{const L=CSPR||citySprites();return[astOn(),L.length,AX.BAST.length,AX.TURR.length,AX.GATE.length,AX.FOUNT.length,['bast','turr','bgate','fount'].every(k=>!!AST.f1[k])]}")
            rep('ชิ้นภาพวาดครบใน atlas และวางครบ 4 ป้อม/2 หอ/1 ซุ้ม/2 น้ำพุ',r[0] and r[2:6]==[4,2,1,2] and r[6],r)
            # วาดจริง: นับว่าสไปรต์ของ AX ถูกเรียกเมื่ออยู่ใกล้
            r=await pg.evaluate("""async()=>{const o=astSpr;const seen=new Set();window.astSpr=astSpr=function(s,k){seen.add(k);return o.apply(this,arguments)};const out={};
              for(const [x,y] of [[1300,2120],[1785,2000],[1600,1990],[860,1600],[2090,2090]]){me.x=x;me.y=y;await new Promise(r=>setTimeout(r,500))}window.astSpr=astSpr=o;return[...seen]}""")
            rep('วาดป้อม/หอ/ซุ้ม/น้ำพุบนจอจริง',all(k in r for k in ['bast','turr','bgate','fount']),r)
            # ชน: เดินเข้าน้ำพุไม่ได้ · ซุ้มเดินลอดกลางได้ · เสาชน
            r=await pg.evaluate("""()=>{const t=(x,y)=>{me.x=x;me.y=y;cityCollide();return[Math.round(me.x),Math.round(me.y)]};
              const f=AX.FOUNT[0];const a=t(f[0]+8,f[1]+4);const moved=Math.hypot(a[0]-f[0],a[1]-(f[1]-6))>=48;
              const g0=AX.GATE[0];const b=t(g0[0],g0[1]-4);const thru=b[0]===g0[0]&&b[1]===g0[1]-4;
              const c=t(g0[0]-45,g0[1]-6);const pil=!(c[0]===g0[0]-45&&c[1]===g0[1]-6);return[moved,thru,pil,a,b,c]}""")
            rep('น้ำพุชน (ผลักออก) · เดินลอดกลางซุ้มได้ · เสาซุ้มชน',r[0] and r[1] and r[2],r)
            # ปิดภาพวาด HD → ไม่วาด + ไม่มีสิ่งกีดขวางล่องหน
            r=await pg.evaluate("""async()=>{const n0=CITY.circ.length,r0=CITY.rects.length;HDI.on=false;await new Promise(r=>setTimeout(r,800));const L=CSPR||citySprites();const f=AX.FOUNT[0];me.x=f[0];me.y=f[1]-6;cityCollide();const free=Math.round(me.x)===f[0]&&Math.round(me.y)===f[1]-6;
              const n1=CITY.circ.length,r1=CITY.rects.length;HDI.on=true;await new Promise(r=>setTimeout(r,1500));return[n0-n1,r0-r1,free,astOn(),CITY.circ.length===n0,CITY.rects.length===r0]}""")
            rep('ปิดภาพวาด: เอาสิ่งกีดขวางออก เดินผ่านได้ · เปิดกลับมาครบเท่าเดิม',r[0]==2 and r[1]==2 and r[2] and r[4] and r[5],r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
