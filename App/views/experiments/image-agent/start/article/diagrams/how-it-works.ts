import type { DiagramSpec } from '@/components';

/** What happens to a message once it is sent. */
const howItWorks: DiagramSpec = {
  title: 'How it works',
  legend: [
    { label: 'Red', value: 'refused', accent: 'error' },
    { label: 'Green', value: 'counted', accent: 'confirm' },
  ],
  description:
    'A message is sent with ImageAgentSend and checked against the limits. It is either refused with TOO_MANY_REQUESTS and not recorded, or saved and counted, after which ImageAgentAllowance shows what is left.',
  width: 800,
  height: 170,
  nodes: [
    { title: 'Send', lines: ['ImageAgentSend'], x: 30, y: 60, w: 150, h: 50 },
    {
      title: 'Check',
      lines: ['seven checks, in order'],
      x: 220,
      y: 60,
      w: 170,
      h: 50,
    },
    {
      title: 'Refused',
      lines: ['TOO_MANY_REQUESTS', 'not recorded'],
      x: 430,
      y: 20,
      w: 150,
      h: 60,
    },
    {
      title: 'Counted',
      lines: ['saved and counted'],
      x: 430,
      y: 100,
      w: 150,
      h: 60,
    },
    {
      title: 'Shown',
      lines: ['ImageAgentAllowance'],
      x: 620,
      y: 100,
      w: 150,
      h: 60,
    },
  ],
  edges: [
    {
      points: [
        [180, 85],
        [220, 85],
      ],
    },
    {
      accent: 'red',
      points: [
        [390, 78],
        [410, 78],
        [410, 50],
        [430, 50],
      ],
    },
    {
      accent: 'green',
      points: [
        [390, 92],
        [410, 92],
        [410, 130],
        [430, 130],
      ],
    },
    {
      accent: 'green',
      points: [
        [580, 130],
        [620, 130],
      ],
    },
  ],
};

export { howItWorks };
