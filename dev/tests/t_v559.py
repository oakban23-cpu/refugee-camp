"""v559 แผนที่ใหม่ลื่นขึ้นบนมือถือรุ่นกลาง (ภาพเหมือนเดิม)
   ① งานสร้างชังก์ครั้งเดียวต่อเฟรม (แมพมีที่ราบวาดพื้น 2 รอบ/เฟรม แต่สร้างชังก์รอบเดียว) · รอบผิวบนที่ราบวาดเฉพาะชังก์ในกรอบที่ราบ
   ② ความละเอียดชังก์ตาม DPR: ปกติ 2 · ประหยัดขั้น 1 = 1.75 · ประหยัด = 1.5 · ซูมกล้องใกล้บอส (0.84) ไม่ต้องสร้างใหม่
   ③ งบเวลาตามเวลาว่างในเฟรม (เฟรมเบา → ไม่ล้นรอบจอ · เครื่องช้า → ไม่เกินงบเดิม · อย่างน้อย 1 ขั้น/เฟรม)
   ④ สนามต่อชังก์ (เงาโคน/ร่มไม้) แบบเร็ว = ค่าเดิม · ⑤ แคนวาสชังก์ใช้ซ้ำแล้วภาพตรงกับแคนวาสใหม่
   ⑥ แมพตระกูลวัง: เติมรายละเอียดเริ่มหลังภาพเดิม ≥ 0.25 วิ · เสร็จครบ · ประหยัดขั้น 1 ใช้ 1.75 · ⑦ ไม่มีข้อผิดพลาด"""
