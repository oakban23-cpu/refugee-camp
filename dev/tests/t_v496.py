"""v496 เพดานสเตตัส: ลดดาเมจเกิน 60% → เลือด · คริเกิน 100% → ดาเมจคริ 40% · ความเร็วโจมตีเพดาน +300% (แรงตีปกติชดเชย DPS เท่าเดิม) · ความเร็วเดินเพดานนุ่ม · หน้าสเตตัสบอกเพดาน · ฉายาทอง 4 อันมีผลจริง"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
SHOT='../v496/'
async def main():
    import os;os.makedirs(SHOT,exist_ok=True)
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Cp'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;window.DNH=12;try{$('tipc').remove()}catch(e){};me.ab={};me.ach={};TTBC.k='';me.eq={};me.cslot=['',''];me.cmv='';cardRecalc();recalc()}")
        # ===== ฉายาทอง 4 อัน =====
        t=await A.ev("""()=>{const b=[CAPS.M0('hp'),CAPS.M0('red'),CAPS.M0('sp'),maxHp()];['sexp','rexp','ast10','wexp'].forEach(i=>me.ach[i]=1);TTBC.k='';const a=[CAPS.M0('hp'),CAPS.M0('red'),CAPS.M0('sp'),maxHp()];const tx=ttSumTxt().join(' | ');['sexp','rexp','ast10','wexp'].forEach(i=>delete me.ach[i]);TTBC.k='';return {b,a,tx}}""")
        d=[round(t['a'][i]-t['b'][i],3) for i in range(3)]
        rep('ฉายาทอง 4 อัน (แผ่นดินเงา · รากพิภพ · ผู้จุดดาว · ฟ้าตะวันตก) ให้เลือด +13% ลดดาเมจ +4% ความเร็วเดิน +4% จริง · สรุปฉายาแสดงด้วย',d==[0.13,0.04,0.04] and t['a'][3]>t['b'][3] and 'เลือดสูงสุด' in t['tx'],[d,t['tx']])
        # ===== ลดดาเมจเกิน 60% → เลือด =====
        r=await A.ev("""()=>{me.ab={vit:200};TTBC.k='';const r0=CAPS.M0('red'),h0=M('hp'),hr0=CAPS.M0('hp');me.ab={vit:450};TTBC.k='';const r1=CAPS.M0('red'),h1=M('hp'),hr1=CAPS.M0('hp');return {r0,r1,ov0:h0-hr0,ov1:h1-hr1}}""")
        rep('ลดดาเมจรวมไม่ถึง 60% ไม่ได้เลือดเพิ่ม · เกิน 60% ส่วนเกินกลายเป็นเลือดสูงสุด 1:1',abs(r['ov0'])<1e-9 and abs(r['ov1']-(r['r1']-.6))<1e-9 and r['r1']>.6,r)
        dm=await A.ev("""()=>{gmGod=false;const take=()=>{const out=[];for(let i=0;i<5;i++){me.hp=me.mh;me.inv3=0;me.down=0;const h=me.hp;hurt(1000);out.push(h-me.hp)}out.sort((a,b)=>a-b);return out[2]};
          me.ab={vit:250};TTBC.k='';recalc();const a=take();me.ab={vit:450};TTBC.k='';recalc();const c=take();me.ab={vit:600};TTBC.k='';recalc();const e=take();gmGod=true;me.hp=me.mh;return {a,c,e,red:[.5,.9,1.2]}}""")
        rep('ดาเมจที่ได้รับยังตัดที่ 60% (ลดดาเมจ 90% กับ 120% โดนเท่ากัน = 40% ของดาเมจ)',dm['c']>0 and abs(dm['c']-dm['e'])<=1 and abs(dm['e']-400)<=2 and dm['a']>dm['e'],dm)
        # ===== คริเกิน 100% =====
        c=await A.ev("""()=>{me.ab={luk:300};TTBC.k='';const raw=crRaw(),d=crD()-(2+M('cdm'));me.ab={};TTBC.k='';return {raw,d,exp:(raw-1)*.4,cc:crC()}}""")
        rep('คริเกิน 100% → ดาเมจคริเพิ่ม 40% ของส่วนเกิน (เดิม 15%) · โอกาสคริยังตัดที่ 100%',c['raw']>1 and abs(c['d']-c['exp'])<1e-9,c)
        # ===== ความเร็วโจมตี =====
        a=await A.ev("""()=>{me.ab={agi:700};TTBC.k='';return {raw:asRaw(),m:M('as'),mul:asOvM(),aps:(1+M('as'))/CL.melee.cd}}""")
        rep('ความเร็วโจมตีเพดาน +300% · ส่วนเกินคิดเป็นตัวคูณแรงตีปกติ (1+ดิบ)/(1+3)',a['raw']>3 and a['m']==3 and abs(a['mul']-(1+a['raw'])/4)<1e-9 and abs(a['aps']-8)<1e-9,a)
        hit=await A.ev("""async()=>{mons=[];me.x=1600;me.y=1500;enterMap(2,{x:1600,y:1600});await new Promise(r=>setTimeout(r,2500));mons=[];
          const m={id:++mid,x:me.x+30,y:me.y,tx:me.x+30,ty:me.y,t:0,L:1,p:1,hx:me.x+30,hy:me.y,hp:1e12,mh:1e12,tg:null,tt:0,ac:0,w:null,lg:0};mons.push(m);
          const H=[];const _a=addHit;window.addHit=addHit=function(t,d,cr){if(t===m&&arguments.length<=3)H.push([performance.now(),d,cr]);return _a.apply(this,arguments)};
          me.cd=0;await new Promise(r=>setTimeout(r,2600));addHit=_a;window.addHit=_a;mons=mons.filter(q=>q!==m);
          const dt=(H.length>1?(H[H.length-1][0]-H[0][0])/1000:1);const nc=H.filter(h=>!h[2]);return {n:H.length,rate:(H.length-1)/dt,d:nc.length?nc[0][1]:0,pdx:pd()*asOvM(),pd:pd(),mul:asOvM()}}""")
        rep('ตีจริง: ความถี่ไม่เกินเพดาน (≤ 8 ครั้ง/วิ สำหรับดาบอสูร) และแรงต่อฮิต = ดาเมจ × ตัวคูณส่วนเกิน',hit['n']>=6 and hit['rate']<=8.8 and abs(hit['d']-hit['pdx'])/max(1,hit['pdx'])<.02,hit)
        await A.ev("()=>{me.ab={};TTBC.k='';recalc()}")
        # ===== ความเร็วเดิน =====
        s=await A.ev("""()=>{me.eq={b:{sl:'b',L:22,r:6,n:'test',st:{sp:.5},u:30}};const raw=spRaw(),m=M('sp');const r1={raw,m,exp:raw>1?1+(raw-1)*.5:raw};me.eq={};return r1}""")
        rep('ความเร็วเดินเกิน +100% ได้ครึ่งเดียว (เพดานนุ่ม)',s['raw']>1 and abs(s['m']-s['exp'])<1e-9,s)
        # ===== หน้าสเตตัส =====
        await A.ev("""()=>{me.ab={vit:420,luk:120,agi:600};me.eq={b:{sl:'b',L:22,r:6,n:'test',st:{sp:.5,ls:.3},u:30}};TTBC.k='';recalc();charTab='ab';ov.dataset.k='char';treeUI();ov.hidden=false}""");await A.wait(700)
        ui=await A.ev("""()=>{const t=ov.textContent;return {red:/ลดดาเมจ\\s*60%/.test(t),ls:/ดูดเลือด\\s*30%/.test(t),note:!!ov.querySelector('.capn'),lines:[...ov.querySelectorAll('.capn div')].map(d=>d.textContent),lock:ov.querySelectorAll('.capx').length}}""")
        await A.pg.screenshot(path=SHOT+'stat_panel.jpg',quality=80)
        rep('หน้าตัวละคร → สเตตัส: แสดงลดดาเมจ/ดูดเลือด + 🔒 ชนเพดาน + บรรทัดบอกส่วนเกินแปลงเป็นอะไร',ui['red'] and ui['ls'] and ui['note'] and ui['lock']>=2 and any('เลือดสูงสุด' in l for l in ui['lines']) and any('ตีปกติแรงขึ้น' in l for l in ui['lines']) and any('ความเร็วเดิน' in l for l in ui['lines']) and any('ดูดเลือด' in l for l in ui['lines']),ui)
        await A.ev("()=>{me.ab={};me.eq={};TTBC.k='';recalc();treeUI()}");await A.wait(300)
        ui2=await A.ev("()=>({note:!!ov.querySelector('.capn'),txt:ov.querySelector('.sk2top .tot')?ov.querySelector('.sk2top .tot').textContent:''})")
        rep('ไม่มีค่าไหนชนเพดาน → ไม่มีกล่องเพดาน แต่ยังเห็นค่าลดดาเมจ',not ui2['note'] and 'ลดดาเมจ' in ui2['txt'],ui2)
        await A.ev("()=>{ov.hidden=true}")
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
