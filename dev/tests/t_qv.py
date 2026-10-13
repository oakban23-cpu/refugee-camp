import asyncio,random,base64
from h import *
from PIL import Image
async def skip(A,n=14):
    for i in range(n):
        await A.ev("()=>{if(SD.on&&!SD.choice){if(SD.typ){stNext()}stNext()}}");await A.wait(150)
J="""()=>{const out=document.createElement('canvas');out.width=360;out.height=360;const o=out.getContext('2d');o.fillStyle='#2a1844';o.fillRect(0,0,360,360);const g0=g;g=o;o.setTransform(1.6,0,0,1.6,180,260);
 const F=c=>c,O='#0a0414',E=(cx,cy,rx,ry,c,st,rot)=>{o.beginPath();o.ellipse(cx,cy,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,7);o.fillStyle=c;o.fill();if(st){o.lineWidth=1.4;o.strokeStyle=O;o.stroke()}},Pg=(p,c,st)=>{o.beginPath();o.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)o.lineTo(p[i],p[i+1]);o.closePath();o.fillStyle=c;o.fill();if(st){o.lineWidth=1.4;o.strokeStyle=O;o.stroke()}},Ln=(p,c,w)=>{o.beginPath();o.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)o.lineTo(p[i],p[i+1]);o.strokeStyle=c;o.lineWidth=w;o.stroke()},eye=(ex,ey,w,h,c)=>E(ex,ey,w,h,c,0),glowOrb=(ox,oy,rad,c,a)=>{const gr=o.createRadialGradient(ox,oy,0,ox,oy,rad);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.35,'rgba('+c+','+a+')');gr.addColorStop(1,'rgba('+c+',0)');o.fillStyle=gr;o.beginPath();o.arc(ox,oy,rad,0,7);o.fill()};
 try{gxQueenShell(performance.now()/1000,0,F,E,Pg,Ln,eye,glowOrb,0,0,0,0)}catch(e){console.error('gx',e.message)}g=g0;return out.toDataURL()}"""
async def main():
    p=start_server()
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        A=await new_client(b,'T'+str(random.randint(1000,9999)),'mage',99)
        i0=await A.ev("()=>STY.findIndex(x=>x.p7qd)")
        await A.ev(f"()=>{{gmGod=true;ov.hidden=true;window.DNH=12;me.sty={{s:{i0},n:0,a:0,e:1,e6:1,p7m:1}};const s=document.createElement('style');s.textContent='#topb,#clog,#stq{{display:none!important}}';document.head.appendChild(s);setInterval(()=>{{FQ.avg=0;LOWQ=false}},50);qshEnter()}}");await A.wait(2500)
        d=await A.ev(J);open('../p6/q_boss_sheet.png','wb').write(base64.b64decode(d.split(',')[1]))
        await A.ev("()=>{dgStart()}");await skip(A);await A.wait(1500)
        await A.ev("()=>{const B=qshBoss();B.x=CX;B.y=CY-80;B.stun=60;QS.nt=0;me.x=CX+40;me.y=CY+120}");await A.wait(1500)
        await A.ev("()=>{const o=QS.o[0];if(o){me.x=o.x;me.y=o.y+6}}");await A.wait(700)
        await A.ev("()=>{me.x=CX+60;me.y=CY+140}");await A.wait(600)
        await A.pg.screenshot(path='../p6/q_v1.png')
        await A.ev("()=>{const B=qshBoss();B.stun=0;B.hp=B.mh*.6;B.q2=0}");await A.wait(1800);await A.pg.screenshot(path='../p6/q_v2.png')
        im=[Image.open('../p6/q_v1.png').crop((0,74,390,810)).resize((300,566)),Image.open('../p6/q_v2.png').crop((0,74,390,810)).resize((300,566)),Image.open('../p6/q_boss_sheet.png').resize((300,300))]
        W=Image.new('RGB',(900,566));[W.paste(x,(i*300,0)) for i,x in enumerate(im)];W.save('../p6/q_vgrid.png')
        print([e for e in A.errs if 'TUNNEL' not in e][:5])
        await b.close()
    p.terminate()
asyncio.run(main())
