"""v416 ขี่คอต่อตัว (ปาร์ตี้) 5 เครื่อง"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
D='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/fx/'
PTYJS="""(M)=>{clearInterval(window.__pt);const f=()=>{PTY={id:'pz',lead:M[0][0],mem:M.map(([u,n,c])=>{const o=u===uid?me:others[u];return{u,n,cls:c,lv:60,hp:o?Math.round(o.hp):100,mh:o?o.mh:100,mp:curMap,s:Date.now()}})}};f();window.__pt=setInterval(f,500)}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        names=[('Base','melee'),('Up1','archer'),('Up2','mage'),('Up3','sup'),('Late','assn'),('Out','melee')]
        C=[await new_client(b,n,c,60) for n,c in names]
        A,B,Cc,Dd,E,F=C
        for i,c in enumerate(C):
            await c.ev("(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;me.x=CX+300+i*14;me.y=CY+380;setInterval(()=>{banner=null},400)}",i)
        await A.wait(3000)
        mem=[[c.uid,n,cl] for c,(n,cl) in zip(C[:4],names[:4])]
        for c in C[:4]: await c.ev(PTYJS,mem)
        await E.ev(PTYJS,[[A.uid,'Base','melee'],[E.uid,'Late','assn']])
        await A.wait(1500)
        btn=await B.ev("(u)=>{ptHud();return !!document.querySelector('#ptyhud [data-sk=\"'+u+'\"]')}",A.uid)
        rep('แถบปาร์ตี้มีปุ่ม 🧗 ที่ชื่อเพื่อน',btn)
        await B.ev("(u)=>{ptHud();document.querySelector('#ptyhud [data-sk=\"'+u+'\"]').click()}",A.uid);await A.wait(500)
        await Cc.ev("(u)=>{ptHud();document.querySelector('#ptyhud [data-sk=\"'+u+'\"]').click()}",B.uid);await A.wait(500)
        await Dd.ev("(u)=>{ptHud();document.querySelector('#ptyhud [data-sk=\"'+u+'\"]').click()}",Cc.uid);await A.wait(1500)
        st=[await c.ev("()=>SKE.b?skRoot(uid):''") for c in (B,Cc,Dd)]
        rep('ปีน 3 คน (แตะคนบนหอ = ปีนไปบนสุดของฐานเดียวกัน)',all(s==A.uid for s in st),json.dumps(st))
        lv=await A.ev("()=>skRiders(uid).map(r=>r.u)")
        rep('ฐานเห็นหอ 3 ชั้นเรียงตามลำดับที่ปีน',lv==[B.uid,Cc.uid,Dd.uid],json.dumps(lv))
        await E.ev("(u)=>skClimb(u)",A.uid);await A.wait(300)
        rep('คนที่ 5 ปีนไม่ได้ (เต็ม 4 คน)',await E.ev("()=>SKE.b")=='')
        await F.ev("(u)=>skClimb(u)",A.uid);await A.wait(300)
        rep('คนนอกปาร์ตี้ปีนไม่ได้',await F.ev("()=>SKE.b")=='')
        await A.ev("()=>{joy={dx:40,dy:0,mv:1}}");await A.wait(1500);await A.ev("()=>{joy=null}");await A.wait(1300)
        pa=await A.ev("()=>[me.x,me.y]");ps=[await c.ev("()=>[me.x,me.y]") for c in (B,Cc,Dd)]
        rep('ฐานเดิน ทั้งหอเดินตาม',all(abs(q[0]-pa[0])<30 and abs(q[1]-pa[1])<20 for q in ps),f'A={pa} {ps}')
        for nm,c in (('A',A),('C',Cc),('F',F)):
            await c.ev("()=>{document.querySelectorAll('#rbq,#rnq,#stq,#clog').forEach(e=>e.style.visibility='hidden')}")
            open(D+'stack_%s.png'%nm,'wb').write(await c.pg.screenshot())
        a0=await A.ev("()=>{gmGod=false;me.hp=me.mh;return me.hp}");b0=await B.ev("()=>{gmGod=false;me.hp=me.mh;return me.hp}")
        await B.ev("()=>{hurt(120);hurt(80)}");await A.wait(1500)
        a1=await A.ev("()=>me.hp");b1=await B.ev("()=>me.hp")
        rep('คนขี่โดนตี → ฐานรับดาเมจแทน',b1==b0 and a1<a0,f'base {a0}->{a1} rider {b0}->{b1}')
        blk=await A.ev("()=>{const mm=mons.filter(q=>q.hp>0).sort((p,q)=>Math.hypot(p.x-me.x,p.y-me.y)-Math.hypot(q.x-me.x,q.y-me.y))[0];if(mm){me.x=mm.x-20;me.y=mm.y}const n0=me.atkN|0;me.sk[0]=0;me.mp=me.mm;useSkill(0);const used=me.sk[0]>0;me.dgCd=0;const x0=me.x;const dg=dodge();const dodged=dg!==false||(me.dgCd||0)>0;const m=mons.find(q=>q.hp>0);if(m&&!m.dum){}return new Promise(r=>setTimeout(()=>r({used,dodged,atk:(me.atkN|0)-n0,b:SKB0}),3000))}")
        ra=await B.ev("()=>{const n0=me.atkN|0;return new Promise(r=>setTimeout(()=>r((me.atkN|0)-n0),3000))}")
        rep('ฐานเป็นโล่: ตีปกติ/ใช้สกิล/หลบไม่ได้ · คนข้างบนตีได้',blk['b']==1 and not blk['used'] and not blk['dodged'] and blk['atk']==0 and ra>0,json.dumps(blk)+' rider atk '+str(ra))
        await A.ev("()=>{me.mts=[1];me.mt=1;mountToggle()}")
        rep('ฐานขี่สัตว์ไม่ได้ระหว่างมีคนขี่คอ',await A.ev("()=>!me.riding"))
        await Dd.ev("()=>{joy={dx:30,dy:0,mv:1}}");await Dd.wait(1100);await Dd.ev("()=>{joy=null}");await A.wait(1300)
        lv2=await A.ev("()=>skRiders(uid).map(r=>r.u)")
        rep('คนบนสุดดันจอยกระโดดลง หอเหลือ 2 ชั้น',lv2==[B.uid,Cc.uid],json.dumps(lv2))
        k=await A.ev("()=>{rdUI();return RDF}")
        rep('ฐานมีปุ่ม «ให้ทุกคนลง»',k=='skall',k)
        await A.ev("()=>$('rdb').click()");await A.wait(1500)
        rep('ฐานกดให้ทุกคนลง',[await c.ev("()=>SKE.b") for c in (B,Cc)]==['',''])
        ab=await A.ev("()=>{const mm=mons.filter(q=>q.hp>0).sort((p,q)=>Math.hypot(p.x-me.x,p.y-me.y)-Math.hypot(q.x-me.x,q.y-me.y))[0];if(mm){me.x=mm.x-20;me.y=mm.y}const n0=me.atkN|0;return new Promise(r=>setTimeout(()=>r({atk:(me.atkN|0)-n0,b:SKB0}),3000))}")
        rep('ไม่มีคนบนคอแล้ว ฐานกลับมาตีได้',ab['b']==0 and ab['atk']>0,json.dumps(ab))
        d2=await A.ev("()=>{me.dgCd=0;const r=dodge();return r!==false||(me.dgCd||0)>0}")
        rep('ไม่มีคนบนคอแล้ว ฐานกดหลบได้',d2)
        await B.ev("(u)=>{const o=others[u];me.x=o.x+10;me.y=o.y;skClimb(u)}",A.uid);await A.wait(1300)
        on=await B.ev("()=>SKE.b");await A.ev("()=>{me.hp=0;me.down=5}");await A.wait(1800)
        rep('ฐานล้ม หอพัง คนขี่ลง',on==A.uid and await B.ev("()=>SKE.b")=='')
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
