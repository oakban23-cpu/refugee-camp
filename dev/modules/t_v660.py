import asyncio, sys, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){};try{ov.hidden=true}catch(e){}}"
OUT=os.environ.get('OUT','')
KINDS="whirl dash rage quake roar bash fort rnfire elbx u3sw u3ft s6sw s6st s6gd fire frost chain rncomet golem hellgate rune rift riftx tstop u3bh u3dk s6zp s6im q8pop q8bliz q8lance q8orb heal smite holy dawn q8dawn sanct seal bell curse atk u3hv u3yl s6rg q8hlr q8hl q8rit shadow mark markx eclipse bdash bstrm u3nm u3bd s6cl s6bw q8cls q8dag q8mcut arrows leap pin beam torn storm moon zap s6ar s6ch mtrapx u3st q8snipe q8cyc".split()
# ยิงเอฟเฟกต์ในเครื่อง (ไม่ส่งเซิร์ฟเวอร์) ใกล้ตัวผู้เล่น
SPAWN="""(ks)=>{const out=[];ks.forEach((k,i)=>{const o={k,by:uid,u:uid,x:me.x+((i%5)-2)*60,y:me.y+(((i/5)|0)%3-1)*50,r:k==='bell'?170:90,a:.3,len:200,d:k==='bell'?4.5:undefined,
  pts:[[me.x,me.y],[me.x+60,me.y],[me.x+120,me.y+20]],sx:me.x-80,sy:me.y,s:1};try{handleFx(o)}catch(e){out.push(k+':'+e.message)}});return out}"""
async def main():
    p=start_server();errs=[];bad=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=1,is_mobile=True,has_touch=True)).new_page()
            pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            pg.on('response',lambda r:bad.append(r.url) if 'hd-vfx' in r.url and r.status>=400 else None)
            await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['mage','Vfx',60]);await pg.wait_for_timeout(3500);await pg.evaluate(CL);await pg.evaluate("()=>{setGQ('high');LITEQ=false}")
            r=await pg.evaluate("async()=>{for(let i=0;i<40;i++){if([0,1,2,3].every(j=>vfsI(j)))break;await new Promise(r=>setTimeout(r,150))}return[0,1,2,3].map(j=>{const I=vfsI(j);return I?I.naturalWidth:0})}")
            rep('ภาพเอฟเฟกต์ 4 แผ่นโหลดครบ',all(x==1024 for x in r),r)
            r=await pg.evaluate("()=>[Object.keys(VFS.R).length,Object.values(VFS.R).every(q=>q[1]+q[3]<=1024&&q[3]>8&&q[4]>8)]")
            rep('ตารางชิ้นครบ 48 ชิ้น อยู่ในแผ่น',r==[48,True],r)
            # ยิงทีละกลุ่ม ไม่ให้เกินเพดาน
            fails=[]
            for i in range(0,len(KINDS),12):
                f=await pg.evaluate(SPAWN,KINDS[i:i+12]);fails+=f;await pg.wait_for_timeout(3400)
            r=await pg.evaluate("()=>[Object.keys(VFS.hit),P9.er||'',P9.en||0]")
            miss=[k for k in KINDS if k not in r[0]]
            rep('ทุกสกิลที่จับคู่ ขึ้นภาพวาด (%d ชนิด)'%len(KINDS),not miss and not fails,(miss,fails))
            rep('ระบบเอฟเฟกต์ไม่มีข้อผิดพลาด',r[1]=='' and r[2]==0,r[1:])
            # เพดาน + ล้างตอนเปลี่ยนแมพ
            r=await pg.evaluate("()=>{for(let i=0;i<200;i++)vfs('IMPACT_BURST',me.x,me.y,{l:5});return VFS.s.length}")
            rep('จำนวนภาพพร้อมกันไม่เกินเพดาน',0<r<=72,r)
            # ปิดเอฟเฟกต์ในตั้งค่า → ไม่วาด
            r=await pg.evaluate("async()=>{VFS.s.length=0;const o=CFGV.vfx;CFGV.vfx=0;VFS.n=0;handleFx({k:'frost',by:uid,x:me.x,y:me.y,r:90});await new Promise(r=>setTimeout(r,600));const a=[VFS.n,VFS.s.length];CFGV.vfx=o;return a}")
            rep('ปิดเอฟเฟกต์ในตั้งค่า → ไม่มีภาพวาดเพิ่ม',r==[0,0],r)
            # วัดเวลาวาด: ปล่อย 70 ชิ้นแล้ววัด
            r=await pg.evaluate("async()=>{VFS.s.length=0;for(let i=0;i<70;i++)vfs(['FIRE_EXPLOSION','HOLY_CIRCLE','SLASH_SPIN'][i%3],me.x+(i%10-5)*20,me.y+((i/10|0)-3)*16,{w:160,l:3,gr:i%2});let n=0,t=0;for(let k=0;k<30;k++){const a=performance.now();vfsPass(0);vfsPass(1);t+=performance.now()-a;n++;await new Promise(r=>requestAnimationFrame(r))}VFS.s.length=0;return t/n}")
            rep('วาด 70 ชิ้นใช้เวลาน้อย (%.2f มิลลิวิ/เฟรม)'%r,r<6,r)
            if OUT:
                # ภาพเทียบ ก่อน/หลัง
                for k,tt in (('fire',.45),('whirl',.35),('frost',.25),('holy',.3),('shadow',.12),('beam',.35),('u3hv',1.0),('torn',.6),('rage',.4),('heal',.4),('u3bh',1.6),('eclipse',.8)):
                    for on in (0,1):
                        await pg.evaluate("(on)=>{VFS.on=on;VFS.s.length=0;P9.p.length=0;P9.d.length=0;fxs.length=0}",on)
                        await pg.evaluate("(k)=>handleFx({k,by:uid,u:uid,x:me.x+(k==='beam'||k==='torn'?-150:0),y:me.y+10,r:k==='holy'||k==='u3hv'?110:90,a:0,len:320,s:1})",k)
                        await pg.wait_for_timeout(int(tt*1000))
                        await pg.screenshot(path=f'{OUT}/{k}_{on}.png')
                await pg.evaluate("()=>{VFS.on=1}")
            rep('ไฟล์ภาพเอฟเฟกต์ไม่มี 404',bad==[],bad)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
