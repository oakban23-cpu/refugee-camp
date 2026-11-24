/* ---------- v659 ชุด UI ภาพวาด (UIK) · ภาพจาก ChatGPT 4 แผ่น ตัดเป็น hd-ui-*.webp ----------
   หน้าต่าง (.pn) กรอบทองฉลุ + พื้นหนัง · การ์ดย่อย · แท็บ · ปุ่ม (ทอง/เข้ม/แดง/เขียว/ม่วง/ปิดใช้ + ตอนกด) · ปุ่มปิด · ไอคอนหัวหน้าต่าง
   HUD: กรอบรูปผู้เล่น · หลอด HP/MP · วงปุ่มสกิล · กรอบเควสมุมซ้าย · กรอบแจ้งเตือน · มินิแมพ · จอยสติ๊ก
   บทพูด: กรอบกล่อง · ป้ายชื่อ · กรอบรูปหน้า · ลูกศรแตะไปต่อ
   ทั้งหมดเป็น CSS border-image (9 ช่อง) ใต้ html.uik + วาดวงมินิแมพ/จอยบน canvas · ปิด: UIK.on=0 แล้ว uikApply() */
const UIK={on:1,im:{},ok:0,
  F:['windowframe','windowbg','panelframe','headerornament','closebutton','iconsocket','tabactive','tabidle','dividerline','cornerornament','chipframe','itemslot',
     'btnprimary','btnprimarydown','btnsecondary','btnsecondarydown','btndanger','btnconfirm','btnspecial','btndisabled',
     'avatarring','barframe','barfillhp','barfillmp','barfillexp','skillring','skillringult','roundbutton','minimapring','joybase','joyknob','trackerframe',
     'dialogframe','nameplate','portraitframe','nextarrow','toastframe']};
