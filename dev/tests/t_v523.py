import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v523 ตัวละครผู้เล่น ช่วง 4: รองเท้าวาดใหม่ + อาวุธในมือ Ancient แดงชาด
DRAW="""([cls,bt,wl,on,lq,T,thr,dy])=>{const cv=document.createElement('canvas');cv.width=160;cv.height=200;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;BTV.on=on;WPA.on=on;BTV.err='';let err='';let sv=null;const d0=CHDY;CHDY=dy||0;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{c.setTransform(5,0,0,5,80,120);CHE={k:'n',lx:0,ly:0};drawChar(0,0,cls,1,0,0,T,bt,wl,0,0,0)}catch(e){err=String(e)}finally{CHE=null;CHDY=d0}if(sv)window[sv[0]]=sv[1];BTV.on=1;WPA.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,160,200).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,berr:BTV.err,n,px}}"""
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
        A=await new_client(b,'Bt'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("""()=>{const mk=(sl,r,ss)=>{const it=genItem(60,sl,r,r);if(ss)it.ss=ss;return it};const b5=lkc(mk('b',5)),b4=lkc(mk('b',4)),bs=lkc(mk('b',6,2));const bad=[];
          for(let i=0;i<150;i++){const it=mk('w',i%7);if(i%5===0)it.u=8;const c=lkc(it);if(wpLkStyle(c)!==wpStyle(it))bad.push([i,it.r,c]);if(it.r===5&&(c%10!==6||!hmAnc(c)))bad.push(['anc',c]);if(it.r!==5&&hmAnc(c))bad.push(['fp',it.r,c])}
          return {b5,b4,bs,bad,wrapB:!!BTV.old,wrapW:!!WPA.old,anc:upCol(lkc(mk('w',5))),rel:upCol(lkc(mk('w',4)))}}""")
        rep('ติดตั้ง: รองเท้า Ancient = +40 · อาวุธ Ancient = หลัก 6 + ทรง (ทรงตรงกับไอคอน 150 ชิ้น) · สีเรืองตีบวกอาวุธ Ancient เป็นแดง',r['wrapB'] and r['wrapW'] and r['b5']%20 in (5,15) and r['b5']>=40 and r['b4']<20 and r['bs']<20 and not r['bad'] and r['anc']!=r['rel'] and r['anc'].startswith('255,70'),json.dumps(r))
        codes=[1,2,3,4,5,45,9,6,7,8,114,214,314]
        R={c:await A.ev(DRAW,['archer',c,1,1,0,10.4,'',0]) for c in codes}
        md=min((dif(R[a],R[b2]),a,b2) for i,a in enumerate(codes) for b2 in codes[i+1:])
        ch=[]
        for c in codes:
            o=await A.ev(DRAW,['archer',c,1,0,0,10.4,'',0]);ch.append((round(dif(o,R[c]),3),c))
        rep('รองเท้า 13 แบบ (7 ระดับ + ชุดเซ็ต 6) ไม่ซ้ำกัน และต่างจากเดิมทุกแบบ',md[0]>.004 and min(ch)[0]>.004,json.dumps([md,sorted(ch)[:3]]))
        fails=[]
        wd=await A.ev("()=>WDR.map(o=>o.b)")
        for cls in ['melee','archer','mage','sup','assn','guard','merchant']:
            for c in codes+[11,15,55,19,16,18]+wd:
                for lq in (0,1):
                    rr=await A.ev(DRAW,[cls,c,1,1,lq,10.4+c*.01,'',0])
                    if rr['err'] or rr['berr'] or rr['n']<1500: fails.append([cls,c,lq,rr['err'],rr['berr'][:80],rr['n']])
        rep('7 สาย × ทุกรหัสรองเท้า (รวมชุดตู้เสื้อผ้า) × โหมดประหยัด: ไม่มี error',not fails,json.dumps(fails[:5]))
        u=await A.ev(DRAW,['archer',4,1,1,0,10.4,'',0]);d=await A.ev(DRAW,['archer',4,1,1,0,10.4,'',2<<12])
        rep('สีย้อมรองเท้ายังใช้ได้กับรองเท้าใหม่',dif(u,d)>.004,json.dumps(dif(u,d)))
        f=await A.ev(DRAW,['archer',3,1,1,0,11.3,'btBoot',0]);o=await A.ev(DRAW,['archer',3,1,0,0,11.3,'',0])
        rep('error → วาดรองเท้าแบบเดิมเฟรมนั้น',bool(f['berr']) and not f['err'] and dif(f,o)<.025,json.dumps([f['berr'][:60],dif(f,o)]))
        res=[]
        for cls in ['melee','archer','mage','sup','assn']:
            for s in range(3):
                rel=await A.ev(DRAW,[cls,0,5+s*20,1,0,10.4,'',0]);anc=await A.ev(DRAW,[cls,0,6+(s+1)*20,1,0,10.4,'',0])
                res.append((round(dif(rel,anc),3),cls,s,anc['err']))
        rep('อาวุธในมือ Ancient (5 สาย × 3 ทรง) เป็นสีแดงชาด แยกจาก Relic',min(res)[0]>.003 and not any(x[3] for x in res),json.dumps(sorted(res)[:4]))
        rr=[await A.ev(DRAW,['melee',0,c,0,0,10.4,'',0]) for c in (26,46,66,36)]
        rep('ตัวถอดรหัสเดิมอ่านรหัสอาวุธ Ancient ได้ไม่พัง',all(not x['err'] and x['n']>1500 for x in rr),json.dumps([(x['err'],x['n']) for x in rr]))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=400;cv.height=400;const G0=g;g=cv.getContext('2d');g.setTransform(3,0,0,3,200,300);const C=['melee','archer','mage','sup','assn'],B=[1,2,3,4,5,45,9,6,7,8,114,214,314];
          const run=on=>{BTV.on=on;const t0=performance.now();for(let i=0;i<2500;i++){CHE={k:'n',lx:0,ly:0};drawChar(0,0,C[i%5],1,0,0,i*.01,B[i%13],3,3,0,0)}CHE=null;return performance.now()-t0};run(1);run(0);let a=0,b2=0;for(let k=0;k<3;k++){a+=run(0);b2+=run(1)}BTV.on=1;g=G0;return {old:a/7500,nw:b2/7500,ratio:b2/a}}""")
        rep('ความเร็ว: วาดตัวละครพร้อมรองเท้าใหม่ช้าลงไม่เกิน 1.3 เท่า',r['ratio']<1.3,json.dumps(r))
        B=await new_client(b,'Bb'+str(random.randint(100,999)),'mage',99)
        await B.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await A.ev("()=>{me.eq.b=genItem(60,'b',5,5);me.eq.w=genItem(60,'w',5,5);try{recalc&&recalc()}catch(e){}}");await A.wait(3500)
        r=await B.ev("(nm)=>{const o=Object.values(others).find(o=>o.n===nm);return o?{bt:o.bt,wp:o.wp,db:JSON.stringify(alDec(o.bt)),aw:!!hmAnc(o.wp)}:null}",A.name)
        rep('อีกเครื่องเห็นรองเท้า + อาวุธ Ancient',bool(r) and '"T":5' in r['db'] and r['aw'],json.dumps(r))
        er=[e for e in A.errs+B.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
