import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

/** What happens to a message once it is sent. */
const howItWorks = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.how_it_works.title'),
  legend: [
    {
      label: t('diagram.label', { context: 'red' }),
      value: t('diagram.how_it_works.legend', { context: 'red' }),
      level: 'error',
    },
    {
      label: t('diagram.label', { context: 'green' }),
      value: t('diagram.how_it_works.legend', { context: 'green' }),
      level: 'confirm',
    },
  ],
  description: t('diagram.how_it_works.description'),
  width: 800,
  height: 170,
  nodes: [
    {
      title: t('diagram.how_it_works.node', { context: 'send' }),
      lines: ['ImageAgentSend'],
      x: 30,
      y: 60,
      w: 150,
      h: 50,
    },
    {
      title: t('diagram.how_it_works.node', { context: 'check' }),
      lines: [t('diagram.how_it_works.line', { context: 'check' })],
      x: 220,
      y: 60,
      w: 170,
      h: 50,
    },
    {
      title: t('diagram.how_it_works.node', { context: 'refused' }),
      lines: [
        'TOO_MANY_REQUESTS',
        t('diagram.how_it_works.line', { context: 'refused' }),
      ],
      x: 430,
      y: 20,
      w: 150,
      h: 60,
    },
    {
      title: t('diagram.how_it_works.node', { context: 'counted' }),
      lines: [t('diagram.how_it_works.line', { context: 'counted' })],
      x: 430,
      y: 100,
      w: 150,
      h: 60,
    },
    {
      title: t('diagram.how_it_works.node', { context: 'shown' }),
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
});

export { howItWorks };