const uikU=n=>'url(hd-ui-'+n+'.webp)';
function uikBtn(sel,img,imgDown,col,sh){return`html.uik #ov ${sel}{background:none!important;border-style:solid!important;border-color:transparent!important;border-width:0!important;border-image:${uikU(img)} 0 132 fill / 0 min(28px,24%) / 0 stretch!important;border-radius:0!important;box-shadow:none!important;color:${col}!important;text-shadow:${sh}!important;padding-left:max(14px,9%)!important;padding-right:max(14px,9%)!important}
html.uik #ov ${sel}:not(:disabled):active{border-image-source:${uikU(imgDown)}!important;transform:translateY(1px)}
html.uik #ov ${sel} *{color:inherit!important}`}
function uikCss(){const U=uikU;return`
html.uik #ov .pn{background:linear-gradient(rgba(12,7,16,.28),rgba(12,7,16,.28)),${U('windowbg')} repeat 0 0/256px auto!important;border-style:solid!important;border-color:transparent!important;border-width:14px!important;
  border-image:${U('windowframe')} 92 / 34px / 5px stretch!important;border-radius:0!important;box-shadow:0 18px 50px rgba(0,0,0,.62)!important;padding:12px 14px!important}
html.uik #ov .pn .ph{background:${U('dividerline')} center bottom/86% 7px no-repeat!important;padding-bottom:9px!important}
html.uik #ov .pn .ph .ic{border:0!important;background:${U('iconsocket')} center/118% no-repeat!important;box-shadow:none!important}
html.uik #ovx{background:${U('closebutton')} center/100% 100% no-repeat!important;border:0!important;color:transparent!important;font-size:0!important;box-shadow:0 2px 6px rgba(0,0,0,.5)!important;border-radius:50%!important}
html.uik #ovx *{display:none!important}
html.uik #ov .pn .card{background:rgba(14,9,18,.42)!important;border-style:solid!important;border-color:transparent!important;border-width:1px!important;border-image:${U('panelframe')} 40 / 15px / 2px stretch!important;border-radius:0!important;box-shadow:none!important}
html.uik #ov .pn .tabs{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;gap:6px!important}
html.uik #ov .pn .tab:not(.sm){background:none!important;border-style:solid!important;border-color:transparent!important;border-width:0!important;border-image:${U('tabidle')} 0 58 fill / 0 min(20px,20%) / 0 stretch!important;border-radius:0!important;box-shadow:none!important;color:#dccdb2!important;text-shadow:0 1px 2px #000!important}
html.uik #ov .pn .tab.on:not(.sm){border-image:${U('tabactive')} 0 70 fill / 0 min(22px,20%) / 0 stretch!important;color:#2a1906!important;text-shadow:0 1px 0 rgba(255,240,200,.5)!important;font-weight:800!important}
html.uik #ov .pn .tab.on:not(.sm) *{color:inherit!important}
${uikBtn('.pn button.pri','btnprimary','btnprimarydown','#2b1906','0 1px 0 rgba(255,236,190,.55)')}
${uikBtn('.pn button.sec','btnsecondary','btnsecondarydown','#f3e6cf','0 1px 2px #000')}
${uikBtn('.pn .bt>button:not([class]),.pn .row>button:not([class])','btnsecondary','btnsecondarydown','#f3e6cf','0 1px 2px #000')}
${uikBtn('.pn button.dng,.pn button.red,.pn button.danger','btndanger','btndanger','#fff2ea','0 1px 2px #000')}
html.uik #ov .pn button.pri:disabled,html.uik #ov .pn button.sec:disabled,html.uik #ov .pn .bt>button:not([class]):disabled{border-image-source:${uikU('btndisabled')}!important;color:#e4e0da!important;text-shadow:0 1px 2px #000!important;opacity:.85!important}
/* ---- HUD ---- */
html.uik #hpor{border-color:transparent!important;box-shadow:none!important;border-image:${U('avatarring')} 45.7% 50% 54.3% 50% / 45.7% 50% 54.3% 50% / 5.7px 5.8px 11.6px 5.8px stretch!important}
html.uik #bars .bar{border-radius:3px!important;border-style:solid!important;border-color:transparent!important;border-width:1px!important;border-image:${U('barframe')} 18 56 fill / 4px 13px / 3px 5px stretch!important;background:rgba(0,0,0,.55)!important;box-shadow:none!important;overflow:visible!important}
html.uik #bhp{background:${U('barfillhp')} repeat-x left center/auto 100%!important;border-radius:2px!important}
html.uik #bmp{background:${U('barfillmp')} repeat-x left center/auto 100%!important;border-radius:2px!important}
html.uik #sk>button[id^="s"]{border-style:solid!important;border-color:transparent!important;border-image:${U('skillring')} 50% / 50% / 9px stretch!important}
html.uik #sk>button#s3{border-image:${U('skillringult')} 50% / 50% / 12px stretch!important}
html.uik #stq{background:rgba(14,9,18,.74)!important;border-style:solid!important;border-color:transparent!important;border-width:1px!important;border-image:${U('trackerframe')} 80 / 20px / 3px stretch!important;border-radius:0!important;box-shadow:none!important}
html.uik #tipc{background:rgba(14,9,18,.9)!important;border-style:solid!important;border-color:transparent!important;border-width:1px!important;border-image:${U('toastframe')} 58 / 18px / 3px stretch!important;border-radius:0!important}
/* ---- บทพูด ---- */
html.uik #sdlg{border-style:solid!important;border-color:transparent!important;border-width:2px!important;border-image:${U('dialogframe')} 132 / 40px / 6px stretch!important;border-radius:0!important;background:linear-gradient(180deg,rgba(24,15,30,.93),rgba(12,8,16,.95))!important;box-shadow:0 10px 30px rgba(0,0,0,.6)!important}
html.uik #sdlg .sdp{border-radius:6px!important;border-style:solid!important;border-color:transparent!important;border-image:${U('portraitframe')} 50% / 50% / 4px stretch!important;box-shadow:none!important}
html.uik #sdlg .sdn{display:inline-block!important;width:auto!important;max-width:100%;padding:1px 24px!important;border-style:solid!important;border-color:transparent!important;border-width:0!important;border-image:${U('nameplate')} 0 62 fill / 0 18px / 0 stretch!important;color:#f8e7bf!important;text-shadow:0 1px 2px #000!important}
html.uik #sdlg .sdc{position:relative}
html.uik #sdlg .sdc::after{content:'';position:absolute;right:2px;bottom:0;width:18px;height:18px;background:${U('nextarrow')} center/contain no-repeat;animation:uikBob 1.1s ease-in-out infinite}
@keyframes uikBob{0%,100%{transform:translateY(-2px)}50%{transform:translateY(2px)}}
@media (prefers-reduced-motion:reduce){html.uik #sdlg .sdc::after{animation:none}}`}
function uikApply(){const on=!!UIK.on;document.documentElement.classList.toggle('uik',on);let s=document.getElementById('uikcss');
  if(on&&!s){s=document.createElement('style');s.id='uikcss';s.textContent=uikCss();document.head.appendChild(s)}}
function uikImg(n){let I=UIK.im[n];if(!I){I=UIK.im[n]=new Image();I.src='hd-ui-'+n+'.webp'}return I.complete&&I.naturalWidth?I:null}
setTimeout(()=>{try{
  uikApply();for(const n of['minimapring','joybase','joyknob'])uikImg(n);
  /* วงมินิแมพ: วาดภาพวงทองทับขอบเดิม (รูวงพอดีรัศมีแผนที่) */
  const oM=uisMini;window.uisMini=uisMini=function(MP,WW,draw){const r=oM.apply(this,arguments);try{const I=UIK.on&&uikImg('minimapring');if(I){const R=40,cx=W-R-8,cy=R+20,s=(2*R+4)*285/227;
      g.save();g.drawImage(I,cx-s*142/285,cy-s*148/288,s,s*288/285);g.restore()}}catch(e){}return r};
  /* จอยสติ๊ก: ฐาน + ปุ่มภาพวาด */
  const oJ=uisJoy;window.uisJoy=uisJoy=function(cx,cy,kx,ky,act){const B=UIK.on&&uikImg('joybase'),K=UIK.on&&uikImg('joyknob');if(!B||!K)return oJ.apply(this,arguments);
    try{const s=(40+5)*2*255/201;g.save();g.globalAlpha=act?.88:.62;g.drawImage(B,cx-s*127/255,cy-s*118/262*1.0-s*.02,s,s*262/255);g.globalAlpha=act?1:.82;
      g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.arc(kx+1.5,ky+3,16,0,7);g.fill();g.drawImage(K,kx-19,ky-19,38,38);g.restore()}catch(e){return oJ.apply(this,arguments)}};
}catch(e){console.warn('v659',e)}},150);
