import asyncio,sys,os,json,base64
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# v486: วัดดาเมจอัลติ (TIER=base|aw|dk|u3 · ALTS=0,1): เดิม vs ทางเลือก × ไม่ใส่รูน/A/B · มอน 10 ตัววางเป็นแถว (ไม่ตาย) · ถ่ายภาพเอฟเฟกต์ (SHOT=1)
CLS=os.environ.get('CLS','melee,archer,mage,assn,sup').split(',');SHOT=os.environ.get('SHOT','0')=='1';ONLY=os.environ.get('ONLY','')
PREP="""()=>{try{propsHit=function(){};propsFx=function(){}}catch(e){};window.__H=[];if(!window.__hk){window.__hk=1;const _a=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){if(lv&&window.__rec){__H.push([performance.now()|0,+d,m.id,ck||'',lv,cr?1:0]);if(window.__dbg&&d>pd()*2.5&&!window.__st)window.__st=new Error().stack}return _a.apply(this,arguments)};
  setInterval(()=>{if(!window.__BX)return;let i=0;for(const m of mons){if(m.t>=3||m.pv){m.x=-9999;m.y=-9999;continue}if(i>=10){m.x=-9999;m.y=-9999;continue}const P=[[70,-18],[90,18],[120,-12],[150,16],[180,-16],[210,12],[240,-10],[280,14],[-70,0],[0,90]][i];m.x=__BX+P[0];m.y=__BY+P[1];m.tx=m.x;m.ty=m.y;m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;i++}},20)}
  return mons.length}"""
ONE="""async([k,alt,e,wait])=>{fxs.length=0;try{fields.length=0}catch(x){}try{zones.length=0}catch(x){}try{pend.length=0}catch(x){}Q8Z.length=0;Q8P.length=0;try{RZ=[]}catch(x){}me.rnSpin=null;
  me.stealth=0;me.inv3=0;Q8S.length=0;Q8B.length=0;me.shv=0;me.shield=0;me.q8bk=0;me.x=1500;me.y=1500;me.face=0;window.__BX=1500;window.__BY=1500;me.hp=me.mh;me.mp=me.mm;for(let i=0;i<6;i++)me.sk[i]=0;
  const P=sp8();if(alt)P.e[k]=1;else delete P.e[k];q8Apply(true);const S=rnSt();for(const kk of[0,1,2,3,4]){const R=RUNES[me.cls][kk];if(!R)continue;['a','b'].forEach(q=>{if(R[q])S.u[R[q][0]]=1})}
  for(let i=0;i<6;i++)delete S.e[i];if(e)S.e[k]=e;try{sgSt().l={}}catch(x){}AUTO.on=false;lockId=null;await new Promise(r=>setTimeout(r,120));
  const f=mons.filter(m=>m.x>me.x+20&&m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];lockId=f?f.id:null;
  __H=[];window.__rec=1;const pdv=pd(),mp0=me.mp,x0=me.x,y0=me.y;me.manT=performance.now();useSkill(k);const r={name:skName(k),cd:+(me.sk[k]||0).toFixed(2),mp:Math.round(mp0-me.mp),dx:Math.round(me.x-x0),dy:Math.round(me.y-y0),pose:me.cast?me.cast.ty:''};
  await new Promise(res=>setTimeout(res,wait));window.__rec=0;const tot=__H.reduce((s,h)=>s+h[1],0);r.dmg=+(tot/pdv).toFixed(2);r.hits=__H.length;r.mons=new Set(__H.map(h=>h[2])).size;r.shv=Math.round(me.shv||0);r.zones=Q8Z.length;r.st=window.__st||'';window.__st=null;r.H=__H.slice(0,80).map(h=>[h[0]-(__H[0]?__H[0][0]:0),Math.round(h[1]/pdv*100),h[2],h[3],h[4],h[5]]);return r}"""
SHOTJS="""async([k,alt,e,times])=>{fxs.length=0;Q8Z.length=0;Q8P.length=0;Q8S.length=0;me.x=1500;me.y=1500;me.face=0;window.__BX=1500;window.__BY=1500;me.hp=me.mh;me.mp=me.mm;for(let i=0;i<6;i++)me.sk[i]=0;me.q8bk=0;
  const P=sp8();if(alt)P.e[k]=1;else delete P.e[k];q8Apply(true);const S=rnSt();for(const kk of[0,1,2,3,4]){const R=RUNES[me.cls][kk];if(!R)continue;['a','b'].forEach(q=>{if(R[q])S.u[R[q][0]]=1})}for(let i=0;i<6;i++)delete S.e[i];if(e)S.e[k]=e;lockId=null;banner=null;await new Promise(r=>setTimeout(r,150));
  const f=mons.filter(m=>m.x>me.x+20&&m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];lockId=f?f.id:null;
  const t0=performance.now();me.manT=t0;useSkill(k);const out=[];for(const t of times){const w=t0+t*1000-performance.now();if(w>0)await new Promise(r=>setTimeout(r,w));
   const c=document.createElement('canvas'),S2=2,Wd=420,Hd=260;c.width=Wd*S2;c.height=Hd*S2;const x2=c.getContext('2d');const s=cv.width/W;
   const sx=(me.x-cam.x)*s,sy=(me.y-cam.y)*s;x2.drawImage(cv,sx-100*s,sy-175*s,Wd*s,Hd*s,0,0,Wd*S2,Hd*S2);out.push(c.toDataURL('image/jpeg',.85))}return out}"""
