"""v494 iPhone: เตือนผูกบัญชีก่อนติดตั้ง · ปุ่มไปผูกบัญชี · ในดันเจี้ยนบอกให้ออกก่อน · ผูกแล้วไม่เตือน · Android ไม่เตือน · เปิดจากหน้าจอโฮมบอกให้ล็อกอินบัญชีเดิม"""
import asyncio, sys, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:500], flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ip'+str(random.randint(100,999)),'melee',30)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){};window.__i0=fsIOS;fsIOS=()=>true;PWA.ev=null}")
        base=await A.ev("()=>({srv:srvAcc(),acc:!!ACC,need:pwaNeedAcc(),mode:saveMode})")
        # ===== การ์ดชวน/การ์ดตั้งค่าของ iPhone =====
        c1=await A.ev("""()=>{const c=pwaCard('ios');const o={warn:!!c.querySelector('.pwaw'),txt:(c.querySelector('.pwaw')||{}).textContent||'',btn:!!c.querySelector('.pwab'),steps:/หน้าจอโฮม/.test(c.textContent)};c.remove();PWA.card=0;return o}""")
        rep('iPhone ยังไม่ผูกบัญชี: การ์ดติดตั้งมีกล่องเตือน «ตัวละครเก็บแค่ใน Safari» + ปุ่ม «🔐 ไปผูกบัญชีก่อน» (ขั้นตอนเพิ่มไปยังหน้าจอโฮมยังอยู่)', base['srv'] and base['need'] and c1['warn'] and 'Safari' in c1['txt'] and c1['btn'] and c1['steps'], [base,c1])
        c2=await A.ev("""()=>{const c=pwaCard('menu');const o={warn:!!c.querySelector('.pwaw')};c.remove();PWA.card=0;return o}""")
        c3=await A.ev("""()=>{const a0=ACC;ACC={a:'tester',t:'x'};const c=pwaCard('ios');const o={warn:!!c.querySelector('.pwaw'),btn:!!c.querySelector('.pwab')};c.remove();PWA.card=0;ACC=a0;return o}""")
        rep('Android/คอม (การ์ดเมนู) ไม่เตือน · ผูกบัญชีแล้วไม่เตือน', not c2['warn'] and not c3['warn'] and not c3['btn'], [c2,c3])
        # ===== การ์ดจากปุ่มเต็มจอ =====
        fs=await A.ev("""async()=>{const c0=fsCan;fsCan=()=>false;$('fsb').click();await new Promise(r=>setTimeout(r,200));const c=$('fsios');const o={card:!!c,warn:!!(c&&c.querySelector('.pwaw')),btn:!!(c&&c.querySelector('.pwab')),ok:!!(c&&[...c.querySelectorAll('button')].some(b=>b.textContent==='เข้าใจแล้ว'))};fsCan=c0;
          if(c)[...c.querySelectorAll('button')].find(b=>b.textContent==='เข้าใจแล้ว').click();o.gone=!$('fsios');return o}""")
        rep('กดปุ่มเต็มจอบน iPhone: การ์ดวิธีติดตั้งมีคำเตือน + ปุ่มไปผูกบัญชี · ปุ่ม «เข้าใจแล้ว» ยังปิดได้', fs['card'] and fs['warn'] and fs['btn'] and fs['ok'] and fs['gone'], fs)
        # ===== แถวในตั้งค่า =====
        st=await A.ev("""()=>{cfgUI();const r=ov.querySelector('[data-pwarow] small');const t=r?r.textContent:'';ov.hidden=true;return t}""")
        rep('ตั้งค่า → ติดตั้งเป็นแอป (iPhone ยังไม่ผูกบัญชี) บอก «ผูกบัญชีก่อน»', 'ผูกบัญชีก่อน' in st, st)
        # ===== ในดันเจี้ยน/ตอนล้ม: บอกให้ออกก่อน ไม่ออกจากเกม =====
        dn=await A.ev("""async()=>{me.down=5;const c=pwaCard('ios');c.querySelector('.pwab').click();await new Promise(r=>setTimeout(r,300));const o={k:ov.dataset.k,note:(ov.querySelector('.note')||{}).textContent||'',cls:!!me.cls,card:!!$('pwac')};me.down=0;ov.hidden=true;return o}""")
        rep('ตอนล้ม/ในดันเจี้ยน กดไปผูกบัญชี → หน้าเปลี่ยนตัวละครบอกให้ฟื้น/ออกก่อน (ยังอยู่ในเกม)', dn['k']=='chsw' and 'ผูกบัญชี' in dn['note'] and dn['cls'] and not dn['card'], dn)
        # ===== กดไปผูกบัญชี: บันทึกแล้วกลับหน้าเลือกตัวละคร · กล่องผูกบัญชีไฮไลต์ + ข้อความ =====
        go=await A.ev("""async()=>{const c=pwaCard('ios');c.querySelector('.pwab').click();for(let i=0;i<60;i++){if(!me.cls&&$('accbox'))break;await new Promise(r=>setTimeout(r,100))}await new Promise(r=>setTimeout(r,500));
          const b=$('accbox');return {cls:me.cls,box:!!b,hl:!!(b&&b.classList.contains('pwahl')),msg:(($('acm')||{}).textContent||''),slot:Object.keys(saves.chars||{}).length}}""")
        rep('กด «ไปผูกบัญชีก่อน» → บันทึกแล้วกลับหน้าเลือกตัวละคร · กล่องผูกบัญชีไฮไลต์ + บอกให้ล็อกอินในแอปด้วยบัญชีเดียวกัน · ตัวละครยังอยู่', not go['cls'] and go['box'] and go['hl'] and 'หน้าจอโฮม' in go['msg'] and go['slot']>=1, go)
        # ===== เปิดจากหน้าจอโฮมบน iOS ยังไม่ล็อกอิน =====
        sa=await A.ev("""()=>{const s0=pwaStand;pwaStand=()=>true;const h=accBox();pwaStand=s0;const h2=accBox();return {note:/เปิดจากหน้าจอโฮม/.test(h),plain:!/เปิดจากหน้าจอโฮม/.test(h2)}}""")
        rep('เปิดจากไอคอนหน้าจอโฮม (iOS) ยังไม่ล็อกอิน: กล่องบัญชีบอกให้ล็อกอินบัญชีเดิม · เปิดใน Safari ไม่มีข้อความนี้', sa['note'] and sa['plain'], sa)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม', not E, E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
