import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v520 ตัวละครผู้เล่น ช่วง 1: ชุดเกราะที่สวมในเกมวาดใหม่ (3 แบบตามสาย × 7 ระดับ + ชุดเซ็ต · Ancient แยกจาก Relic)
DRAW="""([cls,code,on,lq,T,thr])=>{const cv=document.createElement('canvas');cv.width=160;cv.height=200;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;AL.on=on;AL.err='';let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{c.setTransform(4,0,0,4,80,130);drawChar(0,0,cls,1,0,0,T,0,0,code,0,0)}catch(e){err=String(e)}if(sv)window[sv[0]]=sv[1];AL.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,160,200).data;let n=0,h=0;for(let i=3;i<d.length;i+=4)if(d[i]>200)n++;for(let i=0;i<d.length;i+=7)h=(h*31+d[i])>>>0;const px=[];for(let i=0;i<d.length;i+=4){if(i%8)continue;px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,aerr:AL.err,n,h,px}}"""
def dif(a,b):
    return sum(1 for x,y in zip(a['px'],b['px']) if abs(x-y)>2)/len(a['px'])
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
        A=await new_client(b,'Ar'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("""()=>{const mk=(sl,r,ss)=>{const it=genItem(60,sl,r,r);if(ss)it.ss=ss;return it};const a4=lkc(mk('a',4)),a5=lkc(mk('a',5)),h5=lkc(mk('h',5)),b5=lkc(mk('b',5)),w5=lkc(mk('w',5)),s5=lkc(mk('a',5,1));
          return {wrap:!!drawArmorLook0.old,a4:a4%20,a5,a5b:lkB(a5),h5:Math.floor(h5/20)<3,b5,w5:Math.floor(w5/20)<3,s5,d4:JSON.stringify(alDec(a4)),d5:JSON.stringify(alDec(a5))}}""")
        rep('ติดตั้ง: แทน drawArmorLook0 · รหัสชุดเกราะ Ancient = Relic+40 (หมวก/รองเท้า/อาวุธ/ชุดเซ็ต ไม่เปลี่ยน)',r['wrap'] and r['a4']==5 and r['a5'] in(45,55) and r['a5b']==5 and r['h5'] and r['b5']<20 and r['w5'] and r['s5']<20 and '"T":4' in r['d4'] and '"T":5' in r['d5'],json.dumps(r))
        r=await A.ev("""()=>{const bad=[];const exp={};for(let r=0;r<=6;r++){for(const u of[0,8]){const it=genItem(60,'a',r,r);it.u=u;const D=alDec(lkc(it));if(!D||D.T!==r||D.set)bad.push(['r',r,u,D])}}
          for(let s=1;s<=6;s++){const it=genItem(60,'a',6,6);it.ss=s;const D=alDec(lkc(it));if(!D||D.set!==s)bad.push(['s',s,D])}
          const wd=WDR.map(o=>[o.id,o.a,alDec(o.a)]).filter(x=>!x[2]);return {bad,wd}}""")
        rep('ถอดรหัสครบ: 7 ระดับ (มี/ไม่มีเรือง) · ชุดเซ็ต 6 · ชุดในตู้เสื้อผ้าทุกชุด',not r['bad'] and not r['wd'],json.dumps(r,ensure_ascii=False))
        # ต่างจากเดิม · ต่างตามสาย · ไล่ระดับไม่ซ้ำ · r4≠r5
        res={}
        for cls in ['melee','archer','mage']:
            res[cls]=[await A.ev(DRAW,[cls,code,1,0,10.4,'']) for code in [1,2,3,4,5,45,9]]
        o5=await A.ev(DRAW,['melee',5,0,0,10.4,''])
        same=await A.ev(DRAW,['melee',5,1,0,10.4,''])
        tiers={k:min(dif(v[i],v[j]) for i in range(7) for j in range(i+1,7)) for k,v in res.items()}
        print('pairs',{k:sorted([(round(dif(v[i],v[j]),3),i,j) for i in range(7) for j in range(i+1,7)])[:3] for k,v in res.items()})
        cross=[min(dif(res['melee'][i],res['archer'][i]),dif(res['melee'][i],res['mage'][i]),dif(res['archer'][i],res['mage'][i])) for i in range(7)]
        rep('แบบใหม่ต่างจากเดิม · นักรบ/ธนู/เวท ได้คนละแบบทุกระดับ · 7 ระดับไม่ซ้ำ (Relic ≠ Ancient)',dif(o5,same)>.05 and min(cross)>.05 and min(tiers.values())>.03 and dif(res['melee'][4],res['melee'][5])>.05,json.dumps([round(dif(o5,same),3),[round(c,3) for c in cross],{k:round(v,3) for k,v in tiers.items()}]))
        r=await A.ev(DRAW,['melee',45,0,0,10.4,''])
        r4=await A.ev(DRAW,['melee',5,0,0,10.4,''])
        rep('ตัวถอดรหัสเดิม (เครื่องที่ยังไม่อัปเดต) อ่านรหัส Ancient ใหม่ได้ = ทองแบบเดิม ไม่พัง',not r['err'] and dif(r,r4)<.025,json.dumps([r['err'],dif(r,r4)]))
        fails=[]
        codes=[1,11,2,12,3,13,4,14,5,15,45,55,9,19,6,16,7,17,8,18,114,214,314]+sorted(set(o for o in []))
        wd=await A.ev("()=>WDR.map(o=>o.a)")
        for cls in ['melee','archer','mage','sup','assn','guard','merchant']:
            for code in codes+wd:
                for lq in (0,1):
                    r=await A.ev(DRAW,[cls,code,1,lq,10.4+code*.01,''])
                    if r['err'] or r['aerr'] or r['n']<800: fails.append([cls,code,lq,r['err'],r['aerr'],r['n']])
        rep('ทุกสาย (7) × ทุกรหัส (ระดับ/เรือง/เซ็ต/ตู้เสื้อผ้า) × โหมดประหยัด: ไม่มี error',not fails,json.dumps(fails[:6]))
        f=await A.ev(DRAW,['melee',13,1,0,11.3,'alHeavy']);o=await A.ev(DRAW,['melee',13,0,0,11.3,''])
        n=await A.ev(DRAW,['melee',13,1,0,11.3,''])
        rep('error → กลับไปวาดแบบเดิมเฟรมนั้น',bool(f['aerr']) and not f['err'] and dif(f,o)<.025 and dif(n,o)>.05,json.dumps([f['aerr'][:80],dif(f,o),dif(n,o)]))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=400;cv.height=400;const G0=g;g=cv.getContext('2d');g.setTransform(3,0,0,3,200,300);const codes=[1,3,5,45,9,16,7,18,114,214,314],CL5=['melee','archer','mage','sup','assn'];
          const run=on=>{AL.on=on;const t0=performance.now();for(let i=0;i<3000;i++){const c=codes[i%codes.length];drawChar(0,0,CL5[i%5],1,0,0,i*.01,c,c,c,0,0)}return performance.now()-t0};run(1);run(0);let a=0,b2=0;for(let k=0;k<3;k++){a+=run(0);b2+=run(1)}AL.on=1;g=G0;return {old:a/9000,nw:b2/9000,ratio:b2/a}}""")
        rep('ความเร็ว: วาดตัวละครทั้งตัว (ชุดเกราะใหม่) ช้าลงไม่เกิน 1.35 เท่าของแบบเดิม',r['ratio']<1.35,json.dumps(r))
        # ผู้เล่นอีกเครื่องเห็นชุด Ancient
        B=await new_client(b,'Bv'+str(random.randint(100,999)),'mage',99)
        await B.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await A.ev("()=>{const it=genItem(60,'a',5,5);me.eq.a=it;try{recalc&&recalc()}catch(e){}}");await A.wait(3500)
        r=await B.ev("(nm)=>{const o=Object.values(others).find(o=>o.n===nm);return o?{ar:o.ar,d:JSON.stringify(alDec(o.ar)),err:AL.err}:null}",A.name)
        rep('อีกเครื่องเห็นชุด Ancient เป็นสีแดงชาด (รหัสผ่านเซิร์ฟเวอร์ครบ)',bool(r) and r['ar'] in (45,55) and '"T":5' in r['d'] and not r['err'],json.dumps(r))
        er=[e for e in A.errs+B.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
