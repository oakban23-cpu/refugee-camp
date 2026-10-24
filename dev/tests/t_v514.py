import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
SHOT="""([F,off,T,cf,hf,lq,thr])=>{const cv=document.createElement('canvas');cv.width=600;cv.height=640;const c=cv.getContext('2d');const G0=g,L0=LOWQ,M=MAPS[curMap],ob=M.bth;g=c;M.bth=-5;RTFORCE=F;LOWQ=!!lq;BV1.off=off;DVV.err='';BV1.err='';
  let nd=0,na=0;const d0=window.dvV,a0=window.gxAvatar;window.dvV=function(){nd++;if(thr)throw new Error('x');return d0.apply(this,arguments)};window.gxAvatar=function(){na++;return a0.apply(this,arguments)};let err='';
  try{c.setTransform(1,0,0,1,300,580);drawBoss(0,0,T,{n:'ผู้กลืนราก'},hf||0,cf||0,false)}catch(e){err=String(e)}
  window.dvV=d0;window.gxAvatar=a0;const derr=DVV.err;g=G0;LOWQ=L0;RTFORCE=null;BV1.off=0;M.bth=ob;
  const d=c.getImageData(0,0,600,640).data;let n=0,wh=0,y0=999,x0=999,x1=-1;for(let y=0;y<640;y++)for(let x=0;x<600;x++){const i=(y*600+x)*4;if(d[i+3]>40){n++;if(y<y0)y0=y;if(x<x0)x0=x;if(x>x1)x1=x;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)wh++}}
  let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err:err||BV1.err,derr,nd,na,n,wf:n?wh/n:0,h,top:y0,wid:x1-x0}}"""
