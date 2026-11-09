import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const beat = (t: TFunction<'kinetic-light'>): DiagramSpec => ({
  title: t('diagram.beat.title'),
  description: t('diagram.beat.description'),
  width: 760,
  height: 410,
  groups: [
    {
      label: t('diagram.beat.group', { context: 'read' }),
      x: 190,
      y: 10,
      w: 225,
      h: 345,
    },
  ],
  nodes: [
    {
      title: t('diagram.node', { context: 'notes' }),
      lines: [t('diagram.line', { context: 'notes' })],
      x: 5,
      y: 160,
      w: 170,
      h: 80,
    },
    {
      title: t('diagram.beat.node', { context: 'grid' }),
      lines: [
        t('diagram.beat.line', { context: 'grid_kinds' }),
        t('diagram.beat.line', { context: 'grid_fit' }),
        t('diagram.beat.line', { context: 'grid_most' }),
      ],
      x: 200,
      y: 45,
      w: 205,
      h: 95,
    },
    {
      title: t('diagram.beat.node', { context: 'bass' }),
      lines: [
        t('diagram.beat.line', { context: 'bass_pitch' }),
        t('diagram.beat.line', { context: 'bass_length' }),
      ],
      x: 200,
      y: 165,
      w: 205,
      h: 80,
    },
    {
      title: t('diagram.beat.node', { context: 'loudness' }),
      lines: [t('diagram.beat.line', { context: 'loudness' })],
      x: 200,
      y: 270,
      w: 205,
      h: 70,
    },
    {
      title: t('diagram.beat.node', { context: 'sound' }),
      lines: [t('diagram.beat.line', { context: 'sound' })],
      x: 500,
      y: 20,
      w: 250,
      h: 70,
    },
    {
      title: t('diagram.beat.node', { context: 'step' }),
      lines: [
        t('diagram.beat.line', { context: 'step_beat' }),
        t('diagram.beat.line', { context: 'step_bar' }),
        t('diagram.beat.line', { context: 'step_bass' }),
        t('diagram.beat.line', { context: 'step_round' }),
      ],
      x: 500,
      y: 130,
      w: 250,
      h: 140,
    },
    {
      title: t('diagram.beat.node', { context: 'part' }),
      lines: [
        t('diagram.beat.line', { context: 'part_loudness' }),
        t('diagram.beat.line', { context: 'part_song' }),
      ],
      x: 500,
      y: 310,
      w: 250,
      h: 80,
    },
  ],
  edges: [
    {
      points: [
        [175, 180],
        [187, 180],
        [187, 92],
        [200, 92],
      ],
    },
    {
      points: [
        [175, 205],
        [200, 205],
      ],
    },
    {
      points: [
        [175, 230],
        [187, 230],
        [187, 305],
        [200, 305],
      ],
    },
    {
      points: [
        [405, 92],
        [470, 92],
        [470, 165],
        [500, 165],
      ],
      label: t('diagram.beat.edge', { context: 'steps' }),
      lx: 442,
      ly: 84,
    },
    {
      points: [
        [405, 205],
        [500, 205],
      ],
      label: t('diagram.beat.edge', { context: 'kicks' }),
      lx: 458,
      ly: 197,
    },
    {
      points: [
        [302, 340],
        [302, 375],
        [500, 375],
      ],
      label: t('diagram.beat.edge', { context: 'loudness' }),
      lx: 450,
      ly: 367,
    },
    {
      points: [
        [625, 90],
        [625, 130],
      ],
      label: t('diagram.beat.edge', { context: 'answers' }),
      anchor: 'end',
      lx: 617,
      ly: 115,
    },
    {
      points: [
        [625, 270],
        [625, 310],
      ],
    },
  ],
});

export { beat };
