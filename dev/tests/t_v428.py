"""v428 เก็บวัตถุดิบรอบ 2: สายแร่ยักษ์ · เครื่องมือ · มินิเกมจังหวะ · ดาว/ฉายา/สมุดสะสม"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
GO="(i)=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;enterMap(2,{x:900+i*30,y:1600})}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        C=[await new_client(b,n,c,60) for n,c in [('Gaa','melee'),('Gbb','archer'),('Gcc','mage')]]
        A,B,Cc=C
        for i,c in enumerate(C): await c.ev(GO,i)
        await A.wait(3500)
        mp=[await c.ev("()=>[curMap,gtOkMap(),gtNodes().length]") for c in C]
        rep('ทุกคนอยู่แมพสนามเดียวกัน',all(m==[2,True,10] for m in mp),json.dumps(mp))
        # ---- เครื่องมือ ----
        tl=await A.ev("""()=>{const G=gtSt();G.ox=6000;G.m.o1=200;G.m.o2=200;G.m.o3=200;G.m.gm=50;me.gold=1e7;const d0=Math.max(.8,Math.max(1.3,2.4*(1-.05*(gtLvO()-1)))*gwSpd('o'));
          const r=[];for(let i=0;i<6;i++)r.push(gwUpTool('o'));const d1=Math.max(.8,Math.max(1.3,2.4*(1-.05*(gtLvO()-1)))*gwSpd('o'));GTTAB='tl';gtUI();const h=ov.innerHTML;ov.hidden=true;
          return{l:gwTl('o'),d0,d1,last:r[5],o1:G.m.o1,gold:me.gold,ui:h.includes('จอบตำนาน')&&h.includes('สูงสุด'),pow:(GG=null,1+(gwTl('o')>=3?1:0)+(gwTl('o')>=5?1:0)),head:gwHead('o')}}""")
        rep('อัปเกรดจอบครบ 5 ขั้น (หักวัตถุดิบ+ทอง) ขั้น 6 ไม่ได้',tl['l']==5 and tl['o1']==170 and tl['gold']==1e7-660000 and 'ไม่พอ' in tl['last'],json.dumps(tl,ensure_ascii=False))
        rep('จอบดีขึ้น = เก็บเร็วขึ้น · หน้าเครื่องมือขึ้นครบ',tl['d1']<tl['d0']*.75 and tl['ui'],json.dumps([tl['d0'],tl['d1']]))
        lk=await B.ev("()=>{const G=gtSt();G.hx=0;G.m.h1=5;me.gold=1e7;return[gwUpTool('h'),gwTl('h')]}")
        rep('วัตถุดิบไม่พอ อัปเกรดไม่ได้',lk[1]==0 and 'ไม่พอ' in lk[0],json.dumps(lk,ensure_ascii=False))
        # ---- มินิเกมจังหวะ ----
        mg=await A.ev("""()=>new Promise(res=>{const n=gtNodes().find(q=>q.k==='o');me.x=n.x;me.y=n.y+6;const before=gtSt().m[gtMat(n,gtTierFor(n))]|0,pf0=me.stt.gpf|0;
          setTimeout(()=>{gtStart();const C=GTC;if(!C)return res('nostart');setTimeout(()=>{const bt=$('gthb').textContent;C.mg.z=gwNeedle(C);C.mg.w=.3;
            $('gthb').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));const r=C.mg.r;
            setTimeout(()=>res({r,done:!GTC,got:(gtSt().m[gtMat(n,gtTierFor(n))]|0)-before,pf:(me.stt.gpf|0)-pf0,bt}),900)},250)},300)})""")
        rep('แตะตอนเข็มอยู่ในช่องทอง = «เป๊ะ!» เก็บเสร็จทันที ได้ ≥2 ชิ้น',isinstance(mg,dict) and mg['r']==2 and mg['done'] and mg['got']>=2 and mg['pf']==1,json.dumps(mg,ensure_ascii=False))
        rep('ระหว่างเก็บ ปุ่มเปลี่ยนเป็น «🎯 แตะ…»',isinstance(mg,dict) and '🎯' in mg['bt'])
        ms=await A.ev("""()=>new Promise(res=>{const n=gtNodes().filter(q=>q.k==='o')[1];me.x=n.x;me.y=n.y+6;setTimeout(()=>{gtStart();const C=GTC;if(!C)return res('nostart');const p=gwNeedle(C);C.mg.z=p>.5?0:1;C.mg.w=.1;gwTap();
          res({r:C.mg.r,still:!!GTC,again:(gwTap(),C.mg.r)})},300)})""")
        rep('แตะพลาด = ไม่เสียอะไร เก็บต่อตามปกติ · แตะซ้ำไม่ได้',isinstance(ms,dict) and ms['r']==0 and ms['still'] and ms['again']==0,json.dumps(ms))
        await A.wait(3000)
        # ---- ดาว ----
        st=await A.ev("""()=>{const G=gtSt();G.ox=4275+1500+1800-10;const s0=gwStar('o');G.ox+=20;const S0=gwStar('o');G.ox=4275+1500*1+1800+2100+2400+2700;gwStarUp('o',1);
          GTTAB='lv';gtUI();const h=ov.innerHTML;ov.hidden=true;return{s0,S0,s5:gwStar('o'),gso:me.stt.gso|0,ui:h.includes('★5'),dbl:+gwDbl('o').toFixed(3),ban:banner&&banner.s||''}}""")
        rep('ดาวเกิน Lv 10 นับถูก + โบนัส + แสดงในหน้าความชำนาญ',st['s0']==1 and st['S0']==2 and st['s5']==5 and st['ui'] and abs(st['dbl']-(.2+.05))<1e-6,json.dumps(st,ensure_ascii=False))
        ti=await A.ev("()=>{try{achCheck&&achCheck()}catch(e){}const a=ACH.find(q=>q[0]==='gwT1');return{has:!!a,v:a?a[3](me.stt):0,ban:banner&&banner.s||''}}")
        rep('★5 → ฉายา «นักขุดตำนาน» ครบเงื่อนไข',ti['has'] and ti['v']>=5 and 'นักขุดตำนาน' in st['ban'],json.dumps(ti,ensure_ascii=False))
        # ---- สมุดสะสม ----
        bk=await B.ev("""()=>{const G=gtSt();G.c={h1:24};G.cb={};const g0=me.gold;const a=gwClaim('h1');gwGain('h1',1);const b=gwClaim('h1');const c=gwClaim('h1');G.c.h1=100;const r0=gtHas('rt');const d=gwClaim('h1');
          GTTAB='bk';gtUI();const h=ov.innerHTML;ov.hidden=true;return{a,b,c,d,gold:me.gold-g0,rt:gtHas('rt')-r0,cb:G.cb.h1,ui:h.includes('สมุดสะสม')&&h.includes('ยังไม่เคยพบ')}}""")
        rep('สมุดสะสม: ถึงขั้นแล้วรับได้ครั้งเดียว ได้รางวัลจริง',bk['a']=='ยังสะสมไม่ถึง' and 'ขั้น 1' in bk['b'] and bk['c']=='ยังสะสมไม่ถึง' and 'ขั้น 2' in bk['d'] and bk['gold']==2000 and bk['rt']==2 and bk['cb']==2 and bk['ui'],json.dumps(bk,ensure_ascii=False))
        sv=await A.ev("()=>{const o=gtClean(JSON.parse(JSON.stringify(gtSt())));return{tl:o.tl,c:o.c,cb:o.cb}}")
        sv2=await B.ev("()=>{const o=gtClean(JSON.parse(JSON.stringify(gtSt())));return{c:o.c,cb:o.cb}}")
        rep('เซฟเก็บเครื่องมือ/สมุดสะสม',sv2['cb']=={'h1':2} and sv2['c'].get('h1')==100 and sv['tl']=={'o':5,'h':0},json.dumps([sv,sv2]))
        # ---- สายแร่ยักษ์ ----
        host=None
        for c in C:
            if await c.ev("()=>isHost()"):host=c
        rep('มีโฮสต์แมพ',host is not None)
        await Cc.ev("()=>{me.x=2600;me.y=600;window.__bans=[];setInterval(()=>{if(banner&&banner.s&&!window.__bans.includes(banner.s))window.__bans.push(banner.s)},50)}")  # ไกลจากจุดเกิด (เกินระยะ fx ปกติ)
        await A.wait(800)
        ok=await host.ev("()=>{GGL.nx=0;return ggSpawn(true)}")
        await A.wait(3800)
        gs=[await c.ev("()=>GG?[GG.id,GG.hp,GG.mx,GG.k]:null") for c in C]
        rep('โฮสต์เสก → ทุกคนในแมพเห็นสายแร่ยักษ์เดียวกัน (แม้ยืนไกล)',ok and all(g and g[0]==gs[0][0] for g in gs),json.dumps(gs))
        ban=await Cc.ev("()=>window.__bans.join(' | ')")
        rep('ขึ้นประกาศ + ลูกศรทองชี้ทาง',('สายแร่ยักษ์' in ban or 'ดอกไม้ทอง' in ban),ban)
        # ปลอมสถานะจากคนที่ไม่ใช่โฮสต์ → เซิร์ฟเวอร์ไม่ส่งต่อ
        nh=[c for c in C if c is not host]
        await nh[0].ev("()=>fx({k:'ggs',id:'fake1',gk:'o',gx:100,gy:100,t:1,hp:1,mx:1,rm:60,c:[]})")
        await A.wait(1200)
        fk=await nh[1].ev("()=>GG?GG.id:''")
        rep('คนที่ไม่ใช่โฮสต์ปลอมสายแร่ยักษ์ไม่ได้',fk==gs[0][0],fk)
        # B กับ C ช่วยกันขุด · A ยืนดู
        for c in (B,Cc): await c.ev("()=>{const G=gtSt();G.tl={o:5,h:5};window.__r0=[gtHas('gm'),gtHas('rt'),me.stt.ggb|0]}")
        await A.ev("()=>{window.__r0=[gtHas('gm'),gtHas('rt'),me.stt.ggb|0];me.x=GG.x+300;me.y=GG.y}")
        for c in (B,Cc): await c.ev("()=>{window.__hd=0;window.__st=[];const _h=ggHitDone;ggHitDone=function(){window.__hd++;return _h.apply(this,arguments)};const _s=gtStop;gtStop=function(m){window.__st.push(m);return _s.apply(this,arguments)};window.__host=isHost()}")
        for i,c in enumerate((B,Cc)): await c.ev("(i)=>{me.x=GG.x+(i?24:-24);me.y=GG.y+6;setTimeout(()=>gtStart(),200)}",i)
        done=False
        for _ in range(40):
            await A.wait(1000)
            if await A.ev("()=>!GG"): done=True;break
        hits=await B.ev("()=>GG?GG.hp:-1")
        rep('ช่วยกันขุดจนแตก (ขุดต่ออัตโนมัติจนกว่าจะขยับ)',done,str(hits))
        await A.wait(800)
        dbg=[await c.ev("()=>[window.__hd,window.__st.slice(0,4),window.__host,me.x|0,me.y|0]") for c in (B,Cc)]
        print('DBG',json.dumps(dbg,ensure_ascii=False))
        rw=[await c.ev("()=>[gtHas('gm')-window.__r0[0],gtHas('rt')-window.__r0[1],(me.stt.ggb|0)-window.__r0[2],!!GG]") for c in (A,B,Cc)]
        kind=gs[0][3];ri=0 if kind=='o' else 1
        rep('คนที่ช่วยได้ของหายากแน่นอน · คนไม่ช่วยไม่ได้',rw[1][ri]>=1 and rw[2][ri]>=1 and rw[1][2]==1 and rw[2][2]==1 and rw[0][2]==0 and not any(r[3] for r in rw),json.dumps([kind,rw]))
        # ---- หมดเวลา ----
        await A.wait(500)
        ok2=await host.ev("()=>{GGL.nx=0;return ggSpawn(true)}")
        await A.wait(3500)
        await host.ev("()=>{GG.end=Date.now()-1}")
        await A.wait(4000)
        ex=[await c.ev("()=>[!!GG,(window.__bans||[]).join('|')]") for c in C]
        rep('หมดเวลา 3 นาที → หายไปทุกเครื่อง',ok2 and not any(e[0] for e in ex) and (lambda h:('จม' in h or 'ร่วงโรย' in h))(ex[2][1]),json.dumps(ex,ensure_ascii=False))
        sp=await host.ev("()=>{GGL.nx=1;return [ggSpawn(true)?1:0, (GG&&GG.mx)|0]}")
        rep('เลือดตามจำนวนคนในแมพ (3 คน = 18)',sp[1]==18,json.dumps(sp))
        await A.wait(400)
        await A.pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/gg_end.png')
        Es=[e for c in C for e in c.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
