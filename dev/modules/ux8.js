/* ---------- v376 การตาย/ฟื้น ----------
   ตาย: เสีย EXP 5% ของเลเวลปัจจุบัน (ไม่ลดเลเวล) · ไม่เสียทองแล้ว (ทองเก็บไว้กด "ฟื้นตรงนี้")
   ฟื้น (ทุกทาง: ฟื้นที่ค่ายเอง · ฟื้นตรงนี้ · เพื่อนชุบ): อมตะ 3 วินาที */
const RSPW={d:false};
function rspGuard(){me.inv3=Math.max(me.inv3||0,3);try{dn.push({x:me.x,y:me.y-62,v:'🛡️ อมตะ 3 วิ',t:1.6,col:'#fff0a0'})}catch(e){}try{burst(me.x,me.y-10,['#fff0a0','#ffffff','#ffd27a'],22,120,.6,{glow:1,g:-40})}catch(e){}}
setTimeout(()=>{try{const _wt=wpTick;window.wpTick=wpTick=function(dt){_wt(dt);try{if(!me.cls){RSPW.d=false;return}const d=me.down>0;if(RSPW.d&&!d&&me.hp>0)rspGuard();RSPW.d=d}catch(e){}}}catch(e){console.warn('rsp',e)}},70);
