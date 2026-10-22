import asyncio,sys,os,json
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# v490: ร่ายสกิลเดิม (ไม่ใช้ทางเลือก) ทุกขั้น ทุกปุ่ม ทุกรูน แล้วจด fx ที่ส่งออก
OUT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v490/'
CLS=os.environ.get('CLS','melee');TIERS=os.environ.get('TIERS','base,aw,dk,u3,u3d').split(',')
PREP="""()=>{try{propsHit=function(){};propsFx=function(){}}catch(e){};window.__FX=[];if(!window.__hf){window.__hf=1;const _h=handleFx;handleFx=function(o){try{if(window.__rec&&o&&o.by===uid)__FX.push({k:o.k,u:o.u||'',r:o.r|0,dur:+o.dur||0,len:+o.len||0,n:Array.isArray(o.pts)?o.pts.length:0,t:Math.round(performance.now()-__T0)})}catch(e){}return _h.apply(this,arguments)}}
  if(!window.__hk){window.__hk=1;setInterval(()=>{let i=0;for(const m of mons){if(m.t>=3||m.pv||i>=8){m.x=-9999;m.y=-9999;continue}const P=[[95,-22],[120,20],[160,-12],[195,18],[235,-16],[270,10],[-80,10],[20,80]][i];m.x=1100+P[0];m.y=1900+P[1];m.tx=m.x;m.ty=m.y;m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;i++}},20)}}"""
ONE="""async([k,e,wait])=>{fxs.length=0;try{Q8Z.length=0;Q8P.length=0;Q8S.length=0;Q8B.length=0}catch(x){}me.x=1100;me.y=1900;me.face=0;me.hp=me.mh;me.mp=me.mm;for(let i=0;i<6;i++)me.sk[i]=0;me.stealth=0;me.cd=99;me.shv=0;
  const P=sp8();delete P.e[k];q8Apply(true);const S=rnSt();for(const kk of[0,1,2,3,4,5]){const R=RUNES[me.cls][kk];if(!R)continue;['a','b'].forEach(q=>{if(R[q])S.u[R[q][0]]=1})}for(let i=0;i<6;i++)delete S.e[i];if(e)S.e[k]=e;lockId=null;AUTO.on=false;
  await new Promise(r=>setTimeout(r,250));const f=mons.filter(m=>m.x>me.x+20&&m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];lockId=f?f.id:null;
  window.__FX=[];window.__T0=performance.now();window.__rec=1;me.manT=performance.now();const nm=skName(k);useSkill(k);const cd=+(me.sk[k]||0).toFixed(1),pose=me.cast?me.cast.ty:'';await new Promise(r=>setTimeout(r,wait));window.__rec=0;
  me.x=1100;me.y=1900;return {nm,cd,pose,fx:__FX.slice(0,80)}}"""
async def main():
    p=start_server();res=[]
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for tier in TIERS:
            ctx=await b.new_context(viewport={'width':1100,'height':760});pg=await ctx.new_page()
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,[CLS,'I'+CLS[:3],60]);await pg.wait_for_timeout(1800)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};enterMap(13,{x:1100,y:1900})}")
            await pg.evaluate("(t)=>{if(t==='base'){me.cls2=0;me.rb=0}else if(t==='aw'){me.cls2=1;me.br=1;me.rb=0}else if(t==='dk'){me.cls2=1;me.br=2;me.rb=0}else if(t==='u3d'){me.cls2=1;me.br=2;me.rb=1;me.lv=95}else{me.cls2=1;me.br=1;me.rb=1;me.lv=95}try{applyBr()}catch(e){}}",tier)
            await pg.wait_for_timeout(3000)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;try{if(CZ.on)czSkip()}catch(e){};banner=null;window.DNH=12;try{setGQ('high');LITEQ=0;lqSet=()=>{}}catch(e){}}")
            await pg.evaluate(PREP);await pg.wait_for_timeout(600)
            ks=[0,1,3,4,2]+([5] if tier.startswith('u3') else [])
            for k in ks:
                for e in ('','a','b'):
                    r=await pg.evaluate(ONE,[k,e,8600 if k==2 else 5000 if k==5 else 3600])
                    r.update(cls=CLS,tier=tier,k=k,e=e);res.append(r)
                    print(tier,k,e or '-',r['nm'],'|',' '.join(sorted(set(f"{x['k']}{':'+x['u'] if x['u'] else ''}" for x in r['fx']))),flush=True)
            await ctx.close()
    finally: p.terminate()
    json.dump(res,open(OUT+f'inv_{CLS}.json','w'),ensure_ascii=False)
asyncio.run(main())
