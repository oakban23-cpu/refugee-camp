import asyncio,sys,json
sys.path.insert(0,'.')
from h import *
MAPS_=sys.argv[1].split(',')
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':393,'height':864},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Fc1',99]);await pg.wait_for_timeout(2000)
        for mp in MAPS_:
            await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}");await pg.wait_for_timeout(4000)
            await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null}")
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const C=CanvasRenderingContext2D.prototype,od=C.drawImage,of=C.fillRect,ofi=C.fill;let on=1;const by={};const S=cv.width*cv.height;
              const add=(ctx,x,y,w,h,tag)=>{ctx.__x=x;ctx.__y=y;return add0(ctx,w,h,tag)},add0=(ctx,w,h,tag)=>{if(ctx!==g||!on)return;const M=ctx.getTransform();let X0=M.e+(ctx.__x||0)*M.a,Y0=M.f+(ctx.__y||0)*M.d,X1=X0+w*M.a,Y1=Y0+h*M.d;if(X1<X0)[X0,X1]=[X1,X0];if(Y1<Y0)[Y0,Y1]=[Y1,Y0];X0=Math.max(0,X0);Y0=Math.max(0,Y0);X1=Math.min(cv.width,X1);Y1=Math.min(cv.height,Y1);const a=Math.max(0,X1-X0)*Math.max(0,Y1-Y0);if(a<S*.05)return;const st=(new Error().stack||'').split('\\n')[4]||'';const k=tag+' '+((st.match(/at ([\\w$.<>]+)/)||[,'?'])[1]);by[k]=(by[k]||0)+a};
              C.drawImage=function(im,...a){try{const n=a.length;let w,h;let x,y;if(n===2){x=a[0];y=a[1];w=im.width;h=im.height}else if(n===4){x=a[0];y=a[1];w=a[2];h=a[3]}else{x=a[4];y=a[5];w=a[6];h=a[7]}add(this,x,y,w,h,'img')}catch(e){}return od.apply(this,arguments)};
              C.fillRect=function(x,y,w,h){add(this,x,y,w,h,'rect');return of.apply(this,arguments)};
              let fr=0,on2=1;const cnt=()=>{if(!on2)return;fr++;requestAnimationFrame(cnt)};requestAnimationFrame(cnt);await w(2500);on2=0;C.drawImage=od;C.fillRect=of;
              const F=Math.max(1,fr),tot=Object.values(by).reduce((x,y)=>x+y,0)/F/S;return {map:curMap,n:MAPS[curMap].n,frames:fr,bigFillScreens:+tot.toFixed(2),top:Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>[k,+(v/F/S).toFixed(2)])}}""")
            print(json.dumps(r,ensure_ascii=False))
    finally: p.terminate()
asyncio.run(main())
