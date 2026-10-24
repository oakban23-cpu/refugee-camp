import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
L=[('ราชากระดูกโบราณ',2),('จอมมารเพลิงนรก',3),('จักรพรรดิน้ำแข็งนิรันดร์',4),('ราชันย์ห้วงลึก',6),('ราชาก็อบลินถุงทอง',7),('ฟาโรห์อมตะ เนเฟอร์ราห์',8),('ผู้คุมสุสาน',11000)]
MEAS="""([nm,mp,off,T,hf,cf,mv,lq,fx])=>{const M=MAPS[mp]||dgMap(mp),old=MAPS[curMap].bth;MAPS[curMap].bth=M.bth||(mp>=10000?-5:mp);const cv=document.createElement('canvas');cv.width=400;cv.height=560;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;BV1.off=off;BV1.err='';BWK.mv=mv;BWK.ph=mv?1.3:0;let err='';
  try{c.setTransform(2*fx,0,0,2,200,440);drawBoss(0,0,T,{n:nm},hf,cf,false)}catch(e){err=String(e)}g=G0;LOWQ=L0;BV1.off=0;BWK.mv=0;BWK.ph=0;MAPS[curMap].bth=old;
  const d=c.getImageData(0,0,400,560).data;let n=0,y0=999,y1=-1,x0=999,x1=-1,wh=0;for(let y=0;y<560;y++)for(let x=0;x<400;x++){const i=(y*400+x)*4;if(d[i+3]>40){n++;if(y<y0)y0=y;if(y>y1)y1=y;if(x<x0)x0=x;if(x>x1)x1=x;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)wh++}}
  let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err:err||BV1.err,n,hgt:y1-y0,wid:x1-x0,wf:n?wh/n:0,h}}"""
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
        A=await new_client(b,'Bv'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}}")
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(800)
        # 1) ทุกตัวมีแบบใหม่ วาดได้ ตัวสูงขึ้น และต่างจากเดิม
        res={};fails=[]
        for nm,mp in L:
            o=await A.ev(MEAS,[nm,mp,1,10.4,0,0,0,0,1]);n=await A.ev(MEAS,[nm,mp,0,10.4,0,0,0,0,1])
            res[nm]=[o['hgt'],n['hgt'],n['n']]
            if n['err'] or n['n']<8000 or n['hgt']<o['hgt']*1.15 or n['n']<o['n']*1.4 or n['h']==o['h']: fails.append([nm,o,n])
        rep('บอส 7 ตัวใช้แบบวาดใหม่ วาดได้ไม่ error · ตัวใหญ่กว่าเดิม (สูง ≥1.15 เท่า · พื้นที่ ≥1.4 เท่า)',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   ความสูง เดิม→ใหม่ (px@2x):',json.dumps(res,ensure_ascii=False))
        # 2) ทุกท่า: เดิน ร่าย โดนตี(ขาว) หันซ้าย โหมดประหยัด
        fails=[]
        for nm,mp in L:
            for args in ([10.9,0,0,1,0,1],[11.3,0,.9,0,0,1],[10.4,.6,0,0,0,1],[10.4,0,0,0,0,-1],[10.4,0,0,0,1,1],[10.4,0,.9,1,1,-1]):
                r=await A.ev(MEAS,[nm,mp,0]+args)
                if r['err'] or r['n']<6000: fails.append([nm,args,r])
                if args[1]>0 and r['wf']<.45: fails.append([nm,'flash',r['wf']])
        rep('ทุกท่า (เดิน · ร่ายสกิล · กะพริบขาวตอนโดนตี · หันซ้าย · โหมดประหยัด) วาดได้ครบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        # 3) บอสอื่นไม่ถูกแตะ
        r=await A.ev("""()=>['เทวทูตร่วงหล่น อาซาเอล','โวราธ ผู้คุมรังดาว'].map(n=>!!BV1[n])""")
        rep('บอสที่ตั้งใจคงแบบเดิม (อาซาเอล · โวราธ) ยังใช้แบบเดิม',not any(r),json.dumps(r))
        # 4) ในเกม: แถบเลือด/ป้าย Lv ขยับขึ้นเหนือหัว · กรอบเลเยอร์ครอบตัวใหญ่ · MVP · ไม่มี error
        fails=[]
        for nm,mp in L+[('เทวทูตร่วงหล่น อาซาเอล',10)]:
            r=await A.ev("""async(mp)=>{if(mp>=10000)dgMap(mp);enterMap(mp,{x:CX-80,y:CY+40});await new Promise(r=>setTimeout(r,1300));try{SD.on&&stClose()}catch(e){};ov.hidden=true;
              try{setGQ('high')}catch(e){};const B=BS();mons=mons.filter(m=>m.t!==3);const h=99999,m={id:++mid,x:CX+40,y:CY,tx:CX+40,ty:CY,t:3,L:B.L,p:1,hx:CX+40,hy:CY,hp:h,mh:h,tg:null,tt:0,ac:99,w:null,lg:0,a1:4,a2:9,tl:[],enr:0,stun:99};mons.push(m);
              const box=[];const gb=gxLayerBox;window.gxLayerBox=gxLayerBox=function(cx,cy,w,hh){if(Math.abs(cx-m.x)<1)box.push([cy-m.y,w,hh]);return gb.apply(this,arguments)};
              const keep=setInterval(()=>{FQ.avg=12;if(!mons.includes(m))mons.push(m);m.hp=h;try{SD.on&&stClose()}catch(e){};ov.hidden=true},50);for(let k=0;k<6&&!box.length;k++)await new Promise(r=>setTimeout(r,500));await new Promise(r=>setTimeout(r,300));clearInterval(keep);window.gxLayerBox=gxLayerBox=gb;const t1=bvTop(m);m.mvp=1;const t2=bvTop(m);m.mvp=0;mons=mons.filter(q=>q!==m);
              return {n:B.n,t1,t2,box:box.slice(-2),err:BV1.err||''}}""",mp)
            new=nm in dict(L)
            if new:
                bx=max([b[2] for b in r['box']] or [0])
                if r['err'] or r['t1']<120 or r['t2']<=r['t1'] or bx<200: fails.append([nm,r])
            else:
                if r['t1']!=82: fails.append([nm,r])
        rep('ในเกม: แถบเลือด/ป้ายเลเวลอยู่เหนือหัวบอสตัวใหม่ (MVP สูงขึ้นอีก) · กรอบเลเยอร์แสงครอบทั้งตัว · บอสอื่นตำแหน่งเดิม',not fails,json.dumps(fails,ensure_ascii=False)[:900])
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
