import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  toBearing,
  toLight,
  toSeen,
  toSubsolar,
  toVector,
  toView,
} from './sun';

const near = (actual: number, expected: number, within: number) =>
  assert.ok(
    Math.abs(actual - expected) <= within,
    `${actual} is not within ${within} of ${expected}`
  );

describe('toSubsolar', () => {
  test('is over the tropic of Cancer at the June solstice', () => {
    near(toSubsolar(new Date('2026-06-21T12:00:00Z')).latitude, 23.44, 0.3);
  });

  test('is over the equator at the March equinox', () => {
    near(toSubsolar(new Date('2026-03-20T14:46:00Z')).latitude, 0, 0.5);
  });

  test('is near the prime meridian at noon in Greenwich', () => {
    near(toSubsolar(new Date('2026-04-15T12:00:00Z')).longitude, 0, 1);
  });

  test('moves west by 15 degrees an hour', () => {
    near(toSubsolar(new Date('2026-04-15T18:00:00Z')).longitude, -90, 1);
  });
});

describe('toLight', () => {
  const noon = toSubsolar(new Date('2026-04-15T12:00:00Z'));

  test('is day under the sun and night opposite it', () => {
    assert.equal(toLight({ latitude: 51.5, longitude: 0 }, noon), 'day');
    assert.equal(toLight({ latitude: -20, longitude: 180 }, noon), 'night');
  });

  test('is twilight just past the edge', () => {
    const edge = { latitude: 0, longitude: noon.longitude + 93 };

    assert.equal(toLight(edge, noon), 'twilight');
  });
});

describe('toBearing', () => {
  const here = { latitude: 0, longitude: 0 };

  test('is to the right when the sun is to the east', () => {
    near(toBearing(here, { latitude: 0, longitude: 60 }), 90, 1e-6);
  });

  test('is to the left when the sun is to the west', () => {
    near(toBearing(here, { latitude: 0, longitude: -60 }), -90, 1e-6);
  });

  test('is up when the sun is to the north', () => {
    near(toBearing(here, { latitude: 20, longitude: 0 }), 0, 1e-6);
  });
});

describe('toView', () => {
  test('puts the centre in front of the viewer', () => {
    const centre = { latitude: 22, longitude: 114 };
    const [x, y, z] = toSeen(toVector(centre), toView(centre));

    near(x, 0, 1e-9);
    near(y, 0, 1e-9);
    near(z, 1, 1e-9);
  });

  test('puts a place to the east on the right', () => {
    const view = toView({ latitude: 0, longitude: 0 });
    const [x] = toSeen(toVector({ latitude: 0, longitude: 30 }), view);

    assert.ok(x > 0);
  });
});
