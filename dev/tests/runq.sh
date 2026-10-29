#!/bin/bash
# usage: runq.sh PORT LOG test1 test2 ...
PORT=$1; LOG=$2; shift 2
: > $LOG
for t in "$@"; do
  for pp in /proc/[0-9]*; do pid=${pp#/proc/}; [ "$(cat $pp/comm 2>/dev/null)" = "node" ] || continue; tr '\0' '\n' < $pp/environ 2>/dev/null | grep -qx "PORT=$PORT" && kill $pid 2>/dev/null; done
  s=$(date +%s)
  out=$(HPORT=$PORT timeout 900 python3 $t 2>&1)
  rc=$?
  e=$(date +%s)
  sum=$(echo "$out" | grep -E "SUMMARY|ผลตรวจ" | tail -1)
  fails=$(echo "$out" | grep -E "^FAIL|^⚠️|Traceback|Error:" | head -8 | cut -c1-240)
  echo "=== $t rc=$rc $((e-s))s :: $sum" >> $LOG
  [ -n "$fails" ] && echo "$fails" | sed 's/^/    /' >> $LOG
  echo "$out" > logs/$(basename $t .py).$PORT.log
done
echo "=== DONE" >> $LOG
