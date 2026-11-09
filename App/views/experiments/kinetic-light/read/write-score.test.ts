import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { writePart } from './write-score';

const METER = { beatType: 4, beats: 4 };
const BARS = [0, 4, 8];

const notesOf = (part: string, bar: number): string[] =>
  part.split('<measure ')[bar].match(/<note>.*?<\/note>/g) ?? [];

describe('writePart', () => {
  test('ties a note that runs over the barline', () => {
    const part = writePart(
      'P1',
      {
        name: '',
        staves: [{ clef: 'G', notes: [{ length: 4, pitch: 72, start: 2 }] }],
      },
      METER,
      BARS
    );
    const [rest, held] = notesOf(part, 1);
    const [carried] = notesOf(part, 2);

    assert.match(rest, /<rest\/><duration>8<\/duration>/);
    assert.match(held, /<tie type="start"\/>.*<type>half<\/type>/);
    assert.match(carried, /<tie type="stop"\/>.*<type>half<\/type>/);
  });

  test('writes notes that start and end together as one chord', () => {
    const part = writePart(
      'P1',
      {
        name: '',
        staves: [
          {
            clef: 'G',
            notes: [
              { length: 4, pitch: 60, start: 0 },
              { length: 4, pitch: 64, start: 0 },
            ],
          },
        ],
      },
      METER,
      BARS
    );
    const [low, high] = notesOf(part, 1);

    assert.doesNotMatch(low, /<chord\/>/);
    assert.match(high, /<chord\/><pitch><step>E<\/step><octave>4<\/octave>/);
  });

  test('fills an empty bar with a whole-bar rest', () => {
    const part = writePart(
      'P1',
      {
        name: '',
        staves: [{ clef: 'F', notes: [{ length: 4, pitch: 48, start: 0 }] }],
      },
      METER,
      BARS
    );

    assert.deepEqual(notesOf(part, 2), [
      '<note><rest measure="yes"/><duration>16</duration><voice>1</voice><staff>1</staff></note>',
    ]);
  });
});
