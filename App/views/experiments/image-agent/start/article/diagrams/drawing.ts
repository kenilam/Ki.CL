import type { DiagramSpec } from '@/components';

const Y = 40;
const H = 60;

const CHAIN = [
  { title: 'gpt-image-1', lines: ['OpenAI'], x: 30 },
  { title: 'Flux Schnell', lines: ['Cloudflare'], x: 210 },
  { title: 'Flux', lines: ['Pollinations'], x: 390 },
  { title: 'Gemini Image', lines: ['2.5 Flash'], x: 570 },
];

/** The drawing loop, and the provider chain one of its calls goes through. */
const drawing: DiagramSpec = {
  title: 'Drawing, and failover',
  legend: [
    {
      label: 'Top row',
      value: 'once per picture, one retry after a failed review',
    },
    { label: 'Bottom row', value: 'the order providers are tried in for Draw' },
  ],
  description:
    'From the brief, a prompt is written, the picture drawn and reviewed. A pass saves the best attempt. A failed review sends up to three notes back to the prompt writer for one more attempt. Every call goes through a chain of providers; for pictures that is gpt-image-1, Flux Schnell on Cloudflare, Flux on Pollinations, then Gemini. Each provider times out and moves on, retries other errors three times, and is skipped for 30 minutes when its quota is spent or a day when it is out of credit.',
  width: 760,
  height: 470,
  groups: [{ label: 'Image chain, in order', x: 10, y: 190, w: 740, h: 260 }],
  nodes: [
    { title: 'Brief', x: 10, y: Y, w: 100, h: H },
    {
      title: 'Write prompt',
      lines: ['text chain'],
      x: 150,
      y: Y,
      w: 140,
      h: H,
    },
    { title: 'Draw', lines: ['image chain'], x: 330, y: Y, w: 120, h: H },
    { title: 'Review', lines: ['vision chain'], x: 490, y: Y, w: 120, h: H },
    { title: 'Save best', x: 650, y: Y, w: 100, h: H },
    ...CHAIN.map(({ lines, title, x }) => ({
      title,
      lines,
      x,
      y: 240,
      w: 160,
      h: 60,
    })),
    {
      title: 'Each provider',
      lines: [
        'timeout: move on (30 s text, 45 s review, 90 s image)',
        'other error: retry 3 times, 1 s then 2 s apart',
        'quota spent: skip 30 min · out of credit: skip a day',
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
      label: 'pass',
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
      label: 'fails: notes, one more try',
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
};

export { drawing };
