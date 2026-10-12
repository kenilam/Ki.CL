import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

/** The pieces and what connects them. */
const overview = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.overview.title'),
  legend: [
    {
      label: t('diagram.label', { context: 'dashed' }),
      value: t('diagram.overview.legend', { context: 'dashed' }),
    },
  ],
  description: t('diagram.overview.description'),
  width: 760,
  height: 460,
  nodes: [
    {
      title: t('diagram.node', { context: 'browser' }),
      lines: [t('diagram.overview.line', { context: 'browser' })],
      x: 20,
      y: 150,
      w: 120,
      h: 60,
    },
    {
      title: t('diagram.node', { context: 'api' }),
      lines: [
        t('diagram.overview.line', { context: 'api_resolvers' }),
        t('diagram.overview.line', { context: 'api_turn' }),
        t('diagram.overview.line', { context: 'api_pub_sub' }),
      ],
      x: 230,
      y: 120,
      w: 160,
      h: 120,
    },
    {
      title: t('diagram.node', { context: 'mongodb' }),
      lines: [
        t('diagram.overview.line', { context: 'mongodb_threads' }),
        t('diagram.overview.line', { context: 'mongodb_assets' }),
      ],
      shape: 'cylinder',
      x: 230,
      y: 300,
      w: 160,
      h: 80,
    },
    {
      title: t('diagram.node', { context: 'moderation' }),
      lines: [t('diagram.overview.line', { context: 'moderation' })],
      x: 450,
      y: 20,
      w: 290,
      h: 50,
    },
    {
      title: t('diagram.overview.node', { context: 'text_chain' }),
      lines: [t('diagram.overview.line', { context: 'text_chain' })],
      x: 450,
      y: 90,
      w: 290,
      h: 60,
    },
    {
      title: t('diagram.overview.node', { context: 'vision_chain' }),
      lines: [t('diagram.overview.line', { context: 'vision_chain' })],
      x: 450,
      y: 170,
      w: 290,
      h: 60,
    },
    {
      title: t('diagram.overview.node', { context: 'image_chain' }),
      lines: [
        t('diagram.overview.line', { context: 'image_chain_first' }),
        t('diagram.overview.line', { context: 'image_chain_rest' }),
      ],
      x: 450,
      y: 250,
      w: 290,
      h: 70,
    },
    {
      title: t('diagram.overview.node', { context: 'bucket' }),
      lines: [t('diagram.overview.line', { context: 'bucket' })],
      shape: 'cylinder',
      x: 450,
      y: 345,
      w: 290,
      h: 70,
    },
  ],
  edges: [
    {
      accent: 'green',
      points: [
        [140, 165],
        [230, 165],
      ],
      label: t('diagram.overview.edge', { context: 'send' }),
      lx: 185,
      ly: 157,
    },
    {
      dashed: true,
      points: [
        [230, 200],
        [140, 200],
      ],
      label: t('diagram.overview.edge', { context: 'updates' }),
      lx: 185,
      ly: 192,
    },
    {
      both: true,
      points: [
        [310, 240],
        [310, 300],
      ],
      label: t('diagram.overview.edge', { context: 'read_write' }),
      anchor: 'start',
      lx: 318,
      ly: 275,
    },
    {
      points: [
        [390, 135],
        [420, 135],
        [420, 45],
        [450, 45],
      ],
    },
    {
      points: [
        [390, 150],
        [430, 150],
        [430, 120],
        [450, 120],
      ],
    },
    {
      points: [
        [390, 200],
        [450, 200],
      ],
    },
    {
      points: [
        [390, 225],
        [420, 225],
        [420, 285],
        [450, 285],
      ],
    },
    {
      accent: 'green',
      points: [
        [595, 320],
        [595, 345],
      ],
      label: t('diagram.overview.edge', { context: 'upload' }),
      anchor: 'start',
      lx: 603,
      ly: 337,
    },
    {
      dashed: true,
      points: [
        [80, 210],
        [80, 440],
        [595, 440],
        [595, 415],
      ],
      label: t('diagram.overview.edge', { context: 'assets' }),
      lx: 330,
      ly: 432,
    },
  ],
});

export { overview };
