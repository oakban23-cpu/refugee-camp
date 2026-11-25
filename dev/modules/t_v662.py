import asyncio, sys, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){};try{ov.hidden=true}catch(e){}}"
REC="()=>{window.__vs=[];const o=vsbPlay;window.vsbPlay=vsbPlay=function(n,x,y,v,dl){const r=o.apply(this,arguments);if(r)__vs.push(n);return r}}"
async def main():
    p=start_server();errs=[]
    try:
        r=urllib.request.urlopen(URL+'sfx-skill.mp3');b=r.read()
        rep(f'sfx-skill.mp3 เสิร์ฟเป็น audio/mpeg ({len(b)//1024} KB)',r.headers['Content-Type']=='audio/mpeg' and 600000<len(b)<1200000,r.headers['Content-Type'])
        async with async_playwright() as pw:
            br=await pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
            pg=await (await br.new_context(viewport={'width':915,'height':412})).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['mage','Vsb',60]);await pg.wait_for_timeout(2500);await pg.evaluate(CL)
            await pg.evaluate("()=>{try{AC.resume()}catch(e){}setGQ('high')}")
            ok=False
            for _ in range(60):
                if await pg.evaluate("()=>VSB.ok"):ok=True;break
                await pg.wait_for_timeout(250)
            r=await pg.evaluate("()=>[VSB.ok,VSB.buf&&Math.round(VSB.buf.duration*10)/10,Object.keys(VSB.T).length,Object.values(VSB.T).every(t=>t[0]+t[1]<=VSB.buf.duration+.01&&t[2]>0),VSB.err]")
            rep('โหลด+ถอดรหัสคลังเสียง 46 คลิปตอนเข้าเกม ตำแหน่งทุกคลิปอยู่ในไฟล์',ok and r[2]==46 and r[3],r)
            await pg.evaluate(REC)
            # เสียงโจมตีปกติ
            r=await pg.evaluate("async()=>{__vs.length=0;for(const s of ['slash','bow','magic','hit','crit']){sfxT[s]=0;sfx(s);await new Promise(r=>setTimeout(r,120))}return __vs.slice()}")
            rep('เสียงโจมตีปกติใช้ชุดใหม่ (ฟัน/ยิง/เวท/โดน/คริ)',r==['swing','arrow','mshot','hit','crit'],r)
            r=await pg.evaluate("()=>{__vs.length=0;for(let i=0;i<10;i++){sfxT.hit=0;sfx('hit')}return __vs.length}")
            rep('เสียงโดนรัว ๆ ในเฟรมเดียว ไม่ซ้อน (เล่นครั้งเดียว)',r==1,r)
            # เสียงตามภาพเอฟเฟกต์ของแต่ละอาชีพ
            await pg.wait_for_timeout(400)
            cases=[('fire',['meteor','fire_boom']),('frost',['frost','ice']),('heal',['heal']),('smite',['smite']),('shadow',['shadow']),('arrows',['arrows']),('beam',['beam']),('torn',['wind']),
                   ('whirl',['spin']),('quake',['cracks']),('chain',['orb']),('holy',['godray']),('eclipse',['moon']),('u3sw',['mega']),('u3hv',['wings']),('u3bh',['void','mega']),('rage',['roar']),('fort',['dome'])]
            bad=[]
            for k,exp in cases:
                got=await pg.evaluate("""async(k)=>{__vs.length=0;VSB.last={};handleFx({k,by:uid,u:uid,x:me.x+40,y:me.y+10,r:90,a:0,len:240,s:1,pts:[[me.x,me.y],[me.x+60,me.y],[me.x+120,me.y+20]]});
                  await new Promise(r=>setTimeout(r,3300));return __vs.slice()}""",k)
                if not all(e in got for e in exp):bad.append((k,exp,got))
            rep('ภาพเอฟเฟกต์ → เสียงตรงชนิด ครบ 18 สกิลตัวอย่าง (5 อาชีพ + ท่าไม้ตาย)',not bad,bad)
            # ไกลตัวเรา → ไม่มีเสียง · ใกล้ซ้าย/ขวา → pan
            r=await pg.evaluate("async()=>{__vs.length=0;VSB.last={};handleFx({k:'frost',by:'x',x:me.x+2200,y:me.y,r:90});await new Promise(r=>setTimeout(r,500));return __vs.length}")
            rep('เอฟเฟกต์ไกลตัวเรามาก ไม่มีเสียง',r==0,r)
            # เพดานเสียงพร้อมกัน
            r=await pg.evaluate("async()=>{VSB.last={};let mx=0;for(let i=0;i<60;i++){VSB.GAP['star']=0;vsbPlay('star',me.x,me.y,1);mx=Math.max(mx,VSB.act)}VSB.GAP.star=.06;return mx}")
            rep('เล่นพร้อมกันไม่เกิน 12 เสียง',r<=12,r)
            # ปิดเสียง → เงียบ, VSB.on=0 → กลับไปเสียงเดิม
            r=await pg.evaluate("async()=>{__vs.length=0;VSB.last={};setMute(true);handleFx({k:'fire',by:uid,x:me.x,y:me.y,r:90});sfxT.slash=0;sfx('slash');await new Promise(r=>setTimeout(r,800));setMute(false);return __vs.length}")
            rep('กดปิดเสียง 🔊 → เงียบ',r==0,r)
            r=await pg.evaluate("async()=>{__vs.length=0;VSB.on=0;sfxT.slash=0;sfx('slash');const a=__vs.length;VSB.on=1;return a}")
            rep('VSB.on=0 กลับใช้เสียงเดิม',r==0,r)
            r=await pg.evaluate("()=>skSfx.toString().includes('VSB.cast')")
            rep('เสียงตอนกดสกิลเดิมลดลงให้เสียงใหม่เด่น',r)
            r=await pg.evaluate("()=>{try{return !!(BGM&&bgmStart.toString().includes('cfgBus'))}catch(e){return false}}")
            rep('เพลงหน้าปก/เลือกตัวละคร ผ่านปุ่มระดับเสียงเพลงในตั้งค่า',r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
