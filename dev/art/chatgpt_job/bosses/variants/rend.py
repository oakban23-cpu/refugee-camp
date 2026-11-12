import asyncio, sys, random, json, base64
sys.path.insert(0, '/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
O='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/bvar/'
V=json.load(open(O+'vars.json'))
JS="""([v,base])=>{const[sh,cell,key,id,who,st]=v;BSA.off=1;const og=g,oc=curMap;const C=document.createElement('canvas');C.width=1400;C.height=1200;const G=C.getContext('2d');g=G;let err='';
 const M=MAPS[curMap],CM=M,owb=M.wb;const save={hf:BV1.hf,hpf:BWK.hpf,q:CM.queen,ph:typeof WVRFX!=='undefined'?WVRFX.ph:0,c:RTPK.c,k:RTPK.k,an:WBA.an,go:GBS.go,inh:QSFX.inh,tt:HFX.tt,hinh:HFX.inh};
 try{if(!base&&st)eval(st);g.save();g.translate(700,820);g.scale(2,2);
   if(who==='wb'){drawWorldBoss({x:0,y:0,hp:1,mh:1,t:3,id:1},1.3,0)}
   else if(who==='gb'){GBS.go={s:12};M.wb=1;drawWorldBoss({x:0,y:0,hp:1,mh:1,t:3,id:1},1.3,0)}
   else{const p=Object.fromEntries(who.split(';').map(x=>x.split(':')));drawBoss(0,0,1.3,{n:p.n,hp:1,mh:1},0,base?0:(+p.cf||0),0)}
   g.restore()}catch(e){err=String(e).slice(0,120)}
 finally{BV1.hf=save.hf;BWK.hpf=save.hpf;CM.queen=save.q;try{WVRFX.ph=save.ph}catch(e){};RTPK.c=save.c;RTPK.k=save.k;WBA.an=save.an;GBS.go=save.go;QSFX.inh=save.inh;HFX.tt=save.tt;HFX.inh=save.hinh;try{QSIL=null}catch(e){};try{EYEG=null}catch(e){};M.wb=owb;for(let i=mons.length-1;i>=0;i--)if(mons[i].__tmp)mons.splice(i,1);try{RTFORCE=null}catch(e){};g=og;curMap=oc;BSA.off=0}
 return [C.toDataURL('image/png'),err]}"""
async def main():
    p=start_server()
    try:
        async with async_playwright() as pw:
            b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':915,'height':412},device_scale_factor=1,is_mobile=True,has_touch=True)).new_page()
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
            await pg.goto(URL);await pg.wait_for_timeout(2500)
            await pg.evaluate(SETUP,['melee','Bv'+str(random.randint(100,999)),90]);await pg.wait_for_timeout(3000)
            out={}
            for v in V:
                a=await pg.evaluate(JS,[v,True]);c=await pg.evaluate(JS,[v,False])
                out[v[2]]=[a[0],c[0]]
                if a[1] or c[1]:print(v[2],a[1],c[1])
            json.dump(out,open(O+'rend.json','w'));print('done',errs[:3])
    finally:p.terminate()
asyncio.run(main())
