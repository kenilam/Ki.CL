#!/usr/bin/env bash
# Stops whatever listens on a local port, so a dev server or tunnel can take it:
# usually the one left running from last time. Usage: scripts/free-port.sh 3200
port="${1:?a port}"
pids="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null | sort -u)"

[ -z "$pids" ] && exit 0

echo "freeing :$port from $(ps -o comm= -p $(echo $pids | tr ' ' ',') | xargs -n1 basename | sort -u | tr '\n' ' ')(pid $(echo $pids | tr ' ' ','))"
kill $pids 2>/dev/null

for _ in $(seq 1 20); do
  lsof -nP -iTCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1 || exit 0
  sleep 0.25
done

kill -9 $pids 2>/dev/null
