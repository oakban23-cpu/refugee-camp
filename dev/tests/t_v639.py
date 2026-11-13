import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','T9'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(3000)
            # สอดแนม: มุมหมุน/ตำแหน่งตอนวาดตัวละคร, อาวุธ, ตา, ผ้าห่ม
            await pg.evaluate("""()=>{window.__S={rot:[],wp:0,eye:0,bl:0,ob:0};const P=CanvasRenderingContext2D.prototype,r=P.rotate;P.rotate=function(a){if(TNASLP)__S.rot.push(a);return r.call(this,a)};
              const w=drawWeapon;drawWeapon=function(){if(TNASLP)__S.wp++;return w.apply(this,arguments)};
              const e=tnaSleepEyes;tnaSleepEyes=function(){__S.eye++;return e.apply(this,arguments)};const b=tnaBlanket;tnaBlanket=function(){__S.bl++;return b.apply(this,arguments)};const o=tvBlanket;tvBlanket=function(){__S.ob++;return o.apply(this,arguments)}}""")
            for bed in ('bed1','bed2','bed3'):
                await pg.evaluate("(bed)=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;const S=tSt();for(const k in TDECO)S.own[k]=1;S.d={bed:bed};TSL=null;tentHome()}",bed)
                await pg.wait_for_timeout(3200)
                await pg.evaluate("()=>{ov.hidden=true;me.x=TBED.x+6;me.y=TBED.y-2;TSL={t:999,x:me.x,y:me.y};__S.rot=[];__S.wp=0;__S.eye=0;__S.bl=0;__S.ob=0}");await pg.wait_for_timeout(1800)
                r=await pg.evaluate("()=>{const P=tnaBedPose(MAPS[curMap].tent.d.bed);return{ok:TNA.ok,pose:!!P,rot:__S.rot.slice(-5),wp:__S.wp,eye:__S.eye,bl:__S.bl,ob:__S.ob,a:TVZ.a}}")
                rep(f'{bed}: นอนหนุนหมอนตามทิศเตียง (ไม่หมุนขวาง) + ห่มผ้าห่มของเตียง',r['pose'] and r['a']>=1 and not any(abs(x)>1 for x in r['rot']) and r['bl']>5 and r['ob']==0,r)
                rep(f'{bed}: หลับตา',r['eye']>5,r)
            r=await pg.evaluate("""()=>{const og=g;const cnt=s=>{const C=document.createElement('canvas');C.width=C.height=120;g=C.getContext('2d');TNASLP=s;try{drawChar(60,80,'melee',1,0,0,1,0,me.w,me.a,0,0)}finally{TNASLP=0;g=og}
               const d=C.getContext('2d').getImageData(0,0,120,120).data;let n=0;for(let y=0;y<120;y++)for(let x=72;x<120;x++)if(d[(y*120+x)*4+3]>100)n++;return n};return[cnt(0),cnt(1)]}""")
            rep('ตอนนอนไม่ถืออาวุธ (ด้านข้างตัวละครไม่มีภาพอาวุธ)',r[0]>40 and r[1]<r[0]*.25,r)
            r=await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));me.x+=40;await w(1500);return[TSL,TVZ.a]}")
            rep('ขยับตัว → ตื่นลุกขึ้นยืน',r[0] is None and r[1]==0,r)
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));TNA.off=1;TVC.k='~';me.x=TBED.x+6;me.y=TBED.y-2;TSL={t:999,x:me.x,y:me.y};__S.rot=[];__S.ob=0;__S.bl=0;await w(1800);
               const o=[__S.rot.filter(a=>Math.abs(a)>1).slice(-3),__S.ob,__S.bl];TNA.off=0;TVC.k='~';TSL=null;return o}""")
            rep('TNA.off=1 (เตียงเวกเตอร์เดิม) → นอนแบบเดิม (ผ้าห่มเวกเตอร์ ไม่ใช้ผ้าห่มภาพ)',r[1]>5 and r[2]==0,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
