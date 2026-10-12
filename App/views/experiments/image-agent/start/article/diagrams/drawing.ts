import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const Y = 40;
const H = 60;

/** The image providers, in the order they are tried. */
const CHAIN = [
  { context: 'openai', x: 30 },
  { context: 'cloudflare', x: 210 },
  { context: 'pollinations', x: 390 },
  { context: 'gemini', x: 570 },
] as const;

/** The drawing loop, and the provider chain one of its calls goes through. */
const drawing = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.drawing.title'),
  legend: [
    {
      label: t('diagram.drawing.label', { context: 'top' }),
      value: t('diagram.drawing.legend', { context: 'top' }),
    },
    {
      label: t('diagram.drawing.label', { context: 'bottom' }),
      value: t('diagram.drawing.legend', { context: 'bottom' }),
    },
  ],
  description: t('diagram.drawing.description'),
  width: 760,
  height: 470,
  groups: [
    {
      label: t('diagram.drawing.group', { context: 'chain' }),
      x: 10,
      y: 190,
      w: 740,
      h: 260,
    },
  ],
  nodes: [
    {
      title: t('diagram.drawing.node', { context: 'brief' }),
      x: 10,
      y: Y,
      w: 100,
      h: H,
    },
    {
      title: t('diagram.drawing.node', { context: 'write' }),
      lines: [t('diagram.drawing.line', { context: 'write' })],
      x: 150,
      y: Y,
      w: 140,
      h: H,
    },
    {
      title: t('diagram.drawing.node', { context: 'draw' }),
      lines: [t('diagram.drawing.line', { context: 'draw' })],
      x: 330,
      y: Y,
      w: 120,
      h: H,
    },
    {
      title: t('diagram.drawing.node', { context: 'review' }),
      lines: [t('diagram.drawing.line', { context: 'review' })],
      x: 490,
      y: Y,
      w: 120,
      h: H,
    },
    {
      title: t('diagram.drawing.node', { context: 'save' }),
      x: 650,
      y: Y,
      w: 100,
      h: H,
    },
    ...CHAIN.map(({ context, x }) => ({
      title: t('diagram.drawing.node', { context }),
      lines: [t('diagram.drawing.line', { context })],
      x,
      y: 240,
      w: 160,
      h: 60,
    })),
    {
      title: t('diagram.drawing.node', { context: 'provider' }),
      lines: [
        t('diagram.drawing.line', { context: 'provider_timeout' }),
        t('diagram.drawing.line', { context: 'provider_error' }),
        t('diagram.drawing.line', { context: 'provider_quota' }),
      ],
      x: 30,
      y: 330,
      w: 700,
      h: 100,
    },
  ],
  edges: [
    ...[
      [110, 150],
      [290, 330],
      [450, 490],
    ].map(([from, to]) => ({
      accent: 'green' as const,
      points: [
        [from, Y + H / 2],
        [to, Y + H / 2],
      ] as Array<[number, number]>,
    })),
    {
      accent: 'green',
      points: [
        [610, Y + H / 2],
        [650, Y + H / 2],
      ],
      label: t('diagram.drawing.edge', { context: 'pass' }),
      lx: 630,
      ly: Y + H / 2 - 8,
    },
    {
      accent: 'orange',
      dashed: true,
      points: [
        [550, Y + H],
        [550, 140],
        [220, 140],
        [220, Y + H],
      ],
      label: t('diagram.drawing.edge', { context: 'fails' }),
      lx: 385,
      ly: 160,
    },
    ...CHAIN.slice(0, -1).map(({ x }) => ({
      points: [
        [x + 160, 270],
        [x + 180, 270],
      ] as Array<[number, number]>,
    })),
  ],
});

export { drawing };
