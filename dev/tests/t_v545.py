import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
KEYS=[390,391,400,401,402,420,421,422,432,441]
# วาดมอนผ่าน drawMonT ลงแคนวาสแยก: on=0 แบบเดิม · W=โดนตี · lq=โหมดประหยัด
MEAS="""([k,on,W,lq,T])=>{const th=Math.floor(k/10),t=k%10,cv=document.createElement('canvas');cv.width=260;cv.height=260;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;MV9.on=on;MV9.err='';let err='';const n0=MV9.n,s1=MV1S[k];if(!on)MV1S[k]=MV9.s0[k];
  try{c.setTransform(3,0,0,3,130,170);drawMonT(0,0,t,T,1,0,W?.6:0,th)}catch(e){err=String(e)}finally{g=G0;LOWQ=L0;MV9.on=1;MV1S[k]=s1}
  const d=c.getImageData(0,0,260,260).data;let n=0,wh=0;for(let i=3;i<d.length;i+=4)if(d[i]>160){n++;if(d[i-1]>235&&d[i-2]>235&&d[i-3]>235)wh++}
  let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err,merr:MV9.err,drawn:MV9.n-n0,n,wh,h}}"""
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
        A=await new_client(b,'Mx'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;me.sty={s:STY.findIndex(x=>x.p9tv)+1,n:0,a:1,e:1,e8:1,q9:1,e9:1};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}");await A.wait(1500)
        r=await A.ev(f"()=>{KEYS}.map(k=>[k,!!(MV1D[k]&&MV1D[k].mv9),typeof MV9.old[k],MV1S[k]])")
        rep('ติดตั้ง 10 แบบ (ห่อตัวเดิมไว้สำรอง) · ขนาด MV1S ใหม่',all(x[1] and x[2]=='function' and x[3]>=1.4 for x in r),json.dumps(r))
        fails=[];res={}
        for k in KEYS:
            o=await A.ev(MEAS,[k,0,0,0,1.3]);n=await A.ev(MEAS,[k,1,0,0,1.3]);res[k]=[o['n'],n['n']]
            if n['err'] or n['merr'] or n['drawn']<1 or n['h']==o['h'] or n['n']<o['n']*.9: fails.append([k,o,n])
        rep('วาดแบบใหม่ได้ ไม่ error ต่างจากเดิม และไม่เล็กกว่าเดิม (เทียบที่ขนาดเดิมของแต่ละแบบ)',not fails,json.dumps(fails)[:800])
        print('   พื้นที่ เดิม→ใหม่:',json.dumps(res))
        fails=[]
        for k in KEYS:
            for W,lq,T in [(1,0,1.3),(0,1,2.7),(0,0,5.05),(0,0,9.9)]:
                r=await A.ev(MEAS,[k,1,W,lq,T])
                if r['err'] or r['merr'] or r['n']<300 or (W and r['wh']<r['n']*.1): fails.append([k,W,lq,T,r])
        rep('ทุกจังหวะ + ตอนโดนตี (ขาวทั้งตัว) + โหมดประหยัด',not fails,json.dumps(fails)[:800])
        r=await A.ev("""()=>{const out=[];for(const k of [391,432]){const sv=MV9D[k];MV9D[k]=function(){throw new Error('x')};const G0=g,cv=document.createElement('canvas');cv.width=cv.height=60;g=cv.getContext('2d');MV9.err='';let ret;try{ret=MV1D[k](20,1.2,0,0,0,0,0)}catch(e){ret='throw'}g=G0;MV9D[k]=sv;out.push([k,ret,MV9.err.slice(0,20)])}return out}""")
        rep('แบบใหม่ error → ใช้แบบเดิม (เก็บ MV9.err) ไม่พัง',all(x[1] is True and x[2] for x in r),json.dumps(r))
        r=await A.ev("""()=>{const G0=g,cv=document.createElement('canvas');cv.width=cv.height=60;g=cv.getContext('2d');const M0=MON_CUR;const n0=MV9.n;
          MON_CUR={hg:1};const a=MV1D[432](20,1,0,0,0,0,0);MON_CUR={mr:1};const b=MV1D[442](20,1,0,0,0,0,0);MON_CUR=M0;g=G0;return [a,b,MV9.n-n0]}""")
        rep('ซ่อนตัวในดันยังทำงาน (ผีดาวดับตอน hg · ผีเสื้อตอน mr)',r[0] is True and r[1] is True and r[2]==0,json.dumps(r))
        r=await A.ev("""()=>{const G0=g,cv=document.createElement('canvas');cv.width=cv.height=200;const c=cv.getContext('2d');g=c;c.setTransform(2,0,0,2,100,130);let e='';try{drawMonT(0,0,0,1.5,1,0,0,43);drawMonT(0,0,2,1.5,1,0,0,44)}catch(x){e=String(x)}g=G0;return e}""")
        rep('แมวดาวหาง/ผีเสื้อราตรีดาว (เปลี่ยนจุดสี่เหลี่ยมเป็นประกายดาว) วาดได้',r=='',r)
        for mp in (39,40,41,42):
            r=await A.ev("""async(mp)=>{enterMap(mp,{x:MAPS[mp].sx,y:MAPS[mp].sy});await new Promise(r=>setTimeout(r,2600));ov.hidden=true;try{SD.on&&stClose()}catch(e){}
              const th=MAPS[mp].mth||mp,L=mons.filter(m=>m.t<3);L.slice(0,9).forEach((m,i)=>{m.x=me.x-160+(i%3)*160;m.y=me.y-120+Math.floor(i/3)*110});MV9.err='';const n0=MV9.n;await new Promise(r=>setTimeout(r,1200));return [curMap,th,L.length,MV9.n-n0,MV9.err]}""",mp)
            print('  ',r)
            need=0 if r[1]==43 and False else 1
            rep(f'ในเกมแมพ {mp} (ธีม {r[1]}): มอนแบบใหม่วาดทุกเฟรม ไม่ error',r[0]==mp and r[2]>0 and r[3]>=10 and not r[4],json.dumps(r,ensure_ascii=False))
        er=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้า',not er,str(er[:3]))
    finally: p.terminate()
    print(f'SUMMARY: {ok} / {ok+bad} passed')
asyncio.run(main())
