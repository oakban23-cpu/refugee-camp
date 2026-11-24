import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
OVL="""()=>{const r=(s)=>{const e=document.querySelector(s);return e?e.getBoundingClientRect():null},a=r('#ttl .lgi'),s=r('#ttl .lg .s'),g=r('#ttl .go');
  const hit=(p,q)=>p&&q&&p.right>q.left&&p.left<q.right&&p.bottom>q.top&&p.top<q.bottom;return{logo:a&&[a.width|0,a.height|0,a.top|0],ov:hit(a,g)||hit(s,g),inView:a&&a.top>=0&&a.bottom<=innerHeight}}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            for nm,vp in [('แนวนอน',{'width':915,'height':412}),('แนวตั้ง',{'width':412,'height':915})]:
                pg=await (await b.new_context(viewport=vp,device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
                errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
                await pg.goto(URL);await pg.wait_for_timeout(3500)
                r=await pg.evaluate("()=>[TT3.ok,TT3.err,document.getElementById('ttl').classList.contains('t3'),tt3Wide(),VZT.on,getComputedStyle(document.querySelector('#ttl .lg .t')).display,document.querySelector('#ttl .lgi img').naturalWidth]")
                want_wide = nm=='แนวนอน'
                rep(nm+': ใช้ภาพปกแยกชั้นใหม่ + โลโก้วาด (ตัวหนังสือเดิมซ่อน เอฟเฟกต์เก่าหยุด)',r[0]==1 and r[1]=='' and r[2] and r[3]==want_wide and r[4]==0 and r[5]=='none' and r[6]>500,r)
                r=await pg.evaluate("""async()=>{const c=document.getElementById('tt3c'),f0=TT3.f,grab=()=>{const x=document.createElement('canvas');x.width=c.width;x.height=c.height;x.getContext('2d').drawImage(c,0,0);return x.getContext('2d').getImageData(0,0,c.width,c.height).data};
                  const a=grab();await new Promise(r=>setTimeout(r,900));const b=grab();let d=0,n=0,dark=0;for(let i=0;i<a.length;i+=4*97){d+=Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1]);n++;if(a[i]+a[i+1]+a[i+2]<30)dark++}return[TT3.f-f0,d/n,dark/n]}""")
                rep(nm+': วาดภาพเต็มจอและขยับทุกเฟรม (ภาพเปลี่ยนตามเวลา)',r[0]>3 and r[1]>1 and r[2]<.2,r)
                r=await pg.evaluate("async()=>{const a=TT3.px;dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth*.95,clientY:innerHeight*.5}));await new Promise(r=>setTimeout(r,900));return[a,TT3.px]}")
                rep(nm+': เลื่อนนิ้ว/เมาส์ → ชั้นภาพเลื่อนตาม (parallax)',r[1]>r[0]+.3,r)
                r=await pg.evaluate(OVL)
                rep(nm+': โลโก้ไม่ทับปุ่มเริ่ม และอยู่ในจอ',r['logo'] and r['logo'][0]>150 and not r['ov'] and r['inView'],r)
                r=await pg.evaluate("async()=>{document.getElementById('ttl').click();await new Promise(r=>setTimeout(r,150));if(document.getElementById('ttl')&&!document.getElementById('ttl').classList.contains('out'))document.getElementById('ttl').click();/* v661: แตะแรกเปิดเพลง */await new Promise(r=>setTimeout(r,1300));const f=TT3.f;await new Promise(r=>setTimeout(r,400));return[!!document.getElementById('ttl'),TT3.ok,TT3.f-f]}")
                rep(nm+': แตะเริ่มเกมได้ตามเดิม และหยุดวาดหน้าปก',r==[False,0,0],r)
                rep(nm+': ไม่มี error',errs==[],errs)
                await pg.close()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=1)).new_page()
            await pg.route('**/hd-ttl-lh.webp',lambda rt:rt.abort())
            await pg.goto(URL);await pg.wait_for_timeout(3500)
            r=await pg.evaluate("()=>[TT3.ok,TT3.err,document.getElementById('ttl').classList.contains('t3'),getComputedStyle(document.querySelector('#ttl .lg .t')).display!=='none',VZT.on]")
            rep('โหลดภาพใหม่ไม่ครบ → ใช้หน้าปกเดิม (ไม่จอดำ)',r[0]==0 and 'lh' in r[1] and not r[2] and r[3] and r[4]==1,r)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
