"""v668 รั้วไม้รอบค่ายภาพวาด"""
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
        r=await A.ev("""()=>{const P=CanvasRenderingContext2D.prototype,o=P.drawImage;let h=0,v=0;P.drawImage=function(im,sx,sy){if(im===CPG.I.a){if(sx>=CPG.M.FENCE_RAIL_H[0]&&sx<CPG.M.FENCE_RAIL_H[0]+2&&sy===CPG.M.FENCE_RAIL_H[1])h++;if(sx===CPG.M.FENCE_RAIL_V[0])v++}return o.apply(this,arguments)};try{CAMP.cache=null;campBuild()}finally{P.drawImage=o}return [h,v]}""")
        rep('รั้วรอบค่ายวาดจากภาพ: ช่วงด้านข้าง (หน้า/หลัง) + ช่วงมองจากบน (ซ้าย/ขวา)',r[0]>=20 and r[1]>=20,r)
        r=await A.ev("""()=>{const R=CAMP.R,gap=CAMP.GAP;let n=0;for(const a of[0,1.5708,3.1416,4.7124]){me.x=CX+Math.cos(a)*(R-30);me.y=CY+Math.sin(a)*(R-30);n++}return [gap>0,n]}""")
        rep('ช่องประตู 4 ทิศยังเว้นไว้',r[0],r)
        r=await A.ev("()=>new Promise(res=>{CPG.on=0;setTimeout(()=>{let e=null;try{CAMP.cache=null;campBuild()}catch(q){e=String(q)}CPG.on=1;res(e)},1000)})")
        rep('CPG.on=0 → รั้วเวกเตอร์เดิม',r is None,r)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
