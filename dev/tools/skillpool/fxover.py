import asyncio,sys,os,base64
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
JS=r"""()=>{const L=[['melee',0,'q8wave',{a:-.04,len:260,r:42,d:.42}],['melee',1,'q8boom',{a:0,len:230,r:16,d:.72,sx:.36,sy:0}],['archer',0,'q8fan',{a:0,len:240,r:10,d:.27,sx:.87,u:'5'}],['archer',1,'q8flag',{r:120,d:7,dx:150}],
  ['mage',0,'q8lance',{a:0,len:340,r:10,d:.36}],['mage',1,'q8blink',{r:62,d:.6}],['assn',0,'q8shur',{a:0,len:260,r:10,d:.34,sx:.44,u:'3'}],['assn',1,'q8hook',{d:.55,u:'p',hx:200}],['sup',0,'q8bar',{r:150,d:.9}],['sup',1,'q8ham',{r:80,d:1,dx:150}]];
 const PS=[.16,.4,.68],cw=300,ch=150,pw=PS.length*cw,ph=ch+34,cols=2,Wd=cols*pw+30,Hd=Math.ceil(L.length/cols)*ph+10;const c=document.createElement('canvas'),S=2;c.width=Wd*S;c.height=Hd*S;const x2=c.getContext('2d');
 const G0=g,D0=DPR,mx=me.x,my=me.y;g=x2;DPR=S;const now=performance.now()/1000,LK=myLook();
 try{x2.setTransform(S,0,0,S,0,0);x2.fillStyle='#1c1622';x2.fillRect(0,0,Wd,Hd);
  L.forEach((R,i)=>{const cx=10+(i%cols)*(pw+10),cy=8+Math.floor(i/cols)*ph,D=Q8D[R[0]][R[1]],o=R[3];
   x2.fillStyle='#ffe0a0';x2.font='bold 15px system-ui';x2.textAlign='left';x2.fillText((R[1]?'ปุ่ม 2':'ปุ่ม 1')+' · '+D.n,cx+30,cy+19);x2.fillStyle='#c8b8d8';x2.font='12px system-ui';x2.fillText(CL[R[0]].n,cx+32+x2.measureText(D.n).width*1.25+60,cy+19);
   try{x2.drawImage(window.__Q8I[D.id],cx,cy+2,24,24)}catch(e){}
   PS.forEach((p,j)=>{const ox=cx+j*cw,oy=cy+28;x2.save();x2.beginPath();x2.rect(ox,oy,cw-4,ch);x2.clip();x2.fillStyle=j%2?'#476b39':'#42653a';x2.fillRect(ox,oy,cw,ch);
    const x=ox+48,y=oy+ch*.6;me.x=x;me.y=y;
    for(let k=0;k<4;k++){const tx=x+80+k*52,ty=y+(k%2?9:-9);x2.fillStyle='rgba(0,0,0,.25)';x2.beginPath();x2.ellipse(tx,ty+12,11,4,0,0,7);x2.fill();x2.fillStyle='#b05a8a';x2.beginPath();x2.arc(tx,ty,10,0,7);x2.fill();x2.strokeStyle='#2a1020';x2.lineWidth=1;x2.stroke()}
    try{drawP(x,y,R[0],'',100,100,false,myLk('h'),myLk('b'),0,1,'',0,Object.assign({},LK,{u:'zzov'+i,mt:0,ak:0}))}catch(e){}
    const f={k:R[2],by:uid,x,y,r:o.r||40,a:o.a||0,len:o.len||0,d:o.d,t:0,s:i*7+1,u:o.u||'',sx:o.sx||0,sy:o.sy||0};
    if(o.dx){f.x=x+o.dx}if(R[2]==='q8blink'){f.x=x+170;f.sx=x;f.sy=y}if(R[2]==='q8hook'){f.sx=x+o.hx;f.sy=y}
    try{FXB[R[2]](f,p,f.x,f.y,f.r,now+p)}catch(e){}x2.restore()})})}
 finally{g=G0;DPR=D0;me.x=mx;me.y=my}return c.toDataURL('image/jpeg',.9)}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch();pg=await (await b.new_context(viewport={'width':900,'height':700})).new_page()
        await pg.goto(URL);await pg.wait_for_timeout(1500);await pg.evaluate(SETUP,['melee','ov',60]);await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        await pg.evaluate("async()=>{window.__Q8I={};await Promise.all(Object.keys(Q8IMG).map(k=>new Promise(r=>{const i=new Image();i.onload=r;i.onerror=r;i.src=Q8IMG[k];__Q8I[k]=i})))}")
        u=await pg.evaluate(JS);open('skills_v484.jpg','wb').write(base64.b64decode(u.split(',')[1]))
    finally: p.terminate()
asyncio.run(main())
