import asyncio,sys,json,base64,math,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
RAW=json.load(open('../v477/lairs_raw.json'))
ONLY=[int(x) for x in os.environ.get('ONLY','').split(',') if x]
SZ=int(os.environ.get('SZ','300'))
def cands(m):
    r=RAW[str(m)];P=[(x,y) for x,y,L in r['P']]
    sx,sy=r['sx'],r['sy'];G=r['gates'];B=r['boss'];N=r['nests']
    ok=lambda x,y:math.hypot(x-sx,y-sy)>=450 and all(math.hypot(x-a,y-b)>=220 for a,b in G) and not(B and B[0]>0 and math.hypot(x-B[0],y-B[1])<380) and all(math.hypot(x-a,y-b)>=120 for a,b in N) and 150<x<3050 and 150<y<3050
    C=[p for p in P if ok(*p)]
    sel=[]
    if C:
        sel.append(C[0])
        while len(sel)<14 and len(sel)<len(C):
            sel.append(max(C,key=lambda p:min(math.hypot(p[0]-q[0],p[1]-q[1]) for q in sel)))
    return sel
async def main():
    p=start_server();out={}
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':700,'height':700})
        pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,['melee','cap',140]);await pg.wait_for_timeout(800)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){}}")
        maps=ONLY or [int(k) for k in RAW.keys()]
        for m in maps:
            await pg.evaluate("(m)=>{enterMap(m,{x:MAPS[m].sx,y:MAPS[m].sy})}",m);await pg.wait_for_timeout(1300)
            await pg.evaluate("""(S)=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;W=S;H=S;applyQ();uisMini=function(){};drawP=function(){};try{drawPets=function(){}}catch(e){}for(const f of ['ggDraw','fevHud','drawStMark','drawHuntMark','fevDraw'])try{window[f]=function(){}}catch(e){};
              if(!window.__iv)window.__iv=setInterval(()=>{try{PALG.title=null}catch(e){}banner=null;mons.length=0;fillT=1e9;sp=1e9;bossCd=1e9;fxs.length=0;dn.length=0},20)}""",SZ)
            L=[]
            for i,(x,y) in enumerate(cands(m)):
                v=await pg.evaluate("""([x,y])=>{me.x=x;me.y=y;rt3Cam2=()=>[x,y];const x0=x,y0=y;try{trees.forEach(t=>{const dx=me.x-t.x,dy=me.y-t.y,d=Math.hypot(dx,dy)||1;if(d<t.r+9){me.x=t.x+dx/d*(t.r+9);me.y=t.y+dy/d*(t.r+9)}})}catch(e){}
                  for(const f of ['campCollide','fortCollide','lmCollide','cityCollide','voidCollide','arenaCollide','terCollide','fshCollide','tentCollide'])try{window[f]&&window[f]()}catch(e){}
                  const mv=Math.hypot(me.x-x0,me.y-y0);me.x=x0;me.y=y0;return Math.round(mv)}""",[x,y])
                await pg.wait_for_timeout(700)
                u=await pg.evaluate("()=>cv.toDataURL('image/png')")
                fn=f'crops/m{m}_{i}.png';open(fn,'wb').write(base64.b64decode(u.split(',')[1]))
                L.append([x,y,v,fn])
            out[m]=L;print(m,len(L),[l[2] for l in L],flush=True)
        print('errs',E[:3])
    finally: p.terminate()
    json.dump(out,open('cands%s.json'%('_'+'_'.join(map(str,ONLY)) if ONLY else ''),'w'))
asyncio.run(main())
