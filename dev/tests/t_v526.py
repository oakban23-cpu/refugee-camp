import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v526 สัตว์เลี้ยงวาดใหม่ 12 ตัว
DRAW="""([id,on,lq,mv,fx,T,thr])=>{const cv=document.createElement('canvas');cv.width=200;cv.height=170;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;PTV.on=on;PTV.err='';let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{drawPet(id,100,140,fx,T,mv,4.2)}catch(e){err=String(e)}if(sv)window[sv[0]]=sv[1];PTV.on=1;g=G0;LOWQ=L0;const tr=c.getTransform();
  const d=c.getImageData(0,0,200,170).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,perr:PTV.err,n,px,id:tr.a===1&&tr.d===1&&tr.e===0&&tr.f===0}}"""
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
        A=await new_client(b,'Pt'+str(random.randint(100,999)),'archer',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("()=>[!!PTV.old,PETS.length-1]")
        rep('ติดตั้ง: ห่อ drawPet · สัตว์เลี้ยง 12 ตัว',r[0] and r[1]==12,json.dumps(r))
        R={};out=[]
        for i in range(1,13):
            o=await A.ev(DRAW,[i,0,0,0,1,10.4,''])
            n=await A.ev(DRAW,[i,1,0,0,1,10.4,''])
            R[i]=n;out.append((round(dif(o,n),3),i,n['n'],o['n']))
        md=min((round(dif(R[a],R[b2]),3),a,b2) for a in R for b2 in R if a<b2)
        rep('12 ตัวต่างจากแบบเดิม และแต่ละตัวต่างกัน',all(x[0]>.03 for x in out) and md[0]>.05,json.dumps([out,md]))
        fails=[]
        for i in range(1,13):
            for lq in (0,1):
                for mv in (0,1):
                    for T in (10.4,11.07,13.33):
                        for fx in (1,-1):
                            rr=await A.ev(DRAW,[i,1,lq,mv,fx,T,''])
                            if rr['err'] or rr['perr'] or rr['n']<900 or not rr['id']: fails.append([i,lq,mv,T,fx,rr['err'],rr['perr'][:80],rr['n']])
        rep('12 ตัว × ยืน/เดิน × 3 จังหวะ × หันซ้าย/ขวา × โหมดประหยัด: ไม่มี error',not fails,json.dumps(fails[:5]))
        an=[]
        for i in range(1,13):
            a=await A.ev(DRAW,[i,1,0,1,1,10.4,'']);c2=await A.ev(DRAW,[i,1,0,1,1,10.47,''])
            an.append((round(dif(a,c2),3),i))
        rep('เดิน/บินแล้วภาพขยับตามจังหวะ',all(x[0]>.004 for x in an),json.dumps(an))
        r=await A.ev("""()=>{const o=[];for(let id=1;id<=12;id++){delete PTI[id];const n0=PTV.n;const u=petIcon(id);o.push([!!u&&u.indexOf('data:image/png')===0,PTV.n>n0])}return o}""")
        rep('ไอคอนในหน้าสัตว์เลี้ยงใช้ภาพใหม่',all(a and b2 for a,b2 in r),json.dumps(r))
        fb=[]
        for i in (1,3,6,7,10,12):
            f=await A.ev(DRAW,[i,1,0,1,1,10.4,'ptEye']);o=await A.ev(DRAW,[i,0,0,1,1,10.4,'']);n=await A.ev(DRAW,[i,1,0,1,1,10.4,''])
            fb.append([i,bool(f['perr']),not f['err'],f['id'],round(dif(f,o),3),round(dif(n,o),3)])
        rep('error กลางทาง → วาดแบบเดิมทับ · สถานะ canvas กลับครบ',all(x[1] and x[2] and x[3] and x[4]<x[5] for x in fb),json.dumps(fb))
        r=await A.ev("""async()=>{me.pets=[1,2,3,4,5,6,7,8,9,10,11,12];me.pet=12;PT=null;const n0=PTV.n;await new Promise(r=>setTimeout(r,1500));return {d:PTV.n-n0,err:PTV.err}}""")
        rep('สัตว์ที่ติดตามผู้เล่นในเกมจริงใช้ภาพใหม่',r['d']>10 and not r['err'],json.dumps(r))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=cv.height=300;const G0=g,L0=LOWQ;g=cv.getContext('2d',{willReadFrequently:true});const run=(on,lq)=>{PTV.on=on;LOWQ=lq;const t0=performance.now();for(let i=0;i<1200;i++)drawPet(1+i%12,150,150,i%2?1:-1,i*.013,i%3?1:0,1.15);g.getImageData(0,0,1,1);return (performance.now()-t0)/1200};run(1,0);run(0,0);run(1,1);let a=9,b2=9,c2=9;for(let k=0;k<6;k++){a=Math.min(a,run(0,0));b2=Math.min(b2,run(1,0));c2=Math.min(c2,run(1,1))}
          LOWQ=L0;PTV.on=1;g=G0;return {old:a,nw:b2,lowq:c2,r:b2/a,rl:c2/a}}""")
        rep('ความเร็ว (วาดด้วย CPU): ภาพเต็ม ≤ 2.2 เท่าของเดิม (< 0.3 ms/ตัว) · โหมดประหยัด ≤ 1.6 เท่า',r['r']<=2.2 and r['nw']<.3 and r['rl']<=1.6,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
