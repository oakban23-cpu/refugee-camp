import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v522 ตัวละครผู้เล่น ช่วง 3: หมวกวาดใหม่ 7 ระดับ × 3 ทรง + Ancient/Cosmic + ชุดเซ็ต · ไอคอนหมวก
DRAW="""([cls,code,on,lq,T,thr,old])=>{const cv=document.createElement('canvas');cv.width=160;cv.height=160;const c=cv.getContext('2d'),G0=g,L0=LOWQ;g=c;LOWQ=!!lq;HM.on=on;HM.err='';let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{c.setTransform(5,0,0,5,76,150);if(old)HM.old(-18,code,T);else{CHE={k:'n',lx:0,ly:0};drawChar(0,0,cls,1,0,code,T,0,0,0,0,0)}}catch(e){err=String(e)}finally{CHE=null}if(sv)window[sv[0]]=sv[1];HM.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,160,160).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,herr:HM.err,n,px}}"""
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
        A=await new_client(b,'Hm'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("""()=>{const bad=[];const byS=(r,s,ss)=>{for(let i=0;i<500;i++){const it=genItem(10+i%60,'h',r,r);if(ss){it.ss=ss;return it}if(hStyle(it)===s)return it}return null};
          for(let r=0;r<=6;r++)for(let s=0;s<3;s++){const it=byS(r,s);if(!it){bad.push(['nostyle',r,s]);continue}for(const u of[0,8]){it.u=u;const c=lkc(it),D=hmDec(c);if(!D||D.T!==r||D.s!==s||D.set||D.gw!==(u>=7))bad.push([r,s,u,c,D])}}
          for(let ss=1;ss<=6;ss++){const it=byS(6,0,ss),c=lkc(it),D=hmDec(c);if(ss<=3?(!D||D.set!==ss):D!==null)bad.push(['set',ss,c,D])}
          const wd=WDR.filter(o=>!lkX(o.h)).map(o=>[o.id,o.h,hmDec(o.h)]).filter(x=>!x[2]);
          const hides=[[26,false],[46,true],[66,false],[36,false],[56,true],[5,false],[25,true],[45,false],[9,false],[29,true],[1,true],[21,false],[41,true],[7,true],[6,false]].filter(([c,h])=>helmHides(c)!==h);
          const a5=lkc(byS(5,1)),a4=lkc(byS(4,1));return {bad,wd,hides,a5,a4,wrap:!!HM.old}}""")
        rep('ติดตั้ง + ถอดรหัส: 7 ระดับ × 3 ทรง (มี/ไม่มีเรือง) · Ancient = หลัก 6 + ทรง · ชุดเซ็ต · ชุดตู้เสื้อผ้า · หมวกปิดผมถูกทุกแบบ',r['wrap'] and not r['bad'] and not r['wd'] and not r['hides'] and r['a5']%10==6 and r['a4']%10==5,json.dumps(r))
        codes=[1+s*20+0 for s in range(3)]+[2+s*20 for s in range(3)]+[3+s*20 for s in range(3)]+[4+s*20 for s in range(3)]+[5+s*20 for s in range(3)]+[6+(s+1)*20 for s in range(3)]+[9+s*20 for s in range(3)]+[6,7,8]
        R={c:await A.ev(DRAW,['melee',c,1,0,10.4,'',0]) for c in codes}
        md=min((dif(R[a],R[b2]),a,b2) for i,a in enumerate(codes) for b2 in codes[i+1:])
        rep('24 แบบ (21 ระดับ×ทรง + เซ็ต 3) ภาพไม่ซ้ำกัน',md[0]>.01,json.dumps(md))
        ch=[]
        for c in codes:
            o=await A.ev(DRAW,['melee',c,0,0,10.4,'',0]);ch.append((round(dif(o,R[c]),3),c))
        rep('ทุกแบบต่างจากหมวกเดิม',min(ch)[0]>.01,json.dumps(sorted(ch)[:4]))
        fails=[]
        allc=codes+[11,31,51,15,35,55,36,56,76,19,39,59,16,17,18,114,214,314]+await A.ev("()=>WDR.map(o=>o.h)")
        for cls in ['melee','archer','mage','sup','assn','guard','merchant']:
            for c in allc:
                for lq in (0,1):
                    rr=await A.ev(DRAW,[cls,c,1,lq,10.4+c*.01,'',0])
                    if rr['err'] or rr['herr'] or rr['n']<800: fails.append([cls,c,lq,rr['err'],rr['herr'][:80],rr['n']])
        rep('7 สาย × ทุกรหัสหมวก × โหมดประหยัด: ไม่มี error',not fails,json.dumps(fails[:5]))
        rr=[await A.ev(DRAW,['melee',c,1,0,10.4,'',1]) for c in (26,46,66,36)]
        rep('ตัวถอดรหัสเดิมอ่านรหัส Ancient ใหม่ได้ไม่พัง (ช่วงที่บางเครื่องยังไม่อัปเดต)',all(not x['err'] and x['n']>50 for x in rr),json.dumps([(x['err'],x['n']) for x in rr]))
        f=await A.ev(DRAW,['melee',2,1,0,11.3,'hDome',0]);o=await A.ev(DRAW,['melee',2,0,0,11.3,'',0])
        rep('error → วาดหมวกแบบเดิมเฟรมนั้น',bool(f['herr']) and not f['err'] and dif(f,o)<.025,json.dumps([f['herr'][:60],dif(f,o)]))
        r=await A.ev("""async()=>{const ims=[],its=[];for(let r=0;r<=6;r++){const it=genItem(60,'h',r,r);its.push(it);ims.push(itIcoURL(it,'h'))}const s3=genItem(60,'h',6,6);s3.ss=3;ims.push(itIcoURL(s3,'h'));
          const uniq=new Set(ims).size,same=helmIcon(its[2])===itIcoURL(its[2],'h');
          me.bag=[its[4],its[5]];ov.hidden=false;gearUI();await new Promise(r=>setTimeout(r,60));const cell=[...ov.querySelectorAll('.cell')].find(c=>c.dataset.gp==='bag:0');const src=cell&&cell.querySelector('img')&&cell.querySelector('img').getAttribute('src');
          const eq0=me.eq.h;me.eq.h=null;gearUI();const e2=[...ov.querySelectorAll('.cell')].find(c=>c.dataset.gp==='eq:h');const ghost=!!(e2&&e2.querySelector('img'));me.eq.h=eq0;ov.hidden=true;
          return {uniq,same,bag:src===itIcoURL(its[4],'h'),ghost,set:itSetIco(3,'h').indexOf('<img')===0,err:ITI.err}}""")
        rep('ไอคอนหมวกในกระเป๋า/ช่องสวม/การ์ดเลือกตัวละคร/ปุ่มชุดเซ็ต ใช้ภาพใหม่ (8 แบบไม่ซ้ำ · ช่องว่างเป็นเงา)',r['uniq']==8 and r['same'] and r['bag'] and r['ghost'] and r['set'] and not r['err'],json.dumps(r))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=400;cv.height=400;const G0=g;g=cv.getContext('2d');g.setTransform(3,0,0,3,200,300);const C=['melee','archer','mage','sup','assn'],H=[1,22,43,4,25,46,9,26,47,6];
          const run=on=>{HM.on=on;const t0=performance.now();for(let i=0;i<2500;i++){CHE={k:'n',lx:0,ly:0};drawChar(0,0,C[i%5],1,0,H[i%10],i*.01,3,3,3,0,0)}CHE=null;return performance.now()-t0};run(1);run(0);let a=0,b2=0;for(let k=0;k<3;k++){a+=run(0);b2+=run(1)}HM.on=1;g=G0;return {old:a/7500,nw:b2/7500,ratio:b2/a}}""")
        rep('ความเร็ว: วาดตัวละครพร้อมหมวกช้าลงไม่เกิน 1.3 เท่า',r['ratio']<1.3,json.dumps(r))
        B=await new_client(b,'Hb'+str(random.randint(100,999)),'mage',99)
        await B.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await A.ev("()=>{let it;for(let i=0;i<300;i++){it=genItem(60,'h',5,5);if(hStyle(it)===1)break}me.eq.h=it;try{recalc&&recalc()}catch(e){}}");await A.wait(3500)
        r=await B.ev("(nm)=>{const o=Object.values(others).find(o=>o.n===nm);return o?{hd:o.hd,d:JSON.stringify(hmDec(o.hd)),hide:helmHides(o.hd),err:HM.err}:null}",A.name)
        rep('อีกเครื่องเห็นหมวก Ancient (หมวกปีศาจ) ถูกแบบ',bool(r) and r['hd']%10==6 and '"T":5' in r['d'] and r['hide'] and not r['err'],json.dumps(r))
        er=[e for e in A.errs+B.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
