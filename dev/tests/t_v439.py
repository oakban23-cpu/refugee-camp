"""v439 คัตซีนเนื้อเรื่องในเกม"""
import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
ST="()=>[SD.on,CZ.on,CZ.id,CZ.soft,document.body.classList.contains('csm'),!!PH.on,!!($('csx')&&!$('csx').hidden),$('scine').classList.contains('on')]"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',99)
        await A.ev(CLR);await A.ev("()=>{enterMap(1,{x:MAPS[1].npc4.x+60,y:MAPS[1].npc4.y+40})}");await A.wait(3500)
        # ① เริ่มฉากสำคัญ
        await A.ev("()=>{window.__dn=0;stSay(STY[0].pre,()=>{window.__dn=1})}");await A.wait(600)
        s=await A.ev(ST)
        rep('① บทเปิดภาค 1 เล่นเป็นคัตซีน: ซ่อน HUD · แถบดำ · ปุ่มข้าม · ภาพสะอาด',s[0] and s[1]==1 and s[2]=='p1o' and s[4] and s[5] and s[6] and s[7],str(s))
        cams=[]
        for i in range(4):
            await A.wait(1700);cams.append(await A.ev("()=>[SD.i,Math.round(CZ.cur.x),Math.round(CZ.cur.y),+CZ.cur.z.toFixed(2),!!CZ.ttl,+ZM.z.toFixed(2)]"))
            await A.ev("()=>{if(SD.typ)stNext();stNext()}")
        print('cams',cams)
        zs={c[3] for c in cams};ttl=any(c[4] for c in cams)
        rep('① กล้องเปลี่ยนมุม/ซูมตามบท และมีการ์ดชื่อภาค',len(zs)>=3 and ttl and abs(cams[0][3]-cams[0][5])<.25,str(cams))
        await A.ev("()=>{czSkip()}");await A.wait(500)
        s=await A.ev(ST);dn=await A.ev("()=>window.__dn")
        rep('② กดข้ามฉาก: ปิดบท คืน HUD/กล้อง และเรียกต่อเนื้อเรื่องตามปกติ',not s[0] and s[1]==0 and not s[4] and not s[5] and dn==1,str(s)+' done='+str(dn))
        # ③ ข้ามแต่มีตัวเลือก
        await A.ev("()=>{window.__ch=null;stSay(STY[20].post,null,{choice:[['ผนึก',1],['ปลดปล่อย',2]]});SD.onChoose=v=>{window.__ch=v}}");await A.wait(500)
        await A.ev("()=>{czSkip()}");await A.wait(800)
        c=await A.ev("()=>[SD.on,SD.i===SD.q.length-1,!!document.querySelector('#sdlg [data-sdc]'),CZ.on,CZ.id]")
        rep('③ ฉากที่มีตัวเลือก: กดข้ามแล้วไปหยุดที่ตัวเลือก ไม่ข้ามการตัดสินใจ',c[0] and c[1] and c[2] and c[3]==1 and c[4]=='p1e',str(c))
        await A.ev(CLR);await A.wait(400)
        # ④ บทสนทนาที่ไม่ใช่เนื้อเรื่อง
        await A.ev("()=>{stSay([['nar','ข้อความทั่วไป']],null)}");await A.wait(400)
        s=await A.ev(ST);rep('④ บทสนทนาทั่วไป (ไม่ใช่เนื้อเรื่อง) ไม่เข้าโหมดคัตซีน',s[0] and s[1]==0 and not s[4],str(s))
        await A.ev(CLR);await A.wait(300)
        # ⑤ ผู้กำกับอัตโนมัติ
        await A.ev("()=>{stSay(STY[1].pre,null)}");await A.wait(1600)
        s=await A.ev(ST);cm=await A.ev("()=>[Math.round(CZ.cur.x),Math.round(CZ.cur.y),+CZ.cur.z.toFixed(2),Math.round(me.x),Math.round(me.y)]")
        rep('⑤ บทสนทนาเนื้อเรื่องอื่น ๆ: ผู้กำกับอัตโนมัติ (กล้องหาคนพูด + ซ่อน HUD)',s[1]==1 and s[3]==1 and s[4] and cm[2]>1.05,str(s)+str(cm))
        await A.ev(CLR);await A.wait(400)
        s=await A.ev(ST);rep('⑤ ปิดบทแล้วกลับเป็นปกติ',not s[1] and not s[4] and not s[5],str(s))
        # ⑥ เมนูดูซ้ำ
        await A.ev("()=>{me.sty={s:30,n:0,a:0,e:1}}")
        r=await A.ev("()=>{storyUI();const B=[...ov.querySelectorAll('[data-csr]')].map(b=>b.dataset.csr);return B}")
        rep('⑥ เมนูเนื้อเรื่องมีรายการฉากสำคัญ · ปลดล็อกตามความคืบหน้า',('p1o' in r) and ('p2o' in r) and ('p7e' not in r),str(r))
        await A.ev("()=>{ov.querySelector('[data-csr=\"p2o\"]').click()}");await A.wait(800)
        s=await A.ev(ST);rep('⑥ กดดูซ้ำแล้วเล่นคัตซีน',s[1]==1 and s[2]=='p2o' and s[4],str(s))
        await A.ev("()=>{czSkip()}");await A.wait(500)
        # ⑦ ไหลจริงจากระบบเควส
        await A.ev("()=>{me.sty={s:0,n:0,a:0,e:0};mons.forEach(m=>{m.x+=8000})}");await A.wait(2500)
        s=await A.ev(ST);await A.ev("()=>{czSkip()}");await A.wait(800)
        q=await A.ev("()=>[me.sty.s,me.sty.a,SD.on,CZ.on]")
        rep('⑦ เริ่มเกมใหม่: บทเปิดเล่นเป็นคัตซีนเอง และข้ามแล้วเควสเดินต่อ',s[2]=='p1o' and q[1]>=1 and not q[3],str(s)+str(q))
        # ⑧ ระหว่างคัตซีนไม่โดนตี
        await A.ev("()=>{gmGod=false;me.hp=me.mh;stSay(STY[21].pre,null);hurt(100)}");await A.wait(300)
        h=await A.ev("()=>[me.mh-me.hp,CZ.id]");await A.ev(CLR)
        rep('⑧ ระหว่างคัตซีนไม่โดนดาเมจ',h[0]==0 and h[1]=='p2o',str(h))
        Es=[e for e in A.errs if 'Failed to load resource' not in e];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
