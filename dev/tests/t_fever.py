"""v406 โหมดคลั่ง: เพื่อนเห็นออร่า/ระเบิดปิดฉาก · ออร่าหายตอนจบ · ปิดในลานประลอง"""
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
        A=await new_client(b,'Hot','mage',50);B=await new_client(b,'Obs','sup',50)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;const N=MAPS[2].nests[0];enterMap(2,{x:N[0]-120,y:N[1]+40})}")
        await A.wait(3500)
        for c in (A,B): await c.ev("()=>{AUTO.on=false;AUTO.sel={0:0,1:0,2:0,3:0,4:0,5:0};try{aqHB(false)}catch(e){};HB.on=false;setInterval(()=>{mons.forEach(m=>{if(m.t<3){m.x=-9999;m.y=-9999}})},100);FV.on=0;FV.g=0;fxs=fxs.filter(f=>f.k!=='fvon')}")
        await A.wait(1500)
        for _ in range(16):
            if A.uid in await B.ev("()=>Object.keys(others)"): break
            await A.wait(500)
        await B.ev("()=>{window.__mx={};clearInterval(window.__mi);window.__mi=setInterval(()=>{['fvon','fvx'].forEach(k=>{const n=fxs.filter(f=>f.k===k).length;__mx[k]=Math.max(__mx[k]||0,n)})},50)}")
        a=await A.ev("()=>{FV.g=98;fvAdd(4);return {on:FV.on,as:M('as'),gd:fdM('gd'),vis:!$('fvg').hidden,ov:$('fvov').classList.contains('on')}}")
        rep('A เข้าโหมดคลั่ง (เกจเต็ม)', a['on']>8 and a['vis'] and a['ov'], json.dumps(a))
        await A.wait(1500)
        o=await B.ev("()=>({mx:__mx,now:fxs.filter(f=>f.k==='fvon').length})")
        rep('B เห็นออร่าคลั่งของ A', o['now']==1, json.dumps(o))
        await A.ev("()=>{FV.on=.05}");await A.wait(1500)
        o=await B.ev("()=>({mx:__mx,now:fxs.filter(f=>f.k==='fvon').length})")
        rep('จบคลั่ง: B เห็นระเบิดปิดฉาก และออร่าหาย', o['mx'].get('fvx',0)>=1 and o['now']==0, json.dumps(o))
        a=await A.ev("()=>({on:FV.on,as:M('as'),vis:!$('fvg').hidden,ov:$('fvov').classList.contains('on')})")
        rep('A กลับเป็นปกติ', a['on']<=0 and not a['ov'], json.dumps(a))
        a=await A.ev("()=>{const o=sgOff;sgOff=()=>true;FV.g=0;fvAdd(200);const r={on:FV.on,g:FV.g};sgOff=o;return r}")
        rep('ลานประลอง/ด่าน trial: ไม่เติมเกจ', a['on']<=0 and a['g']==0, json.dumps(a))
        errs=[x for x in A.errs+B.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
