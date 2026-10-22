import asyncio,sys,os,base64,json,io
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
from PIL import Image,ImageDraw,ImageFont
# v489: ถ่ายภาพเอฟเฟกต์จากในเกมจริง (ร่ายสกิลแล้วเก็บภาพตามเวลา) · ENV: G=กลุ่ม · TAG=ชื่อไฟล์ · ONLY=ชื่อแถว
OUT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v489/'
FONT='/usr/share/fonts/opentype/tlwg/Loma-Bold.otf'
# แถว: (ชื่อ, อาชีพ, ขั้น, ปุ่ม, รูน, เวลา[วิ], ครอป(dx,dy,w,h))
C0=(-150,-235,620,350);CW=(-260,-260,760,420)
GROUPS={
 's6l':[('รอยแยกโลหิต','melee','u3',5,'',[.15,.45,.7,1.2,1.75,2.3],C0),('รอยแยกโลหิต A','melee','u3',5,'a',[.15,.4,.55,.8,1.0,1.3],C0),
        ('ธนูกลุ่มดาว','archer','u3',5,'',[.1,.35,.6,.82,.95,1.1],C0),('ธนูกลุ่มดาว B','archer','u3',5,'b',[.1,.4,.7,.85,1.0,1.2],C0),
        ('หยุดกาลเวลา','mage','u3',5,'',[.1,.4,1.0,2.0,2.95,3.25],CW),('ม่านราตรี','assn','u3',5,'',[.1,.4,1.0,2.5,4.0,4.9],CW),
        ('อรุณฟื้นคืน','sup','u3',5,'',[.05,.15,.3,.5,.7,.95],CW)],
 's6d':[('กำแพงสวรรค์ถล่ม','melee','u3d',5,'',[.15,.4,.6,.8,.95,1.25],C0),('กำแพงค้าง B','melee','u3d',5,'b',[.2,.6,1.2,2.5,3.6,4.3],C0),
        ('ศรเรียกอสนี','archer','u3d',5,'',[.1,.3,.55,1.0,2.0,3.9],C0),('ศรเรียกอสนี B','archer','u3d',5,'b',[.1,.55,2.0,4.1,4.25,4.5],C0),
        ('สุนัขนรก','mage','u3d',5,'',[.1,.4,1.0,2.5,5.0,7.8],C0),('กรงดาบ','assn','u3d',5,'',[.1,.3,.8,2.0,4.1,4.4],CW),
        ('ดูดวิญญาณ','sup','u3d',5,'',[.1,.4,1.0,2.0,3.5,4.15],C0)],
 'ul':[('ร่างอสูรสงคราม','melee','aw',2,'',[.05,.2,.5,2,5,8.1],C0),('เทพธนูเหินฟ้า','archer','aw',2,'',[.1,.4,1,2,3,4.5],C0),
       ('มังกรอัคคี','mage','aw',2,'',[.1,.4,.8,1.2,1.8,2.6],CW),('จันทราประหาร','assn','aw',2,'',[.1,.4,.8,1.05,1.2,1.5],C0),
       ('โซ่ตรวนสวรรค์','sup','aw',2,'',[.1,.4,.8,1.5,3,4.5],C0)],
 'ud':[('กองทัพวิญญาณเหล็ก','melee','dk',2,'',[.1,.4,1,3,6,8.1],CW),('นักล่าลมกรด','archer','dk',2,'',[.1,.5,1.5,3,4.9,5.3],C0),
       ('หัตถ์ปีศาจ','mage','dk',2,'',[.1,.4,.9,1.6,2.4,3.2],C0),('ระบำเงาสะท้อน','assn','dk',2,'',[.1,.4,1.5,3,5.9,6.2],C0),
       ('พิธีสาปแช่ง','sup','dk',2,'',[.1,.5,1.5,3,5.9,6.3],CW)],
 'b4d':[('ปราการสะท้อนแค้น','melee','dk',4,'',[.1,.5,1.5,2.45,2.6,2.9],C0),('ศรลมกรดสะท้อน','archer','dk',4,'',[.05,.15,.3,.5,.8,1.1],C0),
        ('ทูตอสูรเพลิง','mage','dk',4,'',[.1,.5,1,2,4,8],C0),('วงใบมีดระบำ','assn','dk',4,'',[.1,.5,1.5,3,5,6.1],C0),
        ('ตุ๊กตาคำสาป','sup','dk',4,'',[.1,.5,1.1,2.1,4,6.1],C0)],
 'b34':[('กระโดดทุบพสุธา','melee','aw',3,'',[.1,.3,.45,.55,.7,1.0],C0),('ดาบเทพตกฟ้า','melee','aw',4,'',[.1,.3,.5,.62,.8,1.4],C0),
        ('ศรสังหาร','archer','aw',3,'',[.1,.25,.4,.5,.65,.9],C0),('เหยี่ยวล่าเหยื่อ','archer','aw',4,'',[.2,.8,1.5,2.5,4,6],C0),
        ('ลูกแก้วพลังเวท','mage','aw',3,'',[.1,.4,.9,1.5,2.2,2.9],C0),('พายุหิมะ','mage','aw',4,'',[.1,.5,1.2,2,3,4.2],CW),
        ('กริชเงาไล่ล่า','assn','aw',3,'',[.05,.15,.25,.35,.45,.6],C0),('เคียวเงาพิฆาต','assn','aw',4,'',[.05,.12,.2,.3,.45,.7],C0),
        ('ลำแสงศักดิ์สิทธิ์','sup','aw',3,'',[.1,.3,.6,1,1.5,2],C0),('ดวงแก้วเทวา','sup','aw',4,'',[.2,.8,1.6,2.5,4,5.5],C0)],
 'b12':[('ฟันเสี้ยวจันทร์','melee','base',0,'',[.05,.12,.2,.3,.4,.55],C0),('ขว้างดาบบูมเมอแรง','melee','base',1,'',[.1,.3,.6,.9,1.2,1.6],C0),
        ('ยิงกระจาย','archer','base',0,'',[.03,.08,.14,.2,.3,.45],C0),('ธงล่าเหยื่อ','archer','base',1,'',[.1,.4,1,2,4,6],C0),
        ('หอกน้ำแข็ง','mage','base',0,'',[.05,.12,.2,.3,.4,.55],C0),('วาร์ปพริบตา','mage','base',1,'',[.03,.1,.2,.35,.5,.8],C0),
        ('ดาวกระจาย','assn','base',0,'',[.03,.08,.14,.2,.3,.45],C0),('ตะขอเงา','assn','base',1,'',[.05,.12,.2,.3,.45,.7],C0),
        ('โล่แสง','sup','base',0,'',[.05,.2,.5,1,2,3],C0),('ค้อนพิพากษา','sup','base',1,'',[.1,.3,.5,.7,1,1.4],C0)],
}
G=os.environ.get('G','s6l');ROWS=GROUPS[G];ONLY=os.environ.get('ONLY','');TAG=os.environ.get('TAG','now')
if ONLY: ROWS=[r for r in ROWS if r[0] in ONLY.split(',')]
PREP="""()=>{try{propsHit=function(){};propsFx=function(){}}catch(e){};if(!window.__hk){window.__hk=1;
  setInterval(()=>{if(!window.__BX)return;let i=0;for(const m of mons){if(m.t>=3||m.pv){m.x=-9999;m.y=-9999;continue}if(i>=8){m.x=-9999;m.y=-9999;continue}const P=[[95,-22],[120,20],[160,-12],[195,18],[235,-16],[270,10],[-80,10],[20,80]][i];m.x=__BX+P[0];m.y=__BY+P[1];m.tx=m.x;m.ty=m.y;m.hp=Math.max(m.hp,m.mh*.9);m.atkT=1e12;m.cd=99;if(window.__MT!==undefined&&m.t!==__MT)m.t=__MT;i++}},20)}
  return mons.length}"""
