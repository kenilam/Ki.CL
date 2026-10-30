import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const overview = (t: TFunction<'internationalisation'>): DiagramSpec => {
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
        x: 290,
        y: 10,
        w: 180,
        h: 60,
      },
      {
        title: t('diagram.overview.node', { context: 'api' }),
        lines: [
          t('diagram.overview.line', { context: 'api_languages' }),
          t('diagram.overview.line', { context: 'api_query' }),
          t('diagram.overview.line', { context: 'api_translate' }),
        ],
        x: 260,
        y: 120,
        w: 240,
        h: 110,
      },
      {
        title: t('diagram.overview.node', { context: 'models' }),
        lines: [t('diagram.overview.line', { context: 'models' })],
        x: 550,
        y: 140,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.overview.node', { context: 'files' }),
        lines: [t('diagram.overview.line', { context: 'files' })],
        x: 10,
        y: 295,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.overview.node', { context: 'mongodb' }),
        lines: [t('diagram.overview.line', { context: 'mongodb' })],
        shape: 'cylinder',
        x: 260,
        y: 290,
        w: 240,
        h: 80,
      },
      {
        title: t('diagram.overview.node', { context: 'job' }),
        lines: [t('diagram.overview.line', { context: 'job' })],
        x: 550,
        y: 295,
        w: 200,
        h: 70,
      },
    ],
    edges: [
      {
        accent: 'green',
        points: [
          [365, 70],
          [365, 120],
        ],
        label: t('diagram.overview.edge', { context: 'accept' }),
        anchor: 'end',
        lx: 357,
        ly: 99,
      },
      {
        dashed: true,
        points: [
          [395, 120],
          [395, 70],
        ],
        label: t('diagram.overview.edge', { context: 'content' }),
        anchor: 'start',
        lx: 403,
        ly: 99,
      },
      {
        both: true,
        points: [
          [380, 230],
          [380, 290],
        ],
        label: t('diagram.overview.edge', { context: 'read' }),
        anchor: 'end',
        lx: 372,
        ly: 264,
      },
      {
        points: [
          [210, 330],
          [260, 330],
        ],
        label: t('diagram.overview.edge', { context: 'seed' }),
        lx: 235,
        ly: 322,
      },
      {
        both: true,
        points: [
          [550, 330],
          [500, 330],
        ],
        label: t('diagram.overview.edge', { context: 'rows' }),
        lx: 525,
        ly: 322,
      },
      {
        points: [
          [650, 295],
          [650, 210],
        ],
        label: t('diagram.overview.edge', { context: 'translate' }),
        anchor: 'start',
        lx: 658,
        ly: 257,
      },
    ],
  };
};

export { overview };
