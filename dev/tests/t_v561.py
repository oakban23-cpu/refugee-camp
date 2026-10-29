"""v561 บ้านกิลด์: พื้นทั้งบ้านวาดใหม่ด้วยลายพื้นของแผนที่โฉมใหม่
   ① แมพบ้านกิลด์ใช้ตัววาดแผนที่ใหม่ (ทุ่งหญ้าแบบแมพ 1) · ไม่ทาวงเขตปลอดภัยสีเขียวทึบ (เขตปลอดภัยยังทำงาน)
   ② ลานในกำแพงทุกขั้นใช้ลายพื้น (ดินอัด/หญ้า/หินปู/หินชนวน) · วงลานกลางใหม่ · แคชสร้างได้ทุกขั้น ไม่มี error
   ③ ปิดตัววาดใหม่ → กลับเป็นพื้น/วงเขตแบบเดิม · ทุ่งหน้าบ้านสร้างแคชใหม่ตามสถานะ
   ④ ตัววาดพื้นแผนที่ใหม่: ชังก์ต่อกันพอดีทุกระดับซูม (ไม่มีรอยต่อ 1 px)"""
import asyncio, sys, json, os, subprocess, time, random
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, str(info)[:900], flush=True)
def restart():
    env = dict(os.environ, PORT=str(PORT), DATA_DIR=DD, MVP_FAST='1', GD_FAST='1')
    q = subprocess.Popen(['node', 'server.js'], cwd=SRV, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for _ in range(240):
        time.sleep(.3)
        try:
            import urllib.request; urllib.request.urlopen(URL + 'health', timeout=1); break
        except Exception: pass
    return q
def edit(fn):
    fp=os.path.join(DD,'guild.json');J=json.load(open(fp));G=list(J['g'].values())[0];fn(G);json.dump(J,open(fp,'w'))
# ตัวอย่างพิกเซลในแคชบ้าน: ความแปรปรวนของสีในลาน (มีลาย = แปรปรวนสูง) + สีเฉลี่ย
SAMP="""()=>{const Q=GHS.C;if(!Q||!Q.cv)return null;const x=Q.cv.getContext('2d'),S=Q.S,X0=Q.X0,Y0=Q.Y0;const at=(lx,ly,w,h)=>{const d=x.getImageData(Math.round((lx-X0)*S),Math.round((ly-Y0)*S),w,h).data;let n=0,s=0,s2=0,r=0,g=0,b=0;for(let i=0;i<d.length;i+=4){const v=d[i]*.3+d[i+1]*.59+d[i+2]*.11;s+=v;s2+=v*v;r+=d[i];g+=d[i+1];b+=d[i+2];n++}const m=s/n;return{sd:Math.round(Math.sqrt(Math.max(0,s2/n-m*m))*10)/10,rgb:[Math.round(r/n),Math.round(g/n),Math.round(b/n)]}};
  const P=[[-480,-300],[-250,-380],[250,-380],[480,0],[-480,150],[300,300],[-300,300],[-150,-200],[160,-230]].map(([a,b2])=>at(a,b2,40,30).sd).sort((a,b2)=>a-b2);return {med:P[Math.floor(P.length/2)],all:P,path:at(-20,-250,30,40)}}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':1280,'height':800})
        pg=await ctx.new_page();A=Client(ctx,pg,'G');errs=[]
        pg.on('pageerror',lambda e:errs.append((e.stack or str(e))[:300]))
        pg.on('console',lambda m:errs.append('console.'+m.type+': '+m.text[:300]) if m.type=='error' else None)
        await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['melee','Gv'+str(random.randint(100,999)),60]);await pg.wait_for_timeout(1500)
        await A.ev("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};AUTO.on=false;gmGod=true;window.DNH=12}")
        await A.ev("()=>{gdEmit('mk',{nm:'ป้อมลายพื้น',tag:'GTX',e:5,col:1})}");await A.wait(1500)
        res={}
        for t in (1,3,4,5):
            p.terminate();p.wait()
            def st(G,t=t):
                G['lvl']=[1,2,4,6,8,10][t];H=G['hq'];H['t']=t;H['wl']=6;H['gl']=6;H['f']=5000000
            edit(st);p=restart();await A.wait(4500)
            await A.ev("()=>{gdEmit('q');setTimeout(()=>{if(!ghHere())ghEnter();me.x=CX;me.y=CY+300},900)}");await A.wait(2600)
            await A.ev("()=>{LOWQ=false;HDI.on=true;ghHDload();mons.length=0}")
            await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if((ghHDok()&&GQI.ok===1&&GHS.gq)||Date.now()-t0>15000){clearInterval(iv);r()}},200)})")
            await A.wait(1500)
            r=await A.ev("()=>({here:ghHere(),t:ghT(),mx:mxOn(),reg:!!MXC[curMap],safeOff:ghMxSafeOff(),sr:MAPS[curMap].sr,gq:GHS.gq,tiles:Object.keys(MX.tile).map(k=>k.replace('mx'+MX.v,'')).sort(),fk:GHF.k,trs:(MX.trs||[]).length,ch:[...GX.ch.keys()].filter(k=>k.indexOf('mx'+MX.v+'|'+curMap+'|')===0).length})")
            r['samp']=await A.ev(SAMP)
            res[t]=r
        rep('แมพบ้านกิลด์ใช้ตัววาดแผนที่ใหม่ (ทุ่งหญ้า) · สร้างชังก์พื้นได้ · ไม่ทาวงเขตปลอดภัยทึบ (เขตปลอดภัยรัศมี 760 ยังอยู่)',all(v['here'] and v['mx'] and v['reg'] and v['safeOff'] and v['sr']==760 and v['ch']>=1 for v in res.values()),{t:[v['mx'],v['reg'],v['safeOff'],v['ch']] for t,v in res.items()})
        need={1:{'g3','d2','g0'},3:{'g3','w122','s210','w120'},4:{'s211','w120','s210'},5:{'w122','s210','w120'}}
        okT=all(need[t]<=set(res[t]['tiles']) and res[t]['gq']==1 for t in res)
        rep('ลานในกำแพงทุกขั้นใช้ลายพื้นแผนที่ใหม่ (ขั้น 1 ดินอัด+ทางดิน+หญ้า · 3 ดิน+ทางหินปู · 4 หินชนวน · 5 หินเทาอ่อน · วงลานหินชนวน)',okT,{t:res[t]['tiles'] for t in res})
        sm={t:res[t]['samp'] for t in res}
        okS=all(sm[t] and sm[t]['med']>=6 for t in res)
        rep('ลานมีลายจริง (ความแปรปรวนสีในลาน ≥ 6 · เดิมพื้นเรียบ)',okS,sm)
        # ③ ปิดตัววาดใหม่ → แบบเดิม
        off=await A.ev("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));MX.on=0;await w(900);const a={mx:mxOn(),safeOff:ghMxSafeOff(),fk:GHF.k};MX.on=1;await w(900);a.fk2=GHF.k;a.mx2=mxOn();return a}""")
        rep('ปิดตัววาดใหม่ (MX.on=0) → วงเขตปลอดภัย/ทุ่งหน้าบ้านกลับแบบเดิม · เปิดกลับได้',(not off['mx']) and (not off['safeOff']) and off['fk'].endswith('|0') and off['mx2'] and off['fk2'].endswith('|1'),off)
        # ④ ไม่มีรอยต่อ 1 px ระหว่างชังก์ (ซูม 0.87)
        await A.ev("()=>{if(isDg())dgLeave();enterMap(3,{x:1600,y:1600});window.__czo=camZoomT;window.camZoomT=camZoomT=()=>.87}");await A.wait(2500)
        sx=await A.ev("""()=>new Promise(res=>{const proto=CanvasRenderingContext2D.prototype,G=mxGround;const R=[];window.mxGround=mxGround=function(MP){const fc=MX.fc,first=MX.fc!==MX.lf;g.drawImage=function(c,x,y,w,h){if(arguments.length===5&&c&&c.width>=300&&Math.abs(w-h)<=1)R.push([x,y,w,h,first?1:0,fc]);return proto.drawImage.apply(g,arguments)};try{return G.apply(this,arguments)}finally{delete g.drawImage}};
          setTimeout(()=>{window.mxGround=mxGround=G;const F=R.filter(r=>r[4]);let gaps=0,chk=0;for(const a of F)for(const b of F){if(a===b||a[5]!==b[5])continue;if(Math.abs(a[1]-b[1])<.5&&b[0]>a[0]&&b[0]-a[0]<a[2]+3){chk++;if(a[0]+a[2]!==b[0])gaps++}if(Math.abs(a[0]-b[0])<.5&&b[1]>a[1]&&b[1]-a[1]<a[3]+3){chk++;if(a[1]+a[3]!==b[1])gaps++}}res({n:F.length,chk,gaps,z:+ZM.z.toFixed(3),s:+g.getTransform().a.toFixed(3)})},1200)})""")
        await A.ev("()=>{window.camZoomT=camZoomT=window.__czo}")
        rep('ตัววาดพื้นแผนที่ใหม่: ชังก์ต่อกันพอดีที่ซูม 0.87 (ไม่มีช่องว่าง/ซ้อน 1 px)',sx['chk']>=4 and sx['gaps']==0,sx)
        E=[e for e in errs if 'ERR_' not in e]
        rep('ไม่มี error ตลอดการทดสอบ',not E and not await A.ev("()=>(window.__err||[]).length"),[E[:4],await A.ev("()=>(window.__err||[]).slice(-3)")])
    finally: p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
