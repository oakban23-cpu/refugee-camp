import asyncio, sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;try{TIPS.t=1e15}catch(e){}}"
BI="(s)=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);return (c.borderImageSource.match(/hd-ui-([a-z]+)/)||[])[1]||'none'}"
async def main():
    p=start_server();errs=[];bad=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            for vw,vh,tag in((915,412,'แนวนอน'),(390,844,'แนวตั้ง')):
                pg=await (await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
                pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
                pg.on('response',lambda r:bad.append(r.url) if 'hd-ui-' in r.url and r.status>=400 else None)
                await pg.goto(URL);await pg.wait_for_timeout(3500);await pg.evaluate(SETUP,['melee','Uk'+tag[0],60]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
                await pg.evaluate("()=>{ov.hidden=false;shopUI()}");await pg.wait_for_timeout(900)
                r={s:await pg.evaluate(BI,s) for s in ['#ov .pn','#ov .pn .card','#ov .pn .tab.on','#ov .pn .tab:not(.on)','#ov .pn button.pri','#hpor','#bars .bar','#sk>#s0','#sk>#s3','#stq']}
                ok=r['#ov .pn']=='windowframe' and r['#ov .pn .card']=='panelframe' and r['#ov .pn .tab.on']=='tabactive' and r['#ov .pn .tab:not(.on)']=='tabidle' and r['#ov .pn button.pri']=='btnprimary' and r['#hpor']=='avatarring' and r['#bars .bar']=='barframe' and r['#sk>#s0']=='skillring' and r['#sk>#s3']=='skillringult' and r['#stq']=='trackerframe'
                rep(tag+': หน้าต่าง การ์ด แท็บ ปุ่ม กรอบรูป หลอด วงสกิล กรอบเควส ใช้ภาพวาด',ok,r)
                c=await pg.evaluate("()=>{const b=document.querySelector('#ov .pn button.pri'),c=getComputedStyle(b);return[c.color,b.scrollWidth<=b.clientWidth+2]}")
                rep(tag+': ปุ่มทองตัวหนังสือสีเข้ม อ่านออก ไม่ล้นปุ่ม',c[0]=='rgb(43, 25, 6)' and c[1],c)
                await pg.evaluate("()=>{ov.hidden=true;stSay([['npc_old','ทดสอบกล่องบทพูด']])}");await pg.wait_for_timeout(1300)
                r={s:await pg.evaluate(BI,s) for s in ['#sdlg','#sdlg .sdp','#sdlg .sdn']}
                rep(tag+': กล่องบทพูด กรอบรูปหน้า ป้ายชื่อ',r=={'#sdlg':'dialogframe','#sdlg .sdp':'portraitframe','#sdlg .sdn':'nameplate'},r)
                await pg.evaluate(CL)
                r=await pg.evaluate("async()=>{let n=0;const o=uisJoy,m=uisMini;let a=0,b2=0;window.uisJoy=uisJoy=function(){a++;return o.apply(this,arguments)};window.uisMini=uisMini=function(){b2++;return m.apply(this,arguments)};await new Promise(r=>setTimeout(r,800));window.uisJoy=uisJoy=o;window.uisMini=uisMini=m;return[a,b2,['minimapring','joybase','joyknob'].map(k=>!!uikImg(k))]}")
                rep(tag+': มินิแมพ/จอยวาดภาพวาดทุกเฟรมได้',r[1]>5 and all(r[2]),r)
                r=await pg.evaluate("async()=>{UIK.on=0;uikApply();ov.hidden=false;shopUI();await new Promise(r=>setTimeout(r,300));const a=(getComputedStyle(document.querySelector('#ov .pn')).borderImageSource);UIK.on=1;uikApply();ov.hidden=true;return a}")
                rep(tag+': ปิดสวิตช์ → กลับแบบเดิม',r=='none',r)
            rep('ไฟล์ภาพ UI โหลดครบ ไม่มี 404',bad==[],bad)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
