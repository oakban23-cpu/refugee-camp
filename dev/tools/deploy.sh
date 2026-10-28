#!/bin/bash
# ส่งเวอร์ชันล่าสุดขึ้น GitHub: bash /home/claude/deploy.sh "vNNN ข้อความ"
set -e
R=/home/claude/refugee-camp
cd $R
git fetch -q origin main && git reset -q --soft origin/main 2>/dev/null || true
cp /mnt/user-data/outputs/refugee-online/public/index.html public/index.html
cp /home/claude/refugee-online/public/hd-*.webp public/
cp /home/claude/refugee-online/public/cover.jpg public/cover.jpg
cp /home/claude/refugee-online/public/cover-wide.webp public/ 2>/dev/null || true
cp /home/claude/refugee-online/public/icon-180.png /home/claude/refugee-online/public/icon-192.png /home/claude/refugee-online/public/icon-512.png /home/claude/refugee-online/public/icon-512m.png /home/claude/refugee-online/public/manifest.webmanifest /home/claude/refugee-online/public/sw.js public/
cp /home/claude/refugee-online/public/shot-[0-9].webp public/ 2>/dev/null || true
# สำรองต้นฉบับ + โมดูล + ชุดทดสอบไว้ใน dev/ ทุกครั้งที่ปล่อย (ไม่ถูกเสิร์ฟให้ผู้เล่น)
S=/tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad
mkdir -p dev/src dev/modules dev/tests
cp /home/claude/refugee-online/public/index.html dev/src/index.html
cp $S/p6[a-f].js $S/p7[a-z].js $S/p8[a-z].js $S/p9[a-z].js $S/pa[0-9]*.js $S/ux[0-9].js $S/ux[0-9][0-9].js $S/ux[0-9][0-9][0-9].js $S/dep[1-9].js $S/bal[0-9]*.js $S/patch340.py dev/modules/ 2>/dev/null || true
mkdir -p dev/tools/bal10 && cp $S/net/b10lib.py $S/net/b10bot.js $S/net/b10run.py $S/net/b10batch.sh $S/net/b10sum.py $S/net/b10dps.py $S/net/b10prof.py dev/tools/bal10/ 2>/dev/null || true
cp /home/claude/deploy.sh /home/claude/build.sh dev/tools/ 2>/dev/null || true
for t in $S/net/t_*.py; do cp "$t" dev/tests/; done
for f in server.js admin.html package.json render.yaml; do [ -f /home/claude/refugee-online/$f ] && cp /home/claude/refugee-online/$f $f; done
git add -A
if git diff --cached --quiet; then echo "ไม่มีอะไรเปลี่ยน"; exit 0; fi
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QC6M2GMZEWaZaT5XHnmo8S"
git push -q origin main && git log --oneline -1
