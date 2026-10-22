import asyncio,sys,os,base64
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# v486: แผ่นภาพเอฟเฟกต์อัลติทางเลือก (วาด FXB ตรง ๆ คุมเวลา p)
OUT='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/v486/'
CLS=os.environ.get('CLS','melee,archer,mage,assn,sup').split(',')
JS=r"""(cls)=>{const ROWS={melee:[['q8av','2',{r:130,d:8,av:1}],['q8cone','2w',{r:130,d:.32,a:0}],['q8av','2b',{r:130,d:8,u:'b',av:1}]],
   archer:[['q8sky','2',{r:60,d:2.8,sky:1}],['q8sar','2s',{r:10,d:.3,dx:150}],['q8sar','2b',{r:24,d:.3,dx:150,u:'b'}]],
   mage:[['q8drg','2',{a:0,len:420,r:46,d:2.35,sx:1.1,sy:1}],['q8drg','2a',{a:0,len:420,r:46,d:2.35,sx:1.1,sy:1,u:'i'}],['q8drg','2b',{a:0,len:420,r:46,d:2.35,sx:1.1,sy:1,u:'2'}]],
   assn:[['q8moon','2',{r:30,d:1.3,n:4}],['q8mcut','2c',{r:62,d:.45,dx:135,a:-.9}],['q8moon','2a',{r:30,d:1.3,n:4}]],
   sup:[['q8chn','2',{r:30,d:3.4,n:4}],['q8chn','2b',{r:30,d:3.4,n:4,u:'b'}],['q8hlr','2a',{r:300,d:.7}]]}[cls];
 const PS=[.04,.14,.3,.5,.7,.9],cw=470,ch=300,Wd=PS.length*cw+40,Hd=ROWS.length*ch;const c=document.createElement('canvas'),S=1.6;c.width=Wd*S;c.height=Hd*S;const x2=c.getContext('2d');
 const G0=g,D0=DPR,mx=me.x,my=me.y;g=x2;DPR=S;const now=performance.now()/1000,L=myLook();
 try{x2.setTransform(S,0,0,S,0,0);x2.fillStyle='#3e5a32';x2.fillRect(0,0,Wd,Hd);
  ROWS.forEach((R,ri)=>{PS.forEach((p,ci)=>{const ox=40+ci*cw,oy=ri*ch;x2.save();x2.beginPath();x2.rect(ox,oy,cw,ch);x2.clip();x2.fillStyle=(ri+ci)%2?'#466a38':'#41633a';x2.fillRect(ox,oy,cw,ch);
    const x=ox+70,y=oy+ch*.68,o=R[2];me.x=x;me.y=y;const D=o.d,t=p*D;
    const tg=[];for(let i=0;i<4;i++){const tx=x+80+i*55,ty=y+(i%2?10:-10);tg.push([tx,ty]);x2.fillStyle='rgba(0,0,0,.25)';x2.beginPath();x2.ellipse(tx,ty+12,11,4,0,0,7);x2.fill();x2.fillStyle='#b05a8a';x2.beginPath();x2.arc(tx,ty,10,0,7);x2.fill();x2.strokeStyle='#2a1020';x2.lineWidth=1;x2.stroke()}
    let px=x,py=y;const zu='zzq9'+ri;if(o.sky)Q8J[zu]={t0:performance.now()-t*1000,T:D*1000,k:'h'};if(o.av)Q8AV[zu]=performance.now()+(D-t)*1000;
    let f={k:R[0],by:o.sky?zu:uid,x,y,r:o.r||40,a:o.a||0,len:o.len||0,d:D,t:0,s:ri*7+1,u:o.u||'',sx:o.sx||0,sy:o.sy||0};
    if(o.dx){f.x=x+o.dx;f.y=y}if(R[0]==='q8leap'){f.x=x+o.tx;f.y=y;f.sx=x;f.sy=y}
    if(R[0]==='q8dive'){f.x=x+o.dx;f.y=y;f.sx=x+20;f.sy=y-50}
    if(R[0]==='q8moon'||R[0]==='q8chn'){f.pts=[];f.lp={};for(let i=0;i<o.n;i++){f.pts.push([-1,0]);f.lp[i]=tg[i].slice()}}
    if(R[0]==='q8sar'){f.sx=x;f.sy=y-74}
    if(R[0]==='q8dag'){f.pts=[];f.lp={};for(let i=0;i<o.n;i++){const T=tg[i%4];f.pts.push([-1,Math.round(((o.n>1?i/(o.n-1):.5)-.5)*240)]);f.lp[i]=[T[0],T[1]]}}
    if(R[0]==='q8beam'){f.sx=-5;f.sy=o.two?-6:0;f.la=o.la.slice()}
    const drawMe=()=>{try{drawP(px,py,cls,'',100,100,false,myLk('h'),myLk('b'),0,1,'',0,Object.assign({},L,{u:zu,mt:0,ak:0}))}catch(e){}};
    const top=FXTOP[R[0]];if(top)drawMe();
    try{if(o.tri){for(let i=0;i<3;i++){const an=-1.5708+i*2.0944,dl=i*.12/D;const pp=(p-dl)*D/(D);if(pp<0)continue;FXB[R[0]](f,pp,f.x+Math.cos(an)*60,f.y+Math.sin(an)*44,f.r,now+p)}}else FXB[R[0]](f,p,f.x,f.y,f.r,now+p);
      if(o.ray&&ci%2===0)FXB.q8ray({sx:x+30,sy:y-20,u:'h',s:3},.3,x+60,y,6,now);}catch(e){x2.fillStyle='red';x2.font='10px sans-serif';x2.fillText(String(e).slice(0,70),ox+4,oy+20)}
    if(!top)drawMe();
    x2.restore()});x2.fillStyle='#fff';x2.font='bold 12px system-ui';x2.fillText(R[1]+' '+R[0],4,ri*ch+16)});
  x2.fillStyle='#fff';x2.font='11px system-ui';PS.forEach((p,ci)=>x2.fillText('p='+p,40+ci*cw+4,28))}
 finally{g=G0;DPR=D0;me.x=mx;me.y=my}return c.toDataURL('image/jpeg',.86)}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        for cls in CLS:
            pg=await (await b.new_context(viewport={'width':900,'height':700})).new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
            await pg.goto(URL);await pg.wait_for_timeout(1500);await pg.evaluate(SETUP,[cls,'fx',60]);await pg.wait_for_timeout(2000)
            await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
            u=await pg.evaluate(JS,cls);open(OUT+f'fx_{cls}.jpg','wb').write(base64.b64decode(u.split(',')[1]));print(cls,'errs',E[:3],flush=True)
    finally: p.terminate()
asyncio.run(main())
