#!/usr/bin/env sh
#
# Put the Open Lo-Fi collection in the static bucket, where the station
# streams it from through the same-origin `/assets/static/music/open-lofi/`
# route. Run once, from a machine signed in to the project with gcloud.
#
#   sh upload.sh [bucket]
#
# Downloads the current release (CC0, https://github.com/btahir/open-lofi),
# uploads every track with the right content type, and the catalogue
# beside them. Files are named after what they are, so this may be re-run
# when the collection changes; `catalog.ts` here is regenerated from the
# same `catalog.json`.
set -eu

BUCKET="${1:-ki-cl-static}"
PREFIX="music/open-lofi"
RELEASE="https://github.com/btahir/open-lofi/releases/latest/download/openlofi.zip"
CATALOG="https://raw.githubusercontent.com/btahir/open-lofi/main/catalog.json"
WORK="$(mktemp -d)"

trap 'rm -rf "$WORK"' EXIT

echo "Downloading the release…"
curl -sSL -o "$WORK/openlofi.zip" "$RELEASE"
curl -sSL -o "$WORK/catalog.json" "$CATALOG"
mkdir -p "$WORK/tracks"
unzip -q "$WORK/openlofi.zip" -d "$WORK/tracks"

echo "Uploading to gs://$BUCKET/$PREFIX/ …"
gcloud storage cp \
  --content-type=audio/mpeg \
  --cache-control='public, max-age=31536000, immutable' \
  "$WORK/tracks/"*.mp3 "gs://$BUCKET/$PREFIX/"
gcloud storage cp \
  --content-type=application/json \
  "$WORK/catalog.json" "gs://$BUCKET/$PREFIX/catalog.json"

echo "Done: $(ls "$WORK/tracks" | wc -l | tr -d ' ') tracks at gs://$BUCKET/$PREFIX/"