TIMES={'melee2':[.3,1.5,3,5,7.9],'archer2':[.3,.8,1.5,2.5,2.95],'mage2':[.3,.8,1.3,1.8,2.2],'assn2':[.2,.6,.95,1.08,1.3],'sup2':[.2,.5,1.2,2.5,3.3],'melee3':[.12,.3,.42,.6,.9],'melee4':[.25,.48,.62,1.1,1.6],'archer3':[.2,.36,.45,.56,.75],'archer4':[.4,1.2,1.5,1.62,2.4],'mage3':[.2,.7,1.2,1.8,2.3],'mage4':[.3,1,2,3,4.05],'assn3':[.1,.2,.32,.43,.55],'assn4':[.08,.16,.3,.5,.75],'sup3':[.2,.6,1.0,1.6,2.1],'sup4':[.4,1.2,2.2,3.5,5]}
WT={3:{'melee':2000,'archer':1500,'mage':5600,'assn':5600,'sup':2600},4:{'melee':4200,'archer':8600,'mage':4800,'assn':6400,'sup':8600}}
BR=os.environ.get('BR','1');TIER=os.environ.get('TIER','base')
async def main():
    p=start_server();res=[]
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for cls in CLS:
            ctx=await b.new_context(viewport={'width':900,'height':640});pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]));pg.on('console',lambda m:E.append(m.text[:300]) if m.type=='error' else None)
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,[cls,'Q'+cls[:3],60]);await pg.wait_for_timeout(1800)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};enterMap(13,{x:1500,y:1500})}");await pg.evaluate("(t)=>{if(t==='base'){me.cls2=0;me.rb=0}else if(t==='aw'){me.cls2=1;me.br=1;me.rb=0}else if(t==='dk'){me.cls2=1;me.br=2;me.rb=0}else{me.cls2=1;me.br=1;me.rb=1;me.lv=95}try{applyBr()}catch(e){}}",TIER)
            await pg.wait_for_timeout(3500)
            await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;try{if(CZ.on)czSkip()}catch(e){};banner=null;try{camZoomT=()=>1}catch(e){}}")
            n=await pg.evaluate(PREP);await pg.evaluate('()=>{window.__dbg=1}') if os.environ.get('DBG') else None;await pg.wait_for_timeout(600)
            for k in (2,):
                for alt in [int(a) for a in os.environ.get('ALTS','0,1').split(',')]:
                    for e in ('','a','b'):
                        if ONLY and ONLY!=f'{k}{alt}{e}':continue
                        wait=WT.get(k,{}).get(cls,7000)
                        if SHOT:
                            if not alt: continue
                            fr=await pg.evaluate(SHOTJS,[k,alt,e,TIMES.get(f'{cls}{k}',[.06,.16,.28,.42,.7])])
                            for i,u in enumerate(fr): open(f'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v486/f_{cls}{k}{e or "n"}_{i}.jpg','wb').write(base64.b64decode(u.split(',')[1]))
                            await pg.wait_for_timeout(1200);continue
                        r=await pg.evaluate(ONE,[k,alt,e,wait]);r.update(cls=cls,k=k,alt=alt,e=e);res.append(r)
                        print(r.get('st','')[:900]) if os.environ.get('DBG') else None;print(f"{TIER:4} {cls:7} k{k} {'ALT' if alt else 'old'} {e or '-'} {r['name']:22} dmg {r['dmg']:6} hits {r['hits']:3} mons {r['mons']:2} cd {r['cd']} mp {r['mp']} move {r['dx']},{r['dy']} shv {r['shv']} pose {r['pose']}",flush=True)
            print(cls,'errs',E[:4],flush=True)
            await ctx.close()
    finally: p.terminate()
    if not SHOT: json.dump(res,open('/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v486/meas_'+TIER+'_'+os.environ.get('CLS','all').replace(',','_')+'.json','w'),ensure_ascii=False)
asyncio.run(main())
