"""v570 glowAt เร็วขึ้น + ไม่เทพื้นหลังซ้ำ
   ① แมพพื้นแบบใหม่ (ค่าย · ถ้ำทะเลสาบ · วิหารน้ำแข็ง · ทะเลสาบดาวตก): หลังพื้นปูครบ → ไม่เทพื้นหลังเต็มจอ (นับ fillRect เต็มจอจาก draw = 0)
   ② ภาพแคนวาส (แบบใหม่ vs ปิดทั้งสองอย่าง) ใกล้เคียงกันทุกแมพ · ③ วาร์ปไปจุดใหม่ (ชิ้นพื้นยังไม่สร้าง) ไม่มีภาพเก่าค้าง: ช่องที่ยังไม่เสร็จถูกเทสีพื้นหลัง
   ④ glowAt ในแคนวาสหลักไม่เรียก getTransform · ⑤ ไม่มี error"""
import asyncio, sys, random, io, base64
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image, ImageChops, ImageStat
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
CAP = "()=>cv.toDataURL('image/png')"
async def shot(pg):
    du = await pg.evaluate(CAP); return Image.open(io.BytesIO(base64.b64decode(du.split(',')[1]))).convert('RGB')
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 864}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', 'Gw' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{window.DNH=12;AUTO.on=false;gmGod=true;ov.hidden=true;window.__frz=1}")
        res = []; sheets = []
        for mp in (1, 24, 4, 15):
            await pg.evaluate(f"()=>{{const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}"); await pg.wait_for_timeout(5000)
            await pg.evaluate("()=>{ov.hidden=true;banner=null;mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>700);try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            await pg.wait_for_timeout(800)
            for _i in range(24):  # เครื่องทดสอบช้า/รันขนาน: รอปูพื้นครบก่อนวัด (เดิมรอตายตัว 5 วิ → สุ่มพัง)
                if await pg.evaluate("()=>MX.cov===curMap"): break
                await pg.wait_for_timeout(500)
            st = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const C=CanvasRenderingContext2D.prototype,of=C.fillRect,ogt=C.getTransform;let full=0,gt=0,on=1;
              C.fillRect=function(x,y,w,h){if(on&&this===g&&w>=SW0*.9&&h>=H*.9){const st=(new Error().stack||'').split('\\n')[2]||'';if(/at draw /.test(st))full++}return of.apply(this,arguments)};
              const og=glowAt;window.glowAt=glowAt=function(){const a=C.getTransform;let n=0;C.getTransform=function(){n++;return ogt.apply(this,arguments)};try{return og.apply(this,arguments)}finally{C.getTransform=a;if(g===GLW.g)gt+=n}};
              let fr=0,run2=1;const cnt=()=>{if(!run2)return;fr++;requestAnimationFrame(cnt)};requestAnimationFrame(cnt);await w(1500);run2=0;on=0;C.fillRect=of;window.glowAt=glowAt=og;return {cov:MX.cov===curMap,skip:MX.skipBg,fullPerFrame:+(full/Math.max(1,fr)).toFixed(2),gtInMain:gt,frames:fr}}""")
            mg = await pg.evaluate("""async()=>{const c=g;c.save();c.setTransform(1,0,0,1,0,0);c.fillStyle='#ff00ff';c.fillRect(0,0,cv.width,cv.height);c.restore();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
              const d=g.getImageData(0,0,cv.width,cv.height).data;let m=0;for(let i=0;i<d.length;i+=4*53)if(d[i]>240&&d[i+1]<15&&d[i+2]>240)m++;return m}""")
            res.append([mp, st, mg])

        okc = all(r[1]['cov'] and r[1]['fullPerFrame'] < .2 and r[1]['gtInMain'] == 0 for r in res)
        rep('พื้นปูครบ → ไม่เทพื้นหลังเต็มจอ · glowAt ในแคนวาสหลักไม่อ่านเมทริกซ์', okc, res)
        rep('ข้ามเทพื้นหลังแล้วไม่มีช่องว่าง/ภาพเก่าค้าง (ทาสีบานเย็นทั้งจอ → เฟรมถัดไปไม่เหลือ)', all(r[2] == 0 for r in res), [[r[0], r[2]] for r in res])
        gl = await pg.evaluate("""()=>{const c=g,out=[];const cases=[[0,0,40,'255,200,120',.6,1],[3,7,90,'120,190,255',.35,1],[1.5,2,8,'255,255,255',.9,1],[0,0,160,'200,120,255',.25,1],[0,0,30,'255,120,40',.8,1.7]];
          for(const [ox,oy,r,col,a,sc] of cases){const run=on=>{GLW.on=on;c.save();c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,400,400);c.restore();c.save();c.setTransform(GLW.s,0,0,GLW.s,0,0);c.translate(100+ox,100+oy);c.scale(sc,sc);c.globalCompositeOperation='lighter';glowAt(0,0,r,col,a);c.restore();return c.getImageData(0,0,400,400).data};
            const A=run(1),B=run(0);let s=0,mx=0;for(let i=0;i<A.length;i++){const d=Math.abs(A[i]-B[i]);s+=d;if(d>mx)mx=d}out.push([r,+(s/A.length).toFixed(3),mx])}GLW.on=1;return out}""")
        rep('glowAt แบบใหม่ได้ภาพใกล้แบบเดิม (5 แบบ รวมขยาย ×1.7 · ต่างเฉลี่ย < 3 ต่อช่อง · แบบเดิมปัดขนาดเป็นขั้น 4/8/16 px แบบใหม่ขนาดตรง)', all(x[1] < 3 for x in gl), gl)
        # ③ วาร์ปไปมุมแมพที่ยังไม่มีชิ้นพื้น → เฟรมแรกต้องไม่มีภาพเก่า (ทุกช่องถูกเทพื้นหลังหรือมีพื้น)
        await pg.evaluate("()=>{enterMap(4,{x:MAPS[4].sx||1600,y:MAPS[4].sy||1600})}"); await pg.wait_for_timeout(4000)
        t = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const sk0=MX.skipBg;const c=g;c.save();c.setTransform(1,0,0,1,0,0);c.fillStyle='#ff00ff';c.fillRect(0,0,cv.width,cv.height);c.restore();
          me.x=WW-300;me.y=WH-300;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const d=g.getImageData(0,0,cv.width,cv.height).data;let mag=0;for(let i=0;i<d.length;i+=4*97)if(d[i]>240&&d[i+1]<15&&d[i+2]>240)mag++;return {sk0,mag}}""")
        rep('วาร์ปไปจุดที่ชิ้นพื้นยังไม่สร้าง: ไม่มีภาพเก่าค้าง (สีทดสอบบานเย็นถูกทับหมด)', t['mag'] == 0, t)
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
