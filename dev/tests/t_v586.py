"""v586 บัญชีเดียวทีละเครื่อง: ① เครื่อง A ล็อกอิน+เล่น lv 30 บันทึก ② เครื่อง B เปิดค้าง (โหลดตอนเริ่ม lv30) · A เล่นต่อเป็น lv 45 บันทึก
   ③ B กดเข้าตัวละคร → ดึงเซฟล่าสุด ได้ lv 45 (ไม่ใช่ 30) ④ A บันทึกต่อ → ถูกปฏิเสธ (sess) ขึ้นหน้าต่างแจ้ง หยุดบันทึก ⑤ เซฟบนเซิร์ฟเวอร์ไม่ถูก A ทับ
   ⑥ chBetter: ตัวจุติชนะตัวเลเวลสูง ⑦ ไม่มี error"""
import asyncio, sys, random, json, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
def api(act, o):
    req = urllib.request.Request(URL.rstrip('/') + '/api/acc/' + act, data=json.dumps(o).encode(), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r: return json.loads(r.read())
    except urllib.error.HTTPError as e: return json.loads(e.read() or b'{}')
LOGIN = """async([a,pin,reg])=>{document.getElementById('ttl')&&document.getElementById('ttl').remove();localStorage.setItem('refugee_tut','1');localStorage.setItem('refugee_wn','v586');
  const w=ms=>new Promise(r=>setTimeout(r,ms));let k=0;while(saveMode==='wait'&&k<60){await w(100);k++}
  const r=await accApi(reg?'register':'login',{a,pin});ACC={a,t:r.t};accStore();accRev=r.rev|0;if(!reg)await accLoad();else accLoaded=true;return {ok:r.ok,rev:r.rev,mode:saveMode,srv:srvAcc(),chars:Object.keys(saves.chars)}}"""
PLAY = """async([slot,lv])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));pick('mage',slot||'','Sync');let k=0;while(!me.cls&&k<80){await w(100);k++}await w(300);window.PRO_ON=0;ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}
  if(lv)gmSetLv(lv);await w(200);await writeSave();await w(1600);await accPush();return {lv:me.lv,slot:me.slot,sid:ASES.sid,rev:accRev}}"""
async def main():
    p = start_server()
    try:
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            A = await (await b.new_context(viewport={'width': 900, 'height': 700})).new_page(); A.on('pageerror', lambda e: errs.append('A:' + str(e)[:200]))
            B = await (await b.new_context(viewport={'width': 900, 'height': 700})).new_page(); B.on('pageerror', lambda e: errs.append('B:' + str(e)[:200]))
            acc = 'sync' + str(random.randint(1000, 9999))
            await A.goto(URL); await A.wait_for_timeout(2500)
            la = await A.evaluate(LOGIN, [acc, '1234', 1])
            a1 = await A.evaluate(PLAY, ['', 30])
            rep('A: ล็อกอิน+เล่น lv30 บันทึกขึ้นเซิร์ฟเวอร์', la['ok'] and a1['lv'] == 30 and a1['sid'], [la, a1])
            await B.goto(URL); await B.wait_for_timeout(2500)
            lb = await B.evaluate(LOGIN, [acc, '1234', 0])
            slot = a1['slot']
            bl = await B.evaluate(f"()=>saves.chars['{slot}']&&saves.chars['{slot}'].lv")
            await A.evaluate("async()=>{gmSetLv(45);await new Promise(r=>setTimeout(r,200));await writeSave();await new Promise(r=>setTimeout(r,1600));await accPush()}")
            bl2 = await B.evaluate(f"()=>saves.chars['{slot}']&&saves.chars['{slot}'].lv")
            rep('B เปิดค้าง: ยังเห็น lv30 (ยังไม่กดเข้า) · A เล่นต่อถึง lv45', bl == 30 and bl2 == 30, [bl, bl2])
            b1 = await B.evaluate(f"async()=>{{const w=ms=>new Promise(r=>setTimeout(r,ms));pick('mage','{slot}','Sync');let k=0;while(!me.cls&&k<80){{await w(100);k++}}await w(500);return {{lv:me.lv,sid:ASES.sid}}}}")
            rep('B กดเข้าตัวละคร → ดึงเซฟล่าสุด ได้ lv45', b1['lv'] == 45 and b1['sid'], b1)
            k = await A.evaluate("async()=>{gmSetLv(31);await new Promise(r=>setTimeout(r,200));await writeSave();await new Promise(r=>setTimeout(r,1700));await accPush();await new Promise(r=>setTimeout(r,300));return {kick:ASES.kick,box:!!document.getElementById('asesk')}}")
            rep('A บันทึกต่อ → ถูกปฏิเสธ ขึ้นหน้าต่าง "เล่นจากอีกเครื่อง" หยุดบันทึก', k['kick'] == 1 and k['box'], k)
            await A.screenshot(path='np/v586_kick.jpg', type='jpeg', quality=80)
            srv = api('load', {'a': acc, 't': (await B.evaluate("()=>ACC.t"))})
            lvs = srv.get('data', {}).get('chars', {}).get(slot, {}).get('lv')
            rep('เซฟบนเซิร์ฟเวอร์ยังเป็น lv45 (A ไม่ทับ)', lvs == 45, lvs)
            await B.evaluate("async()=>{gmSetLv(50);await new Promise(r=>setTimeout(r,200));await writeSave();await new Promise(r=>setTimeout(r,1700));await accPush()}")
            srv2 = api('load', {'a': acc, 't': (await B.evaluate("()=>ACC.t"))})
            rep('B (เครื่องล่าสุด) บันทึกต่อได้ปกติ lv50', srv2.get('data', {}).get('chars', {}).get(slot, {}).get('lv') == 50, srv2.get('rev'))
            c = await B.evaluate("()=>[chBetter({rb:1,lv:5,xp:0},{rb:0,lv:99,xp:9}),chBetter({rb:0,lv:99,xp:0},{rb:1,lv:5,xp:0}),chBetter({lv:40,xp:0},{lv:30,xp:9})]")
            rep('ตัวจุติชนะตัวเลเวลสูง · ไม่จุติเทียบเลเวล', c == [True, False, True], c)
            rep('ไม่มี error', not errs, errs[:3])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
