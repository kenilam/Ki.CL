import type { DiagramSpec } from 'design/components';

// Hooks
import type { TFunction } from 'design/hooks';

const sound = (t: TFunction<'kinetic-light'>): DiagramSpec => ({
  title: t('diagram.sound.title'),
  description: t('diagram.sound.description'),
  width: 760,
  height: 390,
  groups: [
    {
      label: t('diagram.sound.group', { context: 'tone' }),
      x: 200,
      y: 170,
      w: 555,
      h: 210,
    },
  ],
  nodes: [
    {
      title: t('diagram.node', { context: 'notes' }),
      lines: [t('diagram.line', { context: 'notes' })],
      x: 5,
      y: 40,
      w: 175,
      h: 70,
    },
    {
      title: t('diagram.sound.node', { context: 'outline' }),
      lines: [
        t('diagram.sound.line', { context: 'outline_tempo' }),
        t('diagram.sound.line', { context: 'outline_notes' }),
      ],
      x: 200,
      y: 35,
      w: 190,
      h: 80,
    },
    {
      title: t('diagram.sound.node', { context: 'text' }),
      lines: [t('diagram.sound.line', { context: 'text' })],
      x: 430,
      y: 40,
      w: 140,
      h: 70,
    },
    {
      title: t('diagram.sound.node', { context: 'arrangement' }),
      lines: [
        t('diagram.sound.line', { context: 'arrangement_choices' }),
        t('diagram.sound.line', { context: 'arrangement_kept' }),
      ],
      shape: 'cylinder',
      x: 600,
      y: 25,
      w: 155,
      h: 100,
    },
    {
      title: t('diagram.sound.node', { context: 'timeline' }),
      lines: [
        t('diagram.sound.line', { context: 'timeline_notes' }),
        t('diagram.sound.line', { context: 'timeline_lead' }),
      ],
      x: 215,
      y: 225,
      w: 180,
      h: 80,
    },
    {
      title: t('diagram.sound.node', { context: 'voice' }),
      lines: [t('diagram.sound.line', { context: 'voice' })],
      x: 435,
      y: 210,
      w: 180,
      h: 70,
    },
    {
      title: t('diagram.sound.node', { context: 'kit' }),
      lines: [t('diagram.sound.line', { context: 'kit' })],
      x: 435,
      y: 295,
      w: 180,
      h: 70,
    },
    {
      title: t('diagram.sound.node', { context: 'output' }),
      x: 650,
      y: 255,
      w: 95,
      h: 60,
    },
  ],
  edges: [
    {
      points: [
        [180, 75],
        [200, 75],
      ],
    },
    {
      points: [
        [390, 75],
        [430, 75],
      ],
    },
    {
      points: [
        [570, 75],
        [600, 75],
      ],
    },
    {
      points: [
        [677, 125],
        [677, 150],
        [305, 150],
        [305, 225],
      ],
      label: t('diagram.sound.edge', { context: 'arrangement' }),
      anchor: 'start',
      lx: 313,
      ly: 142,
    },
    {
      points: [
        [92, 110],
        [92, 265],
        [215, 265],
      ],
      label: t('diagram.sound.edge', { context: 'notes' }),
      lx: 150,
      ly: 257,
    },
    {
      points: [
        [395, 245],
        [435, 245],
      ],
    },
    {
      points: [
        [395, 285],
        [415, 285],
        [415, 330],
        [435, 330],
      ],
    },
    {
      points: [
        [615, 245],
        [632, 245],
        [632, 275],
        [650, 275],
      ],
    },
    {
      points: [
        [615, 330],
        [632, 330],
        [632, 295],
        [650, 295],
      ],
    },
  ],
});

export { sound };
