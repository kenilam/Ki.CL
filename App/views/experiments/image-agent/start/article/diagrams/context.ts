import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

/** Top of the first group, so its label has room above the nodes. */
const T = 50;

const context = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.context.title'),
  description: t('diagram.context.description'),
  width: 760,
  height: 380,
  groups: [
    {
      label: t('diagram.context.group', { context: 'models' }),
      x: 10,
      y: 10,
      w: 740,
      h: 360,
    },
  ],
  nodes: [
    {
      title: t('diagram.context.node', { context: 'conversation' }),
      lines: [
        t('diagram.context.line', { context: 'conversation_roles' }),
        t('diagram.context.line', { context: 'conversation_refused' }),
      ],
      shape: 'cylinder',
      x: 30,
      y: T,
      w: 180,
      h: 100,
    },
    {
      title: t('diagram.context.node', { context: 'brief' }),
      lines: [t('diagram.context.line', { context: 'brief' })],
      shape: 'cylinder',
      x: 30,
      y: T + 180,
      w: 180,
      h: 80,
    },
    {
      title: t('diagram.node', { context: 'classifier' }),
      x: 300,
      y: T,
      w: 150,
      h: 45,
    },
    {
      title: t('diagram.node', { context: 'clarifier' }),
      x: 300,
      y: T + 85,
      w: 150,
      h: 45,
    },
    {
      title: t('diagram.context.node', { context: 'prompt_writer' }),
      x: 300,
      y: T + 175,
      w: 150,
      h: 45,
    },
    {
      title: t('diagram.context.node', { context: 'reviewer' }),
      x: 300,
      y: T + 265,
      w: 150,
      h: 45,
    },
    {
      title: t('diagram.context.node', { context: 'image_model' }),
      x: 560,
      y: T + 175,
      w: 170,
      h: 45,
    },
  ],
  edges: [
    {
      points: [
        [210, T + 22],
        [300, T + 22],
      ],
    },
    {
      points: [
        [210, T + 80],
        [250, T + 80],
        [250, T + 100],
        [300, T + 100],
      ],
    },
    {
      accent: 'green',
      both: true,
      points: [
        [210, T + 200],
        [265, T + 200],
        [265, T + 118],
        [300, T + 118],
      ],
      label: t('diagram.context.edge', { context: 'reads' }),
      anchor: 'start',
      lx: 272,
      ly: T + 160,
    },
    {
      accent: 'green',
      points: [
        [210, T + 225],
        [300, T + 225],
      ],
    },
    {
      accent: 'green',
      points: [
        [210, T + 245],
        [245, T + 245],
        [245, T + 288],
        [300, T + 288],
      ],
    },
    {
      accent: 'green',
      points: [
        [450, T + 197],
        [560, T + 197],
      ],
      label: t('diagram.context.edge', { context: 'prompt' }),
      lx: 505,
      ly: T + 189,
    },
    {
      accent: 'green',
      points: [
        [645, T + 220],
        [645, T + 288],
        [450, T + 288],
      ],
      label: t('diagram.context.edge', { context: 'picture' }),
      lx: 550,
      ly: T + 280,
    },
    {
      dashed: true,
      points: [
        [375, T + 265],
        [375, T + 220],
      ],
      label: t('diagram.context.edge', { context: 'notes' }),
      anchor: 'start',
      lx: 383,
      ly: T + 247,
    },
  ],
});

export { context };
