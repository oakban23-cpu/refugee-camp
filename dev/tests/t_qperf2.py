import asyncio,random
from h import *
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
P="""()=>{const o={};const T=(k,f)=>{const t0=performance.now();for(let i=0;i<30;i++){g.save();try{f()}catch(e){}g.restore()}o[k]=+((performance.now()-t0)/30).toFixed(2)};
 T('fieldDraw',()=>qsFieldDraw(performance.now()/1000));T('fieldScr',()=>qsFieldScreen());T('qshDraw',()=>qshDraw());T('qshScr',()=>qshScreen());
 const B=qshBoss&&qshBoss();if(B){T('boss14',()=>{g.translate(B.x,B.y);const F=c=>c,O='#000',E=(cx,cy,rx,ry,c,st)=>{g.beginPath();g.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),0,0,7);g.fillStyle=c;g.fill()},Pg=(p,c)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.closePath();g.fillStyle=c;g.fill()},Ln=(p,c,w)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.strokeStyle=c;g.lineWidth=w;g.stroke()},eye=()=>{},glowOrb=(ox,oy,rad,c,a)=>{const gr=g.createRadialGradient(ox,oy,0,ox,oy,rad);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(1,'rgba('+c+',0)');g.fillStyle=gr;g.beginPath();g.arc(ox,oy,rad,0,7);g.fill()};gxQueenShell(performance.now()/1000,0,F,E,Pg,Ln,eye,glowOrb,0,0,0,0)})}
 return JSON.stringify(o)}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7ls)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:1,e:1,e6:1}};setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);enterMap(10,{{x:1500,y:1300}})}}");await A.wait(3000)
        print('map10',await A.ev(P))
        i1=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{me.sty.s={i1};me.sty.a=0;qshEnter()}}");await A.wait(2500);await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1200)
        await A.ev("()=>{QS.nt=0;const B=qshBoss();B.hp=B.mh*.38;B.q2=0;me.x=CX;me.y=CY+150}");await A.wait(2500)
        print('qsh',await A.ev(P))
        print('draw total',await A.ev("()=>{mons=mons.filter(m=>m.t===3);const t0=performance.now();for(let i=0;i<30;i++){draw()}return +((performance.now()-t0)/30).toFixed(2)}"))
        print('no boss',await A.ev("()=>{const s=mons;mons=[];const t0=performance.now();for(let i=0;i<30;i++){draw()}mons=s;return +((performance.now()-t0)/30).toFixed(2)}"))
        await b.close()
    p.terminate()
asyncio.run(main())
