#!/usr/bin/env bash
# Lets the API answer the Translations query without a session, wherever it
# runs: the site needs its words before it can start one. The API reads the
# operations it allows from WHITE_LIST_OPERATION, which comes from a secret.
# This adds Translations to that secret, then starts a new revision of the
# production API in both regions and of the development API, since an
# instance reads the secret once, when it starts.
#
#   gcp/translations.sh check   says what would change
#   gcp/translations.sh         changes it
#
# Run it after the API that has the query is deployed and before a site that
# asks for it is released. Then seed the database (see CLAUDE.md).
source "$(dirname "$0")/env.sh"

: "${API_SERVICE:?gcp/.env has no API_SERVICE}"

VARIABLE=WHITE_LIST_OPERATION
OPERATION=Translations
mode="${1:-apply}"

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

restart "$API_SERVICE" "$SOURCE_REGION"
restart "$API_SERVICE" "$REGION"

if [ -n "${API_DEV_SERVICE:-}" ]; then
  restart "$API_DEV_SERVICE" "$SOURCE_REGION"
fi
