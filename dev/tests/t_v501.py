"""v501 วาดมอนใหม่รายตัว: แมพ 1–8 (24 ตัว) · ดันเจี้ยนสุสาน (ผู้เฝ้าสุสานถือโคม แทนมัมมี่ซ้ำ) · ชุดโครงซ้ำ (26 ซาลาแมนเดอร์ลาวา/อสูรเตาหลอม · 35 ตุ่นเจาะแร่/หุ่นรถแร่ · 38 ยักษ์ซากเรือ)"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
ALL="""()=>{const out={err:[],empty:[],ratio:{},n:0};const N=360,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');const G0=g,L0=LOWQ;
  const area=()=>{const d=x.getImageData(0,0,N,N).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>150)n++;return n};
  for(const k of Object.keys(MV1D).map(Number).filter(k=>!(k>=100&&k<190))){const th=Math.floor(k/10),t=k%10;
    for(const[T,fx,hf,lq]of[[.4,1,0,false],[1.7,-1,0,false],[2.9,1,.6,false],[1.1,1,0,true]]){x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,N,N);x.setTransform(3,0,0,3,N/2,N*.66);g=x;LOWQ=lq;MPC.rich=1;let ok=true;
      try{ok=drawMonV(th,t,(MT[t]&&MT[t].r)||12,T,null,null,null,null,c=>hf>.3?'#fff':c,hf>.3,Math.sin(T*4),Math.sin(T*7),1,0)}catch(e){out.err.push([k,String(e).slice(0,60)])}finally{g=G0;LOWQ=L0;MPC.rich=0}
      const a=area();if(!ok||a<300)out.empty.push([k,T,a]);out.n++;if(T===.4)out.ratio[k]=a}}return out}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Mn'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}LOWQ=false;ov.hidden=true;AUTO.on=false;window.DNH=12;gmGod=true;window.__fq=setInterval(()=>{FQ.avg=14;MPC.auto=1},100);try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        a=await A.ev(ALL)
        keys=sorted(a['ratio'].keys(),key=int)
        rep('แบบใหม่ทุกตัว (29 แบบ) วาดได้ทั้ง 4 ท่า/หันซ้าย-ขวา/กะพริบขาว/โหมดประหยัด ไม่ error ไม่ว่าง',not a['err'] and not a['empty'] and len(keys)==29 and a['n']==29*4,{'n':a['n'],'types':len(keys),'err':a['err'][:3],'empty':a['empty'][:5]})
        cnt={}
        for mp in (1,2,3,4,6,7,8,26,35,38):
            await A.ev(f"()=>{{enterMap({mp},{{x:CX,y:CY}})}}");await A.wait(900)
            r=await A.ev("""()=>{const hit={};for(const k in MV1D){const f=MV1D[k];MV1D[k]=function(){hit[k]=(hit[k]|0)+1;return f.apply(this,arguments)};MV1D[k].__o=f}
              const c=document.createElement('canvas');c.width=c.height=320;const x=c.getContext('2d');const G0=g;for(const t of[0,1,2]){const m={id:990000+t,x:0,y:0,t,L:10,p:0,hp:1,mh:1,fx:1};x.setTransform(2.4,0,0,2.4,160,220);g=x;try{mpcMon(m,1.3,1,0,0)}finally{g=G0}}
              for(const k in MV1D)MV1D[k]=MV1D[k].__o;return [bTheme(),hit]}""")
            cnt[mp]=r
        want={1:['10','11','12'],2:['20','21','22'],3:['30','31','32'],4:['40','41','42'],6:['60','61','62'],7:['70','71','72'],8:['80','81','82'],26:['260','262'],35:['350','352'],38:['382']}
        ok=all(all(k in cnt[mp][1] for k in ks) for mp,ks in want.items())
        rep('ในแมพจริง: มอนแมพ 1–8 · 26 · 35 · 38 ใช้แบบใหม่ (แต่ตัวที่ไม่ได้วาดใหม่ยังใช้แบบเดิม)',ok and '381' not in cnt[38][1] and '261' not in cnt[26][1],{k:v for k,v in cnt.items()})
        d=await A.ev("""async()=>{dgEnter(11234);await new Promise(r=>setTimeout(r,2500));let n=0;const f=MV1D[50];MV1D[50]=function(){n++;return f.apply(this,arguments)};
          const c=document.createElement('canvas');c.width=c.height=320;const x=c.getContext('2d');const G0=g;const m={id:991000,x:0,y:0,t:0,L:10,p:0,hp:1,mh:1,fx:1};x.setTransform(2.4,0,0,2.4,160,220);g=x;try{mpcMon(m,1.3,1,0,0)}finally{g=G0;MV1D[50]=f}return [curMap,bTheme(),n]}""")
        rep('ดันเจี้ยนสุสานต้องสาป: ตัวธรรมดาเป็น «ผู้เฝ้าสุสานถือโคม» (ไม่ซ้ำมัมมี่แมพ 8)',d[1]==5 and d[2]>0,d)
        await A.ev("()=>{enterMap(38,{x:2000,y:1800})}");await A.wait(1500)
        h=await A.ev("""()=>{let n=0;const f=MV1D[382];MV1D[382]=function(){n++;return f.apply(this,arguments)};const c=document.createElement('canvas');c.width=c.height=320;const x=c.getContext('2d');const G0=g;
          const m={id:992000,x:0,y:0,t:2,L:10,p:0,hp:1,mh:1,fx:1,hdg:0};x.setTransform(2.4,0,0,2.4,160,220);g=x;MON_CUR=m;let d=0;try{d=drawMonT(0,0,2,1.3,1,0,0,38)}finally{g=G0;MON_CUR=null;MV1D[382]=f}
          const dd=x.getImageData(0,0,320,320).data;let pu=0;for(let i=0;i<dd.length;i+=4)if(dd[i+3]>200&&dd[i+2]>dd[i+1]+25&&dd[i]>dd[i+1]+10)pu++;return [n,d,pu]}""")
        txt=await A.ev("()=>{const s=JSON.stringify(STY);return [s.includes('ยักษ์ซากเรือ'),s.includes('ยักษ์เพรียงหิน')]}")
        rep('ผาท่าเรือ: หนวดรัดเครื่องดาวยังเป็นหนวดหมึก (ไม่โดนแบบใหม่ทับ) · ข้อความภารกิจเปลี่ยนชื่อเป็น «ยักษ์ซากเรือ»',h[0]==0 and h[2]>100 and txt[0] and not txt[1],[h,txt])
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
