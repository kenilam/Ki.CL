#!/usr/bin/env bash
#
# Build the piano samples for Kinetic Light into a new folder, for upload.sh
# to put in the static bucket. Runs on macOS, which has afconvert.
#
#   bash build-piano.sh <out>
#
# The samples are the mf layer of Splendid Grand Piano, public domain samples
# by Akai, from the smpldsnds mirror at a pinned commit. That set names its
# notes an octave low, so "Mf C4" is written here as C5.m4a, with s for a
# sharp so the names need no escaping in a URL. Tone's Sampler fills the gaps
# between samples, so one every three semitones or more is kept, and each is
# cut to eight seconds with a fade to keep the decoded audio small. In some of
# its samples the right channel is close to the left turned upside down, which
# cancels on a mono speaker (G5 lost 11 dB), so where the two channels pull
# against each other the right one is flipped back.
set -euo pipefail

OUT="${1:?Usage: bash build-piano.sh <out>}"
PIANO="https://raw.githubusercontent.com/smpldsnds/sfzinstruments-splendid-grand-piano/009793ebf849aee57f9a213aeaf8f2d1e2178f4f"
WORK="$(mktemp -d)"

trap 'rm -rf "$WORK"' EXIT

if [ -e "$OUT" ] && [ -n "$(ls -A "$OUT")" ]; then
  echo "$OUT is not empty" >&2
  exit 1
fi

mkdir -p "$OUT"
curl -sSfL -o "$WORK/files.json" "$PIANO/samples/files.json"

python3 -I - "$WORK/files.json" > "$WORK/pick.txt" <<'PY'
import json, re, sys

STEPS = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
NAMES = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B']

picked, last = [], None
names = [name for name in json.load(open(sys.argv[1])) if re.match(r'^M[Ff] ', name)]

for midi, name in sorted(
    ((int(m.group(3)) + 2) * 12 + STEPS[m.group(1)] + len(m.group(2)), name)
    for name in names
    for m in [re.match(r'^M[Ff] ([A-G])(#?)(-?\d)$', name)]
    if m
):
    if last is None or midi - last >= 3:
        picked.append(f'{name}\t{NAMES[midi % 12]}{midi // 12 - 1}')
        last = midi

print('\n'.join(picked))
PY

while IFS=$'\t' read -r name note; do
  curl -sSfL -o "$WORK/source.m4a" "$PIANO/samples/$(printf '%s' "$name" | sed -e 's/ /%20/g' -e 's/#/%23/g').m4a"
  afconvert -f WAVE -d LEI16 "$WORK/source.m4a" "$WORK/source.wav"
  python3 -I - "$WORK/source.wav" "$WORK/short.wav" <<'PY'
import array, sys, wave

LENGTH, FADE = 8.0, 1.5

with wave.open(sys.argv[1]) as source:
    params = source.getparams()
    frames = array.array('h', source.readframes(int(LENGTH * params.framerate)))

channels = params.nchannels
total = len(frames) // channels
fade = int(FADE * params.framerate)

if channels == 2:
    left, right = frames[0::2], frames[1::2]

    if sum(a * b for a, b in zip(left, right)) < 0:
        frames[1::2] = array.array('h', (max(-32767, min(32767, -value)) for value in right))

if params.nframes > total:
    for frame in range(max(0, total - fade), total):
        gain = ((total - frame) / fade) ** 2
        for channel in range(channels):
            frames[frame * channels + channel] = int(frames[frame * channels + channel] * gain)

with wave.open(sys.argv[2], 'wb') as target:
    target.setparams(params)
    target.writeframes(frames.tobytes())
PY
  afconvert -f m4af -d aac -b 160000 "$WORK/short.wav" "$OUT/$note.m4a"
done < "$WORK/pick.txt"

curl -sSfL -o "$OUT/LICENSE.md" "$PIANO/README.md"

echo "Done: $(ls "$OUT"/*.m4a | wc -l | tr -d ' ') samples, $(du -sh "$OUT" | cut -f1), in $OUT"
