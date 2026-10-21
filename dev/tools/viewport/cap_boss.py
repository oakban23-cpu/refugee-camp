import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[('p390',390,844),('a788',788,288),('b740',740,300),('c915',915,330),('d844',844,390),('e1000',1000,450),('f667',667,300),('g1440',1440,900),('h1920',1920,1080),('i1180',1180,820),('j820',820,1180)]
if os.environ.get('VPS'):VPS=[v for v in VPS if v[0] in os.environ['VPS'].split(',')]
SFX=os.environ.get('SFX','')
BOX="""()=>{const o={};const add=(k,e)=>{if(!e||e.hidden)return;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return;const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;o[k]=[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]};
  for(const id of['hud','mn','evt','cht','emb','stq','bfb','aud','rnq','rbq','fvg','u64b','tmh','ptyhud','rdb'])add(id,$(id));
  const sk=$('sk');if(sk){let L=1e9,T=1e9,Rr=-1e9,B=-1e9;for(const b of sk.querySelectorAll('button')){if(b.hidden||getComputedStyle(b).display==='none')continue;const r=b.getBoundingClientRect();if(r.width<4)continue;L=Math.min(L,r.left);T=Math.min(T,r.top);Rr=Math.max(Rr,r.right);B=Math.max(B,r.bottom)}if(Rr>L)o.sk=[Math.round(L),Math.round(T),Math.round(Rr),Math.round(B)]}
  const c=cv.getBoundingClientRect(),k=c.width/W,jx=c.left+JB.x*k,jy=c.top+JB.y*k,jr=46*k;o.joy=[Math.round(jx-jr),Math.round(jy-jr),Math.round(jx+jr),Math.round(jy+jr)];
  const R=40,mx=c.left+(W-R-8)*k,my=c.top+(R+20)*k,mr=(R+6)*k;o.mini=[Math.round(mx-mr),Math.round(my-mr-6*k),Math.round(mx+mr),Math.round(my+mr)];
  try{if(U61.p>0){const sx=(VW.on&&VW.sh)?vwStyX():14,sy=u61Y(),kk=c.width/SW0;o.sty=[Math.round(c.left+sx*kk),Math.round(c.top+sy*kk),Math.round(c.left+(sx+62)*kk),Math.round(c.top+(sy+58)*kk)]}}catch(e){}
  try{const bo=mons.find(m=>m.t===3);if(bo&&Math.hypot(bo.x-me.x,bo.y-me.y)<650){const kk=c.width/SW0,BB=VW.on?vwBossBar():null,x0=BB?BB[0]:72,bw=BB?BB[1]:Math.max(150,W-172),by=BB?BB[2]:12+hudTY();
    o.boss=[Math.round(c.left+(x0-2)*kk),Math.round(c.top+(by-2)*kk),Math.round(c.left+(x0+bw+2)*kk),Math.round(c.top+(by+45)*kk)]}}catch(e){o.bossErr=String(e)}
  try{if(LFD.length){const kk=c.width/SW0,x=VW.on?vwLfX():W-8,y=VW.on?vwLfY():Math.round(H*.33);o.loot=[Math.round(c.left+(x-120)*kk),Math.round(c.top+(y-11)*kk),Math.round(c.left+x*kk),Math.round(c.top+(y+9+24*(LFD.length-1))*kk)]}}catch(e){}
  return {o,vw:innerWidth,vh:innerHeight,W,H,k:VW.k}}"""
def overlaps(b):
    o=b['o'];bad=[];ks=list(o)
    for i in range(len(ks)):
        for j in range(i+1,len(ks)):
            if {ks[i],ks[j]}<={'hud','mn'}:continue
            a,c=o[ks[i]],o[ks[j]]
            ix=min(a[2],c[2])-max(a[0],c[0]);iy=min(a[3],c[3])-max(a[1],c[1])
            if ix>2 and iy>2: bad.append((ks[i],ks[j],ix,iy))
    out=[k for k,v in o.items() if v[0]<-2 or v[1]<-2 or v[2]>b['vw']+2 or v[3]>b['vh']+2]
    return bad,out
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for nm,w,h in VPS:
            mob=w<1200 or h>w
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=mob,has_touch=mob,device_scale_factor=2.4 if mob else 1)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,['melee','B'+nm+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1200)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};enterMap(2,{x:CX,y:CY})}")
            await pg.wait_for_timeout(2500)
            await pg.evaluate("""()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};
              setInterval(()=>{fillT=1e9;sp=1e9;bossCd=1e9;mons=mons.filter(m=>m.__t);for(const m of mons){m.x=m.tx=m.__t[0];m.y=m.ty=m.__t[1];m.hp=Math.max(m.hp,m.mh*.62)}},50);
              const x=me.x+170,y=me.y-20;mons.push({id:++mid,x,y,tx:x,ty:y,t:3,L:60,p:1,hx:x,hy:y,hp:6e5,mh:1e6,tg:null,tt:0,ac:0,w:null,lg:0,__t:[x,y]});
              try{U60.g[mid]=55}catch(e){}
              window.__fv=setInterval(()=>{try{FV.g=Math.max(FV.g,41);fvHud();U61.p=Math.max(U61.p,120);U61.r=Math.max(U61.r,1);U61.act=performance.now()}catch(e){}},100);
              const L=['+1,276 ทอง','+3,400 XP','+1 หินตีบวก'];let i=0;window.__lf=setInterval(()=>{try{lfPush({v:L[i++%3]})}catch(e){}},600)}""")
            await pg.wait_for_timeout(6500)
            bx=await pg.evaluate(BOX);bad,out=overlaps(bx)
            print(nm,w,h,'W',bx['W'],'H',bx['H'],'bad',bad,'out',out,'keys',[k for k in bx['o']],flush=True)
            print('   ',json.dumps(bx['o']))
            await pg.screenshot(path=f'bo_{nm}{SFX}.png')
            print('  errs',E[:3])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
