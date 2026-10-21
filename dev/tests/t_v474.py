"""v474 แถบสถานะเป็นการ์ดเล็กมุมซ้ายบน"""
import asyncio, sys, json, os
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
CLOSE = "()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;try{$('wnp').hidden=true}catch(e){};try{$('tipc').remove()}catch(e){}}"
GEO = """()=>{const r=id=>{const b=$(id).getBoundingClientRect();return{l:Math.round(b.left),t:Math.round(b.top),w:Math.round(b.width),h:Math.round(b.height),b:Math.round(b.bottom),r:Math.round(b.right)}};
  return{on:document.body.classList.contains('hudc'),H,hud:r('hud'),cv:r('c'),mn:r('mn'),topb:r('topb'),pos:getComputedStyle($('hud')).position,ty:hudTY(),
    nm:$('hnm').textContent,hp:$('thp').textContent,mp:$('tmp').textContent,xp:$('hxp').textContent,pc:$('hpc').textContent,lv:$('lvb').textContent,gold:$('pl').textContent,
    hit:(()=>{const b=$('hud').getBoundingClientRect();const e=document.elementFromPoint(b.left+b.width*.6,b.top+b.height*.5);return e?e.id||e.tagName:''})(),
    por:(()=>{const b=$('hpor').getBoundingClientRect();const e=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);return e?(e.closest('#hpor')?'hpor':e.id||e.tagName):''})()}}"""
