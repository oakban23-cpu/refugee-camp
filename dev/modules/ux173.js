/* ---------- v599 ตรวจภาพซ้อน (OVF) ขยายไปเหมืองดาวคาร์น (แมพ 35) ----------
   ใช้ขนาดภาพ HD ของ KMA · ของย้ายได้: เสาตะเกียง ก้อนหิน กระบองเพชร · ที่วางได้ตามกติกาเดิมของแมพ (ไม่ทับราง/ผา/หลุม/ค่าย/ประตู/รัง) */
Object.assign(OVF.mv,{kpole:1,kbld:1,kcac:1});
setTimeout(()=>{try{
  const _ob=ovfBox;window.ovfBox=ovfBox=function(t,mp){if(mp!==35)return _ob(t,mp);const m=KMA.m[t.k];
    if(m){const q=m[(t.v|0)%m.length],w=kmaW(t.k,t,q),f=KMA.f[q[0]];return {t,x:t.x,y:t.y+(t.k==='ktun'?34:0),w,h:w*f[3]/f[2]}}
    if(t.k==='kbld'||t.k==='kcac'){const s=t.sc||1;return {t,x:t.x,y:t.y,w:40*s,h:50*s}}if(t.k==='kwrk')return {t,x:t.x,y:t.y,w:30,h:46};return null};
  const _ok=ovfOk;window.ovfOk=ovfOk=function(mp,M,x,y){if(mp!==35)return _ok(mp,M,x,y);try{return Math.hypot(x-M.sx,y-M.sy)>M.sr+60&&(M.gates||[]).every(G=>Math.hypot(x-G.x,y-G.y)>120)&&Math.hypot(x-KPIT.x,y-KPIT.y)>KPIT.r+70&&KMESA.every(([a,b,r])=>Math.hypot(x-a,y-b)>r+40)
    &&Math.hypot(x-KCAMP.x,y-KCAMP.y)>300&&(M.nests||[]).every(([a,b])=>Math.hypot(x-a,y-b)>120)&&KMIN.every(([a,b])=>Math.hypot(x-a,y-b)>130)&&kmSegD(x,y)>60&&Math.hypot(x-1880,y-520)>150}catch(e){return false}};
  const o=kmBuild;window.kmBuild=kmBuild=function(M){const r=o.apply(this,arguments);try{/* คนงานที่ยืนหลังกองไฟ (ภาพกองไฟใหม่มีขาตั้งหม้อ สูงขึ้น) → ขยับไปยืนข้าง ๆ */const F=trees.find(t=>t.k==='kfire');if(F)for(const t of trees)if(t.k==='kwrk'&&Math.abs(t.x-F.x)<50&&t.y<F.y&&F.y-t.y<90){t.x=F.x+72;t.y=F.y-46}}catch(e){}try{ovfRun(35,M)}catch(e){console.warn('ovf35',e)}return r};
}catch(e){console.warn('ovf35',e)}},1950);
