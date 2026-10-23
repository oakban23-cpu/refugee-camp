"""v499 ภาพภาค 8: ผาท่าเรือเมฆ/ลานศึกป้องกันท่าเรือวาดใหม่ (สไปรต์แคช · ทะเลเมฆแพทเทิร์น · พื้นไม้เป็นชุด) · บอสคราเคนใหม่ · หนวดรัด · ฉลามเมฆ · ไม่หนักขึ้น"""
import asyncio, sys, random, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:600], flush=True)
TILES="""(lq)=>{LOWQ=lq;const c=document.createElement('canvas');c.width=192;c.height=192;const x=c.getContext('2d');const er=[],px={};
  for(let ty=0;ty<9;ty++)for(let tx=0;tx<9;tx++){const ox=tx*384,oy=ty*384;x.setTransform(.5,0,0,.5,-ox*.5,-oy*.5);x.fillStyle='#ff00ff';x.fillRect(ox,oy,384,384);try{(curMap===38?phPaint:hdfPaint)(x,ox,oy,384)}catch(e){er.push([tx,ty,String(e).slice(0,80)])}
    const d=x.getImageData(96,96,1,1).data;px[tx+','+ty]=[d[0],d[1],d[2]]}
  LOWQ=false;const mag=Object.entries(px).filter(([k,v])=>v[0]>240&&v[1]<20&&v[2]>240).map(([k])=>k);return {er,mag,inl:px['2,4'],sea:px['8,4'],dock:px['5,4']}}"""
KR="""()=>{const cv=document.createElement('canvas');cv.width=300;cv.height=300;const x=cv.getContext('2d');const g0=g,m0=mons;g=x;const out=[];
  const F0=W=>c=>W?'#fff':c,E=(cx,cy,rx,ry,c)=>{g.beginPath();g.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),0,0,7);g.fillStyle=c;g.fill()},Pg=(p,c)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath();g.fillStyle=c;g.fill()},
    Ln=(p,c,w)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.strokeStyle=c;g.lineWidth=w;g.stroke()},eye=(a,b,c,d,e)=>E(a,b,c,d,e),glowOrb=(ox,oy,r,c,a)=>{g.fillStyle='rgba('+c+','+a+')';g.beginPath();g.arc(ox,oy,r,0,7);g.fill()};
  for(const[hf,W,cf]of[[1,false,0],[.3,false,.5],[1,true,0]]){mons=hf<1?[{t:3,hp:hf*100,mh:100}]:[];x.setTransform(1,0,0,1,150,200);x.clearRect(-150,-200,300,300);try{gxKraken(5.5,W,F0(W),E,Pg,Ln,eye,glowOrb,1,0,0,cf);const d=x.getImageData(0,0,300,300).data;let n=0;for(let i=3;i<d.length;i+=16)if(d[i]>0)n++;out.push(n)}catch(e){out.push('ERR '+e)}}
  try{MON_CUR={hdg:0,id:1};x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,300,300);drawMonT(150,200,2,5.5,1,0,0,38);MON_CUR=null;const d=x.getImageData(0,0,300,300).data;let n=0;for(let i=0;i<d.length;i+=4)if(d[i+3]>200&&d[i+2]>d[i+1]+25&&d[i]>d[i+1]+10)n++;out.push(n)}catch(e){MON_CUR=null;out.push('ERR '+e)}
  try{x.clearRect(0,0,300,300);drawMonT(150,200,0,5.5,1,0,0,38);drawMonT(150,200,0,5.5,-1,0,.5,38);out.push('ok')}catch(e){out.push('ERR '+e)}
  g=g0;mons=m0;return out}"""
