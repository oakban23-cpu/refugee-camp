import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# k: '' idle · slamL/slamR · breath · nova · enr · flash · low(LOWQ) ; gb: guild stage (0=world boss)
SHOT="""([on,k,gb,fn])=>{const cv=document.createElement('canvas');cv.width=640;cv.height=600;const c=cv.getContext('2d');const G0=g,L0=LOWQ,on0=WBV.on,gb0=GBS.go,ph0=dg.ph,en0=WBA.enr;g=c;WBV.on=on;WBV.err='';let err='',hf=0;const tx=[];const ft=c.fillText;c.fillText=function(s){tx.push(String(s));return ft.apply(this,arguments)};
  GBS.go=gb?{s:gb}:null;const now=performance.now();
  if(k==='slamL')WBA.an={k:'slam',s:-1,t0:now-500,dur:1.2};if(k==='slamR')WBA.an={k:'slam',s:1,t0:now-500,dur:1.2};
  if(k==='breath'){WBA.an={k:'breath',t0:now-600,dur:1.6};dg.ph='boss'}if(k==='nova'){WBA.an={k:'nova',t0:now-600,dur:1.6};dg.ph='boss'}
  if(k==='enr')WBA.enr=1;if(k==='flash')hf=.8;if(k==='low')LOWQ=true;
  let w0=null;if(fn==='throw'){w0=[window.wbV,window.gbV];window.wbV=window.gbV=function(){throw new Error('x')}}
  try{c.setTransform(1,0,0,1,0,0);const m={id:1,x:320,y:470,t:5,hp:1,mh:1,wb:1,fx:1};if(gb)drawGuildBoss(m,10.4,hf);else drawWorldBoss(m,10.4,hf)}catch(e){err=String(e)}
  if(w0){window.wbV=w0[0];window.gbV=w0[1]}
  const werr=WBV.err;g=G0;LOWQ=L0;WBV.on=on0;GBS.go=gb0;dg.ph=ph0;WBA.enr=en0;WBA.an=null;
  const d=c.getImageData(0,0,640,600).data;let n=0,wh=0,y0=999;for(let y=0;y<600;y++)for(let x=0;x<640;x++){const i=(y*640+x)*4;if(d[i+3]>40){n++;if(y<y0)y0=y;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)wh++}}
  let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err,werr,n,wf:n?wh/n:0,h,top:y0,tx:tx.join('|')}}"""
