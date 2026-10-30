import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const OUTCOMES = [
  { accent: 'green', context: 'complete', x: 10 },
  { accent: 'orange', context: 'cut_off', x: 200 },
  { accent: 'orange', context: 'per_minute', x: 390 },
  { accent: 'red', context: 'daily', x: 580 },
] as const;

const limits = (t: TFunction<'internationalisation'>): DiagramSpec => {
  return {
    title: t('diagram.limits.title'),
    description: t('diagram.limits.description'),
    width: 760,
    height: 280,
    nodes: [
      {
        title: t('diagram.limits.node', { context: 'job' }),
        lines: [t('diagram.limits.line', { context: 'job' })],
        x: 10,
        y: 10,
        w: 240,
        h: 70,
      },
      {
        title: t('diagram.limits.node', { context: 'models' }),
        lines: [t('diagram.limits.line', { context: 'models' })],
        x: 510,
        y: 10,
        w: 240,
        h: 70,
      },
      ...OUTCOMES.map(({ context, x }) => {
        return {
          title: t('diagram.limits.node', { context }),
          lines: [
            t('diagram.limits.line', { context: `${context}_first` }),
            t('diagram.limits.line', { context: `${context}_then` }),
          ],
          x,
          y: 180,
          w: 170,
          h: 90,
        };
      }),
    ],
    edges: [
      {
        points: [
          [250, 45],
          [510, 45],
        ],
        label: t('diagram.limits.edge', { context: 'request' }),
        lx: 380,
        ly: 37,
      },
      ...OUTCOMES.map(({ accent, x }) => {
        return {
          accent,
          points: [
            [630, 80],
            [630, 130],
            [x + 85, 130],
            [x + 85, 180],
          ] as Array<[number, number]>,
        };
      }),
    ],
  };
};

export { limits };