import asyncio, sys, random, json, re
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
# ฟังก์ชันสนามแบบเดิม (ก่อน v559) ไว้เทียบค่า
old=open(S+'mx/mx1_pre_v559.js').read()
i0=old.index('function mxField(cx,cy){');i1=old.index('/* ===== ชังก์: สร้างเป็นขั้น ๆ')
OLDF=old[i0:i1].replace('function mxField(cx,cy){','window.mxFieldOld=function(cx,cy){').replace('MX.cg','MX.cgOld')
WAITJ="""async(lim)=>{const t0=performance.now();let z=0;while(performance.now()-t0<lim){const b=[...MX.jobs.values()].filter(J=>J.vis).length;z=b?0:z+1;if(z>=3)return performance.now()-t0;await new Promise(r=>setTimeout(r,120))}return -1}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':384,'height':832},device_scale_factor=2.8125,has_touch=True,is_mobile=True)
        await ctx.add_init_script("try{localStorage.setItem('refugee_gq','auto')}catch(e){}")
        pg=await ctx.new_page();A=Client(ctx,pg,'V');errs=[]
        pg.on('pageerror',lambda e:errs.append((e.stack or str(e))[:300]))
        pg.on('console',lambda m:errs.append('console.'+m.type+': '+m.text[:300]) if m.type=='error' else None)
        await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['melee','Pf'+str(random.randint(100,999)),99]);await pg.wait_for_timeout(1500)
        EX=lambda:[e for e in errs if 'ERR_TUNNEL_CONNECTION_FAILED' not in e and 'ERR_' not in e]
        await A.ev("()=>{window.DNH=12;gmGod=true;AUTO.on=false;ov.hidden=true;lqWindow=function(){};GQ='test'}")
        v=await A.ev("()=>[typeof mxBud,typeof mxRes,typeof mxCvPool,typeof MX.fc,DPR]")
        rep('โหลดตัวปรับความลื่น v559 (งบเวลาตามเฟรม · ความละเอียดตาม DPR · แคนวาสใช้ซ้ำ · ตัวนับเฟรม)',v[0]=='function' and v[1]=='function' and v[2]=='function' and v[3]=='number' and v[4]==2,v)
        # ① ครั้งเดียวต่อเฟรม + รอบผิวบนที่ราบวาดเฉพาะในกรอบ
        await A.ev("()=>{const T=TERD[13][0];enterMap(13,{x:T[0],y:T[1]+T[2]*.72+40});mons.length=0}");await A.wait(1500)
        await A.ev("()=>{const P=terGet()[0],x=P.cx+20,y=P.bb[3]+250;me.x=x;me.y=y;window.__pin=setInterval(()=>{me.x=x;me.y=y;mons.length=0},40)}")
        w=await A.ev(WAITJ,15000)
        F1="""()=>new Promise(res=>{const o={g:[],run:0,fr:0};const G=mxGround,RU=mxRun,proto=CanvasRenderingContext2D.prototype;let cur=null;
          window.mxRun=mxRun=function(){o.run++;return RU.apply(this,arguments)};
          window.mxGround=mxGround=function(MP){const fc=MX.fc,first=MX.fc!==MX.lf;const rec={fc,first,img:0,cb:MX.cb?MX.cb.slice():null};cur=rec;g.drawImage=function(){rec.img++;return proto.drawImage.apply(g,arguments)};try{return G.apply(this,arguments)}finally{delete g.drawImage;o.g.push(rec);cur=null}};
          const t0=performance.now();function f(){o.fr++;if(performance.now()-t0<1500)requestAnimationFrame(f);else{window.mxGround=mxGround=G;window.mxRun=mxRun=RU;res(o)}}requestAnimationFrame(f)})"""
        f2=await A.ev(F1)
        await A.ev("()=>{MX.jobs.clear();GX.ch.clear();MX.done.clear()}")
        f1=await A.ev(F1)
        byf2={}
        for r in f2['g']: byf2.setdefault(r['fc'],[]).append(r)
        two2=[v for v in byf2.values() if len(v)==2]
        byf={}
        for r in f1['g']: byf.setdefault(r['fc'],[]).append(r)
        fr=[v for k,v in byf.items() if len(v)>=1]
        two=[v for v in fr if len(v)==2]
        okA=len(two)>=5 and all(v[0]['first'] and not v[1]['first'] for v in two) and f1['run']<=len(fr)+1
        okB=len(two2)>=5 and all(v[1]['cb'] is not None and v[1]['img']<v[0]['img'] for v in two2)
        rep('แมพมีที่ราบ: วาดพื้น 2 รอบต่อเฟรม แต่สร้างชังก์ (mxRun) รอบเดียวต่อเฟรม',okA,{'frames':len(fr),'two':len(two),'run':f1['run'],'w':round(w)})
        rep('รอบผิวบนที่ราบ: วาดเฉพาะชังก์ในกรอบที่ราบ (น้อยกว่ารอบแรก)',okB,[[v[0]['img'],v[1]['img']] for v in two2[:6]]+[two2[0][1]['cb'] if two2 else None])
        w2=await A.ev(WAITJ,20000)
        rep('ชังก์บนจอสร้างเสร็จครบหลังล้างแคช (อย่างน้อย 1 ขั้นต่อเฟรม)',w2>=0,round(w2))
        await A.ev("()=>{clearInterval(window.__pin)}")
        # ② ความละเอียดตาม DPR / ไม่ตามซูม
        rr=[]
        await A.ev("()=>{enterMap(3,{x:1600,y:1600})}");await A.wait(1200)
        rr.append(['ปกติ',await A.ev("()=>[DPR,MX.r]")])
        await A.ev("()=>{window.__cz=camZoomT;window.camZoomT=camZoomT=()=>.84}");await A.wait(1600)
        rr.append(['ซูม .84',await A.ev("()=>[DPR,MX.r,+ZM.z.toFixed(2)]")])
        await A.ev("()=>{window.camZoomT=camZoomT=window.__cz}");await A.wait(800)
        await A.ev("()=>{LITEQ=1;applyQ()}");await A.wait(1000)
        rr.append(['ประหยัดขั้น 1',await A.ev("()=>[DPR,MX.r,LITEQ]")])
        w3=await A.ev(WAITJ,20000)
        rr.append(['ชังก์ 1.75 เสร็จ',round(w3),await A.ev("()=>[...GX.ch.keys()].filter(k=>/\\|1\\.75$/.test(k)).length")])
        await A.ev("()=>{LITEQ=0;LOWQ=true;applyQ()}");await A.wait(1000)
        rr.append(['ประหยัด',await A.ev("()=>[DPR,MX.r,LOWQ]")])
        await A.ev("()=>{LOWQ=false;applyQ()}");await A.wait(1000)
        rr.append(['กลับปกติ',await A.ev("()=>[DPR,MX.r]")])
        okR=rr[0][1]==[2,2] and rr[1][1][1]==2 and rr[1][1][2]<.9 and rr[2][1][:2]==[1.75,1.75] and rr[3][1]>=0 and rr[3][2]>=1 and rr[4][1][:2]==[1.5,1.5] and rr[5][1]==[2,2]
        rep('ความละเอียดชังก์ตาม DPR (2 / 1.75 / 1.5) · ซูมกล้อง 0.84 ไม่เปลี่ยน (ไม่ต้องสร้างใหม่)',okR,rr)
        # ③ งบเวลาตามเวลาว่างในเฟรม
        bud=await A.ev("""()=>{const L0=FQ.last,D0=PF.draw,J0=MX.jl;const out={};
          const at=(pre,dr,jl)=>{FQ.last=performance.now()-pre;PF.draw=dr;MX.jl=jl;return [0,1,2].map(k=>+mxBud(k,0).toFixed(1))};
          try{out.fast=at(3,6,1);out.tight=at(6,9,1);out.mid=at(8,13,1);out.slow=at(40,45,5);out.lq=[0,1,2].map(k=>{FQ.last=performance.now()-40;PF.draw=45;MX.jl=5;return +mxBud(k,1).toFixed(1)})}finally{FQ.last=L0;PF.draw=D0;MX.jl=J0}return out}""")
        okBud=bud['fast'][0]<9 and bud['fast'][0]>=5 and bud['tight']==[5,3,2] and 5<=bud['mid'][0]<=22 and bud['slow']==[20,9,6] and bud['lq']==[14,6,4] and all(x<=c for x,c in zip(bud['fast'],[22,9,6]))
        rep('งบสร้างชังก์ตามเวลาว่างในเฟรม: เฟรมเบาเติมให้พอดีรอบจอ · เฟรมแน่น = ขั้นต่ำ · เครื่องช้า ≤ งบเดิม · โหมดประหยัด ≤ งบประหยัด',okBud,bud)
        # ④ สนามต่อชังก์แบบเร็ว = ค่าเดิม
        await A.ev("()=>{"+OLDF+";return 1}")
        dd=[]
        for mp in (13,3,7,15):
            await A.ev(f"()=>{{enterMap({mp},{{x:1600,y:1600}})}}");await A.wait(900)
            dd.append([mp,await A.ev("""()=>{mxTrees();MX.cgOld=new Map();let mx={d:0,a:0,s:0,h:0,z:0},nt=0;for(const[cx,cy]of[[2,2],[3,4],[5,3],[4,6],[1,5]]){MX.cg.delete(curMap+'|'+cx+'|'+cy);const N=mxField(cx,cy),O=mxFieldOld(cx,cy);
              for(const k of['d','a','s','h','z'])for(let o=0;o<N[k].length;o++){const e=Math.abs(N[k][o]-O[k][o]);if(e>mx[k])mx[k]=e}}nt=(MX.trs||[]).length;for(const k in mx)mx[k]=+mx[k].toFixed(5);mx.trees=nt;return mx}""")])
        okF=all(x[1]['d']<.002 and x[1]['a']<.002 and x[1]['s']<.002 and x[1]['h']==0 and x[1]['z']==0 for x in dd) and any(x[1]['trees']>50 for x in dd)
        rep('สนามต่อชังก์แบบเร็ว (เงาโคน/ร่มไม้) ได้ค่าเท่าเดิม (ต่างไม่เกิน 0.002)',okF,dd)
        # ⑤ แคนวาสใช้ซ้ำ: ภาพตรงกับแคนวาสใหม่
        await A.ev("()=>{enterMap(3,{x:1600,y:1600})}");await A.wait(1200);await A.ev(WAITJ,15000)
        pc=await A.ev("""()=>{const r=MX.r,px=Math.ceil(384*r),cx=6,cy=6,k=mxKey(cx,cy,r);
          const run=()=>{GX.ch.delete(k);MX.jobs.delete(k);const J=mxJob(cx,cy,r,0);MX.jobs.delete(k);let n=0;while(!mxStep(J)&&n<99)n++;return J.c};
          const dirty=document.createElement('canvas');dirty.width=dirty.height=px;const dx=dirty.getContext('2d');dx.fillStyle='#ff00ff';dx.fillRect(0,0,px,px);dx.setTransform(3,0,0,3,9,9);dx.globalAlpha=.3;
          MX.cpl=[dirty];const A1=run();const used=A1===dirty;MX.cpl=[];const B1=run();
          const a=A1.getContext('2d').getImageData(0,0,px,px).data,b=B1.getContext('2d').getImageData(0,0,px,px).data;let mx=0,sum=0,mg=0;for(let i=0;i<a.length;i+=4){for(let c=0;c<3;c++){const e=Math.abs(a[i+c]-b[i+c]);sum+=e;if(e>mx)mx=e}if(a[i]>240&&a[i+1]<20&&a[i+2]>240)mg++}
          return {used,fresh:B1!==dirty,mx,mean:+(sum/(a.length*.75)).toFixed(3),magenta:mg,px}}""")
        rep('แคนวาสชังก์ที่ใช้ซ้ำถูกล้างสะอาด: ภาพตรงกับชังก์บนแคนวาสใหม่ ไม่มีสีเก่าค้าง',pc['used'] and pc['fresh'] and pc['magenta']==0 and pc['mean']<.5,pc)
        st=await A.ev("""async()=>{let pool=0,newc=0;const P=mxCvPool;window.mxCvPool=mxCvPool=function(px){const n0=(MX.cpl||[]).length;const c=P.apply(this,arguments);if((MX.cpl||[]).length<n0)pool++;else newc++;return c};
          const pts=[[600,600],[2600,600],[2600,2600],[600,2600],[1600,1600],[600,1600]];for(const[x,y]of pts){me.x=x;me.y=y;const t0=performance.now();let z=0;while(performance.now()-t0<9000){const b=[...MX.jobs.values()].filter(J=>J.vis).length;z=b?0:z+1;if(z>=3)break;await new Promise(r=>setTimeout(r,120))}}
          window.mxCvPool=mxCvPool=P;return {pool,newc,cap:MX.cap,ch:GX.ch.size}}""")
        rep('เดินข้ามแมพจนแคชเต็ม: ชังก์ใหม่ใช้แคนวาสเดิมซ้ำ (ไม่จองภาพใหม่ทุกชังก์)',st['pool']>=3 and st['ch']<=st['cap'],st)
        # ⑥ ตระกูลวัง
        await A.ev("()=>{enterMap(38,{x:MAPS[38].sx,y:MAPS[38].sy})}");await A.wait(300)
        cs=await A.ev("""async()=>{let mn=1e9,n0=0;const F=mxCastStep;window.mxCastStep=mxCastStep=function(J){if(J.st===0){n0++;const a=performance.now()-(J.t||0);if(a<mn)mn=a}return F.apply(this,arguments)};
          const t0=performance.now();let z=0;while(performance.now()-t0<20000){const b=MX.pj?[...MX.pj.values()].filter(J=>J.vis).length:1;z=b?0:z+1;if(z>=4)break;await new Promise(r=>setTimeout(r,150))}
          window.mxCastStep=mxCastStep=F;const done=[...PALC.m.values()].filter(c=>c&&c.width).length;return {minAge:Math.round(mn),started:n0,left:MX.pj?[...MX.pj.values()].filter(J=>J.vis).length:-1,ms:Math.round(performance.now()-t0),done,r:PALC.r}}""")
        rep('ตระกูลวัง: เติมรายละเอียดเริ่มหลังภาพพื้นเดิม ≥ 0.25 วิ (ไม่บังคับรอ GPU) · เสร็จครบทุกชังก์บนจอ',cs['started']>=2 and cs['minAge']>=250 and cs['left']==0 and cs['r']==2,cs)
        await A.ev("()=>{LITEQ=1;applyQ()}");await A.wait(2500)
        c2=await A.ev("()=>[DPR,PALC.r,[...PALC.m.values()].filter(c=>c&&c.width===672).length]")
        await A.ev("()=>{LITEQ=0;applyQ()}");await A.wait(600)
        rep('ตระกูลวัง โหมดประหยัดขั้น 1: ชังก์ 1.75 (672 พิกเซล) ตรงกับความละเอียดจอ',c2[0]==1.75 and c2[1]==1.75 and c2[2]>=2,c2)
        rep('ไม่มีข้อผิดพลาดตลอดการทดสอบ',not EX() and not await A.ev("()=>(window.__err||[]).length"),[EX()[:4],await A.ev("()=>(window.__err||[]).slice(-3)")])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
