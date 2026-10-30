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
    width: 870,
    height: 420,
    nodes: [
      {
        title: t('diagram.overview.node', { context: 'browser' }),
        lines: [t('diagram.overview.line', { context: 'browser' })],
        x: 20,
        y: 140,
        w: 190,
        h: 80,
      },
      {
        title: t('diagram.overview.node', { context: 'api' }),
        lines: [
          t('diagram.overview.line', { context: 'api_languages' }),
          t('diagram.overview.line', { context: 'api_query' }),
          t('diagram.overview.line', { context: 'api_translate' }),
        ],
        x: 350,
        y: 120,
        w: 230,
        h: 120,
      },
      {
        title: t('diagram.overview.node', { context: 'mongodb' }),
        lines: [t('diagram.overview.line', { context: 'mongodb' })],
        shape: 'cylinder',
        x: 350,
        y: 320,
        w: 230,
        h: 80,
      },
      {
        title: t('diagram.overview.node', { context: 'files' }),
        lines: [t('diagram.overview.line', { context: 'files' })],
        x: 650,
        y: 20,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.overview.node', { context: 'models' }),
        lines: [t('diagram.overview.line', { context: 'models' })],
        x: 650,
        y: 160,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.overview.node', { context: 'job' }),
        lines: [t('diagram.overview.line', { context: 'job' })],
        x: 650,
        y: 320,
        w: 200,
        h: 80,
      },
    ],
    edges: [
      {
        accent: 'green',
        points: [
          [210, 165],
          [350, 165],
        ],
        label: t('diagram.overview.edge', { context: 'accept' }),
        lx: 280,
        ly: 157,
      },
      {
        dashed: true,
        points: [
          [350, 195],
          [210, 195],
        ],
        label: t('diagram.overview.edge', { context: 'content' }),
        lx: 280,
        ly: 187,
      },
      {
        both: true,
        points: [
          [465, 240],
          [465, 320],
        ],
        label: t('diagram.overview.edge', { context: 'read' }),
        anchor: 'start',
        lx: 473,
        ly: 284,
      },
      {
        points: [
          [650, 55],
          [605, 55],
          [605, 345],
          [580, 345],
        ],
        label: t('diagram.overview.edge', { context: 'seed' }),
        anchor: 'start',
        lx: 611,
        ly: 200,
      },
      {
        both: true,
        points: [
          [650, 380],
          [580, 380],
        ],
        label: t('diagram.overview.edge', { context: 'rows' }),
        lx: 615,
        ly: 372,
      },
      {
        points: [
          [750, 320],
          [750, 230],
        ],
        label: t('diagram.overview.edge', { context: 'translate' }),
        anchor: 'start',
        lx: 758,
        ly: 278,
      },
    ],
  };
};

export { overview };
