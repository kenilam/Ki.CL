#!/usr/bin/env bash
# Reads gcp/.env, which names the project and its resources and stays out of
# git (gcp/.env.template lists what it needs). Any value can be overridden
# from the environment: `REGION=<region> RANGE=<cidr> make gcp.region`.

set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ ! -f "$here/.env" ]; then
  echo "no gcp/.env: copy gcp/.env.template and fill it in" >&2
  exit 1
fi
# Values already in the environment win over the file.
while IFS='=' read -r key value; do
  case "$key" in ''|\#*) continue ;; esac
  [ -n "${!key:-}" ] || export "$key=$value"
done < "$here/.env"

for key in PROJECT SOURCE_REGION REGION RANGE SERVICES TRIGGERS NETWORK SOURCE_SUBNET SUBNET ROUTER NAT; do
  if [ -z "${!key:-}" ]; then
    echo "gcp/.env has no $key" >&2
    exit 1
  fi
done

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT" --format 'value(projectNumber)')"

have() { "$@" --project "$PROJECT" >/dev/null 2>&1; }
