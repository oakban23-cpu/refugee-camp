"""v424 ท่าคู่กันรัว/เลือกคน · ดาวน์โหลดภาพ · ย้อมสีสำรอง"""
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
        names=[('Ann','melee'),('Bee','mage'),('Dan','sup')]
        C=[await new_client(b,n,c,60) for n,c in names]
        A,B,Dd=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;me.x=CX+300+i*40;me.y=CY+380;setInterval(()=>{if(banner&&banner.s)window.__bn=banner.s},50)}",i)
        await A.wait(2000)
        for c in (A,B): await c.ev(PTYJS,[[A.uid,'Ann','melee'],[B.uid,'Bee','mage']])
        await A.wait(1500)
        # ---- เลือกคน ----
        L=await A.ev("()=>peList().map(q=>[q.u,q.pt])")
        rep('รายชื่อคนรอบตัว: เพื่อนในปาร์ตี้ขึ้นก่อน',len(L)==2 and L[0][0]==B.uid and L[0][1],json.dumps(L))
        pk=await A.ev("()=>{emoToggle();peUse('hf');const p=$('emp');const bs=[...p.querySelectorAll('[data-pp]')].map(b=>b.dataset.pp);return [p.hidden,bs]}")
        rep('มีหลายคนใกล้ ๆ → ขึ้นรายชื่อให้เลือกก่อน',not pk[0] and pk[1][0]==B.uid+'|hf' and len(pk[1])==3,json.dumps(pk))
        await A.ev("()=>document.querySelector('#emp [data-pp]').click()");await A.wait(700)
        ok=await B.ev("(a)=>!!PE[a]&&PE[a].e==='hf'",A.uid)
        rep('แตะชื่อเพื่อน → เล่นท่ากับคนนั้น',ok)
        # ---- กันรัว ----
        r=await A.ev("(u)=>{window.__bn='';peAsk(u,'hg');return [window.__bn||banner&&banner.s,PEW.to]}",Dd.uid)
        rep('ชวนซ้ำภายใน 5 วิ ไม่ได้',('รออีก' in (r[0] or '')) ,json.dumps(r,ensure_ascii=False))
        await A.ev("()=>{PECD.t=0}")
        await A.ev("(u)=>peAsk(u,'hg')",Dd.uid);await A.wait(600)
        d1=await Dd.ev("()=>[PER.u,PER.e,Math.round(PER.t)]")
        await A.ev("()=>{PECD.t=0}")
        r=await A.ev("(u)=>{banner=null;peAsk(u,'hg');return banner&&banner.s}",Dd.uid)
        rep('ชวนคนเดิมที่ยังไม่ตอบซ้ำไม่ได้ 30 วิ',d1[0]==A.uid and 'เพิ่งชวน' in (r or ''),json.dumps([d1,r],ensure_ascii=False))
        # ผู้ป่วนแก้เครื่องตัวเองข้ามเวลาพัก → ฝั่งรับยังไม่เด้งซ้ำ
        await Dd.ev("()=>{PER.u='';window.__n=0;const _f=peFx;peFx=function(o){if(o&&o.k==='peq'&&o.to===uid)window.__n++;return _f.apply(this,arguments)}}")
        for _ in range(3):
            await A.ev("(u)=>{PECD.t=0;PECD.blk={};fx({k:'peq',to:u,e:'hg',n:'Ann'})}",Dd.uid);await A.wait(250)
        d2=await Dd.ev("()=>[window.__n,PER.u]")
        rep('ฝั่งรับ: คำชวนรัวจากคนเดิมถูกเมิน (ไม่เด้งซ้ำ)',d2[0]>=3 and d2[1]=='',json.dumps(d2))
        # ---- ดาวน์โหลด ----
        dl=await A.ev("""async()=>{let got=null;window.claude={use:async n=>n==='downloads'?{save:async q=>{got=[q.filename,q.data&&q.data.size>0,q.data&&q.data.type];return{status:'saved'}}}:null};
          phOn();phShot();const a=$('phv').querySelector('a');a.click();await new Promise(r=>setTimeout(r,800));const out=[got,a.getAttribute('download')];$('phv').remove();phOff();delete window.claude;return out}""")
        rep('ดาวน์โหลดภาพผ่านระบบ downloads ของ claude.ai (มีให้กดยืนยัน) · เว็บปกติยังเป็นลิงก์ดาวน์โหลด',dl[0] and dl[0][0]=='refugee-photo.png' and dl[0][1] and dl[1]=='refugee-photo.png',json.dumps(dl))
        # ---- ย้อมสีสำรอง ----
        px=await A.ev("""()=>{const out={};const LQ0=LOWQ;LOWQ=false;for(const ok of [true,false]){DYFOK=ok;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const G=g;g=x;CHDY=1<<8;
            const f=dyWrap(function(){g.fillStyle='#8a8a8a';g.fillRect(10,10,30,30)},'a');f();g=G;CHDY=0;const d=x.getImageData(25,25,1,1).data,e=x.getImageData(55,55,1,1).data;out[ok?'filter':'fallback']=[d[0],d[1],d[2],e[3]]}
          DYFOK=true;LOWQ=LQ0;return out}""")
        fb=px['fallback'];fl=px['filter']
        rep('ย้อมสีได้ทั้งแบบปกติ (filter) และแบบสำรองสำหรับเบราว์เซอร์เก่า (ออกแดง · นอกชิ้นยังใส)',fb[0]>fb[1]+40 and fb[0]>fb[2]+40 and fb[3]==0 and fl[0]>fl[2]+40,json.dumps(px))
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
