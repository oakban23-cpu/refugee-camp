import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/emv/'
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;LOWQ=false;FQ.avg=10;try{HD2.fq=999}catch(e){}}"
async def boot(b,errs,block=False,vw=412,vh=860):
    pg=await (await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and 'ems' in m.text else None)
    if block:await pg.route('**/hd-emo.webp',lambda rt:rt.abort())
    await pg.goto(URL);await pg.wait_for_timeout(2500);await pg.evaluate(SETUP,['melee','Em'+str(random.randint(100,999)),30]);await pg.wait_for_timeout(3200);await pg.evaluate(CL)
    return pg
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await boot(b,errs)
            r=await pg.evaluate("()=>[EMS.ok,EMS.err,EMS.im.naturalWidth,EMS.im.naturalHeight]")
            rep('โหลด atlas สติกเกอร์ 896×256',r==[1,'',896,256],r)
            await pg.evaluate("()=>document.getElementById('emb').click()");await pg.wait_for_timeout(300)
            r=await pg.evaluate("()=>{const p=document.getElementById('emp');const bs=[...p.querySelectorAll('button[data-emo],button[data-pe]')];return[p.hidden,bs.length,bs.filter(b=>b.querySelector('i.emsi')).length,bs.filter(b=>b.querySelector('span')).length,bs.map(b=>b.querySelector('small')&&b.querySelector('small').textContent).join(',')]}")
            rep('แผงท่าทาง: 14 ปุ่มเป็นสติกเกอร์ครบ ไม่เหลืออีโมจิ ชื่อท่ายังอยู่',r[0]==False and r[1]==14 and r[2]==14 and r[3]==0 and 'ถ่ายรูป' in r[4],r)
            r=await pg.evaluate("()=>{const i=document.querySelector('#emp [data-pe=\"photo\"] i.emsi'),cs=getComputedStyle(i);return[cs.backgroundPositionX,cs.backgroundPositionY,cs.width,cs.backgroundImage.includes('hd-emo')]}")
            rep('ปุ่มถ่ายรูปชี้ช่องที่ 14 ของ atlas',r==['-180px','-30px','30px',True],r)
            el=await pg.query_selector('#emp');await el.screenshot(path=SHOT+'panel.png')
            r=await pg.evaluate("async()=>{document.querySelector('#emp [data-emo=\"4\"]').click();await new Promise(r=>setTimeout(r,200));const d0=EMS.dr;await new Promise(r=>setTimeout(r,600));return[!!EMO[uid],EMO[uid]&&EMO[uid].i,EMS.dr-d0,document.getElementById('emp').hidden]}")
            rep('แตะสติกเกอร์หัวเราะ → ทำท่า และฟองเหนือหัววาดเป็นสติกเกอร์',r[0] and r[1]==4 and r[2]>5 and r[3],r)
            await pg.evaluate("()=>{try{ZM.on=1;ZM.z=2.4}catch(e){}}");await pg.wait_for_timeout(400)
            await pg.evaluate("()=>emoUse(5)");await pg.wait_for_timeout(1000)
            await pg.screenshot(path=SHOT+'bubble.jpg',type='jpeg',quality=88)
            # ท่าคู่: จำลองคู่ที่กำลังไฮไฟว์ แล้วดูว่าสติกเกอร์ไฮไฟว์ถูกวาด
            r=await pg.evaluate("""()=>{const pv=peView,sp=emsDraw;let got=[];window.emsDraw=emsDraw=function(k){got.push(k);return sp.apply(this,arguments)};peView=u=>({x:me.x,y:me.y,a:.3});
              PE['__a']={r:0,e:'hf',p:'__b',clap:1};PE['__b']={r:1,e:'hf',p:'__a'};try{peDrawFx()}finally{peView=pv;window.emsDraw=emsDraw=sp;delete PE['__a'];delete PE['__b']}return got}""")
            rep('ท่าคู่ (ไฮไฟว์): ฟองเหนือคู่เป็นสติกเกอร์',r==['hf'],r)
            # โหลดไม่ได้ → อีโมจิเดิม
            pg2=await boot(b,errs,block=True)
            await pg2.evaluate("()=>document.getElementById('emb').click()");await pg2.wait_for_timeout(300)
            r=await pg2.evaluate("async()=>{const p=document.getElementById('emp');const n=p.querySelectorAll('button span').length,m=p.querySelectorAll('i.emsi').length;document.querySelector('#emp [data-emo=\"0\"]').click();await new Promise(r=>setTimeout(r,500));return[EMS.ok,EMS.err,n,m,!!EMO[uid],EMS.dr]}")
            rep('โหลดภาพไม่ได้ → แผงและฟองใช้อีโมจิเดิม ท่าทางยังใช้ได้',r[0]==0 and r[1]=='hd-emo.webp' and r[2]==14 and r[3]==0 and r[4] and r[5]==0,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
