"""t_overdraw.py · วัดปริมาณพิกเซลที่ระบายต่อเฟรม (หน่วย = เท่าของจอ) แยกตามฟังก์ชันที่เรียก · ใช้เป็นตัวแทนภาระ GPU/แบต"""
import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
OUT=sys.argv[1] if len(sys.argv)>1 else None
CL = "()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;try{ov.hidden=true}catch(e){}}"
GO = "async([m,x,y])=>{if(curMap!==m)enterMap(m,{x:x||MAPS[m].sx||1600,y:y||MAPS[m].sy||1600});await new Promise(r=>setTimeout(r,2500));me.x=x||me.x;me.y=y||me.y;try{FQ.avg=10;HD2.fq=999;BXM.fq=999;OL.fq=999;setGQ('high')}catch(e){}}"
OD = r"""async()=>{const C=CanvasRenderingContext2D.prototype,od=C.drawImage,ofr=C.fillRect,ofl=C.fill,opi=C.putImageData;const S={},T={main:0,off:0};const scr=cv.width*cv.height;
 const who=()=>{const s=(new Error().stack||'').split('\n');for(let i=3;i<s.length;i++){const m=s[i].match(/at (\S+) .*:(\d+):\d+\)?$/)||s[i].match(/at .*:(\d+):\d+$/);if(m){const n=m.length===3?m[1]:'(anon)';if(/^(CanvasRenderingContext2D|Object\.|C\.)/.test(n))continue;return n+':'+(m.length===3?m[2]:m[1])}}return '?'};
 const add=(ctx,x,y,w,h)=>{const M=ctx.getTransform();let x0=M.a*x+M.c*y+M.e,y0=M.b*x+M.d*y+M.f,x1=M.a*(x+w)+M.c*(y+h)+M.e,y1=M.b*(x+w)+M.d*(y+h)+M.f;if(x0>x1)[x0,x1]=[x1,x0];if(y0>y1)[y0,y1]=[y1,y0];const cw=ctx.canvas.width,ch=ctx.canvas.height;x0=Math.max(0,x0);y0=Math.max(0,y0);x1=Math.min(cw,x1);y1=Math.min(ch,y1);if(x1<=x0||y1<=y0)return;const a=(x1-x0)*(y1-y0)*(ctx.globalAlpha>0?1:0);const main=ctx.canvas===cv;if(main)T.main+=a;else T.off+=a;const k=(main?'':'[off] ')+who();S[k]=(S[k]||0)+a};
 C.drawImage=function(im,...a){try{let x,y,w,h;if(a.length>=8){[x,y,w,h]=a.slice(4,8)}else if(a.length>=4){[x,y,w,h]=a}else{[x,y]=a;w=im.width;h=im.height}add(this,x,y,w,h)}catch(e){}return od.apply(this,arguments)};
 C.fillRect=function(x,y,w,h){try{add(this,x,y,w,h)}catch(e){}return ofr.apply(this,arguments)};
 const N=3;await new Promise(r=>requestAnimationFrame(r));for(const k in S)delete S[k];T.main=0;T.off=0;for(let i=0;i<N;i++)await new Promise(r=>requestAnimationFrame(r));
 C.drawImage=od;C.fillRect=ofr;
 return {screens_main:Math.round(T.main/N/scr*100)/100,screens_off:Math.round(T.off/N/scr*100)/100,top:Object.entries(S).map(([k,v])=>[k,Math.round(v/N/scr*100)/100]).sort((a,b)=>b[1]-a[1]).slice(0,16)}}"""
async def main():
    p=start_server();res={}
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(3500)
            res['S1 title']=await pg.evaluate(OD)
            await pg.evaluate(SETUP,['mage','Od1',80]);await pg.wait_for_timeout(3500);await pg.evaluate(CL)
            for lab,m,x,y in [('S2 camp',1,1600,1700),('S3 astra south',9,1600,1950),('S3 astra plaza',9,1600,1600),('S4 combat map2',2,0,0),('S6 map44',44,0,0),('S6 map40',40,0,0),('S6 map38',38,0,0)]:
                await pg.evaluate(GO,[m,x,y]);await pg.evaluate(CL)
                if m==9:await pg.evaluate("async()=>{for(let i=0;i<100&&(AST.ok!==1||AST.re);i++)await new Promise(r=>setTimeout(r,150))}")
                if m==2:await pg.evaluate("()=>{const ms=mons.filter(m=>m.t!==3&&m.hp>0);if(ms.length){me.x=ms[0].x-60;me.y=ms[0].y}AUTO.on=true}")
                await pg.wait_for_timeout(1500)
                res[lab]=await pg.evaluate(OD)
            for k,v in res.items():
                print('==',k,'main',v['screens_main'],'offscreen',v['screens_off'])
                for x in v['top'][:12]:print('    ',x)
    finally:
        p.terminate()
        if OUT:json.dump(res,open(OUT,'w'),ensure_ascii=False,indent=1)
asyncio.run(main())
