"""v667 ค่ายผู้อพยพโฉมใหม่"""
import asyncio, sys, urllib.request
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
R=[]
def rep(name, ok, info=''):
    R.append((name, ok, info)); print(('PASS ' if ok else 'FAIL ') + name, '' if ok else info, flush=True)
async def main():
    p=start_server()
    try:
      bad=[]
      for f in ['hd-cp.webp','hd-cp-t.webp']:
          r=urllib.request.urlopen(URL+f);b=r.read()
          if r.headers['Content-Type']!='image/webp' or len(b)<100000:bad.append((f,len(b)))
      rep('ภาพชุดใหม่ 2 ไฟล์ เสิร์ฟเป็น image/webp',not bad,bad)
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'Ann','melee',60)
        await A.ev("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;window.DNH=12}")
        ok=await A.ev("()=>new Promise(r=>{const t0=Date.now();const iv=setInterval(()=>{if(CPG.st||Date.now()-t0>20000){clearInterval(iv);r([CPG.ok,CPG.st,curMap])}},250)})")
        rep('อยู่ในค่าย → โหลดภาพชุดใหม่และเปิดใช้',ok==[1,True,1],ok)
        r=await A.ev("()=>{const k='mx'+MX.v;return ['g0','g1','g2','g3'].map(q=>{const T=mxTile(k+q,MXT[q]);return !!(T&&T.cp&&T.c.width===768)}).concat([!mxTile(k+'g4',MXT.g4).cp])}")
        rep('พื้นโลก: หญ้า/หญ้าป่า/หญ้ามีดอก/ดินโล่ง ใช้ลายวาด · ชั้นดอกไม้ (g4) ยังเป็นแบบเดิม',all(r),r)
        r=await A.ev("()=>{const n=NAT.v.length,names=new Set(trees.slice(0,200).map(t=>natPick(t)[0]));return [NAT.img===CPG.I.a,n,names.size,[...names].every(k=>CPG.M[k])]}")
        rep('ต้นไม้/หิน/พุ่มรอบค่ายใช้ชุดใหม่ 21 แบบ (สุ่มได้หลายแบบ)',r[0] and r[1]==21 and r[2]>=12 and r[3],r)
        r=await A.ev("""()=>{const F=depBuild(),c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');let e=null,k={};try{for(const f of F.L){if(['trail','stream','meadow'].includes(f.k)){depPaintF(x,f,'grass');k[f.k]=1}}}catch(q){e=String(q)}return [e,Object.keys(k).sort()]}""")
        rep('ทางเดิน ลำธาร ทุ่งดอกไม้ วาดด้วยภาพใหม่ได้ไม่พัง',r==[None,['meadow','stream','trail']],r)
        r=await A.ev("""()=>new Promise(res=>{me.x=1180;me.y=1600;setTimeout(()=>{let e=null;try{CAMP.cache=null;campBuild()}catch(q){e=String(q)}const c=CAMP.cache.getContext('2d');const S=CAMP.S,H=CAMP.H;const px=(x,y)=>Array.from(c.getImageData(Math.round((x+H)*S),Math.round((y+H)*S),1,1).data);res([e,px(-250,0),px(200,-250)])},1200)})""")
        rep('แคชพื้นค่ายสร้างได้ (หญ้า/ถนนหิน/ลาน/ของในค่ายใหม่)',r[0] is None and r[1][3]==255 and r[2][3]==255,r)
        r=await A.ev("""()=>{const P=CanvasRenderingContext2D.prototype,o=P.drawImage;let n=0;P.drawImage=function(im){if(im===CPG.I.a)n++;return o.apply(this,arguments)};try{const M=MAPS[1];cam.x=M.nests[0][0]-200;cam.y=M.nests[0][1]-200;mxNest(M);me.x=FSW[0].x;me.y=FSW[0].y+120;cam.x=FSW[0].x-300;cam.y=FSW[0].y-200;fshDraw()}finally{P.drawImage=o}return [n,FSW.length,FSW[0].b]}""")
        rep('รังมอนและบ่อตกปลาวาดจากภาพชุดใหม่',r[0]>=2,r)
        r=await A.ev("()=>{fshCollide;const w=FSW[0];me.x=w.x+5;me.y=w.y+3;fshCollide();return Math.round((((me.x-w.x)/(w.rx+6))**2+((me.y-w.y)/(w.ry+4))**2)*100)/100}")
        rep('บ่อตกปลายังกันเดินลงน้ำเหมือนเดิม',r>=.99,r)
        r=await A.ev("()=>{const o=LOWQ,h=hdLowOK;let a;try{LOWQ=true;hdLowOK=()=>true;a=[lqHD(),cgOk()]}finally{LOWQ=o;hdLowOK=h}return a}")
        rep('แก้บั๊ก: โหมดประหยัดที่ยังเปิด HD → ประตูแสงดาว/ซุ้มบ้านกิลด์ยังเป็นภาพวาด',r[0]==False and r[1]==True,r)
        fb=await A.ev("()=>new Promise(r=>{CPG.on=0;setTimeout(()=>{const a=[CPG.st,NAT.img===CPG.I.a,!!(MX.tile['mx'+MX.v+'g0']||{}).cp];CPG.on=1;r(a)},1200)})")
        rep('CPG.on=0 → กลับภาพเดิมทั้งหมด',fb==[False,False,False],fb)
        Es=[e for e in A.errs if not e.startswith('console')];rep('ไม่มี error',not Es,str(Es[:3]))
    finally:
        p.terminate()
    print('SUMMARY',sum(1 for r in R if r[1]),'/',len(R))
asyncio.run(main())
