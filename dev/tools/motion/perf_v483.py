import asyncio,sys
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
JS=r"""()=>{const c=document.createElement('canvas');c.width=400;c.height=300;const x2=c.getContext('2d');const G0=g;g=x2;const L=myLook();const R={};
 const run=(nm,prep,hp)=>{const keys=['melee','archer','mage','assn','sup'];keys.forEach(k=>{prep('pf'+nm+k)});let t0=performance.now();for(let i=0;i<400;i++){const k=keys[i%5];drawP(200,150,k,k,hp,100,false,myLk('h'),myLk('b'),0,1,'',0,Object.assign({},L,{u:'pf'+nm+k,mt:0,ak:0}))}R[nm]=Math.round((performance.now()-t0)/400*1000)/1000};
 try{run('normal',k=>{},100);run('normal',k=>{},100);
  run('sit',k=>{SI7[k]={st:1,t0:performance.now()-2000,t1:0,hit:0,ca:0,lhp:100,s:1,s1:0,fs:1,fw:1};ANS[k]={mv:0,fx:1,lph:0,t:performance.now(),it:40}},100);
  run('low',k=>{LH7[k]={k:1,low:1,relT:0,t:performance.now(),fx:[],bt:2,st:0}},18);
  run('cheer',k=>{RCAST[k]={ty:'cheer',t0:performance.now(),d:1,big:false,dir:1};c7Burst(k,'')},100);
  run('normal',k=>{},100)}finally{g=G0}return R}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        pg=await (await b.new_context(viewport={'width':900,'height':700})).new_page()
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,['melee','pf',70]);await pg.wait_for_timeout(2500)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true}")
        for i in range(2): print(await pg.evaluate(JS))
    finally: p.terminate()
asyncio.run(main())
