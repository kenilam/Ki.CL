import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { PLACES, type Place } from './constants';
import { toNearestToward, type Arrow } from './toward';

const at = (context: Place['context']) =>
  PLACES.find((place) => place.context === context) as Place;
const toward = (context: Place['context'], arrow: Arrow) =>
  toNearestToward(at(context), arrow)?.context;

describe('toNearestToward', () => {
  test('goes east and west along the map', () => {
    assert.equal(toward('london', 'ArrowRight'), 'mumbai');
    assert.equal(toward('london', 'ArrowLeft'), 'new_york');
    assert.equal(toward('mumbai', 'ArrowRight'), 'hong_kong');
  });

  test('goes south and north', () => {
    assert.equal(toward('london', 'ArrowDown'), 'lagos');
    assert.equal(toward('lagos', 'ArrowUp'), 'london');
    assert.equal(toward('mumbai', 'ArrowDown'), 'sydney');
  });

  test('crosses the date line', () => {
    assert.equal(toward('tokyo', 'ArrowRight'), 'los_angeles');
  });

  test('never answers with the place it started from', () => {
    for (const place of PLACES) {
      for (const arrow of [
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
      ] as const) {
        assert.notEqual(toNearestToward(place, arrow), place);
      }
    }
  });
});
