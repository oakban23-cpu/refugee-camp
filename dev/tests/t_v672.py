"""v672 ภาพชุดค่ายในแมพ 13 สวนลอยฟ้าร้าง"""
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
        await A.wait(2000)
        await A.ev("()=>{enterMap(13,{x:MAPS[13].sx,y:MAPS[13].sy})}")
        r=await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(CPG.st||Date.now()-t0>20000){clearInterval(iv);r([CPG.ok,CPG.st,curMap])}},250)})")
        rep('เข้าแมพ 13 โดยตรง → โหลดภาพชุดค่ายและเปิดใช้',r==[1,True,13],r)
        await A.wait(2500)
        r=await A.ev("()=>{const k='mx'+MX.v;return [!!(mxTile(k+'w130',MXT.w130)||{}).cp,!!(mxTile(k+'w131',MXT.w131)||{}).cp,!(mxTile(k+'w132',MXT.w132)||{}).cp]}")
        rep('พื้นหญ้า w130/w131 เป็นลายวาด · ชั้นดอกไม้ w132 คงเดิม',all(r),r)
        r=await A.ev("()=>{const o=VM.P.find(o=>CPVM[o.k]);const s=mxVMSpr(o,MXC[13]);return [o.k,[...MX.vsp.keys()].some(k=>k.indexOf('cpvm|')===0)]}")
        rep('หิน/ตอ/พุ่ม/เห็ด เป็นภาพวาด',r[1],r)
        r=await A.ev("()=>{const F=depBuild(),c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');let e=null,n=0;const P=CanvasRenderingContext2D.prototype,o=P.drawImage;P.drawImage=function(im){if(im===CPG.I.a)n++;return o.apply(this,arguments)};try{for(const f of F.L)if(f.k==='meadow')depPaintF(x,f,'w13')}catch(q){e=String(q)}finally{P.drawImage=o}return [e,n]}")
        rep('ทุ่งดอกไม้วาดด้วยภาพใหม่ได้ไม่พัง',r[0] is None and r[1]>0,r)
        r=await A.ev("()=>{const t=trees.find(t=>!t.k&&!t.pp&&!t.inv);return [!!TRA.m[13],natOn()]}")
        rep('ต้นไม้ยังใช้ภาพวาดเฉพาะแมพ 13 (TRA) ตามเดิม',r[0],r)
        fb=await A.ev("()=>new Promise(r=>{CPG.on=0;setTimeout(()=>{const k='mx'+MX.v;const a=[CPG.st,!!(mxTile(k+'w130',MXT.w130)||{}).cp];CPG.on=1;r(a)},1200)})")
        rep('CPG.on=0 → พื้นแมพ 13 กลับแบบเดิม',fb==[False,False],fb)
        await A.ev("()=>{enterMap(1,{x:MAPS[1].sx,y:MAPS[1].sy})}");await A.wait(2500)
        r=await A.ev("()=>{const k='mx'+MX.v;return [curMap,CPG.st,!!(mxTile(k+'g0',MXT.g0)||{}).cp]}")
        rep('กลับแมพ 1 ยังเป็นภาพชุดค่ายตามเดิม',r==[1,True,True],r)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
