/* ---------- v383 ตัวเลข/ข้อความเด้งตอนสู้ไม่รก ----------
   1) ของที่ได้ (+ทอง +XP +★ +ผงรูน ได้ไอเทม/การ์ด เควสสำเร็จ ฯลฯ) ย้ายไปขึ้น "แถบรางวัล" ชิดขวาจอ รวมยอดตามชนิด ไม่ลอยทับตัวละคร
   2) เลขดาเมจธรรมดาที่โดนจุดเดียวกันถี่ ๆ รวมเป็นเลขเดียว (เด้งใหม่ทุกครั้งที่บวกเพิ่ม)
   3) เลขคริติคอลที่ขึ้นใกล้กันกระจายซ้าย/ขวาไม่ทับกัน */
const LFD=[];
const LF_RX=/^(🃏 ได้|⭐ |🎒|💎 ผลึก|🌟|★ ดาว|💠 รูนซ้ำ|⚔️ สวมอัตโนมัติ|✔ |✓ |🎣 |ได้ |🪶 ขนนก)/;
function lfIs(d){if(typeof d.v!=='string'||d.vx!==undefined||d.s||(d.c&&typeof d.c!=='string'))return false;const v=d.v;
  if(/^\+[\d,]+ \S/.test(v))return!/ฮีล|^\+[\d,]+ (HP|MP)$/.test(v);return LF_RX.test(v)}
function lfPush(d){const v=d.v,m=/^\+([\d,]+) (.+?)( ×\d+)?$/.exec(v),col=typeof d.c==='string'?d.c:(d.col||(m&&m[2]==='ทอง'?'#ffd84a':m&&m[2]==='XP'?'#8ad8ff':m&&m[2].indexOf('★')>=0?'#e0b0ff':'#fff2d8'));
  if(m){const n=+m[1].replace(/,/g,'')*(m[3]?+m[3].slice(2):1),u=m[2],e=LFD.find(q=>q.u===u&&q.t>.4);if(e){e.sum+=n;e.t=2.8;e.pop=.25;return}LFD.push({u,sum:n,col,t:2.8,a0:0,pop:.25});}
  else{const e=LFD.find(q=>q.txt===v&&q.t>.4);if(e){e.n=(e.n||1)+1;e.t=2.8;e.pop=.25;return}LFD.push({txt:v,col,t:3.2,a0:0,pop:.25})}
  while(LFD.length>6)LFD.shift()}
function dnTidy(){const now=performance.now()/1000;
  for(const d of dn){if(d._td||!(d.t>0))continue;d._td=1;d._b=now;
    if(lfIs(d)){lfPush(d);d.t=0;continue}
    if(typeof d.v==='string'&&d.vx===undefined){const same=dn.filter(q=>q!==d&&q._td&&q.t>0&&q.v===d.v&&now-q._b<.7).length;if(same>=2){d.t=0;continue}}
    if(typeof d.v==='number'&&!d.s&&!d.c&&d.vx===undefined){const e=dn.find(q=>q!==d&&q._td&&q.t>0&&typeof q.v==='number'&&!q.s&&!q.c&&q.vx===undefined&&now-q._b<.32&&Math.abs(q.x-d.x)<30&&Math.abs(q.y-d.y)<26);
      if(e){e.v+=d.v;e._b=now;e.d0=e.t;e.t=Math.max(e.t,d.t);d.t=0;continue}}
    if(d.c&&typeof d.c!=='string'){const near=dn.filter(q=>q!==d&&q._td&&q.t>0&&q.c&&typeof q.c!=='string'&&now-q._b<.45&&Math.abs(q.x-d.x)<44&&Math.abs(q.y-d.y)<30);if(near.length)d.x+=(near.length%2?1:-1)*26*Math.ceil(near.length/2)}}}
{const o=dnStack;dnStack=function(){try{dnTidy()}catch(e){}return o.apply(this,arguments)}}
/* แถบรางวัลชิดขวาจอ (ใต้มินิแมพ) */
function lfDraw(dt){if(!LFD.length||!me.cls)return;g.save();g.setTransform(DPR,0,0,DPR,0,0);let y=Math.round(H*.33);
  for(let i=LFD.length-1;i>=0;i--){const e=LFD[i];e.t-=dt;e.a0=Math.min(1,e.a0+dt*6);e.pop=Math.max(0,e.pop-dt);if(e.t<=0){LFD.splice(i,1);continue}}
  for(let i=LFD.length-1;i>=0;i--){const e=LFD[i],a=Math.min(1,e.t/.4)*e.a0,tx=e.u?'+'+e.sum.toLocaleString()+' '+e.u:e.txt+(e.n>1?' ×'+e.n:''),sc=1+e.pop*.6;
    g.font='bold 11px system-ui';const tw=Math.min(W*.6,g.measureText(tx).width+18),x=W-8-(1-e.a0)*30;g.globalAlpha=a;
    g.fillStyle='rgba(10,8,18,.72)';g.beginPath();g.roundRect(x-tw,y-11,tw,20,10);g.fill();g.strokeStyle=e.col;g.globalAlpha=a*.6;g.lineWidth=1;g.stroke();g.globalAlpha=a;
    g.save();g.translate(x-tw/2,y-1);g.scale(sc,sc);g.textAlign='center';g.textBaseline='middle';g.fillStyle=e.col;g.fillText(tx,0,0,tw-10);g.restore();y+=24}
  g.restore()}
{let lt=0;const o=vigDraw;vigDraw=function(){const r=o.apply(this,arguments);const n=performance.now()/1000,dt=lt?Math.min(.1,n-lt):0;lt=n;try{lfDraw(dt)}catch(e){}return r}}
/* ---------- v383 กลางคืนอ่านฉากง่ายขึ้น ----------
   ขอบแสงจันทร์จาง ๆ รอบมอนสเตอร์บนจอ (บอสเป็นแสงแดง) ให้เห็นรูปร่างชัดในความมืด · ร่วมกับลดความมืดสูงสุดและขยายแสงรอบตัวผู้เล่น (patch340) */
{const o=nightFxLights;nightFxLights=function(L,k){o(L,k);let n=0;const nm=LOWQ?10:36;
  for(const m of mons){if(n>=nm)break;if(!(m.hp>0)||m.x<cam.x-60||m.x>cam.x+W+60||m.y<cam.y-80||m.y>cam.y+H+60)continue;let r=12;try{r=(MT[m.t]&&mR(m))||12}catch(e){}
    if(m.t===3)L(m.x,m.y-r*.6,r*2.4+40,'255,120,100',.2*k);else L(m.x,m.y-r*.55,r*2.5+22,m.el?'255,190,150':'205,220,255',.22*k);n++}}}
