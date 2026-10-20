"""v473 เมนูอ่านง่าย: เมนูหลักแบ่งหมวด + มาตรฐานแผง + รายหน้า"""
import asyncio, sys, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLOSE = "()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;try{$('wnp').hidden=true}catch(e){};try{$('tipc').remove()}catch(e){}}"
async def tap(c, sel):
    bx = await c.pg.locator(sel).first.bounding_box()
    await c.pg.mouse.click(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2)
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Ann', 'melee', 99)
        L = await new_client(b, 'Low', 'mage', 15)
        for c in (A, L):
            await c.ev(CLOSE); await c.ev("()=>{try{gmSet(false,1)}catch(e){}}")
        await A.ev("()=>{for(let i=0;i<9;i++)me.bag.push(genItem(20+i,SLOTS[i%5],2,2));MLN=3}")
        await A.wait(800)
        # ---------- ① เมนูหลัก ----------
        await tap(A, '#mn'); await A.wait(500)
        m = await A.ev("""()=>{const M=$('mnp');const secs=[...M.querySelectorAll(':scope>.ui8s')].map(s=>({h:s.querySelector('.ui8h').textContent,hid:s.hidden,ids:[...s.querySelectorAll('.ui8g>button')].filter(b=>getComputedStyle(b).display!=='none').map(b=>b.id)}));
          const d=id=>{const e=$(id).querySelector('em.ui8d');return e?[e.textContent,e.classList.contains('hot')]:null};
          return{cls:M.classList.contains('ui8m'),open:!M.hidden,secs,tb:$('tb').querySelector(':scope>span').textContent,dtb:d('tb'),dgb:d('gb'),dml:d('mlb'),gbbd:getComputedStyle($('gb').querySelector('.bd')).display,
            tbdot:$('tb').querySelector('.bd').classList.contains('ui8dot'),sp:spts()+pts()+astFree(),bag:me.bag.length+'/'+MAXBAG,w:Math.round(M.getBoundingClientRect().width),st:Math.round($('stage').getBoundingClientRect().width),
            fit:M.scrollHeight<=M.clientHeight+2,hr:M.querySelectorAll('hr').length,gm:$('gmb').hidden}}""")
        vis = [s for s in m['secs'] if not s['hid']]
        rep('เปิดเมนู → แผ่นกว้างเกือบเต็มจอ แบ่ง 5 หมวดมีหัวข้อ (หมวด «อื่น ๆ» ซ่อนเมื่อว่าง)',
            m['cls'] and m['open'] and len(vis) == 5 and [s['h'] for s in vis] == ['🧍ตัวละคร', '🗺️ผจญภัย', '🤝เพื่อนและกิลด์', '⛺ชีวิตในค่าย', '⚙️ระบบ'] and m['w'] >= m['st'] - 24 and m['hr'] == 0, json.dumps([s['h'] for s in vis], ensure_ascii=False) + ' w=%s/%s' % (m['w'], m['st']))
        sm = {s['h']: s['ids'] for s in vis}
        rep('ปุ่มอยู่ถูกหมวด (ตัวละคร/ผจญภัย/เพื่อน/ค่าย/ระบบ) และไม่มีปุ่ม GM สำหรับผู้เล่นทั่วไป',
            sm['🧍ตัวละคร'][:6] == ['tb', 'gb', 'cdm', 'rxm', 'mtm', 'ptm'] and sm['🗺️ผจญภัย'][:3] == ['qb', 'dgm', 'wmm'] and sm['🤝เพื่อนและกิลด์'][:4] == ['pb', 'frb', 'gdb', 'mlb'] and 'ivm' in sm['🤝เพื่อนและกิลด์']
            and sm['⛺ชีวิตในค่าย'] == ['tnm', 'fsm', 'gtm'] and sm['⚙️ระบบ'][:4] == ['gqb', 'aum', 'wnb', 'chm'] and 'gmb' not in sm['⚙️ระบบ'] and m['gm'], json.dumps(sm, ensure_ascii=False))
        rep('ปุ่ม «สกิล» เปลี่ยนชื่อเป็น «ตัวละคร» · ป้าย 99+ เป็นจุดทอง + «มีแต้มเหลือ N»',
            m['tb'] == 'ตัวละคร' and m['tbdot'] and m['dtb'][1] and m['dtb'][0] == 'มีแต้มเหลือ ' + str(m['sp']), json.dumps([m['tb'], m['dtb'], m['sp']], ensure_ascii=False))
        rep('คำอธิบายใต้ปุ่มเป็นค่าสด: กระเป๋า n/120 (ไม่มีป้ายแดงนับของ) · จดหมายยังไม่อ่าน 3 (ไฮไลต์)',
            m['dgb'][0] == 'กระเป๋า ' + m['bag'] and m['gbbd'] == 'none' and m['dml'] == ['ยังไม่อ่าน 3', True], json.dumps([m['dgb'], m['gbbd'], m['dml']], ensure_ascii=False))
        rep('เมนูทั้งหมดพอดีจอ 390×844 ไม่ต้องเลื่อน (ผู้เล่นทั่วไป)', m['fit'], '')
        # คลิกปุ่มจริง → เปิดแผง + เมนูปิด
        await tap(A, '#gb'); await A.wait(600)
        g = await A.ev("()=>({mn:$('mnp').hidden,pn:(ov.querySelector('.pn')||{}).dataset&&ov.querySelector('.pn').dataset.pn,ov:ov.hidden})")
        rep('แตะปุ่ม «อุปกรณ์» ในเมนูใหม่ → เปิดหน้าอุปกรณ์ และเมนูปิด', g['mn'] and g['pn'] == 'gear' and not g['ov'], json.dumps(g))
        await A.ev(CLOSE)
        await tap(A, '#mn'); await A.wait(300); await tap(A, '#ui8x'); await A.wait(300)
        rep('ปุ่ม ✕ ในเมนูปิดเมนู', await A.ev("()=>$('mnp').hidden"), '')
        # ปุ่มที่ถูกเพิ่มทีหลัง (แบบโมดูลอื่น: แทรกต่อจากปุ่มปาร์ตี้)
        await A.ev("()=>{const ref=$('pb');const b=document.createElement('button');b.id='zzt';b.innerHTML='<i>🧪</i><span>ทดลอง</span><b class=\"bd\"></b>';ref.parentNode.insertBefore(b,ref.nextSibling)}")
        await tap(A, '#mn'); await A.wait(300)
        z = await A.ev("()=>{const s=$('zzt').closest('.ui8s');return{h:s&&s.querySelector('.ui8h').textContent,hid:s&&s.hidden,pb:$('pb').closest('.ui8s').querySelector('.ui8h').textContent}}")
        rep('ปุ่มใหม่ที่โมดูลอื่นแทรกทีหลัง → ถูกจัดเข้าหมวด «อื่น ๆ» ตอนเปิดเมนูครั้งถัดไป', z['h'] == '✨อื่น ๆ' and not z['hid'] and z['pb'] == '🤝เพื่อนและกิลด์', json.dumps(z, ensure_ascii=False))
        await A.ev("()=>{$('zzt').remove();menuToggle(false)}")
        # ---------- ② มาตรฐานแผง ----------
        await A.ev("()=>{ov.hidden=false;partyUI()}"); await A.wait(400)
        h1 = await A.ev("()=>{const ph=ov.querySelector('.pn>.ph'),sm=ph.querySelector('small');return{cl:sm.scrollHeight>sm.clientHeight+3,i:!!ph.querySelector('.ui8i'),lines:Math.round(sm.clientHeight)}}")
        await tap(A, '.pn>.ph .ui8i'); await A.wait(200)
        h2 = await A.ev("()=>{const ph=ov.querySelector('.pn>.ph'),sm=ph.querySelector('small');return{op:ph.classList.contains('ui8open'),full:sm.scrollHeight<=sm.clientHeight+3,pn:ov.querySelector('.pn').dataset.pn,ov:ov.hidden}}")
        await A.ev("()=>partyUI()"); await A.wait(300)
        h3 = await A.ev("()=>ov.querySelector('.pn>.ph').classList.contains('ui8open')")
        rep('หัวแผงยาว (ปาร์ตี้) → เหลือบรรทัดเดียว + ปุ่ม ⓘ · แตะแล้วกางเต็ม (ไม่ปิดแผง) · วาดใหม่ยังกางอยู่',
            h1['cl'] and h1['i'] and h2['op'] and h2['full'] and h2['pn'] == 'party' and not h2['ov'] and h3, json.dumps([h1, h2, h3]))
        pe = await A.ev("()=>{const c=ov.querySelector('.ui8emp');return c?{steps:c.querySelectorAll('ol.ui8steps li').length,chips:c.querySelectorAll('.ui8c').length}:null}")
        rep('ปาร์ตี้ว่าง → ขั้นตอนชวน 2 ข้อ + ประโยชน์เป็นป้าย 3 อัน', pe and pe['steps'] == 2 and pe['chips'] == 3, json.dumps(pe))
        await A.ev("()=>{ov.hidden=false;petUI()}"); await A.wait(400)
        k1 = await A.ev("()=>{const h=ov.querySelector('.card.hint');return{cl:h.classList.contains('ui8cl'),wrap:!!h.querySelector('.ui8ht'),more:(h.querySelector('.ui8more')||{}).textContent,ht:Math.round(h.querySelector('.ui8ht').getBoundingClientRect().height)}}")
        await tap(A, '.card.hint .ui8more'); await A.wait(200)
        k2 = await A.ev("()=>{const h=ov.querySelector('.card.hint');return{op:h.classList.contains('ui8op'),more:h.querySelector('.ui8more').textContent,ht:Math.round(h.querySelector('.ui8ht').getBoundingClientRect().height)}}")
        lk = await A.ev("()=>[...ov.querySelectorAll('.sr')].map(r=>{const s=r.querySelector('.ui8st');return s?s.textContent:null}).filter(Boolean)")
        rep('คำแนะนำยาว (สัตว์เลี้ยง) ย่อ 2 บรรทัด + «อ่านต่อ» · แตะแล้วกางเต็ม/เป็น «ย่อ»',
            k1['cl'] and k1['wrap'] and k1['more'] == 'อ่านต่อ ▾' and k2['op'] and k2['more'] == 'ย่อ ▴' and k2['ht'] > k1['ht'] + 10, json.dumps([k1, k2], ensure_ascii=False))
        rep('สัตว์เลี้ยงที่ยังไม่มี (ดรอปเท่านั้น) → ป้าย «ยังไม่มี · หาได้จากดรอป» แทนปุ่มกุญแจเปล่า',
            len(lk) >= 5 and all(t == 'ยังไม่มี · หาได้จากดรอป' for t in lk) and await A.ev("()=>[...ov.querySelectorAll('.sr>button[disabled]')].filter(b=>b.textContent.trim()==='🔒'&&getComputedStyle(b).display!=='none').length") == 0, json.dumps(lk[:3], ensure_ascii=False))
        await A.ev("()=>{ov.hidden=false;cardUI()}"); await A.wait(400)
        cu = await A.ev("()=>({u:/undefined|NaN/.test(ov.querySelector('.pn').textContent),mp:ov.querySelector('.pn').textContent.includes('มานาสูงสุด +10%')})")
        rep('การ์ด: ชื่อพลังไม่ขึ้น «undefined» แล้ว (มานาสูงสุด / ความเร็วเคลื่อนที่)', not cu['u'] and cu['mp'], json.dumps(cu))
        # ---------- ③ รายหน้า ----------
        await A.ev("()=>{ov.hidden=false;charTab='ab';treeUI()}"); await A.wait(300)
        tb = await A.ev("()=>({ab:(ov.querySelector('.tab[data-tab=\"char:ab\"] .ui8tn')||{}).textContent,tr:(ov.querySelector('.tab[data-tab=\"char:tr\"] .ui8tn')||{}).textContent,sp:spts(),pt:pts()})")
        rep('ตัวละคร: แท็บ «สเตตัส»/«สกิล» มีตัวเลขแต้มที่ยังไม่ได้ลง', tb['ab'] == str(tb['sp']) and tb['tr'] == str(tb['pt']), json.dumps(tb))
        await A.ev("()=>{ov.hidden=false;gearUI()}"); await A.wait(300)
        ge = await A.ev("()=>({lg:ov.querySelectorAll('.card.hint.ui8lgc .ui8c').length,sell:!!ov.querySelector('details.ui8sell'),sub:ov.querySelector('.pn>.ph small').textContent.slice(0,40)})")
        rep('อุปกรณ์: สัญลักษณ์ ▲▼＝ เป็นแถวป้าย · คำอธิบายขายอัตโนมัติพับเก็บ', ge['lg'] == 3 and ge['sell'], json.dumps(ge, ensure_ascii=False))
        await A.ev("()=>{ov.hidden=false;dungeonUI()}"); await A.wait(300)
        dA = await A.ev("()=>{const c=[...ov.querySelectorAll('.card.ui8dg')];return{n:c.length,pri:[...ov.querySelectorAll('[data-dgc]')].map(b=>b.classList.contains('pri')?1:0),rec:c.map(x=>x.classList.contains('ui8rec')?1:0),chips:c[0]&&c[0].querySelectorAll('.ui8c').length,raid:!!ov.querySelector('.card.ui8raid [data-raidc]'),det:ov.querySelectorAll('details.ui8det').length,txt:/รางวัล: ทอง/.test(ov.textContent)}}")
        rep('ดันเจี้ยน (Lv 99): การ์ดป้ายข้อมูล+รางวัล · ปุ่มทองเฉพาะระดับที่แนะนำ (นรก) · เรด + กลไกบอสพับเก็บ',
            dA['n'] == 4 and dA['pri'] == [0, 0, 1] and dA['rec'] == [0, 0, 1, 0] and dA['chips'] >= 7 and dA['raid'] and dA['det'] == 2 and not dA['txt'], json.dumps(dA))
        await L.ev("()=>{ov.hidden=false;dungeonUI()}"); await L.wait(300)
        dL = await L.ev("()=>({pri:[...ov.querySelectorAll('[data-dgc]')].map(b=>(b.classList.contains('pri')?'P':'S')+(b.disabled?'x':'')),lv:[...ov.querySelectorAll('.card.ui8dg .ui8c.bad')].map(e=>e.textContent)})")
        rep('ดันเจี้ยน (Lv 15): แนะนำระดับปกติ · ระดับยาก/นรก/เรดล็อก บอก «ต้อง Lv»', dL['pri'] == ['P', 'Sx', 'Sx'] and dL['lv'] == ['ต้อง Lv 20', 'ต้อง Lv 28', 'ต้อง Lv 58'], json.dumps(dL, ensure_ascii=False))
        await L.ev("()=>{ov.hidden=false;mountUI(undefined,false)}"); await L.wait(300)
        mL = await L.ev("()=>({st:[...ov.querySelectorAll('.sr .ui8st')].map(e=>e.textContent),ch:ov.querySelectorAll('.sr .ui8c').length})")
        rep('สัตว์ขี่ (Lv 15): ความเร็ว/เลเวล/ราคาเป็นป้าย · ยังไม่มี → «ซื้อที่คอก» หรือ «ต้อง Lv N»',
            mL['st'][0] == '🛒 ซื้อที่คอก' and mL['st'][1] == '🔒 ต้อง Lv 20' and mL['ch'] >= 12, json.dumps(mL, ensure_ascii=False))
        await L.ev("()=>{ov.hidden=false;mountUI(undefined,true)}"); await L.wait(300)
        mS = await L.ev("()=>({buy:ov.querySelectorAll('[data-mtb]').length,st:ov.querySelectorAll('.sr .ui8st').length})")
        rep('คอกสัตว์ (โหมดซื้อ) ยังมีปุ่มซื้อครบ ไม่ถูกแทนด้วยป้าย', mS['buy'] == 6 and mS['st'] == 0, json.dumps(mS))
        # สร้างห้องดันเจี้ยนจากปุ่มใหม่ได้จริง
        await A.ev("()=>{ov.hidden=false;dungeonUI()}"); await A.wait(300)
        await tap(A, '[data-dgc="1"]'); await A.wait(2500)
        din = await A.ev("()=>({dg:isDg(),map:curMap})")
        await A.ev("()=>{ov.hidden=false;dungeonUI()}"); await A.wait(300)
        dIn = await A.ev("()=>({ui8:ov.querySelectorAll('.card.ui8dg').length,code:ov.querySelector('.pn>.ph small').textContent})")
        rep('กด «สร้างห้อง» จากการ์ดใหม่ → เข้าดันเจี้ยนได้จริง · หน้าดันเจี้ยนตอนอยู่ในห้องเป็นแบบเดิม', din['dg'] and dIn['ui8'] == 0 and 'รหัสห้อง' in dIn['code'], json.dumps([din, dIn], ensure_ascii=False))
        await A.ev("()=>{try{dgLeave()}catch(e){}}"); await A.wait(1500)
        # ไม่วนลูป: เปิดแผงไว้นิ่ง ๆ แล้วนับรอบแก้
        await A.ev(CLOSE); await A.ev("()=>{ov.hidden=false;gearUI()}"); await A.wait(800)
        m1 = await A.ev("()=>window.__mut"); await A.wait(2500); m2 = await A.ev("()=>window.__mut")
        errs = [e for c in (A, L) for e in c.errs if not e.startswith('console')]
        rep('ไม่มี error · แผงที่เปิดนิ่ง ๆ ไม่วนแก้ตัวเองไม่รู้จบ', not errs and m2 - m1 < 30, str(errs[:3]) + ' mut/2.5s=' + str(m2 - m1))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for r in R if r[1]), len(R)))
asyncio.run(main())
