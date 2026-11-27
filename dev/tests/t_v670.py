"""v670 จัดธรรมชาติแมพ 1"""
import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, '' if ok else info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;window.DNH=12}")
        await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(CPG.st||Date.now()-t0>20000){clearInterval(iv);r(1)}},250)})")
        await A.wait(1500)
        r=await A.ev("()=>{const s=depBuild().L.find(f=>f.k==='stream');const bad=s.pts.filter(([x,y])=>terLv(x,y)!==0||terLv(x,y-60)!==0).length;return [bad,s.pts.length,Math.round(s.pts[0][1])]}")
        rep('ลำธารไม่ไหลผ่านที่ราบสูง/หน้าผา/บันได',r[0]==0 and r[1]>100,r)
        r=await A.ev("()=>{const F=depBuild(),s=F.L.find(f=>f.k==='stream');const inS=trees.filter(t=>!t.inv&&cpSegD(s.pts,t.x,t.y)<s.w/2+t.r).length;const st=[];terGet().forEach(P=>P.st.forEach(q=>st.push(q)));const onSt=trees.filter(t=>st.some(q=>t.x>q.r[0]-t.r&&t.x<q.r[2]+t.r&&t.y>q.r[1]-t.r&&t.y<q.r[3]+t.r+20)).length;const vmS=VM.P.filter(o=>cpSegD(s.pts,o.x,o.y)<s.w/2+6).length;return [inS,onSt,vmS,trees.length,VM.P.length]}")
        rep('ไม่มีต้นไม้/ของประดับในลำธาร และไม่มีต้นไม้ขวางบันได',r[0]==0 and r[1]==0 and r[2]==0 and r[3]>150 and r[4]>300,r)
        r=await A.ev("()=>{const o={k:'rock',x:0,y:0,s:1.5,r:.7,f:1},s=mxVMSpr(o,MXC[1]),o2={k:'mrock',x:0,y:0,s:1.5,r:.2,f:-1},s2=mxVMSpr(o2,MXC[1]);return [!!s&&s.c.width>40,!!s2]}")
        rep('หิน/ของประดับใช้ภาพวาด',r==[True,True],r)
        r=await A.ev("""()=>{const F=depBuild(),c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');let e=null;try{for(const f of F.L)depPaintF(x,f,'grass');const o={x:10,y:10,s:1,r:.3};g.save();VMD.puddle(o,1);g.restore()}catch(q){e=String(q)}return e}""")
        rep('วาดทุ่งดอกไม้/แท่นหิน/แอ่งน้ำแบบใหม่ไม่พัง',r is None,r)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
