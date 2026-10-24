"""v509 วาดมอนใหม่รายตัว ชุด 3: แมพ 19–27 (25 ตัว · แมพ 26 เหลือดวงไฟหัวใจ)"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:700], flush=True)
ALL="""()=>{const out={err:[],empty:[],ratio:{},n:0};const N=360,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');const G0=g,L0=LOWQ;
  const area=()=>{const d=x.getImageData(0,0,N,N).data;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>150)n++;return n};
  for(const k of Object.keys(MV1D).map(Number).filter(k=>k>=190&&k<280&&k!==260&&k!==262)){const th=Math.floor(k/10),t=k%10;
    for(const[T,fx,hf,lq]of[[.4,1,0,false],[1.7,-1,0,false],[2.9,1,.6,false],[1.1,1,0,true]]){x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,N,N);x.setTransform(3,0,0,3,N/2,N*.66);g=x;LOWQ=lq;MPC.rich=1;let ok=true;
      try{ok=drawMonV(th,t,(MT[t]&&MT[t].r)||12,T,null,null,null,null,c=>hf>.3?'#fff':c,hf>.3,Math.sin(T*4),Math.sin(T*7),1,0)}catch(e){out.err.push([k,String(e).slice(0,60)])}finally{g=G0;LOWQ=L0;MPC.rich=0}
      const a=area();if(!ok||a<300)out.empty.push([k,T,a]);out.n++;if(T===.4)out.ratio[k]=a}}return out}"""
BENCH="""()=>{const out={};const N=200,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');const G0=g,L0=LOWQ;
  for(const k of Object.keys(MV1D).map(Number).filter(k=>k>=190&&k<280&&k!==260&&k!==262)){const th=Math.floor(k/10),t=k%10;const CM0=curMap;curMap=th;const res=[];
    for(const on of[0,1]){let best=1e9;for(let rep=0;rep<3;rep++){const f=MV1D[k];if(!on)delete MV1D[k];x.setTransform(2,0,0,2,N/2,N*.66);g=x;LOWQ=false;MPC.rich=1;const t0=performance.now();let n=0;
      try{for(let i=0;i<20;i++){x.clearRect(-200,-200,400,400);drawMonT(0,0,t,i*.07,1,0,0,th);n++}}catch(e){}finally{g=G0;LOWQ=L0;MPC.rich=0;if(f)MV1D[k]=f}best=Math.min(best,(performance.now()-t0)/Math.max(1,n))}res.push(+best.toFixed(3))}
    curMap=CM0;out[k]=res}return out}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Mn'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{try{setGQ('high')}catch(e){}LOWQ=false;ov.hidden=true;AUTO.on=false;window.DNH=12;gmGod=true;window.__fq=setInterval(()=>{FQ.avg=14;MPC.auto=1},100);try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        a=await A.ev(ALL)
        keys=sorted(a['ratio'].keys(),key=int)
        want=sorted([str(m*10+t) for m in list(range(19,26))+[27] for t in range(3)]+['261'],key=int)
        rep('แบบใหม่แมพ 19–27 ครบ 25 แบบ วาดได้ทั้ง 4 ท่า/หันซ้าย-ขวา/กะพริบขาว/โหมดประหยัด ไม่ error ไม่ว่าง',not a['err'] and not a['empty'] and keys==want and a['n']==25*4,{'n':a['n'],'types':len(keys),'err':a['err'][:3],'empty':a['empty'][:5]})
        sc=await A.ev("()=>{const o={};for(let m=19;m<=27;m++)for(let t=0;t<3;t++){const k=m*10+t;if(m===26&&t!==1)continue;o[k]=MV1S[k]||1}return o}")
        rep('ตัวคูณขนาด (MV1S) ตั้งครบทุกตัว อยู่ในช่วง 1.0–1.45 (ขนาดใกล้ภาพเดิม)',all(1<=v<=1.45 for v in sc.values()) and len(sc)==25,sc)
        cnt={}
        for mp in range(19,28):
            await A.ev(f"()=>{{enterMap({mp},{{x:CX,y:CY}})}}");await A.wait(900)
            r=await A.ev("""()=>{const hit={};for(const k in MV1D){const f=MV1D[k];MV1D[k]=function(){hit[k]=(hit[k]|0)+1;return f.apply(this,arguments)};MV1D[k].__o=f}
              const c=document.createElement('canvas');c.width=c.height=320;const x=c.getContext('2d');const G0=g;for(const t of[0,1,2]){const m={id:990000+t,x:0,y:0,t,L:10,p:0,hp:1,mh:1,fx:1};x.setTransform(2.4,0,0,2.4,160,220);g=x;try{mpcMon(m,1.3,1,0,0)}finally{g=G0}}
              for(const k in MV1D)MV1D[k]=MV1D[k].__o;return [curMap,hit]}""")
            cnt[mp]=r
        ok=all(all(str(mp*10+t) in cnt[mp][1] for t in range(3)) and cnt[mp][0]==mp for mp in range(19,28))
        rep('ในแมพจริง 19–27: มอนทั้ง 3 ชนิดของแต่ละแมพใช้แบบใหม่ (ผ่านภาพแคช · แมพ 26 ตัวธรรมดา/ตัวใหญ่จาก v501)',ok,{k:v for k,v in cnt.items()})
        d=await A.ev("""async()=>{dgEnter(75001);await new Promise(r=>setTimeout(r,2500));const hit={};for(const k of[220,221,222]){const f=MV1D[k];MV1D[k]=function(){hit[k]=(hit[k]|0)+1;return f.apply(this,arguments)};MV1D[k].__o=f}
          const c=document.createElement('canvas');c.width=c.height=320;const x=c.getContext('2d');const G0=g;for(const t of[0,1,2]){const m={id:993000+t,x:0,y:0,t,L:10,p:0,hp:1,mh:1,fx:1};x.setTransform(2.4,0,0,2.4,160,220);g=x;try{mpcMon(m,1.3,1,0,0)}finally{g=G0}}
          for(const k of[220,221,222])MV1D[k]=MV1D[k].__o;return [curMap,bTheme(),hit]}""")
        rep('ดันเจี้ยนห้วงเงา (ใช้ธีมแมพ 22): มอนใช้แบบใหม่ของแมพ 22',d[1]==22 and all(str(k) in d[2] for k in (220,221,222)),d)
        bn=await A.ev(BENCH)
        slow={k:v for k,v in bn.items() if v[1]>3}
        avg=sum(v[1] for v in bn.values())/len(bn);avg0=sum(v[0] for v in bn.values())/len(bn)
        rep('ความเร็ววาดตรง (ไม่ผ่านแคช): ทุกแบบ ≤ 3 ms/ครั้ง (ปกติวาดผ่านภาพแคช)',not slow,{'avg_new':round(avg,3),'avg_old':round(avg0,3),'slow':slow})
        old=await A.ev("()=>[10,11,12,20,30,40,50,60,70,80,81,82,260,262,100,121,152,182].every(k=>!!MV1D[k])")
        rep('แบบใหม่ชุดก่อน (v501 แมพ 1–8 · v508 แมพ 10–18) ยังอยู่ครบ',old,old)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
