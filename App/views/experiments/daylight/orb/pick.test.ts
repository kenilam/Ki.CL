import assert from 'node:assert/strict';
import { test } from 'node:test';

import { toVector, toView } from '@/views/experiments/daylight/sun';
import { GLOBE, toFrame } from './layout';
import { toPlaceAt } from './pick';

const LONDON = { latitude: 51.5, longitude: -0.1 };
const LAGOS = { latitude: 6.5, longitude: 3.4 };
const TOKYO = { latitude: 35.7, longitude: 139.7 };
const places = [LONDON, LAGOS, TOKYO].map(toVector);
const wide = { column: 1280, height: 800, width: 1400 };
const tall = { column: 1280, height: 800, width: 400 };

test('the place the globe faces is under the middle of the drawing', () => {
  const { x, y } = toFrame(wide);

  assert.equal(toPlaceAt({ ...wide, places, view: toView(LONDON), x, y }), 0);
});

test('on a tall page the middle of the drawing is below the middle of the page', () => {
  const { x, y } = toFrame(tall);

  assert.ok(y > tall.height / 2);
  assert.equal(toPlaceAt({ ...tall, places, view: toView(TOKYO), x, y }), 2);
});

test('a place to the south is under a point below the middle', () => {
  const { size, x, y } = toFrame(wide);
  const view = toView(LONDON);
  const south = y + size * GLOBE * 0.7;

  assert.equal(toPlaceAt({ ...wide, places, view, x, y: south }), 1);
});

test('nothing is picked off the globe or in open sea', () => {
  const { size, x, y } = toFrame(wide);
  const view = toView(LONDON);

  assert.equal(toPlaceAt({ ...wide, places, view, x: x + size * 0.4, y }), -1);
  assert.equal(
    toPlaceAt({ ...wide, places, view, x: x - size * GLOBE * 0.6, y }),
    -1
  );
});
