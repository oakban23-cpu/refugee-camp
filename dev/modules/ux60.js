
/* ===== v446 · เกจทุบบอสให้ล้ม =====
   บอสทุกตัว (บอสแมพ · หอคอย · MVP — ไม่รวมบอสโลก/บอสกิลด์) มีเกจ «ล้ม» ใต้แถบเลือด
   - เติมจาก: เลือดบอสที่ลดลง (ทั้งปาร์ตี้ · ครั้งแรก 14% ของเลือดเต็ม = เต็มเกจ) + โบนัสจากสกิลที่โดนบอส (สกิล +3 · อัลติ +8)
   - เต็ม → บอสทรุด 6 วิ: หยุดเดิน/หยุดโจมตี · รับดาเมจ ×1.5 จากทุกคน · ดาวหมุนเหนือหัว · พื้นแตก จอสั่น
   - ล้มครั้งต่อไปต้องใช้มากขึ้น ×1.3 ต่อครั้ง (เพดาน 30% ของเลือด) กันล้มติดกัน
   - โฮสต์เป็นคนนับเกจและสั่งล้ม (ส่ง fx u60g/u60b ให้ทุกเครื่องในแมพ) · คนอื่นส่งโบนัสสกิลให้โฮสต์ผ่าน fx u60p
   - ดาเมจ ×1.5 คิดฝั่งคนตี (ทุกเครื่องได้สถานะล้มพร้อมกันจาก fx) */
const U60={g:{},n:{},snt:{},pend:{},pT:0,sT:0,pop:null,on:1,D:6000,K0:.14};
function u60Ok(m){return m&&m.t===3&&!m.wb&&!m.mir&&!m.pv&&m.hp>0}
function u60Brk(m){return!!(m&&m.brkU&&performance.now()<m.brkU)}
function u60Th(id){return Math.min(.3,U60.K0*Math.pow(1.3,U60.n[id]|0))}
/* โฮสต์: นับเกจ */
function u60Host(){if(!U60.on||!run||!me.cls)return;let H=false;try{H=!room||isHost()}catch(e){H=!room}if(!H)return;const now=performance.now();
  for(const m of mons){if(!u60Ok(m))continue;const id=m.id;
    if(m.brkU){if(now<m.brkU){m.__u60h=m.hp;continue}m.brkU=0;U60.n[id]=(U60.n[id]|0)+1;U60.g[id]=0;m.__u60h=m.hp;fx({k:'u60g',id,g:0,n:U60.n[id]});U60.snt[id]=0;continue}
    if(m.__u60h===undefined)m.__u60h=m.hp;
    if(m.hp<m.__u60h&&!m.inv&&!(m.tf>0)){U60.g[id]=(U60.g[id]||0)+(m.__u60h-m.hp)/((m.mh||1)*u60Th(id))*100}m.__u60h=m.hp;
    if((U60.g[id]||0)>=100){U60.g[id]=100;fx({k:'u60b',id,d:U60.D,bx:Math.round(m.x),by:Math.round(m.y)});U60.snt[id]=100;continue}
    if(now-U60.sT>400&&Math.abs((U60.g[id]||0)-(U60.snt[id]||0))>=2){U60.snt[id]=Math.round(U60.g[id]||0);fx({k:'u60g',id,g:U60.snt[id],n:U60.n[id]|0})}}
  if(now-U60.sT>400)U60.sT=now}
setInterval(()=>{try{u60Host()}catch(e){}},100);
/* ส่งโบนัสสกิลให้โฮสต์ ทุก 0.5 วิ */
setInterval(()=>{try{for(const id in U60.pend){const v=Math.min(12,U60.pend[id]);delete U60.pend[id];if(v<=0)continue;let H=false;try{H=!room||isHost()}catch(e){H=!room}
  if(H){const m=mons.find(q=>q.id==id);if(m&&!u60Brk(m))U60.g[id]=Math.min(100,(U60.g[id]||0)+v)}else fx({k:'u60p',id:+id,v})}}catch(e){}},500);
