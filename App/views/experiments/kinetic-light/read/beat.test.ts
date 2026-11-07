import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { toBeat } from './beat';
import type { Note, Piece } from './piece';

const KICK = 36;
const SNARE = 38;
const CLAP = 39;
const HAT = 42;
const OPEN_HAT = 46;
const CRASH = 49;
const HIGH_BONGO = 51;

const piece = (notes: Note[], beatsPerBar = 4): Piece => ({
  beatsPerBar,
  notes,
  source: 'notes',
  tempo: 60,
  title: '',
});

const note = (time: number, pitch = 72, duration = 0.5): Note => ({
  duration,
  pitch,
  time,
  velocity: 0.8,
});

const eighths = piece([0, 0.5, 1, 1.5, 2, 3].map((time) => note(time)));

const times = (hits: Note[], pitch: number): number[] =>
  hits
    .filter((hit) => hit.pitch === pitch)
    .map(({ time }) => Math.round(time * 1000) / 1000);

describe('toBeat on the drum kit', () => {
  test('plays eighth hats, a kick on the first beat and a snare on two and four', () => {
    const hits = toBeat(eighths, 4, 'kit');

    assert.deepEqual(times(hits, HAT), [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]);
    assert.deepEqual(times(hits, KICK), [0]);
    assert.deepEqual(times(hits, SNARE), [1, 3]);
    assert.deepEqual(times(hits, CRASH), [0]);
  });

  test('moves the hats to triplets when the notes are in triplets', () => {
    const hits = toBeat(
      piece([0, 1 / 3, 2 / 3, 1].map((time) => note(time))),
      1,
      'kit'
    );

    assert.deepEqual(times(hits, HAT), [0, 0.333, 0.667]);
  });

  test('moves the hats to sixteenths when the notes are in sixteenths', () => {
    const hits = toBeat(
      piece([0, 0.25, 0.5, 0.75].map((time) => note(time))),
      1,
      'kit'
    );

    assert.deepEqual(times(hits, HAT), [0, 0.25, 0.5, 0.75]);
  });

  test('kicks where a held bass note starts, but not on a snare', () => {
    const hits = toBeat(
      piece([
        note(0, 48, 2),
        note(1, 48, 1),
        note(2.5, 48, 1.5),
        note(3.5, 72),
      ]),
      4,
      'kit'
    );

    assert.deepEqual(times(hits, KICK), [0, 2.5]);
  });

  test('keeps the kick to the first beat of each bar in three', () => {
    const hits = toBeat(
      piece(
        [0, 1, 2, 3, 4, 5].map((time) => note(time)),
        3
      ),
      6,
      'kit'
    );

    assert.deepEqual(times(hits, KICK), [0, 3]);
    assert.deepEqual(times(hits, SNARE), [1, 4]);
  });

  test('plays nothing for a piece with no notes', () => {
    assert.deepEqual(toBeat(piece([]), 4, 'kit'), []);
  });
});

describe('toBeat on the drum machine', () => {
  test('kicks on every beat, claps on two and four and opens the hat off the beat', () => {
    const hits = toBeat(eighths, 4, 'machine');

    assert.deepEqual(times(hits, KICK), [0, 1, 2, 3]);
    assert.deepEqual(times(hits, CLAP), [1, 3]);
    assert.deepEqual(times(hits, OPEN_HAT), [0.5, 1.5, 2.5, 3.5]);
    assert.deepEqual(times(hits, HAT), [0, 1, 2, 3]);
    assert.deepEqual(times(hits, SNARE), []);
  });

  test('opens the hat on the last triplet when the notes are in triplets', () => {
    const hits = toBeat(
      piece([0, 1 / 3, 2 / 3, 1].map((time) => note(time))),
      1,
      'machine'
    );

    assert.deepEqual(times(hits, OPEN_HAT), [0.667]);
    assert.deepEqual(times(hits, HAT), [0, 0.333]);
  });
});

describe('toBeat in hand percussion', () => {
  test('shakes every step, slaps on two and four and plays a low conga on one', () => {
    const hits = toBeat(eighths, 4, 'percussion');

    assert.deepEqual(times(hits, HAT), [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]);
    assert.deepEqual(times(hits, SNARE), [1, 3]);
    assert.deepEqual(times(hits, KICK), [0]);
    assert.deepEqual(times(hits, HIGH_BONGO), [0.5, 1.5, 2.5, 3.5]);
  });

  test('plays the kit pattern on the lo-fi kit and the LinnDrum', () => {
    assert.deepEqual(toBeat(eighths, 4, 'lofi'), toBeat(eighths, 4, 'kit'));
    assert.deepEqual(toBeat(eighths, 4, 'linndrum'), toBeat(eighths, 4, 'kit'));
  });
});
