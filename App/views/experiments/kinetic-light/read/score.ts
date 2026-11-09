// Libraries
import { Midi } from '@tonejs/midi';

// Readers
import { evenBars, parseChord, toChordNotes, type Mark } from './chords';
import { readMusicXml } from './musicxml';
import { barOf, lengthOf, type Piece } from './piece';
import { fromBase64, type Song } from './song';
import {
  writePart,
  writeScore,
  writeScorePart,
  type Meter,
  type Part,
  type Staff,
  type Written,
} from './write-score';

type Score = { bars: number[]; musicxml: string; quarters: number[] };

const CHORDS = 'kinetic-light-chords';
const PERCUSSION_CHANNEL = 9;
const UNPITCHED = ['percussive', 'sound effects', 'synth effects'];
const MIDDLE_C = 60;
const SPLIT_BELOW = 55;
const SPLIT_ABOVE = 64;
const BAR_TOLERANCE = 0.001;

const toStaves = (notes: Written[]): Staff[] => {
  const pitches = notes.map(({ pitch }) => pitch);

  if (
    Math.min(...pitches) < SPLIT_BELOW &&
    Math.max(...pitches) > SPLIT_ABOVE
  ) {
    return [
      { clef: 'G', notes: notes.filter(({ pitch }) => pitch >= MIDDLE_C) },
      { clef: 'F', notes: notes.filter(({ pitch }) => pitch < MIDDLE_C) },
    ];
  }

  const average =
    pitches.reduce((sum, pitch) => sum + pitch, 0) / pitches.length;

  return [{ clef: average >= MIDDLE_C ? 'G' : 'F', notes }];
};

const readMidiScore = (data: ArrayBuffer, title: string): Score => {
  const midi = new Midi(data);
  const { ppq } = midi.header;
  const [beats = 4, beatType = 4] =
    midi.header.timeSignatures[0]?.timeSignature ?? [];
  const bar = (beats * 4) / beatType;
  const written = new Map<string, Written>();

  midi.tracks
    .filter(
      ({ channel, instrument }) =>
        channel !== PERCUSSION_CHANNEL && !UNPITCHED.includes(instrument.family)
    )
    .forEach(({ notes }) =>
      notes.forEach(({ durationTicks, midi: pitch, ticks }) => {
        const key = `${ticks}:${pitch}`;
        const length = durationTicks / ppq;

        if ((written.get(key)?.length ?? 0) < length) {
          written.set(key, { length, pitch, start: ticks / ppq });
        }
      })
    );

  const parts: Part[] = written.size
    ? [{ name: title, staves: toStaves([...written.values()]) }]
    : [];
  const end = Math.max(
    0,
    ...midi.tracks.flatMap(({ notes }) =>
      notes.map(({ durationTicks, ticks }) => (ticks + durationTicks) / ppq)
    )
  );
  const quarters = Array.from(
    { length: Math.max(1, Math.ceil(end / bar - BAR_TOLERANCE)) + 1 },
    (_, index) => index * bar
  );

  return {
    bars: quarters.map((quarter) => midi.header.ticksToSeconds(quarter * ppq)),
    musicxml: writeScore(title, parts, { beatType, beats }, quarters),
    quarters,
  };
};

const toChordPart = (
  marks: readonly Mark[],
  bars: readonly number[],
  secondsPerBeat: number
): Part => ({
  name: CHORDS,
  staves: [
    {
      clef: 'F',
      notes: toChordNotes(marks, bars, secondsPerBeat).map(
        ({ duration, pitch, time }) => ({
          length: duration / secondsPerBeat,
          pitch,
          start: time / secondsPerBeat,
        })
      ),
    },
  ],
  words: marks
    .filter(
      ({ bar, symbol }) => bar >= 1 && bar < bars.length && parseChord(symbol)
    )
    .map(({ bar, beat, symbol }) => ({
      start: bars[bar - 1] / secondsPerBeat + Math.max(1, beat) - 1,
      text: symbol,
    })),
});

const withPart = (
  musicxml: string,
  part: Part,
  quarters: readonly number[]
): string => {
  const parser = new DOMParser();
  const document = parser.parseFromString(musicxml, 'application/xml');
  const score = document.querySelector('score-partwise');
  const list = score?.querySelector(':scope > part-list');

  if (!score || !list) {
    return musicxml;
  }

  const time = score.querySelector('time');
  const meter: Meter = {
    beatType: Number(time?.querySelector('beat-type')?.textContent) || 4,
    beats: Number(time?.querySelector('beats')?.textContent) || 4,
  };
  const parse = (markup: string) =>
    document.importNode(
      parser.parseFromString(markup, 'application/xml').documentElement,
      true
    );

  list.append(parse(writeScorePart(CHORDS, part)));
  score.append(parse(writePart(CHORDS, part, meter, quarters)));

  return new XMLSerializer().serializeToString(document);
};

const readSheetScore = (song: Song): Score | null => {
  const read = song.musicxml
    ? readMusicXml(song.musicxml, song.title, song.tempo)
    : null;

  if (read?.notes.length && song.musicxml) {
    if (!song.chords.length) {
      return {
        bars: read.bars,
        musicxml: song.musicxml,
        quarters: read.quarters,
      };
    }

    const secondsPerBeat = 60 / (song.tempo ?? read.tempo);

    return {
      bars: read.bars,
      musicxml: withPart(
        song.musicxml,
        toChordPart(song.chords, read.bars, secondsPerBeat),
        read.quarters
      ),
      quarters: read.quarters,
    };
  }

  if (!song.chords.length || !song.tempo || !song.beatsPerBar) {
    return null;
  }

  const secondsPerBeat = 60 / song.tempo;
  const bars = evenBars(
    Math.max(...song.chords.map(({ bar }) => bar)),
    song.beatsPerBar,
    secondsPerBeat
  );
  const quarters = bars.map((bar) => bar / secondsPerBeat);

  return {
    bars,
    musicxml: writeScore(
      song.title,
      [toChordPart(song.chords, bars, secondsPerBeat)],
      { beatType: 4, beats: song.beatsPerBar },
      quarters
    ),
    quarters,
  };
};

const readNotesScore = (piece: Piece): Score => {
  const secondsPerBeat = 60 / piece.tempo;
  const bars = evenBars(
    Math.round(lengthOf(piece) / barOf(piece)),
    piece.beatsPerBar,
    secondsPerBeat
  );
  const quarters = bars.map((bar) => bar / secondsPerBeat);

  return {
    bars,
    musicxml: writeScore(
      piece.title,
      [
        {
          name: piece.title,
          staves: toStaves(
            piece.notes.map(({ duration, pitch, time }) => ({
              length: duration / secondsPerBeat,
              pitch,
              start: time / secondsPerBeat,
            }))
          ),
        },
      ],
      { beatType: 4, beats: piece.beatsPerBar },
      quarters
    ),
    quarters,
  };
};

const readScore = (song: Song): Score | null => {
  if (song.midi) {
    return readMidiScore(fromBase64(song.midi), song.title);
  }

  if (song.source === 'FILE') {
    const read = song.musicxml ? readMusicXml(song.musicxml, song.title) : null;

    return read && song.musicxml
      ? { bars: read.bars, musicxml: song.musicxml, quarters: read.quarters }
      : null;
  }

  return readSheetScore(song);
};

export { readNotesScore, readScore, type Score };
