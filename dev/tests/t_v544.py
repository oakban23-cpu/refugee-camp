import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
# วาดลงแคนวาสแยก · k: lum / grif / crew0 / crew1 / til / nav39 · on=0 วาดแบบเดิม · thr=ฟังก์ชันใหม่ throw
MEAS="""([k,on,lq,T,thr])=>{const cv=document.createElement('canvas');cv.width=320;cv.height=320;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;NPV.on=on;NPV.err='';let err='';const n0=NPV.n;let sv=null;
  const thrw=(nm)=>{sv=[nm,window[nm]];window[nm]=function(){throw new Error('x')}};
  try{c.setTransform(2,0,0,2,160,230);
    if(k==='lum'){if(thr)thrw('lumV');lumD(0,0,1,T)}
    else if(k==='grif'){if(thr)thrw('grifV');grifD(0,0,1,T)}
    else if(k==='crew0'){if(on)crewV(0,0,1,T,0)}
    else if(k==='crew1'){if(on)crewV(0,0,1,T,1)}
    else if(k==='til'){if(thr)thrw('tilV');sfTil(0,0,1,T)}
    else if(k==='nav39'){if(thr)thrw('navinV');NPC3[39].d(0,0,1,T)}
  }catch(e){err=String(e)}
  if(sv)window[sv[0]]=sv[1];NPV.on=1;g=G0;LOWQ=L0;const d=c.getImageData(0,0,320,320).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>200)n++;
  let h=0;for(let i=0;i<d.length;i+=89)h=(h*31+d[i])>>>0;return {err,nerr:NPV.err,drawn:NPV.n-n0,n,h}}"""
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
        A=await new_client(b,'Nx'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;me.sty={s:STY.findIndex(x=>x.p9tv)+1,n:0,a:1,e:1,e8:1,q9:1,e9:1};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1800)
        r=await A.ev("()=>[NPV9.ok,!!lumD.npv,NPC3[40].d===lumD,NPC3[41].d===lumD,!!grifD.npv,!!sfTil.npv,!!NPC3[39].d.npv,!!PALK.sggrif.npv9,NPC3[40].hy,NPC3[39].hy]")
        rep('ติดตั้งครบ: ลูมิน่า (แมพ 40/41/42) · กริฟ + ลูกเรือ · นาวินแมพ 39 · ทิล (sfTil)',all(r[:8]) and r[8]>=52 and r[9]>=50,json.dumps(r))
        fails=[];res={}
        for k,need in [('lum',1.3),('grif',.75),('til',1.0),('nav39',1.0)]:
            o=await A.ev(MEAS,[k,0,1,10.4,0]);n=await A.ev(MEAS,[k,1,1,10.4,0]);res[k]=[o['n'],n['n']]
            if n['err'] or n['nerr'] or n['h']==o['h'] or n['n']<o['n']*need: fails.append([k,o,n])
        for k in ('crew0','crew1'):
            n=await A.ev(MEAS,[k,1,0,10.4,0]);res[k]=n['n']
            if n['err'] or n['n']<1500: fails.append([k,n])
        rep('วาดแบบใหม่ได้ ไม่ error ต่างจากเดิม · ลูมิน่าใหญ่ขึ้น ≥1.3 เท่า · กริฟรายละเอียดเต็ม (เดิมเป็นผ้าคลุมทึบ) · ลูกเรือ 2 แบบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   พื้นที่ เดิม→ใหม่:',json.dumps(res))
        fails=[]
        for k in ['lum','grif','crew0','crew1','til','nav39']:
            for lq,T in [(0,10.4),(1,10.4),(0,13.7),(0,21.05)]:
                r=await A.ev(MEAS,[k,1,lq,T,0])
                if r['err'] or r['nerr'] or r['n']<800: fails.append([k,lq,T,r])
        rep('ทุกจังหวะ (กะพริบตา/ดาวหมุน/ไฟตะเกียง) + โหมดประหยัด วาดได้ไม่ error',not fails,json.dumps(fails)[:600])
        fails=[]
        for k in ['lum','grif','til','nav39']:
            o=await A.ev(MEAS,[k,0,1,11.1,0]);r=await A.ev(MEAS,[k,1,1,11.1,1])
            if r['err'] or not r['nerr'] or r['h']!=o['h']: fails.append([k,o,r])
        rep('ฟังก์ชันใหม่ error → กลับไปวาดแบบเดิม (เก็บ NPV.err)',not fails,json.dumps(fails)[:600])
        # ในเกม: แมพ 39 (กริฟ+ลูกเรือ+นาวิน+ทิล) และแมพ 40/41/42 (ลูมิน่า)
        for mp,key in ((39,'npc2'),(40,'npc'),(41,'npc'),(42,'npc')):
            r=await A.ev("""async([mp,key])=>{const N0=MAPS[mp][key];enterMap(mp,{x:(N0.x>0?N0.x:1600),y:(N0.y>0?N0.y:1600)+140});await new Promise(r=>setTimeout(r,2600));ov.hidden=true;try{SD.on&&stClose()}catch(e){}
              const N=MAPS[mp][key];if(N.x>0){me.x=N.x+30;me.y=N.y+140}
              NPV.err='';const n0=NPV.n,f0=(window.__fc|0);let fc=0;const tk=()=>{fc++;if(fc<9999)requestAnimationFrame(tk)};requestAnimationFrame(tk);await new Promise(r=>setTimeout(r,1500));fc=99999;
              return [curMap,NPV.n-n0,fc,NPV.err,N.x>0,Math.round(N.x)]}""",[mp,key])
            print('  ',mp,r)
            rep(f'ในเกมแมพ {mp}: NPC แบบใหม่วาดทุกเฟรม ไม่ error',r[0]==mp and r[4] and r[1]>=10 and not r[3],json.dumps(r,ensure_ascii=False))
        r=await A.ev("()=>{const N=MAPS[39].npc2;return [N.x,N.y,PALK.sggrif.c0.cache.k!=='',PALK.sggrif.c1.cache.k!=='']}")
        rep('แมพ 39: ลูกเรือทั้ง 2 คนถูกวาด (แคชมีภาพ) · ตำแหน่งกริฟไม่เพี้ยน',r[2] and r[3] and r[0]==600 and r[1]==1700,json.dumps(r))
        r=await A.ev("()=>{const sv=crewV;window.crewV=function(){throw new Error('x')};PALK.sggrif.c0.cache.k='';PALK.sggrif.c1.cache.k='';const G0=g,cv=document.createElement('canvas');cv.width=cv.height=50;g=cv.getContext('2d');let e='';try{PALK.sggrif({},12.34)}catch(x){e=String(x)}g=G0;window.crewV=sv;return e}")
        rep('ลูกเรือ error → ไม่พังทั้งฉาก (กริฟ/ป้ายยังวาด)',r=='',r)
        er=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้า',not er,str(er[:3]))
    finally: p.terminate()
    print(f'SUMMARY: {ok} / {ok+bad} passed')
asyncio.run(main())