SHOT="""async([k,e,times,cr])=>{fxs.length=0;try{Q8Z.length=0;Q8P.length=0;Q8S.length=0;Q8B.length=0}catch(x){}try{P9.p.length=0;P9.o.length=0}catch(x){}try{GX.dec.length=0;GX.sw.length=0;GX.pil.length=0;GX.fl.length=0;parts.length=0}catch(x){}
  me.x=1100;me.y=1900;me.face=0;window.__BX=1100;window.__BY=1900;banner=null;me.hp=me.mh;me.mp=me.mm;for(let i=0;i<6;i++)me.sk[i]=0;me.q8bk=0;me.stealth=0;me.cd=99;
  const P=sp8();P.e[k]=1;q8Apply(true);const S=rnSt();for(const kk of[0,1,2,3,4,5]){const R=RUNES[me.cls][kk];if(!R)continue;['a','b'].forEach(q=>{if(R[q])S.u[R[q][0]]=1})}for(let i=0;i<6;i++)delete S.e[i];if(e)S.e[k]=e;lockId=null;AUTO.on=false;
  await new Promise(r=>setTimeout(r,250));const f=mons.filter(m=>m.x>me.x+20&&m.t<3).sort((a,b)=>Math.hypot(a.x-me.x,a.y-me.y)-Math.hypot(b.x-me.x,b.y-me.y))[0];lockId=f?f.id:null;
  const t0=performance.now();me.manT=t0;useSkill(k);const out=[];const [dx,dy,Wd,Hd]=cr;
  for(const t of times){const w=t0+t*1000-performance.now();if(w>0)await new Promise(r=>setTimeout(r,w));await new Promise(r=>requestAnimationFrame(()=>r()));
   const c=document.createElement('canvas');c.width=Wd;c.height=Hd;const x2=c.getContext('2d');const s=cv.width/W;banner=null;const sx=(1100-cam.x)*s,sy=(1900-cam.y)*s;
   x2.drawImage(cv,sx+dx*s,sy+dy*s,Wd*s,Hd*s,0,0,Wd,Hd);out.push(c.toDataURL('image/jpeg',.88))}
  me.x=1100;me.y=1900;return out}"""
