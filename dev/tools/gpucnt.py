import asyncio,sys,json
sys.path.insert(0,'.')
from h import *
BOTJS=open('b10bot.js',encoding='utf-8').read()
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':393,'height':864},device_scale_factor=2,has_touch=True,is_mobile=True)
        pg=await ctx.new_page();await pg.goto(URL);await pg.wait_for_timeout(2500)
        await pg.evaluate(SETUP,['mage','Gp1',99]);await pg.wait_for_timeout(1500)
        await pg.evaluate(BOTJS)
        for sc in sys.argv[1].split(','):
            mp,fight=sc.split(':') if ':' in sc else (sc,'0')
            await pg.evaluate(f"()=>{{gmGod=true;AUTO.on=false;ov.hidden=true;const m={mp};enterMap(m,{{x:MAPS[m].sx||1600,y:MAPS[m].sy||1600}})}}");await pg.wait_for_timeout(4500)
            if fight=='1':
                await pg.evaluate("()=>{ov.hidden=true;const B=mons.filter(m=>m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];if(B){me.x=B.x+60;me.y=B.y};BOT.reset();BOT.on=true}");await pg.wait_for_timeout(4000)
            r=await pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const C=CanvasRenderingContext2D.prototype,names=['fill','stroke','drawImage','fillRect','fillText','strokeRect','strokeText'];const O={};let on=1;const st={n:0,blur:0,filt:0,light:0,byBlur:{},byFilt:{}};
              const who=()=>{const l=(new Error().stack||'').split('\\n')[3]||'';return (l.match(/at ([\\w$.<>]+)/)||[,'?'])[1]};
              names.forEach(k=>{O[k]=C[k];C[k]=function(){if(on&&this===g){st.n++;{const l=(new Error().stack||'').split('\\n').slice(2,9).map(x=>(x.match(/at ([\\w$.<>]+)/)||[,'?'])[1]);const top=l.find(x=>!/^(E|Pg|vS|vD|vK|vP|vLimb|vCol|vOv|glowAt|glowS|fa4|L|D|x\.<computed>|Object\.\w+|C\.\w+|band|ov|http)$/.test(x))||l[0];st.by=st.by||{};st.by[top]=(st.by[top]||0)+1}if(this.shadowBlur>0&&this.shadowColor&&!/rgba\\([^)]*,\\s*0\\)$/.test(this.shadowColor)){st.blur++;const k2=who();st.byBlur[k2]=(st.byBlur[k2]||0)+1}if(this.filter&&this.filter!=='none'){st.filt++;const k3=who();st.byFilt[k3]=(st.byFilt[k3]||0)+1}if(this.globalCompositeOperation!=='source-over')st.light++}return O[k].apply(this,arguments)}});
              let fr=0,r2=1;const cnt=()=>{if(!r2)return;fr++;requestAnimationFrame(cnt)};requestAnimationFrame(cnt);await w(2500);r2=0;on=0;names.forEach(k=>C[k]=O[k]);const F=Math.max(1,fr),top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v])=>[k,+(v/F).toFixed(1)]);
              return {map:curMap,n:MAPS[curMap].n,mons:mons.length,drawsPerFrame:Math.round(st.n/F),blurPerFrame:+(st.blur/F).toFixed(1),filterPerFrame:+(st.filt/F).toFixed(1),blendPerFrame:Math.round(st.light/F),blurBy:top(st.byBlur),drawBy:Object.entries(st.by||{}).sort((a,b)=>b[1]-a[1]).slice(0,16).map(([k,v])=>[k,Math.round(v/F)]),filtBy:top(st.byFilt)}}""")
            print(json.dumps(r,ensure_ascii=False))
    finally: p.terminate()
asyncio.run(main())
