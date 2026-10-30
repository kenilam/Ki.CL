import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

const direction = (t: TFunction<'internationalisation'>): DiagramSpec => {
  return {
    title: t('diagram.direction.title'),
    description: t('diagram.direction.description'),
    width: 760,
    height: 280,
    nodes: [
      {
        title: t('diagram.direction.node', { context: 'dir' }),
        lines: [t('diagram.direction.line', { context: 'dir' })],
        x: 260,
        y: 10,
        w: 240,
        h: 60,
      },
      {
        title: t('diagram.direction.node', { context: 'browser' }),
        lines: [
          t('diagram.direction.line', { context: 'browser_rows' }),
          t('diagram.direction.line', { context: 'browser_text' }),
          t('diagram.direction.line', { context: 'browser_spacing' }),
        ],
        x: 10,
        y: 140,
        w: 320,
        h: 130,
      },
      {
        title: t('diagram.direction.node', { context: 'site' }),
        lines: [
          t('diagram.direction.line', { context: 'site_arrows' }),
          t('diagram.direction.line', { context: 'site_switch' }),
          t('diagram.direction.line', { context: 'site_code' }),
          t('diagram.direction.line', { context: 'site_flags' }),
          t('diagram.direction.line', { context: 'site_calendar' }),
        ],
        x: 430,
        y: 140,
        w: 320,
        h: 130,
      },
    ],
    edges: [
      {
        accent: 'green',
        points: [
          [320, 70],
          [320, 105],
          [170, 105],
          [170, 140],
        ],
        label: t('diagram.direction.edge', { context: 'covers' }),
        anchor: 'end',
        lx: 312,
        ly: 97,
      },
      {
        accent: 'orange',
        dashed: true,
        points: [
          [440, 70],
          [440, 105],
          [590, 105],
          [590, 140],
        ],
        label: t('diagram.direction.edge', { context: 'misses' }),
        anchor: 'start',
        lx: 448,
        ly: 97,
      },
    ],
  };
};

export { direction };
