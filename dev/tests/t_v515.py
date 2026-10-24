import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
MEAS="""([k,which,lq,T,thr])=>{const cv=document.createElement('canvas');cv.width=300;cv.height=300;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;let err='';const n0=NPV.n;NPV.err='';let e0=null;if(thr){e0=window.edaV;window.edaV=function(){throw new Error('x')}}
  try{c.setTransform(2,0,0,2,150,220);if(k==='nav'){(which==='old'?navinD.old:navinD)(0,0,1,T)}else{const d=NPC3[k].d;(which==='old'?d.old:d)(0,0,1,T)}}catch(e){err=String(e)}
  if(e0)window.edaV=e0;g=G0;LOWQ=L0;const d=c.getImageData(0,0,300,300).data;let n=0,y0=999,y1=-1,x0=999,x1=-1;for(let y=0;y<300;y++)for(let x=0;x<300;x++){const i=(y*300+x)*4;if(d[i+3]>200){n++;if(y<y0)y0=y;if(y>y1)y1=y;if(x<x0)x0=x;if(x>x1)x1=x}}
  let h=0;for(let i=0;i<d.length;i+=89)h=(h*31+d[i])>>>0;return {err,nerr:NPV.err,drawn:NPV.n-n0,n,hgt:y1-y0,wid:x1-x0,h}}"""
async def main():
    p=start_server();ok=0;bad=0
    def rep(n,c,d=''):
        nonlocal ok,bad
        if c: ok+=1
        else: bad+=1
        print(('✅' if c else '❌'),n,('' if c else d)[:900],flush=True)
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Nv'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("()=>[28,30,31,32,33,34,35,36,38].map(k=>!!(NPC3[k]&&NPC3[k].d&&NPC3[k].d.npv)).concat([!!navinD.npv,!!NPC3[27].d.npv])")
        rep('ติดตั้งครบ: ลิเรีย (27/28) · ทิล (30) · ยายเอดา (31/32/33) · ทิลเข็มทิศดาว (34) · บรอม (35) · ออร์รี (36) · กัปตันซารา/นาวิน (38)',all(r),json.dumps(r))
        res={};fails=[]
        for k in [28,30,31,32,34,35,36,38,'nav']:
            o=await A.ev(MEAS,[k,'old',1,10.4,0]);n=await A.ev(MEAS,[k,'new',1,10.4,0])
            res[k]=[o['hgt'],n['hgt'],o['n'],n['n']]
            big=k not in (36,38)
            if n['err'] or n['nerr'] or n['drawn']!=1 or n['h']==o['h'] or (big and (n['n']<o['n']*1.3 or (n['hgt']<o['hgt']*1.1 and n['n']<o['n']*1.8))) or (not big and n['n']<o['n']*.95): fails.append([k,o,n])
        rep('วาดแบบใหม่ได้ ไม่ error · ตัวใหญ่ขึ้น (พื้นที่ ≥1.3 เท่า และสูงขึ้น ≥1.1 เท่าหรือพื้นที่ ≥1.8 เท่า · ไม่นับแสงเรือง) (เท่า NPC ในค่าย) · ออร์รี/ซารา ขนาดเท่าเดิม เปลี่ยนลายเส้นให้เข้าชุด',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   สูง/พื้นที่ เดิม→ใหม่ (px@2x):',json.dumps(res))
        fails=[]
        for k in [28,30,31,32,33,34,35,36,38,'nav']:
            for lq,T in [(1,10.4),(0,13.9),(0,15.1)]:
                r=await A.ev(MEAS,[k,'new',lq,T,0])
                if r['err'] or r['nerr'] or r['n']<2000: fails.append([k,lq,T,r])
        rep('ทุกท่า/เวลา (โบกมือ · ส่องกล้อง · โคมไฟ) และโหมดประหยัด วาดได้ครบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        a=await A.ev(MEAS,[34,'new',0,10.4,0]);b2=await A.ev(MEAS,[30,'new',0,10.4,0])
        nv1=await A.ev(MEAS,['nav','new',0,10.4,0]);nv2=await A.ev(MEAS,['nav','new',0,14.5,0])
        rep('ทิลแมพ 34 ถือเข็มทิศดาว ต่างจากแมพ 30 · นาวินยกกล้องส่องเป็นระยะ',a['h']!=b2['h'] and nv1['h']!=nv2['h'],json.dumps([a['h'],b2['h'],nv1['h'],nv2['h']]))
        r=await A.ev("""()=>{const N=MAPS[27].npc,n0=N.n;N.n='ราชินีเอลิรา';const c1=NPV.n;const cv=document.createElement('canvas'),G0=g;g=cv.getContext('2d');try{NPC3[27].d(50,50,1,10)}catch(e){}const q=NPV.n;N.n='ลิเรีย · นางกำนัลของราชินี';try{NPC3[27].d(50,50,1,10)}catch(e){}const l=NPV.n;g=G0;N.n=n0;return [q-c1,l-q]}""")
        rep('แมพ 27: ช่วงที่เป็นราชินียังวาดราชินีแบบเดิม · ช่วงลิเรียใช้แบบใหม่',r[1]==1,json.dumps(r))
        o=await A.ev(MEAS,[32,'old',0,10.4,0]);f=await A.ev(MEAS,[32,'new',0,10.4,1])
        await A.ev("()=>{NPV.on=0}");off=await A.ev(MEAS,[28,'new',0,10.4,0]);o28=await A.ev(MEAS,[28,'old',0,10.4,0]);await A.ev("()=>{NPV.on=1}")
        rep('error → กลับไปวาดแบบเดิม (บันทึก NPV.err) · ปิด NPV.on ได้',f['nerr'] and not f['err'] and f['n']>=o['n']*.9 and off['h']==o28['h'],json.dumps([f['nerr'][:40],f['n'],o['n'],off['h']==o28['h']]))
        r=await A.ev("()=>[28,30,31,32,33,34,35,36,38].map(k=>NPC3[k].hy)")
        rep('ฟองคำพูดยกสูงตามตัว (hy ≥ 50)',all(v>=50 for v in r),json.dumps(r))
        fails=[]
        for mp in [28,31,35,36,38]:
            r=await A.ev("""async(mp)=>{NPV.err='';const N=mp===38?MAPS[38].npc2:MAPS[mp].npc;enterMap(mp,{x:N.x,y:N.y+150});await new Promise(r=>setTimeout(r,2500));try{SD.on&&stClose()}catch(e){};ov.hidden=true;
              const k=setInterval(()=>{me.x=N.x;me.y=N.y+150;FQ.avg=12},30);let fr=0;const dg0=drawGate;window.drawGate=drawGate=function(){fr++;return dg0.apply(this,arguments)};const n0=NPV.n;await new Promise(r=>setTimeout(r,1200));clearInterval(k);window.drawGate=drawGate=dg0;return {map:curMap,d:NPV.n-n0,fr,err:NPV.err}}""",mp)
            if r['map']!=mp or r['fr']<3 or r['d']<r['fr']*.8 or r['err']: fails.append([mp,r])
        rep('ในเกม (แมพ 28 · 31 · 35 · 36 · 38): NPC แบบใหม่ถูกวาดทุกเฟรม ไม่มี error',not fails,json.dumps(fails,ensure_ascii=False))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
