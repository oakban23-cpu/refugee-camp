import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v525 พาหนะวาดใหม่ 6 ตัว
DRAW="""([id,on,lq,ph,fx,T,thr])=>{const cv=document.createElement('canvas');cv.width=220;cv.height=160;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;MTV.on=on;MTV.err='';let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{drawMount(id,110,70,fx,ph,T,3.4)}catch(e){err=String(e)}if(sv)window[sv[0]]=sv[1];MTV.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,220,160).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,merr:MTV.err,n,px}}"""
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
        A=await new_client(b,'Mt'+str(random.randint(100,999)),'archer',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("()=>[!!MTV.old,MOUNTS.length-1]")
        rep('ติดตั้ง: ห่อ drawMount · พาหนะ 6 ตัว',r[0] and r[1]==6,json.dumps(r))
        R={}
        out=[]
        for i in range(1,7):
            o=await A.ev(DRAW,[i,0,0,0,1,10.4,''])
            n=await A.ev(DRAW,[i,1,0,0,1,10.4,''])
            R[i]=n;out.append((round(dif(o,n),3),i,n['n'],o['n']))
        md=min(dif(R[a],R[b2]) for a in R for b2 in R if a<b2)
        rep('6 ตัวต่างจากแบบเดิม และแต่ละตัวต่างกัน',all(x[0]>.05 for x in out) and md>.05,json.dumps([out,round(md,3)]))
        fails=[]
        for i in range(1,7):
            for lq in (0,1):
                for ph in (0,.4,1.3,2.9):
                    for fx in (1,-1):
                        rr=await A.ev(DRAW,[i,1,lq,ph,fx,10.4+ph,''])
                        if rr['err'] or rr['merr'] or rr['n']<4000: fails.append([i,lq,ph,fx,rr['err'],rr['merr'][:80],rr['n']])
        rep('6 ตัว × ยืน/วิ่ง 3 จังหวะ × หันซ้าย/ขวา × โหมดประหยัด: ไม่มี error',not fails,json.dumps(fails[:5]))
        an=[]
        for i in range(1,7):
            a=await A.ev(DRAW,[i,1,0,.3,1,10.4,'']);c2=await A.ev(DRAW,[i,1,0,1.8,1,10.4,''])
            an.append((round(dif(a,c2),3),i))
        rep('วิ่งแล้วขาขยับ (ภาพต่างกันตามจังหวะก้าว)',all(x[0]>.01 for x in an),json.dumps(an))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=cv.height=400;const G0=g;g=cv.getContext('2d');const res=[];const n0=MTV.n;MTV.err='';let err='';
          for(let id=1;id<=6;id++){try{CHE={k:'n',lx:0,ly:0};drawP(200,250,'melee','P'+id,100,100,false,lkc(genItem(60,'h',2,2)),3,id%2?0:1.2,1,'',0,{w:3,a:3,mt:id,u:'q'+id})}catch(e){err+=String(e)}finally{CHE=null}}g=G0;return {d:MTV.n-n0,err,merr:MTV.err}}""")
        rep('ผู้เล่นขี่ทั้ง 6 ตัวผ่าน drawP จริง ไม่มี error',r['d']>=6 and not r['err'] and not r['merr'],json.dumps(r))
        r=await A.ev("""()=>{const o=[];for(let id=1;id<=6;id++){delete MTI[id];const n0=MTV.n;const u=mountIcon(id);o.push([!!u&&u.indexOf('data:image/png')===0,MTV.n>n0])}return o}""")
        rep('ไอคอนในคอกสัตว์ใช้ภาพใหม่',all(a and b2 for a,b2 in r),json.dumps(r))
        f=await A.ev(DRAW,[1,1,0,0,1,11.3,'mtSaddle']);o=await A.ev(DRAW,[1,0,0,0,1,11.3,''])
        rep('error → วาดพาหนะแบบเดิมเฟรมนั้น',bool(f['merr']) and not f['err'] and dif(f,o)<.03,json.dumps([f['merr'][:60],dif(f,o)]))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=cv.height=300;const G0=g,L0=LOWQ;g=cv.getContext('2d',{willReadFrequently:true});const run=(on,lq)=>{MTV.on=on;LOWQ=lq;const t0=performance.now();for(let i=0;i<600;i++)drawMount(1+i%6,150,150,1,i%2?0:i*.1,i*.01,1.22);g.getImageData(0,0,1,1);return (performance.now()-t0)/600};run(1,0);run(0,0);run(1,1);let a=9,b2=9,c2=9;for(let k=0;k<6;k++){a=Math.min(a,run(0,0));b2=Math.min(b2,run(1,0));c2=Math.min(c2,run(1,1))}
          LOWQ=L0;MTV.on=1;g=G0;return {old:a,nw:b2,lowq:c2}}""")
        rep('ความเร็ว (วาดด้วย CPU): วาดพาหนะ 1 ตัว < 0.6 ms (เฉพาะคนที่ขี่อยู่) · โหมดประหยัดไม่หนักกว่า',r['nw']<.6 and r['lowq']<=r['nw']*1.1,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
