import type { DiagramSpec } from 'design/components';

// Hooks
import type { TFunction } from 'design/hooks';

const overview = (t: TFunction<'architecture'>): DiagramSpec => {
  return {
    title: t('diagram.overview.title'),
    legend: [
      {
        label: t('diagram.label', { context: 'dashed' }),
        value: t('diagram.overview.legend', { context: 'dashed' }),
      },
    ],
    description: t('diagram.overview.description'),
    width: 760,
    height: 380,
    nodes: [
      {
        title: t('diagram.overview.node', { context: 'browser' }),
        lines: [t('diagram.overview.line', { context: 'browser' })],
        x: 270,
        y: 10,
        w: 220,
        h: 60,
      },
      {
        title: t('diagram.overview.node', { context: 'host' }),
        lines: [
          t('diagram.overview.line', { context: 'host_page' }),
          t('diagram.overview.line', { context: 'host_forward' }),
        ],
        x: 250,
        y: 120,
        w: 260,
        h: 90,
      },
      {
        title: t('diagram.overview.node', { context: 'design' }),
        lines: [t('diagram.overview.line', { context: 'design' })],
        x: 10,
        y: 280,
        w: 230,
        h: 90,
      },
      {
        title: t('diagram.overview.node', { context: 'api' }),
        lines: [
          t('diagram.overview.line', { context: 'api_entry' }),
          t('diagram.overview.line', { context: 'api_graphql' }),
        ],
        x: 265,
        y: 280,
        w: 230,
        h: 90,
      },
      {
        title: t('diagram.overview.node', { context: 'features' }),
        lines: [
          t('diagram.overview.line', { context: 'features_kind' }),
          t('diagram.overview.line', { context: 'features_place' }),
        ],
        x: 520,
        y: 280,
        w: 230,
        h: 90,
      },
    ],
    edges: [
      {
        points: [
          [380, 70],
          [380, 120],
        ],
        label: t('diagram.overview.edge', { context: 'request' }),
        anchor: 'start',
        lx: 388,
        ly: 99,
      },
      {
        points: [
          [300, 210],
          [300, 245],
          [125, 245],
          [125, 280],
        ],
        label: t('diagram.overview.edge', { context: 'design' }),
        lx: 212,
        ly: 237,
      },
      {
        points: [
          [380, 210],
          [380, 280],
        ],
        label: t('diagram.overview.edge', { context: 'api' }),
        anchor: 'start',
        lx: 388,
        ly: 249,
      },
      {
        dashed: true,
        points: [
          [460, 210],
          [460, 245],
          [635, 245],
          [635, 280],
        ],
        label: t('diagram.overview.edge', { context: 'features' }),
        lx: 548,
        ly: 237,
      },
    ],
  };
};

export { overview };
