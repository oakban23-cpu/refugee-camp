"""v449 เดินด้วย WASD / ปุ่มลูกศร บน PC"""
import asyncio, sys, json, math
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
        A=await new_client(b,'Kbd','melee',30)
        await A.ev("()=>{ov.hidden=true;enterMap(1,{x:CX,y:CY+150})}");await A.wait(2500)
        await A.ev("()=>{AUTO.on=false;try{aqHB(false)}catch(e){};HB.on=false;document.activeElement&&document.activeElement.blur()}")
        K=A.pg.keyboard
        async def hold(keys,ms):
            p0=await A.ev("()=>[me.x,me.y]")
            for k in keys: await K.down(k)
            await A.wait(ms)
            for k in keys: await K.up(k)
            await A.wait(150)
            p1=await A.ev("()=>[me.x,me.y]")
            return [round(p1[0]-p0[0]),round(p1[1]-p0[1])]
        d=await hold(['KeyD'],800);rep('กด D เดินขวา',d[0]>60 and abs(d[1])<8,str(d))
        d=await hold(['KeyA'],800);rep('กด A เดินซ้าย',d[0]<-60 and abs(d[1])<8,str(d))
        d=await hold(['KeyW'],800);rep('กด W เดินขึ้น',d[1]<-60 and abs(d[0])<8,str(d))
        d=await hold(['KeyS'],800);rep('กด S เดินลง',d[1]>60 and abs(d[0])<8,str(d))
        s1=await hold(['KeyD'],800);dg=await hold(['KeyW','KeyD'],800)
        rep('กดทแยง W+D เดินเฉียง ความเร็วเท่าเดินตรง',dg[0]>30 and dg[1]<-30 and abs(math.hypot(*dg)/max(1,abs(s1[0]))-1)<.2,json.dumps([s1,dg]))
        d=await hold(['ArrowLeft'],800);rep('ปุ่มลูกศรใช้ได้',d[0]<-60,str(d))
        st=await A.ev("()=>joy");rep('ปล่อยปุ่มแล้วหยุด (ไม่มีจอยค้าง)',st is None,str(st))
        await A.ev("()=>{toggleChat(true);const i=document.querySelector('#chi,#chat input,input');if(i)i.focus();return !!i}")
        d=await hold(['KeyD'],600);rep('พิมพ์แชทอยู่ กด D ไม่เดิน',abs(d[0])<3,str(d))
        await A.ev("()=>{try{toggleChat(false)}catch(e){};document.activeElement&&document.activeElement.blur()}")
        await A.ev("()=>{ov.hidden=false}");d=await hold(['KeyD'],600);await A.ev("()=>{ov.hidden=true}")
        rep('เปิดหน้าต่างเมนูอยู่ ไม่เดิน',abs(d[0])<3,str(d))
        await K.down('KeyD');await A.wait(300);await A.ev("()=>dispatchEvent(new Event('blur'))");await A.wait(300)
        p0=await A.ev("()=>me.x");await A.wait(400);p1=await A.ev("()=>me.x");await K.up('KeyD')
        rep('สลับหน้าต่าง (blur) ปุ่มค้างถูกล้าง ไม่เดินต่อเอง',abs(p1-p0)<2,json.dumps([p0,p1]))
        await K.down('KeyD');await A.wait(200)
        pj=await A.ev("()=>{joy={ox:100,oy:100,dx:0,dy:-40,t0:performance.now(),mv:1};const y0=me.y,x0=me.x;return new Promise(r=>setTimeout(()=>{const o=[Math.round(me.x-x0),Math.round(me.y-y0)];joy=null;r(o)},400))}")
        await K.up('KeyD')
        rep('ลากจอยบนจอ/เมาส์อยู่ จอยนั้นมาก่อนคีย์บอร์ด',pj[1]<-20 and abs(pj[0])<8,str(pj))
        errs=[x for x in A.errs if 'ERR_' not in x and 'favicon' not in x]
        rep('ไม่มี error', not errs, str(errs[:3]))
        print('SUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
    finally: p.terminate()
asyncio.run(main())
