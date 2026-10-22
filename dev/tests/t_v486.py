"""v486 คลังสกิลรอบ 3: อัลติทางเลือก 5 อาชีพ (Lv 35 · ใช้ได้ทุกขั้น) — ปลด · สลับทุกขั้น · รูน · เซฟ · นับเป็นอัลติ · กลไก 5 แบบ · 2 เครื่องเห็นภาพ/ผลตรงกัน"""
import asyncio, sys, json, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:400], flush=True)
async def waitc(c,js,arg=None,ms=4000,step=100):
    r=None
    for _ in range(ms//step):
        r=await c.ev(js,arg) if arg is not None else await c.ev(js)
        if r: return r
        await c.wait(step)
    return r
HK="()=>{window.__H=[];if(!window.__hk2){window.__hk2=1;const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([m.id,Math.round(d),ck,performance.now()|0]);return _a.apply(this,arguments)}}}"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',40);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',40)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await A.wait(3200)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;banner=null;try{propsHit=function(){};propsFx=function(){}}catch(e){}}")
        await A.ev("()=>{me.x=1600;me.y=1600;me.face=0;window.__pin=setInterval(()=>{if(!window.__free){me.x=1600;me.y=1600}},40)}");await B.ev("()=>{me.x=1560;me.y=1640;window.__pin=setInterval(()=>{if(!window.__free){me.x=1560;me.y=1640}},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000);await waitc(A,"(u)=>!!others[u]",B.uid,8000)
        host=await A.ev("()=>isHost()")
        H=A if host else B
        # มอน 4 ตัวเรียงหน้า A (โฮสต์คุม) · __low = ล็อกเลือดไว้ 10% (ทดสอบประหาร)
        await H.ev("()=>{window.__mp=setInterval(()=>{let i=0;for(const m of mons){if(m.t>=3||i>=4||m.__free){if(!m.__free&&i>=4){m.x=-9999;m.y=-9999}continue}const P=[[80,0],[140,12],[200,-10],[260,8]][i];m.x=1600+P[0];m.y=1600+P[1];m.tx=m.x;m.ty=m.y;if(m.__low){if(m.hp>0)m.hp=Math.min(m.hp,m.mh*.1)}else m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;i++}},30)}")
        for c in (A,B): await c.ev("()=>{window.__FL=[];const _h=handleFx;handleFx=function(o){try{if(o&&typeof o.k==='string'&&o.k.slice(0,2)==='q8')__FL.push([o.k,o.by,performance.now()|0,o.u||'',Array.isArray(o.pts)?o.pts.length:0])}catch(e){}return _h.apply(this,arguments)}}")
        for c in (A,B): await c.ev(HK)
        await A.wait(800)
        # ===== ปลด =====
        u=await A.ev("""()=>{const o=me.lv,r={};me.lv=34;r.l34=q8Unl(2);r.sw=q8Swap(2,1);r.on=q8On(2);me.lv=35;r.l35=q8Unl(2);me.lv=5;me.rb=1;r.rb=q8Unl(2);me.rb=0;me.lv=o;return r}""")
        rep('ปลดอัลติทางเลือกที่ Lv 35 · จุติแล้วปลด · ยังไม่ปลด = สลับไม่ได้', u['l34']==False and '🔒' in u['sw'] and 'Lv 35' in u['sw'] and not u['on'] and u['l35'] and u['rb'], u)
        await A.ev("()=>{sp8().n={};banner=null}")
        bn=await waitc(A,"()=>banner&&String(banner.s).indexOf('ปลดสกิลทางเลือก')>=0&&banner.s",ms=2500)
        rep('ประกาศปลดมีชื่ออัลติทางเลือก', bool(bn) and 'ร่างอสูรสงคราม' in bn, bn)
        await A.ev("()=>{banner=null}")
        # ===== สลับอัลติ: ทุกขั้น =====
        TJS="""()=>{const c='melee',T=(cls2,br,rb,lv)=>{me.cls2=cls2;me.br=br;me.rb=rb;me.lv=lv;try{applyBr()}catch(e){}try{u3Tick(0)}catch(e){}return {n:skName(2),cd:CL[c].cds[2],mc:CL[c].mc[2],img:skImg(c,2,30).slice(0,60)+skImg(c,2,30).length,ut:q8UT()}};
           const o={lv:me.lv,c2:me.cls2,br:me.br,rb:me.rb};const r={b:T(0,1,0,40),a:T(1,1,0,60),d:T(1,2,0,60),u:T(1,1,1,95)};me.lv=o.lv;me.cls2=o.c2;me.br=o.br;me.rb=o.rb;try{applyBr()}catch(e){}
           r.ru=RUNES[c][2].a[0];r.tg=SGT[c][2];r.po=SKP[c][2]&&SKP[c][2][0];r.nm=skName(2);return r}"""
        o=await A.ev(TJS)
        await A.ev("()=>{me.sk[2]=0;q8Swap(2,1)}")
        a_=await A.ev(TJS)
        await A.ev("()=>{q8Swap(2,0)}")
        b_=await A.ev(TJS)
        names=[a_[t]['n'] for t in 'badu']
        rep('สลับอัลติเป็น «ร่างอสูรสงคราม»: ชื่อ/คูล/ไอคอนเปลี่ยนทุกขั้น (ปกติ · ตื่นพลัง · จุติ · สายทมิฬได้อัลติทางเลือกของตัวเอง v487) · รูน/แท็ก/ท่าเปลี่ยนตาม',
            names==['ร่างอสูรสงคราม','ร่างอสูรสงคราม','กองทัพวิญญาณเหล็ก','ร่างอสูรสงคราม'] and all(a_[t]['cd']==(32 if t=='d' else 30) for t in 'badu') and all(a_[t]['img']!=o[t]['img'] for t in 'badu') and a_['ru']=='qm2a' and a_['tg']=='atk aoe dur melee' and a_['po']=='roar', [names,a_])
        rep('สลับกลับ = อัลติเดิมของทุกขั้นคืนครบ (ชื่อ คูล ไอคอน รูน)', all(b_[t]==o[t] for t in 'badu') and b_['ru']==o['ru'] and b_['tg']==o['tg'], [o,b_])
        rep('พลังอัลติทางเลือกเพิ่มตามขั้น: ปกติ ×1 · ตื่นพลัง ×1.9 · จุติ ×3.6', [a_[t]['ut'] for t in 'badu']==[1,1.9,1.9,3.6], [a_[t]['ut'] for t in 'badu'])
        # ===== รูนแยกตามสกิล · เซฟ =====
        rr=await A.ev("""()=>{const S=rnSt();S.u[RUNES.melee[2].a[0]]=1;S.u.qm2b=1;S.e[2]='a';const r={o:rnOf(2)};q8Swap(2,1);r.x1=rnOf(2);S.e[2]='b';r.id=rnIdOf(2);q8Swap(2,0);r.o2=rnOf(2);q8Swap(2,1);r.x3=rnOf(2);return r}""")
        rep('รูนอัลติจำแยกตามสกิล: เดิม A · ทางเลือก B', rr=={'o':'a','x1':'','id':'qm2b','o2':'a','x3':'b'}, rr)
        await A.ev("()=>{delete rnSt().e[2]}")
        sv=await A.ev("""()=>{const s=snap();const c=cleanChar(JSON.parse(JSON.stringify(s)));me.sp8={e:{},r:{},n:{}};applySave(c);q8Apply(true);return {e:me.sp8.e,r:me.sp8.r,on:q8On(2),n:skName(2)}}""")
        rep('เซฟ/โหลด: อัลติที่เลือก + รูนที่จำไว้ กลับมาครบ', sv['e'].get('2')==1 and sv['on'] and sv['n']=='ร่างอสูรสงคราม' and sv['r'].get('2o')=='a', sv)
        # ===== ร่างอสูร: นับเป็นอัลติ · เพื่อนเห็นตัวใหญ่ · ลดดาเมจ · คลื่นทุกการโจมตี =====
        av=await A.ev("""async()=>{me.sk[2]=0;me.mp=me.mm;__H.length=0;__FL.length=0;const u0=me.stt.ult|0;me.manT=performance.now();useSkill(2);const r={ult:(me.stt.ult|0)-u0,win:ultWin>performance.now()+5000,on:me.q8av>performance.now(),cd:Math.round(me.sk[2])};
           await new Promise(res=>setTimeout(res,300));const h0=__H.length;gmGod=false;me.inv3=0;me.shv=0;const hp0=me.hp;hurt(200);const l1=hp0-me.hp;me.hp=me.mh;const s=me.q8av;me.q8av=0;const hp1=me.hp;hurt(200);const l2=hp1-me.hp;me.hp=me.mh;me.q8av=s;gmGod=true;
           r.red=Math.round(l1/l2*100);await new Promise(res=>setTimeout(res,350));const h1=__H.length;me.atkN=(me.atkN|0)+1;await new Promise(res=>setTimeout(res,500));r.wave=__FL.filter(q=>q[0]==='q8cone').length;r.wh=__H.slice(h1).filter(h=>h[2]==='melee').length;r.roar=h0;return r}""")
        ab=await waitc(B,"(u)=>(Q8AV[u]||0)>performance.now()+3000",A.uid,ms=1500,step=30)
        rep('ร่างอสูรสงคราม: นับเป็นอัลติ (สถิติ + สรุปดาเมจ) · คำรามโดนมอน · รับดาเมจ −25% · โจมตีแล้วปล่อยคลื่น · อีกเครื่องเห็นร่างใหญ่',
            av['ult']==1 and av['win'] and av['on'] and av['cd']>=25 and av['roar']>=1 and av['red']==75 and av['wave']>=1 and av['wh']>=1 and ab, [av,ab])
        await A.ev("()=>{me.q8av=0;Q8S.length=0}")
        # ===== กลไกอื่น (เรียกตรงจากเครื่อง A) =====
        async def mech(id,r,ms,pre=''):
            return await A.ev("async([id,r,ms])=>{Q8S.length=0;me.mp=me.mm;__H.length=0;__FL.length=0;lockId=null;window.__free=1;me.x=1600;me.y=1600;me.face=0;const x0=me.x,y0=me.y;const ok=Q8F[id](2,1,0,r);let mv=0;const t0=performance.now();while(performance.now()-t0<ms){await new Promise(res=>setTimeout(res,100));mv=Math.max(mv,Math.hypot(me.x-x0,me.y-y0))}window.__free=0;const by={};__H.forEach(h=>{by[h[0]]=(by[h[0]]||0)+1});return {ok,h:__H.length,mons:Object.keys(by).length,two:Object.values(by).filter(v=>v>=2).length,mv:Math.round(mv),ck:[...new Set(__H.map(h=>h[2]))].join(','),fx:[...new Set(__FL.map(q=>q[0]+':'+q[3]))].join(' ')}}",[id,r,ms])
        await B.ev("()=>{window.__sawJ=0;window.__jw2=setInterval(()=>{for(const u in Q8J)if(Q8J[u].k==='h')window.__sawJ=1},30)}")
        sk=await mech('xh','',3200)
        sj=await B.ev("()=>window.__sawJ")
        rep('เทพธนูเหินฟ้า: ลอยค้างกับที่ ยิงศรดิ่ง 14 ดอกสลับหลายเป้า + ลงพื้นกระแทก · อีกเครื่องเห็นลอย', sk['ok'] and sk['h']>=14 and sk['mons']>=3 and sk['mv']<=2 and 'q8sar' in sk['fx'] and sj, [sk,sj])
        dr=await mech('xd','',2600)
        rep('มังกรอัคคี: เผามอนที่ผ่านทั้งขาไปและขากลับ (ตัวเดียวกันโดน 2 ครั้ง)', dr['ok'] and dr['mons']>=3 and dr['two']>=1 and 'q8drg' in dr['fx'], dr)
        db=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8drg'&&q[1]===u)",A.uid,ms=600,step=50)
        rep('มังกรอัคคี: อีกเครื่องเห็นมังกร', bool(db), db)
        await H.ev("()=>{const m=mons.filter(q=>q.t<3&&q.x>1600&&q.x<1700)[0];if(m){m.__low=1;window.__lowid=m.id}}")
        lid=await H.ev("()=>window.__lowid")
        await A.wait(700)
        mn=await A.ev("async(id)=>{Q8S.length=0;me.mp=me.mm;__H.length=0;dn.length=0;const m=mons.find(q=>q.id===id);const f0=m?Math.round(m.hp/m.mh*100):-1;const ok=Q8F.xm(2,1,0,'');const st=me.stealth>0&&me.inv3>0;const e0=__H.length;await new Promise(r=>setTimeout(r,1300));return {ok,f0,st,e0,h:__H.length,ex:dn.some(d=>String(d.v).indexOf('ประหาร')>=0)}}",lid)
        dead=await waitc(H,"(id)=>{const m=mons.find(q=>q.id===id);return !m||m.hp<=0}",lid,ms=2500,step=100)
        mb=await B.ev("(u)=>__FL.filter(q=>q[0]==='q8moon'&&q[1]===u).length+':'+__FL.filter(q=>q[0]==='q8mcut'&&q[1]===u).length",A.uid)
        rep('จันทราประหาร: หายตัว+อมตะระหว่างประทับ · ฟันพร้อมกันหลัง 1 วิ · มอนเลือด <25% ถูกประหารจริงที่โฮสต์ · อีกเครื่องเห็นตรา+รอยฟัน',
            mn['ok'] and mn['st'] and mn['e0']==0 and mn['h']>=3 and mn['ex'] and dead and mb.split(':')[0]=='1' and int(mb.split(':')[1])>=3, [mn,dead,mb])
        # ===== นักสวด: โซ่ตรวนสวรรค์ (ช่องโหว่ดาเมจทุกเครื่อง + ฮีลรูน A) =====
        await B.ev("()=>{me.lv=40;q8Swap(2,1);const S=rnSt();S.u.qu2a=1;S.e[2]='a';me.sk[2]=0;me.mp=me.mm;__H.length=0;lockId=null}")
        await B.wait(300)
        await A.ev("()=>{me.hp=me.mh*.5;window.__h0=me.hp;dn.length=0}")
        ch=await B.ev("()=>{const u0=me.stt.ult|0;me.manT=performance.now();useSkill(2);return {n:skName(2),ult:(me.stt.ult|0)-u0,cd:Math.round(me.sk[2])}}")
        vul=await waitc(A,"()=>{const n=performance.now();return Object.keys(RVUL).filter(k=>RVUL[k]>n+2000).length}",ms=1500,step=50)
        await A.wait(3200)
        hl=await A.ev("()=>({g:Math.round((me.hp-__h0)/me.mh*1000)/10,dn:dn.filter(d=>/^\\+\\d+/.test(String(d.v))).length})")
        bh=await B.ev("()=>({h:__H.length,ck:[...new Set(__H.map(h=>h[2]))].join(',')})")
        rep('โซ่ตรวนสวรรค์: นับเป็นอัลติ · ล่ามมอน (แสง) · ทุกเครื่องตั้งช่องโหว่ดาเมจ +25% ให้มอนที่ถูกล่าม · รูน A ฮีลเพื่อนรอบตัวผ่านเน็ต',
            ch['n']=='โซ่ตรวนสวรรค์' and ch['ult']==1 and (vul or 0)>=3 and bh['h']>=3 and 'holy' in bh['ck'] and hl['g']>=4, [ch,vul,bh,hl])
        # ===== ออโต้ · หน้าคลังสกิล =====
        au=await A.ev("""async()=>{Q8S.length=0;me.sk[2]=0;me.mp=me.mm;__FL.length=0;me.manT=0;AUTO.on=true;AUTO.sel={0:0,1:0,2:1,3:0,4:0,5:0};AUTO.t=0;await new Promise(r=>setTimeout(r,800));AUTO.on=false;me.q8av=0;return __FL.filter(q=>q[0]==='q8av'&&q[1]===uid).length}""")
        rep('ออโต้สกิลใช้อัลติทางเลือกได้', au>=1, au)
        ui=await A.ev("""()=>{q8Open();const r={cards:ov.querySelectorAll('.q8c').length,on:ov.querySelectorAll('.q8c.on').length,h:[...ov.querySelectorAll('.q8h')].map(e=>e.textContent).join('|')};
           const b=ov.querySelector('[data-q8="2:0"]');if(b)b.click();r.after=skName(2);r.note=(ov.querySelector('.q8p .note')||{}).textContent||'';ov.hidden=true;
           ov.dataset.k='rune';try{runeUI()}catch(e){}r.rl=[...ov.querySelectorAll('[data-pn="rune"] .card b[style*="nowrap"]')].map(e=>e.textContent).join(',');ov.hidden=true;return r}""")
        rep('หน้าคลังสกิล: 10 การ์ด (ปุ่ม 1–4 + อัลติ) · กดใช้อัลติเดิมแล้วสลับทันที · ข้อความ/ป้ายช่างรูนบอกปุ่มถูก (ปุ่ม 3/ปุ่ม 4/อัลติ)',
            ui['cards']==10 and ui['on']==5 and 'ปุ่มอัลติ' in ui['h'] and ui['after']=='ฟันแยกปฐพี' and 'ปุ่มอัลติ' in ui['note'] and ui['rl']=='ปุ่ม 1,ปุ่ม 2,ปุ่ม 3,ปุ่ม 4,อัลติ', ui)
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
