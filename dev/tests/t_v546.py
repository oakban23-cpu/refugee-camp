import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
BOSS=['วาฬกลืนฟ้า','ผู้เฝ้าไข่มุก','ผู้รักษาเวลา','ภาพสะท้อนโอเรียน','ผู้ทอ']
# วาดบอสผ่าน drawBoss ลงแคนวาสแยก: on=0 แบบเดิม · hf=โดนตี · cf=ร่าย · lq=ประหยัด · hp=เลือดบอส (bvHF) · ph=ร่างผู้ทอ · dv=วาฬดำน้ำ
MEAS="""([nm,on,hf,cf,lq,T,hp,ph,dv])=>{const cv=document.createElement('canvas');cv.width=320;cv.height=300;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;BV9.on=on;BV9.err='';BV1.hf=hp;let err='';const n0=BV9.n;
  const ph0=WVRFX.ph;WVRFX.ph=ph||1;const dv0=(typeof WSK!=='undefined')?WSK.dv:0;if(typeof WSK!=='undefined')WSK.dv=dv||0;
  try{c.setTransform(.7,0,0,.7,160,220);drawBoss(0,0,T,{n:nm},hf,cf,false)}catch(e){err=String(e)}finally{g=G0;LOWQ=L0;BV9.on=1;BV1.hf=null;WVRFX.ph=ph0;if(typeof WSK!=='undefined')WSK.dv=dv0}
  const d=c.getImageData(0,0,320,300).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>160)n++;let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err,berr:BV9.err,drawn:BV9.n-n0,n,h}}"""
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
        A=await new_client(b,'Bx'+str(random.randint(100,999)),'mage',99)   # จอแนวตั้ง 390x844
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev(f"()=>{json.dumps(BOSS,ensure_ascii=False)}.map(k=>[k,!!(BV1[k]&&BV1[k].bv9),typeof BV9.old[k]])")
        rep('ติดตั้งบอสใหม่ 5 ตัว (ห่อแบบเดิมไว้สำรอง)',all(x[1] and x[2]=='function' for x in r),json.dumps(r,ensure_ascii=False))
        fails=[];res={}
        for k in BOSS:
            o=await A.ev(MEAS,[k,0,0,0,0,10.37,1,1,0]);n=await A.ev(MEAS,[k,1,0,0,0,10.37,1,1,0]);res[k]=[o['n'],n['n']]
            if n['err'] or n['berr'] or n['drawn']<1 or n['h']==o['h'] or n['n']<o['n']*.85: fails.append([k,o,n])
        rep('วาดแบบใหม่ได้ ไม่ error ต่างจากเดิม ไม่เล็กกว่าเดิม',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        print('   พื้นที่ เดิม→ใหม่:',json.dumps(res,ensure_ascii=False))
        fails=[]
        for k in BOSS:
            for hf,cf,lq,T,hp in [(.6,0,0,10.37,1),(0,.85,0,11.3,1),(0,0,1,12.1,1),(0,0,0,13.7,.3)]:
                r=await A.ev(MEAS,[k,1,hf,cf,lq,T,hp,1,0])
                if r['err'] or r['berr'] or r['n']<1500: fails.append([k,hf,cf,lq,T,hp,r])
        rep('ทุกท่า: โดนตี · ร่าย · โหมดประหยัด · เลือดต่ำ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        hs=[await A.ev(MEAS,['ผู้ทอ',1,0,0,0,10.37,1,ph,0]) for ph in (1,2,3)]
        rep('ผู้ทอ 3 ร่างวาดต่างกัน (ขา 6 → 2 · แกนโตขึ้น · เกราะแตก)',len({x['h'] for x in hs})==3 and not any(x['err'] or x['berr'] for x in hs),json.dumps(hs))
        hs=[await A.ev(MEAS,['ภาพสะท้อนโอเรียน',1,0,0,0,10.37,hp,1,0]) for hp in (1,.7,.3)]
        rep('ภาพสะท้อนโอเรียน: รอยร้าวเพิ่มตามเลือดที่ลด',len({x['h'] for x in hs})==3,json.dumps(hs))
        o=await A.ev(MEAS,['วาฬกลืนฟ้า',0,0,0,0,10.37,1,1,2]);n=await A.ev(MEAS,['วาฬกลืนฟ้า',1,0,0,0,10.37,1,1,2])
        rep('วาฬดำน้ำ (WSK.dv=2) ยังเป็นวงคลื่นแบบเดิม',o['h']==n['h'] and n['drawn']==0,json.dumps([o,n]))
        r=await A.ev("""()=>{const out=[];for(const k of ['ผู้ทอ','วาฬกลืนฟ้า']){const sv=BV9D[k];BV9D[k]=function(){throw new Error('x')};const G0=g,cv=document.createElement('canvas');cv.width=cv.height=80;g=cv.getContext('2d');BV9.err='';let e='';try{BV1[k](10,0,0,0,0,0)}catch(x){e=String(x)}g=G0;BV9D[k]=sv;out.push([k,e,BV9.err.slice(0,12)])}return out}""")
        rep('แบบใหม่ error → ใช้แบบเดิม ไม่พัง',all(x[1]=='' and x[2] for x in r),json.dumps(r,ensure_ascii=False))
        # ป้ายสถานะดันในจอแนวตั้ง
        r=await A.ev("""async()=>{gmGod=true;me.sty={s:STY.findIndex(x=>x.p9tv),n:0,a:1,e:1,e8:1,q9:1};ov.hidden=true;wvrEnter();await new Promise(r=>setTimeout(r,2600));dgStart();
          for(let i=0;i<40;i++){try{stTick();if(SD.on&&!SD.choice){if(SD.typ)stNext();stNext()}}catch(e){}await new Promise(r=>setTimeout(r,80))}await new Promise(r=>setTimeout(r,4000));
          const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+170}await new Promise(r=>setTimeout(r,800));
          const po=dgPillOff(),bar=(typeof FEVC!=='undefined'&&FEVC?48:12)+hudTY();return [!!B,po,bar,8+hudTY()+po,innerWidth<innerHeight]}""")
        rep('จอแนวตั้งในดัน: ป้ายสถานะเลื่อนลงใต้แถบเลือดบอส (ไม่ทับ)',r[0] and r[1]>0 and r[3]>=r[2]+60 and r[4],json.dumps(r))
        await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+900}}");await A.wait(500)
        r2=await A.ev("()=>dgPillOff()")
        rep('ห่างบอส (ไม่มีแถบเลือด) → ป้ายกลับที่เดิม',r2==0,str(r2))
        await A.pg.set_viewport_size({'width':1280,'height':720});await A.wait(1500)
        await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+170}}");await A.wait(1200)
        r3=await A.ev("()=>[dgPillOff(),!!vwBossBar()]")
        rep('จอแนวนอน: แถบบอสอยู่บนกลาง ป้ายไม่ต้องเลื่อน',r3[0]==0 and r3[1],json.dumps(r3))
        er=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้า',not er,str(er[:3]))
    finally: p.terminate()
    print(f'SUMMARY: {ok} / {ok+bad} passed')
asyncio.run(main())