async def main():
    p=start_server();sheet=[];errs=[]
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        cur=None;pg=None;ctx=None
        for (nm,cls,tier,k,e,times,cr) in ROWS:
            if cur!=(cls,tier):
                if ctx: await ctx.close()
                ctx=await b.new_context(viewport={'width':1100,'height':760});pg=await ctx.new_page();E=[];pg.on('pageerror',lambda x:errs.append(str(x)[:300]))
                await pg.goto(URL);await pg.wait_for_timeout(1500)
                await pg.evaluate(SETUP,[cls,'Q'+cls[:3],60]);await pg.wait_for_timeout(1800)
                await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};enterMap(13,{x:1100,y:1900})}")
                await pg.evaluate("(t)=>{if(t==='base'){me.cls2=0;me.rb=0}else if(t==='aw'){me.cls2=1;me.br=1;me.rb=0}else if(t==='dk'){me.cls2=1;me.br=2;me.rb=0}else if(t==='u3d'){me.cls2=1;me.br=2;me.rb=1;me.lv=95}else{me.cls2=1;me.br=1;me.rb=1;me.lv=95}try{applyBr()}catch(e){}}",tier)
                await pg.wait_for_timeout(3500)
                await pg.evaluate("()=>{try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){};ov.hidden=true;try{if(CZ.on)czSkip()}catch(e){};banner=null;try{camZoomT=()=>1}catch(e){};dn.length=0;dn.push=()=>0;window.DNH=12;try{setGQ('high');LITEQ=0;lqSet=()=>{}}catch(e){};try{wxNow=()=>0;vzWxTick=()=>{};VZ.wx=null}catch(e){}}")
                await pg.evaluate('(t)=>{window.__MT=t}',int(os.environ.get('MT','0')));await pg.evaluate(PREP);await pg.wait_for_timeout(800);cur=(cls,tier)
            fr=await pg.evaluate(SHOT,[k,e,times,list(cr)])
            ims=[Image.open(io.BytesIO(base64.b64decode(u.split(',')[1]))).convert('RGB') for u in fr]
            sheet.append((nm,cls,times,ims));[im.save(OUT+f'raw/{G}_{TAG}_{len(sheet)-1}_{i}.jpg',quality=90) for i,im in enumerate(ims)];print('ok',nm,flush=True)
            await pg.wait_for_timeout(900)
        if ctx: await ctx.close()
    finally: p.terminate()
    # ประกอบแผ่น
    sc=float(os.environ.get('SC','.72'));pad=6;lab=26
    cw=max(int(im.width*sc) for r in sheet for im in r[3]);chh=[int(r[3][0].height*sc) for r in sheet]
    ncol=max(len(r[3]) for r in sheet);Wt=pad+ncol*(cw+pad);Ht=sum(h+lab+pad for h in chh)+pad
    S=Image.new('RGB',(Wt,Ht),(24,18,30));d=ImageDraw.Draw(S);F=ImageFont.truetype(FONT,17);F2=ImageFont.truetype(FONT,13);y=pad
    for (nm,cls,times,ims),h in zip(sheet,chh):
        d.text((pad+2,y+3),nm+'  ·  '+cls,font=F,fill=(255,224,150))
        for i,(im,t) in enumerate(zip(ims,times)):
            x=pad+i*(cw+pad);S.paste(im.resize((int(im.width*sc),int(im.height*sc))),(x,y+lab));d.text((x+5,y+lab+4),f't={t}',font=F2,fill=(255,255,255))
        y+=h+lab+pad
    fn=OUT+f'cap_{G}_{TAG}.jpg';S.save(fn,quality=86);print('saved',fn,'errs',errs[:4])
asyncio.run(main())
