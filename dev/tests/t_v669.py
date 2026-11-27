"""v669 วางของที่เหลือจากชุดค่าย"""
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
        r=await A.ev("()=>{const P=FSW.find(w=>w.big);const inT=trees.filter(t=>((t.x-P.x)/(P.rx+40))**2+((t.y-P.y)/(P.ry+40))**2<1).length;return [FSW.length,!!P,inT]}")
        rep('มีบ่อใหญ่ใหม่ปลายลำธาร (รวม 2 บ่อ) และไม่มีต้นไม้ทับบ่อ',r==[2,True,0],r)
        r=await A.ev("()=>{const w=FSW.find(w=>w.big);me.x=w.x+7;me.y=w.y+5;fshCollide();return Math.round((((me.x-w.x)/(w.rx+6))**2+((me.y-w.y)/(w.ry+4))**2)*100)/100}")
        rep('เดินลงบ่อใหญ่ไม่ได้',r>=.99,r)
        r=await A.ev("()=>{const w=FSW.find(w=>w.big);me.x=w.x;me.y=w.y+w.ry+40;const w2=fsWaterAt(me.x,me.y,60);return !!(w2&&w2.big)}")
        rep('ยืนริมบ่อใหญ่ → ตกปลาได้',r is True,r)
        r=await A.ev("""()=>{const F=depBuild(),f=F.L.find(f=>f.k==='cpx');const c=document.createElement('canvas');c.width=c.height=64;let e=null;try{depPaintF(c.getContext('2d'),f,'grass')}catch(q){e=String(q)}const ks=new Set(f.L.map(q=>q[0]));return [e,f.L.length,['SIGNPOST','LANTERN_POST','CAMPFIRE_SMALL','BENCH_LOG','_WALL','STEPPING_STONES'].every(k=>ks.has(k))]}""")
        rep('ของริมทาง/จุดพัก/กำแพงหิน/หินเหยียบ อบลงพื้นได้',r[0] is None and r[1]>=15 and r[2],r)
        r=await A.ev("""()=>{const P=CanvasRenderingContext2D.prototype,o=P.drawImage;let n=0;P.drawImage=function(im,sx,sy){if(im===CPG.I.a&&sx===CPG.M.BRIDGE_STONE[0]&&sy===CPG.M.BRIDGE_STONE[1])n++;return o.apply(this,arguments)};try{CAMP.cache=null;campBuild()}finally{P.drawImage=o}return n}""")
        rep('สะพานหินตรงถนนฝั่งตะวันตก',r==1,r)
        r=await A.ev("""()=>{const P=CanvasRenderingContext2D.prototype,o=P.drawImage;let a=0,d=0;P.drawImage=function(im,sx,sy){if(im===CPG.I.a){if(sx===CPG.M.POND_LARGE[0]&&sy===CPG.M.POND_LARGE[1])a++;if(sx===CPG.M.FISHING_DOCK[0]&&sy===CPG.M.FISHING_DOCK[1])d++}return o.apply(this,arguments)};try{for(const w of FSW){cam.x=w.x-300;cam.y=w.y-200;fshDraw()}}finally{P.drawImage=o}return [a,d]}""")
        rep('บ่อใหญ่ใช้ภาพบ่อใหญ่ · ท่าตกปลาที่บ่อริมบึง',r[0]>=1 and r[1]>=1,r)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
