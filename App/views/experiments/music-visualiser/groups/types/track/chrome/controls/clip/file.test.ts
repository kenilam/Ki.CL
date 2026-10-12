import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { pickType, toFileName } from './file';

describe('pickType', () => {
  test('takes mp4 where the browser records it', () => {
    assert.equal(
      pickType(() => true),
      'video/mp4'
    );
  });

  test('falls back to webm', () => {
    assert.equal(
      pickType((type) => type.startsWith('video/webm')),
      'video/webm;codecs=vp9,opus'
    );
  });

  test('is null when nothing can be recorded', () => {
    assert.equal(
      pickType(() => false),
      null
    );
  });
});

describe('toFileName', () => {
  const track = { id: 'rainy-window', type: 'chillhop' };

  test('names the file after the track', () => {
    assert.equal(toFileName(track, 'video/mp4'), 'chillhop-rainy-window.mp4');
  });

  test('drops the codecs from the extension', () => {
    assert.equal(
      toFileName(track, 'video/webm;codecs=vp9,opus'),
      'chillhop-rainy-window.webm'
    );
  });
});
