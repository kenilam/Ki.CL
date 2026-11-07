#!/usr/bin/env bash
#
# Build Kinetic Light's drum sets and keyboards into new folders under <out>,
# one for each, for upload.sh to put in the static bucket. Runs on macOS,
# which has afconvert.
#
#   bash build-samples.sh <out>
#
# drums and lofi are Virtuosity Drums by Versilian Studios and Karoryfer
# Samples, public domain (CC0). Each drum is one hit from one mic: drums uses
# the mid mic, which records the whole kit, except the kick, which comes from
# the kick mic because the mid mic hears it 20 dB under the snare; lofi uses
# the lo-fi mic. The second-loudest layer is kept, so a softer hit is the same
# sound turned down.
#
# drum-machine is Michael Fischer's 1994 TR-808 set and linndrum a LinnDrum
# LM-2, from the smpldsnds mirror, which calls them public domain. The 808's
# sounds have their knobs in the middle, with a shorter kick and open hi-hat.
#
# percussion and upright are VSCO 2 Community Edition by Versilian Studios,
# public domain (CC0). upright is its middle layer, a note every four
# semitones.
#
# wurlitzer is Greg Sullivan's Wurlitzer EP200, CC BY 3.0, which has to be
# credited where it plays. It's the middle layer, tuned by the cents its sfz
# gives each sample.
#
# Everything comes from pinned commits. A drum peaks at -1 dBFS, so the page
# sets the balance, and is cut to four seconds with a fade. A keyboard note
# keeps its own level, so low and high notes stay balanced, and is cut to
# eight seconds.
set -euo pipefail

OUT="${1:?Usage: bash build-samples.sh <out>}"
KIT="https://raw.githubusercontent.com/sfzinstruments/virtuosity_drums/9f04cf9a734527edfbb0a4eee1f674e45bbf71bc"
MACHINE="https://raw.githubusercontent.com/smpldsnds/drum-machines/a894cb8c72abe15b05e7b4fd4b8ee561c0f9e960/TR-808"
VSCO="https://raw.githubusercontent.com/sgossner/VSCO-2-CE/440300901dfe9275fd84e0b7763af1f8443ae62e"
LINNDRUM="https://raw.githubusercontent.com/smpldsnds/drum-machines/a894cb8c72abe15b05e7b4fd4b8ee561c0f9e960/LM-2"
WURLITZER="https://raw.githubusercontent.com/sfzinstruments/GregSullivan.E-Pianos/8c3e581acda3594b553948ff0222d4f84a698376/Wurlitzer%20EP200/Samples"
KEYS=" upright wurlitzer "
WORK="$(mktemp -d)"

trap 'rm -rf "$WORK"' EXIT

if [ -e "$OUT" ] && [ -n "$(ls -A "$OUT")" ]; then
  echo "$OUT is not empty" >&2
  exit 1
fi

mkdir -p "$OUT"/{drums,lofi,drum-machine,linndrum,percussion,upright,wurlitzer}

while read -r folder source name cents; do
  curl -sSfL -o "$WORK/source.${source##*.}" "$source"
  afconvert -f WAVE -d LEI16 "$WORK/source.${source##*.}" "$WORK/source.wav"
  kind=drum
  [[ "$KEYS" == *" $folder "* ]] && kind=key
  python3 -I - "$WORK/source.wav" "$WORK/short.wav" "${cents:-0}" "$kind" <<'PY'
import array, sys, wave

FADE, PEAK = 1.5, 10 ** (-1 / 20)
KEY = sys.argv[4] == 'key'
LENGTH = 8.0 if KEY else 4.0

with wave.open(sys.argv[1]) as source:
    params = source.getparams()
    frames = array.array('h', source.readframes(params.nframes))

channels = params.nchannels
ratio = 2 ** (float(sys.argv[3]) / 1200)