/* รับ fx */
handleFx=(f=>function(o){try{if(o&&(o.k==='u60g'||o.k==='u60b'||o.k==='u60p')){u60Fx(o);return}}catch(e){}return f.apply(this,arguments)})(handleFx);
function u60Fx(o){const id=+o.id,m=mons.find(q=>q.id===id);
  if(o.k==='u60g'){const v=Math.max(0,Math.min(100,+o.g||0));let H=false;try{H=!room||isHost()}catch(e){}if(!H||o.by===uid){U60.g[id]=v}if(o.n!==undefined)U60.n[id]=o.n|0;if(v===0&&m)m.brkU=0;return}
  if(o.k==='u60p'){let H=false;try{H=!room||isHost()}catch(e){}if(H&&m&&!u60Brk(m))U60.g[id]=Math.min(100,(U60.g[id]||0)+Math.min(12,Math.max(0,+o.v||0)));return}
  if(o.k==='u60b'){const d=Math.max(1000,Math.min(8000,+o.d||U60.D));U60.g[id]=100;if(!m)return;m.brkU=performance.now()+d;m.__u60s=performance.now();m.__u60d=d;m.tl=[];
    const x=m.x,y=m.y,near=me.cls&&Math.hypot(me.x-x,me.y-y)<700;U60.pop={t0:performance.now(),near};
    if(near){shk=Math.max(shk,.42);try{hitStop(140)}catch(e){}try{sfx('boom')}catch(e){}try{sfx('crit')}catch(e){}}
    const S=isTw()?2:1;try{GX.dec.push({x,y:y+30*S,r:120*S,t:'crack',v:5,s:performance.now(),l:d+600})}catch(e){}
    try{burst(x,y+30*S,['#cdb894','#9c8a6c','#efe2c0','#ffd27a'],LOWQ?10:30,260,.9,{g:60,glow:1})}catch(e){}
    try{fxs.push({k:'skshk',x,y:y+30*S,r:190*S,t:.7,d:.7,s:Math.random()*99})}catch(e){}}}
/* ดาเมจ ×1.5 ตอนล้ม + โบนัสเกจจากสกิล */
addHit=(f=>function(m,d,cr,lv,ck){try{if(U60.on&&m&&m.t===3&&!m.wb){if(u60Brk(m))arguments[1]=d*1.5;else if(lv){const now=performance.now();if(now-U60.pT>250){U60.pT=now;U60.pend[m.id]=(U60.pend[m.id]||0)+(SKK===2?8:3)}}}}catch(e){}return f.apply(this,arguments)})(addHit);
/* บอสหยุดตอนล้ม (โฮสต์) */
bossAI=(f=>function(m,dt,pl){if(u60Brk(m)){m.tl=[];m.ac=Math.max(m.ac||0,.6);return}return f.apply(this,arguments)})(bossAI);
/* ภาพ: บอสทรุดเอียง + ดาวหมุน */
drawBossAnim=(f=>function(m,T){if(!u60Brk(m))return f.apply(this,arguments);const now=performance.now(),e=(now-m.__u60s)/1000,left=(m.brkU-now)/1000,S=isTw()?2:1,gy=m.y+30*S,dir=(m.id%2)?1:-1;
  const k=Math.min(1,e/.22)*Math.min(1,left/.4),wob=Math.sin(e*7)*.02*k,rot=(.26*k+wob)*dir;
  g.save();g.translate(m.x,gy);g.rotate(rot);g.scale(1+.07*k,1-.15*k);g.translate(-m.x,-gy);try{f.apply(this,arguments)}finally{g.restore()}
  try{u60Dizzy(m,e,left,S,k)}catch(err){}})(drawBossAnim);
function u60Dizzy(m,e,left,S,k){const cx=m.x,cy=m.y-70*S,R=34*S,t=e*3.2;g.save();
  /* วงพื้นนับเวลา */
  const gy=m.y+30*S,fr=Math.max(0,left/((m.__u60d||U60.D)/1000));g.globalCompositeOperation='lighter';g.lineCap='round';
  g.strokeStyle='rgba(255,170,60,'+(.22+.12*Math.sin(e*8))+')';g.lineWidth=10*S;g.beginPath();g.ellipse(m.x,gy,95*S,30*S,0,0,7);g.stroke();
  g.strokeStyle='rgba(255,220,140,.85)';g.lineWidth=3*S;g.beginPath();g.ellipse(m.x,gy,95*S,30*S,0,-1.5708,-1.5708+fr*6.283);g.stroke();
  g.globalCompositeOperation='source-over';
  /* ดาว */
  for(let i=0;i<5;i++){const a=t+i*1.2566,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R*.32,s=(5+(Math.sin(a)>0?2:0))*S*k,fr2=Math.sin(a)>0?1:.55;
    g.fillStyle='rgba(255,224,90,'+fr2+')';g.strokeStyle='rgba(90,50,0,'+fr2+')';g.lineWidth=1.2;g.beginPath();for(let j=0;j<10;j++){const r=j%2?s*.45:s,b=j*.6283-1.5708+t*2;g.lineTo(x+Math.cos(b)*r,y+Math.sin(b)*r)}g.closePath();g.fill();g.stroke()}
  /* ป้าย ×1.5 */
  const ty=cy-24*S,pu=1+.06*Math.sin(e*9);g.translate(cx,ty);g.scale(pu*S*.9,pu*S*.9);g.font='900 15px system-ui';g.textAlign='center';g.textBaseline='middle';
  g.lineWidth=4;g.strokeStyle='rgba(40,14,0,.9)';g.strokeText('💥 ล้ม! ดาเมจ ×1.5',0,0);g.fillStyle='#ffd25a';g.fillText('💥 ล้ม! ดาเมจ ×1.5',0,0);
  g.restore()}
