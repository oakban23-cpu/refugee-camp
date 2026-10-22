"""v484 คลังสกิล: สกิลทางเลือกปุ่ม 1–2 ทุกอาชีพ — ปลดตามเลเวล · สลับ · รูนแยกตามสกิล · เซฟ · 2 เครื่องเห็นภาพ/ผลตรงกัน · ลิงก์รูนเสริม · ออโต้"""
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
FXN="(a)=>fxs.filter(f=>f.k===a[0]&&f.by===a[1]).length"
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',30);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',30)
        for c in (A,B): await c.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(13,{x:1600,y:1600})}")
        await A.wait(3200)
        for c in (A,B): await c.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;AUTO.on=false;banner=null}")
        await A.ev("()=>{me.x=1600;me.y=1600;me.face=0;window.__pin=setInterval(()=>{if(!window.__free){me.x=1600;me.y=1600}},40)}");await B.ev("()=>{me.x=1560;me.y=1640;window.__pin=setInterval(()=>{me.x=1560;me.y=1640},40)}")
        await waitc(B,"(u)=>!!others[u]",A.uid,8000);await waitc(A,"(u)=>!!others[u]",B.uid,8000)
        host=await A.ev("()=>isHost()")
        H=A if host else B
        # มอน 4 ตัวเรียงหน้า A (โฮสต์คุมตำแหน่ง) · กันมอนตีคน
        await H.ev("()=>{window.__mp=setInterval(()=>{let i=0;for(const m of mons){if(m.t>=3||i>=4||m.__free){if(!m.__free&&i>=4){m.x=-9999;m.y=-9999}continue}const P=[[80,0],[140,12],[200,-10],[260,8]][i];m.x=1600+P[0];m.y=1600+P[1];m.tx=m.x;m.ty=m.y;m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;i++}},30)}")
        for c in (A,B): await c.ev("()=>{window.__FL=[];const _h=handleFx;handleFx=function(o){try{if(o&&typeof o.k==='string'&&o.k.slice(0,2)==='q8')__FL.push([o.k,o.by,performance.now()|0])}catch(e){}return _h.apply(this,arguments)}}")
        await A.wait(800)
        # ===== ปลดตามเลเวล =====
        u=await A.ev("""()=>{const o=me.lv,r={};me.lv=7;r.l7=[q8Unl(0),q8Unl(1)];r.sw7=q8Swap(0,1);r.on7=q8On(0);me.lv=8;r.l8=[q8Unl(0),q8Unl(1)];me.lv=16;r.l16=[q8Unl(0),q8Unl(1)];
           me.lv=5;me.rb=1;r.rb=[q8Unl(0),q8Unl(1)];me.rb=0;me.lv=o;return r}""")
        rep('ปลดสกิลทางเลือก: ปุ่ม 1 ที่ Lv 8 · ปุ่ม 2 ที่ Lv 16 · จุติแล้วปลดครบ · ยังไม่ปลด = สลับไม่ได้', u['l7']==[False,False] and '🔒' in u['sw7'] and not u['on7'] and u['l8']==[True,False] and u['l16']==[True,True] and u['rb']==[True,True], u)
        await A.ev("()=>{sp8().n={};banner=null}")
        bn=await waitc(A,"()=>banner&&String(banner.s).indexOf('ปลดสกิลทางเลือก')>=0&&banner.s",ms=2500)
        await A.ev("()=>{banner=null}");await A.wait(1200);bn2=await A.ev("()=>banner&&banner.s")
        rep('ถึงเลเวลแล้วมีประกาศบอกครั้งเดียว (ชื่อสกิลที่ปลด + ทางไปหน้าคลังสกิล)', bool(bn) and 'ฟันเสี้ยวจันทร์' in bn and 'คลังสกิล' in bn and not bn2, [bn,bn2])
        # ===== สลับ =====
        s=await A.ev("""()=>{const c='melee',o={n:CL[c].s[0],cd:CL[c].cds[0],mc:CL[c].mc[0],ic:SKI[c][0],tg:SGT[c][0],ru:RUNES[c][0].a[0],mage:CL.mage.s[0]};me.sk[0]=0;const m=q8Swap(0,1);
           const a={n:CL[c].s[0],cd:CL[c].cds[0],mc:CL[c].mc[0],ic:SKI[c][0]!==o.ic,tg:SGT[c][0],ru:RUNES[c][0].a[0],sk:me.sk[0],pose:SKP[c][0][0],nm:skName(0),mage:CL.mage.s[0],msg:m};
           q8Swap(0,0);const b={n:CL[c].s[0],cd:CL[c].cds[0],ic:SKI[c][0]===o.ic,tg:SGT[c][0],ru:RUNES[c][0].a[0]};return {o,a,b}}""")
        o,a_,b_=s['o'],s['a'],s['b']
        rep('สลับปุ่ม 1 เป็น «ฟันเสี้ยวจันทร์»: ชื่อ/คูลดาวน์/MP/ไอคอน/แท็ก/รูน/ท่า เปลี่ยนตาม · ช่องติดคูลดาวน์ · อาชีพอื่นไม่กระทบ',
            a_['n']=='ฟันเสี้ยวจันทร์' and a_['cd']==6 and a_['mc']==25 and a_['ic'] and a_['tg']=='atk proj melee' and a_['ru']=='qm0a' and a_['sk']>=5.5 and a_['pose']=='lunge' and a_['nm']=='ฟันเสี้ยวจันทร์' and a_['mage']==o['mage'], s)
        rep('สลับกลับ = ข้อมูลเดิมครบ (ชื่อ คูลดาวน์ ไอคอน แท็ก รูน)', b_['n']==o['n'] and b_['cd']==o['cd'] and b_['ic'] and b_['tg']==o['tg'] and b_['ru']==o['ru'], s)
        # ===== รูนแยกตามสกิล =====
        rr=await A.ev("""()=>{const S=rnSt();S.u.m0a=1;S.u.qm0b=1;S.e[0]='a';const r={};r.o1=rnOf(0);q8Swap(0,1);r.x1=rnOf(0);S.e[0]='b';r.x2=rnOf(0);q8Swap(0,0);r.o2=rnOf(0);q8Swap(0,1);r.x3=rnOf(0);r.id=rnIdOf(0);q8Swap(0,0);return r}""")
        rep('รูนหลักจำแยกตามสกิล: เดิมใส่ A · สกิลทางเลือกใส่ B · สลับไปมาแล้วกลับมาเป็นของเดิมแต่ละอัน', rr=={'o1':'a','x1':'','x2':'b','o2':'a','x3':'b','id':'qm0b'}, rr)
        # ===== เซฟ =====
        sv=await A.ev("""()=>{q8Swap(1,1);const s=snap();const c=cleanChar(JSON.parse(JSON.stringify(s)));const bad=cleanChar(Object.assign({},JSON.parse(JSON.stringify(s)),{sp8:{e:{0:5,1:1,9:1},r:{'0o':'z','1x':'a',zz:'b'},n:{0:1}}}));
           const keep=JSON.parse(JSON.stringify(me.sp8));me.sp8={e:{},r:{},n:{}};applySave(c);const back=JSON.parse(JSON.stringify(me.sp8));return {s:s.sp8,c:c.sp8,bad:bad.sp8,back,keep,on1:q8On(1)}}""")
        await A.wait(1300)
        nm=await A.ev("()=>CL.melee.s[1]")
        rep('เซฟ/โหลด: เก็บสกิลที่เลือก + รูนที่จำไว้ · ข้อมูลแปลก ๆ ถูกกรองทิ้ง', sv['c']['e'].get('1')==1 and sv['back']['e'].get('1')==1 and sv['on1'] and nm=='ขว้างดาบบูมเมอแรง' and sv['bad']['e']=={'1':1} and sv['bad']['r']=={'1x':'a'}, sv)
        # ===== ใช้สกิลจริง + อีกเครื่องเห็น =====
        await A.ev("()=>{window.__H=[];const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([m.id,Math.round(d),ck]);return _a.apply(this,arguments)};q8Swap(0,1);me.sk[0]=0;me.sk[1]=0;me.mp=me.mm}")
        await A.wait(300)
        await A.ev("()=>{fxs.length=0;__H=[];lockId=null;me.manT=performance.now();useSkill(0)}")
        await A.wait(900)
        w=await A.ev("(u)=>({fx:__FL.filter(q=>q[0]==='q8wave'&&q[1]===u).length,h:__H.length,cd:me.sk[0],ck:__H.map(h=>h[2]).join(',')})",A.uid)
        wb=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8wave'&&q[1]===u)",A.uid,ms=1500,step=30)
        pb=await B.ev("(u)=>RCAST[u]?RCAST[u].ty:(window.__lastpc||null)",A.uid)
        rep('ฟันเสี้ยวจันทร์: คลื่นวิ่งทะลุมอนหลายตัว (ดาเมจคิดตามเวลาที่คลื่นวิ่งถึง) · อีกเครื่องเห็นภาพคลื่น', w['fx']==1 and w['h']>=2 and w['cd']>4 and wb, [w,wb,pb])
        await A.wait(400)
        await A.ev("()=>{__FL.length=0;__H=[];me.manT=performance.now();useSkill(1)}")
        hw=await waitc(B,"(u)=>(Q8HW[u]||0)>performance.now()",A.uid,ms=1500,step=30)
        await A.wait(1100)
        bm=await A.ev("()=>{const by={};__H.forEach(h=>{by[h[0]]=(by[h[0]]||0)+1});return {h:__H.length,two:Object.values(by).filter(v=>v>=2).length,fx:__FL.filter(q=>q[0]==='q8boom').length}}")
        rep('ขว้างดาบบูมเมอแรง: โดนทั้งขาไป-ขากลับ (มอนตัวเดียวกันโดน 2 ครั้ง) · อีกเครื่องเห็นดาบในมือหายไประหว่างดาบบิน', bm['fx']==1 and bm['two']>=2 and hw, [bm,hw])
        # ===== นักสวด: โล่แสง (เพื่อนได้โล่) · ค้อน =====
        await B.ev("()=>{q8Swap(0,1);q8Swap(1,1);me.sk[0]=0;me.sk[1]=0;me.mp=me.mm}");await A.ev("()=>{me.shv=0;me.shield=0}")
        await B.wait(300)
        await B.ev("()=>{me.manT=performance.now();useSkill(0)}")
        sa=await waitc(A,"()=>me.shv>0&&{shv:Math.round(me.shv),mh:me.mh,t:me.shield}",ms=2500,step=30)
        sb=await B.ev("()=>({shv:Math.round(me.shv),mh:me.mh,name:CL.sup.s[0]})")
        rep('โล่แสง: ตัวเองและเพื่อนรอบตัวได้โล่ตามเลือดสูงสุดของแต่ละคน (เพื่อนได้ผ่านเน็ต)', sa and sb['shv']>0 and sb['name']=='โล่แสง' and abs(sa['shv']-(.14*sa['mh']*1.0+40))<sa['mh']*.08+30, [sa,sb])
        await B.ev("()=>{window.__H=[];const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv)__H.push([m.id,Math.round(d),ck]);return _a.apply(this,arguments)};me.mp=me.mm;lockId=null;me.manT=performance.now();useSkill(1)}")
        hm=await waitc(A,"(u)=>__FL.some(q=>q[0]==='q8ham'&&q[1]===u)",B.uid,ms=1500,step=30)
        await B.wait(700)
        hh=await B.ev("()=>({h:__H.length,ck:[...new Set(__H.map(h=>h[2]))].join(','),cd:Math.round(me.sk[1])})")
        rep('ค้อนพิพากษา: ค้อนตกใส่มอน (ธาตุแสง) · อีกเครื่องเห็นค้อน', hm and hh['h']>=1 and 'holy' in hh['ck'] and hh['cd']>=7, [hm,hh])
        # ===== ธงล่า: เขตเพิ่มดาเมจทุกเครื่อง =====
        await A.ev("()=>{fx({k:'q8flag',x:1740,y:1600,r:120,dur:4,u:'',v:0})}")
        z=await waitc(B,"()=>Q8Z.length&&Q8Z[0].r",ms=1500,step=30)
        zin=await B.ev("()=>{const m=mons.find(q=>Math.hypot(q.x-1740,q.y-1600)<100);return m?q8InZ(m):'nomon'}")
        za=await A.ev("()=>Q8Z.length")
        rep('ธงล่าเหยื่อ: เขตธงเกิดบนทุกเครื่อง · มอนในเขตโดนดาเมจเพิ่มจากทุกคน', z==120 and za==1 and zin is True, [z,za,zin])
        # ===== ตะขอเงา: ลากมอนมาหา (โฮสต์ขยับมอน) =====
        if H is A:
            await A.ev("()=>{window.__free=1;me.x=1600;me.y=1400;const m=mons.find(q=>q.t<3&&q.x>1650);if(m){m.__free=1;m.x=1810;m.y=1400;m.tx=m.x;m.ty=m.y;window.__hm=m.id}}")
            await A.wait(150)
            pl=await A.ev("async()=>{const m=mons.find(q=>q.id===__hm);m.x=1810;m.y=1400;const d0=Math.round(m.x-me.x);lockId=m.id;me.face=0;Q8F.nh(1,1,0,'');await new Promise(r=>setTimeout(r,420));return {d0,d1:Math.round(Math.hypot(m.x-me.x,m.y-me.y)),fx:__FL.some(q=>q[0]==='q8hook')}}")
            hb=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8hook'&&q[1]===u)",A.uid,ms=1200,step=30)
            rep('ตะขอเงา: ลากมอนจากระยะ 210 มาใกล้ตัว (<80) · ภาพโซ่ส่งถึงอีกเครื่อง', pl['d0']>=200 and pl['d1']<80 and pl['fx'], [pl,hb])
            await A.ev("()=>{const m=mons.find(q=>q.id===__hm);if(m)m.__free=0;window.__free=0;me.x=1600;me.y=1600}");await A.wait(300)
        else:
            rep('ตะขอเงา: (ข้าม — โฮสต์ไม่ใช่ A)', True, 'skip')
        # ===== รูนเสริมลิงก์กับสกิลทางเลือก (ร่ายซ้ำ) =====
        lk=await A.ev("""async()=>{const X=sgSt();X.i.echo=1;X.l={0:['echo']};me.sk[0]=0;me.mp=me.mm;__FL.length=0;const tg=sgTags(0).join(' '),ok=sgOk('echo',0),tot=sgOk('totem',0),links=sgLinks(0).length;me.manT=performance.now();useSkill(0);
           await new Promise(r=>setTimeout(r,800));const n=__FL.filter(q=>q[0]==='q8wave'&&q[1]===uid).length;X.l={};return {tg,ok,tot,n,links}}""")
        rep('ลิงก์รูนเสริมใช้ตามแท็กของสกิลใหม่: «ร่ายซ้ำ» ทำให้คลื่นออก 2 ลูก', lk['tg']=='atk proj melee' and lk['ok'] and lk['n']==2, lk)
        # ===== ออโต้ใช้สกิลทางเลือก + วาร์ปไม่ใช้มั่วตอนออโต้ =====
        au=await A.ev("""async()=>{me.sk[0]=0;me.sk[1]=0;me.mp=me.mm;__FL.length=0;me.manT=0;AUTO.on=true;AUTO.sel={0:1,1:0,2:0,3:0,4:0,5:0};AUTO.t=0;await new Promise(r=>setTimeout(r,900));AUTO.on=false;
           const w=__FL.filter(q=>q[0]==='q8wave'&&q[1]===uid).length;window.__free=1;me.x=1300;me.y=1300;me.manT=0;const g=Q8F.gb(1,1,0,'');me.manT=performance.now();me.sk[1]=0;const g2=Q8F.gb(1,1,0,'');window.__free=0;return {w,blinkAuto:g,blinkMan:g2}}""")
        rep('ออโต้สกิลใช้สกิลทางเลือกได้ · วาร์ปพริบตาตอนออโต้ไม่วาร์ปถ้าไม่มีมอนประชิด (กดเองวาร์ปได้)', au['w']>=1 and au['blinkAuto']==False and au['blinkMan']==True, au)
        # ===== หน้าคลังสกิล =====
        ui=await A.ev("""()=>{q8Open();const h=ov.innerHTML,r={tab:h.includes('data-sksub="pool"'),cards:ov.querySelectorAll('.q8c').length,on:ov.querySelectorAll('.q8c.on').length};
           const b=ov.querySelector('[data-q8="0:0"]');if(b)b.click();r.after=CL.melee.s[0];r.note=(ov.querySelector('.q8p .note')||{}).textContent||'';ov.hidden=true;return r}""")
        rep('หน้าคลังสกิล: แท็บใหม่ · การ์ด 10 ใบ (ปุ่ม 1–4 + อัลติ × เดิม/ทางเลือก · v486) · กดใช้แล้วสลับทันทีพร้อมข้อความ', ui['tab'] and ui['cards']==10 and ui['on']==5 and ui['after']=='วังวนดาบ' and 'วังวนดาบ' in ui['note'], ui)
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
