import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
L=[('ความหิวของดาว',85000),('คราเคนเมฆ',72000)]
MEAS="""([nm,mp,off,T,hf,cf,mv,lq,fx,lh])=>{BV1.hf=lh==null?null:lh;const M=MAPS[mp]||dgMap(mp),old=MAPS[curMap].bth;MAPS[curMap].bth=M.bth||(mp>=10000?-5:mp);const cv=document.createElement('canvas');cv.width=400;cv.height=560;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;BV1.off=off;BV1.err='';BWK.mv=mv;BWK.ph=mv?1.3:0;let err='';
  try{c.setTransform(2*fx,0,0,2,200,440);drawBoss(0,0,T,{n:nm},hf,cf,false)}catch(e){err=String(e)}g=G0;LOWQ=L0;BV1.off=0;BV1.hf=null;BWK.mv=0;BWK.ph=0;MAPS[curMap].bth=old;
  const d=c.getImageData(0,0,400,560).data;let n=0,y0=999,y1=-1,x0=999,x1=-1,wh=0;for(let y=0;y<560;y++)for(let x=0;x<400;x++){const i=(y*400+x)*4;if(d[i+3]>40){n++;if(y<y0)y0=y;if(y>y1)y1=y;if(x<x0)x0=x;if(x>x1)x1=x;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)wh++}}
  let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err:err||BV1.err,n,hgt:y1-y0,wid:x1-x0,wf:n?wh/n:0,h}}"""
