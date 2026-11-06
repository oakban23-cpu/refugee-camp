/* ---------- v605 ตรวจภาพซ้อน (OVF) ขยายไป 6 แมพที่ใช้ภาพ ChatGPT: หอดูดาว 36 · สะพาน 30 · อารัณยา 32 · ที่ราบดาวตก 34 · ปากเหว 43 · สุสานเรือ 39 ----------
   ใช้ขนาดภาพจริงของ GPA (ย่อขยายตามจุด) · ของอื่นใช้รัศมีชน · ที่วางได้ = กติกาเดิมของแต่ละแมพ (บนเกาะ/ไม่ทับทาง/ประตู/รัง/จุดเกิด)
   ถือว่า "ธรรมชาติ" ไม่ต้องแยก: หินกองรวมกัน · หินกับพุ่มไม้ · คริสตัลกับคริสตัล (เป็นกระจุก) · ดอกไม้ข้างหิน/พุ่ม/คริสตัล · ตะเกียงชิดเสากระโดง (ดูเหมือนแขวน)
   ห้ามลบ (ย้ายได้อย่างเดียว): ตะเกียงทุกแบบ (ตะเกียงอารัณยาติดตามเนื้อเรื่อง) */
OVF.keep=Object.assign(OVF.keep||{},{pblamp:1,alamp:1,sglamp:1,oblamp:1,palamp:1,blamp:1});
Object.assign(OVF.mv,{obpine:1,obrock:1,obcry:1,obbush:1,obbox:1,obcairn:1,bcrate:1,alamp:1,sfcry:1,sfflw:1,u22menh:1,sfgt:1,paoak:1,parock:1,paflag:1,paltree:1,pabush:1,sgstone:1,sglamp:1,aroot:1,phbarrel:1,phcrate:1});
OVF.gm={36:'obBuild',30:'brgBuild',32:'arBuild',34:'sfBuild',43:'paBuild',39:'sgBuild'};
OVF.nat={obrock:'r',parock:'r',sgstone:'r',u22menh:'r',sfdeb:'r',obbush:'b',pabush:'b',sfcry:'c',obcry:'c',sfflw:'f',u22lily:'f',sglamp:'L',sgmast:'M'};
setTimeout(()=>{try{
  const _ob=ovfBox;window.ovfBox=ovfBox=function(t,mp){if(!OVF.gm[mp])return _ob(t,mp);const q=GPA.k[t.k];
    if(q&&q[0]===mp){const w=gpaW(t.k,t),f=GPA.sets[q[4]].f[t.k];return {t,x:t.x,y:t.y+q[2],w,h:w*f[3]/f[2]}}
    if(t.k&&t.r&&t.r<120&&!t.nc)return {t,x:t.x,y:t.y,w:t.r*1.6,h:t.r*2};return null};
  const _hit=ovfHit;window.ovfHit=ovfHit=function(a,b){const na=OVF.nat[a.t.k],nb=OVF.nat[b.t.k];if(OVF.gm[curMap]&&na&&nb&&(na===nb&&na!=='L'&&na!=='M'||/^(rb|br|rf|fr|bf|fb|cf|fc|LM|ML)$/.test(na+nb)))return 0;return _hit(a,b)};
  const _ok=ovfOk;window.ovfOk=ovfOk=function(mp,M,x,y){if(!OVF.gm[mp])return _ok(mp,M,x,y);try{
    const base=Math.hypot(x-M.sx,y-M.sy)>(M.sr||0)+70&&(M.gates||[]).every(G=>Math.hypot(x-G.x,y-G.y)>130)&&(M.nests||[]).every(([a,b])=>Math.hypot(x-a,y-b)>110);if(!base)return false;
    if(mp===36)return x>160&&y>160&&x<3040&&y<3040&&Math.hypot(x-OBDOME.x,y-OBDOME.y)>340&&Math.hypot(x-OBL.x,y-OBL.y)>390&&Math.hypot(x-OBS.x,y-OBS.y)>140;
    if(mp===34)return x>160&&y>160&&x<3040&&y<3040&&SFCR.every(([cx,cy,r])=>Math.hypot(x-cx,y-cy)>r*.95)&&SFMET.every(([mx,my,r])=>Math.hypot(x-mx,y-my)>r+50);
    if(mp===43)return paLand(x,y,70)&&!paSafe(x,y)&&paSegD(x,y)>48;
    if(mp===39)return sgIn(x,y,40);if(mp===32)return arIn(x,y,40);if(mp===30)return brgIn(x,y,40)}catch(e){}return false};
  const W=(o,mp)=>function(M){const r=o.apply(this,arguments);try{ovfRun(mp,M)}catch(e){console.warn('ovf'+mp,e)}return r};
  window.obBuild=obBuild=W(obBuild,36);window.brgBuild=brgBuild=W(brgBuild,30);window.arBuild=arBuild=W(arBuild,32);window.sfBuild=sfBuild=W(sfBuild,34);window.paBuild=paBuild=W(paBuild,43);window.sgBuild=sgBuild=W(sgBuild,39);
}catch(e){console.warn('ovf605',e)}},2000);
