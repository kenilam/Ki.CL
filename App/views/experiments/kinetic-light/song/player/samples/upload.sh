#!/usr/bin/env bash
#
# Put the samples from build-piano.sh or build-drums.sh in the static bucket,
# where the page loads them through the same-origin
# `/assets/static/kinetic-light/<piano|drums>/` route. Run from a machine
# signed in to the project with gcloud.
#
#   bash upload.sh <build folder> <piano|drums> [bucket]
#
# The samples are cached for a year, so a changed sample needs a new name.
set -euo pipefail

BUILD="${1:?Usage: bash upload.sh <build folder> <piano|drums> [bucket]}"
KIND="${2:?Usage: bash upload.sh <build folder> <piano|drums> [bucket]}"
BUCKET="${3:-ki-cl-static}"
PREFIX="kinetic-light/$KIND"

echo "Uploading to gs://$BUCKET/$PREFIX/ …"
gcloud storage cp \
  --content-type=audio/mp4 \
  --cache-control='public, max-age=31536000, immutable' \
  "$BUILD"/*.m4a "gs://$BUCKET/$PREFIX/"
gcloud storage cp \
  --content-type=text/markdown \
  "$BUILD/LICENSE.md" "gs://$BUCKET/$PREFIX/LICENSE.md"

echo "Done: gs://$BUCKET/$PREFIX/"