BENCH="""([off,lq])=>{const cv=document.createElement('canvas');cv.width=900;cv.height=900;const c=cv.getContext('2d');const G0=g,L0=LOWQ,M=MAPS[curMap],ob=M.bth;g=c;M.bth=-5;BV1.off=off;LOWQ=!!lq;
  const run=()=>{const t0=performance.now();for(let i=0;i<30;i++){c.setTransform(1,0,0,1,450,700);c.clearRect(-450,-700,900,900);drawBoss(0,0,10+i*.05,{n:'ผู้กลืนราก'},0,0,false);c.getImageData(0,0,1,1)}return (performance.now()-t0)/30};
  run();let b=1e9;for(let r=0;r<3;r++)b=Math.min(b,run());g=G0;LOWQ=L0;BV1.off=0;M.bth=ob;return +b.toFixed(2)}"""
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
        A=await new_client(b,'Bd'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}}")
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(800)
        S=lambda F,off=0,T=10.4,cf=0,hf=0,lq=0,thr=0:A.ev(SHOT,[F,off,T,cf,hf,lq,thr])
        P1={'k':0,'c':0}
        o=await S(P1,1);n=await S(P1)
        rep('ผู้กลืนรากใช้แบบวาดใหม่ (เปลือกบะซอลต์ · ปากแนวตั้ง · กำหัวใจครึ่งดวง) ไม่ error เต็มตัว ต่างจากเดิม',not n['err'] and not n['derr'] and n['nd']==1 and o['nd']==0 and n['n']>60000 and n['h']!=o['h'],json.dumps([o,n],ensure_ascii=False))
        print('   พิกเซล เดิม→ใหม่:',o['n'],'→',n['n'],' กว้าง',o['wid'],'→',n['wid'],' ยอด',o['top'],'→',n['top'])
        st={};fails=[]
        for k,a in {'cast':dict(F=P1,T=10.9,cf=.9),'crack':dict(F={'k':0,'c':.7}),'peel':dict(F={'k':.5,'c':1}),'core':dict(F={'k':1,'c':1}),'flash':dict(F={'k':1,'c':1},hf=.8),'low':dict(F=P1,lq=1)}.items():
            r=await S(**a);st[k]=r['h']
            if r['err'] or r['derr'] or r['nd']!=1 or r['n']<40000: fails.append([k,r])
            if k=='flash' and r['wf']<.3: fails.append(['flash-white',r['wf']])
        rep('ทุกเฟส: ร่ายสกิล (ยกหัวใจป้อนปาก) · ร้าว · ลอกเปลือก (เศษหินปลิว) · ร่างแกนหลอมเหลว (มงกุฎไฟ) · กะพริบขาว · โหมดประหยัด',not fails and len(set(st.values())|{n['h']})==7,json.dumps([fails,st],ensure_ascii=False))
        a1=await S({'k':1,'c':1,'p3':1,'a3':1});a2=await S({'k':1,'c':1,'p3':1,'a3':3.5});a3=await S({'k':1,'c':1,'p3':1,'a3':8})
        rep('เฟส 3: ร่างเดิมจางหาย (วาดแบบใหม่) แล้วอวตาร gxAvatar ลงมาแบบเดิม ไม่วาดผู้กลืนรากซ้อน',a1['nd']==1 and a1['na']==0 and a2['nd']==0 and a2['na']==1 and a3['nd']==0 and a3['na']==1 and not (a1['err'] or a2['err'] or a3['err'] or a1['derr']),json.dumps([a1,a2,a3]))
        f=await S(P1,0,10.4,0,0,0,1)
        rep('ถ้าแบบใหม่ error จะกลับไปวาดแบบเดิม (บันทึก DVV.err)',f['derr'] and not f['err'] and abs(f['n']-o['n'])<abs(f['n']-n['n']),json.dumps([f['derr'][:50],f['n'],o['n'],n['n']]))
        Bm={'old':await A.ev(BENCH,[1,0]),'new':await A.ev(BENCH,[0,0]),'newLQ':await A.ev(BENCH,[0,1])}
        print('   ความเร็ว ms/ครั้ง:',json.dumps(Bm))
        rep('ความเร็ว: ไม่ช้ากว่าเดิมเกิน 2 เท่า · โหมดประหยัดเร็วกว่าปกติ',Bm['new']<=max(Bm['old']*2,8) and Bm['newLQ']<Bm['new'],json.dumps(Bm))
        r=await A.ev("""async()=>{DVV.err='';let nd=0;const d0=window.dvV;window.dvV=function(){nd++;return d0.apply(this,arguments)};dgMap(73000);enterMap(73000,{x:CX,y:CY+200});await new Promise(r=>setTimeout(r,4200));try{SD.on&&stClose()}catch(e){};ov.hidden=true;banner=null;
           const B=BS();mons=mons.filter(m=>m.t!==3);const h=99999;const m={id:++mid,x:CX,y:CY-140,tx:CX,ty:CY-140,t:3,L:B.L,p:1,hx:CX,hy:CY-140,hp:h*.7,mh:h,tg:null,tt:0,ac:99,w:null,lg:0,a1:4,a2:9,tl:[],enr:0,stun:99};mons.push(m);
           const k=setInterval(()=>{me.x=m.x;me.y=m.y+200;FQ.avg=12;if(!mons.includes(m))mons.push(m);m.hp=h*.7},30);await new Promise(r=>setTimeout(r,1200));const c1=nd;RTFORCE={k:0,c:.7};await new Promise(r=>setTimeout(r,500));RTFORCE={k:1,c:1};await new Promise(r=>setTimeout(r,500));const c2=nd;RTFORCE=null;clearInterval(k);window.dvV=d0;mons=mons.filter(q=>q!==m);
           return {n:B.n,rte:RTEI(),c1,c2,err:DVV.err}}""")
        rep('ในเกม (ห้องแกนพิภพ): วาดแบบใหม่ทุกเฟรม ทั้งเปลือก/ร้าว/ร่างแกน ไม่มี error',isinstance(r,dict) and r['n']=='ผู้กลืนราก' and r['rte'] and r['c1']>10 and r['c2']>r['c1']+5 and not r['err'],json.dumps(r,ensure_ascii=False))
        r=await A.ev("""()=>[['ราชินีผู้กลืนดาว','ราชินีที่เหลือแต่เปลือก','ความหิวของดาว','คราเคนเมฆ'].every(n=>!!BV1[n]),typeof wbV,typeof gbV,WBV.on,Object.keys(MV1D).length,typeof gxAvatar]""")
        rep('ชุดก่อนยังอยู่ (ราชินี · ความหิวของดาว · คราเคน · บอสโลก/บอสกิลด์ · มอน 111 แบบ) · อวตารเฟส 3 คงเดิม',r[0] and r[1]=='function' and r[2]=='function' and r[3]==1 and r[4]>=111 and r[5]=='function',json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
