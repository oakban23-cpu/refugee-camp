/* ===== v672 · ภาพชุดค่ายใช้กับแมพ 13 สวนลอยฟ้าร้าง =====
   แมพทุ่งหญ้า/ป่าที่ใช้ตัววาดพื้นแบบเดียวกับแมพ 1 มีแมพเดียว (13) · แมพเขียวอื่น (28 38 43) เป็นภาพวาดทั้งแผ่นอยู่แล้ว
   - พื้น w130/w131 → ลายหญ้าวาด (ย้อมเข้มนิดให้เป็นสวนร้าง) · ชั้นดอกไม้ w132 คงเดิม
   - ทุ่งดอกไม้ · หิน/ตอ/พุ่ม/เห็ด/ดอกไม้/หญ้าสูง/หลุมน้ำขัง ภาพวาด · ต้นไม้แมพนี้เป็นภาพวาดเฉพาะแมพ (TRA) อยู่แล้ว คงไว้
   - ปิด: CPG.on=0 */
var CPMS={1:1,13:1};
CPMX.w130=['grass','rgba(6,22,14,.36)'];CPMX.w131=['grass','rgba(4,16,8,.56)'];
var CP12={m:-1};
setInterval(()=>{try{if(curMap===13&&HDI.on)cpLoad();if(CP12.m!==curMap){CP12.m=curMap;if(curMap===13){for(const k of['w130','w131'])delete MX.tile['mx'+MX.v+k];MX.sig=null}}}catch(e){}},700);
cpReset=(f0=>function(){f0.apply(this,arguments);try{for(const k of['w130','w131'])delete MX.tile['mx'+MX.v+k];MX.sig=null}catch(e){}})(cpReset);
