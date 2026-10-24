import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
MEAS="""([k,on,lq,T,thr])=>{const cv=document.createElement('canvas');cv.width=400;cv.height=360;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;NPV.on=on;NPV.err='';let err='';const n0=NPV.n;let sv=null;const L=[];const ft=c.fillText;c.fillText=function(s){L.push(String(s));return ft.apply(this,arguments)};
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{if(k==='mek'){c.setTransform(2,0,0,2,200,250);phMekD(0,0,T)}else{c.setTransform(1.6,0,0,1.6,200-CX*1.6,300-ESC.y*1.6);escCaravan(T)}}catch(e){err=String(e)}
  if(sv)window[sv[0]]=sv[1];NPV.on=1;g=G0;LOWQ=L0;const d=c.getImageData(0,0,400,360).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>200)n++;
  let h=0;for(let i=0;i<d.length;i+=89)h=(h*31+d[i])>>>0;return {err,nerr:NPV.err,drawn:NPV.n-n0,n,h,lab:L.join('|')}}"""
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
        A=await new_client(b,'Nm'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1800)
        r=await A.ev("()=>[!!phMekD.npv,typeof escTil,String(escCaravan).indexOf('escTil(')>=0,typeof mekV,tilV.length]")
        rep('ติดตั้ง: ยายเมฆา (phMekD) · ทิลบนเกวียนดันคุ้มกัน (escCaravan → escTil)',r[0] and r[1]=='function' and r[2] and r[3]=='function',json.dumps(r))
        o=await A.ev(MEAS,['mek',0,1,10.4,'']);n=await A.ev(MEAS,['mek',1,1,10.4,''])
        rep('ยายเมฆาแบบใหม่: นั่งลังไม้ ดีดพิณ ตัวใหญ่ขึ้น ≥1.5 เท่า · ป้ายชื่อยังขึ้น',not n['err'] and not n['nerr'] and n['drawn']==1 and n['h']!=o['h'] and n['n']>=o['n']*1.5 and 'ยายเมฆา' in n['lab'],json.dumps([o,n],ensure_ascii=False))
        o=await A.ev(MEAS,['esc',0,1,10.4,'']);n=await A.ev(MEAS,['esc',1,1,10.4,''])
        rep('เกวียนดันคุ้มกัน: ทิลแบบใหม่นั่งห้อยขาบนหลังคา (วาด 1 ครั้งต่อเฟรม) ต่างจากเดิม',not n['err'] and not n['nerr'] and n['drawn']==1 and n['h']!=o['h'] and o['drawn']==0,json.dumps([o,n],ensure_ascii=False))
        fails=[]
        for k in ['mek','esc']:
            for lq,T in [(0,10.4),(1,13.1),(0,15.7)]:
                r=await A.ev(MEAS,[k,1,lq,T,''])
                if r['err'] or r['nerr'] or r['n']<1500: fails.append([k,lq,T,r])
        rep('ทุกเวลา + โหมดประหยัด',not fails,json.dumps(fails,ensure_ascii=False)[:600])
        f=await A.ev(MEAS,['mek',1,1,11.37,'mekV']);o=await A.ev(MEAS,['mek',0,1,11.37,''])
        f2=await A.ev(MEAS,['esc',1,1,11.37,'tilV']);o2=await A.ev(MEAS,['esc',0,1,11.37,''])
        rep('error → กลับไปวาดแบบเดิม (ป้ายชื่อยังขึ้น)',f['nerr'] and not f['err'] and 'ยายเมฆา' in f['lab'] and abs(f['n']-o['n'])<o['n']*.1 and f2['nerr'] and not f2['err'] and f2['n']>=o2['n']*.9,json.dumps([f['nerr'][:30],f['n'],o['n'],f2['n'],o2['n']]))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=200;cv.height=200;const G0=g;g=cv.getContext('2d');g.setTransform(2,0,0,2,100,150);tilV(0,0,1,10.4,0);const a=g.getImageData(0,0,200,200).data;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,200,200);g.setTransform(2,0,0,2,100,150);tilV(0,0,1,10.4,0,undefined,0);const b=g.getImageData(0,0,200,200).data;g=G0;let d=0;for(let i=0;i<a.length;i+=4)if(a[i+3]!==b[i+3])d++;return d}""")
        rep('ทิลยืน (แมพ 30/34 · ข้างยายเอดา) ไม่เปลี่ยน',r==0,json.dumps(r))
        r=await A.ev("""()=>{const out=[];for(const k of[38,28,31,35]){const d=NPC3[k].d;const run=(on)=>{NPVC.on=on;const cv=document.createElement('canvas');cv.width=260;cv.height=260;const c=cv.getContext('2d'),G0=g;g=c;c.setTransform(2,0,0,2,130,190);try{d(0,0,1,12.21)}finally{g=G0;NPVC.on=1}return c.getImageData(0,0,260,260).data};const a=run(0),b=run(1);let n=0,df=0;for(let i=3;i<a.length;i+=4){if(a[i]>100||b[i]>100){n++;if(Math.abs(a[i]-b[i])>120)df++}}out.push(+(df/Math.max(1,n)).toFixed(3))}return out}""")
        rep('แคชภาพ NPC: ภาพจากแคชตรงกับวาดสด (ต่างไม่เกิน 6% ของพิกเซล)',all(v<.06 for v in r),json.dumps(r))
        r=await A.ev("""async()=>{const N=MAPS[38].npc;enterMap(38,{x:N.x,y:N.y+120});await new Promise(r=>setTimeout(r,2500));try{SD.on&&stClose()}catch(e){};ov.hidden=true;const k=setInterval(()=>{me.x=N.x+40;me.y=N.y+60;FQ.avg=12},30);
          await new Promise(r=>setTimeout(r,800));let fr=0;const dg0=drawGate;window.drawGate=drawGate=function(){fr++;return dg0.apply(this,arguments)};const n0=NPV.n,r0=NPVC.r;await new Promise(r=>setTimeout(r,1500));window.drawGate=drawGate=dg0;clearInterval(k);return {fr,n:NPV.n-n0,r:NPVC.r-r0,err:NPV.err}}""")
        rep('ในเกมท่าเรือ (ซารา+นาวิน): วาดทุกเฟรมจากแคช สร้างภาพใหม่ไม่เกิน ~12 ครั้ง/วิ/ตัว',r['fr']>=3 and r['n']>=r['fr']*1.6 and r['r']<=2*13*1.5+2 and r['r']<=r['n'] and not r['err'],json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
