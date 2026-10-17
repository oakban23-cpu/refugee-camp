"""v427 ตู้เสื้อผ้าโฉมใหม่"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, info, flush=True)
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Wd','melee',90)
        await A.ev("()=>{const W=wdrSt();['bon','fir','phr','skr'].forEach(i=>W.o[i]=1);delete W.o.ice;delete W.o.hrt;W.s={};W.th=3;GPV.wt='set';GPV.pf=null;GPV.pp=null;wardrobeUI()}")
        await A.wait(600)
        g=await A.ev("()=>{const T=[...document.querySelectorAll('.w2t')];const r=$('w2g').getBoundingClientRect();return{n:T.length,img:T.filter(t=>{const i=t.querySelector('img');return i&&i.src.startsWith('data:image/png')}).length,lock:T.filter(t=>t.classList.contains('lock')).length,own:T.filter(t=>t.classList.contains('own')).length,cols:getComputedStyle($('w2g')).gridTemplateColumns.split(' ').length,sw:document.documentElement.scrollWidth,vw:innerWidth,pv:!!$('gpv'),d:$('w2d').innerText}}")
        rep('ตารางไอคอน 4 คอลัมน์ ครบทุกชุด มีรูปวาดทุกช่อง',g['n']==await A.ev("()=>WDR.length") and g['img']==g['n'] and g['cols']==4,json.dumps(g,ensure_ascii=False)[:200])
        rep('ชุดที่ยังไม่มี = สีเทา+🔒 · มีแล้ว = ขอบทอง',g['own']==5 and g['lock']==g['n']-5)
        rep('ไม่มีอะไรล้นจอแนวนอน',g['sw']<=g['vw'],str([g['sw'],g['vw']]))
        rep('ยังไม่เลือก: แถบบอกให้แตะไอคอน','แตะไอคอน' in g['d'])
        # ---- เลื่อนรายการ: พรีวิวยังอยู่บนจอ และหดลง ----
        h0=await A.ev("()=>$('gpv').getBoundingClientRect().height")
        sc=await A.ev("()=>{const G=$('w2g');G.scrollTop=400;return new Promise(r=>setTimeout(()=>{const c=$('gpv').getBoundingClientRect();r({top:c.top,h:c.height,st:G.scrollTop,ov:ov.scrollTop})},600))}")
        rep('เลื่อนเฉพาะตาราง พรีวิวตรึงอยู่บนจอ',sc['st']>100 and sc['top']>0 and sc['top']<200 and sc['ov']==0,json.dumps(sc))
        rep('เลื่อนลงแล้วพรีวิวหดลง',sc['h']<h0*.75,str([h0,sc['h']]))
        # ---- แตะ = ลองใส่ ----
        t=await A.ev("()=>{document.querySelector('[data-w2=\"ice\"]').click();return{pf:GPV.pf,lb:(document.querySelector('#w2pv .lb')||{}).innerText||'',d:$('w2d').innerText,btn:!!$('w2d').querySelector('button'),sel:!!document.querySelector('.w2t.sel[data-w2=\"ice\"]'),st:$('w2g').scrollTop,sm:$('w2').classList.contains('w2sm')}}")
        rep('แตะชุดที่ยังไม่มี → พรีวิวใส่ให้ดู + บอกวิธีหา (ไม่มีปุ่มใส่)',t['pf']=='ice' and '🔒' in t['lb'] and 'วิหารน้ำแข็ง' in t['d'] and not t['btn'] and t['sel'],json.dumps(t,ensure_ascii=False))
        rep('แตะแล้วตำแหน่งเลื่อนไม่กระโดดกลับบนสุด',t['st']>100 and t['sm'],json.dumps([t['st'],t['sm']]))
        L=await A.ev("()=>gpvLook()")
        rep('พรีวิววาดชุดที่เลือก',L['h']==33 and L['fa']==3,json.dumps(L))
        # ---- ‹ › ----
        nv=await A.ev("()=>{const ids=WDR.map(o=>o.id),i=ids.indexOf('ice');document.querySelector('[data-w2n=\"1\"]').click();const a=GPV.pf;document.querySelector('[data-w2n=\"-1\"]').click();document.querySelector('[data-w2n=\"-1\"]').click();return[a,GPV.pf,ids[i+1],ids[i-1]]}")
        rep('ปุ่ม ‹ › ไล่ดูทีละชุด',nv[0]==nv[2] and nv[1]==nv[3],json.dumps(nv))
        # ---- แลกด้วยด้าย ----
        ex=await A.ev("()=>{wdrSt().th=12;document.querySelector('[data-w2=\"hrt\"]').click();const b=$('w2d').querySelector('[data-wdb=\"hrt\"]');if(!b)return'nobtn';b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));b.click();return{own:!!wdrSt().o.hrt,sel:GPV.pf,btn:!!$('w2d').querySelector('[data-wdo=\"hrt\"]')}}")
        rep('ชุดกิจกรรม: แลกด้วยด้ายจากแถบรายละเอียด แล้วขึ้นปุ่มใส่ทั้งชุด',isinstance(ex,dict) and ex['own'] and ex['sel']=='hrt' and ex['btn'],json.dumps(ex))
        # ---- แท็บช่อง + ใส่ + แตะซ้ำเพื่อใส่ ----
        sl=await A.ev("()=>{document.querySelector('[data-wdt=\"h\"]').click();const T=[...document.querySelectorAll('.w2t')].map(t=>t.dataset.w2);document.querySelector('[data-w2=\"fir\"]').click();const b=$('w2d').querySelector('[data-wds=\"h:fir\"]');b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));b.click();return{first:T[0],ownFirst:T.slice(0,7),s:Object.assign({},wdrSt().s),sel:GPV.pp&&GPV.pp.id,d:$('w2d').innerText,tab:document.querySelector('#w2s [data-wdt=\"h\"]').innerText}}")
        rep('แท็บหมวก: ช่องแรก «ของจริง» และชิ้นที่มีขึ้นก่อน',sl['first']=='' and set(sl['ownFirst'][1:6])=={'ref','bon','fir','phr','skr'} or set(sl['ownFirst'][1:7])>={'ref','bon','fir','phr','skr'},json.dumps(sl['ownFirst']))
        rep('กดใส่ → ใส่จริง และยังเลือกชิ้นเดิมไว้ (ขึ้น ✓ ใส่อยู่)',sl['s'].get('h')=='fir' and sl['sel']=='fir' and 'ใส่อยู่' in sl['d'],json.dumps(sl,ensure_ascii=False))
        rep('แถบช่องโชว์ไอคอนชิ้นแฟชั่นที่ใส่อยู่','🔥' in sl['tab'],sl['tab'])
        dt=await A.ev("()=>{const T=()=>document.querySelector('[data-w2=\"bon\"]');T().click();T().click();return{s:wdrSt().s.h,sel:GPV.pp&&GPV.pp.id}}")
        rep('แตะไอคอนซ้ำ = ใส่เลย',dt['s']=='bon' and dt['sel']=='bon',json.dumps(dt))
        rl=await A.ev("()=>{document.querySelector('[data-w2=\"\"]').click();const L=gpvLook(),real=lkc(me.eq.h);const lb=document.querySelector('#w2pv .lb').innerText;return{h:L.h,real,lb,worn:wdrSt().s.h}}")
        rep('แตะ «ของจริง» → พรีวิวโชว์หมวกจริง (ยังไม่ถอดแฟชั่นจนกดใช้)',rl['h']==rl['real'] and rl['worn']=='bon' and 'ของจริง' in rl['lb'],json.dumps(rl,ensure_ascii=False))
        # ---- ตัวกรอง ----
        fl=await A.ev("()=>{document.querySelector('[data-w2f=\"own\"]').click();const a=[...document.querySelectorAll('.w2t')].every(t=>t.classList.contains('own'));const na=document.querySelectorAll('.w2t').length;document.querySelector('[data-w2f=\"no\"]').click();const b=[...document.querySelectorAll('.w2t')].every(t=>t.classList.contains('lock'));const nb=document.querySelectorAll('.w2t').length;document.querySelector('[data-w2f=\"all\"]').click();return{a,b,na,nb,all:document.querySelectorAll('.w2t').length}}")
        rep('ตัวกรอง มีแล้ว / ยังไม่มี / ทั้งหมด',fl['a'] and fl['b'] and fl['na']+fl['nb']==fl['all'] and fl['na']>0 and fl['nb']>0,json.dumps(fl))
        # ---- ท่าทางในพรีวิว ----
        ps=await A.ev("()=>{document.querySelector('#w2pv [data-gpvp=\"run\"]').click();return[GPV.pose,document.querySelector('#w2pv [data-gpvp=\"run\"]').classList.contains('on')]}")
        rep('ปุ่มท่าทางเล็กในพรีวิว',ps==['run',True],json.dumps(ps))
        # ---- ย้อมสี ----
        dy=await A.ev("()=>{document.querySelector('[data-wdt=\"dye\"]').click();return{g:$('w2g').classList.contains('dy'),h:$('w2g').innerHTML.includes('ผสมสีย้อม'),pv:!!$('gpv'),f:!$('w2f').querySelector('[data-w2f]')}}")
        rep('แท็บ 🎨 ย้อมสี อยู่ในแถวเดียวกัน และพรีวิวยังอยู่',all(dy.values()),json.dumps(dy))
        # ---- รูปไอคอนแคช ----
        ca=await A.ev("()=>{document.querySelector('[data-wdt=\"set\"]').click();const n=WD2.th.size,t0=performance.now();wardrobeUI();return{n,dt:performance.now()-t0,n2:WD2.th.size}}")
        rep('ไอคอนแคชไว้ เปิดซ้ำเร็ว',ca['n2']==ca['n'] and ca['dt']<120,json.dumps(ca))
        # ---- หน้าอุปกรณ์ไม่กระทบ ----
        gr=await A.ev("()=>{ov.hidden=true;gearUI();return{w2:!!$('w2g'),gpv:!!$('gpv'),k:ov.dataset.k}}")
        rep('หน้าอุปกรณ์ยังเป็นแบบเดิม',not gr['w2'] and gr['gpv'],json.dumps(gr))
        await A.ev("()=>{ov.hidden=true}")
        await A.wait(400)
        await A.pg.screenshot(path='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/w2_end.png')
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('\nSUMMARY: %d / %d passed'%(sum(1 for r in R if r[1]),len(R)))
asyncio.run(main())
