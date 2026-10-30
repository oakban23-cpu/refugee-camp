# v568 ปิดโหมดคลั่ง (Fever) ชั่วคราว: fvOff() คืน true เสมอเมื่อ FVDIS=1 → เกจไม่ขึ้น · ไม่เข้าโหมด · ไม่มีระเบิดปิดฉาก · เกจบนจอซ่อน
# ยังอยู่: ป้าย «สังหาร ×N» · หลบสมบูรณ์ภาพช้า · มอนแตกเป็นเศษ (เป็นส่วนความมันตอนสู้ ไม่ใช่โหมดคลั่ง) · เปิดคืน = ตั้ง FVDIS=0
S='/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/'
s=open(S+'v568/index_pre.html').read()
def R(a,b):
    global s
    assert s.count(a)==1,(a[:80],s.count(a));s=s.replace(a,b)
R("function fvOff(){try{return !me.cls||sgOff()}catch(e){return false}}",
  "/* v568 ปิดโหมดคลั่งชั่วคราว (ผู้ใช้สั่ง) · เปิดคืนให้ตั้ง FVDIS=0 */const FVDIS=1;\nfunction fvOff(){if(FVDIS)return true;try{return !me.cls||sgOff()}catch(e){return false}}")
R("function fvKill(x,y,t,bs){if(fvOff()||me.down>0||Math.hypot(me.x-x,me.y-y)>380)return;const n=performance.now();",
  "function fvKill(x,y,t,bs){if(FVDIS){/* ปิดคลั่ง: ยังนับฆ่ารวดสำหรับป้าย «สังหาร ×N» */let so=false;try{so=sgOff()}catch(e){}if(!me.cls||so||me.down>0||Math.hypot(me.x-x,me.y-y)>380)return;const n=performance.now();FV.mk=FV.mk.filter(q=>n-q<450);FV.mk.push(n);FV.mkT=n;return}\n  if(fvOff()||me.down>0||Math.hypot(me.x-x,me.y-y)>380)return;const n=performance.now();")
R("const WNV='v567';","const WNV='v568';")
R("const WNL=[\n","const WNL=[\n  ['⏸️','ปิดโหมดคลั่งชั่วคราว','เกจคลั่ง (🔥) และโหมดคลั่ง 9 วิ ถูกปิดไว้ก่อน · ฆ่ามอน/หลบ/คอมโบไม่เติมเกจแล้ว · ป้าย «สังหาร ×N» และภาพช้าตอนหลบสมบูรณ์ยังอยู่เหมือนเดิม'],\n")
open('/home/claude/refugee-online/public/index.html','w').write(s);print('ok')
