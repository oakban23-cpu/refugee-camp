"""v491 ปุ่มเต็มจอ: ปุ่ม ⛶ ในกล่องปุ่มเสียง · กดเข้า/ออก · จำค่า + แตะครั้งแรกเข้าเอง · ออกเอง = ลืมค่า · แถวในตั้งค่า · iPhone/ไม่รองรับ/standalone · จอแนวนอนไม่ทับกัน · ไม่มี error"""
import asyncio, sys, random
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
BOX="""()=>{const r=e=>{if(!e||e.hidden)return null;const q=e.getBoundingClientRect();return q.width?[Math.round(q.left),Math.round(q.top),Math.round(q.right),Math.round(q.bottom)]:null};
  const a=$('aud'),c=cv.getBoundingClientRect();return {aud:r(a),sb:r($('sb')),mub:r($('mub')),fsb:r($('fsb')),u6:r($('u64b')),tm:r($('tmh')),cv:[Math.round(c.left),Math.round(c.top),Math.round(c.right),Math.round(c.bottom)],
  n:a?a.querySelectorAll('button').length:0,svg:!!($('fsb')&&$('fsb').querySelector('svg.u58i path')),vw:VW.on,sh:VW.sh,k:VW.k,uz:VW.uz}}"""
def ov(a,b):
    return a and b and a[0]<b[2]-1 and b[0]<a[2]-1 and a[1]<b[3]-1 and b[1]<a[3]-1
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Fs'+str(random.randint(100,999)),'melee',30)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;try{$('tipc').remove()}catch(e){}}")
        await A.wait(600)
        # ===== ปุ่มอยู่ในกล่องปุ่มเสียง =====
        bx=await A.ev(BOX)
        w=lambda r:r[2]-r[0] if r else 0
        rep('ปุ่ม ⛶ เป็นปุ่มที่ 3 ในกล่องปุ่มเสียงใต้แผนที่เล็ก · ไอคอนทอง SVG · ขนาดใกล้ปุ่มเสียง · ไม่ทับกัน',
            bx['n']==3 and bx['svg'] and bx['fsb'] and abs(w(bx['fsb'])-w(bx['sb']))<=3 and w(bx['fsb'])>=24 and not ov(bx['fsb'],bx['mub']) and not ov(bx['sb'],bx['mub'])
            and bx['fsb'][2]<=bx['cv'][2] and bx['fsb'][1]==bx['sb'][1], bx)
        # ===== กดปุ่ม → เต็มจอ · กดอีก → ออก =====
        pre=await A.ev("()=>({can:fsCan(),stand:fsStand(),el:!!fsEl(),pref:localStorage.getItem('refugee_fs')})")
        await A.pg.click('#fsb');on=await waitc(A,"()=>!!fsEl()&&{el:fsEl().tagName,pref:localStorage.getItem('refugee_fs'),lab:$('fsb').getAttribute('aria-label'),on:$('fsb').classList.contains('on'),ic:$('fsb').innerHTML.indexOf('M9 3.5V9H3.5')>=0}",ms=3000)
        await A.wait(500);fit=await A.ev("()=>{const c=cv.getBoundingClientRect();return {iw:innerWidth,ih:innerHeight,cw:Math.round(c.width),ch:Math.round(c.height)}}")
        await A.pg.click('#fsb');off=await waitc(A,"()=>!fsEl()&&{pref:localStorage.getItem('refugee_fs'),lab:$('fsb').getAttribute('aria-label'),on:$('fsb').classList.contains('on')}",ms=3000)
        await A.wait(700);pref2=await A.ev("()=>localStorage.getItem('refugee_fs')")
        rep('กด ⛶ → เข้าเต็มจอ (จำค่า · ไอคอนเปลี่ยนเป็นหุบเข้า · ป้าย «ออกจากเต็มจอ») · กดอีกที → ออก (ลืมค่า)',
            pre['can'] and not pre['stand'] and on and on['pref']=='1' and on['lab']=='ออกจากเต็มจอ' and on['on'] and on['ic'] and off and off['lab']=='เต็มจอ' and not off['on'] and pref2=='0', [pre,on,fit,off,pref2])
        # ===== จำค่า: เปิดเกมใหม่ → แตะจอครั้งแรกเข้าเต็มจอเอง =====
        ctx2=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
        await ctx2.add_init_script("try{if(!sessionStorage.getItem('__fsi')){sessionStorage.setItem('__fsi','1');localStorage.setItem('refugee_fs','1')}}catch(e){}")
        pg2=await ctx2.new_page();B=Client(ctx2,pg2,'B');pg2.on('pageerror',lambda e:B.errs.append(str(e)[:300]))
        await pg2.goto(URL);await B.wait(2500)
        arm=await B.ev("()=>({arm:FSV.arm,el:!!fsEl(),btn:!!$('fsb')})")
        await pg2.mouse.click(30,300);re=await waitc(B,"()=>!!fsEl()&&{arm:FSV.arm,pref:localStorage.getItem('refugee_fs')}",ms=3000)
        rep('เคยเปิดเต็มจอไว้ → เปิดเกมใหม่ แตะจอครั้งแรกเข้าเต็มจอให้เอง', arm['arm'] and not arm['el'] and re and not re['arm'] and re['pref']=='1' and not B.errs, [arm,re,B.errs[:2]])
        await ctx2.close()
        await A.pg.click('#fsb');await waitc(A,"()=>!!fsEl()",ms=2000);await A.wait(300)
        # ===== ออกเอง (Esc/ปัดกลับ) ตอนหน้ายังเปิดอยู่ = ลืมค่า · ไม่เข้าเองอีก =====
        await A.ev("()=>document.exitFullscreen()");await waitc(A,"()=>!fsEl()",ms=2000);await A.wait(800)
        esc=await A.ev("()=>({pref:localStorage.getItem('refugee_fs'),arm:FSV.arm})")
        await A.pg.mouse.click(180,420);await A.wait(600);esc2=await A.ev("()=>!!fsEl()")
        rep('ออกจากเต็มจอเอง (Esc/ปุ่มย้อนกลับ) → ลืมค่า · แตะจอต่อไม่เข้าเต็มจอเอง', esc['pref']=='0' and not esc['arm'] and not esc2, [esc,esc2])
        # ===== หลุดเพราะสลับแอป (หน้าซ่อน) = ยังจำ · กลับมาแตะ = เข้าใหม่ =====
        await A.pg.click('#fsb');await waitc(A,"()=>!!fsEl()",ms=2000)
        await A.ev("()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>'hidden'});document.exitFullscreen()}");await waitc(A,"()=>!fsEl()",ms=2000);await A.wait(700)
        hid=await A.ev("()=>({pref:localStorage.getItem('refugee_fs'),arm:FSV.arm})")
        await A.ev("()=>{delete document.visibilityState;document.dispatchEvent(new Event('visibilitychange'))}");await A.wait(200)
        await A.pg.mouse.click(180,420);back=await waitc(A,"()=>!!fsEl()",ms=2500)
        rep('หลุดเต็มจอเพราะสลับแอป → ยังจำค่า · กลับมาแตะจอครั้งแรกเข้าเต็มจอใหม่', hid['pref']=='1' and hid['arm'] and back, [hid,back])
        await A.pg.click('#fsb');await waitc(A,"()=>!fsEl()",ms=2000);await A.wait(500)
        # ===== แถวในตั้งค่า =====
        st=await A.ev("""async()=>{cfgUI();const row=ov.querySelector('[data-fsrow]');if(!row)return {row:false};const cap=row.parentNode.querySelector('.cap').textContent,b=row.querySelector('button'),t0=b.textContent;return {row:true,cap,t0,inCard:/คุณภาพภาพ/.test(cap)}}""")
        await A.pg.click('#ov [data-fsrow] button');st2=await waitc(A,"()=>!!fsEl()&&{t:document.querySelector('#ov [data-fsrow] button').textContent,on:document.querySelector('#ov [data-fsrow] button').classList.contains('on')}",ms=2500)
        await A.pg.click('#ov [data-fsrow] button');st3=await waitc(A,"()=>!fsEl()&&document.querySelector('#ov [data-fsrow] button').textContent==='ปิด'&&'ปิด'",ms=2500)
        await A.ev("()=>{cfgUI();cfgUI()}");n=await A.ev("()=>ov.querySelectorAll('[data-fsrow]').length")
        await A.ev("()=>{ov.hidden=true}")
        rep('ตั้งค่า → 🖥️ คุณภาพภาพ มีแถว «⛶ เต็มจอ» กดเปิด/ปิดได้ ป้ายตรงสถานะ · เปิดหน้าซ้ำไม่ซ้อนแถว', st['row'] and st['inCard'] and st['t0']=='ปิด' and st2 and st2['t']=='เปิด' and st2['on'] and st3=='ปิด' and n==1, [st,st2,st3,n])
        # ===== iPhone / เบราว์เซอร์ไม่รองรับ =====
        ios=await A.ev("""async()=>{const c0=fsCan,i0=fsIOS;fsCan=()=>false;fsIOS=()=>true;let req=0;const q=document.documentElement.requestFullscreen;document.documentElement.requestFullscreen=function(){req++;return q.apply(this,arguments)};
          $('fsb').click();await new Promise(r=>setTimeout(r,300));const card=$('fsios'),txt=card?card.textContent:'';if(card)card.querySelector('button').click();await new Promise(r=>setTimeout(r,100));
          fsIOS=()=>false;$('fsb').click();await new Promise(r=>setTimeout(r,200));const card2=!!$('fsios');fsCan=c0;fsIOS=i0;document.documentElement.requestFullscreen=q;
          return {card:!!card,home:/หน้าจอโฮม/.test(txt),gone:!$('fsios'),req,el:!!fsEl(),card2,pref:localStorage.getItem('refugee_fs')}}""")
        rep('iPhone (ไม่มีเต็มจอในเบราว์เซอร์): กด ⛶ ขึ้นการ์ดวิธี «เพิ่มไปยังหน้าจอโฮม» ปิดได้ · เบราว์เซอร์อื่นที่ไม่รองรับ = แจ้งข้อความ ไม่เรียกเต็มจอ', ios['card'] and ios['home'] and ios['gone'] and ios['req']==0 and not ios['el'] and not ios['card2'] and ios['pref']=='0', ios)
        # ===== เบราว์เซอร์ปฏิเสธ (เช่นในกรอบหน้าอื่น) =====
        rj=await A.ev("""async()=>{const q=document.documentElement.requestFullscreen;document.documentElement.requestFullscreen=()=>Promise.reject(new TypeError('denied'));$('fsb').click();await new Promise(r=>setTimeout(r,300));document.documentElement.requestFullscreen=q;
          return {pref:localStorage.getItem('refugee_fs'),el:!!fsEl(),arm:FSV.arm}}""")
        rep('เบราว์เซอร์ปฏิเสธเต็มจอ → ไม่ค้าง ไม่จำค่า', rj['pref']=='0' and not rj['el'] and not rj['arm'], rj)
        # ===== เปิดจากไอคอนหน้าจอโฮมแล้ว (standalone) → ซ่อนปุ่ม กล่องกลับขนาดเดิม =====
        sa=await A.ev("""async()=>{const w0=$('aud').getBoundingClientRect().width,s0=fsStand;fsStand=()=>true;fsSync();await new Promise(r=>setTimeout(r,50));const w1=$('aud').getBoundingClientRect().width,h=$('fsb').hidden,sb=$('sb').getBoundingClientRect().width;
          cfgUI();const row=!!ov.querySelector('[data-fsrow]');ov.hidden=true;fsStand=s0;fsSync();await new Promise(r=>setTimeout(r,50));return {w0:Math.round(w0),w1:Math.round(w1),h,sb:Math.round(sb),row,w2:Math.round($('aud').getBoundingClientRect().width),h2:$('fsb').hidden}}""")
        rep('เปิดแบบแอป (จากไอคอนหน้าจอโฮม) → ซ่อนปุ่ม ⛶ และแถวในตั้งค่า · กล่องปุ่มเสียงกลับกว้างเท่าเดิม', sa['h'] and not sa['row'] and sa['w1']<sa['w0']*.75 and sa['sb']>=26 and not sa['h2'] and sa['w2']==sa['w0'], sa)
        # ===== จอแนวนอน: ไม่ทับปุ่มเดินไว/ป้ายแผนที่สมบัติ/แผนที่เล็ก =====
        L=[]
        for vp in ({'width':844,'height':390},{'width':788,'height':288},{'width':1440,'height':900}):
            await A.pg.set_viewport_size(vp);await A.wait(900)
            await A.ev("()=>{try{const b=$('u64b');if(b)b.hidden=false}catch(e){}}")
            await A.wait(700)
            q=await A.ev(BOX);mm=None
            if q['cv']:
                kk=(q['cv'][2]-q['cv'][0])/await A.ev("()=>SW0")
                mm=[round(q['cv'][2]-94*kk),round(q['cv'][1]+8*kk),round(q['cv'][2]-2*kk),round(q['cv'][1]+104*kk)]
            bad=[n for n,o in (('u6',q['u6']),('tm',q['tm']),('mm',mm)) if ov(q['aud'],o)]
            L.append({'vp':vp['width'],'sh':q['sh'],'aud':q['aud'],'fsb':q['fsb'],'sb':q['sb'],'bad':bad,'w':w(q['fsb']),'in':q['aud'] and q['aud'][0]>=q['cv'][0] and q['aud'][2]<=q['cv'][2]+1})
        await A.pg.set_viewport_size({'width':390,'height':844});await A.wait(700)
        rep('จอแนวนอน (844×390 · 788×288 · 1440×900): กล่อง 3 ปุ่มไม่ทับแผนที่เล็ก/ปุ่มเดินไว/ป้ายแผนที่สมบัติ · ปุ่มกว้างพอกด', all(x['vw'] if 'vw' in x else True for x in L) and all(not x['bad'] and x['in'] and x['w']>=18 for x in L), L)
        E=[e for e in A.errs if 'ERR_TUNNEL' not in e and 'ERR_CONNECTION' not in e and 'icon-180' not in e]
        jE=await A.ev("()=>window.__err||[]")
        rep('ไม่มี error ในหน้าเกม', not E and not jE, [E[:3],jE[:3]])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
