"""v440 เตาหลอมโฉมใหม่"""
import asyncio,sys,json
sys.path.insert(0,__file__.rsplit('/',1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLR="()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true}"
MK="(u)=>{const it=genItem(60,'w',5,5);it.u=u;me.bag.unshift(it);smSel='bag:0';me.gold=1e9;me.inv.s1=99;me.inv.s2=99;me.inv.s3=99;me.inv.ps=0;smProt=false;return [it.r,it.u]}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',99)
        await A.ev(CLR);await A.wait(1500)
        ok=await A.ev("()=>typeof genItem")
        if ok!='function':
            gi=await A.ev("()=>Object.keys(window).filter(k=>/^gen|^mkItem|^newItem|^rollItem/.test(k)).slice(0,10)");print('gen fns',gi)
        r=await A.ev(MK,12);print('item',r)
        await A.ev("()=>{smithUI()}")
        c=await A.ev("()=>{const pn=ov.querySelector('[data-pn=\"smith\"]');return[!!pn&&pn.innerHTML.includes('🔥 เตาหลอม'),(ov.querySelector('[data-smu]')||{}).textContent]}")
        rep('หน้าช่างตีบวกมีการ์ดเตาหลอม (ไฟเตา/ตีด่วน/สถิติ) และปุ่ม «เข้าเตาหลอม»',c[0] and 'เตาหลอม' in (c[1] or ''),str(c))
        h=await A.ev("""()=>{const F=fgSt();F.h={a:0,b:0,c:0};const mr=Math.random;Math.random=()=>.995;const L=[];for(let i=0;i<3;i++){const it=smGet(smSel);it.u=12;fgDo(0);L.push(F.h.b)}const heat=fgHeat(12);Math.random=()=>.5;const r1=+fgRate(12,0).toFixed(3),r2=+fgRate(12,.2).toFixed(3),base=upRate(12);Math.random=()=>.0001;const it=smGet(smSel);it.u=12;const R=fgDo(0);Math.random=mr;return[L,+heat.toFixed(2),r1,r2,+base.toFixed(3),R.k,F.h.b]}""")
        rep('② ไฟเตา: พลาด 3 ครั้ง (+11~+20) สะสม +6% · โอกาสรวมถูกต้อง · สำเร็จแล้วรีเซ็ต',h[0]==[1,2,3] and h[1]==0.06 and abs(h[2]-(h[4]+0.06))<0.002 and abs(h[3]-(h[4]*1.2+0.06))<0.002 and h[5] in('ok','great') and h[6]==0,str(h))
        g=await A.ev("""()=>{const mr=Math.random;Math.random=()=>.001;const it=smGet(smSel);it.u=12;const R=fgDo(0);const a=[R.k,it.u];it.u=8;const R2=fgDo(0);const b=[R2.k,it.u];it.u=9;const R3=fgDo(0);const c=[R3.k,it.u];it.u=18;const R4=fgDo(0);const d=[R4.k,it.u];Math.random=mr;return[a,b,c,d]}""")
        rep('③ ตีบวกสุดยอด +2 (+12→+14, +8→+10) · ไม่ข้ามด่าน +10/+20 (+9→+10, +18→+19)',g==[['great',14],['great',10],['ok',10],['ok',19]],str(g))
        chat=await A.ev("()=>chatLog.slice(-3).map(c=>c.t)")
        rep('⑤ ตีสำเร็จระดับสูง/สุดยอด ประกาศในแชต',any('ตีบวก' in t for t in chat),json.dumps(chat,ensure_ascii=False)[:200])
        br=await A.ev("""()=>{const F=fgSt();const n0=me.bag.length,b0=F.st.br;const mr=Math.random;const seq=[.999,.1];let i=0;Math.random=()=>seq[Math.min(i++,1)];const it=smGet(smSel);it.u=22;it.r=6;it.ss=it.ss||0;const el=upElig(it);const R=fgDo(0);Math.random=mr;return[el,R&&R.k,me.bag.length-n0,F.st.br-b0]}""")
        rep('ตี +22 พลาดแล้วแตก: ไอเทมหาย · นับสถิติแตก',br[1]=='break' and br[2]==-1 and br[3]==1,str(br))
        # ④ หน้าต่างเตาหลอม
        await A.ev(MK,12);await A.ev("()=>{FG.quick=0;smithUI();smithUp()}");await A.wait(500)
        o=await A.ev("()=>{const d=$('fgx');return[!!d&&!d.hidden,FG.ph,!!d.querySelector('.fgbar')]}")
        rep('④ กดตีบวก +13 เปิดเตาหลอม มีแถบจังหวะ',o==[True,'aim',True],str(o))
        await A.ev("()=>{FG.p=FG.c;fgHitNow()}");await A.wait(300)
        s=await A.ev("()=>[FG.ph,FG.tb,FG.lab,!!FG.res]")
        await A.wait(2400)
        e=await A.ev("()=>{const d=$('fgx');return[FG.ph,d.querySelector('.fgn').textContent,!!d.querySelector('[data-fga=\"close\"]')]}")
        rep('④ แตะตอนเข็มกลางโซน = เป๊ะ (×1.2) → ฉากตี → เฉลยผล',s[0]=='strike' and s[1]==0.2 and e[0]=='res' and len(e[1])>0 and e[2],str(s)+str(e))
        await A.ev("()=>{$('fgx').querySelector('[data-fga=\"close\"]').click()}");await A.wait(400)
        cl=await A.ev("()=>[getComputedStyle($('fgx')).display==='none',ov.dataset.k,!ov.hidden]")
        rep('④ ปิดเตาหลอมแล้วกลับหน้าช่างพร้อมข้อความผล',cl==[True,'smith',True],str(cl))
        await A.ev(MK,12);await A.ev("()=>{smithUp()}");await A.wait(8800)
        a=await A.ev("()=>[FG.ph,FG.lab,FG.tb]")
        rep('④ ไม่แตะใน 8 วิ ค้อนตีเอง (ไม่มีโบนัส)',a[0] in('strike','res') and a[1]=='ค้อนตีเอง' and a[2]==0,str(a))
        await A.wait(2500);await A.ev("()=>fgClose()")
        q=await A.ev("()=>{FG.quick=1;const it=smGet(smSel);const u0=it?it.u:0;smithUp();const d=$('fgx');return[d.hidden,ov.dataset.k,(ov.querySelector('.note')||{}).textContent||'']}")
        rep('⑥ โหมดตีด่วน: ไม่มีฉาก ได้ผลทันที',q[0] and q[1]=='smith' and len(q[2])>0,str(q))
        sv=await A.ev("()=>{const F=fgSt();F.h.b=4;F.q=1;const o=snap();const c=cleanChar(JSON.parse(JSON.stringify(o)));me.fg={};FG.quick=0;applySave(c);return[!!o.fg,c.fg&&c.fg.h.b,me.fg.h&&me.fg.h.b,FG.quick]}")
        rep('บันทึก/โหลด: ไฟเตา สถิติ และโหมดตีด่วนไม่หาย',sv==[True,4,4,1],str(sv))
        Es=[e for e in A.errs if 'Failed to load resource' not in e];rep('ไม่มี error',not Es,str(Es[:3]))
    finally: p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
