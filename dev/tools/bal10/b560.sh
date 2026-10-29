#!/bin/bash
# v560 ชุดรันบอท: b560.sh LANE PORT "jobs" OUTDIR [BOTCFG] [HSRV]
cd /tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net
LANE=$1; PORT=$2; JOBS=$3; OUT=$4; CFG=${5:-'{}'}; SRVD=${6:-/home/claude/refugee-online}
mkdir -p $OUT
for job in $JOBS; do
  IFS=: read DG CLS PROF VAR <<< "$job"
  echo "=== [$LANE] $DG $CLS $PROF v$VAR $(date +%T)"
  WD=$(mktemp -d /tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net/w560_XXXX)
  cp b10run.py b10lib.py b10bot.js h.py $WD/
  (cd $WD && HPORT=$PORT HSRV=$SRVD BOTCFG="$CFG" timeout 2400 python3 b10run.py $DG $CLS $PROF ${KS:-3} $VAR ${LIM:-1500} 2>&1 | grep -E "RESULT|Error|Traceback" | cut -c1-200)
  mv $WD/b10out/*.json $OUT/ 2>/dev/null
  case "$WD" in /tmp/claude-0/*/w560_*) rm -rf -- "$WD";; esac
done
echo "LANE $LANE DONE $(date +%T)"
