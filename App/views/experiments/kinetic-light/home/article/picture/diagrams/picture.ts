import type { DiagramSpec } from 'design/components';

// Hooks
import type { TFunction } from 'design/hooks';

const picture = (t: TFunction<'kinetic-light'>): DiagramSpec => ({
  title: t('diagram.picture.title'),
  description: t('diagram.picture.description'),
  width: 760,
  height: 400,
  groups: [
    {
      label: t('diagram.picture.group', { context: 'scene' }),
      x: 485,
      y: 10,
      w: 270,
      h: 380,
    },
  ],
  nodes: [
    {
      title: t('diagram.picture.node', { context: 'score' }),
      lines: [
        t('diagram.picture.line', { context: 'score_song' }),
        t('diagram.picture.line', { context: 'score_kind' }),
      ],
      x: 10,
      y: 45,
      w: 170,
      h: 80,
    },
    {
      title: t('diagram.picture.node', { context: 'engraver' }),
      lines: [t('diagram.picture.line', { context: 'engraver' })],
      x: 220,
      y: 45,
      w: 220,
      h: 70,
    },
    {
      title: t('diagram.picture.node', { context: 'positions' }),
      lines: [t('diagram.picture.line', { context: 'positions' })],
      x: 220,
      y: 165,
      w: 220,
      h: 70,
    },
    {
      title: t('diagram.picture.node', { context: 'clock' }),
      lines: [
        t('diagram.picture.line', { context: 'clock_where' }),
        t('diagram.picture.line', { context: 'clock_heard' }),
      ],
      x: 10,
      y: 285,
      w: 170,
      h: 80,
    },
    {
      title: t('diagram.picture.node', { context: 'paths' }),
      lines: [t('diagram.picture.line', { context: 'paths' })],
      x: 220,
      y: 285,
      w: 220,
      h: 70,
    },
    {
      title: t('diagram.picture.node', { context: 'mesh' }),
      lines: [t('diagram.picture.line', { context: 'mesh' })],
      x: 500,
      y: 45,
      w: 240,
      h: 70,
    },
    {
      title: t('diagram.picture.node', { context: 'camera' }),
      lines: [t('diagram.picture.line', { context: 'camera' })],
      x: 500,
      y: 165,
      w: 240,
      h: 70,
    },
    {
      title: t('diagram.picture.node', { context: 'balls' }),
      lines: [t('diagram.picture.line', { context: 'balls' })],
      x: 500,
      y: 285,
      w: 240,
      h: 70,
    },
  ],
  edges: [
    {
      points: [
        [180, 80],
        [220, 80],
      ],
    },
    {
      points: [
        [440, 80],
        [500, 80],
      ],
      label: t('diagram.picture.edge', { context: 'svg' }),
      lx: 470,
      ly: 72,
    },
    {
      points: [
        [330, 115],
        [330, 165],
      ],
    },
    {
      points: [
        [330, 235],
        [330, 285],
      ],
    },
    {
      points: [
        [180, 320],
        [220, 320],
      ],
    },
    {
      points: [
        [440, 320],
        [500, 320],
      ],
    },
    {
      points: [
        [95, 285],
        [95, 140],
        [465, 140],
        [465, 200],
        [500, 200],
      ],
    },
  ],
});

export { picture };
