#!/bin/bash
# รันชุด: b10batch.sh "DG:CLS:PROF:VAR ..." [K] [LIMIT]
cd /tmp/claude-0/-home-claude/552bdb98-0d0b-5b28-ae92-36a473137925/scratchpad/net
K=${2:-3}; LIM=${3:-1500}
for job in $1; do
  IFS=: read DG CLS PROF VAR <<< "$job"
  echo "=== $DG $CLS $PROF v$VAR $(date +%T)"
  timeout 2400 python3 b10run.py $DG $CLS $PROF $K $VAR $LIM 2>&1 | grep -E "RESULT|Error|Traceback|^\s+\.\." | cut -c1-300
done
echo "BATCH DONE $(date +%T)"
