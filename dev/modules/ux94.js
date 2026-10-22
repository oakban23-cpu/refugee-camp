
/* ===== v487 · คลังสกิลรอบ 4: สายทมิฬมีสกิลทางเลือกของตัวเอง (ปุ่ม 4 + อัลติ) ทุกอาชีพ =====
   สายแสง/ยังไม่ตื่นพลัง ใช้ชุด v485–486 · สายทมิฬใช้ชุดนี้ (ปุ่ม 4 ตามสายตื่นพลัง · อัลติตามสายตื่นพลัง หรือสายจุติเมื่อใช้อัลติจุติ)
   ธีมตามสายทมิฬของแต่ละอาชีพ: ขุนศึกปราการเหล็ก · พรานพายุคลั่ง · จอมเวทอสูรอัญเชิญ · นักระบำใบมีด · ผู้ทำนายวิญญาณคำสาป
   ของใหม่ในกลไก: ลดดาเมจ (ตั้งโล่ · อัศวินวิญญาณ ทุกเครื่อง) · เพิ่มความเร็วเดิน (ลมกรด) · แบ่งดาเมจ (ตุ๊กตาคำสาป ทุกเครื่อง) · เลียนแบบการโจมตี (ร่างเงา) */
const Q8KN={},Q8VD=[];let Q8SH=0,Q8MC=null;
Object.assign(Q8DB.melee,{
 4:{id:'mk',n:'ปราการสะท้อนแค้น',d:'ตั้งโล่อยู่กับที่ 2.5 วิ รับดาเมจลดลง 60% · โดนตีแต่ละครั้งได้แค้นเพิ่ม · จบด้วยกระแทกโล่วง 150: 250% + แค้นชั้นละ 30% (ใช้แค้นหมด) + มึน 1 วิ',cd:14,mc:35,tg:'atk aoe melee',
   po:{0:['rage',.6],a:['rage',.6],b:['rage',.6]},R:{a:['rm4a','🌵','หนามเหล็ก','ระหว่างตั้งโล่ โดนตีแล้วหนามสะท้อนใส่มอนรอบตัว (วง 90 · 60%)'],b:['rm4b','🚶','ปราการเคลื่อนที่','เดินได้ระหว่างตั้งโล่ · ลดดาเมจ 40%']}},
 2:{id:'yk',n:'กองทัพวิญญาณเหล็ก',d:'เรียกอัศวินวิญญาณ 3 ตนล้อมตัว 8 วิ ตนละฟาดมอนใกล้สุด (120) ทุก 1.2 วิ: 160% + มึน 0.5 วิ · ตัวเราและเพื่อนในวง 150 รับดาเมจลดลง 25%',cd:32,mc:55,tg:'atk aoe dur',
   po:{0:['roar',.8],a:['roar',.8],b:['roar',.8]},R:{a:['rm2a','⚔️','ทัพใหญ่','อัศวิน 5 ตน ตนละ 120%'],b:['rm2b','🛡️','ปราการวิญญาณ','ทั้งทีมในวงรับดาเมจลดลง 40% · ฟาดแล้วมึน 0.8 วิ']}}});
Object.assign(Q8DB.archer,{
 4:{id:'aw',n:'ศรลมกรดสะท้อน',d:'ยิงศรลมที่เด้งต่อไปหามอนตัวถัดไป (ไกล 220) 6 ครั้ง ครั้งละ 240% · มอนน้อยก็เด้งกลับไปมา',cd:12,mc:30,tg:'atk proj',
   po:{0:['rapid',.55],a:['rapid',.55],b:['rapid',.55]},R:{a:['ra4a','🍃','ลมแปดทิศ','เด้ง 8 ครั้ง ครั้งละ 180%'],b:['ra4b','🌀','ลมดูด','ทุกครั้งที่เด้ง ดูดมอนรอบตัวเป้า (70) เข้ามาหา']}},
 2:{id:'yw',n:'นักล่าลมกรด',d:'กลายเป็นลมกรด 5 วิ เดินเร็ว +60% และยิงใบมีดลมใส่มอนรอบตัว (320) เองทุก 0.25 วิ (100%) ทั้งตอนเดิน · จบด้วยพายุไซโคลนวง 140: 250%',cd:30,mc:50,tg:'atk proj dur',
   po:{0:['skyshot',.6],a:['skyshot',.6],b:['skyshot',.6]},R:{a:['ra2a','✂️','ใบมีดแยก','ใบมีดลมแยกไปโดนอีกตัว (120) 50%'],b:['ra2b','🌪️','พายุปิดฉาก','ไซโคลนท้ายใหญ่ขึ้น วง 200: 280% + ดูดมอนเข้ากลาง']}}});
