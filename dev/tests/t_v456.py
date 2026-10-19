"""v456 บ้านกิลด์ HD"""
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
        A=await new_client(b,'Ann','melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true}");await A.wait(1500)
        await A.ev("()=>{gdEmit('mk',{nm:'ภาพสวย',tag:'HD',e:2,col:5})}");await A.wait(1300)
        await A.ev("()=>{ghEnter()}");await A.wait(1000)
        ok=await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(ghHDok()||Date.now()-t0>15000){clearInterval(iv);r(ghHDok())}},200)})")
        await A.wait(600)
        st=await A.ev("()=>({hd:GHS.hd,ck:GHS.ck})")
        rep('เข้าบ้านกิลด์ → โหลดภาพ HD ครบ 4 ชุด → แคชใช้ภาพ HD',ok and st['hd']==1 and st['ck'].endswith('|hd'),json.dumps(st))
        r=await A.ev("()=>{const L=[];for(let t=1;t<=5;t++){const t0=performance.now();const C=ghBuild(t,'#58c06a','🛡️');L.push([C.cv.width,GHS.hd,Math.round(performance.now()-t0),GHR[0][2]])}return L}")
        rep('สร้างภาพ HD ครบ 5 ขั้น (เวลาสร้างแคชแต่ละขั้น < 1.5 วิ) · โถงขั้น 5 กว้างขึ้นตามพระราชวัง',all(x[0]>1000 and x[1]==1 and x[2]<1500 for x in r) and r[4][3]==226,json.dumps(r))
        cl=await A.ev("()=>{GDS.g.hq.t=3;GHS.ck='';return new Promise(res=>setTimeout(()=>{me.x=CX;me.y=CY+40;tentCollide();const d=Math.round(Math.hypot(me.x-CX,me.y-CY-22));me.x=CX-232;me.y=CY+150;tentCollide();res([d,GHTP[2][1],Math.round(Math.hypot(me.x-CX+232,me.y-CY-150))])},300))}")
        rep('กันชนตามภาพ HD: สระกลางลานขั้น 3 · ต้นไม้แถวสองเลื่อนขึ้น',cl[0]>=110 and cl[1]==100,json.dumps(cl))
        fb=await A.ev("()=>{HDI.on=false;GHS.ck='';return new Promise(r=>setTimeout(()=>{r([GHS.hd,GHS.ck.endsWith('|v')]);HDI.on=true;GHS.ck=''},300))}")
        rep('ปิดภาพ HD → กลับไปใช้ภาพเวกเตอร์เดิม',fb==[0,True],json.dumps(fb))
        tr=await A.ev("()=>{const a=ghTreeSpr('a',1),o=ghTreeSpr('o',0);return [a.width,o.width,ghTreeSpr('a',1)===a]}")
        rep('ต้นไม้สวนผลไม้วาดเป็นภาพแคช (โอ๊ก/แอปเปิล)',tr==[240,240,True],json.dumps(tr))
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
