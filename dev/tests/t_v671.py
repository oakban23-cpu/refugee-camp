"""v671 แต่งยอดที่ราบสูง"""
import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, '' if ok else info, flush=True)
J="()=>{const q=depBuild().L.find(f=>f.k==='cpx');const A=cp11Items();return JSON.stringify(A.map(a=>[a[0],Math.round(a[1]),Math.round(a[2])]))}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;window.DNH=12}")
        await A.wait(3000)
        r=await A.ev("()=>{const q=depBuild().L.find(f=>f.k==='cpx');const A=q.L.filter(a=>CP11.K.some(k=>k[0]===a[0])&&TERD[1].some(([cx,cy,R0])=>Math.hypot(a[1]-cx,a[2]-cy)<R0));return [q._cp11,A.length,A.every(a=>terLv(a[1],a[2])===1&&terLv(a[1],a[2]+22)===1),A.filter(a=>cpBad(a[1],a[2],10,'p')).length]}")
        rep('ยอดที่ราบสูง 3 แห่งมีของแต่งภาพวาด อยู่บนยอดทั้งหมด ไม่ขวางบันได/ขอบผา',r[0]==1 and r[1]>=24 and r[2] and r[3]==0,r)
        a1=await A.ev(J)
        await A.ev("()=>{enterMap(3,{x:MAPS[3].sx,y:MAPS[3].sy})}");await A.wait(1500)
        await A.ev("()=>{enterMap(1,{x:MAPS[1].sx,y:MAPS[1].sy})}");await A.wait(1500)
        a2=await A.ev(J)
        rep('วางตำแหน่งเดิมทุกครั้ง (ออกแมพแล้วกลับมา)',a1==a2,(len(a1),len(a2)))
        r=await A.ev("()=>{const F=depBuild(),c=document.createElement('canvas');c.width=c.height=64;let e=null;try{depPaintF(c.getContext('2d'),F.L.find(f=>f.k==='cpx'),'grass')}catch(q){e=String(q)}return e}")
        rep('วาดลงพื้นได้ไม่พัง',r is None,r)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
