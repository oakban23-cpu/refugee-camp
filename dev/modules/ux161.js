/* ---------- v590 ผาท่าเรือเมฆ (แมพ 38): ของบนท่าเรือ 8 ชิ้นเป็นภาพ HD (ChatGPT · ชุดเดียวกับซุ้มประตูค่าย) ----------
   แผ่นภาพ hd-harbor.webp · ประภาคาร · สำนักงานท่าเรือ · เต็นท์พยาบาล · คลังเสบียง · ปั้นจั่น · อนุสรณ์สมอ · ซากเรือเหาะ · กองลังไม้
   ห่อ phSpr (ตัววาดของท่าเรือที่เตรียมภาพเวกเตอร์ไว้) → คีย์ที่มีภาพ HD วาดภาพแทน · ตำแหน่ง/ชน/เงา/ไฟประภาคารคงเดิม
   ใช้เมื่อเปิด HD และไม่ใช่โหมดประหยัด · ปิด: HBA.off=1 */
const HBA={src:'hd-harbor.webp',off:0,img:null,ok:0,
  /* [sx,sy,sw,sh, กว้างในเกม, จุดยึดแนวนอน (สัดส่วนของความกว้างที่ตรงกับจุดวาง)] */
  f:{lh:[0,0,292,552,206.3,.5],hs:[294,0,366,508,182.9,.5],wr:[662,0,621,408,621,.5],dp:[1285,0,358,315,179.2,.5],md:[1645,0,328,303,163.8,.5],cr:[0,554,336,292,168,.27],an:[338,554,169,292,84.4,.5],cx:[509,554,72,69,35.8,.5]}};
function hbaLoad(){if(HBA.img)return;const im=new Image();im.decoding='async';im.onload=()=>{const d=im.decode?im.decode():Promise.resolve();d.catch(()=>{}).then(()=>{HBA.ok=1})};im.onerror=()=>{HBA.ok=-1};im.src=HBA.src;HBA.img=im}
function hbaOn(){if(HBA.off||curMap!==38)return false;try{if(!HDI.on||lqHD())return false}catch(e){return false}if(!HBA.img)hbaLoad();return HBA.ok===1}
setTimeout(()=>{try{const _p=phSpr;window.phSpr=phSpr=function(key,x,y,bb,fn){if(hbaOn()){const k=key.length>2&&key.slice(0,2)==='cx'?'cx':key,f=HBA.f[k];
      if(f){const w=f[4],h=w*f[3]/f[2],cx=x+bb[0]+bb[2]*(k==='cr'?.2:.5),by=y+bb[1]+bb[3]-(k==='wr'?14:4);g.drawImage(HBA.img,f[0],f[1],f[2],f[3],cx-w*f[5],by-h,w,h);return}}
    return _p.apply(this,arguments)}}catch(e){console.warn('hba',e)}},1600);
