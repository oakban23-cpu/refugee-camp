import asyncio,sys,json,base64,os
sys.path.insert(0,'/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net')
from h import *
# แผ่นภาพท่า: แถว = อาชีพ · คอลัมน์ = ท่า/เวลา (ควบคุมเวลาเองผ่าน DPS/HFS/RCAST)
MODE=os.environ.get('MODE','death');OUT=os.environ.get('OUT','sheet_'+MODE+'.png');SC=float(os.environ.get('SC','3'))
JS=r"""(mode)=>{const CLS=['melee','archer','mage','assn','sup'];const cell=70,ch=78;
 const COLS={death:[['ยืน',null],['0.12',['d',.12]],['0.3',['d',.3]],['0.45',['d',.45]],['0.6',['d',.6]],['นอน',['d',2.5]],['ลุก .15',['u',.15]],['ลุก .4',['u',.4]],['ลุก .65',['u',.65]]],
  hit:[['ยืน',null],['สะดุ้ง .05',['h',1,.05]],['เซ .08',['h',2,.08]],['เซหลายก้าว .15',['h',3,.15]],['.35',['h',3,.35]],['ล้มก้น .25',['h',4,.25]],['.6',['h',4,.6]],['ลุก .9',['h',4,.9]]],
  act:[['ดื่ม .1',['a','drinkH',.1]],['ดื่ม .4',['a','drinkH',.4]],['ดื่ม MP .55',['a','drinkM',.55]],['ขุด .2',['a','dig',.2]],['ขุด .45',['a','dig',.45]],['หีบ .2',['a','chest',.2]],['หีบ .45',['a','chest',.45]],['หีบ .8',['a','chest',.8]],['โบก .3',['a','wave',.3]],['โบก .55',['a','wave',.55]]]}[mode];
 const Wd=COLS.length*cell+60,Hd=CLS.length*ch+30;const c=document.createElement('canvas');const S=3;c.width=Wd*S;c.height=Hd*S;const x2=c.getContext('2d');
 const G0=g,D0=DPR;g=x2;DPR=S;const now=performance.now();
 try{x2.setTransform(S,0,0,S,0,0);x2.fillStyle='#5a7a3e';x2.fillRect(0,0,Wd,Hd);x2.fillStyle='rgba(0,0,0,.08)';for(let i=0;i<COLS.length;i++)if(i%2)x2.fillRect(60+i*cell,0,cell,Hd);
  x2.font='bold 9px system-ui';x2.fillStyle='#fff';x2.textAlign='center';COLS.forEach((cl,i)=>x2.fillText(cl[0],60+i*cell+cell/2,12));
  const L=myLook();CLS.forEach((cls,r)=>{x2.textAlign='left';x2.fillStyle='#fff';x2.fillText(CL[cls].n.split(' ')[0],4,30+r*ch+ch/2);
   COLS.forEach((cl,i)=>{const key='zz'+mode+r+'_'+i,x=60+i*cell+cell/2,y=30+r*ch+ch/2-4;const st=cl[1];let hp=100,mh=100;
    delete DPS[key];delete HFS[key];delete RCAST[key];
    if(st&&st[0]==='d'){DPS[key]={st:'dead',seen:performance.now(),t0:performance.now()-st[1]*1000,dir:1,cls,sd:(cls==='archer'||cls==='mage'||cls==='sup')?-1:1,imp:1};hp=0}
    if(st&&st[0]==='u'){DPS[key]={st:'up',seen:performance.now(),t0:0,t1:performance.now()-st[1]*1000,dir:1,cls,sd:(cls==='archer'||cls==='mage'||cls==='sup')?-1:1,imp:1}}
    if(st&&st[0]==='h'){HFS[key]={hp:100,t0:performance.now()-st[2]*1000,tr:st[1],sd:1,d:[0,.24,.34,.66,1.15][st[1]]}}
    if(st&&st[0]==='a'){const d=st[1]==='dig'?1:Math.min(1,({drinkH:.75,drinkM:.75,chest:.95,wave:.8})[st[1]]);RCAST[key]={ty:st[1],t0:performance.now()-st[2]*d*1000,d,big:false,dir:1}}
    try{drawP(x,y,cls,cls,hp,mh,false,myLk('h'),myLk('b'),0,1,'',0,Object.assign({},L,{u:key,mt:0}))}catch(e){x2.fillStyle='red';x2.fillText('ERR '+String(e).slice(0,20),x-30,y)}})})}
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
        u=await pg.evaluate(JS,MODE)
        open(OUT,'wb').write(base64.b64decode(u.split(',')[1]))
        print('errs',E[:3])
    finally: p.terminate()
asyncio.run(main())
