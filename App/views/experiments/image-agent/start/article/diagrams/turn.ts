import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const ACTORS = [
  { context: 'browser', x: 90 },
  { context: 'api', x: 280 },
  { context: 'mongodb', x: 470 },
  { context: 'models', x: 660 },
] as const;

const TOP = 20;
const BOTTOM = 530;

/** Arrows between lifelines, a reply dashed. `from === to` loops back. */
const STEPS = [
  { context: 'send', from: 90, to: 280, y: 90, reply: false },
  { context: 'limits', from: 280, to: 280, y: 120, reply: false },
  { context: 'save', from: 280, to: 470, y: 160, reply: false },
  { context: 'thread', from: 280, to: 90, y: 195, reply: true },
  { context: 'check', from: 280, to: 660, y: 240, reply: false },
  { context: 'verdict', from: 660, to: 280, y: 275, reply: true },
  { context: 'save_each', from: 280, to: 470, y: 315, reply: false },
  { context: 'pushed', from: 280, to: 90, y: 350, reply: true },
  { context: 'draw', from: 280, to: 660, y: 395, reply: false },
  { context: 'score', from: 660, to: 280, y: 430, reply: true },
  { context: 'idle', from: 280, to: 470, y: 470, reply: false },
  { context: 'picture', from: 280, to: 90, y: 505, reply: true },
] as const;

/** One turn, from the send to the picture. */
const turn = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.turn.title'),
  legend: [
    {
      label: t('diagram.turn.label', { context: 'inside' }),
      value: t('diagram.turn.legend', { context: 'inside' }),
    },
    {
      label: t('diagram.turn.label', { context: 'runs' }),
      value: t('diagram.turn.legend', { context: 'runs' }),
    },
    {
      label: t('diagram.label', { context: 'dashed' }),
      value: t('diagram.turn.legend', { context: 'dashed' }),
    },
  ],
  description: t('diagram.turn.description'),
  width: 760,
  height: 550,
  nodes: ACTORS.map(({ context, x }) => ({
    title: t('diagram.node', { context }),
    x: x - 65,
    y: TOP,
    w: 130,
    h: 40,
  })),
  edges: [
    ...ACTORS.map(({ x }) => ({
      dashed: true,
      points: [
        [x, TOP + 40],
        [x, BOTTOM],
      ] as Array<[number, number]>,
    })),
    ...STEPS.map(({ context, from, reply, to, y }) => {
      const label = t('diagram.turn.step', { context });

      return from === to
        ? {
            accent: 'green' as const,
            anchor: 'start' as const,
            label,
            lx: from + 48,
            ly: y + 11,
            points: [
              [from, y],
              [from + 40, y],
              [from + 40, y + 15],
              [from, y + 15],
            ] as Array<[number, number]>,
          }
        : {
            accent: reply ? undefined : ('green' as const),
            dashed: reply,
            label,
            lx: (from + to) / 2,
            ly: y - 8,
            points: [
              [from, y],
              [to, y],
            ] as Array<[number, number]>,
          };
    }),
  ],
});

export { turn };
