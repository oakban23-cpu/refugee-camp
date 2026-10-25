import asyncio, sys, random, json, io
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
from PIL import Image, ImageStat
# v527 แมพมืดอ่านง่าย: เจาะแสงรอบตัวละคร/มอนในชั้นความมืด
async def shot(A):
    return Image.open(io.BytesIO(await A.pg.screenshot())).convert('L')
def lum(im,box):
    return ImageStat.Stat(im.crop(box)).mean[0]
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Nk'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;window.DNH=22;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};setInterval(()=>{FQ.avg=0;LOWQ=false},100)}")
        r=await A.ev("()=>[typeof nlLift,String(worldLight).indexOf('nlLift(\\'s\\'')>0,String(worldLight).indexOf('nlLift(\\'m\\'')>0]")
        rep('ติดตั้ง: nlLift + ต่อเข้า worldLight ทั้งแบบมืดปกติและแบบย้อมแสงจันทร์',r==['function',True,True],json.dumps(r))
        # ทดสอบแบบคุมภาพ: ปิดมอนจริง วางมอนนิ่ง 1 ตัวห่างจากตัวเรา
        async def setup(k):
            await A.ev(f"()=>{{ov.hidden=true;enterMap({k},{{x:1600,y:1600}})}}");await A.wait(2400)
            return await A.ev("""()=>{const L=mons.filter(m=>m.t<3&&m.hp>0);const m0=L[0];mons.length=0;if(m0){m0.x=me.x+150;m0.y=me.y-6;m0.mh=1e9;m0.hp=1e9;m0.spd=0;m0.sp=0;m0.atk=0;mons.push(m0);const X=m0.x,Y=m0.y,PX=me.x,PY=me.y;clearInterval(window.__pin);window.__pin=setInterval(()=>{m0.x=X;m0.y=Y;m0.hp=1e9;me.x=PX;me.y=PY},10)}NLH.err='';return !!m0}""")
        PX="""(on)=>{const m=mons[0];if(!m)return null;const dw=devW(),dh=devH(),cv=document.createElement('canvas');cv.width=dw;cv.height=dh;const G0=g,x=cv.getContext('2d',{willReadFrequently:true});g=x;const vp=VIG.pend;VIG.pend='';NLH.on=on;
          x.fillStyle='rgb(150,140,130)';x.fillRect(0,0,dw,dh);const z=ZM.z||1;x.setTransform(DPR,0,0,DPR,0,0);if(Math.abs(z-1)>.003)x.scale(z,z);x.translate(-cam.x,-cam.y);let err='';try{worldLight()}catch(e){err=String(e)}
          const T=x.getTransform();x.setTransform(1,0,0,1,0,0);const P=(wx,wy)=>{const sx=Math.round(T.a*wx+T.e),sy=Math.round(T.d*wy+T.f);if(sx<0||sy<0||sx>=dw||sy>=dh)return -1;const d=x.getImageData(sx,sy,1,1).data;return Math.round((d[0]+d[1]+d[2])/3)};
          let r=18;try{r=mR(m)||18}catch(e){}const o=[P(m.x,m.y-r*.7),P(me.x,me.y-14),P(cam.x+10,cam.y+H/z-10)];g=G0;VIG.pend=vp;NLH.on=1;return {o,err}}"""
        res=[]
        for k in (26,22,7,35):
            okm=await setup(k);await A.wait(500)
            a=await A.ev(PX,0);c=await A.ev(PX,1)
            res.append([k,okm,a and a['o'],c and c['o'],(a or {}).get('err'),(c or {}).get('err')])
        print('   ค่า [แมพ, มี, เดิม(มอน,ตัวเรา,มุม), ใหม่]',json.dumps([[x[0],x[2],x[3]] for x in res]))
        er=await A.ev("()=>NLH.err")
        rep('กลางคืน (วาดฉากทดสอบ): ตรงมอนสว่างขึ้น ≥ +20% · ตรงตัวเรา ≥ +10% · มุมจอไกล ๆ เท่าเดิม · 4 แมพ',all(x[1] and x[2] and x[3] and x[3][0]>=x[2][0]*1.2 and x[3][1]>=x[2][1]*1.1 and abs(x[3][2]-x[2][2])<=2 and not x[4] and not x[5] for x in res) and not er,json.dumps([res,er]))
        # กลางวันแมพปกติ: ไม่ทำงาน · แมพมืดถาวร 22: ทำงาน
        await A.ev("()=>{window.DNH=12}");await setup(4);await A.wait(300)
        n0=await A.ev("()=>NLH.n");await A.wait(500);n1=await A.ev("()=>NLH.n")
        await setup(22);await A.wait(300);n2=await A.ev("()=>NLH.n");await A.wait(500);n3=await A.ev("()=>NLH.n")
        rep('กลางวัน: แมพปกติไม่ยุ่ง · แมพมืดถาวร (ห้วงบัลลังก์เงา) ยังเจาะแสง',n1==n0 and n3>n2,json.dumps([n0,n1,n2,n3]))
        await A.ev("()=>{window.DNH=22}")
        # คนล่องหน/มอนซ่อน ไม่ได้แสง
        r=await A.ev("""()=>{const run=()=>{g.save();g.setTransform(DPR,0,0,DPR,0,0);if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);worldLight();g.restore();return NLH.h};const keep=Object.assign({},others);for(const k in others)delete others[k];
          const n0=run();others.__a={x:me.x+40,y:me.y,hp:100};const n1=run();others.__a.sl=5;const n2=run();delete others.__a;Object.assign(others,keep);
          const m=mons[0];let n3=-1,n4=-1;if(m){n3=run();m.hidden=1;n4=run();m.hidden=0}return [n0,n1,n2,n3,n4]}""")
        rep('ผู้เล่นอื่นได้แสง · คนล่องหนไม่ได้ · มอนที่ซ่อนไม่ได้',r[1]==r[0]+1 and r[2]==r[0] and r[4]==r[3]-1,json.dumps(r))
        # error → ความมืดแบบเดิม
        await setup(26);await A.wait(300)
        a=await A.ev(PX,0)
        await A.ev("()=>{window.__ns=nlSprite;NLH.sp={};window.nlSprite=function(){throw new Error('x')}}")
        c=await A.ev(PX,1)
        er=await A.ev("()=>{const e=NLH.err;window.nlSprite=window.__ns;NLH.err='';return e}")
        rep('error → ใช้ความมืดแบบเดิม (พิกเซลเท่าเดิม) ไม่ค้าง',bool(er) and a and c and a['o']==c['o'] and not c['err'],json.dumps([er[:60],a,c]))
        # ความเร็ว: worldLight ทั้งก้อน เทียบเปิด/ปิด
        r=await A.ev("""()=>{const run=on=>{NLH.on=on;const t0=performance.now();for(let i=0;i<120;i++){g.save();g.setTransform(DPR,0,0,DPR,0,0);if(Math.abs(ZM.z-1)>.003)g.scale(ZM.z,ZM.z);g.translate(-cam.x,-cam.y);worldLight();g.restore()}g.getImageData(0,0,1,1);return (performance.now()-t0)/120};run(1);run(0);let a=9e9,b2=9e9;for(let k=0;k<5;k++){a=Math.min(a,run(0));b2=Math.min(b2,run(1))}NLH.on=1;return {old:a,nw:b2,r:b2/a}}""")
        print('   ความเร็ว',json.dumps(r))
        rep('ความเร็ว: ชั้นแสงกลางคืนทั้งหมดไม่ช้ากว่าเดิมเกิน 1.6 เท่า',r['r']<=1.6,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
