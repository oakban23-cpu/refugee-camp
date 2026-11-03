"""v576 ภาพหน้า NPC ในกล่องบทพูด
   ① ไฟล์ภาพ 24 ไฟล์เสิร์ฟได้ (image/webp)  ② บทพูดของ cmd → วงกลมเป็นภาพ + ภาพครึ่งตัวขึ้น · til43 ใช้ภาพ til
   ③ คนที่ไม่มีภาพ (nar/me/hnt) → อีโมจิเดิม ไม่มีภาพครึ่งตัว  ④ ปิดบทพูด → ภาพซ่อน  ⑤ ภาพจอแนวตั้ง/แนวนอน  ⑥ ไม่มี error"""
import asyncio, sys, random, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R = []
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
K = ['qn','cmd','cel','til','sara','ast','eda','thu','navin','ves','lir','ked','hnt','kn','grif','nox','cas','lum','brom','mek','hed','orr','gem','leo']
LINES = "[['cmd','ฟื้นแล้วรึ เจ้าหมดสติอยู่หน้าประตูค่าย'],['nar','สามร้อยปีก่อน...'],['til43','ตรงนั้นแหละที่ข้าเห็น!'],['god','...ผู้ถือตรา...'],['lum2','ระวังคลื่นจากดาวแคระนะ!']]"
ST = """async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));await w(900);const d=$('sdlg'),p=d.querySelector('.sdp'),b=document.getElementById('sdbust');
  const r=b&&b.getBoundingClientRect(),dr=d.getBoundingClientRect();return {key:SD.q[SD.i]&&SD.q[SD.i][0],cls:p.classList.contains('npcp'),img:!!p.querySelector('img'),src:p.querySelector('img')&&p.querySelector('img').getAttribute('src'),txt:p.textContent,bust:!!b&&b.classList.contains('on'),bsrc:b&&b.dataset.k,bh:r?Math.round(r.height):0,above:r?Math.round(dr.top-r.bottom):null}}"""
async def main():
    p = start_server()
    try:
        bad = []
        for k in K:
            for n in ('npc-', 'npcf-'):
                try:
                    with urllib.request.urlopen(URL.rstrip('/') + '/' + n + k + '.webp') as r:
                        if r.status != 200 or r.headers.get('Content-Type') != 'image/webp' or len(r.read()) < 2000: bad.append(n + k)
                except Exception as e: bad.append(n + k + ':' + str(e)[:40])
        rep('ภาพ 24 ไฟล์เสิร์ฟได้ (image/webp)', not bad, bad)
        async with async_playwright() as pw:
            b = await pw.chromium.launch(); errs = []
            for nm, vp, dsf in (('port', {'width': 393, 'height': 864}, 2), ('land', {'width': 1280, 'height': 600}, 1)):
                ctx = await b.new_context(viewport=vp, device_scale_factor=dsf)
                pg = await ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
                await pg.goto(URL); await pg.wait_for_timeout(2500)
                await pg.evaluate(SETUP, ['mage', 'Pt' + str(random.randint(100, 999)), 60]); await pg.wait_for_timeout(1500)
                await pg.evaluate("()=>{ov.hidden=true;banner=null;enterMap(1,{x:CX,y:CY+80})}"); await pg.wait_for_timeout(3500)
                await pg.evaluate("()=>{ov.hidden=true;stSay(" + LINES + ",()=>{window.__sdDone=1})}")
                S = []
                for i in range(5):
                    s = await pg.evaluate(ST); S.append(s)
                    if i == 0: await pg.screenshot(path=f'np/v576_{nm}_cmd.jpg', type='jpeg', quality=78)
                    if i == 4: await pg.screenshot(path=f'np/v576_{nm}_lum.jpg', type='jpeg', quality=78)
                    await pg.evaluate("()=>{if(SD.typ){clearInterval(SD.typ);SD.typ=null;SD.ch=SD.tx.length;$('sdlg').querySelector('.sdt').textContent=SD.tx;stReady()}stNext()}"); await pg.wait_for_timeout(200)
                    await pg.evaluate("()=>{if(SD.on&&!$('sdlg').classList.contains('rd')){}}")
                c, n_, t, h_, q = S
                rep(f'[{nm}] cmd: วงกลมเป็นภาพ + ภาพครึ่งตัวยืนเหนือกล่อง', c['cls'] and c['src'] == 'npcf-cmd.webp' and c['bust'] and c['bsrc'] == 'cmd' and c['bh'] > 100 and c['above'] is not None and abs(c['above']) <= 12, c)
                rep(f'[{nm}] nar/hnt: อีโมจิเดิม ไม่มีภาพครึ่งตัว · til43 ใช้ภาพ til · lum2 ใช้ภาพ lum', not n_['cls'] and n_['txt'] and not n_['bust'] and not h_['cls'] and not h_['bust'] and t['src'] == 'npcf-til.webp' and t['bust'] and q['bsrc'] == 'lum' and q['bust'], [n_, t, h_, q])
                e = await pg.evaluate("async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));try{stClose()}catch(e){}await w(400);const b=document.getElementById('sdbust');return {sd:SD.on,bust:!!b&&b.classList.contains('on'),hid:$('sdlg').hidden}}")
                rep(f'[{nm}] ปิดบทพูด → ภาพซ่อน', not e['bust'] and e['hid'], e)
                await ctx.close()
            rep('ไม่มี error ในหน้าเกม', not errs, errs[:4])
    finally:
        p.terminate()
    print('SUMMARY', sum(1 for r in R if r[1]), '/', len(R))
asyncio.run(main())
