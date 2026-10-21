import asyncio,sys,json,os,random
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
VPS=[('a788',788,288),('b740',740,300),('c915',915,330),('d844',844,390),('e1000',1000,450),('f667',667,300),('g1440',1440,900),('h1920',1920,1080),('i1180',1180,820),('j820',820,1180)]
if os.environ.get('VPS'):VPS=[v for v in VPS if v[0] in os.environ['VPS'].split(',')]
SFX=os.environ.get('SFX','')
BOX="""()=>{const o={};const add=(k,e)=>{if(!e||e.hidden)return;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return;const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;o[k]=[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]};
  for(const id of['hud','mn','evt','cht','emb','stq','bfb','aud','rnq','rbq','fvg','u64b','tmh','ptyhud','rdb'])add(id,$(id));
  const sk=$('sk');if(sk){let L=1e9,T=1e9,Rr=-1e9,B=-1e9;for(const b of sk.querySelectorAll('button')){if(b.hidden||getComputedStyle(b).display==='none')continue;const r=b.getBoundingClientRect();if(r.width<4)continue;L=Math.min(L,r.left);T=Math.min(T,r.top);Rr=Math.max(Rr,r.right);B=Math.max(B,r.bottom)}if(Rr>L)o.sk=[Math.round(L),Math.round(T),Math.round(Rr),Math.round(B)]}
  const c=cv.getBoundingClientRect(),k=c.width/W,jx=c.left+JB.x*k,jy=c.top+JB.y*k,jr=46*k;o.joy=[Math.round(jx-jr),Math.round(jy-jr),Math.round(jx+jr),Math.round(jy+jr)];
  const R=40,mx=c.left+(W-R-8)*k,my=c.top+(R+20)*k,mr=(R+6)*k;o.mini=[Math.round(mx-mr),Math.round(my-mr-6*k),Math.round(mx+mr),Math.round(my+mr)];
  try{if(U61.p>0){const sx=(VW.on&&VW.sh)?vwStyX():14,sy=u61Y(),kk=c.width/SW0;o.sty=[Math.round(c.left+sx*kk),Math.round(c.top+sy*kk),Math.round(c.left+(sx+62)*kk),Math.round(c.top+(sy+58)*kk)]}}catch(e){}
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
            ctx=await b.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True,device_scale_factor=2.4)
            pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:200]))
            await pg.goto(URL);await pg.wait_for_timeout(1500)
            await pg.evaluate(SETUP,['melee','S'+nm+str(random.randint(10,99)),99]);await pg.wait_for_timeout(1500)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            await pg.wait_for_timeout(800)
            # สภาพเหมือนผู้เล่นเลเวลสูง: สกิล 4-5 · ปุ่มขี่ · เกจคลั่ง · การ์ดเควสกางเต็ม
            await pg.evaluate("()=>{for(const id of['s4','s5','mtb','atb','ahb']){const e=$(id);if(e)e.hidden=false};try{FV.g=41;fvHud()}catch(e){};window.__fv=setInterval(()=>{try{FV.g=Math.max(FV.g,41);fvHud()}catch(e){}},200)}")
            await pg.wait_for_timeout(900)
            bx=await pg.evaluate(BOX);bad,out=overlaps(bx)
            print(nm,w,h,'W',bx['W'],'H',bx['H'],'bad',bad,'out',out,flush=True)
            print('   ',json.dumps(bx['o']))
            await pg.screenshot(path=f'sh_{nm}{SFX}.png')
            # ปาร์ตี้ (แถบรายชื่อ) + ติดตามแผนที่สมบัติในแมพสนาม (ป้ายอุณหภูมิ)
            await pg.evaluate("""()=>{tmGive(2,'t');const T=tmSt();const o=T.L[T.L.length-1];T.a=o.id;window.__tmo=o;
              const t=Date.now()+9e8;PTY={id:'zz',lead:uid,mem:[{u:uid,n:myName,hp:1,mh:1,mp:o.mp,s:t,cls:me.cls,lv:99},{u:'a1',n:'เพื่อนหนึ่ง',hp:50,mh:100,mp:o.mp,s:t,cls:'mage',lv:90},{u:'a2',n:'เพื่อนสอง',hp:90,mh:100,mp:o.mp,s:t,cls:'archer',lv:88},{u:'a3',n:'เพื่อนสาม',hp:20,mh:100,mp:o.mp,s:t,cls:'melee',lv:95}]};
              enterMap(o.mp,{x:CX,y:CY})}""")
            await pg.wait_for_timeout(2500)
            await pg.evaluate("()=>{ov.hidden=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};for(const m of mons)m.x=-9999;window.__u61=setInterval(()=>{try{U61.p=Math.max(U61.p,120);U61.r=Math.max(U61.r,1);U61.act=performance.now()}catch(e){}},100)}")
            await pg.wait_for_timeout(1200)
            bx=await pg.evaluate(BOX);bad,out=overlaps(bx)
            print(nm,'party+tm','bad',bad,'out',out,flush=True)
            print('   ',json.dumps(bx['o']))
            await pg.screenshot(path=f'sh_{nm}{SFX}_p.png')
            print('  errs',E[:3])
            await ctx.close()
    finally: p.terminate()
asyncio.run(main())
