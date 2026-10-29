"""v560 กันหลุดขอบลานดันภาค 8–9 (เจอจากบอททั่วไปบนเรือดำ)
   สกิลพุ่ง/ถอยกระโดด (dash) ย้ายตัวทีเดียว ~110 ข้ามแนวกันชนขอบลาน → ตัวกันชนดันออกนอกลาน = ติดนอกเรือ/นอกลานจนจบดัน
   ① ทั้ง 6 ดัน (เรือดำ · ท้องวาฬ · ตาพายุ · หอนาฬิกาดาว · ใจกลางตาข่าย · ยอดหอทอดาว): พุ่งออกนอกขอบ → กลับเข้าลานจุดที่ใกล้ที่สุด และอยู่ในลานต่อ
      ทั้งแบบกดสกิลเอง (นอกเฟรม) และแบบออโต้สกิล (กลางเฟรมหลังชนต้นไม้)
   ② เดินชิดขอบปกติไม่โดนย้าย · ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
IN="""()=>{const M=MAPS[curMap];if(M.gdl)return gdlIn(me.x,me.y,0);if(M.wbl)return wblIn(me.x,me.y,0);if(M.wsk)return wskIn(me.x,me.y,0);
  const R=M.ctw?CTR:M.cwn?CWR:WVRR;return Math.hypot(me.x-CX,me.y-CY)<R}"""
# [ดัน, ฟังก์ชันเข้า, จุดเริ่ม (dx,dy จาก CX,CY), มุมพุ่ง]
CASES=[('เรือดำ','gdlEnter',(-100,215),1.5708),('ท้องวาฬ','wblEnter',(-300,150),1.5708),('ตาพายุ','wskEnter',(0,560),1.5708),
       ('หอนาฬิกาดาว','ctwEnter',(0,500),1.5708),('ใจกลางตาข่าย','cwnEnter',(0,480),1.5708),('ยอดหอทอดาว','wvrEnter',(0,500),1.5708)]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Vk'+str(random.randint(100,999)),'archer',99)
        await A.ev("()=>{window.DNH=12;AUTO.on=false;me.gold=1e8;ov.hidden=true;gmGod=true;enterMap(45,{x:1600,y:1300})}");await A.wait(1500)
        await A.ev("""()=>{if(window.__ak)return;window.__ak=1;const oa=autoTick;window.autoTick=autoTick=function(dt){if(window.__dashA!=null){const a=window.__dashA;window.__dashA=null;dash(a,110,0)}return oa.apply(this,arguments)}}""")
        res={}
        for nm,E,(dx,dy),a in CASES:
            await A.ev(f"()=>{{if(isDg())dgLeave()}}");await A.wait(1300)
            await A.ev(f"()=>{{me.down=0;me.hp=me.mh;enterMap(45,{{x:1600,y:1300}})}}");await A.wait(900)
            await A.ev(f"()=>{{{E}()}}");await A.wait(1800)
            r=await A.ev("""async([dx,dy,a])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const IN="""+IN+""";const o={map:curMap,dg:isDg()};
              /* แบบกดเอง: พุ่งนอกเฟรม */me.x=CX+dx;me.y=CY+dy;await w(300);o.in0=IN();const p0=[me.x,me.y];dash(a,110,0);o.out=!IN();await w(350);o.in1=IN();o.mv1=Math.round(Math.hypot(me.x-p0[0],me.y-p0[1]));await w(700);o.in1b=IN();o.p1=[Math.round(me.x-CX),Math.round(me.y-CY)];
              /* แบบออโต้สกิล: พุ่งกลางเฟรม (หลังชนต้นไม้) */me.x=CX+dx;me.y=CY+dy;await w(300);const p2=[me.x,me.y];window.__dashA=a;await w(350);o.in2=IN();o.mv2=Math.round(Math.hypot(me.x-p2[0],me.y-p2[1]));await w(700);o.in2b=IN();
              /* เดินชิดขอบปกติ (ดันเข้าหาขอบ 1.2 วิ) → ไม่โดนย้ายไกล */me.x=CX+dx;me.y=CY+dy;await w(300);const p3=[me.x,me.y];joy={ox:JB.x,oy:JB.y,dx:Math.cos(a)*40,dy:Math.sin(a)*40,t0:performance.now(),mv:1};await w(1200);joy=null;o.in3=IN();o.mv3=Math.round(Math.hypot(me.x-p3[0],me.y-p3[1]));
              return o}""",[dx,dy,a])
            res[nm]=r
        ok1=all(v['dg'] and v['in0'] and v['out'] and v['in1'] and v['in1b'] and v['mv1']<150 for v in res.values())
        rep('กดสกิลพุ่งออกนอกขอบลาน → กลับเข้าลาน (จุดใกล้สุด) และอยู่ในลานต่อ · ครบ 6 ดัน',ok1,res)
        ok2=all(v['in2'] and v['in2b'] and v['mv2']<150 for v in res.values())
        rep('ออโต้สกิลพุ่งออกนอกขอบกลางเฟรม → กลับเข้าลานเหมือนกัน · ครบ 6 ดัน',ok2,{k:[v['in2'],v['in2b'],v['mv2']] for k,v in res.items()})
        ok3=all(v['in3'] and v['mv3']<130 for v in res.values())
        rep('เดินดันชิดขอบลานปกติ → ยังอยู่ในลาน ไม่ถูกย้ายแปลก ๆ',ok3,{k:[v['in3'],v['mv3']] for k,v in res.items()})
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
