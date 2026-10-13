import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { toNearest, toNearestTo } from './nearest';

describe('toNearest', () => {
  test('is the place in the visitor’s time zone', () => {
    assert.equal(toNearest('Asia/Tokyo', -540).context, 'tokyo');
  });

  test('is the place nearest their longitude otherwise', () => {
    // Paris: an hour ahead of UTC, 15 degrees east. Lagos is at 3, London at 0.
    assert.equal(toNearest('Europe/Paris', -60).context, 'lagos');
    // Denver: seven hours behind, 105 degrees west.
    assert.equal(toNearest('America/Denver', 420).context, 'los_angeles');
  });

  test('goes the short way round the date line', () => {
    // Auckland: twelve hours ahead, 180 degrees. Sydney is at 151.
    assert.equal(toNearest('Pacific/Auckland', -720).context, 'sydney');
  });
});

describe('toNearestTo', () => {
  test('is the place nearest a point on the globe', () => {
    // Paris.
    assert.equal(
      toNearestTo({ latitude: 48.9, longitude: 2.4 }).context,
      'london'
    );
    // Auckland.
    assert.equal(
      toNearestTo({ latitude: -36.8, longitude: 174.8 }).context,
      'sydney'
    );
  });

  test('takes a longitude that has gone round more than once', () => {
    assert.equal(
      toNearestTo({ latitude: 35, longitude: 139 + 720 }).context,
      'tokyo'
    );
  });
});
