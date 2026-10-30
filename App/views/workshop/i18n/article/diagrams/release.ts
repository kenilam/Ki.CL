import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const release = (t: TFunction<'internationalisation'>): DiagramSpec => {
  return {
    title: t('diagram.release.title'),
    description: t('diagram.release.description'),
    width: 760,
    height: 240,
    groups: [
      {
        label: t('diagram.release.group', { context: 'dev' }),
        x: 10,
        y: 10,
        w: 240,
        h: 220,
      },
      {
        label: t('diagram.release.group', { context: 'production' }),
        x: 280,
        y: 10,
        w: 240,
        h: 220,
      },
    ],
    nodes: [
      {
        title: t('diagram.release.node', { context: 'seed' }),
        lines: [t('diagram.release.line', { context: 'seed' })],
        x: 30,
        y: 45,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.release.node', { context: 'translate' }),
        lines: [t('diagram.release.line', { context: 'translate' })],
        x: 30,
        y: 145,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.release.node', { context: 'translations' }),
        lines: [t('diagram.release.line', { context: 'translations' })],
        x: 300,
        y: 45,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.release.node', { context: 'english' }),
        lines: [t('diagram.release.line', { context: 'english' })],
        x: 300,
        y: 145,
        w: 200,
        h: 70,
      },
      {
        title: t('diagram.release.node', { context: 'release' }),
        lines: [t('diagram.release.line', { context: 'release' })],
        x: 560,
        y: 145,
        w: 190,
        h: 70,
      },
    ],
    edges: [
      {
        points: [
          [130, 115],
          [130, 145],
        ],
      },
      {
        points: [
          [230, 180],
          [265, 180],
          [265, 80],
          [300, 80],
        ],
      },
      {
        points: [
          [400, 115],
          [400, 145],
        ],
      },
      {
        accent: 'green',
        points: [
          [500, 180],
          [560, 180],
        ],
      },
    ],
  };
};

export { release };