/* แถบเกจใต้แถบเลือดบอส + ป้ายใหญ่ตอนล้ม (จอ) */
function u60Hud(){if(!U60.on||!me.cls||(typeof PH!=='undefined'&&PH.on))return;let bo=null,bd=650;for(const m of mons){if(!u60Ok(m))continue;const d=Math.hypot(m.x-me.x,m.y-me.y);if(d<bd){bd=d;bo=m}}
  const now=performance.now();g.save();g.setTransform(DPR,0,0,DPR,0,0);
  if(bo){const x0=72,bw=Math.max(150,W-172),by=(typeof FEVC!=='undefined'&&FEVC?48:12)+32,br=u60Brk(bo),v=br?Math.max(0,(bo.brkU-now)/(bo.__u60d||U60.D)):Math.max(0,Math.min(1,(U60.g[bo.id]||0)/100)),hot=!br&&v>=.8;
    g.fillStyle='rgba(10,8,14,.78)';g.beginPath();g.roundRect(x0+30,by,bw-60,13,6);g.fill();g.strokeStyle=br?'#ffd25a':'rgba(255,170,80,.7)';g.lineWidth=1;g.stroke();
    const iw=bw-66;if(v>0){const gr=g.createLinearGradient(x0+33,0,x0+33+iw,0);if(br){gr.addColorStop(0,'#ff5a2a');gr.addColorStop(1,'#ffd25a')}else{gr.addColorStop(0,'#c0581a');gr.addColorStop(1,hot?'#ffcf6a':'#ff9a3a')}g.fillStyle=gr;g.beginPath();g.roundRect(x0+33,by+3,Math.max(4,iw*v),7,3.5);g.fill();
      if(hot){g.globalAlpha=.35+.35*Math.sin(now/90);g.fillStyle='#fff3c0';g.beginPath();g.roundRect(x0+33,by+3,Math.max(4,iw*v),7,3.5);g.fill();g.globalAlpha=1}}
    if(!br){g.fillStyle='rgba(0,0,0,.45)';for(let i=1;i<4;i++)g.fillRect(x0+33+iw*i/4,by+3,1,7)}
    g.font='bold 10px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText('💥',x0+18,by+7);if(br){g.font='bold 9px system-ui';g.lineWidth=3.5;g.lineJoin='round';g.strokeStyle='rgba(40,12,0,.9)';const tx='ล้มอยู่ '+((bo.brkU-now)/1000).toFixed(1)+' วิ  ดาเมจ ×1.5';g.strokeText(tx,x0+bw/2,by+7);g.fillStyle='#fff6d8';g.fillText(tx,x0+bw/2,by+7)}}
  const P=U60.pop;if(P&&P.near){const e=(now-P.t0)/1000;if(e>1.5)U60.pop=null;else{const a=e<.12?e/.12:e>1.1?1-(e-1.1)/.4:1,sc=e<.12?1.6-.6*e/.12:1;g.globalAlpha=a;g.translate(W/2,H*.3);g.scale(sc,sc);g.textAlign='center';g.textBaseline='middle';
    g.font='900 30px system-ui';g.lineWidth=7;g.strokeStyle='rgba(40,12,0,.9)';g.strokeText('💥 บอสล้ม!',0,0);g.fillStyle='#ffd25a';g.fillText('💥 บอสล้ม!',0,0);
    g.font='bold 13px system-ui';g.lineWidth=4;g.strokeText('รุมเลย! ดาเมจ ×1.5 · '+((U60.D)/1000)+' วิ',0,26);g.fillStyle='#fff3d0';g.fillText('รุมเลย! ดาเมจ ×1.5 · '+((U60.D)/1000)+' วิ',0,26)}}
  g.restore()}
{const o=vigDraw;vigDraw=function(){const r=o.apply(this,arguments);try{u60Hud()}catch(e){}return r}}