async def main():
    p = start_server()
    try:
      async with async_playwright() as pw:
        b = await pw.chromium.launch()
        A = await new_client(b, 'Ann', 'melee', 60)
        await A.ev(CLOSE); await A.ev("()=>{me.xp=Math.floor(need(me.lv)*.4567)}"); await A.wait(1200)
        g = await A.ev(GEO)
        rep('เริ่มต้นเป็นการ์ดเล็ก: ลอยทับมุมซ้ายบนของสนาม (ไม่กินแถวบนสุดแล้ว)', g['on'] and g['pos'] == 'absolute' and g['hud']['l'] <= 20 and g['hud']['t'] <= 16 and g['hud']['w'] <= 230 and g['hud']['h'] <= 72 and g['cv']['t'] <= 10, json.dumps({k: g[k] for k in ('hud', 'cv', 'pos')}))
        rep('ในการ์ดมี ชื่อ · HP · MP · EXP% · จำนวนคน · ทอง · ป้ายเลเวล', g['nm'] == 'Ann' and g['hp'].startswith('HP ') and g['mp'].startswith('MP ') and g['xp'] == '45.6%' and g['pc'] == '👥1' and 'Lv 60' in g['lv'] and len(g['gold']) > 0, json.dumps({k: g[k] for k in ('nm', 'hp', 'mp', 'xp', 'pc', 'lv', 'gold')}, ensure_ascii=False))
        rep('ปุ่มเมนู/คอลัมน์ซ้ายเลื่อนลงใต้การ์ด (ไม่ทับกัน) · แถบบนจอใน canvas เลื่อนตาม (hudTY)', g['mn']['t'] >= g['hud']['b'] + 2 and g['topb']['t'] > g['mn']['b'] and g['ty'] > 40, json.dumps({'hud_b': g['hud']['b'], 'mn_t': g['mn']['t'], 'topb_t': g['topb']['t'], 'ty': g['ty']}))
        rep('แตะทะลุการ์ดลงสนามได้ (ยกเว้นรูปตัวละคร)', g['hit'] == 'c' and g['por'] == 'hpor', json.dumps([g['hit'], g['por']]))
        bx = await A.pg.locator('#hpor').bounding_box()
        await A.pg.mouse.click(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2); await A.wait(500)
        pn = await A.ev("()=>!ov.hidden&&ov.querySelector('.pn')&&ov.querySelector('.pn').dataset.pn")
        rep('แตะรูปตัวละครบนการ์ด → เปิดหน้าตัวละคร', pn == 'char', str(pn))
        await A.ev(CLOSE)
        Hc = g['H']
        # ---------- สลับเป็นแถบเต็มจากหน้าตั้งค่า ----------
        await A.ev("()=>{ov.hidden=false;cfgUI()}"); await A.wait(500)
        st = await A.ev("()=>{const c=ov.querySelector('.hudcs');return c?[...c.querySelectorAll('button')].map(b=>[b.dataset.hudc,b.classList.contains('on')]):null}")
        await A.pg.locator('[data-hudc="0"]').click(); await A.wait(700)
        st2 = await A.ev("()=>({on:document.body.classList.contains('hudc'),ls:localStorage.getItem('refugee_hudc'),H,btn:[...ov.querySelectorAll('.hudcs button')].map(b=>b.classList.contains('on')),pos:getComputedStyle($('hud')).position,ty:hudTY(),mnm:getComputedStyle($('mn')).marginTop})")
        rep('ตั้งค่า › แถบสถานะ: มีตัวเลือก 2 แบบ · กด «แถบเต็มด้านบน» → กลับเป็นแบบเดิม (สนามเตี้ยลงเท่าเดิม)', st == [['1', True], ['0', False]] and not st2['on'] and st2['ls'] == '0' and st2['pos'] != 'absolute' and st2['H'] < Hc - 30 and st2['ty'] == 0 and st2['mnm'] == '0px' and st2['btn'] == [False, True], json.dumps([st, st2, Hc]))
        await A.pg.reload(); await A.wait(2500)
        await A.ev(SETUP, ['melee', 'Ann', 60]); await A.wait(1500)
        k = await A.ev("()=>({on:document.body.classList.contains('hudc'),H})")
        rep('จำค่าในเครื่อง: เปิดเกมใหม่ยังเป็นแถบเต็ม', not k['on'], json.dumps(k))
        await A.ev("()=>{hudcSet(true)}"); await A.wait(600)
        k2 = await A.ev("()=>({on:document.body.classList.contains('hudc'),H,ls:localStorage.getItem('refugee_hudc')})")
        rep('สลับกลับเป็นการ์ดเล็ก → สนามสูงขึ้นอีกครั้ง', k2['on'] and k2['H'] > k['H'] + 30 and k2['ls'] == '1', json.dumps([k, k2]))
        # ---------- บอส: แถบเลือดบอสอยู่ใต้การ์ด ----------
        await A.ev(CLOSE)
        await A.ev("()=>{enterMap(2,{x:MAPS[2].boss.x,y:MAPS[2].boss.y+200})}"); await A.wait(2500)
        await A.ev("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};bossCd=1e9;spawnBoss()}"); await A.wait(2500)
        bb = await A.ev("""()=>{const cv=$('c'),cr=cv.getBoundingClientRect(),hr=$('hud').getBoundingClientRect(),k=cr.height/H;const by=12+hudTY();return{barTop:Math.round(cr.top+by*k),hudBottom:Math.round(hr.bottom),boss:mons.some(m=>m.t===3)}}""")
        rep('แถบเลือดบอสวาดใต้การ์ด ไม่ทับกัน', bb['boss'] and bb['barTop'] >= bb['hudBottom'], json.dumps(bb))
        await A.pg.screenshot(path='/home/claude/promo3/hud/t474_boss.png')
        # ---------- เมนูยังพอดีจอ ----------
        await A.ev(CLOSE); await A.ev("()=>{try{gmSet(false,1)}catch(e){}}")
        await A.pg.locator('#mn').click(); await A.wait(400)
        mm = await A.ev("()=>{const M=$('mnp'),r=M.getBoundingClientRect(),h=$('hud').getBoundingClientRect(),m=$('mn').getBoundingClientRect();return{fit:M.scrollHeight<=M.clientHeight+2,top:Math.round(r.top),mnb:Math.round(m.bottom),hb:Math.round(h.bottom)}}")
        rep('เปิดเมนู: แผ่นเมนูเริ่มใต้ปุ่มเมนู และยังพอดีจอไม่ต้องเลื่อน', mm['fit'] and mm['top'] >= mm['mnb'] - 2, json.dumps(mm))
        errs = [e for e in A.errs if not e.startswith('console')]
        rep('ไม่มี error', not errs, str(errs[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed' % (sum(1 for r in R if r[1]), len(R)))
asyncio.run(main())