if ratio != 1:
    count = int(len(frames) // channels / ratio) - 1
    shifted = array.array('h', bytes(count * channels * 2))
    for frame in range(count):
        position = frame * ratio
        before = int(position)
        weight = position - before
        for channel in range(channels):
            a = frames[before * channels + channel]
            b = frames[(before + 1) * channels + channel]
            shifted[frame * channels + channel] = int(a + (b - a) * weight)
    frames = shifted

frames = frames[: int(LENGTH * params.framerate) * channels]
total = len(frames) // channels
fade = int(FADE * params.framerate)
scale = 1 if KEY else PEAK * 32767 / max(abs(sample) for sample in frames)

for index, sample in enumerate(frames):
    frames[index] = int(sample * scale)

if params.nframes > total or ratio != 1:
    for frame in range(max(0, total - fade), total):
        gain = ((total - frame) / fade) ** 2
        for channel in range(channels):
            frames[frame * channels + channel] = int(frames[frame * channels + channel] * gain)

with wave.open(sys.argv[2], 'wb') as target:
    target.setparams(params)
    target.writeframes(frames.tobytes())
PY
  afconvert -f m4af -d aac -b 160000 "$WORK/short.wav" "$OUT/$folder/$name.m4a"
done <<LIST
drums $KIT/Samples/kickmic/kick/kickmic_kick_snoff_vl3_rr1.flac kick
drums $KIT/Samples/mid/snare/mid_snare_center_vl35.flac snare
drums $KIT/Samples/mid/hh/mid_hh_closed_vl3_rr1.flac hat
drums $KIT/Samples/mid/hh/mid_hh_open_vl3_rr1.flac open-hat
drums $KIT/Samples/mid/crash/mid_crash_crash_vl2_rr1.flac crash
drums $KIT/Samples/mid/ride/mid_ride_ride_vl2_rr1.flac ride
drums $KIT/Samples/mid/ltom/mid_ltom_center_vl15.flac low-tom
drums $KIT/Samples/mid/htom/mid_htom_center_vl15.flac high-tom
drum-machine $MACHINE/kick/bd5025.m4a kick
drum-machine $MACHINE/snare/sd5050.m4a snare
drum-machine $MACHINE/clap/cp.m4a clap
drum-machine $MACHINE/hihat-close/ch.m4a hat
drum-machine $MACHINE/hihat-open/oh25.m4a open-hat
drum-machine $MACHINE/cymbal/cy5050.m4a cymbal
drum-machine $MACHINE/tom-low/lt50.m4a low-tom
drum-machine $MACHINE/tom-hi/ht50.m4a high-tom
lofi $KIT/Samples/lofi/kick/lofi_kick_snoff_vl3_rr1.flac kick
lofi $KIT/Samples/lofi/snare/lofi_snare_center_vl35.flac snare
lofi $KIT/Samples/lofi/hh/lofi_hh_closed_vl3_rr1.flac hat
lofi $KIT/Samples/lofi/hh/lofi_hh_open_vl3_rr1.flac open-hat
lofi $KIT/Samples/lofi/crash/lofi_crash_crash_vl2_rr1.flac crash
lofi $KIT/Samples/lofi/ride/lofi_ride_ride_vl2_rr1.flac ride
lofi $KIT/Samples/lofi/ltom/lofi_ltom_center_vl15.flac low-tom
lofi $KIT/Samples/lofi/htom/lofi_htom_center_vl15.flac high-tom
linndrum $LINNDRUM/kick.m4a kick
linndrum $LINNDRUM/snare-m.m4a snare
linndrum $LINNDRUM/clap.m4a clap
linndrum $LINNDRUM/hhclosed.m4a hat
linndrum $LINNDRUM/hhopen.m4a open-hat
linndrum $LINNDRUM/crash.m4a crash
linndrum $LINNDRUM/ride.m4a ride
linndrum $LINNDRUM/tom-l.m4a low-tom
linndrum $LINNDRUM/tom-h.m4a high-tom
percussion $VSCO/VSCO%201%20Percussion/drums/other/ethnic/congo/open/ethnicLowOpen_hit_f_1.wav low-conga
percussion $VSCO/VSCO%201%20Percussion/drums/other/ethnic/congo/open/ethnicLowOpen_hit_f_2.wav low-conga-accent
percussion $VSCO/VSCO%201%20Percussion/drums/other/ethnic/congo/muted/ethnicHigh_hit_f_1.wav conga-slap
percussion $VSCO/VSCO%201%20Percussion/drums/other/ethnic/congo/open/ethnicHighOpen_hit_f_1.wav high-conga
percussion $VSCO/VSCO%201%20Percussion/drums/other/Bongos/LowBongo1.wav low-bongo
percussion $VSCO/VSCO%201%20Percussion/drums/other/Bongos/HighBongo1.wav high-bongo
percussion $VSCO/VSCO%201%20Percussion/varWood/Camo%27s%20Shaker/shake1.wav shaker
percussion $VSCO/VSCO%201%20Percussion/varWood/Camo%27s%20Shaker/shake3.wav shaker-accent
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_000.wav A0
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_002.wav Cs1
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_004.wav F1
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_006.wav A1
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_008.wav Cs2
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_010.wav F2
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_012.wav A2
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_014.wav Cs3
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_016.wav F3
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_018.wav A3
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_020.wav Cs4
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_022.wav F4
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_024.wav A4
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_026.wav Cs5
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_028.wav F5
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_030.wav A5
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_032.wav Cs6
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_034.wav F6
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_036.wav A6
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_038.wav Cs7
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_040.wav F7
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_042.wav A7
upright $VSCO/Keys/Upright%20Piano/Player_dyn2_rr1_044.wav C8
wurlitzer $WURLITZER/a1mp.flac A1 -5
wurlitzer $WURLITZER/e2mp.flac E2 -4
wurlitzer $WURLITZER/a2mp.flac A2 -2
wurlitzer $WURLITZER/eb3mp.flac Ds3 -9
wurlitzer $WURLITZER/ab3mp.flac Gs3 -8
wurlitzer $WURLITZER/db4mp.flac Cs4 4
wurlitzer $WURLITZER/gb4mp.flac Fs4 7
wurlitzer $WURLITZER/b4mp.flac B4 -5
wurlitzer $WURLITZER/db5mp.flac Cs5 3
wurlitzer $WURLITZER/g5mp.flac G5 -8
wurlitzer $WURLITZER/db6mp.flac Cs6 6
wurlitzer $WURLITZER/ab6mp.flac Gs6 2
LIST

curl -sSfL -o "$OUT/drums/LICENSE.md" "$KIT/LICENSE"
curl -sSfL -o "$OUT/drum-machine/LICENSE.md" "$MACHINE/TR808.TXT"
curl -sSfL -o "$OUT/lofi/LICENSE.md" "$KIT/LICENSE"
curl -sSfL -o "$OUT/linndrum/LICENSE.md" "https://raw.githubusercontent.com/smpldsnds/drum-machines/a894cb8c72abe15b05e7b4fd4b8ee561c0f9e960/README.md"
for folder in percussion upright; do
  curl -sSfL -o "$OUT/$folder/LICENSE.md" "$VSCO/LICENSE"
done
curl -sSfL -o "$OUT/wurlitzer/LICENSE.md" "https://raw.githubusercontent.com/sfzinstruments/GregSullivan.E-Pianos/8c3e581acda3594b553948ff0222d4f84a698376/LICENSE"

echo "Done: $(ls "$OUT"/*/*.m4a | wc -l | tr -d ' ') samples, $(du -sh "$OUT" | cut -f1), in $OUT"
