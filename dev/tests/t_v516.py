import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# k: cel / hed / ves / opt / eda32h (ยายเอดา+เฮเดรียน)
MEAS="""([k,on,lq,T,thr])=>{const cv=document.createElement('canvas');cv.width=320;cv.height=320;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;NPV.on=on;NPV.err='';let err='';const n0=NPV.n;let sv=null;
  const thrw=(nm)=>{sv=[nm,window[nm]];window[nm]=function(){throw new Error('x')}};
  try{c.setTransform(2,0,0,2,160,230);
    if(k==='cel'){if(thr)thrw('celV');celD(0,0,T,1)}
    else if(k==='hed'){if(thr)thrw('hedV');const N=MAPS[31].npc2,o=[N.x,N.y];N.x=0;N.y=0;const mx=me.x;me.x=50;try{PALK.mhed({},T)}finally{N.x=o[0];N.y=o[1];me.x=mx}}
    else if(k==='ves'){if(thr)thrw('vesNpcV');const N=MAPS[32].npc2,o=[N.x,N.y];N.x=0;N.y=0;const mx=me.x;me.x=50;try{PALK.aves({},T)}finally{N.x=o[0];N.y=o[1];me.x=mx}}
    else if(k==='opt'){if(thr)thrw('optV');if(on)optV(0,0,1,T);else npcModel({k:'msm',x:0,y:0},T,1)}
    else if(k==='eda32h'){const q=me.sty,o=q&&q.p6h;if(q)q.p6h=2;try{NPC3[32].d(0,0,1,T)}finally{if(q)q.p6h=o}}
    else if(k==='eda32'){const q=me.sty,o=q&&q.p6h;if(q)q.p6h=0;try{NPC3[32].d(0,0,1,T)}finally{if(q)q.p6h=o}}
  }catch(e){err=String(e)}
  if(sv)window[sv[0]]=sv[1];NPV.on=1;g=G0;LOWQ=L0;const d=c.getImageData(0,0,320,320).data;let n=0,y0=999,y1=-1;for(let y=0;y<320;y++)for(let x=0;x<320;x++){const i=(y*320+x)*4;if(d[i+3]>200){n++;if(y<y0)y0=y;if(y>y1)y1=y}}
  let h=0;for(let i=0;i<d.length;i+=89)h=(h*31+d[i])>>>0;return {err,nerr:NPV.err,drawn:NPV.n-n0,n,hgt:y1-y0,h}}"""
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
        A=await new_client(b,'Nw'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1800)
        r=await A.ev("()=>[!!celD.npv,!!PALK.mhed.npv,!!PALK.aves.npv,!!drawFortNpc.npv,NPC3[32].d.npv&&String(NPC3[32].d).length>0,typeof hedV,typeof vesNpcV]")
        rep('ติดตั้งครบ: เซเลสต์ · ลอร์ดเฮเดรียน · เวสเปอร์ร่าง NPC · ช่างหลอมออปชั่น · เฮเดรียนข้างยายเอดา',all(r[:5]) and r[5]=='function',json.dumps(r))
        res={};fails=[]
        for k,need in [('cel',.55),('hed',1.4),('ves',.7),('opt',1.0)]:
            o=await A.ev(MEAS,[k,0,1,10.4,0]);n=await A.ev(MEAS,[k,1,1,10.4,0]);res[k]=[o['hgt'],n['hgt'],o['n'],n['n']]
            if n['err'] or n['nerr'] or n['h']==o['h'] or n['n']<o['n']*need or n['n']<2500: fails.append([k,o,n])
        rep('วาดแบบใหม่ได้ ไม่ error ต่างจากเดิม · เฮเดรียนตัวใหญ่ขึ้น ≥1.4 เท่า (เดิมเป็นชาวบ้านตัวเล็ก)',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   สูง/พื้นที่ เดิม→ใหม่:',json.dumps(res))
        fails=[]
        for k in ['cel','hed','ves','opt','eda32h']:
            for lq,T in [(0,10.4),(1,10.4),(0,13.7)]:
                r=await A.ev(MEAS,[k,1,lq,T,0])
                if r['err'] or r['nerr'] or r['n']<2000: fails.append([k,lq,T,r])
        rep('ทุกเวลา + โหมดประหยัด วาดได้ครบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        a=await A.ev(MEAS,['eda32',1,1,10.4,0]);h2=await A.ev(MEAS,['eda32h',1,1,10.4,0])
        rep('แมพ 32: เลือก «ชวนเดินดูตลาด» → ลอร์ดเฮเดรียนแบบใหม่ยืนข้างยายเอดา',h2['n']>a['n']+1500 and not h2['nerr'],json.dumps([a['n'],h2['n']]))
        fails=[]
        for k in ['cel','hed','ves']:
            o=await A.ev(MEAS,[k,0,1,10.4,0]);f=await A.ev(MEAS,[k,1,1,10.4,1])
            if not f['nerr'] or f['err'] or f['n']<o['n']*.8: fails.append([k,o['n'],f['n'],f['nerr'][:40],f['err']])
        rep('error → กลับไปวาดแบบเดิม (บันทึก NPV.err)',not fails,json.dumps(fails,ensure_ascii=False))
        r=await A.ev("""async()=>{NPV.err='';const M=MAPS[19],N=M.npc2;enterMap(19,{x:N.x,y:N.y+150});await new Promise(r=>setTimeout(r,2500));try{SD.on&&stClose()}catch(e){};ov.hidden=true;
          let ns=0,nn=0,lab=0;const s0=drawSmith2,n0f=drawNoa;window.drawSmith2=drawSmith2=function(){ns++;return s0.apply(this,arguments)};window.drawNoa=drawNoa=function(){nn++;return n0f.apply(this,arguments)};
          const ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(s){if(String(s).indexOf('ช่างหลอมออปชั่น')>=0)lab++;return ft.apply(this,arguments)};
          const k=setInterval(()=>{me.x=N.x;me.y=N.y+150;FQ.avg=12},30);const c0=NPV.n,s0n=ns;await new Promise(r=>setTimeout(r,1300));const d1=NPV.n-c0,fr=ns-s0n;const e0=NPV.err;const ov0=window.optV;window.optV=function(){throw new Error('x')};const lab0=lab;await new Promise(r=>setTimeout(r,500));const fb={err:NPV.err.slice(0,30),lab:lab-lab0};window.optV=ov0;NPV.err='';clearInterval(k);CanvasRenderingContext2D.prototype.fillText=ft;window.drawSmith2=drawSmith2=s0;window.drawNoa=drawNoa=n0f;
          return {map:curMap,d:d1,fr,ns,nn,lab,pos:[N.x,N.y],err:e0,fb}}""")
        rep('ในเกมแมพ 19: ช่างหลอมออปชั่นแบบใหม่ทุกเฟรม + ป้ายชื่อ · ช่างตีบวก/โนอายังวาดตามเดิม · ตำแหน่ง NPC ไม่เพี้ยน · ถ้าแบบใหม่ error กลับไปแบบเดิม (ป้ายยังขึ้น)',r['map']==19 and r['fr']>=3 and r['d']>=r['fr']*.8 and r['nn']>=r['ns']*.8 and r['lab']>=r['fr'] and r['pos']==[1438,772] and not r['err'] and r['fb']['err'] and r['fb']['lab']>3,json.dumps(r,ensure_ascii=False))
        r=await A.ev("""()=>{const N=MAPS[34].npc2,o=[N.x,N.y];const L=[];const ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(s){L.push(String(s));return ft.apply(this,arguments)};
          const cv=document.createElement('canvas'),G0=g;g=cv.getContext('2d');try{celD(50,80,10,1);const H=MAPS[31].npc2,h0=[H.x,H.y];H.x=50;H.y=80;PALK.mhed({},10);H.x=h0[0];H.y=h0[1];const V=MAPS[32].npc2,v0=[V.x,V.y];V.x=50;V.y=120;PALK.aves({},10);V.x=v0[0];V.y=v0[1]}finally{g=G0;CanvasRenderingContext2D.prototype.fillText=ft}
          return [typeof celD,o,L.some(s=>s.indexOf('เซเลสต์')>=0),L.some(s=>s.indexOf('เฮเดรียน')>=0),L.some(s=>s.indexOf('เวสเปอร์')>=0)]}""")
        rep('ตำแหน่งเดิมไม่ถูกแตะ (เซเลสต์ยังซ่อนจนถึงฉาก) · ป้ายชื่อเซเลสต์/เฮเดรียน/เวสเปอร์ยังขึ้น',r[0]=='function' and r[1][0]<0 and r[2] and r[3] and r[4],json.dumps(r,ensure_ascii=False))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
