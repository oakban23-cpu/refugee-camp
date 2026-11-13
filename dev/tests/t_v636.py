import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(ok);print('PASS' if ok else 'FAIL',n,'' if ok else d)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;banner=null}"
NEXT="()=>{if(SD.typ)stNext();stNext()}"
ST="()=>{const d=document.getElementById('cgov');const f=d&&d.querySelector('.fg');return{on:!!(d&&d.classList.contains('on')),cur:CGX.cur,src:f?f.getAttribute('src'):'',ok:!!(f&&f.complete&&f.naturalWidth>0&&getComputedStyle(f).visibility==='visible'&&+getComputedStyle(d).opacity>0.5&&(()=>{const r=f.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height*.3);return !!e&&(e===f||d.contains(e)||e.id==='c'||e.id==='stage')})()),port:!!(d&&d.classList.contains('port')),tt:!!(d&&d.querySelector('.tt.on')),line:SD.on?String((SD.q[SD.i]||[])[1]).slice(0,30):''}}"
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();ctx=await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True);pg=await ctx.new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['mage','T6'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(3000);await pg.evaluate(CLR)
            r=await pg.evaluate("""async()=>{const bad=[];for(let n=1;n<=29;n++)for(const t of[0,1]){const x=await fetch(cgSrc(n,t),{method:'HEAD'});if(!x.ok)bad.push(cgSrc(n,t))}return[CGL.length,bad]}""")
            rep('ติดตั้ง 29 ภาพ + ไฟล์ภาพเต็มและภาพย่อครบบนเซิร์ฟเวอร์',r[0]==29 and r[1]==[],r)
            r=await pg.evaluate("""()=>{const all=[];const add=A=>{if(Array.isArray(A))for(const L of A)if(L&&typeof L[1]==='string')all.push(L[1])};STY.forEach(s=>{add(s.pre);add(s.post)});[1,2].forEach(k=>add(STEND[k]));for(const k in STE10)add(STE10[k]);
               return CGL.filter(c=>all.filter(t=>t.indexOf(c[1])>=0).length!==1).map(c=>[c[0],all.filter(t=>t.indexOf(c[1])>=0).length])}""")
            rep('ข้อความเรียกภาพทุกภาพตรงกับบทพูดจริง 1 บรรทัดพอดี',r==[],r)
            # เล่นฉากเปิดภาค 1
            await pg.evaluate("()=>czReplay('p1o')");await pg.wait_for_timeout(1800)
            s1=await pg.evaluate(ST)
            rep('ฉากเปิดภาค 1: ภาพ 1 ขึ้นเต็มจอ โหลดเสร็จ',s1['on'] and s1['cur']==1 and 'cg01' in s1['src'] and s1['ok'] and not s1['port'],s1)
            for i in range(2):await pg.evaluate(NEXT);await pg.wait_for_timeout(300)
            await pg.wait_for_timeout(1200);s2=await pg.evaluate(ST)
            rep('ถึงบรรทัด «ฟื้นแล้วรึ» → เปลี่ยนเป็นภาพ 2 + การ์ดชื่อภาคขึ้นทับภาพ',s2['cur']==2 and 'cg02' in s2['src'] and s2['ok'] and s2['tt'],s2)
            await pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/cg/t636_land.jpg',type='jpeg',quality=80)
            for i in range(5):await pg.evaluate(NEXT);await pg.wait_for_timeout(200)
            s3=await pg.evaluate(ST)
            rep('ผ่านไปครบจำนวนบรรทัด → ภาพจางออก กลับเป็นคัตซีนในฉาก',(not s3['on']) and s3['cur']==0,s3)
            await pg.evaluate(CLR);await pg.wait_for_timeout(300)
            # ฉากจบภาค 10 แบบ A
            await pg.evaluate("()=>czReplay('pa5x1')");await pg.wait_for_timeout(300)
            for i in range(10):
                s=await pg.evaluate(ST)
                if s['cur']:break
                await pg.evaluate(NEXT);await pg.wait_for_timeout(250)
            await pg.wait_for_timeout(1500);s4=await pg.evaluate(ST)
            rep('ฉากจบภาค 10 แบบ A → ภาพ 27',s4['cur']==27 and s4['ok'],s4)
            await pg.evaluate(CLR);await pg.wait_for_timeout(1000);s5=await pg.evaluate(ST)
            rep('ปิดบทสนทนา → ภาพหายทันที',not s5['on'] and s5['cur']==0,s5)
            # จอแนวตั้ง
            await pg.set_viewport_size({'width':412,'height':860});await pg.wait_for_timeout(600)
            await pg.evaluate("()=>czReplay('p2o')");await pg.wait_for_timeout(1800);s6=await pg.evaluate(ST)
            rep('จอแนวตั้ง: ภาพ 6 แสดงแบบเห็นทั้งภาพ + พื้นหลังเบลอ',s6['cur']==6 and s6['port'] and s6['ok'],s6)
            await pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/cg/t636_port.jpg',type='jpeg',quality=80)
            await pg.evaluate(CLR);await pg.set_viewport_size({'width':915,'height':412});await pg.wait_for_timeout(500)
            # บันทึก
            r=await pg.evaluate("()=>{const o=snap();const c=cleanChar(JSON.parse(JSON.stringify(o)));return[o.cgv,c&&c.cgv]}")
            rep('ภาพที่เห็นแล้วถูกบันทึก (1,2,6,27)',r[0]==r[1] and r[0]&(1|2|32|(1<<26))==(1|2|32|(1<<26)),r)
            # แกลเลอรี
            r=await pg.evaluate("()=>{me.cgv=0;me.sty={s:0,n:0,a:1,e:0};storyUI();const g=document.getElementById('cggal');return[!!g,g?g.querySelectorAll('[data-cgv]').length:-1,g?g.querySelectorAll('.lk').length:-1]}")
            rep('แกลเลอรี: ผู้เล่นใหม่เห็นเฉพาะภาพแรก ที่เหลือล็อก',r[0] and r[1]>=1 and r[1]<=3 and r[2]>=26,r)
            r=await pg.evaluate("()=>{ov.hidden=true;me.sty={s:STY.length,n:0,a:1,e:2,e10:1};storyUI();const g=document.getElementById('cggal');const ids=[...g.querySelectorAll('[data-cgv]')].map(b=>+b.dataset.cgv);return[ids.length,ids.includes(4),ids.includes(5),ids.includes(27),ids.includes(28)]}")
            rep('จบเกมแล้ว (เลือกปลดโซ่ + ฉากจบ A): ปลดล็อก 27 ภาพ ไม่รวมตอนจบอีกสองแบบที่ไม่ได้เลือก',r==[27,False,True,True,False],r)
            await pg.evaluate("()=>{const b=document.querySelector('[data-cgv=\"19\"]');b.click()}");await pg.wait_for_timeout(1500)
            r=await pg.evaluate("()=>{const v=document.getElementById('cgview');const i=v&&v.querySelector('img');return[!!v,i&&i.getAttribute('src'),i&&i.naturalWidth,v&&v.querySelector('.cap').textContent]}")
            rep('แตะภาพย่อ → เปิดดูภาพเต็ม',r[0] and 'cg19' in (r[1] or '') and r[2]>1000,r)
            await pg.evaluate("()=>document.querySelector('#cgview .nv.r').click()");await pg.wait_for_timeout(300)
            r2=await pg.evaluate("()=>document.querySelector('#cgview img').getAttribute('src')")
            rep('ปุ่มถัดไปในแกลเลอรี',r2 and 'cg20' in r2,r2)
            await pg.evaluate("()=>document.querySelector('#cgview .x').click()")
            rep('ปิดแกลเลอรี',await pg.evaluate("()=>!document.getElementById('cgview')"))
            rep('CGX.on=0 → ไม่ขึ้นภาพ',await pg.evaluate("async()=>{ov.hidden=true;CGX.on=0;czReplay('p3o');await new Promise(r=>setTimeout(r,500));const ok=!CGX.cur;CGX.on=1;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}return ok}"))
            rep('ไม่มี error',errs==[] and not await pg.evaluate("()=>CGX.err"),[errs,await pg.evaluate("()=>CGX.err")])
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