Object.assign(Q8DB.mage,{
 4:{id:'gd',n:'ทูตอสูรเพลิง',d:'เรียกอิมป์ไฟ 2 ตัวบินวนรอบตัว 10 วิ ตัวละยิงลูกไฟใส่มอน (ไกล 260) ทุก 0.8 วิ (90%)',cd:16,mc:45,tg:'atk dur',
   po:{0:['summon',.8],a:['summon',.8],b:['summon',.8]},R:{a:['rg4a','💣','อิมป์พลีชีพ','หมดเวลาอิมป์พุ่งใส่มอนระเบิดวง 70 ตัวละ 250%'],b:['rg4b','👿','อิมป์สามตัว','เรียก 3 ตัว ตัวละ 70%']}},
 2:{id:'yg',n:'หัตถ์ปีศาจ',d:'หัตถ์ปีศาจยักษ์โผล่จากพื้นที่เป้า วง 150 คว้ามอนไว้ (มึน 2 วิ) บีบ 80% ทุก 0.45 วิ แล้วฟาดลงพื้น 500%',cd:32,mc:70,tg:'atk aoe',
   po:{0:['summon',1],a:['summon',1],b:['summon',1]},R:{a:['rg2a','🙌','สองหัตถ์','หัตถ์ที่สองโผล่ที่กลุ่มมอนอีกกลุ่ม (แรง 45%)'],b:['rg2b','🩸','หัตถ์ดูดกลืน','ดูดมอนในวง 260 เข้าหาหัตถ์ก่อน · ฟาดแล้วฟื้นเลือด 10%']}}});
Object.assign(Q8DB.assn,{
 4:{id:'nb',n:'วงใบมีดระบำ',d:'ใบมีด 6 เล่มหมุนวนรอบตัว 6 วิ (วง 70) ฟันมอนที่โดน 40% (ตัวเดียวกันห่างกัน 0.3 วิ) · เดินไปด้วยได้',cd:14,mc:35,tg:'atk aoe dur melee',
   po:{0:['spin2',.6],a:['spin2',.6],b:['spin2',.6]},R:{a:['rn4a','⭕','วงกว้าง','วงใบมีดกว้างขึ้นเป็น 110 (ครั้งละ 30%)'],b:['rn4b','🗡️','ปล่อยใบมีด','หมดเวลาใบมีดพุ่งไล่มอนใกล้สุด เล่มละ 120%']}},
 2:{id:'yb',n:'ระบำเงาสะท้อน',d:'แยกร่างเงา 4 ร่างล้อมตัว 6 วิ ตอนเรียกและตอนจบร่างเงาฟันมอนใกล้ ๆ ร่างละ 200% · ระหว่างนั้นทุกครั้งที่เราโจมตี ร่างเงาทุกร่างฟันตามอีก 35% ของดาเมจ',cd:28,mc:45,tg:'atk aoe dur',
   po:{0:['flurry',.8],a:['flurry',.8],b:['flurry',.8]},R:{a:['rn2a','👥','เงาพันร่าง','ร่างเงา 6 ร่าง ฟันตาม 25%'],b:['rn2b','💥','เงาระเบิด','จบแล้วร่างเงาระเบิด วง 80 ร่างละ 140% (แทนการฟัน)']}}});
