import asyncio, sys, random, json
sys.path.insert(0, '/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/boss/'
L=json.load(open(O+'all_labels.json'))
JS="""(L)=>{const og=g,oc=curMap,res={};
 const bb=(fn)=>{const C=document.createElement('canvas');C.width=900;C.height=900;const G=C.getContext('2d');g=G;g.save();try{fn()}finally{g.restore()}
   const d=G.getImageData(0,0,900,900).data;let x0=9e9,y0=9e9,x1=-1,y1=-1;for(let y=0;y<900;y++)for(let x=0;x<900;x++){if(d[(y*900+x)*4+3]>170){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}return [x0-450,y0-600,x1-450,y1-600]};
 L.forEach((l,i)=>{let fn;const m=l.match(/^map(\\d+) /);
   if(m){const k=+m[1];fn=()=>{curMap=k;drawBoss(450,600,1.3,Object.assign({hp:1,mh:1},MAPS[k].boss),0,0,0)}}
   else if(l.startsWith('tower')){const f=+l.slice(5);fn=()=>drawTowerBoss(450,600,1.3,f,0,0,0)}
   else if(l==='worldboss'){fn=()=>drawWorldBoss({x:450,y:600,hp:1,mh:1,t:3,id:1},1.3,0)}
   else if(l==='guildboss'){fn=()=>drawGuildBoss({x:450,y:600,hp:1,mh:1,t:3,id:1},1.3,0)}
   else{const n=l==='__hunger'?'ทูตแห่งความหิว · ผู้กลืนดาว':l;fn=()=>drawBoss(450,600,1.3,{n,hp:1,mh:1},0,0,0)}
   try{res[i]=bb(fn)}catch(e){res[i]='ERR '+e}});
 g=og;curMap=oc;const tb={};for(let f=10;f<=100;f+=10)tb[f]=twBI(f);res.twBI=tb;return res}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=1,is_mobile=True,has_touch=True)).new_page()
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','Bm'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(2600)
            r=await pg.evaluate(JS,L);json.dump(r,open(O+'meas.json','w'));print(r['twBI']);print({k:v for k,v in r.items() if k!='twBI'})
    finally:p.terminate()
asyncio.run(main())
