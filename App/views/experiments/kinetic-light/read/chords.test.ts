import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { evenBars, parseChord, toChordNotes } from './chords';

const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const spell = (symbol: string) => {
  const chord = parseChord(symbol);

  return chord
    ? `${NAMES[chord.bass]}: ${chord.tones.map((tone) => NAMES[tone]).join(' ')}`
    : null;
};

describe('parseChord', () => {
  test('reads a minus as minor and a slash as the bass', () => {
    assert.equal(spell('A-/E'), 'E: A C E');
    assert.equal(spell('F#-/A'), 'A: F# A C#');
  });

  test('adds a ninth without a seventh for add9', () => {
    assert.equal(spell('Dadd9'), 'D: D F# A E');
  });

  test('builds sevenths of each kind', () => {
    assert.equal(spell('B-7'), 'B: B D F# A');
    assert.equal(spell('Cmaj7'), 'C: C E G B');
    assert.equal(spell('G7'), 'G: G B D F');
    assert.equal(spell('Bdim7'), 'B: B D F G#');
  });

  test('drops the fifth when there are more than four tones', () => {
    assert.equal(spell('D9'), 'D: D F# C E');
  });

  test('reads flats and no chord', () => {
    assert.equal(spell('Bb'), 'A#: A# D F');
    assert.equal(spell('N.C.'), null);
  });
});

describe('toChordNotes', () => {
  test('holds each chord until the next and the last to its barline', () => {
    const notes = toChordNotes(
      [
        { bar: 1, beat: 1, symbol: 'D' },
        { bar: 2, beat: 3, symbol: 'G' },
      ],
      evenBars(2, 4, 0.5),
      0.5
    );
    const bass = notes.filter(({ pitch }) => pitch < 55);

    assert.deepEqual(
      bass.map(({ duration, time }) => [time, duration]),
      [
        [0, 3],
        [3, 1],
      ]
    );
  });

  test('puts the bass under the chord tones', () => {
    const notes = toChordNotes(
      [{ bar: 1, beat: 1, symbol: 'A-/E' }],
      evenBars(1, 4, 1),
      1
    );
    const [bass, ...tones] = notes;

    assert.ok(tones.every(({ pitch }) => pitch > bass.pitch));
    assert.equal(bass.pitch % 12, 4);
  });

  test('places chords on the score’s bars and drops bars past its end', () => {
    const notes = toChordNotes(
      [
        { bar: 1, beat: 1, symbol: 'D' },
        { bar: 2, beat: 1, symbol: 'G' },
        { bar: 4, beat: 1, symbol: 'A' },
      ],
      [0, 1, 5, 9],
      1,
      0.5
    );
    const bass = notes.filter(({ pitch }) => pitch < 55);

    assert.deepEqual(
      bass.map(({ duration, time, velocity }) => [time, duration, velocity]),
      [
        [0, 1, 0.3],
        [1, 4, 0.3],
      ]
    );
  });
});