STATE="""([nm,mp,k])=>{const M=MAPS[mp]||dgMap(mp),CM=MAPS[curMap],old=CM.bth;CM.bth=M.bth||(mp>=10000?-5:mp);const cv=document.createElement('canvas');cv.width=400;cv.height=560;const c=cv.getContext('2d');const G0=g;g=c;BV1.err='';let err='',M0=null;
  if(k==='tt')HFX.tt={t0:performance.now()-1000,d:2800};if(k==='inh')HFX.inh={t0:performance.now()-1500,d:3200};if(k==='low'){M0=mons;mons=[{id:996001,t:3,hp:3,mh:10,x:0,y:0}]}
  try{c.setTransform(1.4,0,0,1.4,200,470);drawBoss(0,0,10.4,{n:nm},0,0,false)}catch(e){err=String(e)}g=G0;HFX.tt=null;HFX.inh=null;if(M0)mons=M0;CM.bth=old;
  const d=c.getImageData(0,0,400,560).data;let n=0,h=0;for(let i=3;i<d.length;i+=4)if(d[i]>40)n++;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err:err||BV1.err,n,h}}"""
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
        A=await new_client(b,'Bq'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}}")
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(800)
        res={};fails=[]
        for nm,mp in L:
            o=await A.ev(MEAS,[nm,mp,1,10.4,0,0,0,0,1,None]);n=await A.ev(MEAS,[nm,mp,0,10.4,0,0,0,0,1,None])
            res[nm]=[o['hgt'],n['hgt'],o['wid'],n['wid']]
            if n['err'] or n['n']<20000 or n['h']==o['h'] or n['hgt']<o['hgt']*.85: fails.append([nm,o,n])
        rep('ความหิวของดาว (เปลหัวใจ ภาค 7) · คราเคนเมฆ (ศึกท่าเรือ ภาค 8) ใช้แบบวาดใหม่ ไม่ error เต็มตัว ต่างจากเดิม สูงไม่น้อยกว่าเดิม',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   สูง/กว้าง เดิม→ใหม่ (px@2x):',json.dumps(res,ensure_ascii=False))
        fails=[]
        for nm,mp in L:
            for args in ([10.9,0,0,1,0,1],[11.3,0,.9,0,0,1],[10.4,.6,0,0,0,1],[10.4,0,0,0,0,-1],[10.4,0,0,0,1,1],[10.4,0,.9,1,1,-1]):
                r=await A.ev(MEAS,[nm,mp,0]+args+[None])
                if r['err'] or r['n']<6000: fails.append([nm,args,r])
                if args[1]>0 and r['wf']<.45: fails.append([nm,'flash',r['wf']])
        rep('ทุกท่า (ลอย · ร่ายสกิล · กะพริบขาวตอนโดนตี · หันซ้าย · โหมดประหยัด) วาดได้ครบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        b1=await A.ev(STATE,['ความหิวของดาว',85000,''])
        tt=await A.ev(STATE,['ความหิวของดาว',85000,'tt']);inh=await A.ev(STATE,['ความหิวของดาว',85000,'inh']);lw=await A.ev(STATE,['ความหิวของดาว',85000,'low'])
        rep('ท่าตามกลไกเปลหัวใจ: «ยื่นสายกลืนไฟ» แขนยืดยาว · «สูดกลืนฟ้า» เปลวโคโรนาถูกดูดเข้า ปากกว้าง · เลือด <50% รอยร้าวทอง สีชมพู',not tt['err'] and not inh['err'] and not lw['err'] and len({b1['h'],tt['h'],inh['h'],lw['h']})==4,[b1,tt,inh,lw])
        b2=await A.ev(STATE,['คราเคนเมฆ',72000,'']);kl=await A.ev(STATE,['คราเคนเมฆ',72000,'low'])
        rep('คราเคนเมฆเลือด <50%: สีชมพูม่วง เส้นเรือง ตาชมพู ฟ้าแลบ',not kl['err'] and b2['h']!=kl['h'],[b2,kl])
        r=await A.ev("()=>[BVH['ความหิวของดาว'],BVH['คราเคนเมฆ'],BVWD['ความหิวของดาว'],BVWD['คราเคนเมฆ'],typeof gxStarHunger,typeof gxKraken,!!BV1['ราชินีผู้กลืนดาว']]")
        rep('ตั้งความสูงหัว (แถบเลือด) และกรอบเลเยอร์กว้างพอหนวด/แขน · แบบเดิมยังอยู่เป็นสำรอง · ชุดก่อน (ราชินี) ยังอยู่',r[0]>=220 and r[1]>=190 and r[2]>=140 and r[3]>=190 and r[4]=='function' and r[5]=='function' and r[6],json.dumps(r))
        r=await A.ev("""()=>['เทวทูตร่วงหล่น อาซาเอล','โวราธ ผู้คุมรังดาว','โรซาลีน · พฤกษาหนามเงิน','ราชาหุ่นเชิดองค์สุดท้าย'].map(n=>!!BV1[n])""")
        rep('บอสที่ตั้งใจคงแบบเดิม (อาซาเอล · โวราธ · โรซาลีน · ราชาหุ่นเชิด) ยังใช้แบบเดิม',not any(r),json.dumps(r))
        fails=[]
        for nm,mp in L:
            r=await A.ev("""async(mp)=>{if(mp>=10000)dgMap(mp);enterMap(mp,{x:CX-80,y:CY+40});await new Promise(r=>setTimeout(r,1500));try{SD.on&&stClose()}catch(e){};ov.hidden=true;
              try{setGQ('high')}catch(e){};const B=BS();mons=mons.filter(m=>m.t!==3);const h=99999,m={id:++mid,x:CX+40,y:CY,tx:CX+40,ty:CY,t:3,L:B.L,p:1,hx:CX+40,hy:CY,hp:h,mh:h,tg:null,tt:0,ac:99,w:null,lg:0,a1:4,a2:9,tl:[],enr:0,stun:99};mons.push(m);
              const box=[];const gb=gxLayerBox;window.gxLayerBox=gxLayerBox=function(cx,cy,w,hh){if(Math.abs(cx-m.x)<1)box.push([cy-m.y,w,hh]);return gb.apply(this,arguments)};
              const keep=setInterval(()=>{FQ.avg=12;if(!mons.includes(m))mons.push(m);m.hp=h;try{SD.on&&stClose()}catch(e){};ov.hidden=true},50);for(let k=0;k<8&&!box.length;k++)await new Promise(r=>setTimeout(r,500));await new Promise(r=>setTimeout(r,300));clearInterval(keep);window.gxLayerBox=gxLayerBox=gb;const t1=bvTop(m);m.mvp=1;const t2=bvTop(m);m.mvp=0;mons=mons.filter(q=>q!==m);
              return {n:B.n,t1,t2,box:box.slice(-2),err:BV1.err||''}}""",mp)
            bx=max([b[2] for b in r['box']] or [0]);bw=max([b[1] for b in r['box']] or [0])
            if r['err'] or r['n']!=nm or r['t1']<190 or r['t2']<=r['t1'] or bx<230 or bw<280: fails.append([nm,r])
        rep('ในเกม (เปลหัวใจ · ศึกท่าเรือ): แถบเลือด/ป้ายเลเวลอยู่เหนือหัว (MVP สูงขึ้นอีก) · กรอบเลเยอร์แสงครอบทั้งตัว',not fails,json.dumps(fails,ensure_ascii=False)[:900])
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
