"""v423 ย้อมสี + ท่าคู่/ถ่ายรูป + มอนฉลาด"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
PTYJS=open(__file__.rsplit('/',1)[0]+'/t_stack.py').read().split('PTYJS="""')[1].split('"""')[0]
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        names=[('Ann','melee'),('Bee','mage'),('Cid','archer'),('Dan','sup')]
        C=[await new_client(b,n,c,60) for n,c in names]
        A,B,Cc,Dd=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.x=CX+300+i*30;me.y=CY+380;setInterval(()=>{banner=null},400)}",i)
        await A.wait(2500)
        mem=[[c.uid,n,cl] for c,(n,cl) in zip(C[:3],names[:3])]
        for c in C[:3]: await c.ev(PTYJS,mem)
        await A.wait(800)
        # ===== ย้อมสี =====
        r=await A.ev("()=>{me.gold=99999;me.gth=me.gth||{m:{}};me.gth.m=me.gth.m||{};Object.assign(me.gth.m,{h1:10,h2:5,o1:5,o2:5,o3:5,gm:5,h3:3,rt:2});const g0=me.gold;const m1=dyCraft('d1');const m8=dyCraft('d8');return [m1,dyCnt('d1'),dyCnt('d8'),me.gth.m.h1,g0-me.gold,GTK.includes('d7'),MKG.includes('d7'),!!GDM.d7]}")
        rep('ผสมสีย้อมจากวัตถุดิบ (หักวัตถุดิบ+ทอง) · ลงทะเบียนเป็นของในกระเป๋า/ตลาด',r[1]==1 and r[2]==1 and r[3]==7 and r[4]==5200 and r[5] and r[6] and r[7],json.dumps(r,ensure_ascii=False))
        r=await A.ev("()=>{const a=dyApply('a','d1'),b=dyApply('w','d8');return [a,b,dyCnt('d1'),me.wdr.c,wdrDy(),dyApply('h','d1')]}")
        rep('ย้อมเสื้อ+อาวุธ ใช้สีย้อมขวดละครั้ง · หมดแล้วย้อมไม่ได้',r[2]==0 and r[3].get('a')=='d1' and r[3].get('w')=='d8' and r[4]==(1<<8)|(8<<4) and 'ไม่มี' in r[5],json.dumps(r,ensure_ascii=False))
        await A.wait(1500)
        dv=await B.ev("(u)=>others[u]&&others[u].dy",A.uid)
        rep('เพื่อนเห็นสีที่ย้อม (presence dy)',dv==(1<<8)|(8<<4),str(dv))
        fl=await B.ev("(u)=>{const S=new Set();const D=Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype,'filter');Object.defineProperty(CanvasRenderingContext2D.prototype,'filter',{configurable:true,get(){return D.get.call(this)},set(v){if(v&&v!=='none')S.add(String(v).replace(/hue-rotate\\(\\d+deg\\) brightness\\(1.12\\)/,'RAINBOW'));D.set.call(this,v)}});const o=others[u];me.x=o.x+40;me.y=o.y;const L0=LOWQ,G0=GQ;setGQ('high');for(let i=0;i<3;i++)draw();LITEQ=1;for(let i=0;i<3;i++)draw();LITEQ=0;Object.defineProperty(CanvasRenderingContext2D.prototype,'filter',D);return [...S]}",A.uid)
        rep('วาดชิ้นที่ย้อมด้วยสีนั้น (เสื้อแดง · อาวุธรุ้งเปลี่ยนสี)',any('hue-rotate(-38deg)' in x for x in fl) and any('RAINBOW' in x for x in fl),json.dumps(fl[:6]))
        sv=await A.ev("()=>{const c=cleanChar(JSON.parse(JSON.stringify(snap())));return [c.wdr&&c.wdr.c,c.gth&&c.gth.m&&c.gth.m.d8|0]}")
        rep('สีที่ย้อม + สีย้อมในกระเป๋า ไม่หายตอนเซฟ/โหลด',sv[0]=={'a':'d1','w':'d8'} or (sv[0] and sv[0].get('a')=='d1'),json.dumps(sv))
        ui=await A.ev("()=>{ov.dataset.k='wdr';GPV.wt='dye';wardrobeUI();const h=ov.innerHTML;const ok=[h.includes('🎨 ย้อมสี'),h.includes('ผสมสีย้อม'),!!document.querySelector('[data-dym=\"d2\"]')];document.querySelector('[data-dym=\"d2\"]').click();const n=dyCnt('d2');document.querySelector('[data-dya=\"h:d2\"]').click();ok.push(n,me.wdr.c.h);ov.hidden=true;ov.dataset.k='';return ok}")
        rep('แท็บ 🎨 ย้อมสีในตู้เสื้อผ้า: กดผสม/กดย้อมได้',ui[0] and ui[1] and ui[2] and ui[3]==1 and ui[4]=='d2',json.dumps(ui,ensure_ascii=False))
        mk=open('/home/claude/refugee-online/server.js').read()
        rep('ตลาด/จดหมายรับสีย้อม (เซิร์ฟเวอร์ mkOk)','rt|d[1-8])$' in mk)
        # ===== ท่าคู่ =====
        await B.ev("(u)=>{const o=others[u];me.x=o.x+50;me.y=o.y}",A.uid);await Dd.ev("(u)=>{const o=others[u];me.x=o.x-60;me.y=o.y+10}",A.uid);await A.wait(1200)
        await A.ev("(u)=>{window.__pn=()=>u}",B.uid)
        await A.ev("()=>{const _n=peNear;peNear=function(){return window.__pn()}}")
        await A.ev("()=>peUse('hf')");await A.wait(700)
        st=[await c.ev("([a,b])=>[!!PE[a],!!PE[b],PE[a]&&PE[a].e]",[A.uid,B.uid]) for c in (A,B,Cc)]
        rep('ไฮไฟว์กับเพื่อนในปาร์ตี้ → เล่นทันที ทุกเครื่องเห็น',all(s[0] and s[1] and s[2]=='hf' for s in st),json.dumps(st))
        vw=await A.ev("(u)=>{const v=peView(u);const o=others[u];return v?[Math.round(v.x-o.x),v.f]:null}",B.uid)
        await A.wait(400);vw2=await A.ev("(u)=>{const v=peView(u);const o=others[u];return v?[Math.round(v.x-o.x),v.f]:null}",B.uid)
        rep('สองคนหันหากันและขยับเข้าหากัน',vw2 is not None and vw2[0]<0 and vw2[1]==-1,json.dumps([vw,vw2]))
        await A.wait(2200)
        await A.ev("(u)=>{window.__pn=()=>u}",Dd.uid)
        await A.ev("()=>peUse('hg')");await A.wait(700)
        q=await Dd.ev("()=>{pebUI();const b=$('peb');return [PER.u,PER.e,b&&!b.hidden]}")
        rep('คนนอกปาร์ตี้ต้องกดรับก่อน (ปุ่ม ✅)',q[0]==A.uid and q[1]=='hg' and q[2],json.dumps(q))
        await Dd.ev("()=>$('peb').click()");await A.wait(700)
        st=[await c.ev("([a,b])=>[!!PE[a],!!PE[b],PE[a]&&PE[a].e]",[A.uid,Dd.uid]) for c in (A,Dd)]
        rep('กดรับแล้วกอดกัน',all(s[0] and s[1] and s[2]=='hg' for s in st),json.dumps(st))
        # ===== โหมดถ่ายรูป =====
        r=await A.ev("""()=>{phOn();const o={cls:document.body.classList.contains('phm'),bar:!$('phb').hidden,hud:getComputedStyle($('hud')).visibility,cv:getComputedStyle($('c')).visibility};
          PH.ox=120;PH.oy=-40;PH.z=1.3;o.cam=rt3Cam();o.me=[me.x,me.y];o.z=camZoomT();PH.tags=0;phShot();o.img=($('phv')&&$('phv').querySelector('img').src||'').slice(0,22);$('phv').remove();phOff();o.after=document.body.classList.contains('phm');return o}""")
        rep('โหมดถ่ายรูป: ซ่อนปุ่ม/แถบ · เลื่อน/ซูมกล้อง · ถ่ายเป็นภาพ PNG · ออกได้',r['cls'] and r['bar'] and r['hud']=='hidden' and r['cv']=='visible' and abs(r['cam'][0]-r['me'][0]-120)<1 and r['z']==1.3 and r['img'].startswith('data:image/png') and not r['after'],json.dumps(r))
        emp=await A.ev("()=>{emoToggle();const p=$('emp');const n=p.querySelectorAll('[data-pe]').length;p.hidden=true;return n}")
        rep('เมนูท่าทางมีปุ่มท่าคู่ 3 แบบ + ถ่ายรูป',emp==4,str(emp))
        # ===== มอนฉลาด =====
        H=None
        for c in C:
            if await c.ev("()=>isHost()"):H=c
        await B.ev("()=>{window.__mai=0;const _m=maiFx;maiFx=function(o){if(o&&o.to===uid)window.__mai++;return _m.apply(this,arguments)}}")
        X,Y=await A.ev("()=>[Math.round(CX+700),Math.round(CY+700)]")
        await A.ev("([x,y])=>{me.x=x;me.y=y}",[X,Y]);await B.ev("([x,y])=>{me.x=x+120;me.y=y}",[X,Y])
        for c in (Cc,Dd): await c.ev("([x,y])=>{me.x=x+900;me.y=y+900}",[X,Y])
        await A.wait(1500)
        ids=await H.ev("""([x,y])=>{const L=[];let base=900000;const mk=k=>{let id=base;while(id%3!==k)id++;base=id+1;const m={id,x:x-40,y:y,tx:x-40,ty:y,t:0,L:40,p:0,hp:1e9,mh:1e9,tg:null,tt:0,ac:9,w:null,lg:0};mons.push(m);L.push(id)};
          mk(0);mk(1);mk(2);window.__pin=setInterval(()=>{mons.forEach(m=>{if(L.includes(m.id)){m.x=x-40;m.y=y;m.ac=9}})},30);window.__ids=L;return L}""",[X,Y])
        await A.wait(2500)
        tg=await H.ev("()=>window.__ids.map(i=>{const m=mons.find(q=>q.id===i);return m?[m.tg,m.mtg|0]:null})")
        rep('มอนดุดันตีคนใกล้สุด (นักรบ) · นักฉวยข้ามไปตีนักเวทที่ยืนหลัง',tg[0][0]==A.uid and tg[1][0]==B.uid,json.dumps(tg)+' A='+A.uid+' B='+B.uid)
        w=await B.ev("()=>window.__mai|0")
        rep('ผู้เล่นที่ถูกเลือกเป็นเป้าเห็น ❗ เหนือหัวมอน',w>=1,str(w))
        await B.ev("()=>{window.__lo=setInterval(()=>{me.hp=Math.round(me.mh*.2)},100)}");await A.wait(2500)
        tg=await H.ev("()=>window.__ids.map(i=>{const m=mons.find(q=>q.id===i);return m?m.tg:null})")
        rep('นักล่ารุมคนเลือดน้อย (นักเวทเลือด 20%)',tg[2]==B.uid,json.dumps(tg))
        await B.ev("()=>{clearInterval(window.__lo);me.hp=me.mh}");await B.ev("([x,y])=>{me.x=x+900;me.y=y-900}",[X,Y]);await A.wait(2500)
        tg=await H.ev("()=>window.__ids.map(i=>{const m=mons.find(q=>q.id===i);return m?[m.tg,m.mtg|0]:null})")
        rep('เหลือผู้เล่นคนเดียวใกล้ ๆ → กลับเป็น AI เดิม (ไม่ใช้สมองปาร์ตี้)',all(t[1]==0 for t in tg),json.dumps(tg))
        await H.ev("()=>{clearInterval(window.__pin);window.__ids.forEach(i=>{const k=mons.findIndex(q=>q.id===i);if(k>=0)mons.splice(k,1)})}")
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
