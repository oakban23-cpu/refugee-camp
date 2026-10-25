import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# v524 ตัวละครผู้เล่น ช่วง 5: ร่างตื่นรู้ / สายทมิฬ / อาชีพขั้น 3 — ผ้าคลุม ปีก เขา หมวก มงกุฎ
DRAW="""([cls,c2,d3,on,lq,T,hd,thr])=>{const cv=document.createElement('canvas');cv.width=200;cv.height=200;const c=cv.getContext('2d'),G0=g,L0=LOWQ,D0=DC3;g=c;LOWQ=!!lq;AWV.on=on;AWV.err='';DC3=d3;let err='';let sv=null;
  if(thr){sv=[thr,window[thr]];window[thr]=function(){throw new Error('x')}}
  try{c.setTransform(4.4,0,0,4.4,100,140);CHE={k:'n',lx:0,ly:0};drawChar(0,0,cls,1,0,hd,T,3,3,3,d3?d3:c2,0)}catch(e){err=String(e)}finally{CHE=null;DC3=D0}if(sv)window[sv[0]]=sv[1];AWV.on=1;g=G0;LOWQ=L0;
  const d=c.getImageData(0,0,200,200).data;let n=0;const px=[];for(let i=0;i<d.length;i+=4){if(d[i+3]>200)n++;if(!(i%8))px.push(d[i]>>2,d[i+1]>>2,d[i+2]>>2)}return {err,aerr:AWV.err,n,px}}"""
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
        A=await new_client(b,'Aw'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev("()=>[!!awkBack.old,!!awkBack3.old,!!c3Back.old,!!c3Wing.old,!!awkHead.old,!!awkHead3.old,!!c3Head.old,typeof AWH3.mage]")
        rep('ติดตั้ง: ห่อผ้าคลุม/ปีกหลัง 3 ชุด · ปีกขนนก · หัว 3 ชุด · เขาเวทสายทมิฬ',all(r[:7]) and r[7]=='function',json.dumps(r))
        tg=[('melee',1,0,'เขานักรบตื่นรู้'),('melee',2,0,'หมวกอัศวินสายทมิฬ'),('melee',0,1,'มงกุฎ+ปีกค้างคาว ขั้น 3'),('melee',0,2,'ปีกหัว+ปีกขนนก ขั้น 3'),('mage',2,0,'เขาเวทสายทมิฬ'),('mage',0,2,'เขาเวทขั้น 3'),('sup',0,1,'ปีกขนนกซัพขั้น 3'),('sup',0,2,'มงกุฎมืด+ปีกค้างคาว ซัพขั้น 3'),('archer',0,1,'ผ้าคลุมราตรี ธนูขั้น 3'),('archer',1,0,'ผ้าคลุมตื่นรู้ ธนู')]
        out=[]
        for cls,c2,d3,nm in tg:
            o=await A.ev(DRAW,[cls,c2,d3,0,0,10.4,0,'']);n=await A.ev(DRAW,[cls,c2,d3,1,0,10.4,0,''])
            out.append((round(dif(o,n),3),nm,n['aerr'][:60]))
        rep('ร่างที่เสริม 10 แบบ ต่างจากเดิมทุกแบบ',all(x[0]>.004 and not x[2] for x in out),json.dumps(out,ensure_ascii=False))
        fails=[]
        hd=await A.ev("()=>lkc(genItem(60,'h',3,3))")
        for cls in ['melee','archer','mage','sup','assn']:
            for c2,d3 in [(0,0),(1,0),(2,0),(0,1),(0,2)]:
                for lq in (0,1):
                    for h in (0,hd):
                        rr=await A.ev(DRAW,[cls,c2,d3,1,lq,10.4+c2+d3,h,''])
                        if rr['err'] or rr['aerr'] or rr['n']<2000: fails.append([cls,c2,d3,lq,h,rr['err'],rr['aerr'][:80],rr['n']])
        rep('5 สาย × 5 ร่าง (ปกติ/ตื่นรู้/สายทมิฬ/ขั้น 3 ×2) × โหมดประหยัด × หมวก: ไม่มี error',not fails,json.dumps(fails[:5]))
        fb=[]
        for cls,c2,d3,thr in [('melee',1,0,'awHorns'),('melee',2,0,'hDome'),('melee',0,1,'hCrown'),('sup',0,2,'awBatShade'),('archer',0,1,'awCapeShade')]:
            o=await A.ev(DRAW,[cls,c2,d3,0,0,11.3,0,''])
            f=await A.ev(DRAW,[cls,c2,d3,1,0,11.3,0,thr])
            if f['err'] or not f['aerr'] or f['n']<o['n']*.9: fb.append([cls,c2,d3,thr,f['err'],f['aerr'][:50],f['n'],o['n']])
        rep('error ระหว่างวาดเขา/หมวก/มงกุฎ/ปีก/ผ้าคลุม → ส่วนนั้นใช้แบบเดิม ตัวละครไม่หาย',not fb,json.dumps(fb))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=400;cv.height=400;const G0=g,D0=DC3;g=cv.getContext('2d');g.setTransform(3,0,0,3,200,300);const C=['melee','archer','mage','sup','assn'],V=[[1,0],[2,0],[0,1],[0,2]];
          const run=on=>{AWV.on=on;const t0=performance.now();for(let i=0;i<2000;i++){const v=V[i%4];DC3=v[1];CHE={k:'n',lx:0,ly:0};drawChar(0,0,C[i%5],1,0,0,i*.01,3,3,3,v[1]?v[1]:v[0],0)}CHE=null;DC3=D0;return performance.now()-t0};run(1);run(0);let a=0,b2=0;for(let k=0;k<3;k++){a+=run(0);b2+=run(1)}AWV.on=1;g=G0;return {old:a/6000,nw:b2/6000,ratio:b2/a}}""")
        rep('ความเร็ว: ร่างตื่นรู้/ขั้น 3 ช้าลงไม่เกิน 1.2 เท่า',r['ratio']<1.2,json.dumps(r))
        r=await A.ev("""()=>{const cv=document.createElement('canvas');cv.width=cv.height=300;const G0=g;g=cv.getContext('2d');const n0=AWV.n;AWV.err='';let err='';try{drawP(150,180,'melee','ทดสอบ',100,100,false,0,3,0,1,'',1,{w:3,a:3,u:'zz1'})}catch(e){err=String(e)}g=G0;return {d:AWV.n-n0,err,aerr:AWV.err}}""")
        rep('วาดผ่านเส้นทางผู้เล่นจริง (drawP) ร่างตื่นรู้ใช้แบบใหม่',r['d']>0 and not r['err'] and not r['aerr'],json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
