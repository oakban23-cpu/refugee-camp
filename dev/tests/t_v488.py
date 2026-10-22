"""v488 คลังสกิลรอบ 5: สกิลที่ 6 (สกิลคลาส 3) มีสกิลทางเลือกแยกตามสายจุติ 10 แบบ — ปลด · สลับทั้งสองสาย · รูน · กลไก · ทุกเครื่องเห็น/ได้ผล"""
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
        A=await new_client(b,'Pa'+str(random.randint(100,999)),'melee',80);B=await new_client(b,'Pb'+str(random.randint(100,999)),'sup',80)
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
        for c in (A,B): await c.ev("()=>{me.cls2=1;me.br=1;me.rb=1;me.lv=80;try{applyBr();applyS6()}catch(e){}}")
        await A.wait(400)
        # ===== ปลด =====
        u=await A.ev("""()=>{const o={lv:me.lv,rb:me.rb},r={};me.rb=1;me.lv=65;r.l65=q8Unl(5);r.sw=q8Swap(5,1);me.lv=70;r.l70=q8Unl(5);me.rb=0;me.lv=99;r.norb=q8Unl(5);me.lv=o.lv;me.rb=o.rb;return r}""")
        rep('ปลดสกิลที่ 6 ทางเลือกพร้อมสกิลคลาส 3 (จุติแล้ว Lv 70) · ยังไม่จุติ Lv สูงก็ยังล็อก', u['l65']==False and '🔒' in u['sw'] and 'จุติ' in u['sw'] and u['l70'] and u['norb']==False, u)
        # ===== สลับทั้งสองสายจุติ =====
        s=await A.ev("""()=>{const c='melee',O=()=>{try{applyS6()}catch(e){}return {n:skName(5),cd:CL[c].cds[5],ru:RUNES[c][5].a[0],tg:(SGT[c][5]||''),zm:skImg(c,5,30).indexOf(Q8IMG.zm)>=0,zw:skImg(c,5,30).indexOf(Q8IMG.zw)>=0,img:skImg(c,5,30).length}};
           me.br=1;const L0=O();me.br=2;const D0=O();me.br=1;me.sk[5]=0;q8Swap(5,1);const L1=O();me.br=2;const D1=O();q8Swap(5,0);const D2=O();me.br=1;const L2=O();return {L0,D0,L1,D1,D2,L2}}""")
        rep('สกิลที่ 6: สายจุติแสงได้ «รอยแยกโลหิต» · สายทมิฬได้ «กำแพงสวรรค์ถล่ม» (ชื่อ คูล รูน แท็ก ไอคอน) · สลับกลับได้ของเดิมทั้งสองสาย',
            s['L1']['n']=='รอยแยกโลหิต' and s['L1']['cd']==15 and s['L1']['ru']=='qm5a' and s['L1']['tg']=='atk aoe move melee' and s['L1']['zm'] and s['D1']['n']=='กำแพงสวรรค์ถล่ม' and s['D1']['ru']=='rm5a' and s['D1']['zw'] and s['D2']==s['D0'] and s['L2']==s['L0'] and s['L0']['n']!=s['D0']['n'], s)
        ui=await A.ev("""()=>{q8Open();const t=[...ov.querySelectorAll('.q8h')].map(e=>e.textContent).join('|'),c=[...ov.querySelectorAll('.q8c')].map(e=>e.textContent).join('|');ov.hidden=true;return {h:t.indexOf('ปุ่มสกิล 6')>=0&&t.indexOf('สกิลคลาส 3')>=0,cards:ov.querySelectorAll('.q8c').length,hint:c.indexOf('«กำแพงสวรรค์ถล่ม»')>=0}}""")
        rep('หน้าคลังสกิล: มีช่องปุ่มสกิล 6 (สกิลคลาส 3) · การ์ดบอกว่าอีกสายจะได้อะไร', ui['h'] and ui['hint'], ui)
        # ===== กลไก =====
        async def mech(id,r,ms,pre=''):
            return await A.ev("""async([id,r,ms,pre])=>{Q8S.length=0;me.mp=me.mm;__H.length=0;__FL.length=0;lockId=null;window.__free=1;me.x=1600;me.y=1600;me.face=0;me.cd=99;if(pre)eval(pre);const x0=me.x;const ok=Q8F[id](5,1,0,r);let mv=0,st=0;const t0=performance.now();
              while(performance.now()-t0<ms){await new Promise(res=>setTimeout(res,100));mv=Math.max(mv,Math.round(Math.hypot(me.x-x0,0)));if(me.stealth>0)st++}window.__free=0;const by={};__H.forEach(h=>{by[h[0]]=(by[h[0]]||0)+1});
              return {ok,h:__H.length,mons:Object.keys(by).length,mx:Math.max(0,...__H.map(h=>h[1])),mv,st,ck:[...new Set(__H.map(h=>h[2]))].join(','),fx:[...new Set(__FL.map(q=>q[0]+':'+q[3]+(q[4]?':'+q[4]:'')))].join(' ')}}""",[id,r,ms,pre])
        zm=await mech('zm','',1400)
        rep('รอยแยกโลหิต: พุ่งไป 200 · รอยแยกปะทุแล้วหนามแทงซ้ำ', zm['ok'] and zm['mv']>=150 and zm['h']>=4 and 'q8rift' in zm['fx'], zm)
        await A.ev("()=>{me.x=1600;me.y=1600}");await A.wait(300)
        zw=await mech('zw','',1100)
        wb=await waitc(B,"(u)=>__FL.some(q=>q[0]==='q8wall'&&q[1]===u)",A.uid,ms=600,step=30)
        rep('กำแพงสวรรค์ถล่ม: ล้มทับมอนหน้าเรา + มึน · อีกเครื่องเห็นกำแพง', zw['ok'] and zw['h']>=2 and wb, [zw,wb])
        zc=await mech('zc','',1200)
        cb=await waitc(B,"(u)=>{const q=__FL.find(q=>q[0]==='q8cst'&&q[1]===u);return q&&q[4]}",A.uid,ms=600,step=30)
        rep('ธนูกลุ่มดาว: ผูกหลายตัวแล้วระเบิดพร้อมกัน · อีกเครื่องเห็นกลุ่มดาว', zc['ok'] and zc['mons']>=3 and (cb or 0)>=3, [zc,cb])
        zl=await mech('zl','b',4400)
        rep('ศรเรียกอสนี (รูน B): ฟ้าผ่าเป้าซ้ำ ๆ + กระโดด + ระเบิดท้าย', zl['ok'] and zl['h']>=8 and 'bolt' in zl['ck'] and 'q8tar' in zl['fx'], zl)
        zt=await A.ev("""async()=>{Q8S.length=0;me.mp=me.mm;__H.length=0;window.__free=1;me.x=1600;me.y=1600;const ok=Q8F.zt(5,1,0,'');const on=!!Q8TS;const id=Q8TS&&[...Q8TS.ids][0];const m=mons.find(q=>q.id===id);if(m)addHit(m,1000,0,1,'mage');const acc=Q8TS&&Q8TS.acc[id]||0;
           await new Promise(r=>setTimeout(r,3300));window.__free=0;const fin=__H.filter(h=>h[0]===id).map(h=>h[1]);return {ok,on,n:Q8TS?-1:0,acc:Math.round(acc),mx:Math.max(0,...fin.slice(1)),pd:Math.round(pd())}}""")
        rep('หยุดกาลเวลา: มอนในวงถูกหยุด · ดาเมจที่ตีใส่ระหว่างหยุดสะสมไว้แล้วปล่อยตอนจบ', zt['ok'] and zt['on'] and zt['acc']>=1000 and zt['mx']>=500+zt['pd'] , zt)
        zh=await mech('zh','',3000)
        hb=await waitc(B,"(u)=>__FL.filter(q=>q[0]==='q8hbt'&&q[1]===u).length",A.uid,ms=600,step=30)
        rep('สุนัขนรก: วิ่งไปกัดมอนซ้ำ ๆ · อีกเครื่องเห็นการกัด', zh['ok'] and zh['h']>=4 and 'q8hnd' in zh['fx'] and (hb or 0)>=2, [zh,hb])
        zv=await mech('zv','',2200)
        rep('ม่านราตรี: อยู่ในม่านล่องหนตลอด · เงาบาดมอนในม่านทุก 1 วิ', zv['ok'] and zv['st']>=15 and zv['h']>=2 and 'q8veil' in zv['fx'], zv)
        zb=await mech('zb','',4600)
        rep('กรงดาบ: ดาบฟันในกรงเป็นจังหวะแล้วรวมกลาง', zb['ok'] and zb['h']>=10 and 'q8cage' in zb['fx'], zb)
        # ===== นักสวด: อรุณฟื้นคืน (ชุบเพื่อน + พร) · ดูดวิญญาณ (ฮีลเพื่อน) =====
        await B.ev("()=>{me.br=1;q8Swap(5,1);me.sk[5]=0;me.mp=me.mm;__H.length=0;Q8S.length=0}")
        await A.ev("()=>{window.__dn0=me.down;me.down=5;me.hp=0;me.q8bl=0}")
        await B.wait(300)
        dw=await B.ev("()=>{const n=skName(5);me.manT=performance.now();useSkill(5);return {n,cd:Math.round(me.sk[5]),bl:me.q8bl>performance.now()}}")
        rv=await waitc(A,"()=>me.down<=0&&me.hp>0&&me.q8bl>performance.now()&&{hp:Math.round(me.hp/me.mh*100),bl:Math.round(me.q8blV*100)}",ms=1500,step=30)
        rep('อรุณฟื้นคืน: ชุบเพื่อนที่ล้มผ่านเน็ต (เลือด 40%) · ทั้งทีมได้พรดาเมจ +20%', dw['n']=='อรุณฟื้นคืน' and dw['bl'] and bool(rv) and rv['hp']>=40 and rv['bl']==20, [dw,rv])
        await A.ev("()=>{me.hp=me.mh*.5;window.__h0=me.hp}")
        await B.ev("()=>{me.br=2;try{applyS6()}catch(e){}me.sk[5]=0;me.mp=me.mm;__H.length=0;Q8S.length=0;lockId=null}")
        await B.wait(300)
        sp=await B.ev("()=>{const n=skName(5);me.manT=performance.now();useSkill(5);return n}")
        await A.wait(2400)
        sh=await A.ev("()=>Math.round((me.hp-__h0)/me.mh*1000)/10")
        bh=await B.ev("()=>__H.filter(h=>h[2]==='curse').length")
        rep('ดูดวิญญาณ (สายจุติทมิฬของนักสวด): ดูดมอนหลายตัว · เพื่อนรอบตัวฟื้นเลือดผ่านเน็ต', sp=='ดูดวิญญาณ' and bh>=6 and sh>=1, [sp,bh,sh])
        errs=[e for c in (A,B) for e in c.errs if 'ERR_TUNNEL' not in e and 'Failed to load resource' not in e]
        rep('ไม่มี error ทั้งสองเครื่อง', not errs, errs[:4])
    finally:
        p.terminate()
    n=sum(1 for r in R if r[1]);print(f'\nSUMMARY: {n} / {len(R)} passed')
asyncio.run(main())
