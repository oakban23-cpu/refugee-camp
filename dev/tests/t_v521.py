import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v521 ตัวละครผู้เล่น ช่วง 2: หน้าตา · ผม · ฮู้ด · ร่างพื้นฐาน
DRAW="""([cls,on,lq,T,k,hd,c2,thr])=>{const cv=document.createElement('canvas');cv.width=160;cv.height=200;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;PCV.on=on;PCV.err='';let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{c.setTransform(5,0,0,5,80,120);CHE=k?{k,lx:0,ly:0}:null;drawChar(0,0,cls,1,0,hd,T,0,0,0,c2,0)}catch(e){err=String(e)}finally{CHE=null}if(sv)window[sv[0]]=sv[1];PCV.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,160,200).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,perr:PCV.err,n,px}}"""
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
        A=await new_client(b,'Fc'+str(random.randint(100,999)),'archer',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("""()=>{const s=[...document.scripts].map(e=>e.textContent).join('');return ['pcHood(cls,hy,P)','pcHead(cls,hy,P,HH)','pcHairT(cls,hy,hs,t,P)','pcEyesSafe(cls,c2,b2,hy,t,x,O,null)','pcCheek(cls,hy)','pcCuff(P)','pcShoes(la,ra)'].map(k=>s.indexOf(k)>=0)}""")
        rep('ติดตั้ง: ฮู้ด · หัว · ผม · ตาปกติ · แก้ม · ข้อมือ · รองเท้าพื้นฐาน · ตาตามสีหน้า (chEyes)',all(r),json.dumps(r))
        out={}
        for cls in ['melee','archer','mage','sup','assn']:
            o=await A.ev(DRAW,[cls,0,0,10.4,'n',0,0,'']);n=await A.ev(DRAW,[cls,1,0,10.4,'n',0,0,''])
            o0=await A.ev(DRAW,[cls,0,0,10.4,'',0,0,'']);n0=await A.ev(DRAW,[cls,1,0,10.4,'',0,0,''])
            out[cls]=[round(dif(o,n),3),round(dif(o0,n0),3)]
        rep('ทุกสายหน้าตาเปลี่ยนจากเดิม ทั้งตอนมีสีหน้า (ในเกม) และไม่มี (หน้าเลือกตัวละคร/พรีวิว)',all(v[0]>.03 and v[1]>.03 for v in out.values()),json.dumps(out))
        ex={}
        for k in ['n','happy','hurt','low','fever','cast']:
            ex[k]=await A.ev(DRAW,['archer',1,0,10.4,k,0,0,''])
        ks=list(ex);md=min(dif(ex[a],ex[b2]) for i,a in enumerate(ks) for b2 in ks[i+1:])
        rep('สีหน้า 6 แบบ (ปกติ/ดีใจ/เจ็บ/เลือดน้อย/คลั่ง/ร่าย) ยังแยกกันชัด มีปากตามอารมณ์',md>.004 and not any(v['perr'] for v in ex.values()),json.dumps(round(md,4)))
        fails=[]
        hds=await A.ev("()=>[0,lkc(genItem(60,'h',1,1)),lkc(genItem(60,'h',4,4)),lkc((()=>{const it=genItem(60,'h',6,6);it.ss=5;return it})())]")
        for cls in ['melee','archer','mage','sup','assn','guard','merchant']:
            for k in ['','n','happy','hurt','low','fever','cast']:
                for lq in (0,1):
                    for hd in hds[:2] if k not in ('','n') else hds:
                        for c2 in ((0,1,2) if k in ('','n') else (0,)):
                            r=await A.ev(DRAW,[cls,1,lq,10.4,k,hd,c2,''])
                            if r['err'] or r['perr'] or r['n']<1500: fails.append([cls,k,lq,hd,c2,r['err'],r['perr'][:100],r['n']])
        rep('7 สาย × สีหน้า × โหมดประหยัด × หมวก × ร่างตื่นรู้ 0/1/2: ไม่มี error',not fails,json.dumps(fails[:5]))
        r=await A.ev("""()=>{let n=0;const sv=window.pcHairT;window.pcHairT=function(){n++;return sv.apply(this,arguments)};const cv=document.createElement('canvas');cv.width=cv.height=100;const G0=g;g=cv.getContext('2d');const res=[];
          const hide=[lkc(genItem(60,'h',2,2)),lkc(genItem(60,'h',3,3))].find(c=>helmHides(c));for(const hd of[0,hide||0]){n=0;drawChar(50,60,'melee',1,0,hd,1,0,0,0,0,0);res.push(n)}g=G0;window.pcHairT=sv;return [res,!!hide]}""")
        rep('ใส่หมวกที่ปิดผม → ไม่วาดผม/ฮู้ดใหม่ (หมวกวาดทับเหมือนเดิม)',r[0][0]==1 and (not r[1] or r[0][1]==0),json.dumps(r))
        fb=[]
        for cls,thr in [('archer','pcF'),('melee','pcF'),('mage','pcEye1'),('sup','pcL')]:
            ref=await A.ev(DRAW,[cls,1,0,10.4,'n',0,0,''])
            f=await A.ev(DRAW,[cls,1,0,10.4,'n',0,0,thr])
            if f['err'] or (not f['perr'] and True) or f['n']<ref['n']*.85: fb.append([cls,thr,f['err'],f['perr'][:60],f['n'],ref['n']])
        rep('error ระหว่างวาดผม/ฮู้ด/ตา → ส่วนนั้นกลับไปวาดแบบเดิม ตัวละครไม่หาย',not fb,json.dumps(fb))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=400;cv.height=400;const G0=g;g=cv.getContext('2d');g.setTransform(3,0,0,3,200,300);const C=['melee','archer','mage','sup','assn'],K=['n','happy','n','hurt','n'];
          const run=on=>{PCV.on=on;const t0=performance.now();for(let i=0;i<2500;i++){CHE={k:K[i%5],lx:0,ly:0};drawChar(0,0,C[i%5],1,0,0,i*.01,3,3,3,0,0)}CHE=null;return performance.now()-t0};run(1);run(0);let a=0,b2=0;for(let k=0;k<3;k++){a+=run(0);b2+=run(1)}PCV.on=1;g=G0;return {old:a/7500,nw:b2/7500,ratio:b2/a}}""")
        rep('ความเร็ว: วาดตัวละครทั้งตัวช้าลงไม่เกิน 1.3 เท่า',r['ratio']<1.3,json.dumps(r))
        r=await A.ev("""async()=>{let fr=0;const dg0=drawGate;window.drawGate=drawGate=function(){fr++;return dg0.apply(this,arguments)};PCV.err='';const n0=PCV.n;await new Promise(r=>setTimeout(r,1500));window.drawGate=drawGate=dg0;return {fr,eyes:PCV.n-n0,err:PCV.err}}""")
        rep('ในเกม: ตัวเราใช้ตาแบบใหม่ทุกเฟรม (ผ่านระบบสีหน้า)',r['fr']>5 and r['eyes']>=r['fr']*.9 and not r['err'],json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
