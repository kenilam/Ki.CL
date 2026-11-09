import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { toArrangedBeat, type Arrangement } from './arrangement';
import { toOutline } from './outline';
import type { Note, Piece } from './piece';

const KICK = 36;
const SNARE = 38;
const CLAP = 39;
const CRASH = 49;
const REST = '........';

const piece: Piece = {
  beatsPerBar: 4,
  notes: [
    { duration: 2, pitch: 48, time: 0, velocity: 1 },
    { duration: 0.5, pitch: 72, time: 0.5, velocity: 1 },
    { duration: 0.5, pitch: 72, time: 1, velocity: 1 },
    { duration: 0.5, pitch: 72, time: 7.5, velocity: 1 },
  ],
  source: 'notes',
  tempo: 60,
  title: 'Test',
};

const pattern = (drums: Partial<Record<string, string>>) => ({
  hat: REST,
  highTom: REST,
  kick: REST,
  lowTom: REST,
  openHat: REST,
  ride: REST,
  snare: REST,
  ...drums,
});

const arrangement: Arrangement = {
  beat: 'KIT',
  glow: 1,
  hue: 0.5,
  sections: [
    {
      crash: true,
      fill: pattern({ snare: 'xxxxxxxx' }),
      from: 1,
      pattern: pattern({ kick: 'X...x...', snare: '..x...x.' }),
      to: 2,
    },
  ],
  zoom: 6,
  steps: 2,
  voice: 'GRAND',
} as Arrangement;

const times = (hits: Note[], pitch: number): number[] =>
  hits.filter((hit) => hit.pitch === pitch).map(({ time }) => time);

describe('toArrangedBeat', () => {
  test('plays the pattern, then the fill on the last bar, with a crash at the start', () => {
    const hits = toArrangedBeat(piece, arrangement, 8, 'kit');

    assert.deepEqual(times(hits, KICK), [0, 2]);
    assert.deepEqual(
      times(hits, SNARE),
      [1, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]
    );
    assert.deepEqual(times(hits, CRASH), [0]);
  });

  test('accents a capital X', () => {
    const [accented, plain] = toArrangedBeat(
      piece,
      arrangement,
      8,
      'kit'
    ).filter((hit) => hit.pitch === KICK);

    assert.ok(accented.velocity > plain.velocity);
  });

  test('plays the snare as a clap on the drum machine', () => {
    const hits = toArrangedBeat(piece, arrangement, 8, 'machine');

    assert.deepEqual(times(hits, SNARE), []);
    assert.equal(times(hits, CLAP).length, 10);
  });

  test('rests where no section covers the bar', () => {
    const hits = toArrangedBeat(
      piece,
      { ...arrangement, sections: [{ ...arrangement.sections[0], to: 1 }] },
      8,
      'kit'
    );

    assert.ok(hits.every(({ time }) => time < 4));
  });
});

describe('toOutline', () => {
  test('marks where notes start in each bar, b for bass', () => {
    assert.deepEqual(toOutline(piece), {
      bars: ['bxx.....', '.......x'],
      beatsPerBar: 4,
      steps: 2,
      tempo: 60,
      title: 'Test',
    });
  });
});
