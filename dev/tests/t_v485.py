"""v485 คลังสกิลรอบ 2: สกิลทางเลือกปุ่ม 3 (Lv 25) และปุ่ม 4 (ตื่นพลัง · ใช้แทนได้ทั้งสายแสง/ทมิฬ) — ปลด · สลับ · รูน · เซฟ · กลไก 10 แบบ · 2 เครื่องเห็นภาพ/ผลตรงกัน"""
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
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',30);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',30)
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
        u=await A.ev("""()=>{const o=me.lv,c2=me.cls2,r={};me.cls2=0;me.lv=24;r.l24=[q8Unl(3),q8Unl(4)];r.sw=q8Swap(3,1);r.sw4=q8Swap(4,1);r.on=q8On(3)||q8On(4);me.lv=25;r.l25=[q8Unl(3),q8Unl(4)];
           me.lv=60;r.l60=[q8Unl(3),q8Unl(4)];me.cls2=1;r.c2=[q8Unl(3),q8Unl(4)];me.cls2=0;me.lv=5;me.rb=1;r.rb=[q8Unl(3),q8Unl(4)];me.rb=0;me.lv=o;me.cls2=c2;return r}""")
        rep('ปลด: ปุ่ม 3 ที่ Lv 25 · ปุ่ม 4 ต้องตื่นพลัง (Lv สูงแต่ไม่ตื่นพลัง = ยังล็อก) · จุติแล้วปลดครบ · ยังไม่ปลด = สลับไม่ได้',
            u['l24']==[False,False] and '🔒' in u['sw'] and 'ตื่นพลัง' in u['sw4'] and not u['on'] and u['l25']==[True,False] and u['l60']==[True,False] and u['c2']==[True,True] and u['rb']==[True,True], u)
        await A.ev("()=>{me.cls2=1;me.br=1;try{applyBr()}catch(e){}sp8().n={};banner=null}")
        bn=await waitc(A,"()=>banner&&String(banner.s).indexOf('ปลดสกิลทางเลือก')>=0&&banner.s",ms=2500)
        rep('ประกาศปลดรวมชื่อสกิลปุ่ม 3–4 ด้วย', bool(bn) and 'กระโดดทุบพสุธา' in bn and 'ดาบเทพตกฟ้า' in bn, bn)
        await A.ev("()=>{banner=null}")
        # ===== สลับปุ่ม 3 =====
        s=await A.ev("""()=>{const c='melee',O=()=>({n:CL[c].s[3],cd:CL[c].cds[3],mc:CL[c].mc[3],k3:SK3[c].slice(0,4).join('|'),ic:SKI[c][3],tg:SGT[c][3],ru:RUNES[c][3]&&RUNES[c][3].a&&RUNES[c][3].a[0],po:SKP[c][3]&&SKP[c][3][0],nm:skName(3),arc:CL.archer.s[3]});
           const o=O();me.sk[3]=0;const m=q8Swap(3,1);const a=O();a.sk=me.sk[3];a.msg=m;q8Swap(3,0);const b=O();return {o,a,b}}""")
        o,a_,b_=s['o'],s['a'],s['b']
        rep('สลับปุ่ม 3 เป็น «กระโดดทุบพสุธา»: ชื่อ/คูล/MP/คำอธิบาย(SK3)/ไอคอน/แท็ก/รูน/ท่า เปลี่ยนตาม · ติดคูลดาวน์ · อาชีพอื่นไม่กระทบ',
            a_['n']=='กระโดดทุบพสุธา' and a_['cd']==10 and a_['mc']==30 and a_['k3'].startswith('กระโดดทุบพสุธา|') and a_['ic']!=o['ic'] and a_['tg']=='atk aoe move melee' and a_['ru']=='qm3a' and a_['po']=='cleave' and a_['nm']=='กระโดดทุบพสุธา' and a_['sk']>=9.5 and a_['arc']==o['arc'], s)
        rep('สลับปุ่ม 3 กลับ = ข้อมูลเดิมครบ', b_==o, [o,b_])
        # ===== สลับปุ่ม 4 (สายแสง → สายทมิฬ) =====
        s4=await A.ev("""()=>{const c='melee',O=()=>{try{applyBr()}catch(e){}return {n:CL[c].s[4],cd:CL[c].cds[4],mc:CL[c].mc[4],nm:skName(4),ru:RUNES[c][4]&&RUNES[c][4].a&&RUNES[c][4].a[0],tg:(sgTags(4)||[]).join(' '),po:SKP[c][4]&&SKP[c][4][0],b4:!!SKP[c]['4B'],img:skImg(c,4,30).length,br2:BR2()}};
           me.br=1;const L0=O();me.br=2;const D0=O();me.br=1;me.sk[4]=0;q8Swap(4,1);const L1=O();me.br=2;const D1=O();q8Swap(4,0);const D2=O();me.br=1;const L2=O();return {L0,D0,L1,D1,D2,L2}}""")
        rep('ปุ่ม 4 สายแสง: สลับเป็น «ดาบเทพตกฟ้า» (ชื่อ/คูล/รูน/แท็ก/ท่า) · สลับกลับได้ของเดิม',
            s4['L1']['n']=='ดาบเทพตกฟ้า' and s4['L1']['cd']==15 and s4['L1']['ru']=='qm4a' and s4['L1']['tg']=='atk aoe' and s4['L1']['po']=='rage' and s4['L2']==s4['L0'], s4)
        rep('ปุ่ม 4 สายทมิฬ: สายทมิฬได้สกิลทางเลือกของตัวเอง (v487 · ไม่ใช้ท่า/รูนสายทมิฬเดิม) · สลับกลับได้สกิลสายทมิฬเดิม',
            s4['D0']['br2'] and s4['D0']['n']!=s4['L0']['n'] and s4['D1']['n']=='ปราการสะท้อนแค้น' and s4['D1']['ru']=='rm4a' and not s4['D1']['b4'] and s4['D2']==s4['D0'], s4)
        # ===== รูนแยกตามสกิล (ปุ่ม 3 และ 4) =====
        rr=await A.ev("""()=>{const S=rnSt();const o3=RUNES.melee[3].a[0],o4=RUNES.melee[4].b[0];S.u[o3]=1;S.u[o4]=1;S.u.qm3b=1;S.u.qm4a=1;S.e[3]='a';S.e[4]='b';const r={};
           r.o=[rnOf(3),rnOf(4)];q8Swap(3,1);q8Swap(4,1);r.x1=[rnOf(3),rnOf(4)];S.e[3]='b';S.e[4]='a';r.id=[rnIdOf(3),rnIdOf(4)];q8Swap(3,0);q8Swap(4,0);r.o2=[rnOf(3),rnOf(4)];q8Swap(3,1);q8Swap(4,1);r.x3=[rnOf(3),rnOf(4)];return r}""")
        rep('รูนหลักจำแยกตามสกิล (ปุ่ม 3–4): เดิม A/B · ทางเลือกใส่ B/A · สลับไปมาแล้วคืนถูก', rr=={'o':['a','b'],'x1':['',''],'id':['qm3b','qm4a'],'o2':['a','b'],'x3':['b','a']}, rr)
        await A.ev("()=>{const S=rnSt();delete S.e[3];delete S.e[4]}")
        # ===== เซฟ =====
        sv=await A.ev("""()=>{const s=snap();const c=cleanChar(JSON.parse(JSON.stringify(s)));const keep=JSON.parse(JSON.stringify(me.sp8));me.sp8={e:{},r:{},n:{}};applySave(c);me.cls2=1;me.br=1;q8Apply(true);return {e:me.sp8.e,r:me.sp8.r,keep:keep.e,on:[q8On(3),q8On(4)]}}""")
        await A.wait(1300)
        nm=await A.ev("()=>[CL.melee.s[3],CL.melee.s[4]]")
        rep('เซฟ/โหลด: สกิลที่เลือกปุ่ม 3–4 + รูนที่จำไว้ กลับมาครบ', sv['e'].get('3')==1 and sv['e'].get('4')==1 and sv['on']==[True,True] and nm==['กระโดดทุบพสุธา','ดาบเทพตกฟ้า'] and sv['r'].get('3o')=='a' and sv['r'].get('4o')=='b', [sv,nm])
        # ===== กระโดดทุบ: ตัวไปถึงเป้า · มึน · เพื่อนเห็นตัวลอย =====
        await B.ev("(u)=>{window.__sawJ=0;window.__jw=setInterval(()=>{if(Q8J[u])window.__sawJ=1},20)}",A.uid)
        await A.ev("()=>{window.__free=1;me.x=1600;me.y=1600;me.face=0;me.sk[3]=0;me.mp=me.mm;__H.length=0;__FL.length=0;lockId=null}")
        await A.wait(100)
        lp=await A.ev("async()=>{const t=pickTarget(240);const d0=t?Math.round(Math.hypot(t.x-me.x,t.y-me.y)):-1;me.manT=performance.now();useSkill(3);await new Promise(r=>setTimeout(r,600));return {d0,d1:t?Math.round(Math.hypot(t.x-me.x,t.y-me.y)):-1,h:__H.length,inv:me.inv3>0,st:__FL.length}}")
        lb=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8leap'&&q[1]===u)&&window.__sawJ",A.uid,ms=1500,step=30)
        rep('กระโดดทุบพสุธา: ตัวพุ่งไปถึงเป้า (เหลือ <40) · โดนมอนในวง · อีกเครื่องเห็นภาพ + ตัวลอย', lp['d0']>=60 and 0<=lp['d1']<40 and lp['h']>=2 and lb, [lp,lb])
        await A.ev("()=>{window.__free=0;me.x=1600;me.y=1600}");await A.wait(300)
        # ===== ดาบเทพตกฟ้า: ดาบตกหลัง 0.5 วิ แล้วปล่อยพลังซ้ำ =====
        sw=await A.ev("async()=>{me.cd=99;me.sk[4]=0;me.mp=me.mm;__H.length=0;lockId=null;const t0=performance.now();me.manT=t0;useSkill(4);await new Promise(r=>setTimeout(r,400));const e=__H.length;await new Promise(r=>setTimeout(r,2200));return {early:e,h:__H.length,first:__H.length?__H[0][3]-t0:-1,cd:Math.round(me.sk[4])}}")
        gb=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8gsw'&&q[1]===u)",A.uid,ms=800,step=30)
        rep('ดาบเทพตกฟ้า: ยังไม่โดนก่อนดาบตก · ตกแล้วโดนวง + ปล่อยพลังซ้ำ · อีกเครื่องเห็นดาบ', sw['early']==0 and sw['first']>=450 and sw['h']>=8 and sw['cd']>=11 and gb, [sw,gb])
        # ===== กลไกอื่น (เรียกตรงจากเครื่อง A เพื่อทดสอบกลไก) =====
        async def mech(id,k,r,ms):
            return await A.ev("async([id,k,r,ms])=>{Q8S.length=0;me.mp=me.mm;__H.length=0;__FL.length=0;lockId=null;const ok=Q8F[id](k,1,0,r);await new Promise(res=>setTimeout(res,ms));const by={};__H.forEach(h=>{by[h[0]]=(by[h[0]]||0)+1});return {ok,h:__H.length,mons:Object.keys(by).length,ck:[...new Set(__H.map(h=>h[2]))].join(','),fx:__FL.map(q=>q[0]+':'+q[3]+(q[4]?':'+q[4]:'')).join(' ')}}",[id,k,r,ms])
        sn=await mech('ad',3,'',900)
        rep('ศรสังหาร: ง้าง 0.3 วิ แล้วศรทะลุหลายตัว', sn['ok'] and sn['h']>=2 and 'q8chg' in sn['fx'] and 'q8snipe' in sn['fx'], sn)
        hw=await mech('ah',4,'b',2600)
        dv=await waitc(B,"(u)=>__FL.filter(q=>q[0]==='q8dive'&&q[1]===u).length",A.uid,ms=600,step=50)
        rep('เหยี่ยวล่าเหยื่อ (รูน B): เหยี่ยวโฉบซ้ำ ๆ + สายฟ้ากระโดดต่อ · อีกเครื่องเห็นการโฉบ', hw['h']>=4 and 'bolt' in hw['ck'] and hw['fx'].count('q8dive')>=2 and (dv or 0)>=2, [hw,dv])
        ob=await mech('go',3,'',2400)
        rep('ลูกแก้วพลังเวท: ลอยผ่านมอนแล้วตีซ้ำทุก 0.3 วิ', ob['h']>=6 and ob['mons']>=2, ob)
        bz=await mech('gz',4,'',2200)
        rep('พายุหิมะ: เขตตีซ้ำทุก 0.5 วิ ธาตุน้ำแข็ง + ทำให้มอนช้า', bz['h']>=8 and 'frost' in bz['ck'] and 'q8bliz' in bz['fx'], bz)
        dg=await mech('nd',3,'',700)
        db=await waitc(B,"(u)=>{const q=__FL.find(q=>q[0]==='q8dag'&&q[1]===u);return q&&q[4]}",A.uid,ms=800,step=30)
        rep('กริชเงาไล่ล่า: กริช 5 เล่มกระจายหามอนหลายตัว ไม่พลาด · อีกเครื่องเห็นกริช 5 เล่ม', dg['h']>=5 and dg['mons']>=3 and db==5, [dg,db])
        # ประหาร: มอนตัวหนึ่งถูกล็อกเลือด 10% ที่โฮสต์
        await H.ev("()=>{const m=mons.filter(q=>q.t<3&&q.x>1600&&q.x<1700)[0];if(m){m.__low=1;window.__lowid=m.id}}")
        lid=await H.ev("()=>window.__lowid")
        await A.wait(700)
        ex=await A.ev("async(id)=>{Q8S.length=0;me.mp=me.mm;const m=mons.find(q=>q.id===id);const f0=m?Math.round(m.hp/m.mh*100):-1;dn.length=0;Q8F.ns(4,1,0,'');await new Promise(r=>setTimeout(r,900));return {f0,ex:dn.some(d=>String(d.v).indexOf('ประหาร')>=0)}}",lid)
        dead=await waitc(H,"(id)=>{const m=mons.find(q=>q.id===id);return !m||m.hp<=0}",lid,ms=2500,step=100)
        rep('เคียวเงาพิฆาต: มอนเลือดเหลือ <15% ถูกประหาร (ตายจริงที่โฮสต์)', ex['f0']<=15 and ex['ex'] and dead, [ex,dead])
        # ===== นักสวด: ลำแสง (เพื่อนในแนวฟื้นเลือด) · ดวงแก้วเทวา =====
        base=await A.ev("async()=>{me.hp=me.mh*.5;const h0=me.hp;await new Promise(r=>setTimeout(r,1200));return Math.round((me.hp-h0)/me.mh*1000)/10}")
        await B.ev("()=>{q8Swap(3,1);me.sk[3]=0;me.mp=me.mm;lockId=null}")
        await B.wait(300)
        await A.ev("()=>{me.hp=me.mh*.5;window.__h0=me.hp}")
        bmok=await B.ev("()=>{const t=pickTarget(300);me.manT=performance.now();useSkill(3);return {t:t?[Math.round(t.x),Math.round(t.y)]:null,name:CL.sup.s[3],cd:Math.round(me.sk[3])}}")
        await A.wait(1300)
        bh=await A.ev("()=>Math.round((me.hp-__h0)/me.mh*1000)/10")
        bdm=await B.ev("()=>({h:__H.length,ck:[...new Set(__H.map(h=>h[2]))].join(',')})")
        rep('ลำแสงศักดิ์สิทธิ์: ตีมอนในแนว (แสง) · เพื่อนที่ยืนในแนวลำแสงฟื้นเลือดผ่านเน็ต', bmok['name']=='ลำแสงศักดิ์สิทธิ์' and bdm['h']>=4 and 'holy' in bdm['ck'] and bh-base>=2.5, [bmok,bdm,base,bh])
        await A.wait(1200)
        await B.ev("()=>{me.cls2=1;me.br=1;try{applyBr()}catch(e){}q8Swap(4,1);const S=rnSt();S.u.qu4a=1;S.e[4]='a';me.sk[4]=0;me.mp=me.mm;__H.length=0}")
        await B.wait(400)
        await A.ev("()=>{me.hp=me.mh*.4;window.__h0=me.hp;dn.length=0}")
        await B.ev("()=>{me.hp=me.mh;me.manT=performance.now();useSkill(4)}")
        await A.wait(1600)
        oh=await A.ev("()=>({g:Math.round((me.hp-__h0)/me.mh*1000)/10,dn:dn.filter(d=>/^\\+\\d+/.test(String(d.v))).length})")
        ofx=await A.ev("(u)=>__FL.filter(q=>q[0]==='q8orbs'&&q[1]===u).length+':'+__FL.filter(q=>q[0]==='q8hl'&&q[1]===u).length",B.uid)
        rep('ดวงแก้วเทวา (รูน A): ยิงแสงฮีลเพื่อนเลือดน้อยสุด + ใกล้ตัวฟื้น 1%/วิ (ผ่านเน็ต)', oh['g']>=4 and oh['dn']>=1 and ofx.split(':')[0]=='1' and int(ofx.split(':')[1])>=2, [oh,ofx])
        # ===== ลิงก์รูนเสริม · ออโต้ =====
        lk=await A.ev("""async()=>{const X=sgSt();X.i.echo=1;X.l={3:['echo']};me.sk[3]=0;me.mp=me.mm;__FL.length=0;const tg=sgTags(3).join(' '),ok=sgOk('echo',3);window.__free=1;me.x=1600;me.y=1600;me.manT=performance.now();useSkill(3);
           await new Promise(r=>setTimeout(r,900));const n=__FL.filter(q=>q[0]==='q8leap'&&q[1]===uid).length;X.l={};window.__free=0;return {tg,ok,n}}""")
        rep('ลิงก์รูนเสริมใช้ตามแท็กของสกิลปุ่ม 3 ใหม่ (atk aoe move melee) · ร่ายซ้ำ = กระโดด 2 ครั้ง', lk['tg']=='atk aoe move melee' and lk['ok'] and lk['n']==2, lk)
        await A.wait(400)
        au=await A.ev("""async()=>{me.sk[3]=0;me.sk[4]=0;me.mp=me.mm;__FL.length=0;me.manT=0;AUTO.on=true;AUTO.sel={0:0,1:0,2:0,3:1,4:1,5:0};AUTO.t=0;window.__free=1;await new Promise(r=>setTimeout(r,1200));AUTO.on=false;window.__free=0;
           return {leap:__FL.filter(q=>q[0]==='q8leap'&&q[1]===uid).length,sw:__FL.filter(q=>q[0]==='q8gsw'&&q[1]===uid).length}}""")
        rep('ออโต้สกิลใช้สกิลทางเลือกปุ่ม 3–4 ได้', au['leap']>=1 and au['sw']>=1, au)
        await A.ev("()=>{me.x=1600;me.y=1600}")
        # ===== หน้าคลังสกิล =====
        ui=await A.ev("""()=>{q8Open();const r={cards:ov.querySelectorAll('.q8c').length,on:ov.querySelectorAll('.q8c.on').length,lk:ov.querySelectorAll('.q8c.lk').length,h:[...ov.querySelectorAll('.q8h')].map(e=>e.textContent).join('|')};
           const b=ov.querySelector('[data-q8="3:0"]');if(b)b.click();r.after=CL.melee.s[3];me.cls2=0;q8Apply(true);q8Open();r.lk2=ov.querySelectorAll('.q8c.lk').length;r.n4=CL.melee.s[4];ov.hidden=true;me.cls2=1;q8Apply(true);r.n4b=CL.melee.s[4];return r}""")
        rep('หน้าคลังสกิล: การ์ด 12 ใบ (ปุ่ม 1–4 + 6 + อัลติ · v488) · กดใช้แล้วสลับทันที · ไม่ตื่นพลัง = การ์ดปุ่ม 4 ล็อก และสกิลทางเลือกปุ่ม 4 ไม่ทำงาน',
            ui['cards']==12 and ui['on']==6 and ui['lk']==2 and 'ปุ่มสกิล 3' in ui['h'] and 'ปุ่มสกิล 4' in ui['h'] and ui['after']=='โทสะอสูร' and ui['lk2']==3 and ui['n4']=='คำรามโลหิต' and ui['n4b']=='ดาบเทพตกฟ้า', ui)
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
