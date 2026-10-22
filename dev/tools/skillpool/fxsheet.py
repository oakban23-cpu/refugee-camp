import asyncio,sys,os,base64
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# แผ่นภาพเอฟเฟกต์สกิลทางเลือก: วาด FXB ตรง ๆ บนพื้นเรียบ (คุมเวลา p ได้) + ตัวละครที่จุดร่าย + เป้าหลอก
CLS=os.environ.get('CLS','melee,archer,mage,assn,sup').split(',')
JS=r"""(cls)=>{const ROWS={melee:[['q8wave','',{a:-.05,len:260,r:42,d:.42}],['q8wave','a3',{a:0,len:230,r:38,d:.4}],['q8wave','b',{a:0,len:200,r:62,d:.55,u:'b'}],
    ['q8boom','',{a:0,len:230,r:16,d:.72,sx:.36,sy:0}],['q8boom','h',{a:0,len:200,r:16,d:1.72,sx:.36,sy:1,u:'h'}],['q8boom','b',{a:0,len:230,r:16,d:.72,sx:.36,sy:0}]],
   archer:[['q8fan','',{a:0,len:240,r:10,d:.27,sx:.87,u:'5'}],['q8fan','',{a:0,len:240,r:10,d:.27,sx:1.4,u:'7'}],['q8fan','',{a:0,len:240,r:10,d:.27,sx:.87,u:'5x'}],
    ['q8flag','',{r:120,d:7,dx:150,u:''}],['q8flag','',{r:120,d:7,dx:150,u:'a'}],['q8flag','',{r:120,d:7,dx:150,u:'b'}]],
   mage:[['q8lance','',{a:0,len:340,r:10,d:.36}],['q8lance','2',{a:0,len:340,r:10,d:.36}],['q8lance','',{a:0,len:220,r:10,d:.24}],
    ['q8blink','',{r:62,d:.6}],['q8blink','',{r:62,d:.6}],['q8blink','',{r:62,d:.6}]],
   assn:[['q8shur','',{a:0,len:260,r:10,d:.34,sx:.44,u:'3'}],['q8shur','',{a:0,len:260,r:10,d:.68,sx:.44,u:'3r'}],['q8shur','',{a:0,len:300,r:16,d:.42,u:'g'}],
    ['q8hook','',{d:.55,u:'p',hx:200}],['q8hook','',{d:.55,u:'p',hx:200}],['q8hook','',{d:.5,u:'s',hx:200}]],
   sup:[['q8bar','',{r:170,d:.9}],['q8bar','',{r:170,d:.9}],['q8bar','',{r:170,d:.9}],['q8ham','',{r:80,d:1,dx:150}],['q8ham','',{r:60,d:1,dx:150,u:'s'}],['q8ham','',{r:120,d:1,dx:150,u:'b'}]]}[cls];
 const PS=[.06,.18,.32,.48,.66,.85],cw=330,ch=170,Wd=PS.length*cw+40,Hd=ROWS.length*ch;const c=document.createElement('canvas'),S=2;c.width=Wd*S;c.height=Hd*S;const x2=c.getContext('2d');
 const G0=g,D0=DPR,mx=me.x,my=me.y;g=x2;DPR=S;const now=performance.now()/1000,L=myLook();
 try{x2.setTransform(S,0,0,S,0,0);x2.fillStyle='#3e5a32';x2.fillRect(0,0,Wd,Hd);
  ROWS.forEach((R,ri)=>{PS.forEach((p,ci)=>{const ox=40+ci*cw,oy=ri*ch;x2.save();x2.beginPath();x2.rect(ox,oy,cw,ch);x2.clip();x2.fillStyle=(ri+ci)%2?'#466a38':'#41633a';x2.fillRect(ox,oy,cw,ch);
    const x=ox+50,y=oy+ch*.62,o=R[2];me.x=x;me.y=y;
    for(let i=0;i<4;i++){const tx=x+80+i*55,ty=y+(i%2?10:-10);x2.fillStyle='rgba(0,0,0,.25)';x2.beginPath();x2.ellipse(tx,ty+12,11,4,0,0,7);x2.fill();x2.fillStyle='#b05a8a';x2.beginPath();x2.arc(tx,ty,10,0,7);x2.fill();x2.strokeStyle='#2a1020';x2.lineWidth=1;x2.stroke()}
    try{drawP(x,y,cls,'',100,100,false,myLk('h'),myLk('b'),0,1,'',0,Object.assign({},L,{u:'zzq8'+ri,mt:0,ak:0}))}catch(e){}
    let f={k:R[0],by:uid,x,y,r:o.r||40,a:o.a||0,len:o.len||0,d:o.d,t:0,s:ri*7+1,u:o.u||'',sx:o.sx||0,sy:o.sy||0};
    if(R[0]==='q8flag'||R[0]==='q8ham'){f.x=x+o.dx;f.y=y}
    if(R[0]==='q8blink'){f.x=x+170;f.y=y;f.sx=x;f.sy=y;me.x=x+170}
    if(R[0]==='q8hook'){f.sx=x+o.hx;f.sy=y;if(o.u==='s'&&p>.32){me.x=x+o.hx*Math.min(1,(p-.32)/.3)-24}}
    if(R[0]==='q8fan'&&ri===2)f.st=[140,null,175,null,120];
    const fx2=f.x,fy2=f.y;try{if(R[1]==='a3'){[-.32,0,.32].forEach(da=>{f.a=da;FXB[R[0]](f,p,fx2,fy2,f.r,now+p)})}else if(R[1]==='2'){[-.12,.12].forEach(da=>{f.a=da;FXB[R[0]](f,p,fx2,fy2,f.r,now+p)})}else FXB[R[0]](f,p,fx2,fy2,f.r,now+p)}catch(e){x2.fillStyle='red';x2.font='10px sans-serif';x2.fillText(String(e).slice(0,60),ox+4,oy+20)}
    x2.restore()});x2.fillStyle='#fff';x2.font='bold 12px system-ui';x2.fillText((ri<3?'1':'2')+['','a','b'][ri%3],6,ri*ch+20)});
  x2.fillStyle='#fff';x2.font='11px system-ui';PS.forEach((p,ci)=>x2.fillText('p='+p,40+ci*cw+4,12))}
 finally{g=G0;DPR=D0;me.x=mx;me.y=my}return c.toDataURL('image/jpeg',.88)}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for cls in CLS:
            pg=await (await b.new_context(viewport={'width':900,'height':700})).new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
            await pg.goto(URL);await pg.wait_for_timeout(1500);await pg.evaluate(SETUP,[cls,'fx',60]);await pg.wait_for_timeout(2000)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            u=await pg.evaluate(JS,cls);open(f'fx_{cls}.jpg','wb').write(base64.b64decode(u.split(',')[1]));print(cls,'errs',E[:3])
    finally: p.terminate()
asyncio.run(main())
