/* ---------- v376–v377 การตาย/ฟื้น ----------
   ตาย: เสีย EXP 5% ของเลเวลปัจจุบัน (ไม่ลดเลเวล) · ไม่เสียทองแล้ว (ทองเก็บไว้กด "ฟื้นตรงนี้")
   ฟื้น (ทุกทาง: ฟื้นที่ค่ายเอง · ฟื้นตรงนี้ · เพื่อนชุบ): 3 วินาที อมตะ + มอนไม่สนใจ (me.rsp) · เดินได้ แต่ใช้สกิล/โจมตีไม่ได้ */
const RSPW={d:false,m:0};
function rspGuard(){me.rsp=3;me.inv3=Math.max(me.inv3||0,3);try{mons.forEach(m=>{if(m.tg===uid){m.tg=null;m.tt=0}})}catch(e){}
  try{dn.push({x:me.x,y:me.y-62,v:'🛡️ อมตะ 3 วิ · มอนไม่สนใจ',t:1.8,col:'#fff0a0'})}catch(e){}try{burst(me.x,me.y-10,['#fff0a0','#ffffff','#ffd27a'],22,120,.6,{glow:1,g:-40})}catch(e){}}
setTimeout(()=>{
  try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{if(!me.cls){RSPW.d=false;me.rsp=0;return}const d=me.down>0;if(RSPW.d&&!d&&me.hp>0)rspGuard();RSPW.d=d;if(me.rsp>0)me.rsp=Math.max(0,me.rsp-dt)}catch(e){}}}catch(e){console.warn('rsp',e)}
  try{const _us=useSkill;window.useSkill=useSkill=function(k){if(me.rsp>0){const n=performance.now();if(n-RSPW.m>700){RSPW.m=n;dn.push({x:me.x,y:me.y-56,v:'🛡️ เพิ่งฟื้น · ใช้สกิลได้ในอีก '+Math.ceil(me.rsp)+' วิ',t:1.1,col:'#ffe08a'})}return}return _us.apply(this,arguments)}}catch(e){console.warn('rsp sk',e)}
},70);
