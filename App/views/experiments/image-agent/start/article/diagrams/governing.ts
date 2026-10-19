import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const Y = 50;
const W = 130;
const H = 70;

const CHECKS = [
  { context: 'limits', x: 10 },
  { context: 'rules', x: 162 },
  { context: 'moderation', x: 314 },
  { context: 'classifier', x: 466 },
  { context: 'clarifier', x: 618 },
] as const;

const OUT = 220;

/** The checks a message passes, cheapest first, and where each one sends it back. */
const governing = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.governing.title'),
  legend: [
    {
      label: t('diagram.label', { context: 'green' }),
      value: t('diagram.governing.legend', { context: 'green' }),
      level: 'confirm',
    },
    {
      label: t('diagram.label', { context: 'red' }),
      value: t('diagram.governing.legend', { context: 'red' }),
      level: 'error',
    },
  ],
  description: t('diagram.governing.description'),
  width: 760,
  height: 310,
  nodes: [
    ...CHECKS.map(({ context, x }) => ({
      title: t('diagram.governing.node', { context }),
      lines: [t('diagram.governing.line', { context })],
      x,
      y: Y,
      w: W,
      h: H,
    })),
    {
      title: t('diagram.governing.node', { context: 'error' }),
      lines: [t('diagram.governing.line', { context: 'error' })],
      x: 10,
      y: OUT,
      w: W,
      h: 70,
    },
    {
      title: t('diagram.governing.node', { context: 'refusal' }),
      lines: [
        t('diagram.governing.line', { context: 'refusal_withdrawn' }),
        t('diagram.governing.line', { context: 'refusal_counted' }),
      ],
      x: 162,
      y: OUT,
      w: 434,
      h: 70,
    },
    {
      title: t('diagram.governing.node', { context: 'question' }),
      lines: [t('diagram.governing.line', { context: 'question' })],
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
});

export { governing };
