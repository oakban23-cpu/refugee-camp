"""v571 ตาเรืองแสงไม่ใช้เงาเบลอ
   ① ตอนสู้ในหุบเหวลมหวน/ซากนครใต้เมฆ ไม่มีการวาดที่ติดเงาเบลอจาก vEye/pcEye1
   ② ภาพตาเรืองแบบใหม่ใกล้แบบเงาเบลอ (วาดเทียบบนแคนวาส) · rgbOf แปลงสีถูก
   ③ ตาตัวละครแบบเบาตอนเครื่องตามไม่ทัน (FQ.avg>28) ใช้คำสั่งวาดน้อยลง · ④ ไม่มี error"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
BOTJS = open(__file__.rsplit('/', 1)[0] + '/b10bot.js', encoding='utf-8').read()
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        ctx = await b.new_context(viewport={'width': 393, 'height': 864}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP, ['mage', 'Ey' + str(random.randint(100, 999)), 99]); await pg.wait_for_timeout(1500)
        await pg.evaluate(BOTJS)
        out = []
        for mp in (17, 21):
            await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}"); await pg.wait_for_timeout(4500)
            await pg.evaluate("()=>{ov.hidden=true;const B=mons.filter(m=>m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(B){me.x=B.x+60;me.y=B.y}BOT.reset();BOT.on=true}"); await pg.wait_for_timeout(3500)
            r = await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const C=CanvasRenderingContext2D.prototype,ks=['fill','stroke','drawImage','fillRect'],O={};let on=1,blur=0,eyes=0;
              ks.forEach(k=>{O[k]=C[k];C[k]=function(){if(on&&this===g&&this.shadowBlur>0){const st=new Error().stack||'';if(/vEye|pcEye1/.test(st))blur++}return O[k].apply(this,arguments)}});
              const ov=vEye;window.vEye=vEye=function(){eyes++;return ov.apply(this,arguments)};
              await w(2000);on=0;ks.forEach(k=>C[k]=O[k]);window.vEye=vEye=ov;return {map:curMap,eyeBlurDraws:blur,vEyeCalls:eyes}}""")
            out.append(r)
        rep('ตอนสู้ (หุบเหวลมหวน · ซากนครใต้เมฆ): ตาเรืองแสงไม่ใช้เงาเบลอเลย', all(x['eyeBlurDraws'] == 0 and x['vEyeCalls'] > 0 for x in out), out)
        c = await pg.evaluate("""()=>{const t=[rgbOf('#ffb040'),rgbOf('#abc'),rgbOf('rgba(10, 20, 30, .5)'),rgbOf('rgb(255,0,128)')];
          const draw=(blur)=>{const c=g;c.save();c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,200,200);c.fillStyle='#202028';c.fillRect(0,0,200,200);c.setTransform(4,0,0,4,0,0);EYEBLUR=blur;vEye(0,25,25,2.2,2.6,'#ffb040',4);EYEBLUR=0;c.restore();return c.getImageData(0,0,200,200).data};
          const A=draw(1),B=draw(0);let s=0,n=0,sa=0,sb=0;for(let i=0;i<A.length;i+=4){const ya=A[i]+A[i+1]+A[i+2],yb=B[i]+B[i+1]+B[i+2];s+=Math.abs(ya-yb);sa+=ya;sb+=yb;n++}return {t,meanDiff:+(s/n/3).toFixed(2),brightBlur:Math.round(sa/n),brightNew:Math.round(sb/n)}}""")
        rep('rgbOf แปลงสีถูก · ตาเรืองแบบใหม่ใกล้เงาเบลอ (ต่างเฉลี่ย < 12 · ความสว่างรวมใกล้กัน ±35%)', c['t'] == ['255,176,64', '170,187,204', '10,20,30', '255,0,128'] and c['meanDiff'] < 12 and abs(c['brightNew'] - c['brightBlur']) <= .35 * c['brightBlur'], c)
        await pg.evaluate("()=>{BOT.on=false;enterMap(1,{x:CX,y:CY+80})}"); await pg.wait_for_timeout(4000)
        lt = await pg.evaluate("""()=>{const C=CanvasRenderingContext2D.prototype,of=C.fill,os=C.stroke;let n=0;C.fill=function(){n++;return of.apply(this,arguments)};C.stroke=function(){n++;return os.apply(this,arguments)};
          const a0=FQ.avg,l0=LOWQ,r={};LOWQ=false;for(const v of[16,40]){FQ.avg=v;n=0;pcEye1(0,0,'#6a8',1,0,0,null,'#111');r[v]=n}FQ.avg=a0;LOWQ=l0;C.fill=of;C.stroke=os;return {full:r[16],lite:r[40]}}""")
        rep('ตาตัวละครแบบเบาตอนเครื่องตามไม่ทันใช้คำสั่งวาดน้อยลง', lt['lite'] < lt['full'] and lt['full'] > 0, lt)
        rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
