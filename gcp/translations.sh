#!/usr/bin/env bash
# Lets the API answer the Translations query without a session, wherever it
# runs: the site needs its words before it can start one. The API reads the
# operations it allows from WHITE_LIST_OPERATION, which comes from a secret.
# This adds Translations to that secret, then starts a new revision of the
# API, since an instance reads the secret once, when it starts.
#
#   gcp/translations.sh check [dev|prod]   says what would change
#   gcp/translations.sh [dev|prod]         changes it
#
# `dev` is the development API and `prod` the production API in both regions.
# With neither, it is both. The secret is one for all of them, so the first
# run adds the operation and a later run for the other only restarts it.
#
# Run it after the API that has the query is deployed and before a site that
# asks for it is released. Then seed the database (see CLAUDE.md).
source "$(dirname "$0")/env.sh"

: "${API_SERVICE:?gcp/.env has no API_SERVICE}"

VARIABLE=WHITE_LIST_OPERATION
OPERATION=Translations
mode=apply
target=all

for argument in "$@"; do
  case "$argument" in
    check) mode=check ;;
    dev | prod) target="$argument" ;;
    *)
      echo "usage: gcp/translations.sh [check] [dev|prod]" >&2
      exit 1
      ;;
  esac
done

# The secret the service takes the list from.
secret="$(
  gcloud run services describe "$API_SERVICE" --project "$PROJECT" --region "$SOURCE_REGION" --format json |
    python3 -c '
import json, sys
name = sys.argv[1]
for variable in json.load(sys.stdin)["spec"]["template"]["spec"]["containers"][0].get("env", []):
    if variable["name"] == name:
        print(variable.get("valueFrom", {}).get("secretKeyRef", {}).get("name", ""))
' "$VARIABLE"
)"

if [ -z "$secret" ]; then
  echo "$API_SERVICE does not take $VARIABLE from a secret" >&2
  exit 1
fi

current="$(gcloud secrets versions access latest --secret "$secret" --project "$PROJECT")"

case ",$current," in
  *",$OPERATION,"*)
    echo "$VARIABLE already allows $OPERATION: $current"
    ;;
  *)
    next="${current:+$current,}$OPERATION"

    if [ "$mode" = check ]; then
      echo "$VARIABLE: \"$current\" would become \"$next\""
    else
      printf '%s' "$next" |
        gcloud secrets versions add "$secret" --project "$PROJECT" --data-file=- >/dev/null
      echo "$VARIABLE: now $next"
    fi
    ;;
esac

# Pointing the variable at the secret again changes nothing but starts a revision.
restart() {
  if [ "$mode" = check ]; then
    echo "$1 in $2: would start a new revision"
    return
  fi

  gcloud run services update "$1" --project "$PROJECT" --region "$2" \
    --update-secrets "$VARIABLE=$secret:latest" --quiet >/dev/null
  echo "$1 in $2: new revision"
}

if [ "$target" != prod ]; then
  : "${API_DEV_SERVICE:?gcp/.env has no API_DEV_SERVICE}"
  restart "$API_DEV_SERVICE" "$SOURCE_REGION"
fi

if [ "$target" != dev ]; then
  restart "$API_SERVICE" "$SOURCE_REGION"
  restart "$API_SERVICE" "$REGION"
fi
