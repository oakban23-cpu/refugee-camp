/* ---------- v649 หน้าเลือกอาชีพภาพวาด (CSA) ----------
   ภาพจาก ChatGPT: hd-cs-scene.webp (ลานกองไฟกลางป่า 1536×1024) · hd-csh-<อาชีพ>.webp (ฮีโร่เต็มตัว 5 อาชีพ เท้าอยู่ขอบล่าง)
   ฉาก: วางภาพแบบ cover ให้กองไฟในภาพตรงกับกองไฟของเวที (cx, fy) · ไฟวูบวาบ+แสงอุ่น · ประกายไฟ/ลำแสง/ชื่อ ใช้ของเดิม
   โหมดสร้างตัวละคร: ฮีโร่ภาพวาดยืนล้อมกองไฟ (ตำแหน่ง/แตะเลือกเดิม) · ตัวที่เลือกใหญ่ขึ้น สว่าง หายใจ · ตัวอื่นมืดลงนิด
   กด «สร้างตัวละคร» → ฮีโร่เดินเข้าหากล้อง · การ์ดอาชีพด้านล่างเป็นภาพครึ่งตัวบน
   โหมดเลือกเซฟเดิม: ใช้ฉากใหม่ แต่ตัวละครยังเป็นร่างจริงที่ใส่ชุดอยู่ · โหลดภาพไม่ครบ = แบบเดิมทั้งหมด */
const CSA={ok:0,n:0,err:'',bg:null,H:{},D:{},P:{},fire:[.501,.618],dr:0,hr:0,hero:0};/* v650: ผู้ใช้ชอบตัวละครจิบิเวกเตอร์แบบเดิม → ใช้เฉพาะฉากภาพวาด (hero:1 = กลับไปใช้ฮีโร่ภาพวาด) */
(function(){try{const ks=CSA.hero?['melee','archer','mage','assn','sup']:[];let n=0;const done=()=>{if(++n===ks.length+1){CSA.ok=1;csaCards()}};
  const b=new Image();b.onload=()=>{CSA.bg=b;done()};b.onerror=()=>{CSA.err='load scene'};b.src='hd-cs-scene.webp';
  for(const k of ks){const im=new Image();im.onload=()=>{CSA.H[k]=im;/* ตัวมืดสำหรับตัวที่ไม่ได้เลือก */const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='rgba(14,10,26,.42)';x.fillRect(0,0,c.width,c.height);CSA.D[k]=c;done()};im.onerror=()=>{CSA.err='load '+k};im.src='hd-csh-'+k+'.webp'}
}catch(e){CSA.err=String(e)}})();
/* ฉากพื้นหลัง: คืน true ถ้าวาดแล้ว */
function csaBG(x,W,H,cx,fy,fl,t){if(!CSA.ok||!CSA.bg)return false;const I=CSA.bg,IW=I.width,IH=I.height,fx=CSA.fire[0]*IW,fyI=CSA.fire[1]*IH;
  let s=Math.max(W/IW,H/IH);for(let i=0;i<40;i++){const ox=cx-fx*s,oy=fy-fyI*s;if(ox<=0&&oy<=0&&ox+IW*s>=W&&oy+IH*s>=H)break;s*=1.03}
  const ox=cx-fx*s,oy=fy-fyI*s;x.drawImage(I,ox,oy,IW*s,IH*s);CSA.s=s;
  x.save();x.globalCompositeOperation='lighter';let gr=x.createRadialGradient(cx,fy-14*s*1.5,4,cx,fy-14*s*1.5,Math.max(W,H)*.42);gr.addColorStop(0,'rgba(255,150,60,'+(.24*fl)+')');gr.addColorStop(.45,'rgba(255,120,40,'+(.08*fl)+')');gr.addColorStop(1,'rgba(255,110,40,0)');x.fillStyle=gr;x.fillRect(0,0,W,H);x.restore();CSA.dr++;return true}
