import type { DiagramSpec } from 'design/components';

// Hooks
import type { TFunction } from 'design/hooks';

const reading = (t: TFunction<'kinetic-light'>): DiagramSpec => ({
  title: t('diagram.reading.title'),
  legend: [
    {
      label: t('diagram.label', { context: 'green' }),
      value: t('diagram.reading.legend', { context: 'green' }),
    },
    {
      label: t('diagram.label', { context: 'dashed' }),
      value: t('diagram.reading.legend', { context: 'dashed' }),
    },
  ],
  description: t('diagram.reading.description'),
  width: 760,
  height: 420,
  nodes: [
    {
      title: t('diagram.reading.node', { context: 'browser' }),
      lines: [
        t('diagram.reading.line', { context: 'browser_read' }),
        t('diagram.reading.line', { context: 'browser_play' }),
      ],
      x: 10,
      y: 120,
      w: 180,
      h: 120,
    },
    {
      title: t('diagram.reading.node', { context: 'api' }),
      lines: [
        t('diagram.reading.line', { context: 'api_resolvers' }),
        t('diagram.reading.line', { context: 'api_readings' }),
        t('diagram.reading.line', { context: 'api_allowance' }),
      ],
      x: 290,
      y: 100,
      w: 200,
      h: 160,
    },
    {
      title: t('diagram.reading.node', { context: 'mongodb' }),
      lines: [t('diagram.reading.line', { context: 'mongodb' })],
      shape: 'cylinder',
      x: 290,
      y: 320,
      w: 200,
      h: 80,
    },
    {
      title: t('diagram.reading.node', { context: 'homr' }),
      lines: [t('diagram.reading.line', { context: 'homr' })],
      x: 570,
      y: 40,
      w: 180,
      h: 70,
    },
    {
      title: t('diagram.reading.node', { context: 'vision' }),
      lines: [t('diagram.reading.line', { context: 'vision' })],
      x: 570,
      y: 150,
      w: 180,
      h: 70,
    },
  ],
  edges: [
    {
      accent: 'green',
      points: [
        [190, 150],
        [290, 150],
      ],
      label: t('diagram.reading.edge', { context: 'file' }),
      lx: 240,
      ly: 142,
    },
    {
      points: [
        [190, 180],
        [290, 180],
      ],
      label: t('diagram.reading.edge', { context: 'sheet' }),
      lx: 240,
      ly: 172,
    },
    {
      dashed: true,
      points: [
        [290, 210],
        [190, 210],
      ],
      label: t('diagram.reading.edge', { context: 'progress' }),
      lx: 240,
      ly: 202,
    },
    {
      both: true,
      points: [
        [390, 260],
        [390, 320],
      ],
      label: t('diagram.reading.edge', { context: 'read_write' }),
      anchor: 'start',
      lx: 398,
      ly: 295,
    },
    {
      points: [
        [490, 130],
        [530, 130],
        [530, 75],
        [570, 75],
      ],
    },
    {
      points: [
        [490, 185],
        [570, 185],
      ],
    },
  ],
});

export { reading };
