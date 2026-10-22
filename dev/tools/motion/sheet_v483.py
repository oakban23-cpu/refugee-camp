import asyncio,sys,json,base64,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# แผ่นภาพท่า v483: MODE=low|cheer|sit
MODE=os.environ.get('MODE','low');OUT=os.environ.get('OUT','sheet_'+MODE+'.png')
JS=r"""(mode)=>{const CLS=['melee','archer','mage','assn','sup'];const cell=70,ch=78;
 const COLS={low:[['ปกติ',null],['หอบ 0',['l',0]],['หอบ .16',['l',.157]],['หอบ .31',['l',.314]],['กะเผลก a',['lw',.9]],['กะเผลก b',['lw',1.6]],['กะเผลก c',['lw',4.6]],['โล่ง .15',['r',.15]],['โล่ง .3',['r',.3]],['โล่ง .5',['r',.5]],['โล่ง .7',['r',.7]]],
  cheer:[['.05',['c',.05]],['.15',['c',.15]],['.25',['c',.25]],['.35',['c',.35]],['.45',['c',.45]],['.58',['c',.58]],['.66',['c',.66]],['.75',['c',.75]],['.92',['c',.92]]],
  sit:[['ยืน',null],['นั่ง .1',['s',.1,0]],['นั่ง .2',['s',.2,0]],['นั่ง .3',['s',.3,0]],['นั่ง',['s',2,0]],['ผิงไฟ .2',['s',.2,1]],['ผิงไฟ',['s',2,1]],['ผิงไฟ 2',['s',2.7,1]]]}[mode];
 const Wd=COLS.length*cell+60,Hd=CLS.length*ch+30;const c=document.createElement('canvas');const S=3;c.width=Wd*S;c.height=Hd*S;const x2=c.getContext('2d');
 const G0=g,D0=DPR;g=x2;DPR=S;const now=performance.now();
 try{x2.setTransform(S,0,0,S,0,0);x2.fillStyle='#5a7a3e';x2.fillRect(0,0,Wd,Hd);x2.fillStyle='rgba(0,0,0,.08)';for(let i=0;i<COLS.length;i++)if(i%2)x2.fillRect(60+i*cell,0,cell,Hd);
  x2.font='bold 9px system-ui';x2.fillStyle='#fff';x2.textAlign='center';COLS.forEach((cl,i)=>x2.fillText(cl[0],60+i*cell+cell/2,12));
  const L=myLook();CLS.forEach((cls,r)=>{x2.textAlign='left';x2.fillStyle='#fff';x2.fillText(CL[cls].n.split(' ')[0],4,30+r*ch+ch/2);
   COLS.forEach((cl,i)=>{const key='zz'+mode+r+'_'+i,x=60+i*cell+cell/2,y=30+r*ch+ch/2-4;const st=cl[1];let hp=100,mh=100,ph=0;
    delete DPS[key];delete HFS[key];delete RCAST[key];delete LH7[key];delete SI7[key];delete CF7[key];delete ANS[key];
    if(st&&st[0]==='l'){LH7[key]={k:1,low:1,relT:0,t:now,fx:[],bt:2,st:now,tof:st[1]};hp=18}
    if(st&&st[0]==='lw'){LH7[key]={k:1,low:1,relT:0,t:now,fx:[],bt:2,st:now,tof:0};hp=18;ph=st[1];ANS[key]={mv:1,fx:1,lph:-99,t:now-30,it:0}}
    if(st&&st[0]==='r'){LH7[key]={k:0,low:0,relT:now-st[1]*1000,puf:st[1]>.38?0:1,t:now,fx:[],bt:2,st:now};hp=60;if(st[1]>.38)LH7[key].puf=1,LH7[key].fx=[{k:2,t0:now-(st[1]-.38)*1000,sd:1,x0:x,y0:y}]}
    if(st&&st[0]==='c'){RCAST[key]={ty:'cheer',t0:now-st[1]*1000,d:1,big:false,dir:1};c7Burst(key,'');CF7[key].t0=now-st[1]*1000}
    if(st&&st[0]==='s'){SI7[key]={st:1,t0:now-st[1]*1000,t1:0,hit:0,ca:0,lhp:100,s:0,s1:0,fs:1,fw:st[2]};ANS[key]={mv:0,fx:1,lph:0,t:now,it:40}}
    if(st&&st[0]==='s'){const g1=g;g=document.createElement('canvas').getContext('2d');try{drawP(x,y,cls,cls,hp,mh,false,myLk('h'),myLk('b'),ph,1,'',0,Object.assign({},L,{u:key,mt:0,ak:0}))}catch(e){}g=g1}
    try{drawP(x,y,cls,cls,hp,mh,false,myLk('h'),myLk('b'),ph,1,'',0,Object.assign({},L,{u:key,mt:0,ak:0}))}catch(e){x2.fillStyle='red';x2.fillText('ERR '+String(e).slice(0,40),x-30,y)}})})}
 finally{g=G0;DPR=D0}
 return c.toDataURL('image/png')}"""
async def main():
    p=start_server()
    try:
      async with async_playwright() as pw:
        b=await pw.chromium.launch()
        ctx=await b.new_context(viewport={'width':900,'height':700})
        pg=await ctx.new_page();E=[];pg.on('pageerror',lambda e:E.append(str(e)[:300]))
        await pg.goto(URL);await pg.wait_for_timeout(1500)
        await pg.evaluate(SETUP,['melee','cap',70]);await pg.wait_for_timeout(2000)
        await pg.evaluate("()=>{ov.hidden=true;AUTO.on=false;gmGod=true;try{$('tipc').remove()}catch(e){};try{let k=0;while(SD.on&&k<80){stNext();k++}stClose()}catch(e){}}")
        for m in MODE.split(','):
            u=await pg.evaluate(JS,m)
            open('sheet_'+m+'.png','wb').write(base64.b64decode(u.split(',')[1]))
        print('errs',E[:3])
    finally: p.terminate()
asyncio.run(main())