Object.assign(Q8DB.sup,{
 4:{id:'uc',n:'ตุ๊กตาคำสาป',d:'วางตุ๊กตาคำสาปที่เป้า 6 วิ ผูกมอนรอบตุ๊กตาสูงสุด 4 ตัว (160) · ดาเมจที่ใครก็ตามตีใส่มอนที่ถูกผูก ส่งต่อให้ตัวอื่นที่ผูกไว้ 30% · ตุ๊กตาสาปทุก 1 วิ 30%',cd:14,mc:40,tg:'atk aoe dur',
   po:{0:['plant',.6],a:['plant',.6],b:['plant',.6]},R:{a:['ru4a','💥','ตุ๊กตาระเบิด','หมดเวลาตุ๊กตาระเบิดวง 120: 120%'],b:['ru4b','🧷','เข็มสาปลึก','ผูก 3 ตัว แต่ส่งต่อ 45%']}},
 2:{id:'yu',n:'พิธีสาปแช่ง',d:'วาดวงพิธีสาปที่เป้า วง 160 นาน 6 วิ: ทุก 1 วิ สาป 45% และมอนในวงรับดาเมจจากทุกคน +25% · จบพิธีระเบิดวิญญาณ 200%',cd:32,mc:60,tg:'atk aoe dur',
   po:{0:['pray2',.9],a:['pray2',.9],b:['pray2',.9]},R:{a:['ru2a','💜','พิธีดูดวิญญาณ','ทุกครั้งที่สาป เพื่อนรอบวง (250) ฟื้นเลือด 1.5% ต่อมอนในวง (สูงสุด 6%)'],b:['ru2b','⏩','สาปเร่งชะตา','พิธีสั้นลงเหลือ 4 วิ แต่สาปทุก 0.5 วิ']}}});
