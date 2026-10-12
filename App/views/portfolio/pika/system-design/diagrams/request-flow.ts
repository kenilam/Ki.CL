import type { DiagramSpec as Spec } from 'design/components';
import type { TFunction } from 'i18next';

const actors = (t: TFunction<'pika'>) => [
  { title: t('diagram.request_flow.node_client'), x: 110 },
  { title: t('component', { context: 'job_service' }), x: 300 },
  { title: t('component', { context: 'orchestrator' }), x: 490 },
  { title: t('diagram.request_flow.node_worker'), x: 680 },
  { title: t('diagram.request_flow.node_provider'), x: 870 },
];

const TOP = 20;
const BOTTOM = 580;

/** Request flow - one job from submission to delivered assets. */
const requestFlow = (t: TFunction<'pika'>): Spec => ({
  title: t('diagram.request_flow.title'),
  legend: [
    {
      label: t('diagram.request_flow.legend_solid_label'),
      value: t('diagram.request_flow.legend_solid_value'),
    },
    {
      label: t('diagram.request_flow.legend_dashed_label'),
      value: t('diagram.request_flow.legend_dashed_value'),
    },
  ],
  description: t('diagram.request_flow.description'),
  width: 960,
  height: 640,
  nodes: actors(t).flatMap(({ title, x }) => [
    { title, x: x - 75, y: TOP, w: 150, h: 40 },
    { title, x: x - 75, y: BOTTOM, w: 150, h: 40 },
  ]),
  edges: [
    ...actors(t).map(({ x }) => ({
      points: [
        [x, TOP + 40],
        [x, BOTTOM],
      ] as Array<[number, number]>,
      dashed: true,
    })),
    {
      points: [
        [110, 100],
        [300, 100],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_post'),
      lx: 205,
      ly: 90,
    },
    {
      points: [
        [300, 140],
        [340, 140],
        [340, 158],
        [300, 158],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_validate'),
      lx: 350,
      ly: 152,
      anchor: 'start',
    },
    {
      points: [
        [300, 195],
        [490, 195],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_start'),
      lx: 395,
      ly: 185,
    },
    {
      points: [
        [300, 235],
        [110, 235],
      ],
      dashed: true,
      label: t('diagram.request_flow.edge_accepted'),
      lx: 205,
      ly: 225,
    },
    {
      points: [
        [110, 275],
        [150, 275],
        [150, 293],
        [110, 293],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_subscribe'),
      lx: 160,
      ly: 287,
      anchor: 'start',
    },
    {
      points: [
        [490, 330],
        [680, 330],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_schedule'),
      lx: 585,
      ly: 320,
    },
    {
      points: [
        [680, 370],
        [870, 370],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_generate'),
      lx: 775,
      ly: 360,
    },
    {
      points: [
        [870, 410],
        [680, 410],
      ],
      dashed: true,
      label: t('diagram.request_flow.edge_webhook'),
      lx: 775,
      ly: 400,
    },
    {
      points: [
        [680, 450],
        [490, 450],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_result'),
      lx: 585,
      ly: 440,
    },
    {
      points: [
        [490, 490],
        [110, 490],
      ],
      dashed: true,
      label: t('diagram.request_flow.edge_progress'),
      lx: 300,
      ly: 480,
    },
    {
      points: [
        [490, 530],
        [300, 530],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_complete'),
      lx: 395,
      ly: 520,
    },
    {
      points: [
        [110, 555],
        [150, 555],
        [150, 570],
        [110, 570],
      ],
      accent: 'green',
      label: t('diagram.request_flow.edge_gallery'),
      lx: 160,
      ly: 566,
      anchor: 'start',
    },
  ],
});

export { requestFlow };
