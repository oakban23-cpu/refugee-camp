import asyncio, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/probe/'
INIT=r"""(()=>{const T=window.__IT={};const si=window.setInterval;window.setInterval=function(f,ms){let s='';try{s=(new Error().stack||'').split('\n')[2].trim().replace(/^at .*?:(\d+):\d+\)?$/,'$1')}catch(_){}const k=s+'|'+ms;const w=typeof f==='function'?function(){const a=performance.now();try{return f.apply(this,arguments)}finally{const e=T[k]||(T[k]={n:0,t:0,ms});e.n++;e.t+=performance.now()-a}}:f;return si.call(this,w,ms)}})();"""
async def main():
    import os;os.makedirs(O,exist_ok=True)
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch()
            ctx=await b.new_context(viewport={'width':915,'height':412},device_scale_factor=2,is_mobile=True,has_touch=True)
            await ctx.add_init_script(INIT)
            pg=await ctx.new_page()
            await pg.goto(URL);await pg.wait_for_timeout(4000)
            # 1) หน้าเริ่มเกม: ภาพจอกับ/ไม่วาดโลกข้างหลัง ต่างกันไหม
            await pg.screenshot(path=O+'title_a.png')
            await pg.evaluate("()=>{window.__d0=draw;window.draw=draw=function(){}}");await pg.wait_for_timeout(600)
            await pg.screenshot(path=O+'title_b.png')
            await pg.evaluate("()=>{window.draw=draw=window.__d0}")
            await pg.evaluate(SETUP,['mage','Prb1',80]);await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};banner=null;gmGod=true;ov.hidden=true}")
            # 2) timer cost 10s ในค่าย
            await pg.evaluate("()=>{for(const k in __IT){__IT[k].n=0;__IT[k].t=0}}");await pg.wait_for_timeout(10000)
            it=await pg.evaluate("()=>Object.entries(__IT).map(([k,v])=>[k,v.n,Math.round(v.t*10)/10]).sort((a,b)=>b[2]-a[2])")
            tot=sum(x[2] for x in it);calls=sum(x[1] for x in it)
            print('intervals: sites',len(it),'calls/10s',calls,'ms/10s',round(tot,1));[print('  ',x) for x in it[:15]]
            # 3) หน้าต่างอุปกรณ์เปิด: ภาพจอกับ/ไม่วาดโลกข้างหลัง
            for nm,fn in [('gear','gearUI()'),('menu','menuToggle()'),('skills','treeUI()'),('worldmap','wmUI()'),('shop','shopUI(0)'),('quest','questUI()')]:
                await pg.evaluate("(f)=>{ov.hidden=true;eval(f)}",fn);await pg.wait_for_timeout(700)
                await pg.screenshot(path=O+nm+'_a.png')
                await pg.evaluate("()=>{window.__d0=draw;window.draw=draw=function(){g.setTransform(1,0,0,1,0,0);g.fillStyle='#ff00ff';g.fillRect(0,0,cv.width,cv.height)}}");await pg.wait_for_timeout(500)
                await pg.screenshot(path=O+nm+'_b.png')
                await pg.evaluate("()=>{window.draw=draw=window.__d0;ov.hidden=true}")
            # 4) cwDraw: พื้นที่ที่วาดต่อเฟรม (นครอัสตรา ถนนใต้)
            await pg.evaluate("async()=>{enterMap(9,{x:1600,y:1950});await new Promise(r=>setTimeout(r,2500));for(let i=0;i<100&&(AST.ok!==1||AST.re||!CG.ast);i++)await new Promise(r=>setTimeout(r,150));me.x=1600;me.y=1950;ov.hidden=true}")
            await pg.wait_for_timeout(1000)
            r=await pg.evaluate("""async()=>{const o=CanvasRenderingContext2D.prototype.drawImage;let A={};const st=[];CanvasRenderingContext2D.prototype.drawImage=function(im,...a){if(this===g){const k=im===CW.c?'CW':im===CG.c?'CG':(im&&im.src?im.src.split('/').pop():(im&&im.width+'x'+im.height));let w,h;if(a.length>=8){w=a[6];h=a[7]}else if(a.length>=4){w=a[2];h=a[3]}else{w=im.width;h=im.height}const M=this.getTransform();const px=Math.abs(w*h*M.a*M.d);A[k]=(A[k]||0)+px}return o.apply(this,arguments)};
              await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));A={};await new Promise(r=>requestAnimationFrame(r));CanvasRenderingContext2D.prototype.drawImage=o;
              const scr=cv.width*cv.height;return [scr,Object.entries(A).map(([k,v])=>[k,Math.round(v/scr*100)/100]).sort((a,b)=>b[1]-a[1]).slice(0,15),CW.rows?CW.rows.reduce((s,r)=>s+r.reduce((q,[a,b])=>q+b-a,0),0)*CW.T:0,CW.c.width*CW.c.height]}""")
            print('screen px',r[0]);print('drawImage area (screens) per frame by source:');[print('  ',x) for x in r[1]];print('CW mask area',r[2],'of',r[3],round(r[2]/r[3],2))
    finally:p.terminate()
asyncio.run(main())