/* ---------- ตัวช่วย ---------- */
function q8ImpP(x,y,t,i,n){const an=t*1.3+i*6.283/n;return[x+Math.cos(an)*38,y-46+Math.sin(an)*10+Math.sin(t*4+i)*4]}
function q8KnP(x,y,t,i,n){const an=t*.6+i*6.283/n;return[x+Math.cos(an)*54,y+Math.sin(an)*30]}
function q8ClnP(x,y,t,i,n){const an=t*.8+i*6.283/n;return[x+Math.cos(an)*50,y+Math.sin(an)*30]}
Object.assign(Q8F,{
 mk(k,P,cost,r){q8Use(k,cost);const D=2.5,sx=me.x,sy=me.y;me.q8gd=performance.now()+D*1000;me.q8gdR=r==='b'?.4:.6;me.q8gdA=r==='a';me.q8gdN=0;fx({k:'q8grd',r:40,dur:D,u:r||''});
   Q8S.push({t:0,f(dt){this.t+=dt;if(me.down>0){me.q8gd=0;return true}if(r!=='b'){me.x=sx;me.y=sy}
     if(this.t>=D){me.q8gd=0;const st=Math.min(12,(me.rg2|0)+(me.q8gdN|0));me.rg2=0;const X=Math.round(me.x),Y=Math.round(me.y);fx({k:'q8gsl',x:X,y:Y,r:150});fx({k:'stun',x:X,y:Y,r:150,full:1,dur:1});
       q8Area(X,Y,150,2.5+.3*st,'melee',1,k,P);if(st)dn.push({x:me.x,y:me.y-60,v:'แค้น ×'+st,t:1,col:'#ff8a6a'});try{shk=Math.max(shk,.3)}catch(e){}return true}return false}});return true},
 yk(k,P,cost,r){q8UltGo(k,cost,8.6);const D=8,n=r==='a'?5:3,mul=r==='a'?1.2:1.6,red=r==='b'?.4:.25,st=r==='b'?.8:.5;
   fx({k:'q8kn',r:150,dur:D,u:n+(r==='b'?'b':''),v:Math.round(red*100)});
   Q8S.push({t:0,tk:[],f(dt){this.t+=dt;if(me.down>0)return true;
     for(let i=0;i<n;i++){this.tk[i]=(this.tk[i]==null?.45+i*.22:this.tk[i])-dt;if(this.tk[i]>0)continue;const p=q8KnP(me.x,me.y,this.t,i,n),m=q8Near(p[0],p[1],120)[0];if(!m){this.tk[i]=.3;continue}this.tk[i]=1.2;
       fx({k:'q8kns',x:Math.round(m.x),y:Math.round(m.y),sx:Math.round(p[0]),sy:Math.round(p[1]),r:30,u:String(i)});
       pend.push({t:.18,f:()=>{if(!(m.hp>0))return;q8Hit(m,pd()*mul*P,'melee',2,k);if(m.t<3)fx({k:'stun',x:Math.round(m.x),y:Math.round(m.y),r:8,full:1,dur:st})}})}
     return this.t>=D}});return true},
 aw(k,P,cost,r){const t=pickTarget(320);if(!t){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}q8Use(k,cost);me.face=Math.atan2(t.y-me.y,t.x-me.x);
   const N=r==='a'?8:6,mul=r==='a'?1.8:2.4,seq=[t];let cur=t;const used=new Set([t]);
   for(let i=1;i<N;i++){let nx=q8Near(cur.x,cur.y,220,o=>!used.has(o))[0];if(!nx)nx=q8Near(cur.x,cur.y,220,o=>o!==cur)[0];if(!nx)break;used.add(nx);seq.push(nx);cur=nx}
   const st=.12;fx({k:'q8wnd',r:10,dur:st*seq.length+.25,pts:seq.map(m=>[m.id,0]),u:r||''});
   seq.forEach((m,i)=>pend.push({t:st*(i+1),f:()=>{if(!(m.hp>0))return;q8Hit(m,pd()*mul*P,'archer',1,k);if(r==='b')q8Near(m.x,m.y,70,o=>o!==m).forEach(o=>q8Pull(o,m.x,m.y,22))}}));return true},
 yw(k,P,cost,r){q8UltGo(k,cost,5.6);const D=5;me.q8gl=performance.now()+D*1000;fx({k:'q8gale',r:40,dur:D,u:r||''});
   Q8S.push({t:0,tk:.2,f(dt){this.t+=dt;this.tk-=dt;if(me.down>0){me.q8gl=0;return true}
     if(this.tk<=0){const T=q8Near(me.x,me.y,320);if(!T.length)this.tk=.15;else{this.tk=.25;const m=T[Math.random()*Math.min(3,T.length)|0],X=Math.round(m.x),Y=Math.round(m.y);
       fx({k:'q8wbl',x:X,y:Y,sx:Math.round(me.x),sy:Math.round(me.y-14),r:12});
       pend.push({t:.12,f:()=>{if(m.hp>0)q8Hit(m,pd()*P,'archer',3,k);if(r==='a'){const o=q8Near(m.x,m.y,120,q=>q!==m)[0];if(o){fx({k:'q8wbl',x:Math.round(o.x),y:Math.round(o.y),sx:X,sy:Y-10,r:9});pend.push({t:.1,f:()=>{if(o.hp>0)q8Hit(o,pd()*.5*P,'archer',3,k)}})}}}})}}
     if(this.t>=D){me.q8gl=0;const R=r==='b'?200:140,X=Math.round(me.x),Y=Math.round(me.y);if(r==='b')q8Near(X,Y,R).forEach(m=>q8Pull(m,X,Y,24));fx({k:'q8cyc',x:X,y:Y,r:R});
       q8Area(X,Y,R,r==='b'?2.8:2.5,'archer',2,k,P);try{shk=Math.max(shk,.25)}catch(e){}return true}return false}});return true},
 gd(k,P,cost,r){q8Use(k,cost);const n=r==='b'?3:2,mul=r==='b'?.7:.9,D=10;fx({k:'q8imp',r:20,dur:D,u:n+(r==='a'?'a':'')});
   Q8S.push({t:0,tk:[],f(dt){this.t+=dt;if(me.down>0)return true;
     for(let i=0;i<n;i++){this.tk[i]=(this.tk[i]==null?.5+i*.27:this.tk[i])-dt;if(this.tk[i]>0)continue;const p=q8ImpP(me.x,me.y,this.t,i,n),m=q8Near(p[0],p[1],260)[0];if(!m){this.tk[i]=.3;continue}this.tk[i]=.8;
       fx({k:'q8imf',x:Math.round(m.x),y:Math.round(m.y),sx:Math.round(p[0]),sy:Math.round(p[1]),r:12});pend.push({t:.22,f:()=>{if(m.hp>0)q8Hit(m,pd()*mul*P,'mage',3,k)}})}
     if(this.t>=D){if(r==='a')for(let i=0;i<n;i++){const p=q8ImpP(me.x,me.y,this.t,i,n),m=q8Near(p[0],p[1],260)[i%Math.max(1,Math.min(n,q8Near(p[0],p[1],260).length))]||null,X=Math.round(m?m.x:p[0]+30),Y=Math.round(m?m.y:p[1]+46);
         fx({k:'q8imf',x:X,y:Y,sx:Math.round(p[0]),sy:Math.round(p[1]),r:20,u:'k'});pend.push({t:.3,f:()=>{fx({k:'q8pop',x:X,y:Y,r:70});q8Area(X,Y,70,2.5,'mage',1,k,P)}})}return true}return false}});return true},
 yg(k,P,cost,r){const p=q8Pt(320,140);q8UltGo(k,cost,3.2);
   const go=(X,Y,pw,main)=>{X=Math.round(X);Y=Math.round(Y);if(main&&r==='b')q8Near(X,Y,260).forEach(m=>q8Pull(m,X,Y,30));fx({k:'q8hand',x:X,y:Y,r:150,dur:2.95,u:main&&r==='b'?'b':''});
     pend.push({t:.4,f:()=>{q8Near(X,Y,150).forEach(m=>fx({k:'stun',x:Math.round(m.x),y:Math.round(m.y),r:8,full:1,dur:2}))}});
     for(let i=0;i<4;i++)pend.push({t:.6+i*.45,f:()=>q8Area(X,Y,150,.8*pw,'mage',3,k,P)});
     pend.push({t:2.5,f:()=>{q8Area(X,Y,150,5*pw,'mage',2,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<500)shk=Math.max(shk,.45)}catch(e){}if(main&&r==='b'&&me.down<=0)me.hp=Math.min(me.mh,me.hp+me.mh*.1)}})};
   go(p.x,p.y,1,1);if(r==='a'){const o=q8Near(me.x,me.y,380,m=>Math.hypot(m.x-p.x,m.y-p.y)>170)[0];if(o)pend.push({t:.25,f:()=>go(o.x,o.y,.45,0)})}return true},
 nb(k,P,cost,r){q8Use(k,cost);const D=6,R=r==='a'?110:70,L=new Map();fx({k:'q8orbt',r:R,dur:D,u:r||''});
   Q8S.push({t:0,f(dt){this.t+=dt;if(me.down>0)return true;const n=performance.now();
     for(let i=0;i<6;i++){const an=this.t*4.2+i*1.0472,bx=me.x+Math.cos(an)*R,by=me.y+Math.sin(an)*R*.55;for(const m of mons){if(!(m.hp>0))continue;if(Math.hypot(m.x-bx,m.y-by)<22+q8R(m)&&(L.get(m)||0)<n-300){L.set(m,n);q8Hit(m,pd()*(r==='a'?.3:.4)*P,'assn',3,k)}}}
     if(this.t>=D){if(r==='b'){const T=q8Near(me.x,me.y,280);if(T.length){const pts=[];for(let i=0;i<6;i++){const m=T[i%T.length];pts.push([m.id,Math.round((i/5-.5)*200)]);pend.push({t:.45,f:()=>{if(m.hp>0)q8Hit(m,pd()*1.2*P,'assn',1,k)}})}fx({k:'q8dag',r:10,dur:.45,pts})}}return true}return false}});return true},
 yb(k,P,cost,r){q8UltGo(k,cost,6.4);const n=r==='a'?6:4,D=6,t0=performance.now();Q8MC={end:t0+D*1000,t0,n,mim:r==='a'?.25:.35,k,P,cd:{}};fx({k:'q8cln',r:50,dur:D,u:n+(r==='b'?'b':'')});
   const strike=(t,mul)=>{for(let i=0;i<n;i++){const p=q8ClnP(me.x,me.y,t,i,n),m=q8Near(p[0],p[1],170)[0];if(!m)continue;fx({k:'q8cls',x:Math.round(m.x),y:Math.round(m.y),sx:Math.round(p[0]),sy:Math.round(p[1]),r:20});pend.push({t:.1,f:()=>{if(m.hp>0)q8Hit(m,pd()*mul*P,'assn',2,k)}})}};
   pend.push({t:.15,f:()=>strike(.15,2)});
   pend.push({t:D,f:()=>{Q8MC=null;if(me.down>0)return;if(r==='b'){for(let i=0;i<n;i++){const p=q8ClnP(me.x,me.y,D,i,n),X=Math.round(p[0]),Y=Math.round(p[1]);fx({k:'q8pop',x:X,y:Y,r:80,u:'v'});q8Area(X,Y,80,1.4,'assn',2,k,P)}}else strike(D,2)}});return true},
 uc(k,P,cost,r){const p=q8Pt(280,100),X=Math.round(p.x),Y=Math.round(p.y),n=r==='b'?3:4,pct=r==='b'?.45:.3,T=q8Near(X,Y,160).slice(0,n);if(!T.length){dn.push({x:me.x,y:me.y-40,v:'ไม่มีเป้าหมาย',t:.8});return false}
   q8Use(k,cost);const D=6;fx({k:'q8vdo',x:X,y:Y,r:160,dur:D,pts:T.map(m=>[m.id,0]),v:Math.round(pct*100),u:r||''});
   for(let i=1;i<=6;i++)pend.push({t:i,f:()=>{let c=0;T.forEach(m=>{if(m.hp>0){c++;q8Hit(m,pd()*.3*P,'curse',3,k)}});if(c)fx({k:'q8rp',x:X,y:Y-20,r:50})}});
   if(r==='a')pend.push({t:D,f:()=>{fx({k:'q8pop',x:X,y:Y,r:120,u:'v'});q8Area(X,Y,120,1.2,'curse',1,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<420)shk=Math.max(shk,.2)}catch(e){}}});return true},
 yu(k,P,cost,r){const p=q8Pt(300,120),X=Math.round(p.x),Y=Math.round(p.y),fast=r==='b',D=fast?4:6,iv=fast?.5:1,R=160;q8UltGo(k,cost,D+.4);fx({k:'q8rit',x:X,y:Y,r:R,dur:D,u:r||''});
   Q8S.push({t:0,tk:.3,f(dt){this.t+=dt;this.tk-=dt;
     if(this.tk<=0){this.tk=iv;const T=q8Near(X,Y,R);fx({k:'q8rp',x:X,y:Y,r:R});if(T.length){fx({k:'q8vul',x:X,y:Y,r:1,dur:iv+1.2,pts:T.slice(0,8).map(m=>[m.id,0])});T.forEach(m=>q8Hit(m,pd()*.45*P,'curse',3,k));
       if(r==='a')fx({k:'q8hlr',x:X,y:Y,r:250,pc:Math.round(Math.min(.06,.015*T.length)*1000)/1000})}}
     if(this.t>=D){fx({k:'q8pop',x:X,y:Y,r:R,u:'v'});q8Area(X,Y,R,2,'curse',2,k,P);try{if(Math.hypot(me.x-X,me.y-Y)<500)shk=Math.max(shk,.3)}catch(e){}return true}return false}});return true}});