/* ไฟ: เปลวในภาพมีอยู่แล้ว → เติมแสงกะพริบที่แกนไฟ */
function csaFire(x,cx,fy,S,t,fl){const s=CSA.s||1;x.save();x.globalCompositeOperation='lighter';const r=95*s,gr=x.createRadialGradient(cx,fy-40*s,2,cx,fy-40*s,r);gr.addColorStop(0,'rgba(255,230,150,'+(.45*fl)+')');gr.addColorStop(.5,'rgba(255,140,50,'+(.18*fl)+')');gr.addColorStop(1,'rgba(255,120,40,0)');x.fillStyle=gr;x.fillRect(cx-r,fy-40*s-r,r*2,r*2);x.restore()}
/* ความสูงฮีโร่บนเวที */
function csaHH(H,W,dep,sel){const PT=H>W*1.05;return H*(PT?.38:.42)*dep*(sel?1.12:.94)}
function csaHero(x,p,isS,te,t,H,W){if(!CSA.ok||!CSA.hero||csMode!=='new')return false;const k=p.E.cls,I=isS?CSA.H[k]:(CSA.D[k]||CSA.H[k]);if(!I)return false;
  const g0=isS?Math.min(1,te/.45):0,hh=csaHH(H,W,p.dep,false)*(1+.12*(1-Math.pow(1-g0,3))),hw=hh*I.width/I.height,br=isS?1+.008*Math.sin(t*2.2):1;
  x.save();x.translate(p.X,p.Y+2);x.scale(br,br);
  /* เงาใต้เท้า */x.fillStyle='rgba(0,0,0,.42)';x.beginPath();x.ellipse(0,0,hw*.32,hh*.035,0,0,7);x.fill();
  x.drawImage(I,-hw/2,-hh,hw,hh);
  if(isS){/* ขอบแสงไฟอุ่นฝั่งที่หันเข้ากองไฟ */x.globalCompositeOperation='lighter';x.globalAlpha=.12+.05*Math.sin(t*7);x.drawImage(I,-hw/2,-hh,hw,hh);x.globalAlpha=1}
  x.restore();p._hy=p.Y-hh*.5;p._hr=Math.max(26,hw*.36);CSA.hr++;return true}
function csaHeroAt(x,cls,X,Y,hh,a){const I=CSA.H[cls];if(!CSA.ok||!CSA.hero||csMode!=='new'||!I)return false;const hw=hh*I.width/I.height;x.save();x.globalAlpha=a==null?1:a;x.drawImage(I,X-hw/2,Y-hh,hw,hh);x.restore();return true}
/* การ์ดอาชีพ: ภาพครึ่งตัวบน */
CSA.cp={};
function csaCrop(k){if(CSA.cp[k])return CSA.cp[k];const I=CSA.H[k];if(!I)return null;const c=document.createElement('canvas'),w=I.width,h=Math.round(I.height*.52);c.width=Math.round(w*.62);c.height=Math.round(c.width*1.15);const x=c.getContext('2d');
  const sw=w*.86,sh=sw*1.15,sx=(w-sw)/2,sy=0;x.drawImage(I,sx,sy,sw,sh,0,0,c.width,c.height);let u='';try{u=c.toDataURL('image/webp',.9)}catch(e){}if(!u||u.indexOf('data:image/webp')!==0)u=c.toDataURL();return CSA.cp[k]=u}
function csaCards(){if(!CSA.hero)return;try{document.querySelectorAll('.csw [data-cp] img').forEach(im=>{const k=im.closest('[data-cp]').dataset.cp,u=csaCrop(k);if(u&&im.getAttribute('src')!==u){im.src=u;im.classList.add('csa')}})}catch(e){}}
csPortrait=(f=>function(q,sv){if(sv==null&&CSA.ok&&CSA.hero){const u=csaCrop(q);if(u)return u}return f.apply(this,arguments)})(csPortrait);
(function(){try{const st=document.createElement('style');st.textContent='.csw [data-cp] img.csa{object-fit:cover;object-position:50% 8%;filter:drop-shadow(0 3px 6px rgba(0,0,0,.6))}';document.head.appendChild(st)}catch(e){}})();
