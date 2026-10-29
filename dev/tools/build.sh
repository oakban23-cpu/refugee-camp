#!/bin/bash
set -e
SRC=/home/claude/refugee-online/public
OUT=/mnt/user-data/outputs
mkdir -p $OUT/refugee-online/public
# ไฟล์ส่งออกเป็นแบบตัดคอมเมนต์/ช่องว่าง (ต้นฉบับใน $SRC ยังอ่านง่ายเหมือนเดิม)
node /home/claude/tools/strip.js $SRC/index.html $OUT/refugee-online/public/index.html
cp $OUT/refugee-online/public/index.html $OUT/refugee-camp-local.html
python3 - <<'PY'
import re
html=open('/mnt/user-data/outputs/refugee-online/public/index.html',encoding='utf-8').read()
new,n=re.subn(r'<script>\n/\* ตัวเชื่อมออนไลน์.*?</script>\n','',html,count=1,flags=re.DOTALL)
if n!=1:
    new,n=re.subn(r'<script>\nfunction localRoom\(H\)\{.*?</script>\n','',html,count=1,flags=re.DOTALL)
if n!=1:
    new,n=re.subn(r'<script>\nconst RFG_OFFU=.*?</script>\n','',html,count=1,flags=re.DOTALL)
assert n==1
assert 'rfgLock' not in new and 'RFG_SRV=1' not in new
open('/mnt/user-data/outputs/refugee-camp.html','w',encoding='utf-8').write(new)
PY
# v567 บีบ br ระดับ 11 ไว้ล่วงหน้า (เซิร์ฟเวอร์ใช้ไฟล์นี้ถ้าคลายแล้วตรงกับหน้าเกม)
node -e "const z=require('zlib'),fs=require('fs'),f='$OUT/refugee-online/public/index.html',b=fs.readFileSync(f);fs.writeFileSync(f+'.br',z.brotliCompressSync(b,{params:{[z.constants.BROTLI_PARAM_QUALITY]:11,[z.constants.BROTLI_PARAM_LGWIN]:24,[z.constants.BROTLI_PARAM_SIZE_HINT]:b.length}}));console.log('br',fs.statSync(f+'.br').size)"
for f in $SRC/hd-*.webp; do cp $f $OUT/refugee-online/public/; cp $f $OUT/; done
node -e "const h=require('fs').readFileSync('/mnt/user-data/outputs/refugee-camp.html','utf8');const p=h.split('<script>');new Function(p[p.length-1].replace(/<\/script>\s*<\/body>\s*<\/html>\s*\$/,''));console.log('build OK')"