/* ---------- ทุกเครื่อง ---------- */
q8Recv=(f=>function(o){f.apply(this,arguments);if(!o||typeof o.k!=='string')return;const n=performance.now();
  if(o.k==='q8kn'&&typeof o.by==='string')Q8KN[o.by]={end:n+Math.min(10,+o.dur||8)*1000,red:Math.min(.5,Math.max(0,(+o.v||25)/100)),r:Math.min(200,+o.r||150)};
  else if(o.k==='q8kns'&&typeof o.by==='string')Q8HK[o.by+':k'+(o.u||'0')]=n+450;
  else if(o.k==='q8vdo'&&Array.isArray(o.pts)){if(Q8VD.length>=8)Q8VD.shift();Q8VD.push({ids:new Set(o.pts.slice(0,8).map(q=>Array.isArray(q)?+q[0]:0).filter(Boolean)),pct:Math.min(.5,Math.max(0,(+o.v||30)/100)),end:n+Math.min(8,+o.dur||6)*1000})}})(q8Recv);
setTimeout(()=>{
  /* ลดดาเมจ: ตั้งโล่ (ตัวเอง) · อัศวินวิญญาณ (ทุกคนในวงของเจ้าของ) · หนามสะท้อน */
  try{const _hu=hurt;window.hurt=hurt=function(d){const n=performance.now();if(d>0){if(me.q8gd>n){d*=1-(me.q8gdR||.6);me.q8gdN=Math.min(10,(me.q8gdN|0)+1);
        if(me.q8gdA&&n-(me.q8gtT||0)>300){me.q8gtT=n;let c=0;mons.forEach(m=>{if(m.hp>0&&!m.pv&&c<6&&Math.hypot(m.x-me.x,m.y-me.y)<90+q8R(m)){c++;addHit(m,pd()*.6,0,3,'melee')}});if(c)fx({k:'q8pop',r:50})}}
      let best=0;for(const u in Q8KN){const K=Q8KN[u];if(K.end<n){delete Q8KN[u];continue}const o=u===uid?me:others[u];if(o&&Math.hypot(o.x-me.x,o.y-me.y)<K.r)best=Math.max(best,K.red)}if(best)d*=1-best}
    return _hu.apply(this,[d].concat(Array.prototype.slice.call(arguments,1)))}}catch(e){}
  /* ลมกรด: เดินเร็ว +60% */
  try{tbMoveMul=(f=>function(){const v=f.apply(this,arguments);return me.q8gl>performance.now()?v*1.6:v})(tbMoveMul)}catch(e){}
  /* ตุ๊กตาคำสาป: แบ่งดาเมจให้ตัวที่ผูกไว้ · ระบำเงา: ร่างเงาฟันตาม */
  try{const _ah=addHit;window.addHit=addHit=function(m,d,cr,lv,ck){const r=_ah.apply(this,arguments);if(Q8SH||!m||!(d>0)||m.pv)return r;const n=performance.now();
      try{for(let i=Q8VD.length-1;i>=0;i--){const V=Q8VD[i];if(V.end<n){Q8VD.splice(i,1);continue}if(!V.ids.has(m.id))continue;Q8SH=1;try{V.ids.forEach(id=>{if(id===m.id)return;const o=mons.find(q=>q.id===id);if(o&&o.hp>0)addHit(o,d*V.pct,0,3,'curse')})}finally{Q8SH=0}}}catch(e){}
      try{const C=Q8MC;if(C&&n<C.end&&lv!==3&&me.cls&&me.down<=0){for(let i=0;i<C.n;i++){if((C.cd[i]||0)>n)continue;const p=q8ClnP(me.x,me.y,(n-C.t0)/1000,i,C.n),t=Math.hypot(m.x-p[0],m.y-p[1])<150&&m.hp>0?m:q8Near(p[0],p[1],150)[0];if(!t)continue;C.cd[i]=n+250;
          Q8SH=1;try{addHit(t,d*C.mim,0,3,'assn')}finally{Q8SH=0}if(Math.random()<.5)fx({k:'q8cls',x:Math.round(t.x),y:Math.round(t.y),sx:Math.round(p[0]),sy:Math.round(p[1]),r:16})}}}catch(e){}return r}}catch(e){}
  /* เปลี่ยนสาย → สลับชุดสกิลทางเลือกทันที */
  try{applyBr=(f=>function(){const r=f.apply(this,arguments);try{q8Apply()}catch(e){}return r})(applyBr)}catch(e){}
},1850);