INST="""()=>{const P=CanvasRenderingContext2D.prototype;window.__cc=0;for(const k of['fill','stroke','fillRect','drawImage','fillText','strokeText','arc','ellipse','lineTo','moveTo','quadraticCurveTo','bezierCurveTo','beginPath','save','restore','createLinearGradient','createRadialGradient']){const f=P[k];P[k]=function(){if(this.canvas===cv)window.__cc++;return f.apply(this,arguments)}}
 const _l=loop;window.__ln=0;loop=function(t){window.__ln++;return _l.apply(this,arguments)}}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Vz'+str(random.randint(100,999)),'mage',99)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;window.DNH=12;gmGod=true;me.sty={s:STY.length,n:0,a:0,e:1,e4:2,p6h:2,e6:1,e7:2,p7m:2,p8rs:31,p8sp:7,p8rp:15,p8g:1};enterMap(38,{x:2000,y:1500})}");await A.wait(3000)
        t1=await A.ev(TILES,False);t2=await A.ev(TILES,True)
        green=lambda v:v and v[1]>v[0] and v[1]>v[2] and v[1]>90
        sea=lambda v:v and min(v)>150 and v[2]>=v[0]
        rep('พื้นแมพ 38 วาดครบทุกช่อง ไม่มี error (ปกติ + โหมดประหยัด) · ทุ่งหญ้าเขียว · ทะเลเมฆสว่าง · ลานท่าเรือเป็นไม้',not t1['er'] and not t2['er'] and not t1['mag'] and not t2['mag'] and green(t1['inl']) and sea(t1['sea']) and t1['dock'][0]>t1['dock'][2],{'n':t1,'lq':{k:t2[k] for k in('er','mag','inl','sea')}})
        for x,y in ((2000,1500),(2700,1300),(2300,820),(2100,2560),(1000,1200)):
            await A.ev(f"()=>{{me.x={x};me.y={y}}}");await A.wait(900)
        st=await A.ev("()=>({n:PHV.m.size,mk:PHV.mk,px:PHV.px,cap:PHV.cap,keys:[...PHV.m.keys()].map(k=>k.split('@')[0]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,30)})")
        await A.ev("()=>{me.x=2000;me.y=1500}");await A.wait(1500);mk0=await A.ev("()=>PHV.mk");await A.wait(2500);mk1=await A.ev("()=>PHV.mk")
        need={'ship0','lh','hs','md','dp','cr','an','wr'}
        have={k[:-1] if k.startswith('ship') and False else k for k in st['keys']}
        okk=all(any(k.startswith(n) for k in st['keys']) for n in need)
        rep('ของในแมพวาดเป็นสไปรต์แคช (เรือ ประภาคาร บ้าน เต็นท์ คลัง เครน สมอ ซากเรือ ต้นไม้) · อยู่นิ่งไม่สร้างภาพใหม่ซ้ำ · ไม่เกินเพดานหน่วยความจำ',okk and mk1==mk0 and st['px']<=st['cap'],{'st':st,'mk':[mk0,mk1]})
        await A.ev(INST)
        res=[]
        for x,y in ((2000,1500),(2700,1300),(2300,820)):
            await A.ev(f"()=>{{me.x={x};me.y={y};mons=mons.filter(m=>Math.hypot(m.x-me.x,m.y-me.y)>700)}}");await A.wait(1200)
            r=await A.ev("()=>new Promise(r=>{window.__cc=0;window.__ln=0;setTimeout(()=>r(Math.round(__cc/Math.max(1,__ln))),2000)})");res.append(r)
        rep('งานวาดต่อเฟรมที่ท่าเรือไม่หนักขึ้น (ต่ำกว่าเวอร์ชันก่อน ~1,300 คำสั่ง/เฟรม)',max(res)<1250,res)
        k=await A.ev(KR)
        rep('บอสคราเคนใหม่วาดได้ทั้งปกติ/คลั่ง/กะพริบขาว · หนวดรัดเครื่องดาวเป็นหนวดหมึก (สีม่วง) · ฉลามเมฆวาดได้',all(isinstance(v,int) and v>800 for v in k[:3]) and isinstance(k[3],int) and k[3]>150 and k[4]=='ok',k)
        await A.ev("()=>{me.x=2000;me.y=1800;hdfEnter()}");await A.wait(3000)
        h1=await A.ev("()=>[curMap,HDFI(),dg.ph]")
        t3=await A.ev(TILES.replace("for(let ty=0;ty<9;ty++)for(let tx=0;tx<9;tx++)","for(let ty=2;ty<7;ty++)for(let tx=2;tx<7;tx++)"),False)
        await A.ev("()=>{me.x=CX;me.y=CY+150}");await A.wait(1500)
        e2=await A.ev("()=>[...PHV.m.keys()].filter(k=>/^(eng|lad)/.test(k)).length")
        rep('ลานศึกป้องกันท่าเรือ: พื้นวาดครบไม่ error · เครื่องดาว/บันไดเชือกเป็นสไปรต์',h1[1] and not t3['er'] and not t3['mag'] and e2>=1,{'dg':h1,'t':{k:t3[k] for k in('er','mag','inl','sea')},'spr':e2})
        await A.ev("()=>{dgStart()}")
        for i in range(30):
            await A.ev("()=>{stTick();if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(100)
        await A.ev("()=>{HDF.nt=0}");await A.wait(2500)
        for k2 in range(60):
            s2=await A.ev("()=>{mons.forEach(m=>{if(m.hdf&&m.t!==3)m.hp=0});HDF.q=0;if(HDF.st==='brk')HDF.nt=0;return dg.ph}")
            if s2=='boss':break
            await A.wait(400)
        await A.wait(1500);await A.ev("()=>{const B=mons.find(m=>m.t===3);if(B){me.x=B.x;me.y=B.y+230;B.w2=0}}");await A.wait(2500)
        bs=await A.ev("()=>[dg.ph,mons.filter(m=>m.t===3).length,mons.filter(m=>m.hdg>=0).length]")
        await A.pg.screenshot(path='../v499/t_boss.jpg',quality=75)
        rep('สู้บอสคราเคนในดันเจี้ยนจริง (บอส + หนวดรัด) ไม่มีปัญหา',bs[0]=='boss' and bs[1]==1,bs)
        E=[e for e in A.errs if 'ERR_' not in e]
        rep('ไม่มี error ในหน้าเกม',not E,E[:4])
    finally: p.terminate()
    ok=sum(1 for r in R if r[1]);print(f'SUMMARY: {ok} / {len(R)} passed')
asyncio.run(main())
