import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import type { Sheet } from '@/views/experiments/kinetic-light/stage/engrave';
import {
  hoverAt,
  toPlayhead,
} from '@/views/experiments/kinetic-light/stage/playhead';

import { positionAt, stoppedAt, toTracks } from './path';

const head = (time: number, x: number, y: number) => ({
  pitch: 60,
  sounded: true,
  staff: 0,
  time,
  x,
  y,
});

const TIMING = { descent: 0.8, hold: 5, length: 8 };
const END = TIMING.length + TIMING.hold;

const sheet: Sheet = {
  bars: [],
  end: 700,
  heads: [
    head(0, 100, 10),
    head(0, 100, 30),
    head(1, 200, 20),
    head(2, 300, 20),
    head(5, 600, 20),
  ],
  height: 40,
  rests: [{ staff: 0, time: 3 }],
  staves: [{ bottom: 40, top: 0 }],
  svg: '',
  width: 700,
};

const playhead = toPlayhead(sheet.heads, TIMING, 10);
const tracks = toTracks(sheet, playhead);
const at = (ball: number, time: number) => {
  const point = { x: 0, y: 0, z: 0 };
  const seen = positionAt(tracks[ball], playhead, time, point);

  return { ...point, seen };
};

describe('toTracks', () => {
  test('gives a staff one ball for each note of its biggest chord', () => {
    assert.equal(tracks.length, 2);
  });

  test('lands each ball on its own note of a chord', () => {
    assert.equal(at(0, 0).z, 0.1);
    assert.equal(at(1, 0).z, 0.3);
  });

  test('brings the balls together on a single note', () => {
    assert.deepEqual(at(0, 1), at(1, 1));
  });
});

describe('positionAt', () => {
  test('moves at a steady pace between its own notes', () => {
    const crowded: Sheet = {
      ...sheet,
      heads: [
        head(0, 100, 10),
        { ...head(1, 280, 50), staff: 1 },
        head(2, 300, 10),
      ],
      rests: [],
      staves: [
        { bottom: 40, top: 0 },
        { bottom: 80, top: 40 },
      ],
    };
    const crowdedPlayhead = toPlayhead(crowded.heads, TIMING, 10);
    const [ball] = toTracks(crowded, crowdedPlayhead);
    const point = { x: 0, y: 0, z: 0 };

    positionAt(ball, crowdedPlayhead, 1, point);

    assert.equal(point.x, 2);
  });

  test('arcs higher between notes that are further apart', () => {
    assert.ok(at(0, 1.5).y > 0);
    assert.ok(at(0, 0.5).y > at(0, 1.5).y);
  });

  test('keeps the ball on the note before a whole rest', () => {
    assert.deepEqual(at(0, 4), { seen: 1, x: 3, y: 0, z: 0.2 });
  });

  test('drops a new ball from high up onto the note after a whole rest', () => {
    const falling = at(0, 4.6);

    assert.equal(falling.seen, 1);
    assert.equal(falling.x, 6);
    assert.ok(falling.y > 5);
    assert.deepEqual(at(0, 5), { seen: 1, x: 6, y: 0, z: 0.2 });
  });

  test('drops every ball onto its first note as the song starts', () => {
    assert.equal(at(0, -2).seen, 0);

    const falling = at(0, -0.4);

    assert.equal(falling.seen, 1);
    assert.ok(falling.y > 5);
    assert.deepEqual(at(0, 0), { seen: 1, x: 1, y: 0, z: 0.1 });
  });

  test('starts a staff that comes in later with the others', () => {
    const late: Sheet = {
      ...sheet,
      heads: [head(0, 100, 10), { ...head(2, 300, 50), staff: 1 }],
      rests: [{ staff: 1, time: 0 }],
      staves: [
        { bottom: 40, top: 0 },
        { bottom: 80, top: 40 },
      ],
    };
    const latePlayhead = toPlayhead(late.heads, TIMING, 10);
    const [, entering] = toTracks(late, latePlayhead);
    const point = { x: 0, y: 0, z: 0 };

    assert.equal(positionAt(entering, latePlayhead, 0, point), 1);
    assert.deepEqual(point, { x: 1, y: 0, z: 0.5 });
    assert.equal(entering.stops.length, 0);
  });

  test('rises off its last note into the air after the music ends', () => {
    const rising = at(0, TIMING.length);

    assert.ok(rising.y > 0);
    assert.ok(rising.x > 6 && rising.x < 8);
  });

  test('hangs in the air short of the next first note when the hold ends', () => {
    assert.deepEqual(at(0, END), { seen: 1, x: 8, y: 0.6, z: 0.1 });
    assert.equal(hoverAt(END, TIMING), 1);
    assert.equal(hoverAt(TIMING.length, TIMING), 0);
  });

  test('swoops forward and down onto the first note on replay', () => {
    const landing = at(0, END + TIMING.descent / 2);

    assert.ok(landing.y > 0 && landing.y < 0.6);
    assert.ok(landing.x > 8 && landing.x < 11);
    assert.deepEqual(at(0, END + TIMING.descent), {
      seen: 1,
      x: 11,
      y: 0,
      z: 0.1,
    });
    assert.equal(hoverAt(END + TIMING.descent, TIMING), 0);
  });

  test('moves without a jump where the hold turns into the replay', () => {
    const before = at(0, END - 0.001);
    const after = at(0, END + 0.001);

    assert.ok(Math.abs(before.x - after.x) < 0.01);
    assert.ok(Math.abs(before.y - after.y) < 0.01);
  });

  test('leaves the stopped ball on its note once the new one drops', () => {
    assert.equal(stoppedAt(tracks[0], playhead, 4), 0);
    assert.equal(stoppedAt(tracks[0], playhead, 4.6), 1);
    assert.deepEqual(tracks[0].stops[0], { time: 4.2, x: 3, z: 0.2 });
  });
});
