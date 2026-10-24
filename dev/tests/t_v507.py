import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
MEAS="""([bi,f,off,T,hf,cf,mv,lq,fx])=>{const cv=document.createElement('canvas');cv.width=400;cv.height=460;const c=cv.getContext('2d');const G0=g,L0=LOWQ;g=c;LOWQ=!!lq;BV1.off=off;BV1.err='';BWK.mv=mv;BWK.ph=mv?1.3:0;let err='';
  try{c.setTransform(fx,0,0,1,200,360);drawTowerBoss(0,0,T,f||(bi+1)*10,hf,cf,false)}catch(e){err=String(e)}g=G0;LOWQ=L0;BV1.off=0;BWK.mv=0;BWK.ph=0;
  const d=c.getImageData(0,0,400,460).data;let n=0,wh=0,y0=999;for(let i=0;i<d.length;i+=4){if(d[i+3]>120){n++;const y=(i/4/400)|0;if(y<y0)y0=y;if(d[i]>235&&d[i+1]>235&&d[i+2]>235)wh++}}let h=0;for(let i=0;i<d.length;i+=97)h=(h*31+d[i])>>>0;return {err:err||BV1.err,n,wf:n?wh/n:0,h,y0}}"""
NM=['ราชินีแมงมุมพิษ','อัศวินไร้เศียร','ยักษ์ลาวาศิลา','ผู้พิทักษ์คริสตัล','ราชินีเงาสะท้อน','พฤกษาปีศาจโบราณ','ลิชผู้ทรงอาคม','วิหคเพลิงอเวจี','ยักษ์เหมันต์','เทพผู้ถูกผนึก']
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
        A=await new_client(b,'Tw'+str(random.randint(100,999)),'melee',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{setGQ('high')}catch(e){}}");await A.wait(600)
        fails=[]
        for bi in range(10):
            o=await A.ev(MEAS,[bi,0,1,10.4,0,0,0,0,1]);n=await A.ev(MEAS,[bi,0,0,10.4,0,0,0,0,1])
            if n['err'] or n['h']==o['h'] or n['n']<o['n']*.82 or n['y0']<130: fails.append([NM[bi],o,n])
        rep('บอสหอคอย 10 แบบใช้แบบวาดใหม่ ไม่ error · ขนาดใกล้เดิม (พื้นที่ ≥0.82 · แบบเดิมนับแสงฟุ้งด้วย) · หัวไม่ทะลุแถบเลือด',not fails,json.dumps(fails,ensure_ascii=False))
        fails=[]
        for bi in range(10):
            for args in ([0,10.9,0,0,1,0,1],[0,11.3,0,.9,0,0,1],[0,10.4,.6,0,0,0,1],[0,10.4,0,0,0,0,-1],[0,10.4,0,0,0,1,1],[(bi+1)*10+100,10.4,0,0,0,0,1],[(bi+1)*10+200,11.3,0,.9,1,1,-1]):
                r=await A.ev(MEAS,[bi,args[0],0]+args[1:])
                if r['err'] or r['n']<6000: fails.append([NM[bi],args,r])
                if args[2]>0 and r['wf']<.4: fails.append([NM[bi],'flash',r['wf']])
        rep('ทุกท่า (เดิน · ร่าย · กะพริบขาว · หันซ้าย · ประหยัด · ชั้น 110+/210+ วงคลั่ง) วาดได้ครบ',not fails,json.dumps(fails,ensure_ascii=False)[:800])
        r=await A.ev("""async()=>{const id=50000;dgMap(id);enterMap(id,{x:CX,y:CY+160});await new Promise(r=>setTimeout(r,1500));dg.tw={f:10};const h=99999,m={id:++mid,x:CX,y:CY,tx:CX,ty:CY,t:3,L:50,p:1,hx:CX,hy:CY,hp:h,mh:h,tg:null,tt:0,ac:99,w:null,lg:0,a1:4,a2:9,tl:[],enr:0,stun:99};mons.push(m);
          let br=0;const ft=g.fillText.bind(g);const o=g.fillText;g.fillText=function(t,x,y){if(String(t)==='Lv50'&&Math.abs(x-m.x)<1)br=m.y-y;return o.apply(this,arguments)};await new Promise(r=>setTimeout(r,500));g.fillText=o;BV1.off=1;let br2=0;g.fillText=function(t,x,y){if(String(t)==='Lv50'&&Math.abs(x-m.x)<1)br2=m.y-y;return o.apply(this,arguments)};await new Promise(r=>setTimeout(r,400));g.fillText=o;BV1.off=0;mons=mons.filter(q=>q!==m);return [br,br2]}""")
        rep('ป้ายเลเวล/แถบเลือดบอสหอคอยยกสูงขึ้นตามตัวใหม่ (เดิม 189 → ใหม่ 217)',r[0]>=210 and 185<=r[1]<=192,json.dumps(r))
        er=[e for e in A.errs if 'ERR_' not in e and 'favicon' not in e]
        rep('ไม่มี error',not er,json.dumps(er[:5],ensure_ascii=False))
        await b.close()
    finally: p.terminate()
    print('PASS',ok,'FAIL',bad)
asyncio.run(main())