BENCH="""([on,gb])=>{const cv=document.createElement('canvas');cv.width=640;cv.height=600;const c=cv.getContext('2d');const G0=g,on0=WBV.on,gb0=GBS.go;g=c;WBV.on=on;GBS.go=gb?{s:gb}:null;const m={id:1,x:320,y:470,t:5,hp:1,mh:1,wb:1,fx:1};
  const run=()=>{const t0=performance.now();for(let i=0;i<40;i++){c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,640,600);if(gb)drawGuildBoss(m,10+i*.05,0);else drawWorldBoss(m,10+i*.05,0);c.getImageData(0,0,1,1)}return (performance.now()-t0)/40};
  run();let b=1e9;for(let r=0;r<3;r++)b=Math.min(b,run());g=G0;WBV.on=on0;GBS.go=gb0;return +b.toFixed(2)}"""
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
        A=await new_client(b,'Bw'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}}")
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(800)
        S=lambda on,k='',gb=0,fn='':A.ev(SHOT,[on,k,gb,fn])
        o=await S(0);n=await S(1)
        rep('บอสโลก «อสูรยักษ์โลกันตร์» ใช้แบบวาดใหม่ ไม่ error เต็มตัว ต่างจากเดิม มีป้ายชื่อ',not n['err'] and not n['werr'] and n['n']>60000 and n['h']!=o['h'] and 'โลกันตร์' in n['tx'] or 'บอสโลก' in n['tx'],json.dumps([o,n],ensure_ascii=False))
        print('   พิกเซล เดิม→ใหม่:',o['n'],'→',n['n'],' ยอด',o['top'],'→',n['top'])
        st={};fails=[]
        for k in ['slamL','slamR','breath','nova','enr','flash','low']:
            r=await S(1,k);st[k]=r['h']
            if r['err'] or r['werr'] or r['n']<30000: fails.append([k,r])
            if k=='flash' and r['wf']<.3: fails.append(['flash-white',r['wf']])
        rep('บอสโลกทุกท่า: ทุบซ้าย/ขวา (ยกแขน) · พ่นไฟ (อ้าปาก) · โนวา (แกนอกขาวเปิดซี่โครง) · คลั่ง · กะพริบขาว · โหมดประหยัด',not fails and len(set(st.values())|{n['h']})==8,json.dumps([fails,st],ensure_ascii=False))
        G={};fails=[]
        go=await S(0,'',1)
        for s in [1,8,16]:
            r=await S(1,'',s);G[s]=r
            if r['err'] or r['werr'] or r['n']<50000 or 'อสูรเกราะศึก' not in r['tx'] or ('ขั้น '+str(s)) not in r['tx']: fails.append([s,r])
        rep('บอสกิลด์ «อสูรเกราะศึก» แบบใหม่ ขั้น 1/8/16 สีเกราะตามขั้น (เหล็ก/เหล็กกล้า/ออบซิเดียน) ป้ายบอกขั้น ต่างจากเดิม',not fails and len({G[1]['h'],G[8]['h'],G[16]['h'],go['h']})==4,json.dumps([fails,go],ensure_ascii=False))
        fails=[];hs=set()
        for k in ['slamL','slamR','nova','flash','low']:
            r=await S(1,k,8);hs.add(r['h'])
            if r['err'] or r['werr'] or r['n']<30000: fails.append([k,r])
        rep('บอสกิลด์ทุกท่า: ยกโล่ (ซ้าย) · ทุบค้อน (ขวา) · โนวา (อัญมณีอกขาว) · กะพริบขาว · โหมดประหยัด',not fails and len(hs|{G[8]['h']})==6,json.dumps(fails,ensure_ascii=False))
        a=await S(1,'',0,'throw');c2=await S(1,'',8,'throw')
        rep('ถ้าแบบใหม่ error จะกลับไปวาดแบบเดิม (บันทึก WBV.err)',a['werr'] and c2['werr'] and abs(a['n']-o['n'])<abs(a['n']-n['n']) and abs(c2['n']-go['n'])<abs(c2['n']-G[8]['n']) and not a['err'] and not c2['err'],json.dumps([a['werr'][:60],a['n'],o['n'],n['n'],c2['n'],go['n'],G[8]['n']]))
        B={k:await A.ev(BENCH,v) for k,v in {'wb0':[0,0],'wb1':[1,0],'gb0':[0,8],'gb1':[1,8]}.items()}
        print('   ความเร็ว ms/ครั้ง:',json.dumps(B))
        rep('ความเร็ววาดไม่ช้ากว่าเดิมเกิน 1.6 เท่า',B['wb1']<=max(B['wb0']*1.6,3) and B['gb1']<=max(B['gb0']*1.6,3),json.dumps(B))
        r=await A.ev("""async()=>{WBV.err='';let cw=0,cg=0;const w0=window.wbV,g0=window.gbV;window.wbV=function(){cw++;return w0.apply(this,arguments)};window.gbV=function(){cg++;return g0.apply(this,arguments)};
          wbEnter();await new Promise(r=>setTimeout(r,2500));try{SD.on&&stClose()}catch(e){};ov.hidden=true;try{dgReqStart()}catch(e){return 'E '+e}
          await new Promise(r=>setTimeout(r,4500));ov.hidden=true;banner=null;const m=mons.find(q=>q.wb);if(!m)return 'nom';const k=setInterval(()=>{me.x=m.x;me.y=m.y+60;FQ.avg=12},50);
          await new Promise(r=>setTimeout(r,1200));const c1=cw;GBS.go={s:12,id:curMap,sent:1,done:0};await new Promise(r=>setTimeout(r,1200));const c2=cg;GBS.go=null;clearInterval(k);window.wbV=w0;window.gbV=g0;
          return {ph:dg.ph,c1,c2,err:WBV.err}}""")
        rep('ในเกม: ลานบอสโลกวาดแบบใหม่ทุกเฟรม · ท้าอสูรกิลด์วาดแบบเกราะศึก · ไม่มี error',isinstance(r,dict) and r['c1']>10 and r['c2']>10 and not r['err'],json.dumps(r,ensure_ascii=False))
        r=await A.ev("""()=>[['ราชินีผู้กลืนดาว','ราชินีที่เหลือแต่เปลือก','ความหิวของดาว','คราเคนเมฆ'].every(n=>!!BV1[n]),Object.keys(MV1D).length,typeof gxStarHunger,typeof _wbOld]""")
        rep('บอสชุดก่อน (ราชินี · ความหิวของดาว · คราเคน) ยังอยู่ · มอนวาดใหม่ครบ 111 แบบ',r[0] and r[1]>=111,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
