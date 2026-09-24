import type { DiagramSpec } from '@/components';

const Y = 50;
const W = 130;
const H = 70;

const CHECKS = [
  { title: 'Limits', lines: ['before saving'], x: 10 },
  { title: 'Rules', lines: ['code, no model'], x: 162 },
  { title: 'Moderation', lines: ['free, safety only'], x: 314 },
  { title: 'Classifier', lines: ['is it a picture?'], x: 466 },
  { title: 'Clarifier', lines: ['ask or draw'], x: 618 },
];

const OUT = 220;

/** The checks a message passes, cheapest first, and where each one sends it back. */
const governing: DiagramSpec = {
  title: 'What gets through',
  legend: [
    {
      label: 'Green',
      value: 'moves the message to the next check',
      accent: 'confirm',
    },
    { label: 'Red', value: 'is where it stops', accent: 'error' },
  ],
  description:
    'A message passes limits, rules, moderation and a classifier in that order before the clarifier reads it. A limit refuses with an error that is not recorded. Rules, moderation and the classifier refuse with a refusal message, and the person’s message is withdrawn but still counted. The clarifier either asks a question, up to three per picture, or starts drawing.',
  width: 760,
  height: 310,
  nodes: [
    ...CHECKS.map(({ lines, title, x }) => ({
      title,
      lines,
      x,
      y: Y,
      w: W,
      h: H,
    })),
    { title: 'Error', lines: ['not recorded'], x: 10, y: OUT, w: W, h: 70 },
    {
      title: 'Refusal',
      lines: ['message withdrawn', 'still counted'],
      x: 162,
      y: OUT,
      w: 434,
      h: 70,
    },
    {
      title: 'Question',
      lines: ['up to 3, then draw'],
      x: 618,
      y: OUT,
      w: W,
      h: 70,
    },
  ],
  edges: [
    ...CHECKS.slice(0, -1).map(({ x }) => ({
      accent: 'green' as const,
      points: [
        [x + W, Y + H / 2],
        [x + W + 22, Y + H / 2],
      ] as Array<[number, number]>,
    })),
    ...CHECKS.slice(0, -1).map(({ x }) => ({
      accent: 'red' as const,
      points: [
        [x + W / 2, Y + H],
        [x + W / 2, OUT],
      ] as Array<[number, number]>,
    })),
    {
      points: [
        [683, Y + H],
        [683, OUT],
      ],
    },
  ],
};

export { governing };
