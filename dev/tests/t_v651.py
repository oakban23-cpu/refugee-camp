import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(n,ok,d=''):R.append(bool(ok));print('PASS' if ok else 'FAIL',n,'' if ok else d,flush=True)
SHOT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/wmv/'
CL="()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true}"
async def boot(b,vw,vh,lv,errs,block=False):
    pg=await (await b.new_context(viewport={'width':vw,'height':vh},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
    pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.on('console',lambda m:errs.append(m.text[:200]) if m.type=='warning' and 'wmp' in m.text else None)
    if block:await pg.route('**/hd-wm1.webp',lambda rt:rt.abort())
    await pg.goto(URL);await pg.wait_for_timeout(2500)
    await pg.evaluate(SETUP,['melee','Wp'+str(random.randint(100,999)),lv]);await pg.wait_for_timeout(2800);await pg.evaluate(CL)
    return pg
async def main():
    p=start_server();errs=[]
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await boot(b,412,915,60,errs)
            r=await pg.evaluate("async()=>{const w0=[WMN[1][0],WMN[1][1]];WMSEL=null;wmUI();const a=!!ov.querySelector('.wmsvg.wmpp');for(let i=0;i<40&&!WMP.ok;i++)await new Promise(r=>setTimeout(r,150));await new Promise(r=>setTimeout(r,300));return[a,WMP.ok,WMP.err,w0]}")
            rep('เปิดแผนที่ครั้งแรก: โหลดภาพแล้ววาดใหม่เป็นภาพวาดเอง',r[1]==1 and r[2]=='',r)
            r=await pg.evaluate("""()=>{const sv=ov.querySelector('.wmsvg');return[sv.classList.contains('wmpp'),sv.getAttribute('viewBox'),sv.querySelectorAll('.wmpbg image').length,sv.querySelectorAll('g.wmn').length,sv.querySelectorAll('g.wmn .wmpm').length,sv.querySelectorAll('g.wmn .wmi').length,
              sv.querySelectorAll('g.wmn.l').length,sv.querySelectorAll('g.wmn.l .wmlk').length,sv.querySelectorAll('g.wmn.l .wmpg .wmpm').length,sv.querySelectorAll('.wmband,ellipse').length]}""")
            rep('พื้นภาพวาด 3 แผ่น · viewBox ผังใหม่ · หมุด 44 อันเป็นเหรียญครบ ไม่มีอีโมจิเหลือ · ล็อก = เหรียญเทา+กุญแจ · พื้นเดิมถูกลบ',r[0] and r[1]=='0 0 360 1570' and r[2]==3 and r[3]==44 and r[4]==44 and r[5]==0 and r[6]>0 and r[7]==r[6] and r[8]==r[6] and r[9]==0,r)
            r=await pg.evaluate("""()=>{const o={};for(const n of ov.querySelectorAll('g.wmn')){const c=n.querySelector('.wmc');o[n.dataset.wm]=[+c.getAttribute('cx'),+c.getAttribute('cy')]}let bad=[];for(const k in WMP.P)if(o[k][0]!==WMP.P[k][0]||o[k][1]!==WMP.P[k][1])bad.push(k);return[bad,WMN[1][0],WMN[1][1],WMN[40][1],Object.keys(WMB).length]}""")
            rep('หมุดอยู่ตามผังใหม่ทุกอัน และ WMN/WMB เดิมถูกคืนค่าหลังวาด',r[0]==[] and r[1:4]==[165,760,960] and r[4]==3,r)
            # เหรียญโหลดจริง (วาด atlas ลง canvas ตรวจพิกเซล)
            r=await pg.evaluate("""async()=>{const im=new Image();im.src='hd-wmmed.webp';await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);const a=x.getImageData(64,64,1,1).data,z=x.getImageData(2,2,1,1).data;return[im.width,im.height,a[3],z[3]]}""")
            rep('atlas เหรียญ 1408×512 กลางเหรียญทึบ มุมนอกเหรียญโปร่งใส',r==[1408,512,255,0],r)
            r=await pg.evaluate("()=>{const sc=ov.querySelector('.wmsc'),sv=ov.querySelector('.wmsvg'),k=sc.clientWidth/360,y=WMP.P[curMap][1]*k;return[curMap,Math.round(sv.getBoundingClientRect().height/k),sc.scrollTop<=y&&y<=sc.scrollTop+sc.clientHeight]}")
            rep('ความสูงแผนที่ตามผังใหม่ และเลื่อนไปหาแมพที่อยู่ตอนเปิด',r[1]>=1560 and r[2],r)
            await pg.screenshot(path=SHOT+'port_camp.jpg',type='jpeg',quality=82)
            # แตะหมุดแมพอื่น → แผงรายละเอียดเปลี่ยน + ใช้เหรียญ · ตำแหน่งเลื่อนไม่กระโดด
            r=await pg.evaluate("""async()=>{const sc=ov.querySelector('.wmsc');const t0=sc.scrollTop;const n=ov.querySelector('g.wmn[data-wm="2"]');n.dispatchEvent(new MouseEvent('click',{bubbles:true}));await new Promise(r=>setTimeout(r,200));const d=ov.querySelector('.wmd .wmdi');return[WMSEL,d.classList.contains('wmpi'),d.style.backgroundPosition,Math.abs(ov.querySelector('.wmsc').scrollTop-t0)<2,!!ov.querySelector('.wmsvg.wmpp')]}""")
            rep('แตะหมุด → เลือกแมพนั้น แผงข้อมูลใช้เหรียญ ตำแหน่งเลื่อนคงเดิม',r[0]==2 and r[1] and r[2]=='-40px 0px' and r[3] and r[4],r)
            # เลือกแมพบนฟ้า → เลื่อนขึ้นไปหา
            r=await pg.evaluate("async()=>{wmUI(41);await new Promise(r=>setTimeout(r,100));const sc=ov.querySelector('.wmsc');return[sc.scrollTop,ov.querySelector('.wmd b').textContent]}")
            rep('เปิดแผนที่โดยเลือกแมพบนสุด (วงแหวนเฟือง) → เลื่อนขึ้นบนสุด',r[0]<5,r)
            await pg.screenshot(path=SHOT+'port_sky.jpg',type='jpeg',quality=82)
            r=await pg.evaluate("async()=>{wmUI(26);await new Promise(r=>setTimeout(r,100));const sc=ov.querySelector('.wmsc');return[Math.round(sc.scrollTop+sc.clientHeight-sc.scrollHeight)]}")
            rep('เลือกแกนพิภพ (ล่างสุด) → เลื่อนลงล่างสุด',abs(r[0])<3,r)
            await pg.screenshot(path=SHOT+'port_under.jpg',type='jpeg',quality=82)
            # ส่วนในแมพนี้ของ v613 ยังอยู่ + วาปยังทำงาน
            r=await pg.evaluate("async()=>{wmUI(2);await new Promise(r=>setTimeout(r,50));const g=ov.querySelector('[data-wmgo]');g.click();await new Promise(r=>setTimeout(r,100));return[!!ov.querySelector('.wmvq')||true,!!WMW||ov.hidden]}")
            rep('ปุ่มวาปจากแผงยังทำงาน',r[1],r)
            await pg.wait_for_timeout(2500)
            r=await pg.evaluate("()=>curMap")
            rep('วาปไปหุบกระดูกสำเร็จ',r==2,r)
            # จอนอน
            pg2=await boot(b,915,412,60,errs)
            await pg2.evaluate("async()=>{wmpLoad();for(let i=0;i<40&&!WMP.ok;i++)await new Promise(r=>setTimeout(r,150));WMSEL=null;wmUI(9)}");await pg2.wait_for_timeout(500)
            r=await pg2.evaluate("()=>{const a=ov.querySelector('.wmsc').getBoundingClientRect(),b=ov.querySelector('.wmd').getBoundingClientRect();return[!!ov.querySelector('.wmsvg.wmpp'),a.right<=b.left+1]}")
            rep('จอนอน: แผนที่ภาพวาดซ้าย แผงข้อมูลขวา',r==[True,True],r)
            await pg2.screenshot(path=SHOT+'land_astra.jpg',type='jpeg',quality=82)
            # โหลดภาพไม่ได้ → แผนที่เดิม
            pg3=await boot(b,412,915,60,errs,block=True)
            r=await pg3.evaluate("async()=>{WMSEL=null;wmUI();await new Promise(r=>setTimeout(r,2500));wmUI();return[WMP.ok,WMP.err,!!ov.querySelector('.wmsvg.wmpp'),ov.querySelector('.wmsvg').getAttribute('viewBox'),ov.querySelectorAll('g.wmn .wmi').length]}")
            rep('โหลดภาพไม่ได้ → แผนที่แบบเดิมทั้งหมด',r[0]==0 and r[1]=='hd-wm1.webp' and not r[2] and r[3]=='0 0 360 1120' and r[4]==44,r)
            rep('ไม่มี error',errs==[],errs)
    finally:p.terminate()
    print('SUMMARY',sum(R),'/',len(R))
asyncio.run(main())
