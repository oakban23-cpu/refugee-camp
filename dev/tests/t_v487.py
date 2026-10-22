"""v487 คลังสกิลรอบ 4: สายทมิฬมีสกิลทางเลือกของตัวเอง (ปุ่ม 4 + อัลติ) 5 อาชีพ — สลับตามสายทันที · รูน · ประกาศ · กลไก 10 แบบ · ลดดาเมจ/แบ่งดาเมจ/ช่องโหว่ผ่านเน็ต"""
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
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',60);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',60)
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
        await A.ev("()=>{me.cls2=1;me.br=1;try{applyBr()}catch(e){}}");await B.ev("()=>{me.cls2=1;me.br=2;try{applyBr()}catch(e){}}")
        # ===== สลับตามสาย =====
        s=await A.ev("""()=>{const c='melee',O=()=>({n4:skName(4),n2:skName(2),r4:RUNES[c][4]&&RUNES[c][4].a&&RUNES[c][4].a[0],r2:RUNES[c][2].a[0],i4:skImg(c,4,30).indexOf(Q8IMG.mk)>=0,i2:skImg(c,2,30).indexOf(Q8IMG.yk)>=0,tg4:(sgTags(4)||[]).join(' '),cd2:CL[c].cds[2]});
           me.sk[4]=0;me.sk[2]=0;q8Swap(4,1);q8Swap(2,1);me.br=1;try{applyBr()}catch(e){}const L=O();me.br=2;try{applyBr()}catch(e){}const D=O();me.rb=1;me.lv=95;try{u3Tick(0)}catch(e){}const U=O();me.rb=0;me.lv=60;me.br=1;try{applyBr()}catch(e){}const L2=O();return {L,D,U,L2}}""")
        rep('สายแสงใช้ชุดเดิม (ดาบเทพตกฟ้า · ร่างอสูรสงคราม) · เปลี่ยนเป็นสายทมิฬแล้วสลับเป็นชุดทมิฬทันที (ชื่อ ไอคอน รูน แท็ก คูล) · จุติสายทมิฬก็ใช้ชุดทมิฬ · กลับสายแสงได้ชุดเดิม',
            s['L']['n4']=='ดาบเทพตกฟ้า' and s['L']['n2']=='ร่างอสูรสงคราม' and s['D']['n4']=='ปราการสะท้อนแค้น' and s['D']['n2']=='กองทัพวิญญาณเหล็ก' and s['D']['r4']=='rm4a' and s['D']['r2']=='rm2a' and s['D']['i4'] and s['D']['i2'] and s['D']['tg4']=='atk aoe melee' and s['D']['cd2']==32
            and s['U']['n2']=='กองทัพวิญญาณเหล็ก' and s['L2']==s['L'], s)
        await A.ev("()=>{me.br=2;try{applyBr()}catch(e){}sp8().n={0:1,1:1,3:1,4:1,2:1};banner=null}")
        bn=await waitc(A,"()=>banner&&String(banner.s).indexOf('ปลดสกิลทางเลือก')>=0&&banner.s",ms=2500)
        await A.ev("()=>{banner=null}");await A.wait(1200);bn2=await A.ev("()=>banner&&banner.s")
        rep('เป็นสายทมิฬแล้วประกาศชุดทมิฬครั้งเดียว', bool(bn) and 'ปราการสะท้อนแค้น' in bn and 'กองทัพวิญญาณเหล็ก' in bn and not bn2, [bn,bn2])
        ui=await A.ev("""()=>{q8Open();const t=[...ov.querySelectorAll('.q8c')].map(e=>e.textContent).join('|');ov.hidden=true;return {dk:(t.match(/ทางเลือกสายทมิฬ/g)||[]).length,hint:t.indexOf('ถ้าเป็นสายแสง ทางเลือกจะเป็น «ดาบเทพตกฟ้า»')>=0&&t.indexOf('«ร่างอสูรสงคราม»')>=0}}""")
        rep('หน้าคลังสกิล: การ์ดชุดทมิฬมีป้าย «ทางเลือกสายทมิฬ» + บอกว่าสายแสงจะได้อะไร', ui['dk']==2 and ui['hint'], ui)
        # ===== ปราการสะท้อนแค้น =====
        gd=await A.ev("""async()=>{Q8S.length=0;me.sk[4]=0;me.mp=me.mm;__H.length=0;__FL.length=0;window.__free=1;me.x=1600;me.y=1600;me.rg2=2;useSkill(4);const on=me.q8gd>performance.now();gmGod=false;me.inv3=0;me.shv=0;me.hp=me.mh;const h0=me.hp;hurt(200);const l1=h0-me.hp;me.hp=me.mh;const sv=me.q8gd;me.q8gd=0;const h1=me.hp;hurt(200);const l2=h1-me.hp;me.hp=me.mh;me.q8gd=sv;gmGod=true;
           me.x=1640;await new Promise(r=>setTimeout(r,2800));const st=dn.some(d=>String(d.v).indexOf('แค้น ×')>=0);window.__free=0;return {on,red:Math.round(l1/l2*100),pos:Math.round(me.x),h:__H.length,st,fx:__FL.filter(q=>q[0]==='q8gsl').length}}""")
        rep('ปราการสะท้อนแค้น: รับดาเมจ −60% · ยืนกับที่ระหว่างตั้งโล่ · จบด้วยกระแทกโล่ (นับแค้นที่สะสม)', gd['on'] and 38<=gd['red']<=42 and gd['pos']==1600 and gd['h']>=1 and gd['st'] and gd['fx']==1, gd)
        # ===== กองทัพวิญญาณเหล็ก: ลดดาเมจเพื่อนผ่านเน็ต =====
        await A.ev("()=>{Q8S.length=0;me.sk[2]=0;me.mp=me.mm;__H.length=0;__FL.length=0;useSkill(2)}")
        kb=await waitc(B,"(u)=>Q8KN[u]&&Q8KN[u].end>performance.now()+4000",A.uid,ms=1500,step=30)
        kr=await B.ev("(u)=>{gmGod=false;me.inv3=0;me.shv=0;me.hp=me.mh;const h0=me.hp;hurt(200);const l1=h0-me.hp;me.hp=me.mh;const K=Q8KN[u];delete Q8KN[u];const h1=me.hp;hurt(200);const l2=h1-me.hp;me.hp=me.mh;Q8KN[u]=K;gmGod=true;return Math.round(l1/l2*100)}",A.uid)
        await A.wait(2600)
        kh=await A.ev("()=>({h:__H.length,s:__FL.filter(q=>q[0]==='q8kns').length})")
        rep('กองทัพวิญญาณเหล็ก: อัศวินฟาดมอน · เพื่อนในวงรับดาเมจ −25% (ผ่านเน็ต)', bool(kb) and 73<=kr<=77 and kh['h']>=2 and kh['s']>=2, [kb,kr,kh])
        await A.ev("()=>{Q8S.length=0;for(const u in Q8KN)delete Q8KN[u]}");await B.ev("()=>{for(const u in Q8KN)delete Q8KN[u]}")
        # ===== กลไกอื่น (เรียกตรงจากเครื่อง A) =====
        async def mech(id,k,r,ms,pre=''):
            return await A.ev("""async([id,k,r,ms,pre])=>{Q8S.length=0;me.mp=me.mm;__H.length=0;__FL.length=0;lockId=null;window.__free=1;me.x=1600;me.y=1600;me.face=0;if(pre)eval(pre);const ok=Q8F[id](k,1,0,r);const x={};if(id==='yw'){x.sp=+(tbMoveMul()).toFixed(2);const s=me.q8gl;me.q8gl=0;x.sp0=+(tbMoveMul()).toFixed(2);me.q8gl=s}
              await new Promise(res=>setTimeout(res,ms));window.__free=0;const by={};__H.forEach(h=>{by[h[0]]=(by[h[0]]||0)+1});return Object.assign(x,{ok,h:__H.length,mons:Object.keys(by).length,ck:[...new Set(__H.map(h=>h[2]))].join(','),fx:[...new Set(__FL.map(q=>q[0]+':'+q[3]+(q[4]?':'+q[4]:'')))].join(' ')})}""",[id,k,r,ms,pre])
        aw=await mech('aw',4,'',1100)
        wb=await waitc(B,"(u)=>{const q=__FL.find(q=>q[0]==='q8wnd'&&q[1]===u);return q&&q[4]}",A.uid,ms=800,step=30)
        rep('ศรลมกรดสะท้อน: เด้ง 6 ครั้งหลายตัว · อีกเครื่องเห็นเส้นทางเด้ง', aw['ok'] and aw['h']>=6 and aw['mons']>=3 and wb==6, [aw,wb])
        yw=await mech('yw',2,'',2600)
        rep('นักล่าลมกรด: เดินเร็ว ×1.6 · ยิงใบมีดลมเองต่อเนื่อง', yw['ok'] and abs(yw['sp']/yw['sp0']-1.6)<.01 and yw['h']>=8 and 'q8wbl' in yw['fx'], yw)
        gdm=await mech('gd',4,'b',3000)
        rep('ทูตอสูรเพลิง (รูน B): อิมป์ 3 ตัวยิงลูกไฟ', gdm['ok'] and gdm['h']>=6 and 'q8imf' in gdm['fx'] and 'q8imp:3' in gdm['fx'], gdm)
        yg=await mech('yg',2,'',3000)
        rep('หัตถ์ปีศาจ: คว้า (มึน) บีบซ้ำ แล้วฟาด', yg['ok'] and yg['h']>=8 and 'q8hand' in yg['fx'], yg)
        nb=await mech('nb',4,'b',6700)
        rep('วงใบมีดระบำ (รูน B): ใบมีดหมุนฟันซ้ำ แล้วพุ่งไล่มอนตอนจบ', nb['ok'] and nb['h']>=10 and 'q8orbt' in nb['fx'] and 'q8dag' in nb['fx'], nb)
        yb=await A.ev("""async()=>{Q8S.length=0;me.mp=me.mm;__H.length=0;__FL.length=0;window.__free=1;me.x=1600;me.y=1600;const ok=Q8F.yb(2,1,0,'');await new Promise(r=>setTimeout(r,800));const h0=__H.length;const m=mons.filter(q=>q.t<3&&q.hp>0).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];
           if(Q8MC)Q8MC.cd={};addHit(m,1000,0,1,'assn');const mim=__H.slice(h0).filter(h=>h[2]==='assn').length-1;const on=!!Q8MC;await new Promise(r=>setTimeout(r,5600));window.__free=0;return {ok,h0,mim,on,end:!Q8MC,fx:__FL.filter(q=>q[0]==='q8cln').length}}""")
        rep('ระบำเงาสะท้อน: ร่างเงาฟันตอนเรียก · เราตีแล้วร่างเงาฟันตาม · หมดเวลาแล้วหยุด', yb['ok'] and yb['h0']>=2 and yb['mim']>=2 and yb['on'] and yb['end'] and yb['fx']==1, yb)
        # ===== นักสวดสายทมิฬ: ตุ๊กตาคำสาป (แบ่งดาเมจทุกเครื่อง) · พิธีสาปแช่ง (ช่องโหว่ทุกเครื่อง) =====
        await B.ev("()=>{q8Swap(4,1);q8Swap(2,1);me.sk[4]=0;me.sk[2]=0;me.mp=me.mm;lockId=null;__H.length=0;Q8S.length=0}")
        await B.wait(300)
        dl=await B.ev("()=>{const n=skName(4);me.manT=performance.now();useSkill(4);return {n,cd:Math.round(me.sk[4])}}")
        vd=await waitc(A,"()=>Q8VD.length&&Q8VD[0].ids.size",ms=1500,step=30)
        sh=await A.ev("()=>{const V=Q8VD[0];const ids=[...V.ids];const m=mons.find(q=>q.id===ids[0]);__H.length=0;addHit(m,1000,0,1,'melee');return {n:ids.length,sh:__H.filter(h=>h[2]==='curse').length}}")
        rep('ตุ๊กตาคำสาป: ผูกมอนหลายตัว · เพื่อนตีตัวหนึ่ง ดาเมจส่งต่อให้ตัวอื่นที่ผูกไว้ (ผ่านเน็ต)', dl['n']=='ตุ๊กตาคำสาป' and dl['cd']>=12 and (vd or 0)>=2 and sh['sh']==sh['n']-1, [dl,vd,sh])
        await B.wait(400)
        await A.ev("()=>{for(const k in RVUL)delete RVUL[k]}")
        rt=await B.ev("()=>{const n=skName(2),u0=me.stt.ult|0;me.manT=performance.now();useSkill(2);return {n,ult:(me.stt.ult|0)-u0}}")
        rv=await waitc(A,"()=>{const n=performance.now();return Object.keys(RVUL).filter(k=>RVUL[k]>n).length}",ms=2500,step=50)
        await B.wait(1500)
        bh=await B.ev("()=>({h:__H.filter(h=>h[2]==='curse').length})")
        rep('พิธีสาปแช่ง: นับเป็นอัลติ · สาปมอนในวงซ้ำ · ทุกเครื่องตั้งช่องโหว่ดาเมจให้มอนในวง', rt['n']=='พิธีสาปแช่ง' and rt['ult']==1 and (rv or 0)>=2 and bh['h']>=4, [rt,rv,bh])
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
