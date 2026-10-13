#!/bin/bash
# ส่งเวอร์ชันล่าสุดขึ้น GitHub: bash /home/claude/deploy.sh "vNNN ข้อความ"
set -e
R=/home/claude/refugee-camp
cd $R
git fetch -q origin main && git reset -q --soft origin/main 2>/dev/null || true
cp /mnt/user-data/outputs/refugee-online/public/index.html public/index.html
cp /home/claude/refugee-online/public/hd-*.webp public/
cp /home/claude/refugee-online/public/cover.jpg public/cover.jpg
for f in server.js admin.html package.json render.yaml; do [ -f /home/claude/refugee-online/$f ] && cp /home/claude/refugee-online/$f $f; done
git add -A
if git diff --cached --quiet; then echo "ไม่มีอะไรเปลี่ยน"; exit 0; fi
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QC6M2GMZEWaZaT5XHnmo8S"
git push -q origin main && git log --oneline -1
