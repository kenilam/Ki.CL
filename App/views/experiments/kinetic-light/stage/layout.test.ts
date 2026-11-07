import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  GAP,
  LANE,
  firstAt,
  toBox,
  toCamera,
  toShade,
  toSpan,
  toWindow,
  toX,
} from './layout';

const notes = [
  { duration: 1, pitch: 60, time: 0 },
  { duration: 0.5, pitch: 64, time: 1 },
  { duration: 2, pitch: 72, time: 1 },
  { duration: 1, pitch: 55, time: 3 },
];

describe('toSpan', () => {
  test('pads the piece’s range and centres it', () => {
    const span = toSpan(notes);

    assert.equal(span.low, 53);
    assert.equal(span.high, 74);
    assert.equal(span.center, 63.5);
    assert.equal(span.width, 21 * LANE);
  });

  test('spreads pitches across the highway, low on the left', () => {
    const span = toSpan(notes);

    assert.ok(toX(55, span) < 0);
    assert.ok(toX(72, span) > 0);
    assert.equal(toShade(span.low, span), 0);
    assert.equal(toShade(span.high, span), 1);
  });
});

describe('toBox', () => {
  test('puts a note’s front on the hit line as it starts', () => {
    const { length, z } = toBox({ duration: 2, pitch: 60, time: 5 }, 5, 4);

    assert.equal(length, 8 - GAP);
    assert.equal(z + length / 2, 0);
  });

  test('leaves a gap between back-to-back notes in one lane', () => {
    const first = toBox({ duration: 1, pitch: 60, time: 0 }, 0, 4);
    const second = toBox({ duration: 1, pitch: 60, time: 1 }, 0, 4);

    const gap = first.z - first.length / 2 - (second.z + second.length / 2);

    assert.ok(Math.abs(gap - GAP) < 1e-9);
  });

  test('keeps at least half of a note shorter than the gap', () => {
    const { length } = toBox({ duration: 0.1, pitch: 60, time: 0 }, 0, 4);

    assert.equal(length, 0.2);
  });

  test('keeps a coming note further away the later it is', () => {
    const near = toBox({ duration: 1, pitch: 60, time: 2 }, 0, 4);
    const far = toBox({ duration: 1, pitch: 60, time: 4 }, 0, 4);

    assert.ok(far.z < near.z);
  });
});

describe('firstAt', () => {
  test('finds the first note at or after a time', () => {
    assert.equal(firstAt(notes, -1), 0);
    assert.equal(firstAt(notes, 0.5), 1);
    assert.equal(firstAt(notes, 1), 1);
    assert.equal(firstAt(notes, 10), notes.length);
  });
});

describe('toWindow', () => {
  test('reaches further ahead at a slower speed', () => {
    const [, slow] = toWindow(0, 4);
    const [, fast] = toWindow(0, 12);

    assert.ok(slow > fast);
  });
});

describe('toCamera', () => {
  const span = toSpan([
    { duration: 1, pitch: 40, time: 0 },
    { duration: 1, pitch: 88, time: 0 },
  ]);

  test('keeps the same view on a wide canvas', () => {
    assert.deepEqual(toCamera(span, 2, 65), toCamera(span, 3, 65));
  });

  test('moves back on a narrow canvas until the hit line fits', () => {
    const wide = toCamera(span, 2, 65);
    const narrow = toCamera(span, 0.5, 65);
    const across = Math.tan((65 * Math.PI) / 360) * 0.5 * narrow.distance;

    assert.ok(narrow.distance > wide.distance);
    assert.ok(span.width / 2 < across);
  });
});
